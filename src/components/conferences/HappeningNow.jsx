import Button from '../ui/Button';
import Card from '../ui/Card';
import Container from '../ui/Container';
import StatusBadge from '../ui/StatusBadge';
import SessionItem from '../events/SessionItem';
import { getCurrentAndNextSession } from '../../content';

/** Live-mode banner: the session running now, the next one, and Join / Get directions CTAs. */
export default function HappeningNow({ conference, now, mapUrl }) {
  const { current, next } = getCurrentAndNextSession(conference.slug, now);
  const joinUrl = conference.externalUrl ?? conference.registrationUrl;
  const slots = [
    { label: 'Now', session: current },
    { label: 'Up next', session: next },
  ].filter((slot) => slot.session);

  return (
    <section aria-labelledby="happening-now-heading" className="bg-[#F6EAFF]">
      <Container size="xl" className="pt-[48px] pb-[72px] sm:pt-6 sm:pb-[40px] sm:max-w-[345px]">
        <Card bg="bg-[#FFC0E7]" className="p-[50px] sm:p-[25px] md:p-[40px]">
          <div className="flex flex-wrap items-center gap-4 sm:gap-3">
            <StatusBadge status="live" />
            <h2
              id="happening-now-heading"
              className="font-raleway font-bold text-[40px] leading-[48px] sm:text-[24px] sm:leading-[30px]"
            >
              Happening Now
            </h2>
          </div>
          {slots.length > 0 ? (
            <div className="grid grid-cols-2 md:grid-cols-1 sm:grid-cols-1 gap-6 sm:gap-4 pt-8 sm:pt-5">
              {slots.map(({ label, session }) => (
                <div key={label} className="min-w-0">
                  <h3 className="pb-3 font-raleway font-semibold text-[20px] sm:text-[16px]">{label}</h3>
                  <SessionItem session={session} headingAs="h4" />
                </div>
              ))}
            </div>
          ) : null}
          {joinUrl || mapUrl ? (
            <div className="flex flex-wrap gap-4 sm:gap-3 pt-8 sm:pt-5">
              {joinUrl ? (
                <Button href={joinUrl} shape="card">
                  Join<span className="sr-only"> {conference.name}</span>
                </Button>
              ) : null}
              {mapUrl ? (
                <Button href={mapUrl} shape="card">
                  Get directions
                </Button>
              ) : null}
            </div>
          ) : null}
        </Card>
      </Container>
    </section>
  );
}
