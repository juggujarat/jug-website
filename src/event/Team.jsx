import React from 'react'
import team from '../data/eventTeamData';

const Team = () => {
  return (
    <div className="bg-[#CAF8FC] ">
      <div className="container mx-auto 2xl:max-w-screen-2xl   ">
        <div className='pt-[128px] pb-[100px]'>
          <div className="flex justify-between items-center">
            <h1 className="font-raleway font-medium text-[56px] leading-[65px] sm:text-[24px] sm:leading-[32px]">The Heart of Our Team</h1>
            {/* <button className="bg-[#FFFFFF] text-black px-7 py-[19px] sm:text-[12px] sm:px-3 sm:py-[6px] rounded-2xl transition border border-black">
              Become a Volunteer
            </button> */}
          </div>

          <div className="grid xl:grid-cols-6 sm:grid-cols-2 md:grid-cols-4 gap-6 sm:gap-12 pt-[48px]">
            {team.map((teams) => (
              <div key={teams.id} className="sm:text-center">
                <img src={teams.image} alt={teams.name} className=" sm:w-[320px] " />
                <h2 className="pt-6 font-raleway font-bold text-[18px] leading-[22px]">{teams.name}</h2>
                <p className="text-gray-600 font-raleway font-normal text-[12px] leading-[16px] pt-2">{teams.expertise}</p>
              </div>
            ))}
          </div>


        </div>
      </div>
    </div>
  )
}

export default Team