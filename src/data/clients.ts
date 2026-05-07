export type Service =
  | "Ad Management"
  | "App"
  | "Branding"
  | "Design"
  | "Logo"
  | "Photography"
  | "SEO"
  | "Social Media"
  | "Videography"
  | "Web Application"
  | "Website Design";

/* ------------------------------------------------------------------ */
/*  Scene data — optional rich content rendered per client subpage     */
/* ------------------------------------------------------------------ */

export type BrandSwatch = {
  name: string;
  hex: string;
  role?: "primary" | "secondary" | "accent" | "surface" | "ink";
};

export type BrandTypeface = {
  role: string;            // "Display" | "Body" | "Wordmark" | "Mono"
  name: string;            // Display name for the spec sheet
  /** Google Fonts family name, optional. */
  googleFontName?: string;
  /** Optional weights to load (e.g. "400;500;700") */
  weights?: string;
};

export type Brand = {
  palette: readonly BrandSwatch[];
  typefaces: readonly BrandTypeface[];
  /** Short eyebrow shown above the wordmark in the brand scene. */
  eyebrow?: string;
  /** One-line tagline shown under the wordmark. */
  tagline?: string;
};

export type LogoVariant = {
  src: string;
  alt: string;
  background?: "light" | "dark" | "brand";
  label?: string;          // "Primary" | "Monogram" | "Knockout"
};

export type MenuPage = {
  src: string;
  alt: string;
  label?: string;
};

export type WrapperImage = {
  src: string;
  alt: string;
  label?: string;
};

export type PhotoStill = {
  src: string;
  alt: string;
  /** Cinema-slate caption rendered over the still. */
  slate: string;
  orientation?: "landscape" | "portrait" | "square";
};

export type Client = {
  slug: string;
  name: string;
  /**
   * Service tags. ORDER MATTERS — the first tag is the primary service,
   * used as the FilmStill badge and the OG description lead. Tags should
   * be unique within the array; the subpage uses each tag as a React key
   * when rendering the service-pill list.
   */
  services: readonly Service[];

  // Optional spotlight fields. All real or absent — never invented.
  // Their presence promotes the client into richer rendering automatically.
  year?: string;
  location?: string;
  runtime?: string;
  scene?: string;
  synopsis?: string;
  featured?: boolean;
  sceneOrder?: number;

  // Optional scene data. Each populated scene type renders its own block
  // on the subpage in a fixed order: Brand → Mark → Photos → Menu → Wrapper.
  brand?: Brand;
  logos?: readonly LogoVariant[];
  menu?: readonly MenuPage[];
  wrapper?: readonly WrapperImage[];
  photos?: readonly PhotoStill[];
};

export const clients: readonly Client[] = [
  { slug: "acorn-accounting",            name: "Acorn Accounting",                          services: ["Web Application"] },
  { slug: "adrians-wasaga-beach",        name: "Adrian's Wasaga Beach",                     services: ["Social Media"] },
  { slug: "asd-laminate",                name: "ASD Laminate",                              services: ["Ad Management", "Social Media"] },
  { slug: "aydin-cpa",                   name: "AYDIN CPA",                                 services: ["Photography", "Website Design"] },
  {
    slug: "big-bears-baked-potato",
    name: "Big Bears Baked Potato",
    services: ["Branding", "Design", "Logo", "Photography", "Social Media", "Videography", "Website Design"],
    year: "2024",
    location: "Toronto",
    runtime: "Ongoing",
    scene: "INT. COUNTER — DAY",
    synopsis:
      "Full brand build for a Toronto baked-potato counter — mascot logo, typographic packaging, full menu system, and food photography. Big Bears earns its name.",
    featured: true,
    brand: {
      palette: [
        { name: "Bear Yellow",  hex: "#f3a805", role: "primary"   },
        { name: "Burnt Orange", hex: "#b73f13", role: "secondary" },
        { name: "Deep Red",     hex: "#922700", role: "accent"    },
        { name: "Cream",        hex: "#fffff3", role: "surface"   },
      ],
      typefaces: [
        { role: "Display", name: "Lilita One", googleFontName: "Lilita One", weights: "400" },
        { role: "Body",    name: "Nunito",     googleFontName: "Nunito",     weights: "300;400;600;800" },
      ],
      eyebrow: "A short film about a hot potato",
      tagline: "Loaded by Bears.",
    },
    logos: [
      {
        src: "/portfolio/big-bears/logo/big-bears-primary.png",
        alt: "Big Bears Baked Potato — primary logo",
        background: "light",
        label: "Primary",
      },
    ],
    menu: [
      { src: "/portfolio/big-bears/menu/menu-01.png", alt: "Big Bears menu — page 01", label: "Spread 01" },
      { src: "/portfolio/big-bears/menu/menu-02.png", alt: "Big Bears menu — page 02", label: "Spread 02" },
      { src: "/portfolio/big-bears/menu/menu-03.png", alt: "Big Bears menu — page 03", label: "Spread 03" },
    ],
    wrapper: [
      {
        src: "/portfolio/big-bears/wrapper/wrapper-front.png",
        alt: "Big Bears packaging — typographic wrapper pattern",
        label: "Take-away wrapper",
      },
    ],
    photos: [
      { src: "/portfolio/big-bears/photos/01-toppings-bar-wide.jpg", alt: "Toppings bar with chalkboard labels",                slate: "INT. Toppings Bar — Wide", orientation: "portrait" },
      { src: "/portfolio/big-bears/photos/02-staff-service.jpg",     alt: "Staff member at the counter behind glass",           slate: "INT. Counter — Service",   orientation: "portrait" },
      { src: "/portfolio/big-bears/photos/03-toppings-detail.jpg",   alt: "Toppings bar close-up",                              slate: "INT. Toppings — Detail",   orientation: "portrait" },
      { src: "/portfolio/big-bears/photos/04-build-corn.jpg",        alt: "Black-gloved hands scooping corn into a takeaway",   slate: "CU. Build — Scoop",        orientation: "portrait" },
      { src: "/portfolio/big-bears/photos/05-build-pickle.jpg",      alt: "Black-gloved hands scooping pickled cabbage",        slate: "CU. Build — Pickle",       orientation: "portrait" },
      { src: "/portfolio/big-bears/photos/06-bowl-pulled.jpg",       alt: "Loaded potato bowl with pulled meat",                slate: "CU. Bowl — Pulled",        orientation: "portrait" },
      { src: "/portfolio/big-bears/photos/07-counter-trio.jpg",      alt: "Three loaded bowls on the kitchen counter",          slate: "INT. Counter — Trio",      orientation: "portrait" },
      { src: "/portfolio/big-bears/photos/08-bowl-cabbage.jpg",      alt: "Bowl close-up with shredded chicken and cabbage",    slate: "CU. Bowl — Cabbage",       orientation: "portrait" },
      { src: "/portfolio/big-bears/photos/09-bowl-vegan.jpg",        alt: "Vegan bowl with dolma, olives, lettuce, peppers",    slate: "CU. Bowl — Vegan",         orientation: "portrait" },
      { src: "/portfolio/big-bears/photos/10-bowl-beans.jpg",        alt: "Bowl with pulled meat, beans, corn, salsa",          slate: "CU. Bowl — Beans",         orientation: "portrait" },
      { src: "/portfolio/big-bears/photos/11-pass-chili.jpg",        alt: "Kitchen pass with chili bowl and tortilla chips",    slate: "INT. Pass — Chili",        orientation: "portrait" },
      { src: "/portfolio/big-bears/photos/12-takeout-sidewalk.jpg",  alt: "Takeout bowl held over a sidewalk and stones",       slate: "POV. First Bite",          orientation: "portrait" },
    ],
  },
  { slug: "canapy-furniture",            name: "Canapy Furniture",                          services: ["Ad Management", "Photography", "Social Media", "Videography"] },
  { slug: "connectr",                    name: "ConnecTR",                                  services: ["Photography", "Videography"] },
  { slug: "ctbdh",                       name: "CTBDH",                                     services: ["Logo", "Videography"] },
  { slug: "destan-turkish-cuisine",      name: "Destan Turkish Cuisine",                    services: ["Photography", "Social Media", "Videography"] },
  { slug: "edupathways",                 name: "EduPathways",                               services: ["Branding", "Photography", "SEO", "Social Media", "Videography", "Website Design"] },
  { slug: "esma-fine-foods",             name: "Esma Fine Foods",                           services: ["Photography", "Social Media", "Videography"] },
  { slug: "fidan-construction",          name: "Fidan Construction",                        services: ["Ad Management", "SEO", "Website Design"] },
  { slug: "goldenhorn-construction",     name: "Goldenhorn Construction",                   services: ["Logo", "Photography", "Website Design"] },
  { slug: "harbourloom",                 name: "Harbourloom",                               services: ["Logo", "Photography", "Social Media", "Videography"] },
  { slug: "hopeway-immigration",         name: "Hopeway Immigration",                       services: ["Social Media", "Website Design"] },
  { slug: "iyn",                         name: "IYN",                                       services: ["App", "Social Media", "Website Design"] },
  { slug: "mavi-travel",                 name: "Mavi Travel",                               services: ["Social Media"] },
  { slug: "minauto",                     name: "MinAuto",                                   services: ["Logo", "Social Media"] },
  { slug: "northern-pathways-immigration", name: "Northern Pathways Immigration Consulting", services: ["App", "Social Media", "Videography"] },
];

/**
 * Lookup a client by slug. Returns `undefined` for unknown slugs.
 */
export const getClient = (slug: string): Client | undefined =>
  clients.find((c) => c.slug === slug);

/**
 * Returns the prev/next clients in the array order, wrapping around at the
 * ends so the reel always has a "next title" — a loop, not a paginated list.
 *
 * Pass a `Client` obtained from `getClient` or the `clients` array directly.
 * Throws if the client isn't in the roster (caller bug).
 */
export const getAdjacentClients = (
  client: Client
): { prev: Client; next: Client } => {
  const i = clients.findIndex((c) => c.slug === client.slug);
  if (i === -1) {
    throw new Error(`Client "${client.slug}" is not in the roster`);
  }
  return {
    prev: i > 0 ? clients[i - 1] : clients[clients.length - 1],
    next: i < clients.length - 1 ? clients[i + 1] : clients[0],
  };
};

/**
 * Returns the zero-padded frame number for a client (e.g. "001"-"019")
 * based on its position in the alphabetical roster. Throws if the client
 * isn't in the roster (caller bug).
 */
export const getFrameNumber = (client: Client): string => {
  const i = clients.indexOf(client);
  if (i === -1) {
    throw new Error(`Client "${client.slug}" is not in the roster`);
  }
  return String(i + 1).padStart(3, "0");
};

const SERVICE_COUNTS: ReadonlyArray<{ service: Service; count: number }> = (() => {
  const counts = new Map<Service, number>();
  for (const c of clients) {
    for (const s of c.services) {
      counts.set(s, (counts.get(s) ?? 0) + 1);
    }
  }
  return Array.from(counts.entries())
    .map(([service, count]) => ({ service, count }))
    .sort((a, b) => b.count - a.count || a.service.localeCompare(b.service));
})();

/**
 * Service-tag counts across all clients, sorted descending by count. Ties
 * are broken alphabetically by service name. Computed once at module load.
 */
export const getServiceCounts = (): ReadonlyArray<{ service: Service; count: number }> =>
  SERVICE_COUNTS;

/**
 * Distinct services used by at least one client. Currently 11.
 */
export const getDistinctServiceCount = (): number => SERVICE_COUNTS.length;
