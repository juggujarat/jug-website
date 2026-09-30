import { useEffect, useState } from 'react';

// Prerender time: the first value of useNow() on the server and while the
// client hydrates prerendered HTML (set by the entries, cleared by SiteLayout
// once the page has hydrated), so time-dependent UI matches the static HTML.
let initialNow;

export const setInitialNow = (date) => {
  initialNow = date;
};

/** Current time; re-read after mount and then every `intervalMs` (default 5 min). */
export function useNow(intervalMs = 5 * 60 * 1000) {
  const [now, setNow] = useState(() => initialNow ?? new Date());
  const startedFromPrerender = now === initialNow;
  useEffect(() => {
    const tick = () => setNow(new Date());
    if (startedFromPrerender) tick();
    const id = setInterval(tick, intervalMs);
    return () => clearInterval(id);
  }, [intervalMs]); // eslint-disable-line react-hooks/exhaustive-deps -- mount-time check only
  return now;
}
