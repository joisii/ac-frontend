// src/pages/training/Project.js
import React, { useEffect, useState } from "react";
import * as XLSX from "xlsx";

function Project() {
  const [tableData, setTableData] = useState([]);

  // Customer Data (copied from Repair.js)
  const warrantyCustomers = [
    { sno: 1, client: "ABC Corp" },
    { sno: 2, client: "XYZ Industries" },
    { sno: 3, client: "GreenTech Solutions" },
    { sno: 4, client: "Delta Group" },
    { sno: 5, client: "BrightFuture Pvt Ltd" },
  ];

  const amcCustomers = [
    { sno: 1, client: "Metro Builders" },
    { sno: 2, client: "BlueSky Ltd" },
    { sno: 3, client: "Everest Constructions" },
    { sno: 4, client: "Prime Estates" },
    { sno: 5, client: "Silverline Pvt Ltd" },
  ];

  useEffect(() => {
    // Fetch the Excel file from public folder
    fetch("/project-data.xlsx")
      .then((res) => res.arrayBuffer())
      .then((buffer) => {
        const workbook = XLSX.read(buffer, { type: "array" });
        const sheetName = workbook.SheetNames[0]; // first sheet
        const sheet = workbook.Sheets[sheetName];
        const data = XLSX.utils.sheet_to_json(sheet, { header: 1 }); // raw array format
        setTableData(data);
      });
  }, []);

  return (
    <div className="bg-white p-6 rounded-2xl shadow-lg">
      <h5 className="text-2xl font-bold text-blue-700 mb-4">
        Project Training – Detailed Syllabus
      </h5>
      <p className="text-gray-700 mb-4 leading-relaxed">
        At <span className="font-semibold text-blue-600">GVJ</span>, project
        training isn’t just about theory—it’s a step-by-step journey into the
        real world of{" "}
        <span className="font-semibold">HVAC systems</span>. Our structured
        syllabus is designed to bridge the gap between classroom knowledge and
        hands-on expertise.
      </p>
      <p className="text-gray-700 mb-6 leading-relaxed">
        This curriculum covers everything from{" "}
        <span className="font-medium">system design</span> and{" "}
        <span className="font-medium">installation practices</span> to{" "}
        <span className="font-medium">troubleshooting</span> and{" "}
        <span className="font-medium">maintenance strategies</span>. By working
        on real-time projects, you’ll build confidence to handle commercial HVAC
        setups independently. The table below gives you the complete syllabus
        roadmap for our project training program.
      </p>

      {/* Render Excel Data */}
      {tableData.length > 0 ? (
        <div className="overflow-x-auto max-h-[500px] overflow-y-scroll border rounded-lg mb-8">
          <table className="table-auto border-collapse border border-gray-300 w-full text-sm text-left">
            <thead className="bg-blue-100 sticky top-0">
              <tr>
                {tableData[0].map((col, i) => (
                  <th
                    key={i}
                    className="border border-gray-300 px-4 py-2 font-semibold"
                  >
                    {col}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {tableData.slice(1).map((row, rowIndex) => (
                <tr
                  key={rowIndex}
                  className="odd:bg-white even:bg-gray-50 hover:bg-yellow-50"
                >
                  {row.map((cell, cellIndex) => (
                    <td
                      key={cellIndex}
                      className="border border-gray-300 px-4 py-2"
                    >
                      {cell}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <p className="text-gray-500 mb-8">Loading syllabus data...</p>
      )}

      {/* Customer Data Tables */}
      <div className="grid md:grid-cols-2 gap-8">
        {/* Warranty Customers */}
        <div className="max-w-md">
          <h5 className="text-lg font-bold text-blue-700 mb-4">
            Partial List of Warranty Customers
          </h5>
          <div className="max-h-64 overflow-y-auto border border-gray-300 rounded-lg shadow">
            <table className="w-full">
              <thead className="bg-blue-600 text-white sticky top-0">
                <tr>
                  <th className="px-4 py-3 text-left">S.no</th>
                  <th className="px-4 py-3 text-left">Client Name</th>
                </tr>
              </thead>
              <tbody>
                {warrantyCustomers.map((row, i) => (
                  <tr
                    key={i}
                    className={i % 2 === 0 ? "bg-gray-50" : "bg-white"}
                  >
                    <td className="px-4 py-2 border-b">{row.sno}</td>
                    <td className="px-4 py-2 border-b">{row.client}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* AMC Customers */}
        <div className="max-w-md">
          <h5 className="text-lg font-bold text-blue-700 mb-4">
            Partial List of AMC Customers
          </h5>
          <div className="max-h-64 overflow-y-auto border border-gray-300 rounded-lg shadow">
            <table className="w-full">
              <thead className="bg-blue-600 text-white sticky top-0">
                <tr>
                  <th className="px-4 py-3 text-left">S.no</th>
                  <th className="px-4 py-3 text-left">Client Name</th>
                </tr>
              </thead>
              <tbody>
                {amcCustomers.map((row, i) => (
                  <tr
                    key={i}
                    className={i % 2 === 0 ? "bg-gray-50" : "bg-white"}
                  >
                    <td className="px-4 py-2 border-b">{row.sno}</td>
                    <td className="px-4 py-2 border-b">{row.client}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Project;
