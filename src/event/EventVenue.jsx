import BookYourSlotButton from '../components/BookYourSlotButton'
import { formatDateRange } from '../content'

const EventVenue = ({ conference, venue, registrationUrl }) => {
    return (
        <div className="bg-[#EDD7FF] ">
            <div className="container mx-auto xl:max-w-screen-xl overflow-hidden ">
                <div className='pt-[128px] pb-[100px] sm:pt-[50px] sm:pb-[50px]'>
                    <div className="grid grid-cols-12 sm:grid-cols-1" >
                        {/* Grid Item 1 */}
                        <div
                            className="col-span-6 ps-[110px] pt-[30px] sm:p-0"
                             data-aos="fade-right" 
                        >
                            <h2 className="font-raleway text-center text-[60px] leading-[48px] tracking-[1%] text-colour-text sm:text-[48px] sm:leading-1.5 mb-8">
                                Event Location
                            </h2>

                            <p
                                className="mb-[20px] text-center sm:mb-[16px] font-raleway font-normal text-[22px] leading-[30px] sm:text-[18px] sm:leading-[28px] tracking-[0%]"
                            >
                                We are proud to host <strong>{conference.name}</strong> on <strong><time dateTime={conference.startDate}>{formatDateRange(conference.startDate, conference.endDate)}</time></strong> at <strong>{venue.name}</strong>{venue.description ? ` - ${venue.description}` : '.'}
                            </p>

                            {venue.image ? (
                            <div className='mt-10 mb-10 flex justify-center'>
                                <img src={venue.image} alt={venue.name} loading="lazy" decoding="async" />
                            </div>
                            ) : null}

                            <div className="flex justify-center sm:hidden">
                                <div className="flex flex-col ">
                                    <BookYourSlotButton href={registrationUrl} />
                                </div>
                            </div>

                        </div>

                        {/* Grid Item 2 */}
                        <div
                            className="col-span-6 sm:grid-cols-1 sm:px-0 px-[100px] sm:mt-4 sm:order-1"
                            data-aos="fade-left" 
                        >
                            {venue.mapEmbedUrl ? (
                            <iframe src={venue.mapEmbedUrl} title={`Map of ${venue.name}`} className='border border-white border-[10px] h-[650px] w-full sm:h-[400px] sm:w-full sm:border-[5px]' allowFullScreen loading="lazy" referrerPolicy="no-referrer-when-downgrade"></iframe>
                            ) : null}
                        </div>
                        
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

export default EventVenue
