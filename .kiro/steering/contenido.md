---
inclusion: fileMatch
fileMatchPattern: 'src/content/**|src/i18n/**|src/data/**'
---

# Reglas al editar contenido del sitio

Este proyecto es la web de Johanna Bellorín, LCSW, terapeuta bilingüe con
consulta de teleterapia en Nueva York. Sitio estático en Astro, bilingüe
inglés y español.

## Qué NO se toca

**`src/data/legal-notices.ts` no se modifica.** Cada texto de ese archivo
cumple una obligación legal concreta: el aviso de crisis con el 911 y el 988,
el aviso del derecho a un Good Faith Estimate del No Surprises Act, la
declaración de jurisdicción de teleterapia, el disclaimer de no-relación
terapéutica.

Suenan más secos que el resto del sitio a propósito. Si te piden mejorar el
tono, hacer los textos más cálidos o más breves, **ese archivo queda fuera del
alcance del cambio**. Cambiarlo requiere revisión de un abogado sanitario.

Si crees que hay un error factual o legal en ese archivo, dilo en lugar de
corregirlo.

## Dónde va cada cosa

| Tipo de texto | Archivo |
|---|---|
| Prosa: biografías, descripciones, respuestas del FAQ | `src/content/**/*.md` |
| Interfaz: menú, botones, etiquetas de formulario | `src/i18n/en.ts` y `es.ts` |
| Hechos: teléfono, correo, credencial, estados, URLs de reserva | `src/data/practice.ts` |
| Textos exigidos por ley | `src/data/legal-notices.ts` — protegido |

**Nunca escribas un hecho dentro de la prosa.** Ni el teléfono, ni la
credencial, ni "Nueva York" como estado con licencia. Todo eso sale de
`practice.ts` y las plantillas lo insertan. El motivo es que va a cambiar:
Florida está confirmada como plan futuro y el contacto real todavía no existe.

## Bilingüismo

El español **no es la traducción** del inglés. Son dos originales que pueden
divergir en ejemplos y referencias culturales mientras cumplan la misma
función. El humor especialmente: no se traduce, se reescribe.

Registro **latinoamericano neutro** en español, no de España. Sin "vosotros",
sin "vale", sin "os". Tuteo, nunca usted.

Los nombres de archivo son siempre canónicos en inglés (`about.md`) aunque la
ruta pública esté traducida (`/es/sobre-mi`). El mapa está en
`src/i18n/routes.ts`.

Al editar un archivo en `en/`, comprueba si su pareja en `es/` necesita el
cambio equivalente. No siempre lo necesita.

## Tono

La tipografía elegida es fina y editorial, así que ya transmite competencia
profesional sin decirla. Eso libera al texto para ser cálido.

- El humor vive en el **microcopy**, no en los titulares
- Segunda persona, frases cortas
- Nada de lenguaje corporativo de bienestar: ni "viaje de sanación" ni
  "espacio sagrado"
- Nada de promesas de resultado, por ética y por estilo
- **Sin testimonios de clientes**, nunca: choca con el código ético de NASW
- Sin signos de exclamación salvo razón real

La guía completa está en `docs/voz-y-contenido.md`.

## Ortografía del nombre

Se escribe **Bellorín**, con tilde, siempre que sea texto visible. La grafía
sin tilde (`practice.nameAscii`) es solo para dominio, correo y palabras clave
de SEO.

## Si el build falla por validación

Los esquemas de `src/content/config.ts` son deliberados. No elimines un campo
del esquema para que compile: rellena el campo que falta.
