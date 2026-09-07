/**
 * ÚNICA FUENTE DE VERDAD de los hechos de la consulta.
 *
 * Regla del proyecto: ningún componente ni ningún archivo de contenido escribe
 * a mano la credencial, los estados con licencia, el teléfono, el correo ni una
 * URL de reserva. Todo sale de aquí.
 *
 * El motivo es que estos datos van a cambiar:
 *  - La credencial ya generó confusión una vez (su Instagram decía LMSW).
 *  - Florida está confirmada como plan futuro: entra en `licensedStates`.
 *  - Las URLs de reserva y el contacto real todavía no existen.
 *
 * Si cambia algo de aquí, cambia en todo el sitio sin tocar nada más.
 * Ver docs/plan.md sección 2.
 */

export type LocaleCode = 'en' | 'es';

/** Códigos de estado de EE. UU. donde tiene licencia para ejercer. */
export type StateCode = 'NY' | 'FL';

export const STATE_NAMES: Record<StateCode, Record<LocaleCode, string>> = {
  NY: { en: 'New York', es: 'Nueva York' },
  FL: { en: 'Florida', es: 'Florida' },
};

export const practice = {
  /** Nombre completo, con tilde. Se escribe Bellorín, no Bellorin. */
  name: 'Johanna Bellorín',

  /**
   * Grafía sin tilde. Solo para dominio, correo y palabras clave de SEO,
   * porque mucha gente la va a buscar así y los teclados de EE. UU. no ponen
   * tildes con facilidad. Nunca para texto visible.
   */
  nameAscii: 'Johanna Bellorin',

  /**
   * Credencial. PENDIENTE de confirmación explícita por ella antes de publicar:
   * su Instagram sigue diciendo LMSW, que en Nueva York solo permite trabajo
   * clínico bajo supervisión. Nos basamos en un documento que ella redactó.
   * Ver docs/legal.md sección 6.
   */
  credential: 'LCSW',

  /** Estados donde tiene licencia. Florida se añade cuando la obtenga. */
  licensedStates: ['NY'] as StateCode[],

  /** Idiomas en los que da sesiones de verdad, no solo idiomas de la web. */
  sessionLanguages: ['en', 'es'] as LocaleCode[],

  /** Sin consulta física. No hay dirección que publicar. */
  modality: 'telehealth-only' as const,

  /** Destinos de reserva. Ambos cubiertos por BAA, ambos suyos. */
  booking: {
    /** Perfil de Headway, para clientes que usan seguro. PENDIENTE. */
    insurance: '',
    /** Portal de SimplePractice, para pago privado. PENDIENTE. */
    privatePay: '',
  },

  /**
   * Contacto real. PENDIENTE: la maqueta llevaba datos inventados
   * (hello@johannabellorin.com, (212) 555-0148) que no pueden salir a
   * producción.
   */
  contact: {
    email: '',
    phone: '',
  },

  /**
   * Identificadores profesionales, para el pie y los superbills. PENDIENTE.
   */
  identifiers: {
    licenseNumber: '',
    npi: '',
    /** Nombre legal de la entidad, si opera como PLLC. */
    legalEntity: '',
  },

  /** Perfiles externos. Vacío = no se muestra el enlace. */
  profiles: {
    psychologyToday: '',
    instagram: '',
  },
} as const;

/**
 * Nombres de los estados con licencia, ya traducidos y listos para pintar.
 * Ejemplo en inglés con un estado: "New York". Con dos: "New York and Florida".
 */
export function licensedStateNames(locale: LocaleCode): string {
  const names = practice.licensedStates.map((s) => STATE_NAMES[s][locale]);
  if (names.length === 0) return '';
  if (names.length === 1) return names[0]!;
  const conjunction = locale === 'es' ? 'y' : 'and';
  return `${names.slice(0, -1).join(', ')} ${conjunction} ${names.at(-1)}`;
}

/** Credencial completa para mostrar: "Johanna Bellorín, LCSW". */
export function nameWithCredential(): string {
  return `${practice.name}, ${practice.credential}`;
}
