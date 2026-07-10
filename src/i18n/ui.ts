/**
 * Stringhe dell'interfaccia, separate dai contenuti (src/data).
 *
 * Due lingue affiancate nello stesso file: `it` e `en`, entrambe di tipo
 * `Dictionary` (se una chiave manca in una lingua, il build fallisce).
 * I componenti scelgono il dizionario con `useTranslations(Astro.currentLocale)`.
 */
export type Locale = 'it' | 'en';

export interface Dictionary {
  meta: { title: string; description: string };
  nav: { href: string; label: string }[];
  hero: { kicker: string; lede: string; ctaEmail: string };
  sections: {
    about: string;
    skills: string;
    projects: string;
    experience: string;
    education: string;
    contact: string;
  };
  contact: { invite: string };
  showcase: {
    title: string;
    intro: string;
    chatTitle: string;
    chatDescription: string;
    chatCta: string;
    radarTitle: string;
    radarDescription: string;
    radarCta: string;
    readPost: string;
  };
  blog: {
    title: string;
    metaTitle: string;
    metaDescription: string;
    intro: string;
    empty: string;
    backToBlog: string;
  };
  radar: {
    title: string;
    metaTitle: string;
    metaDescription: string;
    intro: string;
    howItWorks: string;
    empty: string;
    noteLabel: string;
    sourceLabel: string;
  };
  a11y: {
    skipToContent: string;
    toggleTheme: string;
    openMenu: string;
    mainNav: string;
    switchLanguage: string;
  };
  chat: {
    launcherLabel: string;
    title: string;
    intro: string;
    placeholder: string;
    send: string;
    thinking: string;
    close: string;
    privacyNote: string;
    errorGeneric: string;
    errorRateLimited: string;
    errorQuota: string;
  };
  footer: { madeWith: string; source: string; noCookies: string; privacy: string };
  labels: { current: string; client: string; atAGlance: string; year: string };
}

export const it: Dictionary = {
  meta: {
    title: 'Matteo Carola — Software Engineer · Cloud & AI Engineering · AWS',
    description:
      'Software Engineer a Napoli. Infrastrutture cloud e piattaforme di Generative AI su AWS: IaC, serverless, CI/CD, RAG. Progetti, competenze e contatti.',
  },
  // Href assoluti (/#...): la nav funziona anche dalle pagine interne come /radar.
  nav: [
    { href: '/#chi-sono', label: 'Chi sono' },
    { href: '/#competenze', label: 'Competenze' },
    { href: '/#progetti', label: 'Progetti' },
    { href: '/#esperienza', label: 'Esperienza' },
    { href: '/#contatti', label: 'Contatti' },
    { href: '/radar', label: 'Radar' },
    { href: '/blog', label: 'Blog' },
  ],
  hero: {
    kicker: 'Software Engineer — Cloud & AI Engineering · AWS',
    lede: 'Mi occupo di infrastrutture cloud e piattaforme di Generative AI su AWS: Infrastructure as Code, architetture serverless, CI/CD, integrazione di modelli LLM (RAG, prompt engineering) e conduzione operativa degli ambienti.',
    ctaEmail: 'Scrivimi',
  },
  sections: {
    about: 'Chi sono',
    skills: 'Competenze',
    projects: 'Progetti in evidenza',
    experience: 'Esperienza',
    education: 'Formazione e certificazioni',
    contact: 'Contatti',
  },
  contact: {
    invite: 'Il modo più rapido per raggiungermi è una mail. Rispondo anche su LinkedIn.',
  },
  showcase: {
    title: 'Dietro le quinte',
    intro:
      'Questo sito non è solo una vetrina: è un piccolo laboratorio GenAI in produzione. Due cose che puoi provare adesso, costruite da zero e a costo zero.',
    chatTitle: 'Chiedi a Matteo — chatbot RAG',
    chatDescription:
      'Un assistente che risponde alle domande su di me usando solo i contenuti di questo sito: embeddings precalcolati, ricerca semantica in una funzione serverless e un LLM con guardrail. Niente vector DB, niente costi.',
    chatCta: 'Provalo ora',
    radarTitle: 'Tech Radar — pipeline semi-automatica',
    radarDescription:
      'Una pipeline GenAI che due volte a settimana pesca le novità su cloud e AI dalle fonti, le sintetizza con un LLM e apre una Pull Request. Io approvo, scarto o aggiungo una nota: niente si pubblica da solo.',
    radarCta: 'Vai al radar',
    readPost: 'Come l’ho costruito',
  },
  blog: {
    title: 'Blog',
    metaTitle: 'Blog — Matteo Carola',
    metaDescription:
      'Note tecniche di un Software Engineer Cloud & AI: come sono costruiti il chatbot RAG e il Tech Radar di questo sito, e altri appunti dal campo.',
    intro:
      'Note tecniche dal campo: come sono fatte le cose che costruisco, decisioni e lezioni imparate.',
    empty: 'I primi post sono in arrivo.',
    backToBlog: 'Tutti i post',
  },
  radar: {
    title: 'Tech Radar',
    metaTitle: 'Tech Radar — Matteo Carola',
    metaDescription:
      'Segnalazioni brevi su cloud, AWS e AI: selezionate da una pipeline open source (GitHub Actions + LLM) e approvate una a una.',
    intro:
      'Novità su cloud, AWS e AI che ritengo valga la pena conoscere: poche card, brevi, sempre con il link alla fonte.',
    howItWorks:
      'Come funziona: una pipeline open source (GitHub Actions + Gemini) pesca le novità dalle fonti, le sintetizza e apre una Pull Request; io approvo, scarto o aggiungo una nota. Niente si pubblica da solo.',
    empty: 'Le prime segnalazioni sono in arrivo: il radar è appena stato acceso.',
    noteLabel: 'La mia nota',
    sourceLabel: 'Fonte',
  },
  a11y: {
    skipToContent: 'Salta al contenuto',
    toggleTheme: 'Cambia tema (chiaro/scuro)',
    openMenu: 'Apri il menu di navigazione',
    mainNav: 'Navigazione principale',
    switchLanguage: 'Passa all’inglese',
  },
  chat: {
    launcherLabel: 'Apri la chat "Chiedi a Matteo"',
    title: 'Chiedi a Matteo',
    intro:
      'Sono un piccolo RAG indicizzato su tutto quello che Matteo ha costruito — compreso me stesso. Chiedimi dei suoi progetti, dello stack che usa o di cosa sa fare.',
    placeholder: 'Fai una domanda su Matteo…',
    send: 'Invia',
    thinking: 'Sto cercando la risposta…',
    close: 'Chiudi la chat',
    privacyNote: 'Le risposte sono generate con Google Gemini. Non inserire dati personali.',
    errorGeneric: 'Qualcosa è andato storto. Riprova tra poco.',
    errorRateLimited: 'Hai fatto molte domande in poco tempo: aspetta un momento e riprova.',
    errorQuota:
      'Il servizio ha raggiunto il limite gratuito di oggi. Riprova più tardi o scrivi a Matteo via email.',
  },
  footer: {
    madeWith: 'Fatto con',
    source: 'Sorgente',
    noCookies: 'Nessun cookie, nessun tracker',
    privacy: 'Privacy',
  },
  labels: {
    current: 'attuale',
    client: 'Cliente',
    atAGlance: 'In breve',
    year: 'Anno',
  },
};

export const en: Dictionary = {
  meta: {
    title: 'Matteo Carola — Software Engineer · Cloud & AI Engineering · AWS',
    description:
      'Software Engineer based in Naples, Italy. Cloud infrastructure and Generative AI platforms on AWS: IaC, serverless, CI/CD, RAG. Projects, skills and contacts.',
  },
  nav: [
    { href: '/en/#chi-sono', label: 'About' },
    { href: '/en/#competenze', label: 'Skills' },
    { href: '/en/#progetti', label: 'Projects' },
    { href: '/en/#esperienza', label: 'Experience' },
    { href: '/en/#contatti', label: 'Contact' },
    { href: '/en/radar', label: 'Radar' },
    { href: '/en/blog', label: 'Blog' },
  ],
  hero: {
    kicker: 'Software Engineer — Cloud & AI Engineering · AWS',
    lede: 'I build cloud infrastructure and Generative AI platforms on AWS: Infrastructure as Code, serverless architectures, CI/CD, LLM integration (RAG, prompt engineering) and hands-on operation of production environments.',
    ctaEmail: 'Email me',
  },
  sections: {
    about: 'About',
    skills: 'Skills',
    projects: 'Featured projects',
    experience: 'Experience',
    education: 'Education & certifications',
    contact: 'Contact',
  },
  contact: {
    invite: 'The quickest way to reach me is by email. I also reply on LinkedIn.',
  },
  showcase: {
    title: 'Behind the scenes',
    intro:
      'This site isn’t just a portfolio: it’s a small GenAI lab running in production. Two things you can try right now, built from scratch at zero cost.',
    chatTitle: 'Ask Matteo — RAG chatbot',
    chatDescription:
      'An assistant that answers questions about me using only the content of this site: precomputed embeddings, semantic search in a serverless function and an LLM with guardrails. No vector DB, no costs.',
    chatCta: 'Try it now',
    radarTitle: 'Tech Radar — semi-automatic pipeline',
    radarDescription:
      'A GenAI pipeline that twice a week pulls cloud and AI news from the sources, summarizes it with an LLM and opens a Pull Request. I approve, discard or add a note: nothing publishes itself.',
    radarCta: 'Go to the radar',
    readPost: 'How I built it',
  },
  blog: {
    title: 'Blog',
    metaTitle: 'Blog — Matteo Carola',
    metaDescription:
      'Technical notes from a Cloud & AI Software Engineer: how this site’s RAG chatbot and Tech Radar are built, and other field notes.',
    intro:
      'Technical notes from the field: how the things I build actually work, decisions and lessons learned.',
    empty: 'The first posts are on their way.',
    backToBlog: 'All posts',
  },
  radar: {
    title: 'Tech Radar',
    metaTitle: 'Tech Radar — Matteo Carola',
    metaDescription:
      'Short takes on cloud, AWS and AI: picked by an open-source pipeline (GitHub Actions + LLM) and approved one by one.',
    intro:
      'News on cloud, AWS and AI I think is worth knowing: a few short cards, always with a link to the source.',
    howItWorks:
      'How it works: an open-source pipeline (GitHub Actions + Gemini) pulls news from the sources, summarizes it and opens a Pull Request; I approve, discard or add a note. Nothing publishes itself. (Cards are written in Italian.)',
    empty: 'The first picks are on their way: the radar has just been switched on.',
    noteLabel: 'My note',
    sourceLabel: 'Source',
  },
  a11y: {
    skipToContent: 'Skip to content',
    toggleTheme: 'Toggle theme (light/dark)',
    openMenu: 'Open navigation menu',
    mainNav: 'Main navigation',
    switchLanguage: 'Switch to Italian',
  },
  chat: {
    launcherLabel: 'Open the "Ask Matteo" chat',
    title: 'Ask Matteo',
    intro:
      "I'm a small RAG indexed on everything Matteo has built — including myself. Ask me about his projects, the stack he uses, or what he can do.",
    placeholder: 'Ask a question about Matteo…',
    send: 'Send',
    thinking: 'Looking for the answer…',
    close: 'Close chat',
    privacyNote: "Answers are generated with Google Gemini. Don't enter personal data.",
    errorGeneric: 'Something went wrong. Please try again shortly.',
    errorRateLimited: 'You asked a lot in a short time: wait a moment and try again.',
    errorQuota: "Today's free limit has been reached. Try again later, or email Matteo directly.",
  },
  footer: {
    madeWith: 'Built with',
    source: 'Source',
    noCookies: 'No cookies, no trackers',
    privacy: 'Privacy',
  },
  labels: {
    current: 'current',
    client: 'Client',
    atAGlance: 'At a glance',
    year: 'Year',
  },
};

const dictionaries: Record<Locale, Dictionary> = { it, en };

/** Normalizza un valore di locale (es. Astro.currentLocale) a un Locale valido. */
export function asLocale(locale?: string): Locale {
  return locale === 'en' ? 'en' : 'it';
}

/** Dizionario per la lingua data (fallback: italiano). */
export function useTranslations(locale?: string): Dictionary {
  return dictionaries[asLocale(locale)];
}

/**
 * Riscrive un pathname per la lingua target. Il default (it) è senza prefisso,
 * l'inglese vive sotto /en/. Usato per il toggle lingua e gli hreflang.
 *   localizedPath('/radar', 'en')     → '/en/radar'
 *   localizedPath('/en/radar', 'it')  → '/radar'
 *   localizedPath('/en/', 'it')       → '/'
 */
export function localizedPath(pathname: string, target: Locale): string {
  const bare = pathname.replace(/^\/en(?=\/|$)/, '') || '/';
  if (target === 'it') return bare;
  return bare === '/' ? '/en/' : `/en${bare}`;
}
