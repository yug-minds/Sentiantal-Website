"use client";

import { useState } from "react";
import Link from "next/link";
import { Tabs } from "radix-ui";
import { EcgMonitor, SoilTest, VisitorPass } from "@/components/demos";
import { btn } from "@/components/ui/button";

const tabs = [
  { key: "soil", label: "Soil test", node: <SoilTest />, product: "Agrow Insights", href: "/products/agrow-insights" },
  { key: "ecg", label: "Heart alert", node: <EcgMonitor />, product: "Suraaksha", href: "/products/suraaksha" },
  { key: "pass", label: "Visitor pass", node: <VisitorPass />, product: "SecureIN", href: "/products/securein" },
];

export function TryIt() {
  const [value, setValue] = useState("soil");
  const index = tabs.findIndex((t) => t.key === value);
  const current = tabs[index];

  return (
    <section className="try relative isolate py-16 md:py-24" aria-labelledby="try-h">
      {/* The slanted top edge flattens as the section scrolls in, echoing the seam on the gateway. */}
      <div aria-hidden className="try-bg absolute inset-0 -z-10 bg-raised" />
      <div className="wrap">
        <div className="mb-8 max-w-2xl">
          <h2 id="try-h" className="display-l reveal">See how they respond.</h2>
          <p className="lead reveal mt-4 text-muted">Three live samples from our products. Change a setting and watch the result.</p>
        </div>
        <Tabs.Root value={value} onValueChange={setValue}>
          <div className="mb-6 flex flex-wrap items-center justify-between gap-x-6 gap-y-3">
            <Tabs.List
              aria-label="Product samples"
              className="relative grid w-full max-w-md grid-cols-3 rounded-full border border-line bg-surface p-1"
            >
              {/* One pill that slides to the chosen tab, so the change reads as movement, not a swap. */}
              <span
                aria-hidden
                className="try-pill absolute inset-y-1 left-1 w-[calc((100%-0.5rem)/3)] rounded-full bg-accent"
                style={{ translate: `${index * 100}% 0` }}
              />
              {tabs.map((t) => (
                <Tabs.Trigger
                  key={t.key}
                  value={t.key}
                  className="relative z-10 rounded-full px-3 py-2.5 font-display text-sm font-medium transition-colors duration-300 data-[state=active]:text-on-accent"
                >
                  {t.label}
                </Tabs.Trigger>
              ))}
            </Tabs.List>
            <Link href={current.href} className={btn("plain")}>
              See {current.product}
            </Link>
          </div>
          <div className="try-stage">
            {tabs.map((t) => (
              <Tabs.Content key={t.key} value={t.key} className="try-panel">
                {t.node}
              </Tabs.Content>
            ))}
          </div>
        </Tabs.Root>
      </div>
    </section>
  );
}
