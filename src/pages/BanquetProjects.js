// Import React and hooks for state and lifecycle management
import React, { useState, useEffect } from "react";
// Import navigation hook from react-router-dom
import { useNavigate } from "react-router-dom";
// Import motion for animations from framer-motion
import { motion } from "framer-motion";
// Import gradients config for background styling
import gradients from "../config/gradients";

// Temporary static data for banquet clients (replace later with Excel import)
const banquetClients = [
  { id: 1, name: "Jain Kalyana mandapam", location: "Chennai", application: "Marriage Hall", acType: "DSAC" },
  { id: 2, name: "Rajasekaran Kalyana mandapam", location: "Chennai", application: "Marriage Hall", acType: "DSAC" },
  { id: 3, name: "Mahalakshmi Kalyana mandapam", location: "Chennai", application: "Marriage Hall", acType: "DSAC" },
  { id: 4, name: "Perundhalaivar Kamrajar Kalyana Mandapam", location: "Chennai", application: "Marriage Hall", acType: "DSAC" },
  { id: 5, name: "Pon Pandiyan kalyana mandapam", location: "Chennai", application: "Marriage Hall", acType: "DSAC" },
  { id: 6, name: "eN kalyana mandapam", location: "Chennai", application: "Marriage Hall", acType: "DSAC" },
  { id: 7, name: "Mohan Towers", location: "Chennai", application: "Marriage Hall", acType: "DSAC" },
  { id: 8, name: "KVT Kalyana mandapam", location: "Chennai", application: "Marriage Hall", acType: "DSAC" },
  { id: 9, name: "Navarathna Properties", location: "Chennai", application: "Marriage Hall", acType: "DSAC" },
  { id: 10, name: "Periyapallayam kalyana Mandapam", location: "Chennai", application: "Marriage Hall", acType: "DSAC" },
  { id: 11, name: "KRS Car Care (Kalyana mandapam)", location: "Chennai", application: "Marriage Hall", acType: "DSAC" },
  { id: 12, name: "JShree Lakshmi Narayani Mahal", location: "Chennai", application: "Marriage Hall", acType: "DSAC" },
  { id: 13, name: "Hotel Manickam Grand", location: "Chennai", application: "Marriage Hall", acType: "DSAC" },
  { id: 14, name: "AGP Homes ", location: "Chennai", application: "Marriage Hall", acType: "DSAC" },
  { id: 15, name: "TKP Marriage Hall", location: "Chennai", application: "Marriage Hall", acType: "DSAC" },
  { id: 16, name: "Agarwal saba", location: "Chennai", application: "Marriage Hall", acType: "Inv DSAC" },
  { id: 17, name: "Balaji jewellers ", location: "Chennai", application: "Marriage Hall", acType: "DSAC" },
  { id: 18, name: "Brindavan mahal (Periyapalayam)", location: "Chennai", application: "Marriage Hall", acType: "DSAC" },
  { id: 19, name: "SPS Kalyana Mandapam", location: "Chennai", application: "Marriage Hall", acType: "DSAC" },
  { id: 20, name: "Vadachennai vazum TSS Nadar KM", location: "Chennai", application: "Marriage Hall", acType: "DSAC" },  
  { id: 21, name: "Sri Naryana Mahal", location: "Chennai", application: "Marriage Hall", acType: "DSAC" },
  { id: 22, name: "Jain Temple KM", location: "Chennai", application: "Marriage Hall", acType: "DSAC" },
  { id: 23, name: "KNE Foundation", location: "Chennai", application: "Marriage Hall", acType: "DSAC" },
  { id: 24, name: "Sri Devi Prasana Mahal", location: "Chennai", application: "Marriage Hall", acType: "DSAC" },
  { id: 25, name: "Mr Saravanan ", location: "Chennai", application: "Marriage Hall", acType: "DSAC" },
  { id: 26, name: "Sakthi Thiruman malaigai", location: "Chennai", application: "Marriage Hall", acType: "DSAC" },
  { id: 27, name: "Vijaya Seha Mahal", location: "Salem", application: "Marriage Hall", acType: "PAC" },
  { id: 28, name: "SRKK Agarwal Kalyanan Mandapam", location: "Chennai", application: "Marriage Hall", acType: "I DSAC" },
  { id: 29, name: "AVS Mahal", location: "Thiruthani", application: "Marriage Hall", acType: "DSAC" },
  { id: 30, name: "Lion Bhaskar Marriage Hall", location: "Chennai", application: "Marriage Hall", acType: "DSAC" },
  { id: 31, name: "Mr Asokan (Viaar Builders)", location: "Chennai", application: "Marriage Hall", acType: "DSAC" },
  { id: 32, name: "KN Swamy Kalayana Mandapam", location: "Chennai", application: "Marriage Hall", acType: "DSAC" },
  { id: 33, name: "KVR Vivaha Vedika", location: "Goodur", application: "Marriage Hall", acType: "DSAC" },
  { id: 34, name: "Sky Palace", location: "Chennai", application: "Marriage Hall", acType: "DSAC" },
  { id: 35, name: "Muruga Mahal", location: "Chennai", application: "Marriage Hall", acType: "DSAC" },
  { id: 36, name: "Vijay Shree Mahal", location: "Aarani", application: "Marriage Hall", acType: "DSAC" },
  { id: 37, name: "KVMG Mahal", location: "Chennai", application: "Marriage Hall", acType: "DSAC" },
  { id: 38, name: "Sivandhi Adithanar Marriage Hall", location: "Chennai", application: "Marriage Hall", acType: "DSAC" },
  { id: 39, name: "Ramachandran Annachi KM", location: "Chennai", application: "Marriage Hall", acType: "DSAC" },
  { id: 40, name: "Goldmine Infoteck Pvt Ltd (Maduvankarai)", location: "Chennai", application: "Marriage Hall", acType: "DSAC" },
  { id: 41, name: "Allandhur Vattarah Nadar Kalyana Mandapam", location: "Chennai", application: "Marriage Hall", acType: "DSAC" },
  { id: 42, name: "Adigaud Brahin Mahasaha ", location: "Chennai", application: "Marriage Hall", acType: "DSAC" },
  { id: 43, name: "'Adigaud Brahmin Mahasabha Marriage hall", location: "Chennai", application: "Marriage Hall", acType: "DSAC" },
  { id: 44, name: "AM Mahal", location: "Chennai", application: "Marriage Hall", acType: "DSAC" },
];


// Main component for Banquet Projects page
export default function BanquetProjects() {
  const [search, setSearch] = useState("");
  const navigate = useNavigate();

  // Scroll to top on mount
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Filter logic
  const filteredClients = banquetClients.filter(
    (c) =>
      c.name.toLowerCase().includes(search.toLowerCase()) ||
      c.location.toLowerCase().includes(search.toLowerCase()) ||
      c.acType.toLowerCase().includes(search.toLowerCase())
  );

  // Animation configs
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.15, delayChildren: 0.2 } },
  };
  const itemVariants = { hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0, transition: { duration: 0.5 } } };
  const rowVariants = { hidden: { opacity: 0, x: 50 }, visible: { opacity: 1, x: 0, transition: { duration: 0.5 } } };

  return (
    <motion.div
      key="banquet-page"
      initial="hidden"
      animate="visible"
      exit="hidden"
      variants={containerVariants}
      className={`min-h-screen bg-gradient-to-b ${gradients.banquet} py-16 px-6 font-sans`}
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

      {/* Page Title */}
      <motion.h1
        variants={itemVariants}
        className="text-4xl font-bold text-center mb-10 text-purple-800"
      >
        Banquet Hall Projects
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
          className="flex-1 p-3 border border-gray-300 rounded-xl shadow focus:outline-none focus:ring-2 focus:ring-purple-500"
        />
      </motion.div>

      {/* Table */}
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
                    background: "linear-gradient(90deg, rgba(128,0,128,0.1), rgba(255,255,255,0.05))"
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
