"use client";

import React from "react";
import { cn } from "@/lib/utils";

export interface ProgressBarProps {
  value: number;        // percentage (0-100)
  height?: "sm" | "md" | "lg";
  showLabel?: boolean;
  className?: string;
}

export const ProgressBar = ({ value, height = "md", showLabel = true, className }: ProgressBarProps) => {
  const heightMap = { sm: "h-1.5", md: "h-2.5", lg: "h-3" };
  
  return (
    <div className={cn("w-full rounded-md overflow-hidden bg-[#232B45] relative", heightMap[height], className)}>
      <div 
        className="bg-gradient-to-r from-[#3FE0C5] to-[#F2B705] h-full transition-all duration-500 ease-out rounded-md"
        style={{ width: `${Math.min(Math.max(value, 0), 100)}%` }}
        aria-valuenow={value}
        aria-valuemin={0}
        aria-valuemax={100}
      />
      {showLabel && value > 0 && (
        <span className="absolute left-2 top-1/2 -translate-y-1/2 text-[10px] font-mono text-[#EDEFF6]">
          {value}%
        </span>
      )}
    </div>
  );
};

ProgressBar.displayName = "ProgressBar";