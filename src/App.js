import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Header from './pages/Header';
import Projects from './pages/Projects';
import Sales from './pages/Sales';
import Services from './pages/Services';
import AboutUs from './pages/AboutUs';
import HeroSection from './pages/HeroSection';
import Testimonies from './pages/Testimonies';
import LocationSection from './pages/LocationSection';
import AdminLogin from './pages/AdminLogin';
import AdminDashboard from './pages/AdminDashboard';
import Footer from './pages/Footer';
import GymProjects from "./pages/GymProjects";
import RestaurantProjects from "./pages/RestaurantProjects";
import TextileShopProjects from './pages/TextileShopProjects'; 
import BanquetProjects from './pages/BanquetProjects'; 
import WorshipProjects from "./pages/WorshipProjects";
import SuperMarketProjects from "./pages/SuperMarketProjects";
import HospitalProjects from "./pages/HospitalProjects";
import CorporateOfficeProjects from "./pages/CorporateOfficeProjects";
import ConferenceHallProjects from "./pages/ConferenceHallProjects";


const Home = () => {
  return (
    <main className="text-center">
      <section id="hero"><HeroSection /></section>
      <section id="sales"><Sales /></section>
      <section id="projects"><Projects /></section>
      <section id="services"><Services /></section>
      <section id="about"><AboutUs /></section>
      <section id="testimonials"><Testimonies /></section>
      <section id="location"><LocationSection /></section>
    </main>
  );
};

function App() {
  return (
    <Router>
      <div className="flex flex-col min-h-screen font-sans text-gray-800">
        <Header />
        <div className="flex-grow">
          <Routes>
            {/* Main home page */}
            <Route path="/" element={<Home />} />

            {/* General routes */}
            <Route path="/projects" element={<Projects />} />
            <Route path="/sales" element={<Sales />} />
            <Route path="/services" element={<Services />} />
            <Route path="/admin/login" element={<AdminLogin />} />
            <Route path="/admin/dashboard" element={<AdminDashboard />} />

            {/* Project category pages */}
            <Route path="/projects/gym" element={<GymProjects />} />
            <Route path="/projects/restaurant" element={<RestaurantProjects />} />
            <Route path="/projects/textile" element={<TextileShopProjects />} />
            <Route path="/projects/banquet" element={<BanquetProjects />} />
            <Route path="/projects/worship" element={<WorshipProjects />} />
            <Route path="/projects/supermarket" element={<SuperMarketProjects />} />
            <Route path="/projects/hospital" element={<HospitalProjects />} />
            <Route path="/projects/office" element={<CorporateOfficeProjects />} />
            <Route path="/projects/conference" element={<ConferenceHallProjects />} />
          </Routes>
        </div>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
