import React from 'react';

function AdminDashboardPage() {
  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <h1 className="text-2xl font-bold mb-6">Admin Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-lg font-semibold mb-4">Platform Overview</h2>
          <div className="space-y-4">
            <div>
              <p className="text-sm text-gray-600">Total Users</p>
              <p className="text-2xl font-bold">2,500</p>
            </div>
            <div>
              <p className="text-sm text-gray-600">Active Startups</p>
              <p className="text-2xl font-bold">150</p>
            </div>
            <div>
              <p className="text-sm text-gray-600">Total Investments</p>
              <p className="text-2xl font-bold">$5.2M</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminDashboardPage;