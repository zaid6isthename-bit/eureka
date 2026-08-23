"use client";

import React, { useState } from "react";
import { motion } from "motion/react";
import { ArrowRight, ShieldCheck, CheckCircle2, Lock } from "lucide-react";

export function EarlyAccessCTA() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
    }, 600);
  };

  return (
    <section className="py-24 md:py-36 bg-gradient-to-b from-[#080B14] via-[#0E1424] to-[#080B14] relative overflow-hidden">
      {/* Background Radial Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[500px] bg-[#F2B705]/5 rounded-full blur-[160px] pointer-events-none" />

      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
        <div className="max-w-3xl mx-auto space-y-8 bg-[#0E1424] border border-[#232B45] rounded-2xl p-8 sm:p-14 shadow-2xl relative overflow-hidden">
          {/* Top Pill */}
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#F2B705]/10 border border-[#F2B705]/30">
            <span className="w-2 h-2 rounded-full bg-[#F2B705] animate-ping" />
            <span className="font-mono text-xs text-[#F2B705] uppercase tracking-wider font-semibold">
              CAPITAL AUDIT INVITE
            </span>
          </div>

          {/* Headline */}
          <h2 className="font-space text-3xl sm:text-4xl lg:text-5xl font-bold text-[#EDEFF6] leading-tight tracking-tight">
            Stop letting your money sleep in unsold inventory.
          </h2>

          <p className="text-[#8991AC] text-base sm:text-lg max-w-xl mx-auto leading-relaxed">
            Connect RECLAIM to your accounting and inventory software in under 5 minutes. Run your first continuous capital scan today.
          </p>

          {/* Form */}
          {!submitted ? (
            <form onSubmit={handleSubmit} className="max-w-md mx-auto space-y-4">
              <div className="flex flex-col sm:flex-row items-stretch gap-2.5 bg-[#080B14] p-2 rounded-xl border border-[#232B45] focus-within:border-[#F2B705] transition-colors">
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your work email..."
                  className="w-full bg-transparent px-4 py-3 text-[#EDEFF6] text-sm placeholder-[#8991AC]/60 focus:outline-none font-sans"
                />
                <button
                  type="submit"
                  disabled={loading}
                  className="bg-[#F2B705] hover:bg-[#F2B705]/90 text-[#080B14] font-space font-bold px-6 py-3 rounded-lg text-sm transition-all duration-200 shadow-lg shadow-[#F2B705]/15 flex items-center justify-center gap-2 shrink-0 cursor-pointer"
                >
                  {loading ? (
                    <span className="font-mono text-xs">CONNECTING...</span>
                  ) : (
                    <>
                      <span>Get Audit</span>
                      <ArrowRight className="w-4 h-4" />
                    </>
                  )}
                </button>
              </div>

              {/* Reassurance Microcopy */}
              <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-xs text-[#8991AC] font-mono pt-2">
                <div className="flex items-center gap-1.5">
                  <Lock className="w-3.5 h-3.5 text-[#3FE0C5]" />
                  <span>No credit card required</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <ShieldCheck className="w-3.5 h-3.5 text-[#3FE0C5]" />
                  <span>5-minute read-only setup</span>
                </div>
              </div>
            </form>
          ) : (
            <div className="bg-[#080B14] border border-[#F2B705]/40 rounded-xl p-6 max-w-md mx-auto text-center space-y-3">
              <CheckCircle2 className="w-10 h-10 text-[#F2B705] mx-auto" />
              <h3 className="font-space text-xl font-bold text-[#EDEFF6]">
                Priority Scan Request Queued
              </h3>
              <p className="text-xs text-[#8991AC] font-mono">
                We sent a read-only connection link to <strong className="text-[#EDEFF6]">{email}</strong>. Check your inbox to begin telemetry.
              </p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
