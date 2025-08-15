import React, { useRef, useState, useEffect } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import Tilt from 'react-parallax-tilt';
import CountUp from 'react-countup';

const AboutUs = () => {
  const sectionRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  });

  const blobX = useTransform(scrollYProgress, [0, 1], [0, 150]);
  const blobY = useTransform(scrollYProgress, [0, 1], [0, -150]);

  const [popupImage, setPopupImage] = useState(null);

  // Close on ESC key + Disable background scroll when modal is open
  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === 'Escape') setPopupImage(null);
    };
    window.addEventListener('keydown', handleEsc);

    // Lock/unlock scroll
    if (popupImage) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }

    return () => {
      window.removeEventListener('keydown', handleEsc);
      document.body.style.overflow = ''; // reset on unmount
    };
  }, [popupImage]);

  return (
    <section
      ref={sectionRef}
      id="about"
      className="relative bg-gradient-to-b from-blue-50 via-white to-blue-100 min-h-screen flex items-center overflow-hidden py-20 px-4 md:px-8"
    >
      {/* Blobs */}
      <motion.div
        style={{ x: blobX, y: blobY }}
        className="absolute top-0 left-0 w-80 h-80 bg-blue-300 opacity-25 blur-3xl rounded-full z-0"
      />
      <motion.div
        style={{ x: blobY, y: blobX }}
        className="absolute bottom-0 right-0 w-64 h-64 bg-yellow-200 opacity-20 blur-3xl rounded-full z-0"
      />

      {/* CONTENT */}
      <div className="max-w-7xl mx-auto grid md:grid-cols-2 items-center gap-12 relative z-10">
        {/* Left - Image with Tilt */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="relative mx-auto w-72"
        >
          <Tilt tiltMaxAngleX={15} tiltMaxAngleY={15} glareEnable glareMaxOpacity={0.2}>
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 0.4, scale: 1 }}
              transition={{ duration: 1 }}
              className="absolute -top-5 -left-5 w-80 h-80 bg-blue-300 rounded-full blur-3xl z-0"
            />
            <motion.div
              whileHover={{ y: -10, scale: 1.05 }}
              transition={{ type: 'spring', stiffness: 300 }}
              className="relative z-10 rounded-2xl shadow-2xl overflow-hidden group"
            >
              <img
                src="/assets/gvj1.jpg"
                alt="GVJ Aircon Team"
                onClick={() => setPopupImage("/assets/gvj1.jpg")}
                className="w-full h-auto object-cover transition-transform duration-500 ease-in-out group-hover:scale-105 rounded-2xl cursor-pointer"
              />
              <div className="absolute top-4 left-4 bg-yellow-400 text-white text-xs font-bold px-3 py-1 rounded-full shadow-md">
                30+ Years of Excellence
              </div>
            </motion.div>
          </Tilt>
        </motion.div>

        {/* Right - Text + Stats */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          viewport={{ once: true }}
          className="text-left"
        >
          <motion.h2
            className="text-4xl md:text-5xl font-extrabold mb-4 leading-snug text-transparent bg-clip-text bg-gradient-to-r from-blue-800 via-yellow-500 to-blue-800 animate-pulse"
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            Trusted HVAC Experts for Over <span className="text-yellow-500">Three Decades</span>
          </motion.h2>

          <motion.p
            className="text-gray-800 text-lg mb-6 leading-relaxed font-medium"
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
          >
            <strong className="text-blue-700">GVJ Aircon Projects and Services</strong> is the authorized partner for Bluestar centralized air conditioning solutions. We tailor systems backed by decades of engineering expertise.
          </motion.p>

          <motion.p
            className="text-gray-700 text-base mb-6 leading-relaxed italic"
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.4 }}
          >
            We have highly skilled and well-trained service engineers, technicians with necessary tools & tackles to meet our customer service requirements. We adhere to quality service processes and safety norms.
          </motion.p>

          {/* Counters */}
          <motion.div
            className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-gray-800 text-base"
            initial="hidden"
            whileInView="visible"
            variants={{ visible: { transition: { staggerChildren: 0.2 } } }}
            viewport={{ once: true }}
          >
            <motion.div
              className="p-4 rounded-xl bg-white/50 backdrop-blur shadow-md hover:scale-105 transition-transform duration-300 flex flex-col items-start"
              variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }}
            >
              <span className="text-3xl md:text-4xl font-bold text-blue-700 mb-1">
                <CountUp end={20000} duration={3} separator="," /> TR
              </span>
              <span className="text-sm">Cooling Installed</span>
            </motion.div>

            <motion.div
              className="p-4 rounded-xl bg-white/50 backdrop-blur shadow-md hover:scale-105 transition-transform duration-300 flex flex-col items-start"
              variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }}
            >
              <span className="text-3xl md:text-4xl font-bold text-yellow-600 mb-1">
                <CountUp end={1200} duration={3} separator="," />+
              </span>
              <span className="text-sm">Clients Served</span>
            </motion.div>
          </motion.div>

          {/* Bullet Points */}
          <motion.div
            className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-6 text-gray-800 text-base"
            initial="hidden"
            whileInView="visible"
            variants={{ visible: { transition: { staggerChildren: 0.2 } } }}
            viewport={{ once: true }}
          >
            {[
              'AMC and expert service for all project sizes',
              'State-of-the-art training for technicians',
              '30+ years of hands-on HVAC execution experience',
            ].map((item, index) => (
              <motion.div
                key={index}
                className="flex items-start gap-3 p-2 rounded-xl bg-white/40 backdrop-blur hover:scale-105 transition-transform duration-300 shadow-md"
                variants={{
                  hidden: { opacity: 0, y: 20 },
                  visible: { opacity: 1, y: 0 },
                }}
                transition={{ duration: 0.5 }}
              >
                <motion.span
                  whileHover={{ scale: 1.3, rotate: 10 }}
                  transition={{ type: 'spring', stiffness: 200 }}
                  className="text-green-600 text-xl shadow-md"
                >
                  ✔
                </motion.span>
                <span className="transition-opacity duration-300 hover:opacity-100">{item}</span>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </div>

      {/* 📸 Popup Image Modal */}
      {popupImage && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-md transition-opacity duration-300">
          <div className="relative p-4 w-full max-w-4xl">
            <img
              src={popupImage}
              alt="Popup"
              className="mx-auto rounded-2xl shadow-2xl border-4 border-white"
              style={{ maxHeight: '80vh', maxWidth: '100%' }}
            />
            <button
              onClick={() => setPopupImage(null)}
              className="absolute top-4 right-4 text-white text-3xl font-bold bg-black/70 rounded-full px-3 py-1 hover:bg-black/90 transition"
            >
              ✕
            </button>
          </div>
        </div>
      )}
    </section>
  );
};

export default AboutUs;
