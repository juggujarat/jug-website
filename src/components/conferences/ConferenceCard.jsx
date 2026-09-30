import {
  countLabel,
  formatDateRange,
  getSessionsForConference,
  getSpeakersForConference,
  isSpeakerSession,
} from '../../content';
import Button from '../ui/Button';
import Card from '../ui/Card';
import { CARD_SURFACE } from '../ui/cardSurface';
import { CARD_BANNER_SIZES, bannerSrcSet, FEATURED_BANNER_SIZES } from '../../lib/images';
import Pill from '../ui/Pill';
import StatusBadge from '../ui/StatusBadge';
import CompactCard from '../ui/CompactCard';
import { HERO_IMG_PRIORITY } from '../ui/heroImg';
import SpeakerAvatars from '../events/SpeakerAvatars';

const TEXT = 'font-raleway text-[16px] leading-[26px] sm:text-[14px] sm:leading-[22px]';

/**
 * Conference card for the /conferences lists. `featured` is the full-width
 * "Currently hosting" layout: pastel box, banner beside the details, bigger title.
 * `priority` marks the first featured card (right under the page hero) for eager loading.
 */
export default function ConferenceCard({ conference: c, status, featured = false, priority = false }) {
  const speakers = getSpeakersForConference(c.slug);
  const counts = [
    countLabel(getSessionsForConference(c.slug).filter(isSpeakerSession).length, 'session'),
    countLabel(c.tracks?.length, 'track'),
  ].filter(Boolean);
  const highlights = (c.highlights ?? []).slice(0, 3);
  const showRegister = Boolean(c.registrationUrl) && status !== 'completed';

  const body = (
    <>
      {c.banner ? (
        <img
          src={c.banner}
          srcSet={bannerSrcSet(c.banner)}
          sizes={featured ? FEATURED_BANNER_SIZES : CARD_BANNER_SIZES}
          alt=""
          width="1200"
          height="600"
          {...(priority ? HERO_IMG_PRIORITY : { loading: 'lazy' })}
          decoding="async"
          className={`block w-full aspect-[2/1] object-cover border-black ${
            featured
              ? 'h-full border-r md:h-auto md:border-r-0 md:border-b sm:h-auto sm:border-r-0 sm:border-b'
              : 'h-auto border-b'
          }`}
        />
      ) : null}
      <div className={`min-w-0 flex-1 flex flex-col ${featured ? 'p-10 md:p-8 sm:p-5' : 'p-6 sm:p-5'}`}>
        <StatusBadge status={status} className="self-start" />
        <h3
          className={`mt-4 font-raleway font-bold break-words ${
            featured
              ? 'text-[40px] leading-[48px] md:text-[32px] md:leading-[40px] sm:text-[24px] sm:leading-[30px]'
              : 'text-[24px] leading-[30px] sm:text-[18px] sm:leading-[24px]'
          }`}
        >
          {c.name}
        </h3>
        <dl className={`mt-4 grid grid-cols-[auto_1fr] gap-x-3 gap-y-1 font-medium ${TEXT}`}>
          <dt className="font-bold">Date:</dt>
          <dd>
            <time dateTime={c.startDate}>{formatDateRange(c.startDate, c.endDate)}</time>
          </dd>
          <dt className="font-bold">Where:</dt>
          <dd className="min-w-0">{c.location}</dd>
        </dl>
        <p className={`mt-4 line-clamp-3 ${TEXT}`}>{c.description?.[0]}</p>
        {counts.length ? (
          <p className="mt-4 flex flex-wrap gap-2">
            {counts.map((label) => (
              <Pill key={label} size="compact">
                {label}
              </Pill>
            ))}
          </p>
        ) : null}
        {highlights.length ? (
          <ul className={`mt-4 list-disc pl-5 ${TEXT}`}>
            {highlights.map((h) => (
              <li key={h}>{h}</li>
            ))}
          </ul>
        ) : null}
        <SpeakerAvatars speakers={speakers} className="mt-5" />
        <div className="mt-auto pt-6 flex flex-wrap gap-3">
          {showRegister ? (
            <Button href={c.registrationUrl} shape="card">
              Register<span className="sr-only"> for {c.name}</span>
            </Button>
          ) : null}
          {c.externalUrl ? (
            <Button href={c.externalUrl} shape="card">
              Website<span className="sr-only"> of {c.name}</span>
            </Button>
          ) : null}
          <Button to={`/conferences/${c.slug}`} shape="card">
            {featured ? 'View conference' : 'Details'}
            <span className="sr-only"> about {c.name}</span>
          </Button>
        </div>
      </div>
    </>
  );

  // Featured is the big pastel Card; list cards share the 24px event-card surface.
  return featured ? (
    <Card as="article" bg="bg-[#FFEFC6]" className="h-full overflow-hidden grid grid-cols-2 md:grid-cols-1 sm:grid-cols-1">
      {body}
    </Card>
  ) : (
    <article className={`${CARD_SURFACE} h-full flex flex-col`}>{body}</article>
  );
}

/** Compact card for a speaker profile's conference list. */
export function ConferenceCardCompact({ conference, headingAs }) {
  return (
    <CompactCard
      to={`/conferences/${conference.slug}`}
      date={
        <time dateTime={conference.startDate}>
          {formatDateRange(conference.startDate, conference.endDate)}
        </time>
      }
      title={conference.name}
      place={conference.location}
      headingAs={headingAs}
    />
  );
}
