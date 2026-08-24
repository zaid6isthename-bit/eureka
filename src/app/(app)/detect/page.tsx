"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Drawer } from "@/components/ui/Drawer";
import { SkeletonRow } from "@/components/ui/Skeleton";
import { PageHeader } from "@/components/app/PageHeader";
import { ALERTS, type Alert, type Severity } from "@/lib/mock-data";
import { monoDate } from "@/lib/format";

const sevMeta: Record<Severity, { dot: string; label: string; cls: string }> = {
  high: { dot: "bg-risk", label: "High", cls: "text-risk" },
  medium: { dot: "bg-gold", label: "Medium", cls: "text-gold" },
  low: { dot: "bg-cyan", label: "Low", cls: "text-cyan" },
};

const AREAS = ["All", "Inventory", "Cash Flow", "Procurement", "Receivables"] as const;

function TriggerBar({ labelA, labelB, aPct, bPct }: { labelA: string; labelB: string; aPct: number; bPct: number }) {
  const scale = (v: number) => Math.min(Math.abs(v) * 3.3, 100);
  return (
    <div className="space-y-2 rounded-[10px] border border-line bg-ink-800 p-3.5">
      <p className="font-mono text-[10px] uppercase tracking-wider text-mut">Trigger data</p>
      {[
        { label: labelA, pct: aPct },
        { label: labelB, pct: bPct },
      ].map((row) => (
        <div key={row.label} className="flex items-center gap-2.5">
          <span className="w-28 shrink-0 truncate text-[12px] text-mut">{row.label}</span>
          <span className="h-1.5 flex-1 overflow-hidden rounded-full bg-ink-900">
            <span
              className={`block h-full rounded-full ${row.pct < 0 ? "bg-risk" : "bg-cyan"}`}
              style={{ width: `${scale(row.pct)}%`, marginLeft: row.pct < 0 ? `${100 - scale(row.pct)}%` : 0 }}
            />
          </span>
          <span className={`w-10 text-right font-mono text-[11.5px] ${row.pct < 0 ? "text-risk" : "text-cyan"}`}>
            {row.pct > 0 ? "+" : ""}{row.pct}%
          </span>
        </div>
      ))}
    </div>
  );
}

export default function DetectPage() {
  const [alerts, setAlerts] = useState<Alert[]>(ALERTS);
  const [sevFilter, setSevFilter] = useState<Severity | "All">("All");
  const [areaFilter, setAreaFilter] = useState<(typeof AREAS)[number]>("All");
  const [selected, setSelected] = useState<Alert | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const t = setTimeout(() => setLoading(false), 450);
    return () => clearTimeout(t);
  }, []);

  const data = useMemo(
    () =>
      alerts.filter(
        (a) => (sevFilter === "All" || a.severity === sevFilter) && (areaFilter === "All" || a.area === areaFilter)
      ),
    [alerts, sevFilter, areaFilter]
  );

  const open = alerts.find((a) => a.id === selected?.id) ?? null;

  const setStatus = (id: string, status: Alert["status"]) =>
    setAlerts((list) => list.map((a) => (a.id === id ? { ...a, status } : a)));

  return (
    <div className="space-y-4">
      <PageHeader
        crumbs={["Home", "Alerts"]}
        title="Detect"
        subtitle="Cross-system findings invisible in any single tool"
        actions={
          <>
            <div role="group" aria-label="Filter severity" className="flex flex-wrap gap-1.5">
              {(["All", "high", "medium", "low"] as const).map((s) => (
                <button
                  key={s}
                  onClick={() => setSevFilter(s)}
                  aria-pressed={sevFilter === s}
                  className={`flex h-10 items-center gap-1.5 rounded-[var(--radius-pill)] px-3.5 text-[12.5px] shadow-sm transition-colors ${
                    sevFilter === s
                      ? "bg-ink-950 font-bold text-bg"
                      : "border border-border bg-card text-mut hover:text-txt"
                  }`}
                >
                  {s !== "All" && <span className={`h-1.5 w-1.5 rounded-full ${sevMeta[s].dot}`} />}
                  {s === "All" ? "All" : sevMeta[s].label}
                </button>
              ))}
            </div>
            <select
              value={areaFilter}
              onChange={(e) => setAreaFilter(e.target.value as (typeof AREAS)[number])}
              aria-label="Filter area"
              className="h-10 rounded-[var(--radius-pill)] border border-border bg-card px-4 text-[13px] text-txt shadow-sm focus:outline-none"
            >
              {AREAS.map((a) => (
                <option key={a} value={a}>{a === "All" ? "All areas" : a}</option>
              ))}
            </select>
          </>
        }
      />

      <div className="overflow-hidden rounded-[10px] border border-line bg-ink-800">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[820px] text-left">
            <thead>
              <tr className="border-b border-line bg-ink-900">
                {["Severity", "Finding", "Area", "Detected", "Status", ""].map((h) => (
                  <th key={h} scope="col" className="px-4 py-2.5 text-[11px] font-medium uppercase tracking-wider text-mut">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {loading ? (
                Array.from({ length: 5 }).map((_, i) => (
                  <tr key={i}><td colSpan={6} className="p-0"><SkeletonRow cols={5} /></td></tr>
                ))
              ) : (
                data.map((a) => (
                  <tr key={a.id} onClick={() => setSelected(a)} className="cursor-pointer border-b border-line/60 transition-colors last:border-0 hover:bg-ink-750">
                    <td className="px-4 py-2.5">
                      <span className="flex items-center gap-2">
                        <span className={`h-2 w-2 rounded-full ${sevMeta[a.severity].dot} ${a.status === "new" ? (a.severity === "high" ? "live-dot-red" : "live-dot") : ""}`} />
                        <span className={`font-mono text-[11.5px] ${sevMeta[a.severity].cls}`}>{sevMeta[a.severity].label}</span>
                      </span>
                    </td>
                    <td className="max-w-[380px] px-4 py-2.5">
                      <p className="truncate text-[13px] text-txt">{a.title}</p>
                      <p className="font-mono text-[10px] text-mut">{a.code}</p>
                    </td>
                    <td className="px-4 py-2.5"><span className="rounded border border-line px-1.5 py-0.5 text-[11px] text-mut">{a.area}</span></td>
                    <td className="whitespace-nowrap px-4 py-2.5 font-mono text-[11px] text-mut">{monoDate(a.detected)}</td>
                    <td className="px-4 py-2.5">
                      <span className={`rounded-full border px-2 py-0.5 font-mono text-[10.5px] ${
                        a.status === "new" ? "border-risk/40 bg-risk/10 text-risk"
                        : a.status === "acknowledged" ? "border-gold/40 bg-gold/10 text-gold"
                        : "border-stable/40 bg-stable/10 text-stable"
                      }`}>
                        {a.status}
                      </span>
                    </td>
                    <td className="px-4 py-2.5 text-right font-mono text-[11px] text-cyan">View</td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
        {!loading && data.length === 0 && (
          <p className="px-4 py-8 text-center text-[13px] text-mut">No findings match the current filters.</p>
        )}
      </div>

      <Drawer open={!!open} onClose={() => setSelected(null)} title={open ? `${open.code} \u00B7 ${open.area}` : ""}>
        {open && (
          <div className="space-y-5">
            <div>
              <span className={`font-mono text-[11px] ${sevMeta[open.severity].cls}`}>{sevMeta[open.severity].label} severity</span>
              <p className="mt-2 text-[15px] font-medium leading-snug text-txt">{open.title}</p>
              <p className="mt-1 font-mono text-[10.5px] text-mut">Detected {monoDate(open.detected)}</p>
            </div>

            <p className="text-[13px] leading-relaxed text-mut">{open.detail}</p>

            <TriggerBar labelA={open.trigger.a} labelB={open.trigger.b} aPct={open.trigger.aPct} bPct={open.trigger.bPct} />

            <Link
              href="/recommend"
              className="flex items-center justify-between rounded-[10px] border border-gold/40 bg-gold/5 px-4 py-3 transition-colors hover:bg-gold/10"
            >
              <span className="text-[13px] font-medium text-gold">See recommended action</span>
              <ArrowRight size={14} className="text-gold" />
            </Link>

            <div className="flex gap-2 border-t border-line pt-4">
              <button
                onClick={() => setStatus(open.id, "acknowledged")}
                disabled={open.status !== "new"}
                className="flex-1 rounded-lg border border-line py-2 text-[12.5px] font-medium text-txt transition-colors hover:bg-ink-750 disabled:cursor-default disabled:opacity-40"
              >
                Acknowledge
              </button>
              <button
                onClick={() => setStatus(open.id, "resolved")}
                disabled={open.status === "resolved"}
                className="flex-1 rounded-lg border border-stable/50 py-2 text-[12.5px] font-medium text-stable transition-colors hover:bg-stable/10 disabled:cursor-default disabled:opacity-40"
              >
                Mark resolved
              </button>
            </div>
          </div>
        )}
      </Drawer>
    </div>
  );
}
