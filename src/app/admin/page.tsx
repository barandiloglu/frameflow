"use client";

const stats = [
  { label: "Total Clients", value: "12", sub: "Active accounts", badge: null, badgeColor: "" },
  { label: "Active Projects", value: "8", sub: "In progress", badge: null, badgeColor: "" },
  { label: "Posts This Month", value: "67", sub: "Across all clients", badge: "\u2191 12%", badgeColor: "bg-[#1a3a2a] text-[#4ade80]" },
  { label: "Pending Approvals", value: "9", sub: null, badge: "Needs attention", badgeColor: "bg-amber-20 text-amber" },
  { label: "Revenue MTD", value: "$24,500", sub: "July 2025", badge: null, badgeColor: "" },
];

const activities = [
  { client: "Acadia Bakes", description: "3 posts pending approval", time: "2 hours ago", dotColor: "bg-amber" },
  { client: "Nomad Studio", description: "Website redesign milestone completed", time: "5 hours ago", dotColor: "bg-[#4ade80]" },
  { client: "Velour Collective", description: "Monthly report generated", time: "Yesterday", dotColor: "bg-ivory" },
  { client: "Sola Health", description: "New ad campaign launched", time: "Yesterday", dotColor: "bg-amber" },
  { client: "Lune Caf\u00e9", description: "Brand guidelines approved", time: "2 days ago", dotColor: "bg-[#4ade80]" },
  { client: "Birchfield Co.", description: "Social media onboarding started", time: "3 days ago", dotColor: "bg-ivory" },
];

const plans = [
  { name: "Growth Plan", count: 5, width: "42%", barColor: "bg-amber" },
  { name: "Starter Plan", count: 4, width: "33%", barColor: "bg-ivory-30" },
  { name: "Enterprise", count: 3, width: "25%", barColor: "bg-ivory-30" },
];

export default function AdminDashboardPage() {
  return (
    <div className="flex-1 flex flex-col overflow-hidden">
      {/* Top bar */}
      <header className="shrink-0 h-[68px] flex items-center justify-between px-8 border-b border-ivory-05">
        <div>
          <h1 className="font-display font-bold text-xl text-ivory">Admin Dashboard</h1>
          <p className="text-sm font-body text-ivory-30 mt-0.5">Manage your clients and projects</p>
        </div>
        <div className="flex items-center gap-4">
          {/* Notification bell */}
          <button className="relative p-2 rounded-[1px] hover:bg-ivory-05 transition-colors">
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
              <path d="M10 2C7.24 2 5 4.24 5 7V10.5L3.5 13H16.5L15 10.5V7C15 4.24 12.76 2 10 2Z" stroke="currentColor" strokeWidth="1.5" className="text-ivory-60" strokeLinejoin="round" />
              <path d="M8 15C8 16.1 8.9 17 10 17C11.1 17 12 16.1 12 15" stroke="currentColor" strokeWidth="1.5" className="text-ivory-60" strokeLinecap="round" />
            </svg>
            <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-amber" />
          </button>
          {/* Search */}
          <div className="relative">
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="absolute left-2.5 top-1/2 -translate-y-1/2 text-ivory-30">
              <circle cx="7" cy="7" r="5" stroke="currentColor" strokeWidth="1.5" />
              <path d="M11 11L14 14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
            </svg>
            <input
              type="text"
              placeholder="Search..."
              className="w-[200px] h-9 pl-8 pr-3 text-sm font-body text-ivory placeholder:text-ivory-30 bg-ivory-05 border border-ivory-10 rounded-[2px] outline-none focus:border-ivory-30 transition-colors"
            />
          </div>
          {/* Avatar */}
          <div className="w-9 h-9 rounded-full bg-amber flex items-center justify-center">
            <span className="text-xs font-body font-semibold text-graphite">AK</span>
          </div>
        </div>
      </header>

      {/* Scrollable content */}
      <div className="flex-1 overflow-y-auto px-8 py-6 space-y-6">
        {/* Stats row */}
        <div className="grid grid-cols-5 gap-4">
          {stats.map((s) => (
            <div
              key={s.label}
              className="rounded-[2px] border border-ivory-05 bg-ivory-05/50 p-5"
            >
              <p className="text-xs font-body text-ivory-30 mb-1">{s.label}</p>
              <p className="font-display font-bold text-3xl text-ivory">{s.value}</p>
              {s.sub && <p className="text-xs font-body text-ivory-30 mt-1">{s.sub}</p>}
              {s.badge && (
                <span className={`inline-block mt-2 px-2 py-0.5 text-[10px] font-semibold font-body rounded-full ${s.badgeColor}`}>
                  {s.badge}
                </span>
              )}
            </div>
          ))}
        </div>

        {/* Lower grid */}
        <div className="grid gap-4" style={{ gridTemplateColumns: "1.5fr 1fr" }}>
          {/* Recent Client Activity */}
          <div className="rounded-[2px] border border-ivory-05 bg-ivory-05/50 overflow-hidden">
            <div className="px-5 py-4 border-b border-ivory-05 flex items-center justify-between">
              <h2 className="font-display font-semibold text-sm text-ivory">Recent Client Activity</h2>
              <button className="text-xs font-body text-amber hover:text-amber/80 transition-colors">
                View All
              </button>
            </div>
            <div className="divide-y divide-ivory-05">
              {activities.map((a, i) => (
                <div key={i} className="flex items-center gap-3 px-5 py-3.5">
                  <span className={`w-2 h-2 rounded-full ${a.dotColor} shrink-0`} />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-body font-semibold text-ivory">{a.client}</p>
                    <p className="text-xs font-body text-ivory-60 mt-0.5">{a.description}</p>
                  </div>
                  <span className="text-xs font-body text-ivory-30 shrink-0">{a.time}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Client Overview */}
          <div className="rounded-[2px] border border-ivory-05 bg-ivory-05/50 overflow-hidden">
            <div className="px-5 py-4 border-b border-ivory-05">
              <h2 className="font-display font-semibold text-sm text-ivory">Clients by Plan</h2>
            </div>
            <div className="px-5 py-4 space-y-4">
              {plans.map((p) => (
                <div key={p.name}>
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="text-sm font-body text-ivory">{p.name}</span>
                    <span className="text-xs font-body text-ivory-30">{p.count} clients</span>
                  </div>
                  <div className="w-full h-2 rounded-full bg-ivory-05">
                    <div
                      className={`h-full rounded-full ${p.barColor}`}
                      style={{ width: p.width }}
                    />
                  </div>
                </div>
              ))}
            </div>

            {/* Quick Actions */}
            <div className="px-5 py-4 border-t border-ivory-05">
              <p className="text-[10px] font-body font-semibold tracking-[0.15em] text-ivory-30 uppercase mb-3">
                Quick Actions
              </p>
              <div className="space-y-2">
                <button className="w-full h-9 rounded-[2px] bg-amber text-graphite text-sm font-body font-semibold hover:bg-amber/90 transition-colors">
                  + New Client
                </button>
                <button className="w-full h-9 rounded-[2px] bg-transparent border border-ivory-10 text-ivory-60 text-sm font-body hover:bg-ivory-05 transition-colors">
                  Create Project
                </button>
                <button className="w-full h-9 rounded-[2px] bg-transparent border border-ivory-10 text-ivory-60 text-sm font-body hover:bg-ivory-05 transition-colors">
                  Generate Report
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
