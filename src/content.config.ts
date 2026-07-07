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

export const collections = { blog };
