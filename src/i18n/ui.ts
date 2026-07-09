/**
 * Stringhe dell'interfaccia, separate dai contenuti (src/data).
 *
 * Per la versione inglese: aggiungere `export const en: Dictionary = { ... }`
 * e selezionare il dizionario in base alla lingua della pagina
 * (con l'i18n routing di Astro: https://docs.astro.build/en/guides/internationalization/).
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
  };
  footer: { madeWith: string; source: string; noCookies: string };
  labels: { current: string; client: string };
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
  },
  footer: {
    madeWith: 'Fatto con',
    source: 'Sorgente',
    noCookies: 'Nessun cookie, nessun tracker',
  },
  labels: {
    current: 'attuale',
    client: 'Cliente',
  },
};

/** Dizionario attivo. Con più lingue, risolverlo dalla locale corrente. */
export const ui = it;
