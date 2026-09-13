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

export type ServiceFolder = {
  /** Matches the `id` in the services list on the page. */
  id: number;
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
  /** The storyboard drawing for this service — the same ink-on-paper frame the
   *  homepage reel uses, so the two pages draw from one set. Absent where no
   *  frame has been drawn yet (SEO). */
  board?: { src: string; alt: string; w: number; h: number };
};

export const serviceFolders: readonly ServiceFolder[] = [
  {
    id: 1,
    board: { src: "/home/reel/003-logo-design.webp", alt: "Storyboard sketch: a logo exploration sheet with one mark circled and redrawn large in amber", w: 1456, h: 816 },
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
    board: { src: "/home/reel/001-brand-identity.webp", alt: "Storyboard sketch: a stack of business cards, an amber swatch fan and a brass ruler on a desk", w: 1200, h: 960 },
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
    board: { src: "/home/reel/002-websites.webp", alt: "Storyboard sketch: a monitor showing a wireframe layout with one amber panel", w: 1456, h: 816 },
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
    board: { src: "/home/reel/004-social-media.webp", alt: "Storyboard sketch: a cinema camera and softbox filming a café counter, a phone showing the vertical clip", w: 1344, h: 896 },
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
    board: { src: "/home/reel/005-video-photo.webp", alt: "Storyboard sketch: a camera operator from behind under an amber sun on a street", w: 1344, h: 896 },
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
    board: { src: "/home/reel/006-ad-management.webp", alt: "Storyboard sketch: two monitors with rising amber charts at night, a coffee cup and a crescent moon", w: 1344, h: 896 },
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
    board: { src: "/home/reel/007-web-mobile-apps.webp", alt: "Storyboard sketch: a long desk of laptops and monitors showing wireframes, a window at the right", w: 2304, h: 512 },
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
  {
    id: 8,
    tags: ["SEO"],
    /* EduPathways and Fidan Construction, both tagged SEO in the roster. */
    clients: 2,
    /* Deliberately empty. SEO's output is rankings, audits and traffic — there
       is no photograph of it. Fidan's directory holds construction site shots
       and a mirrored page dump, none of which show the work, so pinning one
       would be decoration pretending to be evidence. The row opens with the
       note instead. */
    frames: [],
    note: "The work here is audits, rankings and traffic — nothing that photographs.",
  },
];
