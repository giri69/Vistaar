import React from 'react';
import { ArrowRight, Users, Shield, TrendingUp } from 'lucide-react';

function Hero() {
  return (
    <div className="relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-gradient-to-r from-indigo-50 to-blue-50" aria-hidden="true">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg%20width%3D%2240%22%20height%3D%2240%22%20viewBox%3D%220%200%2040%2040%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%3Cg%20fill%3D%22%239C92AC%22%20fill-opacity%3D%220.05%22%20fill-rule%3D%22evenodd%22%3E%3Cpath%20d%3D%22M0%2040L40%200H20L0%2020M40%2040V20L20%2040%22%2F%3E%3C%2Fg%3E%3C%2Fsvg%3E')] bg-center [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))]"></div>
      </div>

      <div className="relative pt-16 pb-32 sm:pt-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl tracking-tight font-extrabold text-gray-900 sm:text-5xl md:text-6xl">
              <span className="block">Transform Your Startup Journey</span>
              <span className="block text-indigo-600">with Expert Backing</span>
            </h1>
            <p className="mt-3 max-w-md mx-auto text-base text-gray-500 sm:text-lg md:mt-5 md:text-xl md:max-w-3xl">
              Connect with investors, mentors, and industry experts. Exchange equity for the resources 
              you need to grow your startup. All paperwork handled seamlessly.
            </p>
            <div className="mt-5 max-w-md mx-auto sm:flex sm:justify-center md:mt-8">
              <div className="rounded-md shadow">
                <a
                  href="#"
                  className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 md:py-4 md:text-lg md:px-10"
                >
                  Launch Your Startup
                  <ArrowRight className="ml-2 h-5 w-5" />
                </a>
              </div>
              <div className="mt-3 rounded-md shadow sm:mt-0 sm:ml-3">
                <a
                  href="#"
                  className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-indigo-600 bg-white hover:bg-gray-50 md:py-4 md:text-lg md:px-10"
                >
                  Become an Investor
                </a>
              </div>
            </div>
          </div>

          {/* Stats */}
          <div className="mt-20">
            <dl className="grid grid-cols-1 gap-x-4 gap-y-8 sm:grid-cols-3">
              <div className="bg-white px-4 py-5 shadow rounded-lg overflow-hidden sm:p-6">
                <dt className="text-sm font-medium text-gray-500 truncate flex items-center">
                  <Users className="mr-2 h-5 w-5 text-indigo-500" />
                  Active Startups
                </dt>
                <dd className="mt-1 text-3xl font-semibold text-gray-900">2,000+</dd>
              </div>
              <div className="bg-white px-4 py-5 shadow rounded-lg overflow-hidden sm:p-6">
                <dt className="text-sm font-medium text-gray-500 truncate flex items-center">
                  <Shield className="mr-2 h-5 w-5 text-indigo-500" />
                  Successful Matches
                </dt>
                <dd className="mt-1 text-3xl font-semibold text-gray-900">500+</dd>
              </div>
              <div className="bg-white px-4 py-5 shadow rounded-lg overflow-hidden sm:p-6">
                <dt className="text-sm font-medium text-gray-500 truncate flex items-center">
                  <TrendingUp className="mr-2 h-5 w-5 text-indigo-500" />
                  Total Investment
                </dt>
                <dd className="mt-1 text-3xl font-semibold text-gray-900">$50M+</dd>
              </div>
            </dl>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Hero;