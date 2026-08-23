"use client";

import React from "react";
import { motion } from "motion/react";
import { XCircle, CheckCircle2 } from "lucide-react";

export function Positioning() {
  const contrasts = [
    {
      notTag: "NOT AN ACCOUNTING REPLACEMENT",
      notText: "We don't replace QuickBooks, Tally, or Zoho Books.",
      isTag: "THE INTELLIGENCE LAYER",
      isText: "An intelligence layer sitting above your existing stack, unifying ledgers without requiring zero-day software migrations.",
    },
    {
      notTag: "NOT JUST INVENTORY TRACKER",
      notText: "We don't just count boxes or print barcode labels.",
      isTag: "CAPITAL & CASH CONTEXT",
      isText: "Inventory analyzed continuously in the context of live sales run-rates, vendor POs, and cash flow obligations.",
    },
    {
      notTag: "NOT A LIQUIDATION DUMP SITE",
      notText: "We aren't a scrap directory or discount marketplace.",
      isTag: "PRE-EMPTIVE COMMERCIAL RECOVERY",
      isText: "We score and optimize trapped value *before* you're forced to write it off, then connect slow-moving SKUs directly to verified B2B buyers.",
    },
    {
      notTag: "NOT A CHATBOT OR STATIC DASHBOARD",
      notText: "Not another chart generator that requires human analysis.",
      isTag: "AUTONOMOUS OPERATING LOOP",
      isText: "A continuous 5-stage telemetry loop (SEE → THINK → ACT) that detects leaks and executes recommendations autonomously.",
    },
  ];

  return (
    <section id="positioning" className="py-24 md:py-36 bg-[#0E1424] border-y border-[#232B45] relative">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-2xl mb-16 space-y-3">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#F2B705]" />
            <span className="font-mono text-xs text-[#F2B705] uppercase tracking-widest font-semibold">
              MARKET POSITIONING
            </span>
          </div>

          <h2 className="font-space text-3xl sm:text-4xl lg:text-5xl font-bold text-[#EDEFF6] tracking-tight">
            What RECLAIM is (and what it is not)
          </h2>

          <p className="text-[#8991AC] text-base leading-relaxed">
            Clear contrast matters. RECLAIM does not compete with your accounting software — it turns its passive data into active cash flow.
          </p>
        </div>

        {/* Contrast List */}
        <div className="space-y-6">
          {contrasts.map((c, idx) => (
            <motion.div
              key={c.notTag}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.4, delay: idx * 0.08 }}
              className="bg-[#161D33] border border-[#232B45] rounded-xl p-6 sm:p-8 grid grid-cols-1 lg:grid-cols-12 gap-6 items-center"
            >
              {/* "NOT" Column (Muted / Strike-through style) */}
              <div className="lg:col-span-5 space-y-2 border-b lg:border-b-0 lg:border-r border-[#232B45] pb-4 lg:pb-0 lg:pr-6">
                <div className="flex items-center gap-2 text-[#8991AC]/70">
                  <XCircle className="w-4 h-4 text-[#8991AC]/50" />
                  <span className="font-mono text-xs font-bold tracking-wider line-through">
                    {c.notTag}
                  </span>
                </div>
                <p className="text-[#8991AC] text-sm leading-relaxed">
                  {c.notText}
                </p>
              </div>

              {/* "IS" Column (Full Weight / Gold Accent) */}
              <div className="lg:col-span-7 space-y-2 lg:pl-4">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#F2B705]" />
                  <span className="font-mono text-xs font-bold text-[#F2B705] tracking-wider uppercase">
                    {c.isTag}
                  </span>
                </div>
                <p className="text-[#EDEFF6] font-space text-base font-semibold leading-relaxed">
                  {c.isText}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
