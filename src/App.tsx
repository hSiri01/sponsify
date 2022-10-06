import React from 'react';
import './App.css';
import SponsorHome from './sponsor/organism/Home/App';
import HowItWorks from './sponsor/organism/HowItWorks/App';
import FAQ from './sponsor/organism/FAQ/App';
import EditFAQ from './admin/organism/EditFAQ/App';
import Levels from './sponsor/organism/Levels/App';
import Events from './sponsor/organism/Events/App';
import { ThemeProvider } from '@mui/system';
import { theme} from './utils/theme';
import SWELogo from './assets/images/graphics/SWE_logo.png';
import Checkout from './sponsor/organism/Checkout/App'
import Inbox from './sponsor/organism/Inbox/App'


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
            <Route path="/faq-swe" element={<FAQ student_org_logo={SWELogo} student_org_name="SWE" />} />
            <Route path="/levels-swe" element={<Levels student_org_logo={SWELogo}/>} />
            <Route path="/events-swe" element={<Events student_org_logo={SWELogo} level_color="ebeaea" level_name='Platinum' total={4250}/>} />
            <Route path="/checkout-swe" element={<Checkout student_org_logo={SWELogo} level_color="ebeaea" level_name='Platinum' total={4250}/>} />
            <Route path="/inbox-swe" element={<Inbox student_org_logo={SWELogo} />} />
          <Route path="/faq-edit-swe" element={<EditFAQ student_org_logo={SWELogo} student_org_name="SWE" />} />

          </Routes>
      </BrowserRouter>
      </ThemeProvider>



  );
}


export default App;
