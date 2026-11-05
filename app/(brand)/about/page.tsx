import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { GraduationCap, HeartPulse, ShieldCheck, Sprout, User } from "lucide-react";
import { LitText } from "@/components/site/lit-text";
import { btn } from "@/components/ui/button";
import { company, directorMessage, fields, team, type FieldKey } from "@/content/company";

export const metadata: Metadata = {
  title: "About",
  description: "Sentiantal is a Hyderabad company building AI and IoT for agriculture, healthcare, education and industrial safety.",
};

const initials = (name: string) =>
  name.replace(/^(Mr|Mrs|Dr)\.?\s+/i, "").split(/\s+/).slice(0, 2).map((w) => w[0]).join("");

const tint: Record<FieldKey, string> = { agriculture: "#3f9d62", healthcare: "#c73a7e", education: "#2c267e", safety: "#e0902b" };
const icon: Record<FieldKey, React.ReactNode> = {
  agriculture: <Sprout aria-hidden size={26} />,
  healthcare: <HeartPulse aria-hidden size={26} />,
  education: <GraduationCap aria-hidden size={26} />,
  safety: <ShieldCheck aria-hidden size={26} />,
};
const headline = ["A Hyderabad team", "building AI and IoT", "for real problems."];

export default function AboutPage() {
  const hasMessage = directorMessage.paragraphs.length > 0;

  return (
    <>
      {/* Hero: headline rises line by line; a farm photo sits in the brand's arch and drifts as you scroll. */}
      <section className="wrap grid items-center gap-10 pb-16 pt-12 md:pt-16 lg:grid-cols-[1.5fr_1fr]" aria-label="About Sentiantal">
        <div>
          <h1 className="display-xl">
            {headline.map((l, i) => (
              <span key={l} className="block overflow-hidden pb-[0.12em]">
                <span className="hero-rise block" style={{ animationDelay: `${0.1 + i * 0.15}s` }}>{l}</span>
              </span>
            ))}
          </h1>
          <p className="lead enter-copy mt-5 max-w-xl text-muted">{company.weDo}</p>
        </div>
        <div className="about-arch relative mx-auto aspect-[3/4] w-full max-w-xs overflow-hidden rounded-t-[999px] shadow-[0_30px_60px_-30px_rgba(25,9,16,0.45)]">
          <Image
            src="/field/farm-visit.jpg"
            alt="Sentiantal team talking with a farmer in a field"
            fill
            priority
            sizes="(min-width: 1024px) 320px, 80vw"
            className="about-arch-img object-cover"
          />
        </div>
      </section>

      {/* Why we exist: words light up as you read. */}
      <section className="border-t border-line" aria-labelledby="why-h">
        <div className="wrap py-16 md:py-24">
          <h2 id="why-h" className="h2 reveal mb-8">The vision behind Sentiantal</h2>
          <div className="max-w-4xl space-y-8">
            {company.vision2.map((t) => (
              <LitText key={t} text={t} className="font-display text-2xl font-light leading-[1.4] md:text-4xl" />
            ))}
          </div>
        </div>
      </section>

      {/* Director's message. Shows once the text is added to content/company.ts. */}
      {hasMessage ? (
        <section className="border-t border-line bg-raised" aria-labelledby="msg-h">
          <div className="wrap grid gap-10 py-16 md:py-24 lg:grid-cols-[1fr_2fr] lg:gap-16">
            <div className="reveal lg:sticky lg:top-28 lg:self-start">
              {/* Portrait. Shows a placeholder until a photo path is set in directorMessage.image. */}
              <div className="relative grid h-56 w-44 place-items-center overflow-hidden rounded-t-[999px] border border-line bg-surface text-muted">
                {directorMessage.image ? (
                  <Image src={directorMessage.image} alt={`Portrait of ${directorMessage.by}`} fill sizes="176px" className="object-cover" />
                ) : (
                  <User aria-hidden size={64} strokeWidth={1.25} />
                )}
              </div>
              <h2 id="msg-h" className="h2 mt-6">Message from the director</h2>
              <p className="mt-2 font-display font-medium">{directorMessage.by}</p>
              <p className="text-muted">{directorMessage.role}</p>
            </div>
            <div className="relative">
              <span aria-hidden className="absolute -left-2 -top-10 font-display text-[8rem] font-black leading-none text-accent/20 md:-left-8">“</span>
              <div className="relative max-w-3xl space-y-6 text-lg md:text-xl">
                {directorMessage.paragraphs.map((t) => <p key={t} className="reveal">{t}</p>)}
              </div>
            </div>
          </div>
        </section>
      ) : (
        process.env.NODE_ENV !== "production" && (
          <section className="border-t border-dashed border-accent bg-raised">
            <p className="wrap py-8 text-muted">
              Director’s message goes here. Add the text and name in <code>directorMessage</code> in content/company.ts. This note shows only while developing.
            </p>
          </section>
        )
      )}

      {/* Vision and mission */}
      <section className="border-t border-line" aria-label="Vision and mission">
        <div className="wrap grid gap-6 py-16 md:grid-cols-2 md:py-24">
          {[["Vision", company.vision], ["Mission", company.mission]].map(([t, body]) => (
            <article key={t} className="about-card reveal group relative overflow-hidden rounded-[1.75rem] bg-ink p-8 text-ground md:p-10">
              <span aria-hidden className="about-card-rule absolute inset-x-0 top-0 h-1 origin-left bg-accent" />
              <h2 className="h2 mb-4">{t}</h2>
              <p className="lead">{body}</p>
            </article>
          ))}
        </div>
      </section>

      {/* Four fields */}
      <section className="border-t border-line bg-raised" aria-labelledby="fields-h">
        <div className="wrap py-16 md:py-24">
          <h2 id="fields-h" className="display-l reveal mb-10">Four fields.</h2>
          <ul className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {fields.map((f, i) => (
              <li
                key={f.key}
                className="about-field reveal flex flex-col rounded-[1.5rem] border border-line bg-surface p-6"
                style={{ ["--c" as string]: tint[f.key], ["--i" as string]: i }}
              >
                <span className="about-field-icon grid size-12 place-items-center rounded-2xl">{icon[f.key]}</span>
                <h3 className="h3 mt-5">{f.name}</h3>
                <p className="mt-2 text-muted">{f.line}</p>
                <p className="mt-auto flex flex-wrap gap-x-4 gap-y-1 pt-5">
                  {f.items.map((it) => (
                    <Link key={it.href} href={it.href} className="flink font-medium">{it.label}</Link>
                  ))}
                </p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* In the field: photos unveil as they scroll in. */}
      <section className="border-t border-line" aria-labelledby="field-h">
        <div className="wrap py-16 md:py-24">
          <h2 id="field-h" className="display-l reveal mb-10">In the field.</h2>
          <div className="grid gap-6 sm:grid-cols-2">
            <figure>
              <div className="about-photo overflow-hidden rounded-3xl">
                <Image className="about-photo-img" src="/field/farm-visit.jpg" alt="Sentiantal team talking with a farmer in a field" width={1080} height={612} sizes="(min-width: 640px) 50vw, 100vw" />
              </div>
              <figcaption className="mt-3 text-muted">Talking soil with a farmer, on the farm.</figcaption>
            </figure>
            <figure>
              <div className="about-photo overflow-hidden rounded-3xl">
                <Image className="about-photo-img" src="/field/agripilot.jpg" alt="Testing soil samples with the SARAM device at an agri expo" width={908} height={600} sizes="(min-width: 640px) 50vw, 100vw" />
              </div>
              <figcaption className="mt-3 text-muted">Testing soil samples with SARAM at an agri expo.</figcaption>
            </figure>
          </div>
        </div>
      </section>

      {/* Leadership */}
      <section className="border-t border-line bg-raised" aria-labelledby="lead-h">
        <div className="wrap py-16 md:py-24">
          <h2 id="lead-h" className="display-l reveal mb-10">Leadership.</h2>
          <ul className="grid gap-5 sm:grid-cols-2">
            {team.map((m) => (
              <li key={m.name} className="about-person reveal group flex items-start gap-5 rounded-[1.5rem] border border-line bg-surface p-6">
                <span
                  aria-hidden
                  className="about-person-avatar grid h-24 w-[4.5rem] shrink-0 place-items-end justify-center rounded-t-[999px] pb-3 font-display text-xl font-bold text-white"
                  style={{ background: "linear-gradient(160deg,#190910,#c73a7e)" }}
                >
                  {initials(m.name)}
                </span>
                <div>
                  <h3 className="h3">{m.name}</h3>
                  <p className="mt-1 font-medium">{m.role}</p>
                  <p className="text-muted">{m.focus}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="border-t border-line bg-surface">
        <div className="wrap reveal flex flex-col gap-6 py-14 md:flex-row md:items-center md:justify-between md:py-20">
          <h2 className="display-l max-w-[20ch]">Work with us.</h2>
          <Link href="/contact" className={btn("primary", "self-start")}>Talk to us</Link>
        </div>
      </section>
    </>
  );
}
