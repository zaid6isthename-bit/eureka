"use client";

import { useEffect, useMemo, useState } from "react";
import {
  ColumnDef,
  SortingState,
  flexRender,
  getCoreRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { ArrowUpDown, Search } from "lucide-react";
import { CountUp } from "@/components/ui/CountUp";
import { Drawer } from "@/components/ui/Drawer";
import { SkeletonRow } from "@/components/ui/Skeleton";
import { PageHeader } from "@/components/app/PageHeader";
import { PIPELINE, RECOVER_ITEMS, SCORE_WEIGHTS, type RecItem, type RecStatus } from "@/lib/mock-data";
import { inr, lakh } from "@/lib/format";

const STATUSES: (RecStatus | "All")[] = ["All", "Unreviewed", "Listed", "Matched", "Recovered"];

function scoreTone(score: number) {
  if (score >= 80) return { text: "text-gold", bar: "bg-gold" };
  if (score >= 60) return { text: "text-cyan", bar: "bg-cyan" };
  return { text: "text-mut", bar: "bg-mut" };
}

function StatusBadge({ status }: { status: RecStatus }) {
  const map: Record<RecStatus, string> = {
    Unreviewed: "border-line text-mut",
    Listed: "border-cyan/40 bg-cyan/10 text-cyan",
    Matched: "border-gold/40 bg-gold/10 text-gold",
    Recovered: "border-stable/40 bg-stable/10 text-stable",
  };
  return (
    <span className={`inline-flex rounded-full border px-2 py-0.5 font-mono text-[10.5px] ${map[status]}`}>
      {status}
    </span>
  );
}

function ScoreCell({ score }: { score: number }) {
  const tone = scoreTone(score);
  return (
    <div className="flex items-center justify-end gap-2">
      <span className="hidden h-1 w-10 overflow-hidden rounded-full bg-ink-900 sm:block">
        <span className={`block h-full rounded-full ${tone.bar}`} style={{ width: `${score}%` }} />
      </span>
      <span className={`w-7 text-right font-mono text-[13px] font-medium ${tone.text}`}>{score}</span>
    </div>
  );
}

export default function RecoverPage() {
  const [items, setItems] = useState<RecItem[]>(RECOVER_ITEMS);
  const [sorting, setSorting] = useState<SortingState>([{ id: "score", desc: true }]);
  const [statusFilter, setStatusFilter] = useState<RecStatus | "All">("All");
  const [query, setQuery] = useState("");
  const [selected, setSelected] = useState<RecItem | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const t = setTimeout(() => setLoading(false), 450);
    return () => clearTimeout(t);
  }, []);

  const data = useMemo(
    () =>
      items.filter(
        (i) =>
          (statusFilter === "All" || i.status === statusFilter) &&
          (query === "" ||
            i.name.toLowerCase().includes(query.toLowerCase()) ||
            i.sku.toLowerCase().includes(query.toLowerCase()))
      ),
    [items, statusFilter, query]
  );

  const columns = useMemo<ColumnDef<RecItem>[]>(
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
        accessorKey: "ageDays",
        header: "Age (d)",
        cell: (c) => (
          <span className={`font-mono text-[12.5px] ${c.getValue<number>() > 300 ? "text-risk" : "text-txt"}`}>
            {c.getValue<number>()}
          </span>
        ),
      },
      {
        accessorKey: "qty",
        header: "Qty",
        cell: (c) => <span className="font-mono text-[12.5px] text-txt">{c.getValue<number>().toLocaleString("en-IN")}</span>,
      },
      {
        accessorKey: "value",
        header: "Est. value",
        cell: (c) => <span className="font-mono text-[12.5px] text-gold">{inr(c.getValue<number>())}</span>,
      },
      {
        accessorKey: "score",
        header: "Recovery score",
        cell: (c) => <ScoreCell score={c.getValue<number>()} />,
      },
      {
        accessorKey: "status",
        header: "Status",
        cell: (c) => <StatusBadge status={c.getValue<RecStatus>()} />,
      },
    ],
    []
  );

  const table = useReactTable({
    data,
    columns,
    state: { sorting },
    onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
  });

  const openItem = items.find((i) => i.id === selected?.id) ?? selected;

  const startRecovery = (id: string) =>
    setItems((list) => list.map((i) => (i.id === id ? { ...i, status: "Listed" } : i)));

  return (
    <div className="space-y-4">
      <PageHeader
        crumbs={["Home", "Recovery"]}
        title="Recover"
        subtitle="Excess and slow-moving inventory, scored and matched to B2B buyers"
      />

      <section className="grid grid-cols-2 gap-4 rounded-[10px] border border-line bg-ink-800 p-4 sm:grid-cols-4" aria-label="Recovery pipeline summary">
        <div>
          <p className="text-[11px] uppercase tracking-wider text-mut">Items tracked</p>
          <p className="mt-1 font-mono text-[26px] font-medium leading-none text-txt">
            <CountUp value={items.length} />
          </p>
        </div>
        <div>
          <p className="text-[11px] uppercase tracking-wider text-mut">Tracked value</p>
          <p className="mt-1 font-mono text-[26px] font-medium leading-none text-txt">
            <CountUp value={PIPELINE.trackedValue} format={lakh} duration={450} />
          </p>
        </div>
        <div>
          <p className="text-[11px] uppercase tracking-wider text-mut">Est. recoverable</p>
          <p className="mt-1 font-mono text-[26px] font-medium leading-none text-gold">
            <CountUp value={PIPELINE.recoverable} format={lakh} duration={550} />
          </p>
        </div>
        <div>
          <p className="text-[11px] uppercase tracking-wider text-mut">Recovered this month</p>
          <p className="mt-1 font-mono text-[26px] font-medium leading-none text-stable">
            <CountUp value={PIPELINE.recoveredThisMonth} format={lakh} duration={650} />
          </p>
        </div>
      </section>

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
            className="h-8 w-52 rounded-md border border-line bg-ink-800 pl-8 pr-3 text-[12px] text-txt placeholder:text-mut focus:border-cyan/50 focus:outline-none"
          />
        </div>
      </div>

      <div className="overflow-hidden rounded-[10px] border border-line bg-ink-800">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[760px] text-left">
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
                        <ArrowUpDown size={11} className={h.column.getIsSorted() ? "text-cyan" : "opacity-40"} />
                      </button>
                    )}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {loading ? (
                Array.from({ length: 6 }).map((_, i) => (
                  <tr key={i}>
                    <td colSpan={7} className="p-0">
                      <SkeletonRow cols={6} />
                    </td>
                  </tr>
                ))
              ) : (
                table.getRowModel().rows.map((row) => (
                  <tr
                    key={row.id}
                    onClick={() => setSelected(row.original)}
                    className="cursor-pointer border-b border-line/60 transition-colors last:border-0 hover:bg-ink-750"
                  >
                    {row.getVisibleCells().map((cell) => (
                      <td key={cell.id} className="px-4 py-2.5">
                        {flexRender(cell.column.columnDef.cell, cell.getContext())}
                      </td>
                    ))}
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
        {!loading && data.length === 0 && (
          <p className="px-4 py-8 text-center text-[13px] text-mut">No items match the current filters.</p>
        )}
      </div>

      <Drawer open={!!openItem} onClose={() => setSelected(null)} title={openItem ? `${openItem.sku} \u2014 ${openItem.name}` : ""}>
        {openItem && (
          <div className="space-y-6">
            <div>
              <div className="flex items-baseline justify-between">
                <span className="text-[11px] uppercase tracking-wider text-mut">Recovery Score</span>
                <span className={`font-mono text-[28px] font-medium leading-none ${scoreTone(openItem.score).text}`}>
                  {openItem.score}<span className="text-[14px] text-mut">/100</span>
                </span>
              </div>
              <ul className="mt-4 space-y-2.5">
                {(
                  [
                    ["Demand", openItem.subs.demand, SCORE_WEIGHTS.demand],
                    ["Age", openItem.subs.age, SCORE_WEIGHTS.age],
                    ["Condition", openItem.subs.condition, SCORE_WEIGHTS.condition],
                    ["Location", openItem.subs.location, SCORE_WEIGHTS.location],
                    ["Urgency", openItem.subs.urgency, SCORE_WEIGHTS.urgency],
                    ["Market value", openItem.subs.market, SCORE_WEIGHTS.market],
                    ["Quantity", openItem.subs.quantity, SCORE_WEIGHTS.quantity],
                  ] as [string, number, number][]
                ).map(([label, v, w]) => (
                  <li key={label} className="flex items-center gap-3">
                    <span className="w-24 shrink-0 text-[12px] text-mut">{label}</span>
                    <span className="h-1.5 flex-1 overflow-hidden rounded-full bg-ink-800">
                      <span className={`block h-full rounded-full ${scoreTone(v).bar}`} style={{ width: `${v}%` }} />
                    </span>
                    <span className="w-16 text-right font-mono text-[11px] text-txt">
                      {((v / 100) * w).toFixed(1)}<span className="text-mut">/{w}</span>
                    </span>
                  </li>
                ))}
              </ul>
            </div>

            <dl className="grid grid-cols-2 gap-x-4 gap-y-3 rounded-[10px] border border-line bg-ink-800 p-4 text-[12.5px]">
              <div><dt className="text-mut">Quantity</dt><dd className="mt-0.5 font-mono text-txt">{openItem.qty.toLocaleString("en-IN")} units</dd></div>
              <div><dt className="text-mut">Age</dt><dd className="mt-0.5 font-mono text-txt">{openItem.ageDays} days</dd></div>
              <div><dt className="text-mut">Condition</dt><dd className="mt-0.5 text-txt">{openItem.condition}</dd></div>
              <div><dt className="text-mut">Location</dt><dd className="mt-0.5 text-txt">{openItem.location}</dd></div>
              <div><dt className="text-mut">Est. market value</dt><dd className="mt-0.5 font-mono text-gold">{inr(openItem.value)}</dd></div>
              <div><dt className="text-mut">Status</dt><dd className="mt-0.5"><StatusBadge status={openItem.status} /></dd></div>
            </dl>

            <div>
              <h3 className="text-[11px] uppercase tracking-wider text-mut">Matched buyers</h3>
              {openItem.buyers.length === 0 ? (
                <p className="mt-3 rounded-[10px] border border-dashed border-line px-4 py-5 text-center text-[12.5px] text-mut">
                  No buyers matched yet \u2014 listing this item will start matching.
                </p>
              ) : (
                <ul className="mt-3 space-y-2">
                  {openItem.buyers.map((b, i) => (
                    <li key={b.name} className="flex items-center gap-3 rounded-[10px] border border-line bg-ink-800 px-3.5 py-3">
                      <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-md bg-cyan/10 font-mono text-[12px] text-cyan">
                        {b.name[0]}
                      </span>
                      <div className="min-w-0 flex-1">
                        <p className="truncate text-[13px] font-medium text-txt">
                          {b.name}
                          {i === 0 && <span className="ml-2 rounded border border-gold/40 bg-gold/10 px-1.5 py-px font-mono text-[9.5px] text-gold">BEST MATCH</span>}
                        </p>
                        <p className="font-mono text-[11px] text-mut">{b.match}% match</p>
                      </div>
                      <span className="shrink-0 font-mono text-[13px] text-gold">{inr(b.offer)}</span>
                    </li>
                  ))}
                </ul>
              )}
            </div>

            {openItem.status !== "Recovered" && (
              <button
                onClick={() => startRecovery(openItem.id)}
                disabled={openItem.status === "Listed" || openItem.status === "Matched"}
                className="w-full rounded-lg bg-gold py-2.5 text-[13.5px] font-semibold text-ink-950 transition-colors hover:bg-gold/90 disabled:cursor-default disabled:bg-ink-750 disabled:text-mut"
              >
                {openItem.status === "Unreviewed" ? "Start recovery" : "Recovery in progress"}
              </button>
            )}
          </div>
        )}
      </Drawer>
    </div>
  );
}
