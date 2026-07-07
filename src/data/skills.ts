import type { SkillGroup } from '../types';

export const skillGroups: SkillGroup[] = [
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
];
