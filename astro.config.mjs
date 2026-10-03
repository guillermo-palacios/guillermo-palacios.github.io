// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import tailwindcss from '@tailwindcss/vite';
import { SITE_INDEXABLE, SITE_URL } from './src/config.ts';

export default defineConfig({
  site: SITE_URL,
  trailingSlash: 'always',
  integrations: [
    sitemap({
      // No URLs are advertised while the site is noindex.
      filter: () => SITE_INDEXABLE,
    }),
  ],
  vite: {
    plugins: [tailwindcss()],
  },
});
