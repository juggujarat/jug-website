import React from 'react'

const Sessions = () => {
    return (
        <div className="bg-[#EDD7FF] ">
            <div className="container mx-auto 2xl:max-w-screen-2xl   ">
                <div className='pt-[128px] pb-[100px]'>
                    <div className="flex justify-between items-center">
                        <h1 className="font-raleway font-medium text-[56px] leading-[65px] sm:text-[24px] sm:leading-[34px] ">Our Sessions</h1>
                        <button className="bg-[#FFFFFF] text-black px-[27px] py-[19px] sm:px-[12px] sm:py-[8px] rounded-2xl transition border border-black"
                            onClick={() => window.location.href = 'https://www.youtube.com/@juggujarat'} >
                            View all
                        </button>
                    </div>
                    <div className='grid grid-cols-12 sm:grid-cols-1 mt-[48px] sm:mt-[32px] gap-x-5 sm:gap-x-0 sm:gap-y-10'>
                        <div className=" col-span-6   ">
                            <div className="iframe-container  rounded-lg ">
                                <iframe
                                    src="https://www.youtube.com/embed/65jLZYSIB3A?si=ePFhouw1u49R6grn"
                                    title="YouTube video player"
                                    frameBorder="0"
                                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                                    referrerPolicy="strict-origin-when-cross-origin"
                                    allowFullScreen
                                ></iframe>
                            </div>
                        </div>
                        <div className=" col-span-6 ">
                            <div className="iframe-container  rounded-lg">
                                <iframe
                                    src='https://www.youtube.com/embed/5z53EUXWjtU?si=9BJdbWhAxrAVxi8s'
                                    title="YouTube video player"
                                    frameBorder="0"
                                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                                    referrerPolicy="strict-origin-when-cross-origin"
                                    allowFullScreen
                                ></iframe>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    )
}

export default Sessions