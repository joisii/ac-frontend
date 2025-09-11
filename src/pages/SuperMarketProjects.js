// src/pages/SuperMarketProjects.js
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import gradients from "../config/gradients";

// Static data (replace with Excel import later)
const supermarketClients = [
  { id: 1, name: "RMK Super Market", location: "Chennai", application: "Super Market", acType: "DSAC" },
  { id: 2, name: "Jaya Super market", location: "Chennai", application: "Super Market", acType: "DSAC" },
  { id: 3, name: "Joseph super market", location: "Chennai", application: "Super Market", acType: "DSAC" },
  { id: 4, name: "M/s. Rogers Family Super market", location: "Chennai", application: "Super Market", acType: "DSAC" },
  { id: 5, name: "Orange Super Market", location: "Chennai", application: "Super Market", acType: "DSAC" },
  { id: 6, name: "New Jayam Super Market", location: "Chennai", application: "Super Market", acType: "DSAC" },
  { id: 7, name: "M/s. CJ Reddy Hospital + Super Market", location: "Chennai", application: "Super Market", acType: "DSAC" },
  { id: 8, name: "Golden Super Market", location: "Chennai", application: "Super Market", acType: "DSAC" },
  { id: 9, name: "Namma Super Market ", location: "Chennai", application: "Super Market", acType: "DSAC" },
  { id: 10, name: "Star Kovai Super Market", location: "Chennai", application: "Super Market", acType: "DSAC" },
  { id: 11, name: "KPK Super market", location: "Chennai", application: "Super Market", acType: "DSAC" },
  { id: 12, name: "Ravi Margin Super market", location: "Chennai", application: "Super Market", acType: "DSAC" },
  { id: 13, name: "Rajam Super market", location: "Chennai", application: "Super Market", acType: "DSAC" },
  { id: 14, name: "Pazamudiur nilayam - karur", location: "Chennai", application: "Super Market", acType: "DSAC" },
  { id: 15, name: "Airforce (URC - Unit Run canteen)", location: "Chennai", application: "Super Market", acType: "DSAC" },
  { id: 16, name: "APR Super Market", location: "Chennai", application: "Super Market", acType: "Inv DSAC" },
  { id: 17, name: "Aynnar super market", location: "Chennai", application: "Super Market", acType: "DSAC" },
  { id: 18, name: "Kamadhenu super market", location: "Chennai", application: "Super Market", acType: "DSAC" },
  { id: 19, name: "New Jayam Super Market", location: "Chennai", application: "Super Market", acType: "DSAC" },
  { id: 20, name: "AAJ Supermarket", location: "Chennai", application: "Super Market", acType: "DSAC" },
  { id: 21, name: "Karts & Baskets Super Market", location: "Chennai", application: "Super Market", acType: "DSAC" },
  { id: 22, name: "Elahi super market", location: "Chennai", application: "Super Market", acType: "DSAC" },
  { id: 23, name: "Muthu Super Market", location: "Chennai", application: "Super Market", acType: "DSAC" },
  { id: 24, name: "Ambika Provisions", location: "Chennai", application: "Super Market", acType: "I DSAC" },
  { id: 25, name: "Sri Balaji Super Market", location: "Chennai", application: "Super Market", acType: "DSAC" },
  { id: 26, name: "ASR VeluS Pazlamudir Solai & Super Market ", location: "Chennai", application: "Super Market", acType: "DSAC" },
  { id: 27, name: "Sri Venkateswara Super Market", location: "Chennai", application: "Super Market", acType: "DSAC" },
  { id: 28, name: "RVV Hyper Stores ", location: "Vellore", application: "Super Market", acType: "DSAC" },
  { id: 29, name: "Jeyam Stores", location: "Karaikudi", application: "Super Market", acType: "PAC" },
  { id: 30, name: "R Champalal and co", location: "Chennai", application: "Super Market", acType: "DSAC" },
  { id: 31, name: "Saravana Stores", location: "Chennai", application: "Super Market", acType: "PAC" },
  { id: 32, name: "Raja Shop", location: "Chennai", application: "Super Market", acType: "Inv DSAC" },
  { id: 33, name: "The Fresh Basket (Amith Shah Super Market) ", location: "Chennai", application: "Super Market", acType: "DSAC" },
  { id: 34, name: "Transcend Super Mart", location: "Chennai", application: "Super Market", acType: "DSAC" },
  { id: 35, name: "Natraj Traders", location: "Chennai", application: "Super Market", acType: "DSAC" },
  { id: 36, name: "Gandhimathi Super Market ", location: "Chennai", application: "Super Market", acType: "Inv DSAC" },
  { id: 37, name: "Vaibhave shoppe Super Market ", location: "Chennai", application: "Super Market", acType: "Inv DSAC" },
  { id: 38, name: "Amar Communication ", location: "Chennai", application: "Super Market", acType: "DSAC" },

];

export default function SuperMarketProjects() {
  const [search, setSearch] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const filteredClients = supermarketClients.filter(
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
      key="supermarket-page"
      initial="hidden"
      animate="visible"
      exit="hidden"
      variants={containerVariants}
      className={`min-h-screen bg-gradient-to-b ${gradients.supermarket} py-16 px-6 font-sans`}
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
        className="text-4xl font-bold text-center mb-10 text-green-800"
      >
        Super Market Projects
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
          className="flex-1 p-3 border border-gray-300 rounded-xl shadow focus:outline-none focus:ring-2 focus:ring-green-500"
        />
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
                    background: "linear-gradient(90deg, rgba(0,128,0,0.1), rgba(255,255,255,0.05))",
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
