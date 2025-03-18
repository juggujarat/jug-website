import React, { useState } from "react";
import { FiMenu, FiX } from "react-icons/fi";
import { Link } from "react-router-dom";
import { Link as ScrollLink } from "react-scroll";
import navLinksForEvent from "../data/navLinksForEvent";
import BookYourSlotButton from "../Components/BookYourSlotButton";

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* Large screens (md and above) */}
     <div className="container mx-auto">
      <header className="grid grid-cols-12 items-center   text-white sm:hidden  justify-center">
        {/* Logo Section */}
        <div className="col-span-2  pb-3">
          <Link to="/">
            <img src="/Img/Event_logo.png" alt="Logo" />
          </Link>
        </div>

        {/* Navigation Section */}
        <nav className="col-span-7 flex pl-[136px]  pb-3">
          <ul className="flex space-x-10">
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
                    target="_blank"
                    to={to}                    
                    className="cursor-pointer text-black hover:text-gray-400 transition"
                  >
                    {text}
                  </Link>
                )}
              </li>
            ))}
          </ul>
        </nav>

        {/* Button Section */}
        <div className="col-span-3 flex justify-end  pt-3">
          <div>
            <BookYourSlotButton/>
            
          </div>
          
        </div>
      </header>

      {/* Mobile screens (sm) */}
      <header className="xl:hidden md:hidden lg:hidden px-1 py-2 flex justify-between items-center bg-white   bg-transparent">
        {/* Logo Section */}
        <div>
          <Link to="/">
            <img src="/Img/JugIconSm.svg" alt="Logo" className="" />
          </Link>
        </div>

        {/* Menu Toggle Button */}
        <button onClick={() => setIsOpen(!isOpen)} className="text-black flex flex-col gap-1">
  {isOpen ? (
   <FiX size={28} />
  ) : (
    <>
      <div className="w-5 h-0.5 bg-black"></div>
      <div className="w-5 h-0.5 bg-black"></div>
    </>
  )}
</button>

        {/* Mobile Menu */}
        {isOpen && (
          <nav className="absolute top-16 left-0 w-full bg-white p-4 shadow-lg rounded-lg z-[50] mt-2">
            <ul className="flex flex-col space-y-3">
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
                    target="_blank"
                    to={to}                    
                    className="cursor-pointer text-black hover:text-gray-400 transition"
                  >
                    {text}
                  </Link>
                )}
              </li>
            ))}
            </ul>
            <button
              className="bg-black text-white px-5 py-2 rounded-lg transition hover:bg-gray-800 w-full mt-3"
              onClick={() =>
                window.open(
                  "https://linktr.ee/juggujarat",
                  "_blank",
                  "noopener,noreferrer"
                )
              }
            >
              Book Your Slots
            </button>
          </nav>
        )}
      </header>
      </div>
    </>
  );
};

export default Header;
