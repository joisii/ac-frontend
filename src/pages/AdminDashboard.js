import React, { useState, useEffect } from 'react';
import ServiceRequestsTable from './ServiceRequestsTable';
import SalesTable from './SalesTable';

const AdminDashboard = () => {
  const [requests, setRequests] = useState([]);
  const [sales, setSales] = useState([]);

  // Load data from localStorage
  useEffect(() => {
    const storedRequests = JSON.parse(localStorage.getItem('serviceRequests')) || [];
    const storedSales = JSON.parse(localStorage.getItem('salesRecords')) || [];
    setRequests(storedRequests);
    setSales(storedSales);
  }, []);

  const handleDeleteRequest = (index) => {
    const updatedRequests = [...requests];
    updatedRequests.splice(index, 1);
    setRequests(updatedRequests);
    localStorage.setItem('serviceRequests', JSON.stringify(updatedRequests));
  };

  const handleDeleteSale = (index) => {
    const updatedSales = [...sales];
    updatedSales.splice(index, 1);
    setSales(updatedSales);
    localStorage.setItem('salesRecords', JSON.stringify(updatedSales));
  };

  return (
    <div className="flex-1 p-6 bg-gradient-to-br from-gray-50 to-gray-200 min-h-screen font-sans">
      {/* Admin Greeting */}
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

      {/* Service Requests */}
      <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-300 mb-10">
        <ServiceRequestsTable requests={requests} onDelete={handleDeleteRequest} />
      </div>

      {/* Sales Records */}
      <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-300">
        <SalesTable sales={sales} onDelete={handleDeleteSale} />
      </div>
    </div>
  );
};

export default AdminDashboard;
