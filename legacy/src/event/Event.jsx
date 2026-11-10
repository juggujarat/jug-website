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
            <div className=" container mx-auto xl:max-w-screen-xl  sm:mx-auto overflow-hidden ">
                <div className="pt-[72px] sm:pt-6 ">
                    <div className="grid grid-cols-12 sm:grid-cols-1 gap-10">
                    <div className=" col-span-6  sm:order-2">
                            {/* Top Image */}
                            {/* <div className='pl-[200px]  relative sm:pl-0 '>
                            <img src='/Home/Ahemdabad.png' alt='' className="absolute top-2 left-[282px] right-0 sm:left-[86px] " />
                            </div> */}
                            {/* Middle Image */}
                            <div className='pl-[120px]    sm:pl-0 sm:hidden  '>
                            <img src='/Home/CommunityDayJava.svg' alt='' className="" />
                            </div>
                            
                            <div className='  relative  ' >
                            <img src='/Home/BannerArrow.svg' alt='' className="absolute -top-4 left-[508px] right-0 sm:left-[260px] sm:-top-1  sm:h-[52px] sm:w-[68px]" />
                            </div>
                            {/* Bottom Image */}
                            <div className=' flex sm:mt-4  '>
                            <img src='/Home/VenkatXl.png' alt='' className="sm:hidden" data-aos="zoom-in-up"/>
                            <img src='/Home/VenkatSm.png' alt='' className="xl:hidden" data-aos="zoom-in-up"/>
                            
                             <div className=" mt-[112px] text-center  sm:mt-12 ">
                            <h2 className="font-archivo font-normal text-[26.25px] sm:text-[18.25px] leading-[100%]  sm:leading-[100%] ">Special Speaker</h2>
                            <h2 className="font-autography font-normal text-[48px] leading-[47px] mt-6 sm:text-[23px] sm:leading-[24px] sm:mt-4 } ">Venkat Subramaniam</h2>

                            </div>
                            </div>
                            </div>
                        <div className="  col-span-6  sm:grid-cols-1  sm:order-1" data-aos="fade-left">
                        <div className=' sm:pl-0 sm:mt-0 flex items-center justify-center ' >
                                                    <img src='/Home/CommunityDayJavaSm.svg' alt='' className="xl:hidden" />
                                                    </div>

                            <div className="flex gap-4  sm:items-center sm:justify-center sm:mt-4">
                                <div className="px-4 py-[6px] sm:px-2 sm:py-[4px] rounded-full   bg-[#D7FFF1] border border-[#1AD090] 
                                 font-medium text-[12px] sm:text-[10px]  tracking-[1%]">
                                    300+ Participant
                                </div>
                                <div className="px-[18px] py-2  rounded-full  sm:px-2 sm:py-[4px] bg-[#FFFCEF] border  border-[#E8C52A]
                                  font-medium text-[12px]  tracking-[1%] sm:text-[10px] ">
                                    4 Industry Speaker
                                </div>
                            </div>
                            <div className='mt-[20px] sm:text-center'>
                            <h1 className="font-raleway font-semibold text-[46px] leading-[58px] sm:text-[23px] sm:leading-[25px] tracking-[0%]">
                             Join the Biggest Java Community Event in Gujarat!
                            </h1>
                            </div>

                              <div>
                            <ul className="mt-[28px] sm:pl-[62px] sm:mt-4">

                                <li className="text-black text-[16px] leading-[100%] tracking-[0%] font-raleway font-medium pt-2 sm:text-[14px] sm:leading-[14px]">
                                    <span>
                                    <i className="fas fa-check text-black ml-auto mr-4 sm:mr-4 sm:text-[19.99px] sm:font-bold"></i>
                                    </span>
                                    Engaging Tech Talks
                                </li>
                                <li className="text-black text-[16px] leading-[100%] tracking-[0%] font-raleway font-medium font-dm-sans pt-[24px] sm:text-[14px] sm:leading-[14px]">
                                    <span>
                                        <i className="fas fa-check text-black ml-auto mr-4 sm:mr-4 sm:text-[19.99px]"></i>
                                    </span>
                                    Exclusive Swags & Goodies
                                </li>
                                <li className="text-black text-[16px] leading-[100%] tracking-[0%] font-raleway font-medium font-dm-sans pt-[24px] sm:text-[14px] sm:leading-[14px]">
                                    <span>
                                        <i className="fas fa-check text-black ml-auto mr-4 sm:mr-4 sm:text-[19.99px]"></i>
                                    </span>
                                    Delicious Food & Refreshments
                                </li>
                                <li className="text-black text-[16px] leading-[100%] tracking-[0%] font-raleway font-medium font-dm-sans pt-[24px] sm:text-[14px] sm:leading-[14px]">
                                    <span>
                                        <i className="fas fa-check text-black ml-auto mr-4 sm:mr-4 sm:text-[19.99px]"></i>
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