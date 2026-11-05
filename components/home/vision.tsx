"use client";

import { useEffect, useRef } from "react";
import { company } from "@/content/company";
import { Mark } from "@/components/site/logo";

/**
 * Vision then Mission, read aloud by scroll: each word lights up as you pass it.
 * Pinned on desktop; on phones the section scrolls normally and the same --p drives it.
 * Reduced motion shows everything lit.
 */
const blocks = [
  { title: "Vision", words: company.vision.split(" ") },
  { title: "Mission", words: company.mission.split(" ") },
];
const starts = blocks.map((_, i) => blocks.slice(0, i).reduce((n, b) => n + b.words.length, 0));
const total = starts[1] + blocks[1].words.length;

export function VisionMission() {
  const root = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = root.current!;
    if (matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let raf = 0;
    const update = () => {
      const r = el.getBoundingClientRect();
      const pinned = matchMedia("(min-width: 768px)").matches;
      const p = pinned
        ? -r.top / (r.height - innerHeight + 72)
        : (innerHeight * 0.85 - r.top) / (r.height * 0.9);
      el.style.setProperty("--vp", Math.min(1, Math.max(0, p)).toFixed(4));
    };
    const onScroll = () => { cancelAnimationFrame(raf); raf = requestAnimationFrame(update); };
    update();
    addEventListener("scroll", onScroll, { passive: true });
    addEventListener("resize", onScroll);
    return () => { cancelAnimationFrame(raf); removeEventListener("scroll", onScroll); removeEventListener("resize", onScroll); };
  }, []);

  return (
    <section
      ref={root}
      aria-label="Vision and mission"
      className="vision relative bg-ink text-ground md:h-[300svh] motion-reduce:h-auto"
      style={{ ["--n" as string]: total + 3 }}
    >
      <div className="vision-stage md:sticky md:top-[4.5rem] md:flex md:h-[calc(100svh-4.5rem)] md:items-center md:overflow-hidden motion-reduce:static motion-reduce:py-16">
        {/* The logo mark turns slowly with the reading, so the page keeps moving between words. */}
        <div aria-hidden className="vision-mark pointer-events-none absolute -right-16 top-1/2 hidden w-[28rem] -translate-y-1/2 md:block">
          <Mark colour="magenta" size={448} />
        </div>
        <div className="wrap relative grid gap-10 py-16 md:grid-cols-2 md:gap-14 md:py-0">
          {blocks.map((b, bi) => {
            const s = starts[bi];
            return (
              <div key={b.title} style={{ ["--s" as string]: s, ["--len" as string]: b.words.length }}>
                <div className="relative h-px bg-ground/25">
                  <span aria-hidden className="vision-rule absolute inset-0 origin-left bg-accent" />
                </div>
                <h2 className="vision-title h2 mb-4 mt-6">{b.title}</h2>
                <p className="vision-text font-display text-[1.15rem] font-light leading-[1.5] md:text-[1.45rem]">
                  {b.words.map((w, i) => (
                    <span key={i} className="vision-word" style={{ ["--i" as string]: s + i }}>
                      {w}{" "}
                    </span>
                  ))}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
