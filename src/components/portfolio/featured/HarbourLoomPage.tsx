"use client";

import type { Client } from "@/data/clients";

type Props = { client: Client };

export function HarbourLoomPage({ client }: Props) {
  return <main style={{ padding: 80 }}>{client.name} — case study (stub)</main>;
}
