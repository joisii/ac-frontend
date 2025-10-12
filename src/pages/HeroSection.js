// src/components/HeroSection.js
import React, { useState, useEffect, useRef } from "react";
import { motion, useInView } from "framer-motion";
import { FaSnowflake, FaFan, FaArrowRight, FaTools } from "react-icons/fa";

const HeroSection = () => {
  const scrollToSection = (id) => {
    const section = document.getElementById(id);
    if (section) section.scrollIntoView({ behavior: "smooth" });
  };

  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const checkWidth = () => setIsMobile(window.innerWidth < 768);
    checkWidth();
    window.addEventListener("resize", checkWidth);
    return () => window.removeEventListener("resize", checkWidth);
  }, []);

  // Animation on scroll
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const parentVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.3, duration: 1, ease: "easeOut" },
    },
  };

  const childVariants = {
    hidden: { opacity: 0, y: isMobile ? 30 : 50 },
    show: {
      opacity: 1,
      y: 0,
      transition: { duration: isMobile ? 0.8 : 1.2, ease: "easeOut" },
    },
  };

  return (
    <section
      id="hero"
      ref={ref}
      className="
        relative overflow-hidden 
        bg-gradient-to-br from-blue-100 via-white to-blue-50
        py-16 px-6 md:px-12 min-h-screen flex flex-col justify-center
      "
    >
      {/* Subtle animated gradient overlay */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-tr from-blue-200/20 via-transparent to-yellow-200/20"
        animate={{ backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"] }}
        transition={{ repeat: Infinity, duration: 20, ease: "linear" }}
        style={{ backgroundSize: "200% 200%" }}
      />

      {/* Floating icons */}
      <motion.div
        className="absolute top-10 left-10 text-blue-300 text-4xl z-0 opacity-50"
        animate={{ y: [0, -15, 15, 0], rotate: [0, 20, -20, 0] }}
        transition={{ repeat: Infinity, duration: 8, ease: "easeInOut" }}
      >
        <FaSnowflake />
      </motion.div>
      <motion.div
        className="absolute bottom-10 right-10 text-yellow-200 text-5xl z-0 opacity-40"
        animate={{ y: [0, 20, -20, 0], rotate: [0, -15, 15, 0] }}
        transition={{ repeat: Infinity, duration: 10, ease: "easeInOut" }}
      >
        <FaFan />
      </motion.div>

      {/* Blurred blobs */}
      <motion.div
        className="absolute -top-32 -left-32 w-96 h-96 bg-white rounded-full blur-3xl opacity-25 z-0"
        animate={{ x: [0, 40, -40, 0], y: [0, -30, 30, 0] }}
        transition={{ repeat: Infinity, duration: 18, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute -bottom-24 -right-24 w-80 h-80 bg-yellow-300 rounded-full blur-3xl opacity-20 z-0"
        animate={{ x: [0, -30, 30, 0], y: [0, 25, -25, 0] }}
        transition={{ repeat: Infinity, duration: 15, ease: "easeInOut" }}
      />

      {/* Hero Content */}
      <motion.div
        variants={parentVariants}
        initial="hidden"
        animate={isInView ? "show" : "hidden"}
        className="
          relative z-10 text-center max-w-3xl mx-auto
          backdrop-blur-xl bg-white/50 rounded-2xl
          p-6 md:p-12 shadow-2xl border border-white/40
        "
      >
        {/* Hero Image with floating effect */}
      <motion.div
  variants={childVariants}
  className="relative w-full max-w-md mx-auto mb-12 group perspective"
>
  {/* Outer Glow Aura */}
  <motion.div
    className="absolute -inset-2 rounded-3xl bg-gradient-to-r from-blue-400 via-yellow-300 to-blue-600 opacity-30 blur-2xl"
    animate={{ opacity: [0.2, 0.5, 0.2] }}
    transition={{ repeat: Infinity, duration: 6, ease: "easeInOut" }}
  />

  {/* Image Card with hover tilt */}
  <motion.div
    whileHover={{ rotateY: 8, rotateX: -5, scale: 1.03 }}
    transition={{ type: "spring", stiffness: 100, damping: 10 }}
    className="relative rounded-2xl overflow-hidden shadow-2xl border border-white/30 bg-white/10 backdrop-blur-xl"
  >
    {/* Hero Image */}
    <motion.img
      src="/assets/ac.jpg"
      alt="Air Conditioning"
      className="w-full h-full object-cover rounded-2xl"
      animate={{ y: [0, -10, 10, 0] }}
      transition={{ repeat: Infinity, duration: 8, ease: "easeInOut" }}
    />

    {/* Dark Gradient Overlay */}
    <div className="absolute inset-0 rounded-2xl bg-gradient-to-t from-black/40 to-transparent"></div>

    {/* Animated Shine Sweep */}
    <motion.div
      className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent skew-x-12"
      animate={{ x: ["-150%", "150%"] }}
      transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
    />
  </motion.div>
</motion.div>


        {/* Heading */}
        <motion.h2
          variants={childVariants}
          className="text-3xl md:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-800 via-blue-600 to-blue-400 drop-shadow-lg"
        >
          AIR CONDITIONING EXPERTS
        </motion.h2>

        {/* Subtitle */}
        <motion.p
          variants={childVariants}
          className="text-lg md:text-xl text-gray-700 mt-4 font-medium leading-relaxed"
        >
          Delivering <span className="font-semibold">30+ years</span> of trusted HVAC
          solutions across industries with innovation, reliability, and energy efficiency.
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          variants={childVariants}
          className="mt-10 flex flex-wrap justify-center gap-4"
        >
          <motion.button
            whileHover={{ scale: 1.1, rotate: -2 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => scrollToSection("projects")}
            className="flex items-center gap-2 bg-blue-700 text-white px-8 py-4 rounded-xl font-semibold shadow-xl hover:bg-blue-800 hover:shadow-2xl transition"
          >
            Explore Projects <FaArrowRight />
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.1, rotate: 2 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => scrollToSection("services")}
            className="flex items-center gap-2 bg-white text-blue-700 border border-blue-700 px-8 py-4 rounded-xl font-semibold shadow-lg hover:bg-blue-50 transition"
          >
            Our Services <FaTools />
          </motion.button>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default HeroSection;
