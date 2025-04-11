import React, { useEffect } from 'react';
import About from '../Components/About'
import BookYourSlotButton from '../Components/BookYourSlotButton'
import AOS from 'aos';
import 'aos/dist/aos.css'; 


const EventVenue = () => {

 useEffect(() => {
        AOS.init({
            duration: 1000, 
            // once: true, 
        });
    }, []);


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
                                We are proud to host <strong>Community Day for Java 2025</strong> on <strong>April 27, 2025</strong> at prestigious <strong>LJ University</strong> - a hub for future-ready talent and cutting-edge technology learning.
                            </p>

                            <div className='mt-10 mb-10 flex justify-center'>
                                <img src='/Img/LJ_Campus.svg' alt='LJ University' />
                            </div>
{/* 
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
                            </p> */}
                            <div className="flex justify-center sm:hidden">
                                <div className="flex flex-col ">
                                    <BookYourSlotButton />
                                </div>
                            </div>

                        </div>

                        {/* Grid Item 2 */}
                        <div
                            className="col-span-6 sm:grid-cols-1 sm:px-0 px-[100px] sm:mt-4 sm:order-1"
                            data-aos="fade-left" 
                        >
                            <iframe src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d3672.9108100708986!2d72.485711!3d22.990307!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x395e9aee6c89a621%3A0x872df2d55fbb0008!2sLJ%20University!5e0!3m2!1sen!2sin!4v1744317485542!5m2!1sen!2sin" width="600" height="650" className='border border-white border-[10px]' allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>
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

export default EventVenue
