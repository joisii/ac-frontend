// src/pages/GymProjects.js
import React, { useState, useEffect } from "react";

// Temporary static data (replace with Excel import later)
const gymClients = [
  { id: 1, name: "Anytime Fitness", location: "Chennai", acType: "Ducted AC" },
  { id: 2, name: "Gold’s Gym", location: "Bangalore", acType: "VRF" },
  { id: 3, name: "Cult.Fit", location: "Hyderabad", acType: "Cassette AC" },
];

// Helper: Convert array to CSV and trigger download
const downloadCSV = (data, filename = "gym_clients.csv") => {
  const headers = Object.keys(data[0]).join(",") + "\n";
  const rows = data.map((row) => Object.values(row).join(",")).join("\n");
  const csv = headers + rows;

  const blob = new Blob([csv], { type: "text/csv" });
  const url = window.URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  a.click();
  window.URL.revokeObjectURL(url);
};

export default function GymProjects() {
  const [search, setSearch] = useState("");

  // Always scroll to top on page load
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const filteredClients = gymClients.filter(
    (c) =>
      c.name.toLowerCase().includes(search.toLowerCase()) ||
      c.location.toLowerCase().includes(search.toLowerCase()) ||
      c.acType.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white py-16 px-6 font-sans">
      <h1 className="text-4xl font-bold text-center mb-10 text-blue-800">
        Gym Projects
      </h1>

      {/* Search Input */}
      <div className="max-w-3xl mx-auto mb-8 flex flex-col sm:flex-row items-center gap-4">
        <input
          type="text"
          placeholder="Search by name, location, or AC type..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="flex-1 p-3 border border-gray-300 rounded-xl shadow focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          onClick={() => downloadCSV(gymClients)}
          className="px-5 py-3 bg-blue-600 text-white rounded-xl shadow hover:bg-blue-700 transition"
        >
          ⬇ Download All
        </button>
      </div>

      {/* Data Table */}
      <div className="overflow-x-auto max-w-5xl mx-auto">
        <table className="w-full border border-gray-300 rounded-xl shadow-md text-sm">
          <thead>
            <tr className="bg-gray-100 text-left">
              <th className="p-3 border">#</th>
              <th className="p-3 border">Name</th>
              <th className="p-3 border">Location</th>
              <th className="p-3 border">AC Type</th>
            </tr>
          </thead>
          <tbody>
            {filteredClients.length > 0 ? (
              filteredClients.map((c) => (
                <tr key={c.id} className="hover:bg-gray-50">
                  <td className="p-3 border">{c.id}</td>
                  <td className="p-3 border">{c.name}</td>
                  <td className="p-3 border">{c.location}</td>
                  <td className="p-3 border">{c.acType}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="4" className="p-4 text-center text-gray-500">
                  No results found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
