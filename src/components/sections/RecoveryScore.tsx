"use client";

import React, { useState } from "react";
import { motion, useReducedMotion } from "motion/react";
import { TickingNumber } from "@/components/ui/TickingNumber";
import { Sliders, ShieldCheck, Zap, ArrowUpRight, BarChart3 } from "lucide-react";

interface InputMetric {
  name: string;
  weight: number;
  score: number;
  code: string;
  status: string;
  detail: string;
}

export function RecoveryScore() {
  const reduceMotion = useReducedMotion();
  const [selectedMetric, setSelectedMetric] = useState<number>(0);

  const metrics: InputMetric[] = [
    {
      name: "Demand Velocity",
      weight: 25,
      score: 92,
      code: "INPUT-01",
      status: "HIGH B2B DEMAND",
      detail: "Cross-platform secondary market demand is active for this category.",
    },
    {
      name: "Age / Shelf Stagnation",
      weight: 20,
      score: 84,
      code: "INPUT-02",
      status: "62 DAYS UNSOLD",
      detail: "Stagnation score triggers early intervention before depreciation.",
    },
    {
      name: "Condition & Freshness",
      weight: 15,
      score: 95,
      code: "INPUT-03",
      status: "SEALED / MINT",
      detail: "Original packaging intact, zero degradation risk.",
    },
    {
      name: "Geographic Location",
      weight: 10,
      score: 78,
      code: "INPUT-04",
      status: "OPTIMAL HUB",
      detail: "Located within 50km of major regional distribution center.",
    },
    {
      name: "Urgency / Holding Cost",
      weight: 10,
      score: 88,
      code: "INPUT-05",
      status: "HIGH DECAY RATE",
      detail: "Carrying cost is ₹420/day; immediate recovery yields peak ROI.",
    },
    {
      name: "Market Value Benchmark",
      weight: 10,
      score: 82,
      code: "INPUT-06",
      status: "78% OF WHOL. VAL",
      detail: "Current market clearing price verified via real transaction data.",
    },
    {
      name: "Batch Quantity Scale",
      weight: 10,
      score: 85,
      code: "INPUT-07",
      status: "BULK PALLET (850U)",
      detail: "Pallet-level volume attracts institutional buyers.",
    },
  ];

  // Calculate weighted total score
  const totalScore = Math.round(
    metrics.reduce((acc, m) => acc + (m.score * m.weight) / 100, 0)
  );

  return (
    <section id="recovery-score" className="py-24 md:py-36 bg-[#0E1424] border-y border-[#232B45] relative">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-2xl mb-16 space-y-3">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#F2B705]" />
            <span className="font-mono text-xs text-[#F2B705] uppercase tracking-widest font-semibold">
              PROPRIETARY CAPITAL VALUATION
            </span>
          </div>

          <h2 className="font-space text-3xl sm:text-4xl lg:text-5xl font-bold text-[#EDEFF6] tracking-tight">
            The Recovery Score™ Instrument
          </h2>

          <p className="text-[#8991AC] text-base leading-relaxed">
            Not all stagnant inventory is equal. RECLAIM's commercial engine evaluates 7 weighted operational vectors to generate an instant capital score.
          </p>
        </div>

        {/* Live Instrument Readout Dashboard */}
        <div className="bg-[#161D33] border border-[#232B45] rounded-xl p-6 sm:p-10 shadow-2xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Left Gauge / Headline Score Component */}
            <div className="lg:col-span-5 bg-[#080B14] border border-[#232B45] rounded-xl p-6 text-center space-y-6 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-[#F2B705]/5 rounded-bl-full pointer-events-none" />

              <div className="flex items-center justify-between text-xs font-mono text-[#8991AC] border-b border-[#232B45] pb-3">
                <span className="flex items-center gap-1.5 text-[#3FE0C5]">
                  <Zap className="w-3.5 h-3.5" />
                  <span>INSTRUMENT READOUT</span>
                </span>
                <span>VER. 4.2</span>
              </div>

              {/* Central Radial Score Ring */}
              <div className="relative w-48 h-48 mx-auto flex items-center justify-center">
                <svg className="w-full h-full transform -rotate-90" viewBox="0 0 120 120">
                  {/* Track Circle */}
                  <circle
                    cx="60"
                    cy="60"
                    r="50"
                    fill="none"
                    stroke="#232B45"
                    strokeWidth="8"
                  />
                  {/* Glowing Progress Arc */}
                  <motion.circle
                    cx="60"
                    cy="60"
                    r="50"
                    fill="none"
                    stroke="#F2B705"
                    strokeWidth="8"
                    strokeDasharray="314"
                    strokeDashoffset={314 - (314 * totalScore) / 100}
                    strokeLinecap="round"
                    initial={reduceMotion ? false : { strokeDashoffset: 314 }}
                    animate={{ strokeDashoffset: 314 - (314 * totalScore) / 100 }}
                    transition={{ duration: 2, ease: "easeOut" }}
                  />
                </svg>

                {/* Score Number inside ring */}
                <div className="absolute inset-0 flex flex-col items-center justify-center font-mono">
                  <span className="text-4xl sm:text-5xl font-bold text-[#F2B705]">
                    <TickingNumber value={totalScore} duration={2000} />
                  </span>
                  <span className="text-xs text-[#8991AC] tracking-wider uppercase mt-1">
                    OUT OF 100
                  </span>
                </div>
              </div>

              {/* Recommendation Banner */}
              <div className="bg-[#F2B705]/10 border border-[#F2B705]/30 rounded-lg p-3 text-center space-y-1">
                <span className="font-mono text-xs font-bold text-[#F2B705] tracking-widest block uppercase">
                  RECOMMENDATION: RECOVER NOW
                </span>
                <p className="text-xs text-[#EDEFF6]">
                  High liquidity window. Estimated cash yield: <strong className="text-[#F2B705] font-mono">78%</strong> of original cost.
                </p>
              </div>
            </div>

            {/* Right Breakdown: The 7 Weighted Inputs */}
            <div className="lg:col-span-7 space-y-4">
              <div className="flex items-center justify-between border-b border-[#232B45] pb-3 text-xs font-mono text-[#8991AC]">
                <span>THE 7 WEIGHTED INPUT VECTORS</span>
                <span>WEIGHT / SCORE</span>
              </div>

              <div className="space-y-3">
                {metrics.map((m, idx) => {
                  const isSelected = idx === selectedMetric;
                  return (
                    <div
                      key={m.code}
                      onClick={() => setSelectedMetric(idx)}
                      className={`p-3.5 rounded-lg border transition-all duration-200 cursor-pointer ${
                        isSelected
                          ? "bg-[#080B14] border-[#F2B705]/50 shadow-md"
                          : "bg-[#080B14]/40 border-[#232B45] hover:border-[#232B45]/80"
                      }`}
                    >
                      <div className="flex items-center justify-between mb-1.5">
                        <div className="flex items-center gap-2.5">
                          <span className="font-mono text-[10px] text-[#3FE0C5] bg-[#3FE0C5]/10 px-1.5 py-0.5 rounded border border-[#3FE0C5]/20">
                            {m.code}
                          </span>
                          <span className="font-space font-semibold text-sm text-[#EDEFF6]">
                            {m.name}
                          </span>
                        </div>

                        <div className="flex items-center gap-3 font-mono text-xs">
                          <span className="text-[#8991AC]">Wt: {m.weight}%</span>
                          <span className="text-[#F2B705] font-bold">{m.score}/100</span>
                        </div>
                      </div>

                      {/* Progress bar */}
                      <div className="w-full bg-[#232B45] h-1.5 rounded-full overflow-hidden">
                        <div
                          className="bg-gradient-to-r from-[#3FE0C5] to-[#F2B705] h-full rounded-full transition-all duration-500"
                          style={{ width: `${m.score}%` }}
                        />
                      </div>

                      {isSelected && (
                        <div className="mt-2.5 pt-2 border-t border-[#232B45] text-xs flex items-center justify-between text-[#8991AC]">
                          <span>{m.detail}</span>
                          <span className="font-mono text-[10px] text-[#3FE0C5] uppercase font-bold">
                            {m.status}
                          </span>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
