"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { fields, type FieldKey } from "@/content/company";

/**
 * Pinned scroll stage: scrolling steps through the four fields. Each field draws its own
 * small sensor scene; the page tint, the list of products and projects, and the rail all follow.
 * Names are buttons too, so the same state is reachable by click or keyboard.
 */

const tint: Record<FieldKey, string> = {
  agriculture: "#3f9d62",
  healthcare: "#c73a7e",
  education: "#2c267e",
  safety: "#e0902b",
};

/** Each scene is drawn with pathLength=1 so one CSS rule can draw every stroke. */
const scenes: Record<FieldKey, React.ReactNode> = {
  agriculture: (
    <>
      <path className="fx-draw" pathLength={1} d="M30 232 Q110 214 200 232 T370 228" />
      <path className="fx-draw fx-d2" pathLength={1} d="M200 232 C200 190 196 160 202 118" />
      <path className="fx-pop fx-d3" d="M202 150 C170 150 150 130 146 108 C176 106 198 124 202 150Z" />
      <path className="fx-pop fx-d4" d="M202 124 C232 124 252 104 256 82 C226 80 204 98 202 124Z" />
      <path className="fx-draw fx-d2" pathLength={1} d="M290 232 V176" />
      <circle className="fx-ping" cx="290" cy="170" r="7" />
      <text x="304" y="166" className="fx-label">Soil 34%</text>
      {[70, 110, 330].map((x, i) => (
        <path key={x} className="fx-rain" style={{ animationDelay: `${i * 0.4}s` }} d={`M${x} 40 v14`} />
      ))}
    </>
  ),
  healthcare: (
    <>
      <path className="fx-draw fx-ecg" pathLength={1} d="M20 160 H100 L118 110 L140 210 L162 70 L184 190 L200 160 H250 L268 138 L286 176 L302 160 H380" />
      <circle className="fx-ping" cx="380" cy="160" r="7" />
      <text x="40" y="60" className="fx-label">Heart rate 72 bpm</text>
      <text x="40" y="256" className="fx-label fx-soft">Steady for 6 hours</text>
    </>
  ),
  education: (
    <>
      {[0, 1, 2, 3].map((i) => (
        <rect key={i} className="fx-bar" style={{ animationDelay: `${i * 0.14}s` }} x={70 + i * 70} y={230 - (60 + i * 38)} width="40" height={60 + i * 38} rx="6" />
      ))}
      <path className="fx-draw fx-d4" pathLength={1} d="M60 190 L130 160 L200 128 L270 92 L340 60" />
      <circle className="fx-ping" cx="340" cy="60" r="7" />
      <text x="70" y="256" className="fx-label fx-soft">Practice round 1 to 4</text>
    </>
  ),
  safety: (
    <>
      <circle className="fx-wave" cx="200" cy="150" r="40" />
      <circle className="fx-wave fx-d3" cx="200" cy="150" r="40" />
      <path className="fx-draw" pathLength={1} d="M200 70 L272 96 V158 C272 204 236 232 200 246 C164 232 128 204 128 158 V96Z" />
      <path className="fx-draw fx-d3" pathLength={1} d="M168 154 L192 180 L238 126" />
      <text x="40" y="52" className="fx-label">Alert sent to 3 people</text>
    </>
  ),
};

export function Fields() {
  const root = useRef<HTMLElement>(null);
  const [active, setActive] = useState(0);

  useEffect(() => {
    const el = root.current!;
    const rm = matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (rm) return;
    let raf = 0;
    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const r = el.getBoundingClientRect();
        const p = Math.min(1, Math.max(0, -r.top / (r.height - innerHeight + 72)));
        el.style.setProperty("--fp", p.toFixed(4));
        setActive(Math.min(fields.length - 1, Math.floor(p * fields.length)));
      });
    };
    onScroll();
    addEventListener("scroll", onScroll, { passive: true });
    return () => { cancelAnimationFrame(raf); removeEventListener("scroll", onScroll); };
  }, []);

  const choose = (i: number) => {
    const el = root.current!;
    if (matchMedia("(prefers-reduced-motion: reduce)").matches) return setActive(i);
    const range = el.offsetHeight - innerHeight + 72;
    scrollTo({ top: el.offsetTop + ((i + 0.5) / fields.length) * range, behavior: "smooth" });
  };

  const f = fields[active];
  return (
    <section
      ref={root}
      aria-labelledby="fields-h"
      className="fields relative h-[420svh] motion-reduce:h-auto"
      style={{ ["--tint" as string]: tint[f.key] }}
    >
      <div className="fields-stage sticky top-[4.5rem] flex h-[calc(100svh-4.5rem)] items-center overflow-hidden motion-reduce:static motion-reduce:min-h-[40rem] motion-reduce:py-12">
        <div className="wrap grid w-full items-center gap-5 md:grid-cols-[1fr_1.15fr] md:gap-14">
          <div>
            <h2 id="fields-h" className="display-l">We work in four fields.</h2>
            <p className="lead mt-3 hidden text-muted md:block">Scroll, or pick one.</p>
            <div className="fields-rail relative mt-4 md:mt-8">
              <ul className="flex flex-wrap gap-x-5 gap-y-1 md:block md:space-y-1 md:border-l md:border-line md:pl-6">
                {fields.map((x, i) => (
                  <li key={x.key}>
                    <button
                      type="button"
                      onClick={() => choose(i)}
                      aria-current={i === active ? "true" : undefined}
                      className="fields-name group flex items-center gap-3 py-1 text-left font-display text-lg font-bold md:text-3xl"
                    >
                      <span aria-hidden className="fields-dot size-2.5 shrink-0 rounded-full md:size-3" style={{ background: tint[x.key] }} />
                      {x.name}
                    </button>
                  </li>
                ))}
              </ul>
              <span aria-hidden className="fields-fill absolute left-0 top-0 hidden h-full w-[3px] origin-top bg-[var(--tint)] md:block" />
            </div>
          </div>

          <div>
            <div className="fields-card relative mx-auto aspect-[4/2.4] w-full max-w-lg rounded-[1.75rem] border border-line bg-surface md:aspect-[4/3]">
              {fields.map((x, i) => (
                <svg
                  key={x.key}
                  viewBox="0 0 400 300"
                  aria-hidden
                  data-on={i === active ? "" : undefined}
                  className="fx absolute inset-0 size-full p-4"
                  style={{ ["--c" as string]: tint[x.key] }}
                >
                  {scenes[x.key]}
                </svg>
              ))}
            </div>
            <div key={f.key} className="fields-copy mx-auto mt-4 max-w-lg md:mt-6">
              <p className="font-display text-lg font-medium leading-snug md:text-2xl">{f.line}</p>
              <ul className="mt-3 divide-y divide-line border-y border-line md:mt-4">
                {f.items.map((i) => (
                  <li key={i.href}>
                    <Link href={i.href} className="flex items-center justify-between gap-4 py-2 transition-colors hover:text-accent-ink md:py-3">
                      <span className="font-display font-medium">{i.label}</span>
                      <span className="text-sm text-muted">{i.kind}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
