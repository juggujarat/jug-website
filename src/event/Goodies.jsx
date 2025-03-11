import React from 'react'

const Goodies = () => {
  return (
    <div className="bg-[#FFFFFF] ">
      <div className="container mx-auto xl:max-w-screen-xl  ">
        <div className='pt-[128px] pb-[155px] sm:pt-[50px] sm:pb-[50px]'>
          <div className='mt-[20px] text-center'>
            <h1 className="font-raleway font-medium text-[56px] leading-[62px] sm:text-[32px] sm:leading-[48px] tracking-[0%]">
              More Than Just Talks
            </h1>
          </div>
          <div className="grid grid-cols-12 justify-center mt-11 sm:mt-6">
            <div className="col-span-12 flex flex-wrap justify-center gap-x-14 text-center ">
              <div className="flex flex-col items-center max-w-xs">
                <img src="/Goodies/Food.png" alt="not found" />
                <p className='font-raleway font-medium text-[20px] leading-[30px] tracking-[0%] text-black'>
                  Delicious Food & Breakfast Included – Fuel up while networking!
                </p>
              </div>

              <div className="flex flex-col items-center max-w-xs ">
                <img src="/Goodies/Bag.png" alt="not found" />
                <p className='font-raleway font-medium text-[20px] leading-[30px] tracking-[0%] text-black'>
                  Exclusive Swags & Goodies – Walk away with special event memorabilia!
                </p>
              </div>

              <div className="flex flex-col items-center max-w-xs">
                <img src="/Goodies/Speakers.png" alt="not found" />
                <p className='font-raleway font-medium text-[20px] leading-[30px] tracking-[0%] text-black'>
                  Technical Talks from Industry Experts – Get insights from top minds in Java.
                </p>
              </div>
            </div>
            
          </div>

          <div className='mt-[68px] flex flex-col items-center justify-center'>
            <button className="bg-[#FFFFFF] text-black px-6 py-4 rounded-2xl transition border border-black">
              Book Your Slots
            </button>
            <h1 className='font-raleway font-medium text-[14px] leading-[100%] tracking-[0%] mt-6 ml-2 text-black'>🔥 Limited Seats Available </h1>
          </div>
         
        </div>
      </div>
    </div>
  )
}

export default Goodies