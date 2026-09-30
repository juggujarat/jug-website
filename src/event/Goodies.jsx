import BookYourSlotButton from '../components/BookYourSlotButton'

const Goodies = ({ goodies, registrationUrl }) => {
  return (
    <div className="bg-[#FFFFFF] ">
      <div className="container mx-auto xl:max-w-screen-xl  ">
        <div className='pt-[128px] pb-[155px] sm:pt-[50px] sm:pb-[50px]'>
          <div className='mt-[20px] text-center'>
            <h2 className="font-raleway font-medium text-[56px] leading-[62px] sm:text-[32px] sm:leading-[48px] tracking-[0%]">
              More Than Just Talks
            </h2>
          </div>
          <div className="grid grid-cols-12 justify-center mt-11 sm:mt-6">
            <div className="col-span-12 flex flex-wrap justify-center gap-x-14 text-center ">
              {goodies.map((goodie) => (
              <div key={goodie.text} className="flex flex-col items-center max-w-xs">
                <img src={goodie.image} alt="" width="182" height="188" loading="lazy" decoding="async" data-aos="zoom-in-up"/>
                <p className='font-raleway font-medium text-[20px] leading-[30px] tracking-[0%] text-black'>
                  {goodie.text}
                </p>
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

export default Goodies