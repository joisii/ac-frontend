// src/pages/CorporateOfficeProjects.js
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import gradients from "../config/gradients"; // ✅ gradients import

// Temporary static data (replace with Excel import later)
const officeClients = [
  { id: 1, name: "Anytime Fitness", location: "Chennai", application: "Hotel", acType: "Ducted AC" },
  { id: 2, name: "Gold’s Gym", location: "Bangalore", application: "Hotel", acType: "VRF" },
  { id: 3, name: "Cult.Fit", location: "Hyderabad", application: "Hotel", acType: "Cassette AC" },
];

// Helper: Convert array to CSV and trigger download
const downloadCSV = (data, filename = "corporate_office_clients.csv") => {
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

export default function CorporateOfficeProjects() {
  const [search, setSearch] = useState("");
  const navigate = useNavigate();

  // Always scroll to top on page load
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const filteredClients = officeClients.filter(
    (c) =>
      c.name.toLowerCase().includes(search.toLowerCase()) ||
      c.location.toLowerCase().includes(search.toLowerCase()) ||
      c.acType.toLowerCase().includes(search.toLowerCase()) ||
      c.application.toLowerCase().includes(search.toLowerCase())
  );

  // Motion variants (fade-in like GymProjects)
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15, delayChildren: 0.2 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  return (
    <motion.div
      key="corporate-page"
      initial="hidden"
      animate="visible"
      exit="hidden"
      variants={containerVariants}
      className={`min-h-screen ${gradients.corporate} py-16 px-6 font-sans`}
    >
      <motion.div variants={itemVariants} className="max-w-5xl mx-auto mb-6">
        {/* Back Button */}
        <button
          onClick={() => navigate(-1)}
          className="px-4 py-2 bg-white/70 backdrop-blur-md text-gray-800 rounded-xl shadow hover:bg-white transition"
        >
          ⬅ Back
        </button>
      </motion.div>

      {/* Page Title */}
      <motion.h1
        variants={itemVariants}
        className="text-4xl font-bold text-center mb-10 text-gray-800 drop-shadow"
      >
        Corporate Office Projects
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
          className="flex-1 p-3 border border-gray-300 rounded-xl shadow focus:outline-none focus:ring-2 focus:ring-gray-500"
        />
        <button
          onClick={() => downloadCSV(officeClients)}
          className="px-5 py-3 bg-gray-800 text-white rounded-xl shadow hover:bg-gray-900 transition"
        >
          ⬇ Download All
        </button>
      </motion.div>

      {/* Data Table */}
      <motion.div
        variants={itemVariants}
        className="overflow-x-auto max-w-5xl mx-auto bg-white/80 backdrop-blur-md rounded-2xl shadow-lg"
      >
        <table className="w-full border border-gray-300 rounded-xl text-sm">
          <thead>
            <tr className="bg-gray-200 text-left">
              <th className="p-3 border">Sl No</th>
              <th className="p-3 border">Name</th>
              <th className="p-3 border">Location</th>
              <th className="p-3 border">Industry/Application</th>
              <th className="p-3 border">AC Type</th>
            </tr>
          </thead>
          <tbody>
            {filteredClients.length > 0 ? (
              filteredClients.map((c) => (
                <tr key={c.id} className="hover:bg-gray-100">
                  <td className="p-3 border">{c.id}</td>
                  <td className="p-3 border">{c.name}</td>
                  <td className="p-3 border">{c.location}</td>
                  <td className="p-3 border">{c.application}</td>
                  <td className="p-3 border">{c.acType}</td>
                </tr>
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
