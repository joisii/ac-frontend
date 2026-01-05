// src/pages/training/Service.js
import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import API_BASE from "../../config";
import PdfViewer from "./PdfViewer";
import AmcWarrantyTables from "./AmcWarrantyTables";

function Service() {
  // -------------------------------------
  // 🔗 Backend Fetch States
  // -------------------------------------
  const [clients, setClients] = useState([]);

  // -------------------------------------
  // Fetch clients from backend
  // -------------------------------------
  useEffect(() => {
    const fetchClients = async () => {
      try {
        const res = await fetch(`${API_BASE}/api/clients`);
        const data = await res.json();
        setClients(data || []);
      } catch (err) {
        console.error("Fetching Clients Failed ➜", err);
      }
    };
    fetchClients();
  }, []);

  // -------------------------------------
  // Animations
  // -------------------------------------
  const fadeUp = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6 },
    },
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
        <h5 className="text-2xl font-bold text-yellow-700 mb-4">
          Service Training – Detailed Syllabus
        </h5>

        <p className="text-gray-700 mb-4 leading-relaxed">
          At{" "}
          <span className="font-semibold text-yellow-600">GVJ</span>, our service
          training program prepares HVAC professionals for real-world
          troubleshooting, repairing, and maintenance.
        </p>

        <p className="text-gray-700 mb-6 leading-relaxed">
          Understanding components, electrical controls, preventive maintenance,
          and fault analysis—this syllabus builds industry-grade service experts.
        </p>
      </motion.div>

      {/* PDF Viewer */}
      <PdfViewer
        title="Service Evaluation Sheet"
        pdfUrl={`${API_BASE}/admin/pdf/service`}
      />

  {/* AMC + Warranty Tables */}
      <AmcWarrantyTables
        warrantyCustomers={warrantyCustomers}
        amcCustomers={amcCustomers}
      />

      {/* Companies Worked With */}
      <motion.div
        className="mt-12"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={fadeUp}
      >
        <h4 className="text-2xl md:text-3xl font-bold text-center text-yellow-700 mb-8 drop-shadow">
          Companies We’ve Worked With
        </h4>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6 place-items-center">
          {clients.length > 0 ? (
            clients.map((client) => (
              <motion.div
                key={client._id}
                className="flex flex-col items-center w-36 h-36 md:w-40 md:h-40 bg-white p-4 rounded-2xl shadow hover:shadow-2xl transition group"
                whileHover={{
                  scale: 1.1,
                  boxShadow: "0px 20px 30px rgba(0,0,0,0.25)",
                }}
              >
                <div className="flex-grow flex items-center justify-center">
                  <img
                    src={client.logo}
                    alt={client.name}
                    className="max-h-14 md:max-h-16 max-w-[120px] object-contain group-hover:scale-110 transition-transform duration-300"
                  />
                </div>
                <p className="mt-2 text-xs md:text-sm text-center text-gray-700 font-medium">
                  {client.name}
                </p>
              </motion.div>
            ))
          ) : (
            <p className="text-gray-500 col-span-full text-center">
              No client data available
            </p>
          )}
        </div>
      </motion.div>
    </div>
  );
}

export default Service;
