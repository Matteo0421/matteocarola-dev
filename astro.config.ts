import sitemap from '@astrojs/sitemap';
import tailwindcss from '@tailwindcss/vite';
import { defineConfig } from 'astro/config';

// https://astro.build/config
export default defineConfig({
  // Unico punto in cui vive l'URL pubblico: canonical, Open Graph, sitemap
  // e robots.txt derivano tutti da qui.
  site: 'https://matteocarola.com',
  integrations: [sitemap()],
  vite: {
    plugins: [tailwindcss()],
  },
});
