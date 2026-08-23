"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { ArrowDownRight, ArrowUpRight } from "lucide-react";
import { CountUp } from "@/components/ui/CountUp";
import { Sparkline, TrendChart } from "@/components/ui/charts";
import { Skeleton, SkeletonCard, SkeletonRow } from "@/components/ui/Skeleton";
import { ALERTS, CASH, HEALTH, RECOMMENDATIONS, TRAPPED } from "@/lib/mock-data";
import { lakh, monoDate } from "@/lib/format";

const sevColor = { high: "bg-risk", medium: "bg-gold", low: "bg-cyan" } as const;

export default function OverviewPage() {
  const [loading, setLoading] = useState(true);
  const [range, setRange] = useState<30 | 90>(90);
  const [actions, setActions] = useState(RECOMMENDATIONS.slice(0, 3));

  useEffect(() => {
    const t = setTimeout(() => setLoading(false), 450);
    return () => clearTimeout(t);
  }, []);

  const actual = range === 90 ? CASH.actual : CASH.actual.slice(-12);

  const act = (id: string, status: "accepted" | "dismissed") =>
    setActions((as) => as.map((a) => (a.id === id ? { ...a, status } : a)));

  return (
    <div className="space-y-4">
      <div>
        <h1 className="font-display text-xl font-semibold tracking-tight text-txt">Overview</h1>
        <p className="mt-0.5 text-[13px] text-mut">Monday, 24 Aug &middot; data synced 2 min ago</p>
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-12">
        {loading ? (
          <>
            <div className="xl:col-span-4"><SkeletonCard /></div>
            <div className="xl:col-span-4"><SkeletonCard /></div>
            <div className="xl:col-span-4"><SkeletonCard /></div>
          </>
        ) : (
          <>
            <section className="rounded-[10px] border border-line bg-ink-800 p-4 xl:col-span-4" aria-label="Business health score">
              <div className="flex items-start justify-between">
                <h2 className="text-[12px] font-medium uppercase tracking-wider text-mut">Business health</h2>
                <span className={`flex items-center gap-1 rounded-full border px-2 py-0.5 font-mono text-[11px] ${HEALTH.delta < 0 ? "border-risk/30 bg-risk/10 text-risk" : "border-stable/30 bg-stable/10 text-stable"}`}>
                  {HEALTH.delta < 0 ? <ArrowDownRight size={11} /> : <ArrowUpRight size={11} />}
                  {Math.abs(HEALTH.delta)} pts
                </span>
              </div>
              <div className="mt-3 flex items-end justify-between gap-3">
                <CountUp
                  value={HEALTH.score}
                  duration={500}
                  className="font-mono text-[44px] font-medium leading-none text-txt"
                />
                <Sparkline points={HEALTH.spark} color="var(--gold)" />
              </div>
              <p className="mt-3 text-[13px] text-mut">{HEALTH.status}</p>
            </section>

            <section className="rounded-[10px] border border-line bg-ink-800 p-4 xl:col-span-4" aria-label="Trapped capital">
              <h2 className="text-[12px] font-medium uppercase tracking-wider text-mut">Trapped capital</h2>
              <div className="mt-3">
                <CountUp value={TRAPPED.total} format={lakh} duration={600} className="font-mono text-[44px] font-medium leading-none text-gold" />
              </div>
              <ul className="mt-4 space-y-2">
                {TRAPPED.breakdown.map((b) => (
                  <li key={b.label} className="flex items-center gap-2.5">
                    <span className="w-24 shrink-0 text-[12px] text-mut">{b.label}</span>
                    <span className="h-1 flex-1 overflow-hidden rounded-full bg-ink-900">
                      <span className="block h-full rounded-full bg-gold/70" style={{ width: `${(b.value / TRAPPED.total) * 100}%` }} />
                    </span>
                    <span className="w-14 text-right font-mono text-[11.5px] text-txt">{lakh(b.value)}</span>
                  </li>
                ))}
              </ul>
            </section>

            <section className="rounded-[10px] border border-line bg-ink-800 xl:col-span-4" aria-label="Active alerts">
              <div className="flex items-center justify-between border-b border-line px-4 py-3">
                <h2 className="text-[12px] font-medium uppercase tracking-wider text-mut">Active alerts</h2>
                <Link href="/detect" className="font-mono text-[11px] text-cyan transition-colors hover:text-txt">
                  View all
                </Link>
              </div>
              <ul className="divide-y divide-line">
                {ALERTS.slice(0, 5).map((a) => (
                  <li key={a.id}>
                    <Link href="/detect" className="flex items-center gap-2.5 px-4 py-2.5 transition-colors hover:bg-ink-750">
                      <span className={`h-1.5 w-1.5 shrink-0 rounded-full ${sevColor[a.severity]} ${a.status === "new" ? "live-dot-red" : ""}`} />
                      <span className="min-w-0 flex-1 truncate text-[12.5px] text-txt">{a.title}</span>
                      <span className="shrink-0 font-mono text-[10px] text-mut">{monoDate(a.detected).split(" \u00B7 ")[0]}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </section>
          </>
        )}
      </div>

      <div className="grid grid-cols-1 gap-4 xl:grid-cols-12">
        <section className="rounded-[10px] border border-line bg-ink-800 p-4 xl:col-span-7" aria-label="Cash flow snapshot">
          <div className="flex items-center justify-between">
            <h2 className="text-[12px] font-medium uppercase tracking-wider text-mut">Cash flow</h2>
            <div className="flex items-center gap-3">
              <span className="font-mono text-[13px] text-green-accent">
                <CountUp value={CASH.current} format={lakh} />
              </span>
              <div role="group" aria-label="Chart range" className="flex rounded-md border border-line bg-ink-900 p-0.5">
                {([30, 90] as const).map((r) => (
                  <button
                    key={r}
                    onClick={() => setRange(r)}
                    aria-pressed={range === r}
                    className={`rounded px-2 py-0.5 font-mono text-[11px] transition-colors ${range === r ? "bg-ink-750 text-txt" : "text-mut hover:text-txt"}`}
                  >
                    {r}d
                  </button>
                ))}
              </div>
            </div>
          </div>
          {loading ? (
            <Skeleton className="mt-4 h-[160px] w-full" />
          ) : (
            <div className="mt-4">
              <TrendChart actual={actual} projected={CASH.projected} bandPct={CASH.bandPct} color="var(--signal-green)" splitLabel={["actual \u00B7 90d", "projected \u00B7 30d"]} />
            </div>
          )}
        </section>

        <section className="rounded-[10px] border border-line bg-ink-800 xl:col-span-5" aria-label="Top recommended actions">
          <div className="border-b border-line px-4 py-3">
            <h2 className="text-[12px] font-medium uppercase tracking-wider text-mut">Top recommended actions</h2>
          </div>
          <ul className="divide-y divide-line">
            {actions.map((rec) => (
              <li key={rec.id} className="px-4 py-3">
                <div className="flex items-start justify-between gap-3">
                  <div className="min-w-0">
                    <p className="text-[13px] font-medium leading-snug text-txt">{rec.action}</p>
                    <p className="mt-1 font-mono text-[11px] text-gold">+{lakh(rec.impact)} projected</p>
                  </div>
                  {rec.status === "pending" ? (
                    <div className="flex shrink-0 gap-1.5">
                      <button onClick={() => act(rec.id, "accepted")} className="rounded-md border border-gold/50 px-2.5 py-1 text-[11.5px] font-medium text-gold transition-colors hover:bg-gold/10">
                        Accept
                      </button>
                      <button onClick={() => act(rec.id, "dismissed")} className="rounded-md border border-line px-2.5 py-1 text-[11.5px] text-mut transition-colors hover:bg-ink-750 hover:text-txt">
                        Dismiss
                      </button>
                    </div>
                  ) : (
                    <span className={`shrink-0 rounded-md border px-2 py-1 font-mono text-[10.5px] ${rec.status === "accepted" ? "border-stable/40 bg-stable/10 text-stable" : "border-line text-mut"}`}>
                      {rec.status === "accepted" ? "Accepted" : "Dismissed"}
                    </span>
                  )}
                </div>
              </li>
            ))}
          </ul>
          <div className="border-t border-line px-4 py-2.5">
            <Link href="/recommend" className="font-mono text-[11px] text-cyan transition-colors hover:text-txt">
              Open action queue
            </Link>
          </div>
        </section>
      </div>

      {loading && (
        <div className="rounded-[10px] border border-line bg-ink-800">
          <SkeletonRow cols={4} />
          <SkeletonRow cols={4} />
        </div>
      )}
    </div>
  );
}
