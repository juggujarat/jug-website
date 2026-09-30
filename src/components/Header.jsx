import { useEffect, useRef, useState } from 'react';
import { FiX } from 'react-icons/fi';
import { Link, useLocation } from 'react-router-dom';
import { getCurrentConference, getStatus, site } from '../content';
import { useBodyScrollLock } from '../lib/useBodyScrollLock';
import { useNow } from '../lib/useNow';
import { DEFAULT_PAGE_CHROME } from '../layouts/pageChrome';
import { NAV_ITEMS, isNavItemActive } from './navItems';
import Button from './ui/Button';
import StatusBadge from './ui/StatusBadge';
import { focusRing } from './ui/focusRing';
import { navLinkClass } from './ui/navLink';
import ExternalLink from './ui/ExternalLink';
import Container from './ui/Container';

const MENU_ID = 'mobile-menu';
const DESKTOP_QUERY = '(min-width: 1024px)';

const activeLink = 'underline decoration-2 underline-offset-8';

/** LIVE / UPCOMING for the highlighted conference; nothing when it's completed. */
function useConferenceStatus() {
  const now = useNow();
  const conference = getCurrentConference(now);
  if (!conference) return null;
  const status = getStatus(conference, now);
  return status === 'live' || status === 'upcoming' ? status : null;
}

function NavItems({ pathname, activeNav, conferenceStatus, onNavigate, itemClassName = '' }) {
  return NAV_ITEMS.map((item) => {
    const active = isNavItemActive(item, pathname, activeNav);
    return (
      <li key={item.to} className={itemClassName}>
        <Link
          to={item.to}
          onClick={onNavigate}
          aria-current={active ? 'page' : undefined}
          className={`${navLinkClass} inline-flex items-center ${active ? activeLink : ''}`}
        >
          {item.label}
          {item.showConferenceStatus && conferenceStatus ? (
            <StatusBadge status={conferenceStatus} size="xs" className="ml-2 no-underline" />
          ) : null}
        </Link>
      </li>
    );
  });
}

/**
 * Site header. `tone` (background class matching the page hero), `activeNav`
 * and `cta` (right-hand button) are declared by each page via usePageChrome
 * (layouts/pageChrome.js), which is the single place that normalises `cta`
 * to a valid `{ label, href }` — Header just renders it.
 */
const Header = ({ tone = 'bg-[#E1EEFB]', activeNav = null, cta = DEFAULT_PAGE_CHROME.headerCta }) => {
  const { label: ctaLabel, href: ctaHref } = cta;
  const [isOpen, setIsOpen] = useState(false);
  const { pathname, key } = useLocation();
  const conferenceStatus = useConferenceStatus();
  const toggleRef = useRef(null);
  const menuRef = useRef(null);

  // Close on every navigation (covers back/forward too).
  useEffect(() => {
    setIsOpen(false);
  }, [key]);

  useEffect(() => {
    if (!isOpen) return undefined;

    const onKeyDown = (e) => {
      if (e.key === 'Escape') {
        setIsOpen(false);
        toggleRef.current?.focus();
      }
    };
    const onPointerDown = (e) => {
      if (menuRef.current?.contains(e.target) || toggleRef.current?.contains(e.target)) return;
      setIsOpen(false);
    };
    const desktop = window.matchMedia(DESKTOP_QUERY);
    const onDesktop = (e) => e.matches && setIsOpen(false);

    document.addEventListener('keydown', onKeyDown);
    document.addEventListener('mousedown', onPointerDown);
    document.addEventListener('touchstart', onPointerDown);
    desktop.addEventListener('change', onDesktop);

    return () => {
      document.removeEventListener('keydown', onKeyDown);
      document.removeEventListener('mousedown', onPointerDown);
      document.removeEventListener('touchstart', onPointerDown);
      desktop.removeEventListener('change', onDesktop);
    };
  }, [isOpen]);
  useBodyScrollLock(isOpen);

  const close = () => setIsOpen(false);

  return (
    <header className={tone}>
      <Container size="xl" className="sm:max-w-[345px] relative">
        {/* Desktop (lg + xl) */}
        {/* Shown only at lg/xl; hidden by default so widths outside every range (<320px) get the mobile bar. */}
        <div className="hidden lg:flex xl:flex items-center justify-between gap-6 lg:gap-4 py-4">
          <Link to="/" className={`shrink-0 ${focusRing}`}>
            <img
              src="/Img/jug-full-logo-svg.svg"
              alt={`${site.name} home`}
              width="195"
              height="65"
              className="lg:w-[170px] lg:h-auto"
            />
          </Link>

          <nav aria-label="Main">
            <ul className="flex items-center gap-9 lg:gap-4 whitespace-nowrap text-[16px] lg:text-[14px]">
              <NavItems pathname={pathname} activeNav={activeNav} conferenceStatus={conferenceStatus} />
            </ul>
          </nav>

          <Button href={ctaHref} shape="header" className="shrink-0 whitespace-nowrap lg:px-4">
            {ctaLabel}
          </Button>
        </div>

        {/* Mobile + tablet: default for every width below 1024px (incl. <320 and exactly 768). */}
        <div className="flex lg:hidden xl:hidden px-3 md:px-0 py-2 justify-between items-center">
          <Link to="/" className={focusRing}>
            <img src="/Img/JugIconSm.svg" alt={`${site.name} home`} width="54" height="54" className="md:hidden" />
            {/* md wins at exactly 768px (sm and md overlap there), so exactly one logo shows. */}
            <img src="/Img/jug-full-logo-svg.svg" alt={`${site.name} home`} width="195" height="65" className="hidden md:block" />
          </Link>

          <button
            ref={toggleRef}
            type="button"
            onClick={() => setIsOpen((open) => !open)}
            aria-expanded={isOpen}
            aria-controls={MENU_ID}
            aria-label={isOpen ? 'Close menu' : 'Open menu'}
            className={`text-black flex flex-col items-center justify-center gap-1 min-w-[44px] min-h-[44px] -mr-3 ${focusRing}`}
          >
            {isOpen ? (
              <FiX size={28} aria-hidden="true" />
            ) : (
              <>
                <span className="block w-5 h-0.5 bg-black"></span>
                <span className="block w-5 h-0.5 bg-black"></span>
              </>
            )}
          </button>
        </div>
      </Container>

      {isOpen ? (
        <div className="relative xl:hidden lg:hidden">
          <nav
            id={MENU_ID}
            ref={menuRef}
            aria-label="Main"
            className="absolute top-0 left-0 w-full bg-white p-4 shadow-lg rounded-lg z-[50] mt-2 max-h-[calc(100vh-96px)] overflow-y-auto"
          >
            <ul className="flex flex-col space-y-3 text-[16px]">
              <NavItems pathname={pathname} activeNav={activeNav} conferenceStatus={conferenceStatus} onNavigate={close} />
            </ul>
            <ExternalLink
              href={ctaHref}
              onClick={close}
              className="block text-center bg-black text-white px-5 py-2 rounded-lg transition hover:bg-gray-800 w-full mt-3"
            >
              {ctaLabel}
            </ExternalLink>
          </nav>
        </div>
      ) : null}
    </header>
  );
};

export default Header;
