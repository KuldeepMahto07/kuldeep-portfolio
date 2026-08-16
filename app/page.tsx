import Hero from "@/components/sections/Hero";
import Services from "@/components/sections/Services";
import SelectedWorks from "@/components/sections/SelectedWorks";
import Identity from "@/components/sections/Identity";
import About from "@/components/sections/About";
import Contact from "@/components/sections/Contact";
import Footer from "@/components/layout/Footer";
import FloatingMenu from "@/components/layout/FloatingMenu";
import SectionSheet from "@/components/motion/SectionSheet";
import SectionTransition from "@/components/motion/SectionTransition";

/**
 * Sheet stacking, reconstructed from frames 1 → 3 and the contact → footer end.
 *
 * The hero sheet is pinned, so its light canvas stays behind while the dark
 * sheet slides up over it with rounded top corners. The hero *contents* recede
 * separately (scale .95 / y +42 / fade, scrubbed) — which is exactly what
 * frame 2 shows: the name lower, smaller and grey, black sheet entering below.
 *
 * Tonal rhythm from the frames:
 *   light hero -> dark canvas (services + works + identity/skills)
 *   -> light editorial (about) -> dark contact sheet -> LIGHT footer
 */
export default function Home() {
  return (
    <>
      <main>
        <SectionSheet tone="light" z={1} pinned>
          {/* sticky on the sheet, transform on the inner wrapper, so the
              transformed element never breaks the sticky containing block */}
          <SectionTransition triggerSelector="#services">
            <Hero />
          </SectionTransition>
        </SectionSheet>

        {/* One continuous dark canvas — frames 3 through 10 */}
        <SectionSheet tone="dark" z={2} rise>
          <Services />
          <SelectedWorks />
          <Identity />
        </SectionSheet>

        <SectionSheet tone="light" z={3} rise>
          <About />
        </SectionSheet>

        <SectionSheet tone="dark" z={4} rise>
          <Contact />
        </SectionSheet>
      </main>

      {/* Physically underneath the dark contact sheet, not faded in */}
      <SectionSheet tone="light" z={5}>
        <Footer />
      </SectionSheet>

      <FloatingMenu />
    </>
  );
}
