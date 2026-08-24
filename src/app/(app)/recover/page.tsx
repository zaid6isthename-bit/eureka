"use client";

import React, { useEffect, useMemo, useState } from "react";
import {
  ColumnDef,
  SortingState,
  flexRender,
  getCoreRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import {
  ArrowUpDown,
  Search,
  ChevronDown,
  ChevronRight,
  CheckCircle2,
  Handshake,
  BadgeCheck,
} from "lucide-react";
import { CountUp } from "@/components/ui/CountUp";
import { Drawer } from "@/components/ui/Drawer";
import { SkeletonRow } from "@/components/ui/Skeleton";
import { PageHeader } from "@/components/app/PageHeader";
import { ScoreDial, tierLabel } from "@/components/app/ScoreDial";
import { toast } from "@/components/app/toast";
import { usePersistentState } from "@/lib/use-persistent-state";
import {
  STATUSES,
  STAGES,
  seedCandidates,
  buildCandidates,
  COMMISSION_PCT,
  LOGISTICS_PCT,
  type Candidate,
  type RecStatus,
  type ScoreFactor,
  type Buyer,
} from "@/lib/recovery-score";
import { inr } from "@/lib/format";

/* ---------- small helpers ---------- */

function factorBarTone(norm: number) {
  if (norm >= 0.75) return "bg-stable";
  if (norm >= 0.5) return "bg-gold";
  return "bg-[#B04A4A]";
}

function StatusBadge({ status }: { status: RecStatus }) {
  const map: Record<RecStatus, string> = {
    Unreviewed: "border-line text-mut",
    Listed: "border-flow-cyan/40 bg-flow-cyan-light/60 text-flow-cyan",
    Matched: "border-gold/40 bg-gold/10 text-gold",
    "In negotiation": "border-gold/40 bg-gold/10 text-gold",
    Recovered: "border-stable/40 bg-stable/10 text-stable",
  };
  return (
    <span className={`inline-flex rounded-full border px-2 py-0.5 font-mono text-[10.5px] ${map[status]}`}>
      {status}
    </span>
  );
}

const STATUS_STAGE: Record<RecStatus, number> = {
  Unreviewed: 1,
  Listed: 3,
  Matched: 3,
  "In negotiation": 4,
  Recovered: 4,
};

function StageRail({ status }: { status: RecStatus }) {
  const current = STATUS_STAGE[status];
  return (
    <ol className="flex items-center gap-0" aria-label="Recovery journey">
      {STAGES.map((s, i) => {
        const done = i < current;
        const active = i === current;
        return (
          <li key={s.key} className={`flex items-center ${i < STAGES.length - 1 ? "flex-1" : ""}`}>
            <span className="flex flex-col items-center gap-1">
              <span
                aria-hidden="true"
                className={`flex h-4 w-4 items-center justify-center rounded-full border text-[8px] transition-colors ${
                  done
                    ? "border-stable bg-stable text-white"
                    : active
                      ? "border-signal-green bg-signal-green text-white"
                      : "border-line bg-card"
                }`}
              >
                {done ? <CheckCircle2 size={10} /> : ""}
              </span>
              <span
                className={`text-[9.5px] font-medium uppercase tracking-wider ${
                  active ? "text-txt" : done ? "text-stable" : "text-mut"
                }`}
              >
                {s.label}
              </span>
            </span>
            {i < STAGES.length - 1 && (
              <span aria-hidden="true" className={`mx-1.5 mb-4 h-px flex-1 ${done ? "bg-stable/60" : "bg-line"}`} />
            )}
          </li>
        );
      })}
    </ol>
  );
}

function StepBadge({ n, title }: { n: number; title: string }) {
  return (
    <p className="mb-3 flex items-center gap-2">
      <span className="rounded-full bg-ink-950 px-2 py-0.5 font-mono text-[9px] font-bold tracking-wider text-bg">
        STEP {n}
      </span>
      <span className="text-[11px] font-semibold uppercase tracking-wider text-mut">{title}</span>
    </p>
  );
}

function FactorBreakdown({ factors, score }: { factors: ScoreFactor[]; score: number }) {
  const sorted = [...factors].sort((a, z) => z.points - a.points);
  return (
    <div className="space-y-2.5 p-4">
      {sorted.map((f) => (
        <div key={f.key} className="flex items-center gap-3">
          <span className="w-32 shrink-0 truncate text-[12px] text-txt">{f.label}</span>
          <span className="w-16 shrink-0 truncate font-mono text-[10.5px] text-mut">{f.raw}</span>
          <span className="h-1.5 flex-1 overflow-hidden rounded-full bg-ink-900">
            <span
              className={`block h-full rounded-full transition-[width] duration-700 ${factorBarTone(f.norm)}`}
              style={{ width: `${f.norm * 100}%` }}
            />
          </span>
          <span className="w-20 shrink-0 text-right font-mono text-[11px] text-txt">
            ×<span className="text-mut">{f.weight}%</span> = {f.points.toFixed(1)}
          </span>
        </div>
      ))}
      <p className="pt-1 text-right font-mono text-[10.5px] text-mut">
        Σ factors × weights = <span className="font-bold text-txt">{score}</span>/100
      </p>
    </div>
  );
}

function Waterfall({
  c,
  onEditPrice,
}: {
  c: Candidate;
  onEditPrice: (v: number) => void;
}) {
  const e = c.economics;
  const scalePct = (v: number) => `${Math.min((v / e.bookValue) * 100, 100)}%`;

  const Row = ({
    label,
    amount,
    tone = "txt",
    bar,
  }: {
    label: string;
    amount: string;
    tone?: "txt" | "risk" | "gold";
    bar?: React.ReactNode;
  }) => (
    <div className="grid grid-cols-[110px_1fr_92px] items-center gap-3">
      <span className="truncate text-[12px] text-mut">{label}</span>
      <span className="h-2 overflow-hidden rounded-full bg-ink-900">
        {bar ? (
          <span className="relative block h-full w-full">{bar}</span>
        ) : null}
      </span>
      <span
        className={`text-right font-mono text-[12.5px] ${
          tone === "risk" ? "text-risk" : tone === "gold" ? "text-gold" : "text-txt"
        }`}
      >
        {amount}
      </span>
    </div>
  );

  return (
    <div className="space-y-3 rounded-xl border border-line bg-card p-4">
      <label className="flex items-center justify-between gap-3 border-b border-line pb-3">
        <span className="text-[12px] text-mut">Asking price / unit</span>
        <input
          type="number"
          min={100}
          step={50}
          value={c.askPrice}
          onChange={(ev) => onEditPrice(Math.max(100, Number(ev.target.value) || 0))}
          aria-label="Asking price per unit — recomputes recovery economics live"
          className="h-8 w-28 rounded-md border border-line bg-ink-900 px-2 text-right font-mono text-[12.5px] text-txt focus:border-flow-cyan/50 focus:outline-none"
        />
      </label>

      <Row label="Book value" amount={inr(e.bookValue)} bar={<span className="absolute inset-y-0 left-0 w-full bg-ink-300" />} />

      <Row
        label="Expected range"
        amount={`${inr(e.rangeLow)}–${inr(e.rangeHigh)}`}
        tone="gold"
        bar={
          <span
            className="absolute inset-y-0 bg-gold/50"
            style={{
              marginLeft: `${Math.min((e.rangeLow / e.bookValue) * 100, 100)}%`,
              width: `${Math.min(((e.rangeHigh - e.rangeLow) / e.bookValue) * 100, 100 - (e.rangeLow / e.bookValue) * 100)}%`,
            }}
          />
        }
      />

      <Row label={`Commission ${COMMISSION_PCT * 100}%`} amount={`−${inr(e.commission)}`} tone="risk" />
      <Row label={`Logistics ${LOGISTICS_PCT * 100}%`} amount={`−${inr(e.logistics)}`} tone="risk" />

      <div className="flex items-center justify-between border-t border-line pt-3">
        <div>
          <p className="text-[11px] uppercase tracking-wider text-mut">Net cash returned</p>
          <p className="mt-1 text-[11px] text-mut">{e.recoveryPct}% of book · ~{e.daysToLiquidate}d to liquidate</p>
        </div>
        <p className="font-mono text-[22px] font-medium leading-none text-stable">
          <CountUp key={e.net} value={e.net} format={inr} duration={550} />
        </p>
      </div>

      <dl className="grid grid-cols-3 gap-2 border-t border-line pt-3 text-center">
        <div className="rounded-lg bg-ink-900 px-2 py-2">
          <dt className="text-[10px] uppercase tracking-wider text-mut">Recovery %</dt>
          <dd className="mt-0.5 font-mono text-[14px] font-medium text-txt">{e.recoveryPct}%</dd>
        </div>
        <div className="rounded-lg bg-ink-900 px-2 py-2">
          <dt className="text-[10px] uppercase tracking-wider text-mut">Est. time</dt>
          <dd className="mt-0.5 font-mono text-[14px] font-medium text-txt">~{e.daysToLiquidate}d</dd>
        </div>
        <div className="rounded-lg bg-ink-900 px-2 py-2">
          <dt className="text-[10px] uppercase tracking-wider text-mut">ROI</dt>
          <dd className="mt-0.5 font-mono text-[14px] font-medium text-stable">{e.roiPct}%</dd>
        </div>
      </dl>
    </div>
  );
}

function BuyerCard({
  b,
  gross,
  state,
  onIntro,
}: {
  b: Buyer;
  gross: number;
  state: "idle" | "sent" | "locked" | "done";
  onIntro: () => void;
}) {
  const SUBS: [string, number][] = [
    ["Category fit", b.sub.categoryFit],
    ["Location", b.sub.locationProx],
    ["Capacity", b.sub.capacity],
    ["History", b.sub.history],
  ];
  return (
    <li
      className={`rounded-xl border p-3.5 transition-colors ${
        state === "sent" || state === "done" ? "border-stable/40 bg-stable/5" : "border-line bg-card"
      }`}
    >
      <div className="flex items-center gap-3">
        <ScoreDial score={b.match} size={44} label={`${b.name} match score ${b.match}`} />
        <div className="min-w-0 flex-1">
          <p className="flex items-center gap-1.5 truncate text-[13px] font-medium text-txt">
            {b.name}
            {state === "done" && (
              <span className="rounded border border-stable/40 bg-stable/10 px-1.5 py-px font-mono text-[9px] text-stable">
                DEAL DONE
              </span>
            )}
          </p>
          <p className="truncate text-[11px] text-mut">{b.note}</p>
        </div>
        <div className="shrink-0 text-right">
          <p className="font-mono text-[13.5px] font-medium text-gold">{inr(b.offer)}</p>
          <p className="font-mono text-[10px] text-mut">
            {Math.round((b.offer / Math.max(gross, 1)) * 100)}% of gross
          </p>
        </div>
      </div>

      <ul className="mt-3 grid grid-cols-2 gap-x-4 gap-y-1.5">
        {SUBS.map(([label, v]) => (
          <li key={label} className="flex items-center gap-2">
            <span className="w-20 shrink-0 truncate text-[10.5px] text-mut">{label}</span>
            <span className="h-1 flex-1 overflow-hidden rounded-full bg-ink-900">
              <span className={`block h-full rounded-full ${factorBarTone(v / 100)}`} style={{ width: `${v}%` }} />
            </span>
            <span className="w-7 text-right font-mono text-[10px] text-txt">{v}</span>
          </li>
        ))}
      </ul>

      {state === "sent" ? (
        <p className="mt-3 flex items-center gap-1.5 rounded-lg bg-stable/10 px-3 py-2 text-[12px] font-medium text-stable">
          <BadgeCheck size={13} /> Introduction sent · expect a reply within 48h
        </p>
      ) : state === "done" ? (
        <p className="mt-3 flex items-center gap-1.5 rounded-lg bg-stable/10 px-3 py-2 text-[12px] font-medium text-stable">
          <Handshake size={13} /> Agreement closed — capital recovered
        </p>
      ) : (
        <button
          onClick={onIntro}
          disabled={state === "locked"}
          className="mt-3 h-9 w-full rounded-full bg-ink-950 text-[12.5px] font-bold text-bg transition-opacity hover:opacity-90 disabled:cursor-not-allowed disabled:bg-ink-750 disabled:text-mut"
        >
          Request introduction
        </button>
      )}
    </li>
  );
}

/* ---------- page ---------- */

export default function RecoverPage() {
  const [items, setItems] = usePersistentState<Candidate[]>("rc-recover-v2", () => seedCandidates());
  const [sorting, setSorting] = useState<SortingState>([{ id: "score", desc: true }]);
  const [statusFilter, setStatusFilter] = useState<RecStatus | "All">("All");
  const [query, setQuery] = useState("");
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const t = setTimeout(() => setLoading(false), 450);
    return () => clearTimeout(t);
  }, []);

  const patch = (id: string, p: Partial<Candidate>) =>
    setItems((list) => list.map((i) => (i.id === id ? { ...i, ...p } : i)));

  const rebuild = (id: string, p: Partial<Candidate>) =>
    setItems((list) =>
      list.map((i) => (i.id === id ? buildCandidates([{ ...i, ...p }])[0] : i))
    );

  const approve = (c: Candidate) => {
    rebuild(c.id, { status: "Listed" });
    toast("Listing created", {
      description: `${c.sku} is live — the buyer matcher has ranked ${c.matched.length} candidates.`,
    });
  };

  const requestIntro = (c: Candidate, b: Buyer) => {
    rebuild(c.id, { introTo: b.name, status: "Matched" });
    toast(`Introduction sent to ${b.name}`, {
      description: "They typically respond within 48 hours. We'll notify you.",
      kind: "info",
    });
  };

  const advance = (c: Candidate, to: RecStatus) => {
    rebuild(c.id, { status: to });
    if (to === "In negotiation")
      toast("Negotiation started", { description: `Direct channel open with ${c.introTo}.`, kind: "info" });
    if (to === "Recovered")
      toast("Capital recovered", { description: `${inr(c.economics.net)} is back in active working capital.` });
  };

  const data = useMemo(() => {
    if (!items) return [];
    const q = query.toLowerCase();
    return items.filter(
      (i) =>
        (statusFilter === "All" || i.status === statusFilter) &&
        (q === "" || i.name.toLowerCase().includes(q) || i.sku.toLowerCase().includes(q))
    );
  }, [items, statusFilter, query]);

  const summary = useMemo(() => {
    const list = items ?? [];
    return {
      count: list.length,
      trapped: list.reduce((s, i) => s + i.economics.bookValue, 0),
      estNet: list.filter((i) => i.status !== "Recovered").reduce((s, i) => s + i.economics.net, 0),
      recovered: list.filter((i) => i.status === "Recovered").reduce((s, i) => s + i.economics.net, 0),
    };
  }, [items]);

  const columns = useMemo<ColumnDef<Candidate>[]>(
    () => [
      {
        accessorKey: "sku",
        header: "SKU / Item",
        cell: (c) => (
          <div className="min-w-0">
            <p className="truncate text-[13px] font-medium text-txt">{c.row.original.name}</p>
            <p className="font-mono text-[10.5px] text-mut">{c.row.original.sku}</p>
          </div>
        ),
      },
      {
        accessorKey: "category",
        header: "Category",
        cell: (c) => <span className="text-[12.5px] text-mut">{c.getValue<string>()}</span>,
      },
      {
        accessorKey: "qty",
        header: "Qty",
        cell: (c) => <span className="font-mono text-[12.5px] text-txt">{c.getValue<number>().toLocaleString("en-IN")}</span>,
      },
      {
        accessorKey: "ageDays",
        header: "Age (d)",
        cell: (c) => (
          <span className={`font-mono text-[12.5px] ${c.getValue<number>() > 300 ? "text-risk" : "text-txt"}`}>
            {c.getValue<number>()}
          </span>
        ),
      },
      {
        accessorKey: "economics",
        header: "Est. net",
        cell: (c) => (
          <span className="font-mono text-[12.5px] text-gold">{inr(c.row.original.economics.net)}</span>
        ),
      },
      {
        accessorKey: "score",
        header: "Score™",
        cell: (c) => (
          <div className="flex items-center justify-end gap-2">
            <span className={`hidden text-[10px] font-medium uppercase tracking-wide lg:inline ${tierLabel(c.row.original.tier)}`}>
              {c.row.original.tier}
            </span>
            <ScoreDial score={c.getValue<number>()} size={38} />
          </div>
        ),
      },
      {
        accessorKey: "status",
        header: "Status",
        cell: (c) => <StatusBadge status={c.getValue<RecStatus>()} />,
      },
      {
        id: "expand",
        header: "",
        cell: (c) => (
          <button
            onClick={(ev) => {
              ev.stopPropagation();
              setExpandedId((x) => (x === c.row.original.id ? null : c.row.original.id));
            }}
            aria-label={expandedId === c.row.original.id ? "Hide score breakdown" : "Show Recovery Score breakdown"}
            aria-expanded={expandedId === c.row.original.id}
            className="rounded-md p-1 text-mut transition-colors hover:bg-ink-750 hover:text-txt"
          >
            {expandedId === c.row.original.id ? <ChevronDown size={14} /> : <ChevronRight size={14} />}
          </button>
        ),
      },
    ],
    [expandedId]
  );

  const table = useReactTable({
    data,
    columns,
    state: { sorting },
    onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
  });

  const openItem = (items ?? []).find((i) => i.id === selectedId) ?? null;

  return (
    <div className="space-y-4">
      <PageHeader
        crumbs={["Home", "Recovery"]}
        title="Recover"
        subtitle="Recovery Score™ ranks stranded stock by what it can actually return — then matches buyers"
      />

      {/* Summary strip */}
      <section
        className="grid grid-cols-2 gap-4 rounded-[10px] border border-line bg-ink-800 p-4 sm:grid-cols-4"
        aria-label="Recovery pipeline summary"
      >
        <div>
          <p className="text-[11px] uppercase tracking-wider text-mut">Candidates</p>
          <p className="mt-1 font-mono text-[26px] font-medium leading-none text-txt">
            <CountUp value={summary.count} />
          </p>
        </div>
        <div>
          <p className="text-[11px] uppercase tracking-wider text-mut">Trapped book value</p>
          <p className="mt-1 font-mono text-[26px] font-medium leading-none text-txt">
            <CountUp key={summary.trapped} value={summary.trapped} format={inr} duration={450} />
          </p>
        </div>
        <div>
          <p className="text-[11px] uppercase tracking-wider text-mut">Est. net recoverable</p>
          <p className="mt-1 font-mono text-[26px] font-medium leading-none text-gold">
            <CountUp key={summary.estNet} value={summary.estNet} format={inr} duration={550} />
          </p>
        </div>
        <div>
          <p className="text-[11px] uppercase tracking-wider text-mut">Capital recovered</p>
          <p className="mt-1 font-mono text-[26px] font-medium leading-none text-stable">
            <CountUp key={summary.recovered} value={summary.recovered} format={inr} duration={650} />
          </p>
        </div>
      </section>

      {/* Filters */}
      <div className="flex flex-wrap items-center gap-2">
        <div role="group" aria-label="Filter by status" className="flex flex-wrap gap-1.5">
          {STATUSES.map((s) => (
            <button
              key={s}
              onClick={() => setStatusFilter(s)}
              aria-pressed={statusFilter === s}
              className={`rounded-md border px-2.5 py-1 text-[11.5px] transition-colors ${
                statusFilter === s
                  ? "border-gold/60 bg-gold/10 font-medium text-gold"
                  : "border-line text-mut hover:bg-ink-750 hover:text-txt"
              }`}
            >
              {s}
            </button>
          ))}
        </div>
        <div className="relative ml-auto">
          <Search size={13} className="pointer-events-none absolute left-2.5 top-1/2 -translate-y-1/2 text-mut" />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Filter by SKU or name"
            aria-label="Filter items"
            className="h-8 w-52 rounded-md border border-line bg-ink-800 pl-8 pr-3 text-[12px] text-txt placeholder:text-mut focus:border-flow-cyan/50 focus:outline-none"
          />
        </div>
      </div>

      {/* Table */}
      <div className="overflow-hidden rounded-[10px] border border-line bg-ink-800">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[880px] text-left">
            <thead>
              <tr className="border-b border-line bg-ink-900">
                {table.getHeaderGroups()[0].headers.map((h) => (
                  <th key={h.id} scope="col" className="px-4 py-2.5">
                    {h.isPlaceholder ? null : (
                      <button
                        onClick={h.column.getToggleSortingHandler()}
                        className="flex items-center gap-1.5 text-[11px] font-medium uppercase tracking-wider text-mut transition-colors hover:text-txt"
                      >
                        {flexRender(h.column.columnDef.header, h.getContext())}
                        <ArrowUpDown size={11} className={h.column.getIsSorted() ? "text-flow-cyan" : "opacity-40"} />
                      </button>
                    )}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {loading
                ? Array.from({ length: 6 }).map((_, i) => (
                    <tr key={i}>
                      <td colSpan={8} className="p-0">
                        <SkeletonRow cols={7} />
                      </td>
                    </tr>
                  ))
                : table.getRowModel().rows.flatMap((row) => {
                    const c = row.original;
                    const cells = (
                      <tr
                        key={row.id}
                        onClick={() => setSelectedId(c.id)}
                        className="cursor-pointer border-b border-line/60 transition-colors hover:bg-ink-750"
                      >
                        {row.getVisibleCells().map((cell) => (
                          <td key={cell.id} className="px-4 py-2.5">
                            {flexRender(cell.column.columnDef.cell, cell.getContext())}
                          </td>
                        ))}
                      </tr>
                    );
                    const expanded =
                      expandedId === c.id ? (
                        <tr key={`${row.id}-x`} className="border-b border-line/60 bg-ink-900/50">
                          <td colSpan={8} className="p-0">
                            <FactorBreakdown factors={c.factors} score={c.score} />
                          </td>
                        </tr>
                      ) : null;
                    return expanded ? [cells, expanded] : [cells];
                  })}
            </tbody>
          </table>
        </div>
        {!loading && data.length === 0 && (
          <p className="px-4 py-8 text-center text-[13px] text-mut">No items match the current filters.</p>
        )}
      </div>

      {/* Staged workflow drawer */}
      <Drawer open={!!openItem} onClose={() => setSelectedId(null)} title={openItem ? `${openItem.sku} — Recovery Score™ workflow` : ""}>
        {openItem && (
          <div className="space-y-6">
            <StageRail status={openItem.status} />

            {/* Header: dial + facts */}
            <div className="flex items-center gap-4">
              <ScoreDial score={openItem.score} size={76} />
              <div className="min-w-0 flex-1">
                <p className="truncate text-[14.5px] font-semibold text-txt">{openItem.name}</p>
                <p className="font-mono text-[11px] text-mut">
                  {openItem.sku} · {openItem.category} · {openItem.location}, {openItem.city}
                </p>
                <div className="mt-1.5 flex items-center gap-2">
                  <span className={`text-[11px] font-semibold uppercase tracking-wider ${tierLabel(openItem.tier)}`}>
                    {openItem.tier}
                  </span>
                  <StatusBadge status={openItem.status} />
                </div>
              </div>
            </div>

            {/* STEP 1 · SCORE */}
            <section>
              <StepBadge n={1} title="Multi-factor score" />
              <div className="overflow-hidden rounded-xl border border-line bg-card">
                <FactorBreakdown factors={openItem.factors} score={openItem.score} />
              </div>
            </section>

            {/* STEP 2 · ESTIMATE */}
            <section>
              <StepBadge n={2} title="Economic estimate" />
              <Waterfall
                c={openItem}
                onEditPrice={(v) => rebuild(openItem.id, { askPrice: v })}
              />
                {openItem.status === "Unreviewed" && (
                  <button
                    onClick={() => approve(openItem)}
                    className="mt-3 w-full rounded-full bg-gold py-2.5 text-[13px] font-bold text-ink-950 transition-colors hover:bg-gold/90"
                  >
                    Approve &amp; list for recovery
                  </button>
                )}
            </section>

            {/* STEP 3 · MATCH */}
            {openItem.status !== "Unreviewed" && (
              <section>
                <StepBadge n={3} title="Rule-based buyer match" />
                <ul className="space-y-2.5">
                  {openItem.matched.map((b) => (
                    <BuyerCard
                      key={b.name}
                      b={b}
                      gross={openItem.economics.gross}
                      state={
                        openItem.introTo === b.name
                          ? openItem.status === "Recovered"
                            ? "done"
                            : "sent"
                          : openItem.introTo
                            ? "locked"
                            : "idle"
                      }
                      onIntro={() => requestIntro(openItem, b)}
                    />
                  ))}
                </ul>
              </section>
            )}

            {/* STEP 4 · RECOVER — progression */}
            <section>
              <StepBadge n={4} title="Close the loop" />
              {openItem.status === "Listed" && (
                <p className="rounded-lg border border-dashed border-line px-3.5 py-3 text-[12px] text-mut">
                  Listing live. Review ranked buyers above and request an introduction to continue.
                </p>
              )}
              {openItem.status === "Matched" && (
                <button
                  onClick={() => advance(openItem, "In negotiation")}
                  className="w-full rounded-full bg-ink-950 py-2.5 text-[13px] font-bold text-bg transition-opacity hover:opacity-90"
                >
                  Move to negotiation with {openItem.introTo}
                </button>
              )}
              {openItem.status === "In negotiation" && (
                <button
                  onClick={() => advance(openItem, "Recovered")}
                  className="w-full rounded-full bg-stable py-2.5 text-[13px] font-bold text-white transition-opacity hover:opacity-90"
                >
                  Mark agreement closed — recover {inr(openItem.economics.net)}
                </button>
              )}
              {openItem.status === "Recovered" && (
                <div className="rounded-xl border border-stable/30 bg-stable/10 px-4 py-3.5">
                  <p className="flex items-center gap-2 text-[13px] font-semibold text-stable">
                    <BadgeCheck size={15} /> Loop closed — {inr(openItem.economics.net)} returned
                  </p>
                  <p className="mt-1 text-[11.5px] text-mut">
                    {inr(openItem.economics.commission + openItem.economics.logistics)} in fees ·{" "}
                    {openItem.economics.roiPct}% ROI on trapped capital.
                  </p>
                </div>
              )}
            </section>
          </div>
        )}
      </Drawer>
    </div>
  );
}
