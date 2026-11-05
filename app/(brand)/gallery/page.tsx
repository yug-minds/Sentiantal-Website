import type { Metadata } from "next";
import Link from "next/link";
import { Gallery } from "@/components/gallery/gallery";
import { btn } from "@/components/ui/button";

export const metadata: Metadata = {
  title: "Gallery",
  description: "Photos of Sentiantal's work in the field, with the leaders and guests who have visited, and at the events we take part in.",
};

export default function GalleryPage() {
  return (
    <>
      <section className="wrap pb-10 pt-12 md:pt-16">
        <h1 className="display-xl max-w-[16ch]">
          <span className="block overflow-hidden pb-[0.12em]">
            <span className="hero-rise block">Our work, in pictures.</span>
          </span>
        </h1>
        <p className="lead enter-copy mt-5 max-w-2xl text-muted">
          The farms we test on, the leaders and guests who have visited, and the events where we show what we build.
        </p>
      </section>

      <section className="wrap pb-16 md:pb-24" aria-label="Photos">
        <Gallery />
      </section>

      <section className="border-t border-line bg-surface">
        <div className="wrap reveal flex flex-col gap-6 py-14 md:flex-row md:items-center md:justify-between md:py-20">
          <h2 className="display-l max-w-[20ch]">Want to see it for yourself?</h2>
          <Link href="/contact?topic=demo" className={btn("primary", "self-start")}>Request a demo</Link>
        </div>
      </section>
    </>
  );
}
