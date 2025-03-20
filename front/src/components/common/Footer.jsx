import React from 'react';
import { Rocket } from 'lucide-react';

function Footer() {
  return (
    <footer className="bg-white">
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          <div className="flex items-center">
            <Rocket className="h-8 w-8 text-indigo-600" />
            <span className="ml-2 text-xl font-bold text-gray-900">StartupSync</span>
          </div>
          <div className="flex space-x-6">
            <a href="#" className="text-gray-400 hover:text-gray-500">
              Terms
            </a>
            <a href="#" className="text-gray-400 hover:text-gray-500">
              Privacy
            </a>
            <a href="#" className="text-gray-400 hover:text-gray-500">
              Contact
            </a>
          </div>
        </div>
        <div className="mt-8 border-t border-gray-200 pt-8">
          <p className="text-center text-base text-gray-400">
            &copy; {new Date().getFullYear()} StartupSync. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;