import { getCollection, type CollectionEntry } from 'astro:content';

export type EventEntry = CollectionEntry<'events'>;
export type PersonEntry = CollectionEntry<'people'>;
export type PartnerEntry = CollectionEntry<'partners'>;

export const ROLE_LABEL: Record<string, string> = {
  venue: 'Venue partner',
  sponsor: 'Sponsor',
  food: 'Food partner',
  goodies: 'Goodies partner',
  swag: 'Swag partner',
  community: 'Community partner',
  media: 'Media partner',
  knowledge: 'Knowledge partner',
};

export const FORMAT_LABEL: Record<string, string> = {
  meetup: 'Meetup',
  conference: 'Conference',
  online: 'Online',
  workshop: 'Workshop',
  special: 'Special edition',
};

const startOfToday = () => {
  const d = new Date();
  d.setHours(0, 0, 0, 0);
  return d;
};

export const isUpcoming = (e: EventEntry) => (e.data.endDate ?? e.data.date) >= startOfToday();

export async function getEvents() {
  const all = await getCollection('events');
  return all.sort((a, b) => b.data.date.getTime() - a.data.date.getTime());
}

export async function getUpcomingEvents() {
  return (await getEvents()).filter(isUpcoming).reverse();
}

export async function getPastEvents() {
  return (await getEvents()).filter((e) => !isUpcoming(e));
}

export function formatEventDate(e: EventEntry, opts: { short?: boolean } = {}) {
  const d = e.data.date;
  if (e.data.dateApproximate) {
    return d.toLocaleDateString('en-IN', { month: opts.short ? 'short' : 'long', year: 'numeric', timeZone: 'UTC' });
  }
  return d.toLocaleDateString('en-IN', {
    weekday: opts.short ? undefined : 'short',
    day: 'numeric',
    month: opts.short ? 'short' : 'long',
    year: 'numeric',
    timeZone: 'UTC',
  });
}

/** Map of person id -> list of {event, talk} they spoke at. */
export async function getTalksByPerson() {
  const events = await getEvents();
  const map = new Map<string, { event: EventEntry; talk: EventEntry['data']['talks'][number] }[]>();
  for (const event of events) {
    for (const talk of event.data.talks) {
      for (const s of talk.speakers) {
        if (!map.has(s.id)) map.set(s.id, []);
        map.get(s.id)!.push({ event, talk });
      }
    }
  }
  return map;
}

export async function getHostedByPerson() {
  const events = await getEvents();
  const map = new Map<string, EventEntry[]>();
  for (const event of events)
    for (const h of event.data.hosts) {
      if (!map.has(h.id)) map.set(h.id, []);
      map.get(h.id)!.push(event);
    }
  return map;
}

export async function getSpeakers() {
  const [people, talks] = await Promise.all([getCollection('people'), getTalksByPerson()]);
  return people
    .filter((p) => talks.has(p.id))
    .map((p) => ({ person: p, talks: talks.get(p.id)! }))
    .sort((a, b) => b.talks[0].event.data.date.getTime() - a.talks[0].event.data.date.getTime());
}

export async function getTeam() {
  const people = await getCollection('people');
  const byOrder = (a: PersonEntry, b: PersonEntry) => a.data.order - b.data.order || a.data.name.localeCompare(b.data.name);
  return {
    core: people.filter((p) => p.data.roles.includes('core') || p.data.roles.includes('founder')).sort(byOrder),
    volunteers: people.filter((p) => p.data.roles.includes('volunteer')).sort(byOrder),
  };
}

/** Map of partner id -> list of {event, role}. */
export async function getSupportByPartner() {
  const events = await getEvents();
  const map = new Map<string, { event: EventEntry; role: string }[]>();
  for (const event of events)
    for (const p of event.data.partners) {
      if (!map.has(p.partner.id)) map.set(p.partner.id, []);
      map.get(p.partner.id)!.push({ event, role: p.role });
    }
  return map;
}

export async function getStats() {
  const [events, speakers, partners, people] = await Promise.all([
    getPastEvents(),
    getSpeakers(),
    getCollection('partners'),
    getCollection('people'),
  ]);
  return {
    events: events.length,
    registrations: events.reduce((n, e) => n + (e.data.registered ?? e.data.attended ?? 0), 0),
    speakers: speakers.length,
    partners: partners.length,
    volunteers: people.filter((p) => p.data.roles.length).length,
  };
}

export const initials = (name: string) =>
  name
    .replace(/^Dr\.?\s+/, '')
    .split(/\s+/)
    .map((w) => w[0])
    .slice(0, 2)
    .join('')
    .toUpperCase();
