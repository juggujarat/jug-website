import React from 'react'

const Schedule = () => {
    return (
        <div className="bg-[#FFFCEF] ">
            <div className="container mx-auto xl:max-w-screen-xl  ">
                <div className='pt-[128px] pb-[155px] sm:pt-[50px] sm:pb-[50px]'>
                    <div className="flex flex-col items-center justify-center">
                        <div className='mt-[20px]'>
                            <h1 className="font-raleway font-medium text-[56px] leading-[62px] sm:text-[36px] sm:leading-[42px] tracking-[0%]">
                                Explore the Event Schedule!
                            </h1>
                        </div>
                        <div className=" mt-[36px] px-[10px] py-0 ">
                            <div className="flex items-center gap-6 sm:flex-col  sm:gap-0 border-b border-black ">

                                <div className="w-[200px] text-left sm:text-center">
                                    <h1 className="font-raleway font-medium text-[24px] leading-[62px] sm:text-[18px] sm:leading-[48px] tracking-[0%]">09:00 - 09:30</h1>
                                </div>

                                {/* Event Details */}
                                <div className="flex-1 sm:text-center">
                                    <h1 className="font-raleway font-bold text-[20px] leading-[36px] sm:text-[18px] sm:leading-[32px] tracking-[0%] text-black">Opening Keynote: The Future of Java</h1>
                                    <p className="font-raleway font-normal text-[16px] leading-[24px]  sm:text-[16px] sm:leading-[36px] tracking-[0%] text-black">Speaker: [Name] | Java Champion</p>
                                </div>
                                <hr class="my-12 sm:my-0 sm:mt-2 h-0.5 border-t-0 bg-neutral-100 dark:bg-white/10" />
                            </div>

                            <div className="flex items-center gap-6 sm:flex-col  sm:gap-0 border-b border-black ">

                            <div className="w-[200px] text-left sm:text-center">
                                <h1 className="font-raleway font-medium text-[24px] leading-[62px] sm:text-[18px] sm:leading-[48px] tracking-[0%]">09:00 - 09:30</h1>
                            </div>

                            {/* Event Details */}
                            <div className="flex-1 sm:text-center">
                                <h1 className="font-raleway font-bold text-[20px] leading-[36px] sm:text-[18px] sm:leading-[32px] tracking-[0%] text-black">Opening Keynote: The Future of Java</h1>
                                <p className="font-raleway font-normal text-[16px] leading-[24px]  sm:text-[16px] sm:leading-[36px] tracking-[0%] text-black">Speaker: [Name] | Java Champion</p>
                            </div>
                            <hr class="my-12 sm:my-0 sm:mt-2 h-0.5 border-t-0 bg-neutral-100 dark:bg-white/10" />
                            </div>

                    <div className="flex items-center gap-6 sm:flex-col  sm:gap-0 border-b border-black ">

                    <div className="w-[200px] text-left sm:text-center">
                        <h1 className="font-raleway font-medium text-[24px] leading-[62px] sm:text-[18px] sm:leading-[48px] tracking-[0%]">09:00 - 09:30</h1>
                    </div>

                    {/* Event Details */}
                    <div className="flex-1 sm:text-center">
                        <h1 className="font-raleway font-bold text-[20px] leading-[36px] sm:text-[18px] sm:leading-[32px] tracking-[0%] text-black">Opening Keynote: The Future of Java</h1>
                        <p className="font-raleway font-normal text-[16px] leading-[24px]  sm:text-[16px] sm:leading-[36px] tracking-[0%] text-black">Speaker: [Name] | Java Champion</p>
                    </div>
                    <hr class="my-12 sm:my-0 sm:mt-2 h-0.5 border-t-0 bg-neutral-100 dark:bg-white/10" />
                    </div>


                        </div>
                        <div className='mt-[41px] '>
                            <button className="bg-[#FFFFFF] text-black px-6 py-4 rounded-2xl transition border border-black">
                                Book Your Slots
                            </button>
                            <h1 className='font-raleway font-medium text-[14px] leading-[100%] tracking-[0%] mt-6 ml-2 text-black'>🔥 Limited Seats Available </h1>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Schedule