"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import { btn } from "@/components/ui/button";

/**
 * Scroll-driven hero. One variable, --p (0..1), drives everything:
 * scattered field sensors drift and react to the pointer, then as you scroll they
 * pull into the outline of a phone, and the readings arrive on its screen.
 * Headline is always in the DOM in full; scroll only shifts emphasis between its two lines.
 */

const readings = [
  { label: "Soil moisture", value: "34%", note: "Water the north plot tomorrow", dot: "#3f9d62" },
  { label: "Pond oxygen", value: "4.1 mg/L", note: "Start the aerator now", dot: "#e0902b", alert: true },
  { label: "Heart rate", value: "72 bpm", note: "Steady for 6 hours", dot: "#c73a7e" },
  { label: "Room air", value: "AQI 38", note: "Good. No action needed", dot: "#967fd2" },
];

const COLORS = ["#c73a7e", "#2c267e", "#3f9d62", "#e0902b"]; // the four fields in the logo
const ease = (t: number) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2);

export function Hero() {
  const root = useRef<HTMLElement>(null);
  const canvas = useRef<HTMLCanvasElement>(null);
  const phone = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = root.current!;
    const cv = canvas.current!;
    const ctx = cv.getContext("2d")!;
    const reduced = matchMedia("(prefers-reduced-motion: reduce)").matches;

    let w = 0, h = 0, dpr = 1, p = reduced ? 1 : 0, raf = 0, last = performance.now();
    const ptr = { x: -999, y: -999 };
    type Node = { x: number; y: number; vx: number; vy: number; c: string; t: number; pulse: number };
    let nodes: Node[] = [];
    let box = { cx: 0, cy: 0, a: 0, b: 0 }; // phone, in canvas coordinates

    const measure = () => {
      const r = cv.getBoundingClientRect();
      dpr = Math.min(devicePixelRatio || 1, 2);
      w = r.width; h = r.height;
      cv.width = w * dpr; cv.height = h * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      const pr = phone.current!.getBoundingClientRect();
      box = { cx: pr.left - r.left + pr.width / 2, cy: pr.top - r.top + pr.height / 2, a: pr.width / 2 + 10, b: pr.height / 2 + 10 };
      const n = w < 768 ? 46 : 96;
      nodes = Array.from({ length: n }, (_, i) => ({
        x: Math.random() * w, y: Math.random() * h,
        vx: (Math.random() - 0.5) * 0.25, vy: (Math.random() - 0.5) * 0.25,
        c: COLORS[i % 4], t: i / n, pulse: Math.random() * 6,
      }));
    };

    // Rounded-rectangle outline via a superellipse, so the nodes read as a phone.
    const slot = (t: number) => {
      const th = t * Math.PI * 2, n = 0.22;
      const c = Math.cos(th), s = Math.sin(th);
      return { x: box.cx + box.a * Math.sign(c) * Math.abs(c) ** n, y: box.cy + box.b * Math.sign(s) * Math.abs(s) ** n };
    };

    const frame = (now: number) => {
      const dt = Math.min((now - last) / 16.7, 3); last = now;
      ctx.clearRect(0, 0, w, h);
      const k = ease(Math.min(1, p * 1.7)); // fully gathered by ~60% scroll
      const pos = nodes.map((n) => {
        // drift, wrap, and flee the pointer while still loose
        n.x += n.vx * dt * (1 - k); n.y += n.vy * dt * (1 - k);
        if (n.x < 0) n.x = w; if (n.x > w) n.x = 0; if (n.y < 0) n.y = h; if (n.y > h) n.y = 0;
        const dx = n.x - ptr.x, dy = n.y - ptr.y, d = Math.hypot(dx, dy);
        if (d < 130 && d > 0) { n.x += (dx / d) * (130 - d) * 0.06 * (1 - k); n.y += (dy / d) * (130 - d) * 0.06 * (1 - k); }
        const s = slot(n.t);
        return { n, x: n.x + (s.x - n.x) * k, y: n.y + (s.y - n.y) * k, d };
      });

      // links between neighbours; along the phone they trace its edge
      ctx.lineWidth = 1;
      for (let i = 0; i < pos.length; i++) {
        for (let j = i + 1; j < pos.length; j++) {
          const dx = pos[i].x - pos[j].x, dy = pos[i].y - pos[j].y, d = Math.hypot(dx, dy);
          if (d < 120) {
            ctx.strokeStyle = `rgba(25,9,16,${(1 - d / 120) * (0.16 + 0.2 * k)})`;
            ctx.beginPath(); ctx.moveTo(pos[i].x, pos[i].y); ctx.lineTo(pos[j].x, pos[j].y); ctx.stroke();
          }
        }
        // pointer "reads" nearby sensors
        if (pos[i].d < 170 && k < 0.9) {
          ctx.strokeStyle = `rgba(199,58,126,${(1 - pos[i].d / 170) * 0.7 * (1 - k)})`;
          ctx.beginPath(); ctx.moveTo(ptr.x, ptr.y); ctx.lineTo(pos[i].x, pos[i].y); ctx.stroke();
        }
      }
      for (const q of pos) {
        q.n.pulse += 0.012 * dt;
        const ph = q.n.pulse % 6; // a ring leaves a sensor every few seconds
        if (ph < 1) {
          ctx.strokeStyle = q.n.c; ctx.globalAlpha = (1 - ph) * 0.5;
          ctx.beginPath(); ctx.arc(q.x, q.y, 3 + ph * 22, 0, 7); ctx.stroke();
        }
        ctx.globalAlpha = 1; ctx.fillStyle = q.n.c;
        ctx.beginPath(); ctx.arc(q.x, q.y, 3, 0, 7); ctx.fill();
      }
      raf = reduced ? 0 : requestAnimationFrame(frame);
    };

    const onScroll = () => {
      const r = el.getBoundingClientRect();
      p = Math.min(1, Math.max(0, -r.top / (r.height - innerHeight + 72)));
      el.style.setProperty("--p", p.toFixed(4));
    };
    const onMove = (e: PointerEvent) => {
      const r = cv.getBoundingClientRect();
      ptr.x = e.clientX - r.left; ptr.y = e.clientY - r.top;
    };
    const onLeave = () => { ptr.x = ptr.y = -999; };
    const onResize = () => { measure(); if (reduced) frame(performance.now()); };

    measure();
    if (reduced) frame(performance.now());
    else { onScroll(); raf = requestAnimationFrame(frame); addEventListener("scroll", onScroll, { passive: true }); }
    addEventListener("resize", onResize);
    el.addEventListener("pointermove", onMove);
    el.addEventListener("pointerleave", onLeave);
    return () => {
      cancelAnimationFrame(raf);
      removeEventListener("scroll", onScroll); removeEventListener("resize", onResize);
      el.removeEventListener("pointermove", onMove); el.removeEventListener("pointerleave", onLeave);
    };
  }, []);

  return (
    <section ref={root} aria-label="Introduction" className="hero relative h-[260svh] motion-reduce:h-auto">
      <div className="sticky top-[4.5rem] h-[calc(100svh-4.5rem)] overflow-hidden motion-reduce:static motion-reduce:min-h-[40rem]">
        <canvas ref={canvas} aria-hidden className="absolute inset-0 size-full" />

        <div className="wrap relative grid h-full grid-rows-[auto_1fr] items-center gap-4 py-6 md:grid-cols-[1.35fr_1fr] md:grid-rows-1 md:gap-10">
          <div className="pointer-events-none md:pointer-events-auto">
            <h1 className="display-xl">
              <span className="hero-line hero-line-a block overflow-hidden pb-[0.12em]">
                <span className="hero-rise block" style={{ animationDelay: "0.1s" }}>Sensors in the field.</span>
              </span>
              <span className="hero-line hero-line-b block overflow-hidden pb-[0.12em]">
                <span className="hero-rise block" style={{ animationDelay: "0.3s" }}>Answers on your phone.</span>
              </span>
            </h1>
            <p className="lead hero-lead mt-4 max-w-[34ch] text-muted md:mt-6">
              Sentiantal builds AI and IoT products for farms, health, homes, workplaces and classrooms. We also build
              custom systems for other teams.
            </p>
            <div className="hero-cta pointer-events-auto mt-6 flex flex-wrap gap-3">
              <Link href="/products" className={btn("primary")}>Browse products</Link>
              <Link href="/services" className={btn("ghost")}>See our services</Link>
            </div>
          </div>

          <div className="relative flex justify-center md:justify-end md:pr-6">
            <div
              ref={phone}
              className="hero-phone relative aspect-[9/17] h-[min(44svh,28rem)] rounded-[2rem] md:h-[min(68svh,34rem)]"
            >
              <div className="hero-screen absolute inset-[6px] flex flex-col gap-2 overflow-hidden rounded-[1.6rem] bg-surface p-3 shadow-[0_20px_60px_-20px_rgba(25,9,16,0.5)]">
                <p className="font-display text-xs font-medium text-muted">Today, from your sensors</p>
                {readings.map((r, i) => (
                  <div
                    key={r.label}
                    className="hero-row rounded-xl border border-line bg-ground p-2.5 data-[alert]:border-warn"
                    data-alert={r.alert ? "" : undefined}
                    style={{ ["--i" as string]: i }}
                  >
                    <div className="flex items-center justify-between gap-2">
                      <span className="flex items-center gap-1.5 text-[0.7rem] text-muted">
                        <span aria-hidden className="size-2 rounded-full" style={{ background: r.dot }} />
                        {r.label}
                      </span>
                      <span className="font-display text-sm font-bold">{r.value}</span>
                    </div>
                    <p className="mt-1 text-[0.72rem] leading-snug">{r.note}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div aria-hidden className="hero-hint absolute bottom-4 left-1/2 flex -translate-x-1/2 flex-col items-center gap-2 text-xs text-muted">
          Scroll
          <span className="hero-hint-line block h-8 w-px bg-accent" />
        </div>
      </div>
    </section>
  );
}
