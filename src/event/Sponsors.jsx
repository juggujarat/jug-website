import ExternalLink from '../components/ui/ExternalLink';

// Per-supporter presentation (kept from the original hand-written markup).
const supporterStyles = {
  'rajesh-c': { img: 'mb-5 sm:mb-3 rounded-xl h-[60%] sm:border border-black' },
  'hemal-trivedi': { img: 'mb-6 sm:mb-3 rounded-2xl sm:border-[1.5px] border-[2px] border-black h-[60%]' },
};

const TIER_ROW = 'flex flex-wrap justify-center gap-x-8 gap-y-4 sm:gap-x-3 sm:mt-[25px] mt-[24px] mb-11 sm:mb-4';

const SponsorTile = ({ sponsor, className }) => (
  <ExternalLink href={sponsor.website}>
    <div className={`flex h-[112px] w-[285px] items-center justify-center rounded-3xl bg-[#FFFFFF] ${className}`}>
      <img src={sponsor.logo} alt={sponsor.logoAlt ?? sponsor.name} loading="lazy" decoding="async" />
    </div>
  </ExternalLink>
);

const Sponsors = ({ sponsors, venueSponsors }) => {
  const platinumSponsors = sponsors.filter((s) => s.tier === 'platinum');
  const silverSponsors = sponsors.filter((s) => s.tier === 'silver');
  const goldSponsors = sponsors.filter((s) => s.tier === 'gold');
  const communitySupporters = sponsors.filter((s) => s.tier === 'community-supporter');
  return (
    <div className="bg-[#FFF8E2] ">
      <div className="container mx-auto xl:max-w-screen-xl  ">
        <div className='pt-[128px] pb-[155px] sm:pt-[50px] sm:pb-[50px]'>
          <div className='mt-[20px] text-center'>
            <h2 className="font-raleway font-medium text-[56px] leading-[62px] sm:text-[28px] sm:leading-[32px] tracking-[0%]">
              Our Esteemed Sponsors
            </h2>

            {platinumSponsors.length > 0 ? (
            <>
            <div className="flex space-x-[72px] border  bg-gradient-to-r from-[#FAFAFA] via-[#C5C5C5] to-[#FAFAFA] p-2 mt-5 sm:hidden sm:mt-12 overflow-hidden">
              <h3 className="font-raleway font-bold text-[16px] leading-[16px] tracking-[0.5em] uppercase">
                Platinum
              </h3>
              <h3 className="font-raleway font-bold text-[16px] leading-[16px] tracking-[0.5em] uppercase">
                Platinum
              </h3>
              <h3 className="font-raleway font-bold text-[16px] leading-[16px] tracking-[0.5em] uppercase">
                Platinum
              </h3>
              <h3 className="font-raleway font-bold text-[16px] leading-[16px] tracking-[0.5em] uppercase">
                Platinum
              </h3>
              <h3 className="font-raleway font-bold text-[16px] leading-[16px] tracking-[0.5em] uppercase">
                Platinum
              </h3>
              <h3 className="font-raleway font-bold text-[16px] leading-[16px] tracking-[0.5em] uppercase">
                Platinum
              </h3>
            </div>

            <div className="  border  bg-gradient-to-r from-[#FAFAFA] via-[#C5C5C5] to-[#FAFAFA] p-2 mt-5 xl:hidden">
              <h3 className="font-raleway font-bold text-[16px] leading-[16px] tracking-[0.5em] uppercase">
                Platinum
              </h3>
            </div>


            <div className={TIER_ROW}>
              {platinumSponsors.map((sponsor) => (
              <SponsorTile key={sponsor.slug} sponsor={sponsor} className="sm:w-[154px] sm:h-[76px] sm:px-4" />
              ))}
            </div>
            </>
            ) : null}

            {goldSponsors.length > 0 ? (
            <>
            <div className="flex space-x-[72px]  bg-gradient-to-r from-[#FFE8AC] via-[#FFC62E] to-[#FFEFC6] p-2  sm:hidden  overflow-hidden">
              <h3 className="font-raleway font-bold text-[16px] leading-[16px] tracking-[0.5em] uppercase">
                Gold
              </h3>
              <h3 className="font-raleway font-bold text-[16px] leading-[16px] tracking-[0.5em] uppercase">
                Gold
              </h3>
              <h3 className="font-raleway font-bold text-[16px] leading-[16px] tracking-[0.5em] uppercase">
                Gold
              </h3>
              <h3 className="font-raleway font-bold text-[16px] leading-[16px] tracking-[0.5em] uppercase">
                Gold
              </h3>
              <h3 className="font-raleway font-bold text-[16px] leading-[16px] tracking-[0.5em] uppercase">
                Gold
              </h3>
              <h3 className="font-raleway font-bold text-[16px] leading-[16px] tracking-[0.5em] uppercase">
                Gold
              </h3>
              <h3 className="font-raleway font-bold text-[16px] leading-[16px] tracking-[0.5em] uppercase">
                Gold
              </h3>
              <h3 className="font-raleway font-bold text-[16px] leading-[16px] tracking-[0.5em] uppercase">
                Gold
              </h3>
              <h3 className="font-raleway font-bold text-[16px] leading-[16px] tracking-[0.5em] uppercase">
                Gold
              </h3>
            </div>

            <div className=" bg-gradient-to-r from-[#FFE8AC] via-[#FFC62E] to-[#FFEFC6] p-2 mt-5 xl:hidden">
              <h3 className="font-raleway font-bold text-[16px] leading-[16px] tracking-[0.5em] uppercase">
                Gold
              </h3>
            </div>


            <div className={TIER_ROW}>
              {goldSponsors.map((sponsor) => (
              <SponsorTile key={sponsor.slug} sponsor={sponsor} className="px-4 sm:w-[148px] sm:h-[84px] sm:px-2" />
              ))}
            </div>


            </>
            ) : null}
            {silverSponsors.length > 0 ? (
            <>
            <div className="bg-gradient-to-r from-[#FAFAFA] via-[#C5C5C5] to-[#FAFAFA] p-2 mt-5">
              <h3 className="font-raleway font-bold text-[16px] leading-[16px] tracking-[0.5em] uppercase">
                Silver
              </h3>
            </div>
            <div className={TIER_ROW}>
              {silverSponsors.map((sponsor) => (
              <SponsorTile key={sponsor.slug} sponsor={sponsor} className="px-4 sm:w-[148px] sm:h-[84px] sm:px-2" />
              ))}
            </div>
            </>
            ) : null}
            {venueSponsors.length > 0 ? (
            <>
            <div className="flex space-x-[72px]  justify-center bg-[#FFFFFF] p-2 mt-5">
              <h3 className="font-raleway font-bold text-[16px] leading-[16px] tracking-[0.5em] uppercase">
                VENUE SPONSOR
              </h3>
            </div>


            <div className="flex sm:mt-[25px] mt-[24px] mb-11 sm:mb-4 pl-3 sm:pl-0 justify-center">

              {venueSponsors.map((venue) => (
              <div key={venue.slug} className="flex h-[112px] items-center justify-center rounded-3xl bg-[#FFFFFF] text-gray-400 sm:w-[148px] sm:h-[84px]  w-[285px]">
                <ExternalLink href={venue.website}>
                  <div className="flex h-[112px] w-[285px] sm:w-[148px] sm:h-[84px] items-center justify-center rounded-3xl bg-[#FFFFFF] text-gray-400 px-4 sm:px-2">
                  <img src={venue.logo} alt={venue.logoAlt ?? venue.name} loading="lazy" decoding="async" />
                  </div>
                </ExternalLink>
              </div>
              ))}

            </div>
            </>
            ) : null}

            {communitySupporters.length > 0 ? (
            <>
             <div className="flex space-x-[72px]  bg-[#FFFFFF] p-2 mt-5 sm:hidden justify-center">

              <h3 className="font-raleway font-bold text-[16px] leading-[16px] tracking-[0.5em] uppercase">
                Community Supporter
              </h3>
              {/* <h3 className="font-raleway font-bold text-[16px] leading-[16px] tracking-[0.5em] uppercase">
                Community Supporter
              </h3>
              <h3 className="font-raleway font-bold text-[16px] leading-[16px] tracking-[0.5em] uppercase">
                Community Supporter
              </h3> */}
            </div>

            <div className="  bg-[#FFFFFF] p-2 mt-5 xl:hidden">

              <h3 className="font-raleway font-bold text-[16px] leading-[16px]  sm:leading-[22px] tracking-[0.5em] uppercase">
                Community Supporter
              </h3>

            </div>


            <div className="sm:flex-row flex justify-center sm:mt-[25px] mt-[24px] mb-11 sm:mb-4 pl-3 sm:pl-0 gap-7">


              {communitySupporters.map((supporter) => (
              <div key={supporter.slug} className="flex-row -h-[112px]  w-[285px] sm:w-[148px] sm:-h-[84px] items-center justify-items-center rounded-xl text-black">
                <ExternalLink href={supporter.website}>
                  <img src={supporter.logo} alt={supporter.logoAlt ?? supporter.name} loading="lazy" decoding="async" className={supporterStyles[supporter.slug]?.img ?? supporterStyles['rajesh-c'].img} />
                </ExternalLink>
                <p className='text-xl sm:text-sm'><strong>{supporter.name.toUpperCase()}</strong></p>
                <p className='text-lg sm:text-xs text-gray-500'>{supporter.designation ? <>{supporter.designation},<br /></> : null} <strong>{supporter.company ?? supporter.location}</strong></p>
              </div>
              ))}
            </div>
            </>
            ) : null}

          </div>
        </div>
      </div>
    </div>
  )
}

export default Sponsors