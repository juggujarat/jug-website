import React from "react";

const Reviews = () =>{
    return(
        <div className="bg-[#ffc0e7]">
            <div className="container mx-auto 2xl:max-w-screen-2xl">
                <div className='pt-[128px] pb-[100px] sm:pt-[50px] sm:pb-[50px]'>
                    <div className="flex-col justify-center items-center text-center">
                        <h1 className="font-raleway font-medium text-[56px] leading-[65px] sm:text-[24px] sm:leading-[32px]">Reviews That Makes Us
                        <span className="relative inline-block ml-4">
                            Smile
                            <img src="/Experts/squiggly_line.svg" 
                                alt="Squiggly underline" 
                                className="absolute left-1/2 -translate-x-1/2 w-[100%] -mt-2 sm:w-[60px]" />
                            </span>
                        </h1>
                        <div className="relative w-full max-w-10xl mx-auto">
                            <iframe id="testimonial-iframe" src="https://embed-v2.testimonial.to/carousel/all/gujarat-java-user-group-reviews?theme=light&autoplay=off&showmore=on&one-row=on&same-height=on&tag=all&arrowColor=9BA9B4&column-scale=1&cc=off" className="w-full min-h-[700px] sm:min-h-[700px] md:min-h-[700px] lg:min-h-[700px] mt-10"></iframe>
                        </div>
                        <button className="bg-[#FFFFFF] text-black px-7 py-[19px] sm:text-[12px] sm:px-3 sm:py-[6px] rounded-2xl transition border border-black mt-3">
                            View All
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Reviews;