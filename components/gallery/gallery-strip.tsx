import Link from "next/link";
import { gallery } from "@/content/gallery";
import { btn } from "@/components/ui/button";
import { Photo } from "./photo";

/** Home teaser: a row of photos you can swipe or scroll sideways, leading to the full gallery. */
export function GalleryStrip() {
  const items = gallery.slice(0, 6);
  return (
    <section className="border-t border-line bg-raised py-16 md:py-24" aria-labelledby="gal-h">
      <div className="wrap mb-8 flex flex-wrap items-end justify-between gap-4">
        <div>
          <h2 id="gal-h" className="display-l reveal">Seen in the field.</h2>
          <p className="lead reveal mt-3 max-w-xl text-muted">The people we work with and the places our products run.</p>
        </div>
        <Link href="/gallery" className={btn("ghost")}>See the gallery</Link>
      </div>
      <ul className="gal-strip flex snap-x snap-mandatory gap-5 overflow-x-auto px-[max(1rem,calc((100vw-80rem)/2+2.5rem))] pb-4">
        {items.map((g) => (
          <li key={g.id} className="w-[72vw] shrink-0 snap-start sm:w-80">
            <Link href="/gallery" className="group block" aria-label={`${g.caption}. Open the gallery`}>
              <span className="block overflow-hidden rounded-2xl border border-line">
                <Photo item={{ ...g, ratio: "4 / 5" }} sizes="320px" className="gal-zoom" />
              </span>
              <span className="mt-3 block">
                {g.people && <span className="block font-display font-medium">{g.people}</span>}
                <span className="block text-muted">{g.caption}</span>
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}
