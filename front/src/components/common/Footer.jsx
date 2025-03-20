import React from 'react';
import { Rocket, Mail, Phone, MapPin } from 'lucide-react';
import { Link } from 'react-router-dom';

function Footer() {
  return (
    <footer className="bg-white border-t border-gray-100">
      <div className="max-w-7xl mx-auto pt-12 pb-8 px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 pb-12">
          <div>
            <div className="flex items-center mb-5">
              <div className="relative">
                <Rocket className="h-8 w-8 text-blue-600" />
                <div className="absolute -inset-1 bg-blue-500/20 rounded-full blur-sm -z-10"></div>
              </div>
              <span className="ml-2 text-xl font-medium text-gray-900">
                fund<span className="font-bold">mentorship</span>
              </span>
            </div>
            <p className="text-gray-600 mb-4 leading-relaxed">
              Connecting visionary founders with the resources they need to grow, while enabling anyone to become a startup investor.
            </p>
          </div>
          
          <div>
            <h3 className="text-sm font-semibold text-gray-900 uppercase tracking-wider mb-4">Platform</h3>
            <ul className="space-y-3">
              <li><a href="#" className="text-gray-600 hover:text-blue-600 transition-colors duration-300">Home</a></li>
              <li><a href="#how-it-works" className="text-gray-600 hover:text-blue-600 transition-colors duration-300">How It Works</a></li>
              <li><a href="#features" className="text-gray-600 hover:text-blue-600 transition-colors duration-300">Features</a></li>
              <li><a href="#" className="text-gray-600 hover:text-blue-600 transition-colors duration-300">Success Stories</a></li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-sm font-semibold text-gray-900 uppercase tracking-wider mb-4">Resources</h3>
            <ul className="space-y-3">
              <li><a href="#" className="text-gray-600 hover:text-blue-600 transition-colors duration-300">Startup Guide</a></li>
              <li><a href="#" className="text-gray-600 hover:text-blue-600 transition-colors duration-300">Investor Handbook</a></li>
              <li><a href="#" className="text-gray-600 hover:text-blue-600 transition-colors duration-300">Blog</a></li>
              <li><a href="#" className="text-gray-600 hover:text-blue-600 transition-colors duration-300">FAQs</a></li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-sm font-semibold text-gray-900 uppercase tracking-wider mb-4">Legal</h3>
            <ul className="space-y-3">
              <li><a href="#" className="text-gray-600 hover:text-blue-600 transition-colors duration-300">Privacy Policy</a></li>
              <li><a href="#" className="text-gray-600 hover:text-blue-600 transition-colors duration-300">Terms of Service</a></li>
              <li><a href="#" className="text-gray-600 hover:text-blue-600 transition-colors duration-300">Cookie Policy</a></li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-gray-100 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-500 text-sm">
            &copy; {new Date().getFullYear()} fundmentorship. All rights reserved.
          </p>
          <p className="text-gray-500 text-sm mt-4 md:mt-0">
            Designed with precision. Built with passion.
          </p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;