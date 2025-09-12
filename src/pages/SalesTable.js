import React, { useState } from "react";
import EditModal from "./EditModal";
import API_BASE from "../config";

const SalesTable = ({ sales, onDelete, onUpdate }) => {
  const [editing, setEditing] = useState(null);

  const handleSave = async (updatedData) => {
    try {
      const res = await fetch(`${API_BASE}/sales/${updatedData._id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatedData),
      });
      if (res.ok) {
        onUpdate(updatedData);
        setEditing(null);
      }
    } catch (err) {
      console.error("Error updating sale:", err);
    }
  };

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full border rounded-lg overflow-hidden text-sm">
        <thead className="bg-yellow-500 text-white">
          <tr>
            <th className="px-4 py-3 border">Name</th>
            <th className="px-4 py-3 border">Email</th>
            <th className="px-4 py-3 border">Phone</th>
            <th className="px-4 py-3 border">Message</th>
            <th className="px-4 py-3 border text-center">Actions</th>
          </tr>
        </thead>
        <tbody>
          {sales.length === 0 ? (
            <tr>
              <td colSpan="5" className="text-center py-6 text-gray-500 italic">
                No sales records found.
              </td>
            </tr>
          ) : (
            sales.map((s, idx) => (
              <tr
                key={s._id}
                className={`${
                  idx % 2 === 0 ? "bg-gray-50" : "bg-white"
                } hover:bg-yellow-50`}
              >
                <td className="px-4 py-3 border">{s.name}</td>
                <td className="px-4 py-3 border">{s.email}</td>
                <td className="px-4 py-3 border">{s.phone}</td>
                <td className="px-4 py-3 border">{s.message}</td>
                <td className="px-4 py-3 border text-center space-x-2">
                  <button
                    onClick={() => setEditing(s)}
                    className="bg-blue-500 hover:bg-blue-600 text-white text-xs py-1 px-3 rounded"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => onDelete(s._id)}
                    className="bg-red-500 hover:bg-red-600 text-white text-xs py-1 px-3 rounded"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>

      <EditModal
        isOpen={!!editing}
        onClose={() => setEditing(null)}
        onSave={handleSave}
        data={editing}
      />
    </div>
  );
};

export default SalesTable;
