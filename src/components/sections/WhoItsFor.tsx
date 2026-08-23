"use client";

import React from "react";
import { motion } from "motion/react";
import { CheckCircle, ShieldCheck, Factory, ShoppingCart, Truck, Store, UtensilsCrossed, Hotel } from "lucide-react";

export function WhoItsFor() {
  const profiles = [
    {
      code: "PROFILE 01",
      category: "D2C & E-COMMERCE",
      title: "Multi-Channel Retailers",
      line: "SKUs spread across Shopify, Amazon, and offline warehouses with seasonal demand volatility.",
      icon: ShoppingCart,
      scale: "100–10,000 SKUs",
    },
    {
      code: "PROFILE 02",
      category: "MANUFACTURING",
      title: "Discrete & Process Manufacturers",
      line: "Raw material inventory, WIP components, and finished goods tied up across ERP ledgers.",
      icon: Factory,
      scale: "₹50L–₹25Cr Turnover",
    },
    {
      code: "PROFILE 03",
      category: "WHOLESALE",
      title: "Regional Distributors",
      line: "High-volume bulk stock, expiring batches, and slow-moving SKUs choking warehouse space.",
      icon: Truck,
      scale: "Multi-Warehouse Ops",
    },
    {
      code: "PROFILE 04",
      category: "RETAIL CHAINS",
      title: "Multi-Location Store Networks",
      line: "Imbalanced store-level inventory where Location A has overstock while Location B faces stockouts.",
      icon: Store,
      scale: "5–50 Store Locations",
    },
    {
      code: "PROFILE 05",
      category: "HOSPITALITY",
      title: "Hotel Groups & Chains",
      line: "Capital trapped in central linen, operating supplies, F&B reserves, and equipment stock.",
      icon: Hotel,
      scale: "Central Procurement",
    },
    {
      code: "PROFILE 06",
      category: "FOOD & BEVERAGE",
      title: "Restaurant Groups & Kitchens",
      line: "High-perishable inventories requiring tight expiry window monitoring and rapid liquidation.",
      icon: UtensilsCrossed,
      scale: "Perishable Batch Focus",
    },
  ];

  return (
    <section id="who-its-for" className="py-20 md:py-32 bg-[#080B14] relative">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-2xl mb-16 space-y-3">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#3FE0C5]" />
            <span className="font-mono text-xs text-[#3FE0C5] uppercase tracking-widest font-semibold">
              TARGET OPERATING SCOPE
            </span>
          </div>

          <h2 className="font-space text-3xl sm:text-4xl lg:text-5xl font-bold text-[#EDEFF6] tracking-tight">
            Built for inventory-heavy businesses
          </h2>

          <p className="text-[#8991AC] text-base leading-relaxed">
            RECLAIM operates best where physical inventory and working capital friction intersect.
          </p>
        </div>

        {/* High-Density Telemetry Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {profiles.map((prof, idx) => {
            const IconComp = prof.icon;
            return (
              <motion.div
                key={prof.code}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.4, delay: idx * 0.08 }}
                className="bg-[#0E1424] border border-[#232B45] hover:border-[#3FE0C5]/50 rounded-xl p-6 transition-all duration-200 group flex flex-col justify-between"
              >
                <div className="space-y-4">
                  {/* Top Bar: Mono Code + Category */}
                  <div className="flex items-center justify-between border-b border-[#232B45] pb-3 font-mono text-xs">
                    <span className="text-[#3FE0C5] font-bold">{prof.code}</span>
                    <span className="text-[#8991AC] text-[10px] uppercase tracking-wider">
                      {prof.category}
                    </span>
                  </div>

                  {/* Title & Icon */}
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-lg bg-[#161D33] border border-[#232B45] text-[#3FE0C5] flex items-center justify-center shrink-0">
                      <IconComp className="w-4 h-4" />
                    </div>
                    <h3 className="font-space font-bold text-lg text-[#EDEFF6] group-hover:text-white transition-colors">
                      {prof.title}
                    </h3>
                  </div>

                  {/* Supporting line */}
                  <p className="text-[#8991AC] text-xs leading-relaxed">
                    {prof.line}
                  </p>
                </div>

                {/* Bottom Scale Pill */}
                <div className="mt-6 pt-3 border-t border-[#232B45]/60 flex items-center justify-between font-mono text-[11px]">
                  <span className="text-[#8991AC]">OPERATIONAL PROFILE:</span>
                  <span className="text-[#EDEFF6] font-semibold">{prof.scale}</span>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
