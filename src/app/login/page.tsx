"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import {
  Database,
  Radar,
  TrendingUp,
  ArrowRight,
  ShieldCheck,
} from "lucide-react";
import { signIn } from "@/lib/use-persistent-state";

const FEATURES = [
  {
    icon: Database,
    title: "One living model",
    desc: "Bank, GST and inventory data unified into a continuously updated picture of your business.",
  },
  {
    icon: Radar,
    title: "Cross-system detection",
    desc: "Find the leaks invisible inside any single tool — duplicated payments, idle stock, silent churn.",
  },
  {
    icon: TrendingUp,
    title: "Act before it bites",
    desc: "Forecasts with confidence bands, ranked actions and a recovery marketplace that unlocks cash.",
  },
];

export default function LoginPage() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    try {
      if (window.localStorage.getItem("rc-session")) router.replace("/");
    } catch {
      /* ignore */
    }
  }, [router]);

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!name.trim()) return setError("Enter your name to continue.");
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim()))
      return setError("That email address doesn't look right.");
    if (password.length < 6) return setError("Password must be at least 6 characters.");

    setBusy(true);
    window.setTimeout(() => {
      signIn(name.trim(), email.trim());
      router.replace("/");
    }, 450);
  };

  const fillDemo = () => {
    setName("Zaid Mohammed");
    setEmail("demo@reclaim.app");
    setPassword("demo1234");
    setError("");
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-bg p-4">
      <div className="grid w-full max-w-4xl overflow-hidden rounded-[32px] border border-border bg-card shadow-xl md:grid-cols-2">
        {/* Brand panel */}
        <div className="relative hidden flex-col justify-between overflow-hidden bg-[#16171A] p-8 text-white md:flex">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 opacity-[0.14]"
            style={{
              backgroundImage:
                "linear-gradient(90deg, #ffffff 1px, transparent 1px), linear-gradient(#ffffff 1px, transparent 1px)",
              backgroundSize: "28px 28px",
            }}
          />
          <div className="relative">
            <Image src="/reclaim-dark.png" alt="RECLAIM" width={40} height={40} className="rounded-xl" />
            <h1 className="mt-6 font-display text-[30px] font-bold leading-tight tracking-tight text-white">
              Every rupee,
              <br />
              accounted for.
            </h1>
            <p className="mt-2 max-w-xs text-[13.5px] leading-relaxed text-white/70">
              RECLAIM finds the working capital your business already owns — and puts it back to work.
            </p>
          </div>

          <ul className="relative mt-8 space-y-5">
            {FEATURES.map((f) => (
              <li key={f.title} className="flex gap-3">
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-white/20 bg-white/10">
                  <f.icon size={16} strokeWidth={1.8} />
                </span>
                <div>
                  <p className="text-[13.5px] font-semibold">{f.title}</p>
                  <p className="mt-0.5 text-[12px] leading-snug text-white/60">{f.desc}</p>
                </div>
              </li>
            ))}
          </ul>

          <p className="relative mt-8 flex items-center gap-2 text-[11px] text-white/50">
            <ShieldCheck size={13} />
            Read-only bank-grade encryption · SOC 2 Type II
          </p>
        </div>

        {/* Form panel */}
        <div className="flex flex-col justify-center p-8 sm:p-10">
          <div className="md:hidden">
            <Image src="/reclaim-light.png" alt="RECLAIM" width={36} height={36} className="rounded-lg" />
          </div>
          <h2 className="mt-6 font-display text-[24px] font-bold tracking-tight text-txt md:mt-0">
            Welcome back
          </h2>
          <p className="mt-1 text-[13px] text-mut">Sign in to your workspace</p>

          <form onSubmit={submit} className="mt-7 space-y-4" noValidate>
            <label className="block">
              <span className="mb-1.5 block text-[12px] font-medium text-txt">Full name</span>
              <input
                value={name}
                onChange={(e) => setName(e.target.value)}
                autoComplete="name"
                placeholder="Ada Lovelace"
                className="h-11 w-full rounded-xl border border-border bg-bg px-4 text-[13.5px] text-txt placeholder:text-mut/60 focus:border-signal-green focus:outline-none"
              />
            </label>
            <label className="block">
              <span className="mb-1.5 block text-[12px] font-medium text-txt">Work email</span>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                autoComplete="email"
                placeholder="you@company.com"
                className="h-11 w-full rounded-xl border border-border bg-bg px-4 text-[13.5px] text-txt placeholder:text-mut/60 focus:border-signal-green focus:outline-none"
              />
            </label>
            <label className="block">
              <span className="mb-1.5 block text-[12px] font-medium text-txt">Password</span>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                autoComplete="current-password"
                placeholder="••••••••"
                className="h-11 w-full rounded-xl border border-border bg-bg px-4 text-[13.5px] text-txt placeholder:text-mut/60 focus:border-signal-green focus:outline-none"
              />
            </label>

            {error && (
              <p role="alert" className="rounded-xl border border-risk/30 bg-risk/10 px-3.5 py-2.5 text-[12.5px] text-risk">
                {error}
              </p>
            )}

            <button
              type="submit"
              disabled={busy}
              className="flex h-11 w-full items-center justify-center gap-2 rounded-full bg-ink-950 text-[13.5px] font-bold text-bg transition-opacity hover:opacity-90 disabled:opacity-60"
            >
              {busy ? "Signing in…" : "Sign in"}
              {!busy && <ArrowRight size={15} />}
            </button>
          </form>

          <button
            onClick={fillDemo}
            className="mt-4 h-10 w-full rounded-full border border-border bg-card text-[12.5px] font-medium text-mut shadow-sm transition-colors hover:text-txt"
          >
            Use demo account
          </button>

          <p className="mt-6 text-center text-[11.5px] leading-relaxed text-mut">
            By continuing you agree to the{" "}
            <span className="underline decoration-line underline-offset-2">Terms</span> and{" "}
            <span className="underline decoration-line underline-offset-2">Privacy Policy</span>.
          </p>
        </div>
      </div>
    </div>
  );
}
