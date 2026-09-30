// Main site navigation (header + footer).
export const NAV_ITEMS = [
  { label: 'Home', to: '/', end: true },
  { label: 'Events', to: '/events' },
  { label: 'Conferences', to: '/conferences', showConferenceStatus: true },
  { label: 'Speakers', to: '/speakers' },
  { label: 'Gallery', to: '/gallery' },
  { label: 'Venue Partners', to: '/partners' },
  { label: 'About', to: '/about' },
];

const matches = (pathname, to, end) =>
  end ? pathname === to : pathname === to || pathname.startsWith(`${to}/`);

/**
 * True when `item` should be shown as the current section. A page can force
 * the section via `activeNav` (see layouts/pageChrome.js); otherwise the
 * URL decides.
 */
export const isNavItemActive = (item, pathname, activeNav) =>
  activeNav ? item.to === activeNav : matches(pathname, item.to, item.end);
