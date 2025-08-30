import React, { useState } from "react";
import { motion } from "framer-motion";

function Services() {
  const [formData, setFormData] = useState({
    name: "",
    contact: "",
    issue: "",
  });

  const [loading, setLoading] = useState(false); // prevent multiple clicks

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (loading) return; // block if already submitting
    setLoading(true);

    const newRequest = {
      ...formData,
      status: "New",
    };

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
      setLoading(false); // re-enable button
    }
  };

  const serviceData = [
    {
      title: "Installation",
      desc: "Custom installation of centralized AC systems for commercial and industrial facilities. Ensuring precision, efficiency, and adherence to industry standards.",
      img: "/assets/install.png",
    },
    {
      title: "Repair & Maintenance",
      desc: "Fast, reliable repairs with flexible AMC plans. Proactive servicing that extends your system’s life and minimizes unexpected breakdowns.",
      img: "/assets/service.png",
    },
    {
      title: "Training & Development",
      desc: "Job-oriented HVAC training programs to prepare you for a successful career. Comprehensive study of all HVAC basics with placement assistance.",
      img: "/assets/train.png",
    },
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
              whileHover={{ scale: 1.03 }}
              className="bg-white rounded-3xl p-8 shadow-2xl hover:shadow-3xl transition group relative overflow-hidden"
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
            HVAC Engineering is a booming industry with immense demand for
            skilled professionals. Our training offers comprehensive knowledge
            of HVAC basics to prepare you for independent project handling from
            day one. We recruit freshers from Engineering (Mech, EEE, ECE) and
            Diploma (Mech, EEE, ECE) streams via written tests, providing
            stipend-based training and opportunities to join{" "}
            <strong>GVJ Aircon Projects & Services</strong>.
          </p>
          <p className="text-gray-700 text-lg mb-4">
            We believe in precision engineering, quality installation, and
            regular maintenance to enhance equipment lifespan and reduce energy
            consumption.
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
