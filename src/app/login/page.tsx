"use client";

import { useState, FormEvent } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [remember, setRemember] = useState(false);
  const [loading, setLoading] = useState(false);
  const [emailFocused, setEmailFocused] = useState(false);
  const [passwordFocused, setPasswordFocused] = useState(false);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => router.push("/dashboard"), 1600);
  };

  return (
    <div className="relative min-h-screen w-full overflow-hidden bg-graphite text-ivory flex flex-col lg:flex-row">
      {/* ================================================================ */}
      {/*  Global backdrops                                                */}
      {/* ================================================================ */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 mix-blend-overlay animate-scan opacity-[0.06]"
        style={{
          backgroundImage:
            "repeating-linear-gradient(0deg, #ffffeb 0 1px, transparent 1px 4px)",
        }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.5]"
        style={{
          backgroundImage:
            "radial-gradient(rgba(211,143,44,0.1) 1px, transparent 1px)",
          backgroundSize: "38px 38px",
          maskImage:
            "radial-gradient(ellipse 80% 60% at 50% 50%, black 20%, transparent 90%)",
          WebkitMaskImage:
            "radial-gradient(ellipse 80% 60% at 50% 50%, black 20%, transparent 90%)",
        }}
      />
      <div className="pointer-events-none absolute top-[18%] left-[10%] w-[360px] h-[360px] rounded-full bg-amber opacity-[0.09] blur-[130px]" />
      <div className="pointer-events-none absolute bottom-[10%] right-[8%] w-[320px] h-[320px] rounded-full bg-ember opacity-[0.08] blur-[130px]" />

      {/* ================================================================ */}
      {/*  Top control bar (spans full width)                              */}
      {/* ================================================================ */}
      <header className="relative z-20 w-full border-b border-ivory-10 bg-graphite/60 backdrop-blur-sm px-6 md:px-10 py-4 flex items-center gap-6 font-mono text-[10px] uppercase tracking-[0.28em] text-ivory-30">
        <Link href="/" className="flex items-center gap-2 text-ivory-60 hover:text-amber transition-colors no-underline">
          <span className="font-editorial not-italic text-[16px] leading-none">←</span>
          <span>Back to website</span>
        </Link>
        <span className="hidden md:inline text-ivory-10">/</span>
        <span className="hidden md:flex items-center gap-2 text-ember">
          <span className="relative flex h-2 w-2">
            <span className="absolute inset-0 rounded-full bg-ember animate-ping" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-ember" />
          </span>
          <span className="font-semibold">LIVE</span>
        </span>
        <span className="hidden md:inline text-ivory-10">·</span>
        <span className="hidden md:inline">FF_CONTROL_ROOM</span>
        <span className="ml-auto hidden sm:flex items-center gap-3">
          <span className="text-ivory-10">OPR</span>
          <span className="text-amber">client · 01</span>
          <span className="text-ivory-10">·</span>
          <span className="text-amber">TC 00:00:00:00</span>
        </span>
      </header>

      {/* ================================================================ */}
      {/*  Main — Left intro + Right auth card                             */}
      {/* ================================================================ */}
      <div className="relative z-10 flex-1 flex flex-col lg:flex-row items-stretch">
        {/* ── Left intro ── */}
        <section className="relative lg:w-[56%] lg:border-r border-ivory-10 px-6 md:px-[60px] py-14 lg:py-20 flex flex-col justify-between gap-16 overflow-hidden">
          {/* corner brackets */}
          <span aria-hidden className="pointer-events-none absolute top-8 left-6 md:left-10 w-8 h-8 border-t border-l border-amber/40" />
          <span aria-hidden className="pointer-events-none absolute bottom-8 left-6 md:left-10 w-8 h-8 border-b border-l border-amber/40" />

          <div className="relative max-w-[620px]">
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="mb-8 font-mono text-[11px] uppercase tracking-[0.32em] text-amber flex items-center gap-3"
            >
              <span className="block h-px w-10 bg-amber" />
              Frame · 00 — Access
            </motion.p>

            <h1
              className="font-editorial font-[300] leading-[0.9] tracking-[-0.035em] text-ivory"
              style={{ fontSize: "clamp(48px, 7vw, 112px)" }}
            >
              <span className="block overflow-hidden">
                <motion.span
                  initial={{ y: "108%" }}
                  animate={{ y: "0%" }}
                  transition={{ duration: 0.95, delay: 0.15, ease: [0.2, 0.8, 0.2, 1] }}
                  className="block"
                >
                  The control
                </motion.span>
              </span>
              <span className="block overflow-hidden">
                <motion.span
                  initial={{ y: "108%" }}
                  animate={{ y: "0%" }}
                  transition={{ duration: 0.95, delay: 0.3, ease: [0.2, 0.8, 0.2, 1] }}
                  className="block"
                >
                  <em className="italic text-amber">room</em>.
                </motion.span>
              </span>
            </h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.55 }}
              className="mt-8 max-w-[500px] font-warm text-[14px] font-[300] leading-[1.8] text-ivory-60"
            >
              Your private client portal — review content, approve designs,
              read analytics, and stay in sync with your FrameFlow team. No more
              scattered emails, no more lost files.
            </motion.p>

            <motion.ul
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.7 }}
              className="mt-10 flex flex-col gap-4"
            >
              {[
                ["01", "Weekly and monthly social media schedule"],
                ["02", "Review & approve post designs and videos"],
                ["03", "Request redesigns or edits with feedback"],
                ["04", "Message your FrameFlow team directly"],
              ].map(([num, text]) => (
                <li key={num} className="flex items-start gap-5">
                  <span className="font-mono text-[10px] uppercase tracking-[0.24em] text-amber w-8 shrink-0 mt-[3px]">
                    {num}
                  </span>
                  <span className="flex items-start gap-3">
                    <span className="mt-[10px] block h-[1px] w-5 bg-ember shrink-0" />
                    <span className="font-warm text-[13.5px] font-[300] leading-[1.65] text-ivory">
                      {text}
                    </span>
                  </span>
                </li>
              ))}
            </motion.ul>
          </div>

          {/* bottom strip */}
          <div className="relative flex items-center justify-between gap-4 border-t border-ivory-10 pt-6">
            <div className="flex items-center gap-4">
              <Image
                src="/logo_white.png"
                alt="FrameFlow"
                width={120}
                height={36}
                className="h-[44px] w-auto"
              />
            </div>
            <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-ivory-30">
              © 2026 · Toronto
            </span>
          </div>
        </section>

        {/* ── Right auth ── */}
        <section className="relative lg:w-[44%] flex items-center justify-center px-6 md:px-10 py-14 lg:py-20">
          <motion.div
            initial={{ opacity: 0, y: 32 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="relative w-full max-w-[440px]"
          >
            {/* monitor chrome */}
            <div className="relative border border-amber/30 bg-graphite/80 backdrop-blur-sm p-3 shadow-[0_40px_90px_-30px_rgba(0,0,0,0.6)]">
              {/* chrome strip */}
              <div className="flex items-center gap-3 border border-amber/30 bg-graphite px-4 py-2.5 mb-3 font-mono text-[9px] uppercase tracking-[0.22em] text-ivory-60">
                <span className="flex items-center gap-2 text-ember">
                  <span className="w-1.5 h-1.5 rounded-full bg-ember animate-pulse-dot" />
                  AUTH
                </span>
                <span className="text-ivory-10">·</span>
                <span>frameflow.ca/portal</span>
                <span className="ml-auto text-amber">v4.6</span>
              </div>

              {/* inner card */}
              <div className="relative border border-ivory-10 bg-graphite p-8 md:p-10">
                <div aria-hidden className="absolute inset-3 border border-dashed border-ivory-10 pointer-events-none" />

                <div className="relative">
                  <p className="mb-5 font-mono text-[10px] uppercase tracking-[0.28em] text-amber flex items-center gap-3">
                    <span className="block h-px w-8 bg-amber" />
                    Client access
                  </p>
                  <h2
                    className="font-editorial font-[300] leading-[0.95] tracking-[-0.02em] text-ivory mb-3"
                    style={{ fontSize: "clamp(30px, 3vw, 42px)" }}
                  >
                    Welcome <em className="italic text-amber">back</em>.
                  </h2>
                  <p className="font-warm text-[13px] font-[300] text-ivory-60 leading-[1.7] mb-8">
                    Sign in to review your scenes, approve content, and sync
                    with your team.
                  </p>

                  <form onSubmit={handleSubmit} className="flex flex-col gap-6">
                    <div className="flex flex-col gap-2">
                      <label
                        className={`font-mono text-[9px] uppercase tracking-[0.24em] transition-colors duration-200 flex items-center gap-2 ${
                          emailFocused ? "text-amber" : "text-ivory-30"
                        }`}
                      >
                        <span className="text-amber">01</span>
                        <span>Email address</span>
                      </label>
                      <input
                        type="email"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        onFocus={() => setEmailFocused(true)}
                        onBlur={() => setEmailFocused(false)}
                        placeholder="you@company.com"
                        className={`w-full bg-transparent border-b font-warm text-[15px] font-[300] text-ivory outline-none placeholder:text-ivory-10 py-2 transition-colors duration-300 ${
                          emailFocused ? "border-amber" : "border-ivory-10"
                        }`}
                      />
                    </div>

                    <div className="flex flex-col gap-2">
                      <label
                        className={`font-mono text-[9px] uppercase tracking-[0.24em] transition-colors duration-200 flex items-center gap-2 ${
                          passwordFocused ? "text-amber" : "text-ivory-30"
                        }`}
                      >
                        <span className="text-amber">02</span>
                        <span>Password</span>
                      </label>
                      <input
                        type="password"
                        required
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        onFocus={() => setPasswordFocused(true)}
                        onBlur={() => setPasswordFocused(false)}
                        placeholder="••••••••"
                        className={`w-full bg-transparent border-b font-warm text-[15px] font-[300] text-ivory outline-none placeholder:text-ivory-10 py-2 transition-colors duration-300 ${
                          passwordFocused ? "border-amber" : "border-ivory-10"
                        }`}
                      />
                    </div>

                    <div className="flex items-center justify-between pt-1">
                      <label className="flex items-center gap-2 cursor-pointer group">
                        <input
                          type="checkbox"
                          checked={remember}
                          onChange={(e) => setRemember(e.target.checked)}
                          className="w-3 h-3 accent-amber border border-ivory-10 bg-ivory-05 cursor-pointer"
                        />
                        <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-ivory-60 group-hover:text-ivory transition-colors">
                          Remember me
                        </span>
                      </label>
                      <Link
                        href="#"
                        className="font-mono text-[10px] uppercase tracking-[0.2em] text-amber no-underline hover:text-ember transition-colors"
                      >
                        Reset key →
                      </Link>
                    </div>

                    <button
                      type="submit"
                      disabled={loading}
                      className="group mt-2 inline-flex items-center justify-center gap-3 bg-amber text-graphite font-mono text-[12px] font-medium tracking-[0.22em] uppercase py-[16px] px-6 transition-all duration-300 hover:bg-ember hover:text-ivory disabled:opacity-80 cursor-pointer"
                    >
                      {loading ? (
                        <>
                          <svg
                            className="animate-spin h-4 w-4"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                          >
                            <circle
                              className="opacity-25"
                              cx="12"
                              cy="12"
                              r="10"
                              stroke="currentColor"
                              strokeWidth="3"
                            />
                            <path
                              className="opacity-75"
                              fill="currentColor"
                              d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
                            />
                          </svg>
                          Rolling...
                        </>
                      ) : (
                        <>
                          <span className="relative flex h-2 w-2">
                            <span className="absolute inset-0 rounded-full bg-graphite/40 animate-ping group-hover:bg-ivory/40" />
                            <span className="relative inline-flex h-2 w-2 rounded-full bg-graphite group-hover:bg-ivory" />
                          </span>
                          Sign in
                          <span className="font-editorial not-italic text-[18px] leading-none transition-transform duration-300 group-hover:translate-x-1">
                            →
                          </span>
                        </>
                      )}
                    </button>
                  </form>

                  <div className="flex items-center gap-4 my-8">
                    <span className="flex-1 h-[1px] bg-ivory-10" />
                    <span className="font-mono text-[9px] uppercase tracking-[0.22em] text-ivory-30">
                      New on set?
                    </span>
                    <span className="flex-1 h-[1px] bg-ivory-10" />
                  </div>

                  <p className="font-warm text-[12px] font-[300] text-ivory-60 text-center leading-[1.6]">
                    Don&apos;t have a portal account yet?{" "}
                    <Link
                      href="/contact"
                      className="text-amber no-underline hover:text-ember transition-colors"
                    >
                      Contact FrameFlow →
                    </Link>
                  </p>
                </div>
              </div>
            </div>

            {/* floating side label */}
            <div className="absolute -left-2 top-4 hidden lg:block">
              <div
                className="font-mono text-[9px] uppercase tracking-[0.22em] text-ivory-30 whitespace-nowrap"
                style={{
                  transform: "rotate(-90deg)",
                  transformOrigin: "left top",
                }}
              >
                terminal 01 · secure
              </div>
            </div>
          </motion.div>
        </section>
      </div>
    </div>
  );
}
