import { FaGithub, FaGlobe, FaLinkedin, FaXTwitter } from 'react-icons/fa6';
import ExternalLink from '../ui/ExternalLink';

const SOCIALS = [
  { key: 'linkedin', label: 'LinkedIn', Icon: FaLinkedin },
  { key: 'x', label: 'X', Icon: FaXTwitter },
  { key: 'github', label: 'GitHub', Icon: FaGithub },
  { key: 'website', label: 'website', Icon: FaGlobe },
];

/** Round icon links for a speaker's `socials`; renders nothing when there are none. */
export default function SpeakerSocials({ speaker, className = '' }) {
  const socials = SOCIALS.filter(({ key }) => speaker.socials?.[key]);
  if (!socials.length) return null;
  return (
    <ul className={`flex flex-wrap gap-3 ${className}`} aria-label={`Social links for ${speaker.name}`}>
      {socials.map(({ key, label, Icon }) => (
        <li key={key}>
          <ExternalLink
            href={speaker.socials[key]}
            srLabel={`${speaker.name} on ${label}`}
            className="relative z-10 flex items-center justify-center w-9 h-9 rounded-full border border-black bg-white hover:bg-black hover:text-white transition-colors"
          >
            <Icon aria-hidden="true" focusable="false" className="w-4 h-4" />
          </ExternalLink>
        </li>
      ))}
    </ul>
  );
}
