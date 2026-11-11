import { company } from "@/content/company";

/** Edit this one line to change the promise made in every confirmation email. */
const REPLY_WITHIN = "one working day";

const next: Record<string, string[]> = {
  "Buy or demo a product": [
    "Our team reads your message and picks the right product and demo for you.",
    `We reply within ${REPLY_WITHIN} with demo options and what you need to get started.`,
    "If you have a site or device in mind, reply to this email with a photo or a short description.",
  ],
  "Start a service project": [
    "Our engineers read your brief and note what we need to understand first.",
    `We reply within ${REPLY_WITHIN} with questions or a time for a short call.`,
    "If you have a spec, sketch or sample data, reply to this email and attach it.",
  ],
  "Partner or invest": [
    "Your message goes to our founders directly.",
    `We reply within ${REPLY_WITHIN} to set up a conversation.`,
    "If you have a deck or a one-page note about your organisation, reply and attach it.",
  ],
};
const fallback = [
  "Our team reads your message and passes it to the right person.",
  `We reply within ${REPLY_WITHIN}.`,
  "If you have more to add, just reply to this email.",
];

const esc = (s: string) => s.replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]!);

const INK = "#190910", MUTED = "#655560", LINE = "#e4d8e0", MAGENTA = "#c73a7e", GROUND = "#faf7fa";
const FONT = "Helvetica Neue,Helvetica,Arial,sans-serif";

/** The confirmation sent to the person who filled in the form. Table layout and inline styles: email apps ignore most CSS. */
export function enquiryReply({ name, intent }: { name: string; intent: string }) {
  const first = name.split(/\s+/)[0] || "there";
  const steps = next[intent] ?? fallback;
  const tel = company.phoneIndia.replace(/\s/g, "");
  const subject = "We have your message | Sentiantal";

  const button = (href: string, label: string, solid: boolean) =>
    `<td style="padding:0 10px 10px 0"><a href="${href}" style="display:inline-block;padding:12px 22px;border-radius:999px;font:600 15px ${FONT};text-decoration:none;${
      solid ? `background:${MAGENTA};color:#ffffff;border:1px solid ${MAGENTA}` : `background:#ffffff;color:${INK};border:1px solid ${LINE}`
    }">${label}</a></td>`;

  const html = `<!doctype html>
<html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><meta name="color-scheme" content="light"><title>${subject}</title></head>
<body style="margin:0;padding:0;background:${GROUND}">
<div style="display:none;max-height:0;overflow:hidden;opacity:0">Thanks ${esc(first)}. Here is what happens next.</div>
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:${GROUND}"><tr><td align="center" style="padding:28px 16px">
 <table role="presentation" width="560" cellpadding="0" cellspacing="0" style="width:100%;max-width:560px;background:#ffffff;border:1px solid ${LINE};border-radius:20px;overflow:hidden">
  <tr><td style="height:6px;background:${MAGENTA};font-size:0;line-height:0">&nbsp;</td></tr>
  <tr><td style="padding:28px 32px 0;font:700 20px ${FONT};color:${MAGENTA};letter-spacing:-0.01em">Sentiantal
    <div style="font:400 12px ${FONT};color:${MUTED};letter-spacing:0">${esc(company.tagline)}</div></td></tr>
  <tr><td style="padding:28px 32px 0;font:800 28px/1.15 ${FONT};color:${INK};letter-spacing:-0.02em">Thanks, ${esc(first)}.<br>We have your message.</td></tr>
  <tr><td style="padding:14px 32px 0;font:400 16px/1.55 ${FONT};color:${MUTED}">You wrote to us about: <strong style="color:${INK}">${esc((intent || "your enquiry").toLowerCase())}</strong>. Here is what happens next.</td></tr>
  <tr><td style="padding:22px 32px 0">
   <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="border-left:3px solid ${MAGENTA}">
    ${steps.map((s) => `<tr><td style="padding:6px 0 6px 16px;font:400 16px/1.5 ${FONT};color:${INK}">${esc(s)}</td></tr>`).join("")}
   </table></td></tr>
  <tr><td style="padding:28px 32px 0;font:600 15px ${FONT};color:${INK}">Need us sooner?</td></tr>
  <tr><td style="padding:10px 32px 0"><table role="presentation" cellpadding="0" cellspacing="0"><tr>
    ${button(`tel:${tel}`, "Call us", true)}${button(`https://wa.me/${company.whatsapp}`, "WhatsApp", false)}
  </tr></table></td></tr>
  <tr><td style="padding:22px 32px 30px;font:400 15px/1.55 ${FONT};color:${INK}">Team Sentiantal</td></tr>
  <tr><td style="padding:18px 32px;background:${GROUND};border-top:1px solid ${LINE};font:400 12px/1.6 ${FONT};color:${MUTED}">
   ${esc(company.legal)}<br>${company.address.lines.map(esc).join(", ")}<br>
   <a href="https://${company.website}" style="color:${MUTED}">${company.website}</a><br><br>
   You are getting this because you used the contact form on our website. Reply to this email to add details.</td></tr>
 </table>
</td></tr></table></body></html>`;

  const text = [
    `Thanks, ${first}. We have your message.`,
    "",
    `You wrote to us about: ${(intent || "your enquiry").toLowerCase()}. Here is what happens next.`,
    ...steps.map((s) => `- ${s}`),
    "",
    `Need us sooner? Call ${company.phoneIndia} or WhatsApp https://wa.me/${company.whatsapp}`,
    "",
    "Team Sentiantal",
    `${company.legal}, ${company.address.lines.join(", ")}`,
    company.website,
  ].join("\n");

  return { subject, html, text };
}
