"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import { useState } from "react";

interface ClientData {
  name: string;
  plan: string;
  status: string;
  location: string;
  email: string;
  joined: string;
  services: string[];
  pendingPosts: number;
}

const clientMap: Record<string, ClientData> = {
  "1": {
    name: "Acadia Bakes",
    plan: "Growth Plan",
    status: "Active",
    location: "Toronto, ON",
    email: "hello@acadiabakes.ca",
    joined: "January 2023",
    services: ["Social Media Management", "Brand Identity"],
    pendingPosts: 3,
  },
  "2": {
    name: "Nomad Studio",
    plan: "Enterprise",
    status: "Active",
    location: "Vancouver, BC",
    email: "info@nomadstudio.ca",
    joined: "March 2023",
    services: ["Web Design", "Brand Identity"],
    pendingPosts: 0,
  },
  "3": {
    name: "Velour Collective",
    plan: "Growth Plan",
    status: "Active",
    location: "Montreal, QC",
    email: "team@velourcollective.com",
    joined: "June 2023",
    services: ["Social Media Management"],
    pendingPosts: 2,
  },
};

interface PostItem {
  title: string;
  platform: string;
  platformColor: string;
  date: string;
  status: "Pending" | "Approved" | "Needs Edits" | "Draft";
}

const posts: PostItem[] = [
  { title: "Summer Menu Feature", platform: "Instagram", platformColor: "bg-amber", date: "Jul 3", status: "Pending" },
  { title: "Client Testimonial Carousel", platform: "Facebook", platformColor: "bg-ember", date: "Jul 4", status: "Approved" },
  { title: "Behind the Scenes Reel", platform: "Instagram", platformColor: "bg-amber", date: "Jul 5", status: "Needs Edits" },
  { title: "Recipe Short — Croissant", platform: "TikTok", platformColor: "bg-ivory", date: "Jul 7", status: "Draft" },
  { title: "Weekend Special Promo", platform: "Instagram", platformColor: "bg-amber", date: "Jul 8", status: "Pending" },
];

function statusPillClass(status: string) {
  switch (status) {
    case "Pending":
      return "bg-amber-20 text-amber";
    case "Approved":
      return "bg-ivory-10 text-ivory";
    case "Needs Edits":
      return "bg-ember-15 text-ember";
    case "Draft":
      return "bg-crimson-30 text-ivory-30";
    default:
      return "bg-ivory-10 text-ivory-60";
  }
}

export default function ClientDetailPage() {
  const params = useParams();
  const id = params.id as string;
  const client = clientMap[id];
  const [notes, setNotes] = useState("");

  if (!client) {
    return (
      <div className="flex-1 flex flex-col items-center justify-center">
        <p className="font-display font-semibold text-lg text-ivory">Client not found</p>
        <Link
          href="/admin/clients"
          className="mt-4 text-sm font-body text-amber hover:text-amber/80 transition-colors"
        >
          &larr; Back to Clients
        </Link>
      </div>
    );
  }

  return (
    <div className="flex-1 flex flex-col overflow-hidden">
      {/* Top bar */}
      <header className="shrink-0 flex items-center justify-between px-8 py-5 border-b border-ivory-05">
        <div className="flex items-center gap-4">
          <Link
            href="/admin/clients"
            className="text-sm font-body text-ivory-60 hover:text-ivory transition-colors"
          >
            &larr; All Clients
          </Link>
          <span className="text-ivory-10">|</span>
          <h1 className="font-display font-bold text-xl text-ivory">{client.name}</h1>
          <span className="px-2.5 py-0.5 text-[10px] font-semibold font-body rounded-full bg-ivory-10 text-ivory">
            {client.status}
          </span>
          <span className="px-2.5 py-0.5 text-[10px] font-semibold font-body rounded-full bg-amber-20 text-amber">
            {client.plan}
          </span>
        </div>
        <div className="flex items-center gap-2">
          <button className="px-4 py-2 text-xs font-body font-semibold rounded-[1px] border border-ivory-10 text-ivory-60 hover:text-ivory hover:border-ivory-30 transition-colors">
            Edit Client
          </button>
          <button className="px-4 py-2 text-xs font-body font-semibold rounded-[1px] bg-amber text-graphite hover:brightness-110 transition">
            Message
          </button>
        </div>
      </header>

      {/* Scrollable content */}
      <div className="flex-1 overflow-y-auto p-8 space-y-6">
        {/* Info cards row */}
        <div className="grid grid-cols-4 gap-4">
          {/* Plan card */}
          <div className="rounded-[2px] border border-ivory-05 bg-ivory-05/50 p-5">
            <p className="text-[10px] font-body font-semibold tracking-[0.15em] text-ivory-30 uppercase mb-2">Plan</p>
            <p className="font-display font-semibold text-sm text-ivory">{client.plan}</p>
            <p className="text-xs font-body text-ivory-30 mt-1">Since {client.joined}</p>
          </div>

          {/* Services card */}
          <div className="rounded-[2px] border border-ivory-05 bg-ivory-05/50 p-5">
            <p className="text-[10px] font-body font-semibold tracking-[0.15em] text-ivory-30 uppercase mb-2">Services</p>
            <p className="font-display font-semibold text-sm text-ivory">{client.services.length} Active</p>
            <div className="mt-1 space-y-0.5">
              {client.services.map((s) => (
                <p key={s} className="text-xs font-body text-ivory-60">{s}</p>
              ))}
            </div>
          </div>

          {/* Pending Posts card */}
          <div className="rounded-[2px] border border-ivory-05 bg-ivory-05/50 p-5">
            <p className="text-[10px] font-body font-semibold tracking-[0.15em] text-ivory-30 uppercase mb-2">Pending Posts</p>
            <p className={`font-display font-semibold text-2xl ${client.pendingPosts > 0 ? "text-amber" : "text-ivory"}`}>
              {client.pendingPosts}
            </p>
          </div>

          {/* Status card */}
          <div className="rounded-[2px] border border-ivory-05 bg-ivory-05/50 p-5">
            <p className="text-[10px] font-body font-semibold tracking-[0.15em] text-ivory-30 uppercase mb-2">Status</p>
            <div className="flex items-center gap-2">
              <span
                className={`w-2.5 h-2.5 rounded-full ${
                  client.status === "Active" ? "bg-green-500" : "bg-ivory-30"
                }`}
              />
              <p className="font-display font-semibold text-sm text-ivory">{client.status}</p>
            </div>
          </div>
        </div>

        {/* Two-column layout */}
        <div className="grid gap-6" style={{ gridTemplateColumns: "1.5fr 1fr" }}>
          {/* Left — Content Pipeline */}
          <div className="rounded-[2px] border border-ivory-05 bg-ivory-05/50">
            <div className="flex items-center justify-between px-5 py-4 border-b border-ivory-05">
              <h2 className="font-display font-semibold text-sm text-ivory">Content Pipeline</h2>
              <Link
                href="#"
                className="text-xs font-body text-amber hover:text-amber/80 transition-colors"
              >
                View Schedule
              </Link>
            </div>
            <div className="divide-y divide-ivory-05">
              {posts.map((post) => (
                <div key={post.title} className="flex items-center justify-between px-5 py-3.5">
                  <div className="flex items-center gap-3">
                    <span className={`w-2 h-2 rounded-full ${post.platformColor}`} />
                    <div>
                      <p className="text-sm font-body font-semibold text-ivory">{post.title}</p>
                      <p className="text-xs font-body text-ivory-30 mt-0.5">
                        {post.platform} &middot; {post.date}
                      </p>
                    </div>
                  </div>
                  <span
                    className={`px-2.5 py-0.5 text-[10px] font-semibold font-body rounded-full ${statusPillClass(
                      post.status
                    )}`}
                  >
                    {post.status}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Right — Client Details */}
          <div className="rounded-[2px] border border-ivory-05 bg-ivory-05/50">
            <div className="px-5 py-4 border-b border-ivory-05">
              <h2 className="font-display font-semibold text-sm text-ivory">Client Details</h2>
            </div>
            <div className="p-5 space-y-5">
              {/* Contact info */}
              <div className="space-y-3">
                <div>
                  <p className="text-[10px] font-body font-semibold tracking-[0.15em] text-ivory-30 uppercase mb-1">
                    Email
                  </p>
                  <p className="text-sm font-body text-ivory-60">{client.email}</p>
                </div>
                <div>
                  <p className="text-[10px] font-body font-semibold tracking-[0.15em] text-ivory-30 uppercase mb-1">
                    Location
                  </p>
                  <p className="text-sm font-body text-ivory-60">{client.location}</p>
                </div>
              </div>

              {/* Services */}
              <div>
                <p className="text-[10px] font-body font-semibold tracking-[0.15em] text-ivory-30 uppercase mb-2">
                  Services
                </p>
                <div className="space-y-1.5">
                  {client.services.map((s) => (
                    <div key={s} className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-amber" />
                      <p className="text-sm font-body text-ivory-60">{s}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Joined */}
              <div>
                <p className="text-[10px] font-body font-semibold tracking-[0.15em] text-ivory-30 uppercase mb-1">
                  Joined
                </p>
                <p className="text-sm font-body text-ivory-60">{client.joined}</p>
              </div>

              {/* Notes */}
              <div>
                <p className="text-[10px] font-body font-semibold tracking-[0.15em] text-ivory-30 uppercase mb-2">
                  Notes
                </p>
                <textarea
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  rows={4}
                  placeholder="Add internal notes about this client..."
                  className="w-full px-3 py-2 text-sm font-body rounded-[1px] bg-ivory-05 border border-ivory-10 text-ivory placeholder:text-ivory-30 focus:outline-none focus:border-amber resize-none"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
