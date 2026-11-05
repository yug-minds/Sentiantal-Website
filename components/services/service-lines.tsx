"use client";

import { Tabs } from "radix-ui";
import { serviceLines } from "@/content/services";

const keys = ["ai", "iot"] as const;

export function ServiceLines() {
  return (
    <Tabs.Root defaultValue="ai">
      <Tabs.List aria-label="Service lines" className="mb-8 inline-flex rounded-full border border-line bg-surface p-1">
        {keys.map((k) => (
          <Tabs.Trigger
            key={k}
            value={k}
            className="rounded-full px-6 py-2.5 font-display text-sm font-medium transition-colors data-[state=active]:bg-accent data-[state=active]:text-on-accent"
          >
            {serviceLines[k].title}
          </Tabs.Trigger>
        ))}
      </Tabs.List>
      {keys.map((k) => (
        <Tabs.Content key={k} value={k}>
          <p className="lead mb-8 max-w-2xl">{serviceLines[k].intro}</p>
          <dl className="grid gap-x-10 md:grid-cols-2">
            {serviceLines[k].items.map((it) => (
              <div key={it.title} className="border-t border-line py-5">
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
