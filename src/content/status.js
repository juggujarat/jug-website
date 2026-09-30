// Status computation for events and conferences, in Asia/Kolkata (IST).
// IST is a fixed UTC+05:30 offset with no DST, so we convert with plain
// arithmetic — no Intl/timezone data needed, and it's identical on the
// server (prerender) and in the browser.

export const STATUSES = ['upcoming', 'live', 'completed'];

const IST_OFFSET_MINUTES = 5 * 60 + 30;
const DATE_RE = /^\d{4}-\d{2}-\d{2}$/;
const TIME_RE = /^([01]\d|2[0-3]):[0-5]\d$/;

/** 'YYYY-MM-DD' calendar date in Asia/Kolkata for an absolute Date. */
export const dateInIST = (now) => new Date(now.getTime() + IST_OFFSET_MINUTES * 60 * 1000).toISOString().slice(0, 10);

/** Calendar year in Asia/Kolkata for an absolute Date. */
export const getYearInIST = (now) => Number(dateInIST(now).slice(0, 4));

/**
 * Convert an IST wall-clock date + time into an absolute Date.
 * @param {string} date 'YYYY-MM-DD'
 * @param {string} [time='00:00'] 'HH:mm' (24h)
 * @returns {Date|null} null if the inputs are malformed
 */
export function istToDate(date, time = '00:00') {
  if (!DATE_RE.test(date ?? '') || !TIME_RE.test(time ?? '')) return null;
  const [y, m, d] = date.split('-').map(Number);
  const [hh, mm] = time.split(':').map(Number);
  const utcMs = Date.UTC(y, m - 1, d, hh, mm) - IST_OFFSET_MINUTES * 60 * 1000;
  return new Date(utcMs);
}

/**
 * Start instant of an event (`date` + `startTime`) or conference
 * (`startDate` + `startTime`). Missing time = start of day IST.
 * @returns {Date|null}
 */
export function getStartDateTime(entity) {
  if (!entity) return null;
  const date = entity.date ?? entity.startDate;
  return istToDate(date, entity.startTime ?? '00:00');
}

/**
 * End instant of an event (`date` + `endTime`) or conference
 * (`endDate` ?? `startDate`, + `endTime`). Missing time = 23:59 IST.
 * @returns {Date|null}
 */
export function getEndDateTime(entity) {
  if (!entity) return null;
  const date = entity.date ?? entity.endDate ?? entity.startDate;
  return istToDate(date, entity.endTime ?? '23:59');
}

/**
 * @param {object} entity event or conference record
 * @param {Date} now current instant
 * @returns {'upcoming'|'live'|'completed'|null}
 */
export function getStatus(entity, now) {
  const override =
    entity?.statusOverride && STATUSES.includes(entity.statusOverride) ? entity.statusOverride : null;
  if (override) return override;
  const start = getStartDateTime(entity);
  const end = getEndDateTime(entity);
  // No usable dates: treat as upcoming (validate.js reports missing dates).
  if (!start || !end) return 'upcoming';
  const t = now.getTime();
  if (t < start.getTime()) return 'upcoming';
  if (t <= end.getTime()) return 'live';
  return 'completed';
}
