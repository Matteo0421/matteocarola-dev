import type { Project } from '../types';
import { profile } from './profile';

/**
 * Regola di riservatezza (il sito è pubblico): i progetti dei clienti sono
 * raccontati ad "altitudine CV" — scopo, ruolo e concetti (GenAI, RAG, IaC).
 * Niente numeri interni, modelli hardware, prodotti specifici o rapporti
 * di subfornitura. I nomi di prodotti/tecnologie stanno solo nella sezione
 * Competenze, non attribuita a un cliente.
 */
export const projects: Project[] = [
  {
    title: 'DELFI — Piattaforma GenAI di analisi documentale giudiziaria',
    client: 'ANBSC — Agenzia Nazionale per i Beni Sequestrati e Confiscati',
    year: '2026',
    description:
      'Piattaforma di Generative AI su AWS per l’analisi automatica di grandi volumi di documenti giudiziari: estrazione e classificazione delle informazioni con modelli LLM e ricerca semantica (RAG). Braccio operativo del Cloud Lead per l’implementazione tecnica: infrastruttura interamente in Infrastructure as Code con CI/CD e deploy automatizzato end-to-end, servizi di elaborazione documentale (OCR e modelli linguistici su istanze GPU), monitoraggio e troubleshooting in esercizio, dashboard React per la consultazione dei risultati.',
    tags: ['Generative AI', 'RAG', 'AWS', 'IaC', 'CI/CD'],
  },
  {
    title: 'Lab AI & Digital Twin — Fondazione ITS',
    client: 'Fondazione ITS NewTechSI · finanziato dal PNRR',
    year: '2026',
    description:
      'Laboratorio didattico di Intelligenza Artificiale e Digital Twin per la formazione degli studenti: prototipo su AWS, poi infrastruttura fisica dedicata con nodi GPU. Referente operativo della delivery, condotta in ampia autonomia: messa in opera dei sistemi, esercizio del cluster Kubernetes con stack MLOps (JupyterHub, MLflow), demo AI di ottimizzazione supply chain e anomaly detection, backup automatico con prova di ripristino reale, documentazione di conformità DNSH e collaudo.',
    tags: ['Kubernetes', 'MLOps', 'Digital Twin', 'PNRR'],
  },
  {
    title: 'Piattaforma di cyber security & risk management',
    client: 'Azienda del settore difesa',
    year: '2025',
    description:
      'Front-end di una piattaforma enterprise per l’analisi e la gestione del rischio di cyber security. Ho sviluppato interfacce a procedura guidata (wizard multi-step) con logica condizionale tra i passaggi, tabelle dati complesse e autenticazione con controllo degli accessi basato su ruoli, in team e su uno stack React strutturato secondo il pattern Atomic Design. Ho inoltre contribuito a una base di codice front-end standardizzata e riutilizzabile per i progetti successivi.',
    tags: ['React', 'TypeScript', 'Redux Toolkit', 'AG Grid', 'Keycloak'],
  },
  {
    title: 'matteocarola.dev — questo sito',
    client: 'Progetto personale · open source',
    year: '2026',
    description:
      'Il sito che stai guardando, trattato come un progetto in produzione: Astro 5 con TypeScript strict, Tailwind CSS 4, tema chiaro/scuro senza flash, SEO con Open Graph e sitemap, CI su GitHub Actions e zero JavaScript superfluo. Il codice è pubblico, con README completo.',
    tags: ['Astro', 'TypeScript', 'Tailwind CSS'],
    link: { href: profile.repoUrl, label: 'Sorgente' },
  },
];
