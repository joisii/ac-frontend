import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import gradients from "../config/gradients";

// Temporary static data (replace later with Excel import)
const restaurantClients = [
  { id: 1, name: "Hotel Sangeetha", location: "Chennai",application: "Hotel",acType: "VRF" },
  { id: 2, name: "M/s Touch Stone", location: "Chennai",application: "Hotel",acType: "Cassette SAC" },
  { id: 3, name: "KFC", location: "Chennai",application: "Restaurant",acType: "Low side works" },
  { id: 4, name: "Garrison Engineers", location: "Chennai",application: "Bar / Restaurant",acType: "DSAC" },
  { id: 5, name: "Hotel Arun Prasad Park", location: "Chennai",application: "Hotel",acType: "VRF" },
  { id: 6, name: "Hotel Kanchi Restaurant", location: "Chennai",application: "Restaurant",acType: "DSAC" },
  { id: 7, name: "Main Land China", location: "Chennai",application: "Restaurant",acType: "DSAC" },
  { id: 8, name: "DR Uthamma Hotel", location: "Chennai",application: "Bar / Restaurant",acType: "DSAC" },
  { id: 9, name: "Akshaya Homes Pvt Ltd", location: "Chennai",application: "Club House",acType: "DVRF" },
  { id: 10, name: "Hotel Ganesh Bhavan", location: "Chennai",application: "Restaurant",acType: "DSAC" },
  { id: 11, name: "Madras Boat Club", location: "Chennai",application: "Bar / Restaurant",acType: "DSAC" },
  { id: 12, name: "Hotel Pratap Plaza", location: "Chennai",application: "Restaurant",acType: "DSAC" },
  { id: 13, name: "Jalpaan Restaurant", location: "Chennai",application: "Restaurant",acType: "DSAC" },
  { id: 14, name: "ISPHANI Centre", location: "Chennai",application: "Restaurant",acType: "DSAC" },
  { id: 15, name: "Mr Ramachandran (Lodge)", location: "Chennai",application: "Lodge",acType: "VRF IV S" },
  { id: 16, name: "Mr Nandamumar", location: "Chennai",application: "Resort",acType: "VRF S" },
  { id: 17, name: "Shree Mahaveer Jewellary Lodge", location: "Kanchipuram",application: "Show Rom",acType: "DSAC" },
  { id: 18, name: "Kings Royal Bar", location: "Chennai",application: "Bar / Restaurant",acType: "IDSAC" },
  { id: 19, name: "Astoria Restaurant", location: "Chennai",application: "Bar / Restaurant",acType: "DSAC" },
  { id: 20, name: "White Castle Restaurant", location: "Chennai",application: "Bar / Restaurant",acType: "V Cool" },
  { id: 21, name: "Astoria Restaurant", location: "Chennai",application: "Restaurant",acType: "DSAC" },
  { id: 22, name: "ANN Residency", location: "Chennai",application: "Restaurant",acType: "DSAC/VRF" },
  { id: 23, name: "Megh Kitchens", location: "Chennai",application: "Restaurant",acType: "DSAC" },
  { id: 24, name: "Rajasekar Lodge", location: "Kanchipuram",application: "Lodge",acType: "VRF IV S" },
  { id: 25, name: "Sudha Timber Lodge", location: "Chennai",application: "Lodge",acType: "LS" },
  { id: 26, name: "Park Club", location: "Chennai",application: "Bar / Restaurant",acType: "LS" },
];
// Helper: Convert array to CSV and trigger download
const downloadCSV = (data, filename = "restaurant_clients.csv") => {
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

export default function RestaurantProjects() {
  const [search, setSearch] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const filteredClients = restaurantClients.filter(
    (c) =>
      c.name.toLowerCase().includes(search.toLowerCase()) ||
      c.location.toLowerCase().includes(search.toLowerCase()) ||
      c.acType.toLowerCase().includes(search.toLowerCase())
  );

  // Motion variants for staggered fade-in
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
      key="restaurant-page"
      initial="hidden"
      animate="visible"
      exit="hidden"
      variants={containerVariants}
      className={`min-h-screen bg-gradient-to-b ${gradients.restaurant} py-16 px-6 font-sans`}
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
        className="text-4xl font-bold text-center mb-10 text-yellow-700"
      >
        Restaurant Projects
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
          className="flex-1 p-3 border border-gray-300 rounded-xl shadow focus:outline-none focus:ring-2 focus:ring-yellow-500"
        />
        <button
          onClick={() => downloadCSV(restaurantClients)}
          className="px-5 py-3 bg-yellow-600 text-white rounded-xl shadow hover:bg-yellow-700 transition"
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
              <th className="p-3 border">Project/Customer Details</th>
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
                    background: "linear-gradient(90deg, rgba(255,255,0,0.1), rgba(255,255,255,0.05))"
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
                <td colSpan="4" className="p-4 text-center text-gray-500">
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
