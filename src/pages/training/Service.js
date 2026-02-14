// src/pages/training/Service.js
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import API_BASE from "../../config";

import PdfViewer from "./PdfViewer";
import AmcWarrantyTables from "./AmcWarrantyTables";

function Service() {
  const [warrantyCustomers, setWarranty] = useState([]);
  const [amcCustomers, setAmc] = useState([]);
  const [clients, setClients] = useState([]);
  const [clientsLoading, setClientsLoading] = useState(true);

  // -------------------------------------
  // Fetch data (same as Project)
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
      } finally {
        setClientsLoading(false);
      }
    };

    fetchData();
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

  // -------------------------------------
  // Client skeleton card
  // -------------------------------------
  const ClientSkeleton = ({ index }) => (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: index * 0.08 }}
      className="bg-white border rounded-xl shadow-md p-4 flex flex-col items-center"
    >
      <div className="h-16 w-full flex items-center justify-center mb-3">
        <div className="h-10 w-24 bg-gray-200 rounded animate-pulse" />
      </div>
      <div className="h-3 w-20 bg-gray-200 rounded animate-pulse" />
    </motion.div>
  );

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
          <span className="font-semibold text-yellow-600">GVJ</span>, service
          training is all about mastering real-world HVAC troubleshooting,
          repairs, and preventive maintenance.
        </p>

        <p className="text-gray-700 mb-6 leading-relaxed">
          This curriculum focuses on{" "}
          <span className="font-medium">fault diagnosis</span>,{" "}
          <span className="font-medium">electrical controls</span>, and{" "}
          <span className="font-medium">hands-on service practices</span> to
          build industry-ready professionals.
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

      {/* Clients */}
      <motion.div initial="hidden" whileInView="visible" variants={fadeUp}>
        <h4 className="text-3xl font-bold text-center text-yellow-700 mb-10">
          Companies We’ve Worked With
        </h4>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
          <AnimatePresence>
            {clientsLoading ? (
              [...Array(8)].map((_, i) => (
                <ClientSkeleton key={i} index={i} />
              ))
            ) : clients.length > 0 ? (
              clients.map((client, i) => (
                <motion.div
                  key={client._id}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: i * 0.05 }}
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
          </AnimatePresence>
        </div>
      </motion.div>
    </div>
  );
}

export default Service;
