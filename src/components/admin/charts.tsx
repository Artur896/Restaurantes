"use client";

import { formatCurrency } from "@/lib/demo-data";

export function BarChart({
  data,
  valueKey,
  labelKey,
  color = "#C6A15B",
  currency = false,
}: {
  data: Record<string, any>[];
  valueKey: string;
  labelKey: string;
  color?: string;
  currency?: boolean;
}) {
  const max = Math.max(...data.map((d) => d[valueKey]), 1);
  return (
    <div className="flex h-48 items-end gap-3">
      {data.map((d) => {
        const h = Math.max(4, (d[valueKey] / max) * 100);
        return (
          <div key={d[labelKey]} className="flex flex-1 flex-col items-center gap-2">
            <div className="flex h-36 w-full items-end overflow-hidden rounded-md bg-white/[0.03]">
              <div
                className="w-full rounded-md transition-all duration-700"
                style={{ height: `${h}%`, backgroundColor: color }}
                title={currency ? formatCurrency(d[valueKey]) : String(d[valueKey])}
              />
            </div>
            <span className="text-[11px] text-white/40">{d[labelKey]}</span>
          </div>
        );
      })}
    </div>
  );
}

export function HorizontalBarChart({
  data,
  valueKey,
  labelKey,
  color = "#6B1E2B",
}: {
  data: Record<string, any>[];
  valueKey: string;
  labelKey: string;
  color?: string;
}) {
  const max = Math.max(...data.map((d) => d[valueKey]), 1);
  return (
    <div className="space-y-3">
      {data.map((d) => (
        <div key={d[labelKey]}>
          <div className="mb-1 flex justify-between text-xs text-white/60">
            <span>{d[labelKey]}</span>
            <span className="text-white/40">{d[valueKey]}</span>
          </div>
          <div className="h-2 w-full overflow-hidden rounded-full bg-white/5">
            <div
              className="h-full rounded-full transition-all duration-700"
              style={{ width: `${(d[valueKey] / max) * 100}%`, backgroundColor: color }}
            />
          </div>
        </div>
      ))}
    </div>
  );
}

export function LineChart({
  data,
  valueKey,
  labelKey,
  color = "#C6A15B",
}: {
  data: Record<string, any>[];
  valueKey: string;
  labelKey: string;
  color?: string;
}) {
  const max = Math.max(...data.map((d) => d[valueKey]), 1);
  const min = Math.min(...data.map((d) => d[valueKey]), 0);
  const w = 100;
  const h = 40;
  const points = data.map((d, i) => {
    const x = (i / (data.length - 1 || 1)) * w;
    const y = h - ((d[valueKey] - min) / (max - min || 1)) * h;
    return `${x},${y}`;
  });

  return (
    <div>
      <svg viewBox={`0 0 ${w} ${h}`} className="h-40 w-full overflow-visible" preserveAspectRatio="none">
        <polyline fill="none" stroke={color} strokeWidth="1.5" points={points.join(" ")} vectorEffect="non-scaling-stroke" />
        {data.map((d, i) => {
          const [x, y] = points[i].split(",").map(Number);
          return <circle key={i} cx={x} cy={y} r={1.2} fill={color} />;
        })}
      </svg>
      <div className="mt-2 flex justify-between text-[11px] text-white/40">
        {data.map((d) => (
          <span key={d[labelKey]}>{d[labelKey]}</span>
        ))}
      </div>
    </div>
  );
}
