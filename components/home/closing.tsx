import Link from "next/link";
import { company, partnerTopics } from "@/content/company";
import { projects } from "@/content/services";
import { btn } from "@/components/ui/button";

export function ServiceProjects() {
  return (
    <section className="wrap py-16 md:py-24" aria-labelledby="projects-h">
      <div className="grid gap-10 lg:grid-cols-[1fr_1.4fr]">
        <div>
          <h2 id="projects-h" className="display-l">Built for other teams.</h2>
          <p className="lead mt-4 text-muted">We also design and build AI and IoT systems to a customer’s brief. Here are four.</p>
          <Link href="/services" className={btn("ghost", "mt-8")}>
            See our services
          </Link>
        </div>
        <ul className="divide-y divide-line border-y border-line">
          {projects.map((p) => (
            <li key={p.slug}>
              <Link href={`/services/${p.slug}`} className="grid gap-1 py-5 transition-colors hover:text-accent-ink sm:grid-cols-[1fr_auto] sm:items-baseline sm:gap-6">
                <span className="flex items-center gap-3">
                  <span aria-hidden className="size-3 shrink-0 rounded-[3px] ring-1 ring-ink/25" style={{ background: p.glow }} />
                  <span className="h3">{p.name}</span>
                </span>
                <span className="text-muted sm:max-w-xs sm:text-right">{p.line}</span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

export function VisionMission() {
  return (
    <section className="bg-ink py-16 text-ground md:py-24" aria-label="Vision and mission">
      <div className="wrap grid gap-12 md:grid-cols-2">
        <div className="border-t border-ground/30 pt-6">
          <h2 className="h2 mb-4">Vision</h2>
          <p className="lead measure">{company.vision}</p>
        </div>
        <div className="border-t border-ground/30 pt-6">
          <h2 className="h2 mb-4">Mission</h2>
          <p className="lead measure">{company.mission}</p>
        </div>
      </div>
    </section>
  );
}

export function Partner() {
  return (
    <section className="wrap py-16 md:py-24" aria-labelledby="partner-h">
      <div className="max-w-3xl">
        <h2 id="partner-h" className="display-l">We’re looking for partners to take these further.</h2>
        <p className="lead mt-4 text-muted">Tell us where you can help, and we will take it from there.</p>
        <ul className="mt-8 flex flex-wrap gap-3">
          {partnerTopics.map((t) => (
            <li key={t.key}>
              <Link
                href={`/contact?topic=${t.key}`}
                className="inline-block rounded-full border border-line px-5 py-3 font-display text-sm font-medium transition-colors hover:border-accent hover:bg-accent hover:text-on-accent"
              >
                {t.label}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
