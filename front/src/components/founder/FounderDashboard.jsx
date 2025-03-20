import React from 'react';
import Button from '../common/Button';

function FounderDashboard() {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Founder Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-lg font-semibold mb-4">Startup Status</h2>
          <div className="space-y-4">
            <div>
              <p className="text-sm text-gray-600">Registration Progress</p>
              <div className="w-full bg-gray-200 rounded-full h-2.5">
                <div className="bg-indigo-600 h-2.5 rounded-full" style={{ width: '45%' }}></div>
              </div>
            </div>
            <Button>Complete Registration</Button>
          </div>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-lg font-semibold mb-4">Equity Distribution</h2>
          <div className="space-y-2">
            <p className="text-sm text-gray-600">Founders: 80%</p>
            <p className="text-sm text-gray-600">Platform: 2%</p>
            <p className="text-sm text-gray-600">Available for Investment: 18%</p>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-lg font-semibold mb-4">Pending Tasks</h2>
          <ul className="space-y-2">
            <li className="flex items-center text-sm text-gray-600">
              <span className="w-2 h-2 bg-red-500 rounded-full mr-2"></span>
              Complete company registration
            </li>
            <li className="flex items-center text-sm text-gray-600">
              <span className="w-2 h-2 bg-yellow-500 rounded-full mr-2"></span>
              Upload business plan
            </li>
            <li className="flex items-center text-sm text-gray-600">
              <span className="w-2 h-2 bg-green-500 rounded-full mr-2"></span>
              Review investor matches
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default FounderDashboard;