"use client";

function path(points: number[], w: number, h: number, pad: number, min: number, max: number): string {
  const range = max - min || 1;
  const step = (w - pad * 2) / (points.length - 1);
  return points
    .map((p, i) => {
      const x = pad + i * step;
      const y = pad + (1 - (p - min) / range) * (h - pad * 2);
      return `${i === 0 ? "M" : "L"}${x.toFixed(1)},${y.toFixed(1)}`;
    })
    .join(" ");
}

function bounds(a: number[], p: number[], bandPct: number) {
  const all = [...a, ...p];
  const upper = all.map((v) => v * (1 + bandPct));
  const lower = all.map((v) => v * (1 - bandPct));
  return { min: Math.min(...lower), max: Math.max(...upper) };
}

export function TrendChart({
  actual,
  projected,
  bandPct,
  color = "var(--signal-gold)",
  height = 160,
  splitLabel,
}: {
  actual: number[];
  projected: number[];
  bandPct: number;
  color?: string;
  height?: number;
  splitLabel?: [string, string];
}) {
  const w = 560;
  const h = height;
  const pad = 8;
  const { min, max } = bounds(actual, projected, bandPct);
  const joined = [...actual, ...projected];

  const actualPath = path(actual, w, h, pad, min, max);
  const projPath = path(joined, w, h, pad, min, max).split(" ").slice(actual.length - 1).join(" ");
  const areaPath = `${actualPath} L${(pad + ((w - pad * 2) * (actual.length - 1)) / (joined.length - 1)).toFixed(1)},${h - pad} L${pad},${h - pad} Z`;

  const upperPts = joined.map((v) => v * (1 + bandPct));
  const lowerPts = joined.map((v) => v * (1 - bandPct));
  const bandPath = `${path(upperPts, w, h, pad, min, max)} ${path([...lowerPts].reverse(), w, h, pad, min, max).slice(1).replace("M", "L")} Z`;

  const splitX = pad + ((w - pad * 2) * (actual.length - 1)) / (joined.length - 1);
  const id = `g${color.replace(/[^a-z0-9]/gi, "")}`;

  return (
    <div className="w-full">
      <svg viewBox={`0 0 ${w} ${h}`} className="w-full" style={{ height }} preserveAspectRatio="none" aria-hidden="true">
        <defs>
          <linearGradient id={id} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor={color} stopOpacity="0.22" />
            <stop offset="100%" stopColor={color} stopOpacity="0" />
          </linearGradient>
        </defs>
        {[0.25, 0.5, 0.75].map((f) => (
          <line key={f} x1={pad} x2={w - pad} y1={pad + f * (h - pad * 2)} y2={pad + f * (h - pad * 2)} stroke="var(--line-800)" strokeWidth="1" strokeDasharray="2 4" />
        ))}
        <path d={bandPath} fill={color} fillOpacity="0.07" stroke="none" />
        <path d={areaPath} fill={`url(#${id})`} stroke="none" />
        <path d={actualPath} fill="none" stroke={color} strokeWidth="2" strokeLinejoin="round" strokeLinecap="round" />
        <path d={projPath} fill="none" stroke={color} strokeWidth="2" strokeDasharray="5 5" strokeLinecap="round" opacity="0.75" />
        <line x1={splitX} x2={splitX} y1={pad} y2={h - pad} stroke="var(--line-800)" strokeWidth="1" />
      </svg>
      {splitLabel && (
        <div className="mt-1 flex justify-between font-mono text-[10px] text-mut">
          <span>{splitLabel[0]}</span>
          <span>{splitLabel[1]}</span>
        </div>
      )}
    </div>
  );
}

export function Sparkline({ points, color = "var(--signal-gold)", w = 120, h = 32 }: { points: number[]; color?: string; w?: number; h?: number }) {
  const min = Math.min(...points);
  const max = Math.max(...points);
  return (
    <svg viewBox={`0 0 ${w} ${h}`} width={w} height={h} aria-hidden="true">
      <path d={path(points, w, h, 2, min, max)} fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

const DONUT_COLORS = ["var(--signal-gold)", "var(--flow-cyan)", "var(--stable-green)", "#8991AC", "#56607F", "#3A4468"];

export function Donut({ data, centerLabel, centerValue }: { data: { label: string; value: number; pct?: number }[]; centerLabel: string; centerValue: string }) {
  const total = data.reduce((s, d) => s + d.value, 0);
  const r = 54;
  const c = 2 * Math.PI * r;
  let offset = 0;
  return (
    <div className="flex items-center gap-6">
      <svg viewBox="0 0 140 140" className="h-[140px] w-[140px] shrink-0" aria-hidden="true">
        {data.map((d, i) => {
          const frac = d.value / total;
          const dash = frac * c;
          const el = (
            <circle
              key={d.label}
              cx="70"
              cy="70"
              r={r}
              fill="none"
              stroke={DONUT_COLORS[i % DONUT_COLORS.length]}
              strokeWidth="14"
              strokeDasharray={`${dash} ${c - dash}`}
              strokeDashoffset={-offset}
              transform="rotate(-90 70 70)"
            />
          );
          offset += dash;
          return el;
        })}
        <text x="70" y="66" textAnchor="middle" fill="var(--text-400)" fontSize="9" fontFamily="var(--font-ibm-plex-mono)">
          {centerLabel}
        </text>
        <text x="70" y="82" textAnchor="middle" fill="var(--text-100)" fontSize="14" fontWeight="600" fontFamily="var(--font-ibm-plex-mono)">
          {centerValue}
        </text>
      </svg>
      <ul className="min-w-0 flex-1 space-y-2">
        {data.map((d, i) => (
          <li key={d.label} className="flex items-center gap-2 text-[12px]">
            <span className="h-2 w-2 shrink-0 rounded-full" style={{ background: DONUT_COLORS[i % DONUT_COLORS.length] }} />
            <span className="min-w-0 flex-1 truncate text-mut">{d.label}</span>
            <span className="font-mono text-txt">{d.value.toLocaleString("en-IN")}</span>
            <span className="w-9 text-right font-mono text-mut">{d.pct}%</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
