// src/pages/GymProjects.js
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import gradients from "../config/gradients";
import API_BASE from "../config";

// 🔹 Skeleton Row Component
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

export default function GymProjects() {
  const [search, setSearch] = useState("");
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // 🔹 Fetch gym projects from backend
  useEffect(() => {
    const fetchGymProjects = async () => {
      try {
        const res = await fetch(
          `${API_BASE}/projects?category=gym`
        );

        if (!res.ok) {
          throw new Error(`HTTP error! status: ${res.status}`);
        }

        const data = await res.json();
        setProjects(data);
      } catch (error) {
        console.error("Error fetching gym projects:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchGymProjects();
  }, []);

  // 🔹 Search filter
  const filteredClients = projects.filter(
    (c) =>
      c.name?.toLowerCase().includes(search.toLowerCase()) ||
      c.location?.toLowerCase().includes(search.toLowerCase()) ||
      c.acType?.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <motion.div
      key="gym-page"
      initial="hidden"
      animate="visible"
      exit="hidden"
      className={`min-h-screen bg-gradient-to-b ${gradients.gym} py-16 px-6 font-sans`}
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
      <h1 className="text-4xl font-bold text-center mb-10 text-teal-800">
        Gym Projects
      </h1>

      {/* Search */}
      <div className="max-w-3xl mx-auto mb-8 flex flex-col sm:flex-row items-center gap-4">
        <input
          type="text"
          placeholder="Search by name, location, or AC type..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="flex-1 p-3 border border-gray-300 rounded-xl shadow focus:outline-none focus:ring-2 focus:ring-teal-500"
        />
      </div>

      {/* Table */}
      <div className="overflow-x-auto max-w-5xl mx-auto">
        <table className="w-full border border-gray-300 rounded-xl shadow-md text-sm">
          <thead>
            <tr className="bg-gray-100 text-left">
              <th className="p-3 border">Sl No</th>
              <th className="p-3 border">Name</th>
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
