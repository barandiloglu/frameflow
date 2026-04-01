"use client";

import { useState } from "react";
import Link from "next/link";

type Status = "Active" | "Paused" | "Onboarding";
type Plan = "Growth Plan" | "Starter Plan" | "Enterprise";
type Tab = "All" | "Active" | "Paused" | "Onboarding";

interface Client {
  id: number;
  name: string;
  plan: Plan;
  status: Status;
  pending: number;
  location: string;
  services: string[];
  joined: string;
}

const clients: Client[] = [
  { id: 1, name: "Acadia Bakes", plan: "Growth Plan", status: "Active", pending: 3, location: "Toronto", services: ["Social Media", "Brand"], joined: "Jan 2023" },
  { id: 2, name: "Nomad Studio", plan: "Enterprise", status: "Active", pending: 0, location: "Vancouver", services: ["Web Design", "Brand"], joined: "Mar 2023" },
  { id: 3, name: "Velour Collective", plan: "Growth Plan", status: "Active", pending: 2, location: "Montreal", services: ["Social Media"], joined: "Jun 2023" },
  { id: 4, name: "Sola Health", plan: "Growth Plan", status: "Active", pending: 1, location: "Toronto", services: ["Ad Management", "Social"], joined: "Sep 2023" },
  { id: 5, name: "Lune Cafe", plan: "Starter Plan", status: "Active", pending: 0, location: "Toronto", services: ["Social Media"], joined: "Nov 2023" },
  { id: 6, name: "Birchfield Co.", plan: "Starter Plan", status: "Onboarding", pending: 0, location: "Ottawa", services: ["Web Design", "Social"], joined: "Jul 2025" },
  { id: 7, name: "Meridian Foods", plan: "Growth Plan", status: "Active", pending: 2, location: "Ontario", services: ["Video", "Social"], joined: "Feb 2024" },
  { id: 8, name: "Apex Creative", plan: "Starter Plan", status: "Active", pending: 1, location: "Calgary", services: ["Brand Identity"], joined: "Apr 2024" },
  { id: 9, name: "Trove Interiors", plan: "Growth Plan", status: "Active", pending: 0, location: "Toronto", services: ["Brand", "Web"], joined: "May 2024" },
  { id: 10, name: "Harbor Digital", plan: "Enterprise", status: "Active", pending: 0, location: "Toronto", services: ["Web App", "Brand"], joined: "Aug 2024" },
  { id: 11, name: "Peak Athletics", plan: "Starter Plan", status: "Active", pending: 0, location: "Vancouver", services: ["Social Media"], joined: "Jan 2025" },
  { id: 12, name: "Dune & Co.", plan: "Enterprise", status: "Paused", pending: 0, location: "Toronto", services: ["Brand", "Social", "Web"], joined: "Mar 2025" },
];

const tabs: Tab[] = ["All", "Active", "Paused", "Onboarding"];

const tabCounts: Record<Tab, number> = {
  All: 12,
  Active: 10,
  Paused: 1,
  Onboarding: 1,
};

function getInitials(name: string): string {
  return name
    .split(" ")
    .map((w) => w[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);
}

function getAvatarBg(plan: Plan): string {
  switch (plan) {
    case "Growth Plan":
      return "bg-amber-20";
    case "Starter Plan":
      return "bg-ivory-10";
    case "Enterprise":
      return "bg-crimson-30";
  }
}

function getPlanBadge(plan: Plan): string {
  switch (plan) {
    case "Growth Plan":
      return "bg-amber text-graphite";
    case "Starter Plan":
      return "bg-ivory-10 text-ivory-60";
    case "Enterprise":
      return "bg-crimson text-ivory";
  }
}

function getStatusBadge(status: Status): string {
  switch (status) {
    case "Active":
      return "bg-emerald-500/15 text-emerald-400";
    case "Paused":
      return "bg-ivory-30 text-ivory-60";
    case "Onboarding":
      return "bg-amber-10 text-amber";
  }
}

export default function AdminClientsPage() {
  const [activeTab, setActiveTab] = useState<Tab>("All");
  const [search, setSearch] = useState("");

  const filtered = clients.filter((c) => {
    const matchesTab = activeTab === "All" || c.status === activeTab;
    const matchesSearch =
      search === "" ||
      c.name.toLowerCase().includes(search.toLowerCase()) ||
      c.location.toLowerCase().includes(search.toLowerCase()) ||
      c.services.some((s) => s.toLowerCase().includes(search.toLowerCase()));
    return matchesTab && matchesSearch;
  });

  return (
    <div className="flex flex-col h-full">
      {/* Top bar */}
      <div className="flex items-center justify-between h-[68px] min-h-[68px] px-6 border-b border-ivory-05">
        <div>
          <h1 className="font-display font-semibold text-lg text-ivory">
            Clients
          </h1>
          <p className="text-xs text-ivory-30">12 total clients</p>
        </div>
        <div className="flex items-center gap-3">
          <input
            type="text"
            placeholder="Search clients..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-[240px] h-9 px-3 text-sm text-ivory bg-ivory-05 border border-ivory-10 rounded-[2px] placeholder:text-ivory-30 outline-none focus:border-ivory-30 transition font-body"
          />
          <button className="h-9 px-4 bg-amber text-graphite text-sm font-body font-medium rounded-[2px] hover:opacity-90 transition cursor-pointer">
            + Add Client
          </button>
        </div>
      </div>

      {/* Filter tabs */}
      <div className="flex items-center gap-6 px-6 border-b border-ivory-05">
        {tabs.map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`relative py-3 text-sm font-body transition cursor-pointer ${
              activeTab === tab
                ? "text-ivory"
                : "text-ivory-30 hover:text-ivory"
            }`}
          >
            {tab}{" "}
            <span
              className={
                activeTab === tab ? "text-ivory-60" : "text-ivory-30"
              }
            >
              ({tabCounts[tab]})
            </span>
            {activeTab === tab && (
              <span className="absolute bottom-0 left-0 right-0 h-[2px] bg-amber" />
            )}
          </button>
        ))}
      </div>

      {/* Client list */}
      <div className="flex-1 overflow-y-auto">
        {filtered.map((client) => (
          <div
            key={client.id}
            className="flex items-center py-4 px-6 border-b border-ivory-05 hover:bg-ivory-05 transition"
          >
            {/* Avatar */}
            <div
              className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 ${getAvatarBg(client.plan)}`}
            >
              <span className="font-display font-semibold text-xs text-ivory">
                {getInitials(client.name)}
              </span>
            </div>

            {/* Name + Location */}
            <div className="ml-3 min-w-[140px]">
              <p className="font-display font-semibold text-sm text-ivory">
                {client.name}
              </p>
              <p className="text-xs text-ivory-30">{client.location}</p>
            </div>

            {/* Plan badge */}
            <div className="ml-6 min-w-[90px]">
              <span
                className={`text-[10px] px-2 py-0.5 rounded-[1px] font-body ${getPlanBadge(client.plan)}`}
              >
                {client.plan}
              </span>
            </div>

            {/* Status badge */}
            <div className="ml-4 min-w-[90px]">
              <span
                className={`text-[10px] px-2 py-0.5 rounded-[1px] font-body ${getStatusBadge(client.status)}`}
              >
                {client.status}
              </span>
            </div>

            {/* Services */}
            <div className="ml-4 min-w-[140px]">
              <p className="text-xs text-ivory-30">
                {client.services.join(", ")}
              </p>
            </div>

            {/* Pending */}
            <div className="ml-4 min-w-[90px]">
              {client.pending > 0 ? (
                <span className="flex items-center gap-1.5 text-xs text-amber">
                  <span className="w-1.5 h-1.5 rounded-full bg-amber" />
                  {client.pending} pending
                </span>
              ) : (
                <span className="text-xs text-ivory-30">All clear</span>
              )}
            </div>

            {/* Joined */}
            <div className="ml-4 min-w-[80px]">
              <p className="text-xs text-ivory-30">{client.joined}</p>
            </div>

            {/* Actions */}
            <div className="ml-auto flex items-center gap-3">
              <Link
                href={`/admin/clients/${client.id}`}
                className="text-[11px] text-amber hover:underline font-body"
              >
                View
              </Link>
              <button className="text-ivory-30 hover:text-ivory transition text-lg leading-none cursor-pointer">
                ...
              </button>
            </div>
          </div>
        ))}

        {filtered.length === 0 && (
          <div className="flex items-center justify-center py-20">
            <p className="text-sm text-ivory-30">No clients found.</p>
          </div>
        )}
      </div>
    </div>
  );
}
