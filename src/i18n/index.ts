/**
 * Punto de entrada del i18n. Los componentes importan de aquí, no de `en.ts`
 * ni de `es.ts` directamente.
 *
 *   import { t } from '@i18n/index';
 *   const ui = t(locale);
 *   ui.nav.about
 */

import type { LocaleCode } from '@data/practice';
import { en, type UIStrings } from './en';
import { es } from './es';

const DICTIONARIES: Record<LocaleCode, UIStrings> = { en, es };

/** Devuelve el diccionario de interfaz del idioma pedido. */
export function t(locale: LocaleCode): UIStrings {
  return DICTIONARIES[locale];
}

export type { UIStrings };
export * from './routes';
