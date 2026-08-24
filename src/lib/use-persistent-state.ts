"use client";

import { useCallback, useEffect, useRef, useState } from "react";

/**
 * State that survives refreshes via localStorage.
 * Hydrates after mount to avoid SSR markup mismatches.
 */
export function usePersistentState<T>(key: string, initial: T | (() => T)) {
  const initialRef = useRef<T | (() => T)>(initial);

  const [value, setValue] = useState<T>(() =>
    typeof initialRef.current === "function"
      ? (initialRef.current as () => T)()
      : initialRef.current
  );

  useEffect(() => {
    try {
      const raw = window.localStorage.getItem(key);
      if (raw != null) setValue(JSON.parse(raw) as T);
    } catch {
      /* corrupted entry — fall back to initial */
    }
  }, [key]);

  const set = useCallback(
    (updater: T | ((prev: T) => T)) => {
      setValue((prev) => {
        const next =
          typeof updater === "function" ? (updater as (p: T) => T)(prev) : updater;
        try {
          window.localStorage.setItem(key, JSON.stringify(next));
        } catch {
          /* storage full/unavailable */
        }
        return next;
      });
    },
    [key]
  );

  return [value, set] as const;
}

export function readSession(): { name: string; email: string } | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = window.localStorage.getItem("rc-session");
    if (!raw) return null;
    const parsed = JSON.parse(raw) as { name?: string; email?: string };
    if (!parsed?.name || !parsed?.email) return null;
    return { name: parsed.name, email: parsed.email };
  } catch {
    return null;
  }
}

export function signIn(name: string, email: string) {
  window.localStorage.setItem("rc-session", JSON.stringify({ name, email }));
}

export function signOut() {
  window.localStorage.removeItem("rc-session");
}
