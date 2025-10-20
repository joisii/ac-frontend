// src/pages/training/Project.js
import React from "react";
import { motion } from "framer-motion";

function Project() {
  const warrantyCustomers = [
    { sno: 1, client: "Deepam Eye Hospital" },
    { sno: 2, client: "Dynamic Advertisements" },
    { sno: 3, client: "Fresh 2 Day" },
    { sno: 4, client: "Soorya Hospital" },
    { sno: 5, client: "Fathima Jewellers" },
    { sno: 6, client: "Gateway International School" },
    { sno: 7, client: "Sudha Timber" },
    { sno: 8, client: "Kuralarasan Residence" },
    { sno: 9, client: "LKS Gold House" },
    { sno: 10, client: "Sree Gupta Bhavan" },
    { sno: 11, client: "Innovent Spaces Ltd" },
    { sno: 12, client: "Dahnay Logistics" },
    { sno: 13, client: "Selfie Attire" },
    { sno: 14, client: "Clover Appasamy Apartments" },
  ];

  const amcCustomers = [
    { sno: 1, client: "M.C.T.M. CHIDAMBARAM " },
    { sno: 2, client: "EMPIRE  AUTOS" },
    { sno: 3, client: "Roche Products" },
    { sno: 4, client: "Sai Kirit Jewellers" },
    { sno: 5, client: "Ashok Matches And Timber Industries Priv" },
    { sno: 6, client: "Manna Prayer House Trust " },
    { sno: 7, client: "Shri Vaari Electricals Pvt Ltd" },
    { sno: 8, client: "Sri Lakshmi Jewellers" },
    { sno: 9, client: "Shree Agarwal Sabha" },
    { sno: 10, client: "TEST YANTRA (Q Spider )" },
    { sno: 11, client: "Art Glass Edge" },
    { sno: 12, client: "Esskay Design and Structures Private Limited" },
    { sno: 13, client: "TSS Marriage Hall" },
    { sno: 14, client: "DART GLOBAL LOGISTICS PVT LTD" },
    { sno: 15, client: "ASTORIA VEG RESTAURANT" },
    { sno: 16, client: "RVM Motors" },
    { sno: 17, client: "Jaya Residency" },
    { sno: 18, client: "Dover India Pvt Ltd" },
    { sno: 19, client: "Slam Fitness Studio" },
    { sno: 20, client: "Indiqube Viceroy" },
    { sno: 21, client: "Dahnay Logistics Pvt Ltd" },
    { sno: 22, client: "Uniworld Logistics" },
    { sno: 23, client: "Vista Hall (Velachery Banq Hall)" },
    { sno: 24, client: "Mahalakshmi Jewellers" },
    { sno: 25, client: "Spaces-R K Studio" },
  ];

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
    { name: "'Sooriya Hospital", logo: "/assets/soo.jpg" },
    { name: "'VS Hospital", logo: "/assets/vs.jpg" },
    { name: "JAIGOPAL GARODDIA Matriculation H.S.S", logo: "/assets/jai.jpg" },
    { name: "M C T M School", logo: "/assets/mc.jpg" },
    { name: "Sky Motors (Gym)", logo: "/assets/gy.png" },
    { name: "Slam Fitness", logo: "/assets/slam.png" },
    { name: "Angel TV", logo: "/assets/angel.jpg" },
    { name: "ECI – Thirumangalam", logo: "/assets/ec.jpg" },
    { name: "Healing Gospel Church (HGC)", logo: "/assets/hgc.jpg" },
  ];

  const fadeUp = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  };

  const scaleHover = {
    whileHover: { scale: 1.03, boxShadow: "0px 15px 25px rgba(0,0,0,0.2)" },
  };

  return (
    <div className="bg-white p-6 rounded-2xl shadow-lg">
      {/* Header */}
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={fadeUp}
      >
        <h5 className="text-2xl font-bold text-blue-700 mb-4">
          Project Training – Detailed Syllabus
        </h5>
        <p className="text-gray-700 mb-4 leading-relaxed">
          At <span className="font-semibold text-blue-600">GVJ</span>, project
          training isn’t just about theory—it’s a step-by-step journey into the
          real world of{" "}
          <span className="font-semibold">HVAC systems</span>. Our structured
          syllabus is designed to bridge the gap between classroom knowledge and
          hands-on expertise.
        </p>
        <p className="text-gray-700 mb-6 leading-relaxed">
          This curriculum covers everything from{" "}
          <span className="font-medium">system design</span> and{" "}
          <span className="font-medium">installation practices</span> to{" "}
          <span className="font-medium">troubleshooting</span> and{" "}
          <span className="font-medium">maintenance strategies</span>. By working
          on real-time projects, you’ll build confidence to handle commercial HVAC
          setups independently. Below you can view or download the complete syllabus.
        </p>
      </motion.div>

      {/* Embedded PDF Viewer */}
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={fadeUp}
        className="mb-12"
        {...scaleHover}
      >
        <h5 className="text-lg font-bold text-blue-700 mb-4 text-center">
          Project Evaluation Sheet
        </h5>
        <div className="w-full h-[600px] md:h-[800px] border border-gray-300 rounded-lg overflow-hidden shadow-lg hover:shadow-2xl transition-transform duration-300">
          <iframe
            src="/assets/Project Evaluation Sheet.pdf"
            title="Project Syllabus"
            className="w-full h-full"
          ></iframe>
        </div>
        <p className="mt-2 text-center text-sm text-gray-600">
          Scroll to view the evaluation sheet.{" "}
          <a
            href="/assets/Project Evaluation Sheet.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 underline"
          >
            Download PDF
          </a>
        </p>
      </motion.div>

      {/* Customer Tables moved below PDF */}
      <div className="grid md:grid-cols-2 gap-8 mb-12">
        {/* Warranty Customers */}
        <motion.div
          className="max-w-md"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeUp}
          {...scaleHover}
        >
          <h5 className="text-lg font-bold text-blue-700 mb-4">
            Partial List of Warranty Customers
          </h5>
          <div className="max-h-64 overflow-y-auto border border-gray-300 rounded-lg shadow hover:shadow-lg transition">
            <table className="w-full">
              <thead className="bg-blue-600 text-white sticky top-0">
                <tr>
                  <th className="px-4 py-3 text-left">S.no</th>
                  <th className="px-4 py-3 text-left">Client Name</th>
                </tr>
              </thead>
              <tbody>
                {warrantyCustomers.map((row, i) => (
                  <tr
                    key={i}
                    className={
                      i % 2 === 0
                        ? "bg-gray-50 hover:bg-gray-100 transition"
                        : "bg-white hover:bg-gray-100 transition"
                    }
                  >
                    <td className="px-4 py-2 border-b">{row.sno}</td>
                    <td className="px-4 py-2 border-b">{row.client}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </motion.div>

        {/* AMC Customers */}
        <motion.div
          className="max-w-md"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeUp}
          {...scaleHover}
        >
          <h5 className="text-lg font-bold text-blue-700 mb-4">
            Partial List of AMC Customers
          </h5>
          <div className="max-h-64 overflow-y-auto border border-gray-300 rounded-lg shadow hover:shadow-lg transition">
            <table className="w-full">
              <thead className="bg-blue-600 text-white sticky top-0">
                <tr>
                  <th className="px-4 py-3 text-left">S.no</th>
                  <th className="px-4 py-3 text-left">Client Name</th>
                </tr>
              </thead>
              <tbody>
                {amcCustomers.map((row, i) => (
                  <tr
                    key={i}
                    className={
                      i % 2 === 0
                        ? "bg-gray-50 hover:bg-gray-100 transition"
                        : "bg-white hover:bg-gray-100 transition"
                    }
                  >
                    <td className="px-4 py-2 border-b">{row.sno}</td>
                    <td className="px-4 py-2 border-b">{row.client}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </motion.div>
      </div>

      {/* Companies Worked With (client logos)*/}
      <motion.div
        className="mt-12"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={fadeUp}
      >
        <h4 className="text-2xl md:text-3xl font-bold text-center text-blue-800 mb-8 drop-shadow">
          Companies We’ve Worked With
        </h4>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6 place-items-center">
          {clients.map((client, index) => (
            <motion.div
              key={index}
              className="flex flex-col items-center w-36 h-36 md:w-40 md:h-40 bg-white p-4 rounded-2xl shadow hover:shadow-2xl transition group"
              whileHover={{ scale: 1.1, boxShadow: "0px 20px 30px rgba(0,0,0,0.25)" }}
            >
              <div className="flex-grow flex items-center justify-center">
                <img
                  src={client.logo}
                  alt={client.name}
                  className="max-h-14 md:max-h-16 max-w-[100px] md:max-w-[120px] object-contain transition-transform duration-300 ease-in-out group-hover:scale-110"
                />
              </div>
              <p className="mt-2 text-xs md:text-sm text-center text-gray-700 font-medium">
                {client.name}
              </p>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}

export default Project;
