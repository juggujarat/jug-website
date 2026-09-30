import { createContext, useContext } from 'react';
import { useOutletContext } from 'react-router-dom';
import { site } from '../content';
import { useIsomorphicLayoutEffect } from '../lib/useIsomorphicLayoutEffect';

// Per-page settings for the shared header, declared by the page itself
// instead of being special-cased by path in the layout.
//   headerTone: background class so the header blends into the page hero
//   activeNav:  main-nav path to highlight (when the URL doesn't sit under it,
//               e.g. the legacy CDJ 2025 URL → '/conferences')
//   headerCta:  { label, href } for the header's right-hand button
//               (defaults to the site-wide "Join Community" link)
export const DEFAULT_PAGE_CHROME = {
  headerTone: 'bg-[#E1EEFB]',
  activeNav: null,
  headerCta: { label: 'Join Community', href: site.joinUrl },
};

// Prerender support. The header renders before the page, so the prerender
// renders twice: pass 1 `collect`s the chrome the page declares, pass 2 and
// the hydrating client start the layout from it (`initial`).
export const PageChromeContext = createContext({});

const toChrome = (headerTone, activeNav, ctaLabel, ctaHref) => ({
  headerTone: headerTone ?? DEFAULT_PAGE_CHROME.headerTone,
  activeNav: activeNav ?? DEFAULT_PAGE_CHROME.activeNav,
  headerCta: ctaLabel && ctaHref ? { label: ctaLabel, href: ctaHref } : DEFAULT_PAGE_CHROME.headerCta,
});

/** Call from a route page to override the header chrome while it is mounted. */
export function usePageChrome({ headerTone, activeNav, headerCta } = {}) {
  const { setPageChrome } = useOutletContext() ?? {};
  const { collect } = useContext(PageChromeContext);
  const ctaLabel = headerCta?.label;
  const ctaHref = headerCta?.href;
  collect?.(toChrome(headerTone, activeNav, ctaLabel, ctaHref));
  // Layout effect: applied before paint → no header colour flash.
  useIsomorphicLayoutEffect(() => {
    if (!setPageChrome) return undefined;
    setPageChrome(toChrome(headerTone, activeNav, ctaLabel, ctaHref));
    return () => setPageChrome(DEFAULT_PAGE_CHROME);
  }, [setPageChrome, headerTone, activeNav, ctaLabel, ctaHref]);
}
