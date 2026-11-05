"use client";

import { useState } from "react";
import { Tabs } from "radix-ui";
import { serviceLines } from "@/content/services";

const keys = ["ai", "iot"] as const;

export function ServiceLines() {
  const [value, setValue] = useState<(typeof keys)[number]>("ai");
  return (
    <Tabs.Root value={value} onValueChange={(v) => setValue(v as (typeof keys)[number])}>
      <Tabs.List aria-label="Service lines" className="relative mb-8 inline-grid grid-cols-2 rounded-full border border-line bg-surface p-1">
        <span
          aria-hidden
          className="try-pill absolute inset-y-1 left-1 w-[calc((100%-0.5rem)/2)] rounded-full bg-accent"
          style={{ translate: `${keys.indexOf(value) * 100}% 0` }}
        />
        {keys.map((k) => (
          <Tabs.Trigger
            key={k}
            value={k}
            className="relative z-10 rounded-full px-8 py-2.5 font-display text-sm font-medium transition-colors duration-300 data-[state=active]:text-on-accent"
          >
            {serviceLines[k].title}
          </Tabs.Trigger>
        ))}
      </Tabs.List>
      {keys.map((k) => (
        <Tabs.Content key={k} value={k} className="try-panel">
          <p className="lead mb-8 max-w-2xl">{serviceLines[k].intro}</p>
          <dl className="grid gap-4 md:grid-cols-2">
            {serviceLines[k].items.map((it, i) => (
              <div key={it.title} className="svc-card rounded-2xl border border-line bg-surface p-5" style={{ ["--i" as string]: i }}>
                <dt className="h3">{it.title}</dt>
                <dd className="mt-1 text-muted">{it.body}</dd>
              </div>
            ))}
          </dl>
        </Tabs.Content>
      ))}
    </Tabs.Root>
  );
}
