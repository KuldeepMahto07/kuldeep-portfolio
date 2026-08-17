import DesignCard from "./DesignCard";
import { designs } from "@/data/designs";
import styles from "./DesignGallery.module.scss";

/**
 * Editorial masonry gallery. Layout is pure CSS columns — 3 up on desktop,
 * 2 on tablet, 1 on mobile — so cards flow and keep their aspect ratios.
 */
export default function DesignGallery() {
  if (designs.length === 0) {
    return <p className={styles.empty}>Designs coming soon.</p>;
  }

  return (
    <div className={styles.grid}>
      {designs.map((design, i) => (
        <DesignCard key={`${design.title}-${i}`} design={design} index={i} />
      ))}
    </div>
  );
}
