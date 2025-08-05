import { motion } from 'framer-motion';
import { FaMapMarkerAlt } from 'react-icons/fa';

const LocationSection = () => {
  return (
    <section className="max-w-6xl mx-auto px-6 py-20 text-left relative">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        className="bg-white/80 backdrop-blur-xl p-8 rounded-3xl shadow-2xl"
      >
        <div className="flex items-center mb-6">
          <FaMapMarkerAlt className="text-red-600 text-3xl mr-3 animate-bounce-slow" />
          <h3 className="text-3xl font-bold text-blue-900 tracking-tight">
            Our Location
          </h3>
        </div>
        <p
          className="mb-6 text-lg text-gray-700 hover:text-blue-800 transition duration-300 cursor-pointer group"
          onClick={() =>
            navigator.clipboard.writeText(
              "No 37 Rathinavel Padiyan Street, Golden George Nagar, Neekundram, Chennai 600107"
            )
          }
          title="Click to copy address"
        >
          📍 <span className="group-hover:underline">
            No 37 Rathinavel Padiyan Street, Golden George Nagar, Neekundram, Chennai 600107
          </span>
        </p>

        <div className="rounded-2xl overflow-hidden shadow-lg border-4 border-blue-300 hover:shadow-blue-400 transition-all duration-500">
          <iframe
            title="Google Map"
            src="https://www.google.com/maps?q=No+37+Rathinavel+Padiyan+Street,+Golden+George+Nagar,+Neekundram,+Chennai+600107&output=embed"
            width="100%"
            height="350"
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
            className="w-full"
          ></iframe>
        </div>

        <div className="mt-6 text-center">
          <a
            href="https://www.google.com/maps?q=No+37+Rathinavel+Padiyan+Street,+Golden+George+Nagar,+Neekundram,+Chennai+600107"
            target="_blank"
            rel="noopener noreferrer"
          >
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="mt-4 px-8 py-3 bg-blue-800 text-white rounded-full shadow-md hover:bg-blue-700 transition"
            >
              Open in Google Maps
            </motion.button>
          </a>
        </div>
      </motion.div>
    </section>
  );
};

export default LocationSection;
