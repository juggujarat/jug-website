// Dev/build-time content validation. Pure: takes the content, returns a list
// of human-readable problems. Run via `node scripts/validate-content.mjs`
// (wired as `prebuild`, so `npm run build` fails on any problem).

import { SESSION_TYPES, SPEAKER_SESSION_TYPES } from './sessions.js';
import { STATUSES } from './status.js';
import { bannerSmall, shareImage } from '../lib/images.js';

const KEBAB_RE = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;
const DATE_RE = /^\d{4}-\d{2}-\d{2}$/;
const TIME_RE = /^([01]\d|2[0-3]):[0-5]\d$/;
const SPONSOR_KINDS = ['sponsor', 'community', 'jug', 'supporter'];
const SPONSOR_TIERS = ['platinum', 'gold', 'silver', 'community-supporter'];

const isValidDate = (value) => {
  if (!DATE_RE.test(value ?? '')) return false;
  const [y, m, d] = value.split('-').map(Number);
  const dt = new Date(Date.UTC(y, m - 1, d));
  return dt.getUTCFullYear() === y && dt.getUTCMonth() === m - 1 && dt.getUTCDate() === d;
};

/**
 * @param {object} content  { events, conferences, speakers, sessions, venues, sponsors, galleries, site }
 * @param {object} [options]
 * @param {(path: string) => boolean} [options.assetExists]  checks root-relative image paths
 * @returns {string[]} problems (empty = valid)
 */
export function validateContent(content, { assetExists } = {}) {
  const { events, conferences, speakers, sessions, venues, sponsors, galleries, site } = content;
  const errors = [];
  const err = (where, msg) => errors.push(`${where}: ${msg}`);

  // --- slugs: present, kebab-case, unique per collection ---
  const slugSets = {};
  const collections = { events, conferences, speakers, sessions, venues, sponsors, galleries };
  for (const [name, list] of Object.entries(collections)) {
    if (!Array.isArray(list)) {
      err(name, 'must export an array');
      slugSets[name] = new Set();
      continue;
    }
    const seen = new Set();
    list.forEach((item, i) => {
      const where = `${name}[${i}]`;
      if (!item.slug) return err(where, 'missing "slug"');
      if (!KEBAB_RE.test(item.slug)) err(`${name} "${item.slug}"`, 'slug must be lowercase kebab-case');
      if (seen.has(item.slug)) err(`${name} "${item.slug}"`, 'duplicate slug');
      seen.add(item.slug);
    });
    slugSets[name] = seen;
  }

  const where = (name, item) => `${name} "${item.slug ?? '?'}"`;
  const required = (name, item, fields) => {
    for (const f of fields) {
      const v = item[f];
      if (v === undefined || v === null || v === '' || (Array.isArray(v) && v.length === 0 && f !== 'speakers')) {
        err(where(name, item), `missing required field "${f}"`);
      }
    }
  };
  const ref = (name, item, field, target, value) => {
    if (value === undefined) return;
    if (!slugSets[target].has(value)) {
      err(where(name, item), `"${field}" references unknown ${target.replace(/s$/, '')} "${value}"`);
    }
  };
  const date = (name, item, field) => {
    if (item[field] !== undefined && !isValidDate(item[field])) {
      err(where(name, item), `"${field}" must be a valid YYYY-MM-DD date (got "${item[field]}")`);
    }
  };
  const time = (name, item, field) => {
    if (item[field] !== undefined && !TIME_RE.test(item[field])) {
      err(where(name, item), `"${field}" must be HH:mm 24h (got "${item[field]}")`);
    }
  };
  const timeOrder = (name, item) => {
    if (TIME_RE.test(item.startTime ?? '') && TIME_RE.test(item.endTime ?? '') && item.endTime <= item.startTime) {
      err(where(name, item), `"endTime" (${item.endTime}) must be after "startTime" (${item.startTime})`);
    }
  };
  const status = (name, item) => {
    if (item.statusOverride !== undefined && !STATUSES.includes(item.statusOverride)) {
      err(where(name, item), `"statusOverride" must be one of ${STATUSES.join(', ')}`);
    }
  };
  const asset = (name, item, field, value = item[field]) => {
    if (value === undefined || !assetExists) return;
    if (typeof value !== 'string' || !value.startsWith('/')) {
      err(where(name, item), `"${field}" must be a root-relative path like "/Img/x.png" (got "${value}")`);
    } else if (!assetExists(value)) {
      err(where(name, item), `"${field}" file not found in public/: ${value}`);
    }
  };

  // Share previews use the .jpg twin of a WebP image (Seo.jsx).
  const shareTwin = (name, item, field) => {
    if (item[field]?.endsWith('.webp')) asset(name, item, `${field} (.jpg share twin)`, shareImage(item[field]));
  };
  // Banners: 1200w .webp + <name>-640.webp (srcset) + .jpg share twin.
  const banner = (name, item) => {
    if (!item.banner) return;
    if (!item.banner.endsWith('.webp')) err(where(name, item), `banner must be a .webp (got "${item.banner}")`);
    asset(name, item, 'banner');
    asset(name, item, 'banner (640w srcset variant)', bannerSmall(item.banner));
    shareTwin(name, item, 'banner');
  };
  const oneParent = (name, item) => {
    const hasEvent = item.event !== undefined;
    const hasConf = item.conference !== undefined;
    if (hasEvent === hasConf) err(where(name, item), 'must set exactly one of "event" or "conference"');
    ref(name, item, 'event', 'events', item.event);
    ref(name, item, 'conference', 'conferences', item.conference);
  };

  // --- events ---
  for (const e of events ?? []) {
    required('events', e, ['name', 'date']);
    date('events', e, 'date');
    time('events', e, 'startTime');
    time('events', e, 'endTime');
    timeOrder('events', e);
    status('events', e);
    ref('events', e, 'venue', 'venues', e.venue);
    const placeCount = [e.venue !== undefined, e.location !== undefined, e.online === true].filter(Boolean).length;
    if (placeCount !== 1) {
      err(
        where('events', e),
        'must set exactly one of "venue" (venue partner slug), "location" ({ name, address?, city }) or "online: true"',
      );
    }
    if (e.location !== undefined && (!e.location?.name || !e.location?.city)) {
      err(where('events', e), '"location" needs "name" and "city"');
    }
    ref('events', e, 'conference', 'conferences', e.conference);
    banner('events', e);
  }

  // --- conferences ---
  for (const c of conferences ?? []) {
    required('conferences', c, ['name', 'startDate', 'endDate']);
    date('conferences', c, 'startDate');
    date('conferences', c, 'endDate');
    time('conferences', c, 'startTime');
    time('conferences', c, 'endTime');
    if (isValidDate(c.startDate) && isValidDate(c.endDate) && c.endDate < c.startDate) {
      err(where('conferences', c), '"endDate" is before "startDate"');
    }
    if (c.startDate === c.endDate) timeOrder('conferences', c);
    status('conferences', c);
    banner('conferences', c);
    // Hero/about art: path(s) + numeric intrinsic sizes (reserve layout, no CLS).
    const art = (field, paths, sizes) => {
      const value = c[field];
      if (value === undefined) return;
      const bad = sizes.filter((k) => !(Number.isFinite(value?.[k]) && value[k] > 0));
      if (bad.length) err(where('conferences', c), `"${field}" needs positive numeric ${bad.join(', ')}`);
      paths.forEach((k) => {
        if (!value?.[k]) err(where('conferences', c), `"${field}.${k}" is missing`);
        else asset('conferences', c, `${field}.${k}`, value[k]);
      });
    };
    art('heroLogo', ['src', 'srcSm'], ['width', 'height', 'widthSm', 'heightSm']);
    art('featuredSpeaker', ['image', 'imageSm'], ['width', 'height', 'widthSm', 'heightSm']);
    if (c.featuredSpeaker && !c.featuredSpeaker.speaker) err(where('conferences', c), '"featuredSpeaker.speaker" is missing');
    art('aboutImage', ['src'], ['width', 'height']);
    (c.goodies ?? []).forEach((g, i) => asset('conferences', c, `goodies[${i}].image`, g.image));
    const volunteerNames = new Set();
    (c.volunteers ?? []).forEach((v, i) => {
      if (!v.name || !v.image) err(where('conferences', c), `volunteers[${i}] needs "name" and "image"`);
      else if (volunteerNames.has(v.name)) err(where('conferences', c), `duplicate volunteer "${v.name}"`);
      volunteerNames.add(v.name);
      asset('conferences', c, `volunteers[${i}].image`, v.image);
    });
    if (c.cfp !== undefined) {
      if (!c.cfp?.url) err(where('conferences', c), '"cfp" needs a "url"');
      if (c.cfp?.closesOn !== undefined && !isValidDate(c.cfp.closesOn)) {
        err(where('conferences', c), `"cfp.closesOn" must be a valid YYYY-MM-DD date (got "${c.cfp.closesOn}")`);
      }
    }
    for (const v of c.venues ?? []) ref('conferences', c, 'venues[]', 'venues', v);
    ref('conferences', c, 'featuredSpeaker.speaker', 'speakers', c.featuredSpeaker?.speaker);
    for (const p of c.partners ?? []) ref('conferences', c, 'partners[]', 'sponsors', p);
    for (const s of c.sponsors ?? []) {
      ref('conferences', c, 'sponsors[].sponsor', 'sponsors', s.sponsor);
      if (!SPONSOR_TIERS.includes(s.tier)) {
        err(where('conferences', c), `sponsor "${s.sponsor}" has unknown tier "${s.tier}" (use ${SPONSOR_TIERS.join(', ')})`);
      }
    }
    const trackSlugs = new Set();
    for (const t of c.tracks ?? []) {
      if (!t.slug || !KEBAB_RE.test(t.slug)) err(where('conferences', c), `track "${t.name}" needs a kebab-case slug`);
      if (trackSlugs.has(t.slug)) err(where('conferences', c), `duplicate track slug "${t.slug}"`);
      trackSlugs.add(t.slug);
    }
  }

  // --- speakers ---
  for (const s of speakers ?? []) {
    required('speakers', s, ['name']);
    asset('speakers', s, 'photo');
    shareTwin('speakers', s, 'photo');
  }

  // --- sessions ---
  const confBySlug = new Map((conferences ?? []).map((c) => [c.slug, c]));
  const eventBySlug = new Map((events ?? []).map((e) => [e.slug, e]));
  for (const s of sessions ?? []) {
    required('sessions', s, ['title', 'type', 'startTime', 'endTime']);
    if (s.type !== undefined && !SESSION_TYPES.includes(s.type)) {
      err(where('sessions', s), `unknown type "${s.type}" (use ${SESSION_TYPES.join(', ')})`);
    }
    oneParent('sessions', s);
    time('sessions', s, 'startTime');
    time('sessions', s, 'endTime');
    timeOrder('sessions', s);
    date('sessions', s, 'date');
    if (s.conference !== undefined && s.date === undefined) {
      err(where('sessions', s), 'conference sessions need a "date" (YYYY-MM-DD)');
    }
    const conf = confBySlug.get(s.conference);
    if (conf && isValidDate(s.date) && (s.date < conf.startDate || s.date > conf.endDate)) {
      err(where('sessions', s), `"date" ${s.date} is outside its conference (${conf.startDate} – ${conf.endDate})`);
    }
    const ev = eventBySlug.get(s.event);
    if (ev && s.date !== undefined && s.date !== ev.date) {
      err(where('sessions', s), `"date" ${s.date} does not match its event date ${ev.date}`);
    }
    if (!Array.isArray(s.speakers)) {
      err(where('sessions', s), '"speakers" must be an array of speaker slugs (use [] for breaks)');
    } else {
      for (const sp of s.speakers) ref('sessions', s, 'speakers[]', 'speakers', sp);
      if (SPEAKER_SESSION_TYPES.includes(s.type) && s.speakers.length === 0) {
        err(where('sessions', s), `a "${s.type}" needs at least one speaker`);
      }
    }
    if (s.track !== undefined) {
      const conf = confBySlug.get(s.conference);
      if (!conf || !(conf.tracks ?? []).some((t) => t.slug === s.track)) {
        err(where('sessions', s), `"track" "${s.track}" is not a track of its conference`);
      }
    }
  }

  // --- venues ---
  for (const v of venues ?? []) {
    required('venues', v, ['name', 'address', 'city']);
    asset('venues', v, 'logo');
    asset('venues', v, 'image');
  }

  // --- sponsors ---
  for (const s of sponsors ?? []) {
    required('sponsors', s, ['name', 'kind']);
    if (s.kind !== undefined && !SPONSOR_KINDS.includes(s.kind)) {
      err(where('sponsors', s), `unknown kind "${s.kind}" (use ${SPONSOR_KINDS.join(', ')})`);
    }
    asset('sponsors', s, 'logo');
  }

  // --- galleries ---
  for (const g of galleries ?? []) {
    required('galleries', g, ['title', 'date', 'cover', 'photos']);
    date('galleries', g, 'date');
    oneParent('galleries', g);
    asset('galleries', g, 'cover');
    shareTwin('galleries', g, 'cover');
    (g.photos ?? []).forEach((p, i) => {
      if (!p.src) err(where('galleries', g), `photos[${i}] missing "src"`);
      if (!p.alt) err(where('galleries', g), `photos[${i}] missing "alt"`);
      asset('galleries', g, `photos[${i}].src`, p.src);
      asset('galleries', g, `photos[${i}].thumb`, p.thumb);
    });
  }

  // --- site ---
  for (const slug of site?.featuredSpeakers ?? []) {
    if (!slugSets.speakers.has(slug)) err('site.featuredSpeakers', `references unknown speaker "${slug}"`);
  }

  return errors;
}
