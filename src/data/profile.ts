import type { Profile } from '../types';

// TODO(deploy): sostituire TODO-username con lo username GitHub reale.
export const profile: Profile = {
  name: 'Matteo Carola',
  headline: 'Software Engineer | Cloud & AI Engineering | AWS',
  location: 'Napoli, Italia',
  email: 'matteocarola.dev@gmail.com',
  linkedin: 'https://www.linkedin.com/in/matteo-carola-1a4b3229a',
  github: 'https://github.com/TODO-username',
  siteUrl: 'https://matteocarola.dev',
  repoUrl: 'https://github.com/TODO-username/matteocarola-dev',
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
};
