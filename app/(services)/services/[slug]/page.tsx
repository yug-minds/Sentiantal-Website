import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Arch } from "@/components/site/arch";
import Image from "next/image";
import { Section } from "@/components/site/section";
import { ProjectPath } from "@/components/services/project-path";
import { Readout } from "@/components/services/readout";
import { ProductNav } from "@/components/products/product-nav";
import { demoFor } from "@/components/demos";
import { btn } from "@/components/ui/button";
import { projectBySlug, projects } from "@/content/services";

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: PageProps<"/services/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const p = projectBySlug(slug);
  return p ? { title: p.name, description: `${p.headline} ${p.sub}` } : {};
}

export default async function Page({ params }: PageProps<"/services/[slug]">) {
  const { slug } = await params;
  const p = projectBySlug(slug);
  if (!p) notFound();
  const i = projects.findIndex((x) => x.slug === p.slug);
  const next = projects[(i + 1) % projects.length];

  const check = (
    <svg viewBox="0 0 24 24" aria-hidden className="pcheck size-6 shrink-0" fill="none" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10" className="pcheck-ring" />
      <path d="M7 12.5l3.2 3.2L17 9" pathLength={1} className="pcheck-tick" />
    </svg>
  );

  return (
    <div style={{ ["--c" as string]: p.glow }}>
      <section className="wrap relative grid items-center gap-10 py-12 md:py-16 lg:grid-cols-[1.25fr_0.75fr]" aria-label={`${p.name} overview`}>
        <div className="phalo pointer-events-none absolute -right-20 top-0 -z-10 size-[34rem] rounded-full" aria-hidden />
        <div>
          <p className="enter-copy mb-4 inline-flex items-center gap-2 rounded-full border border-line bg-surface px-4 py-1.5 font-display text-sm font-medium">
            <span aria-hidden className="size-2.5 rounded-full" style={{ background: p.glow }} />
            {p.sector}
          </p>
          <h1 className="display-xl">
            <span className="block overflow-hidden pb-[0.12em]">
              <span className="hero-rise block">{p.name}</span>
            </span>
          </h1>
          <div className="enter-copy">
            <p className="lead mt-5 max-w-[30ch]">{p.headline}</p>
            <p className="measure mt-5 text-muted">{p.sub}</p>
            <div className="mt-8 flex flex-wrap gap-3">
              {!p.stub && <a href="#try" className={btn("primary")}>Try the demo</a>}
              <Link href={`/contact?topic=project&project=${p.slug}`} className={btn(p.stub ? "primary" : "ghost")}>
                {p.stub ? "Ask about this project" : "Start a similar project"}
              </Link>
            </div>
          </div>
        </div>
        <div className="relative mx-auto w-full max-w-sm">
          {[0, 1, 2].map((r) => (
            <span key={r} aria-hidden className="pring pointer-events-none absolute inset-x-6 bottom-10 -z-10 aspect-square rounded-full border-2" style={{ animationDelay: `${r * 1.2}s`, borderColor: p.glow }} />
          ))}
          {!p.stub && (
            <div className="live-chip absolute -left-3 bottom-14 z-10 rounded-2xl border border-line bg-surface p-4 shadow-[0_20px_40px_-20px_rgba(25,9,16,0.4)] sm:-left-10">
              <p className="mb-1 flex items-center gap-2 text-xs text-muted"><span aria-hidden className="live-dot size-2 rounded-full bg-good" />Sample reading</p>
              <Readout slug={p.slug} small />
            </div>
          )}
          <div className="parch">
            <Arch
              src={p.arch}
              art={p.slug === "aquaai" ? "pond" : "rail"}
              alt={p.slug === "aquaai" ? "Pond with ripples" : p.slug === "loco-pilot-data-device" ? "Railway tracks" : `${p.name} device`}
              glow={p.glow}
              className="w-full"
              priority
            />
          </div>
        </div>
      </section>

      {!p.stub && (
        <>
          <ProductNav items={[{ id: "try", label: "Try it" }, { id: "features", label: "What it does" }, { id: "why", label: "Why it matters" }, { id: "path", label: "How it runs" }]} />
          <Section id="try" title="Try it"><div className="try-stage">{demoFor(p.slug)}</div></Section>
          <Section id="features" title="What it does">
            <ul className="grid gap-3 sm:grid-cols-2">
              {p.features.map((t, k) => (
                <li key={t} className="pcard reveal flex gap-3 rounded-2xl border border-line bg-surface p-4" style={{ ["--i" as string]: k }}>
                  <span aria-hidden className="pcard-dot mt-1.5 size-3 shrink-0 rounded-[4px]" style={{ background: p.glow }} />
                  <span>{t}</span>
                </li>
              ))}
            </ul>
          </Section>
          <Section id="why" title="Why it matters">
            <ul>
              {p.why.map((t) => (
                <li key={t} className="reveal flex items-start gap-4 border-b border-line py-5 text-lg">
                  <span className="ptext mt-0.5">{check}</span>
                  <span>{t}</span>
                </li>
              ))}
            </ul>
          </Section>
          <Section id="path" title="How a project like this runs"><ProjectPath /></Section>
        </>
      )}

      {/* Other projects, so there is always somewhere to go next. */}
      <Section id="more" title="Other projects">
        <ul className="grid gap-4 sm:grid-cols-3">
          {projects.filter((x) => x.slug !== p.slug).map((x) => (
            <li key={x.slug} className="reveal">
              <Link href={`/services/${x.slug}`} className="pcard group block h-full rounded-2xl border border-line bg-surface p-5" style={{ ["--c" as string]: x.glow }}>
                <span aria-hidden className="mb-4 block h-1.5 w-10 rounded-full transition-[width] duration-300 group-hover:w-20" style={{ background: x.glow }} />
                <span className="h3 block">{x.name}</span>
                <span className="mt-1 block text-muted">{x.line}</span>
              </Link>
            </li>
          ))}
        </ul>
      </Section>

      <section className="border-t border-line bg-surface">
        <div className="wrap grid gap-8 py-14 md:py-20 lg:grid-cols-[1.4fr_1fr] lg:items-center">
          <div className="reveal">
            <h2 className="display-l">{p.stub ? "Project details are available on request." : "Need something like this?"}</h2>
            <Link href={`/contact?topic=project&project=${p.slug}`} className={btn("primary", "mt-6")}>
              {p.stub ? "Ask about this project" : "Start a project"}
            </Link>
          </div>
          <Link href={`/services/${next.slug}`} className="pnext group flex items-center gap-5 rounded-3xl border border-line bg-ground p-5 transition-colors hover:border-accent">
            <span className="relative block h-28 w-[4.5rem] shrink-0 overflow-hidden rounded-t-full" style={{ background: `linear-gradient(160deg, ${next.glow}, var(--raised))` }}>
              {next.arch && <Image src={next.arch} alt="" fill sizes="72px" className="object-cover transition-transform duration-500 group-hover:scale-110" />}
            </span>
            <span>
              <span className="text-sm text-muted">Next project</span>
              <span className="h2 mt-1 block transition-colors group-hover:text-accent-ink">{next.name}</span>
              <span className="mt-1 block text-muted">{next.line}</span>
            </span>
          </Link>
        </div>
      </section>
    </div>
  );
}
