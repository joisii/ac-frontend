// src/components/EditModal.js
import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const EditModal = ({ isOpen, onClose, onSave, data }) => {
  const [formData, setFormData] = useState({});

  useEffect(() => {
    setFormData(data || {});
  }, [data]);

  if (!isOpen) return null;

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formData);
  };

  // Auto detect field type
  const getInputType = (key) => {
    if (key.toLowerCase().includes("email")) return "email";
    if (key.toLowerCase().includes("phone") || key.toLowerCase().includes("contact"))
      return "tel";
    if (key.toLowerCase().includes("status")) return "text";
    if (key.toLowerCase().includes("message") || key.toLowerCase().includes("issue"))
      return "textarea";
    return "text";
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div
          className="fixed inset-0 flex items-center justify-center bg-black/50 z-50 p-4"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="bg-white rounded-xl shadow-2xl w-full max-w-3xl max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()} // prevent background close
          >
            {/* Header */}
            <div className="flex justify-between items-center p-6 border-b">
              <h2 className="text-xl font-bold text-gray-800">Edit Record</h2>
              <button
                onClick={onClose}
                className="text-gray-400 hover:text-gray-600 text-2xl leading-none"
              >
                ×
              </button>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="p-6 space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {Object.keys(formData).map(
                  (key) =>
                    key !== "_id" && (
                      <div key={key} className="flex flex-col">
                        <label className="text-sm font-medium text-gray-700 capitalize mb-1">
                          {key}
                        </label>
                        {getInputType(key) === "textarea" ? (
                          <textarea
                            name={key}
                            value={formData[key] || ""}
                            onChange={handleChange}
                            rows="3"
                            className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-400 outline-none resize-none"
                          />
                        ) : (
                          <input
                            type={getInputType(key)}
                            name={key}
                            value={formData[key] || ""}
                            onChange={handleChange}
                            className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-400 outline-none"
                          />
                        )}
                      </div>
                    )
                )}
              </div>

              {/* Footer */}
              <div className="flex flex-col sm:flex-row justify-end gap-3 pt-4 border-t">
                <button
                  type="button"
                  onClick={onClose}
                  className="px-4 py-2 rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-100"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700"
                >
                  Save
                </button>
              </div>
            </form>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default EditModal;
