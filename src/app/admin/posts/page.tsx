"use client";

import { useState } from "react";

type Status = "Published" | "Scheduled" | "Draft" | "Needs Review";
type Platform = "Instagram" | "Facebook" | "TikTok";
type Tab = "All" | "Scheduled" | "Published" | "Drafts" | "Needs Review";

interface Post {
  id: number;
  title: string;
  client: string;
  platform: Platform;
  status: Status;
  scheduledDate: string | null;
}

const posts: Post[] = [
  { id: 1, title: "Summer Menu Feature", client: "Acadia Bakes", platform: "Instagram", status: "Scheduled", scheduledDate: "Jul 3, 2025" },
  { id: 2, title: "Client Testimonial Carousel", client: "Acadia Bakes", platform: "Facebook", status: "Published", scheduledDate: "Jul 1, 2025" },
  { id: 3, title: "Behind the Scenes Reel", client: "Acadia Bakes", platform: "Instagram", status: "Needs Review", scheduledDate: "Jul 5, 2025" },
  { id: 4, title: "Q3 Campaign Launch", client: "Velour Collective", platform: "Instagram", status: "Scheduled", scheduledDate: "Jul 8, 2025" },
  { id: 5, title: "Product Flat Lay Series", client: "Meridian Foods", platform: "Instagram", status: "Draft", scheduledDate: null },
  { id: 6, title: "Website Launch Announcement", client: "Nomad Studio", platform: "Facebook", status: "Published", scheduledDate: "Jun 28, 2025" },
  { id: 7, title: "Meta Ads Creative Set", client: "Sola Health", platform: "Facebook", status: "Scheduled", scheduledDate: "Jul 10, 2025" },
  { id: 8, title: "Recipe Short \u2014 Croissant", client: "Acadia Bakes", platform: "TikTok", status: "Draft", scheduledDate: null },
  { id: 9, title: "Brand Reveal Video", client: "Apex Creative", platform: "Instagram", status: "Needs Review", scheduledDate: "Jul 12, 2025" },
  { id: 10, title: "Monthly Recap \u2014 June", client: "Lune Caf\u00e9", platform: "Instagram", status: "Published", scheduledDate: "Jun 30, 2025" },
];

const tabs: { label: Tab; count: number }[] = [
  { label: "All", count: 142 },
  { label: "Scheduled", count: 23 },
  { label: "Published", count: 98 },
  { label: "Drafts", count: 12 },
  { label: "Needs Review", count: 9 },
];

function getPlatformDotColor(platform: Platform): string {
  switch (platform) {
    case "Instagram":
      return "bg-amber";
    case "Facebook":
      return "bg-ivory-30";
    case "TikTok":
      return "bg-ivory-60";
  }
}

function getStatusStyle(status: Status): string {
  switch (status) {
    case "Published":
      return "bg-emerald-500/15 text-emerald-400";
    case "Scheduled":
      return "bg-amber-10 text-amber";
    case "Draft":
      return "bg-ivory-05 text-ivory-30";
    case "Needs Review":
      return "bg-amber-10 text-amber";
  }
}

function tabMatchesStatus(tab: Tab, status: Status): boolean {
  if (tab === "All") return true;
  if (tab === "Drafts") return status === "Draft";
  return tab === status;
}

export default function AllPostsPage() {
  const [activeTab, setActiveTab] = useState<Tab>("All");
  const [platformFilter, setPlatformFilter] = useState<string>("All");
  const [statusFilter, setStatusFilter] = useState<string>("All");
  const [search, setSearch] = useState("");

  const filteredPosts = posts.filter((post) => {
    if (!tabMatchesStatus(activeTab, post.status)) return false;
    if (platformFilter !== "All" && post.platform !== platformFilter) return false;
    if (statusFilter !== "All" && post.status !== statusFilter) return false;
    if (search && !post.title.toLowerCase().includes(search.toLowerCase()) && !post.client.toLowerCase().includes(search.toLowerCase())) return false;
    return true;
  });

  return (
    <div className="flex-1 flex flex-col overflow-hidden">
      {/* Top bar */}
      <header className="shrink-0 h-[68px] flex items-center justify-between px-8 border-b border-ivory-05">
        <div>
          <h1 className="font-display font-bold text-xl text-ivory">All Posts</h1>
          <p className="text-sm font-body text-ivory-30 mt-0.5">142 total posts</p>
        </div>
        <div className="flex items-center gap-3">
          {/* Search */}
          <div className="relative">
            <svg
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="none"
              className="absolute left-2.5 top-1/2 -translate-y-1/2 text-ivory-30"
            >
              <circle cx="7" cy="7" r="5" stroke="currentColor" strokeWidth="1.5" />
              <path d="M11 11L14 14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
            </svg>
            <input
              type="text"
              placeholder="Search posts..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-[240px] pl-8 pr-3 py-2 rounded-[2px] border border-ivory-05 bg-ivory-05/50 text-sm font-body text-ivory placeholder:text-ivory-30 focus:outline-none focus:border-amber transition-colors"
            />
          </div>

          {/* Platform filter */}
          <select
            value={platformFilter}
            onChange={(e) => setPlatformFilter(e.target.value)}
            className="px-3 py-2 rounded-[2px] border border-ivory-05 bg-ivory-05/50 text-sm font-body text-ivory focus:outline-none focus:border-amber transition-colors appearance-none cursor-pointer"
          >
            <option value="All">Platform: All</option>
            <option value="Instagram">Instagram</option>
            <option value="Facebook">Facebook</option>
            <option value="TikTok">TikTok</option>
          </select>

          {/* Status filter */}
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-3 py-2 rounded-[2px] border border-ivory-05 bg-ivory-05/50 text-sm font-body text-ivory focus:outline-none focus:border-amber transition-colors appearance-none cursor-pointer"
          >
            <option value="All">Status: All</option>
            <option value="Published">Published</option>
            <option value="Scheduled">Scheduled</option>
            <option value="Draft">Draft</option>
            <option value="Needs Review">Needs Review</option>
          </select>

          {/* New Post button */}
          <button className="px-4 py-2 rounded-[2px] bg-amber text-graphite text-sm font-body font-semibold hover:bg-amber/90 transition-colors flex items-center gap-1.5">
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <path d="M7 2V12M2 7H12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            </svg>
            New Post
          </button>
        </div>
      </header>

      {/* Tabs */}
      <div className="shrink-0 flex items-center gap-0 px-8 border-b border-ivory-05">
        {tabs.map((tab) => (
          <button
            key={tab.label}
            onClick={() => setActiveTab(tab.label)}
            className={`relative px-4 py-3 text-sm font-body transition-colors ${
              activeTab === tab.label
                ? "text-amber"
                : "text-ivory-30 hover:text-ivory"
            }`}
          >
            {tab.label}
            <span
              className={`ml-1.5 text-xs ${
                activeTab === tab.label ? "text-amber" : "text-ivory-30"
              }`}
            >
              {tab.count}
            </span>
            {activeTab === tab.label && (
              <span className="absolute bottom-0 left-0 right-0 h-[2px] bg-amber" />
            )}
          </button>
        ))}
      </div>

      {/* Posts table */}
      <div className="flex-1 overflow-y-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-ivory-05">
              <th className="text-left text-[10px] uppercase tracking-wider text-ivory-30 font-body font-normal py-3 px-6">
                Post
              </th>
              <th className="text-left text-[10px] uppercase tracking-wider text-ivory-30 font-body font-normal py-3 px-6">
                Client
              </th>
              <th className="text-left text-[10px] uppercase tracking-wider text-ivory-30 font-body font-normal py-3 px-6">
                Platform
              </th>
              <th className="text-left text-[10px] uppercase tracking-wider text-ivory-30 font-body font-normal py-3 px-6">
                Status
              </th>
              <th className="text-left text-[10px] uppercase tracking-wider text-ivory-30 font-body font-normal py-3 px-6">
                Scheduled Date
              </th>
              <th className="text-left text-[10px] uppercase tracking-wider text-ivory-30 font-body font-normal py-3 px-6">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {filteredPosts.map((post) => (
              <tr
                key={post.id}
                className="border-b border-ivory-05 hover:bg-ivory-05 transition"
              >
                <td className="py-3.5 px-6">
                  <span className="font-body text-sm text-ivory">{post.title}</span>
                </td>
                <td className="py-3.5 px-6">
                  <span className="text-xs text-ivory-30 font-body">{post.client}</span>
                </td>
                <td className="py-3.5 px-6">
                  <div className="flex items-center gap-2">
                    <span
                      className={`w-2 h-2 rounded-full shrink-0 ${getPlatformDotColor(post.platform)}`}
                    />
                    <span className="text-xs text-ivory-60 font-body">{post.platform}</span>
                  </div>
                </td>
                <td className="py-3.5 px-6">
                  <span
                    className={`inline-block text-[10px] px-2 py-0.5 rounded-[1px] font-body ${getStatusStyle(post.status)}`}
                  >
                    {post.status}
                  </span>
                </td>
                <td className="py-3.5 px-6">
                  <span className="text-xs text-ivory-30 font-body">
                    {post.scheduledDate ?? "\u2014"}
                  </span>
                </td>
                <td className="py-3.5 px-6">
                  <div className="flex items-center gap-3">
                    <button className="text-amber text-xs font-body hover:text-amber/80 transition-colors">
                      Edit
                    </button>
                    <button className="text-ivory-30 hover:text-ivory transition-colors">
                      <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                        <circle cx="8" cy="3" r="1.25" fill="currentColor" />
                        <circle cx="8" cy="8" r="1.25" fill="currentColor" />
                        <circle cx="8" cy="13" r="1.25" fill="currentColor" />
                      </svg>
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
