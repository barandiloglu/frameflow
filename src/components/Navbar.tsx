"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ThemeToggle } from "./ThemeToggle";
import { useTheme } from "./ThemeProvider";

const links = [
  { href: "/", label: "Home", frame: "00", tagline: "the title card" },
  { href: "/services", label: "Services", frame: "01", tagline: "seven scenes" },
  { href: "/about", label: "About", frame: "02", tagline: "the cast & crew" },
  { href: "/portfolio", label: "Portfolio", frame: "03", tagline: "the archive" },
  { href: "/gallery", label: "Gallery", frame: "04", tagline: "the darkroom" },
  { href: "/contact", label: "Contact", frame: "05", tagline: "action" },
];

export function Navbar() {
  const pathname = usePathname();
  const { theme } = useTheme();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [mobileOpen]);

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-[1000] flex items-center justify-between px-6 md:px-[52px] h-[76px] transition-all duration-400 ${
          scrolled
            ? "bg-surface/85 backdrop-blur-[20px] border-b border-border-subtle"
            : ""
        }`}
      >
        {/* Logo */}
        <Link href="/" className="shrink-0">
          <Image
            src={theme === "dark" ? "/logo_white.png" : "/logo_black.png"}
            alt="FrameFlow"
            width={140}
            height={40}
            className="h-[72px] w-auto"
            priority
          />
        </Link>

        {/* Desktop nav links */}
        <ul className="hidden md:flex gap-10 list-none">
          {links.map((link) => {
            const isActive = pathname === link.href;
            return (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className={`text-[13px] font-normal tracking-[0.06em] uppercase no-underline transition-colors duration-200 relative pb-[2px] after:content-[''] after:absolute after:bottom-0 after:left-0 after:h-[1px] after:bg-amber after:transition-[width] after:duration-300 after:ease-out ${
                    isActive
                      ? "text-on-surface after:w-full"
                      : "text-on-surface-60 hover:text-on-surface after:w-0 hover:after:w-full"
                  }`}
                >
                  {link.label}
                </Link>
              </li>
            );
          })}
        </ul>

        {/* Right side: theme toggle + login (desktop) + hamburger (mobile) */}
        <div className="flex items-center gap-3">
          <ThemeToggle />

          <Link
            href="/login"
            className="hidden md:inline-block font-body text-[12px] font-medium tracking-[0.1em] uppercase text-graphite bg-amber py-[11px] px-6 rounded-[1px] no-underline transition-colors duration-200 hover:bg-[#e09f3a]"
          >
            Client Login
          </Link>

          {/* Hamburger — mobile only */}
          <button
            className="md:hidden flex flex-col justify-center gap-[5px] w-8 h-8 cursor-pointer"
            onClick={() => setMobileOpen(true)}
            aria-label="Open menu"
          >
            <motion.span
              className="block h-[2px] w-full bg-on-surface origin-center"
              animate={mobileOpen ? { rotate: 45, y: 7 } : { rotate: 0, y: 0 }}
              transition={{ duration: 0.3 }}
            />
            <motion.span
              className="block h-[2px] w-full bg-on-surface"
              animate={mobileOpen ? { opacity: 0 } : { opacity: 1 }}
              transition={{ duration: 0.2 }}
            />
            <motion.span
              className="block h-[2px] w-full bg-on-surface origin-center"
              animate={mobileOpen ? { rotate: -45, y: -7 } : { rotate: 0, y: 0 }}
              transition={{ duration: 0.3 }}
            />
          </button>
        </div>
      </nav>

      {/* Mobile menu overlay */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ clipPath: "circle(0% at calc(100% - 40px) 38px)" }}
            animate={{ clipPath: "circle(150% at calc(100% - 40px) 38px)" }}
            exit={{ clipPath: "circle(0% at calc(100% - 40px) 38px)" }}
            transition={{ duration: 0.55, ease: [0.4, 0, 0.2, 1] }}
            className="fixed inset-0 z-[1100] bg-surface flex flex-col overflow-hidden"
          >
            {/* backdrops */}
            <div
              aria-hidden
              className="pointer-events-none absolute inset-0 mix-blend-overlay opacity-[0.05]"
              style={{
                backgroundImage:
                  "repeating-linear-gradient(0deg, var(--color-ivory) 0 1px, transparent 1px 4px)",
              }}
            />
            <div
              aria-hidden
              className="pointer-events-none absolute inset-0 opacity-60"
              style={{
                backgroundImage:
                  "radial-gradient(var(--color-amber-10) 1px, transparent 1px)",
                backgroundSize: "36px 36px",
                maskImage:
                  "radial-gradient(ellipse 80% 60% at 50% 40%, black 20%, transparent 90%)",
                WebkitMaskImage:
                  "radial-gradient(ellipse 80% 60% at 50% 40%, black 20%, transparent 90%)",
              }}
            />
            <div className="pointer-events-none absolute top-[20%] -right-[15%] h-[320px] w-[320px] rounded-full bg-ember-10 blur-[140px]" />
            <div className="pointer-events-none absolute bottom-[10%] -left-[20%] h-[280px] w-[280px] rounded-full bg-amber-10 blur-[130px]" />

            {/* REC slate bar */}
            <motion.div
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.4, delay: 0.22 }}
              className="relative z-20 flex items-center gap-4 border-b border-border-subtle bg-surface/60 backdrop-blur-sm px-5 py-3 font-mono text-[9px] uppercase tracking-[0.28em] text-on-surface-60"
            >
              <span className="flex items-center gap-2 text-ember font-semibold">
                <span className="relative flex h-2 w-2">
                  <span className="absolute inset-0 rounded-full bg-ember animate-ping" />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-ember" />
                </span>
                NAVIGATING
              </span>
              <span>FF_MENU</span>
              <span className="ml-auto flex items-center gap-2">
                <span className="text-on-surface-30">TC</span>
                <span className="text-amber">00:00:00:01</span>
              </span>
            </motion.div>

            {/* Secondary header — index label + close */}
            <motion.div
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.4, delay: 0.28 }}
              className="relative z-20 flex items-end justify-between gap-6 border-b border-border-subtle px-5 py-5"
            >
              <div>
                <p className="font-mono text-[9px] uppercase tracking-[0.28em] text-amber mb-1.5 flex items-center gap-2">
                  <span className="block h-px w-6 bg-amber" />
                  Frame · Index
                </p>
                <h2
                  className="font-editorial font-[300] italic text-on-surface leading-none tracking-[-0.02em]"
                  style={{ fontSize: "clamp(26px, 7vw, 36px)" }}
                >
                  Choose a <span className="text-amber">scene</span>.
                </h2>
              </div>
              <button
                className="relative w-12 h-12 border border-border-subtle flex items-center justify-center cursor-pointer group shrink-0 hover:border-amber/50 transition-colors"
                onClick={() => setMobileOpen(false)}
                aria-label="Close menu"
              >
                <span
                  aria-hidden
                  className="absolute top-1 left-1 w-1.5 h-1.5 border-t border-l border-amber/60"
                />
                <span
                  aria-hidden
                  className="absolute bottom-1 right-1 w-1.5 h-1.5 border-b border-r border-amber/60"
                />
                <motion.span
                  initial={{ rotate: 0, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3, delay: 0.35 }}
                  className="text-on-surface text-[20px] leading-none transition-transform duration-300 group-hover:rotate-90 group-hover:text-amber"
                >
                  ×
                </motion.span>
              </button>
            </motion.div>

            {/* Nav links */}
            <nav className="relative z-10 flex-1 overflow-y-auto">
              <ul className="flex flex-col">
                {links.map((link, i) => {
                  const isActive = pathname === link.href;
                  return (
                    <motion.li
                      key={link.href}
                      initial={{ opacity: 0, y: 24 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={{
                        duration: 0.55,
                        delay: 0.32 + i * 0.06,
                        ease: [0.2, 0.8, 0.2, 1],
                      }}
                      className="border-b border-border-subtle"
                    >
                      <Link
                        href={link.href}
                        onClick={() => setMobileOpen(false)}
                        className="group relative flex items-center justify-between gap-4 px-5 py-5 no-underline"
                      >
                        <div className="flex items-baseline gap-4 min-w-0 flex-1">
                          <span
                            className={`font-mono text-[10px] uppercase tracking-[0.24em] shrink-0 w-7 ${
                              isActive ? "text-ember" : "text-amber"
                            }`}
                          >
                            {link.frame}
                          </span>
                          <div className="min-w-0">
                            <span
                              className={`block font-editorial font-[300] italic leading-[0.95] tracking-[-0.02em] transition-colors duration-300 ${
                                isActive
                                  ? "text-amber"
                                  : "text-on-surface group-hover:text-amber"
                              }`}
                              style={{ fontSize: "clamp(34px, 9vw, 52px)" }}
                            >
                              {link.label}
                            </span>
                            <span className="mt-2 block font-mono text-[9px] uppercase tracking-[0.24em] text-on-surface-30">
                              / {link.tagline}
                            </span>
                          </div>
                        </div>
                        {isActive ? (
                          <span className="flex items-center gap-2 font-mono text-[9px] uppercase tracking-[0.24em] text-ember shrink-0">
                            <span className="relative flex h-2 w-2">
                              <span className="absolute inset-0 rounded-full bg-ember animate-ping" />
                              <span className="relative inline-flex h-2 w-2 rounded-full bg-ember" />
                            </span>
                            now
                          </span>
                        ) : (
                          <span className="font-editorial not-italic text-[22px] leading-none text-on-surface-30 transition-all duration-300 group-hover:text-amber group-hover:translate-x-1 shrink-0">
                            →
                          </span>
                        )}
                      </Link>
                    </motion.li>
                  );
                })}
              </ul>

              {/* CTA inside scroll area so short screens stay reachable */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                transition={{
                  duration: 0.55,
                  delay: 0.32 + links.length * 0.06,
                  ease: [0.2, 0.8, 0.2, 1],
                }}
                className="px-5 pt-8 pb-6"
              >
                <Link
                  href="/login"
                  onClick={() => setMobileOpen(false)}
                  className="group relative w-full flex items-center justify-center gap-3 bg-amber text-graphite font-mono text-[11px] font-medium tracking-[0.24em] uppercase py-[18px] px-5 no-underline transition-all duration-300 hover:bg-ember hover:text-ivory"
                >
                  <span className="relative flex h-2 w-2">
                    <span className="absolute inset-0 rounded-full bg-graphite/40 animate-ping group-hover:bg-ivory/40" />
                    <span className="relative inline-flex h-2 w-2 rounded-full bg-graphite group-hover:bg-ivory" />
                  </span>
                  Client Login
                  <span className="font-editorial not-italic text-[18px] leading-none transition-transform duration-300 group-hover:translate-x-1">
                    →
                  </span>
                </Link>
              </motion.div>
            </nav>

            {/* Footer strip */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.4, delay: 0.55 }}
              className="relative z-20 border-t border-border-subtle"
            >
              <div className="flex items-center justify-between gap-4 px-5 py-4 font-mono text-[9px] uppercase tracking-[0.24em]">
                <a
                  href="mailto:hello@frameflow.ca"
                  className="text-on-surface-60 hover:text-amber transition-colors no-underline"
                >
                  hello@frameflow.ca
                </a>
                <span className="flex items-center gap-2 text-on-surface-30">
                  <span className="w-1 h-1 rounded-full bg-ember" />
                  <span className="text-on-surface-60">Toronto · 2026</span>
                </span>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
