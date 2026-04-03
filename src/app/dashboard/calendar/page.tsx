"use client";

import { useState } from "react";

type Post = { title: string; platform: "ig" | "fb" | "tk"; status: "pending" | "approved" | "needs" };

const postsByDate: Record<number, Post[]> = {
  1: [{ title: "Monthly Recap", platform: "fb", status: "approved" }],
  3: [{ title: "Summer Menu Feature", platform: "ig", status: "pending" }],
  4: [{ title: "Testimonial Carousel", platform: "fb", status: "approved" }],
  5: [{ title: "BTS Reel", platform: "ig", status: "needs" }],
  7: [{ title: "Recipe Short", platform: "tk", status: "pending" }],
  8: [{ title: "Weekend Promo", platform: "ig", status: "pending" }],
  10: [{ title: "Product Flat Lay", platform: "ig", status: "approved" }],
  14: [{ title: "Monday Motivation", platform: "fb", status: "approved" }, { title: "Story Poll", platform: "ig", status: "approved" }],
  15: [{ title: "Baking Tutorial Pt.1", platform: "tk", status: "pending" }],
  17: [{ title: "Customer Spotlight", platform: "ig", status: "approved" }],
  21: [{ title: "New Item Teaser", platform: "ig", status: "pending" }],
  22: [{ title: "Community Post", platform: "fb", status: "approved" }],
  24: [{ title: "Recipe Short Pt.2", platform: "tk", status: "needs" }],
  28: [{ title: "End of Month Wrap", platform: "ig", status: "approved" }, { title: "Flash Sale Post", platform: "fb", status: "pending" }],
};

const platformStyles: Record<string, { border: string; bg: string; dot: string }> = {
  ig: { border: "border-l-amber", bg: "bg-amber-10", dot: "bg-amber" },
  fb: { border: "border-l-on-surface-30", bg: "bg-on-surface-10", dot: "bg-on-surface-30" },
  tk: { border: "border-l-on-surface-60", bg: "bg-on-surface-05", dot: "bg-on-surface-60" },
};

const statusDots: Record<string, string> = {
  pending: "bg-amber",
  approved: "bg-green-500",
  needs: "bg-amber",
};

const DAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

function getJuly2025() {
  // July 2025: starts on Tuesday (index 2), 31 days
  const startDay = 2;
  const totalDays = 31;
  const cells: (number | null)[] = [];
  for (let i = 0; i < startDay; i++) cells.push(null);
  for (let d = 1; d <= totalDays; d++) cells.push(d);
  while (cells.length % 7 !== 0) cells.push(null);
  return cells;
}

const platforms = ["All", "Instagram", "Facebook", "TikTok"] as const;
const platformMap: Record<string, "ig" | "fb" | "tk"> = {
  Instagram: "ig",
  Facebook: "fb",
  TikTok: "tk",
};

export default function CalendarPage() {
  const [view, setView] = useState<"Month" | "Week">("Month");
  const [filter, setFilter] = useState<string>("All");
  const cells = getJuly2025();
  const today = 28; // highlight a sample "today"

  return (
    <div className="flex-1 flex flex-col overflow-hidden bg-surface">
      {/* Top bar */}
      <header className="shrink-0 flex items-center justify-between px-8 py-5 border-b border-border-subtle">
        <div>
          <h1 className="font-display font-bold text-xl text-on-surface">Schedule</h1>
          <p className="text-sm font-body text-on-surface-30 mt-0.5">July 2025</p>
        </div>
      </header>

      {/* Controls */}
      <div className="shrink-0 px-8 py-4 flex items-center justify-between border-b border-border-subtle">
        <div className="flex items-center gap-3">
          {/* Prev / Next */}
          <button className="p-1.5 rounded-[1px] hover:bg-on-surface-05 text-on-surface-30 hover:text-on-surface transition-colors">
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M10 3L5 8L10 13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
          <span className="font-display font-semibold text-sm text-on-surface min-w-[110px] text-center">July 2025</span>
          <button className="p-1.5 rounded-[1px] hover:bg-on-surface-05 text-on-surface-30 hover:text-on-surface transition-colors">
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M6 3L11 8L6 13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
          <button className="ml-2 px-3 py-1 text-xs font-body font-semibold rounded-[1px] border border-on-surface-10 text-on-surface-60 hover:text-on-surface hover:border-on-surface-30 transition-colors">
            Today
          </button>
          {/* View toggle */}
          <div className="ml-3 flex rounded-[1px] border border-on-surface-10 overflow-hidden">
            {(["Month", "Week"] as const).map((v) => (
              <button
                key={v}
                onClick={() => setView(v)}
                className={`px-3 py-1 text-xs font-body font-semibold transition-colors ${
                  view === v ? "bg-on-surface-10 text-on-surface" : "text-on-surface-30 hover:text-on-surface"
                }`}
              >
                {v}
              </button>
            ))}
          </div>
        </div>
        {/* Platform filters */}
        <div className="flex items-center gap-1.5">
          {platforms.map((p) => (
            <button
              key={p}
              onClick={() => setFilter(p)}
              className={`px-3 py-1 text-xs font-body font-semibold rounded-full transition-colors ${
                filter === p
                  ? "bg-amber-20 text-amber"
                  : "text-on-surface-30 hover:text-on-surface hover:bg-on-surface-05"
              }`}
            >
              {p}
            </button>
          ))}
        </div>
      </div>

      {/* Calendar grid */}
      <div className="flex-1 overflow-y-auto px-8 py-4">
        {/* Day headers */}
        <div className="grid grid-cols-7 mb-1">
          {DAYS.map((d) => (
            <div key={d} className="text-center text-[10px] font-body font-semibold text-on-surface-30 uppercase tracking-wider py-2">
              {d}
            </div>
          ))}
        </div>
        {/* Cells */}
        <div className="grid grid-cols-7 border-t border-l border-border-subtle">
          {cells.map((day, i) => {
            const isToday = day === today;
            const dayPosts = day ? postsByDate[day] || [] : [];
            const filtered =
              filter === "All"
                ? dayPosts
                : dayPosts.filter((p) => p.platform === platformMap[filter]);

            return (
              <div
                key={i}
                className={`min-h-[100px] border-r border-b border-border-subtle p-1.5 ${
                  isToday ? "bg-amber-10" : ""
                } ${day ? "" : "bg-on-surface-05"}`}
              >
                {day && (
                  <>
                    <span
                      className={`inline-block text-xs font-body mb-1 px-1 rounded ${
                        isToday ? "font-bold text-amber" : "text-on-surface-30"
                      }`}
                    >
                      {day}
                    </span>
                    <div className="space-y-1">
                      {filtered.map((post, j) => {
                        const ps = platformStyles[post.platform];
                        return (
                          <div
                            key={j}
                            className={`rounded px-1.5 py-0.5 border-l-2 ${ps.border} ${ps.bg} flex items-center gap-1`}
                          >
                            <span className={`w-1.5 h-1.5 rounded-full shrink-0 ${statusDots[post.status]}`} />
                            <span className="text-[10px] font-body text-on-surface truncate leading-tight">
                              {post.title}
                            </span>
                          </div>
                        );
                      })}
                    </div>
                  </>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
