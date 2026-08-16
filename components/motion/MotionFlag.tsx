/**
 * Adds `html.motion` before first paint, but only when the user has not
 * requested reduced motion. Every "hidden until animated" CSS rule is scoped
 * under `html.motion`, so:
 *
 *  - JS disabled        -> class never added -> content visible
 *  - reduced motion     -> class never added -> content visible
 *  - normal             -> class added pre-paint -> no flash of unstyled text
 *
 * Inlined as a blocking script deliberately; it must run before paint.
 */
export default function MotionFlag() {
  const script = `(function(){try{if(!window.matchMedia("(prefers-reduced-motion: reduce)").matches){document.documentElement.classList.add("motion")}}catch(e){}})();`;
  return <script dangerouslySetInnerHTML={{ __html: script }} />;
}
