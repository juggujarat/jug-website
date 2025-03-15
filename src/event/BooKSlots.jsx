import React from 'react'
import { HiOutlineArrowRight } from "react-icons/hi";
import Footer from './Footer';



function BooKSlots() {
  return (
    <div className="bg-[#FFFCEF]">
    <div className="container mx-auto 2xl:max-w-screen-2xl ">
      <div className="pt-[128px] pb-[100px] sm:pt-[80px]">
        <div className="grid grid-cols-1 sm:grid-cols-1">
          <div className="bg-[#EDD7FF] py-[60px]  sm:py-[50px] sm:px-[25px]  border border-black rounded-[40px] px-[50px]">
            <div className="grid grid-cols-12 items-center sm:text-center">
              {/* Left Section (8 Columns) */}
              <div className="  col-span-8 sm:grid-cols-1 sm:col-span-12">
                <h1 className="font-raleway font-bold text-[85px] leading-[99px] sm:text-[26px] sm:leading-[40px] tracking-[1%] ">
                Book Your Ticket Today!
                </h1>
                <div className="  mt-4 ">
                  <p className="font-raleway font-medium text-[24px] leading-[28px] sm:text-[16px] sm:leading-[24px] tracking-[1%]">
                  Join top Java experts, developers, and tech leaders for a day of learning, networking, and innovation at Gujarat JUG - Community Day 2025!
                  </p>
                </div>
              </div>

              {/* Right Section (4 Columns) */}
              <div className="flex justify-center col-span-4 sm:mt-7 sm:flex sm:items-center sm:justify-center sm:col-span-12">
                <div className="bg-white rounded-full py-[81px] px-[81px] sm:py-[20px] sm:px-[20px] border border-black flex items-center justify-center">
                  <HiOutlineArrowRight className="text-gray-800 text-[60px] sm:text-[20px]" />
                </div>
              </div>

            </div>
          </div>
        </div>
      </div>
      <Footer></Footer>
      <h1 className='text-center mt-[72px]'>© Copyright 2025 All Rights Reserved</h1>
    </div>
  </div>
  )
}

export default BooKSlots