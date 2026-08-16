"use client";

import { useEffect, useRef, type ElementType, type ReactNode } from "react";
import { gsap } from "@/hooks/useGsap";
import { useMotionPreference } from "@/hooks/useMotionPreference";
import { useNormalizedPointer } from "@/hooks/useMousePosition";

type Props = {
  children: ReactNode;
  as?: ElementType;
  className?: string;
  /** Peak travel in px. Kept small so targets stay easy to click (spec §05). */
  strength?: number;
  href?: string;
  target?: string;
  rel?: string;
  type?: "button" | "submit";
  "data-cursor"?: string;
  "aria-label"?: string;
};

/**
 * Magnetic hover (spec §05): content drifts toward the cursor, springs back
 * on leave. Uses gsap.quickTo for allocation-free per-frame updates, and is
 * inert without a fine pointer or under reduced motion.
 */
export default function MagneticButton({
  children,
  as = "button",
  className,
  strength = 12,
  ...rest
}: Props) {
  const ref = useRef<HTMLElement>(null);
  const { reduced, finePointer, ready } = useMotionPreference();
  const { measure, normalize } = useNormalizedPointer(ref);

  useEffect(() => {
    if (!ready || reduced || !finePointer) return;
    const el = ref.current;
    if (!el) return;

    const xTo = gsap.quickTo(el, "x", { duration: 0.5, ease: "power3.out" });
    const yTo = gsap.quickTo(el, "y", { duration: 0.5, ease: "power3.out" });

    const onEnter = () => measure();
    const onMove = (e: PointerEvent) => {
      const { x, y } = normalize(e);
      xTo(x * strength);
      yTo(y * strength * 0.7);
    };
    const onLeave = () => {
      // Slight overshoot on return — mirrors the reference's overshoot curve.
      gsap.to(el, { x: 0, y: 0, duration: 0.7, ease: "elastic.out(1, 0.45)" });
    };

    el.addEventListener("pointerenter", onEnter);
    el.addEventListener("pointermove", onMove);
    el.addEventListener("pointerleave", onLeave);
    window.addEventListener("resize", measure);

    return () => {
      el.removeEventListener("pointerenter", onEnter);
      el.removeEventListener("pointermove", onMove);
      el.removeEventListener("pointerleave", onLeave);
      window.removeEventListener("resize", measure);
      gsap.killTweensOf(el);
    };
  }, [ready, reduced, finePointer, strength, measure, normalize]);

  const Tag = as as ElementType;
  return (
    <Tag ref={ref} className={className} {...rest}>
      {children}
    </Tag>
  );
}
