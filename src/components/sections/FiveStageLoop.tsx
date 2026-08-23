"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, useReducedMotion } from "motion/react";
import { Search, AlertOctagon, TrendingUp, CheckSquare, RefreshCw, ArrowRight } from "lucide-react";

interface Stage {
  id: string;
  number: string;
  name: string;
  phase: "SEE" | "THINK" | "ACT";
  headline: string;
  definition: string;
  example: string;
  accent: string; // hex color token
  accentClass: string;
  icon: React.ElementType;
}

export function FiveStageLoop() {
  const [activeStageIndex, setActiveStageIndex] = useState(0);
  const stageRefs = useRef<(HTMLDivElement | null)[]>([]);
  const reduceMotion = useReducedMotion();

  const stages: Stage[] = [
    {
      id: "understand",
      number: "01",
      name: "UNDERSTAND",
      phase: "SEE",
      headline: "Continuous, Unified Business Operating Model",
      definition: "Plugs into existing tools (QuickBooks, Tally, Odoo, Shopify, custom ERPs) to build a live understanding of what the business sells, owns, owes, and spends.",
      example: "DATA HARMONIZED: Reconciles 4,800 SKU ledgers across 3 sales channels against cash reserves in real time.",
      accent: "#3FE0C5", // cyan: data flow
      accentClass: "text-[#3FE0C5] border-[#3FE0C5]",
      icon: Search,
    },
    {
      id: "detect",
      number: "02",
      name: "DETECT",
      phase: "SEE",
      headline: "Cross-Silo Leakage Detection Engine",
      definition: "Surfaces silent operational friction invisible when data sits isolated in departmental spreadsheets.",
      example: "CRITICAL DETECTION: Inventory rising (+18%) + Sales falling (-12%) + Procurement unchanged = Overstock forming on 12 SKUs.",
      accent: "#FF5C6C", // risk red: problem moment
      accentClass: "text-[#FF5C6C] border-[#FF5C6C]",
      icon: AlertOctagon,
    },
    {
      id: "predict",
      number: "03",
      name: "PREDICT",
      phase: "THINK",
      headline: "Forward Operational Forecasting",
      definition: "Calculates holding costs, velocity decay, and working capital impact before financial damage shows up on your P&L.",
      example: "FORECAST: 'SKU Batch #8812 will sit unsold for 60+ days, tying up ₹14.2L in working capital during Q4.'",
      accent: "#3FE0C5", // cyan: predictive model
      accentClass: "text-[#3FE0C5] border-[#3FE0C5]",
      icon: TrendingUp,
    },
    {
      id: "recommend",
      number: "04",
      name: "RECOMMEND",
      phase: "THINK",
      headline: "Precision Decision Directives",
      definition: "Replaces vague dashboards with exact, actionable business moves — telling managers precisely what to pause, reallocate, or adjust.",
      example: "ACTION DIRECTIVE: 'Pause replenishment on these 12 SKUs immediately; reallocate ₹4.8L procurement budget to fast-moving SKU #104.'",
      accent: "#F2B705", // gold: value recommendation
      accentClass: "text-[#F2B705] border-[#F2B705]",
      icon: CheckSquare,
    },
    {
      id: "recover",
      number: "05",
      name: "RECOVER",
      phase: "ACT",
      headline: "Commercial Capital Recovery Engine",
      definition: "Finds excess, slow-moving, or discontinued inventory, scores it via Recovery Score™, and connects it to verified B2B buyers to return cash to your bank.",
      example: "COMMERCIAL RECOVERY: Executed deal for 850 units of slow inventory → ₹8.4L cash recovered at 78% of valuation.",
      accent: "#F2B705", // gold: value recovered
      accentClass: "text-[#F2B705] border-[#F2B705]",
      icon: RefreshCw,
    },
  ];

  useEffect(() => {
    const handleScroll = () => {
      stageRefs.current.forEach((el, index) => {
        if (!el) return;
        const rect = el.getBoundingClientRect();
        if (rect.top <= window.innerHeight * 0.45 && rect.bottom >= window.innerHeight * 0.15) {
          setActiveStageIndex(index);
        }
      });
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <section id="intelligence-loop" className="py-24 md:py-36 bg-[#080B14] relative">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Headline */}
        <div className="max-w-2xl mb-16 space-y-3">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#3FE0C5]" />
            <span className="font-mono text-xs text-[#3FE0C5] uppercase tracking-widest font-semibold">
              THE FIVE-STAGE INTELLIGENCE LOOP
            </span>
          </div>

          <h2 className="font-space text-3xl sm:text-4xl lg:text-5xl font-bold text-[#EDEFF6] tracking-tight">
            From fragmented data to continuous capital recovery
          </h2>

          <p className="text-[#8991AC] text-base leading-relaxed">
            RECLAIM executes a continuous five-stage intelligence sequence: <strong className="text-[#3FE0C5]">SEE</strong> → <strong className="text-[#EDEFF6]">THINK</strong> → <strong className="text-[#F2B705]">ACT</strong>.
          </p>
        </div>

        {/* Main Grid: Phase Rail (Left) + Detailed Stage Cards (Right) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Persistent Phase Rail (Sticky on Desktop) */}
          <div className="lg:col-span-4 lg:sticky lg:top-32 space-y-4 bg-[#0E1424] border border-[#232B45] rounded-xl p-5 shadow-xl">
            <div className="border-b border-[#232B45] pb-3 mb-2 flex items-center justify-between">
              <span className="font-mono text-xs text-[#8991AC] uppercase tracking-wider">
                TELEMETRY PHASE RAIL
              </span>
              <span className="font-mono text-[10px] text-[#3FE0C5] bg-[#3FE0C5]/10 px-2 py-0.5 rounded">
                LIVE SEQUENCER
              </span>
            </div>

            <div className="space-y-2">
              {stages.map((stg, i) => {
                const isActive = i === activeStageIndex;
                return (
                  <button
                    key={stg.id}
                    onClick={() => {
                      stageRefs.current[i]?.scrollIntoView({ behavior: "smooth", block: "center" });
                    }}
                    className={`w-full text-left p-3 rounded-lg border transition-all duration-200 cursor-pointer flex items-center justify-between ${
                      isActive
                        ? "bg-[#161D33] border-[#232B45] shadow-lg"
                        : "bg-transparent border-transparent hover:bg-[#161D33]/40 text-[#8991AC]"
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <span
                        className="font-mono text-xs font-bold"
                        style={{ color: isActive ? stg.accent : "#8991AC" }}
                      >
                        {stg.number}
                      </span>
                      <span
                        className={`font-space font-semibold text-sm transition-colors ${
                          isActive ? "text-[#EDEFF6]" : "text-[#8991AC]"
                        }`}
                      >
                        {stg.name}
                      </span>
                    </div>

                    <div className="flex items-center gap-2">
                      <span
                        className="font-mono text-[10px] uppercase px-1.5 py-0.5 rounded border"
                        style={{
                          color: stg.accent,
                          borderColor: `${stg.accent}40`,
                          backgroundColor: `${stg.accent}15`,
                        }}
                      >
                        {stg.phase}
                      </span>
                      {isActive && (
                        <span
                          className="w-2 h-2 rounded-full animate-pulse"
                          style={{ backgroundColor: stg.accent }}
                        />
                      )}
                    </div>
                  </button>
                );
              })}
            </div>

            <div className="pt-3 border-t border-[#232B45] text-[11px] text-[#8991AC] font-mono flex items-center justify-between">
              <span>ACTIVE STAGE:</span>
              <span className="text-[#F2B705] font-bold">
                {stages[activeStageIndex].name}
              </span>
            </div>
          </div>

          {/* Right Column: Stage Details */}
          <div className="lg:col-span-8 space-y-8">
            {stages.map((stg, i) => {
              const IconComp = stg.icon;
              return (
                <div
                  key={stg.id}
                  ref={(el) => {
                    stageRefs.current[i] = el;
                  }}
                  className={`bg-[#0E1424] border rounded-xl p-6 sm:p-8 transition-all duration-300 relative overflow-hidden ${
                    i === activeStageIndex
                      ? "border-[#232B45] shadow-2xl ring-1"
                      : "border-[#232B45]/60 opacity-80 hover:opacity-100"
                  }`}
                  style={{
                    borderColor: i === activeStageIndex ? stg.accent : undefined,
                  }}
                >
                  {/* Subtle Accent Glow */}
                  <div
                    className="absolute top-0 right-0 w-48 h-48 rounded-bl-full pointer-events-none opacity-10"
                    style={{ backgroundColor: stg.accent }}
                  />

                  {/* Header Row */}
                  <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
                    <div className="flex items-center gap-3">
                      <div
                        className="w-10 h-10 rounded-lg flex items-center justify-center border"
                        style={{
                          backgroundColor: `${stg.accent}15`,
                          borderColor: `${stg.accent}40`,
                          color: stg.accent,
                        }}
                      >
                        <IconComp className="w-5 h-5" />
                      </div>

                      <div>
                        <div className="flex items-center gap-2">
                          <span
                            className="font-mono text-xs font-bold"
                            style={{ color: stg.accent }}
                          >
                            STAGE {stg.number}
                          </span>
                          <span className="text-[#8991AC] text-xs">•</span>
                          <span className="font-mono text-xs text-[#8991AC]">
                            {stg.phase} PHASE
                          </span>
                        </div>
                        <h3 className="font-space text-xl sm:text-2xl font-bold text-[#EDEFF6]">
                          {stg.name}
                        </h3>
                      </div>
                    </div>

                    <span
                      className="font-mono text-xs font-bold uppercase px-3 py-1 rounded-full border"
                      style={{
                        color: stg.accent,
                        borderColor: `${stg.accent}50`,
                        backgroundColor: `${stg.accent}10`,
                      }}
                    >
                      {stg.headline}
                    </span>
                  </div>

                  {/* Definition Body */}
                  <p className="text-[#EDEFF6] text-base leading-relaxed mb-6">
                    {stg.definition}
                  </p>

                  {/* Concrete Telemetry Example Box */}
                  <div
                    className="bg-[#080B14] border rounded-lg p-4 font-mono text-xs space-y-1.5"
                    style={{ borderColor: `${stg.accent}40` }}
                  >
                    <div className="flex items-center justify-between text-[#8991AC]">
                      <span className="uppercase text-[10px] tracking-wider">
                        CONCRETE TELEMETRY EXAMPLE:
                      </span>
                      <span
                        className="text-[10px] font-bold"
                        style={{ color: stg.accent }}
                      >
                        VERIFIED RULE
                      </span>
                    </div>
                    <p className="text-[#EDEFF6] leading-normal">{stg.example}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
