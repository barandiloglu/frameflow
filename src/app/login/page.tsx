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
    setTimeout(() => {
      router.push("/dashboard");
    }, 1600);
  };

  return (
    <div className="h-screen w-screen overflow-hidden flex">
      {/* ── Left Panel ── */}
      <div className="relative hidden lg:flex w-[52%] bg-graphite border-r border-crimson-30 flex-col overflow-hidden">
        {/* Grid overlay */}
        <div
          className="pointer-events-none absolute inset-0"
          style={{
            backgroundImage:
              "linear-gradient(to right, rgba(137,47,42,0.15) 1px, transparent 1px), linear-gradient(to bottom, rgba(137,47,42,0.15) 1px, transparent 1px)",
            backgroundSize: "64px 64px",
          }}
        />

        {/* Floating orb */}
        <div className="absolute -bottom-24 -left-24 w-[320px] h-[320px] rounded-full bg-amber opacity-[0.07] blur-[100px] animate-orb" />

        {/* Back link */}
        <div className="relative z-10 px-10 pt-9">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-[13px] text-ivory-30 font-body transition-colors duration-200 hover:text-amber no-underline"
          >
            <span className="text-[16px]">&larr;</span> Back to Website
          </Link>
        </div>

        {/* Center content */}
        <div className="relative z-10 flex-1 flex flex-col justify-center px-14 max-w-[580px]">
          {/* Eyebrow */}
          <div className="flex items-center gap-3 mb-6">
            <span className="block w-8 h-[2px] bg-amber" />
            <span className="text-[11px] uppercase tracking-[0.18em] text-amber font-body font-medium">
              Client Portal
            </span>
          </div>

          {/* Title */}
          <h1
            className="font-display font-[800] text-ivory leading-[1.05] mb-5"
            style={{ fontSize: "clamp(44px, 4.5vw, 72px)" }}
          >
            Your Growth,
            <br />
            <span className="text-amber italic">Managed.</span>
          </h1>

          {/* Subtitle */}
          <p className="text-[15px] font-body font-light text-ivory-30 leading-[1.7] mb-9 max-w-[420px]">
            Log in to access your dedicated client portal — review content,
            approve designs, and stay in sync with your FrameFlow team.
          </p>

          {/* Feature bullets */}
          <ul className="flex flex-col gap-3.5">
            {[
              "View your monthly & weekly social media schedule",
              "Review and approve post designs & edited videos",
              "Request redesigns or edits with direct feedback",
              "Message your FrameFlow team directly",
            ].map((item) => (
              <li key={item} className="flex items-start gap-3">
                <span className="mt-[7px] block w-[6px] h-[6px] rounded-full bg-amber shrink-0" />
                <span className="text-[13.5px] text-ivory-60 font-body font-light leading-[1.55]">
                  {item}
                </span>
              </li>
            ))}
          </ul>
        </div>

        {/* Bottom brand */}
        <div className="relative z-10 px-10 pb-8 flex items-center justify-between">
          <Image
            src="/logo_white.png"
            alt="FrameFlow"
            width={140}
            height={40}
            className="h-[50px] w-auto"
          />
          <span className="text-[11px] text-ivory-10 font-body">
            &copy; 2025 FrameFlow Digital
          </span>
        </div>
      </div>

      {/* ── Right Panel ── */}
      <div className="relative w-full lg:flex-1 bg-crimson flex items-center justify-center overflow-hidden">
        {/* Grid overlay */}
        <div
          className="pointer-events-none absolute inset-0"
          style={{
            backgroundImage:
              "linear-gradient(to right, rgba(53,50,48,0.08) 1px, transparent 1px), linear-gradient(to bottom, rgba(53,50,48,0.08) 1px, transparent 1px)",
            backgroundSize: "48px 48px",
          }}
        />

        {/* Floating orb */}
        <div className="absolute -top-20 -right-20 w-[280px] h-[280px] rounded-full bg-amber opacity-[0.09] blur-[90px] animate-orb" />

        {/* Login Card */}
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="relative z-10 w-full max-w-[420px] mx-6 bg-graphite border border-crimson-30 rounded-[3px] p-9"
        >
          {/* Tag */}
          <div className="flex items-center gap-3 mb-5">
            <span className="block w-6 h-[2px] bg-amber" />
            <span className="text-[10px] uppercase tracking-[0.18em] text-amber font-body font-medium">
              Client Access
            </span>
          </div>

          {/* Title */}
          <h2 className="font-display text-[28px] font-[700] text-ivory leading-[1.15] mb-1.5">
            Welcome Back
          </h2>
          <p className="text-[13px] font-body font-light text-ivory-30 leading-[1.6] mb-7">
            Sign in to your client portal to review content, approve designs,
            and connect with your team.
          </p>

          <form onSubmit={handleSubmit} className="flex flex-col gap-5">
            {/* Email */}
            <div className="flex flex-col gap-1.5">
              <label
                className={`text-[10px] uppercase tracking-[0.16em] font-body font-medium transition-colors duration-200 ${
                  emailFocused ? "text-amber" : "text-ivory-30"
                }`}
              >
                Email Address
              </label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                onFocus={() => setEmailFocused(true)}
                onBlur={() => setEmailFocused(false)}
                placeholder="you@company.com"
                className="w-full h-[46px] px-3.5 text-[14px] font-body font-light text-ivory bg-ivory-05 border border-crimson-30 rounded-[2px] outline-none placeholder:text-ivory-10 transition-all duration-200 focus:border-amber focus:bg-amber-20"
              />
            </div>

            {/* Password */}
            <div className="flex flex-col gap-1.5">
              <label
                className={`text-[10px] uppercase tracking-[0.16em] font-body font-medium transition-colors duration-200 ${
                  passwordFocused ? "text-amber" : "text-ivory-30"
                }`}
              >
                Password
              </label>
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                onFocus={() => setPasswordFocused(true)}
                onBlur={() => setPasswordFocused(false)}
                placeholder="&bull;&bull;&bull;&bull;&bull;&bull;&bull;&bull;"
                className="w-full h-[46px] px-3.5 text-[14px] font-body font-light text-ivory bg-ivory-05 border border-crimson-30 rounded-[2px] outline-none placeholder:text-ivory-10 transition-all duration-200 focus:border-amber focus:bg-amber-20"
              />
            </div>

            {/* Remember + Forgot */}
            <div className="flex items-center justify-between">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={remember}
                  onChange={(e) => setRemember(e.target.checked)}
                  className="w-3.5 h-3.5 accent-amber rounded-none border border-crimson-30 bg-ivory-05"
                />
                <span className="text-[11.5px] text-ivory-30 font-body font-light">
                  Remember me
                </span>
              </label>
              <Link
                href="#"
                className="text-[11.5px] text-amber font-body font-light no-underline transition-opacity duration-200 hover:opacity-70"
              >
                Forgot password?
              </Link>
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={loading}
              className="w-full h-[48px] mt-1 bg-amber text-graphite font-display text-[14px] font-[700] tracking-[0.04em] rounded-[2px] flex items-center justify-center gap-2 transition-opacity duration-200 hover:opacity-90 disabled:opacity-70 cursor-pointer"
            >
              {loading ? (
                <svg
                  className="animate-spin h-5 w-5 text-graphite"
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
              ) : (
                <>
                  Sign In <span className="text-[16px]">&rarr;</span>
                </>
              )}
            </button>
          </form>

          {/* Divider */}
          <div className="flex items-center gap-4 my-6">
            <span className="flex-1 h-[1px] bg-crimson-30" />
            <span className="text-[10px] uppercase tracking-[0.14em] text-ivory-10 font-body">
              New client?
            </span>
            <span className="flex-1 h-[1px] bg-crimson-30" />
          </div>

          {/* Contact note */}
          <p className="text-[12px] text-ivory-30 font-body font-light text-center leading-[1.6]">
            Don&apos;t have a portal account yet?{" "}
            <Link
              href="/contact"
              className="text-amber no-underline font-medium transition-opacity duration-200 hover:opacity-70"
            >
              Contact FrameFlow
            </Link>
          </p>
        </motion.div>
      </div>
    </div>
  );
}
