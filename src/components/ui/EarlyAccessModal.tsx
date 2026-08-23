"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { X, CheckCircle2, ShieldCheck, ArrowRight, Lock } from "lucide-react";

interface EarlyAccessModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function EarlyAccessModal({ isOpen, onClose }: EarlyAccessModalProps) {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [company, setCompany] = useState("");
  const [system, setSystem] = useState("QuickBooks Online");
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
    }, 800);
  };

  const handleReset = () => {
    setSubmitted(false);
    setEmail("");
    setName("");
    setCompany("");
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-[#080B14]/85 backdrop-blur-md"
          />

          {/* Modal Box */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 10 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className="relative w-full max-w-lg bg-[#0E1424] border border-[#232B45] rounded-xl shadow-2xl overflow-hidden z-10 p-6 sm:p-8"
          >
            {/* Corner Decorative Accent */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-[#F2B705]/5 rounded-bl-full pointer-events-none" />

            {/* Close Button */}
            <button
              onClick={onClose}
              className="absolute top-5 right-5 text-[#8991AC] hover:text-[#EDEFF6] transition-colors p-1 rounded-md hover:bg-[#161D33]"
              aria-label="Close modal"
            >
              <X className="w-5 h-5" />
            </button>

            {!submitted ? (
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <span className="inline-block w-2 h-2 rounded-full bg-[#3FE0C5] animate-pulse" />
                  <span className="font-mono text-xs text-[#3FE0C5] uppercase tracking-wider">
                    PRIORITY INVITATION
                  </span>
                </div>

                <h3 className="font-space text-2xl sm:text-3xl font-bold text-[#EDEFF6] mb-2 tracking-tight">
                  Request Early Access
                </h3>
                <p className="text-[#8991AC] text-sm leading-relaxed mb-6">
                  Join selected inventory-heavy businesses getting continuous capital intelligence. Read-only integration setup in under 5 minutes.
                </p>

                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label className="block font-mono text-xs uppercase text-[#8991AC] mb-1">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="e.g. Rahul Sharma"
                      className="w-full bg-[#161D33] border border-[#232B45] focus:border-[#3FE0C5] focus:outline-none rounded-lg px-4 py-2.5 text-[#EDEFF6] text-sm placeholder-[#8991AC]/50 transition-colors"
                    />
                  </div>

                  <div>
                    <label className="block font-mono text-xs uppercase text-[#8991AC] mb-1">
                      Work Email *
                    </label>
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="rahul@company.com"
                      className="w-full bg-[#161D33] border border-[#232B45] focus:border-[#3FE0C5] focus:outline-none rounded-lg px-4 py-2.5 text-[#EDEFF6] text-sm placeholder-[#8991AC]/50 transition-colors"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block font-mono text-xs uppercase text-[#8991AC] mb-1">
                        Company / SME Name
                      </label>
                      <input
                        type="text"
                        value={company}
                        onChange={(e) => setCompany(e.target.value)}
                        placeholder="Apex Logistics Ltd"
                        className="w-full bg-[#161D33] border border-[#232B45] focus:border-[#3FE0C5] focus:outline-none rounded-lg px-4 py-2.5 text-[#EDEFF6] text-sm placeholder-[#8991AC]/50 transition-colors"
                      />
                    </div>

                    <div>
                      <label className="block font-mono text-xs uppercase text-[#8991AC] mb-1">
                        Primary System
                      </label>
                      <select
                        value={system}
                        onChange={(e) => setSystem(e.target.value)}
                        className="w-full bg-[#161D33] border border-[#232B45] focus:border-[#3FE0C5] focus:outline-none rounded-lg px-3 py-2.5 text-[#EDEFF6] text-sm transition-colors cursor-pointer"
                      >
                        <option value="QuickBooks Online">QuickBooks Online</option>
                        <option value="Tally Prime">Tally Prime</option>
                        <option value="Zoho Books">Zoho Books</option>
                        <option value="Odoo ERP">Odoo ERP</option>
                        <option value="SAP / Custom">SAP / Custom ERP</option>
                      </select>
                    </div>
                  </div>

                  <div className="pt-2">
                    <button
                      type="submit"
                      disabled={loading}
                      className="w-full bg-[#F2B705] hover:bg-[#F2B705]/90 text-[#080B14] font-space font-bold py-3 px-6 rounded-lg text-sm transition-all duration-200 shadow-lg shadow-[#F2B705]/15 flex items-center justify-center gap-2 group cursor-pointer"
                    >
                      {loading ? (
                        <span className="font-mono text-xs tracking-widest uppercase">INITIATING TELEMETRY SCAN...</span>
                      ) : (
                        <>
                          <span>Request Access & Capital Audit</span>
                          <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                        </>
                      )}
                    </button>
                  </div>

                  <div className="flex items-center justify-center gap-2 text-xs text-[#8991AC] pt-2">
                    <Lock className="w-3.5 h-3.5 text-[#3FE0C5]" />
                    <span>Read-only connection • SOC2 Type II Certified • Zero data alteration</span>
                  </div>
                </form>
              </div>
            ) : (
              <div className="text-center py-4 space-y-4">
                <div className="w-12 h-12 rounded-full bg-[#F2B705]/10 border border-[#F2B705]/30 text-[#F2B705] flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-6 h-6" />
                </div>

                <div className="space-y-1">
                  <span className="font-mono text-xs text-[#3FE0C5] uppercase tracking-widest">
                    SYSTEM QUEUED — STATUS: ACTIVE
                  </span>
                  <h3 className="font-space text-2xl font-bold text-[#EDEFF6]">
                    Capital Access Reserved
                  </h3>
                </div>

                <p className="text-[#8991AC] text-sm max-w-sm mx-auto leading-relaxed">
                  Thank you, <strong className="text-[#EDEFF6]">{name || "Partner"}</strong>. We've queued early access for <strong className="text-[#EDEFF6]">{company || "your business"}</strong> using <span className="text-[#3FE0C5] font-mono">{system}</span>.
                </p>

                <div className="bg-[#161D33] border border-[#232B45] rounded-lg p-4 text-left font-mono text-xs space-y-1.5 text-[#8991AC]">
                  <div className="flex justify-between text-[#EDEFF6]">
                    <span>RECOVERY SCANNER STATUS:</span>
                    <span className="text-[#3FE0C5]">READY</span>
                  </div>
                  <div className="flex justify-between">
                    <span>ESTIMATED ONBOARDING:</span>
                    <span>WITHIN 24 HOURS</span>
                  </div>
                  <div className="flex justify-between">
                    <span>SECURITY ENCRYPTION:</span>
                    <span>256-BIT TLS 1.3</span>
                  </div>
                </div>

                <button
                  onClick={handleReset}
                  className="w-full bg-[#161D33] hover:bg-[#232B45] border border-[#232B45] text-[#EDEFF6] font-space text-sm py-2.5 rounded-lg transition-colors cursor-pointer"
                >
                  Close Window
                </button>
              </div>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
