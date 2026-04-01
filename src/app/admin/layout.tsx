"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";

const navSections = [
  {
    label: "OVERVIEW",
    items: [
      {
        name: "Dashboard",
        href: "/admin",
        icon: (
          <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
            <rect x="1" y="1" width="6" height="6" rx="1" stroke="currentColor" strokeWidth="1.5" />
            <rect x="11" y="1" width="6" height="6" rx="1" stroke="currentColor" strokeWidth="1.5" />
            <rect x="1" y="11" width="6" height="6" rx="1" stroke="currentColor" strokeWidth="1.5" />
            <rect x="11" y="11" width="6" height="6" rx="1" stroke="currentColor" strokeWidth="1.5" />
          </svg>
        ),
      },
      {
        name: "Clients",
        href: "/admin/clients",
        icon: (
          <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
            <circle cx="6.5" cy="5.5" r="2.5" stroke="currentColor" strokeWidth="1.5" />
            <path d="M1.5 15.5C1.5 12.74 3.74 10.5 6.5 10.5C9.26 10.5 11.5 12.74 11.5 15.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
            <circle cx="12.5" cy="6.5" r="2" stroke="currentColor" strokeWidth="1.5" />
            <path d="M13 10.5C15.21 10.5 17 12.29 17 14.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
          </svg>
        ),
      },
      {
        name: "Projects",
        href: "/admin/projects",
        icon: (
          <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
            <rect x="2" y="4" width="14" height="12" rx="1.5" stroke="currentColor" strokeWidth="1.5" />
            <path d="M6 4V3C6 2.45 6.45 2 7 2H11C11.55 2 12 2.45 12 3V4" stroke="currentColor" strokeWidth="1.5" />
            <path d="M2 9H16" stroke="currentColor" strokeWidth="1.5" />
          </svg>
        ),
      },
    ],
  },
  {
    label: "CONTENT",
    items: [
      {
        name: "All Posts",
        href: "/admin/posts",
        icon: (
          <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
            <rect x="2" y="1.5" width="14" height="15" rx="1.5" stroke="currentColor" strokeWidth="1.5" />
            <path d="M5.5 5.5H12.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
            <path d="M5.5 9H12.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
            <path d="M5.5 12.5H9.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
          </svg>
        ),
      },
      {
        name: "Media Library",
        href: "/admin/media",
        icon: (
          <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
            <rect x="1.5" y="2.5" width="15" height="13" rx="1.5" stroke="currentColor" strokeWidth="1.5" />
            <circle cx="6" cy="7" r="1.5" stroke="currentColor" strokeWidth="1.5" />
            <path d="M1.5 12.5L5.5 9L8.5 12L11.5 9.5L16.5 13.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        ),
      },
    ],
  },
  {
    label: "MANAGEMENT",
    items: [
      {
        name: "Team",
        href: "/admin/team",
        icon: (
          <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
            <circle cx="9" cy="5" r="2.5" stroke="currentColor" strokeWidth="1.5" />
            <path d="M3 16C3 13.24 5.69 11 9 11C12.31 11 15 13.24 15 16" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
          </svg>
        ),
      },
      {
        name: "Analytics",
        href: "/admin/analytics",
        icon: (
          <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
            <path d="M2 15.5H16" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
            <rect x="3.5" y="8" width="2.5" height="7" rx="0.5" stroke="currentColor" strokeWidth="1.5" />
            <rect x="7.75" y="4" width="2.5" height="11" rx="0.5" stroke="currentColor" strokeWidth="1.5" />
            <rect x="12" y="6" width="2.5" height="9" rx="0.5" stroke="currentColor" strokeWidth="1.5" />
          </svg>
        ),
      },
      {
        name: "Settings",
        href: "/admin/settings",
        icon: (
          <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
            <circle cx="9" cy="9" r="2.5" stroke="currentColor" strokeWidth="1.5" />
            <path d="M9 1.5V3M9 15V16.5M1.5 9H3M15 9H16.5M3.4 3.4L4.5 4.5M13.5 13.5L14.6 14.6M14.6 3.4L13.5 4.5M4.5 13.5L3.4 14.6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
          </svg>
        ),
      },
    ],
  },
];

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  const isActive = (href: string) => {
    if (href === "/admin") return pathname === "/admin";
    return pathname.startsWith(href);
  };

  return (
    <div className="h-screen overflow-hidden flex flex-row bg-graphite">
      {/* Sidebar */}
      <aside
        className="w-[260px] shrink-0 flex flex-col border-r border-crimson-30"
        style={{ background: "rgba(30,28,27,1)" }}
      >
        {/* Logo */}
        <div className="px-5 pt-6 pb-4">
          <Link href="/" className="flex items-center gap-2.5">
            <Image
              src="/logo_white.png"
              alt="FrameFlow"
              width={130}
              height={38}
              className="h-[44px] w-auto"
            />
            <span className="px-1.5 py-0.5 text-[9px] font-semibold font-body rounded-[2px] bg-crimson text-ivory uppercase tracking-wide">
              Admin
            </span>
          </Link>
        </div>

        {/* Team member info */}
        <div className="px-5 py-4 border-t border-b border-ivory-05">
          <p className="text-[10px] font-body font-semibold tracking-[0.15em] text-ivory-30 uppercase mb-1.5">
            Logged in as
          </p>
          <p className="font-body font-semibold text-sm text-ivory">Alex K.</p>
          <p className="text-xs font-body text-ivory-60 mt-0.5">Creative Director</p>
        </div>

        {/* Nav */}
        <nav className="flex-1 overflow-y-auto py-4 px-3 space-y-5">
          {navSections.map((section) => (
            <div key={section.label}>
              <p className="text-[10px] font-body font-semibold tracking-[0.15em] text-ivory-30 uppercase px-2 mb-2">
                {section.label}
              </p>
              <ul className="space-y-0.5">
                {section.items.map((item) => {
                  const active = isActive(item.href);
                  return (
                    <li key={item.name}>
                      <Link
                        href={item.href}
                        className={`flex items-center gap-2.5 px-2.5 py-2 rounded-[2px] text-sm font-body transition-colors relative ${
                          active
                            ? "bg-amber-10 text-amber"
                            : "text-ivory-60 hover:text-ivory hover:bg-ivory-05"
                        }`}
                      >
                        {active && (
                          <span className="absolute left-0 top-1/2 -translate-y-1/2 w-[3px] h-5 rounded-r-full bg-amber" />
                        )}
                        <span className="shrink-0">{item.icon}</span>
                        <span className="flex-1">{item.name}</span>
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </div>
          ))}
        </nav>

        {/* Bottom links */}
        <div className="px-5 py-4 border-t border-ivory-05 space-y-3">
          <Link
            href="/dashboard"
            className="flex items-center gap-2 text-xs font-body text-amber hover:text-amber/80 transition-colors"
          >
            Switch to Client View &rarr;
          </Link>
          <Link
            href="/"
            className="flex items-center gap-2 text-xs font-body text-ivory-30 hover:text-ivory transition-colors"
          >
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <path d="M8.5 3L4.5 7L8.5 11" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            Back to Website
          </Link>
        </div>
      </aside>

      {/* Main area */}
      <main className="flex-1 flex flex-col overflow-hidden">{children}</main>
    </div>
  );
}
