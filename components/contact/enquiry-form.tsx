"use client";

import { useState } from "react";
import { useSearchParams } from "next/navigation";
import { ToggleGroup } from "radix-ui";
import { company, partnerTopics } from "@/content/company";
import { products } from "@/content/products";
import { projects } from "@/content/services";
import { btn } from "@/components/ui/button";

type Intent = "product" | "project" | "partner" | "other";

const intents: { key: Intent; label: string }[] = [
  { key: "product", label: "Buy or demo a product" },
  { key: "project", label: "Start a service project" },
  { key: "partner", label: "Partner or invest" },
  { key: "other", label: "Something else" },
];

const field = "w-full rounded-xl border border-line bg-surface px-4 py-3 text-ink placeholder:text-muted/70";
const labelCls = "mb-1.5 block font-display text-sm font-medium";

function intentFromParams(topic: string | null): Intent {
  if (topic === "demo") return "product";
  if (topic === "project") return "project";
  if (topic && partnerTopics.some((t) => t.key === topic)) return "partner";
  return "product";
}

export function EnquiryForm() {
  const params = useSearchParams();
  const topic = params.get("topic");
  const [intent, setIntent] = useState<Intent>(intentFromParams(topic));
  const [state, setState] = useState<"idle" | "sending" | "sent" | "failed">("idle");
  const [errors, setErrors] = useState<Record<string, string>>({});

  const productDefault = products.find((p) => p.slug === params.get("product"))?.name ?? "";
  const projectDefault = projects.find((p) => p.slug === params.get("project"))?.name ?? "";
  const partnerDefault = partnerTopics.find((t) => t.key === topic)?.label ?? "";

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setState("sending");
    setErrors({});
    const data = Object.fromEntries(new FormData(e.currentTarget).entries());
    try {
      const res = await fetch("/api/enquiry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...data, intent: intents.find((i) => i.key === intent)?.label }),
      });
      if (res.ok) return setState("sent");
      const json = await res.json().catch(() => ({}));
      if (res.status === 422 && json.errors) {
        setErrors(json.errors);
        return setState("idle");
      }
      setState("failed");
    } catch {
      setState("failed");
    }
  }

  if (state === "sent")
    return (
      <div role="status" className="rounded-[1.75rem] border border-line bg-surface p-8">
        <h2 className="h2">Thank you. We have your message.</h2>
        <p className="measure mt-3 text-muted">We will reply to the email address you gave us.</p>
      </div>
    );

  return (
    <form onSubmit={onSubmit} noValidate className="space-y-5 sm:space-y-6" aria-describedby={state === "failed" ? "form-fail" : undefined}>
      <div>
        <p id="intent-label" className={labelCls}>I want to</p>
        <ToggleGroup.Root
          type="single"
          value={intent}
          onValueChange={(v) => v && setIntent(v as Intent)}
          aria-labelledby="intent-label"
          className="grid grid-cols-2 gap-2 sm:flex sm:flex-wrap"
        >
          {intents.map((i) => (
            <ToggleGroup.Item
              key={i.key}
              value={i.key}
              className="rounded-2xl border border-line px-3 py-3 text-center font-display text-sm font-medium leading-tight transition-colors sm:rounded-full sm:px-5 sm:py-2.5 hover:bg-raised data-[state=on]:border-accent data-[state=on]:bg-accent data-[state=on]:text-on-accent"
            >
              {i.label}
            </ToggleGroup.Item>
          ))}
        </ToggleGroup.Root>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 sm:gap-5">
        <div>
          <label htmlFor="name" className={labelCls}>Name</label>
          <input id="name" name="name" autoComplete="name" required className={field} aria-invalid={!!errors.name} aria-describedby={errors.name ? "name-err" : undefined} />
          {errors.name && <p id="name-err" className="mt-1 text-sm text-bad">{errors.name}</p>}
        </div>
        <div>
          <label htmlFor="email" className={labelCls}>Email</label>
          <input id="email" name="email" type="email" autoComplete="email" required className={field} aria-invalid={!!errors.email} aria-describedby={errors.email ? "email-err" : undefined} />
          {errors.email && <p id="email-err" className="mt-1 text-sm text-bad">{errors.email}</p>}
        </div>
        <div>
          <label htmlFor="phone" className={labelCls}>Phone (optional)</label>
          <input id="phone" name="phone" type="tel" autoComplete="tel" className={field} />
        </div>

        {intent === "product" && (
          <>
            <div>
              <label htmlFor="subject" className={labelCls}>Product</label>
              <select id="subject" name="subject" defaultValue={productDefault} className={field}>
                <option value="">Not sure yet</option>
                {products.map((p) => <option key={p.slug} value={p.name}>{p.name}</option>)}
              </select>
            </div>
            <div>
              <label htmlFor="organisation" className={labelCls}>Organisation (optional)</label>
              <input id="organisation" name="organisation" autoComplete="organization" className={field} />
            </div>
            <div>
              <label htmlFor="city" className={labelCls}>City (optional)</label>
              <input id="city" name="city" autoComplete="address-level2" className={field} />
            </div>
          </>
        )}

        {intent === "project" && (
          <>
            <div>
              <label htmlFor="subject" className={labelCls}>Closest to</label>
              <select id="subject" name="subject" defaultValue={projectDefault} className={field}>
                <option value="">Something new</option>
                {projects.map((p) => <option key={p.slug} value={p.name}>{p.name}</option>)}
              </select>
            </div>
            <div>
              <label htmlFor="timeline" className={labelCls}>When do you need it</label>
              <select id="timeline" name="timeline" defaultValue="" className={field}>
                <option value="">Not sure yet</option>
                <option>Within 3 months</option>
                <option>In 3 to 6 months</option>
                <option>In 6 to 12 months</option>
              </select>
            </div>
            <div>
              <label htmlFor="organisation" className={labelCls}>Organisation (optional)</label>
              <input id="organisation" name="organisation" autoComplete="organization" className={field} />
            </div>
          </>
        )}

        {intent === "partner" && (
          <>
            <div>
              <label htmlFor="subject" className={labelCls}>Topic</label>
              <select id="subject" name="subject" defaultValue={partnerDefault} className={field}>
                <option value="">Not sure yet</option>
                {partnerTopics.map((t) => <option key={t.key} value={t.label}>{t.label}</option>)}
              </select>
            </div>
            <div>
              <label htmlFor="organisation" className={labelCls}>Organisation</label>
              <input id="organisation" name="organisation" autoComplete="organization" className={field} />
            </div>
          </>
        )}
      </div>

      <div>
        <label htmlFor="message" className={labelCls}>Message</label>
        <textarea id="message" name="message" rows={5} required className={field} aria-invalid={!!errors.message} aria-describedby={errors.message ? "message-err" : undefined} />
        {errors.message && <p id="message-err" className="mt-1 text-sm text-bad">{errors.message}</p>}
      </div>

      {/* Left empty by real visitors. */}
      <div aria-hidden className="absolute -left-[9999px]">
        <label htmlFor="website">Website</label>
        <input id="website" name="website" tabIndex={-1} autoComplete="off" />
      </div>

      {state === "failed" && (
        <p id="form-fail" role="alert" className="rounded-xl border border-bad/50 bg-bad/10 p-4">
          We could not send your message from here. Email{" "}
          <a className="font-medium underline" href={`mailto:${company.email}`}>{company.email}</a> or message us on{" "}
          <a className="font-medium underline" href={`https://wa.me/${company.whatsapp}`}>WhatsApp</a>.
        </p>
      )}

      <button type="submit" className={btn("primary", "w-full sm:w-auto")} disabled={state === "sending"}>
        {state === "sending" ? "Sending…" : "Send message"}
      </button>
    </form>
  );
}
