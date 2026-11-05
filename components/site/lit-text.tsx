"use client";

import { useEffect, useRef } from "react";

/** Text whose words light up as it scrolls through the middle of the screen. */
export function LitText({ text, className }: { text: string; className?: string }) {
  const ref = useRef<HTMLParagraphElement>(null);
  const words = text.split(" ");

  useEffect(() => {
    const el = ref.current!;
    if (matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let raf = 0;
    const update = () => {
      const r = el.getBoundingClientRect();
      const p = (innerHeight * 0.85 - r.top) / (innerHeight * 0.45 + r.height);
      el.style.setProperty("--lp", Math.min(1, Math.max(0, p)).toFixed(4));
    };
    const onScroll = () => { cancelAnimationFrame(raf); raf = requestAnimationFrame(update); };
    update();
    addEventListener("scroll", onScroll, { passive: true });
    addEventListener("resize", onScroll);
    return () => { cancelAnimationFrame(raf); removeEventListener("scroll", onScroll); removeEventListener("resize", onScroll); };
  }, []);

  return (
    <p ref={ref} className={className} style={{ ["--n" as string]: words.length + 2 }}>
      {words.map((w, i) => (
        <span key={i} className="lit-word" style={{ ["--i" as string]: i }}>{w}{" "}</span>
      ))}
    </p>
  );
}
