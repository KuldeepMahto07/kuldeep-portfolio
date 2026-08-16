"use client";

import { useRef } from "react";
import SplitText, { type SplitMode } from "./SplitText";
import { gsap, useGsapContext } from "@/hooks/useGsap";

type Props = {
  text: string;
  mode?: SplitMode;
  as?: "h1" | "h2" | "h3" | "p" | "span" | "div";
  className?: string;
  lines?: string[];
  /** Per-unit stagger. Reference uses tiny values (0.01–0.06). */
  stagger?: number;
  delay?: number;
  duration?: number;
  ease?: string;
  /** ScrollTrigger start; `null` plays immediately (hero use). */
  start?: string | null;
};

/**
 * Scroll-triggered masked text reveal (spec §02).
 *
 * Defaults mirror the reference: units start at translateY(110%) inside an
 * overflow-hidden mask and travel to 0 over a short duration with a very
 * small stagger, fired once at "top 85%".
 */
export default function TextReveal({
  text,
  mode = "words",
  as = "p",
  className,
  lines,
  stagger = 0.045,
  delay = 0,
  duration = 0.7,
  ease = "power3.out",
  start = "top 85%",
}: Props) {
  const ref = useRef<HTMLElement>(null);

  useGsapContext(
    ({ scope }) => {
      if (!scope) return;
      const targets = scope.querySelectorAll("[data-split-inner]");
      if (!targets.length) return;

      // `y: 0` is essential: the CSS pre-state (`translateY(110%)`) would
      // otherwise be parsed by GSAP into its own `y` and *added* to
      // yPercent, leaving the text stranded when yPercent reaches 0.
      gsap.set(targets, { yPercent: 110, y: 0 });
      gsap.to(targets, {
        yPercent: 0,
        y: 0,
        duration,
        ease,
        stagger,
        delay,
        ...(start
          ? { scrollTrigger: { trigger: scope, start, once: true } }
          : {}),
      });
    },
    ref,
    [text, mode, stagger, delay, duration, ease, start],
  );

  return <SplitText ref={ref} text={text} mode={mode} as={as} className={className} lines={lines} />;
}
