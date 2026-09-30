import { initialsOf } from '../../content';
import { HERO_IMG_PRIORITY } from '../ui/heroImg';

// One square frame for every speaker: photo, avatar or initials.
const FRAME =
  'w-full aspect-square overflow-hidden rounded-[20px] border-2 border-black bg-[#FFE3EC] flex items-center justify-center';

/**
 * Speaker photo in the Experts frame, or an initials avatar when there's no
 * photo. `priority` marks the above-the-fold profile photo (no lazy loading);
 * `decorative` hides it from assistive tech when the name is shown beside it.
 */
export default function SpeakerPhoto({ speaker, priority = false, decorative = false }) {
  if (!speaker.photo) {
    return (
      <div
        {...(decorative ? { 'aria-hidden': true } : { role: 'img', 'aria-label': speaker.name })}
        className={`${FRAME} font-archivo text-[64px] sm:text-[40px]`}
      >
        {initialsOf(speaker.name)}
      </div>
    );
  }
  return (
    <div className={FRAME}>
      {/* The legacy Experts PNGs have their own thin border baked in; the slight
          zoom pushes it under this frame's border. */}
      <img
        src={speaker.photo}
        alt={decorative ? '' : speaker.name}
        width="285"
        height="296"
        decoding="async"
        {...(priority ? HERO_IMG_PRIORITY : { loading: 'lazy' })}
        className="w-full h-full object-cover scale-[1.04]"
      />
    </div>
  );
}
