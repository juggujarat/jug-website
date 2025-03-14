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
              "Gujarat Java User Group (Gujarat JUG) is a thriving community of Java developers, architects, students, and technology enthusiasts passionate about learning, sharing, and growing together.",
              "Our mission is to empower Java professionals, promote best practices, and create a platform where developers can connect, collaborate, and innovate.",
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
