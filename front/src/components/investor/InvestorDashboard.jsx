import React from 'react';
import Button from '../common/Button';

function InvestorDashboard() {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Investor Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-lg font-semibold mb-4">Portfolio Overview</h2>
          <div className="space-y-4">
            <div>
              <p className="text-sm text-gray-600">Active Investments</p>
              <p className="text-2xl font-bold">5</p>
            </div>
            <div>
              <p className="text-sm text-gray-600">Total Invested</p>
              <p className="text-2xl font-bold">$250,000</p>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-lg font-semibold mb-4">Available Opportunities</h2>
          <div className="space-y-4">
            <div className="border-b pb-2">
              <p className="font-medium">TechStart Inc.</p>
              <p className="text-sm text-gray-600">AI/ML Platform</p>
              <Button variant="secondary" className="mt-2">View Details</Button>
            </div>
            <div className="border-b pb-2">
              <p className="font-medium">GreenEnergy Solutions</p>
              <p className="text-sm text-gray-600">Clean Tech</p>
              <Button variant="secondary" className="mt-2">View Details</Button>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-lg font-semibold mb-4">Recent Activity</h2>
          <div className="space-y-2">
            <div className="text-sm">
              <p className="text-gray-900">New startup match: HealthTech Pro</p>
              <p className="text-gray-500">2 hours ago</p>
            </div>
            <div className="text-sm">
              <p className="text-gray-900">Investment completed: DataViz Inc.</p>
              <p className="text-gray-500">1 day ago</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default InvestorDashboard;