import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";

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

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="bg-white rounded-xl shadow-lg p-6 w-full max-w-md"
      >
        <h2 className="text-xl font-bold text-gray-800 mb-4">Edit Record</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          {Object.keys(formData).map(
            (key) =>
              key !== "_id" && (
                <div key={key}>
                  <label className="block text-sm font-medium text-gray-700 capitalize mb-1">
                    {key}
                  </label>
                  <input
                    type="text"
                    name={key}
                    value={formData[key] || ""}
                    onChange={handleChange}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-400 outline-none"
                  />
                </div>
              )
          )}
          <div className="flex justify-end gap-3 pt-4">
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
  );
};

export default EditModal;
