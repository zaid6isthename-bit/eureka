"use client";

import React from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
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
  Search,
} from "lucide-react";
import { ALERTS, COMPANY } from "@/lib/mock-data";
import { CommandPalette } from "@/components/app/CommandPalette";
import { Toaster } from "@/components/app/toast";
import { readSession, signOut as clearSession } from "@/lib/use-persistent-state";

const SEV_DOT: Record<string, string> = {
  high: "bg-risk",
  medium: "bg-gold",
  low: "bg-flow-cyan",
};

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
  const router = useRouter();
  const [menuOpen, setMenuOpen] = useState(false);
  const [bellOpen, setBellOpen] = useState(false);
  const [paletteOpen, setPaletteOpen] = useState(false);
  const [theme, setTheme] = useState<"light" | "dark">("light");
  const [session, setSession] = useState<{ name: string; email: string } | null>(null);

  useEffect(() => {
    setSession(readSession());
  }, []);

  const displayName = session?.name ?? COMPANY.owner;
  const displayEmail = session?.email ?? COMPANY.name;
  const initials = displayName
    .split(" ")
    .map((p) => p[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();

  const handleSignOut = () => {
    setMenuOpen(false);
    clearSession();
    router.push("/login");
  };

  const toggleTheme = () => setTheme((t) => (t === "light" ? "dark" : "light"));

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setPaletteOpen((v) => !v);
      }
    };
    const onOpenPalette = () => setPaletteOpen(true);
    window.addEventListener("keydown", onKey);
    window.addEventListener("rc:palette", onOpenPalette);
    return () => {
      window.removeEventListener("keydown", onKey);
      window.removeEventListener("rc:palette", onOpenPalette);
    };
  }, []);

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

  const navLink = (item: (typeof NAV_MAIN)[number]) => {
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
          active ? "bg-ink-950 text-bg" : "text-mut hover:bg-bg-subtle hover:text-txt"
        }`}
      >
        <Icon size={18} strokeWidth={1.8} />
      </Link>
    );
  };

  return (
    <div className="min-h-screen p-4">
      <div className="flex gap-4">
        {/* ===== LEFT ICON SIDEBAR ===== */}
        <aside className="sticky top-4 z-30 flex h-fit shrink-0 flex-col items-center gap-2 self-start rounded-[var(--radius-pill)] border border-border bg-card px-3 py-4 shadow-sm">
          {/* Logo */}
          <Link href="/" aria-label="RECLAIM home" className="mb-2">
            <Image
              src={theme === "light" ? "/reclaim-light.png" : "/reclaim-dark.png"}
              alt="RECLAIM"
              width={32}
              height={32}
              className="rounded-[10px]"
            />
          </Link>

          {/* Primary pages */}
          <nav className="flex flex-col items-center gap-2" aria-label="Primary">
            {NAV_MAIN.map(navLink)}
          </nav>

          <span className="my-2 block h-px w-6 bg-line" role="separator" />

          {/* Footer pages */}
          {navLink({ href: "/integrations", label: "Integrations", icon: Plug })}
          {navLink({ href: "/settings", label: "Settings", icon: Settings })}

          <span className="my-2 block h-px w-6 bg-line" role="separator" />

          {/* Utilities */}
          <button
            onClick={() => setPaletteOpen(true)}
            aria-label="Search — Command K"
            title="Search · ⌘K"
            className="flex h-10 w-10 items-center justify-center rounded-full text-mut transition-colors hover:bg-bg-subtle hover:text-txt"
          >
            <Search size={17} strokeWidth={1.8} />
          </button>

          {/* Notifications */}
          <div className="relative">
            <button
              onClick={() => {
                setMenuOpen(false);
                setBellOpen((v) => !v);
              }}
              aria-haspopup="menu"
              aria-expanded={bellOpen}
              aria-label={`Notifications — ${ALERTS.length} open alerts`}
              title="Alerts"
              className="relative flex h-10 w-10 items-center justify-center rounded-full text-mut transition-colors hover:bg-bg-subtle hover:text-txt"
            >
              <Bell size={17} strokeWidth={1.8} />
              <span className="absolute right-1.5 top-1.5 h-2 w-2 rounded-full bg-risk" />
            </button>

            {bellOpen && (
              <>
                <div
                  className="fixed inset-0 z-50"
                  onClick={() => setBellOpen(false)}
                  aria-hidden="true"
                />
                <div
                  role="menu"
                  aria-label="Notifications"
                  className="absolute left-12 top-0 z-50 w-[320px] overflow-hidden rounded-[var(--radius-card)] border border-line bg-card shadow-xl"
                >
                  <div className="flex items-center justify-between border-b border-line px-4 py-3">
                    <p className="text-[13px] font-semibold text-txt">Alerts</p>
                    <span className="rounded-full bg-risk/10 px-2 py-0.5 font-mono text-[10px] text-risk">
                      {ALERTS.length} open
                    </span>
                  </div>
                  <ul className="divide-y divide-line">
                    {ALERTS.slice(0, 4).map((a) => (
                      <li key={a.id}>
                        <Link
                          href="/detect"
                          role="menuitem"
                          onClick={() => setBellOpen(false)}
                          className="flex gap-3 px-4 py-3 transition-colors hover:bg-ink-750"
                        >
                          <span className={`mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full ${SEV_DOT[a.severity] ?? "bg-flow-cyan"}`} />
                          <span className="min-w-0">
                            <span className="block truncate text-[12.5px] font-medium text-txt">{a.title}</span>
                            <span className="mt-0.5 block font-mono text-[10.5px] text-mut">
                              {a.code} · {a.area}
                            </span>
                          </span>
                        </Link>
                      </li>
                    ))}
                  </ul>
                  <Link
                    href="/detect"
                    onClick={() => setBellOpen(false)}
                    className="block border-t border-line px-4 py-3 text-center text-[12.5px] font-medium text-signal-green transition-colors hover:bg-ink-750"
                  >
                    View all alerts →
                  </Link>
                </div>
              </>
            )}
          </div>

          <Link
            href="/integrations"
            aria-label="Mail"
            title="Mail"
            className="flex h-10 w-10 items-center justify-center rounded-full text-mut transition-colors hover:bg-bg-subtle hover:text-txt"
          >
            <Mail size={17} strokeWidth={1.8} />
          </Link>
          <button
            onClick={toggleTheme}
            aria-label="Toggle theme"
            aria-pressed={theme === "dark"}
            title={theme === "light" ? "Switch to dark theme" : "Switch to light theme"}
            className="flex h-10 w-10 items-center justify-center rounded-full text-mut transition-colors hover:bg-bg-subtle hover:text-txt"
          >
            {theme === "light" ? <Moon size={17} /> : <Sun size={17} />}
          </button>

          {/* Account */}
          <div className="relative mt-1">
            <button
              onClick={() => {
                setBellOpen(false);
                setMenuOpen((v) => !v);
              }}
              aria-haspopup="menu"
              aria-expanded={menuOpen}
              aria-label="Account menu"
              title={`${displayName} — ${COMPANY.name}`}
              className={`flex h-10 w-10 items-center justify-center rounded-full bg-flow-cyan-light font-brand text-[13px] font-bold text-txt transition-transform hover:scale-105`}
              style={menuOpen ? { boxShadow: "0 0 0 2px var(--signal-green)" } : undefined}
            >
              {initials}
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
                  className="absolute left-12 top-0 z-50 w-60 overflow-hidden rounded-[var(--radius-card)] border border-line bg-card shadow-xl"
                >
                  <div className="border-b border-line px-4 py-3">
                    <p className="truncate text-[13px] font-medium text-txt">{displayName}</p>
                    <p className="truncate text-[11px] text-mut">{displayEmail}</p>
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
                      onClick={handleSignOut}
                      className="w-full px-4 py-2.5 text-left text-[12.5px] text-risk transition-colors hover:bg-risk/10"
                    >
                      Sign out
                    </button>
                  </div>
                </div>
              </>
            )}
          </div>

          {/* Support */}
          <Link
            href="/settings"
            aria-label="Support"
            title="Support"
            className="mt-2 flex h-11 w-11 items-center justify-center rounded-full border border-border bg-card text-mut shadow-md transition-colors hover:text-txt"
          >
            <Headphones size={17} strokeWidth={1.8} />
          </Link>
        </aside>

        {/* ===== MAIN CONTENT ===== */}
        <main className="min-w-0 flex-1 pb-4">{children}</main>
      </div>

      <CommandPalette
        open={paletteOpen}
        onClose={() => setPaletteOpen(false)}
        onToggleTheme={toggleTheme}
        theme={theme}
      />

      <Toaster />
    </div>
  );
}
