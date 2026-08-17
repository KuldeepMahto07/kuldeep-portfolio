"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";
import { gsap, useGsapContext } from "@/hooks/useGsap";
import { useMotionPreference } from "@/hooks/useMotionPreference";
import ScrambledText from "@/components/motion/ScrambledText";
import { asset } from "@/lib/asset";
import type { Project } from "@/data/content";
import styles from "./ProjectState.module.scss";

/**
 * One project state — frames 8 → 10.
 *
 * Two-zone composition: the giant mono index on the left (~40%, ~21vw, grey,
 * bleeding toward the left edge) and the large project visual on the right
 * (~55%, roughly square).
 */
export default function ProjectState({ project }: { project: Project }) {
  const rootRef = useRef<HTMLElement>(null);
  const { reduced, finePointer, ready } = useMotionPreference();

  // Scroll parallax on the image node
  useGsapContext(
    ({ scope }) => {
      if (!scope) return;
      const img = scope.querySelector<HTMLElement>("[data-project-image]");
      const mask = img?.parentElement;
      if (!img || !mask) return;

      gsap.fromTo(
        img,
        { yPercent: -4 },
        {
          yPercent: 4,
          ease: "none",
          scrollTrigger: { trigger: mask, start: "top bottom", end: "bottom top", scrub: true },
        },
      );
    },
    rootRef,
    [],
  );

  // Hover scale: 1 -> 1.025
  useEffect(() => {
    if (!ready || reduced || !finePointer) return;
    const root = rootRef.current;
    const img = root?.querySelector<HTMLElement>("[data-project-image] img");
    const link = root?.querySelector<HTMLElement>('[data-cursor="project"]');
    if (!img || !link) return;

    const to = (scale: number) =>
      gsap.to(img, { scale, duration: 0.7, ease: "power3.out", overwrite: "auto" });
    const onEnter = () => to(1.025);
    const onLeave = () => to(1);

    link.addEventListener("pointerenter", onEnter);
    link.addEventListener("pointerleave", onLeave);
    link.dataset.hoverReady = "1";

    return () => {
      link.removeEventListener("pointerenter", onEnter);
      link.removeEventListener("pointerleave", onLeave);
      delete link.dataset.hoverReady;
      gsap.killTweensOf(img);
    };
  }, [ready, reduced, finePointer]);

  return (
    <article ref={rootRef} className={styles.state}>
      <div className={styles.indexCol}>
        <span className={styles.indexSticky}>
          <span className={styles.index} data-index aria-hidden="true">
            {project.index}
          </span>
        </span>
      </div>

      <div className={styles.contentCol}>
        <a
          className={styles.mediaLink}
          href={project.href}
          target="_blank"
          rel="noopener"
          aria-label={`${project.title} — ${project.linkLabel} (opens in a new tab)`}
          data-cursor="project"
        >
          {/* mask: choreography */}
          <div className={`${styles.mask} ${project.fit === "contain" ? styles.stage : ""}`}>
            {project.assetNote ? (
              <span className={styles.plateLabel} aria-hidden="true">
                <span>{project.title}</span>
                <span>{project.category}</span>
              </span>
            ) : null}

            <div className={styles.image} data-project-image>
              <Image
                src={asset(project.image)}
                alt={project.imageAlt}
                width={project.fit === "cover" ? 1600 : 622}
                height={project.fit === "cover" ? 1000 : 680}
                sizes="(max-width: 1024px) 100vw, 56vw"
                className={project.fit === "cover" ? styles.cover : styles.contain}
              />
            </div>
          </div>
        </a>

        <div className={styles.caption}>
          <div className={styles.captionLeft}>
            <span className={styles.category}>
              <ScrambledText text={project.category} />
            </span>
            <h3 className={styles.title}>{project.title}</h3>
          </div>
          <div className={styles.pills}>
            <span className={styles.pill}>
              <ScrambledText text={project.discipline} />
            </span>
            <span className={styles.pill}>{project.year}</span>
          </div>
        </div>

        <div className={styles.meta}>
          <p className={styles.desc} data-fade>
            {project.description}
          </p>

          {project.highlights && project.highlights.length > 0 && (
            <ul className={styles.highlights}>
              {project.highlights.map((item) => (
                <li key={item.slice(0, 30)} data-fade>
                  <span className={styles.highlightDot}>•</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          )}

          <ul className={styles.stack}>
            {project.stack.map((tech) => (
              <li key={tech}>
                <ScrambledText text={tech} />
              </li>
            ))}
          </ul>
          {project.assetNote ? <p className={styles.assetNote}>{project.assetNote}</p> : null}
          <div className={styles.actions}>
            <a
              className={styles.view}
              href={project.href}
              target="_blank"
              rel="noopener"
              aria-label={`${project.title} — ${project.linkLabel} (opens in a new tab)`}
              data-cursor="link"
            >
              <ScrambledText text={project.linkLabel} />
              <span className={styles.arrow} aria-hidden="true">
                <svg width="12" height="12" viewBox="0 0 16 16" fill="none">
                  <path
                    d="M4 12L12 4M12 4H5.5M12 4V10.5"
                    stroke="currentColor"
                    strokeWidth="1.6"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </span>
            </a>
            {project.github ? (
              <a
                className={styles.view}
                href={project.github}
                target="_blank"
                rel="noopener"
                aria-label={`${project.title} — GitHub repository (opens in a new tab)`}
                data-cursor="link"
              >
                <ScrambledText text="GitHub" />
                <span className={styles.arrow} aria-hidden="true">
                  <svg width="12" height="12" viewBox="0 0 16 16" fill="none">
                    <path
                      d="M4 12L12 4M12 4H5.5M12 4V10.5"
                      stroke="currentColor"
                      strokeWidth="1.6"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </span>
              </a>
            ) : null}
          </div>
        </div>
      </div>
    </article>
  );
}
