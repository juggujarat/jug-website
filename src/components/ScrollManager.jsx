import { useEffect, useRef } from 'react';
import { useLocation, useNavigationType } from 'react-router-dom';
import { prefersReducedMotion } from '../lib/aos';
import { useIsomorphicLayoutEffect } from '../lib/useIsomorphicLayoutEffect';

const POLL_MS = 50;
const MAX_WAIT_MS = 4000;
const STORAGE_KEY = 'jug:scroll-positions';
const MAX_ENTRIES = 50;
const USER_INPUT_EVENTS = ['wheel', 'touchstart', 'keydown', 'mousedown'];

// ---- saved positions (sessionStorage, keyed by location.key) ----

const readPositions = () => {
  try {
    return JSON.parse(sessionStorage.getItem(STORAGE_KEY)) ?? {};
  } catch {
    return {};
  }
};

const savePosition = (key, y) => {
  try {
    const positions = readPositions();
    delete positions[key]; // re-insert so the newest entries survive trimming
    positions[key] = y;
    const keys = Object.keys(positions);
    keys.slice(0, Math.max(0, keys.length - MAX_ENTRIES)).forEach((k) => delete positions[k]);
    sessionStorage.setItem(STORAGE_KEY, JSON.stringify(positions));
  } catch {
    /* storage unavailable (private mode / quota) — restoration just won't happen */
  }
};

/**
 * Runs `attempt` every POLL_MS until it returns true, MAX_WAIT_MS passes, or
 * the user starts scrolling/typing. Returns a cancel function.
 */
function retryUntil(attempt, { stopOnUserInput = true } = {}) {
  let cancelled = false;
  let timer;
  const started = Date.now();
  const stop = () => {
    cancelled = true;
  };
  if (stopOnUserInput) {
    USER_INPUT_EVENTS.forEach((t) => window.addEventListener(t, stop, { passive: true, once: true }));
  }
  const tick = () => {
    if (cancelled) return;
    if (attempt()) return;
    if (Date.now() - started < MAX_WAIT_MS) timer = setTimeout(tick, POLL_MS);
  };
  tick();
  return () => {
    cancelled = true;
    clearTimeout(timer);
    USER_INPUT_EVENTS.forEach((t) => window.removeEventListener(t, stop));
  };
}

/**
 * Scroll behaviour for the client-side router:
 * - PUSH/REPLACE without a hash → top of the page. This includes clicking a
 *   link to the page you're already on (react-router REPLACEs with a new key).
 * - URL with a hash (e.g. legacy "/#speakers") → scroll to that id once the
 *   lazy route has rendered it, then re-align while late images/iframes shift
 *   the layout (stops as soon as the user scrolls/types).
 * - Back/forward (client POP) and reload / browser back-forward into the app
 *   → restore the position saved for that history entry + path. A fresh
 *   document load never restores: a hash scrolls to its element as above;
 *   without one the browser's position is kept (the prerendered page may
 *   already have been scrolled before hydration). Native restoration is
 *   disabled because react-router commits routes in a transition, so the
 *   browser would restore against the old page's DOM.
 */
export default function ScrollManager() {
  const location = useLocation();
  const { pathname, hash, key } = location;
  const navigationType = useNavigationType();
  const previousPath = useRef(pathname);
  // Positions are stored per history entry AND path: every fresh document load
  // has key "default", so the key alone would mix up unrelated pages.
  const positionKey = `${key}|${pathname}`;
  const currentPositionKey = useRef(positionKey);
  // Identity of the first location object = "this is the initial document
  // load" (survives StrictMode's double effect; a later POP back to the first
  // entry creates a new location object).
  const initialLocation = useRef(location);

  // Take over scroll restoration from the browser.
  useEffect(() => {
    const { history } = window;
    if (!('scrollRestoration' in history)) return undefined;
    const previous = history.scrollRestoration;
    history.scrollRestoration = 'manual';
    return () => {
      history.scrollRestoration = previous;
    };
  }, []);

  // Track which history entry scroll positions belong to. Layout effect so the
  // key flips at commit, before any scroll event caused by the new page.
  useIsomorphicLayoutEffect(() => {
    currentPositionKey.current = positionKey;
  }, [positionKey]);

  // Continuously remember the current entry's position (rAF-throttled), and
  // flush on pagehide so a reload restores it too.
  useEffect(() => {
    let frame = 0;
    const onScroll = () => {
      if (frame) return;
      frame = requestAnimationFrame(() => {
        frame = 0;
        savePosition(currentPositionKey.current, window.scrollY);
      });
    };
    const onPageHide = () => savePosition(currentPositionKey.current, window.scrollY);
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('pagehide', onPageHide);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('pagehide', onPageHide);
    };
  }, []);

  useEffect(() => {
    const pathChanged = previousPath.current !== pathname;
    previousPath.current = pathname;

    // Restore only for reload / back-forward. On the initial document load the
    // router reports POP for *every* load, so ask the browser how we got here:
    // a fresh load (typed URL, bookmark, external link) never restores, and
    // its hash always wins.
    const isInitialLoad = location === initialLocation.current;
    let shouldRestore = navigationType === 'POP';
    if (isInitialLoad) {
      const entry = performance.getEntriesByType?.('navigation')?.[0];
      shouldRestore = entry?.type === 'reload' || entry?.type === 'back_forward';
      if (!shouldRestore) {
        // Replace any stale position from an earlier document with where the
        // browser put us. Without a hash, leave it: the prerendered page may
        // have been scrolled before hydration. With a hash, fall through so the
        // target is found once rendered and re-aligned (stops on user input).
        savePosition(positionKey, window.scrollY);
        if (!hash) return undefined;
      }
    }

    if (shouldRestore) {
      const saved = readPositions()[positionKey];
      if (typeof saved === 'number') {
        return retryUntil(() => {
          const maxY = document.documentElement.scrollHeight - window.innerHeight;
          window.scrollTo(0, Math.min(saved, Math.max(0, maxY)));
          return maxY >= saved; // page tall enough → done; else wait for lazy content
        });
      }
      if (!hash) return undefined; // nothing saved → leave as is
    }

    if (!hash) {
      window.scrollTo(0, 0);
      return undefined;
    }

    let id;
    try {
      id = decodeURIComponent(hash.slice(1));
    } catch {
      return undefined;
    }
    const smooth = !pathChanged && navigationType !== 'POP' && !prefersReducedMotion();
    const timers = [];
    let cancelRealign = () => {};

    const realign = () => {
      const el = document.getElementById(id);
      if (el && Math.abs(el.getBoundingClientRect().top) > 2) el.scrollIntoView();
    };

    const cancelFind = retryUntil(
      () => {
        const el = document.getElementById(id);
        if (!el) return false;
        el.scrollIntoView({ behavior: smooth ? 'smooth' : 'auto' });
        // Images/iframes above the target can still resize after we scroll.
        let userInteracted = false;
        const onInput = () => {
          userInteracted = true;
        };
        USER_INPUT_EVENTS.forEach((t) => window.addEventListener(t, onInput, { passive: true, once: true }));
        const guarded = () => !userInteracted && realign();
        window.addEventListener('load', guarded, { once: true });
        (smooth ? [1000, 2000] : [300, 1000, 2000]).forEach((ms) => timers.push(setTimeout(guarded, ms)));
        cancelRealign = () => {
          window.removeEventListener('load', guarded);
          USER_INPUT_EVENTS.forEach((t) => window.removeEventListener(t, onInput));
        };
        return true;
      },
      { stopOnUserInput: false },
    );

    return () => {
      cancelFind();
      cancelRealign();
      timers.forEach(clearTimeout);
    };
  }, [location, pathname, hash, key, positionKey, navigationType]);

  return null;
}
