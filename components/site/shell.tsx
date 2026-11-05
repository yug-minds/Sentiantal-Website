import { ViewTransition } from "react";
import { Header } from "./header";
import { Footer } from "./footer";

export type Theme = "brand" | "products" | "services";

/** One shell per theme. Swapping shells (for example Products to Services) plays the diagonal wipe. */
export function Shell({ theme, children }: { theme: Theme; children: React.ReactNode }) {
  return (
    <ViewTransition enter="wing-in" exit="wing-out" default="none">
      <div data-theme={theme} className="flex min-h-svh flex-col bg-ground text-ink">
        <a
          href="#main"
          className="sr-only z-50 rounded-full bg-accent px-4 py-2 text-on-accent focus:not-sr-only focus:fixed focus:left-4 focus:top-4"
        >
          Skip to content
        </a>
        <Header theme={theme} />
        <main id="main" className="flex-1">
          {children}
        </main>
        <Footer theme={theme} />
      </div>
    </ViewTransition>
  );
}
