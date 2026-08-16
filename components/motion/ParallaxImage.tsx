"use client";

import { useRef, type ReactNode } from "react";
import { gsap, useGsapContext } from "@/hooks/useGsap";

type Props = {
  children: ReactNode;
  className?: string;
  /** yPercent travel; positive means it lags the scroll. */
  amount?: number;
  /** Also drift horizontally (used by the oversized section numerals). */
  xAmount?: number;
};

/**
 * Generic scrubbed parallax wrapper (spec §10, §13).
 * Always `ease: "none"` — anything scroll-linked in the reference is linear.
 */
export default function ParallaxLayer({ children, className, amount = 8, xAmount = 0 }: Props) {
  const ref = useRef<HTMLDivElement>(null);

  useGsapContext(
    ({ scope }) => {
      if (!scope) return;
      gsap.fromTo(
        scope,
        { yPercent: -amount, xPercent: xAmount ? -xAmount : 0 },
        {
          yPercent: amount,
          xPercent: xAmount ? xAmount : 0,
          ease: "none",
          scrollTrigger: {
            trigger: scope,
            start: "top bottom",
            end: "bottom top",
            scrub: true,
          },
        },
      );
    },
    ref,
    [amount, xAmount],
  );

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}
