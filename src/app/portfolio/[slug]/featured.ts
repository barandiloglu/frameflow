/**
 * Featured client subpages bypass the templated <ClientPage> and render
 * a fully bespoke component designed in the client's own brand voice.
 *
 * To add a new featured client:
 *   1. Build the bespoke page at src/components/portfolio/featured/<Client>Page.tsx
 *   2. Register the slug → component map below
 *
 * Non-featured clients automatically fall back to the templated ClientPage
 * with FF Reel chrome.
 */

import type { ComponentType } from "react";
import type { Client } from "@/data/clients";
import { BigBearsPage } from "@/components/portfolio/featured/BigBearsPage";

export type FeaturedPageProps = { client: Client };

export const FEATURED_PAGES: Record<string, ComponentType<FeaturedPageProps>> = {
  "big-bears-baked-potato": BigBearsPage,
};
