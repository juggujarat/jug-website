import React, { useEffect } from 'react';
import Header from './Header'
import BookYourSlotButton from '../Components/BookYourSlotButton'
import AOS from 'aos';

const Event = () => {

     useEffect(() => {
              AOS.init({
                  duration: 1000, 
                  // once: true, 
              });
          }, []);

    return (
        <div className="bg-[#F6EAFF] relative">
              <Header />
              {/* <div className="absolute bottom-0 left-0 top-[368px] sm:hidden">
                <img src='/Home/Venkat.png' alt='' className="" data-aos="zoom-in-up" />
            </div> */}
            <div className=" container mx-auto xl:max-w-screen-xl  sm:mx-auto overflow-hidden">
                <div className="pt-[72px] sm:pb-[72px] ">
                    <div className="grid grid-cols-12 sm:grid-cols-1 gap-10">
                    <div className=" col-span-6  items-center  h-auto">
                            {/* Top Image */}
                            <div className='pl-[200px]  relative sm:pl-0 '>
                            <img src='/Home/Ahemdabad.png' alt='' className="absolute top-2 left-[282px] right-0 sm:left-[86px]" />
                            </div>
                            {/* Middle Image */}
                            <div className='pl-[120px]   mt-9 sm:pl-0 '>
                            <img src='/Home/CommunityDay.png' alt='' className="" />
                            </div>
                            <div className='  relative sm:hidden ' >
                            <img src='/Home/BannerArrow.svg' alt='' className="absolute -top-4 left-[522px] right-0 sm:left-[120px] " />
                            </div>
                            {/* Bottom Image */}
                            <div className=' flex sm:flex-col sm:mt-4'>
                            <img src='/Home/VenkatSir.png' alt='' className="" data-aos="zoom-in-up"/>
                            
                             <div className=" mt-[124px] text-center sm:pr-0 sm:mt-6 ">
                            <h2 className="font-archivo font-normal text-[26.25px] sm:text-[16.25px] leading-[100%] ">Special Speaker</h2>
                            <h2 className="font-autography font-normal text-[48px] leading-[47px] mt-6 ">Venkat Subramaniam</h2>
                            </div>
                            </div>
                            </div>
                        <div className="  col-span-6  sm:grid-cols-1 sm:mt-[28px] " data-aos="fade-left" >
                            <div className="flex gap-4  sm:items-center sm:justify-center">
                                <div className="px-4 py-[6px] sm:px-2 sm:py-[4px] rounded-full   bg-[#D7FFF1] border border-[#1AD090] 
                                 font-medium text-[12px] sm:text-[10px]  tracking-[1%]">
                                    300+ Participant
                                </div>
                                <div className="px-[18px] py-2  rounded-full  sm:px-2 sm:py-[4px] bg-[#FFFCEF] border  border-[#E8C52A]
                                  font-medium text-[12px]  tracking-[1%] sm:text-[10px] ">
                                    4+ Industry Speaker
                                </div>
                            </div>
                            <div className='mt-[20px] sm:text-center'>
                            <h1 className="font-raleway font-semibold text-[46px] leading-[58px] sm:text-[24px] sm:leading-[42px] tracking-[0%]">
                             Join the Biggest Java Community Event in Gujarat!
                            </h1>
                            </div>

                              <div>
                            <ul className="mt-[28px] sm:text-center">

                                <li className="text-black text-[16px] leading-[100%] tracking-[0%] font-raleway font-medium pt-2 sm:text-[14px] sm:leading-[18.23px]">
                                    <span>
                                    <i className="fas fa-check text-black ml-auto mr-4 sm:mr-4"></i>
                                    </span>
                                    Engaging Tech Talks
                                </li>
                                <li className="text-black text-[16px] leading-[100%] tracking-[0%] font-raleway font-medium font-dm-sans pt-[24px] sm:text-[14px] sm:leading-[18.23px]">
                                    <span>
                                        <i className="fas fa-check text-black ml-auto mr-4 sm:mr-4"></i>
                                    </span>
                                    Exclusive Swags & Goodies
                                </li>
                                <li className="text-black text-[16px] leading-[100%] tracking-[0%] font-raleway font-medium font-dm-sans pt-[24px] sm:text-[14px] sm:leading-[18.23px]">
                                    <span>
                                        <i className="fas fa-check text-black ml-auto mr-4 sm:mr-4"></i>
                                    </span>
                                    Delicious Food & Refreshments
                                </li>
                                <li className="text-black text-[16px] leading-[100%] tracking-[0%] font-raleway font-medium font-dm-sans pt-[24px] sm:text-[14px] sm:leading-[18.23px]">
                                    <span>
                                        <i className="fas fa-check text-black ml-auto mr-4 sm:mr-4"></i>
                                    </span>
                                    And much more
                                </li>
                                </ul>
                                </div>
                                <div className="flex justify-start sm:justify-center">
                                <div className='mt-[41px] sm:items-center sm:justify-center sm:flex sm:flex-col  '>
                                <BookYourSlotButton/>
                                </div>
                                </div>
                          
                        </div>
                    </div>
                </div>
            </div>
        </div>

    )
}

export default Event