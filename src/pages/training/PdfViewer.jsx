import { useEffect, useRef, useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import * as pdfjsLib from "pdfjs-dist/legacy/build/pdf";
import workerSrc from "pdfjs-dist/build/pdf.worker.min.js";

// -------------------------------------
// PDF.js worker setup
// -------------------------------------
pdfjsLib.GlobalWorkerOptions.workerSrc = workerSrc;

// -------------------------------------
// Skeleton page (MATCHES REAL PAGE SIZE)
// -------------------------------------
function PdfSkeletonPage({ index }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: index * 0.08 }}
      className="w-full flex justify-center mb-10"
    >
      <div className="w-full max-w-[1100px] h-[1400px] bg-gray-200 rounded-xl overflow-hidden relative shadow-md">
        {/* shimmer */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200"
          animate={{ x: ["-100%", "100%"] }}
          transition={{
            repeat: Infinity,
            duration: 1.2,
            ease: "linear",
          }}
        />
      </div>
    </motion.div>
  );
}

export default function PdfViewer({ pdfUrl, title }) {
  const containerRef = useRef(null);
  const pdfDocRef = useRef(null);
  const observerRef = useRef(null);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [pageCount, setPageCount] = useState(4);

  // -------------------------------------
  // Render a single PDF page (FULL WIDTH)
  // -------------------------------------
  const renderPage = useCallback(async (pdf, pageNumber, targetWidth) => {
    const page = await pdf.getPage(pageNumber);
    const viewport = page.getViewport({ scale: 1 });

    const DPR = window.devicePixelRatio || 1;
    const scale = (targetWidth / viewport.width) * DPR;
    const scaledViewport = page.getViewport({ scale });

    const canvas = document.createElement("canvas");
    canvas.width = scaledViewport.width;
    canvas.height = scaledViewport.height;
    canvas.style.width = `${scaledViewport.width / DPR}px`;
    canvas.style.height = `${scaledViewport.height / DPR}px`;

    canvas.className =
      "block mx-auto mb-10 bg-white rounded-xl shadow-lg border border-gray-300";

    const ctx = canvas.getContext("2d");
    ctx.imageSmoothingEnabled = true;
    ctx.imageSmoothingQuality = "high";

    await page.render({ canvasContext: ctx, viewport: scaledViewport }).promise;
    return canvas;
  }, []);

  // -------------------------------------
  // Intersection Observer (lazy load pages)
  // -------------------------------------
  const setupObserver = useCallback(() => {
    observerRef.current?.disconnect();

    observerRef.current = new IntersectionObserver(
      async (entries) => {
        const containerWidth =
          containerRef.current?.clientWidth || 1100;

        for (const entry of entries) {
          if (!entry.isIntersecting) continue;

          const ph = entry.target;
          const pageNumber = Number(ph.dataset.page);

          if (ph.dataset.rendered === "1") {
            observerRef.current.unobserve(ph);
            continue;
          }

          try {
            const canvas = await renderPage(
              pdfDocRef.current,
              pageNumber,
              containerWidth
            );
            ph.replaceWith(canvas);
          } catch {
            ph.textContent = "Failed to render page.";
          }

          ph.dataset.rendered = "1";
          observerRef.current.unobserve(ph);
        }
      },
      { rootMargin: "600px 0px", threshold: 0.1 }
    );
  }, [renderPage]);

  // -------------------------------------
  // Load PDF
  // -------------------------------------
  useEffect(() => {
    if (!pdfUrl) return;

    let active = true;

    const loadPDF = async () => {
      setLoading(true);
      setError(null);

      try {
        const pdf = await pdfjsLib.getDocument(pdfUrl).promise;
        if (!active) return;

        pdfDocRef.current = pdf;
        setPageCount(pdf.numPages);

        const container = containerRef.current;
        container.innerHTML = "";

        for (let i = 1; i <= pdf.numPages; i++) {
          const ph = document.createElement("div");
          ph.dataset.page = i;
          ph.dataset.rendered = "0";
          ph.className = "w-full flex justify-center mb-10";
          ph.innerHTML = `
            <div class="w-full max-w-[1100px] h-[1400px]
              bg-gray-100 border border-gray-300 rounded-xl
              flex items-center justify-center text-gray-400 text-sm">
              Rendering page ${i}…
            </div>
          `;
          container.appendChild(ph);
        }

        setupObserver();
        [...container.children].forEach((ph) =>
          observerRef.current.observe(ph)
        );
      } catch (err) {
        console.error(err);
        if (active) setError("Unable to load PDF.");
      } finally {
        if (active) setLoading(false);
      }
    };

    loadPDF();

    return () => {
      active = false;
      observerRef.current?.disconnect();
    };
  }, [pdfUrl, setupObserver]);

  return (
    <div className="mb-16">
      {title && (
        <h5 className="text-center text-xl font-bold text-blue-700 mb-6">
          {title}
        </h5>
      )}

      {/* Viewer Container */}
      <div className="w-full max-h-[85vh] overflow-y-auto bg-gray-100 border border-gray-300 rounded-2xl shadow-inner px-4 py-8">
        {/* Skeletons */}
        <AnimatePresence>
          {loading && !error && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              {[...Array(Math.min(pageCount, 4))].map((_, i) => (
                <PdfSkeletonPage key={i} index={i} />
              ))}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Error */}
        {error && (
          <div className="text-center text-red-600 py-10">
            {error}
          </div>
        )}

        {/* PDF Pages */}
        <div
          ref={containerRef}
          className="w-full flex flex-col items-center"
        />
      </div>
    </div>
  );
}
