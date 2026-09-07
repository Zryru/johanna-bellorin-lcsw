/**
 * Worker del formulario de contacto de Johanna Bellorín, LCSW.
 *
 * Flujo: navegador → este Worker (valida, NO almacena) → Resend → buzón con BAA.
 * Ver worker/README.md y docs/legal.md sección 3.
 *
 * Regla que no se rompe: este Worker no persiste datos. Nada de KV, D1, ni
 * console.log del contenido del formulario. Si necesitas depurar, registra el
 * hecho ("envío recibido", "turnstile falló") pero nunca los valores.
 */

export interface Env {
  RESEND_API_KEY: string;
  TURNSTILE_SECRET: string;
  /** Buzón de destino, con BAA. */
  NOTIFY_TO: string;
  /** Remitente verificado en Resend. */
  NOTIFY_FROM: string;
  /** Orígenes permitidos, separados por coma. Ej: "https://johannabellorin.com" */
  ALLOWED_ORIGIN: string;
}

/** Motivos válidos. Tienen que coincidir con el <select> del formulario. */
const REASONS = new Set([
  'first-time',
  'individual',
  'couples',
  'insurance',
  'availability',
  'other',
]);

const LANGUAGES = new Set(['en', 'es', 'either']);

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export default {
  async fetch(request: Request, env: Env): Promise<Response> {
    if (request.method !== 'POST') {
      return new Response('Method not allowed', { status: 405 });
    }

    const origin = request.headers.get('Origin') ?? '';
    const allowed = env.ALLOWED_ORIGIN.split(',').map((o) => o.trim());
    if (origin && !allowed.includes(origin)) {
      return new Response('Forbidden', { status: 403 });
    }

    const form = await request.formData();

    // 1. Honeypot. Si el campo oculto trae algo, es un bot. Se descarta en
    //    silencio con un 200 para no darle pistas.
    if (form.get('company')) {
      return redirectOrOk(form, origin);
    }

    // 2. Turnstile. Sin token válido, no seguimos.
    const token = String(form.get('cf-turnstile-response') ?? '');
    if (!(await verifyTurnstile(token, env.TURNSTILE_SECRET, request))) {
      return json({ error: 'turnstile' }, 400);
    }

    // 3. Validación de campos. La misma lista cerrada que el formulario.
    const name = String(form.get('name') ?? '').trim();
    const email = String(form.get('email') ?? '').trim();
    const phone = String(form.get('phone') ?? '').trim();
    const language = String(form.get('language') ?? '').trim();
    const reason = String(form.get('reason') ?? '').trim();

    if (!name || name.length > 120) return json({ error: 'name' }, 400);
    if (!EMAIL_RE.test(email)) return json({ error: 'email' }, 400);
    if (!REASONS.has(reason)) return json({ error: 'reason' }, 400);
    if (language && !LANGUAGES.has(language)) return json({ error: 'language' }, 400);
    if (phone.length > 40) return json({ error: 'phone' }, 400);

    // 4. Reenvío por Resend. Solo datos de contacto y un motivo de lista
    //    cerrada: nada clínico, por diseño.
    const sent = await sendEmail(env, { name, email, phone, language, reason });
    if (!sent) return json({ error: 'send' }, 502);

    // 5. Redirige a /thanks (envío normal de formulario) o responde OK (fetch).
    return redirectOrOk(form, origin);
  },
};

async function verifyTurnstile(
  token: string,
  secret: string,
  request: Request,
): Promise<boolean> {
  if (!token) return false;
  const body = new FormData();
  body.append('secret', secret);
  body.append('response', token);
  const ip = request.headers.get('CF-Connecting-IP');
  if (ip) body.append('remoteip', ip);

  const res = await fetch(
    'https://challenges.cloudflare.com/turnstile/v0/siteverify',
    { method: 'POST', body },
  );
  const data = (await res.json()) as { success: boolean };
  return data.success === true;
}

interface Submission {
  name: string;
  email: string;
  phone: string;
  language: string;
  reason: string;
}

async function sendEmail(env: Env, s: Submission): Promise<boolean> {
  const lines = [
    `Name: ${s.name}`,
    `Email: ${s.email}`,
    s.phone ? `Phone: ${s.phone}` : null,
    s.language ? `Preferred language: ${s.language}` : null,
    `Reason: ${s.reason}`,
  ].filter(Boolean);

  const res = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${env.RESEND_API_KEY}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      from: env.NOTIFY_FROM,
      to: env.NOTIFY_TO,
      // reply_to permite responder directo a quien escribió.
      reply_to: s.email,
      subject: `New contact form message — ${s.reason}`,
      text: lines.join('\n'),
    }),
  });

  return res.ok;
}

function corsHeaders(origin: string): HeadersInit {
  return {
    'Access-Control-Allow-Origin': origin || '*',
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
  };
}

function json(data: unknown, status: number, origin = ''): Response {
  return new Response(JSON.stringify(data), {
    status,
    headers: { 'Content-Type': 'application/json', ...corsHeaders(origin) },
  });
}

/**
 * Un envío normal de <form> espera una redirección a la página de gracias.
 * Un envío por fetch (JS) espera un JSON. Distinguimos por el campo `_thanks`
 * que el formulario incluye, o por el header Accept.
 */
function redirectOrOk(form: FormData, origin: string): Response {
  const thanks = String(form.get('_thanks') ?? '');
  if (thanks) {
    return new Response(null, {
      status: 303,
      headers: { Location: `${origin}${thanks}` },
    });
  }
  return json({ ok: true }, 200, origin);
}
