"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { Moon, Sun, ToggleLeft } from "lucide-react";
import { CountUp } from "@/components/ui/CountUp";
import { ALERTS, COMPANY, HEALTH } from "@/lib/mock-data";

const NAV_MAIN = [
  { href: "/", label: "Overview", icon: "LayoutDashboard" },
  { href: "/understand", label: "Understand", icon: "Database" },
  { href: "/detect", label: "Detect", icon: "Radar" },
  { href: "/predict", label: "Predict", icon: "TrendingUp" },
  { href: "/recommend", label: "Recommend", icon: "ListChecks" },
  { href: "/recover", label: "Recover", icon: "Recycle" },
];

const NAV_FOOTER = [
  { href: "/integrations", label: "Integrations", icon: "Plug" },
  { href: "/settings", label: "Settings", icon: "Settings" },
];

function healthColor(score: number, theme: "light" | "dark") {
  if (theme === "dark") {
    if (score >= 80) return "bg-green-600";
    if (score >= 60) return "bg-green-500";
    return "bg-green-400";
  }
  if (score >= 80) return "bg-green-500";
  if (score >= 60) return "bg-green-100 text-green-800";
  return "bg-green-100 text-green-900";
}

export function AppShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [collapsed, setCollapsed] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const searchRef = useRef<HTMLInputElement>(null);

  // Set theme from localStorage on client mount only
  React.useEffect(() => {
    if (typeof window !== "undefined") {
      const stored = localStorage.getItem("reclaim-theme");
      if (stored) {
        document.documentElement.setAttribute("data-theme", stored);
      }
    }
  }, []);

  const width = collapsed ? 64 : 260;

  const navItem = (item: {
    href: string;
    label: string;
    icon: string;
  }) => {
    const active = pathname === item.href;
    return (
      <Link
        key={item.href}
        href={item.href}
        title={item.label}
        aria-current={active ? "page" : undefined}
        className={`relative flex h-9 items-center gap-3 rounded-md px-3 text-[13px] transition-colors ${
          active
            ? "bg-green-100 text-green-900"
            : "text-muted hover:bg-green-100/50 hover:text-ink-950"}
        }`}
      >
        {active && (
          <span className="absolute left-0 top-1/2 h-2 w-0.5 -translate-y-1/2 rounded-full bg-green-500" />
        )}
        <Moon size={16} className="shrink-0" />
        {!collapsed && <span className="truncate">{item.label}</span>}
      </Link>
    );
  };

  return (
    <div className="min-h-screen">
      <aside
        className="fixed inset-y-0 left-0 z-40 flex flex-col border-r border-border bg-bg-subtle transition-[width] duration-200"
        style={{ width }}
      >
        <div className={`flex h-14 shrink-0 items-center border-b border-border {${
          collapsed ? "justify-center px-2" : "justify-between px-6"
        }`}
        >
          <Link href="/" className="flex items-center gap-3" aria-label="RECLAIM home">
            <Image
              src="/reclaim.png"
              alt=""
              width={30}
              height={30}
              className="rounded-[5px]"
            />
            {!collapsed && (
              <span className="font-brand font-semibold text-[18px] text-ink-950 tracking-tight">
                RECLAIM
              </span>
            )}
          </Link>
          <button
            onClick={() => setCollapsed(false)}
            aria-label="Collapse sidebar"
            className="rounded-md p-1.5 text-mut transition-colors hover:border-border border-border"
          >
            <ToggleLeft size={18} />
          </button>
        </div>

        <nav className="flex-1 space-y-1 overflow-y-auto px-6 py-3" aria-label="Primary">
          {NAV_MAIN.map(navItem)}
          <div className="my-4 border-t border-border" role="separator" />
          {NAV_FOOTER.map(navItem)}
        </nav>

        {collapsed && (
          <button
            onClick={() => setCollapsed(true)}
            aria-label="Expand sidebar"
            className="mx-auto mb-2 rounded-md p-1.5 text-mut transition-colors hover:border-border border-border"
          >
            <Sun size={18} />
          </button>
        )}
      </aside>

      <div className="transition-[margin-left] duration-200" style={{ marginLeft: width }}>
        <header
          className="sticky top-0 z-30 flex h-16 items-center gap-4 border-b border-border bg-bg-subtle lg:px-6 px-4 backdrop-blur-md"
        >
          <div className="relative min-w-0 flex-1 max-w-md">
            <input
              ref={searchRef}
              type="text"
              placeholder="Search SKUs, alerts, actions"
              aria-label="Global search"
              className="h-10 w-full rounded-md border border-border bg-bg pl-12 pr-12 text-[14px] text-ink-950 placeholder:text-mut focus:border-green-accent focus:outline-none"
            />
            <kbd className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 rounded border border-border bg-bg px-2 py-1.5 font-mono text-[11px] text-mut">
              ⌘K
            </kbd>
          </div>

          <div className="ml-auto flex items-center gap-3">
            <Link
              href="/"
              className="hidden items-center gap-2 rounded-lg border border-border bg-bg px-3 py-2 transition-colors:hover:bg-bg sm:flex"
              title="Business health"
            >
              <span className={`${healthColor(HEALTH.score, "light")} /2`} />
              <span className="font-mono text-[12px] font-medium text-ink-950">
                <CountUp value={HEALTH.score} />
              </span>
              <span className="hidden text-[11px] text-mut md:inline">Health</span>
            </Link>

            <button
              onClick={() => {
                const current = document.documentElement.getAttribute("data-theme");
                const newTheme = current === "dark" ? "light" : "dark";
                document.documentElement.setAttribute("data-theme", newTheme);
                if (typeof window !== "undefined") {
                  localStorage.setItem("reclaim-theme", newTheme);
                }
              }}
              aria-label="Toggle theme"
              className="relative rounded-lg border border-border bg-bg px-3 py-2 transition-colors hover:bg-bg hover:text-ink-950 flex items-center gap-2"
            >
              <Sun size={14} className="hidden" />
              <Moon size={14} className="hidden" />
            </button>
          </div>
        </header>

        <main className="mx-auto max-w-[1600px] px-6 py-8 lg:px-12">{children}</main>
      </div>
    </div>
  );
}