"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ThemeToggle } from "./ThemeToggle";
import { useTheme } from "./ThemeProvider";

const links = [
  { href: "/", label: "Home" },
  { href: "/services", label: "Services" },
  { href: "/about", label: "About" },
  { href: "/portfolio", label: "Portfolio" },
  { href: "/contact", label: "Contact" },
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
            transition={{ duration: 0.5, ease: [0.4, 0, 0.2, 1] }}
            className="fixed inset-0 z-[999] bg-surface flex flex-col items-center justify-center gap-7"
          >
            {/* Close button */}
            <button
              className="absolute top-5 right-6 w-10 h-10 flex items-center justify-center cursor-pointer"
              onClick={() => setMobileOpen(false)}
              aria-label="Close menu"
            >
              <motion.span
                initial={{ rotate: 0, opacity: 0 }}
                animate={{ rotate: 90, opacity: 1 }}
                exit={{ rotate: 0, opacity: 0 }}
                transition={{ duration: 0.3, delay: 0.2 }}
                className="text-on-surface text-[28px] leading-none"
              >
                &#10005;
              </motion.span>
            </button>

            {/* Nav links */}
            {links.map((link, i) => {
              const isActive = pathname === link.href;
              return (
                <motion.div
                  key={link.href}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.3, delay: 0.1 + i * 0.05 }}
                >
                  <Link
                    href={link.href}
                    onClick={() => setMobileOpen(false)}
                    className={`text-[24px] font-display font-[700] tracking-[0.02em] uppercase no-underline transition-colors duration-200 ${
                      isActive ? "text-amber" : "text-on-surface hover:text-amber"
                    }`}
                  >
                    {link.label}
                  </Link>
                </motion.div>
              );
            })}

            {/* Client Login button */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3, delay: 0.4 }}
            >
              <Link
                href="/login"
                onClick={() => setMobileOpen(false)}
                className="mt-2 inline-block font-body text-[14px] font-medium tracking-[0.1em] uppercase text-graphite bg-amber py-[13px] px-8 rounded-[1px] no-underline transition-colors duration-200 hover:bg-[#e09f3a]"
              >
                Client Login
              </Link>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
