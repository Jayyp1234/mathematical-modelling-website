import { NextResponse } from "next/server";

/**
 * Contact form endpoint.
 *
 * Delivery is intentionally provider-agnostic: set CONTACT_WEBHOOK_URL to any
 * endpoint that accepts a JSON POST (Formspree, a Zapier/Make hook, an internal
 * service, a mail API). Until that variable is set the route refuses the
 * submission with 503 rather than pretending to have sent it — the form then
 * tells the visitor to email directly.
 */

const MAX = { name: 120, email: 200, company: 160, topic: 80, message: 4000 };
const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

type Payload = Record<string, unknown>;

const str = (v: unknown) => (typeof v === "string" ? v.trim() : "");

export async function POST(request: Request) {
  let body: Payload;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Malformed request." }, { status: 400 });
  }

  // honeypot: a real person never fills a field they cannot see
  if (str(body.website)) {
    return NextResponse.json({ ok: true }, { status: 200 });
  }

  const name = str(body.name);
  const email = str(body.email);
  const company = str(body.company);
  const topic = str(body.topic);
  const message = str(body.message);

  const errors: Record<string, string> = {};
  if (!name) errors.name = "Please tell us your name.";
  else if (name.length > MAX.name) errors.name = "That name is too long.";
  if (!email) errors.email = "We need an email address to reply to.";
  else if (!EMAIL.test(email) || email.length > MAX.email)
    errors.email = "That does not look like an email address.";
  if (!message) errors.message = "Please tell us what you are working on.";
  else if (message.length > MAX.message)
    errors.message = "That message is too long.";
  if (company.length > MAX.company) errors.company = "That is too long.";
  if (topic.length > MAX.topic) errors.topic = "Unrecognised topic.";

  if (Object.keys(errors).length) {
    return NextResponse.json({ errors }, { status: 422 });
  }

  const endpoint = process.env.CONTACT_WEBHOOK_URL;
  if (!endpoint) {
    return NextResponse.json(
      {
        error:
          "The contact form is not connected to a mailbox yet. Please email us directly.",
      },
      { status: 503 },
    );
  }

  try {
    const res = await fetch(endpoint, {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({
        name,
        email,
        company: company || null,
        topic: topic || null,
        message,
        submittedAt: new Date().toISOString(),
      }),
    });
    if (!res.ok) throw new Error(`upstream responded ${res.status}`);
  } catch {
    return NextResponse.json(
      { error: "We could not send that just now. Please email us directly." },
      { status: 502 },
    );
  }

  return NextResponse.json({ ok: true });
}
