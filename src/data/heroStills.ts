import { galleryPhotos, type GalleryPhoto } from "./gallery";
import { clients, getFrameNumber } from "./clients";

/* What plays on the hero's director's monitor.

   The gallery's landscape photographs, not the portfolio marquee frames: those
   are 320×200 and would be upscaled ~3× on a retina screen next to a crisp
   headline. Clients are interleaved so consecutive cuts change subject — that
   alternation is what makes the sequence read as an edit. Order is
   deterministic so server and client render the same first frame. */

export type HeroStill = {
  src: string;
  alt: string;
  slate: string;
  /** Display name from the roster, or a titleised slug if the gallery uses a
      shorter slug than the roster does (big-bears → big-bears-baked-potato). */
  client: string;
  /** A{roster frame}_C{take}, the same frame number the portfolio page prints. */
  clip: string;
  w: number;
  h: number;
};

const rosterFor = (slug: string) =>
  clients.find((c) => c.slug === slug) ?? clients.find((c) => c.slug.startsWith(slug));

const titleize = (slug: string) =>
  slug
    .split("-")
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(" ");

export const heroStills: readonly HeroStill[] = (() => {
  const byClient = new Map<string, GalleryPhoto[]>();
  for (const p of galleryPhotos) {
    if (p.w <= p.h) continue;
    const list = byClient.get(p.client);
    if (list) list.push(p);
    else byClient.set(p.client, [p]);
  }

  const groups = [...byClient.values()];
  const out: HeroStill[] = [];
  for (let take = 0; groups.some((g) => take < g.length); take++) {
    for (const g of groups) {
      const p = g[take];
      if (!p) continue;
      const roster = rosterFor(p.client);
      out.push({
        src: p.full,
        alt: p.alt,
        slate: p.slate,
        client: roster?.name ?? titleize(p.client),
        clip: `A${roster ? getFrameNumber(roster) : "000"}_C${String(take + 1).padStart(3, "0")}`,
        w: p.w,
        h: p.h,
      });
    }
  }
  return out;
})();
