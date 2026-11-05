"use client";

import { Tabs } from "radix-ui";
import { EcgMonitor, SoilTest, VisitorPass } from "@/components/demos";

const tabs = [
  { key: "soil", label: "Soil test", node: <SoilTest /> },
  { key: "ecg", label: "Heart alert", node: <EcgMonitor /> },
  { key: "pass", label: "Visitor pass", node: <VisitorPass /> },
];

export function TryIt() {
  return (
    <section className="bg-raised py-16 md:py-24" aria-labelledby="try-h">
      <div className="wrap">
        <div className="mb-8 max-w-2xl">
          <h2 id="try-h" className="display-l reveal">See how they respond.</h2>
          <p className="lead mt-4 text-muted">Three live samples from our products. Change a setting and watch the result.</p>
        </div>
        <Tabs.Root defaultValue="soil">
          <Tabs.List aria-label="Product samples" className="mb-6 inline-flex flex-wrap gap-1 rounded-full border border-line bg-surface p-1">
            {tabs.map((t) => (
              <Tabs.Trigger
                key={t.key}
                value={t.key}
                className="rounded-full px-5 py-2.5 font-display text-sm font-medium transition-colors data-[state=active]:bg-accent data-[state=active]:text-on-accent"
              >
                {t.label}
              </Tabs.Trigger>
            ))}
          </Tabs.List>
          {tabs.map((t) => (
            <Tabs.Content key={t.key} value={t.key}>
              {t.node}
            </Tabs.Content>
          ))}
        </Tabs.Root>
      </div>
    </section>
  );
}
