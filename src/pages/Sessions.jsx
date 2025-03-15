import React from 'react'
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import experts from '../data/expertsData';
import videoLink from '../data/videoLinks';

const Sessions = () => {
    return (
        <div className="bg-[#EDD7FF] ">
            <div className="container mx-auto 2xl:max-w-screen-2xl   ">
                <div className='pt-[128px] pb-[100px]'>
                    <div className="flex justify-between items-center">
                        <h1 className="font-raleway font-medium text-[56px] leading-[65px] sm:text-[24px] sm:leading-[34px] ">Past Events</h1>
                        <button className="relative px-[27px] py-[19px] text-black border border-black rounded-2xl bg-white overflow-hidden transition-all duration-300 group sm:px-[12px] sm:py-[8px]" onClick={() => window.open('https://www.youtube.com/@juggujarat', "_blank", "noopener,noreferrer")} >
                            <span className="absolute inset-0 bg-black scale-y-0 origin-bottom transition-transform duration-300 ease-in-out group-hover:scale-y-100"></span>
                            <span className="relative z-10 text-black group-hover:text-white transition-colors duration-300">View all</span>
                        </button>
                    </div>
                    <div className="relative w-full mt-10">
                        <div className="lg:flex absolute top-1/2 -left-9 z-10 -translate-y-1/2">
                            <button className="swiper-button-prev bg-[#EDD7FF] text-gray-900 rounded-md hover:bg-[#d4b8f5] transition shadow-md flex items-center justify-center w-8 h-8 border-none text-lg"></button>
                        </div>
                        <div className="lg:flex absolute top-1/2 -right-9 z-10 -translate-y-1/2">
                            <button className="swiper-button-next bg-[#EDD7FF] text-gray-900 rounded-md hover:bg-[#d4b8f5] transition shadow-md flex items-center justify-center w-8 h-8 border-none text-lg"></button>
                        </div>
                        <Swiper modules={[Navigation, Autoplay]} spaceBetween={20} slidesPerView={1} breakpoints={{ 640: { slidesPerView: 2 } }} loop={true} autoplay={{ delay: 3000 }} navigation={{ nextEl: ".swiper-button-next", prevEl: ".swiper-button-prev" }} className="w-full">
                            {videoLink.map((video, index) => (
                            <SwiperSlide key={index}>
                                <div className="col-span-6">
                                <div className="iframe-container rounded-lg">
                                    <iframe src={video.link} title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerPolicy="strict-origin-when-cross-origin" allowFullScreen></iframe>
                                </div>
                                </div>
                            </SwiperSlide>
                            ))}
                        </Swiper>
                    </div>
                </div>
            </div>
        </div>

    )
}

export default Sessions