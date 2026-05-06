// src/data/clients.ts

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

export type Client = {
  slug: string;
  name: string;
  /**
   * Service tags. ORDER MATTERS — the first tag is the primary service,
   * used as the FilmStill badge and the OG description lead.
   */
  services: Service[];

  // Optional spotlight fields. All real or absent — never invented.
  // Their presence promotes the client into richer rendering automatically.
  year?: string;
  location?: string;
  runtime?: string;
  scene?: string;
  synopsis?: string;
  featured?: boolean;
  scene_order?: number;
};

export const clients: Client[] = [
  { slug: "acorn-accounting",            name: "Acorn Accounting",                          services: ["Web Application"] },
  { slug: "adrians-wasaga-beach",        name: "Adrian's Wasaga Beach",                     services: ["Social Media"] },
  { slug: "asd-laminate",                name: "ASD Laminate",                              services: ["Ad Management", "Social Media"] },
  { slug: "aydin-cpa",                   name: "AYDIN CPA",                                 services: ["Photography", "Website Design"] },
  { slug: "big-bears-baked-potato",      name: "Big Bears Baked Potato",                    services: ["Branding", "Design", "Logo", "Photography", "Social Media", "Videography", "Website Design"] },
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

export const getClient = (slug: string): Client | undefined =>
  clients.find((c) => c.slug === slug);

/**
 * Returns the prev/next clients in the array order, wrapping around at the
 * ends so the reel always has a "next title" — a loop, not a paginated list.
 * Returns `null` if the slug isn't found.
 */
export const getAdjacentClients = (
  slug: string
): { prev: Client; next: Client } | null => {
  const i = clients.findIndex((c) => c.slug === slug);
  if (i === -1) return null;
  return {
    prev: i > 0 ? clients[i - 1] : clients[clients.length - 1],
    next: i < clients.length - 1 ? clients[i + 1] : clients[0],
  };
};

/**
 * Service-tag counts across all clients, sorted descending. Ties broken
 * alphabetically by service name. Pure derivation — used by the Archive
 * Manifest tiles.
 */
export const getServiceCounts = (): Array<{ service: Service; count: number }> => {
  const counts = new Map<Service, number>();
  for (const c of clients) {
    for (const s of c.services) {
      counts.set(s, (counts.get(s) ?? 0) + 1);
    }
  }
  return Array.from(counts.entries())
    .map(([service, count]) => ({ service, count }))
    .sort((a, b) => b.count - a.count || a.service.localeCompare(b.service));
};

/**
 * Distinct services used by at least one client. Currently 11.
 */
export const getDistinctServiceCount = (): number => getServiceCounts().length;
