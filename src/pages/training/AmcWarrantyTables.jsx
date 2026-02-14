import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

// -------------------------------------
// Skeleton row (loading animation)
// -------------------------------------
function SkeletonRow({ index }) {
  return (
    <motion.tr
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: index * 0.08 }}
      className="bg-gray-100"
    >
      <td className="px-4 py-3 border-b">
        <div className="h-4 w-10 bg-gray-300 rounded animate-pulse" />
      </td>
      <td className="px-4 py-3 border-b">
        <div className="h-4 w-40 bg-gray-300 rounded animate-pulse" />
      </td>
    </motion.tr>
  );
}

// -------------------------------------
// Reusable table
// -------------------------------------
function CustomerTable({ title, data, loading }) {
  return (
    <div>
      <h5 className="text-lg font-bold text-blue-700 mb-4">{title}</h5>

      <div className="max-h-64 overflow-y-auto border rounded-lg shadow">
        <table className="w-full">
          <thead className="bg-blue-600 text-white sticky top-0 z-10">
            <tr>
              <th className="px-4 py-3 w-24">S.No</th>
              <th className="px-4 py-3">Client Name</th>
            </tr>
          </thead>

          <tbody>
            <AnimatePresence>
              {loading ? (
                [...Array(6)].map((_, i) => (
                  <SkeletonRow key={i} index={i} />
                ))
              ) : data.length > 0 ? (
                data.map((row, i) => (
                  <motion.tr
                    key={i}
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.25 }}
                    className={i % 2 === 0 ? "bg-white" : "bg-gray-50"}
                  >
                    <td className="px-4 py-2 border-b">{row.sno}</td>
                    <td className="px-4 py-2 border-b">{row.client}</td>
                  </motion.tr>
                ))
              ) : (
                <motion.tr
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                >
                  <td
                    colSpan="2"
                    className="text-center py-4 text-gray-500"
                  >
                    No data available
                  </td>
                </motion.tr>
              )}
            </AnimatePresence>
          </tbody>
        </table>
      </div>
    </div>
  );
}

// -------------------------------------
// AMC + Warranty wrapper
// -------------------------------------
export default function AmcWarrantyTables({
  warrantyCustomers = [],
  amcCustomers = [],
}) {
  const [loading, setLoading] = useState(true);

  // Detect when backend data arrives
  useEffect(() => {
    if (warrantyCustomers.length || amcCustomers.length) {
      setLoading(false);
    }
  }, [warrantyCustomers, amcCustomers]);

  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      variants={fadeUp}
      className="grid md:grid-cols-2 gap-8 mb-12"
    >
      <CustomerTable
        title="Partial List of Warranty Customers"
        data={warrantyCustomers}
        loading={loading}
      />

      <CustomerTable
        title="Partial List of AMC Customers"
        data={amcCustomers}
        loading={loading}
      />
    </motion.div>
  );
}
