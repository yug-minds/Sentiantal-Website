import type { Metadata } from "next";
import Link from "next/link";
import { ChainTabs } from "@/components/site/chain-tabs";
import { Section } from "@/components/site/section";
import { ServiceLines } from "@/components/services/service-lines";
import { ProjectList } from "@/components/services/project-list";
import { btn } from "@/components/ui/button";
import { pipeline, projectPath } from "@/content/services";

export const metadata: Metadata = {
  title: "Services",
  description: "AI and IoT services from Sentiantal: sensors, firmware, models, dashboards and apps, built to your brief.",
};

export default function ServicesPage() {
  return (
    <>
      <section className="wrap pb-12 pt-12 md:pt-16">
        <h1 className="display-xl max-w-[16ch]">AI and IoT, built to your brief.</h1>
        <p className="lead mt-5 max-w-2xl text-muted">
          We design the sensor, write the firmware, train the model and ship the dashboard.
        </p>
        <Link href="/contact?topic=project" className={btn("primary", "mt-8")}>Start a project</Link>
      </section>

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

      <Section id="projects" title="Service projects">
        <ProjectList />
      </Section>

      <Section id="path" title="How a project runs">
        <ol className="grid gap-x-10 md:grid-cols-2">
          {projectPath.map((s, i) => (
            <li key={s.name} className="flex gap-4 border-t border-line py-5">
              <span className="grid size-10 shrink-0 place-items-center rounded-xl border-2 border-accent font-display font-bold">{i + 1}</span>
              <div>
                <h3 className="h3">{s.name}</h3>
                <p className="mt-1 text-muted">{s.body}</p>
              </div>
            </li>
          ))}
        </ol>
      </Section>

      <section className="border-t border-line bg-surface">
        <div className="wrap flex flex-col gap-6 py-14 md:flex-row md:items-center md:justify-between md:py-20">
          <h2 className="display-l max-w-[20ch]">Tell us what you need to measure.</h2>
          <Link href="/contact?topic=project" className={btn("primary", "self-start")}>Start a project</Link>
        </div>
      </section>
    </>
  );
}
