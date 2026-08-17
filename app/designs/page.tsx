import type { Metadata } from "next";
import Link from "next/link";
import DesignGallery from "@/components/designs/DesignGallery";
import CircleNav from "@/components/layout/CircleNav";
import { designsIntro } from "@/data/designs";
import styles from "./designs.module.scss";

const pageTitle = `${designsIntro.title} — Kuldeep Mahto`;

export const metadata: Metadata = {
  title: pageTitle,
  description: designsIntro.subtitle,
  alternates: { canonical: "/designs" },
  openGraph: {
    type: "website",
    title: pageTitle,
    description: designsIntro.subtitle,
    url: "https://kuldeep-portfolio-yltc.vercel.app/designs",
  },
};

export default function DesignsPage() {
  return (
    <main className={styles.page}>
      <header className={styles.header}>
        <Link href="/" className={styles.back} data-cursor="link">
          <span className={styles.backArrow} aria-hidden="true">
            ←
          </span>
          Back
        </Link>

        <div className={styles.intro}>
          <h1 className={styles.title}>{designsIntro.title}</h1>
          <p className={styles.subtitle}>{designsIntro.subtitle}</p>
        </div>
      </header>

      <div className={styles.galleryWrap}>
        <DesignGallery />
      </div>

      {/* Circular control mirrors the homepage button — returns to the portfolio. */}
      <CircleNav href="/" label="Back to portfolio" text="Back" variant="back" tone="dark" />
    </main>
  );
}
