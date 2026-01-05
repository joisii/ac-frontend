import React, { useState, useEffect, useCallback } from "react";
import { motion } from "framer-motion";
import ServiceRequestsTable from "../pages/ServiceRequestsTable";
import SalesTable from "../pages/SalesTable";
import AdminProjectsTable from "../pages/AdminProjectsTable";
import ProjectFormModal from "./ProjectFormModal";
import AdminAboutStats from "./AdminAboutStats";
import AdminCustomersManager from "./AdminCustomersManager";
import PdfManager from "../components/admin/PdfManager";
import AdminClientsManager from "../components/admin/AdminClientsManager";
import API_BASE from "../config";

/* ----------------------------------
   Animation presets (UI ONLY)
---------------------------------- */
const sectionFade = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: "easeOut" },
  },
};

const hoverCard = {
  whileHover: {
    y: -4,
    boxShadow: "0px 10px 25px rgba(0,0,0,0.12)",
    transition: { duration: 0.25 },
  },
};

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

  /* ---------------- FETCH DATA ---------------- */
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [reqRes, salesRes, projRes] = await Promise.all([
          fetch(`${API_BASE}/requests`),
          fetch(`${API_BASE}/sales`),
          fetch(`${API_BASE}/projects?admin=true`),
        ]);

        setRequests(await reqRes.json());
        setSales(await salesRes.json());
        const projData = await projRes.json();
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

  /* ---------------- HANDLERS ---------------- */
  const handleDeleteRequest = async (id) => {
    const res = await fetch(`${API_BASE}/requests/${id}`, { method: "DELETE" });
    if (res.ok) setRequests((prev) => prev.filter((r) => r._id !== id));
  };

  const handleDeleteSale = async (id) => {
    const res = await fetch(`${API_BASE}/sales/${id}`, { method: "DELETE" });
    if (res.ok) setSales((prev) => prev.filter((s) => s._id !== id));
  };

  const handleEditProject = (project) => {
    setEditingProject(project);
    setModalOpen(true);
  };

  const handleDeleteProject = async (id) => {
    if (!window.confirm("Are you sure you want to delete this project?")) return;
    const res = await fetch(`${API_BASE}/projects/${id}`, { method: "DELETE" });
    if (res.ok) setProjects((prev) => prev.filter((p) => p._id !== id));
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

  /* ---------------- FILTERS ---------------- */
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

  /* ---------------- LOADER ---------------- */
  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gray-50">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ repeat: Infinity, duration: 1.2 }}
          className="w-10 h-10 border-4 border-blue-500 border-t-transparent rounded-full"
        />
      </div>
    );
  }

  /* ---------------- UI ---------------- */
  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <div className="sticky top-0 bg-white shadow z-40">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <h1 className="text-2xl font-bold">Admin Dashboard</h1>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-6 space-y-12">

        {/* About Stats */}
        <motion.section
          variants={sectionFade}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          {...hoverCard}
          className="bg-white rounded-xl shadow p-4 sm:p-6"
        >
          <AdminAboutStats />
        </motion.section>

        <motion.section
          variants={sectionFade}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          {...hoverCard}
        >
          <AdminCustomersManager />
        </motion.section>

        <motion.section
          variants={sectionFade}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          {...hoverCard}
        >
          <PdfManager />
        </motion.section>

        <motion.section
          variants={sectionFade}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          {...hoverCard}
        >
          <AdminClientsManager />
        </motion.section>

        {/* Service Requests */}
        <motion.section
          variants={sectionFade}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          {...hoverCard}
          className="bg-white rounded-xl shadow p-4 sm:p-6"
        >
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-4">
            <h2 className="text-lg font-semibold">Service Requests</h2>
            <input
              value={searchReq}
              onChange={(e) => setSearchReq(e.target.value)}
              placeholder="Search service requests..."
              className="px-4 py-2 border rounded-lg w-full sm:w-72"
            />
          </div>

          <ServiceRequestsTable
            requests={requests.filter((r) =>
              JSON.stringify(r)
                .toLowerCase()
                .includes(searchReq.toLowerCase())
            )}
            onDelete={handleDeleteRequest}
          />
        </motion.section>

        {/* Sales */}
        <motion.section
          variants={sectionFade}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          {...hoverCard}
          className="bg-white rounded-xl shadow p-4 sm:p-6"
        >
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-4">
            <h2 className="text-lg font-semibold">Sales</h2>
            <input
              value={searchSales}
              onChange={(e) => setSearchSales(e.target.value)}
              placeholder="Search sales..."
              className="px-4 py-2 border rounded-lg w-full sm:w-72"
            />
          </div>

          <SalesTable
            sales={sales.filter((s) =>
              JSON.stringify(s)
                .toLowerCase()
                .includes(searchSales.toLowerCase())
            )}
            onDelete={handleDeleteSale}
          />
        </motion.section>

        {/* Projects */}
        <motion.section
          variants={sectionFade}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          {...hoverCard}
          className="bg-white rounded-xl shadow p-4 sm:p-6"
        >
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-4">
            <h2 className="text-lg font-semibold">Projects</h2>

            <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
              <input
                value={searchProj}
                onChange={(e) => setSearchProj(e.target.value)}
                placeholder="Search projects..."
                className="px-4 py-2 border rounded-lg w-full sm:w-72"
              />
              <button
                onClick={() => {
                  setEditingProject(null);
                  setModalOpen(true);
                }}
                className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
              >
                + Add Project
              </button>
            </div>
          </div>

          <AdminProjectsTable
            projects={filteredProjects}
            onEdit={handleEditProject}
            onDelete={handleDeleteProject}
            onCategoryFilter={setCategoryFilter}
          />
        </motion.section>
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
