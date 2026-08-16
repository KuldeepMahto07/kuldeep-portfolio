"use client";

import { useEffect, useState } from "react";
import Lenis from "lenis";
import { gsap, ScrollTrigger } from "@/hooks/useGsap";
import { LenisContext } from "@/hooks/useLenis";
import { useMotionPreference } from "@/hooks/useMotionPreference";

/**
 * Lenis + ScrollTrigger integration (spec §01).
 *
 * Reference uses Lenis 1.3.1 with default `lerp: 0.1` — weighted but still
 * responsive. Lenis is driven off GSAP's ticker so both share a single RAF
 * loop and ScrollTrigger positions stay synchronised.
 *
 * Disabled entirely under prefers-reduced-motion (native scrolling instead).
 */
export default function SmoothScroll({ children }: { children: React.ReactNode }) {
  const { reduced, ready } = useMotionPreference();
  const [lenis, setLenis] = useState<Lenis | null>(null);

  useEffect(() => {
    if (!ready || reduced) return;

    const instance = new Lenis({
      lerp: 0.1,
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 1,
      syncTouch: false, // native touch scrolling on mobile
    });

    // Keep ScrollTrigger in lockstep with Lenis' virtual scroll position.
    instance.on("scroll", ScrollTrigger.update);

    const raf = (time: number) => instance.raf(time * 1000);
    gsap.ticker.add(raf);
    gsap.ticker.lagSmoothing(0);

    setLenis(instance);
    // Exposed for debugging and automated scroll verification. Driving scroll
    // through Lenis (rather than window.scrollTo) is the only way to move the
    // page without fighting its animated position.
    (window as unknown as { __lenis?: Lenis }).__lenis = instance;

    return () => {
      gsap.ticker.remove(raf);
      instance.destroy();
      delete (window as unknown as { __lenis?: Lenis }).__lenis;
      setLenis(null);
    };
  }, [ready, reduced]);

  return <LenisContext.Provider value={lenis}>{children}</LenisContext.Provider>;
}
