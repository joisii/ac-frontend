// src/components/ServiceRequestsTable.js
import React, { useEffect, useState } from "react";
import API_BASE from "../config";

const ServiceRequestsTable = () => {
  const [requests, setRequests] = useState([]);

  useEffect(() => {
    fetch(`${API_BASE}/requests`)
      .then((res) => res.json())
      .then((data) => setRequests(data))
      .catch((err) => console.error("Error fetching requests", err));
  }, []);

  const handleDelete = (id) => {
    fetch(`${API_BASE}/requests/${id}`, { method: "DELETE" })
      .then(() => setRequests((prev) => prev.filter((req) => req._id !== id)))
      .catch((err) => console.error("Error deleting request", err));
  };

  return (
    <div className="overflow-x-auto">
      <h3 className="text-2xl font-semibold text-gray-800 mb-6">
        Service Requests
      </h3>
      {requests.length === 0 ? (
        <div className="text-center text-gray-500 py-10">
          <p>No service requests available.</p>
        </div>
      ) : (
        <table className="min-w-full border rounded-lg overflow-hidden text-left text-sm">
          <thead className="bg-gray-100 text-gray-700 uppercase tracking-wider">
            <tr>
              <th className="px-4 py-3 border">Customer Name</th>
              <th className="px-4 py-3 border">Contact</th>
              <th className="px-4 py-3 border">Issue Description</th>
              <th className="px-4 py-3 border">Status</th>
              <th className="px-4 py-3 border">Actions</th>
            </tr>
          </thead>
          <tbody>
            {requests.map((req) => (
              <tr key={req._id} className="hover:bg-gray-50">
                <td className="px-4 py-3 border">{req.name}</td>
                <td className="px-4 py-3 border">{req.contact}</td>
                <td className="px-4 py-3 border">{req.issue}</td>
                <td className="px-4 py-3 border">
                  <span className="inline-block bg-yellow-100 text-yellow-700 px-2 py-1 rounded text-xs">
                    {req.status}
                  </span>
                </td>
                <td className="px-4 py-3 border">
                  <button
                    onClick={() => handleDelete(req._id)}
                    className="bg-red-500 hover:bg-red-600 text-white text-xs py-1 px-3 rounded shadow"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default ServiceRequestsTable;
