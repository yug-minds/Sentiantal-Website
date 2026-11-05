"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ToggleGroup } from "radix-ui";
import clsx from "clsx";
import { btn } from "@/components/ui/button";
import { fitLabels, products, type Fit } from "@/content/products";

export function ProductsRail() {
  const [fit, setFit] = useState<Fit | "">("");
  const [open, setOpen] = useState(products[0].slug);
  const matches = (fits: Fit[]) => !fit || fits.includes(fit);
  const hover = useRef<ReturnType<typeof setTimeout>>(undefined);
  // Mouse hover opens a product after a short pause, so sweeping across the rail doesn't flicker.
  const hoverOpen = (e: React.PointerEvent, slug: string) => {
    if (e.pointerType !== "mouse") return;
    clearTimeout(hover.current);
    hover.current = setTimeout(() => setOpen(slug), 130);
  };
  // The picture leans toward the pointer.
  const tilt = (e: React.PointerEvent<HTMLElement>) => {
    if (e.pointerType !== "mouse") return;
    const r = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width - 0.5, y = (e.clientY - r.top) / r.height - 0.5;
    e.currentTarget.style.setProperty("--ry", `${(x * 10).toFixed(2)}deg`);
    e.currentTarget.style.setProperty("--rx", `${(-y * 8).toFixed(2)}deg`);
  };
  const untilt = (e: React.PointerEvent<HTMLElement>) => {
    clearTimeout(hover.current);
    e.currentTarget.style.setProperty("--ry", "0deg");
    e.currentTarget.style.setProperty("--rx", "0deg");
  };

  const pick = (v: string) => {
    const next = (v as Fit | "") ?? "";
    setFit(next);
    const first = products.find((p) => !next || p.fits.includes(next));
    if (first) setOpen(first.slug);
  };

  return (
    <div>
      <div className="mb-8">
        <p id="fit-label" className="mb-3 font-display text-sm font-medium">Show me what fits</p>
        <ToggleGroup.Root
          type="single"
          value={fit}
          onValueChange={pick}
          aria-labelledby="fit-label"
          className="flex flex-wrap gap-2"
        >
          {(Object.keys(fitLabels) as Fit[]).map((k) => (
            <ToggleGroup.Item
              key={k}
              value={k}
              className="rounded-full border border-line px-5 py-2.5 font-display text-sm font-medium transition-colors hover:bg-raised data-[state=on]:border-accent data-[state=on]:bg-accent data-[state=on]:text-on-accent"
            >
              {fitLabels[k]}
            </ToggleGroup.Item>
          ))}
        </ToggleGroup.Root>
      </div>

      <ul className="flex flex-col gap-8 md:h-[34rem] md:flex-row md:gap-3">
        {products.map((p, i) => {
          const active = open === p.slug;
          const match = matches(p.fits);
          return (
            <li
              key={p.slug}
              className={clsx(
                "min-w-0 transition-[flex-grow,opacity] duration-500 ease-[cubic-bezier(.65,0,.25,1)] md:flex-1",
                active && "md:flex-[5]",
                !match && "opacity-30",
              )}
            >
              <div className="rail-in flex h-full gap-5 max-md:items-start" style={{ ["--i" as string]: i }}>
                <div
                  className={clsx(
                    "rail-arch relative h-full shrink-0 overflow-hidden rounded-t-[999px] transition-[width] duration-500 ease-[cubic-bezier(.65,0,.25,1)] max-md:aspect-[368/600] max-md:h-auto max-md:w-32",
                    active ? "md:w-[46%]" : "md:w-full",
                  )}
                  onPointerEnter={(e) => hoverOpen(e, p.slug)}
                  onPointerMove={tilt}
                  onPointerLeave={untilt}
                  data-active={active ? "" : undefined}
                  style={{
                    boxShadow: `0 0 ${fit && match ? 70 : 36}px -14px ${p.glow}, 0 0 0 1px color-mix(in srgb, ${p.glow} 50%, transparent)`,
                  }}
                >
                  <div className="rail-img absolute inset-0">
                    <Image src={p.arch} alt="" fill sizes="(min-width: 768px) 320px, 128px" className="object-cover" />
                  </div>
                  <button
                    type="button"
                    onClick={() => setOpen(p.slug)}
                    aria-expanded={active}
                    aria-controls={`rail-${p.slug}`}
                    aria-label={`${p.name}: ${p.headlineFact}`}
                    className="absolute inset-0 hidden md:block"
                  />
                  {!active && (
                    <span
                      aria-hidden
                      className="pointer-events-none absolute inset-x-0 bottom-0 hidden bg-gradient-to-t from-black/75 to-transparent px-1 pb-4 pt-16 text-center font-display text-sm font-bold text-white md:block"
                      style={{ writingMode: "vertical-rl", transform: "rotate(180deg)", height: "70%", top: "auto" }}
                    >
                      {p.name.split(" (")[0]}
                    </span>
                  )}
                </div>
                <div
                  id={`rail-${p.slug}`}
                  className={clsx(
                    "rail-detail min-w-0 flex-1 transition-opacity duration-300 md:self-end md:pb-6",
                    active ? "md:opacity-100 md:delay-300" : "md:pointer-events-none md:hidden md:opacity-0",
                  )}
                >
                  <h2 className="h2">{p.name}</h2>
                  <p className="mt-2 text-muted">{p.line}</p>
                  <p className="mt-5 border-t border-line pt-4 font-display text-lg font-medium" style={{ color: p.glow }}>
                    {p.headlineFact}
                  </p>
                  <Link href={`/products/${p.slug}`} className={btn("primary", "mt-6")}>
                    View {p.name.split(" (")[0]}
                  </Link>
                </div>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
