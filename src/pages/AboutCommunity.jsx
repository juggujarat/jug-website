import React from 'react'
import About from '../Components/About'

const AboutCommunity = () => {

  return (
    <div className="bg-[#D7FFF1] ">
      <div className="container mx-auto xl:max-w-screen-xl   ">
        <div className='pt-[128px] pb-[155px]'>
          <About
            title="About Community"
            description="Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy."
            buttonText="Join Community"
            imageUrl="/Img/AboutCommunity.png"
          />
        </div>
      </div>
    </div>
  )
}

export default AboutCommunity

