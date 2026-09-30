#!/usr/bin/env node
// Build-time prerender (npm run build, after the client + SSR builds).
// Renders every route with dist-ssr/entry-server.js into dist/<route>.html
// (served extensionless: vercel.json cleanUrls, vite preview; home →
// dist/index.html, 404 → dist/404.html), then writes sitemap.xml and
// robots.txt and checks that every internal link points at a written page.

import { existsSync, statSync } from 'node:fs';
import { mkdir, readFile, rm, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

import { CDJ_2025_SLUG, conferences, dateInIST, events, galleries, site, speakers } from '../src/content/index.js';
import { matchedPages, render, routes as routeObjects } from '../dist-ssr/entry-server.js';

const dist = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..', 'dist');
const now = new Date();
const today = dateInIST(now); // content dates are IST calendar dates
// Content dates as lastmod, but never in the future (upcoming events).
const pastDate = (date) => (date && date <= today ? date : undefined);

// Static pages come from src/router.jsx: page routes without `:param` or `*`
// (the legacy CDJ redirect has no page to render).
const staticPaths = routeObjects[0].children
  .filter((r) => r.preload && !/[:*]/.test(r.path ?? ''))
  .map((r) => (r.index ? '/' : `/${r.path}`));

const routes = [
  ...staticPaths.map((p) => ({ path: p })),
  ...events.map((e) => ({ path: `/events/${e.slug}`, lastmod: pastDate(e.date) })),
  ...conferences.map((c) => ({ path: `/conferences/${c.slug}`, lastmod: pastDate(c.endDate) })),
  ...speakers.map((s) => ({ path: `/speakers/${s.slug}` })),
  ...galleries.map((g) => ({ path: `/gallery/${g.slug}`, lastmod: pastDate(g.date) })),
  { path: '/404' },
];

// The template's default <title> and Helmet-managed (data-rh) tags are
// replaced by each page's own. Read before dist/index.html is overwritten.
const template = (await readFile(path.join(dist, 'index.html'), 'utf8'))
  .replace(/<title>[^<]*<\/title>\s*/, '')
  .replace(/<(meta|link)\b[^>]*\bdata-rh="true"[^>]*>\s*/g, '');
const ROOT = '<div id="root"></div>';
if (!template.includes(ROOT) || !template.includes('</head>')) throw new Error(`dist/index.html has no ${ROOT}`);

// Link the matched page chunk's CSS and preload its JS (and imports) so the
// static HTML is fully styled and hydration doesn't wait on a request chain.
const manifest = JSON.parse(await readFile(path.join(dist, '.vite', 'manifest.json'), 'utf8'));
const pageAssets = (pathname) => {
  const css = new Set();
  const js = new Set();
  const walk = (key) => {
    const chunk = manifest[key];
    // The entry bundle and its CSS are already in the template.
    if (!chunk || chunk.isEntry || js.has(chunk.file)) return;
    js.add(chunk.file);
    chunk.css?.forEach((f) => css.add(f));
    chunk.imports?.forEach(walk);
  };
  matchedPages(pathname).forEach((page) => walk(`src/routes/${page}.jsx`));
  return [
    ...[...css].map((f) => `<link rel="stylesheet" href="/${f}">`),
    ...[...js].map((f) => `<link rel="modulepreload" href="/${f}">`),
  ].join('');
};

const written = new Map(); // path → html
const indexable = [];

for (const route of routes) {
  const { html, head, pageChrome } = await render(route.path, now);
  const data = JSON.stringify({ path: route.path, now: now.toISOString(), pageChrome }).replace(/</g, '\\u003c');
  const page = template
    .replace('</head>', () => `${head}${pageAssets(route.path)}</head>`)
    .replace(ROOT, () => `<div id="root">${html}</div><script id="prerender-data" type="application/json">${data}</script>`);
  // Guard the assembled page, not just the strings that went into it.
  const visibleHead = page.replace(/<!--[\s\S]*?-->/g, '').split('</head>')[0];
  if ((visibleHead.match(/<title[\s>]/g) ?? []).length !== 1 || !visibleHead.includes('<script type="module"')) {
    throw new Error(`${route.path}: assembled page lost its <title> or module script (check index.html comments)`);
  }
  const file = path.join(dist, route.path === '/' ? 'index.html' : `${route.path}.html`);
  await mkdir(path.dirname(file), { recursive: true });
  await writeFile(file, page);
  written.set(route.path, page);
  if (!/<meta[^>]*name="robots"[^>]*content="[^"]*noindex/.test(head)) indexable.push(route);
}

const loc = (p) => `${site.url}${p}`;
await writeFile(
  path.join(dist, 'sitemap.xml'),
  `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${indexable
  .map(({ path: p, lastmod }) => `  <url><loc>${loc(p)}</loc>${lastmod ? `<lastmod>${lastmod}</lastmod>` : ''}</url>`)
  .join('\n')}
</urlset>
`,
);
await writeFile(path.join(dist, 'robots.txt'), `User-agent: *\nAllow: /\n\nSitemap: ${loc('/sitemap.xml')}\n`);

// Every internal link must hit a prerendered page or a file in dist
// (unknown URLs 404 on Vercel; the legacy CDJ URL is a vercel.json redirect).
const broken = new Set();
for (const [from, page] of written) {
  for (const [, href] of page.replace(/<!--[\s\S]*?-->/g, '').matchAll(/href="(\/[^"#?]*)/g)) {
    const target = href.replace(/(.)\/$/, '$1');
    let file;
    try {
      file = path.join(dist, decodeURIComponent(target));
    } catch {
      broken.add(`${from} → ${href} (malformed URL)`);
      continue;
    }
    const ok = written.has(target) || target === `/${CDJ_2025_SLUG}` || (existsSync(file) && statSync(file).isFile());
    if (!ok) broken.add(`${from} → ${href}`);
  }
}
if (broken.size) throw new Error(`Links to pages that were not prerendered:\n${[...broken].join('\n')}`);

// Build-time input only; don't deploy the source/chunk map.
await rm(path.join(dist, '.vite'), { recursive: true, force: true });

console.log(`Prerendered ${written.size} pages (${indexable.length} in sitemap.xml).`);
