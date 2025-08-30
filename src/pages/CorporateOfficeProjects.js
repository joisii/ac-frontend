// src/pages/CorporateOfficeProjects.js
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import gradients from "../config/gradients"; // ✅ gradients import

// Temporary static data (replace with Excel import later)
const officeClients = [
  { id: 1, name: "Global med resources", location: "Chennai", application: "Office Area", acType: "AHU-Chiller" },
  { id: 2, name: "Core Solutions", location: "Chennai", application: "Office Area", acType: "DSAC" },
  { id: 3, name: "Axis HR Consultancy", location: "Chennai", application: "Office Area", acType: "SAC" },
  { id: 4, name: "Nariuran Controls", location: "Chennai", application: "Office Area", acType: "DSAC" },
  { id: 5, name: "Amar Prakash Group companies", location: "Chennai", application: "Office Area", acType: "SAC + Cassette SAC" },
  { id: 6, name: "Pro logistics", location: "Chennai", application: "Office Area", acType: "SAC + Cassette SAC" },
  { id: 7, name: "Vikrash Builders", location: "Chennai", application: "Office Area", acType: "DSAC" },
  { id: 8, name: "M/s. Cadbury india", location: "Chennai", application: "Office Area", acType: "DSAC" },
  { id: 9, name: "SGS India Pvt ltd ", location: "Chennai", application: "Office Area", acType: "DSAC" },
  { id: 10, name: "ECGC", location: "Chennai", application: "Office Area", acType: "DSAC" },
  { id: 11, name: "ZIFO Systems", location: "Chennai", application: "Office Area", acType: "DSAC" },
  { id: 12, name: "M/s. Vigneshwar Airconditinoers", location: "Chennai", application: "Office Area", acType: "DSAC" },
  { id: 13, name: "M/s. First American India pvt ltd,", location: "Chennai", application: "Office Area", acType: "DSAC" },
  { id: 14, name: "Expert Air con – APL Logistics", location: "Chennai", application: "Office Area", acType: "DSAC" },
  { id: 15, name: "Mr. Archinova Design Pvt Ltd.", location: "Chennai", application: "Office Area", acType: "DSAC" },
  { id: 16, name: "Mr. Niranjan Naidu", location: "Chennai", application: "Office Area", acType: "DSAC" },
  { id: 17, name: "SGS India pvt ltd", location: "Andhra Pradesh", application: "Office Area", acType: "DSAC" },
  { id: 18, name: "Crystal Aircon system", location: "Chennai", application: "Office Area", acType: "DSAC" },
  { id: 19, name: "Uniworld Logistics ", location: "Chennai", application: "Office Area", acType: "DSAC" },
  { id: 20, name: "M/s. Dover India Pvt Ltd", location: "Chennai", application: "Office Area", acType: "DSAC" },
  { id: 21, name: "M/s. Shrimpex Biotech Services Pvt Ltd", location: "Chennai", application: "Office Area", acType: "DSAC" },
  { id: 22, name: "Bharti Axa life insurance co.ltd.", location: "Chennai", application: "Office Area", acType: "DSAC" },
  { id: 23, name: "M/s. Techno soft", location: "Chennai", application: "Office Area", acType: "Casstte SAC" },
  { id: 24, name: "Amnet Systems ", location: "Chennai", application: "Office Area", acType: "DSAC" },
  { id: 25, name: "Surin Automotive Pvt Ltd", location: "Chennai", application: "Office Area", acType: "SAC" },
  { id: 26, name: "ISIS InfoTech Pvt Ltd", location: "Chennai", application: "Office Area", acType: "DSAC" },
  { id: 27, name: "Vizza Advisory Services", location: "Chennai", application: "Office Area", acType: "DSAC" },
  { id: 28, name: "M/s. Siemens", location: "Chennai", application: "Office Area", acType: "DSAC" },
  { id: 29, name: "Aqua Engineering services", location: "Chennai", application: "Office Area", acType: "DSAC" },
  { id: 30, name: "NEGITS Solutions", location: "Chennai", application: "Office Area", acType: "DSAC" },
  { id: 31, name: "Twice Digital", location: "Chennai", application: "Office Area", acType: "DSAC" },
  { id: 32, name: "Creative Wizards", location: "Chennai", application: "Office Area", acType: "DSAC" },
  { id: 33, name: "Twice Digital", location: "Chennai", application: "Office Area", acType: "DSAC" },
  { id: 34, name: "Creative Wizards", location: "Chennai", application: "Office Area", acType: "DSAC" },
  { id: 35, name: "Prithivi Super Market", location: "Chennai", application: "Office Area", acType: "DSAC" },
  { id: 36, name: "Edi Builders", location: "Chennai", application: "Office Area", acType: "DSAC" },
  { id: 37, name: "Pioneer Inc", location: "Chennai", application: "Office Area", acType: "DSAC" },
  { id: 38, name: "Anmol Shrusti Contractors", location: "Chennai", application: "Office Area", acType: "DSAC" },
  { id: 39, name: "Santhosh Technolog", location: "Chennai", application: "Office Area", acType: "DSAC" },
  { id: 40, name: "Army of Jesus", location: "Chennai", application: "Office Area", acType: "DSAC" },
  { id: 41, name: "Fashion Park", location: "Chennai", application: "Office Area", acType: "DSAC" },
  { id: 42, name: "All India Radio", location: "Chennai", application: "Office Area", acType: "Mega SAC" },
  { id: 43, name: "Vinayak InfoTech", location: "Chennai", application: "Office Area", acType: "DSAC" },
  { id: 44, name: "Henkel Tenson India", location: "Chennai", application: "Office Area", acType: "DSAC" },
  { id: 45, name: "AVM Studio", location: "Chennai", application: "Office Area", acType: "DSAC" },
  { id: 46, name: "SERCO", location: "Chennai", application: "Office Area", acType: "DSAC" },
  { id: 47, name: "Rich India", location: "Chennai", application: "Office Area", acType: "DSAC" },
  { id: 48, name: "Technology Frontiers(India) Pvt Ltd", location: "Chennai", application: "Office Area", acType: "VRF / DSAC" },
  { id: 49, name: "Jubliant Motors (Audi)", location: "Chennai", application: "Office Area", acType: "DSAC" },
  { id: 50, name: "C2H Network Pvt Ltd", location: "Chennai", application: "Office Area", acType: "DSAC" },
  { id: 51, name: "Dhanjay Logistics", location: "Chennai", application: "Office Area", acType: "VRF" },
  { id: 52, name: "Jubliee Granites", location: "Chennai", application: "Office Area", acType: "DSAC" },
  { id: 53, name: "Zealous Services", location: "Chennai", application: "Office Area", acType: "DSAC" },
  { id: 54, name: "Ashok Leyland", location: "Chennai", application: "Office Area", acType: "DSAC" },
  { id: 55, name: "Raja lakshmi Motors", location: "Chennai", application: "Office Area", acType: "DSAC" },
  { id: 56, name: "Arostar enterprises pvt ltd", location: "Chennai", application: "Office Area", acType: "DSAC" },
  { id: 57, name: "ORKAY Interior and modular pvt ltd", location: "Chennai", application: "Office Area", acType: "DSAC" },
  { id: 58, name: "ZALARIS at SP info city", location: "Chennai", application: "Office Area", acType: "AHU" },
  { id: 59, name: "Carrier Net", location: "Chennai", application: "Office Area", acType: "DSAC" },
  { id: 60, name: "Anthelia Business Technologies", location: "Chennai", application: "Office Area", acType: "DSAC" },
  { id: 61, name: "Macro Automation Solutions india pvt ltd", location: "Chennai", application: "Office Area", acType: "Free Match " },
  { id: 62, name: "Sri Kumaran Software", location: "Chennai", application: "Office Area", acType: "DSAC" },
  { id: 63, name: "Kumaran Software", location: "Chennai", application: "Office Area", acType: "DSAC" },
  { id: 64, name: "First American (India) Pvt ltd", location: "Salem", application: "Office Area", acType: "IVRF" },
  { id: 65, name: "Writer and co pvt ltd", location: "Chennai", application: "Office Area", acType: "DSAC" },
  { id: 66, name: "M/s. Borsbel Engineering Pvt Ltd", location: "Chennai", application: "Office Area", acType: "DSAC" },
  { id: 67, name: "AMIT - Tamarai tech park", location: "Chennai", application: "Office Area", acType: "DSAC" },
  { id: 68, name: "Esskay Design and structures Pvt Ltd", location: "Chennai", application: "Office Area", acType: "Inv DSAC and VRF" },
  { id: 69, name: "Savera Kothari ", location: "Chennai", application: "Office Area", acType: "VRF" },
  { id: 70, name: "Everest construction (@ 10 sq mall)", location: "Chennai", application: "Office Area", acType: "Low side works" },
  { id: 71, name: "Sungard Availability Services", location: "Chennai", application: "Office Area", acType: "VRF" },
  { id: 72, name: "INDOSPACE SKCL Industrial park", location: "Chennai", application: "Office Area", acType: "Casst AC" },
  { id: 73, name: "Oragadam pvt ltd", location: "Chennai", application: "Office Area", acType: "DSAC" },
  { id: 74, name: "Annexmed Pvt Ltd", location: "Chennai", application: "Office Area", acType: "DSAC" },
  { id: 75, name: "Sarvam Solutions", location: "Chennai", application: "Office Area", acType: "AHU" },
  { id: 76, name: "T Scale Constructions and interiors (For Indian Bank)", location: "Chennai", application: "Office Area", acType: "Casst SAC" },
  { id: 77, name: "S.M. Auto Engineering Pvt Ltd", location: "Chennai", application: "Office Area", acType: "DSAC" },
  { id: 78, name: "LOESCHE Energy systems india pvt ltd", location: "Chennai", application: "Office Area", acType: "DSAC" },
  { id: 79, name: "Sri Vaari Electricals", location: "Chennai", application: "Office Area", acType: "DSAC" },
  { id: 80, name: "Soft Arch Interiors Pvt Ltd (Allegis Group)", location: "Chennai", application: "Office Area", acType: "DSAC" },
  { id: 81, name: "Lakshmi Villas Bank", location: "Chennai", application: "Office Area", acType: "VRF IV Plus" },
  { id: 82, name: "Intellect (Sri Vigneshwar AC - mumbai)", location: "Chennai", application: "Office Area", acType: "VRF IV S" },
  { id: 83, name: "Karur Visa Bank", location: "Chennai", application: "Office Area", acType: "VRF" },
  { id: 84, name: "JIKA Study Centre", location: "Chennai", application: "Office Area", acType: "DSAC" },
  { id: 85, name: "Mr Ashokan Office Space", location: "Vellore", application: "Office Area", acType: "DSAC" },
  { id: 86, name: "BADVE Engineering  Pvt Ltd", location: "Chennai", application: "Office Area", acType: "VRF" },
  { id: 87, name: "Shristi d' Studio", location: "Chennai", application: "Office Area", acType: "Mega SAC" },
  { id: 88, name: "DBS Bank", location: "Coimbatore", application: "Office Area", acType: "DSAC" },
  { id: 89, name: "Innovent Spaces Pvt Ltd", location: "Chennai", application: "Office Area", acType: "DSAC" },
  { id: 90, name: "Ten Square Mall ", location: "Chennai", application: "Office Area", acType: "DSAC" },
  { id: 91, name: "Kayessar Projects and Services", location: "Chennai", application: "Office Area", acType: "Casst AC" },
  { id: 92, name: "Star Plastics", location: "Chennai", application: "Office Area", acType: "SAC" },
  { id: 93, name: "Tula Software", location: "Chennai", application: "Office Area", acType: "SAC" },
  { id: 94, name: "Detect Technology", location: "Chennai", application: "Office Area", acType: "DSAC" },
  { id: 95, name: "SMRR Traders PVT Ltd", location: "Chennai", application: "Office Area", acType: "VRF IV S" },
  { id: 96, name: "Star Plastics", location: "Chennai", application: "Office Area", acType: "LS" },
  { id: 97, name: "Design Pundits Interiors Pvt Ltd", location: "Chennai", application: "Office Area", acType: "LS" },
  { id: 98, name: "Jesus Calls", location: "Chennai", application: "Office Area", acType: "SAC" },
  { id: 99, name: "TCL Data Centre", location: "Chennai", application: "Office Area", acType: "VRF" },
  { id: 100, name: "Pffizer Pvt Ltd", location: "Chennai", application: "Office Area", acType: "Casst " },
  { id: 101, name: "Indian Concreate Institute", location: "Chennai", application: "Office Area", acType: "Inv DSAC" },
  { id: 102, name: "Pink Celebirity", location: "Chennai", application: "Office Area", acType: "DSAC" },
  { id: 103, name: "Neeyomoo Project ", location: "Madurai", application: "Office Area", acType: "DSAC" },
  { id: 104, name: "Annapoorna Medical College (Daiken)", location: "Chennai", application: "Office Area", acType: "SAC" },
  { id: 105, name: "Traecit Business Consultants", location: "Chennai", application: "Office Area", acType: "VRF IV S" },
  { id: 106, name: "Mr. Samuel Satish Babu", location: "Chennai", application: "Office Area", acType: "SAC" },
  { id: 107, name: "Neil Systems PVt Ltd", location: "Chennai", application: "Office Area", acType: "DSAC" },
  { id: 108, name: "Silverline Fertisers Pvt Ltd", location: "Chennai", application: "Office Area", acType: "VRF IV S" },
  { id: 109, name: "SCITUS PHARMA SERVICES PVT LTD", location: "Chennai", application: "Office Area", acType: "SAC" },
  { id: 110, name: "Traecit Business Consultants", location: "Chennai", application: "Office Area", acType: "VRF IV S" },
  { id: 111, name: "Arihant Sales Corporation (Mr. Jayshah, BNI)", location: "Chennai", application: "Office Area", acType: "Caast AC" },
  { id: 112, name: "Traecit Business Consultants", location: "Chennai", application: "Office Area", acType: "VRF IV S" },
  { id: 113, name: "Mastech Infotrellis India Pvt Ltd", location: "Chennai", application: "Office Area", acType: "VRF IV S" },
  { id: 114, name: "Balaji Contracting Company", location: "Chennai", application: "Office Area", acType: "VRF IV S" },
  { id: 115, name: "Arch Avinash", location: "Chennai", application: "Office Area", acType: "DSAC" },
  { id: 116, name: "Loyal Textile Mills Limited", location: "Chennai", application: "Office Area", acType: "Inv DSAC" },
];

// Helper: Convert array to CSV and trigger download
const downloadCSV = (data, filename = "corporate_office_clients.csv") => {
  const headers = Object.keys(data[0]).join(",") + "\n";
  const rows = data.map((row) => Object.values(row).join(",")).join("\n");
  const csv = headers + rows;

  const blob = new Blob([csv], { type: "text/csv" });
  const url = window.URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  a.click();
  window.URL.revokeObjectURL(url);
};

export default function CorporateOfficeProjects() {
  const [search, setSearch] = useState("");
  const navigate = useNavigate();

  // Always scroll to top on page load
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const filteredClients = officeClients.filter(
    (c) =>
      c.name.toLowerCase().includes(search.toLowerCase()) ||
      c.location.toLowerCase().includes(search.toLowerCase()) ||
      c.acType.toLowerCase().includes(search.toLowerCase()) ||
      c.application.toLowerCase().includes(search.toLowerCase())
  );

  // Motion variants (fade-in like GymProjects)
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15, delayChildren: 0.2 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  return (
    <motion.div
      key="corporate-page"
      initial="hidden"
      animate="visible"
      exit="hidden"
      variants={containerVariants}
      className={`min-h-screen ${gradients.corporate} py-16 px-6 font-sans`}
    >
      <motion.div variants={itemVariants} className="max-w-5xl mx-auto mb-6">
        {/* Back Button */}
        <button
          onClick={() => navigate(-1)}
          className="px-4 py-2 bg-white/70 backdrop-blur-md text-gray-800 rounded-xl shadow hover:bg-white transition"
        >
          ⬅ Back
        </button>
      </motion.div>

      {/* Page Title */}
      <motion.h1
        variants={itemVariants}
        className="text-4xl font-bold text-center mb-10 text-gray-800 drop-shadow"
      >
        Corporate Office Projects
      </motion.h1>

      {/* Search + Download */}
      <motion.div
        variants={itemVariants}
        className="max-w-3xl mx-auto mb-8 flex flex-col sm:flex-row items-center gap-4"
      >
        <input
          type="text"
          placeholder="Search by name, location, or AC type..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="flex-1 p-3 border border-gray-300 rounded-xl shadow focus:outline-none focus:ring-2 focus:ring-gray-500"
        />
        <button
          onClick={() => downloadCSV(officeClients)}
          className="px-5 py-3 bg-gray-800 text-white rounded-xl shadow hover:bg-gray-900 transition"
        >
          ⬇ Download All
        </button>
      </motion.div>

      {/* Data Table */}
      <motion.div
        variants={itemVariants}
        className="overflow-x-auto max-w-5xl mx-auto bg-white/80 backdrop-blur-md rounded-2xl shadow-lg"
      >
        <table className="w-full border border-gray-300 rounded-xl text-sm">
          <thead>
            <tr className="bg-gray-200 text-left">
              <th className="p-3 border">Sl No</th>
              <th className="p-3 border">Name</th>
              <th className="p-3 border">Location</th>
              <th className="p-3 border">Industry/Application</th>
              <th className="p-3 border">AC Type</th>
            </tr>
          </thead>
          <tbody>
            {filteredClients.length > 0 ? (
              filteredClients.map((c) => (
                <tr key={c.id} className="hover:bg-gray-100">
                  <td className="p-3 border">{c.id}</td>
                  <td className="p-3 border">{c.name}</td>
                  <td className="p-3 border">{c.location}</td>
                  <td className="p-3 border">{c.application}</td>
                  <td className="p-3 border">{c.acType}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" className="p-4 text-center text-gray-500">
                  No results found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </motion.div>
    </motion.div>
  );
}
