import React, { useEffect } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css'; 
import Header from "./Header";
import { Typewriter } from "react-simple-typewriter";

const Home = () => {

  useEffect(() => {
    AOS.init({
        duration: 1000, 
    });
}, []);

  return (
    <div className="bg-[#E1EEFB] ">
      <div className="container mx-auto xl:max-w-screen-xl  sm:max-w-[345px] ">
        <Header />
        <div className="pt-12 pb-11">
          <div className="grid grid-cols-1 justify-center items-center sm:grid-cols-1">
            <div className="flex items-center justify-center space-x-4 mt-4">
              {/* Avatars */}
              <div className="flex -space-x-4 rtl:space-x-reverse sm:items-center ">
                <img
                  className="sm:h-10 sm:w-10 w-[50px] h-[50px] rounded-full border border-black"
                  src="/AvatarIcon/Av1.jpeg"
                  alt="Avatar 1"
                />
                <img
                  className="sm:h-10 sm:w-10 w-[50px] h-[50px] rounded-full border border-black"
                  src="/AvatarIcon/Av2.jpeg"
                  alt="Avatar 2"
                />
               <img
                  className="sm:h-10 sm:w-10 w-[50px] h-[50px] rounded-full border border-black"
                  src="/AvatarIcon/Av3.jpeg"
                  alt="Avatar 3"
                />
              <img
                  className="sm:h-10 sm:w-10 w-[50px] h-[50px] rounded-full border border-black"
                  src="/AvatarIcon/Av4.jpeg"
                  alt="Avatar 4"
                />
                <img
                  className="sm:h-10 sm:w-10 w-[50px] h-[50px] rounded-full border border-black"
                  src="/AvatarIcon/Av5.jpeg"
                  alt="Avatar 5"
                />
              </div>

              {/* Text */}
              <h6 className="text-lg font-semibold text-gray-700 sm:text-[12px]">
                500 Active Members
              </h6>
            </div>
          </div>
          <div className="mt-6 sm:mt-2">
            <h1
              className="text-center text-[88px] font-[500] leading-[103.31px] tracking-normal font-raleway
              sm:text-[24px] "
            >
              <Typewriter
          words={['Connect , Code , Learn']}
          loop={0} // Infinite loop
          cursor
          cursorStyle="|"
          typeSpeed={100}
          deleteSpeed={50}
          delaySpeed={800}
        />
            </h1>
          </div>

          <div className="flex flex-col items-center justify-center mt-7  relative">
            <div className="flex justify-center relative">
              <img
                src="/Img/SkeletonIcon.png"
                alt="Java Board"
                className="absolute  right-[550px] bottom-0 top-16 sm:hidden"
               data-aos="fade-right"
              />
              <img src="/Img/duke-logo-svg.svg" alt="Java Icon" className="mx-4"  data-aos="zoom-in-up"/>
              <img
                src="/Img/ItWork.png"
                alt="Java Cup"
                className="absolute  left-[550px] bottom-0 top-16 sm:hidden"
                data-aos="fade-left"
              />
            </div>
            {/* <img
              src="/Img/RocketIcon.png"
              alt="Rocket Icon"
              className="mt-2 sm:hidden"
            /> */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
