import {
  formatDate,
  formatTimeRange,
  getEventPlaceLabel,
  getSpeakersForEvent,
  getStatus,
} from '../../content';
import Button from '../ui/Button';
import CompactCard from '../ui/CompactCard';
import StatusBadge from '../ui/StatusBadge';
import { CARD_SURFACE } from '../ui/cardSurface';
import { CARD_BANNER_SIZES, bannerSrcSet } from '../../lib/images';
import SpeakerAvatars from './SpeakerAvatars';

function Banner({ event }) {
  if (event.banner) {
    return (
      <img
        src={event.banner}
        srcSet={bannerSrcSet(event.banner)}
        sizes={CARD_BANNER_SIZES}
        alt=""
        width="1200"
        height="612"
        loading="lazy"
        decoding="async"
        className="block w-full h-auto aspect-[1440/734] object-cover border-b border-black"
      />
    );
  }
  // No banner: keep the same footprint so cards in a row stay aligned.
  return (
    <div className="relative w-full aspect-[1440/734] bg-[#E1EEFB] border-b border-black">
      <img
        src="/Img/duke-logo-svg.svg"
        alt=""
        width="463"
        height="483"
        loading="lazy"
        decoding="async"
        className="absolute inset-0 m-auto h-1/2 w-auto"
      />
    </div>
  );
}

function MetaLine({ label, children }) {
  return (
    <p className="flex gap-2 font-raleway font-medium text-[16px] leading-[24px] sm:text-[14px] sm:leading-[20px]">
      <span className="font-bold shrink-0">{label}:</span>
      <span className="min-w-0">{children}</span>
    </p>
  );
}

/**
 * Full event card for the Upcoming list: banner, title, date/time/place,
 * clamped description, speaker avatars, status, Register + Details.
 * `now` must be a Date (see useNow).
 */
export default function EventCard({ event, now, headingAs: Heading = 'h3' }) {
  const status = getStatus(event, now);
  const time = formatTimeRange(event.startTime, event.endTime);
  const place = getEventPlaceLabel(event);
  const speakers = getSpeakersForEvent(event.slug);
  const showRegister = Boolean(event.registrationUrl) && status !== 'completed';

  return (
    <article className={`${CARD_SURFACE} h-full flex flex-col`}>
      <Banner event={event} />
      <div className="flex-1 flex flex-col p-6 sm:p-5">
        <StatusBadge status={status} className="self-start" />
        <Heading className="mt-4 font-raleway font-bold text-[24px] leading-[30px] sm:text-[18px] sm:leading-[24px] break-words">
          {event.name}
        </Heading>
        <div className="mt-4 space-y-1">
          <MetaLine label="Date">
            <time dateTime={event.date}>{formatDate(event.date)}</time>
          </MetaLine>
          {time ? <MetaLine label="Time">{time}</MetaLine> : null}
          {place ? <MetaLine label="Where">{place}</MetaLine> : null}
        </div>
        {event.description ? (
          <p className="mt-4 font-raleway text-[16px] leading-[26px] sm:text-[14px] sm:leading-[22px] line-clamp-3">
            {event.description}
          </p>
        ) : null}
        <SpeakerAvatars speakers={speakers} className="mt-5" />
        <div className="mt-auto pt-6 flex flex-wrap gap-3">
          {showRegister ? (
            <Button href={event.registrationUrl} shape="card">
              Register<span className="sr-only"> for {event.name}</span>
            </Button>
          ) : null}
          <Button to={`/events/${event.slug}`} shape="card">
            Details<span className="sr-only"> about {event.name}</span>
          </Button>
        </div>
      </div>
    </article>
  );
}

/** Compact card for the Past list. */
export function EventCardCompact({ event, headingAs }) {
  return (
    <CompactCard
      to={`/events/${event.slug}`}
      date={<time dateTime={event.date}>{formatDate(event.date)}</time>}
      title={event.name}
      place={getEventPlaceLabel(event)}
      headingAs={headingAs}
    />
  );
}
