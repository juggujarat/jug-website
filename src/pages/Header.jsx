import React, { useState } from "react";
import { FiMenu, FiX } from "react-icons/fi";
import { Link } from "react-router-dom";
import { Link as ScrollLink } from "react-scroll";

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* Large screens (md and above) */}
      <header className="grid grid-cols-12 items-center  py-4 text-white sm:hidden">
        {/* Logo Section */}
        <div className="col-span-2">
          <Link to="/">
          <img src="/Img/Event_logo.png" alt="Logo" />
          </Link>
        </div>

        {/* Navigation Section */}
        <nav className="col-span-8 flex pl-[92px]">
          <ul className="flex space-x-9">
            <li>
              <ScrollLink
                to="about"
                smooth={true}
                duration={500}
                className="cursor-pointer text-black hover:text-gray-400 transition text-[16px]"
              >
                About
              </ScrollLink>
            </li>
            <li>
              <ScrollLink
                to="speakers"
                smooth={true}
                duration={500}
                className="cursor-pointer text-black hover:text-gray-400 transition text-[16px]"
              >
                Speakers
              </ScrollLink>
            </li>
            <li>
              <ScrollLink
                to="sessions"
                smooth={true}
                duration={500}
                className="cursor-pointer text-black hover:text-gray-400 transition text-[16px]"
              >
                Sessions
              </ScrollLink>
            </li>
            <li>
              <ScrollLink
                to="volunteer"
                smooth={true}
                duration={500}
                className="cursor-pointer text-black hover:text-gray-400 transition text-[16px]"
              >
                Become a Volunteer
              </ScrollLink>
            </li>
            <li>
            <ScrollLink
                to="reviews"
                smooth={true}
                duration={500}
                className="cursor-pointer text-black hover:text-gray-400 transition text-[16px]"
              >
                Reviews
              </ScrollLink>
            </li>
            <li>
            <Link 
                to="/community-day-for-java-2025"
               
                className="cursor-pointer text-black hover:text-gray-400 transition text-[16px]"
              >
                Community Day
              </Link>
            </li>
          </ul>
        </nav>

        {/* Button Section */}
        <div className="col-span-2 flex justify-end">
          <button
            className="relative px-7 py-5 font-medium text-black border-2 border-black rounded-lg bg-white overflow-hidden transition-all duration-300 group"
            onClick={() =>
              window.open(
                "https://linktr.ee/juggujarat",
                "_blank",
                "noopener,noreferrer"
              )
            }
          >
            {/* Expanding background effect */}
            <span className="absolute inset-0 bg-black scale-y-0 origin-bottom transition-transform duration-300 ease-in-out group-hover:scale-y-100"></span>

            {/* Button text (placed above the background) */}
            <span className="relative z-10 text-black group-hover:text-white transition-colors duration-300">
              Join Community
            </span>
          </button>
        </div>
      </header>

      {/* Mobile screens (sm) */}
      <header className="xl:hidden md:hidden lg:hidden px-4 py-3 flex justify-between items-center bg-white shadow-md  ">
        {/* Logo Section */}
        <div>
          <Link to="/">
            <img src="/Img/JugIcon.svg" alt="Logo" className="w-8 h-8" />
          </Link>
        </div>

        {/* Menu Toggle Button */}
        <button onClick={() => setIsOpen(!isOpen)} className="text-black">
          {isOpen ? <FiX size={28} /> : <FiMenu size={28} />}
        </button>

        {/* Mobile Menu */}
        {isOpen && (
          <nav className="absolute top-16 left-0 w-full bg-white p-4 shadow-lg rounded-lg z-[50]">
            <ul className="flex flex-col space-y-3">
              <li>
              <ScrollLink
                to="about"
                smooth={true}
                duration={500}
                className="cursor-pointer text-black hover:text-gray-400 transition text-[16px]"
              >
                About
              </ScrollLink>
              </li>
              <li>
              <ScrollLink
                to="speakers"
                smooth={true}
                duration={500}
                className="cursor-pointer text-black hover:text-gray-400 transition text-[16px]"
              >
                Speakers
              </ScrollLink>
              </li>
              <li>
              <ScrollLink
                to="sessions"
                smooth={true}
                duration={500}
                className="cursor-pointer text-black hover:text-gray-400 transition text-[16px]"
              >
                Sessions
              </ScrollLink>
              </li>
              <li>
              <ScrollLink
                to="volunteer"
                smooth={true}
                duration={500}
                className="cursor-pointer text-black hover:text-gray-400 transition text-[16px]"
              >
                Become a Volunteer
              </ScrollLink>
              </li>
              <li>
              <ScrollLink
                to="reviews"
                smooth={true}
                duration={500}
                className="cursor-pointer text-black hover:text-gray-400 transition text-[16px]"
              >
                Reviews
              </ScrollLink>
              </li>
              <li>
              <Link 
                to="/community-day-for-java-2025"
               
                className="cursor-pointer text-black hover:text-gray-400 transition text-[16px]"
              >
                Community Day
              </Link>
              </li>
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
              Join Community
            </button>
          </nav>
        )}
      </header>
    </>
  );
};

export default Header;
