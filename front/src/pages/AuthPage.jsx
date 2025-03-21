import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Login from '../components/auth/Login';
import Signup from '../components/auth/Signup';

function AuthPage() {
  const [isLogin, setIsLogin] = useState(true);
  const navigate = useNavigate();

  // Check if user is already logged in
  useEffect(() => {
    const token = localStorage.getItem('token');
    const user = localStorage.getItem('user');
    
    if (token && user) {
      const userData = JSON.parse(user);
      // Redirect to appropriate dashboard
      if (userData.role === 'founder') {
        navigate('/founder-dashboard');
      } else if (userData.role === 'investor') {
        navigate('/investor-dashboard');
      } else if (userData.role === 'admin') {
        navigate('/admin-dashboard');
      }
    }
  }, [navigate]);

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <h2 className="text-center text-3xl font-extrabold text-gray-900">
          {isLogin ? 'Sign in to your account' : 'Create your account'}
        </h2>
        <div className="mt-2 text-center">
          <button
            onClick={() => setIsLogin(!isLogin)}
            className="text-indigo-600 hover:text-indigo-500"
          >
            {isLogin ? 'Need an account? Sign up' : 'Already have an account? Sign in'}
          </button>
        </div>
      </div>

      <div className=" ">
        <div className="bg-white  py-4 shadow sm:rounded-lg ">
          {isLogin ? <Login /> : <Signup />}
        </div>
      </div>
    </div>
  );
}

export default AuthPage;