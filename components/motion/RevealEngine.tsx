"use client";

import { useRef } from "react";
import { gsap, ScrollTrigger, useGsapContext } from "@/hooks/useGsap";

/**
 * Pass 5 — one engine for every reveal on the page.
 *
 * Sections declare intent in markup rather than each owning its own GSAP code:
 *   `.lineMask > .lineInner`  masked vertical line reveal (yPercent 110 -> 0)
 *   `[data-fade]`             short translate + fade
 *   `[data-clip]`             clip-path wipe (inset(0 0 100% 0) -> inset(0))
 *
 * Hero hooks play on load as a staggered timeline; everything else is
 * scroll-triggered once at "top 85%". Reveals are entrances, so they are *not*
 * scrubbed — the scrubbed choreography is the sheet stacking and the sticky
 * indices, which are CSS.
 *
 * Two things this has to get right:
 *
 * 1. `y: 0` alongside `yPercent`. The CSS pre-state is `translateY(110%)`;
 *    GSAP parses that into its own `y` in px and would *add* yPercent on top,
 *    stranding the text partway when yPercent reaches 0.
 * 2. Nothing runs under prefers-reduced-motion — `useGsapContext` bails, and
 *    the CSS keeps everything visible.
 */
export default function RevealEngine() {
  const ref = useRef<HTMLDivElement>(null);

  useGsapContext(() => {
    const inHero = (el: Element) => Boolean(el.closest("#top"));

    // Query the document directly, NOT gsap.utils.toArray: this runs inside a
    // `gsap.context(fn, scope)` and GSAP scopes selector text to that scope
    // element. Since the scope is this component's own empty node, selector
    // text would resolve to nothing and no reveal would ever run.
    const q = <T extends HTMLElement>(sel: string) =>
      Array.from(document.querySelectorAll<T>(sel));

    const lines = q<HTMLElement>(".lineInner");
    const fades = q<HTMLElement>("[data-fade]");
    const clips = q<HTMLElement>("[data-clip]");

    // ---- initial states (must clear the parsed CSS transform) ----
    gsap.set(lines, { yPercent: 110, y: 0 });
    gsap.set(fades, { opacity: 0, y: 18 });
    gsap.set(clips, { clipPath: "inset(0% 0% 100% 0%)" });

    // ---------- HERO: load sequence ----------
    const heroLines = lines.filter(inHero);
    const heroFades = fades.filter(inHero);
    const heroClips = clips.filter(inHero);

    const intro = gsap.timeline({ defaults: { ease: "power4.out" } });
    intro
      .to(heroLines, { yPercent: 0, y: 0, duration: 1.25, stagger: 0.08 }, 0.15)
      .to(heroClips, { clipPath: "inset(0% 0% 0% 0%)", duration: 1.4, ease: "expo.out" }, 0.4)
      .to(heroFades, { opacity: 1, y: 0, duration: 0.9, stagger: 0.07 }, 0.55);

    // ---------- EVERYTHING ELSE: scroll-triggered, once ----------
    // Group masked lines by their nearest heading/block so multi-line headings
    // ("LET'S BUILD / SOMETHING / INTELLIGENT.") stagger together instead of
    // each line firing on its own trigger.
    const groups = new Map<Element, HTMLElement[]>();
    lines
      .filter((el) => !inHero(el))
      .forEach((el) => {
        const key = el.closest("h1, h2, h3, [data-reveal-group]") ?? el;
        const list = groups.get(key) ?? [];
        list.push(el);
        groups.set(key, list);
      });

    groups.forEach((els, key) => {
      gsap.to(els, {
        yPercent: 0,
        y: 0,
        duration: 1.25,
        ease: "power4.out",
        stagger: 0.09,
        scrollTrigger: { trigger: key, start: "top 88%", once: true },
      });
    });

    ScrollTrigger.batch(
      fades.filter((el) => !inHero(el)),
      {
        start: "top 88%",
        onEnter: (batch: Element[]) =>
          gsap.to(batch, {
            opacity: 1,
            y: 0,
            duration: 0.9,
            ease: "power3.out",
            stagger: 0.07,
            overwrite: true,
          }),
      },
    );

    clips
      .filter((el) => !inHero(el))
      .forEach((el) => {
        gsap.to(el, {
          clipPath: "inset(0% 0% 0% 0%)",
          duration: 1.4,
          ease: "expo.out",
          scrollTrigger: { trigger: el, start: "top 88%", once: true },
        });
      });
  }, ref);

  // Nothing rendered — this only wires behaviour to existing markup.
  return <div ref={ref} aria-hidden="true" hidden />;
}
