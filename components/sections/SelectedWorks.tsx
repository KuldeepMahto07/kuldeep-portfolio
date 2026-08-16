"use client";

import ScrambledText from "@/components/motion/ScrambledText";
import ProjectState from "@/components/projects/ProjectState";
import { projects, worksIntro } from "@/data/content";
import styles from "./SelectedWorks.module.scss";

/**
 * Selected Works — frames 7 → 10.
 *
 * Still the same dark canvas as the services: the heading appears toward the
 * lower-left after the service stack scrolls away, with `(PROJECTS)` and the
 * intro copy to the centre-right, then each project runs as its own state.
 *
 * Not cards, not a grid, not a carousel.
 */
export default function SelectedWorks() {
  return (
    <section className={styles.section} id="works">
      <h2 className={styles.heading}>
        <span className="lineMask">
          <span className="lineInner" data-split-inner>
            {worksIntro.heading}
          </span>
        </span>
      </h2>

      <div className={styles.introRow}>
        <span className={styles.label}>
          <ScrambledText text={worksIntro.label} />
        </span>
        <p className={styles.intro} data-fade>
          {worksIntro.intro}
        </p>
      </div>

      <div className={styles.states}>
        {projects.map((project) => (
          <ProjectState key={project.index} project={project} />
        ))}
      </div>
    </section>
  );
}
