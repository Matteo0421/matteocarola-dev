import type { EducationItem, Job } from '../types';

export const jobs: Job[] = [
  {
    role: 'Software Engineer',
    company: 'Btinkeeng',
    period: 'Luglio 2024 — presente',
    phases: [
      {
        title: 'Cloud & AI Engineering',
        period: 'da inizio 2026',
        current: true,
        bullets: [
          'Implementazione e conduzione di infrastrutture AWS per piattaforme di Generative AI e laboratori AI/ML, per Pubblica Amministrazione ed enterprise.',
          'Infrastructure as Code con stack CloudFormation modulari; pipeline CI/CD su Bitbucket con autenticazione OIDC, senza credenziali statiche, e deploy completamente automatizzato.',
          'Architetture serverless su AWS (Lambda, Step Functions, API Gateway, DynamoDB, S3, Cognito, CloudFront) e gestione di istanze EC2 GPU per carichi di lavoro AI.',
          'Integrazione di modelli LLM open-source e pipeline RAG con ricerca semantica; tuning di prompt per casi d’uso documentali; valutazione di AWS Bedrock in ottica enterprise.',
          'Esercizio e affidabilità: monitoraggio con CloudWatch, root cause analysis con CloudTrail, risoluzione di bug infrastrutturali, test end-to-end su dati reali.',
        ],
      },
      {
        title: 'Sviluppo web enterprise',
        period: '2024 — 2025',
        bullets: [
          'Sviluppo e manutenzione di applicazioni web enterprise in React e TypeScript, testing funzionale e QA, in team Agile/Scrum (Jira).',
          'Progetti per clienti come Poste Italiane, EAV e Regione Umbria.',
        ],
      },
    ],
  },
];

export const education: EducationItem[] = [
  {
    title: 'Laurea triennale in Ingegneria Informatica',
    org: 'Università Mercatorum',
    period: '2024 — presente',
    badge: 'in corso',
  },
  {
    title: 'AWS Certified AI Practitioner (AIF-C01)',
    org: 'Amazon Web Services',
    period: '2026',
    badge: 'in preparazione',
  },
  {
    title: 'Master Full Stack Web Developer',
    org: 'Boolean — corso intensivo di 700 ore',
    period: 'Gennaio — Luglio 2024',
  },
  {
    title: 'Diploma di Istituto Tecnico — Sistemi Informativi Aziendali',
    org: 'Istituto Giancarlo Siani',
    period: '2017 — 2022',
    badge: '100/100',
  },
];
