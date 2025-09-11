import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import CountUp from "react-countup";

const AboutUs = () => {
  const sectionRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const blobX = useTransform(scrollYProgress, [0, 1], [0, 150]);
  const blobY = useTransform(scrollYProgress, [0, 1], [0, -150]);

  return (
    <section
      ref={sectionRef}
      id="about"
      className="relative bg-gradient-to-b from-blue-50 via-white to-blue-100 min-h-screen flex items-center justify-center overflow-hidden py-20 px-4 md:px-8"
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

      {/* CONTENT - Centered */}
      <div className="max-w-4xl mx-auto flex flex-col items-center text-center gap-8 relative z-10">
        {/* Heading */}
        <motion.h2
          className="text-4xl md:text-5xl font-extrabold leading-snug text-transparent bg-clip-text bg-gradient-to-r from-blue-800 via-yellow-500 to-blue-800 animate-pulse"
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          Trusted HVAC Experts for Over{" "}
          <span className="text-yellow-500">Three Decades</span>
        </motion.h2>

        {/* Description */}
        <motion.p
          className="text-gray-800 text-lg leading-relaxed font-medium max-w-2xl"
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
        >
          <strong className="text-blue-700">
            GVJ Aircon Projects and Services
          </strong>{" "}
          specializes in delivering high-quality centralized air conditioning
          solutions, tailored with decades of engineering expertise.
        </motion.p>

        <motion.p
          className="text-gray-700 text-base leading-relaxed italic max-w-2xl"
          initial={{ opacity: 0, x: 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7, delay: 0.4 }}
        >
          We have highly skilled and well-trained service engineers, technicians
          with necessary tools & tackles to meet our customer service
          requirements. We adhere to quality service processes and safety norms.
        </motion.p>

        {/* Counters */}
        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 gap-6 w-full max-w-lg"
          initial="hidden"
          whileInView="visible"
          variants={{ visible: { transition: { staggerChildren: 0.2 } } }}
          viewport={{ once: true }}
        >
          <motion.div
            className="p-6 rounded-xl bg-white/60 shadow-md flex flex-col items-center"
            variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }}
          >
            <span className="text-3xl md:text-4xl font-bold text-blue-700 mb-1">
              <CountUp end={20000} duration={3} separator="," /> TR
            </span>
            <span className="text-sm">Cooling Installed</span>
          </motion.div>

          <motion.div
            className="p-6 rounded-xl bg-white/60 shadow-md flex flex-col items-center"
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
          className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-6 text-gray-800 text-base w-full max-w-2xl"
          initial="hidden"
          whileInView="visible"
          variants={{ visible: { transition: { staggerChildren: 0.2 } } }}
          viewport={{ once: true }}
        >
          {[
            "AMC and expert service for all project sizes",
            "State-of-the-art training for technicians",
            "30+ years of hands-on HVAC execution experience",
          ].map((item, index) => (
            <motion.div
              key={index}
              className="flex items-center gap-3 p-3 rounded-xl bg-white/50 shadow-md"
              variants={{
                hidden: { opacity: 0, y: 20 },
                visible: { opacity: 1, y: 0 },
              }}
              transition={{ duration: 0.5 }}
            >
              <span className="text-green-600 text-xl shadow-md">✔</span>
              <span>{item}</span>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default AboutUs;
