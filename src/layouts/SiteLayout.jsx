import { Suspense, useContext, useEffect, useMemo, useState } from 'react';
import { Outlet } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import ScrollManager from '../components/ScrollManager';
import { initAOS } from '../lib/aos';
import { setInitialNow } from '../lib/useNow';
import { DEFAULT_PAGE_CHROME, PageChromeContext } from './pageChrome';

function skipToMain(e) {
  const main = document.getElementById('main');
  if (!main) return;
  e.preventDefault();
  main.focus();
  main.scrollIntoView();
}

/**
 * Rendered after the page inside <Suspense>. React hydrates Suspense content
 * in a later pass than the shell, so this effect (not one in SiteLayout) is
 * the first point where the prerendered page is hydrated: only now may AOS
 * add its classes, and new useNow() states start from the real clock.
 */
function PageMounted() {
  useEffect(() => {
    setInitialNow(undefined);
    initAOS();
  }, []);
  return null;
}

/** Shared shell: skip link, header, lazy page outlet, footer. */
export default function SiteLayout() {
  // Pages override header tone / active nav item via usePageChrome().
  const { initial } = useContext(PageChromeContext);
  const [pageChrome, setPageChrome] = useState(initial ?? DEFAULT_PAGE_CHROME);
  const outletContext = useMemo(() => ({ setPageChrome }), []);

  return (
    <>
      <a
        href="#main"
        onClick={skipToMain}
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[100] focus:bg-white focus:text-black focus:border-2 focus:border-black focus:rounded-lg focus:px-4 focus:py-2 focus:outline focus:outline-2 focus:outline-offset-2 focus:outline-black"
      >
        Skip to content
      </a>
      <ScrollManager />
      <Header tone={pageChrome.headerTone} activeNav={pageChrome.activeNav} cta={pageChrome.headerCta} />
      <main id="main" tabIndex={-1} className="focus:outline-none">
        <Suspense fallback={<div className="min-h-[100vh]" aria-busy="true" />}>
          <Outlet context={outletContext} />
          <PageMounted />
        </Suspense>
      </main>
      <Footer activeNav={pageChrome.activeNav} />
    </>
  );
}
