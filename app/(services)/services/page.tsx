import type { Metadata } from "next";
import Link from "next/link";
import { ChainTabs } from "@/components/site/chain-tabs";
import { Section } from "@/components/site/section";
import { ProjectPath } from "@/components/services/project-path";
import { ServiceLines } from "@/components/services/service-lines";
import { ProjectList } from "@/components/services/project-list";
import { btn } from "@/components/ui/button";
import { pipeline } from "@/content/services";

export const metadata: Metadata = {
  title: "Services",
  description: "AI and IoT services from Sentiantal: sensors, firmware, models, dashboards and apps, built to your brief.",
};

export default function ServicesPage() {
  return (
    <>
      {/* Hero: the pipeline we build, as a signal that travels sensor to phone along the logo's stair. */}
      <section className="wrap grid items-center gap-10 pb-12 pt-12 md:pt-16 lg:grid-cols-[1.3fr_1fr]" aria-label="Services overview">
        <div>
          <h1 className="display-xl max-w-[16ch]">
            {["AI and IoT, built", "to your brief."].map((l, i) => (
              <span key={l} className="block overflow-hidden pb-[0.12em]">
                <span className="hero-rise block" style={{ animationDelay: `${0.1 + i * 0.15}s` }}>{l}</span>
              </span>
            ))}
          </h1>
          <p className="lead enter-copy mt-5 max-w-2xl text-muted">
            We design the sensor, write the firmware, train the model and ship the dashboard.
          </p>
          <Link href="/contact?topic=project" className={btn("primary", "enter-copy mt-8")}>Start a project</Link>
        </div>
        <svg viewBox="0 0 420 300" role="img" aria-label="A signal travels from sensor to connect to understand to act" className="svc-flow mx-auto w-full max-w-md">
          <path d="M50 220 L150 80 L270 220 L370 80" className="svc-flow-rail" fill="none" />
          <path d="M50 220 L150 80 L270 220 L370 80" pathLength={1} className="svc-flow-draw" fill="none" />
          <circle r="7" className="svc-flow-dot" />
          {[
            { x: 50, y: 220, t: "Sense" },
            { x: 150, y: 80, t: "Connect" },
            { x: 270, y: 220, t: "Understand" },
            { x: 370, y: 80, t: "Act" },
          ].map((n, i) => (
            <g key={n.t} className="svc-flow-node" style={{ ["--d" as string]: `${i * 2}s` }}>
              <rect x={n.x - 16} y={n.y - 16} width="32" height="32" rx="9" />
              <text x={n.x} y={n.y + (n.y > 150 ? 42 : -26)} textAnchor="middle">{n.t}</text>
            </g>
          ))}
        </svg>
      </section>

      <Section id="projects" title="Service projects">
        <ProjectList />
      </Section>

      <Section id="what-we-build" title="What we build">
        <ServiceLines />
      </Section>

      <Section id="how-we-build" title="How we build">
        <ChainTabs
          label="How we build"
          items={pipeline.map((s, i) => ({
            key: s.key,
            label: s.name,
            mark: i + 1,
            panel: (
              <div className="grid gap-6 md:grid-cols-2">
                <p className="lead">{s.body}</p>
                <p className="border-l-4 border-accent pl-5">
                  <span className="block font-display font-medium">From our own work</span>
                  {s.example}
                </p>
              </div>
            ),
          }))}
        />
      </Section>

      <Section id="path" title="How a project runs">
        <ProjectPath />
      </Section>

      <section className="border-t border-line bg-surface">
        <div className="wrap reveal flex flex-col gap-6 py-14 md:flex-row md:items-center md:justify-between md:py-20">
          <h2 className="display-l max-w-[20ch]">Tell us what you need to measure.</h2>
          <Link href="/contact?topic=project" className={btn("primary", "self-start")}>Start a project</Link>
        </div>
      </section>
    </>
  );
}
