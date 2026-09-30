import { site } from '../content';
import Button from '../components/ui/Button';
import HomeSection from '../components/home/HomeSection';

const Sessions = () => {
  if (!site.featuredVideos.length) return null;

  return (
    <HomeSection
      id="sessions"
      bg="bg-[#EDD7FF]"
      title="Our Sessions"
      action={<Button href={site.socials.youtube}>View all<span className="sr-only"> sessions on YouTube</span></Button>}
    >
      <ul className="grid grid-cols-2 sm:grid-cols-1 gap-x-5 sm:gap-y-10">
        {site.featuredVideos.map((video, index) => (
          <li key={video.embedUrl} data-aos={index % 2 ? 'fade-left' : 'fade-right'}>
            <div className="iframe-container rounded-lg">
              <iframe
                src={video.embedUrl}
                title={`${site.name} session recording ${index + 1}`}
                loading="lazy"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                referrerPolicy="strict-origin-when-cross-origin"
                allowFullScreen
              ></iframe>
            </div>
          </li>
        ))}
      </ul>
    </HomeSection>
  );
};

export default Sessions;
