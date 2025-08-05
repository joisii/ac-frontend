// src/components/SalesTable.js
import React, { useEffect, useState } from 'react';
import API_BASE from '../config';

const SalesTable = () => {
  const [sales, setSales] = useState([]);

  useEffect(() => {
    fetch(`${API_BASE}/sales`)
      .then(res => res.json())
      .then(data => setSales(data))
      .catch(err => console.error('Error fetching sales:', err));
  }, []);

  const handleDelete = (id) => {
    fetch(`${API_BASE}/sales/${id}`, { method: 'DELETE' })
      .then(() => setSales(prev => prev.filter(s => s._id !== id)))
      .catch(err => console.error('Error deleting sale:', err));
  };

  return (
    <div className="overflow-x-auto">
      <h3 className="text-2xl font-semibold text-gray-800 mb-6">Sales Records</h3>
      {sales.length === 0 ? (
        <div className="text-center text-gray-500 py-10">
          <p>No sales records available.</p>
        </div>
      ) : (
        <table className="min-w-full border rounded-lg overflow-hidden text-left text-sm">
          <thead className="bg-gray-100 text-gray-700 uppercase tracking-wider">
            <tr>
              <th className="px-4 py-3 border">Name</th>
              <th className="px-4 py-3 border">Email</th>
              <th className="px-4 py-3 border">Phone</th>
              <th className="px-4 py-3 border">Message</th>
              <th className="px-4 py-3 border">Actions</th>
            </tr>
          </thead>
          <tbody>
            {sales.map((entry) => (
              <tr key={entry._id} className="hover:bg-gray-50">
                <td className="px-4 py-3 border">{entry.name}</td>
                <td className="px-4 py-3 border">{entry.email}</td>
                <td className="px-4 py-3 border">{entry.phone}</td>
                <td className="px-4 py-3 border">{entry.message}</td>
                <td className="px-4 py-3 border">
                  <button
                    onClick={() => handleDelete(entry._id)}
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

export default SalesTable;
