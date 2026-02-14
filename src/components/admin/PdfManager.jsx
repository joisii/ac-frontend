import React, { useState } from "react";
import API_BASE from "../../config";

const PdfManager = () => {
  const [projectFile, setProjectFile] = useState(null);
  const [serviceFile, setServiceFile] = useState(null);
  const [loadingType, setLoadingType] = useState(null);
  const [message, setMessage] = useState("");
  const [infoMessage, setInfoMessage] = useState(""); // 🆕 wait notice
  const [resetKey, setResetKey] = useState(Date.now());

  const uploadPdf = async (type, file) => {
    if (!file) {
      alert(`Please select a ${type} evaluation PDF`);
      return;
    }

    const formData = new FormData();
    formData.append("pdf", file);

    try {
      setLoadingType(type);
      setMessage("");
      setInfoMessage("");

      const res = await fetch(`${API_BASE}/admin/upload-pdf/${type}`, {
        method: "POST",
        body: formData,
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message);

      setMessage(`✅ ${data.message}`);

      // 🆕 Inform admin about delay on service page
      setInfoMessage(
        "⏳ Please wait a few moments — the updated PDF will reflect shortly on the Service page."
      );

      // 🧼 Reset after 2 seconds
      setTimeout(() => {
        setProjectFile(null);
        setServiceFile(null);
        setMessage("");
        setInfoMessage("");
        setResetKey(Date.now());
      }, 2000);
    } catch (err) {
      setMessage(`❌ ${err.message}`);
    } finally {
      setLoadingType(null);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow p-4">
      <h2 className="text-base font-semibold mb-3">
        Evaluation Sheet Management
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* PROJECT */}
        <div className="border rounded-lg p-3">
          <h3 className="text-sm font-semibold mb-1">
            📄 Project Evaluation
          </h3>
          <p className="text-xs text-gray-500 mb-2">
            Replaces existing project sheet
          </p>

          <input
            key={`project-${resetKey}`}
            type="file"
            accept="application/pdf"
            onChange={(e) => setProjectFile(e.target.files[0])}
            className="w-full text-sm border rounded-md px-2 py-1 mb-2"
          />

          <button
            onClick={() => uploadPdf("project", projectFile)}
            disabled={loadingType === "project"}
            className="w-full text-sm bg-blue-600 hover:bg-blue-700 text-white py-1.5 rounded-md disabled:opacity-50"
          >
            {loadingType === "project" ? "Replacing..." : "Replace"}
          </button>
        </div>

        {/* SERVICE */}
        <div className="border rounded-lg p-3">
          <h3 className="text-sm font-semibold mb-1">
            📄 Service Evaluation
          </h3>
          <p className="text-xs text-gray-500 mb-2">
            Replaces existing service sheet
          </p>

          <input
            key={`service-${resetKey}`}
            type="file"
            accept="application/pdf"
            onChange={(e) => setServiceFile(e.target.files[0])}
            className="w-full text-sm border rounded-md px-2 py-1 mb-2"
          />

          <button
            onClick={() => uploadPdf("service", serviceFile)}
            disabled={loadingType === "service"}
            className="w-full text-sm bg-blue-600 hover:bg-blue-700 text-white py-1.5 rounded-md disabled:opacity-50"
          >
            {loadingType === "service" ? "Replacing..." : "Replace"}
          </button>
        </div>
      </div>

      {message && (
        <p
          className={`mt-3 text-xs font-medium ${
            message.startsWith("✅")
              ? "text-green-600"
              : "text-red-600"
          }`}
        >
          {message}
        </p>
      )}

      {infoMessage && (
        <p className="mt-1 text-xs text-gray-500">
          {infoMessage}
        </p>
      )}
    </div>
  );
};

export default PdfManager;
