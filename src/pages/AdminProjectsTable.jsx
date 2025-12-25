import React, { useState, useEffect } from "react";

const PAGE_SIZE = 10;

const AdminProjectsTable = ({
  projects,
  onEdit,
  onDelete,
  onCategoryFilter,
}) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [uniqueCategories, setUniqueCategories] = useState([]);
  const [actionLoadingId, setActionLoadingId] = useState(null); // 👈 key fix

  useEffect(() => {
    const categories = [
      ...new Set(projects.map((p) => p.category).filter(Boolean)),
    ];
    setUniqueCategories(categories);
    setCurrentPage(1);
  }, [projects]);

  const totalPages = Math.ceil(projects.length / PAGE_SIZE);
  const start = (currentPage - 1) * PAGE_SIZE;
  const currentProjects = projects.slice(start, start + PAGE_SIZE);

  const handleEdit = (project) => {
    if (actionLoadingId) return; // prevent double click
    setActionLoadingId(project._id);
    onEdit(project);
    setActionLoadingId(null); // modal opens instantly, so unlock
  };

  const handleDelete = async (id) => {
    if (actionLoadingId) return;
    setActionLoadingId(id);

    try {
      await onDelete(id);
    } catch (err) {
      console.error("Delete failed", err);
      alert("Failed to delete project");
    } finally {
      setActionLoadingId(null);
    }
  };

  return (
    <div>
      <select
        onChange={(e) => onCategoryFilter(e.target.value)}
        className="mb-3 px-3 py-2 border rounded"
      >
        <option value="">All Categories</option>
        {uniqueCategories.map((cat) => (
          <option key={cat} value={cat}>
            {cat}
          </option>
        ))}
      </select>

      {currentProjects.length === 0 ? (
        <p className="text-gray-500">No projects available.</p>
      ) : (
        <>
          <table className="min-w-full bg-white border rounded">
            <thead className="bg-gray-100">
              <tr>
                <th className="px-4 py-2">Name</th>
                <th className="px-4 py-2">Location</th>
                <th className="px-4 py-2">Category</th>
                <th className="px-4 py-2">Application</th>
                <th className="px-4 py-2">AC Type</th>
                <th className="px-4 py-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {currentProjects.map((proj) => {
                const isLoading = actionLoadingId === proj._id;

                return (
                  <tr key={proj._id} className="border-t">
                    <td className="px-4 py-2">{proj.name}</td>
                    <td className="px-4 py-2">{proj.location}</td>
                    <td className="px-4 py-2">{proj.category}</td>
                    <td className="px-4 py-2">{proj.application}</td>
                    <td className="px-4 py-2">{proj.acType}</td>
                    <td className="px-4 py-2 flex gap-2">
                      <button
                        onClick={() => handleEdit(proj)}
                        disabled={isLoading}
                        className={`px-3 py-1 rounded text-white ${
                          isLoading
                            ? "bg-blue-300 cursor-not-allowed"
                            : "bg-blue-500 hover:bg-blue-600"
                        }`}
                      >
                        Edit
                      </button>

                      <button
                        onClick={() => handleDelete(proj._id)}
                        disabled={isLoading}
                        className={`px-3 py-1 rounded text-white ${
                          isLoading
                            ? "bg-red-300 cursor-not-allowed"
                            : "bg-red-500 hover:bg-red-600"
                        }`}
                      >
                        {isLoading ? "Deleting..." : "Delete"}
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>

          {totalPages > 1 && (
            <div className="flex justify-center gap-2 mt-4">
              {Array.from({ length: totalPages }, (_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrentPage(i + 1)}
                  className={`px-3 py-1 border rounded ${
                    currentPage === i + 1
                      ? "bg-blue-500 text-white"
                      : "bg-white"
                  }`}
                >
                  {i + 1}
                </button>
              ))}
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default AdminProjectsTable;
