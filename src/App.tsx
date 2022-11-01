import React from 'react';
import './App.css';
import SponsorHome from './sponsor/organism/Home/App';
import HowItWorks from './sponsor/organism/HowItWorks/App';
import FAQ from './sponsor/organism/FAQ/App';
import Levels from './sponsor/organism/Levels/App';
import Events from './sponsor/organism/Events/App';
import { ThemeProvider } from '@mui/system';
import { theme } from './utils/theme';
import Checkout from './sponsor/organism/Checkout/App'
import Inbox from './sponsor/organism/Inbox/App'
import CartProvider from './contexts/Cart'
import { Auth0Provider } from '@auth0/auth0-react';

import EditFAQ from './admin/organism/EditFAQ/App';
import Dashboard from './admin/organism/Dashboard/App'
import EditEvents from './admin/organism/EditEvents/App'
import PurchaseHistory from './admin/organism/PurchaseHistory/App';
import EditLevels from './admin/organism/EditLevels/App';
import BasicInfo from './admin/organism/BasicInfo/App';

import AdminLogin from './admin/organism/Home/App';
import CheckBackLater from './sponsor/organism/HowItWorksCopy/App'

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
            <Route path="/how-it-works" element={<HowItWorks />} />
            <Route path="/faq" element={<FAQ />} />
            <Route path="/levels" element={<Levels />} />
            <Route path="/events" element={<Events />} />
            <Route path="/checkout" element={<Checkout />} />
            <Route path="/inbox" element={<Inbox />} />
            <Route path="/check-back-later" element={<CheckBackLater />} />

            <Route path="/faq-edit" element={<EditFAQ />} />
          
            <Route path="/admin-login" element={<AdminLogin/>} />
            <Route path="/levels-edit" element={<EditLevels />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/events-edit" element={<EditEvents />} />
            <Route path="/summary" element={<PurchaseHistory />} />
            <Route path="/basic-info" element={<BasicInfo />} />

          </Routes>

        </BrowserRouter>
      </ThemeProvider>
    </CartProvider>



  );
}


export default App;
