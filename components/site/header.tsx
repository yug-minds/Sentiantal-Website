"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Dialog } from "radix-ui";
import { Menu, X } from "lucide-react";
import clsx from "clsx";
import { Logo, type LogoVariant } from "./logo";
import type { Theme } from "./shell";

const logoFor: Record<Theme, LogoVariant> = { brand: "magenta", products: "white", services: "indigo" };

const wings = [
  { href: "/products", label: "Products", dot: "#c73a7e" },
  { href: "/services", label: "Services", dot: "#967fd2" },
] as const;

const plain = [
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
] as const;

export function Header({ theme }: { theme: Theme }) {
  const pathname = usePathname();
  const current = (href: string) => pathname === href || pathname.startsWith(href + "/");
  const bar = useRef<HTMLSpanElement>(null);
  const [scrolled, setScrolled] = useState(false);
  const [glide, setGlide] = useState({ x: 0, w: 0, show: false });
  // A pill follows the pointer or keyboard focus along the links.
  const moveGlide = (e: { currentTarget: HTMLElement }) => {
    const t = e.currentTarget;
    setGlide({ x: t.offsetLeft, w: t.offsetWidth, show: true });
  };

  useEffect(() => {
    let raf = 0;
    const update = () => {
      const max = document.documentElement.scrollHeight - innerHeight;
      bar.current?.style.setProperty("transform", `scaleX(${max > 0 ? Math.min(1, scrollY / max) : 0})`);
      setScrolled(scrollY > 8);
    };
    const onScroll = () => { cancelAnimationFrame(raf); raf = requestAnimationFrame(update); };
    update();
    addEventListener("scroll", onScroll, { passive: true });
    return () => { cancelAnimationFrame(raf); removeEventListener("scroll", onScroll); };
  }, []);

  return (
    <header
      data-scrolled={scrolled ? "" : undefined}
      className="sticky top-0 z-40 border-b border-line bg-ground/75 backdrop-blur transition-[background-color,box-shadow] duration-300 data-[scrolled]:bg-ground/92 data-[scrolled]:shadow-[0_8px_30px_-12px_rgba(25,9,16,0.35)]"
    >
      <div className="wrap flex h-[4.5rem] items-center justify-between gap-4">
        <Link href="/" aria-label="Sentiantal home" className="shrink-0">
          <Logo variant={logoFor[theme]} height={38} priority />
        </Link>

        <nav
          aria-label="Main"
          className="relative hidden items-center gap-2 md:flex"
          onPointerLeave={() => setGlide((g) => ({ ...g, show: false }))}
          onBlur={() => setGlide((g) => ({ ...g, show: false }))}
        >
          <span
            aria-hidden
            className="nav-glide pointer-events-none absolute top-1/2 h-9 -translate-y-1/2 rounded-full bg-raised"
            style={{ left: glide.x, width: glide.w, opacity: glide.show ? 1 : 0 }}
          />
          <div className="flex rounded-full border border-line p-1">
            {wings.map((w) => (
              <Link
                key={w.href}
                href={w.href}
                aria-current={current(w.href) ? "page" : undefined}
                onPointerEnter={moveGlide}
                onFocus={moveGlide}
                className={clsx(
                  "relative flex items-center gap-2 rounded-full px-4 py-2 font-display text-sm font-medium transition-colors",
                  current(w.href) && "bg-accent text-on-accent",
                )}
              >
                {!current(w.href) && (
                  <span aria-hidden className="size-2 rounded-full" style={{ background: w.dot }} />
                )}
                {w.label}
              </Link>
            ))}
          </div>
          {plain.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              aria-current={current(l.href) ? "page" : undefined}
              onPointerEnter={moveGlide}
              onFocus={moveGlide}
              className={clsx(
                "relative rounded-full px-4 py-2 font-display text-sm font-medium",
                current(l.href) && "underline decoration-2 underline-offset-8",
              )}
            >
              {l.label}
            </Link>
          ))}
        </nav>

        <Dialog.Root>
          <Dialog.Trigger
            aria-label="Open menu"
            className="grid size-11 place-items-center rounded-full border border-line md:hidden"
          >
            <Menu aria-hidden size={20} />
          </Dialog.Trigger>
          <Dialog.Portal>
            <Dialog.Overlay className="menu-overlay fixed inset-0 z-50 bg-black/50" />
            <Dialog.Content
              data-theme={theme}
              className="menu-panel fixed inset-y-0 right-0 z-50 flex w-[min(22rem,88vw)] flex-col gap-2 bg-ground p-6 text-ink shadow-2xl"
            >
              <Dialog.Title className="sr-only">Menu</Dialog.Title>
              <Dialog.Description className="sr-only">Site navigation</Dialog.Description>
              <Dialog.Close
                aria-label="Close menu"
                className="mb-4 grid size-11 place-items-center self-end rounded-full border border-line"
              >
                <X aria-hidden size={20} />
              </Dialog.Close>
              {[...wings, ...plain].map((l, i) => (
                <Dialog.Close asChild key={l.href}>
                  <Link
                    href={l.href}
                    style={{ ["--i" as string]: i }}
                    aria-current={current(l.href) ? "page" : undefined}
                    className={clsx(
                      "menu-item rounded-2xl px-4 py-4 font-display text-xl font-bold",
                      current(l.href) ? "bg-accent text-on-accent" : "hover:bg-raised",
                    )}
                  >
                    {l.label}
                  </Link>
                </Dialog.Close>
              ))}
            </Dialog.Content>
          </Dialog.Portal>
        </Dialog.Root>
      </div>
      <span ref={bar} aria-hidden className="absolute inset-x-0 -bottom-px h-0.5 origin-left scale-x-0 bg-accent" />
    </header>
  );
}
