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
  /** Public path, e.g. "/other-work/my-project.webp". */
  image: string;
  /** Optional short description. */
  description?: string;
  /** Optional year label. */
  year?: string;
  /** Optional live-demo link — opens in a new tab. */
  href?: string;
  /** Optional GitHub link — opens in a new tab. */
  github?: string;
  /** Optional technology tags. */
  tech?: string[];
};

export const designsIntro = {
  title: "Other Work",
  subtitle:
    "A collection of my visual experiments, UI designs, creative work, and other projects.",
} as const;

// Card images are real 1280px screenshots captured from each live site and
// stored in `public/other-work/`. To add a project: drop its screenshot there
// and add one entry below.
export const designs: Design[] = [
  {
    title: "HandWaveXR",
    category: "3D / Computer Vision",
    year: "2025",
    image: "/other-work/handwavexr.webp",
    description:
      "An interactive 3D hand controller: webcam hand tracking with MediaPipe Hands drives objects in a live Three.js scene, with real-time pose estimation and depth.",
    href: "https://hand-wave-xr.vercel.app/",
    github: "https://github.com/KuldeepMahto07/HandWaveXR",
    tech: ["MediaPipe Hands", "Three.js", "JavaScript", "Computer Vision", "3D Rendering"],
  },
  {
    title: "Lumen",
    category: "Brand / Editorial Web",
    year: "2025",
    image: "/other-work/lumen.webp",
    description:
      "An editorial brand site for a Porto performance-cycling collective — a dark, motion-driven experience with smooth scrolling where rain, gradient and wind are treated as data.",
    href: "https://lumen-mauve-nine.vercel.app/",
    github: "https://github.com/KuldeepMahto07/lumen-",
    tech: ["Next.js", "React", "GSAP", "Lenis", "TypeScript"],
  },
  {
    title: "Aura AI",
    category: "AI / Web Design",
    year: "2025",
    image: "/other-work/aura-ai.webp",
    description:
      "A premium, AI-themed web-design concept — a dark interface with a globe hero, a prompt-to-production visualizer, an interactive terminal, magnetic UI and scroll-linked animation.",
    href: "https://aura-ai-magic-web-design.vercel.app/",
    github: "https://github.com/KuldeepMahto07/aura-ai",
    tech: ["React", "Vite", "Tailwind CSS", "Framer Motion", "Lucide React"],
  },
  {
    title: "NewPFWeb",
    category: "Web Design / Portfolio",
    year: "2025",
    image: "/other-work/newpfweb.webp",
    description:
      "An earlier personal-portfolio concept — a light, editorial single-page site with oversized type, a services breakdown and GSAP-driven motion.",
    href: "https://newpfweb.vercel.app/",
    github: "https://github.com/KuldeepMahto07/newpfweb",
    tech: ["Next.js", "GSAP", "SCSS", "TypeScript"],
  },

  // ── Add more real projects here ──
  // Drop a screenshot in `public/other-work/` and copy an entry above,
  // setting `image`, `href`, `github` and `tech`.
  //
  // The empty placeholder cards that used to sit here are kept below (commented
  // out) so the gallery reads as a curated set of real projects rather than a
  // template. Uncomment any you want to show as an empty slot:
  //
  // { title: "Design 01", category: "UI/UX", year: "2025", image: "" },
  // { title: "Design 02", category: "Web Design", year: "2025", image: "" },
  // { title: "Design 03", category: "Social Media", year: "2025", image: "" },
  // { title: "Design 04", category: "Creative", year: "2025", image: "" },
  // { title: "Design 05", category: "Experiments", year: "2025", image: "" },
  // { title: "Design 06", category: "Other Projects", year: "2025", image: "" },
];
