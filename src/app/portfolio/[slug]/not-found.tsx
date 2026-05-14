import Link from "next/link";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";

export default function NotFound() {
  return (
    <>
      <Navbar />
      <section className="bg-surface px-6 md:px-[52px] pt-[140px] pb-[120px]">
        <div className="max-w-[900px] mx-auto">
          <p className="font-mono text-[11px] uppercase tracking-[0.32em] text-ember mb-7 flex items-center gap-3">
            <span className="block h-px w-10 bg-ember" />
            FF#404 · Scene unrecorded
          </p>
          <h1
            className="font-editorial font-[300] italic leading-[0.95] tracking-[-0.03em] text-on-surface mb-8"
            style={{ fontSize: "clamp(48px, 7vw, 120px)" }}
          >
            That title isn&apos;t on the reel.
          </h1>
          <p className="font-warm text-[15px] font-[300] leading-[1.85] text-on-surface-60 max-w-[520px] mb-10">
            The slug you&apos;re after isn&apos;t in the archive. Head back to the index — every
            client is on the record.
          </p>
          <Link
            href="/portfolio"
            className="group inline-flex items-center gap-3 bg-amber text-graphite font-mono text-[12px] font-medium tracking-[0.22em] uppercase py-[14px] pl-6 pr-7 no-underline transition-all duration-300 hover:bg-ember hover:text-ivory"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-graphite group-hover:bg-ivory transition-colors" />
            Back to the archive
            <span className="font-editorial text-[18px] leading-none">→</span>
          </Link>
        </div>
      </section>
      <Footer />
    </>
  );
}
