import React, { useState } from 'react';
import Button from '../common/Button';

function StartupForm() {
  const [formData, setFormData] = useState({
    companyName: '',
    industry: '',
    stage: '',
    description: '',
    fundingNeeded: '',
    equity: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission
  };

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h2 className="text-2xl font-bold mb-6">Startup Information</h2>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700">Company Name</label>
          <input
            type="text"
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            value={formData.companyName}
            onChange={(e) => setFormData({ ...formData, companyName: e.target.value })}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Industry</label>
          <select
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            value={formData.industry}
            onChange={(e) => setFormData({ ...formData, industry: e.target.value })}
          >
            <option value="">Select Industry</option>
            <option value="tech">Technology</option>
            <option value="health">Healthcare</option>
            <option value="finance">Finance</option>
            <option value="retail">Retail</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Stage</label>
          <select
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            value={formData.stage}
            onChange={(e) => setFormData({ ...formData, stage: e.target.value })}
          >
            <option value="">Select Stage</option>
            <option value="idea">Idea Stage</option>
            <option value="mvp">MVP</option>
            <option value="early">Early Traction</option>
            <option value="growth">Growth</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Description</label>
          <textarea
            rows={4}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Funding Needed</label>
          <input
            type="number"
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            value={formData.fundingNeeded}
            onChange={(e) => setFormData({ ...formData, fundingNeeded: e.target.value })}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Equity Offered (%)</label>
          <input
            type="number"
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            value={formData.equity}
            onChange={(e) => setFormData({ ...formData, equity: e.target.value })}
          />
        </div>

        <Button type="submit">Submit</Button>
      </form>
    </div>
  );
}

export default StartupForm;