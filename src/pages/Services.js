// src/pages/Services.js
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

function Services() {
  const [formData, setFormData] = useState({
    name: "",
    contact: "",
    issue: "",
  });

  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState(null);
  const [activeDataset, setActiveDataset] = useState("customer");

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
      tab: "repair",
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
        setActiveDataset("customer"); // default dataset
      }
    }
  };

  // Dummy customer data
  const warrantyCustomers = [
    { sno: 1, client: "Deepam Eye Hospital" },
    { sno: 2, client: "Dynamic Advertisements" },
    { sno: 3, client: "Fresh 2 Day" },
    { sno: 4, client: "Soorya Hospital" },
    { sno: 5, client: "Fathima Jewellers" },
    { sno: 6, client: "Gateway International School" },
    { sno: 7, client: "Sudha Timber" },
    { sno: 8, client: "Kuralarasan Residence" },
    { sno: 9, client: "LKS Gold House" },
    { sno: 10, client: "Sree Gupta Bhavan" },
    { sno: 11, client: "Innovent Spaces Ltd" },
    { sno: 12, client: "Dahnay Logistics" },
    { sno: 13, client: "Selfie Attire" },
    { sno: 14, client: "Clover Appasamy Apartments" },
  ];

  const amcCustomers = [
    { sno: 1, client: "M.C.T.M. CHIDAMBARAM " },
    { sno: 2, client: "EMPIRE  AUTOS  " },
    { sno: 3, client: "Indiqube Viceroy" },
    { sno: 4, client: "Roche Products" },
    { sno: 5, client: "Sai Kirit Jewellers" },
    { sno: 6, client: "Ashok Matches And Timber Industries Priv" },
    { sno: 7, client: "Manna Prayer House Trust " },
    { sno: 8, client: "Shri Vaari Electricals Pvt Ltd" },
    { sno: 9, client: "Sri Lakshmi Jewellers" },
    { sno: 10, client: "Shree Agarwal Sabha" },
    { sno: 11, client: "TEST YANTRA (Q Spider )" },
    { sno: 12, client: "Art Glass Edge" },
    { sno: 13, client: "Esskay Design and Structures Private Limited" },
    { sno: 14, client: "TSS Marriage Hall" },
    { sno: 15, client: "DART GLOBAL LOGISTICS PVT LTD" },
    { sno: 16, client: "ASTORIA VEG RESTAURANT" },
    { sno: 17, client: "RVM Motors" },
    { sno: 18, client: "Jaya Residency" },
    { sno: 19, client: "Dover India Pvt Ltd" },
    { sno: 20, client: "Slam Fitness Studio" },
    { sno: 21, client: "Dahnay Logistics Pvt Ltd" },
    { sno: 22, client: "Uniworld Logistics" },
    { sno: 23, client: "Vista Hall (Velachery Banq Hall)" },
    { sno: 24, client: "Mahalakshmi Jewellers" },
    { sno: 25, client: "Spaces-R K Studio" },
];

  // Warranty units data
  const unit1Data = [
    { sno: 1, description: "Physical condition", condition: "Not good rusting starting at compressor bottom " },
    { sno: 2, description: "Motor condition", condition: "Working Normal" },
    { sno: 3, description: "Blower Condition", condition: "Working Normal" },
    { sno: 4, description: "Evaporator coil condition", condition: "Normal condition and rusting starts at bottom of the coil tray" },
    { sno: 5, description: "Filters", condition: "Damaged" },
    { sno: 6, description: "PC Board and remote", condition: "Not working" },
    { sno: 7, description: "Blower Belt", condition: "Damaged" },
    { sno: 8, description: "ODU - 1", condition: "Fan stand,fan bottom fully damaged" },
    { sno: 9, description: "ODU - 2", condition: " Gas Leak" },
    { sno: 10, description: "ODU - 3", condition: "Normal" },
  ];

  const unit2Data = [
    { sno: 1, description: "Physical condition", condition: "Rusted" },
    { sno: 2, description: "Motor condition", condition: "Good" },
    { sno: 3, description: "Blower Condition", condition: "Good" },
    { sno: 4, description: "Evaporator coil condition", condition: "Normal condition and rusting starts at bottom of the coil tray" },
    { sno: 5, description: "Filters", condition: "Damaged" },
    { sno: 6, description: "PC Board and remote", condition: "Working Normal" },
    { sno: 7, description: "Blower Belt", condition: "Damaged" },
    { sno: 8, description: "ODU - 1", condition: "ODU Base Plate Rusted, Fan Motor Failure" },
    { sno: 9, description: "ODU - 2", condition: "Condansor Coil rusted, Fan Motor Failure" },
    { sno: 10, description: "ODU - 3", condition: "Gas Leak From Condansor Side" },
  ];

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
              className="mt-12 max-w-6xl mx-auto px-4"
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
                  onClick={() => setActiveDataset("customer")}
                  className={`px-6 py-2 rounded-lg font-semibold transition shadow ${
                    activeDataset === "customer"
                      ? "bg-blue-700 text-white"
                      : "bg-blue-100 text-blue-700 hover:bg-blue-200"
                  }`}
                >
                  Customer Data
                </button>
                <button
                  onClick={() => setActiveDataset("warranty")}
                  className={`px-6 py-2 rounded-lg font-semibold transition shadow ${
                    activeDataset === "warranty"
                      ? "bg-yellow-600 text-white"
                      : "bg-yellow-100 text-yellow-700 hover:bg-yellow-200"
                  }`}
                >
                  Warranty Data
                </button>
              </div>

              {/* Customer Data Tables */}
              {activeDataset === "customer" && (
                <div className="grid md:grid-cols-2 gap-8">
                  {/* Warranty Customers */}
                  <div className="max-w-md">
                    <h5 className="text-lg font-bold text-blue-700 mb-4">
                      Partial List of Warranty Customers
                    </h5>
                    <div className="max-h-64 overflow-y-auto border border-gray-300 rounded-lg shadow">
                      <table className="w-full">
                        <thead className="bg-gradient-to-r from-blue-700 via-blue-600 to-blue-500 text-white sticky top-0">
                          <tr>
                            <th className="px-4 py-3 text-left text-sm font-semibold tracking-wide">
                              S.no
                            </th>
                            <th className="px-4 py-3 text-left text-sm font-semibold tracking-wide">
                              Client Name
                            </th>
                          </tr>
                        </thead>
                        <tbody>
                          {warrantyCustomers.map((row, i) => (
                            <tr
                              key={i}
                              className={`${
                                i % 2 === 0 ? "bg-gray-50" : "bg-white"
                              } hover:bg-yellow-50 transition-colors`}
                            >
                              <td className="px-4 py-2 text-sm text-gray-700 border-b">
                                {row.sno}
                              </td>
                              <td className="px-4 py-2 text-sm text-gray-700 border-b">
                                {row.client}
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>

                  {/* AMC Customers */}
                  <div className="max-w-md">
                    <h5 className="text-lg font-bold text-blue-700 mb-4">
                      Partial List of AMC Customers
                    </h5>
                    <div className="max-h-64 overflow-y-auto border border-gray-300 rounded-lg shadow">
                      <table className="w-full">
                        <thead className="bg-gradient-to-r from-blue-700 via-blue-600 to-blue-500 text-white sticky top-0">
                          <tr>
                            <th className="px-4 py-3 text-left text-sm font-semibold tracking-wide">
                              S.no
                            </th>
                            <th className="px-4 py-3 text-left text-sm font-semibold tracking-wide">
                              Client Name
                            </th>
                          </tr>
                        </thead>
                        <tbody>
                          {amcCustomers.map((row, i) => (
                            <tr
                              key={i}
                              className={`${
                                i % 2 === 0 ? "bg-gray-50" : "bg-white"
                              } hover:bg-yellow-50 transition-colors`}
                            >
                              <td className="px-4 py-2 text-sm text-gray-700 border-b">
                                {row.sno}
                              </td>
                              <td className="px-4 py-2 text-sm text-gray-700 border-b">
                                {row.client}
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              )}

              {/* Warranty Data Tables */}
              {activeDataset === "warranty" && (
                <div className="grid md:grid-cols-2 gap-8">
                  {/* Unit 1 */}
                  <div className="max-w-md">
                    <h5 className="text-lg font-bold text-yellow-700 mb-4">
                      Unit No. 1 - 16 TR DPA
                    </h5>
                    <div className="max-h-64 overflow-y-auto border border-gray-300 rounded-lg shadow">
                      <table className="w-full">
                        <thead className="bg-gradient-to-r from-yellow-600 via-yellow-500 to-yellow-400 text-white sticky top-0">
                          <tr>
                            <th className="px-4 py-3 text-left text-sm font-semibold tracking-wide">
                              S.no
                            </th>
                            <th className="px-4 py-3 text-left text-sm font-semibold tracking-wide">
                              Description
                            </th>
                            <th className="px-4 py-3 text-left text-sm font-semibold tracking-wide">
                              Present Condition
                            </th>
                          </tr>
                        </thead>
                        <tbody>
                          {unit1Data.map((row, i) => (
                            <tr
                              key={i}
                              className={`${
                                i % 2 === 0 ? "bg-gray-50" : "bg-white"
                              } hover:bg-yellow-50 transition-colors`}
                            >
                              <td className="px-4 py-2 text-sm text-gray-700 border-b">
                                {row.sno}
                              </td>
                              <td className="px-4 py-2 text-sm text-gray-700 border-b">
                                {row.description}
                              </td>
                              <td className="px-4 py-2 text-sm text-gray-700 border-b">
                                {row.condition}
                              </td>
                            </tr>
                          ))}
                          {/* Remarks row */}
                          <tr>
                            <td
                              colSpan={3}
                              className="px-4 py-3 text-sm text-gray-700 bg-yellow-100 font-semibold"
                            >
                              Remarks: To be replaced.
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>

                  {/* Unit 2 */}
                  <div className="max-w-md">
                    <h5 className="text-lg font-bold text-yellow-700 mb-4">
                      Unit No. 2 - 16 TR DPA
                    </h5>
                    <div className="max-h-64 overflow-y-auto border border-gray-300 rounded-lg shadow">
                      <table className="w-full">
                        <thead className="bg-gradient-to-r from-yellow-600 via-yellow-500 to-yellow-400 text-white sticky top-0">
                          <tr>
                            <th className="px-4 py-3 text-left text-sm font-semibold tracking-wide">
                              S.no
                            </th>
                            <th className="px-4 py-3 text-left text-sm font-semibold tracking-wide">
                              Description
                            </th>
                            <th className="px-4 py-3 text-left text-sm font-semibold tracking-wide">
                              Present Condition
                            </th>
                          </tr>
                        </thead>
                        <tbody>
                          {unit2Data.map((row, i) => (
                            <tr
                              key={i}
                              className={`${
                                i % 2 === 0 ? "bg-gray-50" : "bg-white"
                              } hover:bg-yellow-50 transition-colors`}
                            >
                              <td className="px-4 py-2 text-sm text-gray-700 border-b">
                                {row.sno}
                              </td>
                              <td className="px-4 py-2 text-sm text-gray-700 border-b">
                                {row.description}
                              </td>
                              <td className="px-4 py-2 text-sm text-gray-700 border-b">
                                {row.condition}
                              </td>
                            </tr>
                          ))}
                          {/* Remarks row */}
                          <tr>
                            <td
                              colSpan={3}
                              className="px-4 py-3 text-sm text-gray-700 bg-yellow-100 font-semibold"
                            >
                              Remarks: To be replaced.
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

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
