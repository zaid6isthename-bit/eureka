"use client";

import {
  Home,
  Folder,
  FileText,
  MessageSquare,
  Settings,
  Headphones,
  LayoutGrid,
  Calendar,
  Search,
  SlidersHorizontal,
  Bell,
  Mail,
  ChevronDown,
  ExternalLink,
  X,
  MoreHorizontal,
  ArrowUpRight,
  ArrowDownRight,
  Plus,
  MoreVertical,
} from "lucide-react";

function Card({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <div
      className={`relative rounded-[var(--radius-card)] bg-[var(--surface-2)] p-5 shadow-[var(--shadow-soft)] ${className}`}
    >
      {children}
    </div>
  );
}

function SidebarIcon({ icon: Icon, active }: { icon: React.ElementType; active?: boolean }) {
  return (
    <div
      className={`flex h-10 w-10 items-center justify-center rounded-full transition-colors ${
        active ? "bg-[var(--surface-dark)] text-white" : "text-[var(--text-secondary)] hover:bg-[var(--border-subtle)]"
      }`}
    >
      <Icon size={18} strokeWidth={1.8} />
    </div>
  );
}

function IconBtn({ icon: Icon }: { icon: React.ElementType }) {
  return (
    <button className="flex h-10 w-10 items-center justify-center rounded-full bg-white text-[var(--text-primary)] shadow-sm transition-colors hover:bg-[var(--border-subtle)]">
      <Icon size={16} strokeWidth={1.8} />
    </button>
  );
}

function MenuDots() {
  return (
    <button className="flex h-6 w-6 items-center justify-center rounded-full text-[var(--text-secondary)] transition-colors hover:bg-[var(--border-subtle)]" aria-label="Menu">
      <MoreVertical size={14} />
    </button>
  );
}

export function DashboardOverview() {
  const activityBars = [
    { h: 40, label: "Mon" },
    { h: 55, label: "Tue" },
    { h: 35, label: "Wed" },
    { h: 80, label: "Thu", active: true },
    { h: 50, label: "Fri" },
    { h: 25, label: "Sat" },
    { h: 30, label: "Sun" },
  ];

  const spentPts = [
    { x: 0, y: 50 }, { x: 50, y: 35 }, { x: 100, y: 60 },
    { x: 150, y: 25 }, { x: 200, y: 45 }, { x: 250, y: 20 }, { x: 300, y: 55 },
  ];
  const spentPath = spentPts.map((p, i) => `${i === 0 ? "M" : "L"}${p.x},${p.y}`).join(" ");

  return (
    <div className="fenco flex min-h-screen items-center justify-center bg-[var(--bg-canvas)] p-6">
      <div className="flex w-full max-w-[1440px] flex-col gap-4 overflow-hidden rounded-[var(--radius-shell)] bg-[var(--surface-1)] p-6 shadow-[var(--shadow-soft)]">
        {/* ===== TOP NAV BAR ===== */}
        <div className="flex items-center justify-between rounded-[var(--radius-pill)] bg-white px-4 py-2 shadow-sm">
          <div className="flex items-center gap-3">
            <div className="flex h-8 w-8 items-center justify-center rounded-[10px] bg-[var(--surface-dark)]">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2">
                <polygon points="12,2 15,9 22,9 16.5,14 18.5,21 12,17 5.5,21 7.5,14 2,9 9,9" />
              </svg>
            </div>
            <nav className="flex items-center gap-2">
              <button className="flex items-center gap-2 rounded-[var(--radius-pill)] bg-[var(--surface-dark)] px-4 py-2 text-[13px] font-medium text-white">
                <LayoutGrid size={14} /> Dashboard
              </button>
              <button className="flex items-center gap-2 rounded-[var(--radius-pill)] px-4 py-2 text-[13px] font-medium text-[var(--text-secondary)] transition-colors hover:bg-[var(--border-subtle)]">
                <Calendar size={14} /> Payments
              </button>
              <button className="flex items-center gap-2 rounded-[var(--radius-pill)] px-4 py-2 text-[13px] font-medium text-[var(--text-secondary)] transition-colors hover:bg-[var(--border-subtle)]">
                <FileText size={14} /> Reports
              </button>
            </nav>
          </div>
          <div className="flex items-center gap-3">
            <div className="flex -space-x-2">
              {["#E37B7B", "#8CA0F7", "#9FD8C9"].map((c, i) => (
                <div key={i} className="h-7 w-7 rounded-full border-2 border-white" style={{ background: c }} />
              ))}
              <div className="flex h-7 w-7 items-center justify-center rounded-full border-2 border-white bg-[var(--surface-dark)] text-[9px] font-bold text-white">+8</div>
            </div>
            <button className="flex items-center gap-1.5 rounded-[var(--radius-pill)] bg-[var(--surface-dark)] px-3 py-2 text-[12px] font-medium text-white">
              <Plus size={12} /> Add Manager
            </button>
            <IconBtn icon={Bell} />
            <IconBtn icon={Mail} />
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[var(--accent-3)] text-[14px] font-bold text-[var(--text-primary)]">A</div>
          </div>
        </div>

        {/* ===== BODY ===== */}
        <div className="flex gap-4">
          {/* LEFT SIDEBAR */}
          <div className="flex w-16 shrink-0 flex-col items-center justify-between py-2">
            <div className="flex flex-col items-center gap-5 rounded-[var(--radius-pill)] bg-white px-3 py-4 shadow-sm">
              <SidebarIcon icon={Home} active />
              <SidebarIcon icon={Folder} />
              <SidebarIcon icon={FileText} />
              <SidebarIcon icon={MessageSquare} />
              <SidebarIcon icon={Settings} />
            </div>
            <button className="flex h-12 w-12 items-center justify-center rounded-full bg-white text-[var(--text-secondary)] shadow-sm transition-colors hover:bg-[var(--border-subtle)]">
              <Headphones size={18} strokeWidth={1.8} />
            </button>
          </div>

          {/* MAIN */}
          <div className="flex min-w-0 flex-1 flex-col gap-4">
            {/* PAGE HEADER */}
            <div className="flex items-end justify-between">
              <div>
                <p className="text-[12px] text-[var(--text-secondary)]">🏠 Home Page &nbsp;›&nbsp; 📁 Dashboard</p>
                <h1 className="text-[28px] font-bold text-[var(--text-primary)]">Finance Overview</h1>
              </div>
              <div className="flex items-center gap-2">
                <IconBtn icon={Search} />
                <IconBtn icon={SlidersHorizontal} />
                <button className="flex h-10 items-center gap-2 rounded-[var(--radius-pill)] border border-[var(--border-subtle)] bg-white px-4 text-[13px] text-[var(--text-primary)] shadow-sm">
                  🗓 20-27 Jan, 2025 <ChevronDown size={12} />
                </button>
                <button className="flex h-10 items-center gap-2 rounded-[var(--radius-pill)] border border-[var(--border-subtle)] bg-white px-4 text-[13px] font-medium text-[var(--text-primary)] shadow-sm">
                  + Add Widget
                </button>
                <button className="flex h-10 items-center rounded-[var(--radius-pill)] bg-[var(--surface-dark)] px-4 text-[13px] font-bold text-white shadow-sm">
                  Create a Report
                </button>
              </div>
            </div>

            {/* ===== 4-COLUMN GRID ===== */}
            <div className="grid gap-4" style={{ gridTemplateColumns: "120px 1.5fr 1fr 200px", gridTemplateRows: "auto auto" }}>

              {/* COL 1 ROW 1: Pro Version */}
              <Card className="flex flex-col">
                <div className="flex items-center justify-between">
                  <span className="text-[13px] font-semibold text-[var(--text-primary)]">Pro Version</span>
                  <button className="text-[var(--text-secondary)] hover:text-[var(--text-primary)]"><X size={14} /></button>
                </div>
              </Card>

              {/* COL 2 ROW 1: Activity */}
              <Card>
                <div className="mb-1 flex items-center justify-between">
                  <div>
                    <span className="text-[14px] font-bold text-[var(--text-primary)]">Activity</span>
                    <p className="text-[12px] text-[var(--text-secondary)]">Worked this week</p>
                  </div>
                  <div className="flex items-center gap-1">
                    <button className="text-[var(--text-secondary)]"><MoreHorizontal size={16} /></button>
                    <button className="text-[var(--text-secondary)]"><ExternalLink size={14} /></button>
                  </div>
                </div>
                <p className="font-[tabular-nums] text-[26px] font-bold text-[var(--text-primary)]">186h</p>
                <div className="relative mt-4 flex items-end justify-between gap-1.5">
                  {activityBars.map((b, i) => (
                    <div key={i} className="flex flex-1 flex-col items-center gap-1">
                      {b.active && <div className="mb-1 rounded-[6px] bg-[var(--accent-2)] px-2 py-0.5 text-[10px] font-medium text-[var(--text-primary)]">16:30h</div>}
                      <div className="w-full rounded-t-[4px]" style={{ height: `${b.h}px`, background: b.active ? "var(--surface-dark)" : "var(--border-subtle)" }} />
                      <span className="text-[10px] text-[var(--text-secondary)]">{b.label}</span>
                    </div>
                  ))}
                </div>
              </Card>

              {/* COL 3 ROW 1: Virtual cards */}
              <Card>
                <div className="mb-2 flex items-center justify-between">
                  <span className="text-[14px] font-bold text-[var(--text-primary)]">Virtual cards</span>
                  <MenuDots />
                </div>
                <p className="text-[12px] text-[var(--text-secondary)]">Total Balance</p>
                <div className="mt-1 flex items-baseline gap-1">
                  <span className="font-[tabular-nums] text-[22px] font-bold text-[var(--text-primary)]">$6.010</span>
                  <span className="font-[tabular-nums] text-[14px] text-[var(--text-primary)]">.29</span>
                  <span className="ml-1 flex items-center gap-0.5 rounded-full bg-[var(--accent-success)]/15 px-2 py-0.5 text-[10px] font-medium text-[var(--accent-success)]">
                    <ArrowUpRight size={10} /> $205.00
                  </span>
                </div>
                <div className="mt-4 flex flex-col gap-2.5">
                  {[{ label: "Dollar", pct: 72, color: "var(--accent-1)" }, { label: "Tether", pct: 28, color: "var(--accent-2)" }].map((item) => (
                    <div key={item.label} className="flex items-center justify-between">
                      <span className="text-[13px] text-[var(--text-primary)]">{item.label}</span>
                      <div className="flex items-center gap-2">
                        <span className="text-[13px] text-[var(--text-secondary)]">{item.pct}%</span>
                        <svg width="18" height="18" viewBox="0 0 18 18">
                          <circle cx="9" cy="9" r="7" fill="none" stroke="var(--border-subtle)" strokeWidth="2" />
                          <circle cx="9" cy="9" r="7" fill="none" stroke={item.color} strokeWidth="2" strokeDasharray={`${(item.pct / 100) * 2 * Math.PI * 7} ${2 * Math.PI * 7}`} strokeDashoffset={2 * Math.PI * 7 * 0.25} strokeLinecap="round" />
                        </svg>
                      </div>
                    </div>
                  ))}
                </div>
              </Card>

              {/* COL 4 ROW 1-2: VISA (spans both rows) */}
              <div className="row-span-2 flex flex-col justify-between rounded-[var(--radius-card)] bg-[var(--accent-3)] p-5">
                <div className="flex justify-end">
                  <span className="text-[16px] font-bold italic text-[var(--text-primary)]">VISA</span>
                </div>
                <div>
                  <p className="font-[tabular-nums] text-[26px] font-bold text-[var(--text-primary)]">$390.00</p>
                  <div className="mt-4 flex justify-between text-[12px] text-[var(--text-primary)] opacity-70">
                    <span>••• 6802</span>
                    <span>09/28</span>
                  </div>
                </div>
              </div>

              {/* COL 1 ROW 2: Advantages */}
              <Card className="flex flex-col">
                <div className="flex items-start justify-between">
                  <span className="rounded-full bg-[var(--accent-2)] px-2 py-0.5 text-[11px] font-bold text-[var(--text-primary)]">15 Days</span>
                </div>
                <p className="mt-2 text-[14px] font-bold text-[var(--text-primary)]">Advantages</p>
                <p className="mt-1 text-[11px] text-[var(--text-secondary)]">Your earnings with the pro version</p>
                <div className="mt-2 flex-1">
                  <svg width="100%" height="24" viewBox="0 0 80 24" fill="none">
                    <path d="M0 18 Q10 16 15 12 T30 8 T45 5 T60 3 T80 1" stroke="var(--accent-1)" strokeWidth="2" fill="none" strokeLinecap="round" />
                  </svg>
                </div>
                <button className="mt-1 flex items-center gap-1 text-[13px] font-bold text-[var(--text-primary)]">
                  Learn more <ArrowUpRight size={12} />
                </button>
                <p className="mt-1 text-[10px] text-[var(--text-secondary)]">Join the elite of the crypto world with Pro Version</p>
              </Card>

              {/* COL 2 ROW 2: Total Spent */}
              <Card>
                <div className="mb-1 flex items-center justify-between">
                  <div>
                    <span className="text-[14px] font-bold text-[var(--text-primary)]">Total Spent</span>
                    <p className="text-[12px] text-[var(--text-secondary)]">Spent this week</p>
                  </div>
                  <div className="flex items-center gap-1">
                    <button className="text-[var(--text-secondary)]"><MoreHorizontal size={16} /></button>
                    <button className="text-[var(--text-secondary)]"><ExternalLink size={14} /></button>
                  </div>
                </div>
                <div className="flex items-baseline gap-1">
                  <span className="font-[tabular-nums] text-[24px] font-bold text-[var(--text-primary)]">$820</span>
                  <span className="font-[tabular-nums] text-[14px] text-[var(--text-primary)]">.65</span>
                  <span className="ml-1 flex items-center gap-0.5 rounded-full bg-[var(--accent-danger)]/15 px-2 py-0.5 text-[10px] font-medium text-[var(--accent-danger)]">
                    <ArrowDownRight size={10} /> $605.00
                  </span>
                </div>
                <div className="relative mt-3">
                  <svg width="100%" height="70" viewBox="0 0 320 70" preserveAspectRatio="none">
                    <path d={spentPath} fill="none" stroke="var(--surface-dark)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    {spentPts.map((p, i) => <circle key={i} cx={p.x} cy={p.y} r="3" fill="var(--surface-dark)" />)}
                    <line x1="200" y1="0" x2="200" y2="70" stroke="var(--accent-2)" strokeWidth="1" strokeDasharray="3 3" />
                  </svg>
                  <div className="absolute -top-1 left-[58%] -translate-x-1/2 rounded-[6px] bg-[var(--accent-2)] px-2 py-0.5 text-[10px] font-medium text-[var(--text-primary)]">$680.00</div>
                </div>
                <div className="mt-1 flex justify-between text-[10px] text-[var(--text-secondary)]">
                  {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map((d) => <span key={d}>{d}</span>)}
                </div>
                <div className="mt-3 flex gap-2">
                  <span className="rounded-[var(--radius-pill)] border border-[var(--border-subtle)] bg-white px-3 py-1 text-[11px] text-[var(--text-primary)]">10 Wallets</span>
                  <span className="rounded-[var(--radius-pill)] border border-[var(--border-subtle)] bg-white px-3 py-1 text-[11px] text-[var(--text-primary)]">26 Assets</span>
                </div>
              </Card>

              {/* COL 3 ROW 2: Contract Type */}
              <Card>
                <div className="mb-2 flex items-center justify-between">
                  <span className="text-[14px] font-bold text-[var(--text-primary)]">Contract Type</span>
                  <button className="text-[var(--text-secondary)]"><ExternalLink size={14} /></button>
                </div>
                <div className="relative flex items-center justify-center">
                  <svg width="90" height="90" viewBox="0 0 90 90">
                    <circle cx="45" cy="45" r="34" fill="none" stroke="var(--border-subtle)" strokeWidth="8" />
                    <circle cx="45" cy="45" r="34" fill="none" stroke="var(--accent-3)" strokeWidth="8" strokeDasharray={`${0.86 * 2 * Math.PI * 34} ${2 * Math.PI * 34}`} strokeDashoffset={2 * Math.PI * 34 * 0.25} strokeLinecap="round" />
                    <circle cx="45" cy="45" r="34" fill="none" stroke="var(--accent-1)" strokeWidth="8" strokeDasharray={`${0.1 * 2 * Math.PI * 34} ${2 * Math.PI * 34}`} strokeDashoffset={2 * Math.PI * 34 * 0.25 - 0.86 * 2 * Math.PI * 34} />
                    <circle cx="45" cy="45" r="34" fill="none" stroke="var(--accent-2)" strokeWidth="8" strokeDasharray={`${0.04 * 2 * Math.PI * 34} ${2 * Math.PI * 34}`} strokeDashoffset={2 * Math.PI * 34 * 0.25 - 0.96 * 2 * Math.PI * 34} />
                  </svg>
                  <div className="absolute text-center">
                    <p className="text-[18px] font-bold text-[var(--text-primary)]">86%</p>
                    <p className="text-[9px] text-[var(--text-secondary)]">Learn more</p>
                  </div>
                </div>
                <div className="mt-4 flex justify-around">
                  {[{ val: "140", label: "Milestones" }, { val: "48", label: "Bonuses" }, { val: "16", label: "Hourly" }].map((s) => (
                    <div key={s.label} className="text-center">
                      <p className="font-[tabular-nums] text-[14px] font-bold text-[var(--text-primary)]">{s.val}</p>
                      <p className="text-[10px] uppercase tracking-wider text-[var(--text-secondary)]">{s.label}</p>
                    </div>
                  ))}
                </div>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
