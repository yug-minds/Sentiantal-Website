"use client";

import { useState } from "react";
import Link from "next/link";
import clsx from "clsx";
import { airBand } from "@/lib/status";
import { projects } from "@/content/services";
import { LevelChip, useJitter } from "@/components/demos/parts";
import { btn } from "@/components/ui/button";

function Readout({ slug }: { slug: string }) {
  const [kw, pm, o2] = useJitter([2.12, 18, 6.1], [0.05, 2.5, 0.25]);
  if (slug === "solar-monitoring")
    return (
      <>
        <p className="font-display text-5xl font-bold tabular-nums">{kw.toFixed(2)} <span className="text-xl font-medium text-muted">kW</span></p>
        <p className="mt-2 text-muted">6 of 6 panels normal</p>
      </>
    );
  if (slug === "vaaiu") {
    const b = airBand(pm);
    return (
      <>
        <p className="font-display text-5xl font-bold tabular-nums">{pm.toFixed(0)} <span className="text-xl font-medium text-muted">µg/m³ PM2.5</span></p>
        <p className="mt-3"><LevelChip level={b.level} label={b.label} /></p>
      </>
    );
  }
  if (slug === "aquaai")
    return (
      <>
        <p className="font-display text-5xl font-bold tabular-nums">{o2.toFixed(1)} <span className="text-xl font-medium text-muted">mg/L oxygen</span></p>
        <p className="mt-3"><LevelChip level="ok" label="Green" /></p>
      </>
    );
  return <p className="font-display text-2xl font-bold">Details on request</p>;
}

export function ProjectList() {
  const [active, setActive] = useState(projects[0].slug);
  const cur = projects.find((p) => p.slug === active)!;

  return (
    <div className="grid gap-10 lg:grid-cols-[1.2fr_1fr]">
      <ul className="divide-y divide-line border-y border-line">
        {projects.map((p) => (
          <li key={p.slug}>
            <Link
              href={`/services/${p.slug}`}
              onMouseEnter={() => setActive(p.slug)}
              onFocus={() => setActive(p.slug)}
              className={clsx("block py-5 pl-4 pr-4 transition-colors", active === p.slug ? "bg-raised" : "hover:bg-raised/60")}
            >
              <span className="flex items-center gap-3">
                <span aria-hidden className="size-3 shrink-0 rounded-[3px] ring-1 ring-ink/25" style={{ background: p.glow }} />
                <span className="h3">{p.name}</span>
              </span>
              <span className="mt-1 block pl-6 text-muted">{p.line}</span>
            </Link>
          </li>
        ))}
      </ul>

      <div className="hidden rounded-[1.75rem] border border-line bg-surface p-8 lg:block" aria-live="polite">
        <p className="text-sm text-muted">{cur.sector}, sample reading</p>
        <div className="mt-4 min-h-[8rem]">
          <Readout key={cur.slug} slug={cur.slug} />
        </div>
        <p className="mt-6 max-w-xs text-muted">{cur.line}</p>
        <Link href={`/services/${cur.slug}`} className={btn("ghost", "mt-6")}>Open {cur.name}</Link>
      </div>
    </div>
  );
}
