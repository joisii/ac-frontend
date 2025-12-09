// src/pages/restaurant/RestaurantProjects.js
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import gradients from "../config/gradients";

/**
 * Inline editable table with:
 * - Edit per row (Save / Cancel)
 * - Add new row (inline form)
 * - Delete row (confirm)
 * - Client-side persistence via localStorage (optional; removes "lost work" complaints)
 *
 * This is front-end-only (no backend). If you later want to persist to server, swap localStorage calls for API calls.
 */

// initial static data (kept as fallback)
const INITIAL_CLIENTS = [
  { id: 1, name: "Hotel Sangeetha", location: "Chennai", application: "Hotel", acType: "VRF" },
  { id: 2, name: "M/s Touch Stone", location: "Chennai", application: "Hotel", acType: "Cassette SAC" },
  { id: 3, name: "KFC", location: "Chennai", application: "Restaurant", acType: "Low side works" },
  { id: 4, name: "Garrison Engineers", location: "Chennai", application: "Bar / Restaurant", acType: "DSAC" },
  { id: 5, name: "Hotel Arun Prasad Park", location: "Chennai", application: "Hotel", acType: "VRF" },
  { id: 6, name: "Hotel Kanchi Restaurant", location: "Chennai", application: "Restaurant", acType: "DSAC" },
  { id: 7, name: "Main Land China", location: "Chennai", application: "Restaurant", acType: "DSAC" },
  { id: 8, name: "DR Uthamma Hotel", location: "Chennai", application: "Bar / Restaurant", acType: "DSAC" },
  { id: 9, name: "Akshaya Homes Pvt Ltd", location: "Chennai", application: "Club House", acType: "DVRF" },
  { id: 10, name: "Hotel Ganesh Bhavan", location: "Chennai", application: "Restaurant", acType: "DSAC" },
  { id: 11, name: "Madras Boat Club", location: "Chennai", application: "Bar / Restaurant", acType: "DSAC" },
  { id: 12, name: "Hotel Pratap Plaza", location: "Chennai", application: "Restaurant", acType: "DSAC" },
  { id: 13, name: "Jalpaan Restaurant", location: "Chennai", application: "Restaurant", acType: "DSAC" },
  { id: 14, name: "ISPHANI Centre", location: "Chennai", application: "Restaurant", acType: "DSAC" },
  { id: 15, name: "Mr Ramachandran (Lodge)", location: "Chennai", application: "Lodge", acType: "VRF IV S" },
  { id: 16, name: "Mr Nandamumar", location: "Chennai", application: "Resort", acType: "VRF S" },
  { id: 17, name: "Shree Mahaveer Jewellary Lodge", location: "Kanchipuram", application: "Show Rom", acType: "DSAC" },
  { id: 18, name: "Kings Royal Bar", location: "Chennai", application: "Bar / Restaurant", acType: "IDSAC" },
  { id: 19, name: "Astoria Restaurant", location: "Chennai", application: "Bar / Restaurant", acType: "DSAC" },
  { id: 20, name: "White Castle Restaurant", location: "Chennai", application: "Bar / Restaurant", acType: "V Cool" },
  { id: 21, name: "Astoria Restaurant", location: "Chennai", application: "Restaurant", acType: "DSAC" },
  { id: 22, name: "ANN Residency", location: "Chennai", application: "Restaurant", acType: "DSAC/VRF" },
  { id: 23, name: "Megh Kitchens", location: "Chennai", application: "Restaurant", acType: "DSAC" },
  { id: 24, name: "Rajasekar Lodge", location: "Kanchipuram", application: "Lodge", acType: "VRF IV S" },
  { id: 25, name: "Sudha Timber Lodge", location: "Chennai", application: "Lodge", acType: "LS" },
  { id: 26, name: "Park Club", location: "Chennai", application: "Bar / Restaurant", acType: "LS" },
];

const STORAGE_KEY = "restaurant_clients_v1";

export default function RestaurantProjects() {
  const [clients, setClients] = useState(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      return raw ? JSON.parse(raw) : INITIAL_CLIENTS;
    } catch {
      return INITIAL_CLIENTS;
    }
  });

  const [search, setSearch] = useState("");
  const navigate = useNavigate();

  // editing state
  const [editingId, setEditingId] = useState(null); // id of row currently being edited
  const [editForm, setEditForm] = useState({ name: "", location: "", application: "", acType: "" });

  // add-new state
  const [adding, setAdding] = useState(false);
  const [addForm, setAddForm] = useState({ name: "", location: "", application: "", acType: "" });

  // persist to localStorage whenever clients change
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(clients));
    } catch (err) {
      // ignore write errors (e.g. storage full)
      // console.warn("LocalStorage write failed", err);
    }
  }, [clients]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // helpers
  const nextId = () => {
    // generate next id safely
    const ids = clients.map((c) => c.id || 0);
    return Math.max(0, ...ids) + 1;
  };

  const startEdit = (client) => {
    setEditingId(client.id);
    setEditForm({
      name: client.name,
      location: client.location,
      application: client.application,
      acType: client.acType,
    });
    // close add form if open
    setAdding(false);
  };

  const cancelEdit = () => {
    setEditingId(null);
    setEditForm({ name: "", location: "", application: "", acType: "" });
  };

  const saveEdit = (id) => {
    // basic validation
    if (!editForm.name.trim()) return alert("Name is required.");
    setClients((prev) => prev.map((c) => (c.id === id ? { ...c, ...editForm } : c)));
    cancelEdit();
  };

  const deleteRow = (id) => {
    // nicer confirm UX
    // eslint-disable-next-line no-restricted-globals
    if (confirm("Delete this client? This action cannot be undone locally.")) {
      setClients((prev) => prev.filter((c) => c.id !== id));
      if (editingId === id) cancelEdit();
    }
  };

  const startAdd = () => {
    setAdding(true);
    setEditingId(null);
    setAddForm({ name: "", location: "", application: "", acType: "" });
    // focus handling could be added if needed
  };

  const cancelAdd = () => {
    setAdding(false);
    setAddForm({ name: "", location: "", application: "", acType: "" });
  };

  const saveAdd = () => {
    if (!addForm.name.trim()) return alert("Name is required.");
    const newItem = { id: nextId(), ...addForm };
    setClients((prev) => [newItem, ...prev]);
    cancelAdd();
  };

  const filteredClients = clients.filter(
    (c) =>
      c.name.toLowerCase().includes(search.toLowerCase()) ||
      c.location.toLowerCase().includes(search.toLowerCase()) ||
      c.acType.toLowerCase().includes(search.toLowerCase()) ||
      c.application.toLowerCase().includes(search.toLowerCase())
  );

  // Motion variants for staggered fade-in
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.12,
        delayChildren: 0.12,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 12 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.45 } },
  };

  const rowVariants = {
    hidden: { opacity: 0, x: 30 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.4 } },
  };

  return (
    <motion.div
      key="restaurant-page"
      initial="hidden"
      animate="visible"
      exit="hidden"
      variants={containerVariants}
      className={`min-h-screen bg-gradient-to-b ${gradients.restaurant} py-16 px-6 font-sans`}
    >
      {/* Back Button */}
      <motion.div variants={itemVariants} className="max-w-5xl mx-auto mb-6">
        <button
          onClick={() => navigate(-1)}
          className="px-4 py-2 bg-gray-200 text-gray-800 rounded-lg shadow hover:bg-gray-300 transition"
        >
          ⬅ Back
        </button>
      </motion.div>

      {/* Title */}
      <motion.h1 variants={itemVariants} className="text-4xl font-bold text-center mb-6 text-yellow-700">
        Restaurant Projects
      </motion.h1>

      {/* Search + Add */}
      <motion.div variants={itemVariants} className="max-w-5xl mx-auto mb-6 flex flex-col sm:flex-row items-center gap-4">
        <input
          type="text"
          placeholder="Search by name, location, application or AC type..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="flex-1 p-3 border border-gray-300 rounded-xl shadow focus:outline-none focus:ring-2 focus:ring-yellow-500"
        />

        <div className="flex gap-3">
          {adding ? (
            <>
              <button onClick={saveAdd} className="px-4 py-2 bg-green-600 text-white rounded-lg shadow hover:bg-green-700">
                Save
              </button>
              <button onClick={cancelAdd} className="px-4 py-2 bg-gray-200 rounded-lg shadow hover:bg-gray-300">
                Cancel
              </button>
            </>
          ) : (
            <button onClick={startAdd} className="px-4 py-2 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700">
              + Add Client
            </button>
          )}
        </div>
      </motion.div>

      {/* Inline Add Form */}
      {adding && (
        <motion.div variants={itemVariants} className="max-w-5xl mx-auto mb-6">
          <div className="bg-white p-4 rounded-xl shadow-md grid grid-cols-1 md:grid-cols-4 gap-3">
            <input
              className="p-2 border rounded-md"
              placeholder="Name *"
              value={addForm.name}
              onChange={(e) => setAddForm((s) => ({ ...s, name: e.target.value }))}
            />
            <input
              className="p-2 border rounded-md"
              placeholder="Location"
              value={addForm.location}
              onChange={(e) => setAddForm((s) => ({ ...s, location: e.target.value }))}
            />
            <input
              className="p-2 border rounded-md"
              placeholder="Application"
              value={addForm.application}
              onChange={(e) => setAddForm((s) => ({ ...s, application: e.target.value }))}
            />
            <input
              className="p-2 border rounded-md"
              placeholder="AC Type"
              value={addForm.acType}
              onChange={(e) => setAddForm((s) => ({ ...s, acType: e.target.value }))}
            />
          </div>
        </motion.div>
      )}

      {/* Data Table */}
      <motion.div variants={itemVariants} className="overflow-x-auto max-w-5xl mx-auto bg-white rounded-xl shadow-md">
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-gray-100 text-left">
              <th className="p-3 border">Sl No</th>
              <th className="p-3 border">Project / Customer</th>
              <th className="p-3 border">Location</th>
              <th className="p-3 border">Industry / Application</th>
              <th className="p-3 border">AC Type</th>
              <th className="p-3 border">Actions</th>
            </tr>
          </thead>

          <tbody>
            {filteredClients.length > 0 ? (
              filteredClients.map((c, idx) => {
                const isEditing = editingId === c.id;
                return (
                  <motion.tr
                    key={c.id}
                    variants={rowVariants}
                    initial="hidden"
                    animate="visible"
                    transition={{ delay: 0.05 * idx }}
                    className="group"
                  >
                    <td className="p-3 border align-middle">{c.id}</td>

                    <td className="p-3 border align-middle">
                      {isEditing ? (
                        <input
                          className="p-2 border rounded-md w-full"
                          value={editForm.name}
                          onChange={(e) => setEditForm((s) => ({ ...s, name: e.target.value }))}
                        />
                      ) : (
                        <div className="font-medium">{c.name}</div>
                      )}
                    </td>

                    <td className="p-3 border align-middle">
                      {isEditing ? (
                        <input
                          className="p-2 border rounded-md w-full"
                          value={editForm.location}
                          onChange={(e) => setEditForm((s) => ({ ...s, location: e.target.value }))}
                        />
                      ) : (
                        c.location
                      )}
                    </td>

                    <td className="p-3 border align-middle">
                      {isEditing ? (
                        <input
                          className="p-2 border rounded-md w-full"
                          value={editForm.application}
                          onChange={(e) => setEditForm((s) => ({ ...s, application: e.target.value }))}
                        />
                      ) : (
                        c.application
                      )}
                    </td>

                    <td className="p-3 border align-middle">
                      {isEditing ? (
                        <input
                          className="p-2 border rounded-md w-full"
                          value={editForm.acType}
                          onChange={(e) => setEditForm((s) => ({ ...s, acType: e.target.value }))}
                        />
                      ) : (
                        c.acType
                      )}
                    </td>

                    <td className="p-3 border align-middle">
                      {isEditing ? (
                        <div className="flex gap-2">
                          <button
                            onClick={() => saveEdit(c.id)}
                            className="px-3 py-1 bg-green-600 text-white rounded-md hover:bg-green-700"
                          >
                            Save
                          </button>
                          <button
                            onClick={cancelEdit}
                            className="px-3 py-1 bg-gray-200 rounded-md hover:bg-gray-300"
                          >
                            Cancel
                          </button>
                        </div>
                      ) : (
                        <div className="flex gap-2">
                          <button
                            onClick={() => startEdit(c)}
                            className="px-3 py-1 bg-yellow-500 text-white rounded-md hover:bg-yellow-600"
                          >
                            Edit
                          </button>
                          <button
                            onClick={() => deleteRow(c.id)}
                            className="px-3 py-1 bg-red-600 text-white rounded-md hover:bg-red-700"
                          >
                            Delete
                          </button>
                        </div>
                      )}
                    </td>
                  </motion.tr>
                );
              })
            ) : (
              <tr>
                <td colSpan="6" className="p-6 text-center text-gray-500">
                  No results found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </motion.div>
    </motion.div>
  );
}
