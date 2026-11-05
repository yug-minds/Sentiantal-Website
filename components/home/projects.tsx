"use client";

import { useState } from "react";
import Link from "next/link";
import { Accordion } from "radix-ui";
import { projects } from "@/content/services";
import { btn } from "@/components/ui/button";

/** Sample readings, shown only to give each project a face. Loco-pilot has no content yet, so no reading. */
const sample: Record<string, string> = {
  "solar-monitoring": "Panel 3: 18.2 V, 41 °C",
  vaaiu: "PM2.5: 12, air is good",
  aquaai: "Oxygen: 5.6 mg/L, normal",
};

/** A stable wobbly line per project, so each row draws its own shape. */
const spark = (seed: number) => {
  const pts = Array.from({ length: 24 }, (_, i) => {
    const y = 22 + 12 * Math.sin(i * 0.55 + seed * 1.7) + 6 * Math.sin(i * 1.3 + seed);
    return `${i === 0 ? "M" : "L"}${(i * 160) / 23} ${y.toFixed(1)}`;
  });
  return pts.join(" ");
};

export function ServiceProjects() {
  const [open, setOpen] = useState(projects[0].slug);

  return (
    <section className="wrap py-16 md:py-24" aria-labelledby="projects-h">
      <div className="grid gap-10 lg:grid-cols-[1fr_1.4fr]">
        <div className="self-start lg:sticky lg:top-28">
          <h2 id="projects-h" className="display-l reveal">Built for other teams.</h2>
          <p className="lead mt-4 text-muted">We also design and build AI and IoT systems to a customer’s brief. Here are four.</p>
          <Link href="/services" className={btn("ghost", "mt-8")}>
            See our services
          </Link>
        </div>

        <div className="relative">
          <span aria-hidden className="proj-line absolute -left-4 top-0 hidden h-full w-[3px] origin-top rounded bg-accent lg:block" />
          <Accordion.Root
            type="single"
            value={open}
            onValueChange={(v) => v && setOpen(v)}
            className="divide-y divide-line border-y border-line"
          >
            {projects.map((p, i) => (
              <Accordion.Item
                key={p.slug}
                value={p.slug}
                className="proj-item reveal"
                onPointerEnter={(e) => e.pointerType === "mouse" && setOpen(p.slug)}
              >
                <Accordion.Header>
                  <Accordion.Trigger className="proj-trigger group flex w-full items-center justify-between gap-6 py-5 text-left">
                    <span className="flex items-center gap-3">
                      <span aria-hidden className="proj-swatch size-3 shrink-0 rounded-[3px] ring-1 ring-ink/25" style={{ background: p.glow }} />
                      <span className="h3">{p.name}</span>
                    </span>
                    <span className="hidden max-w-xs text-right text-muted sm:block">{p.line}</span>
                  </Accordion.Trigger>
                </Accordion.Header>
                <Accordion.Content className="proj-content overflow-hidden">
                  <div className="grid gap-4 pb-6 pl-6 sm:grid-cols-[1fr_auto] sm:items-end">
                    <div>
                      <p className="font-display text-xl font-medium leading-snug">{p.headline}</p>
                      <p className="mt-2 text-muted sm:hidden">{p.line}</p>
                      <Link href={`/services/${p.slug}`} className={btn("plain", "mt-4")}>
                        See {p.name}
                      </Link>
                    </div>
                    {sample[p.slug] && (
                      <figure className="w-44" aria-label="Sample reading">
                        <svg viewBox="0 0 160 44" className="proj-spark h-11 w-full" aria-hidden>
                          <path d={spark(i)} pathLength={1} fill="none" stroke={p.glow} strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                        <figcaption className="mt-1 text-sm text-muted">{sample[p.slug]}</figcaption>
                      </figure>
                    )}
                  </div>
                </Accordion.Content>
              </Accordion.Item>
            ))}
          </Accordion.Root>
        </div>
      </div>
    </section>
  );
}
