"use client";

import { RefreshCw, Link2, Link2Off } from "lucide-react";
import { INTEGRATIONS, type Integration } from "@/lib/mock-data";
import { PageHeader } from "@/components/app/PageHeader";
import { toast } from "@/components/app/toast";
import { usePersistentState } from "@/lib/use-persistent-state";

function StatusLine({ s }: { s: Integration }) {
  if (s.status === "connected")
    return (
      <span className="flex items-center gap-1.5 font-mono text-[11px] text-stable">
        <span className="h-1.5 w-1.5 rounded-full bg-stable live-dot" /> Connected \u00B7 {s.lastSync}
      </span>
    );
  if (s.status === "error")
    return (
      <span className="flex items-center gap-1.5 font-mono text-[11px] text-risk">
        <span className="h-1.5 w-1.5 rounded-full bg-risk live-dot-red" /> Sync failed \u00B7 {s.lastSync}
      </span>
    );
  return <span className="font-mono text-[11px] text-mut">Not connected</span>;
}

export default function IntegrationsPage() {
  const [items, setItems] = usePersistentState("rc-integrations", INTEGRATIONS);

  const setStatus = (id: string, status: Integration["status"]) => {
    setItems((list) => list.map((i) => (i.id === id ? { ...i, status, lastSync: status === "connected" ? "just now" : i.lastSync } : i)));
    const item = items.find((i) => i.id === id);
    const name = item?.name ?? "Connection";
    if (status === "connected") toast(`${name} connected`, { description: "First sync usually completes within a minute." });
    else if (status === "not_connected") toast(`${name} disconnected`, { kind: "info", description: "Read-only access revoked." });
    else toast(`${name} syncing`, { description: "Pulling the latest data now.", kind: "info" });
  };

  return (
    <div className="space-y-4">
      <PageHeader
        crumbs={["Home", "Connections"]}
        title="Integrations"
        subtitle="Read-only connections. Bank-level encryption, revoke anytime."
      />

      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-3">
        {items.map((i) => (
          <article key={i.id} className="rounded-[10px] border border-line bg-ink-800 p-4">
            <div className="flex items-center gap-3">
              <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-md border border-line bg-ink-900 font-display text-[14px] font-semibold text-txt">
                {i.initial}
              </span>
              <div className="min-w-0 flex-1">
                <p className="truncate text-[13.5px] font-medium text-txt">{i.name}</p>
                <p className="text-[11.5px] text-mut">{i.category}</p>
              </div>
            </div>
            <div className="mt-3.5">
              <StatusLine s={i} />
            </div>
            <div className="mt-3.5 flex gap-2 border-t border-line pt-3">
              {i.status === "connected" && (
                <>
                  <button onClick={() => setStatus(i.id, "connected")} className="flex flex-1 items-center justify-center gap-1.5 rounded-md border border-line py-1.5 text-[11.5px] text-mut transition-colors hover:bg-ink-750 hover:text-txt">
                    <RefreshCw size={11} /> Sync now
                  </button>
                  <button onClick={() => setStatus(i.id, "not_connected")} className="flex flex-1 items-center justify-center gap-1.5 rounded-md border border-line py-1.5 text-[11.5px] text-mut transition-colors hover:bg-ink-750 hover:text-risk">
                    <Link2Off size={11} /> Disconnect
                  </button>
                </>
              )}
              {i.status === "error" && (
                <button onClick={() => setStatus(i.id, "connected")} className="flex flex-1 items-center justify-center gap-1.5 rounded-md border border-risk/50 py-1.5 text-[11.5px] font-medium text-risk transition-colors hover:bg-risk/10">
                  <RefreshCw size={11} /> Retry sync
                </button>
              )}
              {i.status === "not_connected" && (
                <button onClick={() => setStatus(i.id, "connected")} className="flex flex-1 items-center justify-center gap-1.5 rounded-md border border-cyan/50 py-1.5 text-[11.5px] font-medium text-cyan transition-colors hover:bg-cyan/10">
                  <Link2 size={11} /> Connect
                </button>
              )}
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
