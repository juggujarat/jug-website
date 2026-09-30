import BookYourSlotButton from '../components/BookYourSlotButton'
import ExternalLink from '../components/ui/ExternalLink';

const JugPartners = ({ partners, registrationUrl }) => {
  return (
    <div className="bg-[#FFC0E7] ">
      <div className="container mx-auto xl:max-w-screen-xl  ">
        <div className='pt-[128px] pb-[155px] sm:pt-[50px] sm:pb-[50px]'>
          <div className='mt-[20px] text-center'>
            <h2 className="font-raleway font-medium text-[56px] leading-[62px] sm:text-[32px] sm:leading-[48px] tracking-[0%]">
              Partner JUGs
            </h2>
          </div>
          <div className="grid grid-cols-12 justify-center mt-11 sm:mt-6">
            <div className="col-span-12 flex flex-wrap justify-center gap-x-14 text-center ">
              {partners.map((partner) => (
                <div key={partner.slug} className="flex flex-col items-center max-w-xs sm:mt-5 md:mt-5">
                  <ExternalLink href={partner.website}>
                    <img src={partner.logo} alt={partner.name} loading="lazy" decoding="async" data-aos="zoom-in-up" />
                  </ExternalLink>
                  {/* <p className='font-raleway font-medium mt-5 sm:mb-10 text-[20px] leading-[30px] tracking-[0%] text-black'>
                    {partner.name}
                  </p> */}
                  </div>
              ))}
            </div>
          </div>
            

          <div className='mt-[68px] flex flex-col items-center justify-center '>
            <BookYourSlotButton href={registrationUrl}/>
          </div>
         
        </div>
      </div>
    </div>
  )
}

export default JugPartners