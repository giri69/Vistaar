import React from 'react';
import { ArrowRight, Sparkles } from 'lucide-react';
import { Link } from 'react-router-dom';

function CTA() {
  return (
    <div className="relative py-24 overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0 -z-10 bg-gradient-to-b from-indigo-50 to-white"></div>
      <div className="absolute top-1/2 left-0 w-72 h-72 blur-shape bg-indigo-200/30 rounded-full transform -translate-y-1/2 animate-pulse-slow"></div>
      <div className="absolute top-1/3 right-0 w-96 h-96 blur-shape bg-purple-200/30 rounded-full transform -translate-y-1/2 animate-pulse-slow delay-1000"></div>
      <div className="absolute bottom-0 left-1/3 w-80 h-80 blur-shape bg-pink-200/20 rounded-full"></div>
      
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto text-center reveal">
          <div className="inline-flex items-center backdrop-blur-sm bg-white/70 rounded-full px-4 py-1.5 mb-6 border border-indigo-100 shadow-lg">
            <Sparkles className="h-4 w-4 text-indigo-600 mr-2 animate-pulse" />
            <span className="text-indigo-600 font-medium text-sm">
              Get Started Today
            </span>
          </div>
          
          <h2 className="text-3xl font-bold sm:text-4xl mb-6 text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600">
            Ready to Transform Your Startup Journey?
          </h2>
          
          <p className="text-xl text-gray-600 mb-10 leading-relaxed backdrop-blur-sm bg-white/40 p-4 rounded-xl border border-white/50 shadow-lg">
            Whether you're a visionary founder or a potential investor, our platform offers you the tools, connections, and support you need to succeed.
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-6">
            <Link
              to="/auth"
              className="w-full sm:w-auto px-8 py-4 text-base font-medium rounded-lg text-white bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 hover:shadow-lg hover:shadow-indigo-500/30 transition-all duration-300 flex items-center justify-center"
            >
              I'm a Founder
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
            <Link
              to="/auth"
              className="w-full sm:w-auto px-8 py-4 text-base font-medium rounded-lg text-indigo-700 backdrop-blur-sm bg-white/70 border border-indigo-100 hover:bg-white hover:shadow-lg hover:shadow-indigo-500/10 transition-all duration-300 flex items-center justify-center"
            >
              I'm an Investor
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CTA;