"use client";

import { useEffect, useState } from "react";
import clsx from "clsx";

/** Sticky in-page menu. The pill for the section you are reading lights up as you scroll. */
export function ProductNav({ items }: { items: { id: string; label: string }[] }) {
  const [active, setActive] = useState("");

  useEffect(() => {
    const els = items.map((i) => document.getElementById(i.id)).filter(Boolean) as HTMLElement[];
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && setActive(e.target.id)),
      { rootMargin: "-35% 0px -60% 0px" },
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, [items]);

  return (
    <nav
      aria-label="On this page"
      className="pnav sticky top-[4.5rem] z-30 border-y border-line bg-ground/80 backdrop-blur"
    >
      <ul className="wrap flex gap-1 overflow-x-auto py-2">
        {items.map((i) => (
          <li key={i.id}>
            <a
              href={`#${i.id}`}
              aria-current={active === i.id ? "true" : undefined}
              className={clsx(
                "block whitespace-nowrap rounded-full px-4 py-1.5 font-display text-sm font-medium transition-colors",
                active === i.id ? "bg-accent text-on-accent" : "text-muted hover:bg-raised hover:text-ink",
              )}
            >
              {i.label}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
