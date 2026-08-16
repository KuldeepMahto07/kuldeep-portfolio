"use client";

import { useRef, type ReactNode } from "react";
import { gsap, useGsapContext } from "@/hooks/useGsap";

/**
 * Section handoff (spec §20).
 *
 * Extracted from the reference [values verbatim]:
 *   gsap.to(blockRef, { scale: .95, y: 42, opacity: 0, ease: "none",
 *     scrollTrigger: { trigger: nextSectionRef,
 *                      start: "top 100%", end: "top 40%", scrub: true } })
 *
 * Note the trigger is a *different, later* element than the one being
 * animated: as the next section rises into view, the current block recedes
 * and dissolves. That handoff is what stops section changes feeling abrupt.
 *
 * Getting this wrong is easy — pointing the trigger at the animated element
 * itself makes an at-the-top block (like the hero) load already faded out,
 * because its scrub window has elapsed before the user scrolls at all.
 *
 * Skipped below the tablet breakpoint, where it costs more than it adds.
 */
export default function SectionTransition({
  children,
  className,
  /** Selector for the *following* section that drives the handoff. */
  triggerSelector,
  disabled = false,
}: {
  children: ReactNode;
  className?: string;
  triggerSelector: string;
  disabled?: boolean;
}) {
  const ref = useRef<HTMLDivElement>(null);

  useGsapContext(
    ({ scope }) => {
      if (!scope || disabled) return;
      // Kept above the mobile breakpoint only. Must stay below 1024 so the
      // 1024-wide reference viewport still gets the handoff.
      if (window.matchMedia("(max-width: 640px)").matches) return;

      const trigger = document.querySelector(triggerSelector);
      if (!trigger) return;

      gsap.to(scope, {
        scale: 0.95,
        y: 42,
        opacity: 0,
        ease: "none",
        scrollTrigger: {
          trigger,
          start: "top 100%",
          end: "top 40%",
          scrub: true,
        },
      });
    },
    ref,
    [disabled, triggerSelector],
  );

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}
