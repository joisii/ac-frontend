import React, { useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

// AC Product List
const acProducts = [
  {
    title: "Cassette Air Conditioner",
    image: "/assets/casette.jpg",
    specs: [
      "Elegant design, seamlessly blending with interiors",
      "Super Silent operation with BLDC motor",
      "360° air flow for uniform cooling",
      "Inverter compressor for efficient performance",
    ],
  },
  {
    title: "Ducted Split AC",
    image: "/assets/ducted.jpg",
    specs: [
      "Normal & Inverter scroll compressor fitted units",
      "Available capacity of 3, 5.5, 8.5, 11, 12 & 17TR",
      "Can cater any area above 400 Sq Ft",
      "Save 20-25% of your electricity bill",
    ],
  },
  {
    title: "Verticool AC",
    image: "/assets/vert.png",
    specs: [
      "Turbo Cool",
      "Anti-Corrosive Gold Fins in Indoor",
      "Comfort Sleep",
      "Super Sleek Design"
    ],
  },
  {
    title: "Full Inverter VRF Systems",
    image: "/assets/vrf.jpg",
    specs: [
      "Varied indoor units to suit interior requirements",
      "Elegant Design",
      "Very efficient in part-load applications",
      "Saves 5-30% electricity bills",
    ],
  },
  {
    title: "Ducted Packages AC",
    image: "/assets/package.jpg",
    specs: [
      "Highly energy efficient",
      "Meant for large floor areas",
      "Effective in part-load applications",
      "Widely used in corporate, commercial buildings",
    ],
  },
  {
    title: "HI Wall Split AC",
    image: "/assets/vert.png",
    specs: [
      "Varied indoor units to suit interior requirements",
      "Very efficient in part-load applications",
      "Saves 5-30% electricity bills",
      "Varied intelligent control options available",
    ],
  },
];

function Sales() {
  const sectionRef = React.useRef(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const blobX = useTransform(scrollYProgress, [0, 1], [0, 150]);
  const blobY = useTransform(scrollYProgress, [0, 1], [0, -150]);

  // Form state
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  });

  // Handle input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  // Submit form to backend
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch('https://ac-backend-cpsu.onrender.com/sales', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      if (res.ok) {
        alert('S65ubmitted successfully!');
        setFormData({ name: '', email: '', phone: '', message: '' });
      } else {
        alert('Failed to submit sales request');
      }
    } catch (err) {
      console.error('Error submitting sales request:', err);
      alert('Server error!');
    }
  };

  return (
    <section
      id="sales"
      ref={sectionRef}
      className="font-sans text-gray-800 min-h-screen flex flex-col justify-center bg-gradient-to-b from-green-50 via-white to-green-100 relative overflow-hidden"
    >
      {/* Background Blobs */}
      <motion.div
        style={{ x: blobX, y: blobY }}
        className="absolute top-[-80px] left-[-80px] w-96 h-96 bg-green-300 opacity-20 blur-3xl rounded-full z-0"
      />
      <motion.div
        style={{ x: blobY, y: blobX }}
        className="absolute bottom-[-80px] right-[-80px] w-80 h-80 bg-yellow-200 opacity-20 blur-3xl rounded-full z-0"
      />

      {/* Header */}
      <section className="relative z-10 text-center py-24">
        <motion.h2
          className="text-4xl md:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-green-800 via-yellow-500 to-green-800 animate-text-glow drop-shadow-lg mb-6"
          initial={{ opacity: 0, y: -40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          Our Sales Division
        </motion.h2>
        <motion.p
          className="text-lg md:text-xl text-gray-700 max-w-3xl mx-auto font-medium"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.2 }}
        >
          We offer a wide range of centralized air conditioning products from industry-leading brands.
        </motion.p>
      </section>

      {/* Product Cards */}
      <div className="flex-grow flex flex-col justify-center max-w-7xl mx-auto px-6 pb-24 relative z-10">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-12">
          {acProducts.map((product, index) => (
            <motion.div
              key={index}
              className="bg-white/50 backdrop-blur-lg rounded-3xl p-6 shadow-xl border border-transparent hover:border-gradient transition-all duration-500 relative group"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <div className="w-full h-40 bg-gray-200 rounded-2xl flex items-center justify-center mb-6 overflow-hidden">
                {product.link ? (
                  <a href={product.link} target="_blank" rel="noopener noreferrer">
                    <img
                      src={product.image}
                      alt={product.title}
                      className="h-full w-full object-contain transition-transform duration-300 group-hover:scale-105"
                    />
                  </a>
                ) : (
                  <img
                    src={product.image}
                    alt={product.title}
                    className="h-full w-full object-contain"
                  />
                )}
              </div>
              <h4 className="text-2xl font-bold mb-4 text-green-800">{product.title}</h4>
              <ul className="list-none text-gray-700 space-y-3 text-sm">
                {product.specs.map((spec, specIndex) => (
                  <li
                    key={specIndex}
                    className="flex items-start gap-2 hover:text-green-700 hover:translate-x-2 transition-all duration-300"
                  >
                    <span className="text-green-600 text-base">✓</span>
                    <span>{spec}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Sales Form */}
      <div className="relative z-10 bg-white rounded-3xl shadow-xl max-w-4xl mx-auto my-24 p-10">
        <h2 className="text-3xl font-bold mb-4 text-gray-800">Talk to Our Sales Team</h2>
        <p className="text-gray-600 mb-6">
          Fill in your details and our team will get back to you within 24 hours.
        </p>

        <form className="space-y-4" onSubmit={handleSubmit}>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Your Name"
            className="w-full px-4 py-3 border rounded"
            required
          />
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Your Email"
            className="w-full px-4 py-3 border rounded"
            required
          />
          <input
            type="tel"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            placeholder="Phone Number"
            className="w-full px-4 py-3 border rounded"
            required
          />
          <textarea
            name="message"
            value={formData.message}
            onChange={handleChange}
            placeholder="Tell us about your requirement"
            rows={4}
            className="w-full px-4 py-3 border rounded resize-none"
            required
          />
          <button
            type="submit"
            className="bg-green-700 text-white px-6 py-3 rounded hover:bg-green-800 transition"
          >
            Submit Request
          </button>
        </form>
      </div>
    </section>
  );
}

export default Sales;
