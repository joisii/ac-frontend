// src/pages/training/Project.js
import React, { useEffect, useRef, useState, useCallback } from "react";
import { motion } from "framer-motion";
import * as pdfjsLib from "pdfjs-dist/legacy/build/pdf"; // legacy build is more compatible
import "pdfjs-dist/build/pdf.worker.min.js";

pdfjsLib.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjsLib.version}/pdf.worker.min.js`;

function Project() {
  // --- Data (unchanged) ---
  const warrantyCustomers = [
    { sno: 1, client: "Deepam Eye Hospital" },
    { sno: 2, client: "Dynamic Advertisements" },
    { sno: 3, client: "Fresh 2 Day" },
    { sno: 4, client: "Soorya Hospital" },
    { sno: 5, client: "Fathima Jewellers" },
    { sno: 6, client: "Gateway International School" },
    { sno: 7, client: "Sudha Timber" },
    { sno: 8, client: "Kuralarasan Residence" },
    { sno: 9, client: "LKS Gold House" },
    { sno: 10, client: "Sree Gupta Bhavan" },
    { sno: 11, client: "Innovent Spaces Ltd" },
    { sno: 12, client: "Dahnay Logistics" },
    { sno: 13, client: "Selfie Attire" },
    { sno: 14, client: "Clover Appasamy Apartments" },
  ];

  const amcCustomers = [
    { sno: 1, client: "M.C.T.M. CHIDAMBARAM " },
    { sno: 2, client: "EMPIRE  AUTOS" },
    { sno: 3, client: "Roche Products" },
    { sno: 4, client: "Sai Kirit Jewellers" },
    { sno: 5, client: "Ashok Matches And Timber Industries Priv" },
    { sno: 6, client: "Manna Prayer House Trust " },
    { sno: 7, client: "Shri Vaari Electricals Pvt Ltd" },
    { sno: 8, client: "Sri Lakshmi Jewellers" },
    { sno: 9, client: "Shree Agarwal Sabha" },
    { sno: 10, client: "TEST YANTRA (Q Spider )" },
    { sno: 11, client: "Art Glass Edge" },
    { sno: 12, client: "Esskay Design and Structures Private Limited" },
    { sno: 13, client: "TSS Marriage Hall" },
    { sno: 14, client: "DART GLOBAL LOGISTICS PVT LTD" },
    { sno: 15, client: "ASTORIA VEG RESTAURANT" },
    { sno: 16, client: "RVM Motors" },
    { sno: 17, client: "Jaya Residency" },
    { sno: 18, client: "Dover India Pvt Ltd" },
    { sno: 19, client: "Slam Fitness Studio" },
    { sno: 20, client: "Indiqube Viceroy" },
    { sno: 21, client: "Dahnay Logistics Pvt Ltd" },
    { sno: 22, client: "Uniworld Logistics" },
    { sno: 23, client: "Vista Hall (Velachery Banq Hall)" },
    { sno: 24, client: "Mahalakshmi Jewellers" },
    { sno: 25, client: "Spaces-R K Studio" },
  ];

  const clients = [
    { name: "IndiQube Limited", logo: "/assets/indie.jpeg" },
    { name: "Sree Gupta Bhavan", logo: "/assets/srb.png" },
    { name: "Esskay Design Structures Private", logo: "/assets/Esskey.jpeg" },
    { name: "BELRISE INDUSTRIES LTD", logo: "/assets/Belrise.jpeg" },
    { name: "Southern Chemical India Private Limited", logo: "/assets/southern chemical.jpeg" },
    { name: "LKS Gold House", logo: "/assets/Lks.png" },
    { name: "DART GLOBAL LOGISTICS PVT LTD", logo: "/assets/dart.jpeg" },
    { name: "Deepam Eye Hospital", logo: "/assets/Deepam.png" },
    { name: "FATHIMA JEWELLERS", logo: "/assets/fathima.jpeg" },
    { name: "Qspiders", logo: "/assets/qspiders.png" },
    { name: "Jaya SuperMarket", logo: "/assets/jaya.png" },
    { name: "APR SuperMarket", logo: "/assets/apr.webp" },
    { name: "SriKrishna Sweets ", logo: "/assets/sri.webp" },
    { name: "Fair Lady Designer Pvt Ltd (Aachi Masala)", logo: "/assets/aachi.jpg" },
    { name: "Ashok Jewellers", logo: "/assets/ashok.jpg" },
    { name: "Mahalakshmi Jewellers", logo: "/assets/maha.jpg" },
    { name: "Sri Lakshmi Jewellery", logo: "/assets/sril.jpg" },
    { name: "Uniworld Logistics ", logo: "/assets/uni.png" },
    { name: "M/s. Dover India Pvt Ltd", logo: "/assets/dover.jpg" },
    { name: "AMIT - Tamarai tech park", logo: "/assets/lotus.jpg" },
    { name: "Karur Visa Bank", logo: "/assets/karur.jpg" },
    { name: "BADVE Engineering  Pvt Ltd", logo: "/assets/badve.jpg" },
    { name: "Indian Concreate Institute", logo: "/assets/icl.jpg" },
    { name: "Traecit Business Consultants", logo: "/assets/tra.jpg" },
    { name: "Jalpaan Restaurant", logo: "/assets/jal.jpg" },
    { name: "Astoria Restaurant", logo: "/assets/as.png" },
    { name: "'Sooriya Hospital", logo: "/assets/soo.jpg" },
    { name: "'VS Hospital", logo: "/assets/vs.jpg" },
    { name: "JAIGOPAL GARODDIA Matriculation H.S.S", logo: "/assets/jai.jpg" },
    { name: "M C T M School", logo: "/assets/mc.jpg" },
    { name: "Sky Motors (Gym)", logo: "/assets/gy.png" },
    { name: "Slam Fitness", logo: "/assets/slam.png" },
    { name: "Angel TV", logo: "/assets/angel.jpg" },
    { name: "ECI – Thirumangalam", logo: "/assets/ec.jpg" },
    { name: "Healing Gospel Church (HGC)", logo: "/assets/hgc.jpg" },
  ];

  // --- Animations ---
  const fadeUp = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  };
  const scaleHover = {
    whileHover: { scale: 1.03, boxShadow: "0px 15px 25px rgba(0,0,0,0.2)" },
  };

  // --- PDF viewer state & refs ---
  const pdfPath = "/assets/Project Evaluation Sheet.pdf";
  const containerRef = useRef(null);
  const pageRefs = useRef([]); // array of placeholders
  const pdfDocRef = useRef(null);
  const observerRef = useRef(null);
  const [numPages, setNumPages] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Create placeholder elements for each page
  useEffect(() => {
    pageRefs.current = [];
  }, [numPages]);

  // Render single page into a high-DPI canvas
  const renderPage = useCallback(async (pdf, pageNumber, targetWidth) => {
    const page = await pdf.getPage(pageNumber);
    const viewport = page.getViewport({ scale: 1 });

    // device pixel ratio multiplier for sharpness (2 gives crisp text)
    const DPR = Math.max(window.devicePixelRatio || 1, 1) * 1.5; // tweakable multiplier
    const scale = (targetWidth / viewport.width) * DPR;
    const scaledViewport = page.getViewport({ scale });

    const canvas = document.createElement("canvas");
    canvas.setAttribute("data-pdf-page", String(pageNumber));
    canvas.width = Math.round(scaledViewport.width);
    canvas.height = Math.round(scaledViewport.height);
    canvas.style.width = `${Math.round(scaledViewport.width / DPR)}px`;
    canvas.style.height = `${Math.round(scaledViewport.height / DPR)}px`;
    canvas.className = "mx-auto my-4 rounded-lg shadow";

    const ctx = canvas.getContext("2d");
    // improve text smoothing
    ctx.imageSmoothingEnabled = true;
    ctx.imageSmoothingQuality = "high";

    await page.render({ canvasContext: ctx, viewport: scaledViewport }).promise;
    return canvas;
  }, []);

  // Lazy-render when placeholder intersects viewport
  const setupIntersectionObserver = useCallback((pdf) => {
    if (observerRef.current) {
      observerRef.current.disconnect();
    }

    observerRef.current = new IntersectionObserver(
      async (entries) => {
        const container = containerRef.current;
        if (!container) return;
        const containerWidth = Math.min(container.clientWidth - 32, 1000);

        for (const entry of entries) {
          if (entry.isIntersecting) {
            const placeholder = entry.target;
            const pageNumber = Number(placeholder.getAttribute("data-page"));
            // avoid re-render if already rendered
            if (placeholder.getAttribute("data-rendered") === "1") {
              observerRef.current.unobserve(placeholder);
              continue;
            }
            try {
              const canvas = await renderPage(pdf, pageNumber, containerWidth);
              placeholder.replaceWith(canvas);
            } catch (err) {
              console.error("Render page error:", err);
              placeholder.textContent = "Failed to render page.";
            }
            placeholder.setAttribute("data-rendered", "1");
            observerRef.current.unobserve(placeholder);
          }
        }
      },
      {
        root: null,
        rootMargin: "400px 0px", // pre-load before user reaches the page
        threshold: 0.1,
      }
    );
  }, [renderPage]);

  // Load PDF and create placeholders
  useEffect(() => {
    let active = true;
    setLoading(true);
    setError(null);

    const load = async () => {
      try {
        const loadingTask = pdfjsLib.getDocument(pdfPath);
        const pdf = await loadingTask.promise;
        if (!active) return;
        pdfDocRef.current = pdf;
        setNumPages(pdf.numPages);

        const container = containerRef.current;
        if (!container) return;
        container.innerHTML = "";

        // create placeholders and observe them
        for (let i = 1; i <= pdf.numPages; i++) {
          const placeholder = document.createElement("div");
          placeholder.setAttribute("data-page", String(i));
          placeholder.setAttribute("data-rendered", "0");
          placeholder.className = "w-full flex items-center justify-center py-6";
          // small visible skeleton box matching approx aspect ratio
          placeholder.innerHTML = `<div class="w-[90%] md:w-[800px] h-[400px] md:h-[1100px] bg-gray-100 rounded-lg border border-gray-200 flex items-center justify-center text-gray-400">Loading page ${i}…</div>`;
          container.appendChild(placeholder);
          pageRefs.current.push(placeholder);
        }

        setupIntersectionObserver(pdf);
        // Observe placeholders
        pageRefs.current.forEach((ph) => {
          if (observerRef.current) observerRef.current.observe(ph);
        });
      } catch (err) {
        console.error(err);
        if (!active) return;
        setError("Unable to load document.");
      } finally {
        if (!active) return;
        setLoading(false);
      }
    };

    load();

    // Re-render canvases on resize: clear canvases and recreate placeholders then lazy load again.
    let resizeTimeout = null;
    const onResize = () => {
      clearTimeout(resizeTimeout);
      resizeTimeout = setTimeout(() => {
        const pdf = pdfDocRef.current;
        if (!pdf) return;
        // remove any existing canvases/placeholders and re-setup
        const container = containerRef.current;
        if (!container) return;
        container.innerHTML = "";
        pageRefs.current = [];
        for (let i = 1; i <= pdf.numPages; i++) {
          const placeholder = document.createElement("div");
          placeholder.setAttribute("data-page", String(i));
          placeholder.setAttribute("data-rendered", "0");
          placeholder.className = "w-full flex items-center justify-center py-6";
          placeholder.innerHTML = `<div class="w-[90%] md:w-[800px] h-[400px] md:h-[1100px] bg-gray-100 rounded-lg border border-gray-200 flex items-center justify-center text-gray-400">Loading page ${i}…</div>`;
          container.appendChild(placeholder);
          pageRefs.current.push(placeholder);
        }
        setupIntersectionObserver(pdf);
        pageRefs.current.forEach((ph) => {
          if (observerRef.current) observerRef.current.observe(ph);
        });
      }, 300);
    };
    window.addEventListener("resize", onResize);

    return () => {
      active = false;
      window.removeEventListener("resize", onResize);
      if (observerRef.current) {
        observerRef.current.disconnect();
        observerRef.current = null;
      }
    };
  }, [pdfPath, renderPage, setupIntersectionObserver]);

  // --- UI ---
  return (
    <div className="bg-white p-6 rounded-2xl shadow-lg">
      {/* Header */}
      <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
        <h5 className="text-2xl font-bold text-blue-700 mb-4">
          Project Training – Detailed Syllabus
        </h5>
        <p className="text-gray-700 mb-4 leading-relaxed">
          At <span className="font-semibold text-blue-600">GVJ</span>, project
          training isn’t just about theory—it’s a step-by-step journey into the
          real world of <span className="font-semibold">HVAC systems</span>.
        </p>
        <p className="text-gray-700 mb-6 leading-relaxed">
          This curriculum covers <span className="font-medium">system design</span>,{" "}
          <span className="font-medium">installation practices</span> and{" "}
          <span className="font-medium">troubleshooting</span> through practical projects.
        </p>
      </motion.div>

      {/* PDF Viewer (lazy + high-quality) */}
      <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} className="mb-12" {...scaleHover}>
        <h5 className="text-lg font-bold text-blue-700 mb-4 text-center">
          Project Evaluation Sheet
        </h5>

        <div className="w-full h-[600px] md:h-[800px] overflow-auto border border-gray-300 rounded-lg shadow-lg p-4" role="region" aria-label="Project evaluation PDF (view only)">
          {loading && (
            <div className="flex items-center justify-center h-full">
              <div className="text-gray-600">Loading document…</div>
            </div>
          )}

          {error && (
            <div className="text-center py-6 text-red-600">{error}</div>
          )}

          {/* pages will be appended here as canvases */}
          <div ref={containerRef} className="w-full" />

        </div>
      </motion.div>

      {/* Warranty & AMC Customer Tables */}
      <div className="grid md:grid-cols-2 gap-8 mb-12">
        {/* Warranty Customers */}
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} {...scaleHover} className="max-w-md">
          <h5 className="text-lg font-bold text-blue-700 mb-4">Partial List of Warranty Customers</h5>
          <div className="max-h-64 overflow-y-auto border border-gray-300 rounded-lg shadow">
            <table className="w-full">
              <thead className="bg-blue-600 text-white sticky top-0">
                <tr>
                  <th className="px-4 py-3 text-left">S.No</th>
                  <th className="px-4 py-3 text-left">Client Name</th>
                </tr>
              </thead>
              <tbody>
                {warrantyCustomers.map((row, i) => (
                  <tr key={i} className={i % 2 === 0 ? "bg-gray-50" : "bg-white"}>
                    <td className="px-4 py-2 border-b">{row.sno}</td>
                    <td className="px-4 py-2 border-b">{row.client}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </motion.div>

        {/* AMC Customers */}
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} {...scaleHover} className="max-w-md">
          <h5 className="text-lg font-bold text-blue-700 mb-4">Partial List of AMC Customers</h5>
          <div className="max-h-64 overflow-y-auto border border-gray-300 rounded-lg shadow">
            <table className="w-full">
              <thead className="bg-blue-600 text-white sticky top-0">
                <tr>
                  <th className="px-4 py-3 text-left">S.No</th>
                  <th className="px-4 py-3 text-left">Client Name</th>
                </tr>
              </thead>
              <tbody>
                {amcCustomers.map((row, i) => (
                  <tr key={i} className={i % 2 === 0 ? "bg-gray-50" : "bg-white"}>
                    <td className="px-4 py-2 border-b">{row.sno}</td>
                    <td className="px-4 py-2 border-b">{row.client}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </motion.div>
      </div>

      {/* Companies */}
      <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
        <h4 className="text-2xl md:text-3xl font-bold text-center text-blue-800 mb-8 drop-shadow">Companies We’ve Worked With</h4>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6 place-items-center">
          {clients.map((client, index) => (
            <motion.div key={index} className="flex flex-col items-center w-36 h-36 md:w-40 md:h-40 bg-white p-4 rounded-2xl shadow hover:shadow-2xl transition group" whileHover={{ scale: 1.1, boxShadow: "0px 20px 30px rgba(0,0,0,0.25)" }}>
              <div className="flex-grow flex items-center justify-center">
                <img src={client.logo} alt={client.name} className="max-h-14 md:max-h-16 max-w-[120px] object-contain group-hover:scale-110 transition-transform duration-300" />
              </div>
              <p className="mt-2 text-xs md:text-sm text-center text-gray-700 font-medium">{client.name}</p>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}

export default Project;
