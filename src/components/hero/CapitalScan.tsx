"use client";

import React, { useState, useEffect } from "react";
import { motion, useReducedMotion } from "motion/react";
import { TickingNumber } from "@/components/ui/TickingNumber";
import { AlertCircle, RefreshCw, Layers, Shield, Zap } from "lucide-react";

interface NodeData {
  id: string;
  name: string;
  code: string;
  x: number;
  y: number;
  status: "active" | "trapped" | "flowing";
  valStr: string;
  valNum: number;
  detail: string;
}

export function CapitalScan() {
  const reduceMotion = useReducedMotion();
  const [activeSweep, setActiveSweep] = useState(0);
  const [highlightedNode, setHighlightedNode] = useState<string | null>("inventory");
  const [scanComplete, setScanComplete] = useState(false);

  const nodes: NodeData[] = [
    {
      id: "cash",
      name: "Cash Flow",
      code: "NODE-01",
      x: 100,
      y: 90,
      status: "flowing",
      valStr: "₹42.5L",
      valNum: 4250000,
      detail: "Operational Reserve",
    },
    {
      id: "inventory",
      name: "Inventory Stock",
      code: "NODE-02",
      x: 320,
      y: 160,
      status: "trapped",
      valStr: "₹18.45L",
      valNum: 1845000,
      detail: "Overstock (60d unsold)",
    },
    {
      id: "sales",
      name: "Sales / Demand",
      code: "NODE-03",
      x: 290,
      y: 310,
      status: "flowing",
      valStr: "1,420 SKU/mo",
      valNum: 1420,
      detail: "Run-rate decelerating",
    },
    {
      id: "procurement",
      name: "Procurement",
      code: "NODE-04",
      x: 110,
      y: 290,
      status: "flowing",
      valStr: "₹12.1L/mo",
      valNum: 1210000,
      detail: "Active POs unchanged",
    },
    {
      id: "receivables",
      name: "Receivables",
      code: "NODE-05",
      x: 330,
      y: 60,
      status: "flowing",
      valStr: "₹6.8L",
      valNum: 680000,
      detail: "DSO 42 days",
    },
  ];

  useEffect(() => {
    if (reduceMotion) {
      setScanComplete(true);
      setHighlightedNode("inventory");
      return;
    }

    const interval = setInterval(() => {
      setActiveSweep((prev) => {
        const next = (prev + 1) % 360;
        if (next > 120 && next < 240) {
          setHighlightedNode("inventory");
        }
        return next;
      });
    }, 30);

    const timer = setTimeout(() => {
      setScanComplete(true);
    }, 1800);

    return () => {
      clearInterval(interval);
      clearTimeout(timer);
    };
  }, [reduceMotion]);

  return (
    <div className="w-full bg-[#0E1424] border border-[#232B45] rounded-xl overflow-hidden shadow-2xl relative">
      {/* Top Telemetry Header Bar */}
      <div className="bg-[#161D33]/80 border-b border-[#232B45] px-4 py-2.5 flex items-center justify-between font-mono text-xs">
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-[#3FE0C5] animate-ping" />
            <span className="text-[#3FE0C5] font-semibold tracking-wider">
              LIVE CAPITAL SCAN
            </span>
          </div>
          <span className="text-[#232B45]">|</span>
          <span className="text-[#8991AC] hidden sm:inline">
            SWEEP FREQ: 0.45 Hz
          </span>
        </div>

        <div className="flex items-center gap-3">
          <span className="text-[#8991AC] text-[11px]">
            PROTOCOL: <strong className="text-[#EDEFF6]">READ-ONLY TLS 1.3</strong>
          </span>
        </div>
      </div>

      {/* Main Canvas SVG Area */}
      <div className="relative aspect-[4/3] sm:aspect-[16/10] w-full p-4 sm:p-6 bg-[#080B14] bg-terminal-grid overflow-hidden">
        {/* Radar Concentric Rings */}
        <svg className="absolute inset-0 w-full h-full pointer-events-none" viewBox="0 0 440 380">
          <defs>
            {/* Linear Gradient for radar beam sweep */}
            <radialGradient id="radarGlow" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#3FE0C5" stopOpacity="0.25" />
              <stop offset="70%" stopColor="#3FE0C5" stopOpacity="0.05" />
              <stop offset="100%" stopColor="#3FE0C5" stopOpacity="0" />
            </radialGradient>

            {/* Glowing filter for Gold Node */}
            <filter id="goldGlow" x="-50%" y="-50%" width="200%" height="200%">
              <feGaussianBlur stdDeviation="4" result="coloredBlur" />
              <feMerge>
                <feMergeNode in="coloredBlur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>

          {/* Concentric Background Grid Rings */}
          <circle cx="220" cy="190" r="140" fill="none" stroke="#232B45" strokeWidth="1" strokeDasharray="3 3" />
          <circle cx="220" cy="190" r="90" fill="none" stroke="#232B45" strokeWidth="1" />
          <circle cx="220" cy="190" r="40" fill="none" stroke="#232B45" strokeWidth="1" strokeDasharray="2 2" />
          
          {/* Axis Crosshairs */}
          <line x1="80" y1="190" x2="360" y2="190" stroke="#232B45" strokeWidth="1" />
          <line x1="220" y1="50" x2="220" y2="330" stroke="#232B45" strokeWidth="1" />

          {/* Connected Network Vectors */}
          {/* Cash -> Procurement */}
          <line x1="100" y1="90" x2="110" y2="290" stroke="#3FE0C5" strokeWidth="1.5" strokeOpacity="0.5" strokeDasharray="4 4" />
          {/* Procurement -> Inventory */}
          <line x1="110" y1="290" x2="320" y2="160" stroke="#FF5C6C" strokeWidth="1.5" strokeOpacity="0.7" />
          {/* Inventory -> Sales */}
          <line x1="320" y1="160" x2="290" y2="310" stroke="#F2B705" strokeWidth="1.5" strokeOpacity="0.8" />
          {/* Sales -> Cash */}
          <line x1="290" y1="310" x2="100" y2="90" stroke="#3FE0C5" strokeWidth="1.5" strokeOpacity="0.5" />
          {/* Cash -> Receivables */}
          <line x1="100" y1="90" x2="330" y2="60" stroke="#3FE0C5" strokeWidth="1" strokeOpacity="0.4" />
          {/* Receivables -> Sales */}
          <line x1="330" y1="60" x2="290" y2="310" stroke="#3FE0C5" strokeWidth="1" strokeOpacity="0.4" />

          {/* Animated Radar Sweep Beam */}
          {!reduceMotion && (
            <g transform="translate(220, 190)">
              <g transform={`rotate(${activeSweep})`}>
                <path
                  d="M0 0 L150 -60 A150 150 0 0 1 150 0 Z"
                  fill="url(#radarGlow)"
                />
                <line x1="0" y1="0" x2="150" y2="0" stroke="#3FE0C5" strokeWidth="1.5" strokeOpacity="0.8" />
              </g>
            </g>
          )}

          {/* Business Nodes rendering */}
          {nodes.map((node) => {
            const isTrapped = node.status === "trapped";
            const isHighlighted = highlightedNode === node.id;

            return (
              <g key={node.id} className="cursor-pointer transition-all duration-300">
                {/* Outer halo */}
                {isTrapped && (
                  <circle
                    cx={node.x}
                    cy={node.y}
                    r="22"
                    fill="none"
                    stroke="#F2B705"
                    strokeWidth="1.5"
                    strokeOpacity="0.4"
                    className="animate-ping"
                  />
                )}

                {/* Node Base Ring */}
                <circle
                  cx={node.x}
                  cy={node.y}
                  r="14"
                  fill={isTrapped ? "#161D33" : "#0E1424"}
                  stroke={isTrapped ? "#F2B705" : "#3FE0C5"}
                  strokeWidth={isTrapped ? "2.5" : "1.5"}
                  filter={isTrapped ? "url(#goldGlow)" : undefined}
                />

                {/* Inner Core Dot */}
                <circle
                  cx={node.x}
                  cy={node.y}
                  r="5"
                  fill={isTrapped ? "#F2B705" : "#3FE0C5"}
                />

                {/* Node Label Text */}
                <text
                  x={node.x > 220 ? node.x + 20 : node.x - 20}
                  y={node.y - 4}
                  textAnchor={node.x > 220 ? "start" : "end"}
                  fill={isTrapped ? "#EDEFF6" : "#8991AC"}
                  className="font-space font-semibold text-[11px]"
                >
                  {node.name}
                </text>

                {/* Value Pill overlay */}
                <text
                  x={node.x > 220 ? node.x + 20 : node.x - 20}
                  y={node.y + 12}
                  textAnchor={node.x > 220 ? "start" : "end"}
                  fill={isTrapped ? "#F2B705" : "#3FE0C5"}
                  className="font-mono font-bold text-[10px]"
                >
                  {node.valStr}
                </text>
              </g>
            );
          })}
        </svg>

        {/* Live Detected Callout Box overlay */}
        <div className="absolute bottom-3 left-3 right-3 sm:bottom-4 sm:left-4 sm:right-auto sm:max-w-xs bg-[#161D33]/90 backdrop-blur-md border border-[#F2B705]/40 rounded-lg p-3 shadow-lg shadow-[#F2B705]/5">
          <div className="flex items-start gap-2.5">
            <div className="w-7 h-7 rounded-md bg-[#F2B705]/10 border border-[#F2B705]/30 text-[#F2B705] flex items-center justify-center shrink-0 mt-0.5">
              <AlertCircle className="w-4 h-4" />
            </div>
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <span className="font-mono text-[10px] uppercase text-[#F2B705] tracking-wider font-bold">
                  TRAPPED CAPITAL DETECTED
                </span>
                <span className="font-mono text-[9px] bg-[#F2B705]/20 text-[#F2B705] px-1 rounded">
                  SKU #4812
                </span>
              </div>
              <p className="font-space text-sm font-bold text-[#EDEFF6]">
                <TickingNumber value={1845000} prefix="₹" suffix="" duration={2500} />
              </p>
              <p className="text-[11px] text-[#8991AC] leading-tight">
                60 days unsold stock • Procurement active • Recovery Score™ triggered
              </p>
            </div>
          </div>
        </div>

        {/* Top Right Live Telemetry Score Instrument */}
        <div className="absolute top-3 right-3 bg-[#161D33]/90 backdrop-blur-md border border-[#232B45] rounded-lg p-3 text-right">
          <span className="font-mono text-[9px] uppercase text-[#8991AC] tracking-widest block">
            RECOVERY SCORE™
          </span>
          <div className="flex items-baseline justify-end gap-1 font-mono">
            <span className="text-2xl font-bold text-[#F2B705]">
              <TickingNumber value={87} duration={2000} />
            </span>
            <span className="text-xs text-[#8991AC]">/ 100</span>
          </div>
          <span className="font-mono text-[10px] text-[#3FE0C5] block">
            RECOVER NOW
          </span>
        </div>
      </div>

      {/* Bottom Status Bar */}
      <div className="bg-[#0E1424] border-t border-[#232B45] px-4 py-3 grid grid-cols-2 sm:grid-cols-4 gap-2 font-mono text-xs text-[#8991AC]">
        <div>
          <span className="block text-[10px] text-[#8991AC]/60">NODES CONNECTED</span>
          <span className="text-[#3FE0C5] font-semibold">5 / 5 ACTIVE</span>
        </div>
        <div>
          <span className="block text-[10px] text-[#8991AC]/60">UNIFIED MODEL</span>
          <span className="text-[#EDEFF6]">CONTINUOUS</span>
        </div>
        <div>
          <span className="block text-[10px] text-[#8991AC]/60">TRAPPED CAPITAL</span>
          <span className="text-[#F2B705] font-bold">₹18,45,000</span>
        </div>
        <div>
          <span className="block text-[10px] text-[#8991AC]/60">RECOMMENDED ACTION</span>
          <span className="text-[#3FE0C5]">PAUSE PO #812</span>
        </div>
      </div>
    </div>
  );
}
