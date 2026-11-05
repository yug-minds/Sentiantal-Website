"use client";

import { useEffect, useRef, useSyncExternalStore } from "react";
import { ArrowUp } from "lucide-react";

const subscribe = (cb: () => void) => {
  const id = setInterval(cb, 15_000);
  return () => clearInterval(id);
};
const now = () =>
  new Intl.DateTimeFormat("en-IN", { hour: "2-digit", minute: "2-digit", hour12: false, timeZone: "Asia/Kolkata" }).format(new Date());

/** Hyderabad's local time, so the footer is visibly alive. Empty on the server to avoid a mismatch. */
export function HyderabadClock() {
  const t = useSyncExternalStore(subscribe, now, () => "");
  return (
    <p className="flex items-center gap-2 text-sm text-muted">
      <span aria-hidden className="live-dot size-2 rounded-full bg-good" />
      Hyderabad, <span className="tabular-nums">{t || "--:--"}</span> IST
    </p>
  );
}

/** Back to top, wrapped in a ring that fills with how far down the page you are. */
export function BackToTop() {
  const ring = useRef<SVGCircleElement>(null);
  useEffect(() => {
    const update = () => {
      const max = document.documentElement.scrollHeight - innerHeight;
      ring.current?.setAttribute("stroke-dashoffset", String(1 - (max > 0 ? Math.min(1, scrollY / max) : 0)));
    };
    update();
    addEventListener("scroll", update, { passive: true });
    return () => removeEventListener("scroll", update);
  }, []);
  return (
    <button
      type="button"
      onClick={() => scrollTo({ top: 0, behavior: "smooth" })}
      aria-label="Back to top"
      className="totop group relative grid size-12 place-items-center rounded-full"
    >
      <svg viewBox="0 0 48 48" aria-hidden className="absolute inset-0 size-full -rotate-90">
        <circle cx="24" cy="24" r="22" fill="none" stroke="var(--line)" strokeWidth="2" />
        <circle ref={ring} cx="24" cy="24" r="22" fill="none" stroke="var(--accent)" strokeWidth="2.5" strokeLinecap="round" pathLength={1} strokeDasharray={1} strokeDashoffset={1} />
      </svg>
      <ArrowUp aria-hidden size={18} className="transition-transform duration-300 group-hover:-translate-y-0.5" />
    </button>
  );
}
