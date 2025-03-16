import React from 'react'
import FooterItem from '../Components/FooterItem'
import { Link as ScrollLink } from "react-scroll";
import navLinksForEvent from '../data/navLinksForEvent';
import { Link } from 'react-router-dom';

function Footer() {
  return (
    <div>
      {/* <div className="container mx-auto xl:max-w-screen-xl px-4  "> */}
      <div className="grid grid-cols-12  bg-[#FFFFFF] border border-black rounded-[40px] pl-[56px] py-[18px] items-center justify-center
       sm:grid-cols-1 sm:pl-[0px] sm:py-[0px]">
        <div className='col-span-7 sm:text-center '>
          <ul className="flex space-x-10 sm:space-x-0 sm:flex-col sm:space-y-3 sm:pt-[18px] ">
            {navLinksForEvent.map(({ text, to, isScrollLink }, index) => (
              <li key={index}>
                {isScrollLink ? (
                  <ScrollLink
                    to={to}
                    smooth={true}
                    duration={500}
                    className="cursor-pointer text-black hover:text-gray-400 transition"
                  >
                    {text}
                  </ScrollLink>
                ) : (
                  <Link
                    to={to}
                    target="_blank"
                    className="cursor-pointer text-black hover:text-gray-400 transition"
                  >
                    {text}
                  </Link>
                )}
              </li>
            ))}
          </ul>
        </div>

        <div className=' flex col-span-5 justify-end pr-[19px] sm:pr-[0px] sm:mt-[36px] space-x-2 sm:space-x-3 sm:text-center sm:justify-center sm:pb-[20px]'>
          <img src="/SocialMediaIcon/LinkedinIcon.svg" alt="not found" className="w-12 h-12 transition-transform duration-300 hover:scale-110 hover:shadow-lg hover:opacity-80 cursor-pointer" onClick={() => window.open("https://www.linkedin.com/company/juggujarat/", "_blank", "noopener,noreferrer")} />
          <img src="/SocialMediaIcon/Twitter.svg" alt="not found" className="w-12 h-12 transition-transform duration-300 hover:scale-110 hover:shadow-lg hover:opacity-80 cursor-pointer" onClick={() => window.open("https://x.com/juggujarat", "_blank", "noopener,noreferrer")} />
          <img src="/SocialMediaIcon/Whatsapp.svg" alt="not found" className="w-12 h-12 transition-transform duration-300 hover:scale-110 hover:shadow-lg hover:opacity-80 cursor-pointer" onClick={() => window.open("https://chat.whatsapp.com/I3W75ItQTNs7Hr7WzRWcPR", "_blank", "noopener,noreferrer")} />
        </div>
      </div>
      {/* </div> */}
      <div>

      </div>

    </div>
  )

}

export default Footer