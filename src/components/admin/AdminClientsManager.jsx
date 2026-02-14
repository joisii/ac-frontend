import { useEffect, useRef, useState } from "react";
import API_BASE from "../../config";

const PAGE_SIZE = 6;

export default function AdminClientsManager() {
  const [clients, setClients] = useState([]);
  const [name, setName] = useState("");
  const [logo, setLogo] = useState(null);
  const [preview, setPreview] = useState(null);
  const [editingId, setEditingId] = useState(null);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);

  const fileRef = useRef(null);

  // ---------------- FETCH CLIENTS ----------------
  const fetchClients = async () => {
    const res = await fetch(`${API_BASE}/api/clients`);
    const data = await res.json();
    setClients(data);
  };

  useEffect(() => {
    fetchClients();
  }, []);

  // ---------------- FILE CHANGE ----------------
  const handleFileChange = (file) => {
    setLogo(file);
    setPreview(file ? URL.createObjectURL(file) : null);
  };

  // ---------------- RESET FORM ----------------
  const resetForm = () => {
    setName("");
    setLogo(null);
    setPreview(null);
    setEditingId(null);

    if (fileRef.current) {
      fileRef.current.value = "";
    }
  };

  // ---------------- SUBMIT ----------------
  const handleSubmit = async () => {
    if (!name) {
      alert("Client name required");
      return;
    }

    setLoading(true);

    const formData = new FormData();
    formData.append("name", name);
    if (logo) formData.append("logo", logo);

    const url = editingId
      ? `${API_BASE}/api/admin/clients/${editingId}`
      : `${API_BASE}/api/admin/clients`;

    await fetch(url, {
      method: editingId ? "PUT" : "POST",
      body: formData,
    });

    await fetchClients();
    resetForm();
    setLoading(false);
  };

  // ---------------- EDIT ----------------
  const handleEdit = (client) => {
    setEditingId(client._id);
    setName(client.name);
   setPreview(client.logo); // ✅ just the Cloudinary URL
    setLogo(null);

    if (fileRef.current) {
      fileRef.current.value = "";
    }
    // ❌ no scrolling, stay where you are
  };

  // ---------------- DELETE ----------------
  const handleDelete = async (id) => {
    if (!window.confirm("Delete this client?")) return;

    await fetch(`${API_BASE}/api/admin/clients/${id}`, {
      method: "DELETE",
    });

    fetchClients();
  };

  // ---------------- PAGINATION ----------------
  const totalPages = Math.ceil(clients.length / PAGE_SIZE);
  const paginatedClients = clients.slice(
    (page - 1) * PAGE_SIZE,
    page * PAGE_SIZE
  );

  // ---------------- UI ----------------
  return (
    <div className="bg-white rounded-xl shadow p-6">
      <h2 className="text-lg font-semibold mb-6">
        🏢 Client Logo Management
      </h2>

      {/* FORM */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6 items-end">
        <div>
          <label className="text-sm font-medium mb-1 block">
            Client Name
          </label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="border rounded-lg px-3 py-2 text-sm w-full"
            placeholder="Enter client name"
          />
        </div>

        <div>
          <label className="text-sm font-medium mb-1 block">
            Client Logo
          </label>
          <input
            ref={fileRef}
            type="file"
            accept="image/*"
            onChange={(e) => handleFileChange(e.target.files[0])}
            className="border rounded-lg px-3 py-2 text-sm w-full"
          />
        </div>

        <button
          onClick={handleSubmit}
          disabled={loading}
          className={`${
            editingId
              ? "bg-yellow-500 hover:bg-yellow-600"
              : "bg-blue-600 hover:bg-blue-700"
          } text-white rounded-lg px-4 py-2 text-sm`}
        >
          {loading ? "Saving..." : editingId ? "Update Client" : "Add Client"}
        </button>
      </div>

      {/* PREVIEW */}
      {preview && (
        <div className="mb-6 flex items-center gap-3">
          <span className="text-sm text-gray-500">Preview:</span>
          <div className="w-20 h-20 border rounded-lg overflow-hidden bg-gray-50">
            <img
              src={preview}
              alt="preview"
              className="object-contain w-full h-full"
            />
          </div>
        </div>
      )}

      {/* CLIENT LIST */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        {paginatedClients.map((client) => (
          <div
            key={client._id}
            className="bg-gray-50 rounded-lg p-4 flex flex-col items-center"
          >
            <div className="w-24 h-24 mb-3 border rounded-lg bg-white flex items-center justify-center">
             <img
  src={client.logo} // use the URL as-is
  alt={client.name}
  className="object-contain w-full h-full"
/>
            </div>

            <p className="text-sm font-semibold mb-3 text-center">
              {client.name}
            </p>

            <div className="flex gap-2">
              <button
                onClick={() => handleEdit(client)}
                className="bg-yellow-400 text-white px-3 py-1 rounded text-sm"
              >
                Edit
              </button>
              <button
                onClick={() => handleDelete(client._id)}
                className="bg-red-600 text-white px-3 py-1 rounded text-sm"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* PAGINATION */}
      {totalPages > 1 && (
        <div className="flex justify-center gap-2 mt-6">
          {Array.from({ length: totalPages }).map((_, i) => (
            <button
              key={i}
              onClick={() => setPage(i + 1)}
              className={`px-3 py-1 rounded ${
                page === i + 1
                  ? "bg-blue-600 text-white"
                  : "bg-gray-200"
              }`}
            >
              {i + 1}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
