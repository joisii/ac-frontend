// src/pages/training/Project.js
import React from "react";
import { motion } from "framer-motion";

function Project() {
  // Customer Data (copied from Repair.js)
  const warrantyCustomers = [
    { sno: 1, client: "ABC Corp" },
    { sno: 2, client: "XYZ Industries" },
    { sno: 3, client: "GreenTech Solutions" },
    { sno: 4, client: "Delta Group" },
    { sno: 5, client: "BrightFuture Pvt Ltd" },
  ];

  const amcCustomers = [
    { sno: 1, client: "Metro Builders" },
    { sno: 2, client: "BlueSky Ltd" },
    { sno: 3, client: "Everest Constructions" },
    { sno: 4, client: "Prime Estates" },
    { sno: 5, client: "Silverline Pvt Ltd" },
  ];

  // Clients Logos
  const clients = [
    { name: "IndiQube Limited", logo: "/assets/indie.jpeg" },
    { name: "Sree Gupta Bhavan", logo: "/assets/srb.png" },
    { name: "Esskay Design Structures Private", logo: "/assets/Esskey.jpeg" },
    { name: "BELRISE INDUSTRIES LTD", logo: "/assets/Belrise.jpeg" },
    {
      name: "Southern Chemical India Private Limited",
      logo: "/assets/southern chemical.jpeg",
    },
    { name: "LKS Old House", logo: "/assets/Lks.png" },
    { name: "DART GLOBAL LOGISTICS PVT LTD", logo: "/assets/dart.jpeg" },
    { name: "Deepam Eye Hospital", logo: "/assets/Deepam.png" },
    { name: "FATHIMA JEWELLERS", logo: "/assets/fathima.jpeg" },
    { name: "Qspiders", logo: "/assets/qspiders.png" },
  ];

  return (
    <div className="bg-white p-6 rounded-2xl shadow-lg">
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

      {/* Embed PDF */}
      <div className="mb-10">
        <iframe
          src="/projectmark.pdf"
          title="Project Syllabus PDF"
          className="w-full h-[600px] border rounded-lg shadow"
        />
        <p className="text-sm text-gray-600 mt-2">
          Can’t view?{" "}
          <a
            href="/projectmark.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 underline"
          >
            Download the syllabus PDF
          </a>
        </p>
      </div>

      {/* Customer Data Tables */}
      <div className="grid md:grid-cols-2 gap-8 mb-12">
        {/* Warranty Customers */}
        <div className="max-w-md">
          <h5 className="text-lg font-bold text-blue-700 mb-4">
            Partial List of Warranty Customers
          </h5>
          <div className="max-h-64 overflow-y-auto border border-gray-300 rounded-lg shadow">
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
                    className={i % 2 === 0 ? "bg-gray-50" : "bg-white"}
                  >
                    <td className="px-4 py-2 border-b">{row.sno}</td>
                    <td className="px-4 py-2 border-b">{row.client}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* AMC Customers */}
        <div className="max-w-md">
          <h5 className="text-lg font-bold text-blue-700 mb-4">
            Partial List of AMC Customers
          </h5>
          <div className="max-h-64 overflow-y-auto border border-gray-300 rounded-lg shadow">
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
                    className={i % 2 === 0 ? "bg-gray-50" : "bg-white"}
                  >
                    <td className="px-4 py-2 border-b">{row.sno}</td>
                    <td className="px-4 py-2 border-b">{row.client}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Companies Worked With */}
      <motion.div
        className="mt-12"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
      >
        <h4 className="text-2xl md:text-3xl font-bold text-center text-blue-800 mb-8 drop-shadow">
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

export default Project;
