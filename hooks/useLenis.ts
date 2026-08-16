"use client";

import { createContext, useContext } from "react";
import type Lenis from "lenis";

export const LenisContext = createContext<Lenis | null>(null);

/** Access the running Lenis instance (e.g. to scroll to an anchor). */
export function useLenis(): Lenis | null {
  return useContext(LenisContext);
}
