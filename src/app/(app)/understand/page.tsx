"use client";

import { useEffect, useState } from "react";
import { Check, CircleDashed, Plug } from "lucide-react";
import Link from "next/link";
import { Donut } from "@/components/ui/charts";
import { SkeletonCard } from "@/components/ui/Skeleton";
import { EXPENSES, INVENTORY, PAYABLES, RECEIVABLES, TOP_PRODUCTS } from "@/lib/mock-data";
import { inr, lakh } from "@/lib/format";
import { CountUp } from "@/components/ui/CountUp";

const SOURCES = [
  { name: "Accounting \u00B7 Tally Prime", status: "connected", note: "synced 2 min ago" },
  { name: "Inventory \u00B7 Odoo export", status: "connected", note: "synced 6 min ago" },
  { name: "Sales \u00B7 Amazon Seller", status: "error", note: "last sync 2 days ago" },
  { name: "Procurement \u00B7 PO register", status: "connected", note: "synced 14 min ago" },
  { name: "POS \u00B7 Store terminals", status: "not_connected", note: "connect to complete the model" },
];

function Dot({ status }: { status: string }) {
  if (status === "connected") return <span className="h-2 w-2 shrink-0 rounded-full bg-stable live-dot" />;
  if (status === "error") return <span className="h-2 w-2 shrink-0 rounded-full bg-risk live-dot-red" />;
  return <CircleDashed size={12} className="shrink-0 text-mut" />;
}

export default function UnderstandPage() {
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const t = setTimeout(() => setLoading(false), 450);
    return () => clearTimeout(t);
  }, []);

  return (
    <div className="space-y-4">
      <div>
        <h1 className="font-display text-xl font-semibold tracking-tight text-txt">Understand</h1>
        <p className="mt-0.5 text-[13px] text-mut">The continuously updated model of your business</p>
      </div>

      <div className="grid grid-cols-1 gap-4 xl:grid-cols-12">
        <section className="rounded-[10px] border border-line bg-ink-800 xl:col-span-4" aria-label="Connected data sources">
          <div className="flex items-center justify-between border-b border-line px-4 py-3">
            <h2 className="text-[12px] font-medium uppercase tracking-wider text-mut">Data sources</h2>
            <span className="font-mono text-[11px] text-mut">4 / 5</span>
          </div>
          <ul className="divide-y divide-line">
            {SOURCES.map((s) => (
              <li key={s.name} className="flex items-center gap-3 px-4 py-3">
                <Dot status={s.status} />
                <div className="min-w-0 flex-1">
                  <p className="truncate text-[13px] text-txt">{s.name}</p>
                  <p className={`font-mono text-[10.5px] ${s.status === "error" ? "text-risk" : "text-mut"}`}>{s.note}</p>
                </div>
                {s.status === "connected" ? (
                  <Check size={14} className="shrink-0 text-stable" />
                ) : (
                  <Link href="/integrations" className="flex shrink-0 items-center gap-1 rounded-md border border-cyan/40 px-2 py-1 text-[11px] text-cyan transition-colors hover:bg-cyan/10">
                    <Plug size={11} /> Connect
                  </Link>
                )}
              </li>
            ))}
          </ul>
        </section>

        <section className="rounded-[10px] border border-line bg-ink-800 xl:col-span-8" aria-label="Top products">
          <div className="border-b border-line px-4 py-3">
            <h2 className="text-[12px] font-medium uppercase tracking-wider text-mut">What the business sells</h2>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full min-w-[560px] text-left">
              <thead>
                <tr className="border-b border-line">
                  <th scope="col" className="px-4 py-2 text-[11px] font-medium uppercase tracking-wider text-mut">Product</th>
                  <th scope="col" className="px-4 py-2 text-[11px] font-medium uppercase tracking-wider text-mut">Segment</th>
                  <th scope="col" className="px-4 py-2 text-right text-[11px] font-medium uppercase tracking-wider text-mut">Revenue (30d)</th>
                  <th scope="col" className="px-4 py-2 text-right text-[11px] font-medium uppercase tracking-wider text-mut">Units</th>
                  <th scope="col" className="px-4 py-2 text-right text-[11px] font-medium uppercase tracking-wider text-mut">Trend</th>
                </tr>
              </thead>
              <tbody>
                {TOP_PRODUCTS.map((p) => (
                  <tr key={p.id} className="border-b border-line/60 transition-colors last:border-0 hover:bg-ink-750">
                    <td className="px-4 py-2.5 text-[13px] font-medium text-txt">{p.name}</td>
                    <td className="px-4 py-2.5 text-[12.5px] text-mut">{p.segment}</td>
                    <td className="px-4 py-2.5 text-right font-mono text-[12.5px] text-txt">{inr(p.revenue)}</td>
                    <td className="px-4 py-2.5 text-right font-mono text-[12.5px] text-mut">{p.units.toLocaleString("en-IN")}</td>
                    <td className={`px-4 py-2.5 text-right font-mono text-[12px] ${p.trend < 0 ? "text-risk" : "text-stable"}`}>
                      {p.trend > 0 ? "+" : ""}{p.trend}%
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      </div>

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-3 xl:grid-cols-12">
        <section className="rounded-[10px] border border-line bg-ink-800 p-4 lg:col-span-1 xl:col-span-4" aria-label="What the business owns">
          <h2 className="text-[12px] font-medium uppercase tracking-wider text-mut">What it owns</h2>
          {loading ? (
            <SkeletonCard />
          ) : (
            <div className="mt-4 space-y-4">
              <div>
                <p className="font-mono text-[26px] font-medium leading-none text-txt">
                  <CountUp value={INVENTORY.value} format={lakh} />
                </p>
                <p className="mt-1 text-[12px] text-mut">inventory at cost</p>
              </div>
              <dl className="grid grid-cols-3 gap-3">
                <div><dt className="text-[11px] text-mut">Units</dt><dd className="mt-0.5 font-mono text-[14px] text-txt">{INVENTORY.units.toLocaleString("en-IN")}</dd></div>
                <div><dt className="text-[11px] text-mut">Avg age</dt><dd className="mt-0.5 font-mono text-[14px] text-txt">{INVENTORY.avgAge}d</dd></div>
                <div><dt className="text-[11px] text-mut">Overstock</dt><dd className="mt-0.5 font-mono text-[14px] text-gold">{INVENTORY.overstockUnits.toLocaleString("en-IN")}</dd></div>
              </dl>
              <div className="border-t border-line pt-3">
                <p className="text-[11px] text-mut">Receivables outstanding</p>
                <p className="mt-0.5 font-mono text-[14px] text-txt">{inr(RECEIVABLES.outstanding)} <span className="text-risk">({inr(RECEIVABLES.atRisk)} at risk)</span></p>
              </div>
            </div>
          )}
        </section>

        <section className="rounded-[10px] border border-line bg-ink-800 p-4 xl:col-span-4" aria-label="What the business owes">
          <h2 className="text-[12px] font-medium uppercase tracking-wider text-mut">What it owes</h2>
          {loading ? (
            <SkeletonCard />
          ) : (
            <div className="mt-4 space-y-4">
              <p className="font-mono text-[26px] font-medium leading-none text-txt">
                <CountUp value={PAYABLES.total} format={lakh} />
              </p>
              <ul className="space-y-2">
                {PAYABLES.aging.map((a) => {
                  const max = Math.max(...PAYABLES.aging.map((x) => x.value));
                  return (
                    <li key={a.label} className="flex items-center gap-2.5">
                      <span className="w-12 shrink-0 font-mono text-[11px] text-mut">{a.label}</span>
                      <span className="h-1.5 flex-1 overflow-hidden rounded-full bg-ink-900">
                        <span className={`block h-full rounded-full ${a.label === "90d+" ? "bg-risk" : "bg-gold/70"}`} style={{ width: `${(a.value / max) * 100}%` }} />
                      </span>
                      <span className="w-14 text-right font-mono text-[11.5px] text-txt">{lakh(a.value)}</span>
                    </li>
                  );
                })}
              </ul>
              <p className="border-t border-line pt-3 text-[12px] text-mut">
                Top vendor <span className="text-txt">{PAYABLES.topVendor}</span> <span className="font-mono">{inr(PAYABLES.topVendorAmount)}</span>
              </p>
            </div>
          )}
        </section>

        <section className="rounded-[10px] border border-line bg-ink-800 p-4 xl:col-span-4" aria-label="What the business spends">
          <h2 className="text-[12px] font-medium uppercase tracking-wider text-mut">What it spends</h2>
          {loading ? (
            <div className="mt-8 flex justify-center"><SkeletonCard /></div>
          ) : (
            <div className="mt-5">
              <Donut
                data={EXPENSES.map((e) => ({ label: e.label, value: e.value / 100000, pct: e.pct }))}
                centerLabel="MONTHLY"
                centerValue={lakh(EXPENSES.reduce((s, e) => s + e.value, 0))}
              />
            </div>
          )}
        </section>
      </div>
    </div>
  );
}
