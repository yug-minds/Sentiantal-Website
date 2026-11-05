import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Arch } from "@/components/site/arch";
import { NodeList, Section } from "@/components/site/section";
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

  return (
    <>
      <section className="wrap grid items-center gap-10 py-12 md:py-16 lg:grid-cols-[1.25fr_0.75fr]">
        <div>
          <h1 className="display-xl">{p.name}</h1>
          <p className="lead mt-5 max-w-[30ch]">{p.headline}</p>
          <p className="measure mt-5 text-muted">{p.sub}</p>
          <div className="mt-8 flex flex-wrap gap-3">
            {!p.stub && <a href="#try" className={btn("primary")}>Try the demo</a>}
            <Link href={`/contact?topic=project&project=${p.slug}`} className={btn(p.stub ? "primary" : "ghost")}>
              {p.stub ? "Ask about this project" : "Start a similar project"}
            </Link>
          </div>
        </div>
        <Arch
          src={p.arch}
          art={p.slug === "aquaai" ? "pond" : "rail"}
          alt={p.slug === "aquaai" ? "Pond with ripples" : p.slug === "loco-pilot-data-device" ? "Railway tracks" : `${p.name} device`}
          glow={p.glow}
          className="mx-auto w-full max-w-sm"
          priority
        />
      </section>

      {!p.stub && (
        <>
          <Section id="try" title="Try it">{demoFor(p.slug)}</Section>
          <Section id="features" title="What it does"><NodeList items={p.features} glow={p.glow} /></Section>
          <Section id="why" title="Why it matters"><NodeList items={p.why} glow={p.glow} cols={1} /></Section>
        </>
      )}

      <section className="border-t border-line bg-surface">
        <div className="wrap grid gap-8 py-14 md:py-20 lg:grid-cols-[1.4fr_1fr] lg:items-center">
          <div>
            <h2 className="display-l">{p.stub ? "Project details are available on request." : "Need something like this?"}</h2>
            <Link href={`/contact?topic=project&project=${p.slug}`} className={btn("primary", "mt-6")}>
              {p.stub ? "Ask about this project" : "Start a project"}
            </Link>
          </div>
          <Link href={`/services/${next.slug}`} className="group block border-t border-line pt-5 lg:border-l lg:border-t-0 lg:pl-8 lg:pt-0">
            <span className="text-sm text-muted">Next project</span>
            <span className="h2 mt-1 block transition-colors group-hover:text-accent-ink">{next.name}</span>
            <span className="mt-1 block text-muted">{next.line}</span>
          </Link>
        </div>
      </section>
    </>
  );
}
