import React, { useEffect } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css'; 
import volunteer from '../data/eventVolunteerData';

const EventVolunteer = () => {

 useEffect(() => {
        AOS.init({
            duration: 1000, 
            // once: true, 
        });
    }, []);

  return (
    <div className="bg-[#FFFFFF] ">
    <div className="container mx-auto 2xl:max-w-screen-2xl   ">
      <div className='pt-[128px] pb-[100px] sm:pt-[50px] sm:pb-[50px]'>
        <div className="flex justify-between items-center sm:flex-col">
          <h1 className="font-raleway font-medium text-[56px] leading-[65px] sm:text-[20px] sm:leading-[24px]">Our Rockstar Volunteer</h1>
          <button
                className="relative bg-black text-white px-7 py-[19px] sm:text-[12px] sm:px-3 sm:py-[6px] rounded-2xl border-2 border-black overflow-hidden transition-all duration-300 group
                mt-7 sm:mt-4"
                onClick={() =>
                    window.open(
                        "https://forms.gle/TQrY7pC7k7heAw87A",
                        "_blank",
                        "noopener,noreferrer"
                    )
                }
            >
                {/* Expanding background effect */}
                <span className="absolute inset-0 bg-white scale-y-0 origin-bottom transition-transform duration-300 ease-in-out group-hover:scale-y-100"></span>

                {/* Button text */}
                <span className="relative z-10 text-white group-hover:text-black transition-colors duration-300 font-bold font-raleway text-[18px] sm:text-[12px]">
                Become a Volunteer
                </span>
            </button>
        </div>

        <div className="grid xl:grid-cols-6 sm:grid-cols-2 md:grid-cols-4 gap-y-11 gap-x-6 sm:gap-x-5 sm:gap-12 pt-[48px] sm:pt-[32px]">
          {volunteer.map((expert, index) => (
            <div key={expert.id} className="justify-items-center"  data-aos="fade-right"   data-aos-delay={`${index * 200}`}>
               <img src={expert.image} alt={expert.name} className=" sm:w-[320px] cursor-pointer" onClick={()=>window.open(expert.linkedinlink, "noopener", "noreferrer")}/>
                <h2 className="pt-6 font-raleway font-bold text-[18px] leading-[22px] sm:text-[12px] sm:leading-[18px] sm:pt-3 cursor-pointer" onClick={()=>window.open(expert.linkedinlink, "noopener", "noreferrer")}>{expert.name}</h2>
                <p className="text-black font-raleway font-normal text-[14px] leading-[21px] pt-2 sm:text-[12px] sm:leading-[18px] sm:pt-1">{expert.profession} </p>
                <h1 className='text-black font-raleway font-bold text-[12px] leading-[20px] pt-2 sm:pt-1'>{expert.organsitions}</h1>

            </div>
          ))}
        </div>


      </div>
    </div>
  </div>
  )
}

export default EventVolunteer