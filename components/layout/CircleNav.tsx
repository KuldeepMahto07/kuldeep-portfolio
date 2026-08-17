"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import styles from "./CircleNav.module.scss";

type Props = {
  href: string;
  /** Accessible label + tooltip. */
  label: string;
  /** Short visible text beside the circle (hidden on mobile). */
  text: string;
  variant?: "forward" | "back";
  /**
   * Homepage sits over alternating light/dark section sheets, so the button
   * hit-tests the sheet behind it and inverts its colours to stay legible.
   */
  toneAware?: boolean;
  /** Fixed tone for pages without section sheets (e.g. the designs page). */
  tone?: "light" | "dark";
};

/**
 * Fixed circular navigation control in the top-right corner. A real link — it
 * routes through Next's client-side navigation, no overlay or modal.
 */
export default function CircleNav({
  href,
  label,
  text,
  variant = "forward",
  toneAware = false,
  tone = "dark",
}: Props) {
  const ref = useRef<HTMLAnchorElement>(null);
  // `onDark` = a dark surface is behind the button → render the light circle.
  const [onDark, setOnDark] = useState(tone === "dark");

  useEffect(() => {
    if (!toneAware) return;
    let frame = 0;

    const sample = () => {
      frame = 0;
      const el = ref.current;
      if (!el) return;
      const r = el.getBoundingClientRect();
      const hits = document.elementsFromPoint(r.left + r.width / 2, r.top + r.height / 2);
      const sheet = hits.find((h) => (h as HTMLElement).classList?.contains("sheet"));
      setOnDark(Boolean(sheet?.classList.contains("tone-dark")));
    };

    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(sample);
    };

    sample();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (frame) cancelAnimationFrame(frame);
    };
  }, [toneAware]);

  const cls = [styles.nav, onDark ? styles.onDark : styles.onLight].filter(Boolean).join(" ");

  return (
    <Link ref={ref} href={href} className={cls} aria-label={label} title={label} data-cursor="button">
      {variant === "back" && (
        <span className={styles.circle} aria-hidden="true">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
            <path
              d="M15 5l-7 7 7 7"
              stroke="currentColor"
              strokeWidth="1.7"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </span>
      )}

      <span className={styles.label} aria-hidden="true">
        {text}
      </span>

      {variant === "forward" && (
        <span className={styles.circle} aria-hidden="true">
          <svg width="17" height="17" viewBox="0 0 24 24" fill="none">
            <rect x="4" y="4" width="7" height="7" rx="1.5" fill="currentColor" />
            <rect x="13" y="4" width="7" height="7" rx="1.5" fill="currentColor" />
            <rect x="4" y="13" width="7" height="7" rx="1.5" fill="currentColor" />
            <rect x="13" y="13" width="7" height="7" rx="1.5" fill="currentColor" />
          </svg>
        </span>
      )}
    </Link>
  );
}
