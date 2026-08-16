"use client";

import ScrambledText from "@/components/motion/ScrambledText";
import { about, achievements, certifications, education, experience } from "@/data/content";
import styles from "./About.module.scss";

/**
 * About / experience / certifications / education / achievements — light editorial sheet.
 */
export default function About() {
  return (
    <section className={styles.section} id="about">
      <h2 className={styles.heading}>
        {about.headingLines.map((line) => (
          <span className="lineMask" key={line}>
            <span className="lineInner" data-split-inner>
              {line}
            </span>
          </span>
        ))}
      </h2>

      <div className={styles.introRow}>
        <span className={styles.label}>
          <ScrambledText text={about.label} />
        </span>
        <div className={styles.copy} data-fade>
          {about.paragraphs.map((p) => (
            <p key={p.slice(0, 20)}>{p}</p>
          ))}
        </div>
      </div>

      <div className={styles.block}>
        <h3 className={styles.blockLabel}>Experience</h3>
        {experience.map((job) => (
          <div className={styles.job} key={job.company}>
            <h4 className={styles.company}>{job.company}</h4>
            <div className={styles.jobMid}>
              <span className={styles.role}>{job.role}</span>
              <span className={styles.period}>{job.period}</span>
              <span className={styles.period}>{job.location}</span>
            </div>
            <ul className={styles.jobDetails}>
              {job.details.map((d) => (
                <li key={d.slice(0, 28)}>{d}</li>
              ))}
            </ul>
            <ul className={styles.tags}>
              {job.tech.map((t) => (
                <li key={t}>
                  <ScrambledText text={t} />
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <div className={styles.threeUp}>
        <div className={styles.block}>
          <h3 className={styles.blockLabel}>Education</h3>
          <ul className={styles.plainList}>
            {education.map((e) => (
              <li key={e.degree}>
                <span className={styles.degreeTitle}>{e.degree}</span>
                <span className={styles.school}>{e.school}</span>
                <div className={styles.eduMeta}>
                  <span className={styles.eduYear}>{e.year}</span>
                  <span className={styles.gpaPill}>{e.gpa}</span>
                </div>
              </li>
            ))}
          </ul>
        </div>

        <div className={styles.block}>
          <h3 className={styles.blockLabel}>Certifications</h3>
          <ul className={styles.plainList}>
            {certifications.map((c) => (
              <li key={c}>
                <span className={styles.degreeTitle}>{c}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className={styles.block}>
          <h3 className={styles.blockLabel}>Achievements</h3>
          <ul className={styles.plainList}>
            {achievements.map((a) => (
              <li key={a.title}>
                <span className={styles.degreeTitle}>{a.title}</span>
                <span className={styles.achieveDesc}>{a.description}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
