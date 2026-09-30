import { GoArrowUpRight } from "react-icons/go";
import ExternalLink from "../components/ui/ExternalLink";

function BooKSlots({ name, registrationUrl }) {
  return (
    <div className="bg-[#FFFCEF]">
      <div className="container mx-auto 2xl:max-w-screen-2xl ">
        <div className="pt-[128px] pb-[100px] sm:pt-[80px]">
          <div className="grid grid-cols-1 sm:grid-cols-1">
            <div className="bg-[#EDD7FF] py-[60px]  sm:py-[50px] sm:px-[25px]  border border-black rounded-[40px] px-[50px]">
              <div className="grid grid-cols-12 items-center sm:text-center">
                {/* Left Section (8 Columns) */}
                <div className="  col-span-9 sm:grid-cols-1 sm:col-span-12">
                  {/* <div className=' border border-black'> */}
                  <h2 className="font-raleway font-bold text-[85px] leading-[99px] sm:text-[26px] sm:leading-[40px] tracking-[1%]  mr-[250px] sm:mr-0">
                    Book Your Ticket Today!
                  </h2>
                  {/* </div> */}
                  <div className="  mt-4 ">
                    <p className="font-raleway font-medium text-[24px] leading-[28px] sm:text-[16px] sm:leading-[24px] tracking-[1%]">
                      Join top Java experts, developers, and tech leaders for a day of learning, networking, and innovation at {name}!
                    </p>

                  </div>
                </div>

                {/* Right Section (4 Columns) */}
                <div className="flex justify-center col-span-3 sm:mt-7 sm:flex sm:items-center sm:justify-center sm:col-span-12">
                  <ExternalLink
                    href={registrationUrl}
                    srLabel={`Book your ticket for ${name}`}
                    className="bg-white rounded-full py-[81px] px-[81px] sm:py-[20px] sm:px-[20px] border border-black flex items-center justify-center transition-all duration-300 hover:bg-black group"
                  >
                    {/* Arrow icon with hover effects */}
                    <GoArrowUpRight aria-hidden="true" className="text-gray-800 text-[60px] sm:text-[20px] transition-transform duration-300 group-hover:-translate-y-2 group-hover:translate-x-2 group-hover:text-white" />
                  </ExternalLink>
                </div>

              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default BooKSlots
