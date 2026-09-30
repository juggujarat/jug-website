import { lazy } from 'react';
import { Navigate, matchRoutes } from 'react-router-dom';
import SiteLayout from './layouts/SiteLayout';
import { CDJ_2025_SLUG } from './content';

// Every page is its own chunk (SiteLayout wraps them in <Suspense>). Once
// preloaded, the lazy component resolves synchronously, so the prerender can
// use renderToString and hydration never suspends on the page chunk.
// `page` names src/routes/<page>.jsx; the prerender uses it to find the chunk's CSS in Vite's manifest.
function lazyRoute(page) {
  let module;
  const preload = () => import(`./routes/${page}.jsx`).then((m) => (module = m));
  const Component = lazy(() => (module ? { then: (resolve) => resolve(module) } : preload()));
  return { page, Component, preload };
}

export const routes = [
  {
    element: <SiteLayout />,
    children: [
      { index: true, ...lazyRoute('HomePage') },
      { path: 'events', ...lazyRoute('EventsPage') },
      { path: 'events/:slug', ...lazyRoute('EventDetailPage') },
      { path: 'conferences', ...lazyRoute('ConferencesPage') },
      { path: 'conferences/:slug', ...lazyRoute('ConferenceDetailPage') },
      // Legacy URL (shared widely); vercel.json also redirects it.
      { path: CDJ_2025_SLUG, element: <Navigate replace to={`/conferences/${CDJ_2025_SLUG}`} /> },
      { path: 'speakers', ...lazyRoute('SpeakersPage') },
      { path: 'speakers/:slug', ...lazyRoute('SpeakerDetailPage') },
      { path: 'gallery', ...lazyRoute('GalleryPage') },
      { path: 'gallery/:slug', ...lazyRoute('GalleryDetailPage') },
      { path: 'partners', ...lazyRoute('PartnersPage') },
      { path: 'about', ...lazyRoute('AboutPage') },
      { path: '*', ...lazyRoute('NotFoundPage') },
    ],
  },
];

/** Page names (src/routes/<page>.jsx) matched by `pathname`. */
export const matchedPages = (pathname) =>
  (matchRoutes(routes, pathname) ?? []).map(({ route }) => route.page).filter(Boolean);

/** Loads the page chunk(s) matched by `pathname` (before prerendering / hydrating it). */
export const preloadRoute = (pathname) =>
  Promise.all((matchRoutes(routes, pathname) ?? []).map(({ route }) => route.preload?.()));
