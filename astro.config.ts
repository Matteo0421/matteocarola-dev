import sitemap from '@astrojs/sitemap';
import vercel from '@astrojs/vercel';
import tailwindcss from '@tailwindcss/vite';
import { defineConfig } from 'astro/config';

// https://astro.build/config
export default defineConfig({
  // Unico punto in cui vive l'URL pubblico: canonical, Open Graph, sitemap
  // e robots.txt derivano tutti da qui.
  site: 'https://matteocarola.com',
  // Italiano sull'apex (URL invariati, già indicizzati), inglese sotto /en/.
  // prefixDefaultLocale:false → il default (it) NON prende il prefisso.
  i18n: {
    defaultLocale: 'it',
    locales: ['it', 'en'],
    routing: { prefixDefaultLocale: false },
  },
  // L'output resta statico: l'adapter serve SOLO alle route che optano out
  // dal prerender (oggi solo /api/chat, l'endpoint del chatbot RAG).
  adapter: vercel({ maxDuration: 30 }),
  integrations: [sitemap()],
  vite: {
    plugins: [tailwindcss()],
  },
});
