import BookYourSlotButton from '../components/BookYourSlotButton'
import Button from '../components/ui/Button'
import StatusBadge from '../components/ui/StatusBadge'
import Countdown from '../components/ui/Countdown'
import { HERO_IMG_PRIORITY } from '../components/ui/heroImg'
import { BANNER_SIZES, bannerSrcSet } from '../lib/images'
import { getConferenceSpeakerCount, getSpeakerBySlug } from '../content'

const Event = ({ conference, status, registrationUrl }) => {
    const speakerCount = getConferenceSpeakerCount(conference);
    const { heroLogo, featuredSpeaker, stats = {}, highlights = [] } = conference;
    const speaker = getSpeakerBySlug(featuredSpeaker?.speaker);
    const hasArt = Boolean(heroLogo || speaker || conference.banner);

    return (
        <div className="bg-[#F6EAFF] relative">
            <div className=" container mx-auto xl:max-w-screen-xl  sm:mx-auto overflow-hidden ">
                <div className="pt-[72px] sm:pt-6 ">
                    <div className="grid grid-cols-12 sm:grid-cols-1 gap-10">
                    {hasArt ? (
                    <div className=" col-span-6  sm:order-2">
                            {heroLogo ? (
                            <div className='pl-[120px]    sm:pl-0 sm:hidden  '>
                            <img src={heroLogo.src} alt='' width={heroLogo.width} height={heroLogo.height} />
                            </div>
                            ) : null}
                            {speaker ? (
                            <>
                            <div className='  relative  ' >
                            <img src='/Home/BannerArrow.svg' alt='' className="absolute -top-4 left-[508px] right-0 sm:left-[260px] sm:-top-1  sm:h-[52px] sm:w-[68px]" />
                            </div>
                            <div className=' flex sm:mt-4  '>
                            <img src={featuredSpeaker.image} alt="" width={featuredSpeaker.width} height={featuredSpeaker.height} className="sm:hidden" data-aos="zoom-in-up"/>
                            <img src={featuredSpeaker.imageSm} alt="" width={featuredSpeaker.widthSm} height={featuredSpeaker.heightSm} className="xl:hidden" data-aos="zoom-in-up"/>

                             <div className=" mt-[112px] text-center  sm:mt-12 ">
                            <p className="font-archivo font-normal text-[26.25px] sm:text-[18.25px] leading-[100%]  sm:leading-[100%] ">Special Speaker</p>
                            <p className="font-autography font-normal text-[48px] leading-[47px] mt-6 sm:text-[23px] sm:leading-[24px] sm:mt-4 } ">{speaker.name}</p>

                            </div>
                            </div>
                            </>
                            ) : null}
                            {!heroLogo && !speaker && conference.banner ? (
                            <img
                                src={conference.banner}
                                srcSet={bannerSrcSet(conference.banner)}
                                sizes={BANNER_SIZES}
                                alt=''
                                width="1200"
                                height="600"
                                {...HERO_IMG_PRIORITY}
                                className="w-full h-auto rounded-[40px] sm:rounded-[24px] border border-black bg-white"
                            />
                            ) : null}
                            </div>
                    ) : null}
                        <div className={hasArt ? '  col-span-6  sm:grid-cols-1  sm:order-1' : 'col-span-12 flex flex-col items-center text-center pb-[72px] sm:pb-8'} data-aos="fade-left">
                        {heroLogo ? (
                        <div className=' sm:pl-0 sm:mt-0 flex items-center justify-center ' >
                                                    <img src={heroLogo.srcSm} alt='' width={heroLogo.widthSm} height={heroLogo.heightSm} className="xl:hidden" />
                                                    </div>
                        ) : null}

                            <div className={`flex gap-4  sm:items-center sm:justify-center sm:mt-4 ${hasArt ? '' : 'justify-center'}`}>
                                {stats.attendees ? (
                                <div className="px-4 py-[6px] sm:px-2 sm:py-[4px] rounded-full   bg-[#D7FFF1] border border-[#1AD090]
                                 font-medium text-[12px] sm:text-[10px]  tracking-[1%]">
                                    {stats.attendees} Participant
                                </div>
                                ) : null}
                                {speakerCount ? (
                                <div className="px-[18px] py-2  rounded-full  sm:px-2 sm:py-[4px] bg-[#FFFCEF] border  border-[#E8C52A]
                                  font-medium text-[12px]  tracking-[1%] sm:text-[10px] ">
                                    {speakerCount} Industry Speaker
                                </div>
                                ) : null}
                                <StatusBadge status={status} />
                            </div>
                            <div className='mt-[20px] sm:text-center'>
                            <h1 className="font-raleway font-semibold text-[46px] leading-[58px] sm:text-[23px] sm:leading-[25px] tracking-[0%]">
                             {heroLogo && conference.tagline ? (
                                <>
                                    <span className="sr-only">{conference.name}: </span>
                                    {conference.tagline}
                                </>
                             ) : conference.name}
                            </h1>
                            </div>
                            {status === 'upcoming' ? (
                            <Countdown entity={conference} className={`mt-6 sm:justify-center ${hasArt ? '' : 'justify-center'}`} />
                            ) : null}

                              {highlights.length > 0 ? (
                              <div>
                            <ul className="mt-[28px] sm:pl-[62px] sm:mt-4">
                                {highlights.map((highlight, index) => (
                                <li key={highlight} className={`text-black text-[16px] leading-[100%] tracking-[0%] font-raleway font-medium ${index === 0 ? 'pt-2' : 'pt-[24px]'} sm:text-[14px] sm:leading-[14px]`}>
                                    <span>
                                    <i aria-hidden="true" className="fas fa-check text-black ml-auto mr-4 sm:mr-4 sm:text-[19.99px]"></i>
                                    </span>
                                    {highlight}
                                </li>
                                ))}
                                </ul>
                                </div>
                              ) : null}
                                <div className={`flex sm:justify-center ${hasArt ? 'justify-start' : 'justify-center'}`}>
                                <div className='mt-[41px] sm:items-center sm:justify-center sm:flex sm:flex-col  '>
                                <BookYourSlotButton href={registrationUrl}/>
                                {conference.externalUrl ? (
                                    <Button href={conference.externalUrl} shape="card" className="mt-4">
                                        Conference website
                                    </Button>
                                ) : null}
                                </div>
                                </div>


                        </div>
                    </div>
                </div>
            </div>
        </div>

    )
}

export default Event
