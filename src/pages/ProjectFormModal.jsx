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
  "conference",
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
  const [saving, setSaving] = useState(false); // <-- track saving state

  useEffect(() => {
    if (!isOpen) {
      setForm(EMPTY_FORM);
      setSaving(false); // reset saving when modal closes
      return;
    }

    if (project) {
      setForm({ ...project });
    } else {
      setForm(EMPTY_FORM);
    }
  }, [isOpen, project]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.category) {
      alert("Category is required");
      return;
    }

    if (saving) return; // <-- prevent multiple submissions
    setSaving(true);      // <-- disable button while saving

    try {
      await onSave(form);
      onClose();
    } catch (err) {
      console.error("Error saving project:", err);
      alert("Failed to save project. Please try again.");
    } finally {
      setSaving(false); // <-- re-enable button
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50">
      <div className="bg-white rounded-xl shadow-lg w-full max-w-lg p-6">
        <h2 className="text-xl font-bold mb-4">
          {project ? "Edit Project" : "Create Project"}
        </h2>

        <form onSubmit={handleSubmit} className="space-y-3">
          <input
            type="text"
            name="name"
            value={form.name}
            onChange={handleChange}
            placeholder="Name *"
            required
            className="w-full border px-3 py-2 rounded"
          />

          <input
            type="text"
            name="location"
            value={form.location}
            onChange={handleChange}
            placeholder="Location *"
            required
            className="w-full border px-3 py-2 rounded"
          />

          <select
            name="category"
            value={form.category}
            onChange={handleChange}
            required
            className="w-full border px-3 py-2 rounded"
          >
            <option value="">Select Category *</option>
            {CATEGORY_OPTIONS.map((cat) => (
              <option key={cat} value={cat}>
                {cat.charAt(0).toUpperCase() + cat.slice(1)}
              </option>
            ))}
          </select>

          <input
            type="text"
            name="application"
            value={form.application}
            onChange={handleChange}
            placeholder="Application"
            className="w-full border px-3 py-2 rounded"
          />

          <input
            type="text"
            name="acType"
            value={form.acType}
            onChange={handleChange}
            placeholder="AC Type"
            className="w-full border px-3 py-2 rounded"
          />

          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              name="isActive"
              checked={form.isActive}
              onChange={handleChange}
            />
            Active
          </label>

          <div className="flex justify-end gap-3 mt-4">
            <button
              type="button"
              onClick={onClose}
              disabled={saving} // disable cancel if saving
              className={`px-4 py-2 rounded ${
                saving ? "bg-gray-200 cursor-not-allowed" : "bg-gray-300 hover:bg-gray-400"
              } transition`}
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={saving} // disable save while saving
              className={`px-4 py-2 rounded text-white ${
                saving ? "bg-blue-300 cursor-not-allowed" : "bg-blue-500 hover:bg-blue-600"
              } transition`}
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
