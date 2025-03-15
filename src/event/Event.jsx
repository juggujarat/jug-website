import React from 'react'
import Header from './Header'

const Event = () => {
    return (
        <div className="bg-[#E1EEFB]">
              <Header />
            <div className="  ">
                <div className="pt-[72px] sm:pb-[72px]">
                    <div className="grid grid-cols-12 sm:grid-cols-1 gap-4 ">
                    <div className=" col-span-6  items-center ">
                            {/* Top Image */}
                            <div className='pl-[200px]  relative sm:pl-0'>
                            <img src='/Home/Ahemdabad.png' alt='' className="absolute top-2 left-[282px] right-0 sm:left-[120px]" />
                            </div>
                            {/* Middle Image */}
                            <div className='pl-[120px]   mt-9 sm:pl-0 '>
                            <img src='/Home/CommunityDay.png' alt='' className="" />
                            </div>
                            {/* Bottom Image */}
                            <div className='border-black'>
                            <img src='/Home/Venkat.png' alt='' className="" />
                            </div>
                            </div>
                        <div className="  col-span-6  sm:grid-cols-1 sm:mt-[64px]">
                            <div className="flex gap-4  sm:items-center sm:justify-center">
                                <div className="px-4 py-[6px]  rounded-full   bg-[#D7FFF1] border border-[#1AD090] 
                                 font-medium text-[12px]  tracking-[1%]">
                                    300+ Participant
                                </div>
                                <div className="px-[18px] py-2  rounded-full   bg-[#FFFCEF] border  border-[#E8C52A]
                                  font-medium text-[12px]  tracking-[1%] ">
                                    8+ Industry Speaker
                                </div>
                            </div>
                            <div className='mt-[20px] sm:text-center'>
                            <h1 className="font-raleway font-semibold text-[48px] leading-[62px] sm:text-[32px] sm:leading-[48px] tracking-[0%]">
                             Join the Biggest Java Community Event in Gujarat!
                            </h1>
                            </div>

                              <div>
                            <ul className="mt-[28px] sm:text-center">

                                <li className="text-black text-[16px] leading-[100%] tracking-[0%] font-raleway font-medium pt-2 sm:text-[14px] sm:leading-[18.23px]">
                                    <span>
                                    <i className="fas fa-check text-black ml-auto mr-2 sm:mr-4"></i>
                                    </span>
                                     Gain insights from top Java experts
                                </li>
                                <li className="text-black text-[16px] leading-[100%] tracking-[0%] font-raleway font-medium font-dm-sans pt-[24px] sm:text-[14px] sm:leading-[18.23px]">
                                    <span>
                                        <i className="fas fa-check text-black ml-auto mr-2 sm:mr-4"></i>
                                    </span>
                                    Expand your professional network
                                </li>
                                <li className="text-black text-[16px] leading-[100%] tracking-[0%] font-raleway font-medium font-dm-sans pt-[24px] sm:text-[14px] sm:leading-[18.23px]">
                                    <span>
                                        <i className="fas fa-check text-black ml-auto mr-2 sm:mr-4"></i>
                                    </span>
                                    Hands-on workshops and live demos
                                </li>
                                </ul>
                                </div>
                                <div className='mt-[41px] sm:items-center sm:justify-center sm:flex sm:flex-col'>
                                <button className="bg-[#FFFFFF] text-black px-6 py-4 rounded-2xl transition border border-black">
                                    Book Your Slots
                                </button>
                                <h1 className='font-raleway font-medium text-[14px] leading-[100%] tracking-[0%] mt-6 ml-2 text-black'>🔥 Limited Seats Available </h1>
                                </div>
                          
                        </div>
                    </div>
                </div>
            </div>
        </div>

    )
}

export default Event