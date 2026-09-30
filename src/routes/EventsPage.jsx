import { allSample, events, getPastEventsByYear, getUpcomingEvents, site } from '../content';
import Seo from '../components/Seo';
import Button from '../components/ui/Button';
import PageHero from '../components/ui/PageHero';
import Container from '../components/ui/Container';
import EmptyState from '../components/ui/EmptyState';
import SectionHeading from '../components/ui/SectionHeading';
import EventCard, { EventCardCompact } from '../components/events/EventCard';
import { GRID } from '../components/events/eventsGrid';
import { useNow } from '../lib/useNow';

const DESCRIPTION = `Upcoming and past ${site.name} meetups in Gujarat — dates, venues, speakers, talks and registration links.`;

export default function EventsPage() {
  const now = useNow();
  const upcoming = getUpcomingEvents(now);
  const pastByYear = getPastEventsByYear(now);

  return (
    <>
      <Seo title="Events" description={DESCRIPTION} path="/events" noindex={allSample(events)} />

      <PageHero
        title="Meetups & Events"
        intro={`Hands-on sessions and talks by the ${site.name} community. Join the next one, or catch up on the talks you missed.`}
      >
        <Button href={site.lumaCalendarUrl}>Follow us on Luma</Button>
      </PageHero>

      <section aria-labelledby="upcoming-heading" className="bg-[#FFFCEF]">
        <Container>
          <div className="pt-[100px] pb-[50px] sm:pt-[50px] sm:pb-[25px]">
            <SectionHeading id="upcoming-heading" squiggle="Meetups" className="sm:text-center">
              Upcoming
            </SectionHeading>
            <div className="pt-[48px] sm:pt-[24px]">
              {upcoming.length ? (
                <ul className={GRID}>
                  {upcoming.map((event) => (
                    <li key={event.slug} className="h-full">
                      <EventCard event={event} now={now} />
                    </li>
                  ))}
                </ul>
              ) : (
                <EmptyState
                  headingAs="h3"
                  title="No upcoming meetups right now"
                  message="Follow us on Luma to hear about the next meetup as soon as it's announced."
                  action={<Button href={site.lumaCalendarUrl}>Follow us on Luma</Button>}
                />
              )}
            </div>
          </div>
        </Container>
      </section>

      {pastByYear.length ? (
        <section aria-labelledby="past-heading" className="bg-[#FFFCEF]">
          <Container>
            <div className="pt-[50px] pb-[100px] sm:pt-[25px] sm:pb-[50px]">
              <SectionHeading id="past-heading" squiggle="Meetups" className="sm:text-center">
                Past
              </SectionHeading>
              {pastByYear.map(({ year, events: yearEvents }) => (
                <div key={year} className="pt-[48px] sm:pt-[24px]">
                  <h3 className="font-raleway font-bold text-[32px] leading-[40px] sm:text-[20px] sm:leading-[28px] sm:text-center">
                    {year}
                  </h3>
                  <ul className={`mt-6 sm:mt-4 ${GRID}`}>
                    {yearEvents.map((event) => (
                      <li key={event.slug} className="h-full">
                        <EventCardCompact event={event} />
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </Container>
        </section>
      ) : (
        <div className="bg-[#FFFCEF] pb-[50px] sm:pb-[25px]" />
      )}
    </>
  );
}
