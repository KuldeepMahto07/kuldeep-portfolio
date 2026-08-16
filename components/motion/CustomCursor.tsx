"use client";

import { useEffect, useRef } from "react";
import { gsap } from "@/hooks/useGsap";
import { useMotionPreference } from "@/hooks/useMotionPreference";
import styles from "./CustomCursor.module.scss";

/**
 * Custom cursor (spec §04).
 *
 * Reference implementation detail [extracted]: position is interpolated per
 * frame with `cur += (target - cur) * 0.12` inside requestAnimationFrame and
 * written with translate3d; hit areas are class-gated and the expanded state
 * shows the word "View". We reproduce that lerp factor exactly, and drive it
 * from GSAP's ticker so there is still only one RAF loop on the page.
 *
 * States are declared by markup via `data-cursor`:
 *   data-cursor="link"    -> slight expand
 *   data-cursor="project" -> large expand + label (default "View")
 *   data-cursor="button"  -> medium expand
 * with an optional `data-cursor-label` override.
 */
const LERP = 0.12;

const STATES = {
  default: { size: 14, label: "" },
  link: { size: 34, label: "" },
  button: { size: 48, label: "" },
  project: { size: 92, label: "View" },
  image: { size: 92, label: "Open ↗" },
} as const;

type StateName = keyof typeof STATES;

export default function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const labelRef = useRef<HTMLSpanElement>(null);
  const { reduced, finePointer, ready } = useMotionPreference();

  useEffect(() => {
    if (!ready || reduced || !finePointer) return;
    const dot = dotRef.current;
    const label = labelRef.current;
    if (!dot || !label) return;

    document.documentElement.classList.add("has-custom-cursor");

    const target = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
    const current = { ...target };
    let seen = false;
    let state: StateName = "default";

    const onMove = (e: PointerEvent) => {
      target.x = e.clientX;
      target.y = e.clientY;
      if (!seen) {
        // Jump to the pointer the first time so there's no fly-in from centre.
        current.x = target.x;
        current.y = target.y;
        seen = true;
        gsap.to(dot, { opacity: 1, duration: 0.3, ease: "power2.out" });
      }
    };

    const setState = (next: StateName, labelOverride?: string) => {
      if (next === state) return;
      state = next;
      const conf = STATES[next];
      const text = labelOverride ?? conf.label;
      if (text) label.textContent = text;
      // Opt out of difference blending whenever there's text to read.
      dot.classList.toggle(styles.labelled, Boolean(text));
      gsap.to(dot, {
        width: conf.size,
        height: conf.size,
        margin: `${-conf.size / 2}px 0 0 ${-conf.size / 2}px`,
        duration: 0.42,
        ease: "power3.out",
        overwrite: "auto",
      });
      gsap.to(label, {
        opacity: text ? 1 : 0,
        duration: text ? 0.3 : 0.15,
        ease: "power2.out",
        overwrite: "auto",
      });
    };

    // Delegated hit-testing: one listener, no per-element bookkeeping.
    const onOver = (e: Event) => {
      const el = (e.target as HTMLElement | null)?.closest?.("[data-cursor]");
      if (!el) return setState("default");
      const name = (el.getAttribute("data-cursor") as StateName) || "link";
      setState(name in STATES ? name : "link", el.getAttribute("data-cursor-label") ?? undefined);
    };

    const onLeaveWindow = () => {
      gsap.to(dot, { opacity: 0, duration: 0.25 });
      seen = false;
    };

    // Interpolate on the shared ticker.
    const tick = () => {
      current.x += (target.x - current.x) * LERP;
      current.y += (target.y - current.y) * LERP;
      dot.style.transform = `translate3d(${current.x}px, ${current.y}px, 0)`;
    };

    window.addEventListener("pointermove", onMove, { passive: true });
    document.addEventListener("pointerover", onOver, { passive: true });
    document.addEventListener("pointerleave", onLeaveWindow);
    gsap.ticker.add(tick);

    return () => {
      window.removeEventListener("pointermove", onMove);
      document.removeEventListener("pointerover", onOver);
      document.removeEventListener("pointerleave", onLeaveWindow);
      gsap.ticker.remove(tick);
      document.documentElement.classList.remove("has-custom-cursor");
    };
  }, [ready, reduced, finePointer]);

  return (
    <div ref={dotRef} className={styles.cursor} aria-hidden="true">
      <span ref={labelRef} className={styles.label} />
    </div>
  );
}
