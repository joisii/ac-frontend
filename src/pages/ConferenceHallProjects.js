// src/pages/ConferenceHallProjects.js
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import gradients from "../config/gradients";

// Temporary static data (replace later with Excel import)
const conferenceClients = [
  { id: 1, name: "SRM MD’s Residence", location: "Chennai", application: "Residence", acType: "SAC + Cassette SAC" },
  { id: 2, name: "Ar. Senthil kumar Residence", location: "Bangalore", application: "Hotel", acType: "Concealed SAC" },
  { id: 3, name: "Mr. Sirajudeen Residence", location: "Hyderabad", application: "Hotel", acType: "Free Match VRV" },
  { id: 4, name: "Mr Venkatraman (Mrs Banumathi giridharan)", location: "Chennai", application: "Residence", acType: "Free Match " },
  { id: 5, name: "Tulip horizon", location: "Chennai", application: "Residence", acType: "Free Match " },
  { id: 6, name: "Lingam Residency", location: "Vellore", application: "Residence", acType: "VRF IV S" },
  { id: 7, name: "WOGO SMS Trade House Pvt Ltd", location: "Chennai", application: "Residence", acType: "VRF IV S" },
  { id: 8, name: "Vadivelan residence", location: "Chennai", application: "Residence", acType: "DSAC" },
  { id: 9, name: "Aachi masala", location: "Chennai", application: "Guest House", acType: "VRF IV S" },
  { id: 10, name: "Sri Krishna Adithya College of Arts and Science", location: "Coimbatore", application: "Guest House", acType: "DSAC" },
  { id: 11, name: "Sri Krishna College of Technology", location: "Coimbatore", application: "Guest House", acType: "DSAC" },
  { id: 12, name: "Dr Rajiv Residence", location: "Chennai", application: "Residence", acType: "VRF IV S" },
  { id: 13, name: "Gee Kay Constructions", location: "Chennai", application: "Residence", acType: "VRF IV S" },
  { id: 14, name: "Mr Narayana Babu", location: "Chennai", application: "Residence", acType: "VRF IV S" },
  { id: 15, name: "Ar Kishore Residence", location: "Chennai", application: "Residence", acType: "VRF IV S" },
  { id: 16, name: "Mr Maqbool Hassan Residence", location: "Chennai", application: "Residence", acType: "VRF IV S" },
  { id: 17, name: "Mr Anandan Residence", location: "Chennai", application: "Residence", acType: "VRF IV S" },
  { id: 18, name: "Mr Karthikeyan Residence", location: "Chennai", application: "Residence", acType: "VRF IV S" },
  { id: 19, name: "Mr Sriram Residence", location: "Chennai", application: "Residence", acType: "VRF IV S" },
  { id: 20, name: "Mr Nandakumar Residence", location: "Chennai", application: "Residence", acType: "VRF IV S" },
  { id: 21, name: "Mr Mohamed Abith", location: "Chennai", application: "Residence", acType: "DSAC" },
  { id: 22, name: "Mr Basheer Residence", location: "Chennai", application: "Residence", acType: "VRF IV S" },
  { id: 23, name: "Mrs Sheela Nagarajan Residence", location: "Chennai", application: "Residence", acType: "VRF IV S" },
  { id: 24, name: "Mr Vijay Lodha", location: "Madhurandagam", application: "Residence", acType: "DSAC" },
  { id: 25, name: "Mrs Bina Ramesh", location: "Ambattur", application: "Residence", acType: "VRF IV S" },
  { id: 26, name: "Pastor Kinsley Residence (Manna Prayer House)", location: "Old Perumbuttur", application: "Residence", acType: "VRF IV S" },
  { id: 27, name: "Mr. Srivatsav", location: "Chennai", application: "Residence", acType: "VRF IV S" },
  { id: 28, name: "Auditor Krishna Kumar", location: "Chennai", application: "Residence", acType: "VRF IV S" },
  { id: 29, name: "Valli Ramanathan", location: "Chennai", application: "Residence", acType: "V Cool AC" },
  { id: 30, name: "Ar Archana Bansil", location: "Chennai", application: "Residence", acType: "DSAC" },
  { id: 31, name: "Mr. Nageshwara Rao", location: "Chennai", application: "Residence", acType: "VRF IV S" },
  { id: 32, name: "Mr. Basant Merathia", location: "Chennai", application: "Residence", acType: "VRF" },
  { id: 33, name: "Capt. Chandrasekar", location: "Chennai", application: "Residence", acType: "VRF" },
  { id: 34, name: "Newgenics Pharma (Mr. Ram)", location: "Chennai", application: "Residence", acType: "VRF" },
  { id: 35, name: "Mr. Venkat Chandilya", location: "Chennai", application: "Residence", acType: "SAC" },
  { id: 36, name: "Hiranmayi Interio (Mr. Sathish)", location: "Chennai", application: "Residence", acType: "Concealed SA" },
  { id: 37, name: "Mr. Huzefa", location: "Chennai", application: "Residence", acType: "SAC" },
  { id: 38, name: "A Chandranathan (Mr. Vinoth)", location: "Chennai", application: "Residence", acType: "VRF S" },
];

// Helper: Convert array to CSV and trigger download
const downloadCSV = (data, filename = "conference_clients.csv") => {
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

export default function ConferenceHallProjects() {
  const [search, setSearch] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const filteredClients = conferenceClients.filter(
    (c) =>
      c.name.toLowerCase().includes(search.toLowerCase()) ||
      c.location.toLowerCase().includes(search.toLowerCase()) ||
      c.acType.toLowerCase().includes(search.toLowerCase())
  );

  // Motion variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.2
      }
    },
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
      key="conference-page"
      initial="hidden"
      animate="visible"
      exit="hidden"
      variants={containerVariants}
      className={`min-h-screen bg-gradient-to-b ${gradients.orange} py-16 px-6 font-sans`}
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

      <motion.h1 
        variants={itemVariants} 
        className="text-4xl font-bold text-center mb-10 text-orange-800"
      >
        Conference Hall Projects
      </motion.h1>

      {/* Search + Download */}
      <motion.div variants={itemVariants} className="max-w-3xl mx-auto mb-8 flex flex-col sm:flex-row items-center gap-4">
        <input
          type="text"
          placeholder="Search by name, location, or AC type..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="flex-1 p-3 border border-gray-300 rounded-xl shadow focus:outline-none focus:ring-2 focus:ring-orange-500"
        />
        <button
          onClick={() => downloadCSV(conferenceClients)}
          className="px-5 py-3 bg-orange-600 text-white rounded-xl shadow hover:bg-orange-700 transition"
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
                    background: "linear-gradient(90deg, rgba(255,165,0,0.1), rgba(255,255,255,0.05))"
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
