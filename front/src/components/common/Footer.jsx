import React from 'react';

const Footer = () => {
  return (
    <footer style={{ padding: '20px', backgroundColor: '#f0f0f0', marginTop: '20px', textAlign: 'center' }}>
      <div>
        <p>© 2025 StartupConnect - All rights reserved</p>
        <div style={{ marginTop: '10px' }}>
          <a href="#" style={{ marginRight: '10px' }}>Terms of Service</a>
          <a href="#" style={{ marginRight: '10px' }}>Privacy Policy</a>
          <a href="#" style={{ marginRight: '10px' }}>Contact Us</a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;