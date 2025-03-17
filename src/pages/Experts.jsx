import React, { useEffect } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css'; 
import experts from '../data/expertsData';

const Experts = () => {

  useEffect(() => {
    AOS.init({
        duration: 1000, 
        // once: true, 
    });
}, []);

  return (
    <div className="bg-[#FFFCEF] ">
      <div className="container mx-auto 2xl:max-w-screen-2xl   ">
        <div className='pt-[128px] pb-[100px] sm:pt-[50px] sm:pb-[50px]'>
          <div className="flex justify-between items-center">
          <h1 className="font-raleway font-medium text-[56px] leading-[65px] sm:text-[24px] sm:leading-[32px]">
            Here Come the 
            <span className="relative inline-block ml-4 sm:ml-2">
              Experts!
              <img src="/Experts/squiggly_line.svg" 
                  alt="Squiggly underline" 
                  className="absolute left-1/2 -translate-x-1/2 w-[100%] -mt-2 sm:w-[60px] sm:hidden" />
            </span>
          </h1>
            {/* <button className="bg-[#FFFFFF] text-black px-7 py-[19px] sm:px-0 sm:py-[6px] rounded-2xl transition border border-black sm:text-[12px]">
              Register as Speaker
            </button> */}
          </div>

          <div className="grid xl:grid-cols-4 sm:grid-cols-2 md:grid-cols-4 gap-6 sm:gap-x-6 pt-[48px] sm:pt-[20px] ">
            {experts.map((expert, index) => (
              <div key={expert.id} className="sm:text-center"  data-aos="fade-right"   data-aos-delay={`${index * 200}`}>
                <img src={expert.image} alt={expert.name} className=" sm:w-[320px] " />
                <h2 className="pt-6 sm:pt-3 font-raleway font-bold text-[24px] leading-[28px] sm:text-[14px] sm:leading-[20px]">{expert.name}</h2>
                <p className="text-gray-600 font-raleway font-normal text-[16px] leading-[18px] sm:text-[12px] sm:leading-[18px] pt-2 sm:pt-1">{expert.profession} <strong className='text-black-600'>{expert.expertise}</strong></p>

              </div>
            ))}
          </div>


        </div>
      </div>
    </div>

  )
}

export default Experts