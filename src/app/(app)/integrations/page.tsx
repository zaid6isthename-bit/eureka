"use client";

import { useState } from "react";
import { RefreshCw, Link2, Link2Off } from "lucide-react";
import { INTEGRATIONS, type Integration } from "@/lib/mock-data";

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
  const [items, setItems] = useState(INTEGRATIONS);

  const setStatus = (id: string, status: Integration["status"]) =>
    setItems((list) => list.map((i) => (i.id === id ? { ...i, status, lastSync: status === "connected" ? "just now" : i.lastSync } : i)));

  return (
    <div className="space-y-4">
      <div>
        <h1 className="font-display text-xl font-semibold tracking-tight text-txt">Integrations</h1>
        <p className="mt-0.5 text-[13px] text-mut">Read-only connections. Bank-level encryption, revoke anytime.</p>
      </div>

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
