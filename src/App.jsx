import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './pages/Header';
import Home from './pages/Home';
import AboutCommunity from './pages/AboutCommunity';
import Experts from './pages/Experts';
import Sessions from './pages/Sessions';
import BecomeSpeaker from './pages/BecomeSpeaker';
import Volunteer from './pages/Volunteer';
import { JoinJug } from './pages/JoinJug';
import FooterItem from './Components/FooterItem';
import Event from './event/Event';
import AboutEvent from './event/AboutEvent';
import Schedule from './event/Schedule';
import Goodies from './event/Goodies';
import Sponsors from './event/Sponsors';
import Team from './event/Team';
import EventVolunteer from './event/EventVolunteer';
import BooKSlots from './event/BooKSlots';
import Reviews from './pages/Reviews';
import SubmitCFP from './pages/SubmitCFP';
import Speaker from './event/Speaker';
import SponsorsshipOpp from './event/SponsorsshipOpp';
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Helmet, HelmetProvider } from 'react-helmet-async';
import EventVenue from './event/EventVenue';




function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <HelmetProvider>
      <Router>
        <Routes>
          <Route path="/" element={
            <>
            <Helmet>
                  <title>Gujarat JUG - Official Community Page</title>
                  <meta
                    name="description"
                    content="Gujarat Java User Group (JUG) is a thriving community of Java developers, tech enthusiasts, and industry professionals. Join us to learn, network, and grow!"
                  />
                  <meta property="og:type" content="website" />
                  <meta property="og:url" content="https://www.gujaratjug.org" />
                  <meta property="og:title" content="Gujarat JUG - Official Community Page" />
                  <meta
                    property="og:description"
                    content="Gujarat Java User Group (JUG) is a thriving community of Java developers, tech enthusiasts, and industry professionals. Join us to learn, network, and grow!"
                  />
                  <meta property="og:image" content="https://www.gujaratjug.org/Home/community-logo.svg" />
                  <meta property="twitter:card" content="summary_large_image" />
                  <meta property="twitter:url" content="https://www.gujaratjug.org" />
                  <meta property="twitter:title" content="Gujarat JUG - Official Community Page" />
                  <meta
                    property="twitter:description"
                    content="Gujarat Java User Group (JUG) is a thriving community of Java developers, tech enthusiasts, and industry professionals. Join us to learn, network, and grow!"
                  />
                  <meta property="twitter:image" content="https://www.gujaratjug.org/Home/community-logo.svg" />
                </Helmet>

              <Home />
              <div id="about">
                <AboutCommunity />
              </div>
              <div id="speakers"> 
              <Experts/>
              </div>
              <div id="sessions">
              <Sessions></Sessions>
              </div>
              {/* <BecomeSpeaker></BecomeSpeaker> */}
               <div id="volunteer">
              <Volunteer></Volunteer>
              </div>
              <div id='reviews'>
                <Reviews></Reviews>
              </div>
              <JoinJug></JoinJug>
              <FooterItem></FooterItem>

            </>
          } />

          <Route path="/community-day-for-java-2025" element={
            <>
            <Helmet>
                  <title>Community Day for Java, 2025 - Ahmedabad - Gujarat's Biggest Java Celebration!</title>
                  <meta
                    name="description"
                    content="Join 300+ Java developers, architects, and tech enthusiasts at Gujarat’s biggest Java event! Expert talks, networking, swags, and more!"
                  />
                  <meta property="og:type" content="website" />
                  <meta property="og:url" content="https://www.gujaratjug.org/community-day-for-java-2025" />
                  <meta
                    property="og:title"
                    content="Community Day for Java, 2025 - Ahmedabad - Gujarat's Biggest Java Celebration!"
                  />
                  <meta
                    property="og:description"
                    content="Join 300+ Java developers, architects, and tech enthusiasts at Gujarat’s biggest Java event! Expert talks, networking, swags, and more!"
                  />
                  <meta property="og:image" content="https://www.gujaratjug.org/Home/community-banner.png" />
                  <meta property="twitter:card" content="summary_large_image" />
                  <meta property="twitter:url" content="https://www.gujaratjug.org/community-day-for-java-2025" />
                  <meta
                    property="twitter:title"
                    content="Community Day for Java, 2025 - Ahmedabad - Gujarat's Biggest Java Celebration!"
                  />
                  <meta
                    property="twitter:description"
                    content="Join 300+ Java developers, architects, and tech enthusiasts at Gujarat’s biggest Java event! Expert talks, networking, swags, and more!"
                  />
                  <meta property="twitter:image" content="https://www.gujaratjug.org/Home/community-banner.png" />
                </Helmet>
              <div>
                <ToastContainer position="bottom-center" autoClose={2000} hideProgressBar closeOnClick />
              </div>
              <Event></Event>
              <div id="about-event">
                <AboutEvent></AboutEvent>
              </div>
              <div id="speakers-event">
                <Speaker/>
              </div>
              <div id="schedule-event">
                <Schedule></Schedule>
              </div>
            
            <EventVenue></EventVenue>
            
              <Goodies></Goodies>
             
              <SubmitCFP></SubmitCFP>
              <div id="sponsors-event">
                <Sponsors></Sponsors>
              </div>
              <SponsorsshipOpp></SponsorsshipOpp>
              
            
          
              <div id="team-event">
              <EventVolunteer></EventVolunteer>
              </div>
              <BooKSlots></BooKSlots>
              <FooterItem></FooterItem>
            </>
          } />

        </Routes>
      </Router>
      </HelmetProvider>
    </>
  )
}

export default App
