# Kuldeep Mahto — Portfolio

Single-page portfolio for **Kuldeep Mahto**, Full Stack Developer.
Next.js (App Router) + TypeScript, with a motion system built on GSAP,
ScrollTrigger and Lenis.

Motion is not a layer on top of this site — every section defines its own
initial state, entrance, scroll behaviour, hover/mouse interaction and mobile
fallback. 
## Stack

| Concern | Choice |
|---|---|
| Framework | Next.js 15 (App Router), static export |
| Language | TypeScript (strict) |
| Animation | GSAP + ScrollTrigger |
| Smooth scroll | Lenis, driven off GSAP's ticker |
| Text splitting | Hand-rolled (`SplitText`) — no SplitType dependency |
| Styles | SCSS modules + CSS custom properties |

## Structure

```
app/                     layout (fonts, metadata, providers) + page
components/
  layout/                Nav, SectionHead, Footer
  sections/              Hero, WhatIDo, SelectedWorks, Skills,
                         MarqueeBand, About, Experience, Contact
  projects/ProjectCard   editorial case-study card
  motion/                reusable motion primitives
hooks/                   useGsap, useLenis, useMousePosition,
                         useMotionPreference
data/content.ts          all copy in one place
lib/asset.ts             basePath-aware asset URLs
styles/                  tokens (vars + mixins) and globals
```

Animations live in the primitives and in each section's own `useGsapContext`
call — never in `page.tsx`. Every context is scoped with `gsap.context()` so
tweens and ScrollTriggers revert on unmount.

## The two scroll systems

The page runs two distinct scroll compositions, both on one global Lenis
instance (no nested smooth-scroll containers, no second instance).

**1. Section sheet stacking.** Major sections behave like layered sheets: the
outgoing sheet is `position: sticky; top: 0` and the incoming one is normal
flow with a higher `z-index` and rounded top corners, so it slides up and
covers it. This is deliberately **pure CSS** — no ScrollTrigger — which is why
it is exactly reversible, freezes wherever you stop scrolling, and can never
desync from Lenis. The previous section's *contents* recede separately
(`SectionTransition`), which is what produces the reference's state at ~4s:
light canvas still visible up top, hero copy already gone.

Tonal rhythm: light hero → dark content → light editorial → dark contact →
**light footer**, revealed beneath the contact sheet.

> Sheets must never set `overflow: hidden`/`clip`. That would re-root any
> `position: sticky` descendant to the sheet instead of the viewport and
> silently kill the Works index. `border-radius` alone clips the background.

**2. Selected Works choreography.** A two-zone composition: an enormous index
(~290px, ~26vh) anchored on the left ~40%, and the dominant project visual on
the right ~60% (~73vh tall). The index is `position: sticky` inside its own
grid cell, and the cell is as tall as the row — so `01` stays anchored for
~720px of scrolling, then hands off to `02` as the next row arrives. Again
CSS-driven, so scrolling up reverses it precisely.

Two constraints worth knowing before changing this:
- The row must be `align-items: stretch`. With `start`, the index column
  collapses to content height and the number drifts instead of anchoring.
- Anchor duration is bought with row height, but too much leaves a dead band
  under each project. 135vh is the balance struck here.

## Motion primitives

- `SmoothScroll` — Lenis + ScrollTrigger, one shared RAF loop
- `CustomCursor` — lerped follower with `default / link / button / project / image` states
- `MagneticButton` — cursor-attracted buttons via `quickTo`
- `SplitText` / `TextReveal` — masked line, word and character reveals
- `ImageReveal` — `clip-path` wipe + de-scale, plus scrubbed parallax
- `ParallaxLayer`, `Reveal`, `SectionTransition`, `Marquee`

## Accessibility & responsiveness

- `prefers-reduced-motion: reduce` disables Lenis, the custom cursor and all
  transforms; content renders in its final state.
- Pre-animation hidden states are gated behind `html.motion`, added before
  first paint — so no-JS and reduced-motion visitors never get hidden content.
- Mouse-dependent effects are gated on `(hover: hover) and (pointer: fine)`.
- Split text carries an `aria-label`; decorative duplicates are `aria-hidden`.

## Development

```bash
npm install
npm run dev        # http://localhost:3000
npm run typecheck
npm run build      # static export to ./out
```

## Deployment

The app is a fully static export (`output: "export"` in `next.config.ts`), so it
can be hosted either way.

### GitHub Pages

Pushes to `main` build and publish via `.github/workflows/deploy-pages.yml`.
Enable it once under **Settings → Pages → Source: GitHub Actions**.

Project Pages are served from `/<repo>`, so the workflow passes `BASE_PATH` and
the app applies it as `basePath`. Because `images.unoptimized` makes next/image
emit `src` verbatim, public assets go through `lib/asset.ts` to pick up that
prefix.

### Vercel

Because this is a static export, `vercel.json` deploys it as a **plain static
site** rather than through Vercel's Next.js serverless builder:

```json
{ "framework": null, "buildCommand": "next build", "outputDirectory": "out" }
```

`framework: null` is the important part. With the Next.js preset, Vercel's
builder expects a serverless `.next` output and fails after the build, since
`output: "export"` only produces the static `out/` directory. Setting the
framework to `null` makes Vercel run the build and serve `out/` as static files
directly. In the project's dashboard, set **Framework Preset → Other** so it
matches this config.

**Do not set a `BASE_PATH` environment variable on Vercel.** It exists only for
the Pages sub-path; setting it would prefix every asset with the repo name and
break the site at the domain root.

## Content accuracy

Project details were taken from the actual sources rather than written from
memory: the Yummi repository (README, `package.json`, routes, bundled assets)
and Deblo's public landing page plus its `package.json`. Yummi ships no
screenshots, so its card shows the project's own in-app illustration and says
so. Deblo's card uses a real capture of its landing page and keeps its own
"not for real medical use" disclaimer. No metrics are claimed anywhere.
