import { Link } from 'react-router-dom';
import { allSample, formatDateRange, getStatus, getVenueHistory, getVenuesByLatest, site, sponsors, venues } from '../content';
import { useNow } from '../lib/useNow';
import Seo from '../components/Seo';
import PageHero from '../components/ui/PageHero';
import Container from '../components/ui/Container';
import SectionHeading from '../components/ui/SectionHeading';
import ExternalLink from '../components/ui/ExternalLink';
import { focusRing } from '../components/ui/focusRing';
import { linkClass } from '../components/ui/linkClass';
import VenueCard from '../components/events/VenueCard';
import SpeakerPhoto from '../components/speakers/SpeakerPhoto';
import PartnerLogos from '../components/partners/PartnerLogos';
import StatusBadge from '../components/ui/StatusBadge';

const DESCRIPTION = `The venue partners, sponsors and communities that make ${site.name} meetups and conferences happen.`;

const GROUP_HEADING = 'font-raleway font-bold text-[16px] leading-[22px] tracking-[0.5em] uppercase';

function HostedList({ title, base, items, now }) {
  if (!items.length) return null;
  return (
    <div>
      <h4 className="font-bold text-[20px] leading-[28px] sm:text-[16px] sm:leading-[24px]">{title}</h4>
      <ul className="mt-2 space-y-2 text-[16px] leading-[24px] sm:text-[14px] sm:leading-[22px]">
        {items.map((item) => {
          const start = item.date ?? item.startDate;
          const status = getStatus(item, now);
          return (
            <li key={item.slug}>
              <Link to={`${base}/${item.slug}`} className={`${linkClass} ${focusRing}`}>
                {item.name}
              </Link>
              {status === 'completed' ? null : <StatusBadge status={status} size="xs" className="ml-2 align-middle" />}
              <time dateTime={start} className="block">{formatDateRange(start, item.endDate)}</time>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

function VenueHistory({ venueSlug, now }) {
  const { events, conferences } = getVenueHistory(venueSlug);
  if (!events.length && !conferences.length) return null;

  return (
    <div className="grid grid-cols-2 sm:grid-cols-1 gap-6 pt-6">
      <HostedList title="Events" base="/events" items={events} now={now} />
      <HostedList title="Conferences" base="/conferences" items={conferences} now={now} />
    </div>
  );
}

function Group({ title, children }) {
  return (
    <div className="pt-[48px] sm:pt-[24px]">
      <h3 className={GROUP_HEADING}>{title}</h3>
      {children}
    </div>
  );
}

function LogoGroup({ title, partners }) {
  if (!partners.length) return null;
  return (
    <Group title={title}>
      <PartnerLogos partners={partners} className="pt-6 sm:pt-4" />
    </Group>
  );
}

export default function PartnersPage() {
  const now = useNow();
  const ofKind = (kind) => sponsors.filter((s) => s.kind === kind);
  const companies = ofKind('sponsor');
  const supporters = ofKind('supporter');
  const jugs = ofKind('jug');
  const communities = ofKind('community');

  return (
    <>
      <Seo title="Partners" description={DESCRIPTION} path="/partners" noindex={allSample([...venues, ...sponsors])} />

      <PageHero
        title="Our Partners"
        intro={`${site.name} runs on the generosity of the campuses and companies that open their doors to us, our sponsors, and the communities we build with.`}
      />

      <div className="bg-[#FFFCEF]">
        <Container className="pb-[100px] sm:pb-[50px] text-center">
          <section aria-labelledby="venues-heading" className="pt-[100px] sm:pt-[50px]">
            <SectionHeading id="venues-heading" squiggle="Partners">
              Venue
            </SectionHeading>
            <ul className="pt-[48px] sm:pt-[24px] space-y-8 sm:space-y-6 text-left">
              {getVenuesByLatest().map((venue) => (
                <li key={venue.slug}>
                  <VenueCard venue={venue} bg="bg-[#EDD7FF]">
                    <VenueHistory venueSlug={venue.slug} now={now} />
                  </VenueCard>
                </li>
              ))}
            </ul>
          </section>

          {companies.length || supporters.length ? (
            <section aria-labelledby="sponsors-heading" className="pt-[100px] sm:pt-[50px]">
              <SectionHeading id="sponsors-heading">Sponsors</SectionHeading>
              <LogoGroup title="Companies" partners={companies} />
              {supporters.length ? (
                <Group title="Community Supporters">
                  <ul className="pt-6 sm:pt-4 flex flex-wrap justify-center gap-6 sm:gap-3 font-raleway">
                    {supporters.map((s) => {
                      const card = (
                        <>
                          {/* Same square frame as speaker photos (supporters are people). */}
                          <SpeakerPhoto speaker={{ name: s.name, photo: s.logo }} decorative />
                          <span className="block pt-3 font-bold text-[20px] leading-[28px] sm:text-[14px] sm:leading-[20px] group-hover:underline underline-offset-4">
                            {s.name}
                          </span>
                        </>
                      );
                      return (
                        <li key={s.slug} className="w-[285px] sm:w-[148px]">
                          {s.website ? (
                            <ExternalLink href={s.website} className="group block rounded-3xl">
                              {card}
                            </ExternalLink>
                          ) : (
                            <div>{card}</div>
                          )}
                          <p className="text-[16px] leading-[24px] sm:text-[12px] sm:leading-[18px]">
                            {[s.designation, s.company ?? s.location].filter(Boolean).join(', ')}
                          </p>
                        </li>
                      );
                    })}
                  </ul>
                </Group>
              ) : null}
            </section>
          ) : null}

          {jugs.length || communities.length ? (
            <section aria-labelledby="community-heading" className="pt-[100px] sm:pt-[50px]">
              <SectionHeading id="community-heading" squiggle="Partners">
                Community
              </SectionHeading>
              <LogoGroup title="Java User Groups" partners={jugs} />
              <LogoGroup title="Communities" partners={communities} />
            </section>
          ) : null}
        </Container>
      </div>
    </>
  );
}
