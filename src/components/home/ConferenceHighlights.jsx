import {
  formatDateRange,
  getSessionsForConference,
  getConferenceSpeakerCount,
  getSpeakersForConference,
  getSponsorsForConference,
  getWorkshopsForConference,
  isSpeakerSession,
} from '../../content';
import Button from '../ui/Button';
import StatusBadge from '../ui/StatusBadge';
import PartnerLogos from '../partners/PartnerLogos';
import HomeSection from './HomeSection';

const SUBHEADING = 'font-raleway font-bold text-[24px] leading-[30px] sm:text-[18px] sm:leading-[24px]';

/** Homepage block for the live / upcoming conference. */
export default function ConferenceHighlights({ conference: c, status }) {
  const stats = [
    {
      value: getConferenceSpeakerCount(c),
      label: getSpeakersForConference(c.slug).length ? 'Speakers' : 'Expected speakers',
    },
    { value: getSessionsForConference(c.slug).filter((s) => isSpeakerSession(s) && s.type !== 'workshop').length, label: 'Sessions' },
    { value: getWorkshopsForConference(c.slug).length, label: 'Workshops' },
    { value: c.tracks?.length, label: 'Tracks' },
    { value: c.stats?.attendees, label: 'Expected attendees' },
  ].filter((stat) => stat.value);
  const sponsors = getSponsorsForConference(c.slug);

  return (
    <HomeSection id="conference" bg="bg-[#EDD7FF]" title="Conference" squiggle="Highlights">
      <div className="flex flex-wrap items-center gap-3">
        <StatusBadge status={status} />
        {status === 'live' ? <span className="font-raleway font-semibold">Currently hosting</span> : null}
      </div>
      <h3 className="mt-4 font-raleway font-bold text-[40px] leading-[48px] sm:text-[24px] sm:leading-[30px] break-words">
        {c.name}
      </h3>
      <p className="mt-3 flex flex-wrap gap-x-4 font-raleway font-medium text-[20px] leading-[28px] sm:text-[14px] sm:leading-[22px]">
        <time dateTime={c.startDate}>{formatDateRange(c.startDate, c.endDate)}</time>
        <span>{c.location}</span>
      </p>

      {stats.length ? (
        <ul className="mt-8 sm:mt-6 grid grid-cols-5 md:grid-cols-3 sm:grid-cols-2 gap-6 sm:gap-3">
          {stats.map(({ value, label }) => (
            <li
              key={label}
              className="border border-black rounded-[24px] bg-white p-6 sm:p-4 text-center font-raleway font-medium"
            >
              <span className="block font-archivo text-[40px] leading-[48px] sm:text-[28px] sm:leading-[36px]">
                {value}
              </span>
              {label}
            </li>
          ))}
        </ul>
      ) : null}

      {sponsors.length ? (
        <div className="mt-12 sm:mt-8">
          <h3 className={SUBHEADING}>Sponsors</h3>
          <PartnerLogos partners={sponsors} justify="justify-start" className="mt-6 sm:mt-4" />
        </div>
      ) : null}

      <div className="mt-12 sm:mt-8 flex flex-wrap gap-4 sm:gap-3">
        <Button to={`/conferences/${c.slug}`} shape="card">
          Explore Conference
        </Button>
        {c.registrationUrl ? (
          <Button href={c.registrationUrl} shape="card">
            Register<span className="sr-only"> for {c.name}</span>
          </Button>
        ) : null}
      </div>
    </HomeSection>
  );
}
