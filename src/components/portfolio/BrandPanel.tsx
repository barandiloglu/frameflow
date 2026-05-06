import type { Brand } from "@/data/clients";

export function BrandPanel({ brand }: { brand: Brand }) {
  return (
    <div className="border border-border-subtle bg-surface-alt/40 p-6 md:p-8 max-w-[480px]">
      <p className="font-mono text-[10px] uppercase tracking-[0.24em] text-ember mb-6 flex items-center gap-2">
        <span className="w-1.5 h-1.5 rounded-full bg-ember" />
        Brand notes
      </p>

      <div className="grid grid-cols-2 gap-8">
        {/* Palette */}
        <div>
          <p className="font-mono text-[9px] uppercase tracking-[0.22em] text-on-surface-30 mb-4">
            Palette
          </p>
          <div className="flex flex-col gap-3">
            {brand.palette.map((c) => (
              <div key={c.hex} className="flex items-center gap-3">
                <span
                  aria-hidden
                  className="w-6 h-6 border border-border-subtle shrink-0"
                  style={{ backgroundColor: c.hex }}
                />
                <div className="flex flex-col leading-tight">
                  <span className="font-warm text-[12px] text-on-surface">{c.name}</span>
                  <span className="font-mono text-[10px] text-on-surface-30 uppercase tracking-[0.18em]">
                    {c.hex}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Typefaces */}
        <div>
          <p className="font-mono text-[9px] uppercase tracking-[0.22em] text-on-surface-30 mb-4">
            Typefaces
          </p>
          <div className="flex flex-col gap-4">
            {brand.typefaces.map((t) => (
              <div key={t.role + t.name} className="flex flex-col leading-tight">
                <span className="font-mono text-[9px] uppercase tracking-[0.22em] text-amber mb-1">
                  {t.role}
                </span>
                <span className="font-editorial italic text-[22px] text-on-surface leading-[1.05]">
                  {t.name}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
