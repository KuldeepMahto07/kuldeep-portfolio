"use client";

import { useState } from "react";
import type { Design } from "@/data/designs";
import { asset } from "@/lib/asset";
import styles from "./DesignCard.module.scss";

/** Varied aspect ratios keep the placeholder state feeling like a masonry grid. */
const PLACEHOLDER_RATIOS = ["4 / 5", "1 / 1", "3 / 4", "5 / 4", "4 / 5", "1 / 1", "3 / 4", "4 / 3"];

export default function DesignCard({ design, index }: { design: Design; index: number }) {
  const [failed, setFailed] = useState(false);
  const showImage = Boolean(design.image) && !failed;
  const ratio = PLACEHOLDER_RATIOS[index % PLACEHOLDER_RATIOS.length];
  const meta = design.year ? `${design.category} · ${design.year}` : design.category;

  const media = (
    <div className={styles.media} data-cursor="image">
      {showImage ? (
        <div className={styles.imageWrap}>
          {/* Plain img: user-supplied art of any dimensions keeps its aspect ratio. */}
          <img
            src={asset(design.image)}
            alt={design.title}
            loading="lazy"
            className={styles.image}
            onError={() => setFailed(true)}
          />
        </div>
      ) : (
        <div className={styles.placeholder} style={{ aspectRatio: ratio }}>
          <span className={styles.placeholderLabel} aria-hidden="true">
            {design.category}
          </span>
        </div>
      )}

      <div className={styles.overlay} aria-hidden="true">
        <span className={styles.overlayCat}>{meta}</span>
        <span className={styles.overlayTitle}>{design.title}</span>
        {design.description ? <span className={styles.overlayDesc}>{design.description}</span> : null}
      </div>
    </div>
  );

  return (
    <article className={styles.card}>
      {design.href ? (
        <a
          href={design.href}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`${design.title} — ${design.category} (opens in a new tab)`}
        >
          {media}
        </a>
      ) : (
        media
      )}

      <div className={styles.caption}>
        <h3 className={styles.title}>{design.title}</h3>
        <span className={styles.meta}>{meta}</span>

        {design.description ? <p className={styles.desc}>{design.description}</p> : null}

        {design.tech && design.tech.length > 0 ? (
          <ul className={styles.tech}>
            {design.tech.map((t) => (
              <li key={t}>{t}</li>
            ))}
          </ul>
        ) : null}

        {design.href || design.github ? (
          <div className={styles.actions}>
            {design.href ? (
              <a
                className={styles.action}
                href={design.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`${design.title} — live demo (opens in a new tab)`}
              >
                Live Demo
                <span className={styles.arrow} aria-hidden="true">
                  <svg width="11" height="11" viewBox="0 0 16 16" fill="none">
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
            {design.github ? (
              <a
                className={styles.action}
                href={design.github}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`${design.title} — GitHub repository (opens in a new tab)`}
              >
                GitHub
                <span className={styles.arrow} aria-hidden="true">
                  <svg width="11" height="11" viewBox="0 0 16 16" fill="none">
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
        ) : null}
      </div>
    </article>
  );
}
