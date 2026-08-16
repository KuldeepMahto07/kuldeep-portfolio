# Motion Inventory — zunedaalim.com

Compiled by inspecting the live site directly: HTML, the stylesheet
(`/_next/static/css/a389311a49d4f5ee.css`) and the JS bundles
(`app/page-*.js`, `app/layout-*.js`, vendor chunks). Values below marked
**[extracted]** are the reference site's own numbers read out of its shipped code —
not estimates. Values marked **[inferred]** could not be read directly and are a
reasoned closest match.

## Stack actually used by the reference [extracted]

| Library | Evidence |
|---|---|
| GSAP + ScrollTrigger | `gsap` ×42, `ScrollTrigger` ×3 in vendor chunk; `gsap.context()`, `gsap.to` in page chunk |
| Lenis 1.3.1 | `window.lenisVersion="1.3.1"` in layout chunk |
| framer-motion | `whileHover`, `useInView`, `initial/animate/transition` in page chunk |
| SplitType | **not used** — text is split with `text.split(" ")` / `text.split("")` in custom components |

Implication: heading splitting is hand-rolled, per-word/per-char, each wrapped in an
`overflow-hidden` container. Our build follows the same approach (own `SplitText`),
so SplitType is not a dependency.

## Global easing + timing vocabulary [extracted]

| Purpose | Value | Occurrences |
|---|---|---|
| Primary GSAP reveal ease | `power3.out` | 5 |
| Secondary GSAP ease | `power1.out` | 1 |
| Scrub-linked animations | `ease: "none"` | 10 |
| Micro CSS transitions | `cubic-bezier(.4, 0, .2, 1)` | 6 |
| Large CSS moves (menu/text swap) | `cubic-bezier(.77, 0, .175, 1)` | 2 |
| Overshoot accent | `cubic-bezier(.51, .92, .24, 1.15)` | 1 |
| Long framer fade | `ease: [.2, .38, .09, .91]`, `duration: 2` | 1 |
| CSS durations | `.15s` (×5), `.3s`, `.4s`, `.5s` (×3), `.7s`, `1s` | — |
| Load-sequence delays | `.3, .5, .6, .7, 1.1, 1.2, 1.3` | — |

Two clear rules emerge: **entrance animations are long (0.4–2.5s) but their per-item
staggers are tiny (0.01–0.05s)**, and **anything scroll-scrubbed uses `ease: "none"`**.

---

## 01 — Initial page load

| Field | Detail |
|---|---|
| Element | Hero meta line, hero headline lines, hero image, sub-copy, CTA |
| Trigger | Mount (not scroll) |
| Initial state | Text: wrapped in `overflow:hidden`, inner `y: 163px` (≈1 line-height) or `y: "100%"`, `opacity: 0`. Image: `clip-path: inset(0 0 100% 0)`, `opacity: 0`, `scale: 1.3` **[extracted]** |
| Animation | Text → `y: 0`; image → `clip-path: inset(0 0 0 0)`, `scale: 1`, `opacity: 1` |
| Duration | Text `0.4s`; image `1.8s`; secondary fades `2s` **[extracted]** |
| Easing | Text `easeOut`; image `power3.out` **[extracted]** |
| Scroll behaviour | None — pure timeline |
| Hover | n/a |
| Mouse | n/a |
| Mobile fallback | Same sequence; image reveal retained (cheap, transform+clip only) |

Ordering is produced by **explicit delays, not a chained timeline**: `delay: 1.1 + i * perItem`
for headline items, with the image at `delay: 1.2` and body copy at `1.1–1.3`. There is also a
pure-CSS variant of the same reveal:
`animation: revealFromTop 2.5s cubic-bezier(.65, 0, .35, 1) 2s forwards`, whose keyframes are
`0% { clip-path: inset(0 0 100% 0); opacity: 0; scale: 1.3 } → 100% { inset(0 0 0 0); opacity: 1; scale: 1 }` **[extracted]**.

Note the image scales **1.3 → 1**, considerably stronger than the 1.1 → 1 in our brief.

## 02 — Smooth scrolling

| Field | Detail |
|---|---|
| Element | Document |
| Trigger | Wheel / touch / anchor |
| Initial state | — |
| Animation | Lenis interpolates scroll position each frame |
| Duration | Continuous; `lerp: 0.1` default **[extracted]** |
| Easing | Exponential approach implicit in lerp |
| Scroll behaviour | Lenis drives `ScrollTrigger.update`; ScrollTrigger `scrollerProxy` stays synced |
| Hover / Mouse | n/a |
| Mobile fallback | `syncTouch: false` (library default) → native touch scrolling, no smoothing |

## 03 — Heading reveals (WHAT I DO /, SELECTED WORKS /, etc.)

| Field | Detail |
|---|---|
| Element | Section headings and long intro paragraphs |
| Trigger | `useInView(ref, { once: true })` — fires once **[extracted]** |
| Initial state | Per word/char: `y: "100%"`, `opacity: 0`, inside `overflow: hidden` |
| Animation | `y: 0`, `opacity: 1` |
| Duration | `0.4s` per item **[extracted]** |
| Easing | `easeOut` **[extracted]** |
| Scroll behaviour | Reveal only, **not** scrubbed (`once: true`) |
| Hover | n/a |
| Mouse | n/a |
| Mobile fallback | Word-level retained; character-level downgraded to word-level |

Stagger is exposed as a `delayperwords` prop, observed at `0` and `0.01` with base
`delay` of `0.3`, `0.5`, `0.7` **[extracted]**. Different blocks deliberately use
different splitting (word vs char) and different bases, so no two headings animate identically.

## 04 — Section transitions (the "expensive" feel)

| Field | Detail |
|---|---|
| Element | Section wrappers |
| Trigger | ScrollTrigger, scrubbed |
| Initial state | `scale: 1`, `y: 0`, `opacity: 1` |
| Animation A (leaving) | `scale: .95`, `y: 42`, `opacity: 0` — `start: "top 100%"`, `end: "top 40%"` **[extracted]** |
| Animation B (pinned depth) | `scale: .95`, `y: -100` — `start: "top -10%"`, `end: "bottom 30%"` **[extracted]** |
| Duration | Scroll-linked (`scrub: true`) |
| Easing | `none` **[extracted]** |
| Scroll behaviour | Sections recede/fade as they exit rather than cutting |
| Hover / Mouse | n/a |
| Mobile fallback | Reduce or drop — costly on low-end GPUs |

Other observed trigger windows: `start: "top -20%"`, `start: "top +=20%"`,
`end: "top -60%"`, `end: "bottom top+=33%"` **[extracted]**.

## 05 — Custom cursor

| Field | Detail |
|---|---|
| Element | Fixed dot appended to `body` |
| Trigger | `mousemove` on `window` |
| Initial state | Small circle, `pointer-events: none`, `mix-blend-mode: difference` **[extracted]** |
| Animation | Per-frame lerp: `cur += (target - cur) * 0.12` inside `requestAnimationFrame`, applied via `translate3d()` **[extracted]** |
| Duration | Continuous |
| Easing | Lerp factor `0.12` — noticeable trail without feeling sluggish **[extracted]** |
| Scroll behaviour | Fixed |
| Hover | Over `.custom-cursor-area` the cursor expands and a `<span>` with text **"View"** is injected (`text-xs font-bold`, black text on the expanded disc) **[extracted]** |
| Mouse | Position-driven only |
| Mobile fallback | Not created on touch/coarse pointers |

The reference gates the expanded state on a **class-based hit area**
(`document.querySelectorAll(".custom-cursor-area")`), which is the pattern we adopt.
`mix-blend-mode: exclusion` also appears on one accent headline.

## 06 — Project image reveal + hover

| Field | Detail |
|---|---|
| Element | Project media |
| Trigger | ScrollTrigger enter, once |
| Initial state | `clip-path: inset(0 0 100% 0)`, `scale: 1.3`, `opacity: 0` **[extracted]** |
| Animation | `clip-path: inset(0 0 0 0)`, `scale: 1`, `opacity: 1` |
| Duration | `1.8s` **[extracted]** |
| Easing | `power3.out` **[extracted]** |
| Scroll behaviour | Reveal once; separate scrubbed parallax on the inner image |
| Hover | Subtle scale-up, overlay shift, cursor → "View", title reacts, arrow translates |
| Mouse | Image drifts toward pointer, GSAP `quickTo` **[extracted: `quickTo` present in vendor chunk]** |
| Mobile fallback | Reveal kept; hover + mouse-follow dropped |

## 07 — Link + arrow micro-interactions

| Field | Detail |
|---|---|
| Element | Text links, nav items, `↗` arrows |
| Trigger | `:hover` / `whileHover` |
| Initial state | Underline `scaleX(0)`; two stacked text layers |
| Animation | Underline `scaleX(0 → 1)`; nav label swaps on Y |
| Duration | `0.15s` for micro states, `0.3–0.5s` for text swap **[extracted]** |
| Easing | `cubic-bezier(.4, 0, .2, 1)` micro; `cubic-bezier(.77, 0, .175, 1)` swap **[extracted]** |
| Scroll behaviour | n/a |
| Hover | Arrow translates ~`x: 3px, y: -3px` |
| Mouse | Magnetic offset on primary CTAs |
| Mobile fallback | Static; no magnetic, no swap |

## 08 — Ambient / decorative

| Field | Detail |
|---|---|
| Availability badge | `animation: pulse-subtle 1.8s ease-in-out infinite`, keyframes `opacity 1 → .85 → 1` **[extracted]** |
| Loading dots | `@keyframes dot` — `opacity: 1`, `33% { opacity: 0 }` **[extracted]** |
| Text scramble | Random `A–Z` substitution on an interval, progressively locking characters left→right **[extracted]** |
| Marquee | No JS marquee found in the page chunk — CSS/transform driven **[inferred]** |
| Mobile fallback | Keep pulse (cheap); drop scramble |

---

## Decisions this drives for our implementation

1. **Reveal duration long, stagger tiny.** 0.4s per item with 0.01–0.06s stagger, not 0.8s with 0.2s stagger.
2. **`power3.out` / `expo.out` for entrances, `ease: "none"` for everything scrubbed.**
3. **Masked reveals use `clip-path: inset(0 0 100% 0)` + `scale` overshoot** (1.08–1.3 → 1), never a bare opacity fade.
4. **Load order via explicit delays** off one timeline, ~0.3s → ~1.3s.
5. **Cursor lerp 0.12**, class-gated hit areas, `mix-blend-mode: difference`.
6. **Sections recede on exit** (`scale .95`, `y`, fade, scrubbed) for section transitions.
7. **Vary the split mode per heading** — word, char, and line reveals mixed deliberately.
8. Everything mouse-dependent is gated behind `(hover: hover) and (pointer: fine)`, and the whole
   system collapses to instant under `prefers-reduced-motion: reduce`.
