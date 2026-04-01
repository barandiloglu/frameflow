"use client";

import Link from "next/link";
import Image from "next/image";
import { useTheme } from "./ThemeProvider";

export function Footer() {
  const { theme } = useTheme();
  return (
    <footer className="bg-surface border-t border-border-subtle">
      {/* Ticker */}
      <div className="overflow-hidden py-[18px] border-b border-border-subtle">
        <div className="flex w-max animate-ticker">
          {Array.from({ length: 6 }).map((_, i) => (
            <div
              key={i}
              className="font-display text-[16px] italic font-normal text-on-surface-10 px-9 whitespace-nowrap"
            >
              {i % 2 === 0 ? "Freeze the Frame" : "Feel the Flow"}
              <strong className="text-amber opacity-35 not-italic">
                &nbsp;&#10022;&nbsp;
              </strong>
            </div>
          ))}
        </div>
      </div>

      {/* Body */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-[2fr_1fr_1fr_1.4fr] gap-12 py-[72px] px-6 md:px-[52px] pb-14">
        {/* Brand */}
        <div>
          <div className="mb-2.5">
            <Image
              src={theme === "dark" ? "/logo_white.png" : "/logo_black.png"}
              alt="FrameFlow"
              width={160}
              height={46}
              className="h-[96px] w-auto"
            />
          </div>
          <p className="text-[13px] font-light text-on-surface-30 leading-[1.7] max-w-[240px] mb-7">
            Crafting brands & stories that flow. Your dedicated digital growth
            partner since 2021.
          </p>
          <div className="flex gap-2.5">
            {["ig", "fb", "in", "bh"].map((s) => (
              <a
                key={s}
                href="#"
                className="w-[34px] h-[34px] border border-border-subtle rounded-[1px] flex items-center justify-center font-display text-[11px] font-bold text-on-surface-30 no-underline transition-all duration-200 hover:border-amber hover:text-amber"
              >
                {s}
              </a>
            ))}
          </div>
        </div>

        {/* Studio links */}
        <div>
          <p className="text-[10px] tracking-[0.2em] uppercase text-on-surface-30 mb-5">
            Studio
          </p>
          <ul className="list-none flex flex-col gap-2.5">
            {[
              { href: "/about", label: "About Us" },
              { href: "/services", label: "Our Services" },
              { href: "/portfolio", label: "Portfolio" },
              { href: "/contact", label: "Contact" },
              { href: "/login", label: "Client Login" },
            ].map((l) => (
              <li key={l.href}>
                <Link
                  href={l.href}
                  className="text-[13.5px] font-light text-on-surface-60 no-underline transition-colors duration-200 hover:text-amber"
                >
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Services links */}
        <div>
          <p className="text-[10px] tracking-[0.2em] uppercase text-on-surface-30 mb-5">
            Services
          </p>
          <ul className="list-none flex flex-col gap-2.5">
            {[
              "Logo Design",
              "Brand Identity",
              "Website Design",
              "Social Media",
              "Video & Photo",
              "Ad Management",
              "Apps",
            ].map((s) => (
              <li key={s}>
                <Link
                  href="/services"
                  className="text-[13.5px] font-light text-on-surface-60 no-underline transition-colors duration-200 hover:text-amber"
                >
                  {s}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Contact */}
        <div>
          <p className="text-[10px] tracking-[0.2em] uppercase text-on-surface-30 mb-5">
            Contact
          </p>
          <div className="mb-3.5">
            <div className="text-[10px] tracking-[0.15em] uppercase text-on-surface-30 mb-[3px]">
              Address
            </div>
            <div className="text-[13px] font-light text-on-surface-60">
              99 Yorkville Ave Unit 200
              <br />
              Toronto, ON
            </div>
          </div>
          <div className="mb-3.5">
            <div className="text-[10px] tracking-[0.15em] uppercase text-on-surface-30 mb-[3px]">
              Email
            </div>
            <div className="text-[13px] font-light text-on-surface-60">
              <a
                href="mailto:hello@frameflow.ca"
                className="text-amber no-underline"
              >
                hello@frameflow.ca
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom */}
      <div className="px-6 md:px-[52px] py-5 border-t border-border-subtle flex flex-col sm:flex-row gap-3 items-center justify-between">
        <p className="text-[11.5px] text-on-surface-30 font-light">
          &copy; 2025 FrameFlow Digital. All rights reserved.
        </p>
        <div className="flex gap-6">
          <a
            href="#"
            className="text-[11.5px] text-on-surface-30 no-underline transition-colors duration-200 hover:text-on-surface-60"
          >
            Privacy
          </a>
          <a
            href="#"
            className="text-[11.5px] text-on-surface-30 no-underline transition-colors duration-200 hover:text-on-surface-60"
          >
            Terms
          </a>
        </div>
      </div>
    </footer>
  );
}
