// src/pages/training/Service.js
import React, { useEffect, useRef, useState, useCallback } from "react";
import { motion } from "framer-motion";
import * as pdfjsLib from "pdfjs-dist/legacy/build/pdf";
import "pdfjs-dist/build/pdf.worker.min.js";

// PDF Worker
pdfjsLib.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjsLib.version}/pdf.worker.min.js`;

function Service() {
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
  ];

  const fadeUp = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  };

  const scaleHover = {
    whileHover: { scale: 1.03, boxShadow: "0px 15px 25px rgba(0,0,0,0.2)" },
  };

  // === PDF View State ===
  const pdfPath = "/assets/Service Evaluation Sheet.pdf";
  const containerRef = useRef(null);
  const pageRefs = useRef([]);
  const pdfDocRef = useRef(null);
  const observerRef = useRef(null);
  const [loading, setLoading] = useState(true);

  // === Rendering PDF Pages (Lazy) ===
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

  // === Intersection Observer for lazy-loading ===
  const setupObserver = useCallback((pdf) => {
    observerRef.current = new IntersectionObserver(
      async (entries) => {
        const containerWidth = containerRef.current?.clientWidth || 800;

        for (const entry of entries) {
          if (entry.isIntersecting) {
            const placeholder = entry.target;
            const pageNumber = Number(placeholder.dataset.page);

            if (placeholder.dataset.rendered === "1") {
              observerRef.current.unobserve(placeholder);
              continue;
            }

            const canvas = await renderPage(pdf, pageNumber, containerWidth);
            placeholder.replaceWith(canvas);
            placeholder.dataset.rendered = "1";

            observerRef.current.unobserve(placeholder);
          }
        }
      },
      { rootMargin: "400px 0px", threshold: 0.1 }
    );
  }, [renderPage]);

  // === Load PDF ===
  useEffect(() => {
    const load = async () => {
      setLoading(true);

      const pdf = await pdfjsLib.getDocument(pdfPath).promise;
      pdfDocRef.current = pdf;

      const container = containerRef.current;
      container.innerHTML = "";
      pageRefs.current = [];

      for (let i = 1; i <= pdf.numPages; i++) {
        const ph = document.createElement("div");
        ph.dataset.page = i;
        ph.dataset.rendered = "0";
        ph.className = "w-full flex items-center justify-center py-6";
        ph.innerHTML = `<div class="w-[90%] md:w-[800px] h-[400px] md:h-[1100px] bg-gray-100 rounded-lg border border-gray-200 flex items-center justify-center text-gray-400">Loading page ${i}…</div>`;

        container.appendChild(ph);
        pageRefs.current.push(ph);
      }

      setupObserver(pdf);
      pageRefs.current.forEach((ph) => observerRef.current.observe(ph));

      setLoading(false);
    };

    load();

    return () => observerRef.current?.disconnect();
  }, [pdfPath, setupObserver]);

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
      <motion.div className="mb-12" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} {...scaleHover}>
        <h5 className="text-lg font-bold text-yellow-700 mb-4 text-center">
          Service Evaluation Sheet
        </h5>

        <div className="w-full h-[600px] md:h-[800px] overflow-auto border border-gray-300 rounded-lg shadow-lg p-4">
          {loading && (
            <div className="text-center py-4 text-gray-600">
              Loading document…
            </div>
          )}

          <div ref={containerRef} className="w-full" />
        </div>
      </motion.div>

      {/* Companies Worked With */}
      <motion.div className="mt-12" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
        <h4 className="text-2xl md:text-3xl font-bold text-center text-yellow-700 mb-8 drop-shadow">
          Companies We’ve Worked With
        </h4>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6 place-items-center">
          {clients.map((client, index) => (
            <motion.div key={index} className="flex flex-col items-center w-36 h-36 md:w-40 md:h-40 bg-white p-4 rounded-2xl shadow hover:shadow-2xl transition group" whileHover={{ scale: 1.1, boxShadow: "0px 20px 30px rgba(0,0,0,0.25)" }}>
              <div className="flex-grow flex items-center justify-center">
                <img src={client.logo} alt={client.name} className="max-h-14 md:max-h-16 max-w-[120px] object-contain group-hover:scale-110 transition-transform duration-300" />
              </div>
              <p className="mt-2 text-xs md:text-sm text-center text-gray-700 font-medium">
                {client.name}
              </p>
            </motion.div>
          ))}
        </div>
      </motion.div>

    </div>
  );
}

export default Service;
