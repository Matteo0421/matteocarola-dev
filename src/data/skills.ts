import type { Locale } from '../i18n/ui';
import { asLocale } from '../i18n/ui';
import type { SkillGroup } from '../types';

export const skillGroups: Record<Locale, SkillGroup[]> = {
  it: [
    {
      title: 'Cloud & DevOps',
      items: [
        'AWS (Lambda, Step Functions, API Gateway, S3, DynamoDB, EC2/GPU, CloudFront, Cognito, OpenSearch, CloudWatch, CloudTrail, IAM, SSM)',
        'Infrastructure as Code (CloudFormation)',
        'CI/CD (Bitbucket Pipelines, OIDC)',
        'Linux (Ubuntu Server)',
        'Kubernetes (k3s)',
        'Tailscale',
      ],
    },
    {
      title: 'AI & Generative AI',
      items: [
        'LLM open-source (Mistral, Ollama)',
        'RAG e ricerca semantica (OpenSearch, embedding)',
        'Prompt engineering',
        'MLflow',
        'JupyterHub',
        'scikit-learn (fondamenti)',
        'AWS Bedrock (valutazione architetturale)',
        'AI-assisted development (agenti di coding)',
      ],
    },
    {
      title: 'Sviluppo',
      items: [
        'TypeScript',
        'JavaScript',
        'React',
        'Python (Lambda, scripting, FastAPI)',
        'REST API',
        'Git',
        'Bitbucket',
        'GitHub',
      ],
    },
    {
      title: 'Metodologie & Delivery',
      items: [
        'Agile / Scrum',
        'Jira',
        'Gestione operativa di progetto',
        'Incident management e root cause analysis',
        'Documentazione tecnica, di collaudo e di conformità DNSH (PA / PNRR)',
      ],
    },
  ],
  en: [
    {
      title: 'Cloud & DevOps',
      items: [
        'AWS (Lambda, Step Functions, API Gateway, S3, DynamoDB, EC2/GPU, CloudFront, Cognito, OpenSearch, CloudWatch, CloudTrail, IAM, SSM)',
        'Infrastructure as Code (CloudFormation)',
        'CI/CD (Bitbucket Pipelines, OIDC)',
        'Linux (Ubuntu Server)',
        'Kubernetes (k3s)',
        'Tailscale',
      ],
    },
    {
      title: 'AI & Generative AI',
      items: [
        'Open-source LLMs (Mistral, Ollama)',
        'RAG and semantic search (OpenSearch, embeddings)',
        'Prompt engineering',
        'MLflow',
        'JupyterHub',
        'scikit-learn (fundamentals)',
        'AWS Bedrock (architectural evaluation)',
        'AI-assisted development (coding agents)',
      ],
    },
    {
      title: 'Development',
      items: [
        'TypeScript',
        'JavaScript',
        'React',
        'Python (Lambda, scripting, FastAPI)',
        'REST APIs',
        'Git',
        'Bitbucket',
        'GitHub',
      ],
    },
    {
      title: 'Methodology & Delivery',
      items: [
        'Agile / Scrum',
        'Jira',
        'Operational project management',
        'Incident management and root cause analysis',
        'Technical, acceptance and DNSH-compliance documentation (public sector / PNRR)',
      ],
    },
  ],
};

export const getSkillGroups = (locale?: string): SkillGroup[] => skillGroups[asLocale(locale)];
