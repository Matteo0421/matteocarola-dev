import type { Locale } from '../i18n/ui';
import { asLocale } from '../i18n/ui';
import type { EducationItem, Job } from '../types';

export const jobs: Record<Locale, Job[]> = {
  it: [
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
  ],
  en: [
    {
      role: 'Software Engineer',
      company: 'Btinkeeng',
      period: 'July 2024 — present',
      phases: [
        {
          title: 'Cloud & AI Engineering',
          period: 'since early 2026',
          current: true,
          bullets: [
            'Implementing and operating AWS infrastructure for Generative AI platforms and AI/ML labs, for public administration and enterprise clients.',
            'Infrastructure as Code with modular CloudFormation stacks; CI/CD pipelines on Bitbucket with OIDC authentication, no static credentials, and fully automated deployment.',
            'Serverless architectures on AWS (Lambda, Step Functions, API Gateway, DynamoDB, S3, Cognito, CloudFront) and management of EC2 GPU instances for AI workloads.',
            'Integration of open-source LLM models and RAG pipelines with semantic search; prompt tuning for document use cases; evaluation of AWS Bedrock from an enterprise perspective.',
            'Operations and reliability: monitoring with CloudWatch, root cause analysis with CloudTrail, fixing infrastructure bugs, end-to-end testing on real data.',
          ],
        },
        {
          title: 'Enterprise web development',
          period: '2024 — 2025',
          bullets: [
            'Development and maintenance of enterprise web applications in React and TypeScript, functional testing and QA, in Agile/Scrum teams (Jira).',
            'Projects for clients such as Poste Italiane, EAV and the Umbria Region.',
          ],
        },
      ],
    },
  ],
};

export const education: Record<Locale, EducationItem[]> = {
  it: [
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
  ],
  en: [
    {
      title: 'BSc in Computer Engineering',
      org: 'Università Mercatorum',
      period: '2024 — present',
      badge: 'in progress',
    },
    {
      title: 'AWS Certified AI Practitioner (AIF-C01)',
      org: 'Amazon Web Services',
      period: '2026',
      badge: 'in preparation',
    },
    {
      title: 'Full Stack Web Developer Master',
      org: 'Boolean — 700-hour intensive course',
      period: 'January — July 2024',
    },
    {
      title: 'Technical High School Diploma — Business Information Systems',
      org: 'Istituto Giancarlo Siani',
      period: '2017 — 2022',
      badge: '100/100',
    },
  ],
};

export const getJobs = (locale?: string): Job[] => jobs[asLocale(locale)];
export const getEducation = (locale?: string): EducationItem[] => education[asLocale(locale)];
