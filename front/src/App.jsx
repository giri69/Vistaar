import React, { useState } from 'react';
import HomePage from './pages/HomePage';
import AuthPage from './pages/AuthPage';
import FounderDashboardPage from './pages/FounderDashboardPage';
import InvestorDashboardPage from './pages/InvestorDashboardPage';
import AdminDashboardPage from './pages/AdminDashboardPage';

function App() {
  const [currentPage, setCurrentPage] = useState('home');
  const [userType, setUserType] = useState(null);
  
  const navigateTo = (page, type = null) => {
    setCurrentPage(page);
    if (type) setUserType(type);
  };
  
  const renderPage = () => {
    switch(currentPage) {
      case 'home':
        return <HomePage navigateTo={navigateTo} />;
      case 'auth':
        return <AuthPage navigateTo={navigateTo} />;
      case 'founderDashboard':
        return <FounderDashboardPage navigateTo={navigateTo} />;
      case 'investorDashboard':
        return <InvestorDashboardPage navigateTo={navigateTo} />;
      case 'adminDashboard':
        return <AdminDashboardPage navigateTo={navigateTo} />;
      default:
        return <HomePage navigateTo={navigateTo} />;
    }
  };
  
  return (
    <div>
      <nav style={{ padding: '10px', backgroundColor: '#f0f0f0', marginBottom: '20px' }}>
        <button onClick={() => navigateTo('home')}>Home</button>
        {!userType && <button onClick={() => navigateTo('auth')}>Login/Signup</button>}
        {userType === 'founder' && <button onClick={() => navigateTo('founderDashboard')}>Founder Dashboard</button>}
        {userType === 'investor' && <button onClick={() => navigateTo('investorDashboard')}>Investor Dashboard</button>}
        {userType === 'admin' && <button onClick={() => navigateTo('adminDashboard')}>Admin Dashboard</button>}
        {userType && <button onClick={() => setUserType(null)}>Logout</button>}
      </nav>
      {renderPage()}
    </div>
  );
}

export default App;