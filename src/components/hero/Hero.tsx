"use client";

import React, { useState } from "react";
import { motion, useReducedMotion } from "motion/react";
import { CapitalScan } from "./CapitalScan";
import { EarlyAccessModal } from "@/components/ui/EarlyAccessModal";
import { ArrowRight, ShieldCheck, Activity, Database, Sparkles } from "lucide-react";

export function Hero() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const reduceMotion = useReducedMotion();

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: reduceMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 },
    },
  };


  return (
    <>
      <section className="relative pt-32 pb-20 md:pt-40 md:pb-28 overflow-hidden bg-[#080B14]">
        {/* Subtle Background Radial Glow */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#3FE0C5]/5 rounded-full blur-[140px] pointer-events-none" />
        <div className="absolute top-1/3 right-1/4 w-[400px] h-[400px] bg-[#F2B705]/5 rounded-full blur-[120px] pointer-events-none" />

        <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
            {/* Left Content Column */}
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className="lg:col-span-6 space-y-6 text-left"
            >
              {/* Eyebrow in Mono Cyan */}
              <motion.div variants={itemVariants} className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#3FE0C5]/10 border border-[#3FE0C5]/20">
                <span className="w-2 h-2 rounded-full bg-[#3FE0C5] animate-pulse" />
                <span className="font-mono text-xs text-[#3FE0C5] uppercase tracking-wider font-medium">
                  BUSINESS INTELLIGENCE, LIVE
                </span>
              </motion.div>

              {/* Main Headline in Space Grotesk */}
              <motion.h1
                variants={itemVariants}
                className="font-space text-4xl sm:text-5xl lg:text-6xl font-bold text-[#EDEFF6] leading-[1.06] tracking-tight"
              >
                Your business already made the money.{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#F2B705] via-[#F2B705] to-[#EDEFF6]">
                  It’s just trapped.
                </span>
              </motion.h1>

              {/* Subhead in Inter */}
              <motion.p
                variants={itemVariants}
                className="text-[#8991AC] text-base sm:text-lg leading-relaxed max-w-xl"
              >
                RECLAIM connects read-only to your existing accounting, inventory, and ERP tools to surface invisible cash leakage, predict overstock, and recover capital.
              </motion.p>

              {/* CTA Row */}
              <motion.div variants={itemVariants} className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
                <button
                  onClick={() => setIsModalOpen(true)}
                  className="bg-[#F2B705] hover:bg-[#F2B705]/90 text-[#080B14] font-space font-bold px-7 py-3.5 rounded-lg text-base transition-all duration-200 shadow-xl shadow-[#F2B705]/15 flex items-center justify-center gap-2 group cursor-pointer"
                >
                  <span>See what's trapped in your business</span>
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </button>

                <a
                  href="#intelligence-loop"
                  className="border border-[#232B45] hover:border-[#3FE0C5] text-[#EDEFF6] font-space font-semibold px-6 py-3.5 rounded-lg text-base transition-colors duration-200 flex items-center justify-center gap-2 hover:bg-[#161D33]"
                >
                  <Activity className="w-4 h-4 text-[#3FE0C5]" />
                  <span>How the 5-Stage Loop Works</span>
                </a>
              </motion.div>

              {/* Reassurance Micro-Trust Strip */}
              <motion.div variants={itemVariants} className="pt-4 border-t border-[#232B45]/60 flex flex-wrap items-center gap-y-2 gap-x-6 text-xs text-[#8991AC] font-mono">
                <div className="flex items-center gap-1.5">
                  <ShieldCheck className="w-4 h-4 text-[#3FE0C5]" />
                  <span>Read-Only Connection</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Database className="w-4 h-4 text-[#3FE0C5]" />
                  <span>QuickBooks • Tally • Zoho</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Sparkles className="w-4 h-4 text-[#F2B705]" />
                  <span>Zero ERP Migration</span>
                </div>
              </motion.div>
            </motion.div>

            {/* Right Column: Capital Scan Visualization */}
            <motion.div
              initial={{ opacity: 0, scale: 0.96, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="lg:col-span-6"
            >
              <CapitalScan />
            </motion.div>

          </div>
        </div>
      </section>


      {/* Early Access Modal */}
      <EarlyAccessModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </>
  );
}
