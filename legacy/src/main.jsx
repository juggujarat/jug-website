import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import "./index.css";
import '@fontsource/raleway'; 
import '@fontsource/raleway/600.css'; 
import '@fontsource/raleway/500.css'; 
import '@fontsource/raleway/700.css'; 
import "@fortawesome/fontawesome-free/css/all.min.css";
import '@fontsource/roboto'; 
import '@fontsource/archivo-black';
import AOS from 'aos';
import 'aos/dist/aos.css';

AOS.init();


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
