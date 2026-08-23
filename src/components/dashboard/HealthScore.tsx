"use client";

import React from "react";
import { cn } from "@/lib/utils";
import { ProgressBar } from "@/components/ui/ProgressBar";


export interface HealthScoreProps {
  score: number;
  previousScore?: number;
  showTrend?: boolean;
}

export function HealthScore({ score, previousScore = 81, showTrend = true }: HealthScoreProps) {
  const trendDown = previousScore && score < previousScore;
  const trendClass = trendDown ? "text-danger-600" : "text-success-600";
  const trendIcon = trendDown ? "M6 2a2 2 0 110-4 2 2 0 012 2zM2 4a2 2 0 00-2 2v2a2 2 0 002 2h2l2-3h6l2 3h2a2 2 0 002-2V4z" : "M6 18a2 2 0 100-4 2 2 0 002 2zM2 16a2 2 0 00-2 2v2a2 2 0 002 2h2l2-3h6l2 3h2a2 2 0 002-2v-2a2 2 0 00-2-2z";

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold text-gray-900">Business Health Score</h2>
        {showTrend && (
          <span className={cn("text-xs", trendClass)}>
            {trendDown ? "Down from" : "Up from"} {previousScore}
          </span>
        )}
      </div>
      
      <ProgressBar value={score} showLabel={true} />
      
      <div className="flex justify-between text-xs text-gray-500 mt-2">
        <span>Poor</span>
        <span>Fair</span>
        <span>Good</span>
        <span>Excellent</span>
      </div>
    </div>
  );
}