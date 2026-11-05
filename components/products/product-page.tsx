import Image from "next/image";
import Link from "next/link";
import { products, smart, type Product } from "@/content/products";
import { Arch } from "@/components/site/arch";
import { NodeList, Section } from "@/components/site/section";
import { demoFor } from "@/components/demos";
import { btn } from "@/components/ui/button";

function Extras({ p }: { p: Product }) {
  switch (p.slug) {
    case "agrow-insights":
      return (
        <Section id="in-the-field" title="In the field">
          <figure className="mb-8">
            <div className="overflow-hidden rounded-2xl border border-line">
              <Image src="/field/farmer-dashboard.jpg" alt="The farmer dashboard: growth progress, pest detection, fertilizer split, irrigation suggestion and loan schemes" width={1600} height={900} sizes="(min-width: 1024px) 760px, 100vw" />
            </div>
            <figcaption className="mt-3 text-sm text-muted">
              The farmer app: growth progress, pest detection, fertilizer split, irrigation advice, and loan schemes in one screen.
            </figcaption>
          </figure>
          <div className="grid gap-4 sm:grid-cols-2">
            <Image className="rounded-2xl" src="/field/farm-visit.jpg" alt="Sentiantal team talking with a farmer in a field about the soil tester" width={1080} height={612} sizes="(min-width: 640px) 380px, 100vw" />
            <Image className="rounded-2xl" src="/field/agripilot.jpg" alt="Two people testing soil samples with the SARAM device and a laptop at an agri expo" width={908} height={600} sizes="(min-width: 640px) 380px, 100vw" />
          </div>
        </Section>
      );
    case "suraaksha":
      return (
        <Section id="device" title="The device">
          <div className="flex flex-wrap items-center gap-8">
            <div className="grid size-64 place-items-center rounded-full" style={{ background: `radial-gradient(circle, ${p.glow}55, transparent 70%)` }}>
              <Image src="/products/suraaksha-device.png" alt="The Suraaksha wearable, a small white device with three contact sensors and a charging port" width={180} height={240} />
            </div>
            <p className="measure text-muted">A small, light device with three contact sensors on the face and a charging port on the edge.</p>
          </div>
        </Section>
      );
    case "wow":
      return (
        <Section id="tag" title="The SOS tag">
          <div className="flex flex-wrap items-center gap-8">
            <Image src="/products/wow-id-card.png" alt="An ID card holder with a red SOS button" width={160} height={160} />
            <p className="measure text-muted">The SOS button fits an ID card or a keychain, so there is something to press when a phone will not do.</p>
          </div>
        </Section>
      );
    case "upadyai":
      return (
        <Section id="smart" title="How UpadyAI answers it">
          <ul>
            {smart.map((s) => (
              <li key={s.letter} className="flex items-baseline gap-6 border-b border-line py-4">
                <span className="w-12 font-display text-5xl font-black leading-none" style={{ color: p.glow }} aria-hidden>{s.letter}</span>
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

export function ProductPage({ product: p }: { product: Product }) {
  const i = products.findIndex((x) => x.slug === p.slug);
  const next = products[(i + 1) % products.length];

  return (
    <>
      <section className="wrap grid items-center gap-10 py-12 md:py-16 lg:grid-cols-[1.25fr_0.75fr]">
        <div>
          <h1 className="display-xl">{p.name}</h1>
          <p className="lead mt-5 max-w-[30ch]">{p.headline}</p>
          {p.tagline && <p className="mt-3 font-display text-lg font-medium" style={{ color: p.glow }}>{p.tagline}</p>}
          <p className="measure mt-5 text-muted">{p.sub}</p>
          <ul className="mt-8 flex flex-wrap gap-x-8 gap-y-3 border-t border-line pt-5">
            {p.facts.map((f) => (
              <li key={f} className="font-display font-medium">{f}</li>
            ))}
          </ul>
          <div className="mt-8 flex flex-wrap gap-3">
            <a href="#try" className={btn("primary")}>Try the demo</a>
            <Link href={`/contact?topic=demo&product=${p.slug}`} className={btn("ghost")}>Request a demo</Link>
          </div>
        </div>
        <Arch src={p.arch} alt={`${p.name} on a glass stand`} glow={p.glow} className="mx-auto w-full max-w-sm" priority />
      </section>

      <Section id="problem" title="The problem">
        <ul className="grid gap-x-10 md:grid-cols-2">
          {p.problem.map((t) => (
            <li key={t} className="border-b border-line py-4 text-lg">{t}</li>
          ))}
        </ul>
      </Section>

      <Section id="try" title="Try it">
        {demoFor(p.slug)}
      </Section>

      <Section id="features" title="What it does">
        {p.featureGroups ? (
          <div className="space-y-8">
            {p.featureGroups.map((g) => (
              <div key={g.title}>
                <h3 className="h3 mb-2">{g.title}</h3>
                <NodeList items={g.items} glow={p.glow} />
              </div>
            ))}
          </div>
        ) : (
          <NodeList items={p.features} glow={p.glow} />
        )}
      </Section>

      <Section id="audience" title="Who uses it">
        <NodeList items={p.audience} glow={p.glow} />
      </Section>

      <Section id="sets-apart" title="What sets it apart">
        <NodeList items={p.sets} glow={p.glow} cols={1} />
      </Section>

      <Extras p={p} />

      <section className="border-t border-line bg-surface">
        <div className="wrap grid gap-8 py-14 md:py-20 lg:grid-cols-[1.4fr_1fr] lg:items-center">
          <div>
            <h2 className="display-l">See {p.name.split(" (")[0]} in your setting.</h2>
            <div className="mt-6 flex flex-wrap gap-3">
              <Link href={`/contact?topic=demo&product=${p.slug}`} className={btn("primary")}>Request a demo</Link>
              {p.external && (
                <a href={p.external.href} className={btn("ghost")} target="_blank" rel="noopener noreferrer">{p.external.label}</a>
              )}
            </div>
          </div>
          <Link href={`/products/${next.slug}`} className="group block border-t border-line pt-5 lg:border-l lg:border-t-0 lg:pl-8 lg:pt-0">
            <span className="text-sm text-muted">Next product</span>
            <span className="h2 mt-1 block transition-colors group-hover:text-accent-ink">{next.name.split(" (")[0]}</span>
            <span className="mt-1 block text-muted">{next.line}</span>
          </Link>
        </div>
      </section>
    </>
  );
}
