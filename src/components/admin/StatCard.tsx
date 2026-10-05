import { clsx } from "clsx";

export function StatCard({
  label,
  value,
  icon: Icon,
  trend,
  tone = "default",
}: {
  label: string;
  value: string;
  icon: React.ElementType;
  trend?: string;
  tone?: "default" | "gold" | "wine" | "forest";
}) {
  const tones: Record<string, string> = {
    default: "bg-white/5 text-white/70",
    gold: "bg-gold/15 text-gold",
    wine: "bg-wine/20 text-rose-300",
    forest: "bg-emerald-900/20 text-emerald-300",
  };
  return (
    <div className="rounded-2xl border border-white/5 bg-[#12141B] p-5">
      <div className="flex items-center justify-between">
        <span className={clsx("flex h-9 w-9 items-center justify-center rounded-xl", tones[tone])}>
          <Icon size={17} />
        </span>
        {trend && <span className="text-xs font-medium text-emerald-400">{trend}</span>}
      </div>
      <p className="mt-4 text-2xl font-semibold text-white">{value}</p>
      <p className="mt-0.5 text-xs text-white/40">{label}</p>
    </div>
  );
}
