import React from 'react';
import logo from './logo.svg';
import './App.css';
import SponsorHome from './sponsor/organism/Home/App';
import HowItWorks from './sponsor/organism/HowItWorks/App';
import { ThemeProvider } from '@mui/system';
import { theme,} from './utils/theme';


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
          </Routes>
      </BrowserRouter>
      </ThemeProvider>



  );
}


export default App;
