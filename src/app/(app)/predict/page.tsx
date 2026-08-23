"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { TrendChart } from "@/components/ui/charts";
import { SkeletonCard } from "@/components/ui/Skeleton";
import { CASH, INVENTORY_TREND, PREDICTIONS } from "@/lib/mock-data";
import { lakh } from "@/lib/format";
import { CountUp } from "@/components/ui/CountUp";

const METRICS = {
  cash: {
    label: "Cash position",
    color: "var(--signal-gold)" as const,
    current: CASH.current,
    actual: CASH.actual,
    projected: CASH.projected,
    bandPct: CASH.bandPct,
    fmt: (v: number) => lakh(v * 100000),
  },
  inventory: {
    label: "Inventory value",
    color: "var(--flow-cyan)" as const,
    current: INVENTORY_TREND.current,
    actual: INVENTORY_TREND.actual,
    projected: INVENTORY_TREND.projected,
    bandPct: INVENTORY_TREND.bandPct,
    fmt: (v: number) => `\u20B9${v.toFixed(2)}Cr`,
  },
} as const;

export default function PredictPage() {
  const [metric, setMetric] = useState<keyof typeof METRICS>("cash");
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const t = setTimeout(() => setLoading(false), 450);
    return () => clearTimeout(t);
  }, []);

  const m = METRICS[metric];

  return (
    <div className="space-y-4">
      <div>
        <h1 className="font-display text-xl font-semibold tracking-tight text-txt">Predict</h1>
        <p className="mt-0.5 text-[13px] text-mut">Forward projections with confidence bands</p>
      </div>

      <section className="rounded-[10px] border border-line bg-ink-800 p-4" aria-label="Primary forecast">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <h2 className="text-[12px] font-medium uppercase tracking-wider text-mut">{m.label} forecast</h2>
            <p className="mt-1 font-mono text-[24px] font-medium leading-none text-txt">
              <CountUp key={metric} value={m.current} format={(v) => m.fmt(metric === "cash" ? v / 100000 : v / 23400000 * 2.34)} />
              <span className="ml-2 align-middle font-mono text-[11px] text-mut">today</span>
            </p>
          </div>
          <div role="group" aria-label="Forecast metric" className="flex rounded-md border border-line bg-ink-900 p-0.5">
            {(Object.keys(METRICS) as (keyof typeof METRICS)[]).map((k) => (
              <button
                key={k}
                onClick={() => setMetric(k)}
                aria-pressed={metric === k}
                className={`rounded px-3 py-1 text-[12px] transition-colors ${metric === k ? "bg-ink-750 font-medium text-txt" : "text-mut hover:text-txt"}`}
              >
                {METRICS[k].label}
              </button>
            ))}
          </div>
        </div>
        {loading ? (
          <SkeletonCard />
        ) : (
          <div className="mt-4">
            <TrendChart
              actual={m.actual}
              projected={m.projected}
              bandPct={m.bandPct}
              color={m.color}
              height={220}
              splitLabel={["actual \u00B7 90d", "projected \u00B7 60d \u00B7 shaded = confidence band"]}
            />
          </div>
        )}
      </section>

      <section aria-label="Specific predictions">
        <h2 className="mb-3 text-[12px] font-medium uppercase tracking-wider text-mut">Specific predictions</h2>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          {PREDICTIONS.map((p) => (
            <article key={p.id} className="flex flex-col rounded-[10px] border border-line bg-ink-800 p-4 transition-colors hover:bg-ink-750/60">
              <div className="flex items-center justify-between">
                <span className="font-mono text-[10.5px] uppercase tracking-wider text-cyan">{p.metric}</span>
                <span className="font-mono text-[10.5px] text-mut">{p.code}</span>
              </div>
              <p className="mt-2.5 flex-1 text-[14px] font-medium leading-snug text-txt">{p.headline}</p>
              <div className="mt-4 flex items-center gap-2">
                <span className="h-1 w-20 overflow-hidden rounded-full bg-ink-900">
                  <span className="block h-full rounded-full bg-cyan" style={{ width: `${p.confidence}%` }} />
                </span>
                <span className="font-mono text-[11px] text-mut">{p.confidence}% confidence</span>
                <span className="ml-auto font-mono text-[11px] text-txt">{p.horizon}</span>
              </div>
              <div className="mt-3 flex flex-wrap items-center gap-1.5 border-t border-line pt-3">
                <span className="font-mono text-[10px] text-mut">Related:</span>
                <Link href="/detect" className="rounded border border-line px-1.5 py-0.5 font-mono text-[10px] text-cyan transition-colors hover:bg-ink-750">{p.relatedAlert}</Link>
                <Link href="/recommend" className="rounded border border-line px-1.5 py-0.5 font-mono text-[10px] text-cyan transition-colors hover:bg-ink-750">{p.relatedRec}</Link>
              </div>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
}
