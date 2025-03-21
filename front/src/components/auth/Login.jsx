import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
// import { useToast } from "@/hooks/use-toast";

function Login() {
  const navigate = useNavigate();
//   const { toast } = useToast();
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);
    
    try {
      const response = await fetch('http://localhost:5030/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      
      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.message || 'Login failed');
      }
      
      localStorage.setItem('token', data.data.token);
      localStorage.setItem('user', JSON.stringify(data.data.user));
      
      const role = data.data.user.role;
      if (role === 'founder') navigate('/founder-dashboard');
      else if (role === 'investor') navigate('/investor-dashboard');
      else if (role === 'admin') navigate('/admin-dashboard');
    
    } catch (err) {
      setError(err.message || 'An error occurred during login');
      toast({
        variant: "destructive",
        title: "Login failed",
        description: err.message || 'An error occurred during login',
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen w-full bg-gradient-to-b from-gray-50 to-gray-100 px-4">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className="w-full max-w-md"
      >
        <div className="bg-white/80 backdrop-blur-md shadow rounded-2xl p-8 border border-gray-100">
          <div className="mb-8 text-center">
            <motion.div 
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.5 }}
              className="w-16 h-16 mx-auto mb-6 rounded-full bg-gradient-to-tr from-blue-500 to-blue-600 flex items-center justify-center"
            >
              🔒
            </motion.div>
            <motion.h2 
              initial={{ y: 10, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.5 }}
              className="text-2xl font-semibold text-gray-900"
            >
              Welcome back
            </motion.h2>
            <p className="mt-2 text-sm text-gray-600">Sign in to your account</p>
          </div>
          
          {error && <div className="mb-6 bg-red-50 border-l-4 border-red-500 p-4 rounded-r text-sm text-red-700">{error}</div>}
          
          <motion.form 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.5 }}
            className="space-y-6" 
            onSubmit={handleSubmit}
          >
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
              <input 
                type="email"
                required
                className="w-full px-4 py-3 border border-gray-200 rounded-lg text-gray-900 text-sm bg-white"
                placeholder="you@example.com"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                disabled={isLoading}
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
              <input 
                type="password"
                required
                className="w-full px-4 py-3 border border-gray-200 rounded-lg text-gray-900 text-sm bg-white"
                placeholder="••••••••"
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                disabled={isLoading}
              />
            </div>
            
            <button 
              type="submit" 
              disabled={isLoading} 
              className={`w-full py-3 rounded-lg text-sm font-medium text-white transition-all duration-300 ${isLoading ? 'bg-blue-400' : 'bg-blue-600 hover:bg-blue-700'}`}
            >
              {isLoading ? 'Signing in...' : 'Sign in'}
            </button>
          </motion.form>
          
          <motion.p className="mt-8 text-sm text-center text-gray-600">
            Don't have an account? <a href="/signup" className="text-blue-600 hover:text-blue-500">Create one now</a>
          </motion.p>
        </div>
      </motion.div>
    </div>
  );
}

export default Login;