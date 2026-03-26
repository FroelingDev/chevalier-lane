import type { LucideIcon } from "lucide-react";

export interface ServiceHighlightItem {
  icon: LucideIcon;
  title: string;
}

interface ServiceHighlightsRowProps {
  items: ServiceHighlightItem[];
}

export default function ServiceHighlightsRow({
  items,
}: ServiceHighlightsRowProps) {
  return (
    <div className="mt-8 rounded-[2rem] border border-luxury-gold/20 bg-white shadow-[0_20px_60px_rgba(15,15,15,0.08)] overflow-hidden">
      {/* Mobile: auto-scrolling marquee */}
      <div className="flex md:hidden overflow-hidden">
        <div
          className="flex"
          style={{ animation: "marquee-rtl 12s linear infinite" }}
        >
          {[...items, ...items].map((item, i) => {
            const Icon = item.icon;
            return (
              <div
                key={i}
                className="flex-none w-[44vw] min-w-[140px] flex flex-col items-center justify-center gap-3 px-4 py-6 text-center border-r border-luxury-gold/15"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-full border border-luxury-gold/20 bg-luxury-gold/5 text-luxury-gold">
                  <Icon className="h-6 w-6" strokeWidth={1.8} />
                </div>
                <p className="text-[10px] font-medium uppercase tracking-[0.28em] text-luxury-black/80 leading-snug">
                  {item.title}
                </p>
              </div>
            );
          })}
        </div>
        <style>{`
          @keyframes marquee-rtl {
            0%   { transform: translateX(0); }
            100% { transform: translateX(-50%); }
          }
        `}</style>
      </div>
      {/* Desktop: 5-column grid */}
      <div className="hidden md:grid md:grid-cols-5 divide-x divide-luxury-gold/15">
        {items.map((item) => {
          const Icon = item.icon;
          return (
            <div
              key={item.title}
              className="flex min-h-[148px] flex-col items-center justify-center gap-4 px-4 py-7 text-center"
            >
              <div className="flex h-14 w-14 items-center justify-center rounded-full border border-luxury-gold/20 bg-luxury-gold/5 text-luxury-gold">
                <Icon className="h-7 w-7" strokeWidth={1.8} />
              </div>
              <p className="max-w-[12ch] text-[11px] font-medium uppercase tracking-[0.32em] text-luxury-black/80 sm:text-xs">
                {item.title}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
}
