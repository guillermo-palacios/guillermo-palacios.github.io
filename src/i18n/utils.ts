import en from '../content/en.json';
import es from '../content/es.json';
import type { SiteContent } from '../content/types';
import { SITE_URL } from '../config';
import { DEFAULT_LOCALE, LOCALES, type Locale } from './config';

// `satisfies` makes `astro check` fail if either file misses a key or has a wrong type.
const content: Record<Locale, SiteContent> = {
  es: es satisfies SiteContent,
  en: en satisfies SiteContent,
};

export function getContent(lang: Locale): SiteContent {
  return content[lang];
}

// Capital first letter for display only: the JSON keeps the approved text, which often starts
// in lowercase because the spec writes it after a label.
export function capitalizeFirst(text: string, lang: Locale): string {
  const [first = '', ...rest] = text;
  return first.toLocaleUpperCase(lang) + rest.join('');
}

export function getLocalePath(lang: Locale): string {
  return `/${lang}/`;
}

export function getAbsoluteUrl(path: string): string {
  return new URL(path, SITE_URL).href;
}

export function getAlternates(): { hreflang: string; href: string }[] {
  return [
    ...LOCALES.map((lang) => ({
      hreflang: lang,
      href: getAbsoluteUrl(getLocalePath(lang)),
    })),
    {
      hreflang: 'x-default',
      href: getAbsoluteUrl(getLocalePath(DEFAULT_LOCALE)),
    },
  ];
}
