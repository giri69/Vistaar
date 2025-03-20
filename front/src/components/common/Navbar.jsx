import React, { useState, useEffect } from 'react';
import { Rocket, Menu, X, LogOut, User } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';

function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    // Check if user is logged in
    const token = localStorage.getItem('token');
    const userData = localStorage.getItem('user');
    
    if (token && userData) {
      setIsAuthenticated(true);
      setUser(JSON.parse(userData));
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setIsAuthenticated(false);
    setUser(null);
    navigate('/');
  };

  const getDashboardLink = () => {
    if (!user) return '/';
    
    switch(user.role) {
      case 'founder':
        return '/founder-dashboard';
      case 'investor':
        return '/investor-dashboard';
      case 'admin':
        return '/admin-dashboard';
      default:
        return '/';
    }
  };

  return (
    <nav className="bg-white shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/">
              <div className="flex items-center">
                <Rocket className="h-8 w-8 text-indigo-600" />
                <span className="ml-2 text-xl font-bold text-gray-900">StartupSync</span>
              </div>
            </Link>
          </div>
          
          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {!isAuthenticated ? (
              <>
                <a href="#features" className="text-gray-600 hover:text-gray-900">Features</a>
                <a href="#how-it-works" className="text-gray-600 hover:text-gray-900">How it Works</a>
                <Link to="/auth" className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700">
                  Get Started
                </Link>
              </>
            ) : (
              <>
                <Link to={getDashboardLink()} className="text-gray-600 hover:text-gray-900">
                  Dashboard
                </Link>
                <div className="flex items-center space-x-2 text-gray-600">
                  <User className="h-5 w-5" />
                  <span>{user.name}</span>
                </div>
                <button
                  onClick={handleLogout}
                  className="flex items-center space-x-2 text-red-600 hover:text-red-800"
                >
                  <LogOut className="h-5 w-5" />
                  <span>Logout</span>
                </button>
              </>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-gray-600 hover:text-gray-900"
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden">
            <div className="pt-2 pb-3 space-y-1">
              {!isAuthenticated ? (
                <>
                  <a
                    href="#features"
                    className="block px-3 py-2 text-gray-600 hover:text-gray-900"
                  >
                    Features
                  </a>
                  <a
                    href="#how-it-works"
                    className="block px-3 py-2 text-gray-600 hover:text-gray-900"
                  >
                    How it Works
                  </a>
                  <Link 
                    to="/auth"
                    className="w-full text-left block px-3 py-2 bg-indigo-600 text-white rounded-md"
                  >
                    Get Started
                  </Link>
                </>
              ) : (
                <>
                  <Link
                    to={getDashboardLink()}
                    className="block px-3 py-2 text-gray-600 hover:text-gray-900"
                  >
                    Dashboard
                  </Link>
                  <div className="block px-3 py-2 text-gray-600">
                    <div className="flex items-center space-x-2">
                      <User className="h-5 w-5" />
                      <span>{user.name}</span>
                    </div>
                  </div>
                  <button
                    onClick={handleLogout}
                    className="w-full text-left block px-3 py-2 text-red-600 hover:text-red-800"
                  >
                    <div className="flex items-center space-x-2">
                      <LogOut className="h-5 w-5" />
                      <span>Logout</span>
                    </div>
                  </button>
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}

export default Navbar;