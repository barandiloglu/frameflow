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
import { DestanPage } from "@/components/portfolio/featured/DestanPage";
import { CanapyPage } from "@/components/portfolio/featured/CanapyPage";
import { CTBDHPage } from "@/components/portfolio/featured/CTBDHPage";
import { AdriansPage } from "@/components/portfolio/featured/AdriansPage";
import { NorthernPathwaysPage } from "@/components/portfolio/featured/NorthernPathwaysPage";
import { AydinCPAPage } from "@/components/portfolio/featured/AydinCPAPage";
import { ASDLaminatPage } from "@/components/portfolio/featured/ASDLaminatPage";
import { ConnecTRPage } from "@/components/portfolio/featured/ConnecTRPage";

export type FeaturedPageProps = { client: Client };

export const FEATURED_PAGES: Record<string, ComponentType<FeaturedPageProps>> = {
  "big-bears-baked-potato":         BigBearsPage,
  "destan-turkish-cuisine":         DestanPage,
  "canapy-furniture":               CanapyPage,
  "ctbdh":                          CTBDHPage,
  "adrians-wasaga-beach":           AdriansPage,
  "northern-pathways-immigration":  NorthernPathwaysPage,
  "aydin-cpa":                      AydinCPAPage,
  "asd-laminate":                   ASDLaminatPage,
  "connectr":                       ConnecTRPage,
};
