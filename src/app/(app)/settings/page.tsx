"use client";

import React, { useEffect, useRef, useState } from "react";
import { X, CreditCard, Download, CheckCircle2 } from "lucide-react";
import { USERS } from "@/lib/mock-data";
import { inr } from "@/lib/format";
import { PageHeader } from "@/components/app/PageHeader";
import { Drawer } from "@/components/ui/Drawer";
import { toast } from "@/components/app/toast";
import { usePersistentState } from "@/lib/use-persistent-state";

type TeamUser = { name: string; email: string; role: string; initials: string; pending?: boolean };

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

const ROLES = ["Admin", "Finance ops", "Viewer"] as const;

const INVOICES = [
  { id: "INV-2026-008", date: "1 Aug 2026", amount: 4999 },
  { id: "INV-2026-007", date: "1 Jul 2026", amount: 4999 },
  { id: "INV-2026-006", date: "1 Jun 2026", amount: 4999 },
];

export default function SettingsPage() {
  const [prefs, setPrefs] = usePersistentState("rc-prefs", { high: true, digest: true, recovery: true, weekly: false });
  const [team, setTeam] = usePersistentState<TeamUser[]>("rc-team", [...USERS]);

  const [inviteOpen, setInviteOpen] = useState(false);
  const [billingOpen, setBillingOpen] = useState(false);
  const [invName, setInvName] = useState("");
  const [invEmail, setInvEmail] = useState("");
  const [invRole, setInvRole] = useState<(typeof ROLES)[number]>("Viewer");
  const [invError, setInvError] = useState("");
  const invNameRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (inviteOpen) {
      setInvError("");
      window.setTimeout(() => invNameRef.current?.focus(), 30);
    }
  }, [inviteOpen]);

  const sendInvite = () => {
    const email = invEmail.trim().toLowerCase();
    if (!invName.trim()) return setInvError("Enter the person's full name.");
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return setInvError("That email address doesn't look right.");
    if (team.some((u) => u.email.toLowerCase() === email)) return setInvError("They're already on your team.");

    const initials = invName
      .trim()
      .split(/\s+/)
      .map((p) => p[0])
      .slice(0, 2)
      .join("")
      .toUpperCase();

    setTeam((list) => [...list, { name: invName.trim(), email, role: invRole, initials, pending: true }]);
    setInviteOpen(false);
    setInvName("");
    setInvEmail("");
    toast(`Invite sent to ${email}`, { description: `They'll get access as ${invRole}.` });
  };

  return (
    <div className="max-w-3xl space-y-5">
      <PageHeader
        crumbs={["Home", "Settings"]}
        title="Settings"
        subtitle="Business profile, team, notifications and billing"
      />

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
        <button
          onClick={() => toast("Profile saved", { description: "Your business details are up to date." })}
          className="mt-4 rounded-md bg-gold px-4 py-2 text-[12.5px] font-semibold text-ink-950 transition-colors hover:bg-gold/90"
        >
          Save changes
        </button>
      </section>

      <section className="rounded-[10px] border border-line bg-ink-800" aria-label="Users and roles">
        <div className="flex flex-wrap items-center justify-between gap-2 border-b border-line px-5 py-3.5">
          <h2 className="text-[12px] font-medium uppercase tracking-wider text-mut">Users · {team.length}</h2>
          <button
            onClick={() => setInviteOpen(true)}
            className="rounded-md border border-cyan/50 px-3 py-1 text-[11.5px] font-medium text-cyan transition-colors hover:bg-cyan/10"
          >
            + Invite user
          </button>
        </div>
        <ul className="divide-y divide-line">
          {team.map((u) => (
            <li key={u.email} className="flex items-center gap-3 px-5 py-3">
              <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-md bg-gold/15 font-mono text-[11px] font-medium text-gold">
                {u.initials}
              </span>
              <div className="min-w-0 flex-1">
                <p className="truncate text-[13px] font-medium text-txt">{u.name}</p>
                <p className="font-mono text-[10.5px] text-mut">{u.email}</p>
              </div>
              {u.pending && (
                <span className="rounded border border-gold/40 bg-gold/10 px-2 py-0.5 text-[11px] font-medium text-gold">
                  Pending
                </span>
              )}
              <span className="rounded border border-line px-2 py-0.5 text-[11px] text-mut">{u.role}</span>
            </li>
          ))}
        </ul>
      </section>

      {/* ===== INVITE MODAL ===== */}
      {inviteOpen && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center p-4" role="dialog" aria-modal="true" aria-label="Invite user">
          <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={() => setInviteOpen(false)} aria-hidden="true" />
          <div className="relative w-full max-w-md overflow-hidden rounded-[var(--radius-card)] border border-line bg-card shadow-2xl">
            <div className="flex items-center justify-between border-b border-line px-5 py-4">
              <h3 className="font-display text-[15px] font-semibold tracking-tight text-txt">Invite a teammate</h3>
              <button
                onClick={() => setInviteOpen(false)}
                aria-label="Close invite dialog"
                className="rounded-md p-1.5 text-mut transition-colors hover:bg-ink-750 hover:text-txt"
              >
                <X size={16} />
              </button>
            </div>
            <div className="space-y-4 px-5 py-5">
              <label className="block">
                <span className="mb-1.5 block text-[12px] text-mut">Full name</span>
                <input
                  ref={invNameRef}
                  value={invName}
                  onChange={(e) => setInvName(e.target.value)}
                  placeholder="Priya Sharma"
                  className={inputCls}
                  onKeyDown={(e) => e.key === "Enter" && sendInvite()}
                />
              </label>
              <label className="block">
                <span className="mb-1.5 block text-[12px] text-mut">Work email</span>
                <input
                  type="email"
                  value={invEmail}
                  onChange={(e) => setInvEmail(e.target.value)}
                  placeholder="priya@company.com"
                  className={inputCls}
                  onKeyDown={(e) => e.key === "Enter" && sendInvite()}
                />
              </label>
              <div>
                <span className="mb-1.5 block text-[12px] text-mut">Role</span>
                <div role="group" aria-label="Role" className="flex gap-1.5">
                  {ROLES.map((r) => (
                    <button
                      key={r}
                      onClick={() => setInvRole(r)}
                      aria-pressed={invRole === r}
                      className={`flex-1 rounded-md border px-3 py-1.5 text-[12px] transition-colors ${
                        invRole === r
                          ? "border-transparent bg-ink-950 font-bold text-bg"
                          : "border-line text-mut hover:text-txt"
                      }`}
                    >
                      {r}
                    </button>
                  ))}
                </div>
              </div>

              {invError && (
                <p role="alert" className="rounded-md border border-risk/30 bg-risk/10 px-3 py-2 text-[12px] text-risk">
                  {invError}
                </p>
              )}

              <div className="flex justify-end gap-2 pt-1">
                <button
                  onClick={() => setInviteOpen(false)}
                  className="rounded-full border border-border px-4 py-2 text-[12.5px] font-medium text-txt transition-colors hover:bg-ink-750"
                >
                  Cancel
                </button>
                <button
                  onClick={sendInvite}
                  className="rounded-full bg-ink-950 px-5 py-2 text-[12.5px] font-bold text-bg transition-opacity hover:opacity-90"
                >
                  Send invite
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

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
            <p className="mt-0.5 text-[12px] text-mut">Next invoice 1 Sep 2026 · {team.length} of 5 seats used</p>
          </div>
          <button
            onClick={() => setBillingOpen(true)}
            className="rounded-md border border-line px-4 py-2 text-[12.5px] text-mut transition-colors hover:bg-ink-750 hover:text-txt"
          >
            Manage billing
          </button>
        </div>
      </section>

      {/* ===== BILLING DRAWER ===== */}
      <Drawer open={billingOpen} onClose={() => setBillingOpen(false)} title="Billing & invoices">
        <div className="space-y-5">
          <div className="rounded-xl border border-line bg-card p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-[14px] font-semibold text-txt">Growth plan</p>
                <p className="mt-0.5 text-[12px] text-mut">Billed monthly · renews 1 Sep 2026</p>
              </div>
              <p className="font-mono text-[18px] font-medium text-txt">
                {inr(4999)}
                <span className="text-[11px] text-mut">/mo</span>
              </p>
            </div>
            <div className="mt-3">
              <div className="flex items-center justify-between text-[11.5px] text-mut">
                <span>Seats used</span>
                <span className="font-mono">{team.length} / 5</span>
              </div>
              <div className="mt-1.5 h-1.5 w-full overflow-hidden rounded-full bg-ink-900">
                <div
                  className="h-full rounded-full bg-signal-green"
                  style={{ width: `${Math.min((team.length / 5) * 100, 100)}%` }}
                />
              </div>
            </div>
            <button
              onClick={() => toast("Plan options opened", { description: "Growth → Scale comparison sent to your inbox.", kind: "info" })}
              className="mt-4 h-9 w-full rounded-full bg-ink-950 text-[12.5px] font-bold text-bg transition-opacity hover:opacity-90"
            >
              Change plan
            </button>
          </div>

          <div className="rounded-xl border border-line bg-card p-4">
            <p className="text-[12px] font-medium uppercase tracking-wider text-mut">Payment method</p>
            <div className="mt-3 flex items-center gap-3">
              <span className="flex h-9 w-12 items-center justify-center rounded-md border border-line bg-ink-900 font-display text-[10px] font-bold text-txt">
                VISA
              </span>
              <div className="min-w-0 flex-1">
                <p className="font-mono text-[12.5px] text-txt">•••• •••• •••• 4821</p>
                <p className="text-[11px] text-mut">Expires 04/28 · Meridian Apparel Exports</p>
              </div>
              <CheckCircle2 size={16} className="shrink-0 text-stable" />
            </div>
            <button
              onClick={() => toast("Payment method updated", { description: "A verification link was sent to your finance contact.", kind: "info" })}
              className="mt-3 flex h-9 w-full items-center justify-center gap-2 rounded-full border border-border text-[12.5px] font-medium text-txt transition-colors hover:bg-ink-750"
            >
              <CreditCard size={14} />
              Update payment method
            </button>
          </div>

          <div>
            <p className="mb-2 text-[12px] font-medium uppercase tracking-wider text-mut">Invoice history</p>
            <ul className="divide-y divide-line overflow-hidden rounded-xl border border-line bg-card">
              {INVOICES.map((inv) => (
                <li key={inv.id} className="flex items-center gap-3 px-4 py-3">
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-[12.5px] font-medium text-txt">{inv.id}</p>
                    <p className="text-[11px] text-mut">{inv.date} · Paid</p>
                  </div>
                  <span className="font-mono text-[12.5px] text-txt">{inr(inv.amount)}</span>
                  <button
                    onClick={() => toast(`${inv.id}.pdf downloaded`, { kind: "info" })}
                    aria-label={`Download invoice ${inv.id}`}
                    title={`Download ${inv.id}`}
                    className="rounded-md p-1.5 text-mut transition-colors hover:bg-ink-750 hover:text-txt"
                  >
                    <Download size={14} />
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Drawer>
    </div>
  );
}
