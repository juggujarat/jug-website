// Single AOS initialisation for the whole app (called once from SiteLayout).
// AOS's own MutationObserver picks up [data-aos] nodes added later by lazy
// routes, so pages must not call AOS.init themselves (each call would add
// another set of scroll/resize listeners and observers).
// Only call from useEffect / event handlers — AOS touches window/document.

let initialised = false;

export const prefersReducedMotion = () =>
  typeof window !== 'undefined' &&
  typeof window.matchMedia === 'function' &&
  window.matchMedia('(prefers-reduced-motion: reduce)').matches;

/**
 * Idempotent AOS start. aos.css hides every [data-aos] element, so the library
 * and its stylesheet load together and the stylesheet is added in the same task
 * as AOS.init: prerendered sections never flash hidden, sections in view stay
 * visible, the rest animate in on scroll. Without JS or with reduced motion
 * nothing is ever hidden.
 */
export function initAOS() {
  if (initialised || prefersReducedMotion()) return;
  initialised = true;
  Promise.all([import('aos'), import('aos/dist/aos.css?inline')])
    .then(([{ default: AOS }, { default: css }]) => {
      // offset 0: anything already on screen is marked animated in this same
      // task, so it never disappears. The hiding styles go in only after init
      // succeeds, so a failed init leaves everything visible.
      AOS.init({ duration: 1000, offset: 0 });
      const style = document.createElement('style');
      style.textContent = css;
      document.head.append(style);
    })
    // Chunk failed to load: AOS stays off and content stays visible.
    .catch(() => {});
}
