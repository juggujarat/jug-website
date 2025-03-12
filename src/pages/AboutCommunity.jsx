import React from "react";
import About from "../Components/About";

const AboutCommunity = () => {
  return (
    <div className="bg-[#D7FFF1] ">
      <div className="container mx-auto xl:max-w-screen-xl   ">
        <div className="pt-[128px] pb-[155px]">
          <About
            title="About Community"
            description={[
              "Gujarat JUG - Community Day 2025 is our flagship annual tech event dedicated to fostering knowledge-sharing, networking, and professional growth within the Java ecosystem.",
              "Join Java professionals, tech leaders, and aspiring developers for insightful sessions, hands-on workshops, and opportunities to connect with like-minded enthusiasts.",
            ]}
            buttonText="Join Community"
            imageUrl="/Img/AboutCommunity.png"
          />
        </div>
      </div>
    </div>
  );
};

export default AboutCommunity;
