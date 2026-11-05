"use client";

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

  return (
    <header className="sticky top-0 z-40 border-b border-line bg-ground/90 backdrop-blur">
      <div className="wrap flex h-[4.5rem] items-center justify-between gap-4">
        <Link href="/" aria-label="Sentiantal home" className="shrink-0">
          <Logo variant={logoFor[theme]} height={38} priority />
        </Link>

        <nav aria-label="Main" className="hidden items-center gap-2 md:flex">
          <div className="flex rounded-full border border-line p-1">
            {wings.map((w) => (
              <Link
                key={w.href}
                href={w.href}
                aria-current={current(w.href) ? "page" : undefined}
                className={clsx(
                  "flex items-center gap-2 rounded-full px-4 py-2 font-display text-sm font-medium transition-colors",
                  current(w.href) ? "bg-accent text-on-accent" : "hover:bg-raised",
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
              className={clsx(
                "rounded-full px-4 py-2 font-display text-sm font-medium transition-colors hover:bg-raised",
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
            <Dialog.Overlay className="fixed inset-0 z-50 bg-black/50" />
            <Dialog.Content
              data-theme={theme}
              className="fixed inset-y-0 right-0 z-50 flex w-[min(22rem,88vw)] flex-col gap-2 bg-ground p-6 text-ink shadow-2xl"
            >
              <Dialog.Title className="sr-only">Menu</Dialog.Title>
              <Dialog.Description className="sr-only">Site navigation</Dialog.Description>
              <Dialog.Close
                aria-label="Close menu"
                className="mb-4 grid size-11 place-items-center self-end rounded-full border border-line"
              >
                <X aria-hidden size={20} />
              </Dialog.Close>
              {[...wings, ...plain].map((l) => (
                <Dialog.Close asChild key={l.href}>
                  <Link
                    href={l.href}
                    aria-current={current(l.href) ? "page" : undefined}
                    className={clsx(
                      "rounded-2xl px-4 py-4 font-display text-xl font-bold",
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
    </header>
  );
}
