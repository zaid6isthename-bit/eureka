import { useEffect, useRef, useState } from "react";

function stdev(vals: number[]) {
  const mean = vals.reduce((s, v) => s + v, 0) / vals.length;
  return Math.sqrt(vals.reduce((s, v) => s + (v - mean) ** 2, 0) / vals.length);
}

/**
 * Turns a static seed series into a live streaming series.
 * Every `intervalMs` the oldest point drops off and a new point is
 * appended, following the trend with bounded random noise
 * (momentum-weighted random walk clamped near the seed's range).
 * Ticks pause while the tab is hidden.
 */
export function useLiveSeries(seed: number[], intervalMs = 2000): number[] {
  const [points, setPoints] = useState<number[]>(seed);
  const bounds = useRef({
    min: Math.min(...seed),
    max: Math.max(...seed),
    sd: stdev(seed),
  });

  useEffect(() => {
    setPoints(seed);
    bounds.current = { min: Math.min(...seed), max: Math.max(...seed), sd: stdev(seed) };
  }, [seed]);

  useEffect(() => {
    const tick = () => {
      if (typeof document !== "undefined" && document.visibilityState !== "visible") return;
      setPoints((prev) => {
        const { min, max, sd } = bounds.current;
        const last = prev[prev.length - 1];
        const before = prev[prev.length - 2] ?? last;
        const drift = (last - before) * 0.25;
        const noise = (Math.random() - 0.5) * sd * 0.6;
        const pad = sd * 0.5;
        const next = Math.min(Math.max(last + drift + noise, min - pad), max + pad);
        return [...prev.slice(1), next];
      });
    };
    const id = setInterval(tick, intervalMs);
    return () => clearInterval(id);
  }, [intervalMs]);

  return points;
}
