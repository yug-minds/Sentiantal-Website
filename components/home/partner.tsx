"use client";

import { useState } from "react";
import Link from "next/link";
import { ToggleGroup } from "radix-ui";
import { partnerTopics } from "@/content/company";
import { btn } from "@/components/ui/button";

const R = 112;
const nodes = partnerTopics.map((t, i) => {
  const a = ((-90 + i * (360 / partnerTopics.length)) * Math.PI) / 180;
  return { key: t.key, x: 160 + R * Math.cos(a), y: 160 + R * Math.sin(a) };
});

/** Pick one way to help. The web on the right connects that way to Sentiantal, and the button carries it to the form. */
export function Partner() {
  const [topic, setTopic] = useState("");
  const chosen = partnerTopics.find((t) => t.key === topic);

  return (
    <section className="wrap py-16 md:py-24" aria-labelledby="partner-h">
      <div className="grid items-center gap-10 lg:grid-cols-[1.2fr_1fr] lg:gap-16">
        <div>
          <h2 id="partner-h" className="display-l reveal">We’re looking for partners to take these further.</h2>
          <p className="lead reveal mt-4 text-muted">Pick where you can help, and we will take it from there.</p>
          <ToggleGroup.Root
            type="single"
            value={topic}
            onValueChange={setTopic}
            aria-label="Where can you help"
            className="mt-8 flex flex-wrap gap-3"
          >
            {partnerTopics.map((t, i) => (
              <ToggleGroup.Item
                key={t.key}
                value={t.key}
                className="partner-chip reveal rounded-full border border-line px-5 py-3 font-display text-sm font-medium transition-[background-color,color,border-color,transform] duration-200 hover:border-accent data-[state=on]:border-accent data-[state=on]:bg-accent data-[state=on]:text-on-accent"
                style={{ ["--i" as string]: i }}
              >
                {t.label}
              </ToggleGroup.Item>
            ))}
          </ToggleGroup.Root>
          <div className="mt-8 flex flex-wrap items-center gap-4">
            <Link href={chosen ? `/contact?topic=${chosen.key}` : "/contact"} className={btn("primary")}>
              {chosen ? `Talk to us about ${chosen.label.toLowerCase()}` : "Start the conversation"}
            </Link>
          </div>
        </div>

        <svg viewBox="0 0 320 320" aria-hidden className="partner-web mx-auto w-full max-w-sm">
          <g className="partner-orbit">
            {nodes.map((n) => {
              const on = n.key === topic;
              return (
                <g key={n.key} data-on={on ? "" : undefined} className="partner-node">
                  <line x1="160" y1="160" x2={n.x} y2={n.y} pathLength={1} className="partner-idle" />
                  <line x1="160" y1="160" x2={n.x} y2={n.y} pathLength={1} className="partner-live" />
                  <circle cx={n.x} cy={n.y} r="9" className="partner-dot" />
                  {on && <circle cx={n.x} cy={n.y} r="9" className="partner-ring" />}
                </g>
              );
            })}
          </g>
          <circle cx="160" cy="160" r="42" fill="var(--surface)" stroke="var(--line)" strokeWidth="2" />
          <image href="/brand/mark-magenta.svg" x="138" y="136" width="44" height="46" />
        </svg>
      </div>
    </section>
  );
}
