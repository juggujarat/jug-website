import React, { useEffect, useState } from 'react';
import BookYourSlotButton from '../Components/BookYourSlotButton';
import scheduleData from '../data/eventScheduleData';
import AOS from 'aos';
import 'aos/dist/aos.css';

const Schedule = () => {
    const [visibleCount, setVisibleCount] = useState(0);

    useEffect(() => {
        AOS.init({ duration: 1000 });

        const interval = setInterval(() => {
            setVisibleCount((prevCount) => {
                if (prevCount < scheduleData.length) {
                    return prevCount + 1;
                } else {
                    clearInterval(interval);
                    return prevCount;
                }
            });
        }, 1000); 

        return () => clearInterval(interval);
    }, []);

    return (
        <div className="bg-[#FFFCEF]">
            <div className="container mx-auto xl:max-w-screen-xl">
                <div className='pt-[128px] pb-[155px] sm:pt-[50px] sm:pb-[50px]'>
                    <div className="flex flex-col items-center justify-center">
                        <div className='mt-[20px] sm:text-center'  data-aos="fade-down">
                            <h1 className="font-raleway font-medium text-[56px] leading-[62px] sm:text-[28px] sm:leading-[36px]">
                                Explore the Event Schedule!
                            </h1>
                        </div>
                        <div className="mt-[36px] px-[10px]">
                            {scheduleData.slice(0, visibleCount).map((event, index) => (
                                <div 
                                    key={index} 
                                    className="flex items-center gap-6 sm:flex-col sm:gap-0 border-b border-black transition-opacity duration-500 opacity-100"
                                    data-aos="fade-down"
                                >
                                    <div className="w-[200px] text-left sm:text-center">
                                        <h1 className="font-raleway font-medium text-[24px] leading-[62px] sm:text-[18px] sm:leading-[48px]">
                                            {event.time}
                                        </h1>
                                    </div>
                                    <div className="flex-1 sm:text-center">
                                        <h1 className="font-raleway font-bold text-[20px] leading-[36px] sm:text-[18px] sm:leading-[32px] text-black">
                                            {event.title}
                                        </h1>
                                        <p className="font-raleway font-normal text-[16px] leading-[24px] sm:text-[16px] sm:leading-[24px] text-black">
                                            {event.description}
                                        </p>
                                    </div>
                                    <hr className="my-12 sm:my-0 sm:mt-2 h-0.5 border-t-0 bg-neutral-100 dark:bg-white/10" />
                                </div>
                            ))}
                        </div>

                        <div className='mt-[41px]'>
                            <BookYourSlotButton />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Schedule;
