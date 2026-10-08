import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* The portal pages are client components and can't export metadata, so
     noindex goes out as a header. It holds whether the proxy redirects them
     (today) or serves them (once the portal ships). */
  async headers() {
    return ["/login", "/dashboard/:path*", "/admin/:path*"].map((source) => ({
      source,
      headers: [{ key: "X-Robots-Tag", value: "noindex, nofollow" }],
    }));
  },
};

export default nextConfig;
