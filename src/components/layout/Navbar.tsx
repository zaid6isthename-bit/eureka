"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { EarlyAccessModal } from "@/components/ui/EarlyAccessModal";

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
          scrolled
            ? "bg-[#080B14]/90 backdrop-blur-md border-b border-[#232B45] py-3.5"
            : "bg-transparent py-5"
        }`}
      >
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          {/* Brand Logo */}
          <Link href="/" className="flex items-center gap-2 group">
            <img
              src="/reclaim.png"
              alt="RECLAIM"
              className="w-8 h-8 rounded-sm transition-transform group-hover:scale-125 duration-200"
            />
            <span className="font-space font-bold text-xl sm:text-2xl tracking-tighter text-[#EDEFF6]">
              RECLAIM
            </span>
            <span className="font-mono text-[10px] uppercase text-[#3FE0C5] bg-[#3FE0C5]/10 px-1.5 py-0.5 rounded border border-[#3FE0C5]/20 hidden sm:inline-block">
              INTEL 2.0
            </span>
          </Link>

          {/* Nav Links */}
          <nav className="hidden md:flex items-center gap-8 text-sm text-[#8991AC]">
            <a
              href="#problem"
              className="hover:text-[#EDEFF6] transition-colors"
            >
              System Failure
            </a>
            <a
              href="#intelligence-loop"
              className="hover:text-[#EDEFF6] transition-colors flex items-center gap-1.5"
            >
              <span>5-Stage Loop</span>
              <span className="w-1.5 h-1.5 rounded-full bg-[#3FE0C5]" />
            </a>
            <a
              href="#recovery-score"
              className="hover:text-[#EDEFF6] transition-colors"
            >
              Recovery Score™
            </a>
            <a
              href="#who-its-for"
              className="hover:text-[#EDEFF6] transition-colors"
            >
              Scope
            </a>
            <a
              href="#positioning"
              className="hover:text-[#EDEFF6] transition-colors"
            >
              Positioning
            </a>
          </nav>

          {/* Action CTA Button */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => setIsModalOpen(true)}
              className="font-space text-xs sm:text-sm font-semibold text-[#F2B705] border border-[#F2B705]/60 hover:border-[#F2B705] hover:bg-[#F2B705]/10 px-4 py-2 rounded-lg transition-all duration-200 cursor-pointer flex items-center gap-2"
            >
              <span>Request early access</span>
            </button>
          </div>
        </div>
      </header>

      {/* Early Access Modal */}
      <EarlyAccessModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </>
  );
}
