/**
 * All site copy in one place. CONTENT ONLY — no component, style, or motion
 * concerns live here, so updating identity/copy never touches the layout or
 * animation system.
 *
 * All information strictly reflects Kuldeep Mahto's verified resume and details.
 */

export const profile = {
  name: "Kuldeep Mahto",
  /** Tiny nav label, top-left of the hero. */
  navLabel: "Full Stack Developer",
  role: "Full Stack Developer | AI Engineer",
  location: "Greater Noida, Uttar Pradesh, India",
  email: "kuldeep1702k@gmail.com",
  phone: "+91 8340483827",
  github: "https://github.com/KuldeepMahto07",
  githubHandle: "KuldeepMahto07",
  linkedin: "https://www.linkedin.com/in/kuldeep07",
  linkedinName: "Kuldeep Mahto",
  portfolio: "https://kuldeep-portfolio-yltc.vercel.app/",
  tagline:
    "Building scalable web applications, AI-powered products, and blockchain solutions.",
  availability: "Availability",
  availabilityStatus: "Open to opportunities",
  /**
   * Hero portrait asset path.
   */
  portrait: "/assets/portrait.jpg",
  portraitAlt: "Kuldeep Mahto",
  resume: "/assets/Kuldeep-Mahto-Resume.pdf",
} as const;

export const navLinks = [
  { label: "Services", href: "#services" },
  { label: "Works", href: "#works" },
  { label: "Skills", href: "#skills" },
  { label: "About", href: "#about" },
  { label: "Contact", href: "#contact" },
] as const;

export const menuLinks = [
  { label: "Home", href: "#top" },
  { label: "Services", href: "#services" },
  { label: "Works", href: "#works" },
  { label: "Skills", href: "#skills" },
  { label: "About", href: "#about" },
  { label: "Contact", href: "#contact" },
] as const;

export const whatIDo = {
  heading: "What I Do /",
  label: "(Services)",
  intro:
    "I build complete, high-performance digital products across full-stack engineering, AI integration, and Web3 architectures — from responsive web platforms to intelligent healthcare and payment systems.",
} as const;

export type Service = {
  num: string;
  title: string;
  description: string;
  tech: string[];
};

export const services: Service[] = [
  {
    num: "(01)",
    title: "Full-Stack Web Development",
    description:
      "I build complete, production-ready web applications with modern frontend frameworks, scalable backend architectures, RESTful APIs, and optimized databases.",
    tech: [
      "React.js, Next.js, Redux",
      "Node.js, Express.js, Django",
      "PostgreSQL, MongoDB, GraphQL",
      "REST APIs, Docker & AWS EC2",
    ],
  },
  {
    num: "(02)",
    title: "AI Engineering & Integration",
    description:
      "I integrate state-of-the-art AI models and intelligent workflows into production applications — including LLM integration, voice agents, and automated reporting.",
    tech: [
      "Gemini 2.5 Flash & OpenAI NLP",
      "Real-Time Voice (Vapi.ai & AssemblyAI)",
      "Automated Medical Report Generation",
      "Interactive Analytics & Dashboards",
    ],
  },
  {
    num: "(03)",
    title: "Blockchain & Web3 Solutions",
    description:
      "I develop decentralized payment workflows and Web3 applications connecting crypto ecosystems with seamless fiat off-ramps and wallet authentication.",
    tech: [
      "Solana Blockchain Integration",
      "Phantom Wallet Authentication",
      "Crypto-to-Fiat Payment Workflows",
      "PayPal SDK Instant Payouts",
    ],
  },
];

export const worksIntro = {
  heading: "Selected Works /",
  label: "(Projects)",
  intro:
    "A selection of full-stack, AI-powered, and Web3 applications built to solve real-world problems.",
} as const;

export type Project = {
  index: string;
  title: string;
  category: string;
  year: string;
  discipline: string;
  href: string;
  linkLabel: string;
  /** Optional secondary link — renders a "GitHub" action alongside the primary one. */
  github?: string;
  description: string;
  stack: string[];
  image: string;
  imageAlt: string;
  fit: "cover" | "contain";
  assetNote?: string;
  highlights?: string[];
};

export const projects: Project[] = [
  {
    index: "01",
    title: "Deblo",
    category: "AI Healthcare Assistant",
    year: "2025",
    discipline: "Full Stack / AI",
    href: "https://deblo.com",
    linkLabel: "Live Demo",
    description:
      "Built a full-stack AI healthcare assistant with PostgreSQL and Drizzle ORM, enabling voice/text consultations, medical report generation, doctor recommendations, and feature enhancements based on feedback from 50+ users.",
    stack: [
      "Next.js",
      "PostgreSQL",
      "Gemini 2.5",
      "Drizzle ORM",
      "OpenAI",
      "Vapi.ai",
      "AssemblyAI",
      "Recharts",
    ],
    image: "/assets/deblo-hero.jpg",
    imageAlt: "Deblo AI Healthcare Assistant: AI clinic dashboard with live consultation panel",
    fit: "cover",
    highlights: [
      "Integrated OpenAI for NLP and Gemini 2.5 Flash for medical report generation",
      "Auto-generated 150+ medical reports & enabled 75+ voice consultations",
      "Used Vapi.ai and AssemblyAI for real-time voice functionality",
      "Managed 100+ medical sessions, notes, and billing with Recharts analytics",
    ],
  },
  {
    index: "02",
    title: "Reelio",
    category: "AI Video & Meeting Intelligence",
    year: "2025",
    discipline: "AI / RAG · Full Stack",
    href: "https://reelio-khaki.vercel.app/",
    linkLabel: "Live Demo",
    github: "https://github.com/KuldeepMahto07/reelio",
    description:
      "AI-powered video and meeting intelligence platform that turns videos, meetings, podcasts, and uploaded media into searchable knowledge bases with grounded RAG answers and timestamped citations.",
    stack: [
      "FastAPI",
      "React",
      "PostgreSQL + pgvector",
      "RAG",
      "Mistral AI",
      "Redis + Celery",
      "LangChain",
      "Docker",
    ],
    image: "/assets/reelio-mark.svg",
    imageAlt: "Reelio — AI video & meeting intelligence platform",
    fit: "contain",
    assetNote: "No public screenshot bundled — open the live demo to explore.",
    highlights: [
      "RAG conversational AI over videos, meetings & podcasts with timestamped citations",
      "Hybrid vector + keyword search on PostgreSQL/pgvector with semantic chunking",
      "Speech-to-text via Groq Whisper (English) and Sarvam AI (Hindi/Hinglish)",
      "Real-time streaming over SSE, with background processing on Celery + Redis",
    ],
  },
  {
    index: "03",
    title: "SanFi",
    category: "Solana-Powered Payment Gateway",
    year: "2025",
    discipline: "Blockchain & Web3",
    href: "https://github.com/KuldeepMahto07",
    linkLabel: "View on GitHub",
    description:
      "Built a decentralized payment gateway enabling Solana payments while merchants received instant fiat payouts through PayPal SDK. Developed full-stack application using React.js and Django with Phantom Wallet integration.",
    stack: [
      "React.js",
      "Django",
      "Solana",
      "PayPal SDK",
      "Phantom Wallet",
      "REST APIs",
    ],
    image: "/assets/sanfi-mark.svg",
    imageAlt: "SanFi wordmark — Solana-powered payment gateway",
    fit: "contain",
    assetNote: "No public screenshot available — explore the source on GitHub.",
    highlights: [
      "Decentralized payment gateway enabling fast Solana blockchain transactions",
      "Instant fiat payouts to merchants through integrated PayPal SDK",
      "Phantom Wallet integration with one-click checkout for fast Web3 payments",
      "Full-stack architecture built with React.js and Django",
    ],
  },
  {
    index: "04",
    title: "Keyzen",
    category: "Typing Test PWA",
    year: "2025",
    discipline: "Frontend · PWA",
    href: "https://keyzen-psi.vercel.app/",
    linkLabel: "Live Demo",
    github: "https://github.com/KuldeepMahto07/Keyzen",
    description:
      "Offline-capable typing test with mechanical keyboard sounds, real-time WPM analytics, virtual keyboard visualization, personal best tracking, and PWA support.",
    stack: [
      "Next.js",
      "React",
      "TypeScript",
      "Tailwind CSS",
      "Web Audio API",
      "Recharts",
      "Serwist (PWA)",
      "Drizzle ORM",
    ],
    image: "/assets/keyzen-mark.svg",
    imageAlt: "Keyzen — offline-capable typing test PWA",
    fit: "contain",
    assetNote: "No public screenshot bundled — open the live demo to try it.",
    highlights: [
      "Time, word-count, quote & zen modes with punctuation and number modifiers",
      "Mechanical keyboard sounds via the Web Audio API and a virtual 78-key keyboard",
      "Live WPM, accuracy, consistency and WPM-over-time charts with personal bests",
      "Installable, offline-first PWA with JSON/CSV export and persistent settings",
    ],
  },
];

/** Three lines, matching the stacked-statement typography. */
export const identityLines = ["Full Stack", "AI Engineer", "Software/"] as const;

export const skillGroups = [
  {
    label: "Frontend",
    items: [
      "React.js",
      "Next.js",
      "Redux",
      "Bootstrap",
      "GSAP",
      "React Native",
    ],
  },
  {
    label: "Backend",
    items: [
      "Node.js",
      "Express.js",
      "Django",
      "REST APIs",
    ],
  },
  {
    label: "Languages",
    items: ["JavaScript", "Python", "SQL"],
  },
  {
    label: "Databases",
    items: [
      "PostgreSQL",
      "MongoDB",
      "GraphQL",
    ],
  },
  {
    label: "AI",
    items: [
      "Gemini 2.5",
      "OpenAI",
      "Vapi.ai",
      "AssemblyAI",
    ],
  },
  {
    label: "Blockchain / Web3",
    items: [
      "Solana",
      "Phantom Wallet",
      "PayPal SDK",
      "Crypto-to-Fiat Payments",
    ],
  },
  {
    label: "Tools / Cloud",
    items: [
      "Git",
      "Docker",
      "AWS EC2",
      "Postman",
      "VS Code",
      "MongoDB Compass",
    ],
  },
] as const;

export const about = {
  headingLines: ["Engineering scalable", "web & AI systems."],
  label: "(About)",
  paragraphs: [
    "I'm a Full Stack Developer and AI Engineer focused on building robust, scalable web applications, intelligent AI integrations, and blockchain solutions.",
    "My technical toolkit spans modern frontend development with React.js and Next.js, backend and API architecture with Node.js, Express.js, and Django, relational and document datastores with PostgreSQL and MongoDB, and real-world AI implementations using Gemini 2.5 and OpenAI.",
  ],
} as const;

export type Job = {
  company: string;
  role: string;
  period: string;
  location: string;
  tech: string[];
  details: string[];
};

export const experience: Job[] = [
  {
    company: "IBM SkillBuild Program",
    role: "Web Development Intern",
    period: "Internship",
    location: "Virtual Experience",
    tech: ["HTML", "CSS", "JavaScript", "Bootstrap", "GitHub", "Agile"],
    details: [
      "Built and deployed responsive web applications using HTML, CSS, JavaScript, and Bootstrap.",
      "Developed projects focused on frontend design, UI/UX principles, responsive layouts, and cross-browser compatibility.",
      "Used GitHub for version control and collaboration within a professional development workflow.",
      "Earned IBM SkillBuild certifications in Web Development and Agile Practices.",
    ],
  },
];

export const certifications = [
  "IBM SkillBuild — Web Development",
  "IBM SkillBuild — Agile Practices",
] as const;

export const education = [
  {
    school: "Galgotias University, Greater Noida, Uttar Pradesh",
    degree: "Bachelor of Technology in Computer Science and Engineering",
    year: "August 2021 — July 2025",
    gpa: "GPA: 7.2/10",
  },
] as const;

export const achievements = [
  {
    title: "Smart India Hackathon (SIH)",
    description:
      "Participated in Smart India Hackathon (SIH) and contributed to real-world, time-bound solution development and collaborative team-based project design and implementation.",
  },
] as const;

export const contact = {
  headingLines: ["Let's build", "something", "remarkable."],
  fields: [
    { id: "name", label: "Name", type: "text" },
    { id: "email", label: "Email", type: "email" },
  ],
  messageLabel: "Tell me about your project",
  submit: "Send message",
} as const;
