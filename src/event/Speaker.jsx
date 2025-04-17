import React, { useEffect } from 'react';
import speakers from '../data/eventSpeakerData';
import AOS from 'aos';
import 'aos/dist/aos.css'; 

const Speaker = () => {

 useEffect(() => {
        AOS.init({
            duration: 1000, 
            // once: true, 
        });
    }, []);


  return (
    <div className="bg-[#E1EEFB] ">
    <div className="container mx-auto 2xl:max-w-screen-2xl  overflow-hidden ">
      <div className='pt-[128px] pb-[100px] sm:pt-[50px] sm:pb-[50px]'  data-aos="zoom-in-up">
        <div className="flex justify-between items-center sm:flex-col sm:text-center">
        <h1 className="font-raleway font-medium text-[56px] leading-[65px] sm:text-[20px] sm:leading-[32px]">
        Java 
          <span className="relative inline-block ml-4 sm:ml-2">
          Innovators
            <img src="/Img/Squiggly.svg" 
                alt="Squiggly underline" 
                className="absolute left-1/2 -translate-x-1/2 w-[100%] mt-1 sm:w-[60px] sm:hidden" />
          </span>
          <span className='ml-2'>
          Taking the Stage! 
          </span>
        </h1>
        <button
                className="relative bg-black text-white px-[63px] py-[20px] sm:px-[16px] sm:py-[8px] rounded-2xl border-2 border-black overflow-hidden transition-all duration-300 group
                mt-7 sm:mt-2"
                onClick={() =>
                    window.open(
                        "https://www.papercall.io/community-day-for-java",
                        "_blank",
                        "noopener,noreferrer"
                    )
                }
            >
                {/* Expanding background effect */}
                <span className="absolute inset-0 bg-white scale-y-0 origin-bottom transition-transform duration-300 ease-in-out group-hover:scale-y-100"></span>

                {/* Button text */}
                <span className="relative z-10 text-white group-hover:text-black transition-colors duration-300 font-bold font-raleway 
                text-[18px] sm:text-[12px] sm:leading-[14px]">
               Submit CFP
                </span>
            </button>
        </div>

        <div className="grid xl:grid-cols-4 sm:grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8 pt-[48px] sm:pt-[36px] justify-items-center">
          {speakers.map((speaker, index) => (
            <div key={speaker.id} className="text-center justify-items-center"  data-aos="fade-right"   data-aos-delay={`${index * 200}`}>
              <img src={speaker.image} alt={speaker.name} className=" sm:w-[320px] " />
              <h2 className="pt-6 font-raleway font-bold text-[24px] leading-[28px] sm:text-[14px] sm:leading-[18px] sm:pt-4">{speaker.name}</h2>
              <p className="text-gray-600 font-raleway font-normal text-[16px] leading-[20px] sm:text-[14px] sm:leading-[22px] pt-2 sm:pt-1">{speaker.profession} <strong className='text-black-600'>{speaker.expertise}</strong></p>

            </div>
          ))}
        </div>


      </div>
    </div>
  </div>
  )
}

export default Speaker