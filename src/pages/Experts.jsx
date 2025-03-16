import React from 'react'
import experts from '../data/expertsData';

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
          <button className="relative px-7 py-[19px] text-black border border-black rounded-2xl bg-white overflow-hidden transition-all duration-300 group sm:px-0 sm:py-[6px] sm:text-[12px]">
            <span className="absolute inset-0 bg-black scale-y-0 origin-bottom transition-transform duration-300 ease-in-out group-hover:scale-y-100"></span>
            <span className="relative z-10 text-black group-hover:text-white transition-colors duration-300">
              Submit Your Talk
            </span>
          </button>
          </div>

          <div className="grid xl:grid-cols-4 sm:grid-cols-1 md:grid-cols-4 gap-6 sm:gap-12 pt-[48px] sm:pt-[52px] ">
            {experts.map((expert) => (
              <div key={expert.id} className="sm:text-center">
                <img src={expert.image} alt={expert.name} className=" sm:w-[320px] " />
                <h2 className="pt-6 font-raleway font-bold text-[24px] leading-[28px]">{expert.name}</h2>
                <p className="text-gray-600 font-raleway font-normal text-[16px] leading-[18px] pt-2">{expert.profession} <strong className='text-black-600'>{expert.expertise}</strong></p>

              </div>
            ))}
          </div>


        </div>
      </div>
    </div>

  )
}

export default Experts