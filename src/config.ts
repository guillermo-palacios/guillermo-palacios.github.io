// Global site settings shared by astro.config.mjs and components.
import type { Locale } from './i18n/config';

export const SITE_URL = 'https://guillermo-palacios.github.io';

// Keep false until pre-launch (task 17): emits robots noindex and an empty sitemap.
export const SITE_INDEXABLE = false;

// CV PDFs in public/cv/; each page links to the one in its own language.
export const CV_PATHS: Record<Locale, string> = {
  es: '/cv/guillermo-palacios-garcia-cv-es.pdf',
  en: '/cv/guillermo-palacios-garcia-cv-en.pdf',
};
