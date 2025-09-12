import React from "react";

const SalesTable = ({ sales, onDelete }) => {
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
                className={`${idx % 2 === 0 ? "bg-gray-50" : "bg-white"} hover:bg-yellow-50`}
              >
                <td className="px-4 py-3 border">{s.name}</td>
                <td className="px-4 py-3 border">{s.email}</td>
                <td className="px-4 py-3 border">{s.phone}</td>
                <td className="px-4 py-3 border">{s.message}</td>
                <td className="px-4 py-3 border text-center">
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
    </div>
  );
};

export default SalesTable;
