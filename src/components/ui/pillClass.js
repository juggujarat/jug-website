// Base pill classes (rounded badge/tag: eyebrow text, "Meetup"/"Online",
// session type, resource links…). Padding/text size lives in `size` because
// Tailwind resolves conflicting utilities by stylesheet order, not
// class-string order (same reasoning as buttonShapes.js).
const BASE = 'inline-block rounded-full border font-medium tracking-[1%]';

const SIZES = {
  // 404 page eyebrow, EventDetailPage "Meetup"/"Online" hero badges.
  default: 'whitespace-nowrap px-4 py-[6px] text-[12px] sm:px-2 sm:py-[4px] sm:text-[10px]',
  // SessionItem type label + resource links — same size at every width.
  compact: 'whitespace-nowrap px-3 py-[4px] text-[12px]',
};

/**
 * Pill class string, for composing the pill look onto an element the `Pill`
 * component can't be (e.g. an `ExternalLink` that also needs hover classes).
 * @param {'default'|'compact'} [size]
 * @param {string} [tone] bg + border colour classes, e.g. 'bg-white border-black'
 * @param {string} [className] extra classes (hover states, spacing…)
 */
export function pillClass({ size = 'default', tone = 'bg-white border-black', className = '' } = {}) {
  return `${BASE} ${SIZES[size] ?? SIZES.default} ${tone} ${className}`.trim();
}
