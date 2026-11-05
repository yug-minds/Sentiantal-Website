"use client";

import { useEffect, useRef, useState, useSyncExternalStore } from "react";
import { Slider } from "radix-ui";
import clsx from "clsx";
import type { Level } from "@/lib/status";

export function DemoFrame({
  title,
  note = "Sample data",
  children,
  className,
}: {
  title: string;
  note?: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <section
      aria-label={title}
      className={clsx("rounded-[1.75rem] border border-line bg-surface p-5 md:p-8", className)}
    >
      <header className="mb-6 flex flex-wrap items-center justify-between gap-3">
        <h3 className="h3">{title}</h3>
        <span className="rounded-full border border-line px-3 py-1 text-sm text-muted">{note}</span>
      </header>
      {children}
    </section>
  );
}

const levelStyle: Record<Level, string> = {
  ok: "bg-good/15 text-good border-good/40",
  watch: "bg-warn/15 text-warn border-warn/50",
  alert: "bg-bad/15 text-bad border-bad/50",
};
const levelText: Record<Level, string> = { ok: "Normal", watch: "Watch", alert: "Alert" };

/** Colour plus a word, so status never relies on colour alone. */
export function LevelChip({ level, label }: { level: Level; label?: string }) {
  return (
    <span
      className={clsx(
        "inline-flex items-center gap-1.5 rounded-full border px-2.5 py-0.5 text-sm font-medium",
        levelStyle[level],
      )}
    >
      <span aria-hidden className="size-2 rounded-full bg-current" />
      {label ?? levelText[level]}
    </span>
  );
}

export function LabelledSlider({
  label,
  unit,
  value,
  min,
  max,
  step,
  onChange,
  level,
  digits = 0,
}: {
  label: string;
  unit: string;
  value: number;
  min: number;
  max: number;
  step: number;
  onChange: (v: number) => void;
  level?: Level;
  digits?: number;
}) {
  const id = label.replace(/\s+/g, "-").toLowerCase();
  return (
    <div className="space-y-2">
      <div className="flex items-baseline justify-between gap-3">
        <label id={id} className="font-display text-sm font-medium">
          {label}
        </label>
        <span className="flex items-center gap-2">
          <output className="tabular-nums" aria-live="off">
            {value.toFixed(digits)} <span className="text-muted">{unit}</span>
          </output>
          {level && <LevelChip level={level} />}
        </span>
      </div>
      <Slider.Root
        aria-labelledby={id}
        className="relative flex h-6 w-full touch-none select-none items-center"
        min={min}
        max={max}
        step={step}
        value={[value]}
        onValueChange={([v]) => onChange(v)}
      >
        <Slider.Track className="relative h-1.5 grow rounded-full bg-raised">
          <Slider.Range className="absolute h-full rounded-full bg-accent" />
        </Slider.Track>
        <Slider.Thumb className="block size-6 rounded-full border-2 border-accent bg-surface shadow transition-transform hover:scale-110" />
      </Slider.Root>
    </div>
  );
}

const reducedQuery = "(prefers-reduced-motion: reduce)";
export function usePrefersReducedMotion() {
  return useSyncExternalStore(
    (cb) => {
      const q = window.matchMedia(reducedQuery);
      q.addEventListener("change", cb);
      return () => q.removeEventListener("change", cb);
    },
    () => window.matchMedia(reducedQuery).matches,
    () => false,
  );
}

export function useInView<T extends Element>() {
  const ref = useRef<T>(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => setInView(e.isIntersecting), { threshold: 0.1 });
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return [ref, inView] as const;
}

/** Slow random walk around a base value. Drives "live" readouts. */
export function useJitter(base: number[], spread: number[], everyMs = 1800) {
  const key = base.join(",");
  const [st, setSt] = useState({ key, vals: base });
  // When the base changes (a new scenario), show it straight away, then drift from there.
  const vals = st.key === key ? st.vals : base;
  useEffect(() => {
    const id = setInterval(
      () => setSt({ key, vals: base.map((b, i) => +(b + (Math.random() - 0.5) * 2 * spread[i]).toFixed(2)) }),
      everyMs,
    );
    return () => clearInterval(id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [key, everyMs]);
  return vals;
}
