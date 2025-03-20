import React from 'react';
import  { useEffect } from 'react';
import Navbar from '../components/common/Navbar';
import Hero from '../components/home/Hero';
import Features from '../components/home/Features';
import Footer from '../components/common/Footer';
import HowItWorks from '../components/home/HowItWorks';
import Benefits from '../components/home/Benefits';
import CTA from '../components/home/CTA';

function HomePage() {
  useEffect(() => {
    // Add the animation styles for floating elements
    const style = document.createElement('style');
    style.innerHTML = `
      @keyframes float {
        0% { transform: translateY(0px) rotate(0deg); opacity: 0.5; }
        50% { transform: translateY(-20px) rotate(10deg); opacity: 0.8; }
        100% { transform: translateY(0px) rotate(0deg); opacity: 0.5; }
      }
      
      @keyframes gradient-shift {
        0% { background-position: 0% 50%; }
        50% { background-position: 100% 50%; }
        100% { background-position: 0% 50%; }
      }
      
      .floating-element {
        position: absolute;
        border-radius: 50%;
        background: linear-gradient(45deg, rgba(99, 102, 241, 0.15), rgba(168, 85, 247, 0.15));
        backdrop-filter: blur(4px);
        z-index: -1;
        animation: float 20s ease-in-out infinite;
      }
      
      .animate-gradient {
        background-size: 400% 400%;
        animation: gradient-shift 15s ease infinite;
      }
    `;
    document.head.appendChild(style);
    
    return () => {
      document.head.removeChild(style);
    };
  }, []);

  return (
      <div className="min-h-screen overflow-hidden">
        <Navbar />
        <main>
          <Hero />
          <Features />
          <HowItWorks />
          <Benefits />
          <CTA />
        </main>
        <Footer />
      </div>
    );
  }

export default HomePage;