import { motion } from "framer-motion";
import { FaMapMarkerAlt } from "react-icons/fa";
import React from "react";

const LocationSection = () => {
  const address =
    "No. 37, Rathinavel Pandiyan Street, Golden George Nagar, Mugappair East, Chennai - 600 107";
  const mapsQuery = encodeURIComponent(address);
  const mapsEmbedSrc = `https://www.google.com/maps?q=${mapsQuery}&output=embed`;
  const mapsLink = `https://www.google.com/maps?q=${mapsQuery}`;

  const copyAddress = async () => {
    try {
      await navigator.clipboard.writeText(address);
      // lightweight feedback — replace with a nicer toast in your app if you have one
      // eslint-disable-next-line no-alert
      alert("Address copied to clipboard");
    } catch (err) {
      // eslint-disable-next-line no-console
      console.error("Clipboard copy failed:", err);
      // eslint-disable-next-line no-alert
      alert("Could not copy address. Please copy manually.");
    }
  };

  return (
    <section className="max-w-6xl mx-auto px-6 py-20 text-left relative">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        className="bg-white/80 backdrop-blur-xl p-8 rounded-3xl shadow-2xl"
        aria-labelledby="location-heading"
      >
        <div className="flex items-center mb-6">
          <FaMapMarkerAlt
            className="text-red-600 text-3xl mr-3 animate-bounce-slow"
            aria-hidden="true"
          />
          <h3 id="location-heading" className="text-3xl font-bold text-blue-900 tracking-tight">
            Our Location
          </h3>
        </div>

        <p
          className="mb-6 text-lg text-gray-700 hover:text-blue-800 transition duration-300 cursor-pointer group"
          onClick={copyAddress}
          title="Click to copy address"
          role="button"
          tabIndex={0}
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === " ") {
              e.preventDefault();
              copyAddress();
            }
          }}
          aria-label={`Copy address: ${address}`}
        >
          📍{" "}
          <span className="group-hover:underline">
            {address}
          </span>
        </p>

        <div className="rounded-2xl overflow-hidden shadow-lg border-4 border-blue-300 hover:shadow-blue-400 transition-all duration-500" role="region" aria-label="Location map">
          <iframe
            title="Google Map - GVJ AIRCON location"
            src={mapsEmbedSrc}
            width="100%"
            height="350"
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
            className="w-full"
          />
        </div>

        <div className="mt-6 text-center">
          <a href={mapsLink} target="_blank" rel="noopener noreferrer" aria-label="Open location in Google Maps">
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
