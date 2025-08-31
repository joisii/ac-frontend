import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FaSnowflake, FaFan } from 'react-icons/fa';

const HeroSection = () => {
  const scrollToSection = (id) => {
    const section = document.getElementById(id);
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' });
    } else {
      console.warn(`Section with id "${id}" not found.`);
    }
  };

  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const checkWidth = () => setIsMobile(window.innerWidth < 768);
    checkWidth();
    window.addEventListener('resize', checkWidth);
    return () => window.removeEventListener('resize', checkWidth);
  }, []);

  const parentVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3,
        duration: 1,
        ease: 'easeOut',
      },
    },
  };

  const childVariants = {
    hidden: { opacity: 0, y: isMobile ? 30 : 50 },
    show: { opacity: 1, y: 0, transition: { duration: isMobile ? 0.8 : 1.2, ease: 'easeOut' } },
  };

  return (
    <section
      id="hero"
      className="
        relative overflow-hidden bg-gradient-to-br from-blue-100 via-white to-blue-50
        py-12 px-6 md:px-12 min-h-screen flex flex-col justify-center
      "
    >
      {/* Floating Icons */}
      <motion.div
        className="absolute top-10 left-10 text-blue-300 text-4xl z-0 opacity-50"
        animate={{ y: [0, -15, 15, 0], rotate: [0, 20, -20, 0] }}
        transition={{ repeat: Infinity, duration: 8, ease: 'easeInOut' }}
      >
        <FaSnowflake />
      </motion.div>
      <motion.div
        className="absolute bottom-10 right-10 text-yellow-200 text-5xl z-0 opacity-40"
        animate={{ y: [0, 20, -20, 0], rotate: [0, -15, 15, 0] }}
        transition={{ repeat: Infinity, duration: 10, ease: 'easeInOut' }}
      >
        <FaFan />
      </motion.div>

      {/* Blobs */}
      <motion.div
        className="absolute -top-32 -left-32 w-96 h-96 bg-white rounded-full blur-3xl opacity-25 z-0"
        animate={{ x: [0, 40, -40, 0], y: [0, -30, 30, 0] }}
        transition={{ repeat: Infinity, duration: 18, ease: 'easeInOut' }}
      />
      <motion.div
        className="absolute -bottom-24 -right-24 w-80 h-80 bg-yellow-300 rounded-full blur-3xl opacity-20 z-0"
        animate={{ x: [0, -30, 30, 0], y: [0, 25, -25, 0] }}
        transition={{ repeat: Infinity, duration: 15, ease: 'easeInOut' }}
      />

      {/* Hero Content (Card with fade-in effect) */}
      <motion.div
        variants={parentVariants}
        initial={{ opacity: 0, y: 40, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 1, ease: 'easeOut' }}
        className="
          relative z-10 text-center max-w-2xl mx-auto
          backdrop-blur-lg bg-white/30 rounded-2xl
          p-4 md:py-12 shadow-2xl
        "
      >
        <motion.img
          variants={childVariants}
          src="/assets/ac.jpg"
          alt="Air Conditioning"
          style={{ marginTop: '0.5rem' }}
          className="h-45 mx-auto mb-10 object-contain shadow-6xl animate-float"
        />

        <motion.h2
          variants={childVariants}
          className="text-2xl md:text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-800 to-blue-500 drop-shadow-lg"
        >
          Air Conditioning Experts
        </motion.h2>

        <motion.p
          variants={childVariants}
          className="text-lg md:text-xl text-gray-800 mt-4 font-medium"
        >
          Over 30 years of HVAC excellence across industries.
        </motion.p>

        <motion.div
          variants={childVariants}
          className="mt-8 flex flex-wrap justify-center gap-4"
        >
          <motion.button
            whileHover={{ scale: 1.1, rotate: -2 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => scrollToSection('projects')}
            className="bg-blue-700 text-white px-8 py-4 rounded-xl font-semibold shadow-xl hover:bg-blue-800 transition"
          >
            Explore Projects
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.1, rotate: 2 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => scrollToSection('services')}
            className="bg-white text-blue-700 border border-blue-700 px-8 py-4 rounded-xl font-semibold hover:bg-blue-50 transition"
          >
            Our Services
          </motion.button>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default HeroSection;
