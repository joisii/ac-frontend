import React, { useState } from "react";
import EditModal from "./EditModal";
import API_BASE from "../config";

const ServiceRequestsTable = ({ requests, onDelete, onUpdate }) => {
  const [editing, setEditing] = useState(null);

  const handleSave = async (updatedData) => {
    try {
      const res = await fetch(`${API_BASE}/requests/${updatedData._id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatedData),
      });
      if (res.ok) {
        onUpdate(updatedData);
        setEditing(null);
      }
    } catch (err) {
      console.error("Error updating request:", err);
    }
  };

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full border rounded-lg overflow-hidden text-sm">
        <thead className="bg-blue-600 text-white">
          <tr>
            <th className="px-4 py-3 border">Customer Name</th>
            <th className="px-4 py-3 border">Contact</th>
            <th className="px-4 py-3 border">Issue</th>
            <th className="px-4 py-3 border">Status</th>
            <th className="px-4 py-3 border text-center">Actions</th>
          </tr>
        </thead>
        <tbody>
          {requests.length === 0 ? (
            <tr>
              <td colSpan="5" className="text-center py-6 text-gray-500 italic">
                No service requests found.
              </td>
            </tr>
          ) : (
            requests.map((req, idx) => (
              <tr
                key={req._id}
                className={`${
                  idx % 2 === 0 ? "bg-gray-50" : "bg-white"
                } hover:bg-blue-50`}
              >
                <td className="px-4 py-3 border">{req.name}</td>
                <td className="px-4 py-3 border">{req.contact}</td>
                <td className="px-4 py-3 border">{req.issue}</td>
                <td className="px-4 py-3 border">{req.status}</td>
                <td className="px-4 py-3 border text-center space-x-2">
                  <button
                    onClick={() => setEditing(req)}
                    className="bg-blue-500 hover:bg-blue-600 text-white text-xs py-1 px-3 rounded"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => onDelete(req._id)}
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

export default ServiceRequestsTable;
