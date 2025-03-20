import React from 'react';

const HomePage = ({ navigateTo }) => {
  return (
    <div>
      <h1>Innovative Community Platform for Startup Growth & Investment</h1>
      <p>
        In the entrepreneurial world, many promising ideas fail due to a lack of funding, mentorship, and connections. 
        Our platform connects entrepreneurs with investors to exchange equity for the resources they need.
      </p>
      
      <h2>How It Works</h2>
      <div>
        <div>
          <h3>1. Submit Your Startup</h3>
          <p>Founders submit details about their idea and what they need.</p>
        </div>
        <div>
          <h3>2. We Handle Paperwork</h3>
          <p>Our platform handles all legal documentation and paperwork.</p>
        </div>
        <div>
          <h3>3. Connect with Investors</h3>
          <p>Get matched with investors who can provide expertise, resources, or financial backing.</p>
        </div>
      </div>
      
      <h2>Platform Features</h2>
      <ul>
        <li>Open Investment Model - Anyone can become a startup investor</li>
        <li>Streamlined Paperwork - We automate legal and operational formalities</li>
        <li>Equity-Based Exchange - Fair trade-off for all parties involved</li>
        <li>Investor Security - Reducing investment risk through our platform</li>
      </ul>
      
      <div>
        <button onClick={() => navigateTo('auth')}>Join as Founder</button>
        <button onClick={() => navigateTo('auth')}>Become an Investor</button>
      </div>
    </div>
  );
};

export default HomePage;