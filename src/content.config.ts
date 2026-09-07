/**
 * Esquemas de las colecciones de contenido.
 *
 * Estos esquemas son la red de seguridad del sitio bilingüe: si un archivo en
 * español le falta un campo obligatorio, la compilación FALLA en lugar de
 * publicar media página sin traducir. Es intencionado.
 *
 * Si estás añadiendo contenido y el build se queja, el mensaje de error dice
 * exactamente qué campo falta y en qué archivo. No borres el campo del esquema
 * para que compile: rellena el campo.
 *
 * Ver src/content/README.md para qué es cada colección.
 */

import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

/**
 * Nombres de los iconos de trazo disponibles.
 * Están dibujados en `src/components/Icon.astro`. Si usas uno que no existe,
 * el build falla en lugar de dejar un hueco.
 *
 * Se declara aquí arriba porque lo usan varios esquemas de abajo.
 */
export const ICONS = ['arc', 'venn', 'rings', 'heart', 'arrow', 'square'] as const;

/** Cabecera de una sección de la home: antetítulo, titular y entradilla. */
const sectionHeader = z.object({
  /** Antetítulo pequeño, en mayúsculas por CSS. */
  eyebrow: z.string().min(3).max(60),
  /** Titular de la sección. Admite <em> para el énfasis en cursiva. */
  heading: z.string().min(3),
  /** Párrafo de entrada, opcional. */
  intro: z.string().optional(),
});

/** Campos de SEO que toda página necesita. */
const seo = z.object({
  /**
   * Título de la pestaña del navegador y del resultado de búsqueda.
   * Sin el nombre de Johanna: el layout lo añade solo.
   */
  title: z.string().min(3).max(70),
  /**
   * Descripción para buscadores. Entre 70 y 160 caracteres es la ventana que
   * Google muestra sin cortar.
   */
  description: z.string().min(50).max(160),
});

/**
 * Páginas del sitio. Un archivo por página y por idioma.
 * Ruta: `pages/{en|es}/{nombre-canónico}.md`
 *
 * El nombre del archivo es SIEMPRE el canónico en inglés (`about.md`), aunque
 * la URL pública esté traducida (`/es/sobre-mi`). El mapa de slugs está en
 * `src/i18n/routes.ts`.
 */
const pages = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/pages' }),
  schema: seo.extend({
    /** Titular principal (h1) de la página. Puede llevar <em> para énfasis. */
    heading: z.string().min(3),
    /** Frase de apoyo bajo el titular. Opcional. */
    subheading: z.string().optional(),
    /**
     * Antetítulo pequeño sobre el titular ("eyebrow" en el diseño).
     * Opcional.
     */
    eyebrow: z.string().optional(),

    /**
     * Tira de rasgos con iconos, bajo los botones del hero. SOLO en la home.
     *
     * Es una mezcla deliberada de servicios y de cualidades ("Honest &
     * direct"), igual que en la maqueta aprobada. No es una taxonomía, es una
     * primera impresión de cuatro golpes.
     */
    traits: z
      .array(
        z.object({
          label: z.string().min(3).max(40),
          icon: z.enum(ICONS),
        }),
      )
      .max(4)
      .optional(),

    /**
     * Cita destacada de la sección de vídeo. SOLO en la home.
     * Admite <em> para el énfasis en cursiva.
     */
    quote: z
      .object({
        text: z.string().min(20),
        /** Pie de la cita. Si se omite, se usa el nombre con credencial. */
        attribution: z.string().optional(),
      })
      .optional(),

    /**
     * Titulares de cada sección de la home. SOLO en la home.
     *
     * Cada clave corresponde a una sección de la página, en el orden en que
     * aparecen al bajar. Los `heading` admiten <em> para el énfasis en
     * cursiva.
     */
    sections: z
      .object({
        services: sectionHeader,
        fees: sectionHeader,
        faq: sectionHeader,
        cta: sectionHeader,
      })
      .optional(),
  }),
});

/**
 * Servicios. Son las tarjetas del bento de la home Y el contenido de la página
 * `/services`. Un solo archivo alimenta las dos cosas:
 *
 *   - `summary` → el texto de la tarjeta en la home
 *   - el cuerpo del Markdown → el detalle completo en /services
 *
 * Así el resumen y el detalle no se pueden desincronizar, que es el riesgo de
 * tener la home repitiendo lo que dicen las subpáginas.
 *
 * Un archivo por servicio y por idioma, con el mismo nombre en `en/` y `es/`.
 * Ahora mismo son tres: individual, pareja y asesoría prematrimonial.
 */
const services = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/services' }),
  schema: z.object({
    /** Título del servicio. Corto: dos o tres palabras. */
    title: z.string().min(3).max(60),
    /** Texto de la tarjeta en la home. Una o dos frases. */
    summary: z.string().min(20).max(240),
    /** Orden en la rejilla y en la página de detalle. El más bajo va primero. */
    order: z.number().int().positive(),
    /** Icono de trazo. Ver ICONS arriba. */
    icon: z.enum(ICONS),
  }),
});

/**
 * Preguntas frecuentes.
 *
 * Un archivo por pregunta y por idioma. Añadir una pregunta = crear dos
 * archivos con el mismo nombre en `en/` y `es/`.
 *
 * Las preguntas deben sonar a lo que alguien escribiría en el buscador a las
 * dos de la mañana, no a un departamento de comunicación. "¿Cuánto dura esto?"
 * antes que "¿Cuál es la duración de las sesiones?".
 * Ver docs/voz-y-contenido.md sección 4.
 */
const faq = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/faq' }),
  schema: z.object({
    /** La pregunta, tal como la formularía una persona real. */
    question: z.string().min(5).max(120),
    /** Orden en el acordeón. El número más bajo va primero. */
    order: z.number().int().positive(),
    /**
     * Si es `true`, esta pregunta también aparece en el resumen de la home.
     * Conviene marcar tres o cuatro como máximo.
     */
    featured: z.boolean().default(false),
  }),
});

export const collections = { pages, services, faq };
