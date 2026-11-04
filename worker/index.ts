// Worker que sirve el sitio estático (`out/`) y atiende dos endpoints con
// Resend: POST /api/subscribe guarda el email como contacto de un segmento, y
// POST /api/contact reenvía el formulario de contacto por correo. La API key
// vive como secreto del Worker: nunca llega al navegador.

interface Env {
  ASSETS: { fetch(request: Request): Promise<Response> };
  RESEND_API_KEY?: string;
  RESEND_SEGMENT_ID?: string;
}

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const MAX_EMAIL_LENGTH = 254;

function json(body: Record<string, unknown>, status = 200) {
  return Response.json(body, {
    status,
    headers: { "Cache-Control": "no-store" }
  });
}

async function subscribe(request: Request, env: Env) {
  if (!env.RESEND_API_KEY || !env.RESEND_SEGMENT_ID) {
    console.error("Faltan RESEND_API_KEY o RESEND_SEGMENT_ID.");
    return json({ error: "not_configured" }, 503);
  }

  let email = "";
  try {
    const body = (await request.json()) as { email?: unknown };
    if (typeof body.email === "string") email = body.email.trim();
  } catch {
    return json({ error: "invalid_email" }, 400);
  }
  if (email.length > MAX_EMAIL_LENGTH || !EMAIL_PATTERN.test(email)) {
    return json({ error: "invalid_email" }, 400);
  }

  const response = await fetch("https://api.resend.com/contacts", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${env.RESEND_API_KEY}`,
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      email,
      unsubscribed: false,
      segments: [{ id: env.RESEND_SEGMENT_ID }]
    })
  });

  if (!response.ok) {
    console.error("Resend respondió", response.status, await response.text());
    return json({ error: "upstream" }, 502);
  }
  return json({ ok: true });
}

// Los mensajes del formulario de contacto llegan a esta bandeja; el remitente
// debe ser de un dominio verificado en Resend.
const CONTACT_TO = "ronarangelmartinez@gmail.com";
const CONTACT_FROM = "Rona Rangel <no-reply@ronarangel.com>";
const MAX_NAME_LENGTH = 100;
const MAX_MESSAGE_LENGTH = 5000;

async function contact(request: Request, env: Env) {
  if (!env.RESEND_API_KEY) {
    console.error("Falta RESEND_API_KEY.");
    return json({ error: "not_configured" }, 503);
  }

  let name = "";
  let email = "";
  let message = "";
  try {
    const body = (await request.json()) as Record<string, unknown>;
    if (typeof body.name === "string") name = body.name.trim();
    if (typeof body.email === "string") email = body.email.trim();
    if (typeof body.message === "string") message = body.message.trim();
  } catch {
    return json({ error: "invalid" }, 400);
  }
  if (
    !name ||
    name.length > MAX_NAME_LENGTH ||
    !message ||
    message.length > MAX_MESSAGE_LENGTH ||
    email.length > MAX_EMAIL_LENGTH ||
    !EMAIL_PATTERN.test(email)
  ) {
    return json({ error: "invalid" }, 400);
  }

  // El nombre va en el asunto: sin saltos de línea para evitar inyectar cabeceras.
  const subjectName = name.replace(/[\r\n]+/g, " ");
  const response = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${env.RESEND_API_KEY}`,
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      from: CONTACT_FROM,
      to: [CONTACT_TO],
      reply_to: email,
      subject: `Consulta desde la web — ${subjectName}`,
      text: `${message}\n\n${name}\n${email}`
    })
  });

  if (!response.ok) {
    console.error("Resend respondió", response.status, await response.text());
    return json({ error: "upstream" }, 502);
  }
  return json({ ok: true });
}

const worker = {
  async fetch(request: Request, env: Env) {
    const { pathname } = new URL(request.url);

    if (pathname === "/api/contact") {
      if (request.method !== "POST") {
        return json({ error: "method_not_allowed" }, 405);
      }
      return contact(request, env);
    }

    if (pathname === "/api/subscribe") {
      if (request.method !== "POST") {
        return json({ error: "method_not_allowed" }, 405);
      }
      return subscribe(request, env);
    }

    return env.ASSETS.fetch(request);
  }
};

export default worker;
