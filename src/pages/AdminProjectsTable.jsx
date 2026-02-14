import React, { useState, useEffect } from "react";

const PAGE_SIZE = 20;
const PAGINATION_WINDOW = 2; // pages around current

const AdminProjectsTable = ({
  projects = [],
  onEdit,
  onDelete,
  onCategoryFilter,
}) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [uniqueCategories, setUniqueCategories] = useState([]);
  const [actionLoadingId, setActionLoadingId] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState("");

  /* ---------------- CATEGORY HANDLING ---------------- */
  useEffect(() => {
    if (!projects.length) {
      setUniqueCategories([]);
      return;
    }

    const categories = [
      ...new Set(projects.map((p) => p.category).filter(Boolean)),
    ];
    setUniqueCategories(categories);

    const filtered = selectedCategory
      ? projects.filter((p) => p.category === selectedCategory)
      : projects;

    const totalPages = Math.ceil(filtered.length / PAGE_SIZE);
    if (currentPage > totalPages) setCurrentPage(1);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [projects, selectedCategory]);

  /* ---------------- FILTER + PAGINATION ---------------- */
  const filteredProjects = selectedCategory
    ? projects.filter((p) => p.category === selectedCategory)
    : projects;

  const totalPages = Math.ceil(filteredProjects.length / PAGE_SIZE);
  const start = (currentPage - 1) * PAGE_SIZE;
  const currentProjects = filteredProjects.slice(start, start + PAGE_SIZE);

  /* ---------------- ACTIONS ---------------- */
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

  /* ---------------- PAGINATION WINDOW ---------------- */
  const getPaginationPages = () => {
    if (totalPages <= 1) return [];

    const pages = [];
    const startPage = Math.max(2, currentPage - PAGINATION_WINDOW);
    const endPage = Math.min(totalPages - 1, currentPage + PAGINATION_WINDOW);

    pages.push(1);

    if (startPage > 2) pages.push("...");

    for (let i = startPage; i <= endPage; i++) {
      pages.push(i);
    }

    if (endPage < totalPages - 1) pages.push("...");

    if (totalPages > 1) pages.push(totalPages);

    return pages;
  };

  /* ---------------- UI ---------------- */
  return (
    <div className="space-y-4">
      {/* Filter */}
      <div className="flex flex-col sm:flex-row sm:items-center gap-3">
        <select
          value={selectedCategory}
          onChange={(e) => {
            setSelectedCategory(e.target.value);
            setCurrentPage(1);
            onCategoryFilter?.(e.target.value);
          }}
          className="px-4 py-2 border rounded-lg w-full sm:w-64 focus:ring-2 focus:ring-blue-500"
        >
          <option value="">All Categories</option>
          {uniqueCategories.length ? (
            uniqueCategories.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))
          ) : (
            <option disabled>No categories</option>
          )}
        </select>
      </div>

      {/* Empty State */}
      {currentProjects.length === 0 ? (
        <p className="text-gray-500 text-center py-10">
          No projects available.
        </p>
      ) : (
        <>
          {/* Table */}
          <div className="overflow-x-auto rounded-lg border">
            <table className="min-w-full bg-white">
              <thead className="bg-gray-100 sticky top-0 z-10">
                <tr>
                  {[
                    "Name",
                    "Location",
                    "Category",
                    "Application",
                    "AC Type",
                    "Actions",
                  ].map((h) => (
                    <th
                      key={h}
                      className="px-4 py-3 text-left text-sm font-semibold"
                    >
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>

              <tbody>
                {currentProjects.map((proj) => {
                  const isLoading = actionLoadingId === proj._id;

                  return (
                    <tr
                      key={proj._id}
                      className="border-t hover:bg-gray-50 transition"
                    >
                      <td className="px-4 py-2">{proj.name}</td>
                      <td className="px-4 py-2">{proj.location}</td>
                      <td className="px-4 py-2 capitalize">
                        {proj.category}
                      </td>
                      <td className="px-4 py-2">
                        {proj.application || "-"}
                      </td>
                      <td className="px-4 py-2">{proj.acType || "-"}</td>
                      <td className="px-4 py-2">
                        <div className="flex gap-2">
                          <button
                            onClick={() => handleEdit(proj)}
                            disabled={isLoading}
                            className="px-3 py-1 rounded-md text-sm text-white bg-blue-500 hover:bg-blue-600 disabled:bg-blue-300"
                          >
                            ✏️ Edit
                          </button>
                          <button
                            onClick={() => handleDelete(proj._id)}
                            disabled={isLoading}
                            className="px-3 py-1 rounded-md text-sm text-white bg-red-500 hover:bg-red-600 disabled:bg-red-300"
                          >
                            {isLoading ? "Deleting…" : "🗑 Delete"}
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex justify-center items-center gap-2 flex-wrap mt-6">
              <button
                onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                disabled={currentPage === 1}
                className="px-3 py-1 border rounded disabled:opacity-50"
              >
                Prev
              </button>

              {getPaginationPages().map((p, idx) =>
                p === "..." ? (
                  <span key={idx} className="px-2 text-gray-500">
                    …
                  </span>
                ) : (
                  <button
                    key={p}
                    onClick={() => setCurrentPage(p)}
                    className={`px-3 py-1 border rounded ${
                      currentPage === p
                        ? "bg-blue-500 text-white"
                        : "bg-white"
                    }`}
                  >
                    {p}
                  </button>
                )
              )}

              <button
                onClick={() =>
                  setCurrentPage((p) => Math.min(totalPages, p + 1))
                }
                disabled={currentPage === totalPages}
                className="px-3 py-1 border rounded disabled:opacity-50"
              >
                Next
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default AdminProjectsTable;
