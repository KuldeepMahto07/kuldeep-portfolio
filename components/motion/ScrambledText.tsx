"use client";

import { useEffect, useRef, useState } from "react";
import { useMotionPreference } from "@/hooks/useMotionPreference";

type Props = {
  text: string;
  className?: string;
  as?: "span" | "div";
  /** Seconds the scramble runs before fully settling. */
  duration?: number;
  /** Character pool substituted in while scrambling. */
  scrambleChars?: string;
};

/**
 * Small decode/scramble effect on hover (ANIMATION_REFERENCE §9).
 *
 * Reserved for micro-labels only — `(SERVICES)`, `(PROJECTS)`, availability
 * text. Never headings or paragraphs: those use masked reveals, and scrambling
 * body copy makes it unreadable.
 *
 * The reference locks characters progressively left-to-right rather than
 * randomising the whole string each tick, which is what makes it read as
 * "decoding" instead of noise. Layout is stable because the string length
 * never changes, and the real text stays in the DOM for assistive tech.
 *
 * Disabled on touch devices and under reduced motion.
 */
export default function ScrambledText({
  text,
  className,
  as = "span",
  duration = 0.6,
  scrambleChars = ".:",
}: Props) {
  const [display, setDisplay] = useState(text);
  const frame = useRef<number | null>(null);
  const { reduced, finePointer, ready } = useMotionPreference();
  const enabled = ready && !reduced && finePointer;

  // Keep in sync if the label itself changes.
  useEffect(() => setDisplay(text), [text]);

  useEffect(
    () => () => {
      if (frame.current !== null) cancelAnimationFrame(frame.current);
    },
    [],
  );

  const run = () => {
    if (!enabled) return;
    if (frame.current !== null) cancelAnimationFrame(frame.current);

    const start = performance.now();
    const total = duration * 1000;

    const tick = (now: number) => {
      const progress = Math.min(1, (now - start) / total);
      // Characters lock in from the left as progress advances.
      const locked = Math.floor(progress * text.length);

      setDisplay(
        Array.from(text)
          .map((char, i) => {
            if (i < locked || char === " ") return char;
            return scrambleChars[Math.floor(Math.random() * scrambleChars.length)];
          })
          .join(""),
      );

      if (progress < 1) frame.current = requestAnimationFrame(tick);
      else {
        setDisplay(text);
        frame.current = null;
      }
    };

    frame.current = requestAnimationFrame(tick);
  };

  const Tag = as;

  return (
    <Tag className={className} onPointerEnter={run}>
      {/* Real text for screen readers; the scrambled copy is decorative. */}
      <span className="visually-hidden">{text}</span>
      <span aria-hidden="true">{display}</span>
    </Tag>
  );
}
