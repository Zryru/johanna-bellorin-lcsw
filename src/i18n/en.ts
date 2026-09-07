/**
 * Cadenas de interfaz en inglés.
 *
 * Aquí van SOLO textos cortos de interfaz: menú, botones, etiquetas de
 * formulario, textos para lectores de pantalla. La prosa (biografía, servicios,
 * respuestas del FAQ) vive en `src/content/`, no aquí.
 *
 * OJO: `es.ts` NO es la traducción de este archivo. Son dos originales. El
 * humor y las referencias culturales pueden y deben diferir. Ver
 * docs/voz-y-contenido.md sección 5.
 *
 * El tipo `UIStrings` sale de este archivo, así que si añades una clave aquí,
 * TypeScript va a exigir que exista en `es.ts` también. Es a propósito: evita
 * publicar media interfaz sin traducir.
 */

export const en = {
  nav: {
    home: 'Home',
    about: 'About',
    services: 'Services',
    info: 'Fees & FAQ',
    contact: 'Contact',
    privacy: 'Privacy',
    /** Para lectores de pantalla, en el botón de menú móvil. */
    openMenu: 'Open menu',
    closeMenu: 'Close menu',
    /** Enlace de salto al contenido, primer elemento enfocable de la página. */
    skipToContent: 'Skip to content',
    switchLanguage: 'Switch language',
  },

  cta: {
    bookConsult: 'Book a free consult',
    getInTouch: 'Get in touch',
    learnMore: 'Learn more',
    withInsurance: 'I have insurance',
    payingPrivately: 'I am paying privately',
    readMore: 'Read more',
  },

  contact: {
    /** Encabezado de los dos destinos de reserva, sobre el formulario. */
    bookingHeading: 'Ready to book?',
    bookingBlurb: "If you already know which one you are, you can go straight there.",
    /** Separador entre la reserva directa y el formulario. */
    orReachOut: "Or send a note and I'll get back to you",
  },

  form: {
    heading: 'Get in touch',
    name: 'Your name',
    namePlaceholder: 'What should I call you?',
    email: 'Email',
    phone: 'Phone',
    phoneOptional: 'Phone (optional)',
    preferredLanguage: 'Which language would you rather talk in?',
    languageOptions: {
      en: 'English',
      es: 'Spanish',
      either: 'Either works',
    },
    reason: 'What brings you here?',
    /**
     * Opciones cerradas, sin campo de texto libre. Las etiquetas suenan a
     * persona a propósito: son la única calidez que hay en el formulario.
     * Ver docs/voz-y-contenido.md sección 4.
     */
    reasonOptions: {
      firstTime: 'I have never done therapy and I am not sure where to start',
      individual: 'I am looking for individual therapy',
      couples: 'My partner and I are looking for couples therapy',
      insurance: 'I have a question about insurance',
      availability: 'I want to know your availability',
      other: 'Something else',
    },
    submit: 'Send it',
    sending: 'Sending…',
    /** Errores de validación, del lado del cliente. */
    errors: {
      nameRequired: 'I need a name to know who I am talking to.',
      emailRequired: 'I need an email to be able to write back.',
      emailInvalid: 'That email does not look quite right.',
      reasonRequired: 'Pick whichever one is closest.',
      turnstile: 'Please complete the anti-spam check.',
      generic: 'Something broke on our end. Try again in a moment, or email me directly.',
    },
  },

  thanks: {
    heading: 'Got it',
    body: 'Your message is in my inbox. I usually reply within one business day.',
    backHome: 'Back to the homepage',
  },

  notFound: {
    heading: 'This page does not exist',
    body: 'The link might be old, or I might have moved something. Either way, here is the way back.',
    backHome: 'Back to the homepage',
  },

  a11y: {
    /** Título de la declaración de accesibilidad. */
    statementHeading: 'Accessibility',
    /** Etiqueta del landmark de navegación principal. */
    mainNav: 'Main navigation',
    footerNav: 'Footer navigation',
  },

  footer: {
    navHeading: 'Explore',
    contactHeading: 'Contact',
    legalHeading: 'Legal',
    crisisHeading: 'In a crisis',
    /** Aviso de copyright. El año se calcula, no se escribe. */
    copyright: 'All rights reserved.',
  },

  meta: {
    /** Sufijo del título de las páginas. */
    titleSuffix: 'Therapy in New York',
    /** Texto del selector de idioma para lectores de pantalla. */
    languageOfPage: 'Language',
  },
} as const;

/** Contrato que `es.ts` tiene que cumplir. */
export type UIStrings = typeof en;
