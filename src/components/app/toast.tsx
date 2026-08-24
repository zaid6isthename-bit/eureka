"use client";

import React, { useEffect, useState } from "react";
import { CheckCircle2, Info, XCircle } from "lucide-react";

type ToastKind = "success" | "info" | "error";

export type ToastItem = {
  id: number;
  title: string;
  description?: string;
  kind: ToastKind;
};

type Listener = (items: ToastItem[]) => void;

let items: ToastItem[] = [];
const listeners = new Set<Listener>();
let seq = 1;

function emit() {
  listeners.forEach((l) => l([...items]));
}

export function toast(
  title: string,
  opts?: { description?: string; kind?: ToastKind }
) {
  const t: ToastItem = {
    id: seq++,
    title,
    description: opts?.description,
    kind: opts?.kind ?? "success",
  };
  items = [...items, t].slice(-4);
  emit();
  window.setTimeout(() => {
    items = items.filter((x) => x.id !== t.id);
    emit();
  }, 3800);
}

const KIND_ICON = {
  success: CheckCircle2,
  info: Info,
  error: XCircle,
} as const;

export function Toaster() {
  const [list, setList] = useState<ToastItem[]>([]);

  useEffect(() => {
    listeners.add(setList);
    return () => {
      listeners.delete(setList);
    };
  }, []);

  return (
    <div
      aria-live="polite"
      className="pointer-events-none fixed bottom-5 right-5 z-[80] flex w-[min(340px,calc(100vw-2.5rem))] flex-col gap-2"
    >
      {list.map((t) => {
        const Icon = KIND_ICON[t.kind];
        const tone =
          t.kind === "error"
            ? "text-risk"
            : t.kind === "info"
              ? "text-flow-cyan"
              : "text-stable";
        return (
          <div
            key={t.id}
            className="toast-in pointer-events-auto flex items-start gap-3 rounded-[var(--radius-card)] border border-line bg-card p-3.5 shadow-xl"
          >
            <Icon size={17} className={`mt-0.5 shrink-0 ${tone}`} />
            <div className="min-w-0">
              <p className="text-[13px] font-medium leading-snug text-txt">{t.title}</p>
              {t.description && (
                <p className="mt-0.5 text-[12px] leading-snug text-mut">{t.description}</p>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}
