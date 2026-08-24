"use client";

import React, { useEffect, useMemo, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import {
  LayoutDashboard,
  Database,
  Radar,
  TrendingUp,
  ListChecks,
  Recycle,
  Plug,
  Settings,
  Sun,
  Moon,
  Search,
  CornerDownLeft,
} from "lucide-react";

type Cmd = {
  id: string;
  label: string;
  group: "Pages" | "Actions";
  icon: React.ComponentType<{ size?: number | string; strokeWidth?: number | string; className?: string }>;
  keywords?: string;
  href?: string;
  action?: () => void;
};

export function CommandPalette({
  open,
  onClose,
  onToggleTheme,
  theme,
}: {
  open: boolean;
  onClose: () => void;
  onToggleTheme: () => void;
  theme: "light" | "dark";
}) {
  const router = useRouter();
  const [query, setQuery] = useState("");
  const [active, setActive] = useState(0);
  const listRef = useRef<HTMLDivElement>(null);

  const commands: Cmd[] = useMemo(
    () => [
      { id: "overview", label: "Overview", group: "Pages", icon: LayoutDashboard, href: "/", keywords: "home dashboard cash health alerts trapped" },
      { id: "understand", label: "Understand", group: "Pages", icon: Database, href: "/understand", keywords: "model data sources inventory payables receivables expenses products" },
      { id: "detect", label: "Detect", group: "Pages", icon: Radar, href: "/detect", keywords: "alerts findings anomalies cross-system severity" },
      { id: "predict", label: "Predict", group: "Pages", icon: TrendingUp, href: "/predict", keywords: "forecast projections confidence cash inventory trend" },
      { id: "recommend", label: "Recommend", group: "Pages", icon: ListChecks, href: "/recommend", keywords: "actions triage queue suggestions accept dismiss" },
      { id: "recover", label: "Recover", group: "Pages", icon: Recycle, href: "/recover", keywords: "excess slow-moving inventory buyers liquidation pipeline" },
      { id: "integrations", label: "Integrations", group: "Pages", icon: Plug, href: "/integrations", keywords: "connections sync quickbooks shopify stripe tally" },
      { id: "settings", label: "Settings", group: "Pages", icon: Settings, href: "/settings", keywords: "profile users team notifications billing preferences company" },
      {
        id: "theme",
        label: theme === "light" ? "Switch to dark theme" : "Switch to light theme",
        group: "Actions",
        icon: theme === "light" ? Moon : Sun,
        keywords: "dark light mode appearance toggle theme",
        action: onToggleTheme,
      },
    ],
    [theme, onToggleTheme]
  );

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return commands;
    return commands.filter((c) => `${c.label} ${c.keywords ?? ""}`.toLowerCase().includes(q));
  }, [commands, query]);

  useEffect(() => {
    if (open) {
      setQuery("");
      setActive(0);
    }
  }, [open]);

  useEffect(() => setActive(0), [query]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      } else if (e.key === "ArrowDown") {
        e.preventDefault();
        setActive((i) => Math.min(i + 1, results.length - 1));
      } else if (e.key === "ArrowUp") {
        e.preventDefault();
        setActive((i) => Math.max(i - 1, 0));
      } else if (e.key === "Enter") {
        e.preventDefault();
        const cmd = results[active];
        if (!cmd) return;
        onClose();
        if (cmd.href) router.push(cmd.href);
        else cmd.action?.();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, results, active, onClose, router]);

  useEffect(() => {
    listRef.current
      ?.querySelector<HTMLElement>('[data-active="true"]')
      ?.scrollIntoView({ block: "nearest" });
  }, [active]);

  if (!open) return null;

  let lastGroup = "";

  return (
    <div className="fixed inset-0 z-[70]" role="dialog" aria-modal="true" aria-label="Command palette">
      <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={onClose} aria-hidden="true" />
      <div className="relative mx-auto mt-[14vh] w-[min(580px,92vw)] overflow-hidden rounded-[var(--radius-card)] border border-line bg-card shadow-2xl">
        <div className="flex items-center gap-3 border-b border-line px-4 py-3.5">
          <Search size={16} className="shrink-0 text-mut" />
          <input
            autoFocus
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search pages and actions..."
            aria-label="Search commands"
            className="w-full bg-transparent text-[14px] text-txt placeholder:text-mut focus:outline-none"
          />
          <kbd className="rounded-md border border-line bg-ink-900 px-1.5 py-0.5 font-mono text-[10px] text-mut">
            ESC
          </kbd>
        </div>

        <div ref={listRef} className="max-h-[320px] overflow-y-auto p-2" role="listbox" aria-label="Commands">
          {results.length === 0 && (
            <p className="px-3 py-6 text-center text-[13px] text-mut">No matches for &ldquo;{query}&rdquo;</p>
          )}
          {results.map((c, i) => {
            const showGroup = c.group !== lastGroup;
            lastGroup = c.group;
            const Icon = c.icon;
            return (
              <React.Fragment key={c.id}>
                {showGroup && (
                  <p className="px-3 pb-1 pt-2 text-[10px] font-medium uppercase tracking-wider text-mut">
                    {c.group}
                  </p>
                )}
                <button
                  role="option"
                  aria-selected={i === active}
                  data-active={i === active}
                  onMouseEnter={() => setActive(i)}
                  onClick={() => {
                    onClose();
                    if (c.href) router.push(c.href);
                    else c.action?.();
                  }}
                  className={`flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-left text-[13.5px] transition-colors ${
                    i === active ? "bg-ink-750 font-medium text-txt" : "text-mut hover:text-txt"
                  }`}
                >
                  <Icon size={16} strokeWidth={1.8} />
                  <span className="flex-1 truncate">{c.label}</span>
                  {i === active && <CornerDownLeft size={13} className="shrink-0 text-mut" />}
                </button>
              </React.Fragment>
            );
          })}
        </div>

        <div className="flex items-center gap-4 border-t border-line px-4 py-2 text-[11px] text-mut">
          <span>&uarr;&darr; navigate</span>
          <span>&crarr; select</span>
          <span className="ml-auto font-mono">&#8984;K</span>
        </div>
      </div>
    </div>
  );
}
