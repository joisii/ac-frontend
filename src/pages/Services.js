import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Project from "./training/Project";
import Service from "./training/Service";
import ClientsPage from "./training/ClientsPage";

function Services() {
  const [formData, setFormData] = useState({
    name: "",
    contact: "",
    issue: "",
  });

  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState(null);
  const [activeTrainingTab, setActiveTrainingTab] = useState("project");
  const [showPdfModal, setShowPdfModal] = useState(false);

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
      tab: "training",
    },
  ];

  const toggleTab = (tabId) => {
    setActiveTab(activeTab === tabId ? null : tabId);
  };

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
    Plus, our <span className="font-semibold text-white">job-oriented training programs</span> 
    prepare the next generation of HVAC professionals with real-world skills and hands-on projects.
  </motion.p>
</motion.div>


      {/* Service Cards */}
      <div className="py-20 max-w-6xl mx-auto grid md:grid-cols-3 gap-12 px-4">
        {serviceData.map((item, idx) => (
          <div key={idx} className="relative">
            <motion.div
              whileHover={{ scale: 1.07, y: -8 }}
              whileTap={{ scale: 0.97 }}
              onClick={item.tab ? () => toggleTab(item.tab) : undefined}
              className={`bg-white rounded-3xl p-8 shadow-2xl cursor-pointer transition-all ${
                activeTab === item.tab ? "border-4 border-yellow-400" : ""
              }`}
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.2, duration: 0.8 }}
            >
              <div className="h-40 bg-gray-200 rounded-xl mb-6 flex items-center justify-center overflow-hidden">
                <motion.img
                  src={item.img}
                  alt={item.title}
                  className="h-full w-full object-cover"
                  whileHover={{ scale: 1.1 }}
                  transition={{ duration: 0.5 }}
                />
              </div>
              <h3 className="text-2xl font-bold text-center text-blue-800">
                {item.title}
              </h3>
              <p className="text-center text-gray-700 mt-2">{item.desc}</p>
            </motion.div>

            {/* Repair Tab inline on mobile */}
            {activeTab === "repair" && item.tab === "repair" && (
              <div className="mt-6 md:hidden">
                <ClientsPage />
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Training Tab */}
      <AnimatePresence>
        {activeTab === "training" && (
          <motion.div
            className="max-w-6xl mx-auto px-4"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 50 }}
            transition={{ duration: 0.8 }}
          >
            <h4 className="text-3xl font-bold text-center mb-6 text-blue-800 drop-shadow">
              Training & Development Programs
            </h4>
            <div className="flex justify-center mb-6 space-x-4">
              <button
                onClick={() => setActiveTrainingTab("project")}
                className={`px-6 py-2 rounded-lg font-semibold shadow transition ${
                  activeTrainingTab === "project"
                    ? "bg-blue-700 text-white"
                    : "bg-blue-100 text-blue-700 hover:bg-blue-200"
                }`}
              >
                Project
              </button>
              <button
                onClick={() => setActiveTrainingTab("service")}
                className={`px-6 py-2 rounded-lg font-semibold shadow transition ${
                  activeTrainingTab === "service"
                    ? "bg-yellow-600 text-white"
                    : "bg-yellow-100 text-yellow-700 hover:bg-yellow-200"
                }`}
              >
                Service
              </button>
            </div>
            <div>
              {activeTrainingTab === "project" && <Project />}
              {activeTrainingTab === "service" && <Service />}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Repair Tab */}
      <AnimatePresence>
        {activeTab === "repair" && (
          <motion.div
            className="hidden md:block max-w-6xl mx-auto px-4"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 50 }}
          >
            <ClientsPage />
          </motion.div>
        )}
      </AnimatePresence>

      {/* PDF Viewer Section */}
      <motion.div
        className="py-20 bg-gray-50"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        <div className="max-w-5xl mx-auto px-4 text-center">
          <h4 className="text-4xl font-extrabold mb-4 text-blue-800 drop-shadow">
            Training Evaluation Sheet
          </h4>
          <p className="text-gray-700 mb-8 leading-relaxed max-w-3xl mx-auto text-lg">
            Here’s the detailed <span className="font-semibold">Marking Sheet</span> 
            used during HVAC project & service training. It outlines key activities 
            like ducting, piping, insulation, welding, and testing procedures, along 
            with the scoring criteria for each.
          </p>

          {/* Inline Viewer */}
          <div className="w-full h-[600px] shadow-xl border-2 border-gray-300 rounded-xl overflow-hidden">
            <iframe
              src="/assets/data/mark.pdf"
              title="Mark PDF"
              className="w-full h-full"
            ></iframe>
          </div>

          {/* Buttons */}
          <div className="mt-6 flex flex-col sm:flex-row justify-center gap-4">
            <button
              onClick={() => setShowPdfModal(true)}
              className="px-6 py-3 bg-yellow-500 text-white font-semibold rounded-lg shadow hover:bg-yellow-600 transition"
            >
              Expand PDF
            </button>
            <a
              href="/assets/data/mark.pdf"
              download
              className="px-6 py-3 bg-blue-700 text-white font-semibold rounded-lg shadow hover:bg-blue-800 transition"
            >
              Download PDF
            </a>
          </div>
        </div>
      </motion.div>

      {/* PDF Modal */}
      <AnimatePresence>
        {showPdfModal && (
          <motion.div
            className="fixed inset-0 bg-black/70 z-50 flex items-center justify-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <div className="bg-white rounded-xl shadow-2xl w-11/12 h-[90vh] relative overflow-hidden">
              <button
                onClick={() => setShowPdfModal(false)}
                className="absolute top-3 right-3 bg-red-500 text-white px-3 py-1 rounded shadow hover:bg-red-600"
              >
                Close
              </button>
              <iframe
                src="/assets/data/mark.pdf"
                title="Expanded Mark PDF"
                className="w-full h-full"
              ></iframe>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

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
