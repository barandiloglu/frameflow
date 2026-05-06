import type { Client } from "@/data/clients";

type Props = {
  client: Client;
  frameNumber: string;
  size?: "default" | "large";
};

export function FilmStill({ client, frameNumber, size = "default" }: Props) {
  const scene = client.scene ?? "INT. STUDIO — IN POST";
  const genreShort = (client.services[0] ?? "PORTFOLIO").toUpperCase();
  const location = client.location ?? "";
  const year = client.year ?? "";

  return (
    <div
      className={`relative border border-amber/30 bg-graphite overflow-hidden ${
        size === "large" ? "aspect-[4/5]" : "aspect-[5/4]"
      }`}
    >
      <div
        aria-hidden
        className="absolute inset-0 opacity-[0.07]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,235,0.8) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,235,0.8) 1px, transparent 1px)",
          backgroundSize: "48px 48px",
        }}
      />
      <div
        aria-hidden
        className="absolute inset-0 mix-blend-overlay opacity-[0.06]"
        style={{
          backgroundImage:
            "repeating-linear-gradient(0deg, #ffffeb 0 1px, transparent 1px 3px)",
        }}
      />
      <div className="absolute inset-4 border border-dashed border-amber/25" />

      <div
        aria-hidden
        className="pointer-events-none absolute -top-1/4 -right-1/3 h-[180%] w-1/2 bg-gradient-to-b from-ember/20 via-amber/10 to-transparent blur-[40px] rotate-[18deg]"
      />

      <span
        className="absolute bottom-[-8%] left-[-2%] font-editorial italic font-[300] text-ivory/15 leading-none select-none"
        style={{
          fontSize:
            size === "large"
              ? "clamp(220px, 28vw, 460px)"
              : "clamp(160px, 20vw, 320px)",
        }}
      >
        {frameNumber}
      </span>

      <div className="absolute top-6 left-6 flex flex-col gap-1 font-mono text-[10px] uppercase tracking-[0.22em]">
        <span className="text-amber">Frame · {frameNumber}</span>
        <span className="text-ivory/40">{scene}</span>
      </div>

      <div className="absolute top-6 right-6 flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.22em] text-ember">
        <span className="relative flex h-2 w-2">
          <span className="absolute inset-0 rounded-full bg-ember animate-ping" />
          <span className="relative inline-flex h-2 w-2 rounded-full bg-ember" />
        </span>
        Print
      </div>

      <div className="absolute bottom-6 left-6 right-6 z-10">
        <p className="font-mono text-[10px] uppercase tracking-[0.24em] text-ember mb-3">
          / {genreShort}
        </p>
        <h3
          className="font-editorial font-[300] italic text-ivory leading-[0.9] tracking-[-0.02em]"
          style={{
            fontSize:
              size === "large"
                ? "clamp(40px, 5vw, 78px)"
                : "clamp(30px, 4vw, 56px)",
          }}
        >
          {client.name}
        </h3>
        <div className="mt-5 flex items-center justify-between font-mono text-[9px] uppercase tracking-[0.22em] text-ivory/50">
          <span>{location}</span>
          <span className="text-amber">{year}</span>
        </div>
      </div>

      <span aria-hidden className="absolute top-5 left-5 w-3 h-3 border-t border-l border-amber/50" />
      <span aria-hidden className="absolute top-5 right-5 w-3 h-3 border-t border-r border-amber/50" />
      <span aria-hidden className="absolute bottom-5 left-5 w-3 h-3 border-b border-l border-amber/50" />
      <span aria-hidden className="absolute bottom-5 right-5 w-3 h-3 border-b border-r border-amber/50" />
    </div>
  );
}
