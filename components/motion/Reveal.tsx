"use client";

import { useRef, type ReactNode } from "react";
import { gsap, useGsapContext } from "@/hooks/useGsap";

type Props = {
  children: ReactNode;
  className?: string;
  /** Animate direct children in sequence instead of the wrapper itself. */
  stagger?: number;
  y?: number;
  duration?: number;
  delay?: number;
  ease?: string;
  start?: string;
  /** Selector for the elements to stagger (defaults to direct children). */
  childSelector?: string;
  as?: "div" | "ul" | "section";
};

/**
 * Combined translate + fade reveal, used where a mask would be overkill
 * (metadata, chips, list rows). Per spec §19 this is never the *only*
 * technique on a section — it accompanies masked text and clipped images.
 */
export default function Reveal({
  children,
  className,
  stagger = 0.06,
  y = 40,
  duration = 0.9,
  delay = 0,
  ease = "power3.out",
  start = "top 85%",
  childSelector,
  as = "div",
}: Props) {
  const ref = useRef<HTMLDivElement>(null);

  useGsapContext(
    ({ scope }) => {
      if (!scope) return;
      const targets: Element[] = childSelector
        ? Array.from(scope.querySelectorAll(childSelector))
        : Array.from(scope.children);
      if (!targets.length) return;

      gsap.fromTo(
        targets,
        { y, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration,
          ease,
          stagger,
          delay,
          scrollTrigger: { trigger: scope, start, once: true },
        },
      );
    },
    ref,
    [stagger, y, duration, delay, ease, start, childSelector],
  );

  const Tag = as;
  return (
    <Tag ref={ref as never} className={className}>
      {children}
    </Tag>
  );
}
