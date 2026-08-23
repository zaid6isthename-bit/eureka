"use client";

import React from "react";
import { motion } from "motion/react";
import { Layers, AlertTriangle, ArrowDown } from "lucide-react";

export function ProblemFraming() {
  const problems = [
    {
      code: "PROBLEM 01 — FRAGMENTATION",
      title: "Your tools speak in past-tense and isolated dialects.",
      body: "Accounting sees what was spent. Inventory sees what is in the warehouse. Sales sees what left the door. No software builds a unified model of what your business currently owns, owes, and is losing.",
      metric: "74% OF SMES RECONCILE DATA MANUALLY",
      accentColor: "#3FE0C5", // cyan data flow
    },
    {
      code: "PROBLEM 02 — REACTIVE BLINDNESS",
      title: "Problems become visible only after cash flow has already choked.",
      body: "Overstock forms silently over 60–90 days. By the time your monthly P&L reveals margin decay, capital has already been locked in stagnant physical inventory or uncollected receivables.",
      metric: "AVG 68 DAYS TO IDENTIFY OVERSTOCK",
      accentColor: "#FF5C6C", // risk red
    },
    {
      code: "PROBLEM 03 — TRAPPED CAPITAL",
      title: "Money isn't lost — it's frozen inside your own operations.",
      body: "In a warehouse pallet, a discontinued SKU, an uncalibrated reorder point, or a spreadsheet nobody cross-references. Traditional software tells you what happened; none turns trapped value back into cash.",
      metric: "₹15L - ₹80L TYPICAL UNCLAIMED CAPITAL",
      accentColor: "#F2B705", // signal gold
    },
  ];

  return (
    <section id="problem" className="py-20 md:py-32 bg-[#0E1424] border-y border-[#232B45] relative">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-2xl mb-16 space-y-3">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#FF5C6C]" />
            <span className="font-mono text-xs text-[#FF5C6C] uppercase tracking-widest font-semibold">
              THE STRUCTURAL BLINDSPOT
            </span>
          </div>

          <h2 className="font-space text-3xl sm:text-4xl lg:text-5xl font-bold text-[#EDEFF6] tracking-tight">
            Why traditional business software fails inventory-heavy companies
          </h2>

          <p className="text-[#8991AC] text-base leading-relaxed">
            Most software acts like a historical record keeper. They track numbers after the fact, leaving critical decision gaps between departments.
          </p>
        </div>

        {/* Stacked Narrative List with Connecting Thread Line */}
        <div className="relative pl-6 sm:pl-10 space-y-12">
          {/* Vertical Connecting Thread Line */}
          <div className="absolute top-4 bottom-4 left-2 sm:left-3 w-0.5 bg-gradient-to-b from-[#3FE0C5] via-[#FF5C6C] to-[#F2B705] opacity-50" />

          {problems.map((prob, idx) => (
            <motion.div
              key={prob.code}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className="relative bg-[#161D33] border border-[#232B45] hover:border-[#232B45]/80 rounded-xl p-6 sm:p-8 transition-all duration-200 group"
            >
              {/* Thread Node Point on line */}
              <div
                className="absolute -left-[31px] sm:-left-[47px] top-8 w-4 h-4 rounded-full border-2 bg-[#0E1424] transition-transform group-hover:scale-125 duration-200 flex items-center justify-center"
                style={{ borderColor: prob.accentColor }}
              >
                <div
                  className="w-1.5 h-1.5 rounded-full"
                  style={{ backgroundColor: prob.accentColor }}
                />
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
                {/* Left Code Eyebrow & Title */}
                <div className="lg:col-span-7 space-y-2">
                  <div className="flex items-center gap-2">
                    <span
                      className="font-mono text-xs font-bold tracking-widest uppercase"
                      style={{ color: prob.accentColor }}
                    >
                      {prob.code}
                    </span>
                  </div>

                  <h3 className="font-space text-xl sm:text-2xl font-bold text-[#EDEFF6] group-hover:text-white transition-colors">
                    {prob.title}
                  </h3>
                </div>

                {/* Right Body Explanation & Data Metric */}
                <div className="lg:col-span-5 space-y-4">
                  <p className="text-[#8991AC] text-sm leading-relaxed">
                    {prob.body}
                  </p>

                  <div className="inline-block bg-[#080B14] border border-[#232B45] px-3 py-1.5 rounded font-mono text-[11px] text-[#8991AC]">
                    <span className="text-[#EDEFF6] font-semibold">{prob.metric}</span>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
