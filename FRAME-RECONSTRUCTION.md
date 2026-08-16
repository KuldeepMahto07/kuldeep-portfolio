# Frame reconstruction (Step 0)

Read from the 10 supplied frames **in their given order**, before writing code.
Frames were captured at different window sizes (1024×536 … 1009×1024), so every
measurement below is expressed as a **proportion of viewport width/height**, not
as raw pixels from any single frame.

## Frames are states, not sections

| Frames | What they actually are |
|---|---|
| 1 → 2 → 3 | **One** transition: light hero handing off to the dark sheet. Frame 2 is mid-transition, frame 3 is post-transition. Not three sections. |
| 3 → 4 → 5 → 6 → 7 | **One continuous dark canvas.** "What I Do" heading, then the service rows progressively stacking. Not separate sections. |
| 7 → 8 → 9 → 10 | Still the same dark canvas: Selected Works heading, then each project state. Not project cards. |

## The hero handoff (frames 1 → 2 → 3)

Frame 2 is the key evidence. Relative to frame 1 the hero name is **lower,
slightly smaller and desaturated to grey**, while a black sheet with rounded top
corners has entered from the bottom edge showing only the top of `WHAT I DO /`.

That is a scroll-scrubbed recede, and it matches the tween I previously
extracted from the reference bundle exactly:

```
scale: 1 → .95      y: 0 → +42px      opacity: 1 → 0     ease "none", scrub
```

Note `y` is **positive** — the hero content drifts *down* as it fades, which is
why the name sits lower in frame 2. The light hero canvas itself stays put
(pinned) behind the incoming sheet; in frame 3 roughly the top half of the
viewport is still light while the black sheet occupies the bottom half.

Sheet corner radius ≈ 28px, sheet stacks above the hero.

## Service rows stack (frames 4 → 5 → 6 → 7)

This is the detail I would have missed without frame 5 and 6.

- Frame 4: `(01)` row visible with its description and tech rows.
- Frame 5: `(02)` row header has slid up and **covers** `(01)`'s tech rows — the
  row "REST APIs, Firebase, Docker" is clipped behind it.
- Frame 6: `(01)`, `(02)`, `(03)` headers are all piled up ~64px apart, with only
  `(03)`'s body visible.
- Frame 7: the same three-header pile, then the stack scrolls away.

So each service row is **sticky with an opaque background**, stacking at
increasing top offsets (row *n* sticks at `n × rowHeight`). It is not an
accordion and not three cards.

## Geometry (proportions of viewport width)

| Element | Value |
|---|---|
| Page padding inline | ~1.8vw (18–24px) |
| Hero name | ~16.5vw, weight 500, tracking −.065em, line-height .78, one line, spans ~97% width |
| Section heading (`WHAT I DO /`, `SELECTED WORKS /`) | ~8.5vw, weight 600, tracking −.05em |
| Right column start (services + works) | ~42% |
| Paragraph column start | ~52% |
| `(SERVICES)` / `(PROJECTS)` label | ~43%, 10–11px mono uppercase |
| Service title | ~3.4vw, weight 600 |
| Service index `(01)` | ~3.7vw, weight 400 |
| **Giant project index** | **~21vw**, mono, grey `#A8A7A1`, bleeds toward the left edge |
| Project visual | ~55% width, aspect ≈ 1:1, right column |
| Body copy | ~15px / 1.45 |
| Gap between project states | ~12vh |

## Typography

Two families only:

- **Grotesk** (Inter) — nav, all headings, service titles, body.
- **Mono** (JetBrains Mono) — the giant project indices, micro labels
  (`(SERVICES)`, `(PROJECTS)`), tech-row numbers, project captions and pills.

The giant `01` in the frames has a **dotted/slashed zero**, which is what
identifies it as the mono face rather than the grotesk. No serif anywhere.

## Sticky vs scrolling

| Sticky / fixed | Scrolls normally |
|---|---|
| Hero sheet (pinned behind the rising dark sheet) | Hero *contents* (recede + fade) |
| Each service row header (stacking) | Service descriptions and tech rows |
| Giant project index (within its own project state) | Project visuals and captions |
| Circular menu button (fixed, appears over the dark canvas) | Top nav — scrolls away with the hero, it is **not** fixed |

## Colour rhythm

`#F0F0EB` light hero → `#080A07` dark canvas (services + works + identity +
skills) → light editorial → `#080A07` contact sheet → **light footer**.

Light text `#E8E8E2`, muted `#A8A7A1`. No accent colour.

## Not present in the frames

The identity statement (`AI ENGINEER / AI BUILDER / CREATOR/`), skills columns,
about, experience, certifications, education, contact and footer come from the
written brief, and follow the same editorial language.
