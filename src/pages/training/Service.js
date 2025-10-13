// src/pages/training/Service.js
import React from "react";
import { motion } from "framer-motion";

function Service() {
  const clients = [
    { name: "IndiQube Limited", logo: "/assets/indie.jpeg" },
    { name: "Sree Gupta Bhavan", logo: "/assets/srb.png" },
    { name: "Esskay Design Structures Private", logo: "/assets/Esskey.jpeg" },
    { name: "BELRISE INDUSTRIES LTD", logo: "/assets/Belrise.jpeg" },
    { name: "Southern Chemical India Private Limited", logo: "/assets/southern chemical.jpeg" },
    { name: "LKS Gold House", logo: "/assets/Lks.png" },
    { name: "DART GLOBAL LOGISTICS PVT LTD", logo: "/assets/dart.jpeg" },
    { name: "Deepam Eye Hospital", logo: "/assets/Deepam.png" },
    { name: "FATHIMA JEWELLERS", logo: "/assets/fathima.jpeg" },
    { name: "Qspiders", logo: "/assets/qspiders.png" },
    { name: "Jaya SuperMarket", logo: "/assets/jaya.png" },
    { name: "APR SuperMarket", logo: "/assets/apr.webp" },
    { name: "SriKrishna Sweets ", logo: "/assets/sri.webp" },
    { name: "Fair Lady Designer Pvt Ltd (Aachi Masala)", logo: "/assets/aachi.jpg" },
    { name: "Ashok Jewellers", logo: "/assets/ashok.jpg" },
    { name: "Mahalakshmi Jewellers", logo: "/assets/maha.jpg" },
    { name: "Sri Lakshmi Jewellery", logo: "/assets/sril.jpg" },
    { name: "Uniworld Logistics ", logo: "/assets/uni.png" },
    { name: "M/s. Dover India Pvt Ltd", logo: "/assets/dover.jpg" },
    { name: "AMIT - Tamarai tech park", logo: "/assets/lotus.jpg" },
    { name: "Karur Visa Bank", logo: "/assets/karur.jpg" },
    { name: "BADVE Engineering  Pvt Ltd", logo: "/assets/badve.jpg" },
    { name: "Indian Concreate Institute", logo: "/assets/icl.jpg" },
    { name: "Traecit Business Consultants", logo: "/assets/tra.jpg" },
    { name: "Jalpaan Restaurant", logo: "/assets/jal.jpg" },
    { name: "Astoria Restaurant", logo: "/assets/as.png" },
  ];

  const fadeUp = { hidden: { opacity: 0, y: 50 }, visible: { opacity: 1, y: 0, transition: { duration: 0.6 } } };
  const scaleHover = { whileHover: { scale: 1.03, boxShadow: "0px 15px 25px rgba(0,0,0,0.2)" } };

  return (
    <div className="bg-white p-6 rounded-2xl shadow-lg">
      {/* Header */}
      <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
        <h5 className="text-2xl font-bold text-yellow-700 mb-4">
          Service Training – Detailed Syllabus
        </h5>
        <p className="text-gray-700 mb-4 leading-relaxed">
          At <span className="font-semibold text-yellow-600">GVJ</span>, our service training program is designed for HVAC professionals who want hands-on expertise in <span className="font-medium">troubleshooting, repairing, and maintaining</span> modern systems.
        </p>
        <p className="text-gray-700 mb-6 leading-relaxed">
          From understanding <span className="font-medium">system components</span> and <span className="font-medium">electrical controls</span> to <span className="font-medium">preventive maintenance</span> and <span className="font-medium">advanced fault analysis</span>, this curriculum equips you to become an industry-ready HVAC service expert.
        </p>
      </motion.div>

      {/* Embedded PDF Viewer */}
      <motion.div className="mb-12" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} {...scaleHover}>
        <h5 className="text-lg font-bold text-yellow-700 mb-4 text-center">Service Syllabus PDF</h5>
        <div className="w-full h-[600px] md:h-[800px] border border-gray-300 rounded-lg overflow-hidden shadow-lg hover:shadow-2xl transition-transform duration-300">
          <iframe src="/assets/servicesyllabus.pdf" title="Service Syllabus" className="w-full h-full"></iframe>
        </div>
        <p className="mt-2 text-center text-sm text-gray-600">
          Scroll to view the syllabus. <a href="/assets/servicesyllabus.pdf" target="_blank" rel="noopener noreferrer" className="text-yellow-600 underline">Download PDF</a>
        </p>
      </motion.div>

      {/* Companies Worked With */}
      <motion.div className="mt-12" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
        <h4 className="text-2xl md:text-3xl font-bold text-center text-yellow-700 mb-8 drop-shadow">Companies We’ve Worked With</h4>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6 place-items-center">
          {clients.map((client, index) => (
            <motion.div key={index} className="flex flex-col items-center w-36 h-36 md:w-40 md:h-40 bg-white p-4 rounded-2xl shadow hover:shadow-2xl transition group" whileHover={{ scale: 1.1, boxShadow: "0px 20px 30px rgba(0,0,0,0.25)" }}>
              <div className="flex-grow flex items-center justify-center">
                <img src={client.logo} alt={client.name} className="max-h-14 md:max-h-16 max-w-[100px] md:max-w-[120px] object-contain transition-transform duration-300 ease-in-out group-hover:scale-110" />
              </div>
              <p className="mt-2 text-xs md:text-sm text-center text-gray-700 font-medium">{client.name}</p>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}

export default Service;
