"use client";

import Image from "next/image";
import { useRef } from "react";
import { gsap, useGsapContext } from "@/hooks/useGsap";
import { asset } from "@/lib/asset";
import styles from "./ImageReveal.module.scss";

type Props = {
  src: string;
  alt: string;
  width: number;
  height: number;
  className?: string;
  fit?: "cover" | "contain";
  priority?: boolean;
  /** Scroll parallax range in percent (spec §10). 0 disables. */
  parallax?: number;
  /** Initial overscale. Reference uses 1.3 on the hero image [extracted]. */
  scaleFrom?: number;
  duration?: number;
  delay?: number;
  /** `null` plays on mount instead of on scroll. */
  start?: string | null;
  sizes?: string;
};

/**
 * Masked image reveal + scroll parallax (spec §07, §10).
 *
 * Extracted reference values: clip-path inset(0 0 100% 0) with opacity 0 and
 * scale 1.3, animating to inset(0 0 0 0) / scale 1 / opacity 1 over 1.8s on
 * power3.out. Parallax is a separate scrubbed tween with ease "none".
 */
export default function ImageReveal({
  src,
  alt,
  width,
  height,
  className,
  fit = "cover",
  priority = false,
  parallax = 0,
  scaleFrom = 1.3,
  duration = 1.8,
  delay = 0,
  start = "top 85%",
  sizes = "(max-width: 1024px) 100vw, 66vw",
}: Props) {
  const frameRef = useRef<HTMLDivElement>(null);

  useGsapContext(
    ({ scope }) => {
      if (!scope) return;
      const inner = scope.querySelector<HTMLElement>("[data-reveal-inner]");
      const img = scope.querySelector<HTMLElement>("[data-reveal-img]");
      if (!inner || !img) return;

      gsap.set(scope, { clipPath: "inset(0% 0% 100% 0%)", opacity: 0 });
      gsap.set(img, { scale: scaleFrom });

      const tl = gsap.timeline({
        defaults: { ease: "power3.out" },
        ...(start ? { scrollTrigger: { trigger: scope, start, once: true } } : {}),
        delay,
      });
      tl.to(scope, { clipPath: "inset(0% 0% 0% 0%)", opacity: 1, duration }, 0).to(
        img,
        { scale: 1, duration: duration * 1.05 },
        0,
      );

      // Scrubbed parallax on a separate layer so it can't fight the reveal.
      if (parallax > 0) {
        gsap.fromTo(
          inner,
          { yPercent: -parallax },
          {
            yPercent: parallax,
            ease: "none",
            scrollTrigger: {
              trigger: scope,
              start: "top bottom",
              end: "bottom top",
              scrub: true,
            },
          },
        );
      }
    },
    frameRef,
    [src, parallax, scaleFrom, duration, delay, start],
  );

  return (
    <div
      ref={frameRef}
      className={[styles.frame, className].filter(Boolean).join(" ")}
      data-clip
      data-fade
    >
      {/* overscanned so parallax never exposes an edge */}
      <div className={styles.inner} data-reveal-inner style={{ inset: `${-parallax - 2}% 0` }}>
        <div className={styles.imgWrap} data-reveal-img>
          <Image
            src={asset(src)}
            alt={alt}
            width={width}
            height={height}
            priority={priority}
            sizes={sizes}
            className={fit === "contain" ? styles.contain : styles.cover}
          />
        </div>
      </div>
    </div>
  );
}
