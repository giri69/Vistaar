import React from 'react';
import { FileText, Users, Shield, BarChart, Network, TrendingUp, Sparkles } from 'lucide-react';

function Benefits() {
  const benefits = [
    {
      title: 'Streamlined Paperwork',
      description: 'We handle all legal and operational formalities, automating the process to save you time and resources.',
      icon: FileText,
      gradient: 'from-indigo-500 to-blue-500',
      delay: 0
    },
    {
      title: 'Open Investment Model',
      description: 'Anyone with valuable experience, connections, or capital can become a startup investor, not just VCs.',
      icon: Users,
      gradient: 'from-blue-500 to-cyan-500',
      delay: 100
    },
    {
      title: 'Investor Security',
      description: 'We retain a 2% stake to ensure startups stay committed to the process, reducing investment risk.',
      icon: Shield,
      gradient: 'from-cyan-500 to-teal-500',
      delay: 200
    },
    {
      title: 'Equity-Based Exchange',
      description: 'Exchange equity for mentorship, connections, and funding in a transparent and fair model.',
      icon: BarChart,
      gradient: 'from-teal-500 to-emerald-500',
      delay: 300
    },
    {
      title: 'Expert Network',
      description: 'Connect with legal, marketing, and industry specialists who can help grow your startup.',
      icon: Network,
      gradient: 'from-emerald-500 to-indigo-500',
      delay: 400
    },
    {
      title: 'Growth Potential',
      description: 'Get the right support at the earliest stages to position your startup for future success.',
      icon: TrendingUp,
      gradient: 'from-indigo-500 to-purple-500',
      delay: 500
    }
  ];

  return (
    <div className="py-24 relative overflow-hidden" id="benefits">
      {/* Background elements */}
      <div className="absolute inset-0 -z-10 bg-gradient-to-b from-purple-50 via-white to-indigo-50"></div>
      <div className="absolute top-1/3 right-0 w-80 h-80 blur-shape bg-indigo-200/30 rounded-full transform translate-x-1/3"></div>
      <div className="absolute bottom-1/3 left-0 w-80 h-80 blur-shape bg-purple-200/30 rounded-full transform -translate-x-1/3"></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="lg:text-center mb-16 reveal">
          <div className="inline-flex items-center backdrop-blur-sm bg-white/70 rounded-full px-4 py-1.5 mb-4 border border-indigo-100 shadow-lg">
            <Sparkles className="h-4 w-4 text-indigo-600 mr-2 animate-pulse" />
            <span className="text-indigo-600 font-medium text-sm">
              Platform Benefits
            </span>
          </div>
          <h2 className="mt-2 text-3xl font-bold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 sm:text-4xl">
            Why Choose fundmentorship
          </h2>
          <p className="mt-4 max-w-2xl mx-auto text-xl text-gray-600 leading-relaxed">
            Our platform removes barriers and simplifies the process, ensuring that promising ideas get the right support to become successful businesses
          </p>
        </div>

        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {benefits.map((benefit, index) => (
            <div key={benefit.title} className={`reveal delay-${benefit.delay}`}>
              <div className="group h-full backdrop-blur-sm bg-white/60 p-6 rounded-2xl border border-white/50 shadow-xl transition-all duration-300 hover:shadow-lg hover:bg-white/70 relative overflow-hidden">
                <div className={`absolute -right-8 -bottom-8 w-24 h-24 rounded-full bg-gradient-to-r ${benefit.gradient} opacity-10 group-hover:opacity-20 transition-opacity duration-300`}></div>
                <div className="flex items-center mb-4 relative">
                  <div className={`p-2 rounded-lg text-white mr-4 bg-gradient-to-r ${benefit.gradient}`}>
                    <benefit.icon className="h-5 w-5" />
                  </div>
                  <h3 className="text-lg font-semibold text-transparent bg-clip-text bg-gradient-to-r from-gray-800 to-gray-600">{benefit.title}</h3>
                </div>
                <p className="text-gray-600 leading-relaxed relative z-10">{benefit.description}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-24 reveal">
          <div className="relative rounded-2xl overflow-hidden shadow-2xl">
            <div className="absolute -inset-1 bg-gradient-to-r from-indigo-500 to-purple-500 opacity-20 blur-xl"></div>
            <div className="relative backdrop-blur-sm bg-white/60 p-8 sm:p-12 rounded-2xl border border-white/50">
              <div className="flex flex-col md:flex-row items-center">
                <div className="md:w-1/2 mb-8 md:mb-0 md:pr-12">
                  <h3 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600 mb-4">Team collaboration</h3>
                  <p className="text-gray-600 mb-6 text-lg backdrop-blur-sm bg-white/40 p-4 rounded-xl border border-white/50 shadow-lg">
                    Our platform brings together passionate founders with experienced investors, creating a community that supports innovation and growth.
                  </p>
                  <div className="flex items-center space-x-4">
                    <div className="flex -space-x-2">
                      <div className="w-10 h-10 rounded-full bg-gradient-to-r from-indigo-500 to-blue-500 border-2 border-white"></div>
                      <div className="w-10 h-10 rounded-full bg-gradient-to-r from-blue-500 to-cyan-500 border-2 border-white"></div>
                      <div className="w-10 h-10 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 border-2 border-white"></div>
                      <div className="w-10 h-10 rounded-full bg-gradient-to-r from-indigo-500 to-purple-500 flex items-center justify-center text-white text-xs border-2 border-white">+15</div>
                    </div>
                    <p className="text-sm text-gray-500">Join our growing community</p>
                  </div>
                </div>
                <div className="md:w-1/2">
                  <div className="relative">
                    <div className="absolute -inset-1 bg-gradient-to-r from-indigo-500 to-purple-500 opacity-30 blur-lg rounded-xl"></div>
                    <img 
                      src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1740&q=80" 
                      alt="Team collaboration" 
                      className="relative rounded-xl shadow-xl border border-white/50" 
                      loading="lazy"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Benefits;