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
      <header className="grid grid-cols-12 items-center px-8 py-4 text-white sm:hidden">
        {/* Logo Section */}
        <div className="col-span-2">
          <Link to="/">
            <img src="/Img/Event_logo.png" alt="Logo" />
          </Link>
        </div>

        {/* Navigation Section */}
        <nav className="col-span-8 flex pl-[130px]">
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
        <div className="col-span-2 flex justify-end">
          <div>
            <BookYourSlotButton/>
          </div>
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
          <nav className="absolute top-16 left-0 w-full bg-white p-4 shadow-lg rounded-lg">
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
    </>
  );
};

export default Header;
