"use client";

import { useState } from "react";
import { Dialog, ToggleGroup } from "radix-ui";
import { ChevronLeft, ChevronRight, Maximize2, X } from "lucide-react";
import { gallery, galleryCategories, type GalleryCategory } from "@/content/gallery";
import { Photo } from "./photo";

const chip =
  "rounded-full border border-line px-5 py-2.5 font-display text-sm font-medium transition-colors hover:bg-raised data-[state=on]:border-accent data-[state=on]:bg-accent data-[state=on]:text-on-accent";

const meta = (i: { people?: string; place?: string; date?: string }) => [i.place, i.date].filter(Boolean).join(", ");

export function Gallery() {
  const [cat, setCat] = useState<GalleryCategory | "all">("all");
  const [open, setOpen] = useState<number | null>(null);
  const visible = gallery.filter((g) => cat === "all" || g.category === cat);
  const cur = open === null ? null : visible[open];
  const step = (d: number) => setOpen((i) => (i === null ? i : (i + d + visible.length) % visible.length));

  return (
    <div>
      <ToggleGroup.Root
        type="single"
        value={cat}
        onValueChange={(v) => v && setCat(v as GalleryCategory | "all")}
        aria-label="Filter photos"
        className="mb-8 flex flex-wrap gap-2"
      >
        <ToggleGroup.Item value="all" className={chip}>All ({gallery.length})</ToggleGroup.Item>
        {(Object.keys(galleryCategories) as GalleryCategory[]).map((k) => (
          <ToggleGroup.Item key={k} value={k} className={chip}>
            {galleryCategories[k]} ({gallery.filter((g) => g.category === k).length})
          </ToggleGroup.Item>
        ))}
      </ToggleGroup.Root>

      {visible.length === 0 ? (
        <p className="text-muted">No photos in this group yet. Pick another one.</p>
      ) : (
        <ul key={cat} className="columns-1 gap-5 sm:columns-2 lg:columns-3">
          {visible.map((g, i) => (
            <li key={g.id} className="gal-item reveal mb-5 break-inside-avoid">
              <button type="button" onClick={() => setOpen(i)} className="group block w-full text-left" aria-label={`Open photo: ${g.caption}`}>
                <span className="relative block overflow-hidden rounded-2xl border border-line">
                  <Photo item={g} sizes="(min-width: 1024px) 400px, (min-width: 640px) 50vw, 100vw" className="gal-zoom" />
                  <span aria-hidden className="gal-view absolute right-3 top-3 grid size-9 place-items-center rounded-full bg-ink/70 text-ground">
                    <Maximize2 size={16} />
                  </span>
                </span>
                <span className="mt-3 block">
                  {g.people && <span className="block font-display font-medium">{g.people}</span>}
                  <span className="block text-muted">{g.caption}</span>
                  {meta(g) && <span className="block text-sm text-muted">{meta(g)}</span>}
                </span>
              </button>
            </li>
          ))}
        </ul>
      )}

      <Dialog.Root open={open !== null} onOpenChange={(o) => !o && setOpen(null)}>
        <Dialog.Portal>
          <Dialog.Overlay className="menu-overlay fixed inset-0 z-50 bg-black/90" />
          <Dialog.Content
            data-theme="brand"
            onKeyDown={(e) => {
              if (e.key === "ArrowRight") step(1);
              if (e.key === "ArrowLeft") step(-1);
            }}
            className="gal-lightbox fixed inset-0 z-50 flex flex-col items-center justify-center gap-4 p-4 text-white outline-none md:p-10"
          >
            {cur && (
              <>
                <Dialog.Title className="sr-only">{cur.caption}</Dialog.Title>
                <Dialog.Description className="sr-only">Photo {open! + 1} of {visible.length}</Dialog.Description>
                <div key={cur.id} className="try-panel w-full max-w-5xl">
                  <Photo item={cur} sizes="100vw" fit="contain" className="max-h-[68vh] w-full rounded-xl bg-black/40" />
                </div>
                <div className="w-full max-w-5xl">
                  {cur.people && <p className="font-display text-xl font-medium">{cur.people}</p>}
                  <p className="text-white/85">{cur.caption}</p>
                  <p className="mt-1 text-sm text-white/65">{[meta(cur), `${open! + 1} of ${visible.length}`].filter(Boolean).join(", ")}</p>
                </div>
                <Dialog.Close aria-label="Close" className="absolute right-4 top-4 grid size-11 place-items-center rounded-full bg-white/10 hover:bg-white/20">
                  <X aria-hidden size={20} />
                </Dialog.Close>
                {visible.length > 1 && (
                  <>
                    <button type="button" onClick={() => step(-1)} aria-label="Previous photo" className="absolute left-3 top-1/2 grid size-12 -translate-y-1/2 place-items-center rounded-full bg-white/10 hover:bg-white/20">
                      <ChevronLeft aria-hidden />
                    </button>
                    <button type="button" onClick={() => step(1)} aria-label="Next photo" className="absolute right-3 top-1/2 grid size-12 -translate-y-1/2 place-items-center rounded-full bg-white/10 hover:bg-white/20">
                      <ChevronRight aria-hidden />
                    </button>
                  </>
                )}
              </>
            )}
          </Dialog.Content>
        </Dialog.Portal>
      </Dialog.Root>
    </div>
  );
}
