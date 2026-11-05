"use client";

import { useState } from "react";
import Link from "next/link";
import clsx from "clsx";
import { projects } from "@/content/services";
import { Readout } from "./readout";
import { btn } from "@/components/ui/button";

export function ProjectList() {
  const [active, setActive] = useState(projects[0].slug);
  const cur = projects.find((p) => p.slug === active)!;

  return (
    <div className="grid gap-10 lg:grid-cols-[1.2fr_1fr]">
      <ul className="min-w-0 divide-y divide-line border-y border-line">
        {projects.map((p) => (
          <li key={p.slug} className="reveal">
            <Link
              href={`/services/${p.slug}`}
              onMouseEnter={() => setActive(p.slug)}
              onFocus={() => setActive(p.slug)}
              className={clsx("proj-row block py-5 pl-4 pr-4 transition-colors", active === p.slug ? "bg-raised" : "hover:bg-raised/60")}
              data-active={active === p.slug ? "" : undefined}
            >
              <span className="flex items-center gap-3">
                <span aria-hidden className="proj-swatch size-3 shrink-0 rounded-[3px] ring-1 ring-ink/25" style={{ background: p.glow }} />
                <span className="h3">{p.name}</span>
              </span>
              <span className="mt-1 block pl-6 text-muted">{p.line}</span>
            </Link>
          </li>
        ))}
      </ul>

      <div
        className="hidden min-w-0 self-start rounded-[1.75rem] border bg-surface p-8 transition-[border-color,box-shadow] duration-500 lg:sticky lg:top-28 lg:block"
        style={{ borderColor: cur.glow, boxShadow: `0 24px 60px -30px ${cur.glow}` }}
        aria-live="polite"
      >
        <p className="text-sm text-muted">{cur.sector}, sample reading</p>
        <div key={cur.slug} className="try-panel mt-4 min-h-[8rem]">
          <Readout key={cur.slug} slug={cur.slug} />
        </div>
        <p className="mt-6 max-w-xs text-muted">{cur.line}</p>
        <Link href={`/services/${cur.slug}`} className={btn("ghost", "mt-6")}>Open {cur.name}</Link>
      </div>
    </div>
  );
}
