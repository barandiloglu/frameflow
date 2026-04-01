"use client";

import { useState } from "react";

type Tab = "All" | "Pending" | "Approved" | "Needs Revision";

const tabs: Tab[] = ["All", "Pending", "Approved", "Needs Revision"];

interface ApprovalCard {
  id: string;
  platform: string;
  platformColor: string;
  date: string;
  title: string;
  caption: string;
  status: "Pending" | "Approved" | "Needs Revision";
}

const cards: ApprovalCard[] = [
  {
    id: "#SMM-041",
    platform: "Instagram",
    platformColor: "bg-amber",
    date: "Jul 3",
    title: "Summer Menu Feature",
    caption:
      "New croissant drop this weekend! Flaky, buttery, and baked fresh every morning. Swing by and grab one before they're gone. #AcadiaBakes #CroissantSeason #FreshBaked",
    status: "Pending",
  },
  {
    id: "#SMM-042",
    platform: "Facebook",
    platformColor: "bg-ember",
    date: "Jul 4",
    title: "Client Testimonial Carousel",
    caption:
      "\"Acadia Bakes makes the best sourdough in town!\" — See what our customers are saying. Swipe through for more reviews from our community.",
    status: "Pending",
  },
  {
    id: "#SMM-043",
    platform: "Instagram",
    platformColor: "bg-amber",
    date: "Jul 5",
    title: "Behind the Scenes Reel",
    caption:
      "Early mornings at the bakery. Watch our team prep, shape, and bake everything from scratch. Real food, real people, real good. #BehindTheScenes",
    status: "Pending",
  },
];

function statusPillClass(status: string) {
  switch (status) {
    case "Pending":
      return "bg-amber-20 text-amber";
    case "Approved":
      return "bg-ivory-10 text-ivory";
    case "Needs Revision":
      return "bg-ember-15 text-ember";
    default:
      return "bg-ivory-10 text-ivory-60";
  }
}

export default function ApprovalsPage() {
  const [activeTab, setActiveTab] = useState<Tab>("Pending");
  const [feedbackOpen, setFeedbackOpen] = useState<string | null>(null);
  const [feedbackText, setFeedbackText] = useState<Record<string, string>>({});

  const filtered =
    activeTab === "All" ? cards : cards.filter((c) => c.status === activeTab);

  return (
    <div className="flex-1 flex flex-col overflow-hidden">
      {/* Top bar */}
      <header className="shrink-0 flex items-center justify-between px-8 py-5 border-b border-ivory-05">
        <div>
          <h1 className="font-display font-bold text-xl text-ivory">Approvals</h1>
          <p className="text-sm font-body text-ivory-30 mt-0.5">Review and approve your content</p>
        </div>
      </header>

      {/* Tabs */}
      <div className="shrink-0 px-8 pt-4 flex items-center gap-1">
        {tabs.map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-4 py-2 text-sm font-body font-semibold rounded-t-[2px] transition-colors ${
              activeTab === tab
                ? "bg-ivory-05 text-ivory border-b-2 border-amber"
                : "text-ivory-30 hover:text-ivory hover:bg-ivory-05/50"
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Scrollable content */}
      <div className="flex-1 overflow-y-auto px-8 py-6 space-y-4">
        {/* Banner */}
        <div className="flex items-center justify-between rounded-[2px] border border-amber-20 bg-amber-10 px-5 py-3.5">
          <div className="flex items-center gap-3">
            <span className="relative flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber opacity-75" />
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-amber" />
            </span>
            <p className="text-sm font-body text-ivory">
              You have <span className="font-semibold text-amber">3 posts</span> pending approval
            </p>
          </div>
          <button className="px-4 py-1.5 text-xs font-body font-semibold rounded-[1px] bg-amber text-graphite hover:brightness-110 transition">
            Approve All
          </button>
        </div>

        {/* Cards */}
        {filtered.map((card) => (
          <div
            key={card.id}
            className="rounded-[2px] border border-ivory-05 bg-ivory-05/50 overflow-hidden"
          >
            {/* Card header */}
            <div className="flex items-center justify-between px-5 py-3 border-b border-ivory-05">
              <div className="flex items-center gap-3">
                <span className="text-xs font-body font-mono text-ivory-30">{card.id}</span>
                <span className={`w-2 h-2 rounded-full ${card.platformColor}`} />
                <span className="text-xs font-body text-ivory-60">{card.platform}</span>
                <span className="text-xs font-body text-ivory-30">{card.date}</span>
              </div>
              <span
                className={`px-2.5 py-0.5 text-[10px] font-semibold font-body rounded-full ${statusPillClass(
                  card.status
                )}`}
              >
                {card.status}
              </span>
            </div>

            {/* Card body */}
            <div className="flex">
              {/* Preview placeholder */}
              <div className="w-[200px] shrink-0 bg-ivory-05 flex items-center justify-center border-r border-ivory-05">
                <svg width="64" height="64" viewBox="0 0 64 64" className="text-ivory-10">
                  <defs>
                    <pattern id={`prev-${card.id}`} width="8" height="8" patternUnits="userSpaceOnUse">
                      <rect width="8" height="8" fill="none" />
                      <rect width="4" height="4" fill="currentColor" />
                    </pattern>
                  </defs>
                  <rect width="64" height="64" rx="8" fill={`url(#prev-${card.id})`} />
                </svg>
              </div>

              {/* Info */}
              <div className="flex-1 p-5 space-y-3">
                <h3 className="font-display font-semibold text-base text-ivory">{card.title}</h3>
                <p className="text-sm font-body text-ivory-60 leading-relaxed">{card.caption}</p>
                <div className="flex items-center gap-4 text-[11px] font-body text-ivory-30">
                  <span>Format: Single Image</span>
                  <span>Hashtags: 3</span>
                  <span>Scheduled: {card.date}, 2025</span>
                </div>

                {/* Actions */}
                <div className="flex items-center gap-2 pt-2">
                  <button className="px-4 py-2 text-xs font-body font-semibold rounded-[1px] bg-amber text-graphite hover:brightness-110 transition">
                    Approve
                  </button>
                  <button
                    onClick={() =>
                      setFeedbackOpen(feedbackOpen === card.id ? null : card.id)
                    }
                    className="px-4 py-2 text-xs font-body font-semibold rounded-[1px] border border-ivory-10 text-ivory-60 hover:text-ivory hover:border-ivory-30 transition-colors"
                  >
                    Request Changes
                  </button>
                </div>

                {/* Feedback area */}
                {feedbackOpen === card.id && (
                  <div className="mt-3 space-y-2">
                    <textarea
                      value={feedbackText[card.id] || ""}
                      onChange={(e) =>
                        setFeedbackText({ ...feedbackText, [card.id]: e.target.value })
                      }
                      placeholder="Describe the changes you'd like..."
                      className="w-full h-24 px-3 py-2 text-sm font-body rounded-[1px] bg-graphite border border-ivory-10 text-ivory placeholder:text-ivory-30 focus:outline-none focus:border-amber resize-none"
                    />
                    <div className="flex items-center gap-2">
                      <button className="px-4 py-1.5 text-xs font-body font-semibold rounded-[1px] bg-ember text-ivory hover:brightness-110 transition">
                        Submit Feedback
                      </button>
                      <button
                        onClick={() => setFeedbackOpen(null)}
                        className="px-4 py-1.5 text-xs font-body font-semibold rounded-[1px] text-ivory-30 hover:text-ivory transition-colors"
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
