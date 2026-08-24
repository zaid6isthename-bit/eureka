"use client";

import { useState } from "react";
import { Check, X, PenLine } from "lucide-react";
import { CountUp } from "@/components/ui/CountUp";
import { PageHeader } from "@/components/app/PageHeader";
import { toast } from "@/components/app/toast";
import { usePersistentState } from "@/lib/use-persistent-state";
import { RECOMMENDATIONS, type Recommendation } from "@/lib/mock-data";
import { lakh } from "@/lib/format";

function ActionCard({
  rec,
  onAccept,
  onDismiss,
  onModify,
}: {
  rec: Recommendation;
  onAccept: () => void;
  onDismiss: () => void;
  onModify: (impact: number) => void;
}) {
  const [editing, setEditing] = useState(false);
  const [draft, setDraft] = useState(rec.impact);

  return (
    <article className="rounded-[10px] border border-line bg-ink-800 p-4 transition-colors hover:bg-ink-750/50">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-2">
            <span className="font-mono text-[10.5px] text-mut">{rec.code}</span>
            <span className="rounded border border-line px-1.5 py-px font-mono text-[9.5px] text-mut">{rec.source}</span>
          </div>
          <p className="mt-1.5 text-[14px] font-medium leading-snug text-txt">{rec.action}</p>
          <p className="mt-1 text-[12.5px] leading-relaxed text-mut">{rec.reasoning}</p>
        </div>
        <div className="text-right">
          <p className="font-mono text-[20px] font-medium leading-none text-gold">
            +<CountUp value={rec.impact} format={lakh} />
          </p>
          <p className="mt-1 font-mono text-[10px] text-mut">projected impact</p>
        </div>
      </div>

      {editing ? (
        <div className="mt-4 flex items-center gap-2 border-t border-line pt-3">
          <span className="text-[12px] text-mut">Adjusted impact</span>
          <input
            type="number"
            value={draft}
            min={0}
            step={10000}
            onChange={(e) => setDraft(Number(e.target.value))}
            aria-label="Adjusted impact in rupees"
            className="h-8 w-36 rounded-md border border-line bg-ink-900 px-2 font-mono text-[12px] text-txt focus:border-cyan/50 focus:outline-none"
          />
          <button
            onClick={() => { onModify(draft); setEditing(false); }}
            className="rounded-md border border-cyan/50 px-3 py-1.5 text-[11.5px] font-medium text-cyan transition-colors hover:bg-cyan/10"
          >
            Save
          </button>
          <button
            onClick={() => { setDraft(rec.impact); setEditing(false); }}
            className="rounded-md border border-line px-3 py-1.5 text-[11.5px] text-mut transition-colors hover:bg-ink-750"
          >
            Cancel
          </button>
        </div>
      ) : (
        <div className="mt-4 flex gap-2 border-t border-line pt-3">
          <button onClick={onAccept} className="flex items-center gap-1.5 rounded-md bg-gold px-3 py-1.5 text-[12px] font-semibold text-ink-950 transition-colors hover:bg-gold/90">
            <Check size={13} /> Accept
          </button>
          <button onClick={() => setEditing(true)} className="flex items-center gap-1.5 rounded-md border border-line px-3 py-1.5 text-[12px] text-mut transition-colors hover:bg-ink-750 hover:text-txt">
            <PenLine size={12} /> Modify
          </button>
          <button onClick={onDismiss} className="ml-auto flex items-center gap-1.5 rounded-md border border-line px-3 py-1.5 text-[12px] text-mut transition-colors hover:bg-ink-750 hover:text-risk">
            <X size={12} /> Dismiss
          </button>
        </div>
      )}
    </article>
  );
}

export default function RecommendPage() {
  const [recs, setRecs] = usePersistentState<Recommendation[]>("rc-recs", RECOMMENDATIONS);

  const update = (id: string, patch: Partial<Recommendation>) => {
    setRecs((list) => list.map((r) => (r.id === id ? { ...r, ...patch } : r)));
    if (patch.status === "accepted") toast("Action accepted", { description: "Moved to In progress — we'll track the impact." });
    else if (patch.status === "dismissed") toast("Action dismissed", { kind: "info", description: "You can undo this from the archive." });
  };

  const inProgress = recs.filter((r) => r.status === "accepted");
  const queue = recs.filter((r) => r.status === "pending");
  const dismissed = recs.filter((r) => r.status === "dismissed");

  return (
    <div className="space-y-5">
      <PageHeader
        crumbs={["Home", "Actions"]}
        title="Recommend"
        subtitle="Triage the queue &mdash; accept, adjust, or dismiss"
      />

      {inProgress.length > 0 && (
        <section aria-label="In progress">
          <h2 className="mb-3 flex items-center gap-2 text-[12px] font-medium uppercase tracking-wider text-stable">
            <span className="h-1.5 w-1.5 rounded-full bg-stable live-dot" /> In progress ({inProgress.length})
          </h2>
          <div className="space-y-3">
            {inProgress.map((r) => (
              <ActionCard
                key={r.id}
                rec={r}
                onAccept={() => {}}
                onDismiss={() => update(r.id, { status: "pending" })}
                onModify={(impact) => update(r.id, { impact })}
              />
            ))}
          </div>
        </section>
      )}

      <section aria-label="Action queue">
        <h2 className="mb-3 text-[12px] font-medium uppercase tracking-wider text-mut">Queue ({queue.length})</h2>
        {queue.length === 0 ? (
          <p className="rounded-[10px] border border-dashed border-line px-4 py-10 text-center text-[13px] text-mut">
            Queue is clear. New actions appear as the loop runs.
          </p>
        ) : (
          <div className="space-y-3">
            {queue.map((r) => (
              <ActionCard
                key={r.id}
                rec={r}
                onAccept={() => update(r.id, { status: "accepted" })}
                onDismiss={() => update(r.id, { status: "dismissed" })}
                onModify={(impact) => update(r.id, { impact })}
              />
            ))}
          </div>
        )}
      </section>

      {dismissed.length > 0 && (
        <details className="rounded-[10px] border border-line bg-ink-800 px-4 py-3">
          <summary className="cursor-pointer text-[12px] font-medium uppercase tracking-wider text-mut">
            Dismissed ({dismissed.length})
          </summary>
          <ul className="mt-3 divide-y divide-line">
            {dismissed.map((r) => (
              <li key={r.id} className="flex items-center justify-between gap-3 py-2.5">
                <span className="text-[13px] text-mut line-through">{r.action}</span>
                <button onClick={() => update(r.id, { status: "pending" })} className="shrink-0 font-mono text-[11px] text-cyan hover:text-txt">
                  Restore
                </button>
              </li>
            ))}
          </ul>
        </details>
      )}
    </div>
  );
}
