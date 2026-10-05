// Locale settings shared by astro.config.mjs, routes and SeoHead.

export const LOCALES = ['es', 'en'] as const;

export type Locale = (typeof LOCALES)[number];

export const DEFAULT_LOCALE: Locale = 'es';

export const OG_LOCALES: Record<Locale, string> = {
  es: 'es_ES',
  en: 'en_US',
};
