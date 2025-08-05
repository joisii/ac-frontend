// src/pages/Projects.js

import React, { useRef, useState } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';

const projects = [
  {
    title: "Restaurant-Jalpaan",
    description: "Installed a customized 80-ton HVAC system to maintain optimal dining comfort, even during peak hours and large gatherings.",
    image: "/assets/restaurant.jpg",
  },
  {
    title: "Gym-20x7",
    description: "Deployed a high-efficiency ducted HVAC system built for continuous 24/7 operation, ensuring fresh airflow for fitness enthusiasts around the clock.",
    image: "/assets/gym.jpg",
  },
  {
    title: "Textile Shop-Diadem T Nagar",
    description: "Integrated a smart VRF system across 5 floors to keep the shopping space cool, energy-efficient, and comfortable for both customers and staff.",
    image: "/assets/tex.jpg",
  },
  {
    title: "Banquet Hall-Velachery",
    description: "Delivered a noise-free, high-capacity HVAC solution designed to handle the demands of large functions, weddings, and conferences with ease.",
    image: "/assets/hall.jpg",
  },
  {
    title: "Worship Center",
    description: "Engineered a silent, climate-controlled environment to ensure peaceful, distraction-free spiritual gatherings and prayer sessions.",
    image: "/assets/chruch.jpg",
  },
  {
    title: "Super Market-Fresh 2 day",
    description: "Installed a robust HVAC system that balances cooling efficiency with noise control, keeping shoppers and staff comfortable throughout the day.",
    image: "/assets/supermar.jpg",
  },
 {
  title: "VS Hospital",
  description: "Delivered a precision-controlled HVAC system tailored for healthcare, ensuring patient comfort, air purity, and low noise in critical care zones.",
  image: "/assets/vs ho.webp",
},
{
  title: "Corporate Office - Indique",
  description: "Designed a smart, energy-efficient HVAC setup that supports a productive work environment with silent airflow and optimized zoning for office spaces.",
  image: "/assets/indique.jpg",
},
{
  title: "Conference Hall - Amritha Institution",
  description: "Installed a high-capacity, low-noise HVAC system engineered for large gatherings, maintaining consistent comfort during seminars and academic events.",
  image: "/assets/conf.jpg",
},

];

export default function Projects() {
  const sectionRef = useRef(null);
  const [selectedProject, setSelectedProject] = useState(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  });

  const blobX = useTransform(scrollYProgress, [0, 1], [0, 150]);
  const blobY = useTransform(scrollYProgress, [0, 1], [0, -150]);

  return (
    <div
      id="projects"
      ref={sectionRef}
      className="font-sans text-gray-800 bg-gradient-to-b from-blue-50 via-white to-blue-100 min-h-screen flex flex-col relative overflow-hidden"
    >
      {/* Floating animated blobs */}
      <motion.div
        style={{ x: blobX, y: blobY }}
        className="absolute top-[-100px] left-[-100px] w-96 h-96 bg-blue-300 opacity-25 blur-3xl rounded-full z-0"
      />
      <motion.div
        style={{ x: blobY, y: blobX }}
        className="absolute bottom-[-100px] right-[-100px] w-80 h-80 bg-yellow-200 opacity-20 blur-3xl rounded-full z-0"
      />

      {/* Animated header */}
      <section className="relative z-10 text-center py-24">
        <motion.h1
          className="text-4xl md:text-6xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-800 via-yellow-500 to-blue-800 animate-text-glow drop-shadow-lg mb-6"
          initial={{ opacity: 0, y: -40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          Explore Our Signature Projects
        </motion.h1>
        <motion.p
          className="text-lg md:text-xl text-gray-700 max-w-2xl mx-auto font-medium"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.2 }}
        >
          Each project reflects our commitment to excellence, precision engineering, and client satisfaction.
        </motion.p>
      </section>

      {/* Project Cards */}
      <section className="flex-grow flex flex-col justify-center max-w-7xl mx-auto px-6 pb-24 relative z-10">
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-10">
          {projects.map((project, index) => (
            <motion.div
              key={index}
              className="bg-white/40 backdrop-blur-lg shadow-xl rounded-3xl overflow-hidden hover:shadow-2xl transform hover:scale-105 transition-all duration-500 group relative cursor-pointer"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: index * 0.1 }}
              viewport={{ once: true }}
              onClick={() => setSelectedProject(project)}
            >
              <div className="overflow-hidden relative h-56 rounded-t-3xl">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500 rounded-t-3xl"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition duration-300 rounded-t-3xl" />
              </div>
              <div className="p-6">
                <h3 className="text-2xl font-bold mb-3 text-blue-800 bg-clip-text bg-gradient-to-r from-blue-800 via-yellow-500 to-blue-800 text-transparent animate-pulse">
                  {project.title}
                </h3>
                <p className="text-gray-800">{project.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Lightbox Modal */}
      <AnimatePresence>
        {selectedProject && (
          <motion.div
            className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedProject(null)}
          >
            <motion.div
              className="bg-white rounded-2xl overflow-hidden shadow-2xl max-w-3xl w-full relative"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              onClick={(e) => e.stopPropagation()} // prevent closing when clicking inside modal
            >
              <img
                src={selectedProject.image}
                alt={selectedProject.title}
                className="w-full h-80 object-cover rounded-t-2xl"
              />
              <div className="p-6">
                <h2 className="text-3xl font-bold mb-4 text-blue-800">{selectedProject.title}</h2>
                <p className="text-gray-700 text-lg">{selectedProject.description}</p>
              </div>
              <button
                className="absolute top-4 right-4 bg-red-600 text-white rounded-full w-10 h-10 flex items-center justify-center hover:bg-red-700 transition"
                onClick={() => setSelectedProject(null)}
              >
                ✕
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
