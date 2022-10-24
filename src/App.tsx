import React from 'react';
import './App.css';
import SponsorHome from './sponsor/organism/Home/App';
import HowItWorks from './sponsor/organism/HowItWorks/App';
import FAQ from './sponsor/organism/FAQ/App';
import Levels from './sponsor/organism/Levels/App';
import Events from './sponsor/organism/Events/App';
import { ThemeProvider } from '@mui/system';
import { theme } from './utils/theme';
import SWELogo from './assets/images/graphics/SWE_logo.png';
import Checkout from './sponsor/organism/Checkout/App'
import Inbox from './sponsor/organism/Inbox/App'
import CartProvider from './contexts/Cart'


import EditFAQ from './admin/organism/EditFAQ/App';
import Dashboard from './admin/organism/Dashboard/App'
import EditEvents from './admin/organism/EditEvents/App'
import PurchaseHistory from './admin/organism/PurchaseHistory/App';
import EditLevels from './admin/organism/EditLevels/App';
import BasicInfo from './admin/organism/BasicInfo/App';

import AdminLogin from './admin/organism/Home/App';


import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";



const App: React.FC = () => {
  return (
    <CartProvider>
      <ThemeProvider theme={theme}>
        <BrowserRouter basename={`/${process.env.PUBLIC_URL}`}>

          <Routes>
            <Route path="/" element={<SponsorHome />} />
            <Route path="/how-it-works" element={<HowItWorks organization={''} />} />
            <Route path="/faq" element={<FAQ />} />
            <Route path="/levels" element={<Levels />} />
            <Route path="/events" element={<Events level_color="ebeaea" level_name='Platinum' total={4250}/>} />
            <Route path="/checkout" element={<Checkout student_org_logo={SWELogo} level_color="ebeaea" level_name='Platinum' total={4250}/>} />
            <Route path="/inbox" element={<Inbox />} />

            <Route path="/faq-edit-swe" element={<EditFAQ student_org_logo={SWELogo} student_org_name="SWE" />} />
          
            <Route path="/admin-login" element={<AdminLogin/>} />
            <Route path="/levels-edit" element={<EditLevels student_org_logo={SWELogo} />} />
            <Route path="/dashboard-swe" element={<Dashboard sponsor_code="1l2x9gkd/I3GJD!%[" valid_until_date={new Date(2022, 10, 14)} student_org_short_name="swe" street_address='3127 TAMU' city='College Station' state="TX" zip_code={77843} fund_name="947490-SWE"/>} />
            <Route path="/events-edit" element={<EditEvents student_org_logo={SWELogo} />} />
            <Route path="/summary-swe" element={<PurchaseHistory student_org_logo={SWELogo}  total_sponsored={50000} />} />
            <Route path="/basic-info-swe" element={<BasicInfo student_org_logo={SWELogo} student_org_short_name="SWE" student_org_name="Society of Women Engineers" street_address='3127 TAMU' city='College Station' state="TX" zipcode={77843} />} />

          </Routes>

        </BrowserRouter>
      </ThemeProvider>
    </CartProvider>



  );
}


export default App;
