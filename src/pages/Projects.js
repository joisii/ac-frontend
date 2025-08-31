import React, { useRef, useEffect, useState } from "react";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";

const projects = [
  { title: "Restaurant", description: "Installed a customized 80-ton HVAC system to maintain optimal dining comfort, even during peak hours and large gatherings.", image: "/assets/restaurant.jpg" },
  { title: "Gym", description: "Deployed a high-efficiency ducted HVAC system built for continuous 20/7 operation, ensuring fresh airflow for fitness enthusiasts around the clock.", image: "/assets/gym.jpg" },
  { title: "Textile Shop", description: "Integrated a smart VRF system across 5 floors to keep the shopping space cool, energy-efficient, and comfortable for both customers and staff.", image: "/assets/tex.jpg" },
  { title: "Banquet Hall", description: "Delivered a noise-free, high-capacity HVAC solution designed to handle the demands of large functions, weddings, and conferences with ease.", image: "/assets/hall.jpg" },
  { title: "Worship Center", description: "Engineered a silent, climate-controlled environment to ensure peaceful, distraction-free spiritual gatherings and prayer sessions.", image: "/assets/chruch.jpg" },
  { title: "Super Market", description: "Installed a robust HVAC system that balances cooling efficiency with noise control, keeping shoppers and staff comfortable throughout the day.", image: "/assets/supermar.jpg" },
  { title: "Hospital", description: "Delivered a precision-controlled HVAC system tailored for healthcare, ensuring patient comfort, air purity, and low noise in critical care zones.", image: "/assets/vs ho.webp" },
  { title: "Corporate Office", description: "Designed a smart, energy-efficient HVAC setup that supports a productive work environment with silent airflow and optimized zoning for office spaces.", image: "/assets/indique.jpg" },
  { title: "Residence", description: "Installed a high-capacity, low-noise HVAC system engineered for large gatherings, maintaining consistent comfort during seminars and academic events.", image: "/assets/confe.png" },
];

export default function Projects() {
  const sectionRef = useRef(null);
  const navigate = useNavigate();
  const [mounted, setMounted] = useState(false);
  const [clickedProject, setClickedProject] = useState(null);

  useEffect(() => setMounted(true), []);

  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start end", "end start"] });
  const blobX = useTransform(scrollYProgress, [0, 1], [0, 150]);
  const blobY = useTransform(scrollYProgress, [0, 1], [0, -150]);

  const handleProjectClick = (project) => {
    setClickedProject(project);
    const routes = {
      "Restaurant": "/projects/restaurant",
      "Gym": "/projects/gym",
      "Textile Shop": "/projects/textile",
      "Banquet Hall": "/projects/banquet",
      "Worship Center": "/projects/worship",
      "Super Market": "/projects/supermarket",
      "Hospital": "/projects/hospital",
      "Corporate Office": "/projects/office",
      "Residence": "/projects/conference",
    };
    setTimeout(() => {
      if (routes[project.title]) navigate(routes[project.title]);
    }, 400);
  };

  return (
    <AnimatePresence>
      <motion.div
        key="projects-page"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.4 }}
        ref={sectionRef}
        className="font-sans text-gray-800 bg-gradient-to-b from-blue-50 via-white to-blue-100 min-h-screen flex flex-col relative overflow-hidden"
      >
        {/* Blobs */}
        {mounted && (
          <>
            <motion.div style={{ x: blobX, y: blobY }} className="absolute top-[-100px] left-[-100px] w-96 h-96 bg-blue-300 opacity-25 blur-3xl rounded-full z-0" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }} />
            <motion.div style={{ x: blobY, y: blobX }} className="absolute bottom-[-100px] right-[-100px] w-80 h-80 bg-yellow-200 opacity-20 blur-3xl rounded-full z-0" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }} />
          </>
        )}

        {/* Header */}
        <section className="relative z-10 text-center py-24">
          <h1 className="text-4xl md:text-6xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-800 via-yellow-500 to-blue-800 animate-text-glow drop-shadow-lg mb-6">
            Explore Our Signature Projects
          </h1>
          <p className="text-lg md:text-xl text-gray-700 max-w-2xl mx-auto font-medium">
            Each project reflects our commitment to excellence, precision engineering, and client satisfaction.
          </p>
        </section>

        {/* Project Cards */}
        <section className="flex-grow flex flex-col justify-center max-w-7xl mx-auto px-6 pb-24 relative z-10">
          <motion.div
            initial="hidden"
            animate="show"
            variants={{
              hidden: {},
              show: {
                transition: { staggerChildren: 0.15 },
              },
            }}
            className="grid sm:grid-cols-2 lg:grid-cols-3 gap-10"
          >
            {projects.map((project, index) => (
              <motion.div
                key={index}
                className="bg-white/40 backdrop-blur-lg shadow-xl rounded-3xl overflow-hidden transform hover:scale-105 transition-all duration-500 group relative cursor-pointer"
                variants={{
                  hidden: { opacity: 0, y: 40, scale: 0.95 },
                  show: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.6, ease: "easeOut" } },
                }}
                exit={{ opacity: clickedProject === project ? 0 : 1, scale: clickedProject === project ? 0.95 : 1 }}
                onClick={() => handleProjectClick(project)}
              >
                <div className="overflow-hidden relative h-56 rounded-t-3xl">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500 rounded-t-3xl"
                  />
                  {/* Hover Overlay */}
                  <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-80 flex items-center justify-center text-white text-lg font-semibold transition-opacity duration-300 rounded-t-3xl">
                    Click here to see the list
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-2xl font-bold mb-3 text-blue-800 bg-clip-text bg-gradient-to-r from-blue-800 via-yellow-500 to-blue-800 text-transparent animate-pulse">
                    {project.title}
                  </h3>
                  <p className="text-gray-800">{project.description}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </section>
      </motion.div>
    </AnimatePresence>
  );
}
