import Image from "next/image";
import Link from "next/link";
import { products, smart, type Product } from "@/content/products";
import { Arch } from "@/components/site/arch";
import { Section } from "@/components/site/section";
import { LitText } from "@/components/site/lit-text";
import { ProductNav } from "@/components/products/product-nav";
import { demoFor } from "@/components/demos";
import { btn } from "@/components/ui/button";

function Extras({ p }: { p: Product }) {
  switch (p.slug) {
    case "agrow-insights":
      return (
        <Section id="in-the-field" title="In the field">
          <figure className="mb-8">
            <div className="about-photo overflow-hidden rounded-2xl border border-line">
              <Image className="about-photo-img" src="/field/farmer-dashboard.jpg" alt="The farmer dashboard: growth progress, pest detection, fertilizer split, irrigation suggestion and loan schemes" width={1600} height={900} sizes="(min-width: 1024px) 760px, 100vw" />
            </div>
            <figcaption className="mt-3 text-sm text-muted">
              The farmer app: growth progress, pest detection, fertilizer split, irrigation advice, and loan schemes in one screen.
            </figcaption>
          </figure>
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="about-photo overflow-hidden rounded-2xl"><Image className="about-photo-img" src="/field/farm-visit.jpg" alt="Sentiantal team talking with a farmer in a field about the soil tester" width={1080} height={612} sizes="(min-width: 640px) 380px, 100vw" /></div>
            <div className="about-photo overflow-hidden rounded-2xl"><Image className="about-photo-img" src="/field/agripilot.jpg" alt="Two people testing soil samples with the SARAM device and a laptop at an agri expo" width={908} height={600} sizes="(min-width: 640px) 380px, 100vw" /></div>
          </div>
        </Section>
      );
    case "suraaksha":
      return (
        <Section id="device" title="The device">
          <div className="flex flex-wrap items-center gap-8">
            <div className="grid size-64 place-items-center rounded-full" style={{ background: `radial-gradient(circle, ${p.glow}55, transparent 70%)` }}>
              <Image className="pfloat" src="/products/suraaksha-device.png" alt="The Suraaksha wearable, a small white device with three contact sensors and a charging port" width={180} height={240} />
            </div>
            <p className="measure text-muted">A small, light device with three contact sensors on the face and a charging port on the edge.</p>
          </div>
        </Section>
      );
    case "wow":
      return (
        <Section id="tag" title="The SOS tag">
          <div className="flex flex-wrap items-center gap-8">
            <Image className="pfloat" src="/products/wow-id-card.png" alt="An ID card holder with a red SOS button" width={160} height={160} />
            <p className="measure text-muted">The SOS button fits an ID card or a keychain, so there is something to press when a phone will not do.</p>
          </div>
        </Section>
      );
    case "upadyai":
      return (
        <Section id="smart" title="How UpadyAI answers it">
          <ul>
            {smart.map((s) => (
              <li key={s.letter} className="reveal group flex items-baseline gap-6 border-b border-line py-4 transition-colors hover:bg-raised">
                <span className="w-12 font-display text-5xl font-black leading-none transition-transform duration-300 group-hover:scale-125" style={{ color: p.glow }} aria-hidden>{s.letter}</span>
                <span className="lead">{s.text}</span>
              </li>
            ))}
          </ul>
        </Section>
      );
    default:
      return null;
  }
}

const check = (
  <svg viewBox="0 0 24 24" aria-hidden className="pcheck size-6 shrink-0" fill="none" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10" className="pcheck-ring" />
    <path d="M7 12.5l3.2 3.2L17 9" pathLength={1} className="pcheck-tick" />
  </svg>
);

export function ProductPage({ product: p }: { product: Product }) {
  const i = products.findIndex((x) => x.slug === p.slug);
  const next = products[(i + 1) % products.length];
  const short = p.name.split(" (")[0];
  const groups = p.featureGroups ?? [{ title: "", items: p.features }];

  return (
    <div style={{ ["--c" as string]: p.glow }}>
      {/* Hero: the device in its arch, lit in the product's own colour, with signal rings spreading behind it. */}
      <section className="wrap relative grid items-center gap-10 py-12 md:py-16 lg:grid-cols-[1.25fr_0.75fr]" aria-label={`${short} overview`}>
        <div className="phalo pointer-events-none absolute -right-20 top-0 -z-10 size-[34rem] rounded-full" aria-hidden />
        <div>
          <h1 className="display-xl">
            <span className="block overflow-hidden pb-[0.12em]">
              <span className="hero-rise block">{p.name}</span>
            </span>
          </h1>
          <div className="enter-copy">
            <p className="lead mt-5 max-w-[30ch]">{p.headline}</p>
            {p.tagline && <p className="ptext mt-3 font-display text-lg font-medium">{p.tagline}</p>}
            <p className="measure mt-5 text-muted">{p.sub}</p>
            <ul className="mt-8 flex flex-wrap gap-2 border-t border-line pt-5">
              {p.facts.map((f) => (
                <li key={f} className="pfact flex items-center gap-2 rounded-full border border-line bg-surface px-4 py-2 font-display text-sm font-medium">
                  <span aria-hidden className="size-2 rounded-full" style={{ background: p.glow }} />
                  {f}
                </li>
              ))}
            </ul>
            <div className="mt-8 flex flex-wrap gap-3">
              <a href="#try" className={btn("primary")}>Try the demo</a>
              <Link href={`/contact?topic=demo&product=${p.slug}`} className={btn("ghost")}>Request a demo</Link>
            </div>
          </div>
        </div>
        <div className="relative mx-auto w-full max-w-sm">
          {[0, 1, 2].map((r) => (
            <span key={r} aria-hidden className="pring pointer-events-none absolute inset-x-6 bottom-10 -z-10 aspect-square rounded-full border-2" style={{ animationDelay: `${r * 1.2}s`, borderColor: p.glow }} />
          ))}
          <div className="parch">
            <Arch src={p.arch} alt={`${p.name} on a glass stand`} glow={p.glow} className="w-full" priority />
          </div>
        </div>
      </section>

      <ProductNav
        items={[
          { id: "problem", label: "The problem" },
          { id: "try", label: "Try it" },
          { id: "features", label: "What it does" },
          { id: "audience", label: "Who uses it" },
          { id: "sets-apart", label: "What sets it apart" },
        ]}
      />

      {/* The problem, read by scroll */}
      <Section id="problem" title="The problem">
        <ul className="space-y-8">
          {p.problem.map((t) => (
            <li key={t} className="pquote border-l-4 pl-6" style={{ borderColor: p.glow }}>
              <LitText text={t} className="font-display text-2xl font-light leading-[1.35] md:text-3xl" />
            </li>
          ))}
        </ul>
      </Section>

      <Section id="try" title="Try it">
        <div className="try-stage">{demoFor(p.slug)}</div>
      </Section>

      {/* Features as cards that lift on hover */}
      <Section id="features" title="What it does">
        <div className="space-y-10">
          {groups.map((g) => (
            <div key={g.title || "all"}>
              {g.title && <h3 className="h3 mb-4">{g.title}</h3>}
              <ul className="grid gap-3 sm:grid-cols-2">
                {g.items.map((t, k) => (
                  <li
                    key={t}
                    className="pcard reveal flex gap-3 rounded-2xl border border-line bg-surface p-4"
                    style={{ ["--i" as string]: k }}
                  >
                    <span aria-hidden className="pcard-dot mt-1.5 size-3 shrink-0 rounded-[4px]" style={{ background: p.glow }} />
                    <span>{t}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </Section>

      {/* Audience as tags */}
      <Section id="audience" title="Who uses it">
        <ul className="flex flex-wrap gap-3">
          {p.audience.map((t) => (
            <li key={t} className="ptag reveal rounded-full border border-line bg-surface px-5 py-3 font-display text-sm font-medium">
              {t}
            </li>
          ))}
        </ul>
      </Section>

      {/* Differentiators, each with a tick that draws itself */}
      <Section id="sets-apart" title="What sets it apart">
        <ul>
          {p.sets.map((t) => (
            <li key={t} className="reveal flex items-start gap-4 border-b border-line py-5 text-lg" style={{ color: "var(--ink)" }}>
              <span className="ptext mt-0.5">{check}</span>
              <span>{t}</span>
            </li>
          ))}
        </ul>
      </Section>

      <Extras p={p} />

      <section className="border-t border-line bg-surface">
        <div className="wrap grid gap-8 py-14 md:py-20 lg:grid-cols-[1.4fr_1fr] lg:items-center">
          <div className="reveal">
            <h2 className="display-l">See {short} in your setting.</h2>
            <div className="mt-6 flex flex-wrap gap-3">
              <Link href={`/contact?topic=demo&product=${p.slug}`} className={btn("primary")}>Request a demo</Link>
              {p.external && (
                <a href={p.external.href} className={btn("ghost")} target="_blank" rel="noopener noreferrer">{p.external.label}</a>
              )}
            </div>
          </div>
          <Link href={`/products/${next.slug}`} className="pnext group flex items-center gap-5 rounded-3xl border border-line bg-ground p-5 transition-colors hover:border-accent">
            <span className="relative block h-28 w-[4.5rem] shrink-0 overflow-hidden rounded-t-full">
              <Image src={next.arch} alt="" fill sizes="72px" className="object-cover transition-transform duration-500 group-hover:scale-110" />
            </span>
            <span>
              <span className="text-sm text-muted">Next product</span>
              <span className="h2 mt-1 block transition-colors group-hover:text-accent-ink">{next.name.split(" (")[0]}</span>
              <span className="mt-1 block text-muted">{next.line}</span>
            </span>
          </Link>
        </div>
      </section>
    </div>
  );
}
