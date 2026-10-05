// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import tailwindcss from '@tailwindcss/vite';
import { SITE_INDEXABLE, SITE_URL } from './src/config.ts';
import { DEFAULT_LOCALE, LOCALES } from './src/i18n/config.ts';

export default defineConfig({
  site: SITE_URL,
  trailingSlash: 'always',
  i18n: {
    locales: [...LOCALES],
    defaultLocale: DEFAULT_LOCALE,
    // "/" redirects to "/es/" from src/pages/index.astro.
    routing: {
      prefixDefaultLocale: true,
    },
  },
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
