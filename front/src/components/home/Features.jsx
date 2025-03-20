import React from 'react';
import { FileCheck, Users, Shield, Briefcase, Sparkles } from 'lucide-react';

function Features() {
  const features = [
    {
      name: 'Automated Legal Paperwork',
      description: 'We handle all the complex legal documentation and company registration process, so you can focus on building your startup.',
      icon: FileCheck,
      gradient: 'from-indigo-500 to-purple-500',
      delay: 0,
    },
    {
      name: 'Expert Network',
      description: 'Connect with industry experts, successful entrepreneurs, and investors who can provide valuable guidance and resources.',
      icon: Users,
      gradient: 'from-purple-500 to-pink-500',
      delay: 100,
    },
    {
      name: 'Secure Investment Process',
      description: 'Our platform ensures secure and transparent equity distribution with built-in protection for both startups and investors.',
      icon: Shield,
      gradient: 'from-pink-500 to-cyan-500',
      delay: 200,
    },
    {
      name: 'Resource Exchange',
      description: 'Exchange equity for the resources you need - whether it\'s funding, mentorship, or industry connections.',
      icon: Briefcase,
      gradient: 'from-cyan-500 to-indigo-500',
      delay: 300,
    },
  ];

  return (
    <div className="py-24 relative overflow-hidden" id="features">
      {/* Background elements */}
      <div className="absolute inset-0 -z-10 bg-gradient-to-b from-white via-indigo-50 to-white"></div>
      <div className="absolute top-1/4 right-0 w-80 h-80 blur-shape bg-indigo-200/30 rounded-full"></div>
      <div className="absolute bottom-1/4 left-0 w-80 h-80 blur-shape bg-purple-200/30 rounded-full"></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="lg:text-center mb-16 reveal">
          <div className="inline-flex items-center backdrop-blur-sm bg-white/70 rounded-full px-4 py-1.5 mb-4 border border-indigo-100 shadow-lg">
            <Sparkles className="h-4 w-4 text-indigo-600 mr-2 animate-pulse" />
            <span className="text-indigo-600 font-medium text-sm">
              Features
            </span>
          </div>
          <h2 className="mt-2 text-3xl font-bold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 sm:text-4xl">
            Everything you need to succeed
          </h2>
          <p className="mt-4 max-w-2xl mx-auto text-xl text-gray-600 leading-relaxed">
            Our platform provides all the tools and resources needed to transform your idea into a successful business.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-x-8 gap-y-16 sm:grid-cols-2 lg:grid-cols-4">
          {features.map((feature, index) => (
            <div key={feature.name} className={`relative reveal delay-${feature.delay}`}>
              <div className="group relative">
                <div className={`absolute -inset-1 rounded-2xl bg-gradient-to-r ${feature.gradient} opacity-20 blur-xl group-hover:opacity-30 transition-opacity duration-500`}></div>
                <div className="relative flex flex-col h-full backdrop-blur-sm bg-white/60 p-6 rounded-2xl border border-white/50 shadow-xl transition-all duration-300 hover:shadow-lg group-hover:bg-white/70">
                  <div className={`flex items-center justify-center h-14 w-14 rounded-xl bg-gradient-to-r ${feature.gradient} text-white mb-6 transform group-hover:rotate-12 transition-transform duration-300`}>
                    <feature.icon className="h-6 w-6" aria-hidden="true" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">{feature.name}</h3>
                    <p className="text-gray-600 leading-relaxed">{feature.description}</p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Features;