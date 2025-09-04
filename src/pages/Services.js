// src/pages/Services.js
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import * as XLSX from "xlsx";

function Services() {
  const [formData, setFormData] = useState({
    name: "",
    contact: "",
    issue: "",
  });

  const [loading, setLoading] = useState(false);

  // New states
  const [activeTab, setActiveTab] = useState(null); // Track which card is open
  const [excelData, setExcelData] = useState([]);
  const [activeDataset, setActiveDataset] = useState("customer"); // Track which dataset is selected

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (loading) return;
    setLoading(true);

    const newRequest = { ...formData, status: "New" };

    try {
      const res = await fetch("https://ac-backend-cpsu.onrender.com/requests", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newRequest),
      });

      if (res.ok) {
        alert("Submitted successfully!");
        setFormData({ name: "", contact: "", issue: "" });
      } else {
        alert("Error submitting request");
      }
    } catch (err) {
      console.error(err);
      alert("Failed to connect to backend");
    } finally {
      setLoading(false);
    }
  };

  // Load Excel data dynamically
  const loadExcelData = async (filePath, dataset) => {
    try {
      const response = await fetch(filePath);
      const arrayBuffer = await response.arrayBuffer();
      const workbook = XLSX.read(arrayBuffer, { type: "array" });
      const sheetName = workbook.SheetNames[0];
      const worksheet = workbook.Sheets[sheetName];
      const jsonData = XLSX.utils.sheet_to_json(worksheet);
      setExcelData(jsonData);
      setActiveDataset(dataset);
    } catch (error) {
      console.error("Error loading Excel file", error);
    }
  };

  const serviceData = [
    {
      title: "Installation",
      desc: "Custom installation of centralized AC systems for commercial and industrial facilities.",
      img: "/assets/install.png",
    },
    {
      title: "Repair & Maintenance",
      desc: "Fast, reliable repairs with flexible AMC plans.",
      img: "/assets/service.png",
      tab: "repair", // 👈 Tab id
    },
    {
      title: "Training & Development",
      desc: "Job-oriented HVAC training programs to prepare you for a successful career.",
      img: "/assets/train.png",
    },
  ];

  const toggleTab = (tabId) => {
    if (activeTab === tabId) {
      setActiveTab(null);
    } else {
      setActiveTab(tabId);
      if (tabId === "repair") {
        loadExcelData("/assets/data/customer.xlsx", "customer"); // default dataset
      }
    }
  };

  return (
    <section
      id="services"
      className="font-sans text-gray-800 min-h-screen flex flex-col justify-center bg-gradient-to-b from-white via-blue-50 to-white relative overflow-hidden"
    >
      {/* Header Section */}
      <div className="bg-gradient-to-r from-blue-800 via-blue-600 to-yellow-500 text-white py-20 text-center shadow-lg">
        <div className="max-w-5xl mx-auto px-4">
          <h2 className="text-5xl md:text-6xl font-extrabold tracking-tight drop-shadow-xl">
            HVAC Services & Training
          </h2>
          <p className="mt-6 text-xl max-w-3xl mx-auto text-blue-100">
            Comprehensive solutions from installation to after-sales service,
            with industry-leading training programs for tomorrow's HVAC
            professionals.
          </p>
        </div>
      </div>

      {/* Service Cards */}
      <div className="flex-grow flex flex-col justify-center py-20">
        <div className="max-w-6xl mx-auto px-4 grid md:grid-cols-3 gap-12">
          {serviceData.map((item, idx) => (
            <motion.div
              key={idx}
              whileHover={{ scale: 1.05 }}
              onClick={item.tab ? () => toggleTab(item.tab) : undefined}
              className={`bg-white rounded-3xl p-8 shadow-2xl hover:shadow-3xl transition group relative overflow-hidden cursor-pointer ${
                activeTab === item.tab ? "border-4 border-yellow-400" : ""
              }`}
            >
              <div className="h-40 bg-gray-200 rounded-xl flex items-center justify-center mb-6 overflow-hidden">
                <img
                  src={item.img}
                  alt={`${item.title} illustration`}
                  className="h-full w-full object-cover"
                />
              </div>
              <h3 className="text-2xl font-bold text-center mb-4 text-blue-800 group-hover:text-yellow-500 transition">
                {item.title}
              </h3>
              <p className="text-gray-700 text-center">{item.desc}</p>
            </motion.div>
          ))}
        </div>

        {/* Tab Content */}
        <AnimatePresence>
          {activeTab === "repair" && (
            <motion.div
              className="mt-12 max-w-5xl mx-auto px-4 overflow-x-auto"
              initial={{ opacity: 0, y: 50, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 50, scale: 0.95 }}
              transition={{ duration: 0.6, ease: "easeInOut" }}
            >
              <h4 className="text-2xl font-bold text-center mb-6 text-blue-800">
                Repair & Maintenance Records
              </h4>

              {/* Dataset Tabs */}
              <div className="flex justify-center mb-6 space-x-4">
                <button
                  onClick={() =>
                    loadExcelData("/assets/data/customer.xlsx", "customer")
                  }
                  className={`px-6 py-2 rounded-lg font-semibold transition shadow ${
                    activeDataset === "customer"
                      ? "bg-blue-700 text-white"
                      : "bg-blue-100 text-blue-700 hover:bg-blue-200"
                  }`}
                >
                  Customer Data
                </button>
                <button
                  onClick={() =>
                    loadExcelData("/assets/data/Butterfly.xlsx", "butterfly")
                  }
                  className={`px-6 py-2 rounded-lg font-semibold transition shadow ${
                    activeDataset === "butterfly"
                      ? "bg-yellow-600 text-white"
                      : "bg-yellow-100 text-yellow-700 hover:bg-yellow-200"
                  }`}
                >
                  Warranty Data
                </button>
              </div>

              {/* Excel Table */}
              <table className="w-full border border-gray-300 rounded-lg shadow-2xl overflow-hidden">
                <thead className="bg-gradient-to-r from-blue-700 via-blue-600 to-blue-500 text-white">
                  <tr>
                    {excelData.length > 0 &&
                      Object.keys(excelData[0]).map((key, i) => (
                        <th
                          key={i}
                          className="px-4 py-3 text-left text-sm font-semibold tracking-wide"
                        >
                          {key}
                        </th>
                      ))}
                  </tr>
                </thead>
                <tbody>
                  {excelData.map((row, rowIndex) => (
                    <tr
                      key={rowIndex}
                      className={`${
                        rowIndex % 2 === 0 ? "bg-gray-50" : "bg-white"
                      } hover:bg-gradient-to-r hover:from-yellow-50 hover:to-yellow-100 transition-colors`}
                    >
                      {Object.values(row).map((val, colIndex) => (
                        <td
                          key={colIndex}
                          className="px-4 py-2 text-sm text-gray-700 border-b"
                        >
                          {val}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Training Section */}
      <motion.div
        className="mt-24 max-w-5xl mx-auto px-4"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <h3 className="text-4xl font-bold text-blue-800 mb-6 text-center">
          Launch Your Career in HVAC Engineering
        </h3>
        <p className="text-gray-700 text-lg mb-4">
          HVAC Engineering is a booming industry with immense demand for skilled
          professionals. Our training offers comprehensive knowledge of HVAC
          basics to prepare you for independent project handling from day one.
        </p>
      </motion.div>

      {/* Packages Section */}
      <motion.div
        className="mt-24 max-w-7xl mx-auto px-4"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
      >
        <h3 className="text-4xl font-bold text-center text-blue-800 mb-10">
          Our Service Packages
        </h3>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {[
            "Comprehensive",
            "Only Labour Contract",
            "Revamp/Re-installation of A/C Systems",
            "Duct Cleaning and Air Balancing",
          ].map((pkg, index) => (
            <motion.div
              key={index}
              className="bg-white p-6 rounded-2xl shadow hover:shadow-xl transition"
              whileHover={{ scale: 1.02 }}
            >
              <p className="text-gray-700 text-sm">{pkg}</p>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* PDF Section */}
      <motion.div
        className="py-20 bg-gradient-to-r from-blue-50 to-white"
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.9 }}
      >
        <div className="max-w-5xl mx-auto px-6 text-center">
          <h3 className="text-4xl font-bold text-blue-800 mb-6">
            Company Authenticity Report
          </h3>
          <div className="w-full h-[600px] border-2 border-gray-200 rounded-xl overflow-hidden shadow-lg mb-8">
            <iframe
              src="/assets/data/mark.pdf"
              title="Company Authenticity PDF"
              className="w-full h-full"
            ></iframe>
          </div>
          <a
            href="/assets/data/mark.pdf"
            download
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block bg-blue-700 text-white px-8 py-4 rounded-2xl shadow-xl hover:bg-blue-800 transition text-lg font-semibold"
          >
            📄 Download Full Report
          </a>
        </div>
      </motion.div>

      {/* Service Request Form */}
      <div className="py-20 flex-shrink-0 bg-white">
        <div className="max-w-3xl mx-auto px-4">
          <h4 className="text-3xl font-bold mb-8 text-center text-blue-800">
            Book a Service
          </h4>
          <form
            onSubmit={handleSubmit}
            className="bg-gray-50 p-8 rounded-2xl shadow-xl space-y-6"
          >
            <input
              type="text"
              name="name"
              placeholder="Your Name"
              value={formData.name}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 border border-gray-300 rounded-lg"
            />
            <input
              type="text"
              name="contact"
              placeholder="Phone or Email"
              value={formData.contact}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 border border-gray-300 rounded-lg"
            />
            <textarea
              name="issue"
              placeholder="Describe the issue"
              value={formData.issue}
              onChange={handleChange}
              required
              rows={4}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg resize-none"
            ></textarea>
            <button
              type="submit"
              disabled={loading}
              className={`px-6 py-3 rounded-lg shadow-md transition text-white ${
                loading
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-blue-700 hover:bg-blue-800"
              }`}
            >
              {loading ? "Submitting..." : "Submit Request"}
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}

export default Services;
