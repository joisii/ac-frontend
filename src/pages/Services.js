// src/pages/Services.js
import React, { useState } from "react";
import { motion,} from "framer-motion";
import Project from "./training/Project";
import Service from "./training/Service";

function Services() {
  const [formData, setFormData] = useState({
    name: "",
    contact: "",
    issue: "",
  });

  const [loading, setLoading] = useState(false);
  const [activeTrainingTab, setActiveTrainingTab] = useState("project");

  const serviceData = [
    {
      title: "Training",
      desc: "Job-oriented HVAC training programs to prepare you for a successful career.",
      img: "/assets/train.png",
      tab: "training",
    },
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (loading) return;
    setLoading(true);

    try {
      const res = await fetch("https://ac-backend-cpsu.onrender.com/requests", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...formData, status: "New" }),
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

  return (
    <section id="services" className="font-sans text-gray-800 min-h-screen">
      {/* Header */}
      <motion.div
        className="bg-gradient-to-r from-blue-800 via-blue-600 to-yellow-500 text-white py-24 text-center shadow-xl"
        initial={{ opacity: 0, y: -40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
      >
        <motion.h2
          className="text-6xl font-extrabold drop-shadow-lg tracking-wide"
          initial={{ scale: 0.9 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.8 }}
        >
          HVAC Services & Training
        </motion.h2>

        <motion.p
          className="mt-6 text-xl max-w-4xl mx-auto leading-relaxed"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4, duration: 1 }}
        >
          Delivering <span className="font-semibold">end-to-end HVAC solutions</span> —
          from large-scale <span className="font-semibold">installations</span> to reliable{" "}
          <span className="font-semibold">after-sales service</span>.
          Our expert team ensures energy-efficient performance,
          reduced downtime, and long-term savings for your business.
        </motion.p>

        <motion.p
          className="mt-4 text-lg max-w-3xl mx-auto text-yellow-100 italic"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8, duration: 1 }}
        >
          Plus, our <span className="font-semibold text-white">job-oriented training programs </span>
          prepare the next generation of HVAC professionals with real-world skills and hands-on projects.
        </motion.p>
      </motion.div>

      {/* Service Card */}
      <div className="py-20 flex justify-center px-4">
        {serviceData.map((item, idx) => (
          <motion.div
            key={idx}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.97 }}
            className={`relative bg-gradient-to-b from-blue-700/80 via-blue-600/80 to-yellow-500/70 
              backdrop-blur-lg border border-blue-500/40 p-10 rounded-3xl shadow-xl cursor-pointer group 
              overflow-hidden max-w-md w-full sm:w-2/3 lg:w-1/2 transition-all duration-500`}
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.2, duration: 0.8 }}
          >
            {/* Glow effect */}
            <div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-yellow-400 via-blue-300 to-transparent opacity-0 group-hover:opacity-20 blur-3xl transition duration-500"></div>

            {/* Image */}
            <div className="h-52 bg-gradient-to-r from-blue-300 to-yellow-200 rounded-xl mb-6 flex items-center justify-center overflow-hidden relative z-10 shadow-lg">
              <motion.img
                src={item.img}
                alt={item.title}
                className="h-full w-full object-cover rounded-xl"
                whileHover={{ scale: 1.1 }}
                transition={{ duration: 0.5 }}
              />
            </div>

            {/* Title */}
            <h3 className="text-3xl font-extrabold text-center text-white drop-shadow-lg relative z-10">
              {item.title}
            </h3>

            {/* Description */}
            <p className="text-center text-blue-100 mt-4 text-lg leading-relaxed relative z-10">
              {item.desc}
            </p>
          </motion.div>
        ))}
      </div>

      {/* Training Tab - Always Visible Now */}
      <motion.div
        className="max-w-6xl mx-auto px-4 pb-16"
        initial={{ y: 30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.3, duration: 0.6 }}
      >
        <div className="flex justify-center mb-6 space-x-4">
          <button
            onClick={() => setActiveTrainingTab("project")}
            aria-label="View technical training"
            className={`px-6 py-2 rounded-lg font-semibold shadow transition ${
              activeTrainingTab === "project"
                ? "bg-blue-700 text-white"
                : "bg-blue-100 text-blue-700 hover:bg-blue-200"
            }`}
          >
            Project Training
          </button>
          <button
            onClick={() => setActiveTrainingTab("service")}
            aria-label="View service training"
            className={`px-6 py-2 rounded-lg font-semibold shadow transition ${
              activeTrainingTab === "service"
                ? "bg-yellow-600 text-white"
                : "bg-yellow-100 text-yellow-700 hover:bg-yellow-200"
            }`}
          >
            Service Training
          </button>
        </div>
        <div>
          {activeTrainingTab === "project" && <Project />}
          {activeTrainingTab === "service" && <Service />}
        </div>
      </motion.div>

      {/* Service Request Form */}
      <div className="py-20 bg-white">
        <motion.div
          className="max-w-3xl mx-auto px-4"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h4 className="text-3xl font-bold mb-8 text-center text-blue-800 drop-shadow">
            Book a Service
          </h4>
          <form
            onSubmit={handleSubmit}
            className="bg-gray-50 p-8 rounded-2xl shadow-xl space-y-6"
          >
            <motion.input
              type="text"
              name="name"
              placeholder="Your Name"
              value={formData.name}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 border border-gray-300 rounded-lg"
              whileFocus={{ scale: 1.02, borderColor: "#2563eb" }}
            />
            <motion.input
              type="text"
              name="contact"
              placeholder="Phone or Email"
              value={formData.contact}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 border border-gray-300 rounded-lg"
              whileFocus={{ scale: 1.02, borderColor: "#2563eb" }}
            />
            <motion.textarea
              name="issue"
              placeholder="Describe the issue"
              value={formData.issue}
              onChange={handleChange}
              required
              rows={4}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg resize-none"
              whileFocus={{ scale: 1.02, borderColor: "#2563eb" }}
            ></motion.textarea>

            <motion.button
              type="submit"
              disabled={loading}
              aria-label={loading ? "Submitting request" : "Submit request"}
              aria-busy={loading}
              className={`px-6 py-3 rounded-lg shadow-md text-white font-semibold ${
                loading ? "bg-gray-400" : "bg-blue-700 hover:bg-blue-800"
              }`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {loading ? "Submitting..." : "Submit Request"}
            </motion.button>
          </form>
        </motion.div>
      </div>
    </section>
  );
}

export default Services;
