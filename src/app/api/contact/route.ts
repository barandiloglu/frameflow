import type { NextRequest } from "next/server";

/* The contact form's mail handler. Talks to Resend over its REST API rather
   than the SDK — this is one POST with a JSON body, and the dependency would
   buy nothing the fetch below doesn't already do. */

const RESEND_ENDPOINT = "https://api.resend.com/emails";

/* Long enough for a real brief, short enough that the body can't be used as a
   payload. Anything over is rejected before the mail call. */
const LIMITS = { name: 120, email: 200, message: 5000 } as const;

/* Deliberately loose: the address has to survive a round trip to a real
   mailbox, and stricter patterns reject valid addresses more often than they
   catch bad ones. Reply-To is where this actually matters. */
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

/* Per-IP throttle. Process-local, so it resets on redeploy and doesn't span
   serverless instances — it isn't the security boundary, just enough to stop a
   single script hammering the inbox. */
const WINDOW_MS = 60 * 60 * 1000;
const MAX_PER_WINDOW = 5;
const hits = new Map<string, number[]>();

function rateLimited(ip: string): boolean {
  const now = Date.now();
  const recent = (hits.get(ip) ?? []).filter((t) => now - t < WINDOW_MS);
  if (recent.length >= MAX_PER_WINDOW) {
    hits.set(ip, recent);
    return true;
  }
  recent.push(now);
  hits.set(ip, recent);
  /* The map would otherwise grow for the life of the process. */
  if (hits.size > 5000) {
    for (const [key, stamps] of hits) {
      if (stamps.every((t) => now - t >= WINDOW_MS)) hits.delete(key);
    }
  }
  return false;
}

function clientIp(request: NextRequest): string {
  const forwarded = request.headers.get("x-forwarded-for");
  /* First entry is the client; the rest are proxies that appended themselves. */
  return forwarded?.split(",")[0]?.trim() || request.headers.get("x-real-ip") || "unknown";
}

/* The visitor's text lands inside an HTML mail body, so every interpolation
   below goes through this. Quotes included: the name is used in an attribute. */
function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

/* Headers are line-delimited: a newline in the name would let the sender inject
   their own. Stripped rather than rejected — it is nearly always a paste
   artifact, not an attack. */
function headerSafe(value: string): string {
  return value.replace(/[\r\n]+/g, " ").trim();
}

function mailBody({ name, email, message }: { name: string; email: string; message: string }) {
  const safeName = escapeHtml(name);
  const safeEmail = escapeHtml(email);
  /* Preserve the visitor's own line breaks — a brief typed in paragraphs
      arrives as one wall of text otherwise. */
  const safeMessage = escapeHtml(message).replace(/\n/g, "<br />");

  const html = `<!doctype html>
<html>
  <body style="margin:0;padding:24px;background:#353230;font-family:ui-sans-serif,system-ui,-apple-system,'Segoe UI',sans-serif;">
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width:560px;margin:0 auto;background:#ffffeb;">
      <tr>
        <td style="padding:22px 28px;background:#353230;">
          <p style="margin:0;font-size:11px;letter-spacing:0.22em;text-transform:uppercase;color:#d38f2c;">
            FrameFlow &middot; New enquiry
          </p>
        </td>
      </tr>
      <tr>
        <td style="padding:28px;">
          <p style="margin:0 0 4px;font-size:11px;letter-spacing:0.18em;text-transform:uppercase;color:#35323099;">From</p>
          <p style="margin:0 0 20px;font-size:16px;color:#353230;">
            ${safeName} &middot; <a href="mailto:${safeEmail}" style="color:#a06210;">${safeEmail}</a>
          </p>
          <p style="margin:0 0 4px;font-size:11px;letter-spacing:0.18em;text-transform:uppercase;color:#35323099;">Message</p>
          <p style="margin:0;font-size:16px;line-height:1.65;color:#353230;">${safeMessage}</p>
        </td>
      </tr>
      <tr>
        <td style="padding:16px 28px;border-top:1px solid #35323020;">
          <p style="margin:0;font-size:12px;color:#35323099;">
            Sent from the contact form at frameflow.ca &mdash; reply to reach ${safeName} directly.
          </p>
        </td>
      </tr>
    </table>
  </body>
</html>`;

  const text = `New enquiry from the frameflow.ca contact form

From: ${name} <${email}>

${message}
`;

  return { html, text };
}

export async function POST(request: NextRequest) {
  const apiKey = process.env.RESEND_API_KEY;
  const from = process.env.CONTACT_FROM;
  const to = (process.env.CONTACT_TO ?? "")
    .split(",")
    .map((address) => address.trim())
    .filter(Boolean);

  if (!apiKey || !from || to.length === 0) {
    /* A misconfigured deploy is our problem, not the visitor's — the page shows
       the mailto fallback either way, but the log has to say which var is missing. */
    console.error("[contact] missing mail config", {
      apiKey: Boolean(apiKey),
      from: Boolean(from),
      to: to.length,
    });
    return Response.json({ error: "unconfigured" }, { status: 503 });
  }

  if (rateLimited(clientIp(request))) {
    return Response.json({ error: "rate_limited" }, { status: 429 });
  }

  let payload: unknown;
  try {
    payload = await request.json();
  } catch {
    return Response.json({ error: "invalid_body" }, { status: 400 });
  }

  const body = payload as Partial<Record<"name" | "email" | "message" | "company", unknown>>;

  /* Honeypot. Hidden from people, filled in by the bots that submit every
     field they find — answer 200 so the bot has nothing to tune against. */
  if (typeof body.company === "string" && body.company.trim() !== "") {
    return Response.json({ ok: true });
  }

  const name = typeof body.name === "string" ? headerSafe(body.name) : "";
  const email = typeof body.email === "string" ? headerSafe(body.email) : "";
  const message = typeof body.message === "string" ? body.message.trim() : "";

  if (!name || !email || !message) {
    return Response.json({ error: "missing_fields" }, { status: 400 });
  }
  if (
    name.length > LIMITS.name ||
    email.length > LIMITS.email ||
    message.length > LIMITS.message
  ) {
    return Response.json({ error: "too_long" }, { status: 400 });
  }
  if (!EMAIL_RE.test(email)) {
    return Response.json({ error: "invalid_email" }, { status: 400 });
  }

  const { html, text } = mailBody({ name, email, message });

  let response: Response;
  try {
    response = await fetch(RESEND_ENDPOINT, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from,
        to,
        /* So hitting reply in the inbox writes to the visitor, not to
           contact@ — which has no receiving configured. */
        reply_to: email,
        subject: `New enquiry — ${name}`,
        html,
        text,
      }),
    });
  } catch (error) {
    console.error("[contact] resend unreachable", error);
    return Response.json({ error: "send_failed" }, { status: 502 });
  }

  if (!response.ok) {
    console.error("[contact] resend rejected", response.status, await response.text());
    return Response.json({ error: "send_failed" }, { status: 502 });
  }

  return Response.json({ ok: true });
}
