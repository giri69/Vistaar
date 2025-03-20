import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import AuthPage from './pages/AuthPage';
import FounderDashboardPage from './pages/FounderDashboardPage';
import InvestorDashboardPage from './pages/InvestorDashboardPage';
import AdminDashboardPage from './pages/AdminDashboardPage';
import ProfilePage from './pages/Profile';


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/auth" element={<AuthPage />} />
        <Route path="/founder-dashboard" element={<FounderDashboardPage />} />
        <Route path="/investor-dashboard" element={<InvestorDashboardPage />} />
        <Route path="/admin-dashboard" element={<AdminDashboardPage />} />
        <Route path="/profile" element={<ProfilePage/>} />
      </Routes>
    </Router>
  );
}

export default App;