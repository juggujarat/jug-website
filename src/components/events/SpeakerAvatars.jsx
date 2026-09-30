import { initialsOf } from '../../content';

// Small overlapping stack of speaker photos for event cards.
// Images are decorative (alt=""); the names are given once to assistive tech
// via an sr-only line so they aren't announced twice.
const MAX_VISIBLE = 4;

export default function SpeakerAvatars({ speakers = [], className = '' }) {
  if (!speakers.length) return null;
  const visible = speakers.slice(0, MAX_VISIBLE);
  const extra = speakers.length - visible.length;
  const names = speakers.map((s) => s.name).join(', ');

  return (
    <div className={`flex items-center gap-3 min-w-0 ${className}`}>
      <p className="sr-only">Speakers: {names}</p>
      <div aria-hidden="true" className="flex shrink-0 pl-3">
        {visible.map((speaker) =>
          speaker.photo ? (
            <img
              key={speaker.slug}
              src={speaker.photo}
              alt=""
              width="40"
              height="40"
              loading="lazy"
              decoding="async"
              className="-ml-3 w-10 h-10 rounded-full object-cover object-top border-2 border-white bg-[#E1EEFB]"
            />
          ) : (
            <span
              key={speaker.slug}
              className="-ml-3 w-10 h-10 rounded-full border-2 border-white bg-[#EDD7FF] flex items-center justify-center font-raleway font-bold text-[14px]"
            >
              {initialsOf(speaker.name)}
            </span>
          ),
        )}
        {extra > 0 ? (
          <span className="-ml-3 w-10 h-10 rounded-full border-2 border-white bg-[#FFEFC6] flex items-center justify-center font-medium text-[12px]">
            +{extra}
          </span>
        ) : null}
      </div>
      <p
        aria-hidden="true"
        className="font-raleway font-medium text-[14px] leading-[20px] sm:text-[12px] sm:leading-[18px] line-clamp-2 min-w-0"
      >
        {names}
      </p>
    </div>
  );
}
