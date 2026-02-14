// src/pages/RestaurantProjects.js
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import gradients from "../config/gradients";
import API_BASE from "../config";

const SkeletonRow = () => {
  return (
    <tr className="animate-pulse">
      {[1, 2, 3, 4, 5].map((_, i) => (
        <td key={i} className="p-3 border">
          <div className="h-4 bg-gray-300 rounded w-full"></div>
        </td>
      ))}
    </tr>
  );
};

export default function RestaurantProjects() {
  const [search, setSearch] = useState("");
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // 🔹 Fetch projects from backend
  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const res = await fetch(
          `${API_BASE}/projects?category=restaurant`
        );

        if (!res.ok) {
          throw new Error(`HTTP error! status: ${res.status}`);
        }

        const data = await res.json();
        setProjects(data);
      } catch (error) {
        console.error("Error fetching restaurant projects:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, []);

  // 🔹 Search filtering
  const filteredClients = projects.filter(
    (c) =>
      c.name?.toLowerCase().includes(search.toLowerCase()) ||
      c.location?.toLowerCase().includes(search.toLowerCase()) ||
      c.acType?.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <motion.div
      key="restaurant-page"
      initial="hidden"
      animate="visible"
      exit="hidden"
      className={`min-h-screen bg-gradient-to-b ${gradients.restaurant} py-16 px-6 font-sans`}
    >
      {/* Back Button */}
      <div className="max-w-5xl mx-auto mb-6">
        <button
          onClick={() => navigate(-1)}
          className="px-4 py-2 bg-gray-200 text-gray-800 rounded-lg shadow hover:bg-gray-300 transition"
        >
          ⬅ Back
        </button>
      </div>

      {/* Title */}
      <h1 className="text-4xl font-bold text-center mb-10 text-yellow-700">
        Restaurant Projects
      </h1>

      {/* Search */}
      <div className="max-w-3xl mx-auto mb-8 flex flex-col sm:flex-row items-center gap-4">
        <input
          type="text"
          placeholder="Search by name, location, or AC type..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="flex-1 p-3 border border-gray-300 rounded-xl shadow focus:outline-none focus:ring-2 focus:ring-yellow-500"
        />
      </div>

      {/* Table */}
      <div className="overflow-x-auto max-w-5xl mx-auto">
        <table className="w-full border border-gray-300 rounded-xl shadow-md text-sm">
          <thead>
            <tr className="bg-gray-100 text-left">
              <th className="p-3 border">Sl No</th>
              <th className="p-3 border">Project / Customer</th>
              <th className="p-3 border">Location</th>
              <th className="p-3 border">Industry / Application</th>
              <th className="p-3 border">AC Type</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <>
                {[...Array(6)].map((_, index) => (
                  <SkeletonRow key={index} />
                ))}
              </>
            ) : filteredClients.length > 0 ? (
              filteredClients.map((c, index) => (
                <motion.tr
                  key={c._id}
                  initial={{ opacity: 0, x: 30 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3 }}
                  whileHover={{
                    y: -3,
                    boxShadow: "0 8px 20px rgba(0,0,0,0.15)",
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
      </div>
    </motion.div>
  );
}
