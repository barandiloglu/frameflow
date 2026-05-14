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
  /** True while the engagement is still in production. Surfaces as a
      "WIP" pill on the portfolio listing and the subpage eyebrow. */
  wip?: boolean;
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
  { slug: "acorn-accounting",            name: "Acorn Accounting",                          services: ["Web Application"], wip: true },
  {
    slug: "adrians-wasaga-beach",
    name: "Adrian's Wasaga Beach",
    services: ["Photography", "Social Media", "Website Design"],
    year: "2026",
    location: "Wasaga Beach, ON",
    runtime: "Live since Apr 2026",
    scene: "EXT. COURTYARD — GOLDEN HOUR",
    synopsis:
      "Three deliverables in one season for a boutique 8-cabin courtyard rental, three blocks from the longest freshwater beach in the world. Photography across spring and summer; a 35-post social campaign in a six-template system; and adrianswasagabeach.ca, twelve pages, booking-first, live since April.",
    featured: true,
    brand: {
      palette: [
        { name: "Sand",        hex: "#ECD798", role: "surface"   },
        { name: "Seafoam",     hex: "#98E5D8", role: "secondary" },
        { name: "Live Orange", hex: "#F9A21B", role: "accent"    },
        { name: "Dark Gray",   hex: "#353747", role: "ink"       },
      ],
      typefaces: [
        { role: "Display", name: "Montserrat", googleFontName: "Montserrat", weights: "500;600;700;800;900" },
        { role: "Body",    name: "Quicksand",  googleFontName: "Quicksand",  weights: "300;400;500;600;700" },
        { role: "Hand",    name: "Caveat",     googleFontName: "Caveat",     weights: "400;500;600;700" },
      ],
      eyebrow: "Reel 008 · Adrian's · Case Study",
      tagline: "Two Locations. One Heartfelt Welcome.",
    },
    logos: [
      { src: "/portfolio/adrians-wasaga-beach/logo/adrians-primary.png",  alt: "Adrian's Wasaga Beach — sun-and-wave wordmark", background: "light", label: "Primary"  },
      { src: "/portfolio/adrians-wasaga-beach/logo/adrians-branding.png", alt: "Adrian's Wasaga Beach — official brand sheet",  background: "light", label: "Brand sheet" },
    ],
    photos: [
      { src: "/portfolio/adrians-wasaga-beach/photos/01-courtyard-firepit-sunset.jpg", alt: "The courtyard at golden hour, firepit lit, cabins around",  slate: "Courtyard — Firepit Sunset",   orientation: "landscape" },
      { src: "/portfolio/adrians-wasaga-beach/photos/02-cabins-4-5-sunset.jpg",        alt: "Cabins 4 and 5 at golden hour, sun off-frame",              slate: "Cabins 4 & 5 — Sunset",        orientation: "landscape" },
      { src: "/portfolio/adrians-wasaga-beach/photos/03-courtyard-wide-sunset.jpg",    alt: "Wide courtyard at sunset, doors open",                      slate: "Courtyard — Wide Sunset",      orientation: "landscape" },
      { src: "/portfolio/adrians-wasaga-beach/photos/04-courtyard-golden-hour.jpg",    alt: "Courtyard at golden hour, firepit centred",                 slate: "Courtyard — Golden Hour",      orientation: "landscape" },
      { src: "/portfolio/adrians-wasaga-beach/photos/05-courtyard-day-firepit.jpg",    alt: "Courtyard at midday, firepit unlit",                        slate: "Courtyard — Day · Firepit",    orientation: "landscape" },
      { src: "/portfolio/adrians-wasaga-beach/photos/06-cabins-day-yellow.jpg",        alt: "Yellow cabins at daytime, doors painted teal",              slate: "Cabins — Day · Yellow",        orientation: "landscape" },
      { src: "/portfolio/adrians-wasaga-beach/photos/07-aerial-with-beach.jpg",        alt: "Aerial of the property with the beach beyond",              slate: "Aerial — With Beach",          orientation: "landscape" },
      { src: "/portfolio/adrians-wasaga-beach/photos/08-aerial-top-down.jpg",          alt: "Top-down aerial of the courtyard",                          slate: "Aerial — Top-down",            orientation: "landscape" },
      { src: "/portfolio/adrians-wasaga-beach/photos/09-aerial-property-context.jpg",  alt: "Aerial showing property in beach-context",                  slate: "Aerial — Property Context",    orientation: "landscape" },
      { src: "/portfolio/adrians-wasaga-beach/photos/10-beach-wasaga-aerial.jpg",      alt: "Wasaga Beach aerial — the longest freshwater beach",         slate: "Wasaga Beach — Aerial",        orientation: "landscape" },
      { src: "/portfolio/adrians-wasaga-beach/photos/11-bedroom-king.jpg",             alt: "King bedroom in the One Bedroom Suite",                     slate: "Bedroom — King",               orientation: "landscape" },
      { src: "/portfolio/adrians-wasaga-beach/photos/12-bedroom-white-modern.jpg",     alt: "Modern white bedroom in the Two Bedroom Suite",             slate: "Bedroom — White / Modern",     orientation: "landscape" },
      { src: "/portfolio/adrians-wasaga-beach/photos/13-kitchen-with-bedroom.jpg",     alt: "Kitchen open onto bedroom area",                            slate: "Kitchen — With Bedroom",       orientation: "landscape" },
      { src: "/portfolio/adrians-wasaga-beach/photos/14-kitchen-close.jpg",            alt: "Kitchen close-up — counter and stainless",                  slate: "Kitchen — Close",              orientation: "landscape" },
      { src: "/portfolio/adrians-wasaga-beach/photos/15-living-room.jpg",              alt: "Living room in the Beach House",                            slate: "Living Room — Beach House",    orientation: "landscape" },
      { src: "/portfolio/adrians-wasaga-beach/photos/16-living-kitchen-combo.jpg",     alt: "Living + kitchen combo in a cottage",                       slate: "Living + Kitchen",             orientation: "landscape" },
    ],
  },
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
  {
    slug: "canapy-furniture",
    name: "Canapy Furniture",
    services: ["Ad Management", "Photography", "Social Media", "Videography"],
    year: "2026",
    location: "Toronto",
    runtime: "Ongoing",
    scene: "INT. SHOWROOM — DAY",
    synopsis:
      "A season for Toronto's contract-grade furniture studio on Davenport Road. Four shoots, thirteen plates kept, six trailers cut. Daylight only — no fill, no flash.",
    featured: true,
    brand: {
      palette: [
        { name: "Bone",     hex: "#ffffff", role: "surface"   },
        { name: "Paper",    hex: "#fafaf8", role: "primary"   },
        { name: "Stone",    hex: "#e5e3df", role: "secondary" },
        { name: "Charcoal", hex: "#111111", role: "ink"       },
      ],
      typefaces: [
        { role: "Display", name: "Hanken Grotesk", googleFontName: "Hanken Grotesk", weights: "200;300;400;500;600;700" },
      ],
      eyebrow: "Edition 011 · Catalogue · Spring 2026",
      tagline: "Sculpted for spaces that breathe.",
    },
    logos: [
      { src: "/portfolio/canapy-furniture/logo/canapy-primary.jpg", alt: "Canapy Furniture wordmark", background: "light", label: "Primary" },
    ],
    photos: [
      { src: "/portfolio/canapy-furniture/photos/01-cane-chair-backlit.jpg",     alt: "Cane lounge chair backlit by directional sun on a Davenport Road wall.", slate: "Cane Lounge — Backlit",      orientation: "portrait"  },
      { src: "/portfolio/canapy-furniture/photos/02-cane-weave-detail.jpg",      alt: "Hand-caned chair back, viennese weave on a beech frame.",                slate: "Viennese Cane — Detail",     orientation: "portrait"  },
      { src: "/portfolio/canapy-furniture/photos/03-cane-frame-light.jpg",       alt: "Cane and beech frame in early morning light.",                            slate: "First Light — Frame",        orientation: "portrait"  },
      { src: "/portfolio/canapy-furniture/photos/04-wood-arm-cream-cushion.jpg", alt: "Beech arm with cream bouclé cushion.",                                    slate: "Beech Arm — Cream Cushion",  orientation: "portrait"  },
      { src: "/portfolio/canapy-furniture/photos/05-frame-cushion-detail.jpg",   alt: "Frame and cushion, the half-millimetre between them.",                    slate: "Frame & Cushion",            orientation: "portrait"  },
      { src: "/portfolio/canapy-furniture/photos/06-arm-boucle-detail.jpg",      alt: "Bouclé cushion in undyed wool — close.",                                  slate: "Bouclé — Cushion",           orientation: "portrait"  },
      { src: "/portfolio/canapy-furniture/photos/07-cane-corner-sunlit.jpg",     alt: "Sunlit cane corner of a chair, late morning.",                            slate: "Cane Corner — Sunlit",       orientation: "portrait"  },
      { src: "/portfolio/canapy-furniture/photos/08-showroom-davenport.jpg",     alt: "The Canapy showroom on Davenport Road, vertical timber slats.",            slate: "Showroom — Davenport",       orientation: "portrait"  },
      { src: "/portfolio/canapy-furniture/photos/09-living-room-reading.jpg",    alt: "Reading on the bouclé sectional in window light.",                         slate: "Living Room — Reading",      orientation: "portrait"  },
      { src: "/portfolio/canapy-furniture/photos/10-tufted-headboard.jpg",       alt: "Tufted saddle leather headboard, eight-button hand-set.",                  slate: "Saddle Headboard — Tufted",  orientation: "portrait"  },
      { src: "/portfolio/canapy-furniture/photos/11-vessel-topdown.jpg",         alt: "Glazed vessel from above on a walnut sideboard.",                          slate: "Vessel — From Above",        orientation: "landscape" },
      { src: "/portfolio/canapy-furniture/photos/12-sectional-window-grid.jpg",  alt: "Bouclé sectional with window-grid shadow at 14:32.",                       slate: "Sectional — Window Grid",    orientation: "portrait"  },
      { src: "/portfolio/canapy-furniture/photos/13-walnut-arch-table.jpg",      alt: "Walnut arch dining table, book-matched top.",                              slate: "Walnut Arch — Table",        orientation: "portrait"  },
    ],
  },
  { slug: "connectr",                    name: "ConnecTR",                                  services: ["Photography", "Videography"] },
  {
    slug: "ctbdh",
    name: "CTBDH",
    services: ["Logo", "Videography"],
    year: "2025",
    location: "Toronto",
    runtime: "Spring 2025",
    scene: "EXT. THE NETWORK — DAY",
    synopsis:
      "Ten commercial business-story films and a network identity for the Canada Türkiye Business Development Hub — a Toronto-based network of Turkish-Canadian small and medium enterprises across the GTA.",
    featured: true,
    brand: {
      palette: [
        { name: "Cream",        hex: "#f4eee2", role: "surface"   },
        { name: "Stage Black",  hex: "#0a0a0a", role: "ink"       },
        { name: "CTBDH Red",    hex: "#b91d1d", role: "primary"   },
        { name: "Paper",        hex: "#ebe2cf", role: "secondary" },
      ],
      typefaces: [
        { role: "Display", name: "Fraunces",         googleFontName: "Fraunces",         weights: "300;400;500" },
        { role: "Body",    name: "Inter",            googleFontName: "Inter",            weights: "200;300;400;500;600;700" },
        { role: "Mono",    name: "JetBrains Mono",   googleFontName: "JetBrains Mono",   weights: "400;500" },
      ],
      eyebrow: "Volume I · The Edition · Spring 2025",
      tagline: "An edition of ten stories.",
    },
    logos: [
      { src: "/portfolio/ctbdh/logo/ctbdh-primary.png", alt: "Canada Türkiye Business Development Hub — primary logo on black", background: "dark",  label: "Primary" },
      { src: "/portfolio/ctbdh/logo/ctbdh-mark.png",    alt: "CTBDH ct ligature mark on white",                                  background: "light", label: "Mark"    },
    ],
  },
  {
    slug: "destan-turkish-cuisine",
    name: "Destan Turkish Cuisine",
    services: ["Ad Management", "Photography", "Social Media", "Videography"],
    year: "2026",
    location: "Toronto",
    runtime: "Ongoing",
    scene: "INT. OAK FIRE — NIGHT",
    synopsis:
      "A season of photography, films, social, and ads for a wood-fired Turkish kebab house. Cağ kebabı, slow-rotated above oak embers; fifteen plates kept from four shoots; six trailers cut for the feed.",
    featured: true,
    brand: {
      palette: [
        { name: "Burgundy",   hex: "#73191c", role: "primary"   },
        { name: "Saffron",    hex: "#e9b44a", role: "secondary" },
        { name: "Cream",      hex: "#fbf1d6", role: "surface"   },
        { name: "Ink",        hex: "#1a0a08", role: "ink"       },
      ],
      typefaces: [
        { role: "Display", name: "Cinzel",            googleFontName: "Cinzel",            weights: "400;500;600;700;800;900" },
        { role: "Serif",   name: "DM Serif Display",  googleFontName: "DM Serif Display",  weights: "400" },
        { role: "Script",  name: "Italianno",         googleFontName: "Italianno" },
        { role: "Hand",    name: "Caveat",            googleFontName: "Caveat",            weights: "400;500;600;700" },
      ],
      eyebrow: "A short film about a hot fire",
      tagline: "Loaded by fire.",
    },
    logos: [
      { src: "/portfolio/destan-turkish-cuisine/logo/destan-red.png",   alt: "Destan Turkish Cuisine — burgundy wordmark", background: "light", label: "Primary" },
      { src: "/portfolio/destan-turkish-cuisine/logo/destan-gold.png",  alt: "Destan Turkish Cuisine — gold wordmark",     background: "dark",  label: "Knockout" },
      { src: "/portfolio/destan-turkish-cuisine/logo/destan-cream.png", alt: "Destan Turkish Cuisine — cream wordmark",    background: "brand", label: "Reverse"  },
    ],
    photos: [
      { src: "/portfolio/destan-turkish-cuisine/photos/01-cag-kebabi-rotating.jpg",   alt: "Cağ kebabı, mid-rotation above oak embers",                  slate: "Cağ — The Rotation",        orientation: "portrait" },
      { src: "/portfolio/destan-turkish-cuisine/photos/02-cag-kebabi-flames.jpg",     alt: "The first dark crust on the rotating roast",                 slate: "Ateş — The Flame",          orientation: "portrait" },
      { src: "/portfolio/destan-turkish-cuisine/photos/03-cag-kebabi-fire-rolling.jpg", alt: "Cağ in mid-rotation, embers low",                          slate: "Mid-Rotation",              orientation: "portrait" },
      { src: "/portfolio/destan-turkish-cuisine/photos/04-cag-kebabi-vertical.jpg",   alt: "The roast at rest above the flame",                          slate: "The Roast — At Rest",       orientation: "portrait" },
      { src: "/portfolio/destan-turkish-cuisine/photos/05-carving-cag.jpg",           alt: "The chef carves the cağ with a long blade",                  slate: "Bıçak — The Blade",         orientation: "portrait" },
      { src: "/portfolio/destan-turkish-cuisine/photos/06-blade-on-meat.jpg",         alt: "Close-up of the blade on the meat",                          slate: "Kesim — The Cut",           orientation: "portrait" },
      { src: "/portfolio/destan-turkish-cuisine/photos/07-doner-tongs.jpg",           alt: "Doner tongs, by way of contrast",                            slate: "Doner — Contrast",          orientation: "portrait" },
      { src: "/portfolio/destan-turkish-cuisine/photos/08-skewers-smoke.jpg",         alt: "Skewers above coals, smoke rising in two registers",         slate: "Duman — Two Registers",     orientation: "portrait" },
      { src: "/portfolio/destan-turkish-cuisine/photos/09-skewers-coals.jpg",         alt: "Coals kept low under the skewers",                           slate: "Kömür — The Coals",         orientation: "portrait" },
      { src: "/portfolio/destan-turkish-cuisine/photos/10-chicken-skewers-coals.jpg", alt: "Şiş tavuk on the coals, golden",                             slate: "Şiş Tavuk",                 orientation: "portrait" },
      { src: "/portfolio/destan-turkish-cuisine/photos/11-fish-on-flame.jpg",         alt: "A fish, bound for embers — flame around the cheek",          slate: "Balık — On Flame",          orientation: "portrait" },
      { src: "/portfolio/destan-turkish-cuisine/photos/12-peppers-coals.jpg",         alt: "Grilled peppers and tomatoes side by side on the coals",     slate: "Biber — On Coals",          orientation: "portrait" },
      { src: "/portfolio/destan-turkish-cuisine/photos/13-adana-plated.jpg",          alt: "Adana kebab plated with sumac onion and lavash",             slate: "Adana — Plated",            orientation: "portrait" },
      { src: "/portfolio/destan-turkish-cuisine/photos/14-adana-lavash.jpg",          alt: "Two long lines of adana on lavash",                          slate: "Adana — On Lavash",         orientation: "portrait" },
      { src: "/portfolio/destan-turkish-cuisine/photos/15-table-spread.jpg",          alt: "A table set with mezze, lavash and adana, top-down",         slate: "Sofra — The Spread",        orientation: "landscape" },
    ],
  },
  { slug: "edupathways",                 name: "EduPathways",                               services: ["Branding", "Photography", "SEO", "Social Media", "Videography", "Website Design"] },
  { slug: "esma-fine-foods",             name: "Esma Fine Foods",                           services: ["Photography", "Social Media", "Videography"] },
  { slug: "fidan-construction",          name: "Fidan Construction",                        services: ["Ad Management", "SEO", "Website Design"] },
  { slug: "goldenhorn-construction",     name: "Goldenhorn Construction",                   services: ["Logo", "Photography", "Website Design"] },
  { slug: "harbourloom",                 name: "Harbourloom",                               services: ["Logo", "Photography", "Social Media", "Videography"] },
  { slug: "hopeway-immigration",         name: "Hopeway Immigration",                       services: ["Social Media", "Website Design"] },
  { slug: "iyn",                         name: "IYN",                                       services: ["App", "Social Media", "Website Design"] },
  { slug: "mavi-travel",                 name: "Mavi Travel",                               services: ["Social Media"] },
  { slug: "minauto",                     name: "MinAuto",                                   services: ["Logo", "Social Media"] },
  {
    slug: "northern-pathways-immigration",
    name: "Northern Pathways Immigration Consulting",
    services: ["Website Design", "Web Application", "Social Media"],
    year: "2026",
    location: "Toronto, ON",
    runtime: "Live since Q1 2026",
    scene: "INT. CONSULTANCY — DAY",
    synopsis:
      "A complete digital rebuild for a regulated Canadian immigration consultancy led by an RCIC-IRB. A bilingual marketing site at northernpathways.ca, three custom regulator-grade tools — a CRS calculator, a Six Selection Factors eligibility checker, and a searchable archive of every Express Entry & PNP draw since 2015 — and a Turkish-language explainer programme that mirrors every IRCC draw the morning it lands.",
    featured: true,
    brand: {
      palette: [
        { name: "Maple Red", hex: "#B92025", role: "primary" },
        { name: "Off-white", hex: "#F9F9F9", role: "surface" },
        { name: "Charcoal",  hex: "#2C2B2B", role: "ink"     },
        { name: "White",     hex: "#FFFFFF", role: "surface" },
      ],
      typefaces: [
        { role: "Display", name: "Montserrat", googleFontName: "Montserrat", weights: "300;400;500;600;700;800;900" },
        { role: "Body",    name: "Montserrat", googleFontName: "Montserrat", weights: "300;400;500;600;700"        },
      ],
      eyebrow: "Northern Pathways · RCIC-IRB",
      tagline: "Guiding your Canadian immigration journey with competence, care, and clarity.",
    },
  },
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
  /* findIndex by slug rather than indexOf by reference — the latter
     breaks across the server/client component boundary in Next.js,
     because serialized props come back as a fresh object whose
     reference is not === the original array element. */
  const i = clients.findIndex((c) => c.slug === client.slug);
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
