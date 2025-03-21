import React, { useRef, useState } from 'react';

// Custom ScrollArea component implementation
const ScrollArea = ({ children, className }) => {
  return (
    <div className={`overflow-auto ${className}`}>
      {children}
    </div>
  );
};

// Custom AspectRatio component implementation
const AspectRatio = ({ children, ratio = 16 / 9, className = "" }) => {
  return (
    <div className={`relative ${className}`} style={{ paddingBottom: `${(1 / ratio) * 100}%` }}>
      <div className="absolute inset-0">
        {children}
      </div>
    </div>
  );
};

const InvestorDashboard = () => {
  // Mock data for opportunities
  const opportunities = [
    {
      id: 1,
      name: "TechStart Inc.",
      category: "AI/ML Platform",
      tag: "High Growth",
      tagColor: "#06c",
      videoUrl: "https://storage.googleapis.com/coverr-main/mp4/Mt_Baker.mp4",
      description: "Revolutionizing AI solutions for businesses with innovative machine learning algorithms.",
      fundingGoal: "$2.5M",
      raised: "$1.8M",
      progress: 72
    },
    {
      id: 2,
      name: "GreenEnergy Solutions",
      category: "Clean Tech",
      tag: "Sustainable",
      tagColor: "#35c759",
      videoUrl: "https://storage.googleapis.com/coverr-main/mp4/Footprints_In_The_Sand.mp4",
      description: "Developing renewable energy technologies to reduce carbon footprint and promote sustainability.",
      fundingGoal: "$4M",
      raised: "$2.2M",
      progress: 55
    },
    {
      id: 3,
      name: "HealthTech Pro",
      category: "Health & Wellness",
      tag: "Growing",
      tagColor: "#ff9f0a",
      videoUrl: "https://storage.googleapis.com/coverr-main/mp4/Swimming.mp4",
      description: "Building next-generation healthcare solutions for remote patient monitoring and diagnostics.",
      fundingGoal: "$3M",
      raised: "$1.5M",
      progress: 50
    },
    {
      id: 4,
      name: "FinTech Innovators",
      category: "Financial Technology",
      tag: "Promising",
      tagColor: "#5856d6",
      videoUrl: "https://storage.googleapis.com/coverr-main/mp4/Sea.mp4",
      description: "Creating secure blockchain solutions for financial transactions and digital asset management.",
      fundingGoal: "$5M",
      raised: "$2.8M",
      progress: 56
    },
    {
      id: 5,
      name: "Smart Home Systems",
      category: "IoT & Smart Devices",
      tag: "Innovative",
      tagColor: "#ef4444",
      videoUrl: "https://storage.googleapis.com/coverr-main/mp4/Coventry_Cathedral.mp4",
      description: "Developing integrated smart home solutions that enhance quality of life and energy efficiency.",
      fundingGoal: "$1.8M",
      raised: "$1.2M",
      progress: 67
    }
  ];

  return (
    <div className="min-h-screen bg-[#f5f5f7] p-8 font-sans">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <span className="inline-block px-4 py-1 rounded-full bg-[#e8e8ed] text-[#86868b] text-sm font-medium mb-4 animate-fade-in">
            Investment Portfolio
          </span>
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-[#1d1d1f] mb-4 animate-fade-in">
            Investor Dashboard
          </h1>
          <p className="text-[#86868b] max-w-2xl mx-auto text-lg animate-fade-in">
            Monitor your investments and discover new opportunities
          </p>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Fixed Portfolio Overview Card */}
          <div className="lg:w-1/4 lg:sticky lg:top-8 lg:self-start backdrop-blur-sm bg-white/80 rounded-3xl p-8 shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-[#e8e8ed] transition-all duration-300 hover:shadow-[0_12px_40px_rgb(0,0,0,0.08)] overflow-hidden relative animate-fade-in">
            <div className="absolute -right-6 -top-6 w-24 h-24 rounded-full bg-gradient-to-br from-[#fafafa] to-[#f0f0f0] blur-2xl opacity-60"></div>
            <h2 className="text-xl font-semibold mb-6 text-[#1d1d1f] relative z-10">Portfolio Overview</h2>
            <div className="space-y-8 relative z-10">
              <div className="bg-[#f5f5f7] rounded-2xl p-5 transition-transform duration-300 hover:translate-y-[-2px]">
                <p className="text-sm font-medium text-[#86868b]">Active Investments</p>
                <div className="flex items-end mt-1">
                  <p className="text-3xl font-bold text-[#1d1d1f]">5</p>
                  <span className="ml-2 text-[#06c] text-sm font-medium">+2 this month</span>
                </div>
              </div>
              <div className="bg-[#f5f5f7] rounded-2xl p-5 transition-transform duration-300 hover:translate-y-[-2px]">
                <p className="text-sm font-medium text-[#86868b]">Total Invested</p>
                <div className="flex items-end mt-1">
                  <p className="text-3xl font-bold text-[#1d1d1f]">$250,000</p>
                  <span className="ml-2 text-[#06c] text-sm font-medium">+12.4%</span>
                </div>
              </div>
              <div className="bg-[#f5f5f7] rounded-2xl p-5 transition-transform duration-300 hover:translate-y-[-2px]">
                <p className="text-sm font-medium text-[#86868b]">Portfolio Performance</p>
                <div className="flex items-end mt-1">
                  <p className="text-3xl font-bold text-[#1d1d1f]">18.7%</p>
                  <span className="ml-2 text-green-500 text-sm font-medium">+3.2% YTD</span>
                </div>
              </div>
            </div>
          </div>

          {/* Scrollable Available Opportunities Section */}
          <div className="lg:w-3/4 animate-fade-in">
            <div className="backdrop-blur-sm bg-white/80 rounded-3xl p-8 shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-[#e8e8ed]">
              <h2 className="text-xl font-semibold mb-6 text-[#1d1d1f]">Available Opportunities</h2>

              <ScrollArea className="h-[70vh] pr-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                  {opportunities.map((opportunity) => (
                    <div key={opportunity.id} className="bg-[#f5f5f7] rounded-2xl overflow-hidden border border-[#e8e8ed] transition-all duration-300 hover:shadow-lg group">
                      <div className="relative">
                        <AspectRatio ratio={16 / 9} className="bg-gray-100">
                          <video
                            className="w-full h-full object-cover"
                            src={opportunity.videoUrl}
                            muted
                            loop
                            onMouseOver={(e) => e.currentTarget.play()}
                            onMouseOut={(e) => {
                              e.currentTarget.pause();
                              e.currentTarget.currentTime = 0;
                            }}
                          />
                        </AspectRatio>
                        <div className="absolute top-4 right-4">
                          <span
                            className="text-xs font-medium text-white px-3 py-1.5 rounded-full"
                            style={{ backgroundColor: opportunity.tagColor }}
                          >
                            {opportunity.tag}
                          </span>
                        </div>
                      </div>

                      <div className="p-6">
                        <div className="flex justify-between items-start mb-2">
                          <div>
                            <h3 className="font-semibold text-lg text-[#1d1d1f]">{opportunity.name}</h3>
                            <p className="text-sm text-[#86868b]">{opportunity.category}</p>
                          </div>
                        </div>

                        <p className="text-[#1d1d1f] text-sm my-4">{opportunity.description}</p>

                        <button className="w-full py-3 rounded-full text-white font-medium transition-colors duration-300" style={{ backgroundColor: opportunity.tagColor }}>
                          View Opportunity
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </ScrollArea>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InvestorDashboard;
