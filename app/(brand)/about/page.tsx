import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Section } from "@/components/site/section";
import { btn } from "@/components/ui/button";
import { company, fields, team } from "@/content/company";

export const metadata: Metadata = {
  title: "About",
  description: "Sentiantal is a Hyderabad company building AI and IoT for agriculture, healthcare, education and industrial safety.",
};

const initials = (name: string) =>
  name.replace(/^(Mr|Mrs|Dr)\.?\s+/i, "").split(/\s+/).slice(0, 2).map((w) => w[0]).join("");

export default function AboutPage() {
  return (
    <>
      <section className="wrap pb-12 pt-12 md:pt-16">
        <h1 className="display-xl max-w-[18ch]">A Hyderabad team building AI and IoT for real problems.</h1>
        <p className="lead mt-5 max-w-2xl text-muted">{company.weDo}</p>
      </section>

      <Section id="vision-behind" title="The vision behind Sentiantal">
        <div className="measure space-y-4 text-lg">
          {company.vision2.map((t) => <p key={t}>{t}</p>)}
        </div>
      </Section>

      <Section id="vision-mission" title="Vision and mission">
        <div className="grid gap-10 md:grid-cols-2">
          <div>
            <h3 className="h3 mb-2">Vision</h3>
            <p className="measure">{company.vision}</p>
          </div>
          <div>
            <h3 className="h3 mb-2">Mission</h3>
            <p className="measure">{company.mission}</p>
          </div>
        </div>
      </Section>

      <Section id="fields" title="Four fields">
        <ul className="grid gap-x-10 md:grid-cols-2">
          {fields.map((f) => (
            <li key={f.key} className="border-t border-line py-5">
              <h3 className="h3">{f.name}</h3>
              <p className="mt-1 text-muted">{f.line}</p>
              <p className="mt-3 flex flex-wrap gap-x-4 gap-y-1">
                {f.items.map((i) => (
                  <Link key={i.href} href={i.href} className="underline underline-offset-4 hover:text-accent-ink">{i.label}</Link>
                ))}
              </p>
            </li>
          ))}
        </ul>
      </Section>

      <Section id="in-the-field" title="In the field">
        <div className="grid gap-4 sm:grid-cols-2">
          <figure>
            <Image className="rounded-2xl" src="/field/farm-visit.jpg" alt="Sentiantal team talking with a farmer in a field" width={1080} height={612} sizes="(min-width: 640px) 380px, 100vw" />
            <figcaption className="mt-2 text-sm text-muted">Talking soil with a farmer, on the farm.</figcaption>
          </figure>
          <figure>
            <Image className="rounded-2xl" src="/field/agripilot.jpg" alt="Testing soil samples with the SARAM device at an agri expo" width={908} height={600} sizes="(min-width: 640px) 380px, 100vw" />
            <figcaption className="mt-2 text-sm text-muted">Testing soil samples with SARAM at an agri expo.</figcaption>
          </figure>
        </div>
      </Section>

      <Section id="leadership" title="Leadership">
        <ul className="grid gap-x-10 sm:grid-cols-2">
          {team.map((m) => (
            <li key={m.name} className="flex items-start gap-4 border-t border-line py-5">
              <span
                aria-hidden
                className="grid size-14 shrink-0 place-items-center rounded-xl font-display text-lg font-bold text-white"
                style={{ background: "linear-gradient(135deg,#190910,#c73a7e)" }}
              >
                {initials(m.name)}
              </span>
              <div>
                <h3 className="h3">{m.name}</h3>
                <p className="font-medium">{m.role}</p>
                <p className="text-muted">{m.focus}</p>
              </div>
            </li>
          ))}
        </ul>
      </Section>

      <section className="border-t border-line bg-surface">
        <div className="wrap flex flex-col gap-6 py-14 md:flex-row md:items-center md:justify-between md:py-20">
          <h2 className="display-l max-w-[20ch]">Work with us.</h2>
          <Link href="/contact" className={btn("primary", "self-start")}>Talk to us</Link>
        </div>
      </section>
    </>
  );
}
