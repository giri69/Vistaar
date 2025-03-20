import React from 'react';
import { ClipboardCheck, FileText, UserPlus, ShieldCheck, Sparkles } from 'lucide-react';

function HowItWorks() {
  const steps = [
    {
      id: 1,
      title: 'Submit Your Application',
      description: 'Founders detail their startup idea and specify what they need—funding, mentorship, connections, or industry guidance—in exchange for equity.',
      icon: ClipboardCheck,
      color: 'from-indigo-500 to-blue-500',
      textColor: 'text-indigo-600',
      borderColor: 'border-indigo-100'
    },
    {
      id: 2,
      title: 'We Handle the Paperwork',
      description: 'Our platform takes care of all legal requirements, converting your idea into an officially registered company with proper equity allocation.',
      icon: FileText,
      color: 'from-purple-500 to-indigo-500',
      textColor: 'text-purple-600',
      borderColor: 'border-purple-100'
    },
    {
      id: 3,
      title: 'Connect with Investors',
      description: 'Get matched with investors who can provide the resources, expertise, or capital your startup needs to grow and succeed.',
      icon: UserPlus,
      color: 'from-pink-500 to-purple-500',
      textColor: 'text-pink-600',
      borderColor: 'border-pink-100'
    },
    {
      id: 4,
      title: 'Secure Your Future',
      description: 'With our platform owning 2% equity, both founders and investors enjoy security as the startup grows toward larger funding rounds.',
      icon: ShieldCheck,
      color: 'from-cyan-500 to-indigo-500',
      textColor: 'text-cyan-600',
      borderColor: 'border-cyan-100'
    }
  ];

  return (
    <div className="py-24 relative overflow-hidden" id="how-it-works">
      {/* Background elements */}
      <div className="absolute inset-0 -z-10 bg-gradient-to-b from-indigo-50 via-white to-purple-50"></div>
      <div className="absolute top-0 right-0 w-96 h-96 blur-shape bg-indigo-200/30 rounded-full transform translate-x-1/2 -translate-y-1/3"></div>
      <div className="absolute bottom-0 left-0 w-96 h-96 blur-shape bg-purple-200/30 rounded-full transform -translate-x-1/2 translate-y-1/3"></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="lg:text-center mb-16 reveal">
          <div className="inline-flex items-center backdrop-blur-sm bg-white/70 rounded-full px-4 py-1.5 mb-4 border border-indigo-100 shadow-lg">
            <Sparkles className="h-4 w-4 text-indigo-600 mr-2 animate-pulse" />
            <span className="text-indigo-600 font-medium text-sm">
              How It Works
            </span>
          </div>
          <h2 className="mt-2 text-3xl font-bold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 sm:text-4xl">
            Simple Process
          </h2>
          <p className="mt-4 max-w-2xl mx-auto text-xl text-gray-600 leading-relaxed">
            Our platform simplifies startup creation and investment, making it accessible to everyone
          </p>
        </div>

        <div className="relative">
          {/* Connector line */}
          <div className="hidden md:block absolute left-1/2 top-8 bottom-8 w-1 bg-gradient-to-b from-indigo-400 via-purple-400 to-pink-400 transform -translate-x-1/2 rounded-full"></div>

          <div className="space-y-16 md:space-y-32 relative">
            {steps.map((step, index) => (
              <div key={step.id} className={`reveal ${index % 2 === 0 ? 'md:animate-slide-right' : 'md:animate-slide-left'}`}>
                <div className={`flex flex-col ${index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'} items-center`}>
                  <div className={`flex-1 ${index % 2 === 0 ? 'md:pr-12 md:text-right' : 'md:pl-12'}`}>
                    <div className={`inline-flex items-center mb-4 ${index % 2 === 0 ? 'md:flex-row-reverse' : ''}`}>
                      <div className={`flex-shrink-0 rounded-full backdrop-blur-sm bg-white/70 shadow-xl border border-gray-100 h-10 w-10 flex items-center justify-center font-semibold ${step.textColor} ${index % 2 === 0 ? 'md:ml-4' : 'mr-4'}`}>
                        {step.id}
                      </div>
                      <h3 className={`text-xl font-bold ${step.textColor}`}>{step.title}</h3>
                    </div>
                    <p className="text-gray-600 leading-relaxed max-w-md mx-auto md:mx-0 backdrop-blur-sm bg-white/40 p-4 rounded-xl border border-white/50 shadow-lg">
                      {step.description}
                    </p>
                  </div>
                  
                  <div className="flex-shrink-0 mt-8 md:mt-0 relative">
                    <div className={`absolute -inset-6 rounded-full bg-gradient-to-r ${step.color} opacity-20 blur-xl`}></div>
                    <div className={`relative flex items-center justify-center h-24 w-24 rounded-full backdrop-blur-sm bg-white/60 border ${step.borderColor} shadow-xl z-10 transition-transform duration-300 hover:rotate-12 group`}>
                      <step.icon className={`h-12 w-12 ${step.textColor} group-hover:scale-110 transition-transform duration-300`} />
                    </div>
                  </div>
                  
                  <div className={`flex-1 mt-8 md:mt-0 ${index % 2 === 0 ? 'md:pl-12' : 'md:pr-12 md:text-right'}`}>
                    {/* This div is empty but maintains the layout */}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default HowItWorks;