# Plan de implementación — sitio de Johanna Bellorín, LCSW

Documento vivo. Sustituye a la versión anterior del plan, que contenía
varios errores de hecho detectados al revisarlo (ver sección 10,
"Correcciones sobre el plan original"). Los datos que siguen pendientes
están en `preguntas-abiertas.md`; el detalle legal, en `legal.md`; el tono
de los textos, en `voz-y-contenido.md`.

Última actualización: sesión de revisión previa a la implementación.

---

## 1. Ficha del proyecto

| | |
|---|---|
| **Cliente** | Johanna Bellorín, LCSW — Licensed Clinical Social Worker, Estado de Nueva York |
| **Modalidad** | Teleterapia únicamente. No hay consulta física |
| **Servicios** | Terapia individual y terapia de pareja |
| **Idiomas** | Inglés y español, sesiones reales en ambos |
| **Framework** | Astro, salida estática |
| **Estilos** | Tokens CSS propios heredados de la maqueta T4. Ver sección 4 sobre Tailwind |
| **Alojamiento** | Cloudflare Workers con Static Assets |
| **Analítica** | Cloudflare Web Analytics, sin cookies, inyectada en el borde |
| **Formulario** | Worker de Cloudflare + Resend. Ver sección 7 |
| **Antispam** | Cloudflare Turnstile |
| **Dominio y DNS** | Cloudflare Registrar. Su nombre, sin tilde por limitación técnica: `johannabellorin.com` o similar. Pendiente de comprar |
| **Coste de infraestructura** | Cero. El único gasto recurrente es el buzón profesional de ella, que necesita por su profesión y no por la web |

**Todo en Cloudflare, decisión revisada.** El plan original ponía Netlify por
sus formularios. Al descartar Netlify Forms por la cuestión del BAA (sección
7), la única razón para estar en Netlify desapareció y nadie revisó la
decisión. Cloudflare gana en tres cosas concretas: no tiene sistema de
créditos y el ancho de banda no tiene tope; el beacon de analítica se
inyecta en el borde y sus datos van a `tudominio.com/cdn-cgi/rum` en lugar de
a un host externo, lo que deja la página con **cero peticiones a terceros**;
y Cloudflare Registrar vende dominios a precio de coste. Netlify sale del
proyecto por completo.

**Ortografía del nombre:** se escribe **Bellorín**, con tilde. La maqueta
lo tiene mal (`Johanna Bellorin` en el `<title>` y en el wordmark) y hay
que corregirlo en todas las apariciones visibles. El dominio y el email van
sin tilde por fuerza. Ver sección 5 sobre el riesgo tipográfico que
introduce el acento.

---

## 2. Arquitectura por configuración: `practice.ts`

Decisión estructural que atraviesa todo el sitio. Los datos que van a
cambiar con el tiempo no se escriben en las plantillas, salen de un único
archivo:

```ts
// src/data/practice.ts
export const practice = {
  name: 'Johanna Bellorín',
  credential: 'LCSW',
  licensedStates: ['NY'],          // Florida entra aquí cuando llegue
  languages: ['en', 'es'],
  modality: 'telehealth-only',
  booking: {
    insurance: '',                  // URL del perfil de Headway
    privatePay: '',                 // URL del portal de SimplePractice
  },
  contact: { email: '', phone: '' }, // pendientes, ver preguntas-abiertas.md
};
```

Tres razones concretas, todas nacidas de problemas reales de este
proyecto:

1. **La credencial va a cambiar de nuevo.** Ya hubo confusión entre LMSW y
   LCSW (su Instagram sigue diciendo LMSW). Que la credencial viva en un
   sitio y se renderice desde ahí evita que una futura actualización deje
   la mitad del sitio desactualizada.
2. **Florida está confirmada como plan.** Cuando llegue la licencia, añadir
   estado es una línea. El aviso de jurisdicción, el `areaServed` del
   JSON-LD y los textos de teleterapia se generan desde `licensedStates`.
3. **Los destinos de reserva no existen todavía.** El sitio se construye
   con los campos vacíos y se rellenan al final, sin tocar componentes.

**Regla:** ningún componente escribe "New York", "LCSW" ni una URL de
reserva a mano. Todo pasa por `practice.ts`.

---

## 3. Idioma y rutas (i18n)

Bilingüe desde el día uno con `astro:i18n`, inglés como idioma por defecto.
El español no es decoración: da sesiones en español, y es su mayor ventaja
competitiva en Nueva York.

**Slugs traducidos en los dos idiomas**, sin mezclar. La versión anterior
del plan tenía `/es/about` sin traducir junto a `/es/servicios` traducido;
se corrige.

| Inglés | Español |
|---|---|
| `/` | `/es/` |
| `/about` | `/es/sobre-mi` |
| `/services` | `/es/servicios` |
| `/info` | `/es/informacion` |
| `/contact` | `/es/contacto` |
| `/privacy` | `/es/privacidad` |
| `/notice-of-privacy-practices` | `/es/aviso-de-practicas-de-privacidad` |
| `/accessibility` | `/es/accesibilidad` |
| `/thanks` | `/es/gracias` |

Selector `EN | ES` discreto en la barra de navegación de cristal.
`<link rel="alternate" hreflang="...">` recíproco en todas las páginas, más
`x-default` apuntando al inglés.

**El español se escribe, no se traduce.** Y en registro latinoamericano
neutro, no de España. Detalle en `voz-y-contenido.md`.

---

## 4. Sistema de diseño

Base: maqueta **T4 · Editorial fina**, congelada en `design-reference/`.
El README de esa carpeta es la referencia técnica detallada y sigue siendo
válido salvo en lo que este plan corrige explícitamente.

| Elemento | Decisión | Especificación |
|---|---|---|
| Base | Crema cálido | `--bg: #FDF8F0` |
| Tinta | Verde bosque | `--ink: #1F3D2B`, `--ink-muted: #3F5346`. Nunca negro puro |
| Franjas de color | Planas | `--block-1: #A8D0E2` cielo, `--block-2: #C4DBC4` savia |
| Acentos | Cítrico y naranja | `--accent: #E4E356`, `--accent-2: #F5853C`, `--accent-3: #F4F3B8`, `--accent-ink: #4F4E0E` |
| Degradado | Solo en el hero | `--mesh-1: #FFAF68`, `--mesh-2: #E0DE55`, `--mesh-3: #7CC5E7`, `--mesh-4: #FF937D` |
| Cristal | Glassmorphism | `backdrop-filter: blur(22px)` en nav, hero, tarjetas y footer |
| Titulares | Cormorant Garamond 300 | Cursiva de énfasis en 300 italic |
| Wordmark | Cormorant Unicase 600 | Solo el nombre |
| UI y botones | Jost 300 | Sin mayúsculas ni tracking ampliado |
| Cuerpo | Lato 400 / 700 | |
| Botones | Cápsula | `border-radius: 300px` |

**Tokens CSS, no Tailwind config.** `skeleton.css` ya está construido sobre
un contrato limpio de custom properties, sin un solo color ni fuente
embebida. Traducir eso a la config de Tailwind añade una capa de
indirección sin ganar nada, y arriesga perder el trabajo de contraste ya
verificado. Se usan las custom properties tal cual, en CSS de componente
con scope de Astro. Si más adelante hace falta Tailwind para utilidades de
layout, entra encima sin tocar los tokens.

**No romper la regla del cristal.** El efecto necesita variación de color
detrás. El degradado vive solo en el hero; el resto de la página usa
franjas planas. Al partir la maqueta en componentes, cada sección tiene que
conservar su `background`, o los paneles de cristal de esa sección se leen
como cajas blancas sin gracia. Está explicado a fondo en
`design-reference/README.md`, sección 4.

**Fuentes autoalojadas con Fontsource**, no el CDN de Google. Cuatro
familias son mucho peso, y en un sitio sanitario eliminar la petición a un
tercero es un argumento por sí solo. Subsetear a `latin` con los pesos
realmente usados. El subset `latin` cubre la í de Bellorín.

---

## 5. Riesgos visuales pendientes de comprobar a ojo

Ninguno de los tres se detecta con auditoría automática. Hay que mirarlos en
dispositivo real antes de dar el diseño por cerrado.

1. **Cormorant Garamond 300 sobre el degradado, detrás de cristal.** El
   contraste de color está verificado y cumple AA con margen (mínimo
   4.72:1), pero el contraste no mide grosor de trazo. Mirarlo en un móvil
   real con luz de sol. Recambio ya evaluado si falla: **Newsreader** en
   peso ligero.
2. **La tilde de Bellorín en Cormorant Unicase 600.** Unicase significa que
   mayúsculas y minúsculas comparten altura, así que un acento es un caso
   raro y puede quedar mal colocado o apretado contra el borde. Si queda
   mal: poner el wordmark en Cormorant Garamond, o ajustar el interlineado
   del wordmark para darle aire al acento.
3. **Rendimiento de `backdrop-filter` en Safari iOS.** Nav sticky con blur
   más varios paneles de cristal es el patrón que más castiga a Safari.
   Medir en iPhone real. Si va mal, reducir el blur fuera del hero, no
   eliminarlo.

---

## 6. Arquitectura de páginas

### `/` Home

- **Hero.** Titular, subtítulo de posicionamiento, dos CTA, lista de cuatro
  rasgos con iconos de trazo, foto. El bilingüismo debe estar visible aquí,
  no enterrado en `/about`.
- **Vídeo e introducción.** Vídeo corto de presentación más cita sobre su
  filosofía. Fondo `--block-1`.
- **En qué trabajamos.** El bento grid de cinco tarjetas de la maqueta,
  reencuadrado. Ver más abajo.
- **Cómo funciona el pago.** Los dos caminos, seguro y privado, sin cifras.
  Fondo `--block-2`.
- **Banda de CTA final.** Fondo `--block-1`.

**Sobre el bento grid:** la maqueta tiene cinco tarjetas (una ancha y
cuatro normales) tituladas como si fueran cinco servicios. Los servicios
son dos. Se conserva la rejilla pero cambia el encuadre: las dos
modalidades se explican arriba en texto, y las cinco tarjetas pasan a ser
**temas de trabajo**, del tipo "en qué suele ayudar la gente que viene".
Conserva el diseño aprobado intacto y además es la columna vertebral del
SEO. Necesita que ella nos dé cuatro o cinco temas reales, en sus palabras;
está en `preguntas-abiertas.md`.

### `/about`

Biografía completa con la voz de `voz-y-contenido.md`. Credenciales: título
y licencia LCSW del Estado de Nueva York, número de licencia y NPI.
Bilingüismo y qué significa en la práctica. Cómo son las sesiones virtuales.
**Sin fotos de consulta física, porque no hay consulta física.**

### `/services`

Desglose de individual y pareja: cómo trabaja cada una, para quién es, qué
esperar de las primeras sesiones.

### `/info`

Reescrita entera respecto al plan original. Estructura:

- **Los dos caminos.** Con seguro, a través de Headway. Pago privado, a
  través de SimplePractice. Presentados como dos rutas paralelas, no como
  una con excepciones.
- **Sin cifras.** Ninguna de las cuatro referencias del sector publica
  tarifas, y ella prefiere hablarlo en la consulta inicial. El widget de la
  maqueta lleva $250 / $150 / $100 de ejemplo; se reconvierte en el
  selector de los dos caminos, ocupando el mismo hueco visual.
- **Aviso de Good Faith Estimate.** Obligatorio por el No Surprises Act, y
  no es lo mismo que publicar precios: informa del derecho a pedir una
  estimación escrita. Detalle y fuentes en `legal.md`.
- **FAQ.** Acordeón `<details>` nativo, sin JS. Duración de sesión, primera
  sesión, política de cancelación, cómo funciona la teleterapia.

### `/contact`

Formulario, más los dos destinos de reserva. **La forma del formulario está
pendiente de decisión, ver sección 7.** Cobertura: teleterapia en el Estado
de Nueva York, generada desde `practice.ts`. Sin dirección física.

### Páginas legales

`/privacy`, `/notice-of-privacy-practices` y `/accessibility`. Son tres
documentos distintos con tres funciones distintas; el plan original los
mezclaba en uno. Explicado en `legal.md`.

---

## 7. Formulario y reserva — DECIDIDO

**Formulario simple sin campo de texto libre, procesado por un Worker de
Cloudflare que reenvía el aviso por Resend.** Coste cero, control visual
total, ningún widget de terceros, ningún proveedor de pago.

### 7.1 Qué recoge, exactamente

- Nombre
- Correo
- Teléfono
- Idioma preferido
- Motivo, desplegable de **opciones cerradas y logísticas**: primera
  consulta, pregunta sobre seguros, disponibilidad

**Sin campo de texto libre.** Es la restricción que sostiene toda la
decisión, así que no se añade "un textarea pequeño para comentarios" en una
iteración posterior sin releer esta sección y `legal.md` sección 3.

### 7.2 Cómo se procesa

```
navegador → Worker de Cloudflare (valida, no almacena) → Resend → buzón de ella
```

Límites del plan gratuito, con margen de sobra para una consulta que puede
recibir veinte o treinta consultas al mes:

| Pieza | Límite gratuito |
|---|---|
| Cloudflare Workers | 100.000 peticiones al día |
| Recursos estáticos | Gratis e ilimitados |
| Resend | 3.000 correos al mes, tope de 100 al día |

El Worker **no persiste nada**: recibe, valida, convierte en correo y
termina. Esto es deliberado y es el argumento central de la decisión, ver
7.4.

### 7.3 La distinción que hay que entender: alojar no es procesar

**Servir el sitio no toca información sanitaria.** HTML, CSS e imágenes son
archivos estáticos; el proveedor de alojamiento no es business associate por
entregarlos.

**Procesar el formulario sí toca el dato.** Y aquí Cloudflare solo firma BAA
en Enterprise, igual que Netlify no lo firma en ningún plan. Así que cambiar
de proveedor de alojamiento no resuelve nada por sí solo: lo que importa es
qué pasa con el envío.

Por eso son dos decisiones separadas, y por eso el alojamiento en Cloudflare
es correcto sin discusión mientras el formulario se analiza aparte.

### 7.4 Por qué esta opción y no Netlify Forms

Netlify Forms **almacena** cada envío en su panel indefinidamente, hasta que
alguien entra y los borra a mano. El Worker no guarda nada.

Menos datos en reposo es menos exposición. En el punto exacto que nos
preocupaba, esta arquitectura es más limpia que la que había en el plan
original, además de más barata y sin sistema de créditos.

La brecha de BAA es la misma en los dos casos, eso no cambia. Lo que cambia
es que no se acumula un historial de consultas en el panel de un tercero.

### 7.5 El riesgo residual, honestamente

Cloudflare y Resend están en el camino del dato sin BAA. Con campo de texto
libre eso sería difícil de defender. Sin campo de texto libre, con solo datos
de contacto y un motivo de una lista cerrada, sin diagnóstico ni descripción
de síntomas, es una posición razonable y así lo decidió el cliente sabiendo
el intercambio.

El análisis completo, con el caso judicial que acota la definición de
información sanitaria identificable, está en `legal.md` sección 3.

### 7.6 El buzón de ella: necesario, pero no por la web

Esto se confundió durante bastante tiempo y conviene dejarlo claro para
quien lo lea después.

Ella es terapeuta. Va a escribirse por correo con clientes reales sobre
citas, facturas y superbills. Su bandeja de entrada va a contener
información sanitaria protegida desde la primera semana, **exista esta web o
no**.

Así que el buzón profesional con BAA, unos ocho dólares al mes con Google
Workspace, o Hushmail, o Proton, es un requisito de tener consulta privada,
no un coste que genere nuestro formulario. Si alguien en el futuro se
pregunta por qué se paga ese correo, la respuesta no está en la web.

Lo clínico debe ir por el Secure Messaging de su portal de SimplePractice,
no por correo. Está pendiente confirmar que lo usa así, ver
`preguntas-abiertas.md`.

### 7.7 El resto del formulario

- **Cloudflare Turnstile como antispam.** Sin cookies, sin seguimiento de
  usuarios, y siendo del mismo proveedor que sirve el sitio no añade un
  tercero nuevo. Sustituye al honeypot que había en el plan anterior y
  descarta reCAPTCHA, que es Google observando a cada visitante de una web de
  terapia.
- **Aviso en el formulario** de que el canal es para consultas generales y
  logística.
- **Redirección a `/thanks`** en el idioma correspondiente, con microcopy
  cálido. Ver `voz-y-contenido.md` sección 4.
- **La dirección de destino vive en `practice.ts`.** Es un string. Si empieza
  siendo un correo provisional y luego monta el profesional, es cambiar una
  línea y volver a desplegar.

### 7.8 Reserva real

Los CTA de reserva apuntan a **sus propias plataformas**: portal de
SimplePractice para pago privado, perfil de Headway para seguro. Son suyas y
están cubiertas por BAA, así que se respeta que no quiera derivar a la web
del grupo con el que trabaja.

### 7.9 Lo que se descartó, y por qué

Para que nadie reabra la discusión desde cero:

| Descartado | Motivo |
|---|---|
| **Netlify Forms** | Sin BAA y almacena los envíos. Era además la única razón para estar en Netlify |
| **Widget de SimplePractice** | Cubierto y gratis, pero control visual desconocido y el cliente prefirió no incrustar terceros |
| **Paubox o Jotform HIPAA** | Cubiertos y con control total, pero 10-30 USD/mes es mal valor para un formulario sin texto libre |
| **Hushmail** | Solo iframe, mal encaje visual con T4 |
| **Campo de texto libre** | Descartado por el cliente. Es lo que permite que el resto sea gratis |
| **Worker que envíe a un endpoint con BAA** | Requeriría guardar una clave secreta, imposible en un sitio estático sin reintroducir la misma pregunta |

Nota sobre la calidez, que fue el argumento en contra: el campo de mensaje
sí tenía valor real, porque mucha gente que nunca ha ido a terapia necesita
contar algo antes de atreverse a agendar. Ostler Therapy, una de las cuatro
referencias que dio Johanna, lo tiene. Al no tenerlo, **el microcopy del
formulario y de `/thanks` tiene que trabajar el doble** para que el trámite
no se sienta frío. Ver `voz-y-contenido.md` sección 4.

---

## 8. SEO

**Sin Google Business Profile.** Google exige contacto presencial con
clientes para tener perfil, y los negocios exclusivamente online no son
elegibles. Toda la estrategia de SEO local del plan original es
inejecutable y se sustituye.

**Búsquedas de intención**, que para ella rinden más de todos modos:

- `online therapist New York`, `virtual couples therapy NY`
- `terapeuta en español Nueva York`, `terapia de parejas en español NY` —
  aquí tiene ventaja real y poca competencia. Es la apuesta principal.

**JSON-LD corregido.** `schema.org` no tiene tipo `Therapist`; el plan
original lo inventaba. Se usa `MedicalBusiness` **sin `address`**, con
`areaServed` generado desde `licensedStates` y
`availableLanguage: ["en","es"]`, más un `Person` para ella con `jobTitle`
y credencial.

**Metadatos con las dos grafías**, Bellorín y Bellorin, porque la gente va
a buscarla de las dos formas y los teclados en Estados Unidos no ponen
tildes con facilidad. El nombre visible siempre con tilde.

Resto: `sitemap.xml` automático, imágenes en webp/avif con `<Image />` de
Astro, `public/llms.txt`, OpenGraph con imagen propia, página 404 en los dos
idiomas. **Quitar los `noindex`** heredados de las maquetas de exploración
antes de publicar.

**Directorios.** Psychology Today suele ser la primera fuente de clientes
de una consulta privada. Pendiente de confirmar si tiene perfil.

---

## 9. Fases de implementación

### Fase 1 · Andamiaje

- [ ] Inicializar Astro con salida estática y `astro:i18n`.
- [ ] `src/data/practice.ts` como única fuente de verdad.
- [ ] Portar los tokens de `design-reference/` a CSS global.
- [ ] Fuentes autoalojadas con Fontsource, subset `latin`.
- [ ] `BaseLayout.astro` con metadatos, `hreflang` y JSON-LD.
- [ ] Configurar el proyecto de Cloudflare Workers con Static Assets y el
      despliegue desde el repositorio.
- [ ] Activar Cloudflare Web Analytics con inyección automática del beacon en
      el borde, para no meter el script en el HTML.
- [ ] `HeaderNav.astro` con selector EN/ES y **menú hamburguesa** — la
      maqueta simplemente oculta el menú en móvil, falta resolverlo.
- [ ] `Footer.astro` con aviso de crisis, credencial y jurisdicción.

### Fase 2 · Páginas y formulario

- [ ] Home con sus siete secciones, cada una conservando su fondo.
- [ ] Formulario simple de `/contact` con el marcado propio, según la
      sección 7. Sin campo de texto libre.
- [ ] Worker del formulario: validación de campos, verificación de Turnstile
      y envío por Resend. Sin persistencia de ningún tipo.
- [ ] Configurar Resend: dominio verificado con sus registros DKIM, SPF y
      DMARC en el DNS de Cloudflare.
- [ ] `/about`, `/services`, `/info` en los dos idiomas.
- [ ] Páginas legales: privacidad, NPP, accesibilidad.
- [ ] `/thanks` y 404 en los dos idiomas.
- [ ] Contenido en colecciones para que FAQ y temas no se descuadren entre
      idiomas.

### Fase 3 · Verificación

- [ ] Repetir la auditoría de contraste nodo a nodo. Si se toca un color,
      se vuelve a medir; en las rondas anteriores hubo colores que pasaban
      a ojo y fallaban medidos.
- [ ] Los tres riesgos visuales de la sección 5, en dispositivo real.
- [ ] `prefers-reduced-motion`: con esa preferencia activada, la página
      completa sin una sola animación y sin perder contenido. No
      negociable, parte del público tiene sensibilidad al movimiento.
- [ ] Prueba real de envío del formulario y recepción del correo, en los dos
      idiomas.
- [ ] Confirmar que el Worker no deja rastro: ni KV, ni D1, ni logs con datos
      personales. Si se dejan logs de depuración con el contenido del envío,
      se rompe el argumento de la sección 7.4.
- [ ] Verificar que Turnstile funciona y no bloquea a usuarios legítimos.
- [ ] Comprobar el límite de builds del plan gratuito de Cloudflare y medir
      el consumo real, para no llevarnos una sorpresa.
- [ ] Confirmar que no hay ni una petición a un dominio de terceros en toda
      la página. Es el argumento que sostiene la elección de Cloudflare y
      conviene medirlo, no suponerlo.

### Fase 4 · Publicación

- [ ] Dominio en Cloudflare Registrar y SSL.
- [ ] Repositorio conectado a Cloudflare para despliegues automáticos.
- [ ] Sustituir todos los datos ficticios por los reales. La maqueta lleva
      `hello@johannabellorin.com`, `(212) 555-0148` y "Flatiron, New York",
      todos inventados.
- [ ] Revisión legal por un abogado sanitario de Estados Unidos antes de
      publicar.
- [ ] Traspaso de la cuenta de Cloudflare y del dominio a su nombre.

### Fuera de alcance por ahora

Capa de animación con GSAP. El planteamiento está diseñado en
`plan-accion.md` del proyecto de diseño. La pregunta de cuánto peso darle al
lado desenfadado ya está contestada, ver `voz-y-contenido.md`, así que
cuando se retome hay criterio.

---

## 10. Correcciones sobre el plan original

Lo que se detectó al revisar la versión anterior de este documento, para que
nadie las reintroduzca:

| Decía | Realidad |
|---|---|
| Consulta física en Flatiron, Manhattan, con fotos del espacio | No hay consulta física. Era información inventada en la fase de planificación. Solo teleterapia |
| SEO local con Google Business Profile | Los negocios solo online no son elegibles para GBP |
| Modelo out-of-network con superbills | Headway para seguros, SimplePractice para privado. Dos caminos, no uno |
| Cinco servicios en el bento grid | Dos servicios: individual y pareja. Las cinco tarjetas pasan a ser temas |
| Netlify como alojamiento, con Netlify Forms | Todo en Cloudflare. Netlify estaba en el plan por sus formularios; al descartarlos, la razón desapareció. Ver la nota de la sección 1 |
| Netlify Starter gratuito con 100 GB | Ese plan ya no existe así. Netlify pasó a créditos en septiembre de 2025, con 300 al mes en el gratuito. Irrelevante ahora, se documenta para que nadie lo reintroduzca citando el plan viejo |
| `@type: Therapist` en JSON-LD | Ese tipo no existe en schema.org |
| `/privacy` cubriendo privacidad y accesibilidad | Tres documentos distintos: privacidad web, NPP de HIPAA y declaración de accesibilidad |
| Aviso HIPAA en el formulario como única medida | El aviso no resuelve nada por sí solo, la arquitectura sí. Ver sección 7 |
| Netlify Forms con `data-netlify="true"` | Worker de Cloudflare que valida y reenvía por Resend, sin almacenar nada |
| Formulario con campo de mensaje libre | Sin texto libre. Es la restricción que permite que la infraestructura sea gratis |
| Honeypot antispam | Cloudflare Turnstile, sin cookies y sin tercero nuevo |
| El buzón con BAA como coste del formulario | Lo necesita por ser terapeuta, con web o sin web. Ver sección 7.6 |
| `/es/about` junto a `/es/servicios` | Slugs traducidos de forma consistente |
| Johanna Bellorin | Bellorín, con tilde |
| Sin mención del Good Faith Estimate | Obligatorio por el No Surprises Act, y visible en el sitio web |

También quedó descartada una preocupación anterior: la designación "R" del
LCSW-R ya no se requiere para reembolso de seguros, NYSED la eliminó de ese
uso. Que ella sea LCSW sin "R" no limita nada de lo planteado aquí.
