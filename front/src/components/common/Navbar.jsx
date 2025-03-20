import React from 'react';

const Navbar = ({ userType, navigateTo }) => {
  return (
    <nav style={{ padding: '10px', backgroundColor: '#f0f0f0', marginBottom: '20px', display: 'flex', justifyContent: 'space-between' }}>
      <div>
        <span style={{ fontWeight: 'bold', fontSize: '1.2rem' }}>StartupConnect</span>
      </div>
      <div>
        <button onClick={() => navigateTo('home')} style={{ marginRight: '10px' }}>Home</button>
        {!userType && <button onClick={() => navigateTo('auth')} style={{ marginRight: '10px' }}>Login/Signup</button>}
        {userType === 'founder' && <button onClick={() => navigateTo('founderDashboard')} style={{ marginRight: '10px' }}>Dashboard</button>}
        {userType === 'investor' && <button onClick={() => navigateTo('investorDashboard')} style={{ marginRight: '10px' }}>Dashboard</button>}
        {userType === 'admin' && <button onClick={() => navigateTo('adminDashboard')} style={{ marginRight: '10px' }}>Dashboard</button>}
        {userType && <button onClick={() => navigateTo('home', null)}>Logout</button>}
      </div>
    </nav>
  );
};

export default Navbar;