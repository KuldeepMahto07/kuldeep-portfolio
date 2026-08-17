/**
 * Gallery data for the /designs page.
 *
 * HOW TO ADD A DESIGN
 * 1. Drop the image into `public/designs/` (PNG / JPG / WebP).
 * 2. Add one object to the `designs` array below, pointing `image` at it,
 *    e.g. `image: "/designs/my-design.png"`.
 * That's it — the gallery renders it automatically.
 *
 * Until a real image exists at that path (or if the path is wrong), the card
 * shows a clean placeholder instead of a broken image. The entries below are
 * placeholders — replace them with your real work.
 */

export type Design = {
  title: string;
  category: string;
  /** Public path, e.g. "/designs/my-design.png". */
  image: string;
  /** Optional short description, shown on hover (desktop). */
  description?: string;
  /** Optional year label. */
  year?: string;
  /** Optional external link — opens in a new tab. */
  href?: string;
};

export const designsIntro = {
  title: "Other Work",
  subtitle:
    "A collection of my visual experiments, UI designs, creative work, and other projects.",
} as const;

// A filled-in entry looks like this (add the image to `public/designs/` first):
//
//   {
//     title: "Brand Refresh",
//     category: "UI/UX",
//     year: "2025",
//     image: "/designs/brand-refresh.png",
//     description: "Optional one-line note shown on hover.",
//     href: "https://example.com", // optional external link
//   },
//
// The placeholders below use an empty `image` on purpose, so each card shows a
// clean placeholder (no broken images, no 404s) until you drop in real art.
export const designs: Design[] = [
  { title: "Design 01", category: "UI/UX", year: "2025", image: "" },
  { title: "Design 02", category: "Web Design", year: "2025", image: "" },
  { title: "Design 03", category: "Social Media", year: "2025", image: "" },
  { title: "Design 04", category: "Creative", year: "2025", image: "" },
  { title: "Design 05", category: "Experiments", year: "2025", image: "" },
  { title: "Design 06", category: "Other Projects", year: "2025", image: "" },
];
