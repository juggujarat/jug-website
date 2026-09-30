// Pure lookup/derivation functions over the content modules.
// Relationships are stored on one side only (see the entity files);
// every reverse relationship is derived here.
// No React, no window/document. Time-dependent selectors take `now`.

import { events } from './events.js';
import { conferences } from './conferences.js';
import { speakers } from './speakers.js';
import { sessions, SPEAKER_SESSION_TYPES } from './sessions.js';
import { venues } from './venues.js';
import { sponsors } from './sponsors.js';
import { galleries } from './galleries.js';
import { site } from './site.js';
import { getStatus, getStartDateTime, istToDate } from './status.js';
import { groupByYear } from './format.js';

// ---------- helpers ----------

const indexBySlug = (list) => new Map(list.map((item) => [item.slug, item]));

const eventsBySlug = indexBySlug(events);
const conferencesBySlug = indexBySlug(conferences);
const speakersBySlug = indexBySlug(speakers);
const sessionsBySlug = indexBySlug(sessions);
const venuesBySlug = indexBySlug(venues);
const sponsorsBySlug = indexBySlug(sponsors);
const galleriesBySlug = indexBySlug(galleries);

const startMs = (entity) => getStartDateTime(entity)?.getTime() ?? 0;
const byStartAsc = (a, b) => startMs(a) - startMs(b);
const byStartDesc = (a, b) => startMs(b) - startMs(a);
const bySessionTime = (a, b) =>
  (getSessionDate(a) ?? '').localeCompare(getSessionDate(b) ?? '') ||
  (a.startTime ?? '').localeCompare(b.startTime ?? '');
const compact = (list) => list.filter(Boolean);

/**
 * Date ('YYYY-MM-DD') a session happens on: its own `date`, else its event's
 * date, else its conference's startDate.
 */
export const getSessionDate = (session) =>
  session?.date ??
  (session?.event
    ? eventsBySlug.get(session.event)?.date
    : conferencesBySlug.get(session?.conference)?.startDate);

// ---------- single-record lookups ----------

export const getEventBySlug = (slug) => eventsBySlug.get(slug);
export const getConferenceBySlug = (slug) => conferencesBySlug.get(slug);
export const getSpeakerBySlug = (slug) => speakersBySlug.get(slug);
export const getSessionBySlug = (slug) => sessionsBySlug.get(slug);
export const getVenueBySlug = (slug) => venuesBySlug.get(slug);
export const getSponsorBySlug = (slug) => sponsorsBySlug.get(slug);
export const getGalleryBySlug = (slug) => galleriesBySlug.get(slug);

/** True when every record is a sample/placeholder (so a page listing only them is noindex). */
export const allSample = (list) => list.every((record) => record.isSample);

// ---------- speakers ----------

/**
 * Text shown before the company on speaker cards, e.g. "JVM Engineer at".
 * Uses `rolePrefix` when present, else `${designation} at`.
 */
export const getSpeakerRolePrefix = (speaker) => {
  if (!speaker) return '';
  if (speaker.rolePrefix != null) return speaker.rolePrefix;
  if (!speaker.designation) return '';
  return speaker.company ? `${speaker.designation} at` : speaker.designation;
};

/** Speakers listed in site.featuredSpeakers, in that order. */
export const getFeaturedSpeakers = () =>
  compact(site.featuredSpeakers.map((slug) => speakersBySlug.get(slug)));

/** Unique speakers of the given sessions, in order of first appearance. */
export const getSpeakersForSessions = (sessionList) => {
  const seen = new Set();
  const result = [];
  for (const session of sessionList) {
    for (const slug of session.speakers ?? []) {
      if (seen.has(slug)) continue;
      seen.add(slug);
      const speaker = speakersBySlug.get(slug);
      if (speaker) result.push(speaker);
    }
  }
  return result;
};

/** Speakers of a conference, ordered by their first session's start time. */
export const getSpeakersForConference = (conferenceSlug) =>
  getSpeakersForSessions(getSessionsForConference(conferenceSlug));

/** Speakers of an event, ordered by their first session's start time. */
export const getSpeakersForEvent = (eventSlug) =>
  getSpeakersForSessions(getSessionsForEvent(eventSlug));

// ---------- sessions ----------

/** True for talks/workshops/panels/keynotes (i.e. not registration/opening/break). */
export const isSpeakerSession = (session) => SPEAKER_SESSION_TYPES.includes(session?.type);

/** Full agenda of a conference (incl. breaks), sorted by date then start time. */
export const getSessionsForConference = (conferenceSlug) =>
  sessions.filter((s) => s.conference === conferenceSlug).sort(bySessionTime);

/** Workshops of a conference (sessions with type 'workshop'), in schedule order. */
export const getWorkshopsForConference = (conferenceSlug) =>
  getSessionsForConference(conferenceSlug).filter((s) => s.type === 'workshop');

/** Workshops of an event, in schedule order. */
export const getWorkshopsForEvent = (eventSlug) =>
  getSessionsForEvent(eventSlug).filter((s) => s.type === 'workshop');

/** Full agenda of an event (incl. breaks), sorted by start time. */
export const getSessionsForEvent = (eventSlug) =>
  sessions.filter((s) => s.event === eventSlug).sort(bySessionTime);

/**
 * Sessions a speaker gave, newest first. Each item is the session plus
 * `date` and `parent` ({ type: 'event'|'conference', item }).
 */
export const getSessionsForSpeaker = (speakerSlug) =>
  sessions
    .filter((s) => isSpeakerSession(s) && (s.speakers ?? []).includes(speakerSlug))
    .map((s) => ({
      ...s,
      date: getSessionDate(s),
      parent: s.event
        ? { type: 'event', item: eventsBySlug.get(s.event) }
        : { type: 'conference', item: conferencesBySlug.get(s.conference) },
    }))
    .sort(
      (a, b) =>
        (b.date ?? '').localeCompare(a.date ?? '') ||
        (a.startTime ?? '').localeCompare(b.startTime ?? ''),
    );

/** Events / conferences a speaker spoke at (from getSessionsForSpeaker), newest first. */
const getParentsForSpeaker = (speakerSlug, type) =>
  [
    ...new Set(
      getSessionsForSpeaker(speakerSlug)
        .filter((s) => s.parent.type === type)
        .map((s) => s.parent.item),
    ),
  ].sort(byStartDesc);
export const getEventsForSpeaker = (speakerSlug) => getParentsForSpeaker(speakerSlug, 'event');
export const getConferencesForSpeaker = (speakerSlug) => getParentsForSpeaker(speakerSlug, 'conference');

// ---------- events ----------

/** All events, newest first. */
export const getAllEvents = () => [...events].sort(byStartDesc);

/** Events that are upcoming or live at `now`, soonest first. */
export const getUpcomingEvents = (now = new Date()) =>
  events.filter((e) => getStatus(e, now) !== 'completed').sort(byStartAsc);

/** Events completed at `now`, most recent first. */
export const getPastEvents = (now = new Date()) =>
  events.filter((e) => getStatus(e, now) === 'completed').sort(byStartDesc);

/** Past events grouped by year, newest year first: [{ year, events }]. */
export const getPastEventsByYear = (now = new Date()) =>
  groupByYear(getPastEvents(now), (e) => e.date).map(({ year, items }) => ({ year, events: items }));

/** Meetups that belong to a conference (via event.conference). */
export const getEventsForConference = (conferenceSlug) =>
  events.filter((e) => e.conference === conferenceSlug).sort(byStartAsc);

// ---------- conferences ----------

/** All conferences, oldest first (About page timeline). */
export const getConferencesOldestFirst = () => [...conferences].sort(byStartAsc);

/** Announced speaker count, else the expected figure (`stats.speakers`) before the lineup is out. */
export const getConferenceSpeakerCount = (conference) =>
  getSpeakersForConference(conference.slug).length || conference.stats?.speakers;

export const getUpcomingConferences = (now = new Date()) =>
  conferences.filter((c) => getStatus(c, now) !== 'completed').sort(byStartAsc);

export const getPastConferences = (now = new Date()) =>
  conferences.filter((c) => getStatus(c, now) === 'completed').sort(byStartDesc);

/**
 * The conference to highlight: a live one, else the next upcoming one,
 * else the most recently completed one. `undefined` if there are none.
 */
export const getCurrentConference = (now = new Date()) => {
  const live = conferences.filter((c) => getStatus(c, now) === 'live').sort(byStartAsc);
  if (live.length) return live[0];
  const upcoming = conferences.filter((c) => getStatus(c, now) === 'upcoming').sort(byStartAsc);
  if (upcoming.length) return upcoming[0];
  return getPastConferences(now)[0];
};

/** Conferences split by status at `now`: live/upcoming soonest first, completed newest first. */
export const getConferencesByStatus = (now = new Date()) => ({
  live: conferences.filter((c) => getStatus(c, now) === 'live').sort(byStartAsc),
  upcoming: conferences.filter((c) => getStatus(c, now) === 'upcoming').sort(byStartAsc),
  completed: getPastConferences(now),
});

/** A conference's announcements, newest first. */
export const getAnnouncementsForConference = (conferenceSlug) =>
  [...(conferencesBySlug.get(conferenceSlug)?.announcements ?? [])].sort((a, b) =>
    (b.date ?? '').localeCompare(a.date ?? ''),
  );

/**
 * Live-mode agenda position at `now` (IST): the session running now and the
 * next one to start. Either may be undefined (before start / after the last slot).
 */
export const getCurrentAndNextSession = (conferenceSlug, now = new Date()) => {
  const at = (s, time) => istToDate(getSessionDate(s), time)?.getTime();
  const t = now.getTime();
  const agenda = getSessionsForConference(conferenceSlug);
  return {
    current: agenda.find((s) => at(s, s.startTime) <= t && t < at(s, s.endTime)),
    next: agenda.find((s) => at(s, s.startTime) > t),
  };
};

// ---------- sponsors & partners ----------

/**
 * Sponsors of a conference as sponsor records with `tier` attached,
 * in the conference's order. Optionally filtered by tier.
 */
export const getSponsorsForConference = (conferenceSlug, tier) => {
  const conference = conferencesBySlug.get(conferenceSlug);
  if (!conference) return [];
  return compact(
    (conference.sponsors ?? [])
      .filter((ref) => !tier || ref.tier === tier)
      .map((ref) => {
        const sponsor = sponsorsBySlug.get(ref.sponsor);
        return sponsor ? { ...sponsor, tier: ref.tier } : null;
      }),
  );
};

/** Partner communities/JUGs of a conference, optionally filtered by kind ('jug' | 'community'). */
export const getPartnersForConference = (conferenceSlug, kind) => {
  const conference = conferencesBySlug.get(conferenceSlug);
  if (!conference) return [];
  return compact((conference.partners ?? []).map((slug) => sponsorsBySlug.get(slug))).filter(
    (p) => !kind || p.kind === kind,
  );
};

// ---------- venues ----------

/** Venue records for a conference (conference.venues[]). */
export const getVenuesForConference = (conferenceSlug) =>
  compact((conferencesBySlug.get(conferenceSlug)?.venues ?? []).map((s) => venuesBySlug.get(s)));

/** Venue partner record for an event, or undefined if it uses an inline `location`. */
export const getVenueForEvent = (eventSlug) => venuesBySlug.get(eventsBySlug.get(eventSlug)?.venue);

/**
 * Where an event happens, normalised so pages don't need to branch on
 * venue partner vs inline location vs online:
 *   { name, address, city, mapUrl, online }
 * Missing values are undefined. Accepts an event record or its slug.
 */
export const getEventPlace = (eventOrSlug) => {
  const event = typeof eventOrSlug === 'string' ? eventsBySlug.get(eventOrSlug) : eventOrSlug;
  if (!event) return undefined;
  const venue = venuesBySlug.get(event.venue);
  const source = venue ?? event.location ?? {};
  return {
    name: source.name ?? (event.online ? 'Online' : undefined),
    address: source.address,
    city: source.city,
    mapUrl: source.mapUrl,
    online: Boolean(event.online),
  };
};

/**
 * Display label for where an event happens: "Name, City" / "Online" / ''.
 * Accepts an event record or its slug. City is omitted when it's already
 * part of the name (or equal to it); an online event with no physical
 * address (the common case) is just "Online".
 */
export const getEventPlaceLabel = (eventOrSlug) => {
  const place = getEventPlace(eventOrSlug);
  if (!place) return '';
  if (place.online && !place.address) return 'Online';
  if (!place.name) return '';
  return place.city && place.name !== place.city && !place.name.includes(place.city)
    ? `${place.name}, ${place.city}`
    : place.name;
};

/** Everything held (or scheduled) at a venue, each list newest first: { events, conferences } */
export const getVenueHistory = (venueSlug) => ({
  events: events.filter((e) => e.venue === venueSlug).sort(byStartDesc),
  conferences: conferences.filter((c) => (c.venues ?? []).includes(venueSlug)).sort(byStartDesc),
});

/** Venue partners, most recent (or next) host first; venues that haven't hosted yet keep file order, last. */
export const getVenuesByLatest = () => {
  const latest = new Map(
    venues.map((v) => {
      const { events: e, conferences: c } = getVenueHistory(v.slug);
      return [v.slug, Math.max(-1, ...[...e, ...c].map(startMs))];
    }),
  );
  return [...venues].sort((a, b) => latest.get(b.slug) - latest.get(a.slug));
};

// ---------- galleries ----------

/** Galleries grouped by year, newest year first: [{ year, galleries }]. */
export const getGalleriesByYear = () =>
  groupByYear(
    [...galleries].sort((a, b) => (b.date ?? '').localeCompare(a.date ?? '')),
    (g) => g.date,
  ).map(({ year, items }) => ({ year, galleries: items }));

export const getGalleriesForEvent = (eventSlug) => galleries.filter((g) => g.event === eventSlug);

export const getGalleriesForConference = (conferenceSlug) =>
  galleries.filter((g) => g.conference === conferenceSlug);

// ---------- speaker directory ----------

/**
 * Everyone with at least one talk/workshop/panel/keynote, each with
 * `sessionCount`; most sessions first, then by name.
 */
export const getSpeakerDirectory = () => {
  const counts = new Map();
  for (const session of sessions.filter(isSpeakerSession)) {
    for (const slug of session.speakers ?? []) counts.set(slug, (counts.get(slug) ?? 0) + 1);
  }
  return compact(
    [...counts].map(([slug, sessionCount]) => {
      const speaker = speakersBySlug.get(slug);
      return speaker && { ...speaker, sessionCount };
    }),
  ).sort((a, b) => b.sessionCount - a.sessionCount || a.name.localeCompare(b.name, 'en'));
};

// ---------- about ----------

/** True while a conference's call for papers can be acted on: upcoming/live and before `cfp.closesOn` (end of day IST). */
export const isCfpOpen = (conference, now) => {
  if (!conference?.cfp?.url) return false;
  if (!['upcoming', 'live'].includes(getStatus(conference, now))) return false;
  const closes = conference.cfp.closesOn && istToDate(conference.cfp.closesOn, '23:59');
  if (!closes) return true;
  return now <= closes;
};

/** CFP link of the soonest conference whose CFP is open at `now`; `undefined` if none. */
export const getOpenCfpUrl = (now) => [...conferences].sort(byStartAsc).find((c) => isCfpOpen(c, now))?.cfp.url;
