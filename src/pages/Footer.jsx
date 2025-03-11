import React from 'react'
import FooterItem from '../Components/FooterItem'
import { Link as ScrollLink } from "react-scroll";

function Footer() {
  return (
    <div>
      {/* <div className="container mx-auto xl:max-w-screen-xl px-4  "> */}
      <div className="grid grid-cols-12  bg-[#FFFFFF] border border-black rounded-[40px] pl-[56px] py-[18px] items-center justify-center
       sm:grid-cols-1 sm:pl-[0px] sm:py-[0px]">
        <div className='col-span-7 sm:text-center '>
          <ul className="flex space-x-10 sm:space-x-0 sm:flex-col sm:space-y-3 sm:pt-[18px] ">
            <li>
                       <ScrollLink to="about" smooth={true} duration={500} className="cursor-pointer text-black hover:text-gray-400 transition">
                         About
                       </ScrollLink>
                           </li>
                       <li>
                       <ScrollLink to="speakers" smooth={true} duration={500} className="cursor-pointer text-black hover:text-gray-400 transition">
                         Speakers
                       </ScrollLink>
                         </li>
                       <li>
                       <ScrollLink to="sessions" smooth={true} duration={500} className="cursor-pointer text-black hover:text-gray-400 transition">
                       Sessions
                       </ScrollLink>
                       </li>
                       <li>
                       <ScrollLink to="volunteer" smooth={true} duration={500} className="cursor-pointer text-black hover:text-gray-400 transition">
                           Become a Volunteer
                           </ScrollLink>
                           </li>
                       <li><a href="#" className="text-black hover:text-gray-400 transition">Reviews</a></li>
          </ul>
        </div>

        <div className=' flex col-span-5 justify-end pr-[19px] sm:pr-[0px] sm:mt-[36px] space-x-2 sm:space-x-3 sm:text-center sm:justify-center sm:pb-[20px]'>
          <img src="/SocialMediaIcon/LinkedinIcon.svg" alt="not found" className="w-12 h-12" />
          <img src="/SocialMediaIcon/Tiwitter.svg" alt="not found" className="w-12 h-12" />
          <img src="/SocialMediaIcon/Whatapp.svg" alt="not found" className="w-12 h-12" />
        </div>
      </div>
      {/* </div> */}
      <div>

      </div>

    </div>
  )

}

export default Footer