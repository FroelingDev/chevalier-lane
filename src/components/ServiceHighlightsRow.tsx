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
    <div className="mt-8 overflow-hidden rounded-[2rem] border border-luxury-gold/20 bg-white shadow-[0_20px_60px_rgba(15,15,15,0.08)]">
      <div className="grid grid-cols-2 divide-x divide-y divide-luxury-gold/15 md:grid-cols-5 md:divide-y-0">
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
