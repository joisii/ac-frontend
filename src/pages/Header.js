import React, { useState, useEffect } from 'react';
import { FaBars, FaTimes } from 'react-icons/fa';
import { motion, AnimatePresence } from 'framer-motion';
import { useLocation, useNavigate } from 'react-router-dom';

const Header = () => {
  const [activeSection, setActiveSection] = useState(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const sections = ['hero', 'about', 'projects', 'sales', 'services', 'testimonials', 'location'];

    const handleScroll = () => {
      if (location.pathname !== '/') {
        setActiveSection(null); // no highlight on other pages
        return;
      }

      let found = 'hero';
      const offset = 140;
      sections.forEach(id => {
        const el = document.getElementById(id);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= offset && rect.bottom >= offset) {
            found = id;
          }
        }
      });
      setActiveSection(found);
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, [location.pathname]);

  const handleNavClick = (id) => {
    if (location.pathname !== '/') {
      navigate('/');
      setTimeout(() => {
        const el = document.getElementById(id);
        if (el) {
          el.scrollIntoView({ behavior: 'smooth' });
        }
      }, 100);
    } else {
      const el = document.getElementById(id);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
      }
    }
    setMenuOpen(false);
  };

  const navLinkClass = (id) =>
    `relative px-4 py-2 hover:scale-125 hover:text-purple-300 transition duration-500 ${
      activeSection === id
        ? 'after:absolute after:-bottom-1 after:left-0 after:h-0.5 after:w-full after:bg-purple-300 after:rounded-full text-purple-300 drop-shadow-[0_0_10px_rgba(168,85,247,0.9)]'
        : ''
    }`;

  const navLinks = (
    <>
      <button onClick={() => handleNavClick('hero')} className={navLinkClass('hero')}>Home</button>
      <button onClick={() => handleNavClick('about')} className={navLinkClass('about')}>About</button>
      <button onClick={() => handleNavClick('sales')} className={navLinkClass('sales')}>Sales</button>
      <button onClick={() => handleNavClick('projects')} className={navLinkClass('projects')}>Projects</button>
      <button onClick={() => handleNavClick('services')} className={navLinkClass('services')}>Services</button>
    </>
  );

  return (
    <nav className="bg-gradient-to-r from-blue-900/80 via-blue-800/70 to-blue-900/80 backdrop-blur-3xl text-white shadow-2xl sticky top-0 z-50 rounded-b-3xl">
      <motion.div
        className="max-w-7xl mx-auto px-6 py-8 flex justify-between items-center"
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: 'easeOut' }}
      >
        {/* Logo + Title without bounce */}
        <div className="flex items-center space-x-5">
          <motion.img
            src="/assets/logo.jpg"
            alt="GVJ Aircon Logo"
            className="h-16 w-16 object-contain rounded-full p-2"
            whileHover={{ scale: 1.2, rotate: 10 }}
            transition={{ type: 'spring', stiffness: 300 }}
          />
          <motion.h1
            className="text-4xl font-black tracking-widest text-white drop-shadow-[0_0_8px_rgba(255,255,255,0.6)]"
            whileHover={{ scale: 1.15 }}
          >
            GVJ AIRCON
          </motion.h1>
        </div>

        <div className="hidden md:flex space-x-8 text-lg items-center">
          <AnimatePresence>
            {navLinks && React.Children.map(navLinks.props.children, (child, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
              >
                {child}
              </motion.div>
            ))}
          </AnimatePresence>
          <a href="/admin/login" className="text-sm text-gray-300 hover:text-purple-300">Admin Login</a>
        </div>

        <motion.button
          className="md:hidden focus:outline-none"
          onClick={() => setMenuOpen(!menuOpen)}
          animate={{ rotate: menuOpen ? 225 : 0 }}
          transition={{ duration: 0.5 }}
        >
          {menuOpen ? <FaTimes size={28} /> : <FaBars size={28} />}
        </motion.button>
      </motion.div>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            className="md:hidden bg-blue-900/90 backdrop-blur-3xl px-6 pb-8 flex flex-col space-y-4 rounded-b-3xl"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.4 }}
          >
            {navLinks}
            <a href="/admin/login" className="text-sm text-gray-300 hover:text-purple-300 underline">Admin</a>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Header;
