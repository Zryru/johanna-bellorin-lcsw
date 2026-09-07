# T4 · Editorial fina — variante elegida

Johanna Bellorin, LCSW. Esta carpeta es el punto de partida para el sitio
real en Astro. Contiene la maqueta ganadora aislada (`index.html` +
`shared/`), verificada, y este documento con todas las decisiones que hay
que respetar al reconstruirla por secciones.

**Cómo usar esta carpeta:** abre `index.html` en el navegador para ver la
maqueta completa de una sola página. Es HTML y CSS estático, sin build.
Cuando lo pases a Astro, cada `<section>` de `index.html` es candidata a
convertirse en un componente (`Hero.astro`, `Services.astro`, etc.), y los
tokens del bloque `:root` de `<style>` son candidatos a `tokens.css` o a
variables de Tailwind/CSS custom properties, según cómo lo montes.

---

## 1. Qué es esta variante, en una frase

La Cítrica Cristal (colores cálidos + paneles de vidrio) con una tipografía
fina y editorial: Cormorant Garamond en los titulares, Cormorant Unicase en
el nombre de Johanna. Es la más elegante y la más discreta de las cinco
variantes de letra que se probaron, y la que Johanna eligió tras ver F, T1,
T2, T3 y T4 lado a lado.

## 2. Historial de decisiones, resumido

El proceso completo (cuatro rondas: color, cristal, tipografía, ajustes
finos) está documentado en `../docs/plan-accion.md`. Aquí solo el resumen
que importa para reconstruir:

1. **Ronda 1 — color y forma.** Cinco paletas partiendo de las referencias
   que Johanna dio (Ostler Therapy, principalmente). Ganó **A · Cítrica**:
   cielo, savia, cítrico y naranja sobre base crema, con verde bosque como
   tinta. Nunca chocolate ni negro.
2. **Ronda 2 — el efecto cristal.** Johanna pidió explícitamente probar
   glassmorphism. Se cruzó con la Cítrica → **F · Cítrica Cristal**: paneles
   translúcidos con blur, pero solo en la cabecera (ver sección 4 sobre por
   qué no en toda la página). El azul del degradado se ajustó dos veces por
   petición suya y al final se sustituyó el degradado completo por el de
   otra variante (arranca en melocotón/coral en vez de en azul), porque el
   problema real era la posición del azul, no su saturación.
3. **Ronda 3 — tipografía.** Cuatro variantes de letra sobre la misma F:
   T1 (solo cambia el botón), T2 (personalidad solo en la firma, modelo
   Ostler), T3 (personalidad en toda la página, la más desenfadada) y
   **T4 · Editorial fina** (la elegida): la más fina y elegante, consigue lo
   distinto por la forma de la letra y no por decoración.
4. **Ajuste final.** Johanna pidió quitar los destellos dibujados
   ("estrella") de T2 y T4. En esta variante ya no están.

## 3. Paleta de color

Todo sale de `custom properties` en el `:root` de `index.html`. Los nombres
son descriptivos, no literales del CSS, para que sea fácil migrarlos a
donde sea (Tailwind config, tokens de diseño, etc.):

| Token CSS | Valor | Uso |
|---|---|---|
| `--bg` | `#FDF8F0` | Fondo general, crema cálido |
| `--bg-alt` | `#DCEEF5` | Fondo alterno, sin uso activo ahora mismo |
| `--block-1` | `#A8D0E2` | Franja azul cielo: fondo de la sección de vídeo y del CTA final |
| `--block-2` | `#C4DBC4` | Franja verde savia: fondo de la sección de seguros |
| `--ink` | `#1F3D2B` | Texto principal, verde bosque oscuro. Nunca negro puro |
| `--ink-muted` | `#3F5346` | Texto secundario / párrafos de apoyo |
| `--accent` | `#E4E356` | CTA primario (botón "Book a free consult") |
| `--accent-2` | `#F5853C` | CTA secundario (botón fantasma / segundo tono) |
| `--accent-3` | `#F4F3B8` | Fondos de icono en las tarjetas de servicios |
| `--accent-ink` | `#4F4E0E` | Antetítulos ("eyebrow"), enlaces "Learn more" |

**Degradado de la cabecera** (solo dentro del `.hero`, ver sección 4):

| Token | Valor | Posición en el degradado |
|---|---|---|
| `--mesh-1` | `#FFAF68` melocotón | Arranca arriba a la izquierda |
| `--mesh-2` | `#E0DE55` cítrico | Punto de llegada del degradado lineal |
| `--mesh-3` | `#7CC5E7` cielo | Mancha radial abajo a la derecha |
| `--mesh-4` | `#FF937D` coral | Centro del degradado lineal (al 46%) |

**Regla de oro de la paleta, no romperla:** nunca negro puro (`#000`) ni
fondos oscuros/chocolate. El brief original pedía huir de lo "cold" y lo
"oscuro"; toda la paleta se construyó sobre esa restricción.

## 4. Por qué el cristal solo vive en la cabecera

Esto es lo más fácil de romper al reimplementar, así que hay que entenderlo
bien. El efecto de cristal (`backdrop-filter: blur`) necesita **variación de
color detrás** para notarse. Sobre un fondo de un solo tono plano, un panel
de cristal no se distingue de una caja blanca translúcida sin gracia.

Por eso:
- El degradado de colores (`.hero::before`) va **solo detrás del header**,
  a plena saturación, porque ahí todo el texto vive dentro de un panel de
  cristal (`.hero__copy`) y el contraste se puede garantizar.
- El resto de la página usa **franjas de color plano** (`--block-1` /
  `--block-2`), no degradado. `shared/glass.css` trae por defecto un
  degradado de página completa (vía `--mesh-N-wash`), pero aquí se desactiva
  poniendo esas cuatro variables en `transparent`.
- Los paneles de cristal (`.card`, `.widget`, `.quote`, `.faq.glass`, el nav
  y el footer) siguen llevando blur en toda la página, aunque estén sobre
  color plano: el efecto es más sutil ahí, pero consistente con la
  identidad visual.

Si se reimplementa por secciones en Astro y alguna sección pierde su franja
de color de fondo, los paneles de cristal de esa sección van a leer como
cajas blancas sin gracia. Revisar que cada `<section>` mantenga su
`background` correspondiente.

## 5. Tipografía

| Rol | Fuente | Peso | Notas |
|---|---|---|---|
| Titulares (`h1`, `h2`, `h3`) | Cormorant Garamond | 300 (el más fino que tiene) | Cursiva de énfasis (`<em>`) en 300 italic |
| Nombre de Johanna (`.wordmark b`) | Cormorant Unicase | 600 | Mezcla mayúsculas/minúsculas a la misma altura — el "toque distinto" vive aquí, no en decoración |
| Botones y menú (`--font-ui`) | Jost | 300 | Sin mayúsculas, sin tracking ampliado (a diferencia de las otras variantes) |
| Texto de cuerpo (`--font-body`) | Lato | 400 / 700 | Sin cambios respecto al resto de variantes |

**Riesgo documentado, pendiente de confirmar en producción real:** Cormorant
a peso 300 tiene trazos muy finos. El contraste de color está verificado y
cumple AA con margen (ver sección 6), pero el contraste no mide grosor de
trazo. Un trazo fino sobre el degradado y detrás de un panel de cristal es
la combinación más exigente de las cinco variantes para leerse bien en
pantalla real (no en el simulador). **Antes de dar por cerrada la
tipografía, mirarla en un móvil real con luz de sol**, que es donde este
tipo de problema aparece y una auditoría automática no lo detecta.

Si en pantalla se ve débil, el recambio directo y ya evaluado es
**Newsreader** en su peso ligero: aire parecido, aguanta mejor el trazo
fino.

Google Fonts usados (todos con licencia OFL, libres para uso comercial):
`Cormorant Garamond`, `Cormorant Unicase`, `Jost`, `Lato`.

## 6. Accesibilidad — ya verificado, no rehacer desde cero

Auditado con un script que recorre cada nodo de texto, compone el color de
fondo real (incluyendo el degradado del hero) y calcula el contraste según
WCAG 2.1, respetando los umbrales de texto grande/pequeño.

- **0 fallos**, tanto en escritorio (1440px) como en móvil (390px).
- **Mínimo global: 4.72:1** — por encima del 4.5:1 exigido por AA para
  texto normal.
- Consola del navegador limpia, sin errores de recursos ni de CSS.

Si se modifican colores al pasar a Astro, hay que repetir esta auditoría.
No basta con mirarlo: hubo más de un caso en las rondas anteriores donde un
color pasaba "a ojo" pero fallaba medido (ver `../docs/plan-accion.md` para
el detalle de esos casos, especialmente el de la opacidad parcial en
`.photo__tag`).

## 7. Estructura de secciones (para mapear a componentes Astro)

En el orden en que aparecen en `index.html`:

1. **`.nav`** — barra superior, sticky, con efecto cristal. Nombre + menú +
   CTA. En móvil el menú de enlaces se oculta (`@media max-width: 860px`);
   falta decidir un menú móvil real (hamburguesa) al implementar.
2. **`.hero`** — titular, texto de apoyo, dos CTA, lista de "traits" (4
   iconos de trazo), marcador de foto. Lleva el degradado de fondo.
3. **`.video` (`#about`)** — bloque de vídeo de bienvenida con marcador de
   reproducción + cita destacada. Fondo `--block-1` (franja azul).
4. **`#services`** — bento grid de 5 tarjetas de servicios (una ancha +
   cuatro normales). Sin fondo de color, usa `--bg`.
5. **`.insurance` (`#fees`)** — texto + widget de estimación de coste con
   cifras de ejemplo. Fondo `--block-2` (franja verde).
6. **`#faq`** — acordeón de preguntas frecuentes, con `<details>` nativo
   (sin JS). El panel del acordeón lleva la clase `.glass`.
7. **`.cta-band` (`#book`)** — banda final de llamada a la acción. Fondo
   `--block-1`.
8. **`.footer`** — tres columnas: marca + bio corta, enlaces de navegación,
   contacto. Efecto cristal.

## 8. Contenido de relleno — todo pendiente de sustituir

**Nada del texto ni de las imágenes es real.** Al construir el sitio final:

- Todos los párrafos, titulares y preguntas del FAQ son placeholder en
  inglés, escrito con la voz correcta pero sin revisar por Johanna palabra
  por palabra.
- El marcador de foto (`.photo`) es un degradado de color, no una foto.
  Johanna va a hacer sesión de fotos profesional — pendiente de programar.
- Las cifras del widget de seguros ($250, $150, $100) son de ejemplo.
- Los datos de contacto (`hello@johannabellorin.com`, `(212) 555-0148`,
  "Flatiron, New York, NY") son ficticios, no reales. **No publicar tal
  cual**: hay que sustituirlos por los datos reales de Johanna antes de que
  el sitio sea público de verdad.
- No hay formulario de contacto funcional. Los botones de CTA apuntan a
  anclas (`#book`), no a ningún destino real todavía.

## 9. Lo que no se ha hecho todavía

- **Animación.** Se planteó una fase de movimiento con GSAP (entradas de
  hero, scroll-reveal en las tarjetas, contador animado en el widget de
  seguros) pero no se llegó a construir. Sigue abierta la pregunta de
  cuánto "juego" debe tener, ligada a cuánto peso quiere Johanna darle al
  lado desenfadado de su trabajo (mencionado específicamente para terapia
  de pareja). Repasar `../docs/plan-accion.md`, sección de la fase de
  animación, antes de empezarla.
- **Menú móvil real.** Ahora mismo el menú de navegación simplemente
  desaparece en pantallas estrechas; no hay un menú hamburguesa que lo
  sustituya.
- **Formulario de contacto / reserva.** Los CTA son anclas, no acciones.
- **Copy final.** Ninguno de los textos ha sido validado por Johanna frase
  a frase; son placeholders con el tono correcto.
- **Fotografía real.** Pendiente de sesión.

## 10. Archivos de esta carpeta

```
final/
├── index.html          página completa de una pieza, tal como se aprobó
├── shared/
│   ├── skeleton.css     estructura y componentes, sin colores ni fuentes
│   └── glass.css        capa de efecto cristal (glassmorphism)
└── README.md            este documento
```

`skeleton.css` no tiene ningún color ni tipografía embebida a propósito:
todo entra por `custom properties`. Si se reconstruye en Astro con
Tailwind, lo más directo es traducir ese contrato de tokens a la config de
Tailwind o a variables CSS globales, y los estilos de `skeleton.css` se
convierten en clases de componente o en `@apply`.
