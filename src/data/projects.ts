import type { Locale } from '../i18n/ui';
import { asLocale } from '../i18n/ui';
import type { Project } from '../types';
import { profile } from './profile';

/**
 * Regola di riservatezza (il sito è pubblico): i progetti dei clienti sono
 * raccontati ad "altitudine CV" — scopo, ruolo e concetti (GenAI, RAG, IaC).
 * Niente numeri interni, modelli hardware, prodotti specifici o rapporti
 * di subfornitura. I nomi di prodotti/tecnologie stanno solo nella sezione
 * Competenze, non attribuita a un cliente.
 */
export const projects: Record<Locale, Project[]> = {
  it: [
    {
      title: 'DELFI — Piattaforma GenAI di analisi documentale giudiziaria',
      client: 'Agenzia della Pubblica Amministrazione · settore giustizia',
      year: '2026',
      description:
        'Piattaforma di Generative AI su AWS per l’analisi automatica di grandi volumi di documenti giudiziari: estrazione e classificazione delle informazioni con modelli LLM e ricerca semantica (RAG). Braccio operativo del Cloud Lead per l’implementazione tecnica: infrastruttura interamente in Infrastructure as Code con CI/CD e deploy automatizzato end-to-end, servizi di elaborazione documentale (OCR e modelli linguistici su istanze GPU), monitoraggio e troubleshooting in esercizio, dashboard React per la consultazione dei risultati.',
      tags: ['Generative AI', 'RAG', 'AWS', 'IaC', 'CI/CD'],
    },
    {
      title: 'Lab AI & Digital Twin',
      client: 'Ente di alta formazione tecnica (ITS) · fondi PNRR',
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
      title: 'matteocarola.com — questo sito',
      client: 'Progetto personale · open source',
      year: '2026',
      description:
        'Il sito che stai guardando, trattato come un progetto in produzione: Astro 5 con TypeScript strict, Tailwind CSS 4, tema chiaro/scuro senza flash, SEO con Open Graph e sitemap, CI su GitHub Actions e zero JavaScript superfluo. Il codice è pubblico, con README completo.',
      tags: ['Astro', 'TypeScript', 'Tailwind CSS'],
      link: { href: profile.it.repoUrl, label: 'Sorgente' },
    },
  ],
  en: [
    {
      title: 'DELFI — GenAI platform for judicial document analysis',
      client: 'Public administration agency · justice sector',
      year: '2026',
      description:
        'A Generative AI platform on AWS for the automatic analysis of large volumes of judicial documents: information extraction and classification with LLM models and semantic search (RAG). I was the Cloud Lead’s operational arm for the technical implementation: infrastructure fully in Infrastructure as Code with CI/CD and end-to-end automated deployment, document-processing services (OCR and language models on GPU instances), monitoring and troubleshooting in production, and a React dashboard for reviewing the results.',
      tags: ['Generative AI', 'RAG', 'AWS', 'IaC', 'CI/CD'],
    },
    {
      title: 'AI & Digital Twin Lab',
      client: 'Higher technical education institute (ITS) · PNRR funds',
      year: '2026',
      description:
        'A teaching lab for Artificial Intelligence and Digital Twin to train students: a prototype on AWS, then dedicated physical infrastructure with GPU nodes. I was the delivery’s operational lead, working largely on my own: systems setup, running the Kubernetes cluster with an MLOps stack (JupyterHub, MLflow), AI demos for supply-chain optimization and anomaly detection, automated backups with a real restore test, and DNSH compliance documentation and acceptance testing.',
      tags: ['Kubernetes', 'MLOps', 'Digital Twin', 'PNRR'],
    },
    {
      title: 'Cyber security & risk management platform',
      client: 'Company in the defense sector',
      year: '2025',
      description:
        'Front-end of an enterprise platform for cyber-security risk analysis and management. I built multi-step wizard interfaces with conditional logic between steps, complex data tables and role-based access control authentication, working in a team on a React stack structured with the Atomic Design pattern. I also contributed to a standardized, reusable front-end codebase for later projects.',
      tags: ['React', 'TypeScript', 'Redux Toolkit', 'AG Grid', 'Keycloak'],
    },
    {
      title: 'matteocarola.com — this website',
      client: 'Personal project · open source',
      year: '2026',
      description:
        'The site you’re looking at, treated as a production project: Astro 5 with strict TypeScript, Tailwind CSS 4, flash-free light/dark theme, SEO with Open Graph and sitemap, CI on GitHub Actions and zero unnecessary JavaScript. The code is public, with a complete README.',
      tags: ['Astro', 'TypeScript', 'Tailwind CSS'],
      link: { href: profile.en.repoUrl, label: 'Source' },
    },
  ],
};

export const getProjects = (locale?: string): Project[] => projects[asLocale(locale)];
