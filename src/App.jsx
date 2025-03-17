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





function App() {
  const [count, setCount] = useState(0)

  return (
    <>

      <Router>
        <Routes>
          <Route path="/" element={
            <>
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
    </>
  )
}

export default App
