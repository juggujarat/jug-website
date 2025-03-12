import React from "react";
import Header from "./Header";
import { Typewriter } from "react-simple-typewriter";

const Home = () => {
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
                  className="sm:h-10"
                  src="/AvatarIcon/avt01.svg"
                  alt="Avatar 1"
                />
                <img
                  className="sm:h-10"
                  src="/AvatarIcon/avt02.svg"
                  alt="Avatar 2"
                />
                <img
                  className="sm:h-10"
                  src="/AvatarIcon/avt03.svg"
                  alt="Avatar 3"
                />
                <img
                  className="sm:h-10"
                  src="/AvatarIcon/avt04.svg"
                  alt="Avatar 4"
                />
                <img
                  className="sm:h-10"
                  src="/AvatarIcon/avt05.svg"
                  alt="Avatar 4"
                />
              </div>

              {/* Text */}
              <h6 className="text-lg font-semibold text-gray-700 sm:text-[16px]">
                2K+ Active Members
              </h6>
            </div>
          </div>
          <div className="mt-6">
            <h1
              className="text-center text-[88px] font-[500] leading-[103.31px] tracking-normal font-raleway
              sm:text-[24px] "
            >
              Connect, Code, Learn
            </h1>
          </div>

          <div className="flex flex-col items-center justify-center mt-7  relative">
            <div className="flex justify-center relative">
              <img
                src="/Img/SkeletonIcon.png"
                alt="Java Board"
                className="absolute  right-[510px] bottom-0 sm:hidden"
              />
              <img src="/Img/JavaIcon.png" alt="Java Icon" className="mx-4" />
              <img
                src="/Img/ItWork.png"
                alt="Java Cup"
                className="absolute  left-[510px] bottom-0 sm:hidden"
              />
            </div>
            <img
              src="/Img/RocketIcon.png"
              alt="Rocket Icon"
              className="mt-2 sm:hidden"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
