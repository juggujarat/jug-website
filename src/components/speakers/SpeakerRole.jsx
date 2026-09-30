import { getSpeakerRolePrefix } from '../../content';

/** "Designation at **Company**" line; renders nothing when both are missing. */
export default function SpeakerRole({ speaker, className = '' }) {
  const role = getSpeakerRolePrefix(speaker);
  if (!role && !speaker.company) return null;
  return (
    <p className={`text-gray-600 font-raleway ${className}`}>
      {role}
      {role && speaker.company ? ' ' : null}
      {speaker.company ? <strong>{speaker.company}</strong> : null}
    </p>
  );
}
