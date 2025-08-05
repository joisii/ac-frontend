// src/App.js
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
import AdminDashboard from './pages/AdminDashboard'; // 💥 Add your dashboard import
import Footer from './pages/Footer';


const Home = () => {
  return (
    <main className="text-center">
      <section id="hero"><HeroSection /></section>
      <section id="about"><AboutUs /></section>
      <section id="sales"><Sales /></section>
      <section id="projects"><Projects /></section>
      <section id="services"><Services /></section>
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

        {/* Page Content */}
        <div className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/projects" element={<Projects />} />
            <Route path="/sales" element={<Sales />} />
            <Route path="/services" element={<Services />} />
            <Route path="/admin/login" element={<AdminLogin />} />          {/* 🔥 Added AdminLogin route */}
            <Route path="/admin/dashboard" element={<AdminDashboard />} />  {/* 🔥 Added AdminDashboard route */}
          </Routes>
        </div>
       <Footer />
      </div>
    </Router>
  );
}

export default App;
