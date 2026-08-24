"use client";

import {
  Home,
  Clock,
  Users,
  Wallet,
  BarChart3,
  Settings,
  HelpCircle,
  LogOut,
  Bell,
  Search,
  ChevronRight,
  MoreVertical,
  ArrowUp,
  Diamond,
} from "lucide-react";

function MenuDots() {
  return (
    <button
      className="flex h-6 w-6 items-center justify-center rounded-full text-[var(--text-secondary)] transition-colors hover:bg-[var(--border-subtle)]"
      aria-label="Menu"
    >
      <MoreVertical size={14} />
    </button>
  );
}

function SidebarIcon({ icon: Icon, active }: { icon: React.ElementType; active?: boolean }) {
  return (
    <div
      className={`flex h-10 w-10 items-center justify-center rounded-full transition-colors ${
        active ? "bg-white text-[var(--surface-dark)]" : "text-[var(--text-inverse)] opacity-60 hover:opacity-100"
      }`}
    >
      <Icon size={20} strokeWidth={1.8} />
    </div>
  );
}

function Card({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <div
      className={`relative rounded-[var(--radius-card)] bg-[var(--surface-2)] p-5 shadow-[var(--shadow-soft)] ${className}`}
    >
      {children}
    </div>
  );
}

function TransactionRow({
  icon,
  iconBg,
  name,
  date,
  amount,
}: {
  icon: React.ReactNode;
  iconBg: string;
  name: string;
  date: string;
  amount: string;
}) {
  return (
    <div className="flex items-center gap-3 py-3">
      <div
        className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full"
        style={{ background: iconBg }}
      >
        {icon}
      </div>
      <div className="min-w-0 flex-1">
        <p className="text-[14px] font-semibold text-[var(--text-primary)]">{name}</p>
        <p className="text-[12px] text-[var(--text-secondary)]">{date}</p>
      </div>
      <span className="font-[tabular-nums] text-[14px] font-bold text-[var(--text-primary)]">{amount}</span>
      <MenuDots />
    </div>
  );
}

export function DashboardPersonal() {
  return (
    <div className="fenco flex min-h-screen items-center justify-center bg-[var(--bg-canvas)] p-6">
      {/* Device frame */}
      <div
        className="relative flex w-full max-w-[1440px] gap-4 overflow-hidden rounded-[var(--radius-shell)] bg-[var(--surface-1)] p-6 shadow-[var(--shadow-soft)]"
        style={{ aspectRatio: "4/3" }}
      >
        {/* ===== LEFT SIDEBAR ===== */}
        <div className="flex w-16 shrink-0 flex-col items-center justify-between py-2">
          {/* Top pill */}
          <div className="flex flex-col items-center gap-6 rounded-[var(--radius-pill)] bg-[var(--surface-dark)] px-3 py-4">
            <SidebarIcon icon={Home} active />
            <SidebarIcon icon={Clock} />
            <SidebarIcon icon={Users} />
            <SidebarIcon icon={Wallet} />
            <SidebarIcon icon={BarChart3} />
            <SidebarIcon icon={Settings} />
          </div>
          {/* Bottom pill */}
          <div className="flex flex-col items-center gap-4 rounded-[var(--radius-pill)] bg-[var(--surface-dark)] px-3 py-4">
            <SidebarIcon icon={HelpCircle} />
            <SidebarIcon icon={LogOut} />
          </div>
        </div>

        {/* ===== MAIN CONTENT ===== */}
        <div className="flex min-w-0 flex-1 flex-col gap-4">
          {/* --- TOP HEADER --- */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-[14px] bg-[var(--surface-dark)]">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10 10-4.5 10-10S17.5 2 12 2z" />
                  <path d="M12 8v8" />
                  <path d="M8 12h8" />
                </svg>
              </div>
              <div>
                <p className="text-[12px] text-[var(--text-secondary)]">Finance Dashboard</p>
                <p className="text-[20px] font-bold leading-tight text-[var(--text-primary)]">Fenco</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <button className="relative flex h-11 w-11 items-center justify-center rounded-full bg-white text-[var(--text-primary)] shadow-sm">
                <Bell size={18} strokeWidth={1.8} />
                <span className="absolute right-1 top-1 h-2.5 w-2.5 rounded-full border-2 border-white bg-[var(--accent-danger)]" />
              </button>
              <button className="flex h-11 w-11 items-center justify-center rounded-full bg-white text-[var(--text-primary)] shadow-sm">
                <Search size={18} strokeWidth={1.8} />
              </button>
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search me..."
                  className="h-11 w-[200px] rounded-[var(--radius-pill)] border-none bg-white pl-5 pr-4 text-[13px] text-[var(--text-secondary)] shadow-sm outline-none placeholder:text-[var(--text-secondary)]"
                />
              </div>
              <div className="flex h-11 w-11 items-center justify-center rounded-full bg-[var(--surface-dark)] text-[16px] font-bold text-[var(--text-inverse)]">
                A
              </div>
            </div>
          </div>

          {/* --- GREETING ROW --- */}
          <div className="flex items-center justify-between">
            <div>
              <p className="text-[32px] font-bold text-[var(--text-primary)]">
                Hello,{" "}
                <span className="text-[var(--accent-1)]">Alif Reza</span>
              </p>
              <p className="text-[14px] text-[var(--text-secondary)]">
                View and control your finances here!
              </p>
            </div>
            <div className="flex items-center rounded-[var(--radius-pill)] bg-white p-2 pr-3 shadow-sm">
              <div className="flex -space-x-2">
                {["#E37B7B", "#8CA0F7", "#9FD8C9", "#EADD8C", "#7FBF8F", "#8B8D98"].map(
                  (c, i) => (
                    <div
                      key={i}
                      className="h-8 w-8 rounded-full border-2 border-white"
                      style={{ background: c }}
                    />
                  )
                )}
              </div>
              <button className="ml-2 flex h-8 w-8 items-center justify-center rounded-full bg-[var(--border-subtle)] text-[var(--text-secondary)]">
                <ChevronRight size={14} />
              </button>
            </div>
          </div>

          {/* ===== CONTENT GRID ===== */}
          <div className="grid flex-1 grid-cols-3 gap-4" style={{ gridTemplateRows: "1fr 1fr" }}>
            {/* --- ROW 1 --- */}

            {/* CARD 1: Balance Statistics */}
            <Card className="flex flex-col">
              <div className="mb-2 flex items-center justify-between">
                <span className="text-[14px] font-semibold text-[var(--text-secondary)]">
                  Balance Statistics
                </span>
                <MenuDots />
              </div>
              <div className="flex items-baseline gap-2">
                <span className="font-[tabular-nums] text-[28px] font-bold text-[var(--text-primary)]">
                  $38,729.61
                </span>
                <span className="text-[12px] text-[var(--text-secondary)]">Total amount</span>
              </div>
              <div className="mt-2 flex items-center gap-2">
                <svg width="60" height="24" viewBox="0 0 60 24" fill="none">
                  <path
                    d="M0 20 Q10 18 15 14 T30 10 T45 6 T60 2"
                    stroke="var(--accent-1)"
                    strokeWidth="2"
                    fill="none"
                  />
                </svg>
                <span className="flex items-center gap-1 rounded-full bg-[var(--accent-1)]/15 px-2 py-0.5 text-[11px] font-medium text-[var(--accent-1)]">
                  <ArrowUp size={10} /> 14%
                </span>
              </div>
              <p className="mt-1 text-[12px] text-[var(--text-secondary)]">
                Always see your earning updates
              </p>
              <div className="mt-auto flex flex-1 items-end gap-2 pt-2">
                <div className="flex flex-1 items-end justify-around">
                  {[14, 18, 22, 28, 36].map((h, i) => (
                    <div key={i} className="flex flex-col items-center gap-1">
                      <div
                        className="w-5 rounded-t-[4px]"
                        style={{
                          height: `${h}px`,
                          background: i === 4 ? "var(--accent-1)" : "var(--accent-1)/50",
                        }}
                      />
                      <span className="text-[11px] text-[var(--text-secondary)]">
                        {["Nov", "Dec", "Jan", "Feb", "Mar"][i]}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </Card>

            {/* CARD 2: Bank Card */}
            <div className="relative overflow-hidden rounded-[var(--radius-card)] p-6 text-[var(--text-inverse)]" style={{
              background: "linear-gradient(135deg, #8CA0F7 0%, #A8B8F9 40%, #C5D3FB 100%)",
            }}>
              <p className="text-[11px] font-medium uppercase tracking-[0.12em] opacity-80">
                THE BANK OF ANYTHING
              </p>
              <div className="mt-4 h-[18px] w-[24px] rounded-[4px]" style={{
                background: "linear-gradient(135deg, #EADD8C, #D4C370)",
              }} />
              <div className="mt-6 flex gap-2 text-[16px] tracking-[0.25em]">
                {"••••  ••••  ••••  2734"}
              </div>
              <div className="mt-2 flex gap-6 text-[10px] opacity-70">
                <span>3/18</span>
                <span>3/28</span>
              </div>
              <div className="mt-4 flex items-center justify-between">
                <span className="text-[16px] font-bold">Alif Reza</span>
                {/* Mastercard logo */}
                <div className="relative h-7 w-8">
                  <div className="absolute left-0 top-0 h-7 w-7 rounded-full bg-[#EB001B]/80" />
                  <div className="absolute right-0 top-0 h-7 w-7 rounded-full bg-[#F79E1B]/80" />
                </div>
              </div>
            </div>

            {/* CARD 3: Analytics */}
            <Card className="flex flex-col">
              <div className="mb-3 flex items-center justify-between">
                <span className="text-[14px] font-bold text-[var(--text-primary)]">Analytics</span>
                <MenuDots />
              </div>
              <div className="flex flex-1 items-center gap-4">
                <div className="flex flex-col gap-2">
                  {[
                    { color: "var(--accent-1)", label: "Done" },
                    { color: "var(--accent-2)", label: "In progress" },
                    { color: "var(--accent-danger)", label: "To do" },
                  ].map((item) => (
                    <div key={item.label} className="flex items-center gap-2">
                      <span
                        className="h-1.5 w-1.5 rounded-full"
                        style={{ background: item.color }}
                      />
                      <span className="text-[12px] text-[var(--text-secondary)]">{item.label}</span>
                    </div>
                  ))}
                </div>
                {/* Donut chart */}
                <div className="relative flex items-center justify-center">
                  <svg width="90" height="90" viewBox="0 0 90 90">
                    <circle cx="45" cy="45" r="36" fill="none" stroke="var(--border-subtle)" strokeWidth="10" />
                    <circle
                      cx="45"
                      cy="45"
                      r="36"
                      fill="none"
                      stroke="var(--accent-1)"
                      strokeWidth="10"
                      strokeDasharray={`${0.9 * 2 * Math.PI * 36} ${2 * Math.PI * 36}`}
                      strokeDashoffset={2 * Math.PI * 36 * 0.25}
                      strokeLinecap="round"
                    />
                  </svg>
                  <div className="absolute text-center">
                    <p className="text-[20px] font-bold text-[var(--text-primary)]">90%</p>
                    <p className="text-[11px] text-[var(--text-secondary)]">Done</p>
                  </div>
                </div>
              </div>
            </Card>

            {/* --- ROW 2 --- */}

            {/* CARD 4: Last Transactions */}
            <Card className="flex flex-col">
              <div className="mb-1 flex items-center justify-between">
                <span className="text-[14px] font-bold text-[var(--text-primary)]">
                  Last Transactions
                </span>
                <MenuDots />
              </div>
              <div className="flex flex-col divide-y divide-[var(--border-subtle)]">
                <TransactionRow
                  icon={
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="white">
                      <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z" />
                    </svg>
                  }
                  iconBg="var(--surface-dark)"
                  name="Apple"
                  date="03 April, 2024"
                  amount="$653"
                />
                <TransactionRow
                  icon={
                    <div className="h-full w-full rounded-full bg-[var(--accent-1)]" />
                  }
                  iconBg="#C5D3FB"
                  name="Ralph Edwards"
                  date="01 April, 2024"
                  amount="$2,643"
                />
                <TransactionRow
                  icon={
                    <div className="h-full w-full rounded-full bg-[var(--accent-3)]" />
                  }
                  iconBg="#C8E8DE"
                  name="Jerome Bell"
                  date="27 March, 2024"
                  amount="$20"
                />
              </div>
            </Card>

            {/* RIGHT COLUMN (stacked) */}
            <div className="col-span-2 flex flex-col gap-4">
              {/* CARD 5: Expenses & Income */}
              <Card>
                <div className="mb-4 flex items-center justify-between">
                  <span className="text-[14px] font-bold text-[var(--text-primary)]">
                    Expenses &amp; Income
                  </span>
                  <MenuDots />
                </div>
                <div className="flex gap-10">
                  <div>
                    <p className="font-[tabular-nums] text-[24px] font-bold text-[var(--text-primary)]">
                      60%
                    </p>
                    <p className="text-[12px] text-[var(--text-secondary)]">Expenses</p>
                  </div>
                  <div>
                    <p className="font-[tabular-nums] text-[24px] font-bold text-[var(--text-primary)]">
                      40%
                    </p>
                    <p className="text-[12px] text-[var(--text-secondary)]">Income</p>
                  </div>
                </div>
                <div className="mt-4 flex h-[10px] overflow-hidden rounded-[var(--radius-pill)]">
                  <div className="bg-[var(--accent-1)]" style={{ width: "60%" }} />
                  <div className="bg-[var(--accent-2)]" style={{ width: "40%" }} />
                </div>
              </Card>

              {/* CARD 6: More features? */}
              <div className="relative overflow-hidden rounded-[var(--radius-card)] bg-[var(--surface-dark)] p-5 text-[var(--text-inverse)]">
                <Diamond size={16} strokeWidth={1.5} className="mb-2 opacity-80" />
                <p className="text-[16px] font-bold">More features?</p>
                <p className="mt-1 max-w-[220px] text-[12px] leading-relaxed opacity-60">
                  Update your account to premium to get more features
                </p>
                <button className="absolute bottom-5 right-5 rounded-[var(--radius-pill)] bg-[var(--surface-2)] px-4 py-2 text-[12px] font-bold text-[var(--text-primary)] transition-opacity hover:opacity-90">
                  Go to premium →
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
