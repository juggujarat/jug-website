// Small pure display formatters for content values.


const TIME_RE = /^(\d{2}):(\d{2})$/;

/** Shared 'HH:mm' parser for the two display formatters below. */
function parseTime(time) {
  const match = TIME_RE.exec(time ?? '');
  return match ? { h: Number(match[1]), m: match[2] } : null;
}

/**
 * 'HH:mm' (24h) -> 'hh:mm' on a 12-hour clock without am/pm,
 * e.g. '13:00' -> '01:00', '09:15' -> '09:15', '00:30' -> '12:30'.
 * Returns the input unchanged if it isn't 'HH:mm'.
 */
export function formatTime12(time) {
  const t = parseTime(time);
  if (!t) return time;
  const hours = t.h % 12 || 12;
  return `${String(hours).padStart(2, '0')}:${t.m}`;
}

/** 'HH:mm' pair -> 'hh:mm - hh:mm' (12-hour, no am/pm), as used by the event schedule. */
export const formatTimeRange12 = (startTime, endTime) =>
  `${formatTime12(startTime)} - ${formatTime12(endTime)}`;

const WEEKDAYS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
const DATE_PARTS_RE = /^(\d{4})-(\d{2})-(\d{2})$/;

/**
 * 'YYYY-MM-DD' -> 'Sat, 24 Oct 2026'. Returns the input unchanged if invalid.
 * Fixed tables, not Intl: identical on every runtime (no ICU 'Sept' quirks,
 * no prerender/hydration text mismatch) and independent of the viewer's timezone.
 */
export function formatDate(date) {
  const match = DATE_PARTS_RE.exec(date ?? '');
  if (!match) return date;
  const [y, m, d] = match.slice(1).map(Number);
  const utc = new Date(Date.UTC(y, m - 1, d));
  if (utc.getUTCMonth() !== m - 1 || utc.getUTCDate() !== d) return date;
  return `${WEEKDAYS[utc.getUTCDay()]}, ${d} ${MONTHS[m - 1]} ${y}`;
}

/** Start date, or 'start – end' when the end differs. */
export const formatDateRange = (start, end) =>
  !end || end === start ? formatDate(start) : `${formatDate(start)} – ${formatDate(end)}`;

/** 'HH:mm' (24h) -> '6:30 PM'. Returns the input unchanged if it isn't 'HH:mm'. */
export function formatTimeAmPm(time) {
  const t = parseTime(time);
  if (!t) return time;
  return `${t.h % 12 || 12}:${t.m} ${t.h < 12 ? 'AM' : 'PM'}`;
}

/** 'HH:mm' pair -> '6:30 PM – 8:00 PM IST' (start only if no end). */
export const formatTimeRange = (startTime, endTime) =>
  startTime
    ? `${formatTimeAmPm(startTime)}${endTime ? ` – ${formatTimeAmPm(endTime)}` : ''} IST`
    : '';

/** 'Ada Lovelace' -> 'AL'. */
export const initialsOf = (name = '') =>
  name
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((word) => word[0].toUpperCase())
    .join('');

/** '1 session' / '3 sessions'; null for 0 or missing. */
export const countLabel = (n, word) => (n ? `${n} ${word}${n === 1 ? '' : 's'}` : null);

/** Year of a 'YYYY-MM-DD' string, as a number. */
export const yearOf = (date) => Number(String(date).slice(0, 4));

const YEAR_DATE_RE = /^\d{4}-\d{2}-\d{2}/;

/**
 * Group a pre-sorted list by the year of `getDate(item)` ('YYYY-MM-DD'),
 * preserving each item's order; newest year first. Items with a missing or
 * malformed date are skipped rather than crashing or landing in a bogus
 * group. Returns `[{ year, items }]`.
 */
export function groupByYear(list, getDate) {
  const groups = new Map();
  for (const item of list) {
    const date = getDate(item);
    if (!YEAR_DATE_RE.test(date ?? '')) continue;
    const year = yearOf(date);
    if (!groups.has(year)) groups.set(year, []);
    groups.get(year).push(item);
  }
  return [...groups].sort(([a], [b]) => b - a).map(([year, items]) => ({ year, items }));
}
