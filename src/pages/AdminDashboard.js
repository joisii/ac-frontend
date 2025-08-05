import React, { useState, useEffect } from 'react'; 
import ServiceRequestsTable from './ServiceRequestsTable';
import SalesTable from './SalesTable';
import API_BASE from '../config';

const AdminDashboard = () => {
  const [requests, setRequests] = useState([]);
  const [sales, setSales] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch service requests
        const reqRes = await fetch(`${API_BASE}/requests`);
        const reqData = await reqRes.json();
        setRequests(Array.isArray(reqData) ? reqData : []);

        // Fetch sales records
        const salesRes = await fetch(`${API_BASE}/sales`);
        const salesData = await salesRes.json();
        setSales(Array.isArray(salesData) ? salesData : []);
      } catch (err) {
        console.error('Error fetching data:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleDeleteRequest = (id) => {
    fetch(`${API_BASE}/requests/${id}`, { method: 'DELETE' })
      .then(() => setRequests(prev => prev.filter(req => req._id !== id)))
      .catch(err => console.error('Error deleting request:', err));
  };

  const handleDeleteSale = (id) => {
    fetch(`${API_BASE}/sales/${id}`, { method: 'DELETE' })
      .then(() => setSales(prev => prev.filter(s => s._id !== id)))
      .catch(err => console.error('Error deleting sale:', err));
  };

  if (loading) {
    return <div className="p-6 text-center text-gray-500">Loading data...</div>;
  }

  return (
    <div className="flex-1 p-6 bg-gradient-to-br from-gray-50 to-gray-200 min-h-screen font-sans">
      <div className="bg-white shadow rounded-xl p-6 mb-8 border border-gray-300 flex justify-between items-center">
        <div>
          <h2 className="text-3xl font-bold text-gray-800">Welcome, Admin</h2>
          <p className="text-sm text-gray-500 mt-1">Manage your service requests and sales records below.</p>
        </div>
        <div className="hidden md:flex items-center gap-4">
          <img
            src="https://img.icons8.com/ios-filled/50/admin-settings-male.png"
            alt="Admin"
            className="w-12 h-12"
          />
          <span className="text-gray-700 font-medium">GVJ Admin</span>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-300 mb-10">
        <ServiceRequestsTable requests={requests} onDelete={handleDeleteRequest} />
      </div>

      <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-300">
        <SalesTable sales={sales} onDelete={handleDeleteSale} />
      </div>
    </div>
  );
};

export default AdminDashboard;
