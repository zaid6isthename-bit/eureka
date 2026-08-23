"use client";

import React from "react";
import Link from "next/link";

export function Footer() {
  return (
    <footer className="bg-[#080B14] border-t border-[#232B45] pt-16 pb-12">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 pb-12 border-b border-[#232B45]">
          {/* Brand Column */}
          <div className="md:col-span-5 space-y-4">
            <Link href="/" className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-sm bg-[#F2B705]" />
              <span className="font-space font-bold text-2xl tracking-tighter text-[#EDEFF6]">
                RECLAIM
              </span>
            </Link>

            <p className="text-[#8991AC] text-sm max-w-sm leading-relaxed">
              AI-native business operating intelligence platform. Turning fragmented accounting and inventory data into continuous capital recovery.
            </p>

            <div className="font-mono text-xs text-[#3FE0C5]">
              STATUS: TELEMETRY ENGINES ONLINE
            </div>
          </div>

          {/* Navigation Columns */}
          <div className="md:col-span-7 grid grid-cols-2 sm:grid-cols-3 gap-8 text-sm">
            <div className="space-y-3">
              <h4 className="font-mono text-xs text-[#EDEFF6] uppercase tracking-wider font-bold">
                Platform
              </h4>
              <ul className="space-y-2 text-[#8991AC]">
                <li><a href="#intelligence-loop" className="hover:text-[#EDEFF6] transition-colors">5-Stage Loop</a></li>
                <li><a href="#recovery-score" className="hover:text-[#EDEFF6] transition-colors">Recovery Score™</a></li>
                <li><a href="#problem" className="hover:text-[#EDEFF6] transition-colors">Leak Detection</a></li>
                <li><a href="#who-its-for" className="hover:text-[#EDEFF6] transition-colors">Scope & Target</a></li>
              </ul>
            </div>

            <div className="space-y-3">
              <h4 className="font-mono text-xs text-[#EDEFF6] uppercase tracking-wider font-bold">
                Integrations
              </h4>
              <ul className="space-y-2 text-[#8991AC]">
                <li><span className="text-[#EDEFF6]">QuickBooks Online</span></li>
                <li><span className="text-[#EDEFF6]">Tally Prime</span></li>
                <li><span className="text-[#EDEFF6]">Zoho Books</span></li>
                <li><span className="text-[#EDEFF6]">Odoo ERP</span></li>
              </ul>
            </div>

            <div className="space-y-3">
              <h4 className="font-mono text-xs text-[#EDEFF6] uppercase tracking-wider font-bold">
                Security & Trust
              </h4>
              <ul className="space-y-2 text-[#8991AC] font-mono text-xs">
                <li><span>SOC2 Type II</span></li>
                <li><span>256-Bit TLS 1.3</span></li>
                <li><span>Read-Only API</span></li>
                <li><span>Zero Data Mutation</span></li>
              </ul>
            </div>
          </div>
        </div>

        {/* Fine Print Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 font-mono text-xs text-[#8991AC]">
          <div>
            © {new Date().getFullYear()} RECLAIM Operating Intelligence Inc. All rights reserved.
          </div>

          <div className="flex items-center gap-6">
            <span>PRIVACY PROTOCOL</span>
            <span>TERMS OF TELEMETRY</span>
            <span>SECURITY ARCHITECTURE</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
