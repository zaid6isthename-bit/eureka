import React from "react";
import type { ReactNode } from "react";

export function PageHeader({
  crumbs,
  title,
  subtitle,
  actions,
}: {
  crumbs?: string[];
  title: string;
  subtitle?: string;
  actions?: ReactNode;
}) {
  return (
    <header className="flex flex-wrap items-end justify-between gap-x-6 gap-y-3">
      <div className="min-w-0">
        {crumbs && crumbs.length > 0 && (
          <nav aria-label="Breadcrumb" className="mb-1.5 flex flex-wrap items-center gap-1.5 text-[12px] text-mut">
            {crumbs.map((c, i) => (
              <React.Fragment key={`${c}-${i}`}>
                {i > 0 && (
                  <span aria-hidden="true" className="text-ink-300">
                    ›
                  </span>
                )}
                <span className={i === crumbs.length - 1 ? "text-txt" : undefined}>{c}</span>
              </React.Fragment>
            ))}
          </nav>
        )}
        <h1 className="font-display text-[26px] font-bold leading-tight tracking-tight text-txt">{title}</h1>
        {subtitle && <p className="mt-1 text-[13px] text-mut">{subtitle}</p>}
      </div>
      {actions && <div className="flex flex-wrap items-center gap-2 pb-0.5">{actions}</div>}
    </header>
  );
}

export function HeaderIconBtn({
  label,
  onClick,
  children,
}: {
  label: string;
  onClick?: () => void;
  children: ReactNode;
}) {
  return (
    <button
      type="button"
      aria-label={label}
      title={label}
      onClick={onClick}
      className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-border bg-card text-mut shadow-sm transition-colors hover:text-txt"
    >
      {children}
    </button>
  );
}
