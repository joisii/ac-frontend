// src/components/AdminDashboard.js
import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import ServiceRequestsTable from "../pages/ServiceRequestsTable";
import SalesTable from "../pages/SalesTable";
import API_BASE from "../config";

const AdminDashboard = () => {
  const [requests, setRequests] = useState([]);
  const [sales, setSales] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchReq, setSearchReq] = useState("");
  const [searchSales, setSearchSales] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const reqRes = await fetch(`${API_BASE}/requests`);
        setRequests(await reqRes.json());

        const salesRes = await fetch(`${API_BASE}/sales`);
        setSales(await salesRes.json());
      } catch (err) {
        console.error("Error fetching data:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  // ✅ Only delete handlers remain
  const handleDeleteRequest = (id) =>
    setRequests((prev) => prev.filter((r) => r._id !== id));

  const handleDeleteSale = (id) =>
    setSales((prev) => prev.filter((s) => s._id !== id));

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen text-gray-600 text-xl">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ repeat: Infinity, duration: 1.2, ease: "linear" }}
          className="w-10 h-10 border-4 border-blue-500 border-t-transparent rounded-full"
        />
        <span className="ml-3">Loading data...</span>
      </div>
    );
  }

  return (
    <div className="flex-1 min-h-screen bg-gradient-to-br from-blue-50 via-white to-yellow-50 font-sans">
      {/* Header */}
      <div className="sticky top-0 z-50 backdrop-blur-md bg-white/70 shadow-md border-b border-gray-200 flex justify-between items-center px-6 py-4">
        <motion.h1
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="text-2xl md:text-3xl font-extrabold text-gray-800 tracking-wide"
        >
          Admin Dashboard
        </motion.h1>
        <div className="flex items-center gap-3">
          <img
            src="https://img.icons8.com/ios-filled/50/admin-settings-male.png"
            alt="Admin"
            className="w-10 h-10 rounded-full border border-gray-300"
          />
          <span className="hidden sm:block text-gray-700 font-medium">
            GVJ Admin
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="p-6 max-w-7xl mx-auto">
        {/* Service Requests */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="bg-white/80 backdrop-blur-lg shadow-lg rounded-2xl border border-gray-200 p-6 mb-10 hover:shadow-xl transition"
        >
          <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
            <h2 className="text-xl font-bold text-gray-800">
              Service Requests
            </h2>
            <input
              type="text"
              placeholder="Search requests..."
              value={searchReq}
              onChange={(e) => setSearchReq(e.target.value)}
              className="mt-3 md:mt-0 px-4 py-2 rounded-lg border border-gray-300 text-sm focus:ring-2 focus:ring-blue-400 focus:outline-none"
            />
          </div>
          <ServiceRequestsTable
            requests={requests.filter((r) =>
              JSON.stringify(r).toLowerCase().includes(searchReq.toLowerCase())
            )}
            onDelete={handleDeleteRequest}
          />
        </motion.div>

        {/* Sales Records */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="bg-white/80 backdrop-blur-lg shadow-lg rounded-2xl border border-gray-200 p-6 hover:shadow-xl transition"
        >
          <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
            <h2 className="text-xl font-bold text-gray-800">Sales Records</h2>
            <input
              type="text"
              placeholder="Search sales..."
              value={searchSales}
              onChange={(e) => setSearchSales(e.target.value)}
              className="mt-3 md:mt-0 px-4 py-2 rounded-lg border border-gray-300 text-sm focus:ring-2 focus:ring-yellow-400 focus:outline-none"
            />
          </div>
          <SalesTable
            sales={sales.filter((s) =>
              JSON.stringify(s).toLowerCase().includes(searchSales.toLowerCase())
            )}
            onDelete={handleDeleteSale}
          />
        </motion.div>
      </div>
    </div>
  );
};

export default AdminDashboard;
