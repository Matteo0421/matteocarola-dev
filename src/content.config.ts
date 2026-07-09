import { glob } from 'astro/loaders';
import { defineCollection, z } from 'astro:content';

/**
 * Collection per il futuro blog: oggi è vuota di proposito.
 * Per attivarla: aggiungere file .md in src/content/blog/ e creare
 * le pagine src/pages/blog/index.astro e src/pages/blog/[id].astro.
 */
const blog = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/blog' }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    pubDate: z.coerce.date(),
    lang: z.enum(['it', 'en']).default('it'),
    draft: z.boolean().default(false),
  }),
});

/**
 * Tech Radar: card brevi su novità cloud/AI, generate dalla pipeline
 * semi-automatica (scripts/radar/generate.mjs + .github/workflows/radar.yml)
 * e pubblicate solo dopo l'approvazione della Pull Request.
 * Il body del file è la nota personale (opzionale) aggiunta a mano in fase di review.
 */
const radar = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/radar' }),
  schema: z.object({
    title: z.string(),
    summary: z.string(),
    tags: z.array(z.string()).min(1).max(5),
    sourceName: z.string(),
    sourceUrl: z.string().url(),
    pubDate: z.coerce.date(),
  }),
});

export const collections = { blog, radar };
