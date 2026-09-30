import { Link } from 'react-router-dom';
import { formatDateRange, getConferencesOldestFirst, getAllEvents, getOpenCfpUrl, getStatus, site } from '../content';
import Seo from '../components/Seo';
import PageHero from '../components/ui/PageHero';
import Container from '../components/ui/Container';
import SectionHeading from '../components/ui/SectionHeading';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';
import EmptyState from '../components/ui/EmptyState';
import { linkClass } from '../components/ui/linkClass';
import Volunteer from '../pages/Volunteer';
import { useNow } from '../lib/useNow';
import { organizationJsonLd } from '../lib/jsonLd';

const DESCRIPTION = `About ${site.name}: our story, mission, the people behind the community and how to get involved.`;

const SECTION = 'pt-[100px] sm:pt-[50px]';
const GRID = 'pt-[48px] sm:pt-[24px] grid sm:grid-cols-1 md:grid-cols-1 gap-8 sm:gap-6';
const CARD_TITLE = 'font-raleway font-bold text-[24px] leading-[32px] sm:text-[20px] sm:leading-[28px]';
const CARD_TEXT = 'mt-3 font-raleway text-[18px] leading-[28px] sm:text-[14px] sm:leading-[24px]';

const JOURNEY_BGS = ['bg-[#EDD7FF]', 'bg-[#D7FFF1]', 'bg-[#FFEFC6]', 'bg-[#CAF8FC]'];

const WHAT_WE_DO = [
  {
    title: 'Meetups',
    bg: 'bg-[#FFEFC6]',
    text: site.whatWeDo.meetups,
    to: '/events',
    cta: 'See events',
  },
  {
    title: 'Workshops',
    bg: 'bg-[#CAF8FC]',
    text: site.whatWeDo.workshops,
  },
  {
    title: 'Conferences',
    bg: 'bg-[#FFC0E7]',
    text: site.whatWeDo.conferences,
    to: '/conferences',
    cta: 'See conferences',
  },
];

export default function AboutPage() {
  const now = useNow();
  const events = getAllEvents();
  // Keep the page out of search while any event record is still a sample.
  const noindex = events.some((e) => e.isSample);
  const openCfpUrl = getOpenCfpUrl(now);
  const timeline = getConferencesOldestFirst();

  const participate = [
    {
      title: 'Attend',
      text: site.participate.attend,
      actions: [
        { to: '/events', label: 'Browse events' },
        { href: site.lumaCalendarUrl, label: 'Follow on Luma' },
      ],
    },
    {
      title: 'Speak',
      text: openCfpUrl ? site.participate.speak : site.participate.speakClosed,
      actions: [openCfpUrl ? { href: openCfpUrl, label: 'Submit a talk' } : { href: site.joinUrl, label: 'Get in touch' }],
    },
    {
      title: 'Host a meetup',
      text: site.participate.host,
      actions: [{ to: '/partners', label: 'Venue partners' }],
    },
    {
      title: 'Join the community',
      text: site.participate.join,
      actions: [
        { href: site.socials.whatsapp, label: 'WhatsApp' },
        { href: site.socials.linkedin, label: 'LinkedIn' },
      ],
    },
  ];

  return (
    <>
      <Seo
        title="About"
        description={DESCRIPTION}
        path="/about"
        noindex={noindex}
        jsonLd={organizationJsonLd()}
      />

      <PageHero
        title={`About ${site.name}`}
        intro="Our story, the people behind the community, and how to get involved."
      />

      <div className="bg-[#FFFCEF]">
        <Container className="pb-[100px] sm:pb-[50px]">
          <section
            aria-labelledby="who-heading"
            className={`${SECTION} grid grid-cols-2 sm:grid-cols-1 md:grid-cols-1 gap-10 sm:gap-6`}
          >
            <div>
              <SectionHeading id="who-heading">Who We Are</SectionHeading>
              <p className="mt-6 font-raleway text-[20px] leading-[32px] sm:text-[16px] sm:leading-[26px]">
                {site.about}
              </p>
            </div>
            <Card bg="bg-[#EDD7FF]" className="p-10 sm:p-6">
              <h2 className={CARD_TITLE}>Our Mission</h2>
              <p className={CARD_TEXT}>{site.mission}</p>
            </Card>
          </section>

          <section aria-labelledby="history-heading" className={SECTION}>
            <SectionHeading id="history-heading" squiggle="Journey" className="sm:text-center">
              Our
            </SectionHeading>
            {site.journey?.length ? (
              <dl className="pt-[48px] sm:pt-[24px] grid grid-cols-4 sm:grid-cols-2 md:grid-cols-2 gap-6 sm:gap-3">
                {site.journey.map((stat, i) => (
                  <Card key={stat.label} bg={JOURNEY_BGS[i % JOURNEY_BGS.length]} className="p-8 sm:p-4 flex flex-col-reverse text-center">
                    <dt className="mt-2 font-raleway font-medium text-[18px] leading-[26px] sm:text-[14px] sm:leading-[20px]">
                      {stat.label}
                    </dt>
                    <dd className="font-raleway font-bold text-[48px] leading-[56px] md:text-[40px] md:leading-[48px] sm:text-[26px] sm:leading-[32px]">
                      {stat.value}
                    </dd>
                  </Card>
                ))}
              </dl>
            ) : null}
            <ol className="mt-10 sm:mt-6 ml-3 border-l-2 border-black space-y-8 sm:space-y-6">
              {timeline.map((c) => (
                <li key={c.slug} className="relative pl-8 sm:pl-6">
                  <span
                    aria-hidden="true"
                    className="absolute -left-[9px] top-1.5 w-4 h-4 rounded-full border-2 border-black bg-[#FFC62E]"
                  />
                  <time dateTime={c.startDate} className="font-raleway font-medium text-[16px] leading-[24px] sm:text-[14px] text-gray-600">
                    {formatDateRange(c.startDate, c.endDate)}
                  </time>
                  <h3 className={`mt-1 ${CARD_TITLE}`}>
                    <Link to={`/conferences/${c.slug}`} className={linkClass}>
                      {c.name}
                    </Link>
                  </h3>
                  <p className={CARD_TEXT}>
                    {c.location}
                    {c.stats?.attendees
                      ? ` · ${c.stats.attendees} ${getStatus(c, now) === 'upcoming' ? 'expected attendees' : 'participants'}`
                      : null}
                  </p>
                </li>
              ))}
            </ol>
          </section>

          <section aria-labelledby="what-heading" className={SECTION}>
            <SectionHeading id="what-heading" squiggle="Do" className="sm:text-center">
              What We
            </SectionHeading>
            <ul className={`${GRID} grid-cols-3`}>
              {WHAT_WE_DO.map((item) => (
                <li key={item.title}>
                  <Card bg={item.bg} className="h-full p-8 sm:p-6 flex flex-col items-start">
                    <h3 className={CARD_TITLE}>{item.title}</h3>
                    <p className={`${CARD_TEXT} flex-1`}>{item.text}</p>
                    {item.to ? (
                      <Button to={item.to} shape="card" className="mt-6">
                        {item.cta}
                      </Button>
                    ) : null}
                  </Card>
                </li>
              ))}
            </ul>
          </section>

          <div className={SECTION}>
            <EmptyState title="Community-driven and non-commercial" message={site.nonCommercial} bg="bg-[#FFE8AC]" />
          </div>
        </Container>
      </div>

      <Volunteer />

      <div className="bg-[#FFFCEF]">
        <Container className="pt-[100px] pb-[100px] sm:pt-[50px] sm:pb-[50px]">
          <section aria-labelledby="participate-heading">
            <SectionHeading id="participate-heading" squiggle="Involved" className="sm:text-center">
              Get
            </SectionHeading>
            <ul className={`${GRID} grid-cols-2`}>
              {participate.map((item) => (
                <li key={item.title}>
                  <Card className="h-full p-8 sm:p-6 flex flex-col items-start">
                    <h3 className={CARD_TITLE}>{item.title}</h3>
                    <p className={`${CARD_TEXT} flex-1`}>{item.text}</p>
                    <div className="mt-6 flex flex-wrap gap-3">
                      {item.actions.map(({ label, ...link }) => (
                        <Button key={label} shape="card" {...link}>
                          {label}
                        </Button>
                      ))}
                    </div>
                  </Card>
                </li>
              ))}
            </ul>
          </section>
        </Container>
      </div>
    </>
  );
}
