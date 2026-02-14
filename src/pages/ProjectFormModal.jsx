import React, { useState, useEffect } from "react";

const CATEGORY_OPTIONS = [
  "restaurant",
  "gym",
  "textile",
  "banquet",
  "worship",
  "supermarket",
  "hospital",
  "corporate",
  "residence",
];

const EMPTY_FORM = {
  name: "",
  location: "",
  category: "",
  application: "",
  acType: "",
  isActive: true,
};

const ProjectFormModal = ({ isOpen, onClose, onSave, project }) => {
  const [form, setForm] = useState(EMPTY_FORM);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (!isOpen) {
      setForm(EMPTY_FORM);
      setSaving(false);
      return;
    }

    if (project) {
      setForm({ ...project, isActive: true });
    } else {
      setForm(EMPTY_FORM);
    }
  }, [isOpen, project]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.category) {
      alert("Category is required");
      return;
    }

    if (saving) return;
    setSaving(true);

    try {
      await onSave({ ...form, isActive: true });
      onClose();
    } catch (err) {
      console.error("Error saving project:", err);
      alert("Failed to save project. Please try again.");
    } finally {
      setSaving(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/50 flex items-end sm:items-center justify-center">
      <div className="bg-white w-full sm:max-w-lg rounded-t-2xl sm:rounded-2xl shadow-xl p-4 sm:p-6 max-h-[90vh] overflow-y-auto">

        <h2 className="text-lg sm:text-xl font-semibold mb-6 text-center sm:text-left">
          {project ? "Edit Project" : "Create Project"}
        </h2>

        <form onSubmit={handleSubmit} className="space-y-5">

          {/* Project Name */}
          <div>
            <label className="block text-sm font-medium mb-1">
              Project Name <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <span className="absolute inset-y-0 left-3 flex items-center text-gray-400">
                🗂️
              </span>
              <input
                type="text"
                name="name"
                value={form.name}
                onChange={handleChange}
                required
                className="w-full border rounded-lg pl-10 pr-3 py-2 text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          {/* Location */}
          <div>
            <label className="block text-sm font-medium mb-1">
              Location <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <span className="absolute inset-y-0 left-3 flex items-center text-gray-400">
                📍
              </span>
              <input
                type="text"
                name="location"
                value={form.location}
                onChange={handleChange}
                required
                className="w-full border rounded-lg pl-10 pr-3 py-2 text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          {/* Category */}
          <div>
            <label className="block text-sm font-medium mb-1">
              Category <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <span className="absolute inset-y-0 left-3 flex items-center text-gray-400">
                🏷️
              </span>
              <select
                name="category"
                value={form.category}
                onChange={handleChange}
                required
                className="w-full border rounded-lg pl-10 pr-3 py-2 text-sm sm:text-base bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">Select category</option>
                {CATEGORY_OPTIONS.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat.charAt(0).toUpperCase() + cat.slice(1)}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Application */}
          <div>
            <label className="block text-sm font-medium mb-1">
              Application
            </label>
            <div className="relative">
              <span className="absolute inset-y-0 left-3 flex items-center text-gray-400">
                🧩
              </span>
              <input
                type="text"
                name="application"
                value={form.application}
                onChange={handleChange}
                className="w-full border rounded-lg pl-10 pr-3 py-2 text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          {/* AC Type */}
          <div>
            <label className="block text-sm font-medium mb-1">
              AC Type
            </label>
            <div className="relative">
              <span className="absolute inset-y-0 left-3 flex items-center text-gray-400">
                ❄️
              </span>
              <input
                type="text"
                name="acType"
                value={form.acType}
                onChange={handleChange}
                className="w-full border rounded-lg pl-10 pr-3 py-2 text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          {/* Actions */}
          <div className="flex flex-col sm:flex-row justify-end gap-3 pt-6">
            <button
              type="button"
              onClick={onClose}
              disabled={saving}
              className="w-full sm:w-auto px-4 py-2 rounded-lg bg-gray-200 hover:bg-gray-300 disabled:cursor-not-allowed"
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={saving}
              className="w-full sm:w-auto px-4 py-2 rounded-lg text-white bg-blue-500 hover:bg-blue-600 disabled:bg-blue-300 disabled:cursor-not-allowed"
            >
              {saving ? "Saving..." : "Save"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ProjectFormModal;
