import { getFeaturedSpeakers, getSpeakerDirectory } from '../content';
import Button from '../components/ui/Button';
import HomeSection from '../components/home/HomeSection';
import SpeakerCard from '../components/speakers/SpeakerCard';

const Experts = () => {
  const counts = new Map(getSpeakerDirectory().map((s) => [s.slug, s.sessionCount]));
  const speakers = getFeaturedSpeakers().map((s) => ({ ...s, sessionCount: counts.get(s.slug) ?? 0 }));
  if (!speakers.length) return null;

  return (
    <HomeSection
      id="speakers"
      bg="bg-[#FFFCEF]"
      title="Here Come the"
      squiggle="Experts!"
      action={<Button to="/speakers">All speakers</Button>}
    >
      <ul className="grid grid-cols-4 sm:grid-cols-2 gap-6 sm:gap-x-6 sm:gap-y-8">
        {speakers.map((speaker, index) => (
          <li key={speaker.slug} data-aos="fade-right" data-aos-delay={index * 200}>
            <SpeakerCard speaker={speaker} headingAs="h3" />
          </li>
        ))}
      </ul>
    </HomeSection>
  );
};

export default Experts;
