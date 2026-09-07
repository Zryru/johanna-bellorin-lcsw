/**
 * Cadenas de interfaz en español.
 *
 * NO es la traducción de `en.ts`. Es un original en español, escrito en
 * registro latinoamericano neutro porque el público son hispanohablantes de
 * Nueva York. Sin "vosotros", sin "vale", sin giros peninsulares.
 * Ver docs/voz-y-contenido.md sección 5.
 *
 * Tuteo, no usted. Una terapeuta que se describe como "tu amiga confidente" no
 * habla de usted.
 *
 * El tipo `UIStrings` viene de `en.ts`, así que TypeScript avisa si falta o
 * sobra una clave.
 */

import type { UIStrings } from './en';

export const es: UIStrings = {
  nav: {
    home: 'Inicio',
    about: 'Sobre mí',
    services: 'Servicios',
    info: 'Tarifas y preguntas',
    contact: 'Contacto',
    privacy: 'Privacidad',
    openMenu: 'Abrir menú',
    closeMenu: 'Cerrar menú',
    skipToContent: 'Ir al contenido',
    switchLanguage: 'Cambiar de idioma',
  },

  cta: {
    bookConsult: 'Agenda una consulta gratis',
    getInTouch: 'Escríbeme',
    learnMore: 'Conoce más',
    withInsurance: 'Tengo seguro',
    payingPrivately: 'Voy a pagar por mi cuenta',
    readMore: 'Seguir leyendo',
  },

  contact: {
    bookingHeading: '¿Lista para agendar?',
    bookingBlurb: 'Si ya sabes cuál eres, puedes ir directo.',
    orReachOut: 'O escríbeme y te respondo',
  },

  form: {
    heading: 'Escríbeme',
    name: 'Tu nombre',
    namePlaceholder: '¿Cómo te digo?',
    email: 'Correo',
    phone: 'Teléfono',
    phoneOptional: 'Teléfono (opcional)',
    preferredLanguage: '¿En qué idioma prefieres que hablemos?',
    languageOptions: {
      en: 'Inglés',
      es: 'Español',
      either: 'Cualquiera',
    },
    reason: '¿Qué te trae por aquí?',
    reasonOptions: {
      firstTime: 'Nunca he ido a terapia y no sé por dónde empezar',
      individual: 'Busco terapia individual',
      couples: 'Mi pareja y yo buscamos terapia de pareja',
      insurance: 'Tengo una duda sobre seguros',
      availability: 'Quiero saber tu disponibilidad',
      other: 'Es otra cosa',
    },
    submit: 'Enviar',
    sending: 'Enviando…',
    errors: {
      nameRequired: 'Necesito un nombre para saber con quién hablo.',
      emailRequired: 'Necesito un correo para poder responderte.',
      emailInvalid: 'Ese correo no se ve del todo bien.',
      reasonRequired: 'Elige la opción que más se acerque.',
      turnstile: 'Completa la verificación antispam, por favor.',
      generic: 'Algo se rompió de nuestro lado. Intenta de nuevo en un momento, o escríbeme directo.',
    },
  },

  thanks: {
    heading: 'Listo',
    body: 'Tu mensaje ya está en mi bandeja. Normalmente respondo en un día hábil.',
    backHome: 'Volver al inicio',
  },

  notFound: {
    heading: 'Esta página no existe',
    body: 'Puede que el enlace sea viejo, o que yo haya movido algo de lugar. En cualquier caso, por aquí se vuelve.',
    backHome: 'Volver al inicio',
  },

  a11y: {
    statementHeading: 'Accesibilidad',
    mainNav: 'Navegación principal',
    footerNav: 'Navegación del pie',
  },

  footer: {
    navHeading: 'Explora',
    contactHeading: 'Contacto',
    legalHeading: 'Legal',
    crisisHeading: 'En una crisis',
    copyright: 'Todos los derechos reservados.',
  },

  meta: {
    titleSuffix: 'Terapia en Nueva York',
    languageOfPage: 'Idioma',
  },
};
