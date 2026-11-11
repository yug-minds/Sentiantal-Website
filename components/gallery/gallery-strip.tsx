"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import clsx from "clsx";
import { gallery } from "@/content/gallery";
import { btn } from "@/components/ui/button";
import { Photo } from "./photo";

const items = gallery.slice(0, 6);
const EVERY = 4500;

/** Home teaser: photos that advance on their own, and can still be swiped, dragged or tapped through. */
export function GalleryStrip() {
  const list = useRef<HTMLUListElement>(null);
  const [active, setActive] = useState(0);

  const go = (i: number) => {
    const ul = list.current!;
    const li = ul.children[i] as HTMLElement;
    ul.scrollTo({ left: li.offsetLeft - parseFloat(getComputedStyle(ul).paddingLeft), behavior: "smooth" });
  };

  useEffect(() => {
    const ul = list.current!;
    let visible = false, now = 0, paused = false, resume = 0;
    const hold = (v: boolean) => () => { paused = v; };
    const touchEnd = () => { clearTimeout(resume); resume = window.setTimeout(hold(false), 3000); };
    const evs: [string, () => void][] = [["pointerenter", hold(true)], ["pointerleave", hold(false)], ["touchstart", hold(true)], ["touchend", touchEnd], ["focusin", hold(true)], ["focusout", hold(false)]];
    evs.forEach(([e, f]) => ul.addEventListener(e, f, { passive: true }));
    const onScroll = () => {
      const pad = parseFloat(getComputedStyle(ul).paddingLeft);
      let best = 0, gap = Infinity;
      Array.from(ul.children).forEach((c, i) => {
        const d = Math.abs((c as HTMLElement).offsetLeft - pad - ul.scrollLeft);
        if (d < gap) { gap = d; best = i; }
      });
      now = best; setActive(best);
    };
    ul.addEventListener("scroll", onScroll, { passive: true });
    const io = new IntersectionObserver(([e]) => { visible = e.isIntersecting; });
    io.observe(ul);

    const reduced = matchMedia("(prefers-reduced-motion: reduce)").matches;
    const timer = reduced ? 0 : window.setInterval(() => {
      if (visible && !paused && !document.hidden) go((now + 1) % items.length);
    }, EVERY);
    return () => { evs.forEach(([e, f]) => ul.removeEventListener(e, f)); clearTimeout(resume); ul.removeEventListener("scroll", onScroll); io.disconnect(); clearInterval(timer); };
  }, []);

  return (
    <section className="border-t border-line bg-raised py-16 md:py-24" aria-labelledby="gal-h">
      <div className="wrap mb-8 flex flex-wrap items-end justify-between gap-4">
        <div>
          <h2 id="gal-h" className="display-l reveal">Seen in the field.</h2>
          <p className="lead reveal mt-3 max-w-xl text-muted">The people we work with and the places our products run.</p>
        </div>
        <Link href="/gallery" className={btn("ghost")}>See the gallery</Link>
      </div>
      <ul
        ref={list}
        className="gal-strip relative flex snap-x snap-mandatory gap-4 overflow-x-auto pb-4 [--pad:max(1rem,calc((100vw-80rem)/2+2.5rem))] px-(--pad) scroll-pl-(--pad) md:gap-5"
      >
        {items.map((g, i) => (
          <li key={g.id} className={clsx("w-[78vw] shrink-0 snap-start transition-opacity duration-500 sm:w-80", i !== active && "opacity-60")}>
            <Link href="/gallery" className="group block" aria-label={`${g.caption}. Open the gallery`}>
              <span className="block overflow-hidden rounded-2xl border border-line">
                <Photo item={{ ...g, ratio: "4 / 5" }} sizes="(min-width: 640px) 320px, 78vw" className="gal-zoom" />
              </span>
              <span className="mt-3 block">
                {g.people && <span className="block font-display font-medium">{g.people}</span>}
                <span className="block text-muted">{g.caption}</span>
              </span>
            </Link>
          </li>
        ))}
      </ul>
      <div className="wrap mt-4 flex gap-2" role="group" aria-label="Choose a photo">
        {items.map((g, i) => (
          <button
            key={g.id}
            type="button"
            onClick={() => go(i)}
            aria-label={`Photo ${i + 1} of ${items.length}`}
            aria-current={i === active}
            className="grid h-6 place-items-center"
          >
            <span className={clsx("block h-1.5 rounded-full bg-accent transition-all duration-500", i === active ? "w-8" : "w-1.5 opacity-30")} />
          </button>
        ))}
      </div>
    </section>
  );
}
