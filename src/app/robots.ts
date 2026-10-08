import type { MetadataRoute } from "next";

const PORTAL = ["/login", "/dashboard", "/admin"];

/* AI crawlers get their own group so the allow is explicit. A crawler that
   matches a named group ignores the "*" group, so the portal disallow is
   repeated there. */
export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      { userAgent: "*", allow: "/", disallow: PORTAL },
      {
        userAgent: [
          "GPTBot",
          "OAI-SearchBot",
          "ChatGPT-User",
          "ClaudeBot",
          "Claude-SearchBot",
          "PerplexityBot",
          "Google-Extended",
          "Applebot-Extended",
        ],
        allow: "/",
        disallow: PORTAL,
      },
    ],
    sitemap: "https://www.frameflow.ca/sitemap.xml",
  };
}
