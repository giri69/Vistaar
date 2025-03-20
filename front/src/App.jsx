import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import HomePage from './pages/HomePage';
import AuthPage from './pages/AuthPage';
import FounderDashboardPage from './pages/FounderDashboardPage';
import InvestorDashboardPage from './pages/InvestorDashboardPage';
import AdminDashboardPage from './pages/AdminDashboardPage';

// Protected route component
const ProtectedRoute = ({ children, allowedRole }) => {
  const isAuthenticated = localStorage.getItem('token') !== null;
  const user = JSON.parse(localStorage.getItem('user') || '{}');
  
  if (!isAuthenticated) {
    return <Navigate to="/auth" />;
  }
  
  if (allowedRole && user.role !== allowedRole) {
    // Redirect to the appropriate dashboard based on role
    if (user.role === 'founder') {
      return <Navigate to="/founder-dashboard" />;
    } else if (user.role === 'investor') {
      return <Navigate to="/investor-dashboard" />;
    } else if (user.role === 'admin') {
      return <Navigate to="/admin-dashboard" />;
    }
    return <Navigate to="/" />;
  }
  
  return children;
};

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/auth" element={<AuthPage />} />
        <Route 
          path="/founder-dashboard" 
          element={
            <ProtectedRoute allowedRole="founder">
              <FounderDashboardPage />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/investor-dashboard" 
          element={
            <ProtectedRoute allowedRole="investor">
              <InvestorDashboardPage />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/admin-dashboard" 
          element={
            <ProtectedRoute allowedRole="admin">
              <AdminDashboardPage />
            </ProtectedRoute>
          } 
        />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Router>
  );
}

export default App;