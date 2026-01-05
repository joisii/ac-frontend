import { useEffect, useRef, useState, useCallback } from "react";
import * as pdfjsLib from "pdfjs-dist/legacy/build/pdf";
import workerSrc from "pdfjs-dist/build/pdf.worker.min.js";

// PDF.js worker setup
pdfjsLib.GlobalWorkerOptions.workerSrc = workerSrc;

export default function PdfViewer({ pdfUrl, title }) {
  const containerRef = useRef(null);
  const pageRefs = useRef([]);
  const pdfDocRef = useRef(null);
  const observerRef = useRef(null);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // -------------------------------------
  // Render single page
  // -------------------------------------
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
    canvas.className =
      "mx-auto my-8 bg-white rounded-md shadow-md border border-gray-200";

    const ctx = canvas.getContext("2d");
    ctx.imageSmoothingEnabled = true;
    ctx.imageSmoothingQuality = "high";

    await page.render({ canvasContext: ctx, viewport: scaledViewport }).promise;
    return canvas;
  }, []);

  // -------------------------------------
  // Intersection Observer
  // -------------------------------------
  const setupObserver = useCallback(() => {
    observerRef.current?.disconnect();

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
            const canvas = await renderPage(
              pdfDocRef.current,
              pageNumber,
              containerWidth
            );
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
        const container = containerRef.current;

        container.innerHTML = "";
        pageRefs.current = [];

        for (let i = 1; i <= pdf.numPages; i++) {
          const ph = document.createElement("div");
          ph.dataset.page = i;
          ph.dataset.rendered = "0";
          ph.className = "w-full flex justify-center py-6";
          ph.innerHTML = `
            <div class="w-[90%] md:w-[800px] h-[400px] md:h-[1100px]
            bg-gray-100 border rounded-lg flex items-center justify-center text-gray-400">
              Loading page ${i}…
            </div>
          `;
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
  }, [pdfUrl, setupObserver]);

  return (
    <div className="mb-12">
      {title && (
        <h5 className="text-center text-lg font-bold text-blue-700 mb-4">
          {title}
        </h5>
      )}

      <div className="w-full max-h-[85vh] overflow-y-auto bg-gray-50 rounded-xl shadow-inner px-2 md:px-6 py-6">
        {loading && (
          <div className="text-center text-gray-600 h-full flex items-center justify-center">
            Loading document…
          </div>
        )}

        {error && (
          <div className="text-center text-red-600 py-6">{error}</div>
        )}

        <div ref={containerRef} className="w-full" />
      </div>
    </div>
  );
}
