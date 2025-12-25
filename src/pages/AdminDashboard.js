import React, { useState, useEffect, useCallback } from "react";
import { motion } from "framer-motion";
import ServiceRequestsTable from "../pages/ServiceRequestsTable";
import SalesTable from "../pages/SalesTable";
import AdminProjectsTable from "../pages/AdminProjectsTable";
import ProjectFormModal from "./ProjectFormModal";
import API_BASE from "../config";

const AdminDashboard = () => {
  const [requests, setRequests] = useState([]);
  const [sales, setSales] = useState([]);
  const [projects, setProjects] = useState([]);
  const [filteredProjects, setFilteredProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  const [searchReq, setSearchReq] = useState("");
  const [searchSales, setSearchSales] = useState("");
  const [searchProj, setSearchProj] = useState("");

  const [modalOpen, setModalOpen] = useState(false);
  const [editingProject, setEditingProject] = useState(null);
  const [categoryFilter, setCategoryFilter] = useState("");

  // ------------------- Fetch Data -------------------
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [reqRes, salesRes, projRes] = await Promise.all([
          fetch(`${API_BASE}/requests`),
          fetch(`${API_BASE}/sales`),
          fetch(`${API_BASE}/projects`),
        ]);

        const reqData = await reqRes.json();
        const salesData = await salesRes.json();
        const projData = await projRes.json();

        setRequests(reqData);
        setSales(salesData);
        setProjects(projData);
        setFilteredProjects(projData);
      } catch (err) {
        console.error("Error fetching data:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // ------------------- Handlers -------------------
  const handleDeleteRequest = async (id) => {
    const res = await fetch(`${API_BASE}/requests/${id}`, { method: "DELETE" });
    if (res.ok) {
      setRequests((prev) => prev.filter((r) => r._id !== id));
    }
  };

  const handleDeleteSale = async (id) => {
    const res = await fetch(`${API_BASE}/sales/${id}`, { method: "DELETE" });
    if (res.ok) {
      setSales((prev) => prev.filter((s) => s._id !== id));
    }
  };

  const handleEditProject = (project) => {
    setEditingProject(project);
    setModalOpen(true);
  };

  const handleDeleteProject = async (id) => {
    if (!window.confirm("Are you sure you want to delete this project?")) return;

    const res = await fetch(`${API_BASE}/projects/${id}`, { method: "DELETE" });
    if (res.ok) {
      setProjects((prev) => prev.filter((p) => p._id !== id));
    }
  };

  const handleSaveProject = async (projData) => {
    const res = await fetch(
      editingProject
        ? `${API_BASE}/projects/${editingProject._id}`
        : `${API_BASE}/projects`,
      {
        method: editingProject ? "PUT" : "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(projData),
      }
    );

    const saved = await res.json();

    setProjects((prev) =>
      editingProject
        ? prev.map((p) => (p._id === saved._id ? saved : p))
        : [saved, ...prev]
    );

    setModalOpen(false);
    setEditingProject(null);
  };

  // ------------------- Filters -------------------
  const applyFilters = useCallback(() => {
    let data = [...projects];

    if (searchProj) {
      data = data.filter((p) =>
        JSON.stringify(p).toLowerCase().includes(searchProj.toLowerCase())
      );
    }

    if (categoryFilter) {
      data = data.filter((p) => p.category === categoryFilter);
    }

    setFilteredProjects(data);
  }, [projects, searchProj, categoryFilter]);

  useEffect(() => {
    applyFilters();
  }, [applyFilters]);

  const allCategories = [
    ...new Set(projects.map((p) => p.category).filter(Boolean)),
  ];

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ repeat: Infinity, duration: 1.2 }}
          className="w-10 h-10 border-4 border-blue-500 border-t-transparent rounded-full"
        />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="sticky top-0 bg-white shadow p-4 z-50">
        <h1 className="text-2xl font-bold">Admin Dashboard</h1>
      </div>

      <div className="p-6 max-w-7xl mx-auto space-y-10">
        {/* Service Requests */}
        <div>
          <input
            value={searchReq}
            onChange={(e) => setSearchReq(e.target.value)}
            placeholder="Search service requests..."
            className="mb-3 px-4 py-2 border rounded w-full md:w-1/3"
          />
          <ServiceRequestsTable
            requests={requests.filter((r) =>
              JSON.stringify(r)
                .toLowerCase()
                .includes(searchReq.toLowerCase())
            )}
            onDelete={handleDeleteRequest}
          />
        </div>

        {/* Sales */}
        <div>
          <input
            value={searchSales}
            onChange={(e) => setSearchSales(e.target.value)}
            placeholder="Search sales..."
            className="mb-3 px-4 py-2 border rounded w-full md:w-1/3"
          />
          <SalesTable
            sales={sales.filter((s) =>
              JSON.stringify(s)
                .toLowerCase()
                .includes(searchSales.toLowerCase())
            )}
            onDelete={handleDeleteSale}
          />
        </div>

        {/* Projects */}
        <div>
          <div className="flex gap-3 mb-3">
            <input
              value={searchProj}
              onChange={(e) => setSearchProj(e.target.value)}
              placeholder="Search projects..."
              className="px-4 py-2 border rounded w-full md:w-1/3"
            />
            <button
              onClick={() => {
                setEditingProject(null);
                setModalOpen(true);
              }}
              className="px-4 py-2 bg-green-600 text-white rounded"
            >
              + Add Project
            </button>
          </div>

          <AdminProjectsTable
            projects={filteredProjects}
            onEdit={handleEditProject}
            onDelete={handleDeleteProject}
            onCategoryFilter={setCategoryFilter}
          />
        </div>
      </div>

      <ProjectFormModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        onSave={handleSaveProject}
        project={editingProject}
        allCategories={allCategories}
      />
    </div>
  );
};

export default AdminDashboard;
