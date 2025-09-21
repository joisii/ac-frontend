// src/pages/training/Service.js
import React from "react";
import { motion } from "framer-motion";

function Service() {
  // Warranty units data
  const unit1Data = [
    { sno: 1, description: "Compressor", condition: "Good" },
    { sno: 2, description: "Condenser Coil", condition: "Needs Cleaning" },
    { sno: 3, description: "Fan Motor", condition: "Working" },
  ];

  const unit2Data = [
    { sno: 1, description: "Evaporator Coil", condition: "Good" },
    { sno: 2, description: "Thermostat", condition: "Replace Soon" },
    { sno: 3, description: "Blower Motor", condition: "Operational" },
  ];

  // Companies logos data
  const clients = [
    { name: "IndiQube Limited", logo: "/assets/indie.jpeg" },
    { name: "Sree Gupta Bhavan", logo: "/assets/srb.png" },
    { name: "Esskay Design Structures Private", logo: "/assets/Esskey.jpeg" },
    { name: "BELRISE INDUSTRIES LTD", logo: "/assets/Belrise.jpeg" },
    { name: "Southern Chemical India Private Limited", logo: "/assets/southern chemical.jpeg",},
    { name: "LKS Old House", logo: "/assets/Lks.png" },
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
    { name: "JAIGOPAL GARODDIA Matriculation Higher Secondary School", logo: "/assets/jai.jpg" },
    { name: "M C T M School", logo: "/assets/mc.jpg" },
    { name: "Sky Motors (Gym)", logo: "/assets/gy.png" },
    { name: "Slam Fitness", logo: "/assets/slam.png" },
    { name: "Angel TV", logo: "/assets/angel.jpg" },
    { name: "ECI – Thirumangalam", logo: "/assets/ec.jpg" },
    { name: "Healing Gospel Church (HGC)", logo: "/assets/hgc.jpg" },
  ];

  return (
    <div className="bg-white p-6 rounded-2xl shadow-lg">
      <h5 className="text-2xl font-bold text-yellow-700 mb-4">
        Service Training – Detailed Syllabus
      </h5>
      <p className="text-gray-700 mb-4 leading-relaxed">
        At <span className="font-semibold text-yellow-600">GVJ</span>, our{" "}
        <span className="font-semibold">Service Training</span> syllabus is
        designed for HVAC professionals who want to master the art of{" "}
        <span className="font-medium">
          troubleshooting, repairing, and maintaining
        </span>{" "}
        modern air conditioning systems. This isn’t just theory—it’s about
        diagnosing problems under real-time fault simulations and sharpening the
        skills needed on the field.
      </p>
      <p className="text-gray-700 mb-6 leading-relaxed">
        From understanding <span className="font-medium">system components</span>{" "}
        and <span className="font-medium">electrical controls</span> to learning{" "}
        <span className="font-medium">preventive maintenance</span> and{" "}
        <span className="font-medium">advanced fault analysis</span>, this syllabus
        gives you the complete roadmap to become an industry-ready HVAC service
        expert.
      </p>

      {/* Embed PDF - Mobile Friendly */}
      <div className="mb-10">
        <iframe
          src="/servicedata.pdf"
          title="Service Syllabus PDF"
          className="w-full h-[400px] md:h-[600px] border rounded-lg shadow"
        />
        <p className="text-sm text-gray-600 mt-2 text-center">
          Can’t view the file?{" "}
          <a
            href="/servicedata.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="text-yellow-600 underline"
          >
            Download the syllabus PDF
          </a>
        </p>
      </div>

      {/* Warranty Data Tables */}
      <div className="grid md:grid-cols-2 gap-8">
        {/* Unit 1 */}
        <div className="max-w-md">
          <h5 className="text-lg font-bold text-yellow-700 mb-4">
            Unit No. 1 - 16 TR DPA
          </h5>
          <div className="max-h-64 overflow-y-auto border border-gray-300 rounded-lg shadow">
            <table className="w-full">
              <thead className="bg-yellow-500 text-white sticky top-0">
                <tr>
                  <th className="px-4 py-3 text-left">S.no</th>
                  <th className="px-4 py-3 text-left">Description</th>
                  <th className="px-4 py-3 text-left">Present Condition</th>
                </tr>
              </thead>
              <tbody>
                {unit1Data.map((row, i) => (
                  <tr
                    key={i}
                    className={i % 2 === 0 ? "bg-gray-50" : "bg-white"}
                  >
                    <td className="px-4 py-2 border-b">{row.sno}</td>
                    <td className="px-4 py-2 border-b">{row.description}</td>
                    <td className="px-4 py-2 border-b">{row.condition}</td>
                  </tr>
                ))}
                <tr>
                  <td
                    colSpan={3}
                    className="px-4 py-3 bg-yellow-100 font-semibold"
                  >
                    Remarks: All components inspected. Minor cleaning required.
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* Unit 2 */}
        <div className="max-w-md">
          <h5 className="text-lg font-bold text-yellow-700 mb-4">
            Unit No. 2 - 16 TR DPA
          </h5>
          <div className="max-h-64 overflow-y-auto border border-gray-300 rounded-lg shadow">
            <table className="w-full">
              <thead className="bg-yellow-500 text-white sticky top-0">
                <tr>
                  <th className="px-4 py-3 text-left">S.no</th>
                  <th className="px-4 py-3 text-left">Description</th>
                  <th className="px-4 py-3 text-left">Present Condition</th>
                </tr>
              </thead>
              <tbody>
                {unit2Data.map((row, i) => (
                  <tr
                    key={i}
                    className={i % 2 === 0 ? "bg-gray-50" : "bg-white"}
                  >
                    <td className="px-4 py-2 border-b">{row.sno}</td>
                    <td className="px-4 py-2 border-b">{row.description}</td>
                    <td className="px-4 py-2 border-b">{row.condition}</td>
                  </tr>
                ))}
                <tr>
                  <td
                    colSpan={3}
                    className="px-4 py-3 bg-yellow-100 font-semibold"
                  >
                    Remarks: Thermostat replacement suggested in next service
                    cycle.
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Companies Section */}
      <motion.div
        className="mt-12"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
      >
        <h4 className="text-xl md:text-2xl font-bold text-center text-yellow-700 mb-8 drop-shadow">
          Companies We’ve Worked With
        </h4>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6 place-items-center">
          {clients.map((client, index) => (
            <motion.div
              key={index}
              className="flex flex-col items-center w-36 h-36 md:w-40 md:h-40 bg-white p-4 rounded-2xl shadow hover:shadow-2xl transition group"
              whileHover={{ scale: 1.07 }}
            >
              <div className="flex-grow flex items-center justify-center">
                <img
                  src={client.logo}
                  alt={client.name}
                  className="max-h-14 md:max-h-16 max-w-[100px] md:max-w-[120px] object-contain grayscale group-hover:grayscale-0 transition"
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

export default Service;
