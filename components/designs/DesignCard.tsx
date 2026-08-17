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
      </div>
    </article>
  );
}
