"use client";

import { ThemeToggle } from "@/components/ThemeToggle";

const stats = [
  { label: "Total Posts", value: "24", sub: "This month", badge: null, badgeColor: "" },
  { label: "Pending Review", value: "3", sub: null, badge: "3 awaiting", badgeColor: "bg-amber-20 text-amber" },
  { label: "Approved", value: "18", sub: null, badge: "on schedule", badgeColor: "bg-on-surface-10 text-on-surface-60" },
  { label: "Needs Edits", value: "2", sub: null, badge: "action needed", badgeColor: "bg-amber-10 text-amber" },
];

const posts = [
  { platform: "Instagram", color: "bg-amber", title: "Summer Menu Feature", date: "Jul 3", status: "Pending" },
  { platform: "Facebook", color: "bg-on-surface-30", title: "Client Testimonial Carousel", date: "Jul 4", status: "Approved" },
  { platform: "Instagram", color: "bg-amber", title: "Behind the Scenes Reel", date: "Jul 5", status: "Needs Edits" },
  { platform: "TikTok", color: "bg-on-surface", title: "Recipe Short — Croissant", date: "Jul 7", status: "Draft" },
  { platform: "Instagram", color: "bg-amber", title: "Weekend Special Promo", date: "Jul 8", status: "Pending" },
];

const activities = [
  { text: "Summer Menu Feature moved to Pending Review", time: "2 hours ago" },
  { text: "Client Testimonial Carousel was approved", time: "5 hours ago" },
  { text: "Behind the Scenes Reel received edit request", time: "Yesterday" },
  { text: "Recipe Short — Croissant draft uploaded", time: "Yesterday" },
  { text: "Weekly analytics report generated", time: "2 days ago" },
  { text: "New brand assets uploaded to library", time: "3 days ago" },
];

function statusPill(status: string) {
  const map: Record<string, string> = {
    Pending: "bg-amber-20 text-amber",
    Approved: "bg-on-surface-10 text-on-surface",
    "Needs Edits": "bg-amber-10 text-amber",
    Draft: "bg-on-surface-05 text-on-surface-30",
  };
  return map[status] || "bg-on-surface-10 text-on-surface-60";
}

export default function DashboardPage() {
  return (
    <div className="flex-1 flex flex-col overflow-hidden bg-surface">
      {/* Top bar */}
      <header className="shrink-0 flex items-center justify-between px-8 py-5 border-b border-border-subtle">
        <div>
          <h1 className="font-display font-bold text-xl text-on-surface">Dashboard</h1>
          <p className="text-sm font-body text-on-surface-30 mt-0.5">Welcome back, Acadia Bakes</p>
        </div>
        <div className="flex items-center gap-3">
          {/* Theme toggle */}
          <ThemeToggle />
          {/* Notification bell */}
          <button className="relative p-2 rounded-[1px] hover:bg-on-surface-05 transition-colors">
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
              <path d="M10 2C7.24 2 5 4.24 5 7V10.5L3.5 13H16.5L15 10.5V7C15 4.24 12.76 2 10 2Z" stroke="currentColor" strokeWidth="1.5" className="text-on-surface-60" strokeLinejoin="round" />
              <path d="M8 15C8 16.1 8.9 17 10 17C11.1 17 12 16.1 12 15" stroke="currentColor" strokeWidth="1.5" className="text-on-surface-60" strokeLinecap="round" />
            </svg>
            <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-amber" />
          </button>
          {/* Avatar */}
          <div className="w-9 h-9 rounded-full bg-amber-20 flex items-center justify-center">
            <span className="text-xs font-body font-semibold text-amber">AB</span>
          </div>
        </div>
      </header>

      {/* Scrollable content */}
      <div className="flex-1 overflow-y-auto px-8 py-6 space-y-6">
        {/* Stats row */}
        <div className="grid grid-cols-4 gap-4">
          {stats.map((s) => (
            <div
              key={s.label}
              className="rounded-[2px] border border-border-subtle bg-on-surface-05 p-5"
            >
              <p className="text-xs font-body text-on-surface-30 mb-1">{s.label}</p>
              <p className="font-display font-bold text-3xl text-on-surface">{s.value}</p>
              {s.sub && <p className="text-xs font-body text-on-surface-30 mt-1">{s.sub}</p>}
              {s.badge && (
                <span className={`inline-block mt-2 px-2 py-0.5 text-[10px] font-semibold font-body rounded-full ${s.badgeColor}`}>
                  {s.badge}
                </span>
              )}
            </div>
          ))}
        </div>

        {/* Lower grid */}
        <div className="grid gap-4" style={{ gridTemplateColumns: "1.4fr 1fr" }}>
          {/* Upcoming posts */}
          <div className="rounded-[2px] border border-border-subtle bg-on-surface-05 overflow-hidden">
            <div className="px-5 py-4 border-b border-border-subtle">
              <h2 className="font-display font-semibold text-sm text-on-surface">Upcoming Posts</h2>
            </div>
            <div className="divide-y divide-border-faint">
              {posts.map((p, i) => (
                <div key={i} className="flex items-center gap-4 px-5 py-3.5">
                  {/* Thumbnail placeholder */}
                  <div className="w-10 h-10 rounded-[2px] bg-on-surface-05 shrink-0 flex items-center justify-center overflow-hidden">
                    <svg width="20" height="20" viewBox="0 0 20 20" className="text-on-surface-10">
                      <defs>
                        <pattern id={`grid-${i}`} width="5" height="5" patternUnits="userSpaceOnUse">
                          <rect width="5" height="5" fill="none" />
                          <rect width="2" height="2" fill="currentColor" />
                        </pattern>
                      </defs>
                      <rect width="20" height="20" fill={`url(#grid-${i})`} />
                    </svg>
                  </div>
                  {/* Platform + title */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-1.5 mb-0.5">
                      <span className={`w-2 h-2 rounded-full ${p.color} shrink-0`} />
                      <span className="text-[10px] font-body text-on-surface-30">{p.platform}</span>
                    </div>
                    <p className="text-sm font-body text-on-surface truncate">{p.title}</p>
                  </div>
                  {/* Date */}
                  <span className="text-xs font-body text-on-surface-30 shrink-0">{p.date}</span>
                  {/* Status */}
                  <span className={`shrink-0 px-2.5 py-0.5 text-[10px] font-semibold font-body rounded-full ${statusPill(p.status)}`}>
                    {p.status}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Activity */}
          <div className="rounded-[2px] border border-border-subtle bg-on-surface-05 overflow-hidden">
            <div className="px-5 py-4 border-b border-border-subtle">
              <h2 className="font-display font-semibold text-sm text-on-surface">Activity</h2>
            </div>
            <div className="divide-y divide-border-faint">
              {activities.map((a, i) => (
                <div key={i} className="px-5 py-3.5 flex items-start gap-3">
                  <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-on-surface-10 shrink-0" />
                  <div className="min-w-0 flex-1">
                    <p className="text-sm font-body text-on-surface leading-snug">{a.text}</p>
                    <p className="text-[11px] font-body text-on-surface-30 mt-0.5">{a.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
