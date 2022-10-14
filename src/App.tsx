import React from 'react';
import './App.css';
import SponsorHome from './sponsor/organism/Home/App';
import HowItWorks from './sponsor/organism/HowItWorks/App';
import FAQ from './sponsor/organism/FAQ/App';
import Levels from './sponsor/organism/Levels/App';
import Events from './sponsor/organism/Events/App';
import { ThemeProvider } from '@mui/system';
import { theme} from './utils/theme';
import SWELogo from './assets/images/graphics/SWE_logo.png';
import Checkout from './sponsor/organism/Checkout/App'
import Inbox from './sponsor/organism/Inbox/App'

import EditFAQ from './admin/organism/EditFAQ/App';
import Dashboard from './admin/organism/Dashboard/App'
import EditEvents from './admin/organism/EditEvents/App'
import PurchaseHistory from './admin/organism/PurchaseHistory/App';
import EditLevels from './admin/organism/EditLevels/App';
import BasicInfo from './admin/organism/BasicInfo/App';



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
            <Route path="/how-it-works" element={<HowItWorks organization={''}/>} />
            <Route path="/faq-swe" element={<FAQ student_org_logo={SWELogo} student_org_name="SWE" />} />
            <Route path="/levels-swe" element={<Levels student_org_logo={SWELogo}/>} />
            <Route path="/events-swe" element={<Events student_org_logo={SWELogo} level_color="ebeaea" level_name='Platinum' total={4250}/>} />
            <Route path="/checkout-swe" element={<Checkout student_org_logo={SWELogo} level_color="ebeaea" level_name='Platinum' total={4250}/>} />
            <Route path="/inbox-swe" element={<Inbox student_org_logo={SWELogo} />} />
            
            <Route path="/faq-edit-swe" element={<EditFAQ student_org_logo={SWELogo} student_org_name="SWE" />} />
            <Route path="/levels-edit-swe" element={<EditLevels student_org_logo={SWELogo} student_org_short_name="swe" student_org_name="Society of Women Engineers"/>} />
          <Route path="/dashboard-swe" element={<Dashboard student_org_logo={SWELogo} sponsor_code="1l2x9gkd/I3GJD!%[" valid_until_date={new Date(2022, 10, 14)} student_org_name="Society of Women Engineers" student_org_short_name="swe" street_address='3127 TAMU' city='College Station' state="TX" zip_code={77843} fund_name="947490-SWE"/>} />
          <Route path="/events-edit-swe" element={<EditEvents student_org_logo={SWELogo} student_org_name="SWE" />} />
          <Route path="/summary-swe" element={<PurchaseHistory student_org_logo={SWELogo}  total_sponsored={50000} />} />
          <Route path="/basic-info-swe" element={<BasicInfo student_org_logo={SWELogo} student_org_short_name="SWE" student_org_name="Society of Women Engineers" street_address='3127 TAMU' city='College Station' state="TX" zipcode={77843} />} />

          </Routes>
      </BrowserRouter>
      </ThemeProvider>



  );
}


export default App;
