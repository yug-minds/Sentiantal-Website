"use client";

import { useState } from "react";
import { Tabs } from "radix-ui";
import clsx from "clsx";

export interface ChainItem {
  key: string;
  label: string;
  /** Shown inside the node. Numbers for a real sequence, an icon otherwise. */
  mark: React.ReactNode;
  panel: React.ReactNode;
}

const NODE = 56;
const H = 192;
// Node centre, in px, for a zig-zag (the logo's stair) and for a straight line.
const centreY = (i: number, zigzag: boolean) => (zigzag ? (i % 2 ? 118 : 36) : 60);
const topY = (i: number, zigzag: boolean) => centreY(i, zigzag) - NODE / 2;

/**
 * The logo's chain of squares, as a tab list. Each node is a tab, connectors join the centres.
 */
export function ChainTabs({
  items,
  zigzag = false,
  label,
  initial,
}: {
  items: ChainItem[];
  zigzag?: boolean;
  label: string;
  initial?: string;
}) {
  const [value, setValue] = useState(initial ?? items[0].key);
  const n = items.length;
  const xPct = (i: number) => ((i + 0.5) / n) * 100;
  const points = items.map((_, i) => `${xPct(i)},${centreY(i, zigzag)}`).join(" ");

  return (
    <Tabs.Root value={value} onValueChange={setValue}>
      <Tabs.List aria-label={label} className="relative mx-auto w-full max-w-3xl" style={{ height: H }}>
        <svg aria-hidden viewBox={`0 0 100 ${H}`} preserveAspectRatio="none" className="absolute inset-0 size-full">
          <polyline points={points} fill="none" stroke="var(--line)" strokeWidth="3" vectorEffect="non-scaling-stroke" />
        </svg>
        {items.map((it, i) => {
          const active = it.key === value;
          return (
            <Tabs.Trigger
              key={it.key}
              value={it.key}
              className="group absolute flex w-28 -translate-x-1/2 flex-col items-center gap-2 text-center"
              style={{ left: `${xPct(i)}%`, top: topY(i, zigzag) }}
            >
              <span
                className={clsx(
                  "grid place-items-center rounded-xl border-2 font-display text-lg font-bold transition-[background-color,transform,color] duration-300 group-hover:-translate-y-0.5",
                  active ? "border-accent bg-accent text-on-accent" : "border-line bg-surface text-ink",
                )}
                style={{ width: NODE, height: NODE }}
              >
                {it.mark}
              </span>
              <span className={clsx("font-display text-sm font-medium leading-tight", active ? "text-ink" : "text-muted")}>
                {it.label}
              </span>
            </Tabs.Trigger>
          );
        })}
      </Tabs.List>
      {items.map((it) => (
        <Tabs.Content key={it.key} value={it.key} className="mt-6">
          {it.panel}
        </Tabs.Content>
      ))}
    </Tabs.Root>
  );
}
