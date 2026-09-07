# Worker del formulario de contacto

Este Worker procesa el envío del formulario de `/contact`. Vive aparte del
sitio a propósito: el sitio es estático y no puede guardar una clave de API,
así que el envío del formulario lo maneja este código, no una función de Astro.

## Qué hace, y qué NO hace

Hace: recibe el POST del formulario, verifica el token de Turnstile, valida los
campos, y reenvía un aviso por correo con Resend al buzón de Johanna.

**No hace: almacenar nada.** Ni KV, ni D1, ni logs con el contenido del envío.
Recibe, valida, envía y termina. Esto es deliberado y es lo que sostiene el
análisis legal de `docs/legal.md` sección 3.4. Si algún día se añade
persistencia o un log con los datos del formulario, ese análisis deja de
aplicar.

## Por qué esta arquitectura

Ni Cloudflare (en el plan gratuito) ni Resend firman BAA. Con un formulario
SIN campo de texto libre — solo nombre, correo, teléfono, idioma y un motivo
de lista cerrada — el riesgo residual es aceptable y así lo decidió el
cliente. Ver `docs/plan.md` sección 7 y `docs/legal.md` sección 3.

Que el Worker no almacene nada es lo que hace esta opción más limpia que
Netlify Forms, que guardaba cada envío en su panel.

## Variables de entorno (secrets)

Se configuran con `wrangler secret put NOMBRE`, nunca en el código ni en el
repositorio:

| Secret | Qué es |
|---|---|
| `RESEND_API_KEY` | Clave de API de Resend |
| `TURNSTILE_SECRET` | Clave secreta de Turnstile (la pública va en el sitio) |
| `NOTIFY_TO` | Buzón de Johanna con BAA. Ver docs/legal.md sección 3.5 |
| `NOTIFY_FROM` | Remitente verificado en Resend, en su dominio |

La clave pública de Turnstile y la URL de este Worker se configuran en el
sitio como `PUBLIC_TURNSTILE_SITE_KEY` y `PUBLIC_FORM_ENDPOINT`.

## Desarrollo

```
npm install
npx wrangler dev      # local
npx wrangler deploy   # publicar
```
