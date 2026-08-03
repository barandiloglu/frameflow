/* The three frames each service folder fans out on hover.
 *
 * Every entry is real client work for the service it sits under, and every
 * `alt` was written against the actual image — most are lifted verbatim from
 * the featured case-study pages or src/data/gallery.ts, the rest written after
 * opening the file. Nothing here is decorative stock.
 *
 * Picks are pinned rather than derived so the page cannot silently change when
 * the roster does. Two deliberate exclusions, both documented at the folder:
 *
 *   - goldenhorn website/work.jpg and website/home.jpg below the fold still
 *     carry "Elementra" template placeholder copy on the live client site.
 *     Only the clean hero crop and services.jpg are used, and the cards are
 *     top-anchored so the placeholder body copy never renders.
 *   - iyn/brand/logo-white.png is a white mark on white; invisible on a card.
 */

export type FolderFrame = {
  src: string;
  alt: string;
  client: string;
};

/** The timeline's tracks, in render order. */
export const TRACKS = [
  { code: "V1", name: "Brand" },
  { code: "V2", name: "Digital" },
  { code: "V3", name: "Content" },
  { code: "A1", name: "Growth" },
] as const;

export type ServiceFolder = {
  /** Matches the `id` in the services list on the page. */
  id: number;
  /** Index into TRACKS. Clips sit end to end along their own track. */
  track: number;
  /** Roster `services` tag(s) this folder counts clients from. */
  tags: readonly string[];
  /** Live client count from src/data/clients.ts. Re-audited 2026-08-03 with a
   *  per-entry parse; the previous figures came from a regex that reached past
   *  entries lacking a nearby `services:` and swallowed the next one, so six of
   *  the seven were wrong. */
  clients: number;
  frames: readonly FolderFrame[];
  /** Shown instead of frames when there is no honest image to fan. */
  note?: string;
};

export const serviceFolders: readonly ServiceFolder[] = [
  {
    id: 1,
    track: 0,
    tags: ["Logo"],
    clients: 5,
    frames: [
      {
        src: "/portfolio/big-bears/logo/big-bears-primary.png",
        alt: "Big Bears Baked Potato badge — a bear in yellow sunglasses inside a black and cream ring",
        client: "Big Bears Baked Potato",
      },
      {
        src: "/portfolio/ctbdh/logo/ctbdh-primary.png",
        alt: "Canada Türkiye Business Development Hub lock-up — a red ct monogram beside a four-line wordmark on black",
        client: "CTBDH",
      },
      {
        src: "/portfolio/goldenhorn-construction/logo/primary.png",
        alt: "Golden Horn primary lock-up on white — navy wordmark beside the gold horse mark",
        client: "Golden Horn Construction",
      },
    ],
  },
  {
    id: 2,
    track: 0,
    tags: ["Branding"],
    clients: 3,
    frames: [
      {
        src: "/portfolio/harbourloom/brand/logo-primary.png",
        alt: "Harbour Loom lock-up — an amber sail over a navy wave beside a serif wordmark with a script Loom",
        client: "Harbour Loom",
      },
      {
        src: "/portfolio/ctbdh/brand/wordmark-sheet.png",
        alt: "CTBDH identity sheet — the wordmark set large in dark red on off-white, with letterhead and business cards below",
        client: "CTBDH",
      },
      {
        src: "/portfolio/beril-sedat-homes/brand/logo-navy.png",
        alt: "Beril & Sedat Homes mark — a gold B-S monogram in a circle above a navy serif wordmark",
        client: "Beril & Sedat Homes",
      },
    ],
  },
  {
    id: 3,
    track: 1,
    tags: ["Website Design"],
    clients: 10,
    frames: [
      {
        src: "/portfolio/aydin-cpa/website/home.png",
        alt: "The Aydın CPA homepage — 'We Offer Reliable Accounting' beside stacked office photographs",
        client: "Aydın CPA",
      },
      {
        src: "/portfolio/goldenhorn-construction/website/services.jpg",
        alt: "The Golden Horn services page — 'Quality construction, reliable results' above four service cards",
        client: "Golden Horn Construction",
      },
      {
        src: "/portfolio/goldenhorn-construction/website/home.jpg",
        alt: "The Golden Horn homepage — 'Modern Foundations' set over a glass tower at dusk",
        client: "Golden Horn Construction",
      },
    ],
  },
  {
    id: 4,
    track: 2,
    tags: ["Social Media"],
    clients: 15,
    frames: [
      {
        src: "/portfolio/harbourloom/posts/01-beach-triptych.jpg",
        alt: "Three-panel Harbour Loom post — a fish-print towel on sand, footprints through sunlit dunes, and a fringed woven edge",
        client: "Harbour Loom",
      },
      {
        src: "/portfolio/asd-laminate/posts/02-carbon.png",
        alt: "ASD social post — a matte grey Carbon-surface kitchen and bedroom, headline 'Carbon by ASD Laminat'",
        client: "ASD Laminat",
      },
      {
        src: "/portfolio/adrians-wasaga-beach/social/01-now-booking.png",
        alt: "Now booking · Summer 2026 social post",
        client: "Adrian's Wasaga Beach",
      },
    ],
  },
  {
    id: 5,
    track: 2,
    tags: ["Videography", "Photography"],
    clients: 11,
    frames: [
      {
        src: "/portfolio/destan-turkish-cuisine/photos/05-carving-cag.jpg",
        alt: "The chef carves the cağ with a long blade",
        client: "Destan Turkish Cuisine",
      },
      {
        src: "/portfolio/big-bears/photos/04-build-corn.jpg",
        alt: "Black-gloved hands scooping corn into a takeaway",
        client: "Big Bears Baked Potato",
      },
      {
        src: "/portfolio/connectr/photos/06-mavi-booth.jpg",
        alt: "The Mavi Travel & Tours exhibitor booth",
        client: "ConnecTR",
      },
    ],
  },
  {
    id: 6,
    track: 3,
    tags: ["Ad Management"],
    clients: 5,
    frames: [
      {
        src: "/portfolio/fidan-construction/ads/01-demo-to-clean-finish.jpg",
        alt: "Before and after of stripped basement framing and insulation, cleaned and sealed, headline 'From demo to clean finish'",
        client: "Fidan Construction",
      },
      {
        src: "/portfolio/fidan-construction/ads/02-turnover-ready.jpg",
        alt: "Before and after of a patched, repainted rental-unit wall and ceiling, headline 'Turnover ready in 48 hours'",
        client: "Fidan Construction",
      },
      {
        src: "/portfolio/fidan-construction/ads/04-one-team.jpg",
        alt: "Before and after of a repaired ceiling beside finished kitchen cabinets, headline 'One team, start to finish'",
        client: "Fidan Construction",
      },
    ],
  },
  {
    id: 7,
    track: 1,
    tags: ["App", "Web Application"],
    clients: 3,
    /* IYN is tagged "App" in the roster — a second tag for the same service
       that an earlier count missed entirely, which is why this folder was
       previously shown as having no work at all. Its education-portal launch
       is genuine, on-point evidence, so this is no longer an empty folder.
       Acorn Accounting remains wip:true with no directory under
       public/portfolio, and Northern Pathways has no app captures, so one
       frame is all there honestly is. */
    frames: [
      {
        src: "/portfolio/iyn/posts/06-portal-lansman.jpg",
        alt: "IYN post — \u201c\u0130YN E\u011fitim Portal\u0131 ile tan\u0131\u015f\u0131n\u201d with laptop, tablet and phone mockups",
        client: "IYN",
      },
    ],
    note: "Three builds on the desk · one still in production",
  },
];

/* Rotation is randomised per hover in the source (gsap.utils.random). A
   render-time Math.random() would desync SSR and client markup, so the tilts
   are fixed per slot and per folder index instead — same scatter, stable DOM. */
export const FRAME_TILT: readonly (readonly [number, number, number])[] = [
  [-16, 4, 14],
  [-12, -3, 18],
  [-19, 6, 11],
  [-14, 2, 16],
  [-17, -5, 13],
  [-11, 7, 19],
  [-15, 3, 12],
];
