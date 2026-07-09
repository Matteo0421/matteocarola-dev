/**
 * Tech Radar — generatore di card (scripts/radar/generate.mjs)
 *
 * Pipeline semi-automatica, zero dipendenze npm (Node >= 22, fetch nativa):
 *   1. pesca i candidati dalle fonti gratuite (AWS What's New RSS,
 *      Hacker News via API Algolia, GitHub Search API);
 *   2. scarta ciò che è già pubblicato in src/content/radar/ (dedup per URL);
 *   3. chiede a Gemini (free tier) di scegliere le card più interessanti
 *      per un pubblico di sviluppatori cloud/AI e di scrivere titolo,
 *      sintesi e tag in italiano — SOLO a partire dai dati forniti;
 *   4. scrive i file Markdown delle card e il body della Pull Request.
 *
 * Non pubblica nulla da solo: il workflow (.github/workflows/radar.yml)
 * apre una PR e la pubblicazione avviene solo al merge (umano nel loop).
 *
 * Uso:
 *   node scripts/radar/generate.mjs            # run completo (serve GEMINI_API_KEY)
 *   node scripts/radar/generate.mjs --dry-run  # solo fetch+dedup, stampa i candidati
 *
 * Env: GEMINI_API_KEY (obbligatoria salvo --dry-run), GITHUB_TOKEN (opzionale,
 *      alza i rate limit della Search API), GEMINI_MODEL (default gemini-2.5-flash),
 *      PR_BODY_PATH (se impostata, scrive lì il body della PR).
 */

import { readdir, readFile, writeFile } from 'node:fs/promises';
import path from 'node:path';
import process from 'node:process';

const DRY_RUN = process.argv.includes('--dry-run');
const MAX_CARDS = 3;
const CONTENT_DIR = path.join(process.cwd(), 'src', 'content', 'radar');
const GEMINI_MODEL = process.env.GEMINI_MODEL ?? 'gemini-2.5-flash';
const FETCH_TIMEOUT_MS = 20_000;

/* ------------------------------------------------------------------ utils */

function log(message) {
  console.log(`[radar] ${message}`);
}

async function fetchWithTimeout(url, options = {}) {
  const response = await fetch(url, {
    ...options,
    signal: AbortSignal.timeout(FETCH_TIMEOUT_MS),
  });
  if (!response.ok) {
    throw new Error(`HTTP ${response.status} da ${new URL(url).hostname}`);
  }
  return response;
}

function decodeEntities(text) {
  return text
    .replaceAll('&lt;', '<')
    .replaceAll('&gt;', '>')
    .replaceAll('&quot;', '"')
    .replaceAll('&#39;', "'")
    .replaceAll('&nbsp;', ' ')
    .replaceAll('&amp;', '&');
}

function stripHtml(text) {
  return decodeEntities(text.replace(/<[^>]*>/g, ' '))
    .replace(/\s+/g, ' ')
    .trim();
}

/** Normalizza un URL per la deduplica (host senza www, path senza slash finale, no query). */
function normalizeUrl(rawUrl) {
  try {
    const url = new URL(rawUrl);
    const host = url.hostname.replace(/^www\./, '').toLowerCase();
    const pathname = url.pathname.replace(/\/+$/, '');
    return `${host}${pathname}`;
  } catch {
    return rawUrl.trim().toLowerCase();
  }
}

function slugify(text) {
  return text
    .normalize('NFD')
    .replace(/\p{Diacritic}/gu, '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .slice(0, 60)
    .replace(/-+$/, '');
}

function truncate(text, max) {
  return text.length > max ? `${text.slice(0, max - 1)}…` : text;
}

/* ------------------------------------------------------------------ fonti */

/** AWS "What's New" — feed RSS ufficiale, parsing minimale senza dipendenze. */
async function fetchAwsWhatsNew() {
  const response = await fetchWithTimeout(
    'https://aws.amazon.com/about-aws/whats-new/recent/feed/',
    { headers: { accept: 'application/rss+xml, application/xml, text/xml' } },
  );
  const xml = await response.text();
  const items = [];
  for (const [, itemXml] of xml.matchAll(/<item>([\s\S]*?)<\/item>/g)) {
    const field = (name) => {
      const match = itemXml.match(new RegExp(`<${name}[^>]*>([\\s\\S]*?)</${name}>`));
      if (!match) return '';
      return stripHtml(match[1].replace(/<!\[CDATA\[([\s\S]*?)\]\]>/g, '$1'));
    };
    const title = field('title');
    const link = field('link');
    if (!title || !link) continue;
    items.push({
      source: 'AWS What’s New',
      title,
      url: link,
      context: truncate(field('description'), 400),
    });
    if (items.length >= 15) break;
  }
  return items;
}

/** Hacker News — front page via API Algolia (gratuita, senza chiave). */
async function fetchHackerNews() {
  const response = await fetchWithTimeout(
    'https://hn.algolia.com/api/v1/search?tags=front_page&hitsPerPage=25',
  );
  const data = await response.json();
  return (data.hits ?? [])
    .filter((hit) => hit.title)
    .map((hit) => ({
      source: 'Hacker News',
      title: hit.title,
      url: hit.url || `https://news.ycombinator.com/item?id=${hit.objectID}`,
      context: `In front page su Hacker News con ${hit.points ?? 0} punti e ${hit.num_comments ?? 0} commenti.`,
    }));
}

/** GitHub — repository nuovi che stanno esplodendo (Search API pubblica). */
async function fetchGithubTrending() {
  const since = new Date(Date.now() - 14 * 24 * 60 * 60 * 1000).toISOString().slice(0, 10);
  const url = new URL('https://api.github.com/search/repositories');
  url.searchParams.set('q', `created:>${since} stars:>200`);
  url.searchParams.set('sort', 'stars');
  url.searchParams.set('order', 'desc');
  url.searchParams.set('per_page', '15');
  const headers = {
    accept: 'application/vnd.github+json',
    'user-agent': 'matteocarola-dev-tech-radar',
  };
  if (process.env.GITHUB_TOKEN) {
    headers.authorization = `Bearer ${process.env.GITHUB_TOKEN}`;
  }
  const response = await fetchWithTimeout(url, { headers });
  const data = await response.json();
  return (data.items ?? []).map((repo) => ({
    source: 'GitHub Trending',
    title: repo.full_name,
    url: repo.html_url,
    context: truncate(
      `${repo.description ?? 'Nessuna descrizione.'} (${repo.stargazers_count}★ in ${
        repo.language ?? 'n/d'
      }, creato da poco)`,
      400,
    ),
  }));
}

/* ------------------------------------------------------------------ dedup */

/** URL delle card già pubblicate, letti dal frontmatter dei .md esistenti. */
async function loadPublishedUrls() {
  const published = new Set();
  let files = [];
  try {
    files = await readdir(CONTENT_DIR);
  } catch {
    return published; // la cartella non esiste ancora: nessuna card pubblicata
  }
  for (const file of files.filter((name) => name.endsWith('.md'))) {
    const content = await readFile(path.join(CONTENT_DIR, file), 'utf8');
    const match = content.match(/^sourceUrl:\s*["']?(\S+?)["']?\s*$/m);
    if (match) published.add(normalizeUrl(match[1]));
  }
  return published;
}

/* ----------------------------------------------------------------- gemini */

/** Chiede a Gemini di scegliere le card e scrivere titolo/sintesi/tag in italiano. */
async function pickCardsWithGemini(candidates) {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    throw new Error('GEMINI_API_KEY mancante: impostala nell’ambiente (o usa --dry-run).');
  }

  const list = candidates
    .map((c, i) => `${i}. [${c.source}] ${c.title}\n   URL: ${c.url}\n   Contesto: ${c.context}`)
    .join('\n');

  const prompt = [
    'Sei il curatore del "Tech Radar" di un sito personale di un software engineer',
    'italiano specializzato in cloud (AWS) e Generative AI. Il pubblico è fatto di',
    'sviluppatori e cloud engineer.',
    '',
    `Qui sotto trovi ${candidates.length} candidati numerati, pescati da fonti diverse.`,
    `Scegli le ${MAX_CARDS} novità più interessanti e utili per questo pubblico`,
    '(meno di 3 solo se i candidati validi sono davvero pochi). Criteri:',
    '- privilegia novità concrete su cloud/AWS, AI/LLM e strumenti per sviluppatori;',
    '- varia le fonti quando possibile (non scegliere 3 item dalla stessa fonte);',
    '- evita politica, polemiche, annunci puramente commerciali e item troppo di nicchia.',
    '',
    'Per ogni scelta scrivi, in ITALIANO:',
    '- "title": un titolo breve e chiaro (max 80 caratteri, niente clickbait);',
    '- "summary": una sintesi di 2 frasi basata SOLO sulle informazioni fornite',
    '  (titolo e contesto). Non inventare dettagli, numeri o funzionalità;',
    '- "tags": da 2 a 4 tag brevi (es. "AWS", "LLM", "Serverless", "Open source").',
    '',
    'Rispondi con un array JSON di oggetti { "id", "title", "summary", "tags" },',
    'dove "id" è il numero del candidato scelto.',
    '',
    'CANDIDATI:',
    list,
  ].join('\n');

  const body = {
    contents: [{ parts: [{ text: prompt }] }],
    generationConfig: {
      temperature: 0.4,
      responseMimeType: 'application/json',
      responseSchema: {
        type: 'ARRAY',
        items: {
          type: 'OBJECT',
          properties: {
            id: { type: 'INTEGER' },
            title: { type: 'STRING' },
            summary: { type: 'STRING' },
            tags: { type: 'ARRAY', items: { type: 'STRING' } },
          },
          required: ['id', 'title', 'summary', 'tags'],
        },
      },
    },
  };

  const endpoint = `https://generativelanguage.googleapis.com/v1beta/models/${GEMINI_MODEL}:generateContent`;
  let lastError;
  for (let attempt = 1; attempt <= 3; attempt++) {
    try {
      const response = await fetchWithTimeout(endpoint, {
        method: 'POST',
        headers: { 'content-type': 'application/json', 'x-goog-api-key': apiKey },
        body: JSON.stringify(body),
      });
      const data = await response.json();
      const text = data.candidates?.[0]?.content?.parts?.[0]?.text;
      if (!text) throw new Error('Risposta di Gemini senza testo.');
      return JSON.parse(text);
    } catch (error) {
      lastError = error;
      log(`Tentativo Gemini ${attempt}/3 fallito: ${error.message}`);
      if (attempt < 3) await new Promise((resolve) => setTimeout(resolve, attempt * 5000));
    }
  }
  throw lastError;
}

/* ------------------------------------------------------------------ output */

function cardMarkdown(pick, candidate, isoDate) {
  const tags = pick.tags.slice(0, 4).map((tag) => JSON.stringify(String(tag).trim()));
  return [
    '---',
    `title: ${JSON.stringify(pick.title.trim())}`,
    `summary: ${JSON.stringify(pick.summary.trim())}`,
    `tags: [${tags.join(', ')}]`,
    `sourceName: ${JSON.stringify(candidate.source)}`,
    `sourceUrl: ${JSON.stringify(candidate.url)}`,
    `pubDate: ${isoDate}`,
    '---',
    '',
  ].join('\n');
}

function prBody(cards) {
  const lines = [
    'Nuove card proposte dalla pipeline del Tech Radar. Per ognuna:',
    '',
    '- **pubblica** → lascia il file com’è (o modifica sintesi/tag);',
    '- **aggiungi la tua riga** → scrivi una o due frasi nel corpo del file, sotto il frontmatter;',
    '- **scarta** → elimina il file dalla PR (o chiudi la PR per scartare tutto).',
    '',
    '---',
    '',
  ];
  for (const { pick, candidate, fileName } of cards) {
    lines.push(
      `### ${pick.title.trim()}`,
      '',
      `> ${pick.summary.trim()}`,
      '',
      `- Fonte: [${candidate.source}](${candidate.url})`,
      `- Tag: ${pick.tags.join(', ')}`,
      `- File: \`src/content/radar/${fileName}\``,
      '',
    );
  }
  lines.push('_Al merge, Vercel pubblica automaticamente le card su /radar._', '');
  return lines.join('\n');
}

/* ------------------------------------------------------------------- main */

async function main() {
  // Il file del body PR deve esistere sempre: il workflow lo passa a body-path
  // anche quando non c'è nessuna card (in quel caso la PR non viene creata).
  if (process.env.PR_BODY_PATH && !DRY_RUN) {
    await writeFile(process.env.PR_BODY_PATH, 'Nessuna card proposta in questo run.\n');
  }

  log(`Raccolgo i candidati dalle fonti${DRY_RUN ? ' (dry-run)' : ''}…`);

  const sources = [
    ['AWS What’s New', fetchAwsWhatsNew],
    ['Hacker News', fetchHackerNews],
    ['GitHub Trending', fetchGithubTrending],
  ];
  const candidates = [];
  for (const [name, fetcher] of sources) {
    try {
      const items = await fetcher();
      log(`${name}: ${items.length} item`);
      candidates.push(...items);
    } catch (error) {
      // Una fonte irraggiungibile non deve fermare il run: si va avanti con le altre.
      log(`${name}: FONTE SALTATA (${error.message})`);
    }
  }

  const published = await loadPublishedUrls();
  const fresh = candidates.filter((c) => !published.has(normalizeUrl(c.url)));
  log(`Candidati: ${candidates.length} totali, ${fresh.length} dopo la deduplica.`);

  if (DRY_RUN) {
    for (const c of fresh) console.log(`  - [${c.source}] ${c.title}\n    ${c.url}`);
    log('Dry-run: nessuna chiamata a Gemini, nessun file scritto.');
    return;
  }
  if (fresh.length === 0) {
    log('Niente di nuovo: nessuna card da proporre.');
    return;
  }

  const picks = await pickCardsWithGemini(fresh);
  const isoDate = new Date().toISOString().slice(0, 10);
  const written = [];
  const usedSlugs = new Set();

  for (const pick of picks.slice(0, MAX_CARDS)) {
    const candidate = fresh[pick.id];
    if (!candidate || !pick.title || !pick.summary || !Array.isArray(pick.tags)) {
      log(`Scelta scartata (id non valido o campi mancanti): ${JSON.stringify(pick)}`);
      continue;
    }
    let slug = slugify(pick.title) || `card-${pick.id}`;
    if (usedSlugs.has(slug)) slug = `${slug}-${pick.id}`;
    usedSlugs.add(slug);
    const fileName = `${isoDate}-${slug}.md`;
    await writeFile(path.join(CONTENT_DIR, fileName), cardMarkdown(pick, candidate, isoDate));
    written.push({ pick, candidate, fileName });
    log(`Card scritta: ${fileName}`);
  }

  if (written.length === 0) {
    log('Gemini non ha prodotto scelte valide: nessuna card scritta.');
    return;
  }
  if (process.env.PR_BODY_PATH) {
    await writeFile(process.env.PR_BODY_PATH, prBody(written));
    log(`Body della PR scritto in ${process.env.PR_BODY_PATH}`);
  }
  log(`Fatto: ${written.length} card proposte.`);
}

main().catch((error) => {
  console.error(`[radar] Errore fatale: ${error.message}`);
  process.exit(1);
});
