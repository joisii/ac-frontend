import React, { useEffect, useRef, useState, useCallback } from "react";
import { motion } from "framer-motion";
import * as pdfjsLib from "pdfjs-dist/legacy/build/pdf";
import "pdfjs-dist/build/pdf.worker.min.js";
import API_BASE from "../../config"; // ✅ use config for production/local

// PDF.js worker
pdfjsLib.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjsLib.version}/pdf.worker.min.js`;

function Project() {
  // -------------------------------------
  // 🔗 Backend Fetch States
  // -------------------------------------
  const [warrantyCustomers, setWarranty] = useState([]);
  const [amcCustomers, setAmc] = useState([]);
  const [pdfPath, setPdfPath] = useState("");
  const [clients, setClients] = useState([]);

  // -------------------------------------
  // 🎞️ PDF SYSTEM
  // -------------------------------------
  const containerRef = useRef(null);
  const pageRefs = useRef([]);
  const pdfDocRef = useRef(null);
  const observerRef = useRef(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const renderPage = useCallback(async (pdf, pageNumber, targetWidth) => {
    const page = await pdf.getPage(pageNumber);
    const viewport = page.getViewport({ scale: 1 });
    const DPR = (window.devicePixelRatio || 1) * 1.5;
    const scale = (targetWidth / viewport.width) * DPR;
    const scaledViewport = page.getViewport({ scale });

    const canvas = document.createElement("canvas");
    canvas.width = scaledViewport.width;
    canvas.height = scaledViewport.height;
    canvas.style.width = `${scaledViewport.width / DPR}px`;
    canvas.style.height = `${scaledViewport.height / DPR}px`;
    canvas.className = "mx-auto my-4 rounded-lg shadow";

    const ctx = canvas.getContext("2d");
    ctx.imageSmoothingEnabled = true;
    ctx.imageSmoothingQuality = "high";
    await page.render({ canvasContext: ctx, viewport: scaledViewport }).promise;
    return canvas;
  }, []);

  const setupObserver = useCallback(() => {
    if (observerRef.current) observerRef.current.disconnect();
    observerRef.current = new IntersectionObserver(
      async (entries) => {
        const containerWidth = containerRef.current?.clientWidth || 800;
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;

          const ph = entry.target;
          const pageNumber = Number(ph.dataset.page);
          if (ph.dataset.rendered === "1") {
            observerRef.current.unobserve(ph);
            continue;
          }

          try {
            const canvas = await renderPage(pdfDocRef.current, pageNumber, containerWidth);
            ph.replaceWith(canvas);
          } catch {
            ph.textContent = "Failed to load page.";
          }
          ph.dataset.rendered = "1";
          observerRef.current.unobserve(ph);
        }
      },
      { rootMargin: "400px 0px", threshold: 0.1 }
    );
  }, [renderPage]);

  // -------------------------------------
  // Load PDF dynamically from backend
  // -------------------------------------
  useEffect(() => {
    const fetchPdfPath = async () => {
      try {
        const res = await fetch(`${API_BASE}/admin//get-pdf/project`);
        const data = await res.json();
        if (!res.ok) throw new Error(data.message);
        setPdfPath(`${API_BASE}${data.pdfUrl}`);
      } catch (err) {
        console.error("Failed to fetch Project PDF:", err);
        setError("Unable to load PDF");
      }
    };
    fetchPdfPath();
  }, []);

  useEffect(() => {
    if (!pdfPath) return;

    let active = true;
    const loadPDF = async () => {
      setLoading(true);
      try {
        const pdf = await pdfjsLib.getDocument(pdfPath).promise;
        if (!active) return;
        pdfDocRef.current = pdf;

        const container = containerRef.current;
        container.innerHTML = "";
        pageRefs.current = [];

        for (let i = 1; i <= pdf.numPages; i++) {
          const ph = document.createElement("div");
          ph.dataset.page = i;
          ph.dataset.rendered = "0";
          ph.className = "w-full flex justify-center py-6";
          ph.innerHTML = `<div class="w-[90%] md:w-[800px] h-[400px] md:h-[1100px] bg-gray-100 border rounded-lg flex items-center justify-center text-gray-400">Loading page ${i}…</div>`;
          container.appendChild(ph);
          pageRefs.current.push(ph);
        }

        setupObserver();
        pageRefs.current.forEach((ph) => observerRef.current.observe(ph));
      } catch (err) {
        if (active) setError("Unable to load PDF.");
        console.error(err);
      } finally {
        if (active) setLoading(false);
      }
    };
    loadPDF();
    return () => {
      active = false;
      observerRef.current?.disconnect();
    };
  }, [pdfPath, setupObserver]);

  // -------------------------------------
  // Fetch Customers + Clients
  // -------------------------------------
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [custRes, clientRes] = await Promise.all([
          fetch(`${API_BASE}/customers`),
          fetch(`${API_BASE}/api/clients`),
        ]);

        const custData = await custRes.json();
        setWarranty(custData?.warranty || []);
        setAmc(custData?.amc || []);

        const clientData = await clientRes.json();
        setClients(clientData || []);
      } catch (err) {
        console.error("Failed to fetch data:", err);
      }
    };
    fetchData();
  }, []);

  // -------------------------------------
  // ✨ Page UI
  // -------------------------------------
  const fadeUp = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  };

  return (
    <div className="bg-white p-6 rounded-2xl shadow-lg">
      {/* Header */}
      <motion.div initial="hidden" whileInView="visible" variants={fadeUp}>
        <h5 className="text-2xl font-bold text-blue-700 mb-4">
          Project Training – Detailed Syllabus
        </h5>
        <p className="text-gray-700 mb-4">
          At <b className="text-blue-600">GVJ</b>, training means stepping into the real HVAC world.
        </p>
      </motion.div>

      {/* PDF Viewer */}
      <div className="mb-12">
        <h5 className="text-center text-lg font-bold text-blue-700 mb-4">
          Project Evaluation Sheet
        </h5>
        <div className="w-full h-[600px] overflow-auto border rounded-lg shadow-lg p-4">
          {loading && (
            <div className="text-center text-gray-600 h-full flex items-center justify-center">
              Loading document…
            </div>
          )}
          {error && <div className="text-center text-red-600 py-6">{error}</div>}
          <div ref={containerRef} className="w-full" />
        </div>
      </div>

      {/* Warranty + AMC Tables */}
      <div className="grid md:grid-cols-2 gap-8 mb-12">
        {/* Warranty */}
        <div>
          <h5 className="text-lg font-bold text-blue-700 mb-4">
            Partial List of Warranty Customers
          </h5>
          <div className="max-h-64 overflow-y-auto border rounded-lg shadow">
            <table className="w-full">
              <thead className="bg-blue-600 text-white sticky top-0">
                <tr>
                  <th className="px-4 py-3">S.No</th>
                  <th className="px-4 py-3">Client Name</th>
                </tr>
              </thead>
              <tbody>
                {warrantyCustomers.length > 0 ? (
                  warrantyCustomers.map((row, i) => (
                    <tr key={i} className={i % 2 ? "bg-gray-50" : "bg-white"}>
                      <td className="px-4 py-2 border-b">{row.sno}</td>
                      <td className="px-4 py-2 border-b">{row.client}</td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="2" className="text-center py-3 text-gray-500">
                      No data available
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* AMC */}
        <div>
          <h5 className="text-lg font-bold text-blue-700 mb-4">
            Partial List of AMC Customers
          </h5>
          <div className="max-h-64 overflow-y-auto border rounded-lg shadow">
            <table className="w-full">
              <thead className="bg-blue-600 text-white sticky top-0">
                <tr>
                  <th className="px-4 py-3">S.No</th>
                  <th className="px-4 py-3">Client Name</th>
                </tr>
              </thead>
              <tbody>
                {amcCustomers.length > 0 ? (
                  amcCustomers.map((row, i) => (
                    <tr key={i} className={i % 2 ? "bg-gray-50" : "bg-white"}>
                      <td className="px-4 py-2 border-b">{row.sno}</td>
                      <td className="px-4 py-2 border-b">{row.client}</td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="2" className="text-center py-3 text-gray-500">
                      No data available
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Companies Worked With – CARDS */}
      <motion.div initial="hidden" whileInView="visible" variants={fadeUp}>
        <h4 className="text-3xl font-bold text-center text-blue-800 mb-10">
          Companies We’ve Worked With
        </h4>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
          {clients.length > 0 ? (
            clients.map((client) => (
              <motion.div
                key={client._id}
                whileHover={{ y: -6, scale: 1.03 }}
                className="bg-white border rounded-xl shadow-md p-4 flex flex-col items-center justify-center transition"
              >
                <div className="h-16 flex items-center justify-center mb-3">
                  <img
                    src={`${API_BASE}${client.logo}`}
                    alt={client.name}
                    className="max-h-14 object-contain"
                  />
                </div>
                <p className="text-sm font-medium text-gray-700 text-center">
                  {client.name}
                </p>
              </motion.div>
            ))
          ) : (
            <p className="text-gray-500 col-span-full text-center">
              No client data available
            </p>
          )}
        </div>
      </motion.div>
    </div>
  );
}

export default Project;
