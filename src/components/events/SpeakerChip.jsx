import { Link } from 'react-router-dom';
import { focusRing } from '../ui/focusRing';
import SpeakerRole from '../speakers/SpeakerRole';
import SpeakerSocials from '../speakers/SpeakerSocials';

/**
 * Speaker card: photo, name (→ /speakers/:slug), role + company, optional
 * short bio and social links. Every optional field hides itself when absent.
 *
 * @param {object}  speaker     speaker record (speakers.js)
 * @param {string}  [headingAs] tag for the name (default 'h3')
 * @param {boolean} [showBio]   render `speaker.bio` when present (default true)
 * @param {string}  [className]
 * @param {string}  [as]        wrapper tag (default 'article'; use 'li' inside a <ul>)
 */
export default function SpeakerChip({
  speaker,
  headingAs: Heading = 'h3',
  showBio = true,
  className = '',
  as: Tag = 'article',
}) {
  if (!speaker) return null;

  return (
    <Tag
      className={`flex gap-5 sm:gap-4 p-6 sm:p-4 bg-white border border-black rounded-[24px] ${className}`}
    >
      {speaker.photo ? (
        <img
          src={speaker.photo}
          alt={speaker.name}
          width="96"
          height="96"
          loading="lazy"
          decoding="async"
          className="shrink-0 w-[96px] h-[96px] sm:w-[64px] sm:h-[64px] rounded-2xl border border-black bg-[#EDD7FF] object-cover"
        />
      ) : null}
      <div className="min-w-0">
        <Heading className="font-raleway font-bold text-[24px] leading-[28px] sm:text-[16px] sm:leading-[20px] break-words">
          <Link
            to={`/speakers/${speaker.slug}`}
            className={`hover:underline underline-offset-4 ${focusRing}`}
          >
            {speaker.name}
          </Link>
        </Heading>
        <SpeakerRole
          speaker={speaker}
          className="pt-2 sm:pt-1 text-[16px] leading-[20px] sm:text-[12px] sm:leading-[18px]"
        />
        {showBio && speaker.bio ? (
          <p className="pt-3 font-raleway text-[15px] leading-[22px] sm:text-[13px] sm:leading-[20px]">
            {speaker.bio}
          </p>
        ) : null}
        <SpeakerSocials speaker={speaker} className="pt-4" />
      </div>
    </Tag>
  );
}
