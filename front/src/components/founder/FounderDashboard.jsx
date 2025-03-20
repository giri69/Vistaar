import React from 'react';
import { 
  BarChart3, 
  Users, 
  Clock, 
  Gift, 
  AlertCircle, 
  ArrowUpRight, 
  ChevronRight 
} from "lucide-react";

// Mock data that would come from the API
const founderProfileData = {
  name: "Alex Johnson",
  role: "Co-Founder & CEO",
  completed: 75,
  startups: [
    {
      id: "1",
      name: "TechVenture AI",
      status: "In Review",
      registrationProgress: 80,
      description: "AI-powered business intelligence platform",
      industry: "Artificial Intelligence",
      fundingStage: "Seed",
      fundingGoal: 500000,
      fundingRaised: 125000,
      pitchDeckUrl: "/documents/pitch-deck.pdf",
      equity: {
        founders: 80,
        platform: 2,
        available: 18
      },
      tasks: [
        { name: "Complete company registration", priority: "high", status: "pending" },
        { name: "Upload business plan", priority: "medium", status: "pending" },
        { name: "Review investor matches", priority: "low", status: "pending" }
      ],
      interestedInvestors: [
        { name: "Horizon Ventures", interest: "high", investmentRange: "$100K-$250K" },
        { name: "Tech Angels Group", interest: "medium", investmentRange: "$50K-$100K" },
        { name: "Future Capital", interest: "medium", investmentRange: "$200K-$500K" }
      ]
    }
  ]
};

const FounderDashboard = () => {
  const founderProfile = founderProfileData;
  const startup = founderProfile.startups[0];
  const fundingPercentage = Math.round((startup.fundingRaised / startup.fundingGoal) * 100);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 p-6 md:p-8">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <span className="bg-white text-slate-500 border border-slate-200 shadow-sm px-3 py-1 text-xs font-medium rounded-full">
                Dashboard
              </span>
              <span className="text-sm text-slate-500">•</span>
              <span className="bg-blue-50 text-blue-600 border-blue-100 px-3 py-1 text-xs font-medium rounded-full">
                {startup.status}
              </span>
            </div>
            <h1 className="text-3xl font-bold tracking-tight text-slate-800">Founder Dashboard</h1>
            <p className="text-slate-500 mt-1">{founderProfile.name} • {founderProfile.role}</p>
          </div>
          <button className="self-start md:self-center bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md text-sm font-medium flex items-center">
            Complete Profile <ArrowUpRight className="ml-2 h-4 w-4" />
          </button>
        </div>

        {/* Top row */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Startup Status Card */}
          <div className="bg-white border border-slate-200 shadow-sm hover:shadow-md transition-shadow rounded-lg overflow-hidden">
            <div className="p-5 border-b border-slate-100">
              <div className="flex items-center mb-1">
                <BarChart3 className="h-5 w-5 mr-2 text-blue-500" />
                <h2 className="text-xl font-semibold">Startup Status</h2>
              </div>
              <p className="text-sm text-slate-500">
                {startup.name} • {startup.industry}
              </p>
            </div>
            <div className="p-5 space-y-4">
              <div>
                <div className="flex justify-between mb-2">
                  <span className="text-sm text-slate-600">Registration Progress</span>
                  <span className="text-sm font-medium">{startup.registrationProgress}%</span>
                </div>
                <div className="w-full bg-slate-100 rounded-full h-2">
                  <div 
                    className="bg-blue-500 h-2 rounded-full" 
                    style={{ width: `${startup.registrationProgress}%` }}
                  ></div>
                </div>
              </div>
              <div>
                <div className="flex justify-between mb-2">
                  <span className="text-sm text-slate-600">Profile Completion</span>
                  <span className="text-sm font-medium">{founderProfile.completed}%</span>
                </div>
                <div className="w-full bg-slate-100 rounded-full h-2">
                  <div 
                    className="bg-blue-500 h-2 rounded-full" 
                    style={{ width: `${founderProfile.completed}%` }}
                  ></div>
                </div>
              </div>
              <div>
                <div className="flex justify-between mb-2">
                  <span className="text-sm text-slate-600">Funding Goal</span>
                  <span className="text-sm font-medium">${startup.fundingGoal.toLocaleString()}</span>
                </div>
                <div className="flex justify-between mb-2">
                  <span className="text-sm text-slate-600">Raised So Far</span>
                  <span className="text-sm font-semibold text-green-600">${startup.fundingRaised.toLocaleString()}</span>
                </div>
                <div className="w-full bg-slate-100 rounded-full h-2">
                  <div 
                    className="bg-blue-500 h-2 rounded-full" 
                    style={{ width: `${fundingPercentage}%` }}
                  ></div>
                </div>
                <p className="text-xs text-slate-500 mt-1">{fundingPercentage}% of funding goal</p>
              </div>
            </div>
            <div className="p-4 border-t border-slate-100">
              <button className="w-full text-blue-600 border border-slate-200 px-4 py-2 rounded-md text-sm font-medium flex items-center justify-center hover:bg-slate-50 transition-colors">
                View Details <ChevronRight className="h-4 w-4 ml-1" />
              </button>
            </div>
          </div>

          {/* Equity Distribution Card */}
          <div className="bg-white border border-slate-200 shadow-sm hover:shadow-md transition-shadow rounded-lg overflow-hidden">
            <div className="p-5 border-b border-slate-100">
              <div className="flex items-center mb-1">
                <Users className="h-5 w-5 mr-2 text-indigo-500" />
                <h2 className="text-xl font-semibold">Equity Distribution</h2>
              </div>
              <p className="text-sm text-slate-500">
                Current cap table overview
              </p>
            </div>
            <div className="p-5 space-y-4">
              <div>
                <div className="flex justify-between mb-1.5">
                  <span className="text-sm text-slate-600 flex items-center">
                    <span className="w-2 h-2 rounded-full bg-blue-500 mr-2"></span>
                    Founders
                  </span>
                  <span className="text-sm font-medium">{startup.equity.founders}%</span>
                </div>
                <div className="w-full bg-slate-100 rounded-full h-2">
                  <div 
                    className="bg-blue-500 h-2 rounded-full" 
                    style={{ width: `${startup.equity.founders}%` }}
                  ></div>
                </div>
              </div>
              <div>
                <div className="flex justify-between mb-1.5">
                  <span className="text-sm text-slate-600 flex items-center">
                    <span className="w-2 h-2 rounded-full bg-slate-400 mr-2"></span>
                    Platform
                  </span>
                  <span className="text-sm font-medium">{startup.equity.platform}%</span>
                </div>
                <div className="w-full bg-slate-100 rounded-full h-2">
                  <div 
                    className="bg-slate-400 h-2 rounded-full" 
                    style={{ width: `${startup.equity.platform}%` }}
                  ></div>
                </div>
              </div>
              <div>
                <div className="flex justify-between mb-1.5">
                  <span className="text-sm text-slate-600 flex items-center">
                    <span className="w-2 h-2 rounded-full bg-green-500 mr-2"></span>
                    Available for Investment
                  </span>
                  <span className="text-sm font-medium">{startup.equity.available}%</span>
                </div>
                <div className="w-full bg-slate-100 rounded-full h-2">
                  <div 
                    className="bg-green-500 h-2 rounded-full" 
                    style={{ width: `${startup.equity.available}%` }}
                  ></div>
                </div>
              </div>
            </div>
            <div className="p-4 border-t border-slate-100">
              <button className="w-full text-indigo-600 border border-slate-200 px-4 py-2 rounded-md text-sm font-medium flex items-center justify-center hover:bg-slate-50 transition-colors">
                Edit Cap Table <ChevronRight className="h-4 w-4 ml-1" />
              </button>
            </div>
          </div>

          {/* Pending Tasks Card */}
          <div className="bg-white border border-slate-200 shadow-sm hover:shadow-md transition-shadow rounded-lg overflow-hidden">
            <div className="p-5 border-b border-slate-100">
              <div className="flex items-center mb-1">
                <Clock className="h-5 w-5 mr-2 text-amber-500" />
                <h2 className="text-xl font-semibold">Pending Tasks</h2>
              </div>
              <p className="text-sm text-slate-500">
                Action items requiring attention
              </p>
            </div>
            <div className="p-5">
              <ul className="space-y-4">
                {startup.tasks.map((task, index) => (
                  <li key={index} className="flex items-start">
                    <span className={`w-3 h-3 rounded-full mt-1 mr-3 flex-shrink-0 ${
                      task.priority === 'high' ? 'bg-red-500' : 
                      task.priority === 'medium' ? 'bg-amber-500' : 'bg-green-500'
                    }`}></span>
                    <div>
                      <p className="text-sm font-medium text-slate-800">{task.name}</p>
                      <p className="text-xs text-slate-500 mt-0.5 capitalize">{task.priority} priority</p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
            <div className="p-4 border-t border-slate-100">
              <button className="w-full text-amber-600 border border-slate-200 px-4 py-2 rounded-md text-sm font-medium flex items-center justify-center hover:bg-slate-50 transition-colors">
                View All Tasks <ChevronRight className="h-4 w-4 ml-1" />
              </button>
            </div>
          </div>
        </div>

        {/* Bottom row */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Interested Investors Card */}
          <div className="bg-white border border-slate-200 shadow-sm hover:shadow-md transition-shadow rounded-lg overflow-hidden">
            <div className="p-5 border-b border-slate-100">
              <div className="flex items-center mb-1">
                <Gift className="h-5 w-5 mr-2 text-green-500" />
                <h2 className="text-xl font-semibold">Interested Investors</h2>
              </div>
              <p className="text-sm text-slate-500">
                Potential investors matched to your startup
              </p>
            </div>
            <div className="p-5">
              <div className="space-y-4">
                {startup.interestedInvestors.map((investor, index) => (
                  <div key={index} className="flex justify-between items-center p-3 bg-slate-50 rounded-lg hover:bg-slate-100 transition-colors">
                    <div>
                      <h4 className="text-sm font-medium text-slate-800">{investor.name}</h4>
                      <p className="text-xs text-slate-500">Investment: {investor.investmentRange}</p>
                    </div>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      investor.interest === 'high' 
                        ? 'bg-green-100 text-green-700' 
                        : 'bg-amber-100 text-amber-700'
                    }`}>
                      {investor.interest === 'high' ? 'High Interest' : 'Medium Interest'}
                    </span>
                  </div>
                ))}
              </div>
            </div>
            <div className="p-4 border-t border-slate-100">
              <button className="w-full text-green-600 border border-slate-200 px-4 py-2 rounded-md text-sm font-medium flex items-center justify-center hover:bg-slate-50 transition-colors">
                View All Investors <ChevronRight className="h-4 w-4 ml-1" />
              </button>
            </div>
          </div>

          {/* Startup Info Card */}
          <div className="bg-white border border-slate-200 shadow-sm hover:shadow-md transition-shadow rounded-lg overflow-hidden">
            <div className="p-5 border-b border-slate-100">
              <div className="flex items-center mb-1">
                <AlertCircle className="h-5 w-5 mr-2 text-purple-500" />
                <h2 className="text-xl font-semibold">Startup Information</h2>
              </div>
              <p className="text-sm text-slate-500">
                Key details about your venture
              </p>
            </div>
            <div className="p-5">
              <div className="space-y-3">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-xs text-slate-500">Startup Name</p>
                    <p className="text-sm font-medium">{startup.name}</p>
                  </div>
                  <div>
                    <p className="text-xs text-slate-500">Industry</p>
                    <p className="text-sm font-medium">{startup.industry}</p>
                  </div>
                  <div>
                    <p className="text-xs text-slate-500">Funding Stage</p>
                    <p className="text-sm font-medium">{startup.fundingStage}</p>
                  </div>
                  <div>
                    <p className="text-xs text-slate-500">Funding Goal</p>
                    <p className="text-sm font-medium">${startup.fundingGoal.toLocaleString()}</p>
                  </div>
                </div>
                
                <div className="mt-4">
                  <p className="text-xs text-slate-500 mb-1">Description</p>
                  <p className="text-sm">{startup.description}</p>
                </div>
                
                <div className="mt-4">
                  <p className="text-xs text-slate-500">Pitch Deck</p>
                  <a href={startup.pitchDeckUrl} target="_blank" className="text-sm text-blue-600 hover:text-blue-700">
                    View Pitch Deck
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FounderDashboard;
