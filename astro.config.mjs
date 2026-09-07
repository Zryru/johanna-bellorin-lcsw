// @ts-check
import { defineConfig } from 'astro/config';

/*
 * Despliegue en GitHub Pages, SOLO como preview temporal.
 *
 * Pages sirve el sitio en un subdirectorio (zryru.github.io/<repo>/), no en la
 * raíz, así que hay que decírselo a Astro con `base`. El destino real es
 * Cloudflare con dominio propio, donde no hay subdirectorio.
 *
 * Estas dos variables las pone el workflow de Pages (.github/workflows). En una
 * build normal no existen, así que `base` queda en '/' y el `site` en el
 * dominio real. Así la build de Pages no contamina la de producción.
 */
const isPages = process.env.GITHUB_PAGES === 'true';
const repoBase = '/johanna-bellorin-lcsw';

// https://astro.build/config
export default defineConfig({
  // PENDIENTE: el dominio real no está comprado todavía. Se usa aquí para que
  // las URLs canónicas y el sitemap se generen bien. Cambiar al comprarlo.
  // Ver docs/preguntas-abiertas.md, sección 1.
  site: isPages ? 'https://zryru.github.io' : 'https://johannabellorin.com',
  base: isPages ? repoBase : '/',

  // Salida estática. El formulario no necesita servidor: lo procesa un Worker
  // aparte. Ver docs/plan.md sección 7.
  output: 'static',

  i18n: {
    defaultLocale: 'en',
    locales: ['en', 'es'],
    routing: {
      // El inglés vive en la raíz (/about), el español bajo prefijo (/es/sobre-mi).
      prefixDefaultLocale: false,
    },
  },

  build: {
    // 'directory' genera cada página como carpeta/index.html. Es lo que hace
    // falta con rutas anidadas por idioma: la home en español sale como
    // es/index.html, no como es.html, así que /es se sirve bien tanto en un
    // servidor estático como en Cloudflare. Con 'file' salía es.html y /es
    // quedaba sin servir porque /es ya era una carpeta con las subpáginas.
    format: 'directory',
  },

  // 'ignore' evita el lío de barra final: /es y /es/ sirven lo mismo y no hay
  // redirecciones. Cloudflare Pages/Workers lo resuelve solo.
  trailingSlash: 'ignore',
});
