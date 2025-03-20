import React, { useState } from 'react';

const AuthPage = ({ navigateTo }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [userType, setUserType] = useState('founder');
  
  const handleSubmit = (e) => {
    e.preventDefault();
    // In a real app, we'd handle auth here
    if (userType === 'founder') {
      navigateTo('founderDashboard', 'founder');
    } else if (userType === 'investor') {
      navigateTo('investorDashboard', 'investor');
    } else if (userType === 'admin') {
      navigateTo('adminDashboard', 'admin');
    }
  };
  
  return (
    <div>
      <div>
        <button onClick={() => setIsLogin(true)}>Login</button>
        <button onClick={() => setIsLogin(false)}>Sign Up</button>
      </div>
      
      <h2>{isLogin ? 'Login' : 'Create Account'}</h2>
      
      {!isLogin && (
        <div>
          <button onClick={() => setUserType('founder')}>
            Founder
          </button>
          <button onClick={() => setUserType('investor')}>
            Investor
          </button>
        </div>
      )}
      
      <form onSubmit={handleSubmit}>
        {!isLogin && (
          <>
            <div>
              <label>First Name</label>
              <input type="text" />
            </div>
            <div>
              <label>Last Name</label>
              <input type="text" />
            </div>
          </>
        )}
        
        <div>
          <label>Email</label>
          <input type="email" />
        </div>
        
        <div>
          <label>Password</label>
          <input type="password" />
        </div>
        
        {!isLogin && (
          <div>
            <label>Confirm Password</label>
            <input type="password" />
          </div>
        )}
        
        {!isLogin && userType === 'investor' && (
          <div>
            <label>Area of Expertise</label>
            <select>
              <option value="">Select Your Expertise</option>
              <option value="technology">Technology</option>
              <option value="finance">Finance</option>
              <option value="legal">Legal</option>
              <option value="marketing">Marketing</option>
              <option value="operations">Operations</option>
            </select>
          </div>
        )}
        
        <button type="submit">
          {isLogin ? 'Sign In' : 'Create Account'}
        </button>
      </form>
    </div>
  );
};

export default AuthPage;