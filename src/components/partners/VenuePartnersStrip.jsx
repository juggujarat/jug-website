import { getVenuesByLatest } from '../../content';
import Button from '../ui/Button';
import Container from '../ui/Container';
import SectionHeading from '../ui/SectionHeading';
import PartnerLogos from './PartnerLogos';

/** Venue partner logos + link to /partners (homepage section). */
export default function VenuePartnersStrip() {
  return (
    <section aria-labelledby="venue-partners-heading" className="bg-[#FFFCEF]">
      <Container className="pt-[128px] pb-[100px] sm:pt-[50px] sm:pb-[50px] text-center">
        <SectionHeading id="venue-partners-heading" squiggle="Partners">
          Our Venue
        </SectionHeading>
        <PartnerLogos partners={getVenuesByLatest()} className="pt-[48px] sm:pt-[24px]" />
        <div className="pt-[48px] sm:pt-[24px] flex justify-center">
          <Button to="/partners">View All Partners</Button>
        </div>
      </Container>
    </section>
  );
}
