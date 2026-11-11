// POST /api/enquiry. Validates the form and emails it over SMTP (GoDaddy mailbox).
// ponytail: no rate limit and no queue. Add one if the form starts to attract spam.
import nodemailer from "nodemailer";
import { enquiryReply } from "@/lib/enquiry-reply";

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const clean = (v: unknown, max: number) => (typeof v === "string" ? v.trim().slice(0, max) : "");

export async function POST(request: Request) {
  let body: Record<string, unknown>;
  try {
    body = await request.json();
  } catch {
    return Response.json({ error: "invalid" }, { status: 400 });
  }

  // Hidden field that real visitors leave empty.
  if (clean(body.website, 200)) return Response.json({ ok: true });

  const f = {
    intent: clean(body.intent, 40),
    name: clean(body.name, 120),
    email: clean(body.email, 200),
    phone: clean(body.phone, 40),
    organisation: clean(body.organisation, 160),
    city: clean(body.city, 80),
    subject: clean(body.subject, 160),
    timeline: clean(body.timeline, 80),
    message: clean(body.message, 4000),
  };

  const errors: Record<string, string> = {};
  if (f.name.length < 2) errors.name = "Enter your name.";
  if (!EMAIL.test(f.email)) errors.email = "Enter a valid email address.";
  if (f.message.length < 10) errors.message = "Tell us a little more, at least a sentence.";
  if (Object.keys(errors).length) return Response.json({ error: "validation", errors }, { status: 422 });

  const user = process.env.SMTP_USER;
  const pass = process.env.SMTP_PASS;
  const to = process.env.ENQUIRY_TO ?? user;
  if (!user || !pass || !to) return Response.json({ error: "not_configured" }, { status: 503 });

  const line = (label: string, v: string) => (v ? `${label}: ${v}` : null);
  const text = [
    line("Type", f.intent),
    line("Name", f.name),
    line("Email", f.email),
    line("Phone", f.phone),
    line("Organisation", f.organisation),
    line("City", f.city),
    line("About", f.subject),
    line("Timeline", f.timeline),
    "",
    f.message,
  ]
    .filter((l): l is string => l !== null)
    .join("\n");

  const transport = nodemailer.createTransport({
    host: process.env.SMTP_HOST ?? "smtpout.secureserver.net",
    port: 465,
    secure: true,
    auth: { user, pass },
  });
  try {
    await transport.sendMail({
      from: `Sentiantal website <${user}>`,
      to,
      replyTo: f.email,
      subject: `Website enquiry: ${f.intent} from ${f.name}`,
      text,
    });
  } catch {
    return Response.json({ error: "send_failed" }, { status: 502 });
  }

  // Confirmation to the visitor. The team already has the enquiry, so a failure here is not shown to them.
  try {
    await transport.sendMail({ from: `Sentiantal <${user}>`, to: f.email, replyTo: user, ...enquiryReply(f) });
  } catch {}
  return Response.json({ ok: true });
}
