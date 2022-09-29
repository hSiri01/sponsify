import React from 'react';
import './App.css';
import SponsorHome from './sponsor/organism/Home/App';
import HowItWorks from './sponsor/organism/HowItWorks/App';
import FAQ from './sponsor/organism/FAQ/App';
import Levels from './sponsor/organism/Levels/App';
import { ThemeProvider } from '@mui/system';
import { theme} from './utils/theme';
import SWELogo from './assets/images/graphics/SWE_logo.png';


import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";


const App: React.FC = () => {
  return (
     <ThemeProvider theme={theme}>
      <BrowserRouter basename={`/${process.env.PUBLIC_URL}`}>
          <Routes>
            <Route path="/" element={<SponsorHome/>} />
            <Route path="/how-it-works" element={<HowItWorks/>} />
          <Route path="/faq-swe" element={<FAQ student_org_logo={SWELogo} />} />
          <Route path="/levels-swe" element={<Levels student_org_logo={SWELogo}/>} />
          </Routes>
      </BrowserRouter>
      </ThemeProvider>



  );
}


export default App;
