// src/pages/training/Service.js
import React, { useEffect, useState } from "react";
import * as XLSX from "xlsx";

function Service() {
  const [tableData, setTableData] = useState([]);

  // Warranty units data (taken from Repair.js)
  const unit1Data = [
    { sno: 1, description: "Compressor", condition: "Good" },
    { sno: 2, description: "Condenser Coil", condition: "Needs Cleaning" },
    { sno: 3, description: "Fan Motor", condition: "Working" },
  ];

  const unit2Data = [
    { sno: 1, description: "Evaporator Coil", condition: "Good" },
    { sno: 2, description: "Thermostat", condition: "Replace Soon" },
    { sno: 3, description: "Blower Motor", condition: "Operational" },
  ];

  useEffect(() => {
    // Fetch the Excel file from public folder
    fetch("/project-data.xlsx") // 👈 make sure to place the file in /public
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
      <h5 className="text-2xl font-bold text-yellow-700 mb-4">
        Service Training – Detailed Syllabus
      </h5>
      <p className="text-gray-700 mb-4 leading-relaxed">
        At <span className="font-semibold text-yellow-600">GVJ</span>, our{" "}
        <span className="font-semibold">Service Training</span> syllabus is
        designed for HVAC professionals who want to master the art of{" "}
        <span className="font-medium">troubleshooting, repairing, and maintaining</span>
        modern air conditioning systems. This isn’t just theory—it’s about
        diagnosing problems under real-time fault simulations and sharpening
        the skills needed on the field.
      </p>
      <p className="text-gray-700 mb-6 leading-relaxed">
        From understanding <span className="font-medium">system components</span>
        and <span className="font-medium">electrical controls</span> to learning{" "}
        <span className="font-medium">preventive maintenance</span> and{" "}
        <span className="font-medium">advanced fault analysis</span>, this syllabus
        gives you the complete roadmap to become an industry-ready HVAC service expert.
      </p>

      {/* Render Excel Data */}
      {tableData.length > 0 ? (
        <div className="overflow-x-auto max-h-[500px] overflow-y-scroll border rounded-lg mb-8">
          <table className="table-auto border-collapse border border-gray-300 w-full text-sm text-left">
            <thead className="bg-yellow-100 sticky top-0">
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
                  className="odd:bg-white even:bg-gray-50 hover:bg-blue-50"
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

      {/* Warranty Data Tables */}
      <div className="grid md:grid-cols-2 gap-8">
        {/* Unit 1 */}
        <div className="max-w-md">
          <h5 className="text-lg font-bold text-yellow-700 mb-4">
            Unit No. 1 - 16 TR DPA
          </h5>
          <div className="max-h-64 overflow-y-auto border border-gray-300 rounded-lg shadow">
            <table className="w-full">
              <thead className="bg-yellow-500 text-white sticky top-0">
                <tr>
                  <th className="px-4 py-3 text-left">S.no</th>
                  <th className="px-4 py-3 text-left">Description</th>
                  <th className="px-4 py-3 text-left">Present Condition</th>
                </tr>
              </thead>
              <tbody>
                {unit1Data.map((row, i) => (
                  <tr
                    key={i}
                    className={i % 2 === 0 ? "bg-gray-50" : "bg-white"}
                  >
                    <td className="px-4 py-2 border-b">{row.sno}</td>
                    <td className="px-4 py-2 border-b">{row.description}</td>
                    <td className="px-4 py-2 border-b">{row.condition}</td>
                  </tr>
                ))}
                <tr>
                  <td
                    colSpan={3}
                    className="px-4 py-3 bg-yellow-100 font-semibold"
                  >
                    Remarks: All components inspected. Minor cleaning required.
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* Unit 2 */}
        <div className="max-w-md">
          <h5 className="text-lg font-bold text-yellow-700 mb-4">
            Unit No. 2 - 16 TR DPA
          </h5>
          <div className="max-h-64 overflow-y-auto border border-gray-300 rounded-lg shadow">
            <table className="w-full">
              <thead className="bg-yellow-500 text-white sticky top-0">
                <tr>
                  <th className="px-4 py-3 text-left">S.no</th>
                  <th className="px-4 py-3 text-left">Description</th>
                  <th className="px-4 py-3 text-left">Present Condition</th>
                </tr>
              </thead>
              <tbody>
                {unit2Data.map((row, i) => (
                  <tr
                    key={i}
                    className={i % 2 === 0 ? "bg-gray-50" : "bg-white"}
                  >
                    <td className="px-4 py-2 border-b">{row.sno}</td>
                    <td className="px-4 py-2 border-b">{row.description}</td>
                    <td className="px-4 py-2 border-b">{row.condition}</td>
                  </tr>
                ))}
                <tr>
                  <td
                    colSpan={3}
                    className="px-4 py-3 bg-yellow-100 font-semibold"
                  >
                    Remarks: Thermostat replacement suggested in next service
                    cycle.
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Service;
