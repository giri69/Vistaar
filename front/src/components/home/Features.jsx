import React from 'react';
import { FileCheck, Users, Shield, Briefcase } from 'lucide-react';

function Features() {
  const features = [
    {
      name: 'Automated Legal Paperwork',
      description: 'We handle all the complex legal documentation and company registration process, so you can focus on building your startup.',
      icon: FileCheck,
    },
    {
      name: 'Expert Network',
      description: 'Connect with industry experts, successful entrepreneurs, and investors who can provide valuable guidance and resources.',
      icon: Users,
    },
    {
      name: 'Secure Investment Process',
      description: 'Our platform ensures secure and transparent equity distribution with built-in protection for both startups and investors.',
      icon: Shield,
    },
    {
      name: 'Resource Exchange',
      description: 'Exchange equity for the resources you need - whether it\'s funding, mentorship, or industry connections.',
      icon: Briefcase,
    },
  ];

  return (
    <div className="py-24 bg-white" id="features">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="lg:text-center">
          <h2 className="text-base text-indigo-600 font-semibold tracking-wide uppercase">Features</h2>
          <p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl">
            Everything you need to succeed
          </p>
          <p className="mt-4 max-w-2xl text-xl text-gray-500 lg:mx-auto">
            Our platform provides all the tools and resources needed to transform your idea into a successful business.
          </p>
        </div>

        <div className="mt-20">
          <div className="grid grid-cols-1 gap-12 sm:grid-cols-2 lg:grid-cols-2">
            {features.map((feature) => (
              <div key={feature.name} className="relative">
                <div className="absolute flex items-center justify-center h-12 w-12 rounded-md bg-indigo-500 text-white">
                  <feature.icon className="h-6 w-6" aria-hidden="true" />
                </div>
                <div className="ml-16">
                  <h3 className="text-lg leading-6 font-medium text-gray-900">{feature.name}</h3>
                  <p className="mt-2 text-base text-gray-500">{feature.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Features;