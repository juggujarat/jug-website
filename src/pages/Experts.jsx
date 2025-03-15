import React from 'react'
import experts from '../data/expertsData';
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";


const Experts = () => {

  return (
    <div className="bg-[#FFFCEF] ">
      <div className="container mx-auto 2xl:max-w-screen-2xl   ">
        <div className='pt-[128px] pb-[100px]'>
          <div className="flex justify-between items-center">
          <h1 className="font-raleway font-medium text-[56px] leading-[65px] sm:text-[20px] sm:leading-[32px]">
            Past
            <span className="relative inline-block ml-4">
              Speakers
              <img src="/Experts/squiggly_line.svg" 
                  alt="Squiggly underline" 
                  className="absolute left-1/2 -translate-x-1/2 w-[100%] -mt-2 sm:w-[60px]" />
            </span>
          </h1>
            <button className="bg-[#FFFFFF] text-black px-7 py-[19px] sm:px-0 sm:py-[6px] rounded-2xl transition border border-black sm:text-[12px]">
              Submit Your Talk
            </button>
          </div>

          <div className="relative w-full mt-10">
              <div className="sm:hidden lg:flex absolute top-1/2 -left-8 z-10 -translate-y-1/2">
                <button className="swiper-button-prev bg-[#EDD7FF] text-gray-900 rounded-md hover:bg-[#d4b8f5] transition shadow-md flex items-center justify-center w-8 h-8 border-none text-lg"></button>
              </div>
              <div className="sm:hidden lg:flex absolute top-1/2 -right-8 z-10 -translate-y-1/2">
                <button className="swiper-button-next bg-[#EDD7FF] text-gray-900 rounded-md hover:bg-[#d4b8f5] transition shadow-md flex items-center justify-center w-8 h-8 border-none text-lg"></button>
              </div>


              <Swiper modules={[Navigation, Autoplay]} spaceBetween={20} slidesPerView={1} breakpoints={{ 640: { slidesPerView: 2 }, 1024: { slidesPerView: 4 } }} loop={true} autoplay={{ delay: 3000 }} navigation={{ nextEl: ".swiper-button-next", prevEl: ".swiper-button-prev" }} className="w-full">
                {experts.map((expert) => (
                  <SwiperSlide key={expert.id}>
                    <div className="sm:text-center cursor-pointer" onClick={() => window.open(expert.profileLink, "_blank", "noopenerm")}>
                      <img src={expert.image} alt={expert.name} className="sm:w-full mx-auto rounded-lg" />
                      <h2 className="pt-6 font-raleway font-bold text-[24px] leading-[28px]">{expert.name}</h2>
                      <p className="text-gray-600 font-raleway font-normal text-[16px] leading-[18px] pt-2">{expert.profession} <strong className="text-black-600">{expert.expertise}</strong></p>
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

export default Experts