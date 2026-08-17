"use client";

import Image from "next/image";
import ScrambledText from "@/components/motion/ScrambledText";
import { asset } from "@/lib/asset";
import { navLinks, profile } from "@/data/content";
import styles from "./Hero.module.scss";

/**
 * Hero — frame 1.
 *
 * Light canvas, in-flow nav, enormous single-line name spanning the viewport,
 * bottom row with copy + CTAs on the left, portrait in the centre,
 * and availability on the right.
 */
export default function Hero() {
  return (
    <section className={styles.hero} id="top">
      <header className={styles.nav}>
        <ScrambledText text={profile.navLabel} />
        <nav className={styles.navLinks} aria-label="Primary">
          {navLinks.map((link) => (
            <a key={link.href} href={link.href} data-cursor="link">
              <ScrambledText text={link.label} />
            </a>
          ))}
        </nav>
      </header>

      <div className={styles.nameWrap}>
        <span className="lineMask">
          <h1 className={`${styles.name} lineInner`} data-split-inner>
            {profile.name.toUpperCase()}
          </h1>
        </span>
        <p className={styles.role} data-fade>
          {profile.role}
        </p>
      </div>

      <div className={styles.lower}>
        <div className={styles.left}>
          <span className={styles.arrow} aria-hidden="true">
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
              <path
                d="M5 5L15 15M15 15V6.5M15 15H6.5"
                stroke="currentColor"
                strokeWidth="1.2"
              />
            </svg>
          </span>
          <p className={styles.copy} data-fade>
            {profile.tagline}
          </p>

          <div className={styles.ctaGroup} data-fade>
            <a
              className={styles.cta}
              href="#works"
              data-cursor="button"
            >
              View Projects
              <svg width="11" height="11" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                <path
                  d="M4 12L12 4M12 4H5.5M12 4V10.5"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </a>
            <a
              className={styles.ctaSecondary}
              href={`mailto:${profile.email}`}
              data-cursor="button"
            >
              Contact Me
            </a>
            <a
              className={styles.ctaGhost}
              href={profile.github}
              target="_blank"
              rel="noopener"
              data-cursor="link"
            >
              GitHub
            </a>
            <a
              className={styles.ctaGhost}
              href={asset(profile.resume)}
              target="_blank"
              rel="noopener"
              download
              data-cursor="link"
            >
              Resume
            </a>
          </div>
        </div>

        {/* Hero portrait */}
        <div className={styles.portrait} data-clip>
          {profile.portrait ? (
            <Image
              src={asset(profile.portrait)}
              alt={profile.portraitAlt}
              width={960}
              height={1280}
              priority
              sizes="(max-width: 960px) 60vw, 21vw"
              className={styles.portraitImg}
            />
          ) : (
            <div className={styles.portraitInner}>
              <span className={styles.portraitNote}>
                {profile.name}
              </span>
            </div>
          )}
        </div>

        <div className={styles.right}>
          <span className={styles.availLabel}>
            <ScrambledText text={profile.availability} />
          </span>
          <span className={styles.availStatus} data-fade>
            <span className={styles.availDot} aria-hidden="true" />
            {profile.availabilityStatus}
          </span>
        </div>
      </div>
    </section>
  );
}
