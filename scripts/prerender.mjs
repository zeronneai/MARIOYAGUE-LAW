/**
 * Prerender: después de `vite build`, arma el HTML completo de cada página (inglés y español)
 * con su <head> propio. Así Google, ChatGPT, Perplexity y Claude leen todo el contenido
 * aunque no corran JavaScript, y la página se ve al instante antes de que cargue React.
 */
import { readFileSync, writeFileSync, mkdirSync, rmSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const dist = join(root, 'dist');
const SITE = 'https://www.marioyaguelaw.com';
const { render, ROUTES } = await import(pathToFileURL(join(root, 'dist-ssr', 'entry-server.js')).href);

const template = readFileSync(join(dist, 'index.html'), 'utf8');
const esc = (s) => String(s).replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;');
const setMeta = (html, re, tag) => (re.test(html) ? html.replace(re, tag) : html.replace('</head>', `    ${tag}\n  </head>`));
const esPath = (p) => (p === '/' ? '/es' : `/es${p}`);

let count = 0;
for (const route of ROUTES) {
  for (const lang of ['en', 'es']) {
    const url = lang === 'es' ? esPath(route) : route;
    const { html: body, seo } = render(url);
    const canonical = seo.canonical ?? `${SITE}${url === '/' ? '/' : url}`;
    let html = template.replace('<div id="root"></div>', `<div id="root">${body}</div>`);
    html = html.replace(/<html lang="[^"]*">/, `<html lang="${lang}">`);
    if (seo.title) html = html.replace(/<title>[\s\S]*?<\/title>/, `<title>${esc(seo.title)}</title>`);
    if (seo.description) {
      html = setMeta(html, /<meta name="description"[^>]*>/, `<meta name="description" content="${esc(seo.description)}">`);
      html = setMeta(html, /<meta property="og:description"[^>]*>/, `<meta property="og:description" content="${esc(seo.description)}">`);
      html = setMeta(html, /<meta name="twitter:description"[^>]*>/, `<meta name="twitter:description" content="${esc(seo.description)}">`);
    }
    if (seo.title) {
      html = setMeta(html, /<meta property="og:title"[^>]*>/, `<meta property="og:title" content="${esc(seo.title)}">`);
      html = setMeta(html, /<meta name="twitter:title"[^>]*>/, `<meta name="twitter:title" content="${esc(seo.title)}">`);
    }
    html = setMeta(html, /<link rel="canonical"[^>]*>/, `<link rel="canonical" href="${canonical}" />`);
    html = setMeta(html, /<meta property="og:url"[^>]*>/, `<meta property="og:url" content="${canonical}">`);
    html = setMeta(html, /<meta property="og:locale"[^>]*>/, `<meta property="og:locale" content="${lang === 'es' ? 'es_MX' : 'en_US'}">`);
    // versiones en los dos idiomas para Google
    const en = `${SITE}${route === '/' ? '/' : route}`;
    const es = `${SITE}${esPath(route)}`;
    const extra = [
      `<link rel="alternate" hreflang="en" href="${en}" />`,
      `<link rel="alternate" hreflang="es" href="${es}" />`,
      `<link rel="alternate" hreflang="x-default" href="${en}" />`,
      ...(seo.jsonLd ?? []).map((j) => `<script type="application/ld+json">${JSON.stringify(j).replace(/</g, '\\u003c')}</script>`),
    ];
    html = html.replace('</head>', `    ${extra.join('\n    ')}\n  </head>`);

    const out = url === '/' ? join(dist, 'index.html') : join(dist, url.slice(1), 'index.html');
    mkdirSync(dirname(out), { recursive: true });
    writeFileSync(out, html, 'utf8');
    count++;
  }
}
rmSync(join(root, 'dist-ssr'), { recursive: true, force: true });
console.log(`[prerender] ${count} páginas con HTML completo`);
