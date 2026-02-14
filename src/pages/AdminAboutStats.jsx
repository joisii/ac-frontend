import React, { useEffect, useState } from "react";
import API_BASE from "../config";

const AdminAboutStats = () => {
  const [formData, setFormData] = useState({
    coolingInstalledTR: "",
    clientsServed: "",
  });

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  // Fetch existing stats
  useEffect(() => {
    fetch(`${API_BASE}/about-stats`)
      .then((res) => res.json())
      .then((data) => {
        setFormData({
  coolingInstalledTR: data.coolingInstalledTR || 0,
  clientsServed: data.clientsServed || 0,
});
      })
      .catch((err) => console.error("Failed to load about stats", err))
      .finally(() => setLoading(false));
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: Number(value),
    }));
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      const res = await fetch(`${API_BASE}/about-stats`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!res.ok) {
        throw new Error("Update failed");
      }

      alert("About section stats updated successfully");
    } catch (err) {
      alert("Failed to update stats");
      console.error(err);
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return <p className="text-gray-500">Loading About stats...</p>;
  }

  return (
    <div className="bg-white rounded-xl shadow p-4 sm:p-6">
      <h2 className="text-lg font-semibold mb-4">About Section Statistics</h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium mb-1">
            Cooling Installed (TR)
          </label>
          <input
            type="number"
            name="coolingInstalledTR"
            value={formData.coolingInstalledTR}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-lg"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">
            Clients Served
          </label>
          <input
            type="number"
            name="clientsServed"
            value={formData.clientsServed}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-lg"
          />
        </div>
      </div>

      <div className="mt-4">
        <button
          onClick={handleSave}
          disabled={saving}
          className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50"
        >
          {saving ? "Saving..." : "Update Stats"}
        </button>
      </div>
    </div>
  );
};

export default AdminAboutStats;
