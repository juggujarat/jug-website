import BookYourSlotButton from '../components/BookYourSlotButton'
import ExternalLink from '../components/ui/ExternalLink'
import { formatDateRange, formatTimeRange } from '../content'


const AboutEvent = ({ conference, mapUrl, registrationUrl }) => {
    const time = formatTimeRange(conference.startTime, conference.endTime);

    return (
        <div className="bg-[#D7FFF1] ">
            <div className="container mx-auto xl:max-w-screen-xl overflow-hidden ">
                <div className='pt-[128px] pb-[100px] sm:pt-[50px] sm:pb-[50px]'>
                    <div className="grid grid-cols-12 sm:grid-cols-1" >
                        {/* Grid Item 1 */}
                        <div
                            className={`${conference.aboutImage ? 'col-span-6 ps-[110px]' : 'col-span-12 px-[110px]'} pt-[50px] sm:p-0`}
                             data-aos="fade-right" 
                        >
                            <h2 className="font-raleway font-bold text-[40px] leading-[48px] tracking-[1%] text-colour-text sm:text-[24px] sm:leading-[28.8px] mb-8">
                                About Event
                            </h2>

                            {(conference.description ?? []).map((paragraph) => (
                            <p
                                key={paragraph}
                                className="mb-[20px] sm:mb-[16px] font-raleway font-normal text-[18px] leading-[30px] sm:text-[16px] sm:leading-[28px] tracking-[0%]"
                            >
                                {paragraph}
                            </p>
                            ))}
                            {conference.location ? (
                            <p
                                className="flex items-center gap-2 mb-[40px] sm:mb-[32px] mt-[40px] sm:mt-[32px] font-raleway font-normal text-[20px] leading-[30px] sm:text-[12px] sm:leading-[28px] tracking-[0%]"
                            >
                                <img src='/Img/locationpin.svg' alt="" className="w-5 h-5"/>
                                <strong>{conference.location}</strong>
                                {mapUrl ? (
                                <ExternalLink href={mapUrl} className="flex items-center gap-1 ml-2 text-blue-500 sm:text-[14px] underline">View map <img src='/Img/externallink.svg' alt='' className='w-6 h-6 sm:w-4 sm:h-4' /></ExternalLink>
                                ) : null}
                            </p>
                            ) : null}
                            <p
                                className="flex items-center gap-2 mb-[40px] sm:mb-[32px] mt-[40px] sm:mt-[32px] font-raleway font-normal text-[20px] leading-[30px] sm:text-[18px] sm:leading-[28px] tracking-[0%]"
                            >
                                <img src='/Img/calender.svg' alt="" className="w-5 h-5"/>
                                <strong>
                                    <time dateTime={conference.startDate}>{formatDateRange(conference.startDate, conference.endDate)}</time>
                                    {time ? `, ${time}` : null}
                                </strong>
                            </p>
                            <div className="flex justify-start  sm:hidden">
                                <div className="flex flex-col ">
                                    <BookYourSlotButton href={registrationUrl} />
                                </div>
                            </div>

                        </div>

                        {conference.aboutImage ? (
                        <div
                            className="col-span-6 sm:grid-cols-1 sm:px-0 px-[100px] sm:mt-4 sm:order-1 "
                            data-aos="fade-left"
                        >
                            <img src={conference.aboutImage.src} alt="" width={conference.aboutImage.width} height={conference.aboutImage.height} loading="lazy" decoding="async" className='sm:w-[320px]'/>
                        </div>
                        ) : null}
                    </div>
                    <div className="flex justify-center items-center mt-4 xl:hidden ">
                                <div className="flex flex-col ">
                                    <BookYourSlotButton href={registrationUrl} />
                                </div>
                            </div>
                </div>
            </div>
        </div>
    )
}

export default AboutEvent
