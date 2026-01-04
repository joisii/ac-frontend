// src/pages/training/Service.js
import React, { useEffect, useRef, useState, useCallback } from "react";
import { motion } from "framer-motion";
import * as pdfjsLib from "pdfjs-dist/legacy/build/pdf";
import "pdfjs-dist/build/pdf.worker.min.js";
import API_BASE from "../../config"; // ✅ use config for production/local

// PDF Worker
pdfjsLib.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjsLib.version}/pdf.worker.min.js`;

function Service() {
  // -------------------------------------
  // 🔗 Backend Fetch States
  // -------------------------------------
  const [clients, setClients] = useState([]); // fetch clients dynamically

  // -------------------------------------
  // 🎞️ PDF SYSTEM
  // -------------------------------------
  const pdfJsonPath = `${API_BASE}/admin/get-pdf/service`; // JSON route
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
          if (entry.isIntersecting) {
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
        }
      },
      { rootMargin: "400px 0px", threshold: 0.1 }
    );
  }, [renderPage]);

  // -------------------------------------
  // Fetch clients from backend
  // -------------------------------------
  useEffect(() => {
    const fetchClients = async () => {
      try {
        const res = await fetch(`${API_BASE}/admin/service`);
        const data = await res.json();
        setClients(data || []);
      } catch (err) {
        console.error("Fetching Clients Failed ➜", err);
      }
    };
    fetchClients();
  }, []);

  // -------------------------------------
  // Load PDF dynamically from backend
  // -------------------------------------
  useEffect(() => {
    let active = true;

    const loadPDF = async () => {
      setLoading(true);
      try {
        const res = await fetch(pdfJsonPath);
        const data = await res.json();
        if (!data.pdfUrl) throw new Error("PDF URL missing");

        const fullPdfUrl = `${API_BASE}${data.pdfUrl}`;
        const pdf = await pdfjsLib.getDocument(fullPdfUrl).promise;
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
        console.error(err);
        setError("Unable to load PDF.");
      } finally {
        setLoading(false);
      }
    };

    loadPDF();
    return () => {
      active = false;
      observerRef.current?.disconnect();
    };
  }, [pdfJsonPath, setupObserver]);

  // -------------------------------------
  // ✨ Page UI
  // -------------------------------------
  const fadeUp = { hidden: { opacity: 0, y: 50 }, visible: { opacity: 1, y: 0, transition: { duration: 0.6 } } };

  return (
    <div className="bg-white p-6 rounded-2xl shadow-lg">
      {/* Header */}
      <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
        <h5 className="text-2xl font-bold text-yellow-700 mb-4">
          Service Training – Detailed Syllabus
        </h5>
        <p className="text-gray-700 mb-4 leading-relaxed">
          At <span className="font-semibold text-yellow-600">GVJ</span>, our service training program prepares HVAC professionals for real-world troubleshooting, repairing, and maintenance.
        </p>
        <p className="text-gray-700 mb-6 leading-relaxed">
          Understanding components, electrical controls, preventive maintenance, and fault analysis—this syllabus builds industry-grade service experts.
        </p>
      </motion.div>

      {/* PDF Viewer */}
      <motion.div className="mb-12" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
        <h5 className="text-lg font-bold text-yellow-700 mb-4 text-center">
          Service Evaluation Sheet
        </h5>
        <div className="w-full h-[600px] md:h-[800px] overflow-auto border border-gray-300 rounded-lg shadow-lg p-4">
          {loading && <div className="text-center py-4 text-gray-600">Loading document…</div>}
          {error && <div className="text-center py-4 text-red-600">{error}</div>}
          <div ref={containerRef} className="w-full" />
        </div>
      </motion.div>

      {/* Companies Worked With */}
      <motion.div className="mt-12" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
        <h4 className="text-2xl md:text-3xl font-bold text-center text-yellow-700 mb-8 drop-shadow">
          Companies We’ve Worked With
        </h4>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6 place-items-center">
          {clients.length > 0 ? clients.map((client) => (
            <motion.div key={client._id} className="flex flex-col items-center w-36 h-36 md:w-40 md:h-40 bg-white p-4 rounded-2xl shadow hover:shadow-2xl transition group" whileHover={{ scale: 1.1, boxShadow: "0px 20px 30px rgba(0,0,0,0.25)" }}>
              <div className="flex-grow flex items-center justify-center">
                <img src={`${API_BASE}${client.logo}`} alt={client.name} className="max-h-14 md:max-h-16 max-w-[120px] object-contain group-hover:scale-110 transition-transform duration-300" />
              </div>
              <p className="mt-2 text-xs md:text-sm text-center text-gray-700 font-medium">{client.name}</p>
            </motion.div>
          )) : (
            <p className="text-gray-500 col-span-full text-center">No client data available</p>
          )}
        </div>
      </motion.div>
    </div>
  );
}

export default Service;
