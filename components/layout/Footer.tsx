"use client";

import { useEffect, useState } from "react";
import ScrambledText from "@/components/motion/ScrambledText";
import { useLenis } from "@/hooks/useLenis";
import { menuLinks, profile } from "@/data/content";
import styles from "./Footer.module.scss";

/** Live clock in Kuldeep's timezone (IST). */
function useLocalTime(timeZone: string) {
  const [time, setTime] = useState("--:--:--");
  useEffect(() => {
    const fmt = new Intl.DateTimeFormat("en-GB", {
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: false,
      timeZone,
    });
    const tick = () => setTime(fmt.format(new Date()));
    tick();
    const id = window.setInterval(tick, 1000);
    return () => window.clearInterval(id);
  }, [timeZone]);
  return time;
}

const socials = [
  { label: "LinkedIn", href: profile.linkedin, external: true },
  { label: "GitHub", href: profile.github, external: true },
  { label: "Email", href: `mailto:${profile.email}`, external: false },
  { label: "Phone", href: `tel:${profile.phone.replace(/\s+/g, "")}`, external: false },
];

export default function Footer() {
  const time = useLocalTime("Asia/Kolkata");
  const lenis = useLenis();

  const toTop = () => {
    if (lenis) lenis.scrollTo(0, { duration: 1.4 });
    else window.scrollTo({ top: 0 });
  };

  return (
    <footer className={styles.footer}>
      <div className={styles.grid}>
        <nav className={styles.col} aria-label="Footer menu">
          <h2 className={styles.colLabel}>Menu</h2>
          {menuLinks.map((l) => (
            <a key={l.href} href={l.href} className={styles.link} data-cursor="link">
              <ScrambledText text={l.label} />
            </a>
          ))}
        </nav>

        <div className={styles.col}>
          <h2 className={styles.colLabel}>Connect</h2>
          {socials.map((s) => (
            <a
              key={s.label}
              href={s.href}
              className={styles.link}
              data-cursor="link"
              {...(s.external ? { target: "_blank", rel: "noopener" } : {})}
            >
              <ScrambledText text={s.label} />
            </a>
          ))}
        </div>
      </div>

      <div className={styles.bottom}>
        <div className={styles.timeBlock}>
          <span className={styles.timeLabel}>Local time</span>
          <span className={styles.time}>{time} IST</span>
          <span className={styles.place}>{profile.location}</span>
        </div>

        <button className={styles.top} onClick={toTop} aria-label="Back to top" data-cursor="button">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <path
              d="M12 19V5M12 5L6 11M12 5L18 11"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>
      </div>
    </footer>
  );
}
