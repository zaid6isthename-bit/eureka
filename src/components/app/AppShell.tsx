"use client";

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

function healthColor(score: number) {
  if (score >= 80) return "bg-stable";
  if (score >= 60) return "bg-gold";
  return "bg-risk";
}

export function AppShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [collapsed, setCollapsed] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const searchRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const stored = localStorage.getItem("rc-sidebar");
    if (stored) setCollapsed(JSON.parse(stored));
    else if (window.innerWidth < 1280) setCollapsed(true);
  }, []);

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

  const toggle = () => {
    setCollapsed((c) => {
      localStorage.setItem("rc-sidebar", JSON.stringify(!c));
      return !c;
    });
  };

  const newAlerts = ALERTS.filter((a) => a.status === "new").length;
  const width = collapsed ? 64 : 240;

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
            ? "bg-ink-750 font-medium text-txt"
            : "text-mut hover:bg-ink-750/60 hover:text-txt"
        }`}
      >
        {active && <span className="absolute left-0 top-1/2 h-5 w-0.5 -translate-y-1/2 rounded-full bg-gold" />}
        <Icon size={16} className="shrink-0" />
        {!collapsed && <span className="truncate">{item.label}</span>}
      </Link>
    );
  };

  return (
    <div className="min-h-screen">
      <aside
        className="fixed inset-y-0 left-0 z-40 flex flex-col border-r border-line bg-ink-900 transition-[width] duration-200"
        style={{ width }}
      >
        <div className={`flex h-14 shrink-0 items-center border-b border-line ${collapsed ? "justify-center px-2" : "justify-between px-4"}`}>
          <Link href="/" className="flex items-center gap-2.5" aria-label="RECLAIM home">
            <Image src="/reclaim.png" alt="" width={26} height={26} className="rounded-[5px]" />
            {!collapsed && (
              <span className="font-brand text-[17px] font-semibold tracking-tight text-txt">
                RECLAIM
              </span>
            )}
          </Link>
          {!collapsed && (
            <button
              onClick={toggle}
              aria-label="Collapse sidebar"
              className="rounded-md p-1 text-mut transition-colors hover:bg-ink-750 hover:text-txt"
            >
              <ChevronLeft size={16} />
            </button>
          )}
        </div>

        <nav className="flex-1 space-y-1 overflow-y-auto px-2 py-3" aria-label="Primary">
          {NAV_MAIN.map(navItem)}
          <div className="my-3 border-t border-line" role="separator" />
          {NAV_FOOTER.map(navItem)}
        </nav>

        {collapsed && (
          <button
            onClick={toggle}
            aria-label="Expand sidebar"
            className="mx-auto mb-2 rounded-md p-1.5 text-mut transition-colors hover:bg-ink-750 hover:text-txt"
          >
            <ChevronRight size={16} />
          </button>
        )}

        <div className={`shrink-0 border-t border-line p-3 ${collapsed ? "px-2" : ""}`}>
          <button
            className={`flex w-full items-center gap-2.5 rounded-md p-1.5 text-left transition-colors hover:bg-ink-750 ${collapsed ? "justify-center" : ""}`}
            aria-label="Switch business"
          >
            <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-md border border-cyan/30 bg-cyan/10 font-mono text-[12px] font-medium text-cyan">
              {COMPANY.initial}
            </span>
            {!collapsed && (
              <>
                <span className="min-w-0 flex-1">
                  <span className="block truncate text-[12.5px] font-medium leading-tight text-txt">
                    {COMPANY.short}
                  </span>
                  <span className="block truncate font-mono text-[10px] leading-tight text-mut">
                    Apparel &amp; Exports
                  </span>
                </span>
                <ChevronDown size={14} className="shrink-0 text-mut" />
              </>
            )}
          </button>
        </div>
      </aside>

      <div className="transition-[padding] duration-200" style={{ paddingLeft: width }}>
        <header className="sticky top-0 z-30 flex h-14 items-center gap-3 border-b border-line bg-ink-900/85 px-4 backdrop-blur-md lg:px-6">
          <div className="relative min-w-0 flex-1 max-w-md">
            <Search size={14} className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-mut" />
            <input
              ref={searchRef}
              type="text"
              placeholder="Search SKUs, alerts, actions"
              aria-label="Global search"
              className="h-9 w-full rounded-lg border border-line bg-ink-800 pl-9 pr-12 text-[13px] text-txt placeholder:text-mut focus:border-cyan/50 focus:outline-none"
            />
            <kbd className="pointer-events-none absolute right-2.5 top-1/2 -translate-y-1/2 rounded border border-line bg-ink-900 px-1.5 py-0.5 font-mono text-[10px] text-mut">
              ⌘K
            </kbd>
          </div>

          <div className="ml-auto flex items-center gap-2">
            <Link
              href="/"
              className="hidden items-center gap-2 rounded-lg border border-line bg-ink-800 px-2.5 py-1.5 transition-colors hover:bg-ink-750 sm:flex"
              title="Business health"
            >
              <span className={`h-1.5 w-1.5 rounded-full ${healthColor(HEALTH.score)}`} />
              <span className="font-mono text-[12px] font-medium text-txt">
                <CountUp value={HEALTH.score} />
              </span>
              <span className="hidden text-[11px] text-mut md:inline">Health</span>
            </Link>

            <Link
              href="/detect"
              aria-label={`Notifications, ${newAlerts} unread`}
              className="relative rounded-lg border border-line bg-ink-800 p-2 text-mut transition-colors hover:bg-ink-750 hover:text-txt"
            >
              <Bell size={15} />
              {newAlerts > 0 && (
                <span className="absolute -right-1 -top-1 flex h-4 min-w-4 items-center justify-center rounded-full bg-risk px-1 font-mono text-[9px] font-medium text-ink-950">
                  {newAlerts}
                </span>
              )}
            </Link>

            <div className="relative">
              <button
                onClick={() => setMenuOpen((o) => !o)}
                aria-expanded={menuOpen}
                aria-haspopup="menu"
                className="flex items-center gap-2 rounded-lg border border-line bg-ink-800 py-1.5 pl-1.5 pr-2.5 transition-colors hover:bg-ink-750"
              >
                <span className="flex h-6 w-6 items-center justify-center rounded-md bg-gold/15 font-mono text-[11px] font-medium text-gold">
                  {COMPANY.ownerInitials}
                </span>
                <span className="hidden text-[12.5px] text-txt md:inline">{COMPANY.owner}</span>
                <ChevronDown size={13} className="hidden text-mut md:inline" />
              </button>
              {menuOpen && (
                <>
                  <div className="fixed inset-0 z-40" onClick={() => setMenuOpen(false)} />
                  <div role="menu" className="absolute right-0 z-50 mt-2 w-48 rounded-lg border border-line bg-ink-800 p-1.5 shadow-xl">
                    <div className="border-b border-line px-2.5 py-2">
                      <p className="text-[12.5px] font-medium text-txt">{COMPANY.owner}</p>
                      <p className="font-mono text-[10.5px] text-mut">ravi@meridian.co.in</p>
                    </div>
                    <Link href="/settings" role="menuitem" onClick={() => setMenuOpen(false)} className="mt-1 flex items-center gap-2 rounded-md px-2.5 py-2 text-[12.5px] text-mut transition-colors hover:bg-ink-750 hover:text-txt">
                      <Building2 size={13} /> Business settings
                    </Link>
                    <button role="menuitem" className="flex w-full items-center gap-2 rounded-md px-2.5 py-2 text-left text-[12.5px] text-mut transition-colors hover:bg-ink-750 hover:text-txt">
                      Sign out
                    </button>
                  </div>
                </>
              )}
            </div>
          </div>
        </header>

        <main className="mx-auto max-w-[1440px] px-4 py-6 lg:px-6">{children}</main>
      </div>
    </div>
  );
}
