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
    build: {
      // Astro builds with target "esnext", which makes the CSS minifier drop vendor prefixes
      // such as -webkit-backdrop-filter. Same baseline as Tailwind v4 (Safari 16.4+).
      cssTarget: [
        'chrome111',
        'edge111',
        'firefox114',
        'safari16.4',
        'ios16.4',
      ],
    },
  },
});
