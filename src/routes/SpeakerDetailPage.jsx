import { useParams } from 'react-router-dom';
import Seo from '../components/Seo';
import Container from '../components/ui/Container';
import { DetailHero, DetailTitle } from '../components/ui/PageHero';
import EmptyState from '../components/ui/EmptyState';
import DetailSection from '../components/ui/DetailSection';
import { ConferenceCardCompact } from '../components/conferences/ConferenceCard';
import { EventCardCompact } from '../components/events/EventCard';
import SessionItem from '../components/events/SessionItem';
import { GRID } from '../components/events/eventsGrid';
import SpeakerPhoto from '../components/speakers/SpeakerPhoto';
import SpeakerRole from '../components/speakers/SpeakerRole';
import SpeakerSocials from '../components/speakers/SpeakerSocials';
import {
  getConferencesForSpeaker,
  getEventsForSpeaker,
  getSessionsForSpeaker,
  getSpeakerBySlug,
  site,
} from '../content';
import { breadcrumbJsonLd, personJsonLd } from '../lib/jsonLd';
import NotFoundPage from './NotFoundPage';

const sessionPath = ({ slug, parent }) =>
  `/${parent.type === 'event' ? 'events' : 'conferences'}/${parent.item.slug}#${slug}`;

export default function SpeakerDetailPage() {
  const { slug } = useParams();
  const speaker = getSpeakerBySlug(slug);
  if (!speaker) return <NotFoundPage />;

  const talks = getSessionsForSpeaker(speaker.slug);
  const events = getEventsForSpeaker(speaker.slug);
  const conferences = getConferencesForSpeaker(speaker.slug);
  const path = `/speakers/${speaker.slug}`;

  return (
    <>
      <Seo
        title={speaker.name}
        description={speaker.bio || `Talks and sessions by ${speaker.name} at ${site.name}.`}
        path={path}
        image={speaker.photo}
        noindex={speaker.isSample}
        jsonLd={[personJsonLd(speaker, path), breadcrumbJsonLd('/speakers', { name: speaker.name, path })]}
      />

      <DetailHero>
        <div className="col-span-3 md:col-span-4 sm:col-span-12 sm:w-[200px] sm:mx-auto">
          <SpeakerPhoto speaker={speaker} priority />
        </div>
        <div className="col-span-9 md:col-span-8 sm:col-span-12 min-w-0 sm:text-center">
          <DetailTitle>
            {speaker.name}
          </DetailTitle>
          <SpeakerRole
            speaker={speaker}
            className="pt-3 text-[20px] leading-[28px] sm:text-[14px] sm:leading-[22px]"
          />
          {speaker.bio ? (
            <p className="mt-6 sm:mt-4 max-w-[760px] font-raleway text-[18px] leading-[30px] sm:text-[14px] sm:leading-[24px]">
              {speaker.bio}
            </p>
          ) : null}
          <SpeakerSocials speaker={speaker} className="pt-6 sm:pt-4 sm:justify-center" />
        </div>
      </DetailHero>

      <div className="bg-[#FFFCEF]">
        <Container size="xl" className="sm:max-w-[345px] pb-[100px] sm:pb-[50px]">
          {talks.length ? (
            <>
              <DetailSection title="Talks &" squiggle="Sessions">
                {/* `speakers` undefined → SessionItem lists every speaker; [] → no byline (solo talk). */}
                <ul className="flex flex-col gap-6 sm:gap-4">
                  {talks.map((talk) => (
                    <SessionItem
                      key={talk.slug}
                      as="li"
                      session={talk}
                      showDate
                      speakers={talk.speakers.length > 1 ? undefined : []}
                      titleTo={sessionPath(talk)}
                    />
                  ))}
                </ul>
              </DetailSection>

              {events.length ? (
                <DetailSection title="Events" squiggle="participated">
                  <ul className={GRID}>
                    {events.map((event) => (
                      <li key={event.slug}>
                        <EventCardCompact event={event} headingAs="h3" />
                      </li>
                    ))}
                  </ul>
                </DetailSection>
              ) : null}

              {conferences.length ? (
                <DetailSection title="Conferences" squiggle="participated">
                  <ul className={GRID}>
                    {conferences.map((conference) => (
                      <li key={conference.slug}>
                        <ConferenceCardCompact conference={conference} headingAs="h3" />
                      </li>
                    ))}
                  </ul>
                </DetailSection>
              ) : null}
            </>
          ) : (
            <div className="pt-[100px] sm:pt-[50px]">
              <EmptyState
                title="No talks listed yet"
                message={`${speaker.name}'s sessions at ${site.name} will show up here.`}
              />
            </div>
          )}
        </Container>
      </div>
    </>
  );
}
