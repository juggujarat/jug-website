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




function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    
       <Router>
       <Routes>
          <Route path="/" element={
            <>
            <Home/>
           <AboutCommunity></AboutCommunity>
           <Experts></Experts>
           <Sessions></Sessions>
           <BecomeSpeaker></BecomeSpeaker>
           <Volunteer></Volunteer>
           <JoinJug></JoinJug>
           <FooterItem></FooterItem>
          
            </>
            } />

       <Route path="/event" element={
            <>
          <Event></Event>
          <AboutEvent></AboutEvent>
          <Schedule></Schedule>
            </>
            } />
         
        </Routes>
       </Router>
    </>
  )
}

export default App
