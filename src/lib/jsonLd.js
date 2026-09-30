import { site } from '../content';
import { absoluteUrl } from './url';
import { NAV_ITEMS } from '../components/navItems';

const CONTEXT = 'https://schema.org';

const isoIst = (date, time) => (time ? `${date}T${time}:00+05:30` : date);

const placeJsonLd = ({ name, address, city }) => ({
  '@type': 'Place',
  name,
  address: address || city ? { '@type': 'PostalAddress', streetAddress: address, addressLocality: city, addressCountry: 'IN' } : undefined,
});

export const organizationJsonLd = () => ({
  '@context': CONTEXT,
  '@type': 'Organization',
  name: site.fullName,
  alternateName: site.name,
  url: site.url,
  logo: absoluteUrl(site.logo),
  description: site.description,
  sameAs: [site.socials.linkedin, site.socials.x, site.socials.youtube].filter(Boolean),
});

/**
 * schema.org Event for an event or conference record, or null when there is
 * no location to publish (`location` is required by schema.org / Google).
 * @param {object} entity  event (`date`) or conference (`startDate`/`endDate`)
 * @param {object} opts    { path, description, places: [{ name, address, city, online }], speakers }
 */
export const eventJsonLd = (entity, { path, description, places: allPlaces, speakers }) => {
  const places = allPlaces.filter((p) => !p.isSample);
  const url = absoluteUrl(path);
  const online = places.length > 0 && places.every((p) => p.online);
  const location = places.length
    ? places.map((p) => (p.online ? { '@type': 'VirtualLocation', url: entity.externalUrl ?? url } : placeJsonLd(p)))
    : entity.location
      ? [{ '@type': 'Place', name: entity.location, address: entity.location }]
      : [];
  if (!location.length) return null;
  const performers = speakers.filter((s) => !s.isSample);
  return {
    '@context': CONTEXT,
    '@type': 'Event',
    name: entity.name,
    description,
    startDate: isoIst(entity.date ?? entity.startDate, entity.startTime),
    // Without an end time, end of day (matches getEndDateTime) so end isn't before start.
    endDate: isoIst(entity.date ?? entity.endDate, entity.endTime ?? (entity.startTime && '23:59')),
    eventStatus: `${CONTEXT}/EventScheduled`,
    eventAttendanceMode: `${CONTEXT}/${online ? 'Online' : 'Offline'}EventAttendanceMode`,
    location,
    image: entity.banner ? [absoluteUrl(entity.banner)] : undefined,
    url,
    organizer: { '@type': 'Organization', name: site.fullName, url: site.url },
    performer: performers.length
      ? performers.map((s) => ({ '@type': 'Person', name: s.name, url: absoluteUrl(`/speakers/${s.slug}`) }))
      : undefined,
  };
};

export const personJsonLd = (speaker, path) => ({
  '@context': CONTEXT,
  '@type': 'Person',
  name: speaker.name,
  url: absoluteUrl(path),
  image: absoluteUrl(speaker.photo),
  jobTitle: speaker.designation,
  worksFor: speaker.company ? { '@type': 'Organization', name: speaker.company } : undefined,
  description: speaker.bio,
  sameAs: speaker.socials ? Object.values(speaker.socials) : undefined,
});

const navCrumb = (to) => {
  const item = NAV_ITEMS.find((n) => n.to === to);
  if (!item) throw new Error(`breadcrumbJsonLd: "${to}" is not a NAV_ITEMS path`);
  return { name: item.label, path: to };
};

/** Home › section (label from the main nav) › current page. */
export const breadcrumbJsonLd = (sectionPath, current) => ({
  '@context': CONTEXT,
  '@type': 'BreadcrumbList',
  itemListElement: [navCrumb('/'), navCrumb(sectionPath), current].map(({ name, path }, i) => ({
    '@type': 'ListItem',
    position: i + 1,
    name,
    item: absoluteUrl(path),
  })),
});
