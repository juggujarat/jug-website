import React from 'react'
import volunteer from '../data/volunteerData';

const Volunteer = () => {

  return (
    <div className="bg-[#CAF8FC] ">
      <div className="container mx-auto 2xl:max-w-screen-2xl   ">
        <div className='pt-[128px] pb-[100px]'>
          <div className="flex justify-between items-center">
            <h1 className="font-raleway font-medium text-[56px] leading-[65px] sm:text-[24px] sm:leading-[32px]">The Heart of Our Team</h1>
            <button className="relative px-7 py-[19px] text-black border border-black rounded-2xl bg-white overflow-hidden transition-all duration-300 group sm:text-[12px] sm:px-3 sm:py-[6px]" onClick={() => window.open("https://forms.gle/ErYRsKHEFfbWzima9","_blank","noopener,noreferrer")}>
              <span className="absolute inset-0 bg-black scale-y-0 origin-bottom transition-transform duration-300 ease-in-out group-hover:scale-y-100"></span>
              <span className="relative z-10 text-black group-hover:text-white transition-colors duration-300">Become a Volunteer</span>
            </button>
          </div>

          <div className="grid xl:grid-cols-6 sm:grid-cols-2 md:grid-cols-4 gap-6 sm:gap-12 pt-[48px]">
            {volunteer.map((expert) => (
              <div key={expert.id} className="sm:text-center">
                <img src={expert.image} alt={expert.name} className=" sm:w-[320px] " />
                <h2 className="pt-6 font-raleway font-bold text-[24px] leading-[28px]">{expert.name}</h2>
                <p className="text-gray-600 font-raleway font-normal text-[16px] leading-[18px] pt-2">{expert.expertise}</p>
              </div>
            ))}
          </div>


        </div>
      </div>
    </div>

  )
}

export default Volunteer