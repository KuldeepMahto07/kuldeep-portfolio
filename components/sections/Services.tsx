"use client";

import ScrambledText from "@/components/motion/ScrambledText";
import { services, whatIDo } from "@/data/content";
import styles from "./Services.module.scss";

/**
 * "What I Do" + the service progression — frames 3 → 7.
 *
 * One continuous dark canvas, not separate sections:
 *  - frame 3: huge heading upper-left, `(SERVICES)` near centre, copy pushed
 *    much further right, enormous void between them.
 *  - frames 4 → 7: the rows stack. Each row is `position: sticky` with an
 *    opaque background at an increasing top offset, so row 02 slides up and
 *    covers row 01's body while both headers stay visible. By frame 6 all
 *    three headers are piled ~64px apart with only 03's body showing.
 *
 * Sticky rather than pinned ScrollTriggers, so it freezes when scrolling stops
 * and reverses exactly on the way back up.
 */
export default function Services() {
  return (
    <section className={styles.section} id="services">
      <h2 className={styles.heading}>
        <span className="lineMask">
          <span className="lineInner" data-split-inner>
            {whatIDo.heading}
          </span>
        </span>
      </h2>

      <div className={styles.introRow}>
        <span className={styles.label}>
          <ScrambledText text={whatIDo.label} />
        </span>
        <p className={styles.intro} data-fade>
          {whatIDo.intro}
        </p>
      </div>

      <div className={styles.rows}>
        {services.map((service, i) => (
          <article
            className={styles.row}
            key={service.num}
            // Each row sticks one row-height lower than the previous one.
            style={{ ["--i" as string]: i }}
          >
            <div className={styles.rowHead}>
              <span className={styles.num}>{service.num}</span>
              <h3 className={styles.title}>{service.title}</h3>
            </div>

            <div className={styles.rowBody}>
              <p className={styles.desc} data-fade>
                {service.description}
              </p>
              <ul className={styles.tech}>
                {service.tech.map((item, j) => (
                  <li key={item}>
                    <span className={styles.techNum}>
                      {String(j + 1).padStart(2, "0")}
                    </span>
                    <span className={styles.techLabel}>
                      <ScrambledText text={item} />
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
