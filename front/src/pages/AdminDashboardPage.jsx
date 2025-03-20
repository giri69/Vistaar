import React, { useState } from 'react';

const AdminDashboardPage = () => {
  const [activeTab, setActiveTab] = useState('overview');
  
  // Hardcoded data
  const adminData = {
    stats: {
      totalStartups: 35,
      pendingApprovals: 8,
      totalInvestors: 42,
      pendingVerifications: 5,
      completedDeals: 12
    },
    startupApprovals: [
      {
        id: 1,
        name: "CloudStore",
        industry: "Technology",
        founderName: "David Peterson",
        submissionDate: "2025-03-15",
        status: "Pending"
      },
      {
        id: 2,
        name: "GreenGrow",
        industry: "Agriculture",
        founderName: "Maria Lopez",
        submissionDate: "2025-03-14",
        status: "Pending"
      },
      {
        id: 3,
        name: "HealthTrack",
        industry: "Healthcare",
        founderName: "James Wilson",
        submissionDate: "2025-03-12",
        status: "Pending"
      }
    ],
    investorVerifications: [
      {
        id: 1,
        name: "Robert Chen",
        expertise: "Finance",
        submissionDate: "2025-03-16",
        creditScore: "Excellent",
        status: "Pending"
      },
      {
        id: 2,
        name: "Linda Brown",
        expertise: "Marketing",
        submissionDate: "2025-03-15",
        creditScore: "Good",
        status: "Pending"
      }
    ]
  };
  
  return (
    <div>
      <h1>Admin Dashboard</h1>
      
      <div>
        <button onClick={() => setActiveTab('overview')}>Overview</button>
        <button onClick={() => setActiveTab('startups')}>Startup Approvals</button>
        <button onClick={() => setActiveTab('investors')}>Investor Verifications</button>
        <button onClick={() => setActiveTab('paperwork')}>Paperwork Management</button>
      </div>
      
      {activeTab === 'overview' && (
        <div>
          <h2>Platform Overview</h2>
          
          <div>
            <div>
              <h3>Statistics</h3>
              <p>Total Startups: {adminData.stats.totalStartups}</p>
              <p>Pending Approvals: {adminData.stats.pendingApprovals}</p>
              <p>Total Investors: {adminData.stats.totalInvestors}</p>
              <p>Pending Verifications: {adminData.stats.pendingVerifications}</p>
              <p>Completed Deals: {adminData.stats.completedDeals}</p>
            </div>
            
            <div>
              <h3>Recent Activity</h3>
              <ul>
                <li>New startup submission: CloudStore</li>
                <li>New investor registration: Robert Chen</li>
                <li>Deal completed: EcoSolutions & Sarah Johnson</li>
              </ul>
            </div>
          </div>
        </div>
      )}
      
      {activeTab === 'startups' && (
        <div>
          <h2>Startup Approvals</h2>
          
          {adminData.startupApprovals.map(startup => (
            <div key={startup.id}>
              <h3>{startup.name}</h3>
              <p>Industry: {startup.industry}</p>
              <p>Founder: {startup.founderName}</p>
              <p>Submitted: {startup.submissionDate}</p>
              <p>Status: {startup.status}</p>
              <div>
                <button>View Details</button>
                <button>Approve</button>
                <button>Reject</button>
              </div>
            </div>
          ))}
        </div>
      )}
      
      {activeTab === 'investors' && (
        <div>
          <h2>Investor Verifications</h2>
          
          {adminData.investorVerifications.map(investor => (
            <div key={investor.id}>
              <h3>{investor.name}</h3>
              <p>Expertise: {investor.expertise}</p>
              <p>Submitted: {investor.submissionDate}</p>
              <p>Credit Score: {investor.creditScore}</p>
              <p>Status: {investor.status}</p>
              <div>
                <button>View Details</button>
                <button>Verify</button>
                <button>Reject</button>
              </div>
            </div>
          ))}
        </div>
      )}
      
      {activeTab === 'paperwork' && (
        <div>
          <h2>Paperwork Management</h2>
          
          <h3>Templates</h3>
          <ul>
            <li>Company Registration Template</li>
            <li>Equity Distribution Agreement</li>
            <li>Investor Agreement</li>
            <li>Non-Disclosure Agreement</li>
          </ul>
          
          <h3>Pending Paperwork</h3>
          <ul>
            <li>EcoSolutions - Equity Distribution - Needs Review</li>
            <li>CloudStore - Company Registration - Pending</li>
            <li>FinAssist - Investor Agreement - Needs Signature</li>
          </ul>
        </div>
      )}
    </div>
  );
};

export default AdminDashboardPage;