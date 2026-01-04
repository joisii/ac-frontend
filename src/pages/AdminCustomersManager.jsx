// src/pages/AdminCustomersManager.jsx
import React, { useEffect, useState } from "react";
import API_BASE from "../config";

const PAGE_SIZE = 8;

const AdminCustomersManager = () => {
  const [warranty, setWarranty] = useState([]);
  const [amc, setAmc] = useState([]);

  const [customerName, setCustomerName] = useState("");
  const [type, setType] = useState("warranty");

  const [editingId, setEditingId] = useState(null);
  const [editingName, setEditingName] = useState("");

  const [warrantyPage, setWarrantyPage] = useState(1);
  const [amcPage, setAmcPage] = useState(1);

  // ---------------- FETCH ----------------
  const fetchCustomers = async () => {
    try {
      const res = await fetch(`${API_BASE}/customers`);
      const data = await res.json();
      setWarranty(data.warranty || []);
      setAmc(data.amc || []);
    } catch (error) {
      console.error("❌ Fetch Error:", error);
    }
  };

  useEffect(() => {
    fetchCustomers();
  }, []);

  // ---------------- ADD ----------------
  const addCustomer = async () => {
    if (!customerName.trim()) return alert("Enter a name!");

    try {
      await fetch(`${API_BASE}/customers`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ type, client: customerName }),
      });

      setCustomerName("");
      fetchCustomers();
    } catch (err) {
      console.error("Error adding customer:", err);
    }
  };

  // ---------------- DELETE ----------------
  const deleteCustomer = async (id) => {
    if (!window.confirm("Delete this customer?")) return;

    try {
      await fetch(`${API_BASE}/customers/${id}`, { method: "DELETE" });
      fetchCustomers();
    } catch (err) {
      console.error("Error deleting customer:", err);
    }
  };

  // ---------------- EDIT ----------------
  const startEditing = (id, name) => {
    setEditingId(id);
    setEditingName(name);
  };

  const saveEdit = async (id) => {
    if (!editingName.trim()) return alert("Name cannot be empty!");

    try {
      await fetch(`${API_BASE}/customers/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ client: editingName }),
      });

      setEditingId(null);
      setEditingName("");
      fetchCustomers();
    } catch (err) {
      console.error("Error updating customer:", err);
    }
  };

  // ---------------- PAGINATION HELPERS ----------------
  const paginate = (list, page) =>
    list.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  const renderPagination = (total, page, setPage) => {
    const totalPages = Math.ceil(total / PAGE_SIZE);
    if (totalPages <= 1) return null;

    return (
      <div className="flex gap-2 justify-center mt-4">
        {Array.from({ length: totalPages }).map((_, i) => (
          <button
            key={i}
            onClick={() => setPage(i + 1)}
            className={`px-3 py-1 rounded text-sm ${
              page === i + 1
                ? "bg-blue-600 text-white"
                : "bg-gray-200 hover:bg-gray-300"
            }`}
          >
            {i + 1}
          </button>
        ))}
      </div>
    );
  };

  // ---------------- LIST RENDER ----------------
  const renderList = (list) =>
    list.map((c) => (
      <li
        key={c._id}
        className="flex justify-between items-center bg-gray-50 px-3 py-2 rounded-lg"
      >
        {editingId === c._id ? (
          <input
            value={editingName}
            onChange={(e) => setEditingName(e.target.value)}
            className="border px-2 py-1 rounded flex-1 mr-2"
          />
        ) : (
          <span className="text-sm">{c.client}</span>
        )}

        <div className="flex gap-2">
          {editingId === c._id ? (
            <button
              onClick={() => saveEdit(c._id)}
              className="bg-green-500 text-white px-3 py-1 rounded text-sm"
            >
              Save
            </button>
          ) : (
            <button
              onClick={() => startEditing(c._id, c.client)}
              className="bg-yellow-400 text-white px-3 py-1 rounded text-sm"
            >
              Edit
            </button>
          )}

          <button
            onClick={() => deleteCustomer(c._id)}
            className="bg-red-600 text-white px-3 py-1 rounded text-sm"
          >
            Delete
          </button>
        </div>
      </li>
    ));

  // ---------------- UI ----------------
  return (
    <div className="bg-white rounded-xl shadow p-4 sm:p-6">
      <h2 className="text-lg font-semibold mb-4">
        Warranty & AMC Customers
      </h2>

      {/* ADD */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
        <select
          value={type}
          onChange={(e) => setType(e.target.value)}
          className="w-full px-3 py-2 border rounded-lg"
        >
          <option value="warranty">Warranty</option>
          <option value="amc">AMC</option>
        </select>

        <input
          value={customerName}
          onChange={(e) => setCustomerName(e.target.value)}
          placeholder="Client Name"
          className="w-full px-3 py-2 border rounded-lg"
        />

        <button
          onClick={addCustomer}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
        >
          Add Customer
        </button>
      </div>

      {/* LISTS */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        {/* WARRANTY */}
        <div>
          <h3 className="text-sm font-semibold text-blue-700 mb-2">
            Warranty Customers
          </h3>
          <ul className="space-y-2">
            {renderList(paginate(warranty, warrantyPage))}
          </ul>
          {renderPagination(warranty.length, warrantyPage, setWarrantyPage)}
        </div>

        {/* AMC */}
        <div>
          <h3 className="text-sm font-semibold text-blue-700 mb-2">
            AMC Customers
          </h3>
          <ul className="space-y-2">
            {renderList(paginate(amc, amcPage))}
          </ul>
          {renderPagination(amc.length, amcPage, setAmcPage)}
        </div>
      </div>
    </div>
  );
};

export default AdminCustomersManager;
