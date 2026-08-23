"use client";

import React, { useEffect, useState } from "react";
import { useReducedMotion } from "motion/react";

interface TickingNumberProps {
  value: number;
  prefix?: string;
  suffix?: string;
  decimals?: number;
  duration?: number;
  formatter?: (val: number) => string;
  className?: string;
}

export function TickingNumber({
  value,
  prefix = "",
  suffix = "",
  decimals = 0,
  duration = 2000,
  formatter,
  className = "",
}: TickingNumberProps) {
  const [currentValue, setCurrentValue] = useState<number>(0);
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    if (reduceMotion) {
      setCurrentValue(value);
      return;
    }

    let startTime: number | null = null;
    let animationFrameId: number;

    const animateCount = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const elapsed = timestamp - startTime;
      const progress = Math.min(elapsed / duration, 1);
      
      // Mechanical stepped / ticking easing
      const easedProgress = 1 - Math.pow(1 - progress, 3);
      const nextValue = easedProgress * value;

      setCurrentValue(nextValue);

      if (progress < 1) {
        animationFrameId = requestAnimationFrame(animateCount);
      } else {
        setCurrentValue(value);
      }
    };

    animationFrameId = requestAnimationFrame(animateCount);

    return () => {
      if (animationFrameId) cancelAnimationFrame(animationFrameId);
    };
  }, [value, duration, reduceMotion]);

  const displayString = formatter
    ? formatter(currentValue)
    : currentValue.toLocaleString("en-IN", {
        maximumFractionDigits: decimals,
        minimumFractionDigits: decimals,
      });

  return (
    <span className={`font-mono tabular-nums ${className}`}>
      {prefix}
      {displayString}
      {suffix}
    </span>
  );
}
