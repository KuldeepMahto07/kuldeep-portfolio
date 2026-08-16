import type { ReactNode } from "react";

type Props = {
  children: ReactNode;
  /** Colour context. Sections inside inherit via CSS custom properties. */
  tone?: "light" | "dark";
  /**
   * Stacking order. Each successive sheet needs a higher value so it rises
   * *over* the previous one.
   */
  z: number;
  /** Pin this sheet so the next one slides across it. */
  pinned?: boolean;
  /** Rounded top corners — used on sheets that rise into view. */
  rise?: boolean;
  className?: string;
  id?: string;
};

/**
 * A major section "sheet" (see ANIMATION_REFERENCE §2).
 *
 * The stacking effect is deliberately pure CSS: the outgoing sheet is
 * `position: sticky; top: 0` and the incoming sheet is normal flow with a
 * higher `z-index`, so it slides up and covers it. Because nothing here is
 * driven by ScrollTrigger, the overlap is exactly reversible, holds its
 * position when scrolling stops, and can never fight Lenis.
 *
 * Content handoff (the previous section's *contents* receding as the next
 * sheet arrives) is a separate concern — see `SectionTransition`.
 */
export default function SectionSheet({
  children,
  tone = "light",
  z,
  pinned = false,
  rise = false,
  className,
  id,
}: Props) {
  const classes = [
    "sheet",
    `tone-${tone}`,
    pinned ? "sheet--pinned" : "",
    rise ? "sheet--rise" : "",
    className,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <div id={id} className={classes} style={{ ["--sheet-z" as string]: z }}>
      {children}
    </div>
  );
}
