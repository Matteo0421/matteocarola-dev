import type { Locale } from '../i18n/ui';
import { asLocale } from '../i18n/ui';
import type { Profile } from '../types';

export const profile: Record<Locale, Profile> = {
  it: {
    name: 'Matteo Carola',
    headline: 'Software Engineer | Cloud & AI Engineering | AWS',
    location: 'Napoli, Italia',
    email: 'matteocarola.dev@gmail.com',
    linkedin: 'https://www.linkedin.com/in/matteo-carola-1a4b3229a',
    github: 'https://github.com/Matteo0421',
    repoUrl: 'https://github.com/Matteo0421/matteocarola-dev',
    photo: '/matteo-carola.jpg',
    photoAlt: 'Ritratto di Matteo Carola, Software Engineer',
    about: [
      'Sono un Software Engineer con due anni di esperienza su progetti enterprise e per la Pubblica Amministrazione, cresciuto dallo sviluppo di applicazioni web alla realizzazione di soluzioni cloud e di Intelligenza Artificiale su AWS.',
      'Ho implementato in prima persona l’infrastruttura AWS di DELFI, una piattaforma di Generative AI per l’analisi di documenti giudiziari, lavorando a stretto contatto con il Cloud Lead; e ho realizzato in ampia autonomia il laboratorio AI & Digital Twin di una fondazione ITS finanziato dal PNRR, dalla messa in opera dei sistemi fino al collaudo.',
      'Integro quotidianamente strumenti di AI-assisted development nel mio ciclo di lavoro. In parallelo proseguo la laurea triennale in Ingegneria Informatica e preparo la certificazione AWS Certified AI Practitioner (AIF-C01).',
    ],
    facts: [
      { label: 'Ruolo', value: 'Software Engineer @ Btinkeeng' },
      { label: 'Base', value: 'Napoli, Italia' },
      { label: 'Focus', value: 'Cloud & Generative AI su AWS' },
      { label: 'Studi', value: 'Ingegneria Informatica (in corso)' },
      { label: 'Certificazione', value: 'AWS AI Practitioner — in preparazione' },
    ],
  },
  en: {
    name: 'Matteo Carola',
    headline: 'Software Engineer | Cloud & AI Engineering | AWS',
    location: 'Naples, Italy',
    email: 'matteocarola.dev@gmail.com',
    linkedin: 'https://www.linkedin.com/in/matteo-carola-1a4b3229a',
    github: 'https://github.com/Matteo0421',
    repoUrl: 'https://github.com/Matteo0421/matteocarola-dev',
    photo: '/matteo-carola.jpg',
    photoAlt: 'Portrait of Matteo Carola, Software Engineer',
    about: [
      'I’m a Software Engineer with two years of experience on enterprise and public-sector projects, having grown from web application development to building cloud and Artificial Intelligence solutions on AWS.',
      'I personally implemented the AWS infrastructure of DELFI, a Generative AI platform for the analysis of judicial documents, working closely with the Cloud Lead; and I delivered, largely on my own, the AI & Digital Twin lab of an ITS foundation funded by the PNRR programme, from systems setup all the way to acceptance testing.',
      'I use AI-assisted development tools in my daily workflow. In parallel I’m completing my bachelor’s degree in Computer Engineering and preparing for the AWS Certified AI Practitioner (AIF-C01) certification.',
    ],
    facts: [
      { label: 'Role', value: 'Software Engineer @ Btinkeeng' },
      { label: 'Based in', value: 'Naples, Italy' },
      { label: 'Focus', value: 'Cloud & Generative AI on AWS' },
      { label: 'Studies', value: 'Computer Engineering (in progress)' },
      { label: 'Certification', value: 'AWS AI Practitioner — in preparation' },
    ],
  },
};

export const getProfile = (locale?: string): Profile => profile[asLocale(locale)];
