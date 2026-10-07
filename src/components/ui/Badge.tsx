import { clsx } from "clsx";

type Tone = "gold" | "wine" | "forest" | "neutral" | "danger" | "champagne" | "graphite" | "ivory";

const tones: Record<Tone, string> = {
  gold: "bg-gold/15 text-gold border-gold/30",
  wine: "bg-wine/20 text-wine-light border-wine/40",
  forest: "bg-forest/40 text-emerald-200 border-emerald-800/50",
  neutral: "bg-cream/10 text-cream/70 border-cream/15",
  danger: "bg-red-900/30 text-red-300 border-red-800/40",
  champagne: "bg-champagne/15 text-champagne border-champagne/40",
  graphite: "bg-graphite text-ivory border-graphite",
  ivory: "bg-ivory text-graphite/70 border-stone-line",
};

export function Badge({
  children,
  tone = "neutral",
  className,
}: {
  children: React.ReactNode;
  tone?: Tone;
  className?: string;
}) {
  return (
    <span
      className={clsx(
        "inline-flex items-center gap-1 rounded-full border px-2.5 py-1 text-[11px] font-medium uppercase tracking-wider",
        tones[tone],
        className
      )}
    >
      {children}
    </span>
  );
}
