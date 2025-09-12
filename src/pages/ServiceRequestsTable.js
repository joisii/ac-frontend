import React from "react";

const ServiceRequestsTable = ({ requests, onDelete }) => {
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
                className={`${idx % 2 === 0 ? "bg-gray-50" : "bg-white"} hover:bg-blue-50`}
              >
                <td className="px-4 py-3 border">{req.name}</td>
                <td className="px-4 py-3 border">{req.contact}</td>
                <td className="px-4 py-3 border">{req.issue}</td>
                <td className="px-4 py-3 border">{req.status}</td>
                <td className="px-4 py-3 border text-center">
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
    </div>
  );
};

export default ServiceRequestsTable;
