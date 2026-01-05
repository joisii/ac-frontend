// src/pages/project/Project.jsx
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import API_BASE from "../../config";

import PdfViewer from "./PdfViewer";
import AmcWarrantyTables from "./AmcWarrantyTables";

function Project() {
  const [warrantyCustomers, setWarranty] = useState([]);
  const [amcCustomers, setAmc] = useState([]);
  const [clients, setClients] = useState([]);

  // -------------------------------------
  // Fetch data
  // -------------------------------------
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [custRes, clientRes] = await Promise.all([
          fetch(`${API_BASE}/customers`),
          fetch(`${API_BASE}/api/clients`),
        ]);

        const custData = await custRes.json();
        setWarranty(custData?.warranty || []);
        setAmc(custData?.amc || []);

        const clientData = await clientRes.json();
        setClients(clientData || []);
      } catch (err) {
        console.error("Failed to fetch data:", err);
      }
    };

    fetchData();
  }, []);

  const fadeUp = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  };

  return (
    <div className="bg-white p-6 rounded-2xl shadow-lg">
      {/* Header */}
      <motion.div initial="hidden" whileInView="visible" variants={fadeUp}>
        <h5 className="text-2xl font-bold text-blue-700 mb-4">
          Project Training – Detailed Syllabus
        </h5>

        <p className="text-gray-700 mb-6">
          At <b className="text-blue-600">GVJ</b>, training means real-world HVAC
          exposure. No fairy tales.
        </p>
      </motion.div>

      {/* PDF Viewer */}
      <PdfViewer
        title="Project Evaluation Sheet"
        pdfUrl={`${API_BASE}/admin/pdf/project`}
      />

      {/* AMC + Warranty Tables */}
      <AmcWarrantyTables
        warrantyCustomers={warrantyCustomers}
        amcCustomers={amcCustomers}
      />

      {/* Clients */}
      <motion.div initial="hidden" whileInView="visible" variants={fadeUp}>
        <h4 className="text-3xl font-bold text-center text-blue-800 mb-10">
          Companies We’ve Worked With
        </h4>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
          {clients.length > 0 ? (
            clients.map((client) => (
              <motion.div
                key={client._id}
                whileHover={{ y: -6, scale: 1.03 }}
                className="bg-white border rounded-xl shadow-md p-4 flex flex-col items-center"
              >
                <div className="h-16 flex items-center justify-center mb-3">
                  <img
                    src={client.logo}
                    alt={client.name}
                    className="max-h-14 object-contain"
                  />
                </div>

                <p className="text-sm font-medium text-gray-700 text-center">
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

export default Project;
