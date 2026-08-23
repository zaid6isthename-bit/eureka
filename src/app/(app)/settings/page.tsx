"use client";

import { useState } from "react";
import { USERS } from "@/lib/mock-data";
import { inr } from "@/lib/format";

function Toggle({ on, onChange, label }: { on: boolean; onChange: (v: boolean) => void; label: string }) {
  return (
    <button
      role="switch"
      aria-checked={on}
      aria-label={label}
      onClick={() => onChange(!on)}
      className={`relative h-5 w-9 shrink-0 rounded-full transition-colors ${on ? "bg-cyan" : "bg-ink-750"}`}
    >
      <span className={`absolute top-0.5 h-4 w-4 rounded-full bg-ink-950 transition-all ${on ? "left-[18px]" : "left-0.5"}`} />
    </button>
  );
}

const inputCls =
  "h-9 w-full rounded-md border border-line bg-ink-900 px-3 text-[13px] text-txt placeholder:text-mut focus:border-cyan/50 focus:outline-none";

export default function SettingsPage() {
  const [prefs, setPrefs] = useState({ high: true, digest: true, recovery: true, weekly: false });

  return (
    <div className="max-w-3xl space-y-5">
      <div>
        <h1 className="font-display text-xl font-semibold tracking-tight text-txt">Settings</h1>
        <p className="mt-0.5 text-[13px] text-mut">Business profile, team, notifications and billing</p>
      </div>

      <section className="rounded-[10px] border border-line bg-ink-800 p-5" aria-label="Company profile">
        <h2 className="text-[12px] font-medium uppercase tracking-wider text-mut">Company profile</h2>
        <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
          <label className="block">
            <span className="mb-1.5 block text-[12px] text-mut">Business name</span>
            <input defaultValue="Meridian Apparel Exports Pvt Ltd" className={inputCls} />
          </label>
          <label className="block">
            <span className="mb-1.5 block text-[12px] text-mut">GSTIN</span>
            <input defaultValue="27AABCM1234F1Z5" className={`${inputCls} font-mono`} />
          </label>
          <label className="block sm:col-span-2">
            <span className="mb-1.5 block text-[12px] text-mut">Registered address</span>
            <input defaultValue="Plot 14, Andheri East, Mumbai 400093" className={inputCls} />
          </label>
        </div>
        <button className="mt-4 rounded-md bg-gold px-4 py-2 text-[12.5px] font-semibold text-ink-950 transition-colors hover:bg-gold/90">
          Save changes
        </button>
      </section>

      <section className="rounded-[10px] border border-line bg-ink-800" aria-label="Users and roles">
        <div className="flex items-center justify-between border-b border-line px-5 py-3.5">
          <h2 className="text-[12px] font-medium uppercase tracking-wider text-mut">Users</h2>
          <button className="rounded-md border border-cyan/50 px-3 py-1 text-[11.5px] font-medium text-cyan transition-colors hover:bg-cyan/10">
            Invite user
          </button>
        </div>
        <ul className="divide-y divide-line">
          {USERS.map((u) => (
            <li key={u.email} className="flex items-center gap-3 px-5 py-3">
              <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-md bg-gold/15 font-mono text-[11px] font-medium text-gold">
                {u.initials}
              </span>
              <div className="min-w-0 flex-1">
                <p className="truncate text-[13px] font-medium text-txt">{u.name}</p>
                <p className="font-mono text-[10.5px] text-mut">{u.email}</p>
              </div>
              <span className="rounded border border-line px-2 py-0.5 text-[11px] text-mut">{u.role}</span>
            </li>
          ))}
        </ul>
      </section>

      <section className="rounded-[10px] border border-line bg-ink-800 p-5" aria-label="Notification preferences">
        <h2 className="text-[12px] font-medium uppercase tracking-wider text-mut">Notifications</h2>
        <ul className="mt-4 space-y-3.5">
          {(
            [
              ["high", "High-severity alerts", "Immediate email + in-app"],
              ["digest", "Daily briefing", "Morning summary of the loop"],
              ["recovery", "Recovery updates", "Buyer matches and offer changes"],
              ["weekly", "Weekly digest", "Monday roll-up, email only"],
            ] as [keyof typeof prefs, string, string][]
          ).map(([key, label, desc]) => (
            <li key={key} className="flex items-center gap-4">
              <div className="min-w-0 flex-1">
                <p className="text-[13px] text-txt">{label}</p>
                <p className="text-[11.5px] text-mut">{desc}</p>
              </div>
              <Toggle on={prefs[key]} onChange={(v) => setPrefs((p) => ({ ...p, [key]: v }))} label={label} />
            </li>
          ))}
        </ul>
      </section>

      <section className="rounded-[10px] border border-line bg-ink-800 p-5" aria-label="Billing">
        <h2 className="text-[12px] font-medium uppercase tracking-wider text-mut">Billing</h2>
        <div className="mt-4 flex flex-wrap items-center justify-between gap-4">
          <div>
            <p className="text-[15px] font-medium text-txt">
              Growth plan <span className="font-mono text-[13px] text-gold">{inr(4999)}/mo</span>
            </p>
            <p className="mt-0.5 text-[12px] text-mut">Next invoice 1 Sep 2026 \u00B7 3 of 5 seats used</p>
          </div>
          <button className="rounded-md border border-line px-4 py-2 text-[12.5px] text-mut transition-colors hover:bg-ink-750 hover:text-txt">
            Manage billing
          </button>
        </div>
      </section>
    </div>
  );
}
