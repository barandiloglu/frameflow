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
        href: "/dashboard",
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
        name: "Schedule",
        href: "/dashboard/calendar",
        icon: (
          <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
            <rect x="1.5" y="3" width="15" height="13" rx="1.5" stroke="currentColor" strokeWidth="1.5" />
            <path d="M1.5 7.5H16.5" stroke="currentColor" strokeWidth="1.5" />
            <path d="M5.5 1.5V4.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
            <path d="M12.5 1.5V4.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
          </svg>
        ),
      },
    ],
  },
  {
    label: "CONTENT",
    items: [
      {
        name: "Approvals",
        href: "/dashboard/approvals",
        badge: "3",
        icon: (
          <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
            <path d="M4 9L7.5 12.5L14 5.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        ),
      },
      {
        name: "Assets",
        href: "#",
        icon: (
          <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
            <path d="M2 5.5L2 14.5C2 15.05 2.45 15.5 3 15.5H15C15.55 15.5 16 15.05 16 14.5V6.5C16 5.95 15.55 5.5 15 5.5H9L7 3.5H3C2.45 3.5 2 3.95 2 4.5V5.5Z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
          </svg>
        ),
      },
    ],
  },
  {
    label: "ACCOUNT",
    items: [
      {
        name: "Settings",
        href: "#",
        icon: (
          <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
            <circle cx="9" cy="9" r="2.5" stroke="currentColor" strokeWidth="1.5" />
            <path d="M9 1.5V3M9 15V16.5M1.5 9H3M15 9H16.5M3.4 3.4L4.5 4.5M13.5 13.5L14.6 14.6M14.6 3.4L13.5 4.5M4.5 13.5L3.4 14.6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
          </svg>
        ),
      },
      {
        name: "Support",
        href: "#",
        icon: (
          <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
            <circle cx="9" cy="9" r="7" stroke="currentColor" strokeWidth="1.5" />
            <path d="M6.5 7C6.5 5.62 7.62 4.5 9 4.5C10.38 4.5 11.5 5.62 11.5 7C11.5 8.38 9 9.5 9 9.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            <circle cx="9" cy="12.5" r="0.75" fill="currentColor" />
          </svg>
        ),
      },
    ],
  },
];

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  const isActive = (href: string) => {
    if (href === "/dashboard") return pathname === "/dashboard";
    return pathname.startsWith(href);
  };

  return (
    <div className="h-screen overflow-hidden flex flex-row bg-graphite">
      {/* Sidebar */}
      <aside
        className="w-[240px] shrink-0 flex flex-col border-r border-ivory-10"
        style={{ background: "rgba(30,28,27,1)" }}
      >
        {/* Logo */}
        <div className="px-5 pt-6 pb-4">
          <Link href="/">
            <Image
              src="/logo_white.png"
              alt="FrameFlow"
              width={130}
              height={38}
              className="h-[44px] w-auto"
            />
          </Link>
        </div>

        {/* Client info */}
        <div className="px-5 py-4 border-t border-b border-ivory-05">
          <p className="text-[10px] font-body font-semibold tracking-[0.15em] text-ivory-30 uppercase mb-1.5">Client</p>
          <p className="font-body font-semibold text-sm text-ivory">Acadia Bakes</p>
          <span className="inline-block mt-1.5 px-2 py-0.5 text-[10px] font-semibold font-body rounded-full bg-amber-20 text-amber">
            Growth Plan
          </span>
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
                        {item.badge && (
                          <span className="w-5 h-5 rounded-full bg-amber text-graphite text-[10px] font-semibold flex items-center justify-center">
                            {item.badge}
                          </span>
                        )}
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </div>
          ))}
        </nav>

        {/* Back link */}
        <div className="px-5 py-4 border-t border-ivory-05">
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
