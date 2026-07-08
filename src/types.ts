export interface Profile {
  name: string;
  headline: string;
  location: string;
  email: string;
  linkedin: string;
  github: string;
  repoUrl: string;
  photo: string;
  photoAlt: string;
  about: string[];
  facts: Fact[];
}

export interface Fact {
  label: string;
  value: string;
}

export interface SkillGroup {
  title: string;
  items: string[];
}

export interface Project {
  title: string;
  client: string;
  year: string;
  description: string;
  tags: string[];
  link?: { href: string; label: string };
}

export interface Phase {
  title: string;
  period: string;
  current?: boolean;
  bullets: string[];
}

export interface Job {
  role: string;
  company: string;
  period: string;
  phases: Phase[];
}

export interface EducationItem {
  title: string;
  org: string;
  period: string;
  badge?: string;
}
