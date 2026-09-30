import { Typewriter } from 'react-simple-typewriter';
import { site } from '../content';
import Button from '../components/ui/Button';
import Container from '../components/ui/Container';
import StatusBadge from '../components/ui/StatusBadge';
import Countdown from '../components/ui/Countdown';

const AVATARS = [1, 2, 3, 4, 5];

const Tagline = () => (
  <Typewriter words={[site.tagline]} loop={0} cursor cursorStyle="|" typeSpeed={100} deleteSpeed={50} delaySpeed={800} />
);

/** The highlighted conference or next meetup: status, name, when/where, blurb and CTAs. */
function Feature({ feature: f }) {
  return (
    <div className="mt-6 sm:mt-4 text-center">
      <p aria-hidden="true" className="font-raleway font-medium text-[24px] leading-[32px] sm:text-[16px] sm:leading-[24px] text-gray-700">
        <Tagline />
      </p>
      <StatusBadge status={f.status} className="mt-4" />
      <h1 className="mt-4 font-raleway font-medium text-[64px] leading-[76px] md:text-[48px] md:leading-[58px] sm:text-[24px] sm:leading-[32px] break-words">
        {f.name}
      </h1>
      <p className="mt-4 flex flex-wrap justify-center gap-x-4 font-raleway font-semibold text-[20px] leading-[28px] sm:text-[14px] sm:leading-[22px]">
        <time dateTime={f.dateIso}>{f.dateLabel}</time>
        {f.place ? <span>{f.place}</span> : null}
      </p>
      {f.status === 'upcoming' ? <Countdown entity={f.record} className="mt-5 justify-center" /> : null}
      {f.blurb ? (
        <p className="mt-3 mx-auto max-w-[760px] line-clamp-3 font-raleway text-[18px] leading-[30px] sm:text-[14px] sm:leading-[24px]">
          {f.blurb}
        </p>
      ) : null}
      <div className="mt-6 sm:mt-5 flex flex-wrap justify-center gap-4 sm:gap-3">
        <Button to={f.to} shape="card">
          {f.ctaLabel}
        </Button>
        {f.registrationUrl ? (
          <Button href={f.registrationUrl} shape="card">
            Register<span className="sr-only"> for {f.name}</span>
          </Button>
        ) : null}
      </div>
    </div>
  );
}

/** Homepage hero. Without a `feature` it is the classic "Connect, Code, Learn" hero. */
const Home = ({ feature }) => {
  return (
    <section className="bg-[#E1EEFB] overflow-x-clip">
      <Container size="xl" className="sm:max-w-[345px]">
        <div className="pt-12 pb-11">
          <div className="flex items-center justify-center space-x-4 mt-4">
            <div className="flex -space-x-4 rtl:space-x-reverse sm:items-center">
              {AVATARS.map((n) => (
                <img
                  key={n}
                  className="sm:h-10 sm:w-10 w-[50px] h-[50px] rounded-full border border-black"
                  src={`/AvatarIcon/Av${n}.webp`}
                  alt=""
                  width="50"
                  height="50"
                />
              ))}
            </div>
            <p className="text-lg font-semibold text-gray-700 sm:text-[12px]">{site.stats.members} Active Members</p>
          </div>

          {feature ? (
            <Feature feature={feature} />
          ) : (
            <h1 className="mt-6 sm:mt-2 text-center text-[88px] font-[500] leading-[103.31px] tracking-normal font-raleway sm:text-[24px]">
              <Tagline />
            </h1>
          )}

          <div className="flex flex-col items-center justify-center mt-7 relative">
            <div className="flex justify-center relative">
              <img
                src="/Img/SkeletonIcon.webp"
                alt=""
                width="264"
                height="264"
                className="absolute right-[550px] bottom-0 top-16 sm:hidden"
                data-aos="fade-right"
              />
              <img src="/Img/duke-logo-svg.svg" alt="" className="mx-4" data-aos="zoom-in-up" />
              <img
                src="/Img/ItWork.webp"
                alt=""
                width="204"
                height="204"
                className="absolute left-[550px] bottom-0 top-16 sm:hidden"
                data-aos="fade-left"
              />
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
};

export default Home;
