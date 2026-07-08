"use client";

import type { Client } from "@/data/clients";

type Props = { client: Client };

export function AydinCPAPage({ client }: Props) {
  return <main style={{ padding: 80 }}>{client.name} — case study (stub)</main>;
}
