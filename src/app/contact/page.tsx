"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Reveal } from "@/components/Reveal";

/* ─── FAQ data ─── */
const faqs = [
  {
    q: "How long does a typical project take?",
    a: "Most projects take between 4–8 weeks depending on scope. A simple logo design might wrap up in 2 weeks, while a full brand identity with a website can take 8–12 weeks. We'll give you a detailed timeline during the free consultation.",
  },
  {
    q: "Do you work with businesses outside of Toronto?",
    a: "Absolutely. While we're based in Toronto, we work with clients across Canada and internationally. Our process is fully remote-friendly — we use video calls, shared project boards, and our client portal to keep everything running smoothly regardless of location.",
  },
  {
    q: "What does the free consultation involve?",
    a: "It's a relaxed 30-minute call where we learn about your business, goals, and vision. We'll discuss which services make sense for you, outline a rough timeline, and give you a ballpark budget — no pressure, no obligations.",
  },
  {
    q: "How does the client portal work?",
    a: "Once your project kicks off you'll get access to a private portal where you can track progress, review deliverables, leave feedback, and approve milestones. Everything stays organized in one place so nothing gets lost in email threads.",
  },
  {
    q: "What are your payment terms?",
    a: "We typically split projects into milestones — 50% upfront to begin and 50% upon completion. For larger projects we can arrange a three-part payment schedule. We accept e-transfer, credit card, and wire transfer.",
  },
];

/* ─── Service & Budget options ─── */
const services = [
  "Logo Design",
  "Brand Identity",
  "Website Design",
  "Social Media Management",
  "Video & Photo",
  "Ad Management",
  "Web & Mobile App",
  "Multiple Services",
  "Not Sure Yet",
];

const budgets = [
  "Under $1,000",
  "$1,000–$3,000",
  "$3,000–$7,500",
  "$7,500–$15,000",
  "$15,000+",
  "Let's discuss",
];

/* ─── Page ─── */
export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <>
      <Navbar />

      {/* ━━━ HERO ━━━ */}
      <section className="relative h-[50vh] flex items-end bg-surface overflow-hidden">
        {/* grid pattern */}
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,235,.15) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,235,.15) 1px,transparent 1px)",
            backgroundSize: "60px 60px",
          }}
        />
        {/* floating orb */}
        <div className="pointer-events-none absolute top-[15%] right-[12%] w-[340px] h-[340px] rounded-full bg-amber/10 blur-[120px] animate-orb" />

        <div className="relative z-10 w-full px-6 md:px-[52px] pb-[52px]">
          <Reveal>
            {/* eyebrow */}
            <div className="flex items-center gap-4 mb-5">
              <span className="block w-8 h-px bg-amber" />
              <span className="font-body text-[11px] uppercase tracking-[0.18em] text-on-surface-60">
                Let&apos;s Connect
              </span>
            </div>

            {/* title */}
            <h1
              className="font-display font-[800] text-on-surface leading-[1.05] tracking-tight"
              style={{ fontSize: "clamp(60px, 8vw, 120px)" }}
            >
              Let&apos;s{" "}
              <span className="text-amber italic">Talk.</span>
            </h1>

            {/* email link */}
            <a
              href="mailto:hello@frameflow.ca"
              className="group inline-flex items-center gap-2 mt-6 font-body text-[15px] text-amber hover:gap-4 transition-all duration-300"
            >
              hello@frameflow.ca
              <span className="text-[18px] transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5">
                &#8599;
              </span>
            </a>
          </Reveal>
        </div>
      </section>

      {/* ━━━ CONTACT MAIN ━━━ */}
      <section className="grid grid-cols-1 lg:grid-cols-[1.2fr_1fr]">
        {/* ── Left: Form ── */}
        <div className="bg-surface border-r border-border-subtle px-6 md:px-[52px] py-[72px]">
          <AnimatePresence mode="wait">
            {!submitted ? (
              <motion.div
                key="form"
                initial={{ opacity: 1 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.4 }}
              >
                <Reveal>
                  <div className="flex items-center gap-4 mb-10">
                    <span className="font-body text-[11px] uppercase tracking-[0.18em] text-on-surface-60">
                      Send us a message
                    </span>
                    <span className="flex-1 h-px bg-border-subtle" />
                  </div>
                </Reveal>

                <form onSubmit={handleSubmit} className="space-y-8">
                  {/* Row 1 */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <FloatingField label="Full Name" name="fullName" required />
                    <FloatingField label="Business Name" name="businessName" />
                  </div>

                  {/* Row 2 */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <FloatingField label="Email Address" name="email" type="email" required />
                    <FloatingField label="Phone (Optional)" name="phone" type="tel" />
                  </div>

                  {/* Row 3 */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <FloatingSelect label="Service" name="service" options={services} required />
                    <FloatingSelect label="Budget" name="budget" options={budgets} required />
                  </div>

                  {/* Textarea */}
                  <FloatingTextarea
                    label="Tell Us About Your Project"
                    name="message"
                    required
                  />

                  {/* Submit */}
                  <Reveal delay={0.15}>
                    <button
                      type="submit"
                      className="w-full py-[18px] bg-amber text-graphite font-body font-medium text-[13px] uppercase tracking-[0.1em] rounded-[1px] hover:bg-[#e09f3a] transition-colors duration-200 cursor-pointer"
                    >
                      Send Message &rarr;
                    </button>
                  </Reveal>
                </form>
              </motion.div>
            ) : (
              <motion.div
                key="success"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
                className="flex flex-col items-center justify-center text-center min-h-[500px]"
              >
                {/* checkmark */}
                <div className="w-[72px] h-[72px] rounded-full border-2 border-amber flex items-center justify-center mb-6">
                  <svg
                    className="w-8 h-8 text-amber"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2.5}
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <h2 className="font-display text-[36px] font-[800] text-on-surface mb-3">
                  Message Sent!
                </h2>
                <p className="font-body text-[15px] text-on-surface-30 max-w-[340px]">
                  Thanks for reaching out. We&apos;ll get back to you within 1 business day.
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* ── Right: Info ── */}
        <div className="bg-crimson px-6 md:px-[52px] py-[72px]">
          <Reveal>
            <div className="flex items-center gap-4 mb-10">
              <span className="font-body text-[11px] uppercase tracking-[0.18em] text-ivory-60">
                Contact Details
              </span>
              <span className="flex-1 h-px bg-ivory-10" />
            </div>
          </Reveal>

          <div className="space-y-0">
            <InfoBlock
              title="Office"
              main="99 Yorkville Ave Unit 200, Toronto, ON, Canada"
              sub="Available for in-person meetings by appointment"
              delay={0.05}
            />
            <InfoBlock
              title="Email"
              main={
                <a
                  href="mailto:hello@frameflow.ca"
                  className="text-amber hover:underline transition-colors"
                >
                  hello@frameflow.ca
                </a>
              }
              sub="We respond within 1 business day"
              delay={0.1}
            />
            <InfoBlock
              title="Social"
              main={
                <a
                  href="https://instagram.com/frameflowdigital"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-amber hover:underline transition-colors"
                >
                  @frameflowdigital
                </a>
              }
              sub="Follow us on Instagram"
              delay={0.15}
            />
            <InfoBlock
              title="Office Hours"
              main="Mon–Fri, 9am–6pm EST"
              sub="Weekend inquiries answered Monday morning"
              delay={0.2}
              last
            />
          </div>

          {/* Map placeholder */}
          <Reveal delay={0.25}>
            <div className="mt-10 border border-ivory-10 rounded-sm aspect-[16/9] flex flex-col items-center justify-center bg-ivory-05/5">
              <span className="font-display text-[18px] font-[700] text-ivory mb-1">
                Toronto, Canada
              </span>
              <span className="font-body text-[13px] text-ivory-30">
                99 Yorkville Ave
              </span>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ━━━ FAQ ━━━ */}
      <section className="bg-surface border-t border-border-subtle px-6 md:px-[52px] py-[96px]">
        {/* Header */}
        <Reveal>
          <div className="max-w-[720px] mb-14">
            <div className="flex items-center gap-4 mb-5">
              <span className="block w-8 h-px bg-amber" />
              <span className="font-body text-[11px] uppercase tracking-[0.18em] text-on-surface-60">
                FAQ
              </span>
            </div>
            <h2 className="font-display text-[clamp(36px,4vw,56px)] font-[800] text-on-surface leading-[1.1] mb-4">
              Quick Answers
            </h2>
            <p className="font-body text-[15px] text-on-surface-30 leading-[1.7] max-w-[540px]">
              Everything you need to know before we get started. Can&apos;t find your answer?
              Feel free to reach out directly.
            </p>
          </div>
        </Reveal>

        {/* Accordion */}
        <div className="max-w-[720px]">
          {faqs.map((faq, i) => (
            <Reveal key={i} delay={i * 0.05}>
              <div className="border-t border-border-subtle last:border-b">
                <button
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  className="w-full flex items-center justify-between py-6 text-left group cursor-pointer"
                >
                  <span className="font-body text-[16px] text-on-surface group-hover:text-amber transition-colors duration-300">
                    {faq.q}
                  </span>
                  <span
                    className="text-on-surface-30 text-[22px] leading-none transition-transform duration-300 flex-shrink-0 ml-6"
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
                      transition={{ duration: 0.35, ease: [0.25, 0.46, 0.45, 0.94] }}
                      className="overflow-hidden"
                    >
                      <p className="font-body text-[14px] text-on-surface-30 leading-[1.8] pb-6 pr-12">
                        {faq.a}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      <Footer />
    </>
  );
}

/* ─── Reusable form sub-components ─── */

function FloatingField({
  label,
  name,
  type = "text",
  required = false,
}: {
  label: string;
  name: string;
  type?: string;
  required?: boolean;
}) {
  const [focused, setFocused] = useState(false);
  const [filled, setFilled] = useState(false);

  return (
    <Reveal>
      <div className="relative">
        <label
          className={`absolute left-0 transition-all duration-300 pointer-events-none font-body uppercase tracking-[0.14em] ${
            focused || filled
              ? "-top-4 text-[9px]"
              : "top-3 text-[10px]"
          } ${focused ? "text-amber" : "text-on-surface-30"}`}
        >
          {label}
        </label>
        <input
          name={name}
          type={type}
          required={required}
          onFocus={() => setFocused(true)}
          onBlur={(e) => {
            setFocused(false);
            setFilled(e.target.value.length > 0);
          }}
          className={`w-full bg-transparent border-b pt-3 pb-2 font-body text-[15px] text-on-surface outline-none transition-colors duration-300 ${
            focused ? "border-amber" : "border-border-subtle"
          }`}
        />
      </div>
    </Reveal>
  );
}

function FloatingSelect({
  label,
  name,
  options,
  required = false,
}: {
  label: string;
  name: string;
  options: string[];
  required?: boolean;
}) {
  const [focused, setFocused] = useState(false);
  const [filled, setFilled] = useState(false);

  return (
    <Reveal>
      <div className="relative">
        <label
          className={`absolute left-0 transition-all duration-300 pointer-events-none font-body uppercase tracking-[0.14em] ${
            focused || filled
              ? "-top-4 text-[9px]"
              : "top-3 text-[10px]"
          } ${focused ? "text-amber" : "text-on-surface-30"}`}
        >
          {label}
        </label>
        <select
          name={name}
          required={required}
          defaultValue=""
          onFocus={() => setFocused(true)}
          onBlur={(e) => {
            setFocused(false);
            setFilled(e.target.value.length > 0);
          }}
          onChange={(e) => setFilled(e.target.value.length > 0)}
          className={`w-full bg-transparent border-b pt-3 pb-2 font-body text-[15px] text-on-surface outline-none appearance-none cursor-pointer transition-colors duration-300 ${
            focused ? "border-amber" : "border-border-subtle"
          }`}
        >
          <option value="" disabled hidden />
          {options.map((opt) => (
            <option key={opt} value={opt} className="bg-surface text-on-surface">
              {opt}
            </option>
          ))}
        </select>
        {/* chevron */}
        <svg
          className="pointer-events-none absolute right-0 top-4 w-4 h-4 text-on-surface-30"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
        </svg>
      </div>
    </Reveal>
  );
}

function FloatingTextarea({
  label,
  name,
  required = false,
}: {
  label: string;
  name: string;
  required?: boolean;
}) {
  const [focused, setFocused] = useState(false);
  const [filled, setFilled] = useState(false);

  return (
    <Reveal>
      <div className="relative">
        <label
          className={`absolute left-0 transition-all duration-300 pointer-events-none font-body uppercase tracking-[0.14em] ${
            focused || filled
              ? "-top-4 text-[9px]"
              : "top-3 text-[10px]"
          } ${focused ? "text-amber" : "text-on-surface-30"}`}
        >
          {label}
        </label>
        <textarea
          name={name}
          required={required}
          rows={4}
          onFocus={() => setFocused(true)}
          onBlur={(e) => {
            setFocused(false);
            setFilled(e.target.value.length > 0);
          }}
          className={`w-full bg-transparent border-b pt-3 pb-2 font-body text-[15px] text-on-surface outline-none resize-none transition-colors duration-300 ${
            focused ? "border-amber" : "border-border-subtle"
          }`}
        />
      </div>
    </Reveal>
  );
}

function InfoBlock({
  title,
  main,
  sub,
  delay = 0,
  last = false,
}: {
  title: string;
  main: React.ReactNode;
  sub: string;
  delay?: number;
  last?: boolean;
}) {
  return (
    <Reveal delay={delay}>
      <div className={`py-6 ${!last ? "border-b border-ivory-10" : ""}`}>
        <span className="font-body text-[10px] uppercase tracking-[0.16em] text-ivory-30 block mb-2">
          {title}
        </span>
        <p className="font-body text-[15px] text-ivory leading-[1.7] mb-1">{main}</p>
        <p className="font-body text-[12px] text-ivory-30">{sub}</p>
      </div>
    </Reveal>
  );
}
