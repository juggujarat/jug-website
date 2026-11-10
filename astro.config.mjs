// @ts-check
import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import sitemap from '@astrojs/sitemap';
import tailwindcss from '@tailwindcss/vite';
import { cp, access } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';

/** Copies the prebuilt legacy Community Day 2025 page into the final output. */
const legacyCommunityDay = () => ({
  name: 'legacy-community-day',
  hooks: {
    'astro:build:done': async ({ dir, logger }) => {
      const src = new URL('./.legacy-dist/', import.meta.url);
      try {
        await access(src);
      } catch {
        logger.warn('No .legacy-dist found; run `npm run build:legacy` to include Community Day 2025.');
        return;
      }
      await cp(fileURLToPath(src), fileURLToPath(dir), { recursive: true });
      logger.info('Copied legacy Community Day 2025 page.');
    },
  },
});

export default defineConfig({
  site: 'https://www.gujaratjug.org',
  integrations: [react(), sitemap(), legacyCommunityDay()],
  vite: { plugins: [tailwindcss()] },
  image: { domains: ['images.lumacdn.com'] },
});
