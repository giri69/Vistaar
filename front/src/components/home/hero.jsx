import React, { useEffect, useState, useRef } from 'react';
import { ArrowRight, Users, Shield, TrendingUp, Sparkles } from 'lucide-react';
import { Link } from 'react-router-dom';

function Hero() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);
  const heroRef = useRef(null);

  useEffect(() => {
    // Check if user is logged in
    const token = localStorage.getItem('token');
    const userData = localStorage.getItem('user');
    
    if (token && userData) {
      setIsAuthenticated(true);
      setUser(JSON.parse(userData));
    }
    
    // Add floating animation elements
    if (heroRef.current) {
      const createFloatingElement = (className) => {
        const element = document.createElement('div');
        element.className = className;
        
        const size = Math.random() * 60 + 20;
        element.style.width = `${size}px`;
        element.style.height = `${size}px`;
        
        element.style.left = `${Math.random() * 100}%`;
        element.style.animationDuration = `${Math.random() * 10 + 15}s`;
        element.style.animationDelay = `${Math.random() * 5}s`;
        
        return element;
      };
      
      for (let i = 0; i < 10; i++) {
        heroRef.current.appendChild(createFloatingElement('floating-element'));
      }
    }
  }, []);

  const getDashboardLink = () => {
    if (!user) return '/auth';
    
    switch(user.role) {
      case 'founder':
        return '/founder-dashboard';
      case 'investor':
        return '/investor-dashboard';
      case 'admin':
        return '/admin-dashboard';
      default:
        return '/auth';
    }
  };

  return (
    <div className="relative overflow-hidden pt-28 pb-24 md:pt-36 md:pb-32" ref={heroRef}>
      {/* Background gradients and shapes */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-0 left-1/4 w-96 h-96 blur-shape rounded-full bg-purple-300/30 animate-pulse-slow"></div>
        <div className="absolute bottom-0 right-1/4 w-96 h-96 blur-shape rounded-full bg-cyan-300/30 animate-pulse-slow delay-1000"></div>
        <div className="absolute top-1/3 left-1/2 w-72 h-72 blur-shape rounded-full bg-pink-300/20 animate-pulse-slow delay-500"></div>
        
        {/* Animated gradient background */}
        <div className="absolute inset-0 bg-gradient-to-br from-slate-50 via-indigo-50 to-cyan-50 animate-gradient"></div>
        
        {/* Pattern overlay */}
        <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg%20width%3D%2240%22%20height%3D%2240%22%20viewBox%3D%220%200%2040%2040%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%3Cg%20fill%3D%22%239C92AC%22%20fill-opacity%3D%220.05%22%20fill-rule%3D%22evenodd%22%3E%3Cpath%20d%3D%22M0%2040L40%200H20L0%2020M40%2040V20L20%2040%22%2F%3E%3C%2Fg%3E%3C%2Fsvg%3E')] bg-center [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))]"></div>
      </div>

      {/* Floating elements will be added here by JS */}

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <div className="mb-6 inline-block animate-fade-in backdrop-blur-sm bg-white/30 border border-white/50 rounded-full px-6 py-2 shadow-xl">
            <div className="flex items-center">
              <Sparkles className="h-5 w-5 text-indigo-600 mr-2 animate-pulse" />
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 font-semibold text-sm py-1">
                Revolutionizing Startup Funding
              </span>
            </div>
          </div>
          
          <h1 className="text-4xl font-bold sm:text-5xl md:text-6xl leading-tight animate-fade-in tracking-tight">
            <span className="block mb-2">Where Ideas Meet Investors</span>
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 font-extrabold">
              Without the Hassle
            </span>
          </h1>
          
          <p className="mt-6 max-w-2xl mx-auto text-lg text-gray-600 sm:text-xl md:text-2xl leading-relaxed animate-fade-in delay-100 backdrop-blur-sm bg-white/30 p-4 rounded-xl border border-white/50 shadow-lg">
            Exchange equity for the resources your startup needs. Connect with investors who bring expertise, not just capital. All without the paperwork hassle.
          </p>
          
          <div className="mt-10 max-w-md mx-auto sm:flex sm:justify-center md:mt-12 animate-fade-in delay-200">
            {!isAuthenticated ? (
              <>
                <div className="rounded-lg shadow-xl shadow-indigo-500/20">
                  <Link
                    to="/auth"
                    className="w-full flex items-center justify-center px-8 py-4 text-base font-medium rounded-lg text-white bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 hover:shadow-lg hover:shadow-indigo-500/40 transition-all duration-300"
                  >
                    I'm a Founder
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Link>
                </div>
                <div className="mt-4 sm:mt-0 sm:ml-4 rounded-lg shadow-xl shadow-indigo-500/10">
                  <Link
                    to="/auth"
                    className="w-full flex items-center justify-center px-8 py-4 text-base font-medium rounded-lg text-indigo-700 backdrop-blur-sm bg-white/70 border border-indigo-100 hover:bg-white hover:shadow-lg hover:shadow-indigo-500/10 transition-all duration-300"
                  >
                    I'm an Investor
                  </Link>
                </div>
              </>
            ) : (
              <div className="rounded-lg shadow-xl shadow-indigo-500/20">
                <Link
                  to={getDashboardLink()}
                  className="w-full flex items-center justify-center px-8 py-4 text-base font-medium rounded-lg text-white bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 hover:shadow-lg hover:shadow-indigo-500/40 transition-all duration-300"
                >
                  Go to Dashboard
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </div>
            )}
          </div>
          
          <div className="mt-12 animate-fade-in delay-300">
            <p className="text-sm font-medium text-gray-500 mb-4">Trusted by 500+ founders and investors</p>
            <div className="flex flex-wrap justify-center items-center gap-4 md:gap-8">
              <div className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600 font-bold tracking-tight">YCombinator</div>
              <div className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-600 font-bold tracking-tight">Sequoia</div>
              <div className="text-transparent bg-clip-text bg-gradient-to-r from-pink-600 to-indigo-600 font-bold tracking-tight">AngelList</div>
              <div className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-cyan-600 font-bold tracking-tight">TechStars</div>
              <div className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-600 to-indigo-600 font-bold tracking-tight">500 Startups</div>
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className="mt-20 max-w-4xl mx-auto">
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
            <div className="reveal backdrop-blur-lg bg-white/40 px-6 py-8 rounded-2xl border border-white/50 shadow-xl transition-all duration-300 hover:shadow-indigo-500/20 hover:bg-white/60 group">
              <div className="flex items-center justify-center w-12 h-12 mx-auto mb-4 bg-gradient-to-r from-indigo-500 to-purple-500 text-white rounded-xl transform group-hover:rotate-12 transition-transform duration-300">
                <Users className="h-6 w-6" />
              </div>
              <div className="text-center">
                <p className="text-gray-600 mb-2 text-sm font-medium">Startup team collaboration</p>
                <p className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600">95%</p>
                <p className="text-indigo-600 font-medium text-sm mt-1">Success Rate</p>
              </div>
            </div>
            
            <div className="reveal backdrop-blur-lg bg-white/40 px-6 py-8 rounded-2xl border border-white/50 shadow-xl transition-all duration-300 hover:shadow-purple-500/20 hover:bg-white/60 group delay-100">
              <div className="flex items-center justify-center w-12 h-12 mx-auto mb-4 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-xl transform group-hover:rotate-12 transition-transform duration-300">
                <Shield className="h-6 w-6" />
              </div>
              <div className="text-center">
                <p className="text-gray-600 mb-2 text-sm font-medium">Zero Paperwork</p>
                <p className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-600">100%</p>
                <p className="text-purple-600 font-medium text-sm mt-1">We handle the legal stuff</p>
              </div>
            </div>
            
            <div className="reveal backdrop-blur-lg bg-white/40 px-6 py-8 rounded-2xl border border-white/50 shadow-xl transition-all duration-300 hover:shadow-pink-500/20 hover:bg-white/60 group delay-200">
              <div className="flex items-center justify-center w-12 h-12 mx-auto mb-4 bg-gradient-to-r from-pink-500 to-indigo-500 text-white rounded-xl transform group-hover:rotate-12 transition-transform duration-300">
                <TrendingUp className="h-6 w-6" />
              </div>
              <div className="text-center">
                <p className="text-gray-600 mb-2 text-sm font-medium">Simple Process</p>
                <p className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-pink-600 to-indigo-600">4</p>
                <p className="text-pink-600 font-medium text-sm mt-1">Easy steps to success</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Hero;