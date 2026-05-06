import type { Metadata } from "next";
import { notFound } from "next/navigation";
import {
  clients,
  getClient,
  getAdjacentClients,
} from "@/data/clients";
import { ClientPage } from "./ClientPage";

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  return clients.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const client = getClient(slug);
  if (!client) return { title: "Not found — FrameFlow" };

  const description = `${client.name} · ${client.services.join(" · ")}`;
  const url = `/portfolio/${client.slug}`;
  const title = `${client.name} — FrameFlow`;

  return {
    title,
    description,
    openGraph: { title, description, url, type: "website" },
    twitter: { card: "summary", title, description },
  };
}

export default async function Page({ params }: Props) {
  const { slug } = await params;
  const client = getClient(slug);
  if (!client) notFound();

  const adjacent = getAdjacentClients(client);
  const frameNumber = String(
    clients.findIndex((c) => c.slug === slug) + 1
  ).padStart(3, "0");

  return (
    <ClientPage
      client={client}
      frameNumber={frameNumber}
      prev={adjacent.prev}
      next={adjacent.next}
    />
  );
}
