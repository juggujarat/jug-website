import React from 'react'

const BecomeSpeaker = () => {
  return (
    <div className="bg-[#F6E5AE] ">
      <div className="container mx-auto 2xl:max-w-screen-2xl   ">
        <div className='pt-[128px] pb-[100px]'>
          <div className="grid grid-cols-1 md:grid-cols-1 sm:grid-cols-1 items-center gap-6">
            {/* Image Section */}
            <div className="flex pl-[200px] sm:pl-[0px] sm:flex-col sm:items-center ">

              <img src="/Img/mice.svg" alt="Speaker Guest" className=" w-[186px] h-[320px] " />

              <div className='  ml-[60px] mt-8 sm:ml-[0px] sm:mt-8 sm:text-center'>
                <h1 className="font-raleway font-medium text-[88px] leading-[103px] tracking-[1%] sm:text-[40px] sm:leading-[52px] sm:tracking-[1%] 
             text-black">Become a Speaker Guest</h1>
                <button className="bg-[#FFFFFF] text-black px-7 py-5 rounded-2xl transition border border-black mt-2 sm:mt-6">
                  Register as Speaker
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default BecomeSpeaker