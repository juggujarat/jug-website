import { Link } from 'react-router-dom';
import { countLabel, site } from '../../content';
import { focusRing } from '../ui/focusRing';
import SpeakerPhoto from './SpeakerPhoto';
import SpeakerRole from './SpeakerRole';
import SpeakerSocials from './SpeakerSocials';

/**
 * Directory card in the Experts look: photo, name, role, session count and
 * socials. The name link is stretched over the card so the photo is clickable too.
 * `speaker` usually comes from getSpeakerDirectory (has `sessionCount`); the
 * session line is left out when there is no count.
 */
export default function SpeakerCard({ speaker, headingAs: Heading = 'h2' }) {
  const { sessionCount } = speaker;
  return (
    <article className="relative h-full sm:text-center">
      <SpeakerPhoto speaker={speaker} decorative />
      <Heading className="pt-6 sm:pt-3 font-raleway font-bold text-[24px] leading-[28px] sm:text-[14px] sm:leading-[20px] break-words">
        <Link
          to={`/speakers/${speaker.slug}`}
          className={`hover:underline underline-offset-4 after:absolute after:inset-0 ${focusRing}`}
        >
          {speaker.name}
        </Link>
      </Heading>
      <SpeakerRole
        speaker={speaker}
        className="pt-2 sm:pt-1 text-[16px] leading-[18px] sm:text-[12px] sm:leading-[18px]"
      />
      {sessionCount ? (
        <p className="pt-3 sm:pt-2 font-raleway font-medium text-[14px] leading-[20px] sm:text-[12px] sm:leading-[18px]">
          {countLabel(sessionCount, 'session')} at {site.name}
        </p>
      ) : null}
      <SpeakerSocials speaker={speaker} className="pt-4 sm:pt-3 sm:justify-center" />
    </article>
  );
}
