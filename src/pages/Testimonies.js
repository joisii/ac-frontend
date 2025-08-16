import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useRef, useState, useCallback } from "react";
import { FaStar, FaChevronLeft, FaChevronRight } from "react-icons/fa";

const testimonials = [
  {
    name: "Solomon Petra",
    company: "",
    rating: 5,
    comment:
      "We recently referred GVJ Aircon, led by Mr. John, to a Church for their air conditioning needs, and we couldn't be more pleased with the outcome. The team at GVJ Aircon demonstrated exceptional professionalism, delivering top-quality service with meticulous attention to detail. The client was thoroughly satisfied with the prompt installation and the high performance of the units. We highly recommend GVJ Aircon to anyone in need of reliable HVAC solutions.",
  },
  {
    name: "Sinosh Kumar",
    company: "",
    rating: 5,
    comment:
      "I have recently purchased Split Air-conditioner from GVJ Aircon Projects and Services. The rate of the split A/c is very competitive and the installation and services provided by Mr. John sir and the team is very good and excellent. I appreciate your team members and I am also strongly recommending GVJ Aircon Projects and Services to our Group of companies, to my Friends and neighbors too. I wish all the best for the strong service team.",
  },
  {
    name: "Storey Inside Interiors",
    company: "",
    rating: 5,
    comment:
      "For one of our projects, the entire Air conditioning services were handled by GVJ Aircon. They are a professionally trained team and gave the best advice. They eft us happy and satisfied with the quality & service. We recommend GVJ Air cons to all our clients. Thank you for providing the best services and wish you all the best.",
  },
  {
    name: "SMP Sales",
    company: "",
    rating: 5,
    comment:
      "Excellent consultation and dedicated team...GVJ aricon services made the installation of Air-conditioning unit at our factory site. The task was challenging due to logistical and technical complexity, but GVJ aircon team made the process so easy we never had to worry about the installation. Keep up the good work.",
  },
  {
    name: "Aruns Dental Art, R.A. Puram",
    company: "Dr. Sandhya Arunkumar, Pearls Dentistry",
    rating: 5,
    comment:
      "This is Dr Sandhya Arunkumar, a Dentist from Pearls Dentistry, Raja Annamalai Puram. I have used AC services from GVJ Aircon multiple times, both for our clinic as well as residence. Their service is prompt, neat and very professional. They maintain all basic hygiene precautions. The quality of their work is too good, that shows their competency in their job. Would definitely recommend GVJ Aircon for all types of AC services.",
  },
  {
    name: "CA Nivedhitha",
    company: "",
    rating: 5,
    comment:
      "We availed their AC maintenance service yesterday. We called and within 12 hours their staff were allotted and promptly addressed our requirements. They were so professional and adhere to all safety norms required for this time. Happy to refer them to my friends and business contacts.Highly appreciate their commitment towards their stakeholders.",
  },
];

const clients = [
  { name: "IndiQube Limited", logo: "/assets/indie.jpeg" },
  { name: "Sree Gupta Bhavan", logo: "/assets/srb.png" },
  { name: "Esskay Design Structures Private", logo: "/assets/Esskey.jpeg" },
  { name: "BELRISE INDUSTRIES LTD", logo: "/assets/Belrise.jpeg" },
  { name: "Southern Chemical India Private Limited", logo: "/assets/southern chemical.jpeg" },
  { name: "LKS Old House", logo: "/assets/Lks.png" },
  { name: "DART GLOBAL LOGISTICS PVT LTD", logo: "/assets/dart.jpeg" },
  { name: "Deepam Eye Hospital", logo: "/assets/Deepam.png" },
  { name: "FATHIMA JEWELLERS", logo: "/assets/fathima.jpeg" },
  { name: "Qspiders", logo: "/assets/qspiders.png" },
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

  const paginate = useCallback((newDirection) => {
    setPage(([prevPage]) => [
      (prevPage + newDirection + testimonials.length) % testimonials.length,
      newDirection,
    ]);
  }, []);

  const startAutoPlay = useCallback(() => {
    clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(() => {
      paginate(1);
    }, 6000);
  }, [paginate]);

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
        <div className="relative max-w-3xl mx-auto overflow-hidden min-h-[320px]">
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
                className="bg-white/90 backdrop-blur-2xl border border-blue-200 shadow-2xl rounded-3xl p-10 text-center mx-4"
                initial={{ scale: 0.95 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.4 }}
              >
                <h4 className="text-xl font-semibold text-blue-800">{testimonial.name}</h4>
                {testimonial.company && (
                  <p className="text-sm text-gray-600 mb-3">{testimonial.company}</p>
                )}
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
