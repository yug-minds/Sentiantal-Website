/**
 * Gallery of photos that build trust: leaders and guests, field work, events and recognition.
 *
 * To add a photo:
 *   1. Put the file in /public/gallery (JPG or WebP, at least 1600px wide).
 *   2. Add an entry below with its path in `src`, and the ratio as "width / height" (for example "3 / 2").
 *   3. Say who is in it: `people` ("With Dr. X, Minister for Y") is what builds trust, so be exact and get consent.
 * Entries without `src` show a neutral placeholder tile. The ones below are placeholders: replace or delete them.
 */
export type GalleryCategory = "leaders" | "field" | "events" | "recognition";

export const galleryCategories: Record<GalleryCategory, string> = {
  leaders: "Leaders and guests",
  field: "In the field",
  events: "Events",
  recognition: "Recognition",
};

export interface GalleryItem {
  id: string;
  category: GalleryCategory;
  /** Path under /public, for example "/gallery/minister-visit.jpg". Leave out for a placeholder. */
  src?: string;
  /** Describe the photo for people who can't see it. */
  alt: string;
  /** One line shown under the photo. */
  caption: string;
  /** Who is pictured, with title. */
  people?: string;
  place?: string;
  /** For example "March 2026". */
  date?: string;
  /** "width / height" so tiles keep their shape before the image loads. Defaults to "4 / 3". */
  ratio?: string;
}

export const gallery: GalleryItem[] = [
  { id: "p2", category: "field", src: "/field/farm-visit.jpg", alt: "Sentiantal team talking with a farmer in a field about the soil tester", caption: "Talking with a farmer about the soil tester", ratio: "16 / 9" },
  { id: "p6", category: "field", src: "/field/agripilot.jpg", alt: "Two people testing soil samples with the SARAM device and a laptop at an agri expo", caption: "Testing soil samples with SARAM at an agri expo", ratio: "3 / 2" },
  { id: "p1", category: "leaders", alt: "Placeholder for a photo with a guest", caption: "Caption for this photo", people: "Name and title of the guest", place: "Place", date: "Month Year", ratio: "4 / 5" },
  { id: "p3", category: "events", alt: "Placeholder for an event photo", caption: "Caption for this photo", place: "Place", date: "Month Year", ratio: "3 / 2" },
  { id: "p4", category: "recognition", alt: "Placeholder for an award photo", caption: "Caption for this photo", people: "Name and title", ratio: "4 / 5" },
  { id: "p5", category: "leaders", alt: "Placeholder for a photo with a guest", caption: "Caption for this photo", people: "Name and title of the guest", ratio: "1 / 1" },
];
