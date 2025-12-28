import React, { useState, useEffect } from "react";

const PAGE_SIZE = 20;

const AdminProjectsTable = ({ projects, onEdit, onDelete, onCategoryFilter }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [uniqueCategories, setUniqueCategories] = useState([]);
  const [actionLoadingId, setActionLoadingId] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState("");

  // Update categories whenever projects change
 useEffect(() => {
  if (!projects || projects.length === 0) {
    setUniqueCategories([]);
    return;
  }

  const categories = [...new Set(projects.map((p) => p.category).filter(Boolean))];
  setUniqueCategories(categories);

  const filteredProjects = selectedCategory ? projects.filter((p) => p.category === selectedCategory) : projects;
  const totalPages = Math.ceil(filteredProjects.length / PAGE_SIZE);

  if (currentPage > totalPages) {
    setCurrentPage(1);
  }
// eslint-disable-next-line react-hooks/exhaustive-deps
}, [projects, selectedCategory]);


  // Filter projects by selected category
  const filteredProjects = selectedCategory
    ? projects.filter((p) => p.category === selectedCategory)
    : projects;

  const totalPages = Math.ceil(filteredProjects.length / PAGE_SIZE);
  const start = (currentPage - 1) * PAGE_SIZE;
  const currentProjects = filteredProjects.slice(start, start + PAGE_SIZE);

  const handleEdit = (project) => {
    if (actionLoadingId) return;
    setActionLoadingId(project._id);
    onEdit(project);
    setActionLoadingId(null);
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
        onChange={(e) => {
          setSelectedCategory(e.target.value);
          setCurrentPage(1); // reset page when category changes
          if (onCategoryFilter) onCategoryFilter(e.target.value);
        }}
        className="mb-3 px-3 py-2 border rounded"
        value={selectedCategory}
      >
        <option value="">All Categories</option>
        {uniqueCategories.length > 0
          ? uniqueCategories.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))
          : <option disabled>No categories</option>}
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
