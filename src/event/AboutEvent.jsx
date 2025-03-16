import React from 'react'
import About from '../Components/About'
import BookYourSlotButton from '../Components/BookYourSlotButton'

const AboutEvent = () => {
    return (
        <div className="bg-[#D7FFF1] ">
            <div className="container mx-auto xl:max-w-screen-xl   ">
                <div className='pt-[128px] pb-[100px]'>
                    <div className="grid grid-cols-12 sm:grid-cols-1">
                        {/* Grid Item 1 */}
                        <div
                            className="col-span-6 ps-[110px] pt-[50px] sm:p-0"
                            data-aos="fade-right"
                        >
                            <h2 className="font-raleway font-bold text-[40px] leading-[48px] tracking-[1%] text-colour-text sm:text-[24px] sm:leading-[28.8px] mb-8">
                                About Event
                            </h2>

                            <p
                                className="mb-[20px] sm:mb-[16px] font-raleway font-normal text-[18px] leading-[30px] tracking-[0%]"
                            >
                                Gujarat JUG - Community Day 2025 is our flagship annual tech event dedicated to fostering knowledge-sharing, networking, and professional growth within the Java ecosystem.
                            </p>

                            <p
                                className="mb-[20px] sm:mb-[16px] font-raleway font-normal text-[18px] leading-[30px] tracking-[0%]"
                            >
                                Join Java professionals, tech leaders, and aspiring developers for insightful sessions, hands-on workshops, and opportunities to connect with like-minded enthusiasts.
                            </p>
                            
                            <BookYourSlotButton/>
                        </div>

                        {/* Grid Item 2 */}
                        <div
                            className="col-span-6 sm:grid-cols-1 sm:px-0 px-[100px] sm:mt-4"
                            data-aos="fade-left"
                        >
                            <img src="Img/AboutEvent.png" alt="About Community" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AboutEvent