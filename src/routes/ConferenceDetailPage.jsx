import { useParams } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
// Font Awesome is only used on this page (check icons in the hero).
import '@fortawesome/fontawesome-free/css/all.min.css';
import Seo from '../components/Seo';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';
import EmptyState from '../components/ui/EmptyState';
import Pill from '../components/ui/Pill';
import Container from '../components/ui/Container';
import SectionHeading from '../components/ui/SectionHeading';
import SessionItem from '../components/events/SessionItem';
import GalleryPreview from '../components/events/GalleryPreview';
import HappeningNow from '../components/conferences/HappeningNow';
import {
  formatDate,
  getAnnouncementsForConference,
  getConferenceBySlug,
  getConferenceSpeakerCount,
  getGalleriesForConference,
  getPartnersForConference,
  getPastConferences,
  getSessionsForConference,
  getSpeakersForConference,
  getSponsorsForConference,
  getStatus,
  isCfpOpen,
  getVenuesForConference,
  getWorkshopsForConference,
} from '../content';
import { usePageChrome } from '../layouts/pageChrome';
import { useNow } from '../lib/useNow';
import { breadcrumbJsonLd, eventJsonLd } from '../lib/jsonLd';
import Event from '../event/Event';
import EventSubNav from '../event/EventSubNav';
import AboutEvent from '../event/AboutEvent';
import Speaker from '../event/Speaker';
import Schedule from '../event/Schedule';
import EventVenue from '../event/EventVenue';
import Goodies from '../event/Goodies';
import SubmitCFP from '../pages/SubmitCFP';
import Sponsors from '../event/Sponsors';
import SponsorsshipOpp from '../event/SponsorsshipOpp';
import JugPartners from '../event/JugPartners';
import CommunityPartners from '../event/CommunityPartners';
import EventVolunteer from '../event/EventVolunteer';
import BooKSlots from '../event/BooKSlots';
import NotFoundPage from './NotFoundPage';

function Section({ bg, title, squiggle, children }) {
  return (
    <section className={bg}>
      <Container size="xl" className="pt-[128px] pb-[100px] sm:pt-[50px] sm:pb-[50px] sm:max-w-[345px]">
        <SectionHeading squiggle={squiggle}>{title}</SectionHeading>
        <div className="pt-[48px] sm:pt-[20px]">{children}</div>
      </Container>
    </section>
  );
}

export default function ConferenceDetailPage() {
  const { slug } = useParams();
  // Hooks before the early return.
  const now = useNow(60 * 1000);
  const conference = getConferenceBySlug(slug);
  usePageChrome(
    conference && {
      headerTone: 'bg-[#F6EAFF]',
      activeNav: '/conferences',
      headerCta: { label: 'Book Your Slots', href: conference.registrationUrl },
    },
  );
  if (!conference) return <NotFoundPage />;

  const status = getStatus(conference, now);
  const isLive = status === 'live';
  // In-page Register/CFP CTAs only while they can still be acted on (as on
  // EventDetailPage); the header CTA always shows (user decision).
  const isOpen = status === 'upcoming' || status === 'live';
  const registrationUrl = isOpen ? conference.registrationUrl : undefined;
  const cfpUrl = isCfpOpen(conference, now) ? conference.cfp.url : undefined;
  const sessions = getSessionsForConference(slug);
  const speakers = getSpeakersForConference(slug);
  const workshops = getWorkshopsForConference(slug);
  const recorded = sessions.filter((s) => s.slidesUrl || s.videoUrl || s.repoUrl);
  const announcements = getAnnouncementsForConference(slug);
  const galleries = getGalleriesForConference(slug).filter((g) => g.photos?.length > 0);
  // Before the lineup is out, show "coming soon" blocks and the last edition's photos.
  const isUpcoming = status === 'upcoming';
  const lineupPending = isUpcoming && speakers.length === 0;
  const expectedSpeakers = getConferenceSpeakerCount(conference);
  const schedulePending = isUpcoming && sessions.length === 0;
  const lastEditionGalleries =
    isUpcoming && !galleries.length
      ? (getPastConferences(now)
          .map((c) => getGalleriesForConference(c.slug).filter((g) => g.photos?.length > 0))
          .find((list) => list.length) ?? [])
      : [];
  const sponsors = getSponsorsForConference(slug);
  const venues = getVenuesForConference(slug);
  const jugPartners = getPartnersForConference(slug, 'jug');
  const communityPartners = getPartnersForConference(slug, 'community');
  const multiDay = conference.startDate !== conference.endDate;
  const volunteers = conference.volunteers ?? [];
  const hasSponsors = sponsors.length > 0 || venues.length > 0;
  const path = `/conferences/${conference.slug}`;
  const description = conference.description?.[0] ?? conference.tagline;

  const subNavItems = [
    { label: 'About', hash: 'about-event' },
    speakers.length > 0 || lineupPending ? { label: 'Speakers', hash: 'speakers-event' } : null,
    cfpUrl ? { label: 'Submit a CFP', href: cfpUrl } : null,
    sessions.length > 0 || schedulePending ? { label: 'Schedule', hash: 'schedule-event' } : null,
    hasSponsors ? { label: 'Sponsors', hash: 'sponsors-event' } : null,
    volunteers.length > 0 ? { label: 'Our RockStars', hash: 'team-event' } : null,
  ].filter(Boolean);

  const announcementsSection =
    announcements.length > 0 ? (
      <Section bg="bg-[#FFFCEF]" title="Latest" squiggle="Announcements">
        <ul className="flex flex-col gap-6 sm:gap-4">
          {announcements.map((item) => (
            <Card as="li" key={`${item.date}-${item.title}`} className="p-8 sm:p-5 font-raleway">
              {item.date ? (
                <time dateTime={item.date} className="text-[14px] font-medium">
                  {formatDate(item.date)}
                </time>
              ) : null}
              <h3 className="pt-2 font-bold text-[24px] leading-[30px] sm:text-[18px] sm:leading-[24px] break-words">
                {item.title}
              </h3>
              {item.body ? (
                <p className="pt-3 text-[16px] leading-[26px] sm:text-[14px] sm:leading-[22px]">{item.body}</p>
              ) : null}
            </Card>
          ))}
        </ul>
      </Section>
    ) : null;

  return (
    <>
      <Seo
        title={conference.name}
        description={description}
        path={path}
        image={conference.banner}
        noindex={conference.isSample}
        jsonLd={[
          eventJsonLd(conference, { path, description, places: venues, speakers }),
          breadcrumbJsonLd('/conferences', { name: conference.name, path }),
        ]}
      />
      <ToastContainer position="bottom-center" autoClose={2000} hideProgressBar closeOnClick />
      <EventSubNav label={`${conference.name} sections`} items={subNavItems} />
      <Event conference={conference} status={status} registrationUrl={registrationUrl} />
      {isLive ? (
        <>
          <HappeningNow conference={conference} now={now} mapUrl={venues[0]?.mapUrl} />
          {announcementsSection}
        </>
      ) : null}
      <div id="about-event">
        <AboutEvent conference={conference} mapUrl={venues[0]?.mapUrl} registrationUrl={registrationUrl} />
      </div>
      {isLive ? null : announcementsSection}
      {speakers.length > 0 ? (
        <div id="speakers-event">
          <Speaker speakers={speakers} cfpUrl={cfpUrl} />
        </div>
      ) : null}
      {lineupPending ? (
        <div id="speakers-event">
          <Section bg="bg-[#E1EEFB]" title="Java Innovators" squiggle="Coming Soon">
            <EmptyState
              headingAs="h3"
              title="Speakers revealed soon"
              message={`${expectedSpeakers ? `${expectedSpeakers} industry speakers` : 'Industry speakers'} are taking the stage. The lineup will be announced soon.`}
              action={registrationUrl ? <Button href={registrationUrl}>Book Your Slots</Button> : null}
            />
          </Section>
        </div>
      ) : null}
      {sessions.length > 0 ? (
        <div id="schedule-event">
          <Schedule
            sessions={sessions}
            tracks={conference.tracks ?? []}
            registrationUrl={registrationUrl}
          />
        </div>
      ) : null}
      {schedulePending ? (
        <div id="schedule-event">
          <Section bg="bg-[#FFFCEF]" title="Explore the" squiggle="Schedule">
            <EmptyState
              headingAs="h3"
              bg="bg-[#D7FFF1]"
              title="Sessions announced soon"
              message={
                conference.tracks?.length
                  ? 'Sessions will be announced with the speaker lineup, across these tracks:'
                  : 'Sessions will be announced with the speaker lineup.'
              }
              action={
                conference.tracks?.length ? (
                  <ul className="flex flex-wrap justify-center gap-3">
                    {conference.tracks.map((track) => (
                      <li key={track.slug}>
                        <Pill>{track.name}</Pill>
                      </li>
                    ))}
                  </ul>
                ) : null
              }
            />
          </Section>
        </div>
      ) : null}
      {workshops.length > 0 ? (
        <Section bg="bg-[#E1EEFB]" title="Hands-on" squiggle="Workshops">
          <ul className="flex flex-col gap-6 sm:gap-4">
            {workshops.map((session) => (
              <SessionItem key={session.slug} as="li" session={session} showDate={multiDay} />
            ))}
          </ul>
        </Section>
      ) : null}
      {recorded.length > 0 ? (
        <Section bg="bg-[#FFFCEF]" title="Resources &" squiggle="Recordings">
          <ul className="flex flex-col gap-6 sm:gap-4">
            {recorded.map((session) => (
              <SessionItem key={session.slug} as="li" session={session} showDate={multiDay} />
            ))}
          </ul>
        </Section>
      ) : null}
      {venues[0] ? <EventVenue conference={conference} venue={venues[0]} registrationUrl={registrationUrl} /> : null}
      {conference.goodies?.length > 0 ? (
        <Goodies goodies={conference.goodies} registrationUrl={registrationUrl} />
      ) : null}
      {lastEditionGalleries.length > 0 ? (
        <Section bg="bg-[#FFFCEF]" title="Moments from the" squiggle="Last Edition">
          <div className="flex flex-col gap-[64px] sm:gap-10">
            {lastEditionGalleries.map((gallery) => (
              <GalleryPreview key={gallery.slug} gallery={gallery} showTitle />
            ))}
          </div>
        </Section>
      ) : null}
      {galleries.length > 0 ? (
        <Section bg="bg-[#FFFCEF]" title="Moments from the" squiggle="Conference">
          <div className="flex flex-col gap-[64px] sm:gap-10">
            {galleries.map((gallery) => (
              <GalleryPreview key={gallery.slug} gallery={gallery} showTitle={galleries.length > 1} />
            ))}
          </div>
        </Section>
      ) : null}
      {cfpUrl ? <SubmitCFP url={cfpUrl} /> : null}
      {hasSponsors ? (
        <div id="sponsors-event">
          <Sponsors sponsors={sponsors} venueSponsors={venues} />
        </div>
      ) : null}
      {conference.sponsorship ? <SponsorsshipOpp sponsorship={conference.sponsorship} /> : null}
      {jugPartners.length > 0 ? (
        <JugPartners partners={jugPartners} registrationUrl={registrationUrl} />
      ) : null}
      {communityPartners.length > 0 ? (
        <CommunityPartners partners={communityPartners} registrationUrl={registrationUrl} />
      ) : null}
      {volunteers.length > 0 ? (
        <div id="team-event">
          <EventVolunteer volunteers={volunteers} />
        </div>
      ) : null}
      {registrationUrl ? (
        <BooKSlots name={conference.name} registrationUrl={registrationUrl} />
      ) : null}
    </>
  );
}
