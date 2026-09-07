# Contenido del sitio

Esta carpeta es **el área editable**. Todo el texto que se lee en la web sale
de aquí, salvo dos excepciones que se explican más abajo.

Si has llegado aquí para cambiar un texto, estás en el sitio correcto.

---

## Lo primero: qué se puede cambiar y qué no

| Quiero cambiar | Voy a | ¿Libre? |
|---|---|---|
| Un párrafo, una biografía, una respuesta del FAQ | `src/content/` (esta carpeta) | Sí |
| Un botón, el menú, una etiqueta de formulario | `src/i18n/en.ts` y `es.ts` | Sí |
| El teléfono, el correo, la credencial, un enlace de reserva | `src/data/practice.ts` | Sí, un solo sitio |
| El aviso de crisis, el del Good Faith Estimate, la licencia | `src/data/legal-notices.ts` | **No sin revisión legal** |

**Los avisos legales no se tocan.** Viven fuera de esta carpeta a propósito.
Suenan más secos que el resto del sitio y es intencionado: alguien en crisis a
las tres de la mañana no necesita ingenio, necesita un número de teléfono. Si
te han pedido "hacer los textos más cálidos", ese archivo no entra.

**Los hechos no se escriben en la prosa.** Si el teléfono de Johanna aparece
dentro de un párrafo de Markdown, cambiarlo se convierte en buscar y
reemplazar por doce archivos en dos idiomas. Los datos van en `practice.ts` y
las plantillas los insertan.

---

## Las tres colecciones

### `pages/` — las páginas del sitio

Un archivo por página y por idioma.

```
pages/
├── en/  home.md  about.md  services.md  info.md  contact.md  privacy.md
└── es/  home.md  about.md  services.md  info.md  contact.md  privacy.md
```

**El nombre del archivo siempre está en inglés**, aunque la URL pública esté
traducida. `about.md` en la carpeta `es/` se publica como `/es/sobre-mi`. El
mapa de traducciones está en `src/i18n/routes.ts`.

Esto es a propósito: así no hace falta conocer el mapa de slugs para encontrar
el archivo de una página, y los dos idiomas tienen la misma estructura de
carpetas.

Cada archivo lleva un bloque de frontmatter y luego el texto:

```markdown
---
title: About Johanna
description: Una descripción de entre 50 y 160 caracteres para buscadores.
heading: Therapy that doesn't feel like a <em>cold chore</em>
subheading: Frase de apoyo, opcional.
eyebrow: Antetítulo pequeño, opcional.
---

Aquí va el texto de la página, en párrafos normales de Markdown.
```

### `topics/` — las tarjetas de la home

Son los motivos por los que la gente acude a ella: ansiedad, transiciones de
vida, conflictos de pareja, lo que sea. Se pintan como la rejilla de tarjetas
de la página principal.

**No son los servicios.** Los servicios son dos, terapia individual y terapia
de pareja, y se explican en `pages/services.md`.

Un archivo por tema y por idioma, con el mismo nombre de archivo en los dos:

```
topics/
├── en/  anxiety.md  life-transitions.md
└── es/  anxiety.md  life-transitions.md
```

El campo `order` decide la posición. **La tarjeta con `order: 1` sale al doble
de ancho** en el diseño, así que ahí va el tema más importante.

### `faq/` — las preguntas frecuentes

Un archivo por pregunta y por idioma. Añadir una pregunta es crear dos
archivos, no editar una lista larga.

Las preguntas tienen que sonar a lo que alguien escribiría en el buscador a
las dos de la mañana. "¿Cuánto dura esto?" antes que "¿Cuál es la duración de
las sesiones?". Es donde vive buena parte de la personalidad del sitio.

`featured: true` hace que la pregunta aparezca también en el resumen de la
home. Tres o cuatro como máximo.

---

## Las dos reglas del bilingüismo

**Uno. El español no es la traducción del inglés.** Son dos originales. Johanna
da sesiones reales en los dos idiomas y el español es su mayor ventaja
competitiva en Nueva York, así que no es una versión de segunda.

Pueden divergir en ejemplos y en referencias culturales mientras cumplan la
misma función. El humor sobre todo: una broma traducida literalmente suena a
subtítulo mal hecho. Cada idioma necesita su propio chiste en el mismo sitio,
no las mismas palabras.

**Dos. Registro latinoamericano neutro en español.** El público son
hispanohablantes de Nueva York. Sin "vosotros", sin "vale", sin "os", sin
giros peninsulares. Y tuteo, no usted: una terapeuta que se describe como "tu
amiga confidente" no habla de usted.

Si editas un archivo en `en/`, comprueba si su pareja en `es/` necesita el
cambio equivalente. No siempre lo necesita.

---

## El tono, en dos frases

La tipografía es fina y elegante, así que ya transmite competencia
profesional sin que haya que decirla. Eso deja al texto libre para ser cálido
y divertido sin que el sitio parezca poco serio.

El humor va en el microcopy, no en los titulares. La guía completa está en
`docs/voz-y-contenido.md` y merece la pena leerla antes de escribir mucho.

---

## Si el build falla

Los esquemas de `config.ts` validan cada archivo. Si falta un campo
obligatorio o un texto se pasa de largo, la compilación falla y el mensaje
dice exactamente qué archivo y qué campo.

Eso es la red de seguridad, no un estorbo: evita publicar media página sin
traducir sin que nadie se dé cuenta.

**No borres el campo del esquema para que compile.** Rellena el campo.
