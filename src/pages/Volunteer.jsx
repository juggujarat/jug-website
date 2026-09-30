import volunteer from '../data/volunteerData';
import { site } from '../content';
import Button from '../components/ui/Button';


const Volunteer = () => {


  return (
    <div className="bg-[#CAF8FC] ">
      <div className="container mx-auto 2xl:max-w-screen-2xl   ">
        <div className='pt-[128px] pb-[100px] sm:pt-[50px] sm:pb-[50px]'>
          <div className="flex justify-between items-center sm:flex-col">
            <h2 className="font-raleway font-medium text-[56px] leading-[65px] sm:text-[24px] sm:leading-[32px]">The Heart of Our Team</h2>
            <Button href={site.volunteerFormUrl} className="sm:mt-3">Become a Volunteer</Button>
          </div>

          <div className="grid grid-cols-4 sm:grid-cols-2 gap-x-2 gap-y-8 sm:gap-x-6 pt-[48px] sm:pt-[36px]">
            {volunteer.map((expert,index) => (
              <div key={expert.id} className="sm:text-center" data-aos="fade-right"   data-aos-delay={`${index * 200}`}>
                <img src={expert.image} alt={expert.name} width="285" height="296" loading="lazy" decoding="async" className=" sm:w-[320px]" />
                <h3 className="pt-6 sm:pt-3 font-raleway font-bold text-[24px] leading-[28px] sm:text-[14px] sm:leading-[20px]">{expert.name}</h3>
                <p className="text-gray-600 font-raleway font-normal text-[16px] leading-[18px]  sm:text-[12px] sm:leading-[18px] pt-2 sm:pt-1">{expert.expertise} <strong className='text-black-600'>{expert.profession}</strong></p>
              </div>
            ))}
          </div>


        </div>
      </div>
    </div>

  )
}

export default Volunteer