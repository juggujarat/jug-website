import React, { useEffect } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css'; 

const SubmitCFP = () => {

 useEffect(() => {
        AOS.init({
            duration: 1000, 
            // once: true, 
        });
    }, []);

  return (
    <div className="bg-[#C6FFF4] ">
    <div className="container mx-auto 2xl:max-w-screen-2xl  overflow-hidden ">
      <div className='pt-[128px] pb-[100px] sm:pt-[50px] sm:pb-[50px]'>
        <div className="grid grid-cols-1 md:grid-cols-1 sm:grid-cols-1 items-center gap-6">
          {/* Image Section */}
          <div className="flex pl-[200px] sm:pl-[0px] sm:flex-col sm:items-center ">

            <img src="/Img/mice.svg" alt="Speaker Guest" className=" w-[186px] h-[320px] " data-aos="zoom-in-up"/>

            <div className='  ml-[60px] mt-4 sm:ml-[0px] sm:mt-8 sm:text-center  pr-[300px] sm:pr-0'>
              <h1 className="font-raleway font-medium text-[88px] leading-[108px] tracking-[1%] sm:text-[40px] sm:leading-[52px] sm:tracking-[1%] 
             text-black">Submit your CFP today !</h1>
              <img src='/Img/CFPArrow.svg' className='sm:hidden'></img>
               <button
                className="relative bg-black text-white px-[63px] py-[20px] rounded-2xl border-2 border-black overflow-hidden transition-all duration-300 group
                mt-7"
                onClick={() =>
                    window.open(
                        "https://www.papercall.io/community-day-for-java",
                        "_blank",
                        "noopener,noreferrer"
                    )
                }
            >
                {/* Expanding background effect */}
                <span className="absolute inset-0 bg-white scale-y-0 origin-bottom transition-transform duration-300 ease-in-out group-hover:scale-y-100"></span>

                {/* Button text */}
                <span className="relative z-10 text-white group-hover:text-black transition-colors duration-300 font-bold font-raleway text-[18px]">
                Submit Now
                </span>
            </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  )
}

export default SubmitCFP