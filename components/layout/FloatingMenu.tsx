"use client";

import { useEffect, useState } from "react";
import { useLenis } from "@/hooks/useLenis";
import { useMotionPreference } from "@/hooks/useMotionPreference";
import { menuLinks } from "@/data/content";
import styles from "./FloatingMenu.module.scss";

/**
 * Floating circular menu button.
 *
 * In the frames it only ever appears over the dark canvas — the hero has a
 * normal in-flow nav instead. So visibility is decided by hit-testing which
 * sheet is behind the button and reading its tone class, coalesced to one read
 * per frame because `elementsFromPoint` forces layout.
 */
export default function FloatingMenu() {
  const [visible, setVisible] = useState(false);
  const [open, setOpen] = useState(false);
  const lenis = useLenis();
  const { reduced } = useMotionPreference();

  useEffect(() => {
    let frame = 0;

    const sample = () => {
      frame = 0;
      const probeY = window.innerHeight * 0.4;
      const hits = document.elementsFromPoint(window.innerWidth * 0.97, probeY);
      const sheet = hits.find((el) => el.classList?.contains("sheet"));
      setVisible(Boolean(sheet?.classList.contains("tone-dark")));
    };

    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(sample);
    };

    sample();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (frame) cancelAnimationFrame(frame);
    };
  }, []);

  // Lock page scroll while the overlay is open.
  useEffect(() => {
    if (!lenis) return;
    if (open) lenis.stop();
    else lenis.start();
  }, [open, lenis]);

  const go = (e: React.MouseEvent, href: string) => {
    const target = document.querySelector(href);
    if (!target) return;
    e.preventDefault();
    setOpen(false);
    if (lenis) lenis.scrollTo(target as HTMLElement, { duration: 1.2 });
    else target.scrollIntoView({ behavior: reduced ? "auto" : "smooth" });
  };

  return (
    <>
      <button
        className={[styles.button, visible || open ? styles.visible : "", open ? styles.open : ""]
          .filter(Boolean)
          .join(" ")}
        aria-label={open ? "Close menu" : "Open menu"}
        aria-expanded={open}
        onClick={() => setOpen((v) => !v)}
        data-cursor="button"
      >
        <span />
        <span />
      </button>

      <div
        className={[styles.overlay, open ? styles.overlayOpen : ""].filter(Boolean).join(" ")}
        aria-hidden={!open}
      >
        <nav aria-label="Menu">
          {menuLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className={styles.item}
              onClick={(e) => go(e, link.href)}
            >
              {link.label}
            </a>
          ))}
        </nav>
      </div>
    </>
  );
}
