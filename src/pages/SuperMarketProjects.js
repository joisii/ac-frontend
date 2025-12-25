// src/pages/SuperMarketProjects.js
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import gradients from "../config/gradients";

export default function SuperMarketProjects() {
  const [search, setSearch] = useState("");
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // 🔹 Fetch supermarket projects from backend
  useEffect(() => {
    const fetchSuperMarketProjects = async () => {
      try {
        const res = await fetch(
          "http://localhost:5000/projects?category=supermarket"
        );
        const data = await res.json();
        setProjects(data);
      } catch (error) {
        console.error("Error fetching supermarket projects:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchSuperMarketProjects();
  }, []);

  // 🔹 Search filter
  const filteredClients = projects.filter(
    (c) =>
      c.name?.toLowerCase().includes(search.toLowerCase()) ||
      c.location?.toLowerCase().includes(search.toLowerCase()) ||
      c.acType?.toLowerCase().includes(search.toLowerCase())
  );

  // Motion variants
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

      {/* Search */}
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
            {loading ? (
              <tr>
                <td colSpan="5" className="p-4 text-center text-gray-500">
                  Loading supermarket projects...
                </td>
              </tr>
            ) : filteredClients.length > 0 ? (
              filteredClients.map((c, index) => (
                <motion.tr
                  key={c._id}
                  variants={rowVariants}
                  initial="hidden"
                  animate="visible"
                  transition={{ delay: 0.3 + index * 0.1 }}
                  whileHover={{
                    y: -3,
                    boxShadow: "0 8px 20px rgba(0,0,0,0.15)",
                    background:
                      "linear-gradient(90deg, rgba(0,128,0,0.1), rgba(255,255,255,0.05))",
                  }}
                  className="cursor-pointer"
                >
                  <td className="p-3 border">{index + 1}</td>
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
