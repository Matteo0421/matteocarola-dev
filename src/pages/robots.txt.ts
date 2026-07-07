import type { APIRoute } from 'astro';

/**
 * robots.txt generato alla build: l'URL della sitemap deriva da `site`
 * in astro.config.ts, così un cambio di dominio non lascia riferimenti vecchi.
 */
export const GET: APIRoute = ({ site }) => {
  const sitemapUrl = new URL('sitemap-index.xml', site);

  const body = ['User-agent: *', 'Allow: /', '', `Sitemap: ${sitemapUrl.href}`, ''].join('\n');

  return new Response(body, {
    headers: { 'Content-Type': 'text/plain; charset=utf-8' },
  });
};
