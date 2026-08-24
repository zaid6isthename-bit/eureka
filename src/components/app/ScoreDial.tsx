"use client";

import React, { useEffect, useState } from "react";
import { CountUp } from "@/components/ui/CountUp";

const RADIUS = 26;
const CIRC = 2 * Math.PI * RADIUS;

function tone(score: number) {
  if (score >= 80) return { stroke: "var(--stable)", text: "text-stable" };
  if (score >= 60) return { stroke: "var(--gold)", text: "text-gold" };
  return { stroke: "#B04A4A", text: "text-[#B04A4A]" };
}

export function ScoreDial({
  score,
  size = 64,
  label,
}: {
  score: number;
  size?: number;
  label?: string;
}) {
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    const t = window.setTimeout(() => setMounted(true), 40);
    return () => window.clearTimeout(t);
  }, []);

  const t = tone(score);
  const stroke = Math.max(3, size / 16);

  return (
    <div
      className="relative shrink-0"
      style={{ width: size, height: size }}
      role="img"
      aria-label={label ?? `Recovery Score ${score} out of 100`}
    >
      <svg viewBox="0 0 64 64" width={size} height={size} className="-rotate-90">
        <circle cx="32" cy="32" r={RADIUS} fill="none" stroke="var(--line)" strokeWidth={stroke} />
        <circle
          cx="32"
          cy="32"
          r={RADIUS}
          fill="none"
          stroke={t.stroke}
          strokeWidth={stroke}
          strokeLinecap="round"
          strokeDasharray={CIRC}
          strokeDashoffset={mounted ? CIRC * (1 - score / 100) : CIRC}
          style={{ transition: "stroke-dashoffset 0.9s cubic-bezier(0.16,1,0.3,1)" }}
        />
      </svg>
      <span
        className={`absolute inset-0 flex items-center justify-center font-mono font-medium ${t.text}`}
        style={{ fontSize: size * 0.28 }}
      >
        <CountUp value={score} duration={700} />
      </span>
    </div>
  );
}

export function tierLabel(tier: string) {
  if (tier === "Prime") return "text-stable";
  if (tier === "Viable") return "text-gold";
  return "text-[#B04A4A]";
}
