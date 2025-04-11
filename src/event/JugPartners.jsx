import React, { useEffect } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css'; 
import BookYourSlotButton from '../Components/BookYourSlotButton'
import partners from "../data/eventPartners"

const JugPartners = () => {

  
   useEffect(() => {
          AOS.init({
              duration: 1000, 
              // once: true, 
          });
      }, []);


  return (
    <div className="bg-[#FFC0E7] ">
      <div className="container mx-auto xl:max-w-screen-xl  ">
        <div className='pt-[128px] pb-[155px] sm:pt-[50px] sm:pb-[50px]'>
          <div className='mt-[20px] text-center'>
            <h1 className="font-raleway font-medium text-[56px] leading-[62px] sm:text-[32px] sm:leading-[48px] tracking-[0%]">
              Partnering JUGs Across India
            </h1>
          </div>
          <div className="grid grid-cols-12 justify-center mt-11 sm:mt-6">
            <div className="col-span-12 flex flex-wrap justify-center gap-x-14 text-center ">
              {partners.map((partner, index) => (
                <div key={partner.id} className="flex flex-col items-center max-w-xs">
                  <img src={partner.image} alt={partner.name} data-aos="zoom-in-up" className='cursor-pointer rounded-[25px] overflow-hidden p-5 bg-white' onClick={() => window.open(partner.link, "noopener", "noreferrer")}/>
                  <p className='font-raleway font-medium mt-5 sm:mb-10 text-[20px] leading-[30px] tracking-[0%] text-black'>
                    {partner.name}
                  </p>
                  </div>
              ))}
            </div>
          </div>
            

          <div className='mt-[68px] flex flex-col items-center justify-center '>
            <BookYourSlotButton/>
          </div>
         
        </div>
      </div>
    </div>
  )
}

export default JugPartners