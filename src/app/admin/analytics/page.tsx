"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

const periods = ["7D", "30D", "90D", "12M"];

interface ClientAnalytics {
  stats: { label: string; value: string; change: string; positive: boolean }[];
  topPosts: { rank: number; title: string; platform: string; impressions: string; engagement: string }[];
  platforms: { name: string; posts: string; engagement: string; impressions: string; borderColor: string; barPercent: number }[];
}

const clients = [
  "All Clients",
  "Acadia Bakes",
  "Nomad Studio",
  "Velour Collective",
  "Sola Health",
  "Lune Café",
  "Birchfield Co.",
  "Meridian Foods",
  "Apex Creative",
  "Trove Interiors",
  "Harbor Digital",
  "Peak Athletics",
  "Dune & Co.",
];

const analyticsData: Record<string, ClientAnalytics> = {
  "All Clients": {
    stats: [
      { label: "Total Impressions", value: "284,521", change: "+18%", positive: true },
      { label: "Engagement Rate", value: "4.8%", change: "+0.6%", positive: true },
      { label: "New Followers", value: "1,247", change: "+23%", positive: true },
      { label: "Link Clicks", value: "3,891", change: "-5%", positive: false },
    ],
    topPosts: [
      { rank: 1, title: "Summer Menu Feature", platform: "Instagram", impressions: "12.4K", engagement: "8.2%" },
      { rank: 2, title: "Brand Reveal Video", platform: "Instagram", impressions: "9.8K", engagement: "7.1%" },
      { rank: 3, title: "Recipe Short", platform: "TikTok", impressions: "8.2K", engagement: "11.3%" },
      { rank: 4, title: "Q3 Campaign Launch", platform: "Instagram", impressions: "7.5K", engagement: "5.9%" },
      { rank: 5, title: "Client Testimonial", platform: "Facebook", impressions: "6.1K", engagement: "4.2%" },
    ],
    platforms: [
      { name: "Instagram", posts: "68%", engagement: "5.2%", impressions: "189K", borderColor: "border-amber", barPercent: 68 },
      { name: "Facebook", posts: "22%", engagement: "3.8%", impressions: "64K", borderColor: "border-ember", barPercent: 22 },
      { name: "TikTok", posts: "10%", engagement: "9.1%", impressions: "31K", borderColor: "border-ivory-60", barPercent: 10 },
    ],
  },
  "Acadia Bakes": {
    stats: [
      { label: "Total Impressions", value: "156,320", change: "+24%", positive: true },
      { label: "Engagement Rate", value: "6.2%", change: "+1.1%", positive: true },
      { label: "New Followers", value: "523", change: "+31%", positive: true },
      { label: "Link Clicks", value: "1,847", change: "+8%", positive: true },
    ],
    topPosts: [
      { rank: 1, title: "Summer Menu Feature", platform: "Instagram", impressions: "12.4K", engagement: "8.2%" },
      { rank: 2, title: "Recipe Short — Croissant", platform: "TikTok", impressions: "8.2K", engagement: "11.3%" },
      { rank: 3, title: "Client Testimonial Carousel", platform: "Facebook", impressions: "6.1K", engagement: "4.2%" },
      { rank: 4, title: "Behind the Scenes Reel", platform: "Instagram", impressions: "5.8K", engagement: "7.6%" },
      { rank: 5, title: "Weekend Special Promo", platform: "Instagram", impressions: "4.3K", engagement: "5.1%" },
    ],
    platforms: [
      { name: "Instagram", posts: "60%", engagement: "6.8%", impressions: "98K", borderColor: "border-amber", barPercent: 60 },
      { name: "Facebook", posts: "25%", engagement: "4.1%", impressions: "38K", borderColor: "border-ember", barPercent: 25 },
      { name: "TikTok", posts: "15%", engagement: "10.5%", impressions: "20K", borderColor: "border-ivory-60", barPercent: 15 },
    ],
  },
  "Velour Collective": {
    stats: [
      { label: "Total Impressions", value: "48,210", change: "+12%", positive: true },
      { label: "Engagement Rate", value: "5.1%", change: "+0.3%", positive: true },
      { label: "New Followers", value: "287", change: "+18%", positive: true },
      { label: "Link Clicks", value: "612", change: "-2%", positive: false },
    ],
    topPosts: [
      { rank: 1, title: "Q3 Campaign Launch", platform: "Instagram", impressions: "7.5K", engagement: "5.9%" },
      { rank: 2, title: "Summer Lookbook Carousel", platform: "Instagram", impressions: "5.2K", engagement: "6.3%" },
      { rank: 3, title: "New Arrivals Story", platform: "Instagram", impressions: "4.8K", engagement: "4.7%" },
      { rank: 4, title: "Brand Collab Announcement", platform: "Facebook", impressions: "3.1K", engagement: "3.2%" },
      { rank: 5, title: "Behind the Design", platform: "TikTok", impressions: "2.9K", engagement: "8.4%" },
    ],
    platforms: [
      { name: "Instagram", posts: "75%", engagement: "5.6%", impressions: "36K", borderColor: "border-amber", barPercent: 75 },
      { name: "Facebook", posts: "15%", engagement: "3.4%", impressions: "7K", borderColor: "border-ember", barPercent: 15 },
      { name: "TikTok", posts: "10%", engagement: "8.4%", impressions: "5K", borderColor: "border-ivory-60", barPercent: 10 },
    ],
  },
  "Sola Health": {
    stats: [
      { label: "Total Impressions", value: "28,450", change: "+15%", positive: true },
      { label: "Engagement Rate", value: "4.5%", change: "+0.8%", positive: true },
      { label: "New Followers", value: "156", change: "+11%", positive: true },
      { label: "Link Clicks", value: "891", change: "+22%", positive: true },
    ],
    topPosts: [
      { rank: 1, title: "Meta Ads Creative Set", platform: "Facebook", impressions: "4.8K", engagement: "3.9%" },
      { rank: 2, title: "Wellness Tips Carousel", platform: "Instagram", impressions: "3.6K", engagement: "5.7%" },
      { rank: 3, title: "Product Launch Reel", platform: "Instagram", impressions: "3.2K", engagement: "6.1%" },
      { rank: 4, title: "Customer Success Story", platform: "Facebook", impressions: "2.4K", engagement: "4.3%" },
      { rank: 5, title: "Monthly Health Challenge", platform: "Instagram", impressions: "1.9K", engagement: "5.8%" },
    ],
    platforms: [
      { name: "Instagram", posts: "55%", engagement: "5.5%", impressions: "16K", borderColor: "border-amber", barPercent: 55 },
      { name: "Facebook", posts: "45%", engagement: "3.8%", impressions: "12K", borderColor: "border-ember", barPercent: 45 },
      { name: "TikTok", posts: "0%", engagement: "—", impressions: "—", borderColor: "border-ivory-60", barPercent: 0 },
    ],
  },
  "Apex Creative": {
    stats: [
      { label: "Total Impressions", value: "32,180", change: "+28%", positive: true },
      { label: "Engagement Rate", value: "7.8%", change: "+2.1%", positive: true },
      { label: "New Followers", value: "198", change: "+45%", positive: true },
      { label: "Link Clicks", value: "342", change: "+12%", positive: true },
    ],
    topPosts: [
      { rank: 1, title: "Brand Reveal Video", platform: "Instagram", impressions: "9.8K", engagement: "7.1%" },
      { rank: 2, title: "Logo Process Timelapse", platform: "TikTok", impressions: "6.4K", engagement: "12.8%" },
      { rank: 3, title: "New Identity Showcase", platform: "Instagram", impressions: "4.1K", engagement: "6.9%" },
      { rank: 4, title: "Before & After Rebrand", platform: "Instagram", impressions: "3.7K", engagement: "8.2%" },
      { rank: 5, title: "Design Philosophy Post", platform: "Facebook", impressions: "2.2K", engagement: "3.5%" },
    ],
    platforms: [
      { name: "Instagram", posts: "70%", engagement: "7.4%", impressions: "23K", borderColor: "border-amber", barPercent: 70 },
      { name: "Facebook", posts: "10%", engagement: "3.5%", impressions: "3K", borderColor: "border-ember", barPercent: 10 },
      { name: "TikTok", posts: "20%", engagement: "12.8%", impressions: "6K", borderColor: "border-ivory-60", barPercent: 20 },
    ],
  },
  "Lune Café": {
    stats: [
      { label: "Total Impressions", value: "21,340", change: "+9%", positive: true },
      { label: "Engagement Rate", value: "3.9%", change: "-0.2%", positive: false },
      { label: "New Followers", value: "98", change: "+7%", positive: true },
      { label: "Link Clicks", value: "215", change: "-8%", positive: false },
    ],
    topPosts: [
      { rank: 1, title: "Monthly Recap — June", platform: "Instagram", impressions: "3.8K", engagement: "4.6%" },
      { rank: 2, title: "Latte Art Series", platform: "Instagram", impressions: "3.1K", engagement: "5.2%" },
      { rank: 3, title: "New Summer Drinks", platform: "Instagram", impressions: "2.6K", engagement: "3.8%" },
      { rank: 4, title: "Café Vibes Reel", platform: "TikTok", impressions: "2.1K", engagement: "7.3%" },
      { rank: 5, title: "Community Event Recap", platform: "Facebook", impressions: "1.4K", engagement: "2.9%" },
    ],
    platforms: [
      { name: "Instagram", posts: "65%", engagement: "4.5%", impressions: "14K", borderColor: "border-amber", barPercent: 65 },
      { name: "Facebook", posts: "20%", engagement: "2.8%", impressions: "4K", borderColor: "border-ember", barPercent: 20 },
      { name: "TikTok", posts: "15%", engagement: "7.3%", impressions: "3K", borderColor: "border-ivory-60", barPercent: 15 },
    ],
  },
};

const platformDotColors: Record<string, string> = {
  Instagram: "bg-amber",
  TikTok: "bg-ivory-60",
  Facebook: "bg-ember",
};

function getClientData(client: string): ClientAnalytics {
  if (analyticsData[client]) return analyticsData[client];
  return {
    stats: [
      { label: "Total Impressions", value: "0", change: "—", positive: true },
      { label: "Engagement Rate", value: "0%", change: "—", positive: true },
      { label: "New Followers", value: "0", change: "—", positive: true },
      { label: "Link Clicks", value: "0", change: "—", positive: true },
    ],
    topPosts: [],
    platforms: [
      { name: "Instagram", posts: "0%", engagement: "—", impressions: "—", borderColor: "border-amber", barPercent: 0 },
      { name: "Facebook", posts: "0%", engagement: "—", impressions: "—", borderColor: "border-ember", barPercent: 0 },
      { name: "TikTok", posts: "0%", engagement: "—", impressions: "—", borderColor: "border-ivory-60", barPercent: 0 },
    ],
  };
}

const clientPerformance = [
  { name: "Acadia Bakes", impressions: "156K", engagement: "6.2%", bar: 85 },
  { name: "Velour Collective", impressions: "48K", engagement: "5.1%", bar: 55 },
  { name: "Apex Creative", impressions: "32K", engagement: "7.8%", bar: 45 },
  { name: "Sola Health", impressions: "28K", engagement: "4.5%", bar: 35 },
  { name: "Lune Café", impressions: "21K", engagement: "3.9%", bar: 25 },
];

/* ── Animated number that counts up when value changes ── */
function AnimatedValue({ value }: { value: string }) {
  const [display, setDisplay] = useState(value);
  const prevRef = useRef(value);

  useEffect(() => {
    if (prevRef.current === value) return;
    prevRef.current = value;

    // Extract number from string like "284,521" or "4.8%" or "1,247"
    const cleaned = value.replace(/[^0-9.]/g, "");
    const target = parseFloat(cleaned);
    if (isNaN(target)) {
      setDisplay(value);
      return;
    }

    const prevCleaned = display.replace(/[^0-9.]/g, "");
    const start = parseFloat(prevCleaned) || 0;
    const duration = 600;
    const startTime = performance.now();
    const isDecimal = value.includes(".") && !value.includes(",");
    const prefix = value.match(/^[^0-9]*/)?.[0] || "";
    const suffix = value.match(/[^0-9.]*$/)?.[0] || "";
    const hasCommas = value.includes(",");

    const step = (now: number) => {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      // Ease out cubic
      const eased = 1 - Math.pow(1 - progress, 3);
      const current = start + (target - start) * eased;

      let formatted: string;
      if (isDecimal) {
        formatted = current.toFixed(1);
      } else {
        const rounded = Math.round(current);
        formatted = hasCommas ? rounded.toLocaleString() : String(rounded);
      }

      setDisplay(prefix + formatted + suffix);

      if (progress < 1) {
        requestAnimationFrame(step);
      } else {
        setDisplay(value);
      }
    };

    requestAnimationFrame(step);
  }, [value]);

  return <>{display}</>;
}

export default function AnalyticsPage() {
  const [activePeriod, setActivePeriod] = useState("30D");
  const [selectedClient, setSelectedClient] = useState("All Clients");

  const data = getClientData(selectedClient);
  const isAllClients = selectedClient === "All Clients";

  return (
    <div className="flex-1 flex flex-col overflow-hidden">
      {/* Top bar */}
      <header className="shrink-0 h-[68px] flex items-center justify-between px-8 border-b border-ivory-05">
        <div>
          <h1 className="font-display font-bold text-xl text-ivory">Analytics</h1>
          <p className="text-sm font-body text-ivory-30 mt-0.5">
            {isAllClients ? "Performance overview" : selectedClient}
          </p>
        </div>
        <div className="flex items-center gap-3">
          <select
            value={selectedClient}
            onChange={(e) => setSelectedClient(e.target.value)}
            className="bg-ivory-05 border border-ivory-10 rounded-[2px] px-3 py-1.5 text-sm font-body text-ivory outline-none focus:border-amber transition-colors cursor-pointer appearance-none pr-8"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='10' height='6' viewBox='0 0 10 6' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M1 1L5 5L9 1' stroke='%23ffffeb' stroke-width='1.5' stroke-linecap='round' stroke-linejoin='round'/%3E%3C/svg%3E")`,
              backgroundRepeat: "no-repeat",
              backgroundPosition: "right 10px center",
            }}
          >
            {clients.map((c) => (
              <option key={c} value={c} className="bg-graphite text-ivory">
                {c}
              </option>
            ))}
          </select>

          <div className="flex items-center gap-1">
            {periods.map((p) => (
              <button
                key={p}
                onClick={() => setActivePeriod(p)}
                className={`px-3 py-1.5 text-xs font-body font-semibold rounded-[2px] transition-colors ${
                  activePeriod === p
                    ? "bg-amber text-graphite"
                    : "bg-ivory-05 text-ivory-30 hover:text-ivory"
                }`}
              >
                {p}
              </button>
            ))}
          </div>
        </div>
      </header>

      {/* Scrollable content */}
      <div className="flex-1 overflow-y-auto px-8 py-6 space-y-6">
        {/* Client indicator */}
        <AnimatePresence>
          {!isAllClients && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="overflow-hidden"
            >
              <div className="flex items-center gap-3 rounded-[2px] border border-amber-20 bg-amber-10 px-5 py-3 mb-6">
                <span className="w-2 h-2 rounded-full bg-amber" />
                <span className="text-sm font-body text-ivory">
                  Showing analytics for <strong className="text-amber">{selectedClient}</strong>
                </span>
                <button
                  onClick={() => setSelectedClient("All Clients")}
                  className="ml-auto text-xs font-body text-ivory-30 hover:text-ivory transition-colors"
                >
                  View All Clients
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Stats row — numbers animate in place */}
        <div className="grid grid-cols-4 gap-4">
          {data.stats.map((s) => (
            <div
              key={s.label}
              className="rounded-[2px] border border-ivory-05 bg-ivory-05/50 p-5"
            >
              <p className="text-xs font-body text-ivory-30 mb-1">{s.label}</p>
              <p className="font-display font-bold text-3xl text-ivory">
                <AnimatedValue value={s.value} />
              </p>
              {s.change !== "—" && (
                <motion.p
                  key={`${selectedClient}-${s.label}`}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.4, delay: 0.3 }}
                  className={`text-xs font-body mt-1 ${s.positive ? "text-[#4ade80]" : "text-ember"}`}
                >
                  {s.change} <span className="text-ivory-30">vs last period</span>
                </motion.p>
              )}
            </div>
          ))}
        </div>

        {/* Two-column layout */}
        <div className="grid grid-cols-2 gap-4">
          {/* Top Performing Posts — crossfade */}
          <div className="rounded-[2px] border border-ivory-05 bg-ivory-05/50 overflow-hidden">
            <div className="px-5 py-4 border-b border-ivory-05">
              <h2 className="font-display font-semibold text-sm text-ivory">
                Top Performing Posts
              </h2>
            </div>
            <AnimatePresence mode="wait">
              <motion.div
                key={selectedClient + "-posts"}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.25 }}
              >
                {data.topPosts.length > 0 ? (
                  <div className="divide-y divide-ivory-05">
                    {data.topPosts.map((post, i) => (
                      <motion.div
                        key={post.title}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.3, delay: i * 0.06 }}
                        className="px-5 py-3.5 flex items-center gap-4"
                      >
                        <span className="font-display font-bold text-lg text-amber w-6 shrink-0">
                          {post.rank}
                        </span>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-body font-semibold text-ivory">{post.title}</p>
                          <div className="flex items-center gap-2 mt-0.5">
                            <span className={`w-1.5 h-1.5 rounded-full ${platformDotColors[post.platform] || "bg-ivory-30"}`} />
                            <span className="text-xs font-body text-ivory-30">{post.platform}</span>
                          </div>
                        </div>
                        <div className="text-right shrink-0">
                          <p className="text-sm font-body text-ivory">{post.impressions}</p>
                          <p className="text-xs font-body text-amber">{post.engagement}</p>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                ) : (
                  <div className="px-5 py-12 text-center">
                    <p className="text-sm font-body text-ivory-30">No data available</p>
                  </div>
                )}
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Right panel */}
          <div className="rounded-[2px] border border-ivory-05 bg-ivory-05/50 overflow-hidden">
            <div className="px-5 py-4 border-b border-ivory-05">
              <h2 className="font-display font-semibold text-sm text-ivory">
                {isAllClients ? "Client Performance" : "Monthly Trend"}
              </h2>
            </div>
            <AnimatePresence mode="wait">
              {isAllClients ? (
                <motion.div
                  key="client-perf"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.25 }}
                  className="px-5 py-4 space-y-5"
                >
                  {clientPerformance.map((client, i) => (
                    <button
                      key={client.name}
                      onClick={() => setSelectedClient(client.name)}
                      className="w-full text-left group"
                    >
                      <div className="flex items-center justify-between mb-1">
                        <div className="flex items-center gap-2">
                          <span className="font-display font-bold text-sm text-amber">{i + 1}</span>
                          <span className="text-sm font-body font-semibold text-ivory group-hover:text-amber transition-colors">
                            {client.name}
                          </span>
                        </div>
                        <div className="flex items-center gap-3">
                          <span className="text-xs font-body text-ivory-30">{client.impressions}</span>
                          <span className="text-xs font-body text-amber">{client.engagement} avg</span>
                        </div>
                      </div>
                      <div className="w-full h-1.5 rounded-full bg-ivory-05">
                        <motion.div
                          className="h-full rounded-full bg-amber"
                          initial={{ width: 0 }}
                          animate={{ width: `${client.bar}%` }}
                          transition={{ duration: 0.7, delay: i * 0.08, ease: [0.4, 0, 0.2, 1] }}
                        />
                      </div>
                    </button>
                  ))}
                </motion.div>
              ) : (
                <motion.div
                  key="monthly-trend"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.25 }}
                  className="px-5 py-4 space-y-4"
                >
                  {["June", "May", "April", "March", "February"].map((month, i) => {
                    const values = [92, 78, 65, 71, 58];
                    return (
                      <div key={month}>
                        <div className="flex items-center justify-between mb-1">
                          <span className="text-sm font-body text-ivory">{month} 2025</span>
                          <span className="text-xs font-body text-amber">{values[i]}% of goal</span>
                        </div>
                        <div className="w-full h-1.5 rounded-full bg-ivory-05">
                          <motion.div
                            className="h-full rounded-full bg-amber"
                            initial={{ width: 0 }}
                            animate={{ width: `${values[i]}%` }}
                            transition={{ duration: 0.7, delay: i * 0.08, ease: [0.4, 0, 0.2, 1] }}
                          />
                        </div>
                      </div>
                    );
                  })}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* Platform Breakdown — bars animate width */}
        <div className="rounded-[2px] border border-ivory-05 bg-ivory-05/50 overflow-hidden">
          <div className="px-5 py-4 border-b border-ivory-05">
            <h2 className="font-display font-semibold text-sm text-ivory">Platform Breakdown</h2>
          </div>
          <div className="grid grid-cols-3 divide-x divide-ivory-05">
            {data.platforms.map((platform, i) => (
              <div
                key={platform.name}
                className={`p-5 border-l-2 ${platform.borderColor}`}
              >
                <h3 className="font-display font-semibold text-base text-ivory mb-3">
                  {platform.name}
                </h3>
                <div className="space-y-2.5">
                  <div>
                    <p className="text-xs font-body text-ivory-30">Share of Posts</p>
                    <p className="text-sm font-body font-semibold text-ivory mt-0.5">
                      <AnimatedValue value={platform.posts} />
                    </p>
                    <div className="w-full h-1.5 rounded-full bg-ivory-05 mt-1.5">
                      <motion.div
                        className={`h-full rounded-full ${platform.borderColor.replace("border-", "bg-")}`}
                        animate={{ width: `${platform.barPercent}%` }}
                        transition={{ duration: 0.7, delay: i * 0.1, ease: [0.4, 0, 0.2, 1] }}
                      />
                    </div>
                  </div>
                  <div>
                    <p className="text-xs font-body text-ivory-30">Avg Engagement</p>
                    <p className="text-sm font-body font-semibold text-ivory mt-0.5">{platform.engagement}</p>
                  </div>
                  <div>
                    <p className="text-xs font-body text-ivory-30">Impressions</p>
                    <p className="text-sm font-body font-semibold text-ivory mt-0.5">{platform.impressions}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
