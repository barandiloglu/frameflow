import type { MetadataRoute } from "next";
import { clients } from "@/data/clients";

const BASE = "https://www.frameflow.ca";
const PAGES = ["", "/services", "/about", "/portfolio", "/gallery", "/contact"];

/* Only featured clients: the templated pages are thin "coming soon" frames
   and stay out until they have real content. No lastModified — a build-time
   date on every URL tells crawlers nothing. */
export default function sitemap(): MetadataRoute.Sitemap {
  return [
    ...PAGES.map((p) => ({ url: `${BASE}${p}` })),
    ...clients
      .filter((c) => c.featured)
      .map((c) => ({ url: `${BASE}/portfolio/${c.slug}` })),
  ];
}
