"use client";

const teamMembers = [
  {
    initials: "AK",
    name: "Alex K.",
    title: "Founder & Creative Director",
    email: "alex@frameflow.ca",
    status: "Active",
    joined: 2021,
    clients: ["Acadia Bakes", "Sola Health", "Meridian Foods", "Apex Creative"],
    role: "Admin" as const,
  },
  {
    initials: "SM",
    name: "Sara M.",
    title: "Head of Social Media",
    email: "sara@frameflow.ca",
    status: "Active",
    joined: 2022,
    clients: ["Acadia Bakes", "Velour Collective", "Lune Caf\u00e9", "Peak Athletics"],
    role: "Manager" as const,
  },
  {
    initials: "JP",
    name: "Jordan P.",
    title: "Lead Developer",
    email: "jordan@frameflow.ca",
    status: "Active",
    joined: 2023,
    clients: ["Nomad Studio", "Birchfield Co.", "Harbor Digital"],
    role: "Manager" as const,
  },
  {
    initials: "ML",
    name: "Maya L.",
    title: "Graphic Designer",
    email: "maya@frameflow.ca",
    status: "Active",
    joined: 2024,
    clients: ["Trove Interiors", "Apex Creative", "Dune & Co."],
    role: "Member" as const,
  },
  {
    initials: "RT",
    name: "Ryan T.",
    title: "Video Producer",
    email: "ryan@frameflow.ca",
    status: "Active",
    joined: 2024,
    clients: ["Meridian Foods", "Acadia Bakes"],
    role: "Member" as const,
  },
  {
    initials: "PS",
    name: "Priya S.",
    title: "Social Media Coordinator",
    email: "priya@frameflow.ca",
    status: "Active",
    joined: 2025,
    clients: ["Lune Caf\u00e9", "Sola Health", "Peak Athletics"],
    role: "Member" as const,
  },
];

const roleBadgeStyles: Record<string, string> = {
  Admin: "bg-amber text-graphite",
  Manager: "bg-amber-10 text-amber",
  Member: "bg-ivory-05 text-ivory-30",
};

export default function TeamPage() {
  return (
    <div className="flex-1 flex flex-col overflow-hidden">
      {/* Top bar */}
      <header className="shrink-0 h-[68px] flex items-center justify-between px-8 border-b border-ivory-05">
        <div>
          <h1 className="font-display font-bold text-xl text-ivory">Team</h1>
          <p className="text-sm font-body text-ivory-30 mt-0.5">Manage your team members</p>
        </div>
        <button className="h-9 px-4 rounded-[2px] bg-amber text-graphite text-sm font-body font-semibold hover:bg-amber/90 transition-colors">
          + Add Member
        </button>
      </header>

      {/* Scrollable content */}
      <div className="flex-1 overflow-y-auto px-8 py-6">
        <div className="grid grid-cols-3 gap-4">
          {teamMembers.map((member) => (
            <div
              key={member.email}
              className="rounded-[2px] border border-ivory-05 bg-ivory-05/50 flex flex-col"
            >
              {/* Top section */}
              <div className="p-5 flex items-start gap-4">
                <div
                  className={`w-16 h-16 shrink-0 rounded-full flex items-center justify-center ${
                    member.role === "Admin" ? "bg-amber-20" : "bg-ivory-10"
                  }`}
                >
                  <span className="font-display font-bold text-lg text-ivory">
                    {member.initials}
                  </span>
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <h3 className="font-display font-semibold text-lg text-ivory">{member.name}</h3>
                    <span
                      className={`text-[10px] font-body font-semibold px-2 py-0.5 rounded-[1px] ${roleBadgeStyles[member.role]}`}
                    >
                      {member.role}
                    </span>
                  </div>
                  <p className="text-xs font-body text-amber uppercase tracking-wider mt-1">
                    {member.title}
                  </p>
                  <p className="text-xs font-body text-ivory-30 mt-1">{member.email}</p>
                </div>
              </div>

              {/* Divider */}
              <div className="border-t border-ivory-05" />

              {/* Stats section */}
              <div className="px-5 py-4 flex items-center gap-6">
                <div>
                  <p className="text-[10px] font-body text-ivory-30 uppercase tracking-wider">Clients</p>
                  <p className="font-display font-semibold text-sm text-ivory mt-0.5">
                    {member.clients.length}
                  </p>
                </div>
                <div>
                  <p className="text-[10px] font-body text-ivory-30 uppercase tracking-wider">Since</p>
                  <p className="font-display font-semibold text-sm text-ivory mt-0.5">
                    {member.joined}
                  </p>
                </div>
              </div>

              {/* Client list */}
              <div className="px-5 pb-4">
                <p className="text-xs font-body text-ivory-60">
                  {member.clients.join(", ")}
                </p>
              </div>

              {/* Bottom links */}
              <div className="mt-auto px-5 py-3 border-t border-ivory-05 flex items-center gap-4">
                <button className="text-xs font-body text-amber hover:text-amber/80 transition-colors">
                  Edit
                </button>
                <button className="text-xs font-body text-amber hover:text-amber/80 transition-colors">
                  View Activity
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
