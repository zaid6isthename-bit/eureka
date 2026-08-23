"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import {
  LayoutDashboard,
  Database,
  Radar,
  TrendingUp,
  ListChecks,
  Recycle,
  Plug,
  Settings,
  Search,
  Bell,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Building2,
  Sun,
  Moon,
} from "lucide-react";
import { CountUp } from "@/components/ui/CountUp";
import { ALERTS, COMPANY, HEALTH } from "@/lib/mock-data";

const NAV_MAIN = [
  { href: "/", label: "Overview", icon: LayoutDashboard },
  { href: "/understand", label: "Understand", icon: Database },
  { href: "/detect", label: "Detect", icon: Radar },
  { href: "/predict", label: "Predict", icon: TrendingUp },
  { href: "/recommend", label: "Recommend", icon: ListChecks },
  { href: "/recover", label: "Recover", icon: Recycle },
];

const NAV_FOOTER = [
  { href: "/integrations", label: "Integrations", icon: Plug },
  { href: "/settings", label: "Settings", icon: Settings },
];

function healthDotColor(score: number) {
  if (score >= 80) return "bg-stable";
  if (score >= 60) return "bg-gold";
  return "bg-risk";
}

export function AppShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [collapsed, setCollapsed] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [theme, setTheme] = useState<"light" | "dark">("light");
  const searchRef = useRef<HTMLInputElement>(null);

  // Restore persisted theme + sidebar state on client mount only
  useEffect(() => {
    const storedTheme = localStorage.getItem("reclaim-theme");
    if (storedTheme === "light" || storedTheme === "dark") {
      setTheme(storedTheme);
    }
    try {
      const storedSidebar = localStorage.getItem("rc-sidebar");
      if (storedSidebar !== null) setCollapsed(JSON.parse(storedSidebar));
    } catch {
      /* ignore malformed persisted state */
    }
  }, []);

  // Apply + persist whenever theme changes
  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("reclaim-theme", theme);
  }, [theme]);

  // Persist sidebar collapse state
  useEffect(() => {
    localStorage.setItem("rc-sidebar", JSON.stringify(collapsed));
  }, [collapsed]);

  // Cmd/Ctrl+K focuses global search
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        searchRef.current?.focus();
      }
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, []);

  const width = collapsed ? 64 : 260;

  const navItem = (item: (typeof NAV_MAIN)[number]) => {
    const active = pathname === item.href;
    const Icon = item.icon;
    return (
      <Link
        key={item.href}
        href={item.href}
        title={item.label}
        aria-current={active ? "page" : undefined}
        className={`relative flex h-9 items-center gap-3 rounded-md px-3 text-[13px] transition-colors ${
          active
            ? "border border-green-accent bg-green-light font-medium text-txt"
            : "border border-transparent text-mut hover:bg-green-light/50 hover:text-txt"
        }`}
      >
        <Icon size={16} className="shrink-0" />
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
        <div
          className={`flex h-14 shrink-0 items-center border-b border-border ${
            collapsed ? "justify-center px-2" : "justify-between px-4"
          }`}
        >
          <Link href="/" className="flex items-center gap-3" aria-label="RECLAIM home">
            <Image
              src={theme === "light" ? "/reclaim-light.png" : "/reclaim-dark.png"}
              alt=""
              width={30}
              height={30}
              className="rounded-[5px]"
            />
            {!collapsed && (
              <span className="font-brand text-[18px] font-semibold tracking-tight text-txt">
                RECLAIM
              </span>
            )}
          </Link>
          {!collapsed && (
            <button
              onClick={() => setCollapsed(true)}
              aria-label="Collapse sidebar"
              title="Collapse sidebar"
              className="rounded-md p-1.5 text-mut transition-colors hover:bg-ink-750 hover:text-txt"
            >
              <ChevronLeft size={18} />
            </button>
          )}
        </div>

        <nav className="flex-1 space-y-1 overflow-y-auto px-3 py-3" aria-label="Primary">
          {NAV_MAIN.map(navItem)}
          <div className="my-4 border-t border-line" role="separator" />
          {NAV_FOOTER.map(navItem)}
        </nav>

        {collapsed && (
          <button
            onClick={() => setCollapsed(false)}
            aria-label="Expand sidebar"
            title="Expand sidebar"
            className="mx-auto mb-2 rounded-md p-1.5 text-mut transition-colors hover:bg-ink-750 hover:text-txt"
          >
            <ChevronRight size={18} />
          </button>
        )}

        <div className={`shrink-0 border-t border-border p-3 ${collapsed ? "px-2" : ""}`}>
          <button
            onClick={() => setMenuOpen((v) => !v)}
            aria-haspopup="menu"
            aria-expanded={menuOpen}
            title={`${COMPANY.name} — ${COMPANY.plan} plan`}
            className={`flex w-full items-center gap-2.5 rounded-md border border-line bg-bg p-2 text-left transition-colors hover:bg-ink-750 ${
              collapsed ? "justify-center" : ""
            }`}
          >
            <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-md border border-green-accent bg-green-light font-brand text-[13px] font-semibold text-txt">
              {COMPANY.initial}
            </span>
            {!collapsed && (
              <>
                <span className="min-w-0 flex-1">
                  <span className="block truncate text-[12.5px] font-medium leading-tight text-txt">
                    {COMPANY.name}
                  </span>
                  <span className="block truncate text-[10.5px] leading-tight text-mut">
                    {COMPANY.plan} plan
                  </span>
                </span>
                <ChevronDown size={14} className="shrink-0 text-mut" />
              </>
            )}
          </button>
        </div>
      </aside>

      <div className="transition-[margin-left] duration-200" style={{ marginLeft: width }}>
        <header className="sticky top-0 z-30 flex h-16 items-center gap-3 border-b border-border bg-bg-subtle px-4 backdrop-blur-md lg:px-6">
          <div className="relative min-w-0 max-w-md flex-1">
            <Search
              size={15}
              className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-mut"
            />
            <input
              ref={searchRef}
              type="text"
              placeholder="Search SKUs, alerts, actions"
              aria-label="Global search"
              className="h-10 w-full rounded-md border border-line bg-bg pl-9 pr-12 text-[13.5px] text-txt outline-none transition-colors placeholder:text-mut focus:border-green-accent"
            />
            <kbd className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 rounded border border-line bg-bg px-1.5 py-0.5 font-mono text-[10.5px] text-mut">
              ⌘K
            </kbd>
          </div>

          <div className="ml-auto flex items-center gap-2.5">
            <Link
              href="/"
              className="hidden items-center gap-2 rounded-lg border border-line bg-bg px-3 py-2 transition-colors hover:bg-ink-750 sm:flex"
              title="Business health"
            >
              <span
                className={`h-1.5 w-1.5 rounded-full ${healthDotColor(HEALTH.score)}`}
              />
              <span className="font-mono text-[12px] font-medium text-txt">
                <CountUp value={HEALTH.score} />
              </span>
              <span className="hidden text-[11px] text-mut md:inline">Health</span>
            </Link>

            <Link
              href="/detect"
              aria-label={`Notifications — ${ALERTS.length} open alerts`}
              title="Alerts"
              className="relative rounded-lg border border-line bg-bg p-2 text-mut transition-colors hover:bg-ink-750 hover:text-txt"
            >
              <Bell size={16} />
              <span className="absolute -right-1 -top-1 flex h-4 min-w-4 items-center justify-center rounded-full border border-border bg-risk px-1 font-mono text-[9px] font-semibold text-white">
                {ALERTS.length}
              </span>
            </Link>

            <button
              onClick={() => setTheme((t) => (t === "light" ? "dark" : "light"))}
              aria-label="Toggle theme"
              aria-pressed={theme === "dark"}
              title={theme === "light" ? "Switch to dark theme" : "Switch to light theme"}
              className="rounded-lg border border-line bg-bg p-2 text-mut transition-colors hover:bg-ink-750 hover:text-txt"
            >
              {theme === "light" ? <Moon size={16} /> : <Sun size={16} />}
            </button>

            <div className="relative">
              <button
                onClick={() => setMenuOpen((v) => !v)}
                aria-haspopup="menu"
                aria-expanded={menuOpen}
                aria-label="Account menu"
                className="flex h-8 w-8 items-center justify-center rounded-full border border-green-accent bg-green-light font-brand text-[12px] font-semibold text-txt transition-colors hover:bg-green-hover"
              >
                {COMPANY.ownerInitials}
              </button>

              {menuOpen && (
                <>
                  <div
                    className="fixed inset-0 z-40"
                    onClick={() => setMenuOpen(false)}
                    aria-hidden="true"
                  />
                  <div
                    role="menu"
                    className="absolute right-0 top-11 z-50 w-60 overflow-hidden rounded-lg border border-border bg-card shadow-xl"
                  >
                    <div className="border-b border-line px-4 py-3">
                      <p className="truncate text-[13px] font-medium text-txt">{COMPANY.owner}</p>
                      <p className="truncate text-[11px] text-mut">{COMPANY.name}</p>
                    </div>
                    <Link
                      href="/settings"
                      role="menuitem"
                      onClick={() => setMenuOpen(false)}
                      className="flex items-center gap-2.5 px-4 py-2.5 text-[12.5px] text-txt transition-colors hover:bg-ink-750"
                    >
                      <Settings size={14} className="text-mut" />
                      Business settings
                    </Link>
                    <Link
                      href="/integrations"
                      role="menuitem"
                      onClick={() => setMenuOpen(false)}
                      className="flex items-center gap-2.5 px-4 py-2.5 text-[12.5px] text-txt transition-colors hover:bg-ink-750"
                    >
                      <Building2 size={14} className="text-mut" />
                      Integrations
                    </Link>
                    <div className="border-t border-line">
                      <button
                        role="menuitem"
                        onClick={() => setMenuOpen(false)}
                        className="w-full px-4 py-2.5 text-left text-[12.5px] text-risk transition-colors hover:bg-risk/10"
                      >
                        Sign out
                      </button>
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>
        </header>

        <main className="mx-auto max-w-[1600px] px-6 py-8 lg:px-12">{children}</main>
      </div>
    </div>
  );
}
