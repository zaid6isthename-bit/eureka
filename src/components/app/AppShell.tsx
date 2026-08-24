"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Image from "next/image";
import { useEffect, useState } from "react";
import {
  LayoutDashboard,
  Database,
  Radar,
  TrendingUp,
  ListChecks,
  Recycle,
  Plug,
  Settings,
  Bell,
  Mail,
  Headphones,
  Sun,
  Moon,
} from "lucide-react";
import { ALERTS, COMPANY } from "@/lib/mock-data";

const NAV_MAIN = [
  { href: "/", label: "Overview", icon: LayoutDashboard },
  { href: "/understand", label: "Understand", icon: Database },
  { href: "/detect", label: "Detect", icon: Radar },
  { href: "/predict", label: "Predict", icon: TrendingUp },
  { href: "/recommend", label: "Recommend", icon: ListChecks },
  { href: "/recover", label: "Recover", icon: Recycle },
];

export function AppShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);
  const [theme, setTheme] = useState<"light" | "dark">("light");

  useEffect(() => {
    const storedTheme = localStorage.getItem("reclaim-theme");
    if (storedTheme === "light" || storedTheme === "dark") {
      setTheme(storedTheme);
    }
  }, []);

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("reclaim-theme", theme);
  }, [theme]);

  return (
    <div className="min-h-screen p-4">
      <div className="flex flex-col gap-4">
        {/* ===== TOP NAV PILL ===== */}
        <div className="sticky top-4 z-40 flex items-center justify-between rounded-[var(--radius-pill)] border border-border bg-card px-4 py-2 shadow-sm">
          <div className="flex items-center gap-3">
            <Link href="/" aria-label="RECLAIM home">
              <Image
                src={theme === "light" ? "/reclaim-light.png" : "/reclaim-dark.png"}
                alt="RECLAIM"
                width={32}
                height={32}
                className="rounded-[10px]"
              />
            </Link>
            <nav className="flex items-center gap-1.5" aria-label="Primary">
              {NAV_MAIN.map((item) => {
                const active = pathname === item.href;
                const Icon = item.icon;
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    aria-current={active ? "page" : undefined}
                    title={item.label}
                    className={`flex items-center gap-2 rounded-[var(--radius-pill)] px-4 py-2 text-[13px] font-medium transition-colors ${
                      active
                        ? "bg-ink-950 text-bg"
                        : "text-mut hover:bg-bg-subtle hover:text-txt"
                    }`}
                  >
                    <Icon size={14} strokeWidth={1.8} />
                    <span className="hidden lg:inline">{item.label}</span>
                  </Link>
                );
              })}
            </nav>
          </div>

          <div className="flex items-center gap-2.5">
            <div className="hidden -space-x-2 md:flex">
              {["#E37B7B", "#8CA0F7", "#9FD8C9"].map((c) => (
                <span
                  key={c}
                  className="h-7 w-7 rounded-full border-2 border-white"
                  style={{ background: c }}
                />
              ))}
              <span className="flex h-7 w-7 items-center justify-center rounded-full border-2 border-white bg-ink-950 text-[9px] font-bold text-bg">
                +8
              </span>
            </div>

            <Link
              href="/detect"
              aria-label={`Notifications — ${ALERTS.length} open alerts`}
              className="relative flex h-10 w-10 items-center justify-center rounded-full bg-card text-mut shadow-sm transition-colors hover:text-txt"
            >
              <Bell size={16} strokeWidth={1.8} />
              <span className="absolute right-1 top-1 h-2 w-2 rounded-full bg-risk" />
            </Link>

            <Link
              href="/integrations"
              aria-label="Mail"
              className="flex h-10 w-10 items-center justify-center rounded-full bg-card text-mut shadow-sm transition-colors hover:text-txt"
            >
              <Mail size={16} strokeWidth={1.8} />
            </Link>

            <button
              onClick={() => setTheme((t) => (t === "light" ? "dark" : "light"))}
              aria-label="Toggle theme"
              aria-pressed={theme === "dark"}
              title={theme === "light" ? "Switch to dark theme" : "Switch to light theme"}
              className="flex h-10 w-10 items-center justify-center rounded-full bg-card text-mut shadow-sm transition-colors hover:text-txt"
            >
              {theme === "light" ? <Moon size={16} /> : <Sun size={16} />}
            </button>

            <div className="relative">
              <button
                onClick={() => setMenuOpen((v) => !v)}
                aria-haspopup="menu"
                aria-expanded={menuOpen}
                aria-label="Account menu"
                className="flex h-10 w-10 items-center justify-center rounded-full bg-flow-cyan-light font-brand text-[14px] font-bold text-txt transition-transform hover:scale-105"
              >
                {COMPANY.ownerInitials}
              </button>

              {menuOpen && (
                <>
                  <div
                    className="fixed inset-0 z-50"
                    onClick={() => setMenuOpen(false)}
                    aria-hidden="true"
                  />
                  <div
                    role="menu"
                    className="absolute right-0 top-12 z-50 w-60 overflow-hidden rounded-[var(--radius-card)] border border-line bg-card shadow-xl"
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
                      <Plug size={14} className="text-mut" />
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
        </div>

        {/* ===== BODY: SIDEBAR + MAIN ===== */}
        <div className="flex gap-4">
          {/* LEFT ICON SIDEBAR */}
          <aside className="sticky top-[84px] z-30 hidden h-fit shrink-0 flex-col items-center gap-5 self-start rounded-[var(--radius-pill)] border border-border bg-card px-3 py-4 shadow-sm md:flex">
            {NAV_MAIN.map((item) => {
              const active = pathname === item.href;
              const Icon = item.icon;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  aria-label={item.label}
                  aria-current={active ? "page" : undefined}
                  title={item.label}
                  className={`flex h-10 w-10 items-center justify-center rounded-full transition-colors ${
                    active
                      ? "bg-ink-950 text-bg"
                      : "text-mut hover:bg-bg-subtle hover:text-txt"
                  }`}
                >
                  <Icon size={18} strokeWidth={1.8} />
                </Link>
              );
            })}

            <span className="my-1 block h-px w-6 bg-line" role="separator" />

            <Link
              href="/integrations"
              aria-label="Integrations"
              title="Integrations"
              className={`flex h-10 w-10 items-center justify-center rounded-full transition-colors ${
                pathname === "/integrations"
                  ? "bg-ink-950 text-bg"
                  : "text-mut hover:bg-bg-subtle hover:text-txt"
              }`}
            >
              <Plug size={18} strokeWidth={1.8} />
            </Link>
            <Link
              href="/settings"
              aria-label="Settings"
              title="Settings"
              className={`flex h-10 w-10 items-center justify-center rounded-full transition-colors ${
                pathname === "/settings"
                  ? "bg-ink-950 text-bg"
                  : "text-mut hover:bg-bg-subtle hover:text-txt"
              }`}
            >
              <Settings size={18} strokeWidth={1.8} />
            </Link>

            <Link
              href="/settings"
              aria-label="Support"
              title="Support"
              className="mt-2 flex h-11 w-11 items-center justify-center rounded-full border border-border bg-card text-mut shadow-md transition-colors hover:text-txt"
            >
              <Headphones size={17} strokeWidth={1.8} />
            </Link>
          </aside>

          {/* MAIN CONTENT */}
          <main className="min-w-0 flex-1 pb-4">{children}</main>
        </div>
      </div>
    </div>
  );
}
