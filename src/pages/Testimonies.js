import { motion, AnimatePresence } from 'framer-motion';
import { useEffect, useRef, useState, useCallback } from 'react';
import { FaStar, FaChevronLeft, FaChevronRight } from 'react-icons/fa';

const testimonials = [
  {
    name: "Ravi Kumar",
    company: "TechNest Pvt Ltd",
    rating: 5,
    comment: "GVJ Aircon's team is professional and reliable. Our office AC installation was seamless and on-time!",
  },
  {
    name: "Anita George",
    company: "Homeowner, Chennai",
    rating: 5,
    comment: "Prompt service and quality maintenance. Highly recommend them for any AC needs.",
  },
  {
    name: "Manoj Pillai",
    company: "CoolTech Engineers",
    rating: 4,
    comment: "They offered smart solutions and their AMC plans saved us from frequent repairs.",
  },
  {
    name: "Shalini Joseph",
    company: "Villa Owner, ECR",
    rating: 5,
    comment: "We love the silent cooling system they installed. Our entire villa feels climate controlled perfectly!",
  },
  {
    name: "Priya Chandran",
    company: "Hospital Admin, MedicoCare",
    rating: 4,
    comment: "Smoothest ducted AC setup I’ve seen in 15 years of managing facilities. Will work with them again.",
  },
];

const clients = [
  { name: "AVM Productions", logo: "/assets/avm.png" },
  { name: "AMCH", logo: "/assets/amch.png" },
  { name: "Titan", logo: "/assets/titan.png" },
  { name: "Hapag-Lloyd", logo: "/assets/loyd.png" },
  { name: "Ramaniyam", logo: "/assets/rama.png" },
  { name: "Maharishi International Residential School", logo: "/assets/school.png" },
  { name: "Madras Boat Club", logo: "/assets/madras.png" },
  { name: "SIMS", logo: "/assets/sims.png" },
  { name: "IndiQube Limited", logo: "/assets/indie.jpeg" },
  { name: "Sree Gupta Bhavan", logo: "/assets/srb.png" },
  { name: "Esskay Design Structures Private", logo: "/assets/Esskey.jpeg" },
  { name: "BELRISE INDUSTRIES LTD", logo: "/assets/Belrise.jpeg" },
  { name: "Southern Chemical India Private Limited ", logo: "/assets/southern chemical.jpeg" },
  { name: "LKS Old House", logo: "/assets/Lks.png" },
  { name: "DART GLOBAL LOGISTICS PVT LTD", logo: "/assets/dart.jpeg" },
  { name: "Deepam Eye Hospital", logo: "/assets/Deepam.png" },
  { name: "FATHIMA JEWELlERS", logo: "/assets/fathima.jpeg" },
  { name: "QSPIDERS A UNIT OF TEST YANTRA SOFTWARE SOLUTIONS INDIA PVT LTD", logo: "/assets/qspiders.png" },
];

const variants = {
  enter: (direction) => ({
    x: direction > 0 ? 300 : -300,
    opacity: 0,
  }),
  center: {
    x: 0,
    opacity: 1,
  },
  exit: (direction) => ({
    x: direction < 0 ? 300 : -300,
    opacity: 0,
  }),
};

export default function TestimonialsPage() {
  const [[page, direction], setPage] = useState([0, 0]);
  const timeoutRef = useRef(null);

  // Make paginate stable and independent
  const paginate = useCallback((newDirection) => {
    setPage(([prevPage]) => [
      (prevPage + newDirection + testimonials.length) % testimonials.length,
      newDirection,
    ]);
  }, [testimonials.length]);

  // Auto-play function that depends on paginate
  const startAutoPlay = useCallback(() => {
    clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(() => {
      paginate(1);
    }, 6000);
  }, [paginate]);

  // Restart autoplay whenever page changes
  useEffect(() => {
    startAutoPlay();
    return () => clearTimeout(timeoutRef.current);
  }, [startAutoPlay]);

  const testimonial = testimonials[page];

  return (
    <main className="min-h-screen font-sans">
      <section className="relative bg-gradient-to-br from-sky-100 via-white to-blue-50 py-20 px-6 overflow-hidden">
        {/* Decorative background shapes */}
        <motion.div
          className="absolute top-0 right-0 w-72 h-72 bg-blue-200 opacity-20 rounded-full -z-10"
          animate={{ scale: [1, 1.1, 1], rotate: [0, 30, 0] }}
          transition={{ duration: 20, repeat: Infinity }}
        />
        <motion.div
          className="absolute bottom-0 left-0 w-96 h-96 bg-yellow-100 opacity-20 rounded-full -z-10"
          animate={{ scale: [1, 0.9, 1], rotate: [0, -20, 0] }}
          transition={{ duration: 25, repeat: Infinity }}
        />

        <motion.h2
          className="text-4xl md:text-5xl font-extrabold text-center mb-16 text-blue-900 tracking-tight drop-shadow"
          initial={{ opacity: 0, y: -30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          What Our Clients Say
        </motion.h2>

        {/* Testimonials Carousel */}
        <div className="relative max-w-3xl mx-auto overflow-hidden min-h-[380px]">
          <AnimatePresence initial={false} custom={direction}>
            <motion.div
              key={page}
              className="absolute w-full"
              custom={direction}
              variants={variants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.6 }}
              drag="x"
              dragConstraints={{ left: 0, right: 0 }}
              dragElastic={1}
              onDragEnd={(e, { offset }) => {
                if (offset.x > 100) paginate(-1);
                else if (offset.x < -100) paginate(1);
              }}
            >
              <motion.div
                className="bg-white/80 backdrop-blur-2xl border border-blue-200 shadow-2xl rounded-3xl p-10 text-center mx-4"
                initial={{ scale: 0.95 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.4 }}
              >
                <div className="flex justify-center mb-6">
                  <img
                    src={testimonial.image}
                    alt={testimonial.name}
                    className="w-20 h-20 rounded-full border-4 border-blue-400 shadow-lg object-cover"
                  />
                </div>
                <h4 className="text-xl font-semibold text-blue-800">{testimonial.name}</h4>
                <p className="text-sm text-gray-600 mb-3">{testimonial.company}</p>
                <div className="flex justify-center text-yellow-400 mb-4">
                  {Array(testimonial.rating)
                    .fill()
                    .map((_, i) => (
                      <FaStar key={i} />
                    ))}
                </div>
                <p className="text-gray-700 italic max-w-xl mx-auto text-lg leading-relaxed">
                  “{testimonial.comment}”
                </p>
              </motion.div>
            </motion.div>
          </AnimatePresence>

          {/* Navigation Arrows */}
          <div className="absolute top-1/2 left-2 transform -translate-y-1/2 z-10">
            <button
              onClick={() => paginate(-1)}
              className="bg-blue-800 hover:bg-blue-700 text-white p-3 rounded-full shadow-lg transition transform hover:scale-110"
            >
              <FaChevronLeft />
            </button>
          </div>
          <div className="absolute top-1/2 right-2 transform -translate-y-1/2 z-10">
            <button
              onClick={() => paginate(1)}
              className="bg-blue-800 hover:bg-blue-700 text-white p-3 rounded-full shadow-lg transition transform hover:scale-110"
            >
              <FaChevronRight />
            </button>
          </div>
        </div>

        {/* Client Logos Section */}
        <motion.div
          className="mt-28 max-w-7xl mx-auto"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h4 className="text-3xl font-bold text-center text-blue-800 mb-12 drop-shadow">
            Companies We’ve Worked With
          </h4>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-8 place-items-center">
            {clients.map((client, index) => (
              <motion.div
                key={index}
                className="flex flex-col items-center w-40 h-40 bg-white p-4 rounded-2xl shadow hover:shadow-2xl transition group"
                whileHover={{ scale: 1.07 }}
              >
                <div className="flex-grow flex items-center justify-center">
                  <img
                    src={client.logo}
                    alt={client.name}
                    className="max-h-16 max-w-[120px] object-contain grayscale group-hover:grayscale-0 transition"
                  />
                </div>
                <p className="mt-3 text-sm text-center text-gray-700 font-medium">{client.name}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>
    </main>
  );
}
