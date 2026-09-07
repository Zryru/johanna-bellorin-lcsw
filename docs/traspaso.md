# Documento de traspaso — sitio de Johanna Bellorín, LCSW

Resumen autocontenido de todo el proceso de diseño, pensado para que
cualquiera (Jorge, otro desarrollador, o el propio Jorge dentro de unos
meses) pueda retomar el proyecto sin tener que leer el historial completo
de decisiones. El detalle turno a turno, con toda la argumentación y las
mediciones, sigue en `docs/plan-accion.md` por si hace falta el porqué
exacto de algo.

Última actualización: sesión en la que se cerró la tipografía y se generó
`final/`.

---

## Nota de estado — leer antes que el resto

**Este documento cierra la fase de diseño y sigue siendo válido para todo lo
visual.** No lo es para el alcance, el contenido ni el modelo de negocio: la
sesión de arranque de la implementación destapó varios datos que lo
contradicen.

Para la fase de implementación, los documentos vigentes son:

| Documento | Para qué |
|---|---|
| `plan.md` | Plan de implementación completo. Su sección 10 lista las correcciones sobre el plan original |
| `legal.md` | Requisitos legales de Estados Unidos y Nueva York, con fuentes y checklist previo a publicar |
| `voz-y-contenido.md` | Cómo se escriben los textos en los dos idiomas |
| `preguntas-abiertas.md` | Qué falta por confirmar y quién lo resuelve |
| `../design-reference/` | La maqueta T4 congelada, con su README técnico |

**Lo que este documento dice y ya no es cierto:**

- Escribía el apellido sin tilde. Se escribe **Bellorín**; ya corregido en
  este documento. La maqueta de `design-reference/` sigue teniéndolo mal, en
  el `<title>` y en el wordmark, y hay que corregirlo al implementar.
- Da por hecha una consulta física en Flatiron, Manhattan. **No existe.** Era
  información inventada en la fase de planificación. La práctica es
  teleterapia únicamente.
- Deja el idioma del sitio como "asumido inglés, nunca confirmado". Ya está
  confirmado: **bilingüe**, con sesiones reales en inglés y en español. El
  español es la apuesta principal de posicionamiento.
- Su sección 6 lista como pendientes cosas que ya están decididas: el
  formulario de contacto, el modelo de pago y el grado de informalidad del
  tono.

**Lo que sigue siendo válido y no hay que rehacer:** toda la sección 4
(decisiones de diseño que hay que respetar), la sección 5 (estado técnico
verificado, incluida la auditoría de contraste AA nodo a nodo con mínimo de
4.72:1) y el historial de las tres rondas, que es la justificación de por
qué se llegó a T4.

**Referencias que no resuelven desde aquí:** este documento cita
`docs/plan-accion.md` y las carpetas `mockups/` y `reference/`. Viven en el
proyecto de diseño original, no en este repositorio. Aquí solo se trajo
`final/`, como `design-reference/`.

---

## 1. Qué es este proyecto

Diseño visual del sitio web de **Johanna Bellorín, LCSW**, terapeuta con
consulta privada en Nueva York (Manhattan, individual y pareja, presencial
y online). El encargo fue explorar dirección visual antes de construir
nada real: sin copy definitivo, sin fotos reales, sin formulario de
contacto funcional. Solo maquetas HTML estáticas para que Johanna pudiera
comparar estilos y decidir.

**Brief original** (`docs/plan.md`): alta autoridad profesional pero
cercana y viva, cero frialdad. Referencias visuales: Manhattan Wellness,
myTherapyNYC, Ostler Therapy, Fresh Start Parenting — cuatro consultas
boutique de Nueva York que Johanna señaló como orientación.

## 2. Resultado: qué se elige y dónde está

**Se elige la variante T4 · Editorial fina.** Colores y efecto cristal de
la ronda de color (la mezcla llamada "Cítrica Cristal"), con una
tipografía fina y editorial: Cormorant Garamond en los titulares,
Cormorant Unicase en el nombre de Johanna.

**Está aislada, verificada y lista para reconstruir en Astro en:**

```
final/
├── index.html          página completa de una pieza
├── shared/
│   ├── skeleton.css     estructura y componentes, sin color ni tipografía
│   └── glass.css        capa de efecto cristal (glassmorphism)
└── README.md            explicación técnica detallada, sección por sección
```

`final/README.md` es el documento a seguir para la implementación: tabla
completa de tokens de color, por qué el efecto cristal solo vive en la
cabecera (es fácil de romper si se reconstruye por secciones sin entender
esto), la tipografía elegida y su riesgo pendiente de confirmar a ojo, el
mapeo de secciones a posibles componentes Astro, y qué contenido es de
relleno y hay que sustituir antes de publicar.

**No borrar `mockups/` ni `reference/` todavía.** Son el historial
completo de exploración (17 propuestas HTML entre las tres rondas) y el
análisis de las cuatro referencias. Sirven de justificación si en algún
momento hay que explicar por qué se llegó a T4, y sirven de banco de
recursos si surge la necesidad de retomar alguna idea descartada.

## 3. Cómo se llegó ahí — las tres rondas, resumidas

### Ronda 1 — color y forma (5 propuestas)

Cinco direcciones de color partiendo de las cuatro referencias: **A
Cítrica** (basada en Ostler, aclarada), **B Periwinkle** (azul, la única
sin referencia directa), **C Terracota** (mezcla de tres referencias, la
más convencional del sector a propósito), **D Cristal** (glassmorphism,
por encargo directo de Jorge de probarlo), **E Editorial** (esquina recta,
creada para cubrir un hueco real: dos de las cuatro referencias eran
rectas y las cuatro primeras propuestas habían salido redondeadas por
sesgo nuestro).

**Johanna eligió A y D**, con ligera preferencia por D, y propuso dos
cruces de su propia iniciativa. B, C y E quedaron descartadas.

### Ronda 2 — el cruce de color y el efecto cristal (2 propuestas nuevas)

Se construyeron los dos cruces que ella pidió: **F Cítrica Cristal**
(colores de A + paneles de cristal de D) y **G Cristal Suave** (D con la
tipografía de A). Problema técnico real resuelto en F: el efecto cristal
necesita variación de color detrás para notarse, así que el degradado solo
vive en la cabecera y el resto de la página conserva las franjas de color
plano de A.

**Johanna elige F**, y pide ajustar el azul de la cabecera ("un pelo
apagado"). Tras dos ajustes de saturación que no acababan de convencerle,
se descubrió que el problema real no era la intensidad del azul sino su
*posición*: prefería directamente el degradado de G, que arranca en
melocotón y coral. Se sustituyó el degradado entero. Lección para
recordar: cuando alguien repite la misma petición dos veces y el ajuste no
la satisface, es señal de que el diagnóstico está mal, no de que haga
falta un ajuste más fuerte.

### Ronda 3 — la tipografía (4 propuestas nuevas)

Con el color y la forma ya cerrados en F, Johanna pidió no repetir la sans
gruesa de la Cristal original, y algo con un "toque de diversión, no texto
normal" — citó como referencia el logo manuscrito de Ostler, sin querer
copiarlo. Hallazgo clave: ese logo de Ostler no es la tipografía del
sitio, es una imagen aparte; los titulares de Ostler son una serif
tranquila. El patrón correcto es concentrar la personalidad en un solo
sitio, no repartirla.

Se construyeron cuatro variantes de letra, todas sobre F, cambiando solo
tipografía para que la comparación fuera limpia:

| | Qué cambiaba | Para qué servía |
|---|---|---|
| T1 · Botón suave | Solo la fuente de botones y menú | Aislar si el problema era esa fuente en concreto |
| T2 · Firma con carácter | Solo el nombre de Johanna, con más personalidad | Modelo Ostler: la diversión vive solo en la firma |
| T3 · Alegre | Titulares, nombre, botones y texto | La más desenfadada, personalidad en toda la página |
| **T4 · Editorial fina** | Titulares finos + nombre distinto | **La elegida**: la más elegante, consigue lo distinto por la forma de la letra |

Ajuste final pedido por Johanna: quitar los destellos dibujados
("estrella", un recurso decorativo heredado de A) de T2 y T4.

## 4. Decisiones de diseño que hay que respetar al reconstruir

- **Paleta cálida, nunca fría.** Base crema (`#FDF8F0`), verde bosque como
  tinta (`#1F3D2B`), nunca negro puro ni fondos oscuros. Viene directo del
  brief: "cero frialdad".
- **El efecto cristal solo tiene sentido con variación de color detrás.**
  Por eso el degradado vive solo en la cabecera y el resto de la página usa
  franjas de color plano. Si se reconstruye por secciones y alguna pierde
  su fondo de color, los paneles de cristal de esa sección van a leerse
  como cajas blancas sin gracia.
- **Botones en cápsula** (`border-radius: 300px`), heredado de Ostler, la
  referencia más sólida de las cuatro.
- **La personalidad tipográfica vive en el nombre de Johanna, no en el
  resto del texto.** Es la decisión central de T4 y la razón por la que
  funciona sin volverse difícil de leer.
- **Sin destellos decorativos** en la variante final (se quitaron a
  petición explícita).
- **`prefers-reduced-motion` no negociable** si se implementa la fase de
  animación (ver sección 6): quien lo tenga activado en su dispositivo debe
  ver la página completa, sin una sola animación, sin perder contenido. Es
  relevante en un sitio de terapia porque parte del público tiene
  sensibilidad al movimiento en pantalla.

## 5. Estado técnico verificado

- **Accesibilidad AA**, medida nodo a nodo componiendo el color real de
  fondo (incluye el degradado del hero, pliega opacidades parciales), no
  estimada a ojo. Mínimo verificado en T4: **4.72:1**, en escritorio
  (1440px) y móvil (390px), cero fallos.
- **Riesgo pendiente de confirmar a ojo, no medible por contraste de
  color:** Cormorant Garamond a peso 300 (el titular de T4) tiene trazos
  muy finos. El contraste de color cumple con margen, pero el contraste no
  mide grosor de trazo, y ese trazo fino sobre el degradado y detrás de un
  panel de cristal es la combinación más exigente de las cinco variantes
  para leerse bien en una pantalla real con luz de sol. Mirarlo en un móvil
  de verdad antes de darlo por cerrado. Recambio ya identificado si falla:
  Newsreader en su peso ligero.
- **Todas las tipografías usadas son libres** (Google Fonts, licencia
  OFL), verificado explícitamente porque una de las referencias
  (Manhattan Wellness, su tipografía real "Agne") no lo era y se descartó
  por eso.
- **Publicado en GitHub Pages** para que Johanna lo revisara. Dos
  problemas de publicación ya resueltos y documentados en detalle en
  `plan-accion.md` por si se vuelve a publicar algo así: Jekyll ignora
  carpetas con guion bajo (de ahí que la carpeta compartida se llame
  `shared/` y no `_shared/`, y que haya un `.nojekyll` en la raíz), y los
  iframes de comparación sirven versiones cacheadas que una recarga normal
  no refresca (hay que probar en ventana privada).
- **`noindex` y `robots.txt`** en todas las páginas de exploración: llevan
  el nombre real de Johanna con datos de contacto ficticios, así que no
  deben indexarse en buscadores.

## 6. Lo que falta, explícitamente fuera de este alcance

- **Implementación real en Astro.** Es el siguiente paso, para el que
  existe `final/` con su README de traspaso técnico.
- **Copy definitivo.** Todo el texto actual es de relleno, en inglés, con
  el tono y la estructura correctos pero sin que Johanna lo haya revisado
  frase a frase.
- **Fotografía real.** Habrá sesión profesional, confirmada por Jorge, sin
  fecha todavía. Los marcadores de foto actuales son degradados de color.
- **Formulario de contacto o reserva.** Los botones de llamada a la acción
  apuntan a anclas de la propia página, no a ningún destino real.
- **Capa de animación (GSAP).** Se diseñó el planteamiento completo
  (entradas de hero, aparición por scroll, contador animado en el widget de
  seguros, acordeón animado) pero no se llegó a construir. Sigue abierta
  una pregunta de fondo: cuánto peso quiere Johanna darle al lado
  desenfadado de su trabajo, en especial en terapia de pareja, porque eso
  decide si el movimiento final es contenido o con más carácter. El diseño
  completo de esta fase, con sus reglas de accesibilidad, está en
  `docs/plan-accion.md`, sección "Fase 5 — Capa de animación con GSAP".
- **Menú móvil real.** Ahora mismo el menú de navegación simplemente
  desaparece en pantallas estrechas; falta un menú hamburguesa.
- **Idioma final del sitio.** Se asumió inglés (por el público en NY) pero
  nunca se confirmó explícitamente con Johanna.
- **`mockups/01-tres-opciones.html`** es un archivo huérfano de una
  exploración muy temprana, sin enlazar desde ningún índice. No estorba,
  pero nadie ha decidido si borrarlo.

## 7. Mapa de archivos del proyecto completo

```
astro/
├── index.html                 portada del sitio de exploración (publicado)
├── favicon.svg                genérico, neutro
├── robots.txt / .nojekyll     configuración de publicación
├── docs/
│   ├── plan.md                 brief original del cliente
│   ├── plan-accion.md          historial completo turno a turno, con toda
│   │                            la argumentación, mediciones y aprendizajes
│   └── traspaso.md             este documento
├── reference/                  las 4 referencias que dio Johanna, analizadas
│   ├── 01-manhattan-wellness/  02-mytherapynyc/  03-ostler-therapy/
│   └── 04-fresh-start-parenting/
├── mockups/                    las 17 propuestas HTML de las 3 rondas
│   ├── shared/                  skeleton.css + glass.css compartidos
│   ├── index.html               índice comparativo (publicado)
│   ├── A-citrica.html … E-editorial.html      ronda 1
│   ├── F-citrica-cristal.html, G-cristal-suave.html   ronda 2
│   └── T1…T4                    ronda 3 (T4 es la elegida)
└── final/                      ← EMPEZAR AQUÍ para la implementación real
    ├── index.html                T4 aislada, sin barra de comparación
    ├── shared/                   copia limpia de skeleton.css + glass.css
    └── README.md                 guía técnica de traspaso a Astro
```
