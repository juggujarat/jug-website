import { site } from '../content';
import ExternalLink from '../components/ui/ExternalLink';

const EventVolunteer = ({ volunteers }) => {


  return (
    <div className="bg-[#FFFFFF] overflow-x-clip">
    <div className="container mx-auto 2xl:max-w-screen-2xl   ">
      <div className='pt-[128px] pb-[100px] sm:pt-[50px] sm:pb-[50px]'>
        <div className="flex justify-between items-center sm:flex-col">
          <h2 className="font-raleway font-medium text-[56px] leading-[65px] sm:text-[20px] sm:leading-[24px]">Our Rockstar Volunteer</h2>
          <ExternalLink
                className="relative inline-block bg-black text-white px-7 py-[19px] sm:text-[12px] sm:px-3 sm:py-[6px] rounded-2xl border-2 border-black overflow-hidden transition-all duration-300 group
                mt-7 sm:mt-4"
                href={site.volunteerFormUrl}
            >
                {/* Expanding background effect */}
                <span className="absolute inset-0 bg-white scale-y-0 origin-bottom transition-transform duration-300 ease-in-out group-hover:scale-y-100"></span>

                {/* Button text */}
                <span className="relative z-10 text-white group-hover:text-black transition-colors duration-300 font-bold font-raleway text-[18px] sm:text-[12px]">
                Become a Volunteer
                </span>
            </ExternalLink>
        </div>

        <div className="grid xl:grid-cols-6 lg:grid-cols-5 sm:grid-cols-2 md:grid-cols-4 gap-y-11 gap-x-6 sm:gap-x-5 sm:gap-12 pt-[48px] sm:pt-[32px]">
          {volunteers.map((expert) => (
            <div key={expert.name} className="justify-items-center text-center" data-aos="fade-right">
               <img src={expert.image} alt="" width="186" height="193" loading="lazy" decoding="async" className="h-auto sm:w-[320px]" />
                <h3 className="pt-6 font-raleway font-bold text-[18px] leading-[22px] sm:text-[12px] sm:leading-[18px] sm:pt-3">
                  {expert.linkedin ? (
                    <ExternalLink href={expert.linkedin} className="hover:underline underline-offset-4">{expert.name}</ExternalLink>
                  ) : expert.name}
                </h3>
                <p className="text-black font-raleway font-normal text-[14px] leading-[21px] pt-2 sm:text-[12px] sm:leading-[18px] sm:pt-1">{expert.role}</p>
                <p className='text-black font-raleway font-bold text-[12px] leading-[20px] pt-2 sm:pt-1'>{expert.company}</p>

            </div>
          ))}
        </div>


      </div>
    </div>
  </div>
  )
}

export default EventVolunteer