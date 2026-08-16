"use client";

import { useCallback, useRef } from "react";

export type NormalizedPointer = {
  /** -1 (left) .. 1 (right) */
  x: number;
  /** -1 (top) .. 1 (bottom) */
  y: number;
};

/**
 * Normalises a pointer event to -1..1 within an element's bounds.
 * Used for mouse-driven image parallax (spec §09) and magnetic hover (§05).
 *
 * Reads the rect on pointer-enter and caches it, so mousemove never triggers
 * a layout read (spec §23 — avoid repeated layout calculations).
 */
export function useNormalizedPointer(ref: React.RefObject<HTMLElement | null>) {
  const rect = useRef<DOMRect | null>(null);

  const measure = useCallback(() => {
    rect.current = ref.current?.getBoundingClientRect() ?? null;
  }, [ref]);

  const normalize = useCallback((e: { clientX: number; clientY: number }): NormalizedPointer => {
    const r = rect.current;
    if (!r || r.width === 0 || r.height === 0) return { x: 0, y: 0 };
    return {
      x: (e.clientX - (r.left + r.width / 2)) / (r.width / 2),
      y: (e.clientY - (r.top + r.height / 2)) / (r.height / 2),
    };
  }, []);

  return { measure, normalize };
}
