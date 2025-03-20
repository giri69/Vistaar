import React from 'react';
import Navbar from '../components/common/Navbar';
import Hero from '../components/home/Hero';
import Features from '../components/home/Features';
import Footer from '../components/common/Footer';

function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      <Navbar />
      <main>
        <Hero />
        <Features />
      </main>
      <Footer />
    </div>
  );
}

export default HomePage;