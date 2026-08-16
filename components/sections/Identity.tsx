"use client";

import { identityLines, skillGroups } from "@/data/content";
import styles from "./Identity.module.scss";

/**
 * Identity statement + skills, continuing the dark canvas.
 *
 * Large stacked type on the left, skills as plain text columns on the right.
 * No bars, no percentages, no badges, no marquee.
 */
export default function Identity() {
  return (
    <section className={styles.section} id="skills">
      <div className={styles.grid}>
        <div className={styles.statementCol}>
          <span className={styles.statementSticky}>
            <h2 className={styles.statement}>
              {identityLines.map((line) => (
                <span className="lineMask" key={line}>
                  <span className="lineInner" data-split-inner>
                    {line}
                  </span>
                </span>
              ))}
            </h2>
          </span>
        </div>

        <div className={styles.skills}>
          <h3 className={styles.skillsHeading}>Skills</h3>
          <div className={styles.columns}>
            {skillGroups.map((group) => (
              <div className={styles.column} key={group.label}>
                <h4>{group.label}</h4>
                <ul>
                  {group.items.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
