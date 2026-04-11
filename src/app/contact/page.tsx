"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";

/* ------------------------------------------------------------------ */
/*  Data                                                               */
/* ------------------------------------------------------------------ */

const faqs = [
  {
    q: "How long does a typical project take?",
    a: "Most projects run 4–8 weeks depending on scope. A logo might wrap in 2 weeks; a full brand + website can take 8–12. You'll get a detailed timeline in the free consultation.",
  },
  {
    q: "Do you work with businesses outside Toronto?",
    a: "Absolutely. We're based in Toronto but work with clients across Canada and internationally. Our process is fully remote-friendly — video calls, shared boards, and the client portal keep everything running smoothly.",
  },
  {
    q: "What does the free consultation involve?",
    a: "A relaxed 30-minute call where we learn about your business, goals, and vision. We discuss which services make sense, outline a rough timeline, and give you a ballpark budget. No pressure, no obligations.",
  },
  {
    q: "How does the client portal work?",
    a: "Once kickoff happens, you get a private portal to track progress, review deliverables, leave feedback, and approve milestones. Everything stays organized — nothing gets lost in email threads.",
  },
  {
    q: "What are your payment terms?",
    a: "We usually split projects into milestones — 50% upfront, 50% on completion. For larger projects we can arrange a three-part schedule. E-transfer, credit card, and wire accepted.",
  },
];

const serviceOptions = [
  "Logo Design",
  "Brand Identity",
  "Website Design",
  "Social Media",
  "Video & Photo",
  "Ad Management",
  "Web / Mobile App",
  "Multiple Services",
  "Not Sure Yet",
];

const budgetOptions = [
  "Under $1,000",
  "$1,000–$3,000",
  "$3,000–$7,500",
  "$7,500–$15,000",
  "$15,000+",
  "Let's discuss",
];

/* ------------------------------------------------------------------ */
/*  Page                                                               */
/* ------------------------------------------------------------------ */

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false);
  const [caseId, setCaseId] = useState("");
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const id = `FF-${new Date().getFullYear()}-${Math.floor(Math.random() * 900 + 100)}`;
    setCaseId(id);
    setSubmitted(true);
  };

  return (
    <>
      <Navbar />

      {/* ============================================================ */}
      {/*  HERO                                                        */}
      {/* ============================================================ */}
      <section className="relative bg-surface overflow-hidden pt-[76px]">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 opacity-60"
          style={{
            backgroundImage:
              "radial-gradient(var(--color-amber-10) 1px, transparent 1px)",
            backgroundSize: "38px 38px",
            maskImage:
              "radial-gradient(ellipse 80% 70% at 50% 50%, black 20%, transparent 90%)",
            WebkitMaskImage:
              "radial-gradient(ellipse 80% 70% at 50% 50%, black 20%, transparent 90%)",
          }}
        />
        <div className="pointer-events-none absolute top-[14%] right-[8%] h-[340px] w-[340px] rounded-full bg-ember-10 blur-[140px]" />

        <div className="relative z-20 border-y border-border-subtle bg-surface/50 backdrop-blur-sm px-6 md:px-[52px] py-3 flex items-center gap-6 font-mono text-[10px] uppercase tracking-[0.28em] text-on-surface-60">
          <span className="flex items-center gap-2 text-ember font-semibold">
            <span className="relative flex h-2 w-2">
              <span className="absolute inset-0 rounded-full bg-ember animate-ping" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-ember" />
            </span>
            OPEN
          </span>
          <span>FF_BOOKING</span>
          <span className="hidden sm:inline text-on-surface-30">/</span>
          <span className="hidden sm:inline">accepting inquiries · 2026</span>
          <span className="ml-auto hidden md:flex items-center gap-2">
            <span className="text-on-surface-30">SLA</span>
            <span className="text-amber">&lt; 1 business day</span>
          </span>
        </div>

        <div className="relative z-10 px-6 md:px-[52px] pt-24 md:pt-32 pb-24">
          <div className="relative max-w-[1500px] mx-auto">
            <span aria-hidden className="pointer-events-none absolute -top-10 -left-3 md:-left-8 w-8 h-8 md:w-10 md:h-10 border-t border-l border-amber/50" />
            <span aria-hidden className="pointer-events-none absolute -top-10 -right-3 md:-right-8 w-8 h-8 md:w-10 md:h-10 border-t border-r border-amber/50" />

            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="font-mono text-[11px] uppercase tracking-[0.32em] text-amber mb-7 flex items-center gap-3"
            >
              <span className="block h-px w-10 bg-amber" />
              <span>
                <Link href="/" className="text-on-surface-60 hover:text-amber transition-colors">Home</Link>
                <span className="mx-2 text-on-surface-30">/</span>
                Contact
              </span>
            </motion.p>

            <h1
              className="font-editorial font-[300] leading-[0.9] tracking-[-0.035em] text-on-surface"
              style={{ fontSize: "clamp(54px, 10vw, 168px)" }}
            >
              <span className="block overflow-hidden">
                <motion.span
                  initial={{ y: "108%" }}
                  animate={{ y: "0%" }}
                  transition={{ duration: 0.95, delay: 0.15, ease: [0.2, 0.8, 0.2, 1] }}
                  className="block"
                >
                  Pitch us your
                </motion.span>
              </span>
              <span className="block overflow-hidden">
                <motion.span
                  initial={{ y: "108%" }}
                  animate={{ y: "0%" }}
                  transition={{ duration: 0.95, delay: 0.3, ease: [0.2, 0.8, 0.2, 1] }}
                  className="block"
                >
                  <em className="italic text-amber">scene</em>.
                </motion.span>
              </span>
            </h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.55 }}
              className="mt-10 max-w-[560px] font-warm text-[15px] font-[300] leading-[1.75] text-on-surface-60"
            >
              Tell us what you&apos;re building. We read every brief personally and reply
              within one business day — no bots, no autoresponders, no pitch decks back.
            </motion.p>

            <motion.a
              href="mailto:hello@frameflow.ca"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.7 }}
              className="mt-8 inline-flex items-center gap-3 font-editorial italic text-[26px] md:text-[32px] text-amber no-underline group"
            >
              hello@frameflow.ca
              <span className="font-editorial not-italic text-[22px] transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1">
                ↗
              </span>
            </motion.a>
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/*  CONTACT MAIN                                                */}
      {/* ============================================================ */}
      <section className="grid grid-cols-1 lg:grid-cols-[1.25fr_1fr] border-y border-border-subtle">
        {/* ── Left: Form ── */}
        <div className="relative bg-surface border-b lg:border-b-0 lg:border-r border-border-subtle px-6 md:px-[60px] py-[100px]">
          <div className="max-w-[640px]">
            <AnimatePresence mode="wait">
              {!submitted ? (
                <motion.div
                  key="form"
                  initial={{ opacity: 1 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.4 }}
                >
                  <p className="mb-10 font-mono text-[11px] uppercase tracking-[0.28em] text-amber flex items-center gap-3">
                    <span className="block h-px w-10 bg-amber" />
                    Frame · 01 — Pre-production brief
                  </p>

                  <h2
                    className="font-editorial font-[300] leading-[0.95] tracking-[-0.02em] text-on-surface mb-10"
                    style={{ fontSize: "clamp(32px, 3.6vw, 56px)" }}
                  >
                    Tell us about the <em className="italic text-amber">shoot</em>.
                  </h2>

                  <form onSubmit={handleSubmit} className="flex flex-col gap-9">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-9">
                      <SlateField num="01" label="Full Name" name="fullName" required />
                      <SlateField num="02" label="Business Name" name="businessName" />
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-9">
                      <SlateField
                        num="03"
                        label="Email Address"
                        name="email"
                        type="email"
                        required
                      />
                      <SlateField num="04" label="Phone (Optional)" name="phone" type="tel" />
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-9">
                      <SlateSelect
                        num="05"
                        label="Service"
                        name="service"
                        options={serviceOptions}
                        required
                      />
                      <SlateSelect
                        num="06"
                        label="Budget"
                        name="budget"
                        options={budgetOptions}
                        required
                      />
                    </div>

                    <SlateTextarea
                      num="07"
                      label="Your project in one paragraph"
                      name="message"
                      required
                    />

                    <button
                      type="submit"
                      className="group mt-4 inline-flex items-center justify-center gap-4 bg-amber text-graphite font-mono text-[12px] font-medium tracking-[0.22em] uppercase py-[18px] px-8 no-underline transition-all duration-300 hover:bg-ember hover:text-ivory cursor-pointer"
                    >
                      <span className="relative flex h-2 w-2">
                        <span className="absolute inset-0 rounded-full bg-graphite/40 animate-ping group-hover:bg-ivory/40" />
                        <span className="relative inline-flex h-2 w-2 rounded-full bg-graphite group-hover:bg-ivory" />
                      </span>
                      Send the brief
                      <span className="font-editorial text-[18px] leading-none transition-transform duration-300 group-hover:translate-x-1">
                        →
                      </span>
                    </button>
                  </form>
                </motion.div>
              ) : (
                <motion.div
                  key="success"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6 }}
                  className="flex flex-col items-start text-left min-h-[500px] justify-center"
                >
                  <p className="mb-8 font-mono text-[11px] uppercase tracking-[0.28em] text-ember flex items-center gap-3">
                    <span className="w-2 h-2 rounded-full bg-ember animate-pulse-dot" />
                    Brief received
                  </p>
                  <h2
                    className="font-editorial font-[300] leading-[0.95] tracking-[-0.02em] text-on-surface mb-6"
                    style={{ fontSize: "clamp(40px, 5vw, 72px)" }}
                  >
                    That&apos;s a <em className="italic text-amber">wrap</em>.
                  </h2>
                  <p className="font-warm text-[15px] font-[300] leading-[1.75] text-on-surface-60 max-w-[460px]">
                    Thanks for reaching out. We&apos;ll review your brief and reply
                    within one business day with next steps. Check your inbox for a
                    confirmation.
                  </p>
                  <div className="mt-10 flex items-center gap-3 font-mono text-[10px] uppercase tracking-[0.24em] text-on-surface-30">
                    <span className="h-px w-10 bg-amber" />
                    <span className="text-amber">Case · {caseId}</span>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* ── Right: Studio info ── */}
        <div className="relative bg-surface-alt px-6 md:px-[60px] py-[100px] overflow-hidden">
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 opacity-40"
            style={{
              backgroundImage:
                "linear-gradient(var(--color-graphite-20) 1px, transparent 1px), linear-gradient(90deg, var(--color-graphite-20) 1px, transparent 1px)",
              backgroundSize: "60px 60px",
              maskImage:
                "radial-gradient(ellipse 70% 80% at 90% 50%, black 20%, transparent 95%)",
              WebkitMaskImage:
                "radial-gradient(ellipse 70% 80% at 90% 50%, black 20%, transparent 95%)",
            }}
          />
          <div className="relative">
            <p className="mb-10 font-mono text-[11px] uppercase tracking-[0.28em] text-on-alt-60 flex items-center gap-3">
              <span className="block h-px w-10 bg-on-alt-30" />
              Studio info
            </p>

            <h3
              className="font-editorial font-[300] leading-[0.95] tracking-[-0.02em] text-on-alt mb-14"
              style={{ fontSize: "clamp(34px, 4vw, 56px)" }}
            >
              On set in <em className="italic text-amber">Toronto</em>.
            </h3>

            <div className="flex flex-col gap-7">
              <InfoRow
                num="01"
                title="Location"
                main="99 Yorkville Ave, Unit 200"
                sub="Toronto · ON · Canada"
              />
              <InfoRow
                num="02"
                title="Email"
                main={
                  <a
                    href="mailto:hello@frameflow.ca"
                    className="text-amber hover:underline"
                  >
                    hello@frameflow.ca
                  </a>
                }
                sub="We respond within 1 business day"
              />
              <InfoRow
                num="03"
                title="Social"
                main={
                  <a
                    href="https://instagram.com/frameflowdigital"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-amber hover:underline"
                  >
                    @frameflowdigital
                  </a>
                }
                sub="Behind-the-scenes on Instagram"
              />
              <InfoRow
                num="04"
                title="Hours"
                main="Mon–Fri · 9am–6pm EST"
                sub="In-person meetings by appointment"
                last
              />
            </div>

            {/* Map card */}
            <div className="mt-12 relative border border-on-alt-10 bg-surface-alt aspect-[16/9] overflow-hidden">
              <div className="absolute inset-3 border border-dashed border-on-alt-10" />
              <div
                aria-hidden
                className="absolute inset-0 opacity-30"
                style={{
                  backgroundImage:
                    "linear-gradient(var(--color-graphite-20) 1px, transparent 1px), linear-gradient(90deg, var(--color-graphite-20) 1px, transparent 1px)",
                  backgroundSize: "28px 28px",
                }}
              />
              {/* pin */}
              <div className="absolute left-[54%] top-[48%] -translate-x-1/2 -translate-y-1/2">
                <span className="relative flex h-3 w-3">
                  <span className="absolute inset-0 rounded-full bg-ember animate-ping" />
                  <span className="relative inline-flex h-3 w-3 rounded-full bg-ember" />
                </span>
              </div>
              <div className="absolute bottom-4 left-4 font-mono text-[10px] uppercase tracking-[0.22em] text-on-alt-60">
                43.6709° N · 79.3933° W
              </div>
              <div className="absolute top-4 right-4 font-mono text-[10px] uppercase tracking-[0.22em] text-amber">
                Toronto
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/*  FAQ                                                         */}
      {/* ============================================================ */}
      <section className="relative bg-surface px-6 md:px-[52px] py-[140px]">
        <div className="max-w-[1200px] mx-auto">
          <div className="mb-16">
            <p className="mb-6 font-mono text-[11px] uppercase tracking-[0.32em] text-amber flex items-center gap-3">
              <span className="block h-px w-10 bg-amber" />
              Frame · 02 — Footnotes
            </p>
            <h2
              className="font-editorial font-[300] leading-[0.95] tracking-[-0.025em] text-on-surface"
              style={{ fontSize: "clamp(40px, 5.5vw, 92px)" }}
            >
              Quick <em className="italic text-amber">answers</em>.
            </h2>
          </div>

          <div>
            {faqs.map((faq, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.6, delay: i * 0.05 }}
                className="border-t border-border-subtle last:border-b"
              >
                <button
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  className="w-full flex items-center gap-6 py-7 text-left group cursor-pointer"
                >
                  <span className="font-mono text-[11px] uppercase tracking-[0.24em] text-amber shrink-0 w-10">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className="flex-1 font-editorial text-[20px] md:text-[24px] font-[400] text-on-surface group-hover:text-amber transition-colors duration-300">
                    {faq.q}
                  </span>
                  <span
                    className="font-editorial text-[28px] leading-none text-on-surface-30 group-hover:text-amber transition-all duration-300 shrink-0"
                    style={{
                      transform: openFaq === i ? "rotate(45deg)" : "rotate(0deg)",
                    }}
                  >
                    +
                  </span>
                </button>
                <AnimatePresence initial={false}>
                  {openFaq === i && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.4, ease: [0.2, 0.8, 0.2, 1] }}
                      className="overflow-hidden"
                    >
                      <div className="pl-16 pr-12 pb-7">
                        <p className="font-warm text-[14px] font-[300] text-on-surface-60 leading-[1.85] max-w-[720px]">
                          {faq.a}
                        </p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}

/* ------------------------------------------------------------------ */
/*  Form sub-components — slate style                                  */
/* ------------------------------------------------------------------ */

function SlateField({
  num,
  label,
  name,
  type = "text",
  required = false,
}: {
  num: string;
  label: string;
  name: string;
  type?: string;
  required?: boolean;
}) {
  const [focused, setFocused] = useState(false);
  const [value, setValue] = useState("");

  return (
    <div className="relative pt-5">
      <label className="absolute top-0 left-0 flex items-center gap-2 font-mono text-[9px] uppercase tracking-[0.24em] text-on-surface-30">
        <span className="text-amber">{num}</span>
        <span className={focused ? "text-amber" : ""}>{label}</span>
        {required && <span className="text-ember">*</span>}
      </label>
      <input
        name={name}
        type={type}
        required={required}
        value={value}
        onChange={(e) => setValue(e.target.value)}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        className={`w-full bg-transparent border-b pt-2 pb-3 font-warm text-[15px] font-[300] text-on-surface outline-none transition-colors duration-300 ${
          focused ? "border-amber" : "border-border-subtle"
        }`}
      />
    </div>
  );
}

function SlateSelect({
  num,
  label,
  name,
  options,
  required = false,
}: {
  num: string;
  label: string;
  name: string;
  options: string[];
  required?: boolean;
}) {
  const [focused, setFocused] = useState(false);
  const [value, setValue] = useState("");

  return (
    <div className="relative pt-5">
      <label className="absolute top-0 left-0 flex items-center gap-2 font-mono text-[9px] uppercase tracking-[0.24em] text-on-surface-30">
        <span className="text-amber">{num}</span>
        <span className={focused ? "text-amber" : ""}>{label}</span>
        {required && <span className="text-ember">*</span>}
      </label>
      <select
        name={name}
        required={required}
        defaultValue=""
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        onChange={(e) => setValue(e.target.value)}
        className={`w-full bg-transparent border-b pt-2 pb-3 font-warm text-[15px] font-[300] text-on-surface outline-none appearance-none cursor-pointer transition-colors duration-300 ${
          focused ? "border-amber" : "border-border-subtle"
        } ${value ? "" : "text-on-surface-30"}`}
      >
        <option value="" disabled hidden />
        {options.map((opt) => (
          <option key={opt} value={opt} className="bg-surface text-on-surface">
            {opt}
          </option>
        ))}
      </select>
      <svg
        className="pointer-events-none absolute right-0 top-7 w-4 h-4 text-on-surface-30"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={1.5}
      >
        <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
      </svg>
    </div>
  );
}

function SlateTextarea({
  num,
  label,
  name,
  required = false,
}: {
  num: string;
  label: string;
  name: string;
  required?: boolean;
}) {
  const [focused, setFocused] = useState(false);

  return (
    <div className="relative pt-5">
      <label className="absolute top-0 left-0 flex items-center gap-2 font-mono text-[9px] uppercase tracking-[0.24em] text-on-surface-30">
        <span className="text-amber">{num}</span>
        <span className={focused ? "text-amber" : ""}>{label}</span>
        {required && <span className="text-ember">*</span>}
      </label>
      <textarea
        name={name}
        required={required}
        rows={4}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        className={`w-full bg-transparent border-b pt-2 pb-3 font-warm text-[15px] font-[300] text-on-surface outline-none resize-none transition-colors duration-300 ${
          focused ? "border-amber" : "border-border-subtle"
        }`}
      />
    </div>
  );
}

function InfoRow({
  num,
  title,
  main,
  sub,
  last = false,
}: {
  num: string;
  title: string;
  main: React.ReactNode;
  sub: string;
  last?: boolean;
}) {
  return (
    <div className={`${!last ? "border-b border-on-alt-10 pb-7" : ""}`}>
      <div className="flex items-baseline gap-5">
        <span className="font-mono text-[10px] uppercase tracking-[0.24em] text-amber shrink-0">
          {num}
        </span>
        <div className="flex-1">
          <p className="font-mono text-[9px] uppercase tracking-[0.22em] text-on-alt-60 mb-2">
            {title}
          </p>
          <p className="font-editorial text-[22px] text-on-alt leading-[1.2] mb-1">
            {main}
          </p>
          <p className="font-warm text-[12px] font-[300] text-on-alt-60">
            {sub}
          </p>
        </div>
      </div>
    </div>
  );
}
