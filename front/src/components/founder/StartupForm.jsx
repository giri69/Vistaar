import React, { useState } from 'react';
import Button from '../common/Button';
import { useNavigate } from 'react-router-dom';

function StartupForm() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    logoUrl: '',
    applicationVideoUrl: '',
    supportingDocumentUrl: '',
    // Adding these back as they might be required by the backend
    industry: 'tech',
    fundingNeeded: 10000,
    equityOffered: 10
  });

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');
    setSuccess('');
    
    try {
      // Get token from local storage
      const token = localStorage.getItem('token');
      
      if (!token) {
        throw new Error('You must be logged in to submit a startup application');
      }
      
      // Log the data we're sending to help debug
      console.log('Sending startup data:', formData);
      
      const response = await fetch('http://localhost:5030/api/founders/startups/apply', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(formData)
      });
      
      const data = await response.json();
      
      if (!response.ok) {
        console.error('API Error:', data);
        throw new Error(data.message || 'Failed to submit startup application');
      }
      
      setSuccess('Startup application submitted successfully!');
      
      // Reset form after successful submission
      setFormData({
        name: '',
        description: '',
        logoUrl: '',
        applicationVideoUrl: '',
        supportingDocumentUrl: '',
        industry: 'tech',
        fundingNeeded: 10000,
        equityOffered: 10
      });
      
      // Redirect to dashboard after a short delay
      setTimeout(() => {
        navigate('/founder-dashboard');
      }, 2000);
      
    } catch (err) {
      setError(err.message || 'An error occurred while submitting your application');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white shadow-md rounded-lg">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">Startup Application</h2>
      
      {error && (
        <div className="mb-6 bg-red-50 border-l-4 border-red-500 p-4">
          <p className="text-red-700">{error}</p>
        </div>
      )}
      
      {success && (
        <div className="mb-6 bg-green-50 border-l-4 border-green-500 p-4">
          <p className="text-green-700">{success}</p>
        </div>
      )}
      
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700">Title/Company Name *</label>
          <input
            type="text"
            required
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            disabled={isLoading}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Description *</label>
          <textarea
            rows={4}
            required
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            disabled={isLoading}
            placeholder="Provide a detailed description of your startup idea, solution, and vision..."
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Logo URL *</label>
          <input
            type="url"
            required
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            value={formData.logoUrl}
            onChange={(e) => setFormData({ ...formData, logoUrl: e.target.value })}
            disabled={isLoading}
            placeholder="https://example.com/logo.png"
          />
          <p className="mt-1 text-sm text-gray-500">Provide a URL to your company logo image</p>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Application Video URL</label>
          <input
            type="url"
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            value={formData.applicationVideoUrl}
            onChange={(e) => setFormData({ ...formData, applicationVideoUrl: e.target.value })}
            disabled={isLoading}
            placeholder="https://youtube.com/watch?v=xxxx"
          />
          <p className="mt-1 text-sm text-gray-500">YouTube, Vimeo or other video hosting URL</p>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Supporting Document URL</label>
          <input
            type="url"
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            value={formData.supportingDocumentUrl}
            onChange={(e) => setFormData({ ...formData, supportingDocumentUrl: e.target.value })}
            disabled={isLoading}
            placeholder="https://drive.google.com/file/xxx or https://example.com/document.pdf"
          />
          <p className="mt-1 text-sm text-gray-500">Link to your business plan, pitch deck, or other supporting documents</p>
        </div>

        <div className="pt-4">
          <Button type="submit" disabled={isLoading} className="w-full">
            {isLoading ? 'Submitting...' : 'Submit Application'}
          </Button>
        </div>
      </form>
    </div>
  );
}

export default StartupForm;