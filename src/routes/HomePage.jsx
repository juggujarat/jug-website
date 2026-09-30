import Seo from '../components/Seo';
import {
  formatDate,
  formatDateRange,
  getConferencesByStatus,
  getEventPlaceLabel,
  getGalleriesByYear,
  getPastEvents,
  getStatus,
  getUpcomingEvents,
  site,
} from '../content';
import { usePageChrome } from '../layouts/pageChrome';
import { useNow } from '../lib/useNow';
import { organizationJsonLd } from '../lib/jsonLd';
import Button from '../components/ui/Button';
import { ThumbGrid } from '../components/ui/Thumb';
import ConferenceCard from '../components/conferences/ConferenceCard';
import EventCard, { EventCardCompact } from '../components/events/EventCard';
import { GRID } from '../components/events/eventsGrid';
import ConferenceHighlights from '../components/home/ConferenceHighlights';
import HomeSection from '../components/home/HomeSection';
import VenuePartnersStrip from '../components/partners/VenuePartnersStrip';
import Home from '../pages/Home';
import AboutCommunity from '../pages/AboutCommunity';
import Experts from '../pages/Experts';
import Sessions from '../pages/Sessions';
import Volunteer from '../pages/Volunteer';
import Reviews from '../pages/Reviews';
import { JoinJug } from '../pages/JoinJug';

const conferenceFeature = (c, status) => ({
  name: c.name,
  status,
  record: c,
  dateIso: c.startDate,
  dateLabel: formatDateRange(c.startDate, c.endDate),
  place: c.location,
  blurb: c.tagline,
  to: `/conferences/${c.slug}`,
  ctaLabel: 'Explore Conference',
  registrationUrl: c.registrationUrl,
});

const eventFeature = (e, status) => ({
  name: e.name,
  status,
  record: e,
  dateIso: e.date,
  dateLabel: formatDate(e.date),
  place: getEventPlaceLabel(e),
  blurb: e.description,
  to: `/events/${e.slug}`,
  ctaLabel: 'View Event',
  registrationUrl: e.registrationUrl,
});

// Sections that depend on the current time; rendered once `now` is known.
function ScheduleSections({ now, conference, conferenceStatus, otherOpen, completed }) {
  const upcomingEvents = getUpcomingEvents(now).slice(0, 3);
  const pastEvents = getPastEvents(now).slice(0, 3);
  const conferences = (otherOpen.length ? otherOpen : completed).slice(0, 3);

  return (
    <>
      {upcomingEvents.length ? (
        <HomeSection
          id="upcoming-events"
          bg="bg-[#FFFCEF]"
          title="Upcoming"
          squiggle="Meetups"
          action={<Button to="/events">All events</Button>}
        >
          <ul className={GRID}>
            {upcomingEvents.map((event) => (
              <li key={event.slug} className="h-full">
                <EventCard event={event} now={now} />
              </li>
            ))}
          </ul>
        </HomeSection>
      ) : null}

      {conference ? (
        <ConferenceHighlights conference={conference} status={conferenceStatus} />
      ) : null}

      {conferences.length ? (
        <HomeSection
          id="conferences"
          bg="bg-[#FFEFC6]"
          title={otherOpen.length ? 'Upcoming' : 'Recent'}
          squiggle="Conferences"
          action={<Button to="/conferences">All conferences</Button>}
        >
          <ul className={GRID}>
            {conferences.map((c) => (
              <li key={c.slug} className="h-full">
                <ConferenceCard conference={c} status={getStatus(c, now)} />
              </li>
            ))}
          </ul>
        </HomeSection>
      ) : null}

      {pastEvents.length ? (
        <HomeSection
          id="past-events"
          bg="bg-[#CAF8FC]"
          title="Recent"
          squiggle="Meetups"
          action={<Button to="/events">All events</Button>}
        >
          <ul className={GRID}>
            {pastEvents.map((event) => (
              <li key={event.slug} className="h-full">
                <EventCardCompact event={event} headingAs="h3" />
              </li>
            ))}
          </ul>
        </HomeSection>
      ) : null}
    </>
  );
}

function GallerySection() {
  const photos = getGalleriesByYear()
    .flatMap(({ galleries }) => galleries)
    .flatMap((g) => g.photos)
    .slice(0, 6);
  if (!photos.length) return null;

  return (
    <HomeSection
      id="gallery"
      bg="bg-[#D7FFF1]"
      title="Community"
      squiggle="Gallery"
      action={<Button to="/gallery">View gallery</Button>}
    >
      <ThumbGrid photos={photos} />
    </HomeSection>
  );
}

// Section ids double as legacy anchors: /#about, /#speakers, /#sessions,
// /#volunteer, /#reviews (scrolled to by ScrollManager).
export default function HomePage() {
  const now = useNow();
  const byStatus = getConferencesByStatus(now);
  // Live first, then the soonest upcoming — same order as getCurrentConference.
  const [conference, ...otherOpen] = [...byStatus.live, ...byStatus.upcoming];
  const currentStatus = conference ? getStatus(conference, now) : null;
  const nextMeetup = getUpcomingEvents(now)[0];

  let feature = null;
  if (conference) feature = conferenceFeature(conference, currentStatus);
  else if (nextMeetup) feature = eventFeature(nextMeetup, getStatus(nextMeetup, now));

  usePageChrome({
    headerCta: conference?.registrationUrl && { label: 'Book Your Slots', href: conference.registrationUrl },
  });

  return (
    <>
      <Seo fullTitle={`${site.name} - Official Community Page`} description={site.description} path="/" jsonLd={organizationJsonLd()} />
      <Home feature={feature} />
      <AboutCommunity />
      <ScheduleSections
        now={now}
        conference={conference}
        conferenceStatus={currentStatus}
        otherOpen={otherOpen}
        completed={byStatus.completed}
      />
      <Experts />
      <Sessions />
      <GallerySection />
      <VenuePartnersStrip />
      <div id="volunteer">
        <Volunteer />
      </div>
      <div id="reviews">
        <Reviews />
      </div>
      <JoinJug />
    </>
  );
}
