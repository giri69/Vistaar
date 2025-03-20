import React, { useState } from 'react';

const InvestorDashboardPage = () => {
  const [activeTab, setActiveTab] = useState('overview');
  
  // Hardcoded data
  const investorData = {
    name: "Sarah Johnson",
    expertise: "Technology",
    totalInvestments: 3,
    availableFunds: "$250,000",
    portfolioValue: "$320,000",
    startups: [
      {
        id: 1,
        name: "EcoSolutions",
        industry: "CleanTech",
        stage: "Early Stage",
        investment: "$50,000",
        equity: "5%",
        status: "Active"
      },
      {
        id: 2,
        name: "FinAssist",
        industry: "FinTech",
        stage: "Growth",
        investment: "$75,000",
        equity: "8%",
        status: "Active"
      }
    ],
    opportunities: [
      {
        id: 1,
        name: "MediSync",
        industry: "HealthTech",
        stage: "MVP Ready",
        seeking: "$150,000",
        equityOffered: "12%",
        match: "High"
      },
      {
        id: 2,
        name: "EduLearn",
        industry: "EdTech",
        stage: "Early Stage",
        seeking: "$80,000",
        equityOffered: "10%",
        match: "Medium"
      },
      {
        id: 3,
        name: "LogiTech",
        industry: "Logistics",
        stage: "Idea Stage",
        seeking: "$50,000",
        equityOffered: "15%",
        match: "Low"
      }
    ]
  };
  
  return (
    <div>
      <h1>Investor Dashboard</h1>
      
      <div>
        <button onClick={() => setActiveTab('overview')}>Overview</button>
        <button onClick={() => setActiveTab('portfolio')}>Portfolio</button>
        <button onClick={() => setActiveTab('opportunities')}>Opportunities</button>
      </div>
      
      {activeTab === 'overview' && (
        <div>
          <h2>Overview</h2>
          
          <div>
            <div>
              <h3>Investment Summary</h3>
              <p>Total Investments: {investorData.totalInvestments}</p>
              <p>Available Funds: {investorData.availableFunds}</p>
              <p>Portfolio Value: {investorData.portfolioValue}</p>
            </div>
            
            <div>
              <h3>Recent Opportunities</h3>
              <ul>
                {investorData.opportunities.slice(0, 2).map(opportunity => (
                  <li key={opportunity.id}>
                    {opportunity.name} - {opportunity.industry} - Seeking {opportunity.seeking}
                  </li>
                ))}
              </ul>
              <button>View All</button>
            </div>
          </div>
        </div>
      )}
      
      {activeTab === 'portfolio' && (
        <div>
          <h2>My Portfolio</h2>
          
          {investorData.startups.map(startup => (
            <div key={startup.id}>
              <h3>{startup.name}</h3>
              <p>Industry: {startup.industry}</p>
              <p>Stage: {startup.stage}</p>
              <p>Investment: {startup.investment}</p>
              <p>Equity: {startup.equity}</p>
              <p>Status: {startup.status}</p>
              <button>View Details</button>
            </div>
          ))}
        </div>
      )}
      
      {activeTab === 'opportunities' && (
        <div>
          <h2>Investment Opportunities</h2>
          
          <div>
            <label>Filter By:</label>
            <select>
              <option value="">All Industries</option>
              <option value="cleantech">CleanTech</option>
              <option value="fintech">FinTech</option>
              <option value="healthtech">HealthTech</option>
              <option value="edtech">EdTech</option>
            </select>
            
            <select>
              <option value="">All Stages</option>
              <option value="idea">Idea Stage</option>
              <option value="early">Early Stage</option>
              <option value="mvp">MVP Ready</option>
              <option value="growth">Growth Stage</option>
            </select>
          </div>
          
          {investorData.opportunities.map(opportunity => (
            <div key={opportunity.id}>
              <h3>{opportunity.name}</h3>
              <p>Industry: {opportunity.industry}</p>
              <p>Stage: {opportunity.stage}</p>
              <p>Seeking: {opportunity.seeking}</p>
              <p>Equity Offered: {opportunity.equityOffered}</p>
              <p>Match: {opportunity.match}</p>
              <div>
                <button>View Details</button>
                <button>Express Interest</button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default InvestorDashboardPage;