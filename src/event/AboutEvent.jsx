import React, { useEffect } from 'react';
import About from '../Components/About'
import BookYourSlotButton from '../Components/BookYourSlotButton'
import AOS from 'aos';
import 'aos/dist/aos.css'; 


const AboutEvent = () => {

 useEffect(() => {
        AOS.init({
            duration: 1000, 
            // once: true, 
        });
    }, []);


    return (
        <div className="bg-[#D7FFF1] ">
            <div className="container mx-auto xl:max-w-screen-xl overflow-hidden ">
                <div className='pt-[128px] pb-[100px] sm:pt-[50px] sm:pb-[50px]'>
                    <div className="grid grid-cols-12 sm:grid-cols-1" >
                        {/* Grid Item 1 */}
                        <div
                            className="col-span-6 ps-[110px] pt-[50px] sm:p-0 "
                             data-aos="fade-right" 
                        >
                            <h2 className="font-raleway font-bold text-[40px] leading-[48px] tracking-[1%] text-colour-text sm:text-[24px] sm:leading-[28.8px] mb-8">
                                About Event
                            </h2>

                            <p
                                className="mb-[20px] sm:mb-[16px] font-raleway font-normal text-[18px] leading-[30px] sm:text-[16px] sm:leading-[28px] tracking-[0%]"
                            >
                                Community Day for Java, 2025 is our flagship annual tech event dedicated to fostering <strong>knowledge-sharing</strong>, networking, and professional growth within the Java ecosystem.
                            </p>

                            <p
                                className="mb-[20px] sm:mb-[16px] font-raleway font-normal text-[18px] leading-[30px]  sm:text-[16px] sm:leading-[28px] tracking-[0%]"
                            >
                                Join Java professionals, tech leaders, and aspiring developers for insightful sessions, <strong>hands-on workshops</strong>, and opportunities to connect with like-minded enthusiasts.
                            </p>
                            <p
                                className="flex items-center gap-2 mb-[40px] sm:mb-[32px] mt-[40px] sm:mt-[32px] font-raleway font-normal text-[20px] leading-[30px] sm:text-[12px] sm:leading-[28px] tracking-[0%]"
                            >
                                <img src='Img/locationpin.svg' alt="location pin" className="w-5 h-5"/>
                                <strong>LJ University, Ahmedabad</strong>
                                <a href="https://maps.app.goo.gl/PCQEcveVpwxk9YdD8" target="_blank" rel="noopener noreferrer" className="flex items-center gap-1 ml-2 text-blue-500 sm:text-[14px] underline">View map <img src='Img/externallink.svg' alt='external link' className='w-6 h-6 sm:w-4 sm:h-4' /></a>
                            </p>
                            <p
                                className="flex items-center gap-2 mb-[40px] sm:mb-[32px] mt-[40px] sm:mt-[32px] font-raleway font-normal text-[20px] leading-[30px] sm:text-[18px] sm:leading-[28px] tracking-[0%]"
                            >
                                <img src='Img/calender.svg' alt="location pin" className="w-5 h-5"/>
                                <strong>27th April’25</strong>
                            </p>
                            <div className="flex justify-start  sm:hidden">
                                <div className="flex flex-col ">
                                    <BookYourSlotButton />
                                </div>
                            </div>

                        </div>

                        {/* Grid Item 2 */}
                        <div
                            className="col-span-6 sm:grid-cols-1 sm:px-0 px-[100px] sm:mt-4 sm:order-1 "
                            data-aos="fade-left" 
                        >
                            <img src="Img/AboutEvent.png" alt="About Community" className='sm:w-[320px]'/>
                        </div>
                        
                    </div>
                    <div className="flex justify-center items-center mt-4 xl:hidden ">
                                <div className="flex flex-col ">
                                    <BookYourSlotButton />
                                </div>
                            </div>
                </div>
            </div>
        </div>
    )
}

export default AboutEvent
