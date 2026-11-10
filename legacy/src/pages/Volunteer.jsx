import React, { useEffect } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css'; 
import volunteer from '../data/volunteerData';


const Volunteer = () => {

  useEffect(() => {
    AOS.init({
        duration: 1000, 
        // once: true, 
    });
}, []);

  return (
    <div className="bg-[#CAF8FC] ">
      <div className="container mx-auto 2xl:max-w-screen-2xl   ">
        <div className='pt-[128px] pb-[100px] sm:pt-[50px] sm:pb-[50px]'>
          <div className="flex justify-between items-center sm:flex-col">
            <h1 className="font-raleway font-medium text-[56px] leading-[65px] sm:text-[24px] sm:leading-[32px]">The Heart of Our Team</h1>
            <button className="relative px-7 py-[19px] text-black border border-black rounded-2xl bg-white overflow-hidden transition-all duration-300 group sm:text-[12px] sm:px-3 sm:py-[6px] sm:mt-3" onClick={() => window.open("https://forms.gle/TQrY7pC7k7heAw87A","_blank","noopener,noreferrer")}>
              <span className="absolute inset-0 bg-black scale-y-0 origin-bottom transition-transform duration-300 ease-in-out group-hover:scale-y-100"></span>
              <span className="relative z-10 text-black group-hover:text-white transition-colors duration-300 ">Become a Volunteer</span>
            </button>
          </div>

          <div className="grid xl:grid-cols-4 sm:grid-cols-2 md:grid-cols-4 gap-x-2 gap-y-8 sm:gap-x-6 pt-[48px] sm:pt-[36px]">
            {volunteer.map((expert,index) => (
              <div key={expert.id} className="sm:text-center" data-aos="fade-right"   data-aos-delay={`${index * 200}`}>
                <img src={expert.image} alt={expert.name} className=" sm:w-[320px]" />
                <h2 className="pt-6 sm:pt-3 font-raleway font-bold text-[24px] leading-[28px] sm:text-[14px] sm:leading-[20px]">{expert.name}</h2>
                <p className="text-gray-600 font-raleway font-normal text-[16px] leading-[18px]  sm:text-[12px] sm:leading-[18px] pt-2 sm:pt-1">{expert.expertise} <strong className='text-black-600'>{expert.profession}</strong></p>
              </div>
            ))}
          </div>


        </div>
      </div>
    </div>

  )
}

export default Volunteer