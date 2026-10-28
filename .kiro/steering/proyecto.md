# Handoff del proyecto — sitio de Johanna Bellorín, LCSW

Documento de traspaso para cualquier agente o persona que retome este
proyecto. Resume qué es, cómo está construido, en qué estado está y qué falta.

Es un steering que se carga siempre. Para el detalle fino hay documentos
dedicados en `docs/`, citados a lo largo de este texto. Cuando algo de aquí
contradiga a `docs/`, gana `docs/`, porque es donde vive el razonamiento
completo; este archivo es el mapa, no el territorio.

---

## 1. Qué es

Sitio web de **Johanna Bellorín, LCSW** (se escribe con tilde: Bellorín), una
trabajadora social clínica con licencia que ofrece **teleterapia** en el
estado de Nueva York. Terapia individual, de pareja y asesoría
prematrimonial. **Bilingüe inglés y español**, con sesiones reales en los dos
idiomas; el español es su mayor diferenciador en Nueva York.

No hay consulta física. Todo es online. Trabaja con dos sistemas: **Headway**
para clientes con seguro y **SimplePractice** para pago privado.

El tono del sitio: profesional pero muy cercano, "como tu amiga confidente",
con humor. La guía completa de voz está en `docs/voz-y-contenido.md` y hay que
leerla antes de escribir cualquier texto.

---

## 2. Stack y arquitectura

- **Astro 7**, salida estática (`output: 'static'`), TypeScript estricto.
- **Sin framework de UI** (ni React ni Vue). Solo componentes `.astro`.
- **Sin Tailwind.** Estilos con tokens CSS propios. Ver sección 5.
- **i18n nativo** de Astro (`astro:i18n`), inglés por defecto en la raíz,
  español bajo `/es`.
- **Fuentes autoalojadas** con Fontsource, subset latin. Cero peticiones a
  Google Fonts.
- **Imágenes** optimizadas con `astro:assets` (`<Image />`), que genera webp
  desde los JPEG originales.

### Objetivo técnico que no se negocia: cero peticiones a terceros

En una web de terapia, el navegador del visitante no debe contactar con
ningún dominio ajeno. Por eso las fuentes van autoalojadas, la analítica se
inyectará en el borde de Cloudflare, el antispam es Turnstile (no reCAPTCHA) y
el vídeo irá autoalojado (nunca embed de YouTube). La única excepción prevista
es `challenges.cloudflare.com` cuando se active Turnstile. El detalle y el por
qué están en `docs/legal.md` sección 4.

### Carpetas clave

```
src/
├── data/
│   ├── practice.ts        ← ÚNICA fuente de verdad de los hechos
│   └── legal-notices.ts   ← textos legales PROTEGIDOS, no tocar
├── i18n/
│   ├── routes.ts          ← mapa de slugs traducidos + función path()
│   ├── en.ts / es.ts      ← cadenas de interfaz (es.ts tipado contra en.ts)
│   └── index.ts
├── content/               ← prosa editable, Markdown bilingüe
│   ├── pages/{en,es}/
│   ├── services/{en,es}/  ← alimentan tarjetas Y página de detalle
│   └── faq/{en,es}/
├── content.config.ts      ← esquemas Zod de las colecciones
├── components/            ← 14 componentes .astro
├── layouts/BaseLayout.astro
├── styles/                ← tokens.css + skeleton.css + glass.css
└── assets/photos/         ← fotos optimizables
worker/                    ← Worker de Cloudflare para el formulario (aparte)
docs/                      ← documentación de decisiones
design-reference/          ← maqueta T4 original congelada
```

---

## 3. Las tres capas de contenido, y quién toca qué

Esto es la decisión de diseño más importante del proyecto. El objetivo es que
el contenido lo pueda editar un agente de IA (o Jorge con IA) de forma
autónoma, sin romper nada estructural ni legal.

| Capa | Qué | Archivo | ¿Editable? |
|---|---|---|---|
| Prosa | Bio, servicios, FAQ, textos legales | `src/content/**/*.md` | Sí, libre |
| Interfaz | Menú, botones, labels de formulario | `src/i18n/en.ts`, `es.ts` | Sí |
| Hechos | Teléfono, email, credencial, estados, URLs de reserva | `src/data/practice.ts` | Sí, un solo sitio |
| Legal | Crisis, Good Faith Estimate, jurisdicción, disclaimer | `src/data/legal-notices.ts` | **NO sin revisión legal** |

Reglas duras:
- **Ningún hecho se escribe en la prosa.** Ni el teléfono, ni "LCSW", ni
  "Nueva York" como estado. Todo sale de `practice.ts` y las plantillas lo
  insertan. Motivo: va a cambiar (Florida es plan futuro, el contacto real no
  existe aún).
- **`legal-notices.ts` no se modifica** para "mejorar el tono". Suena seco a
  propósito. Ya hay un steering (`contenido.md`) que lo protege.
- **El español no es traducción del inglés.** Son dos originales. Registro
  latinoamericano neutro, tuteo. El humor se reescribe, no se traduce.
- **Nombres de archivo canónicos en inglés** aunque la URL esté traducida:
  `content/pages/es/about.md` → `/es/sobre-mi`. El mapa está en
  `src/i18n/routes.ts`.

---

## 4. Estado actual: qué está hecho

**El sitio está completo y funcional end-to-end, con contenido de relleno.**
15 páginas que compilan limpio. Build: `npm run build`.

Páginas (todas bilingües salvo el 404, que es bilingüe en una sola):

- `/` y `/es` — home con sus 6 secciones y el ritmo de color
- `/about` y `/es/sobre-mi` — bio + foto de cuerpo entero en 2 columnas
- `/services` y `/es/servicios` — detalle de los 3 servicios
- `/info` y `/es/informacion` — pagos, aviso GFE, FAQ completo
- `/contact` y `/es/contacto` — formulario + reserva + aviso de crisis
- `/privacy` y `/es/privacidad` — 3 secciones: privacidad web, NPP, accesibilidad
- `/thanks` y `/es/gracias` — página post-envío del formulario
- `/404` — bilingüe

Hecho y verificado:
- Las 6 secciones de la home en orden con el ritmo de color
  (crema → cielo → crema → savia → crema → cielo → cristal)
- Menú hamburguesa móvil con `<details>` nativo, sin JS
- Selector de idioma que preserva la página actual
- JSON-LD `MedicalBusiness` sin address, `hreflang` recíproco
- Fotos reales: la 6 en la home (plano medio), la 2 en about (cuerpo entero)
- Formulario simple con Turnstile, sin campo de texto libre
- Worker de Cloudflare + Resend listo en `worker/` (sin desplegar)
- Responsive verificado en móvil, sin desbordamientos
- Fuentes autoalojadas, cero peticiones externas

El repositorio está en GitHub (`github.com/Zryru/johanna-bellorin-lcsw`), todo
commiteado, rama `main`.

---

## 5. Sistema de diseño

Base: variante **T4 · Editorial fina**, elegida tras un proceso de 3 rondas
documentado en `design-reference/` y en `docs/traspaso.md`.

- Paleta cálida: crema `#FDF8F0`, tinta verde bosque `#1F3D2B`. **Nunca negro
  puro, nunca fondos oscuros.**
- Franjas de color plano por sección: azul cielo `#A8D0E2`, verde savia
  `#C4DBC4`. Degradado solo en el hero.
- Efecto cristal (glassmorphism) con `backdrop-filter`.
- Tipografía: Cormorant Garamond 300 (titulares), Cormorant Unicase 600
  (nombre), Jost (UI), Lato (cuerpo). Todas OFL.
- Botones en cápsula.

Reglas que rompen el diseño si se ignoran:
- **El cristal necesita color variado detrás.** El degradado vive solo en el
  hero; el resto usa franjas planas. Si una sección pierde su fondo, los
  paneles de cristal se ven como cajas blancas.
- **`.nav` y `.footer` NO llevan la clase `.glass`.** Tienen su propio cristal
  en `glass.css`. Añadirles `.glass` los redondea en caja flotante (bug que ya
  ocurrió).
- **Los tokens están en `tokens.css` y es el último import.** `glass.css` pone
  `.video/.insurance/.cta-band` en transparente contando con que algo
  posterior restaure el color; lo hace `tokens.css`. No reordenar los imports.
- Si se toca cualquier color, **repetir la auditoría de contraste** (AA
  verificado, mínimo 4.72:1). Ver `docs/legal.md` sección 5.

---

## 6. El formulario de contacto

Decisión cerrada tras mucha deliberación (`docs/plan.md` sección 7):
formulario **simple, sin campo de texto libre**. Recoge nombre, email,
teléfono, idioma preferido y un motivo de lista cerrada. El idioma viene
preseleccionado según el idioma de la página.

Flujo: navegador → Worker de Cloudflare (valida Turnstile, honeypot, campos;
**no almacena nada**) → Resend → buzón de ella.

Por qué así: ni Cloudflare (plan gratuito) ni Resend firman BAA de HIPAA. Sin
campo de texto libre, el riesgo residual es aceptable y así lo decidió el
cliente. Con campo de texto libre NO sería defendible. **Si alguien añade un
textarea, hay que releer `docs/legal.md` sección 3 y `docs/plan.md` sección 7
antes.**

El Worker está en `worker/`, con su propio `package.json`, `wrangler.toml` y
README. No está desplegado.

---

## 7. Lo legal, en una frase cada cosa

Detalle completo con fuentes en `docs/legal.md`. Resumen:

- **Credencial LCSW**: pendiente de confirmación explícita por ella antes de
  publicar (su Instagram dice LMSW, probablemente desactualizado).
- **Aviso de Good Faith Estimate** (No Surprises Act): obligatorio en el
  sitio, ya está en `/info`. No obliga a publicar tarifas.
- **Aviso de crisis** (911/988): en el footer y en `/contact`.
- **Jurisdicción**: el cliente debe estar físicamente en NY durante la sesión.
- **Tres documentos legales** distintos en `/privacy`: política web, NPP de
  HIPAA (placeholder, pendiente de versión legal real) y accesibilidad.
- **Sin testimonios de clientes**, nunca (ética NASW).
- **Revisión por abogado sanitario de EE. UU. antes de publicar.**

---

## 8. Deployment

### Preview actual: GitHub Pages (temporal)

Hay un workflow en `.github/workflows/preview-pages.yml` que despliega a Pages
**solo manualmente** (desde la pestaña Actions). Es para enseñarle el sitio a
Johanna y recoger feedback, no el destino final.

Detalles del preview:
- Vive en `zryru.github.io/johanna-bellorin-lcsw/` (subdirectorio).
- La variable `GITHUB_PAGES=true` activa el `base` de subdirectorio en
  `astro.config.mjs`. Sin ella, la build normal va a la raíz.
- La variable `PUBLIC_GITHUB_PAGES=true` activa `noindex` en todas las páginas
  más un `robots.txt` que bloquea todo. El preview NO se indexa.
- Lleva `.nojekyll` para que Pages no ignore `_astro/`.
- **El formulario NO envía en Pages** (su Worker es de Cloudflare). Se ve pero
  no funciona.
- **Lleva la cara real de Johanna**, así que el enlace es sensible. Para ella y
  gente de confianza, bien; para difundir, no.

Para actualizar el preview: Settings > Pages > Source = GitHub Actions (una
vez), luego lanzar el workflow a mano.

### Destino real: Cloudflare (pendiente)

Todo el plan asume Cloudflare y está documentado en `docs/plan.md` sección 1.
Pasos cuando se vaya a producción:

1. **Alojamiento**: Cloudflare Workers con Static Assets (o Pages). La build
   normal (`npm run build`, sin `GITHUB_PAGES`) ya sale correcta para la raíz
   de un dominio propio.
2. **Dominio y DNS**: Cloudflare Registrar, nombre `johannabellorin.com` o
   similar (sin tilde). Actualizar `site` en `astro.config.mjs`.
3. **Analítica**: Cloudflare Web Analytics, inyectada en el borde.
4. **Worker del formulario**: desplegar `worker/` con `wrangler deploy`, y
   configurar sus secretos (`RESEND_API_KEY`, `TURNSTILE_SECRET`, `NOTIFY_TO`,
   `NOTIFY_FROM`) y la variable `ALLOWED_ORIGIN`.
5. **En el sitio**: configurar `PUBLIC_FORM_ENDPOINT` (URL del Worker) y
   `PUBLIC_TURNSTILE_SITE_KEY`. Mientras no existan, el formulario se ve pero
   avisa de que no envía.
6. Verificar: envío real del formulario, cero peticiones a terceros, el Worker
   sin logs con datos del envío.

No hay que deshacer nada del preview para ir a Cloudflare: la build de
producción ya sale limpia. El workflow de Pages simplemente se deja de usar.

---

## 9. Pendientes

### Bloqueantes antes de publicar (necesitan a Johanna)
Lista completa en `docs/preguntas-abiertas.md` sección 1. Resumen:
- Confirmar credencial LCSW y actualizar su Instagram
- Revisar su contrato con la práctica de grupo (`newyorkcitypsychotherapists.com`)
  por posible cláusula de no captación
- NPI (para superbills), email y teléfono reales
- URLs de su perfil de Headway y portal de SimplePractice
- Comprar el dominio
- Nombre legal de la entidad (¿PLLC?)
- Correo profesional con BAA (lo necesita por ser terapeuta, no por la web)

### Contenido pendiente (todo el texto actual es de relleno)
Ver `docs/preguntas-abiertas.md` sección 2:
- 4-5 temas reales por los que acude la gente (base del SEO)
- Su bio real, qué la hizo meterse en esto, ejemplos de sesión
- Guion del vídeo de presentación
- De qué país es (para el registro del español)
- Tarifas, política de cancelación, rango de edad, perfil en Psychology Today

### Verificaciones visuales en dispositivo real (no automáticas)
Ver `docs/plan.md` sección 5:
- Cormorant Garamond 300 (trazo fino) sobre degradado + cristal en móvil con
  sol. Recambio ya evaluado si falla: Newsreader ligero.
- La tilde de "Bellorín" en Cormorant Unicase 600 (fuente unicase)
- Rendimiento de `backdrop-filter` en Safari iOS

### Técnico pendiente
- La página 404 de Pages no se sirve bien (Pages no soporta 404 custom igual
  que Cloudflare); se resuelve solo en Cloudflare.
- Fotos: hay 6 originales (`image-1..6.jpeg`, en `.gitignore`). Se usan la 6
  (home) y la 2 (about). El resto disponibles si hacen falta.
- Vídeo de presentación: pendiente de grabar. El componente `VideoIntro` ya
  está listo con `preload="none"` + poster. Límite Cloudflare: 25 MiB/archivo.
- Capa de animación con GSAP: diseñada pero no construida. Ver
  `docs/traspaso.md`.

---

## 10. Trampas conocidas (para no repetir)

- **`pnpm-lock.yaml` fantasma.** Al procesar imágenes, Astro a veces invoca
  pnpm y genera un `pnpm-lock.yaml` que no debe existir: el proyecto usa npm
  (`package-lock.json`). Si el build falla por pnpm, borra ese archivo y usa
  `npm run build`.
- **`npm create astro` se cuelga** si el directorio no está vacío. El proyecto
  se montó a mano.
- **`astro check` se cuelga** pidiendo instalar `@astrojs/check` de forma
  interactiva. No usarlo sin instalarlo antes.
- **Astro 7 eliminó las colecciones legacy.** La config va en
  `src/content.config.ts` (no `src/content/config.ts`) con `loader: glob(...)`.
- **Constantes compartidas por varios esquemas** en `content.config.ts` deben
  declararse arriba del archivo (ej. `ICONS`), o falla con "Cannot access
  before initialization".
- **YAML del frontmatter**: un valor con `: ` (dos puntos y espacio) debe ir
  entre comillas o rompe el parser.
- **Node**: hay un aviso `EBADENGINE` (undici pide 22.19, hay 22.17). No ha
  roto nada, pero conviene subir Node.

---

## 11. Documentos de referencia

| Documento | Contenido |
|---|---|
| `docs/plan.md` | Plan de implementación completo, 10 secciones |
| `docs/legal.md` | Requisitos legales US/NY con fuentes y checklist |
| `docs/voz-y-contenido.md` | Guía de tono y escritura bilingüe |
| `docs/preguntas-abiertas.md` | Todo lo pendiente, por quién lo resuelve |
| `docs/traspaso.md` | Cierre de la fase de diseño (histórico) |
| `docs/user.md` | Transcripción de Johanna sobre cómo quiere presentarse |
| `src/content/README.md` | Cómo editar contenido |
| `.kiro/steering/contenido.md` | Reglas al editar contenido (steering activo) |
| `design-reference/` | Maqueta T4 original congelada |
