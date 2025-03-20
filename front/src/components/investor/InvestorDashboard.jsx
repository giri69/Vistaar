import React, { useEffect, useState } from 'react';

// Custom ScrollArea component implementation
const ScrollArea = ({ children, className }) => {
  return (
    <div className={`overflow-auto max-h-[600px] ${className || ""}`}>
      {children}
    </div>
  );
};

// Custom AspectRatio component implementation
const AspectRatio = ({ children, ratio = 16 / 9, className = "" }) => {
  return (
    <div className={`relative w-full ${className}`} style={{ paddingBottom: `${(1 / ratio) * 100}%` }}>
      <div className="absolute inset-0">
        {children}
      </div>
    </div>
  );
};

const InvestorDashboard = () => {
  const [availableStartups, setAvailableStartups] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedStartup, setSelectedStartup] = useState(null);
  const [authError, setAuthError] = useState(null);

  // Fetch available startups from API with JWT token
  useEffect(() => {
    const fetchAvailableStartups = async () => {
      try {
        setLoading(true);
        
        // Get JWT token from localStorage
        const token = localStorage.getItem('token');
        
        if (!token) {
          setAuthError('Authentication token not found. Please log in again.');
          setLoading(false);
          return;
        } 
        const response = await fetch('http://localhost:5030/api/investors/startups/available', {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        });
        
        if (response.status === 401) {
          setAuthError('Your session has expired. Please log in again.');
          setLoading(false);
          return;
        }
        
        const result = await response.json();
        
        if (result.success && result.data && result.data.startups) {
          setAvailableStartups(result.data.startups);
        } else {
          throw new Error(result.message || 'Failed to fetch startup data');
        }
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchAvailableStartups();
  }, []);

  // Function to open the startup details popup
  const openStartupDetails = (startup) => {
    setSelectedStartup(startup);
  };

  // Function to close the startup details popup
  const closeStartupDetails = () => {
    setSelectedStartup(null);
  };

  // Function to handle applying for a startup with JWT authentication
  const handleApply = async (startupId) => {
    try {
      const token = localStorage.getItem('jwtToken');
      
      if (!token) {
        setAuthError('Authentication token not found. Please log in again.');
        return;
      }
      
      // Example API call to apply for investment
      const response = await fetch(`http://localhost:5030/api/investors/startups/${startupId}/apply`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });
      
      if (response.status === 401) {
        setAuthError('Your session has expired. Please log in again.');
        return;
      }
      
      const result = await response.json();
      
      if (result.success) {
        // Handle successful application
        console.log(`Successfully applied for startup with ID: ${startupId}`);
        closeStartupDetails();
      } else {
        throw new Error(result.message || 'Failed to apply');
      }
    } catch (err) {
      console.error('Error applying for startup:', err);
      alert(`Error: ${err.message}`);
    }
  };

  return (
    <div className="w-full max-w-7xl mx-auto p-6 bg-gray-50">
      {authError && (
        <div className="mb-4 p-4 bg-red-100 border border-red-400 text-red-700 rounded-lg">
          <p>{authError}</p>
          <button 
            className="mt-2 underline text-red-700 hover:text-red-800"
            onClick={() => {
              // Redirect to login page or refresh token
              window.location.href = '/login';
            }}
          >
            Return to login
          </button>
        </div>
      )}

      <div className="mb-10">
        <div className="flex flex-col mb-6">
          <h1 className="text-3xl font-bold text-gray-900">
            Investment Portfolio
          </h1>
          <h2 className="text-xl text-gray-700">
            Investor Dashboard
          </h2>
          <p className="mt-2 text-gray-600">
            Monitor your investments and discover new opportunities
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Fixed Portfolio Overview Card */}
          <div className="lg:col-span-1 bg-white rounded-xl shadow-md p-6 h-fit">
            <div className="mb-4">
              <h3 className="text-lg font-semibold text-gray-800">
                Portfolio Overview
              </h3>
            </div>
            <div className="space-y-6">
              <div className="border-b pb-4">
                <p className="text-sm text-gray-600">
                  Active Investments
                </p>
                <div className="flex justify-between items-end mt-1">
                  <p className="text-2xl font-bold">
                    5
                  </p>
                  <span className="text-xs text-green-600">+2 this month</span>
                </div>
              </div>
              <div className="border-b pb-4">
                <p className="text-sm text-gray-600">
                  Total Invested
                </p>
                <div className="flex justify-between items-end mt-1">
                  <p className="text-2xl font-bold">
                    $250,000
                  </p>
                  <span className="text-xs text-green-600">+12.4%</span>
                </div>
              </div>
              <div className="pb-2">
                <p className="text-sm text-gray-600">
                  Portfolio Performance
                </p>
                <div className="flex justify-between items-end mt-1">
                  <p className="text-2xl font-bold">
                    18.7%
                  </p>
                  <span className="text-xs text-green-600">+3.2% YTD</span>
                </div>
              </div>
            </div>
          </div>

          {/* Scrollable Available Opportunities Section */}
          <div className="lg:col-span-3">
            <div className="mb-4 flex justify-between items-center">
              <h3 className="text-lg font-semibold text-gray-800">Available Opportunities</h3>
            </div>
            
            <ScrollArea className="pb-4">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {loading ? (
                  <div className="col-span-full flex justify-center p-8">
                    <p>Loading available startups...</p>
                  </div>
                ) : error ? (
                  <div className="col-span-full flex justify-center p-8 text-red-500">
                    <p>Error: {error}</p>
                  </div>
                ) : availableStartups.length === 0 ? (
                  <div className="col-span-full flex justify-center p-8">
                    <p>No startups available at the moment.</p>
                  </div>
                ) : (
                  availableStartups.map((startup) => (
                    <div 
                      key={startup._id} 
                      className="bg-white rounded-xl shadow-sm overflow-hidden flex flex-col cursor-pointer transition-transform hover:shadow-md"
                      onClick={() => openStartupDetails(startup)}
                    >
                      <div className="relative">
                        <AspectRatio ratio={16/9}>
                          {startup.pitchMaterials && startup.pitchMaterials.find(m => m.type === 'logo') ? (
                            <img
                              src={startup.pitchMaterials.find(m => m.type === 'logo').url}
                              alt={`${startup.name} logo`}
                              className="w-full h-full object-cover transition-transform duration-300"
                              onMouseOver={(e) => e.currentTarget.classList.add('scale-105')}
                              onMouseOut={(e) => e.currentTarget.classList.remove('scale-105')}
                            />
                          ) : (
                            <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                              <p className="text-gray-500">No image available</p>
                            </div>
                          )}
                        </AspectRatio>
                        <div className="absolute top-3 right-3">
                          <span 
                            className="px-2 py-1 text-xs font-medium rounded-full text-white"
                            style={{ backgroundColor: "#06c" }}
                          >
                            {startup.industry || "Tech"}
                          </span>
                        </div>
                      </div>

                      <div className="p-4 flex-grow">
                        <div className="mb-3">
                          <h4 className="text-lg font-semibold line-clamp-1 mb-1">
                            {startup.name}
                          </h4>
                          <p className="text-sm text-gray-600">
                            {startup.industry || "Technology"}
                          </p>
                        </div>

                        <p className="text-sm text-gray-700 line-clamp-3 mb-4">
                          {startup.description}
                        </p>
                        
                        <div className="mb-4">
                          <div className="flex justify-between text-sm mb-1">
                            <span>Funding Goal: ${startup.fundingNeeded.toLocaleString()}</span>
                            <span>Equity: {startup.equityOffered}%</span>
                          </div>
                        </div>
                        
                        <button 
                          className="w-full py-2 px-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                          onClick={(e) => {
                            e.stopPropagation();
                            openStartupDetails(startup);
                          }}
                        >
                          View Opportunity
                        </button>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </ScrollArea>
          </div>
        </div>
      </div>

      {/* Startup Details Popup */}
      {selectedStartup && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl max-w-2xl w-full max-h-[90vh] overflow-auto">
            <div className="p-6">
              <div className="flex justify-between items-start mb-4">
                <h3 className="text-xl font-bold">{selectedStartup.name}</h3>
                <button 
                  onClick={(e) => {
                    e.stopPropagation();
                    closeStartupDetails();
                  }}
                  className="text-gray-500 hover:text-gray-700 p-2"
                >
                  ✕
                </button>
              </div>
              
              {selectedStartup.pitchMaterials && selectedStartup.pitchMaterials.find(m => m.type === 'logo') && (
                <div className="mb-4">
                  <img 
                    src={selectedStartup.pitchMaterials.find(m => m.type === 'logo').url} 
                    alt={`${selectedStartup.name} logo`}
                    className="w-full h-48 object-contain"
                  />
                </div>
              )}
              
              <div className="mb-4">
                <p className="font-semibold text-gray-700">Industry:</p>
                <p className="text-gray-900">{selectedStartup.industry || "Not specified"}</p>
              </div>
              
              <div className="mb-4">
                <p className="font-semibold text-gray-700">Description:</p>
                <p className="whitespace-pre-line text-gray-900">{selectedStartup.description}</p>
              </div>
              
              <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="bg-gray-50 p-3 rounded">
                  <p className="font-semibold text-gray-700">Funding Needed:</p>
                  <p className="text-gray-900">${selectedStartup.fundingNeeded.toLocaleString()}</p>
                </div>
                <div className="bg-gray-50 p-3 rounded">
                  <p className="font-semibold text-gray-700">Equity Offered:</p>
                  <p className="text-gray-900">{selectedStartup.equityOffered}%</p>
                </div>
              </div>
              
              <div className="flex justify-end space-x-4">
                <button 
                  onClick={(e) => {
                    e.stopPropagation();
                    closeStartupDetails();
                  }}
                  className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-100 transition-colors"
                >
                  Close
                </button>
                <button 
                  onClick={(e) => {
                    e.stopPropagation();
                    handleApply(selectedStartup._id);
                  }}
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Apply to Invest
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default InvestorDashboard;