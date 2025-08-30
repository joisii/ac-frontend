// src/pages/HospitalProjects.js
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import gradients from "../config/gradients";

// Static data (replace with Excel import later)
const hospitalClients = [
  { id: 1, name: "Sri Manakula Vinayakar Medical college and Hospital", location: "Pondichery", application: "Hospital Area", acType: "Casstte SAC" },
  { id: 2, name: "SRM Institute of Medical Sciences", location: "Chennai", application: "Hospital Area", acType: "DSAC/LDPA" },
  { id: 3, name: "Vedant Air Management Products", location: "Chennai", application: "Operation Theatre", acType: "DSAC" },
  { id: 4, name: "Aditya Floor Tech Pvtl Ltd (For Balaji Hospital )", location: "Chennai", application: "Hospital Area", acType: "DSAC" },
  { id: 5, name: "I Clean", location: "Chennai", application: "Clean Room", acType: "DSAC" },
  { id: 6, name: "BM Hospital", location: "Chennai", application: "Hospital Area", acType: "DSAC/LDPA" },
  { id: 7, name: "SRM Institute of Medical Sciences", location: "Chennai", application: "Clinic", acType: "DSAC" },
  { id: 8, name: "Vijaya Diagnostic Centre", location: "Nellore", application: "Lab Area", acType: "Free Match" },
  { id: 9, name: "Sugam Hospital", location: "Chennai", application: "Hospital Area", acType: "DSAC" },
  { id: 10, name: "Capelin Point", location: "Chennai", application: "Pharma Storage", acType: "DSAC" },
  { id: 11, name: "Westminister health care", location: "Chennai", application: "Hospital Area", acType: "VRF" },
  { id: 12, name: "Jananam Hospital", location: "Chennai", application: "Lab Area", acType: "DSAC" },
  { id: 13, name: "Eakcon Systems Pvt Ltd", location: "Chennai", application: "Lab Area", acType: "DSAC" },
  { id: 14, name: "Dr Kamatchi Memorial Hospital", location: "Chennai", application: "Diagnostic Lab Area", acType: "DSAC" },
  { id: 15, name: "Stanley Hospital (Blood Bank)", location: "Chennai", application: "Blood Bank", acType: "PAC" },
  { id: 16, name: "Morrisons Life Care Pvt Ltd", location: "Chennai", application: "Lab Area", acType: "Verti Cool" },
  { id: 17, name: "'Scitus Pharma Services Pvt Ltd", location: "Chennai", application: "Pharma ", acType: "SAC" },
  { id: 18, name: "Morrisons Life Care Pvt Ltd", location: "Chennai", application: "Lab Area", acType: "Verti Cool" },
  { id: 19, name: "Cure Healthcare Systems Pvt Ltd", location: "Chennai", application: "Lab Area", acType: "SAC" },
  { id: 20, name: "'Infinity Projects - NOVA IVF", location: "Madurai", application: "Hospital", acType: "VRV" },
  { id: 21, name: "'Varian Medical Systems (JIPMER)", location: "Pondichery", application: "Hospital", acType: "DSAC" },
];

// CSV download helper
const downloadCSV = (data, filename = "hospital_clients.csv") => {
  const headers = Object.keys(data[0]).join(",") + "\n";
  const rows = data.map((row) => Object.values(row).join(",")).join("\n");
  const csv = headers + rows;

  const blob = new Blob([csv], { type: "text/csv" });
  const url = window.URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  a.click();
  window.URL.revokeObjectURL(url);
};

export default function HospitalProjects() {
  const [search, setSearch] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const filteredClients = hospitalClients.filter(
    (c) =>
      c.name.toLowerCase().includes(search.toLowerCase()) ||
      c.location.toLowerCase().includes(search.toLowerCase()) ||
      c.acType.toLowerCase().includes(search.toLowerCase())
  );

  // Motion variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.15, delayChildren: 0.2 } },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  const rowVariants = {
    hidden: { opacity: 0, x: 50 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.5 } },
  };

  return (
    <motion.div
      key="hospital-page"
      initial="hidden"
      animate="visible"
      exit="hidden"
      variants={containerVariants}
      className={`min-h-screen bg-gradient-to-b ${gradients.hospital} py-16 px-6 font-sans`}
    >
      {/* Back Button */}
      <motion.div variants={itemVariants} className="max-w-5xl mx-auto mb-6">
        <button
          onClick={() => navigate(-1)}
          className="px-4 py-2 bg-gray-200 text-gray-800 rounded-lg shadow hover:bg-gray-300 transition"
        >
          ⬅ Back
        </button>
      </motion.div>

      {/* Title */}
      <motion.h1
        variants={itemVariants}
        className="text-4xl font-bold text-center mb-10 text-teal-800"
      >
        Hospital Projects
      </motion.h1>

      {/* Search + Download */}
      <motion.div
        variants={itemVariants}
        className="max-w-3xl mx-auto mb-8 flex flex-col sm:flex-row items-center gap-4"
      >
        <input
          type="text"
          placeholder="Search by name, location, or AC type..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="flex-1 p-3 border border-gray-300 rounded-xl shadow focus:outline-none focus:ring-2 focus:ring-teal-500"
        />
        <button
          onClick={() => downloadCSV(hospitalClients)}
          className="px-5 py-3 bg-gradient-to-r from-teal-600 via-teal-500 to-teal-700 text-white rounded-xl shadow hover:opacity-90 transition"
        >
          ⬇ Download All
        </button>
      </motion.div>

      {/* Data Table */}
      <motion.div variants={itemVariants} className="overflow-x-auto max-w-5xl mx-auto">
        <table className="w-full border border-gray-300 rounded-xl shadow-md text-sm">
          <thead>
            <tr className="bg-gray-100 text-left">
              <th className="p-3 border">Sl No</th>
              <th className="p-3 border">Name</th>
              <th className="p-3 border">Location</th>
              <th className="p-3 border">Industry/Application</th>
              <th className="p-3 border">AC Type</th>
            </tr>
          </thead>
          <tbody>
            {filteredClients.length > 0 ? (
              filteredClients.map((c, index) => (
                <motion.tr
                  key={c.id}
                  variants={rowVariants}
                  initial="hidden"
                  animate="visible"
                  transition={{ delay: 0.3 + index * 0.1 }}
                  whileHover={{
                    y: -3,
                    boxShadow: "0 8px 20px rgba(0,0,0,0.15)",
                    background: "linear-gradient(90deg, rgba(0,128,128,0.1), rgba(255,255,255,0.05))",
                  }}
                  className="cursor-pointer"
                >
                  <td className="p-3 border">{c.id}</td>
                  <td className="p-3 border">{c.name}</td>
                  <td className="p-3 border">{c.location}</td>
                  <td className="p-3 border">{c.application}</td>
                  <td className="p-3 border">{c.acType}</td>
                </motion.tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" className="p-4 text-center text-gray-500">
                  No results found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </motion.div>
    </motion.div>
  );
}
