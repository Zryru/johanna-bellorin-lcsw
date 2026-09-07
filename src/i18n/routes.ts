/**
 * Mapa de rutas traducidas.
 *
 * Los nombres de página son SIEMPRE canónicos en inglés (`about`, `services`),
 * aunque la URL pública esté traducida (`/es/sobre-mi`). Así los archivos de
 * contenido se llaman igual en los dos idiomas y no hay que conocer el mapa de
 * slugs para encontrar un archivo.
 *
 * Ver docs/plan.md sección 3.
 */

import type { LocaleCode } from '@data/practice';

export const DEFAULT_LOCALE: LocaleCode = 'en';
export const LOCALES: LocaleCode[] = ['en', 'es'];

/** Etiquetas del selector de idioma, cada una en su propio idioma. */
export const LOCALE_LABELS: Record<LocaleCode, string> = {
  en: 'English',
  es: 'Español',
};

/** Código corto para el conmutador de la cabecera. */
export const LOCALE_SHORT: Record<LocaleCode, string> = {
  en: 'EN',
  es: 'ES',
};

/** Atributo `lang` y `hreflang` de cada idioma. */
export const LOCALE_HREFLANG: Record<LocaleCode, string> = {
  en: 'en-US',
  es: 'es-US',
};

/** Páginas del sitio, por nombre canónico. */
export type PageKey =
  | 'home'
  | 'about'
  | 'services'
  | 'info'
  | 'contact'
  | 'privacy'
  | 'thanks';

/**
 * Slug público de cada página en cada idioma.
 * `home` es cadena vacía porque es la raíz del idioma.
 */
export const SLUGS: Record<PageKey, Record<LocaleCode, string>> = {
  home: { en: '', es: '' },
  about: { en: 'about', es: 'sobre-mi' },
  services: { en: 'services', es: 'servicios' },
  info: { en: 'info', es: 'informacion' },
  contact: { en: 'contact', es: 'contacto' },
  privacy: { en: 'privacy', es: 'privacidad' },
  thanks: { en: 'thanks', es: 'gracias' },
};

/** Páginas que aparecen en el menú de navegación, en orden. */
export const NAV_PAGES: PageKey[] = ['about', 'services', 'info', 'contact'];

/**
 * Construye la URL de una página en un idioma.
 * El inglés vive en la raíz; el español bajo el prefijo `/es`.
 *
 *   path('about', 'en') → '/about'
 *   path('about', 'es') → '/es/sobre-mi'
 *   path('home',  'es') → '/es'
 */
export function path(page: PageKey, locale: LocaleCode): string {
  const slug = SLUGS[page][locale];
  const prefix = locale === DEFAULT_LOCALE ? '' : `/${locale}`;
  if (!slug) return prefix || '/';
  return `${prefix}/${slug}`;
}

/**
 * Dada una página, devuelve sus URLs en todos los idiomas.
 * Se usa para generar las etiquetas `hreflang` recíprocas.
 */
export function alternates(page: PageKey): Array<{
  locale: LocaleCode;
  hreflang: string;
  href: string;
}> {
  return LOCALES.map((locale) => ({
    locale,
    hreflang: LOCALE_HREFLANG[locale],
    href: path(page, locale),
  }));
}

/** El otro idioma, para el conmutador de la cabecera. */
export function otherLocale(locale: LocaleCode): LocaleCode {
  return locale === 'en' ? 'es' : 'en';
}
