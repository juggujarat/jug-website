// Border width, radius, padding and font live in `shape` (not in the base)
// because conflicting Tailwind utilities are resolved by stylesheet order,
// not class-string order.
export const BUTTON_SHAPES = {
  // Experts / Volunteer section buttons
  default: 'border rounded-2xl px-7 py-[19px] sm:px-3 sm:py-[6px] sm:text-[12px]',
  // Header "Join Community"
  header: 'border-2 rounded-lg px-7 py-5 font-medium',
  // Card CTAs (event card Register/Details, event-detail hero Register/Event
  // page, "View full gallery"…) — unlike `default`, stays >=44px tall at
  // every width (WCAG 2.2 target size) instead of shrinking to ~30px on sm.
  card: 'border rounded-2xl px-6 py-[14px] text-[16px] leading-[24px] sm:px-5 sm:py-[12px] sm:text-[14px] sm:leading-[20px] min-h-[44px]',
};
