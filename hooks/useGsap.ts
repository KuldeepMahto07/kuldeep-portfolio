"use client";

import { useEffect, useLayoutEffect, useRef, type DependencyList, type RefObject } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useMotionPreference } from "./useMotionPreference";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

/** SSR-safe layout effect. */
export const useIsomorphicLayoutEffect =
  typeof window !== "undefined" ? useLayoutEffect : useEffect;

export { gsap, ScrollTrigger };

/**
 * Runs GSAP work inside a scoped `gsap.context()` so that every tween and
 * ScrollTrigger created inside is reverted automatically on unmount — the
 * cleanup requirement from the spec (§23).
 *
 * Skips entirely when the user prefers reduced motion.
 */
export function useGsapContext(
  setup: (ctx: { scope: HTMLElement | null }) => void,
  scopeRef: RefObject<HTMLElement | null>,
  deps: DependencyList = [],
) {
  const { reduced, ready } = useMotionPreference();
  const setupRef = useRef(setup);
  setupRef.current = setup;

  useIsomorphicLayoutEffect(() => {
    if (!ready || reduced) return;
    const scope = scopeRef.current;
    if (!scope) return;

    const ctx = gsap.context(() => setupRef.current({ scope }), scope);
    // Positions can be wrong until fonts settle and images have dimensions.
    const refresh = () => ScrollTrigger.refresh();
    if (document.fonts?.ready) void document.fonts.ready.then(refresh);

    return () => ctx.revert();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ready, reduced, ...deps]);
}
