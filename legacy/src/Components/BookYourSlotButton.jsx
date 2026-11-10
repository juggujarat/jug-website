import React from 'react'

function BookYourSlotButton() {
    return (
        <>
            <button
                className="relative bg-black text-white px-[48px] py-[20px] sm:px-[24px] sm:py-[12px] rounded-2xl border-2 border-black overflow-hidden transition-all duration-300 group"
                onClick={() =>
                    window.open(
                        "https://konfhub.com/community-day-for-java-2025",
                        "_blank",
                        "noopener,noreferrer"
                    )
                }
            >
                {/* Expanding background effect */}
                <span className="absolute inset-0 bg-white scale-y-0 origin-bottom transition-transform duration-300 ease-in-out group-hover:scale-y-100"></span>

                {/* Button text */}
                <span className="relative z-10 text-white group-hover:text-black transition-colors duration-300 font-raleway text-[18px] leading-[24px] sm:text-[14px] 
                 sm:leading-[18px] font-bold">
                    Book Your Slots
                </span>
            </button>
            <h1 className='font-raleway font-medium text-[14px] leading-[100%] tracking-[0%] mt-3 text-center text-black' >Limited Seats Available </h1>
        </>
    )
}
export default BookYourSlotButton