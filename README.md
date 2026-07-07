# matteocarola.dev

> Sito personale di **Matteo Carola** — Software Engineer | Cloud & AI Engineering | AWS.
> One-page statica, veloce e accessibile. Il repository è esso stesso parte del portfolio.

[![CI](https://github.com/Matteo0421/matteocarola-dev/actions/workflows/ci.yml/badge.svg)](https://github.com/Matteo0421/matteocarola-dev/actions/workflows/ci.yml)
[![Astro](https://img.shields.io/badge/Astro-5-blueviolet)](https://astro.build)
[![TypeScript](https://img.shields.io/badge/TypeScript-strict-blue)](https://www.typescriptlang.org/)
[![License: MIT](https://img.shields.io/badge/License-MIT-green.svg)](./LICENSE)

**Live:** [matteocarola-dev.vercel.app](https://matteocarola-dev.vercel.app) — dominio `matteocarola.dev` in arrivo

---

## Indice

- [Stack e scelte tecniche](#stack-e-scelte-tecniche)
- [Avvio rapido](#avvio-rapido)
- [Comandi](#comandi)
- [Struttura del progetto](#struttura-del-progetto)
- [Dove si modificano i contenuti](#dove-si-modificano-i-contenuti)
- [Tema chiaro/scuro](#tema-chiaroscuro)
- [Internazionalizzazione (i18n)](#internazionalizzazione-i18n)
- [Blog (predisposto)](#blog-predisposto)
- [SEO](#seo)
- [Accessibilità e performance](#accessibilità-e-performance)
- [Asset generati](#asset-generati)
- [CI](#ci)
- [Deploy](#deploy)
- [Riservatezza dei contenuti](#riservatezza-dei-contenuti)
- [Licenza](#licenza)

## Stack e scelte tecniche

| Tecnologia                                     | Perché                                                                                                                                                                                      |
| ---------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [Astro 5](https://astro.build)                 | Sito statico che spedisce **zero JavaScript di default**: l'unico JS in pagina è il toggle del tema (~1 KB inline). Content collections native per il futuro blog e i18n routing integrato. |
| TypeScript (strict)                            | `astro/tsconfigs/strict`: contenuti e componenti tipizzati end-to-end.                                                                                                                      |
| [Tailwind CSS 4](https://tailwindcss.com)      | Via `@tailwindcss/vite`. I design token del tema sono CSS custom properties (`--bg`, `--ink`, `--accent`, …) mappate su utility con `@theme inline`.                                        |
| [@fontsource-variable](https://fontsource.org) | Inter + Space Grotesk self-hosted: nessuna richiesta a CDN esterne, niente layout shift da font remoti.                                                                                     |

Perché non Next.js? Per una one-page statica non servono SSR, server actions o runtime client: Astro produce HTML puro e ottiene punteggi Lighthouse alti _per costruzione_, non per ottimizzazione a posteriori.

## Avvio rapido

Requisiti: **Node.js ≥ 20** (consigliata la 22 LTS) e npm.

```bash
git clone https://github.com/Matteo0421/matteocarola-dev.git
cd matteocarola-dev
npm install
npm run dev        # → http://localhost:4321
```

## Comandi

| Comando                | Effetto                                                                |
| ---------------------- | ---------------------------------------------------------------------- |
| `npm run dev`          | Server di sviluppo su `localhost:4321` con HMR                         |
| `npm run build`        | Build di produzione in `dist/` (include la sitemap)                    |
| `npm run preview`      | Serve la build di produzione in locale                                 |
| `npm run check`        | Typecheck di `.astro` e `.ts` (`astro check`)                          |
| `npm run lint`         | ESLint (flat config, `typescript-eslint` + `eslint-plugin-astro`)      |
| `npm run format`       | Prettier su tutto il repo (plugin Astro + ordinamento classi Tailwind) |
| `npm run format:check` | Verifica formattazione senza scrivere (usato in CI)                    |

## Struttura del progetto

```
├── .github/workflows/ci.yml    # CI: typecheck, lint, format, build
├── public/                     # asset statici serviti as-is
│   ├── favicon.svg             # monogramma, si adatta a light/dark
│   └── og.png                  # immagine Open Graph 1200×630
├── scripts/
│   └── generate-og.ps1         # rigenera og.png e apple-touch-icon.png
└── src/
    ├── components/             # una sezione = un componente .astro
    ├── content.config.ts       # collection del blog (vuota, predisposta)
    ├── content/blog/           # futuri post in Markdown
    ├── data/                   # ★ contenuti tipizzati (unica fonte)
    │   ├── profile.ts          #   anagrafica pubblica, about, contatti
    │   ├── skills.ts           #   competenze raggruppate
    │   ├── projects.ts         #   progetti in evidenza
    │   └── experience.ts       #   esperienza e formazione
    ├── i18n/ui.ts              # ★ stringhe UI (predisposto per l'inglese)
    ├── layouts/Base.astro      # <html>, tema no-flash, SEO
    ├── pages/
    │   ├── index.astro         # composizione della one-page
    │   └── robots.txt.ts       # robots.txt generato dalla config `site`
    ├── styles/global.css       # design token + Tailwind
    └── types.ts                # tipi condivisi dei contenuti
```

## Dove si modificano i contenuti

I testi non vivono nei componenti: sono **dati tipizzati**.

- **Contenuti** (progetti, esperienza, competenze, bio) → `src/data/*.ts`. Il compilatore segnala subito un campo mancante o sbagliato.
- **Stringhe UI** (navigazione, etichette, meta tag) → `src/i18n/ui.ts`.

Esempio: per aggiungere un progetto basta un nuovo oggetto `Project` in `src/data/projects.ts` — nessun markup da toccare.

## Tema chiaro/scuro

- Il tema è `data-theme="light|dark"` su `<html>`; i token in `global.css` cambiano di conseguenza (`:root` / `[data-theme='dark']`).
- Uno script inline nel `<head>` legge `localStorage` (fallback: `prefers-color-scheme`) **prima del primo paint**: nessun flash del tema sbagliato.
- Il toggle nell'header persiste la scelta e aggiorna `aria-pressed`.
- La variante Tailwind `dark:` è ridefinita con `@custom-variant` per seguire `data-theme` invece del solo media query.

## Internazionalizzazione (i18n)

Il sito è in italiano, ma è predisposto per l'inglese:

1. i testi UI sono già centralizzati in `src/i18n/ui.ts` con un tipo `Dictionary`;
2. per l'inglese: aggiungere `export const en: Dictionary`, tradurre i dati in `src/data/` (es. campi per locale) e attivare l'[i18n routing di Astro](https://docs.astro.build/en/guides/internationalization/) (`defaultLocale: 'it'`, `locales: ['it', 'en']`) con le pagine sotto `src/pages/en/`.

## Blog (predisposto)

La collection `blog` è già definita in `src/content.config.ts` (loader `glob`, schema Zod con `title`, `description`, `pubDate`, `lang`, `draft`). Per attivare il blog:

1. creare un post: `src/content/blog/primo-post.md` con il frontmatter dello schema;
2. creare `src/pages/blog/index.astro` (elenco) e `src/pages/blog/[id].astro` (dettaglio) usando `getCollection('blog')`;
3. la sitemap si aggiorna da sola alla build.

## SEO

- Meta `title`/`description`, canonical, Open Graph e Twitter card in [`Seo.astro`](src/components/Seo.astro)
- JSON-LD `Person` (schema.org)
- Sitemap generata da `@astrojs/sitemap` (`sitemap-index.xml`) e referenziata da un `robots.txt` costruito alla build sulla config `site` ([endpoint](src/pages/robots.txt.ts))
- `og.png` 1200×630 per le anteprime social

## Accessibilità e performance

- HTML semantico: landmark, un solo `h1`, gerarchia dei titoli, `aria-label` su link/pulsanti icona
- Skip link "Salta al contenuto", focus ring visibile, `prefers-reduced-motion` rispettato
- Contrasto AA verificato su entrambi i temi
- Font self-hosted (woff2 variabili), niente richieste esterne, niente cookie né tracker
- Target: Lighthouse ≥ 95 su tutte le categorie

## Asset generati

`public/og.png` e `public/apple-touch-icon.png` sono generati da [`scripts/generate-og.ps1`](scripts/generate-og.ps1) (GDI+, solo Windows) e committati: la build non dipende dallo script.

```powershell
powershell -ExecutionPolicy Bypass -File scripts/generate-og.ps1
```

## CI

Ogni push/PR su `main` esegue: `astro check` → `eslint` → `prettier --check` → `astro build` ([workflow](.github/workflows/ci.yml)).

## Deploy

Deploy su **Vercel** (piano hobby, gratuito), in due fasi.

**Fase 1 — online senza dominio (attuale)**

1. push del repo su GitHub;
2. su [vercel.com](https://vercel.com) → _Add New… → Project_ → importare `matteocarola-dev`: Astro viene riconosciuto da solo (build `astro build`, output `dist/`);
3. il sito è servito su `https://matteocarola-dev.vercel.app`.

**Fase 2 — dominio custom (quando si vuole)**

1. acquistare `matteocarola.dev` (registrar consigliati: Cloudflare Registrar o Porkbun, ~10–13 €/anno a listino);
2. Vercel → _Settings → Domains_ → aggiungere il dominio e seguire le istruzioni DNS;
3. aggiornare `site` in [`astro.config.ts`](astro.config.ts): è **l'unico punto da toccare** — canonical, Open Graph, sitemap e robots.txt derivano tutti da lì.

Nota sul TLD `.dev`: è in HSTS preload, funziona **solo in HTTPS** — su Vercel il certificato è automatico.

## Riservatezza dei contenuti

Il sito è pubblico. Regole applicate ai contenuti:

- contatti limitati a email, LinkedIn e GitHub — niente telefono né altri dati personali;
- i progetti per clienti sono raccontati ad "altitudine CV": scopo, ruolo e concetti (GenAI, RAG, IaC), senza numeri interni, dettagli hardware o prodotti specifici attribuiti a un cliente;
- nomi di tecnologie solo nella sezione Competenze, non attribuita.

Checklist completa in `src/data/projects.ts` (commento in testa al file).

## Licenza

Codice sotto licenza [MIT](./LICENSE). I testi e i contenuti personali (bio, progetti, immagini) sono © Matteo Carola — riusali solo con permesso.
