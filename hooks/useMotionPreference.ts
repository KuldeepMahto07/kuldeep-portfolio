"use client";

import { useEffect, useState } from "react";

/**
 * Central gate for the whole motion system.
 *
 * - `reduced`  : user asked for reduced motion -> collapse everything to instant
 * - `finePointer`: a real mouse exists -> allow cursor / magnetic / mouse-parallax
 * - `ready`    : we've measured on the client (avoids SSR mismatch)
 */
export function useMotionPreference() {
  const [state, setState] = useState({
    reduced: false,
    finePointer: false,
    ready: false,
  });

  useEffect(() => {
    const reducedMq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const pointerMq = window.matchMedia("(hover: hover) and (pointer: fine)");

    const sync = () =>
      setState({
        reduced: reducedMq.matches,
        finePointer: pointerMq.matches,
        ready: true,
      });

    sync();
    reducedMq.addEventListener("change", sync);
    pointerMq.addEventListener("change", sync);
    return () => {
      reducedMq.removeEventListener("change", sync);
      pointerMq.removeEventListener("change", sync);
    };
  }, []);

  return state;
}
