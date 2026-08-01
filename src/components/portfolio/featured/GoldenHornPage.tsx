"use client";

import type { FeaturedPageProps } from "@/app/portfolio/[slug]/featured";

export function GoldenHornPage({ client }: FeaturedPageProps) {
  return <main className="gh-page">{client.name}</main>;
}
