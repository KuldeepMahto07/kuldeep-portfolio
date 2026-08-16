"use client";

import { forwardRef, useMemo } from "react";
import styles from "./SplitText.module.scss";

export type SplitMode = "lines" | "words" | "chars";

type Props = {
  text: string;
  /** How to break the text up. Mix modes across the page (spec §02). */
  mode?: SplitMode;
  /** Rendered element. */
  as?: "h1" | "h2" | "h3" | "p" | "span" | "div";
  className?: string;
  /**
   * Explicit line breaks for `mode="lines"`. When omitted the whole string
   * is one line.
   */
  lines?: string[];
};

/**
 * Splits text into masked units for GSAP to animate.
 *
 * The reference site does this by hand (`text.split(" ")` / `split("")`)
 * rather than with SplitType, so we do the same — it keeps the markup
 * server-rendered and accessible: the full string stays readable because
 * each visual unit is real text, and screen readers get an aria-label.
 *
 * Every unit is `.lineMask > .lineInner`; GSAP targets `[data-split-inner]`.
 */
const SplitText = forwardRef<HTMLElement, Props>(function SplitText(
  { text, mode = "words", as = "span", className, lines },
  ref,
) {
  const units = useMemo(() => {
    if (mode === "lines") return lines?.length ? lines : [text];
    if (mode === "chars") return Array.from(text);
    return text.split(" ");
  }, [text, mode, lines]);

  const Tag = as as React.ElementType;

  return (
    <Tag
      ref={ref}
      className={[styles.split, styles[mode], className].filter(Boolean).join(" ")}
      aria-label={text}
      data-split
    >
      {units.map((unit, i) => (
        <span className={`lineMask ${styles.mask}`} key={`${unit}-${i}`} aria-hidden="true">
          <span className="lineInner" data-split-inner>
            {unit === " " ? "\u00A0" : unit}
          </span>
          {/* Word mode needs a real space between masks so text can wrap. */}
          {mode === "words" && i < units.length - 1 ? "\u00A0" : null}
        </span>
      ))}
    </Tag>
  );
});

export default SplitText;
