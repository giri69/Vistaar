import React, { useState } from 'react';

const FounderDashboardPage = () => {
  const [activeTab, setActiveTab] = useState('overview');
  
  // Hardcoded data
  const founderData = {
    name: "John Smith",
    startupName: "EcoSolutions",
    startupStage: "Early Stage",
    equity: {
      founder: 80,
      platform: 2,
      investors: 18
    },
    paperworkStatus: "In Progress",
    completedSteps: 3,
    totalSteps: 5,
    investorMatches: [
      {
        id: 1,
        name: "Sarah Johnson",
        type: "Angel Investor",
        expertise: "Technology",
        interest: "High",
        offered: "$50,000 for 5% equity",
        status: "Pending"
      },
      {
        id: 2,
        name: "Michael Chen",
        type: "Industry Expert",
        expertise: "Cleantech",
        interest: "Medium",
        offered: "Mentorship & Connections for 2% equity",
        status: "Accepted"
      }
    ],
    tasks: [
      { id: 1, title: "Complete company registration", status: "completed" },
      { id: 2, title: "Upload business plan", status: "completed" },
      { id: 3, title: "Specify equity distribution", status: "in-progress" },
      { id: 4, title: "Review legal documents", status: "pending" }
    ]
  };
  
  return (
    <div>
      <h1>Founder Dashboard</h1>
      
      <div>
        <button onClick={() => setActiveTab('overview')}>Overview</button>
        <button onClick={() => setActiveTab('startup')}>Startup Info</button>
        <button onClick={() => setActiveTab('paperwork')}>Paperwork</button>
        <button onClick={() => setActiveTab('investors')}>Investors</button>
      </div>
      
      {activeTab === 'overview' && (
        <div>
          <h2>Overview</h2>
          <div>
            <div>
              <h3>Startup Status</h3>
              <p>Name: {founderData.startupName}</p>
              <p>Stage: {founderData.startupStage}</p>
              <p>Paperwork: {founderData.paperworkStatus}</p>
            </div>
            
            <div>
              <h3>Equity Distribution</h3>
              <p>Founder: {founderData.equity.founder}%</p>
              <p>Platform: {founderData.equity.platform}%</p>
              <p>Investors: {founderData.equity.investors}%</p>
            </div>
            
            <div>
              <h3>Tasks</h3>
              <ul>
                {founderData.tasks.map(task => (
                  <li key={task.id}>
                    {task.title} - {task.status}
                  </li>
                ))}
              </ul>
            </div>
          </div>
          
          <div>
            <h3>Investor Matches</h3>
            <ul>
              {founderData.investorMatches.map(investor => (
                <li key={investor.id}>
                  {investor.name} - {investor.type} - {investor.status}
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
      
      {activeTab === 'startup' && (
        <div>
          <h2>Startup Information</h2>
          <form>
            <div>
              <label>Startup Name</label>
              <input type="text" defaultValue={founderData.startupName} />
            </div>
            
            <div>
              <label>Industry</label>
              <select defaultValue="cleantech">
                <option value="cleantech">CleanTech</option>
                <option value="fintech">FinTech</option>
                <option value="healthtech">HealthTech</option>
                <option value="edtech">EdTech</option>
              </select>
            </div>
            
            <div>
              <label>Elevator Pitch</label>
              <textarea defaultValue="EcoSolutions provides sustainable packaging alternatives" />
            </div>
            
            <div>
              <label>Development Stage</label>
              <select defaultValue="early">
                <option value="idea">Idea Stage</option>
                <option value="early">Early Stage</option>
                <option value="mvp">MVP Ready</option>
                <option value="growth">Growth Stage</option>
              </select>
            </div>
            
            <button type="submit">Save Information</button>
          </form>
        </div>
      )}
      
      {activeTab === 'paperwork' && (
        <div>
          <h2>Paperwork Status</h2>
          <p>Completed: {founderData.completedSteps} of {founderData.totalSteps} steps</p>
          
          <ul>
            <li>Company Registration - Completed</li>
            <li>Business Plan Submission - Completed</li>
            <li>Equity Distribution Agreement - In Progress</li>
            <li>Legal Document Review - Pending</li>
            <li>Investor Agreements - Pending</li>
          </ul>
        </div>
      )}
      
      {activeTab === 'investors' && (
        <div>
          <h2>Investor Matches</h2>
          
          {founderData.investorMatches.map(investor => (
            <div key={investor.id}>
              <h3>{investor.name}</h3>
              <p>Type: {investor.type}</p>
              <p>Expertise: {investor.expertise}</p>
              <p>Offered: {investor.offered}</p>
              <p>Status: {investor.status}</p>
              
              {investor.status === 'Pending' && (
                <div>
                  <button>Accept</button>
                  <button>Decline</button>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default FounderDashboardPage;