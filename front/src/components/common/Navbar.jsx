import React, { useState, useEffect } from 'react';
import { Rocket, Menu, X, LogOut, User } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';

function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
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
    
    // Add scroll event listener
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
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
    <nav 
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        isScrolled ? 'bg-glass py-3' : 'bg-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          <div className="flex items-center animate-fade-in">
            <Link to="/">
              <div className="flex items-center">
                <div className="relative">
                  <Rocket className={`h-8 w-8 ${isScrolled ? 'text-blue-600' : 'text-blue-500'} transition-colors duration-300`} />
                  <div className="absolute -inset-1 bg-blue-500/20 rounded-full blur-sm -z-10"></div>
                </div>
                <span className={`ml-2 text-xl font-medium ${isScrolled ? 'text-gray-900' : 'text-gray-800'} transition-colors duration-300`}>
                  fund<span className="font-bold">mentorship</span>
                </span>
              </div>
            </Link>
          </div>
          
          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8 animate-fade-in">
            {!isAuthenticated ? (
              <>
                <a 
                  href="#features" 
                  className={`${isScrolled ? 'text-gray-700' : 'text-gray-600'} hover:text-blue-600 transition-colors duration-300 font-medium`}
                >
                  Features
                </a>
                <a 
                  href="#how-it-works" 
                  className={`${isScrolled ? 'text-gray-700' : 'text-gray-600'} hover:text-blue-600 transition-colors duration-300 font-medium`}
                >
                  How it Works
                </a>
                <a 
                  href="#benefits" 
                  className={`${isScrolled ? 'text-gray-700' : 'text-gray-600'} hover:text-blue-600 transition-colors duration-300 font-medium`}
                >
                  Benefits
                </a>
                <Link 
                  to="/auth" 
                  className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-5 py-2.5 rounded-lg hover:shadow-lg hover:shadow-blue-500/20 transition-all duration-300 font-medium"
                >
                  Get Started
                </Link>
              </>
            ) : (
              <>
                <Link 
                  to={getDashboardLink()} 
                  className={`${isScrolled ? 'text-gray-700' : 'text-gray-600'} hover:text-blue-600 transition-colors duration-300 font-medium`}
                >
                  Dashboard
                </Link>
                <div className="flex items-center space-x-2 text-gray-600">
                  <div className="p-1.5 bg-blue-100 rounded-full">
                    <User className="h-4 w-4 text-blue-600" />
                  </div>
                  <span>{user.name}</span>
                </div>
                <button
                  onClick={handleLogout}
                  className="flex items-center space-x-2 text-red-600 hover:text-red-800 transition-colors duration-300"
                >
                  <LogOut className="h-4 w-4" />
                  <span>Logout</span>
                </button>
              </>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className={`${isScrolled ? 'text-gray-800' : 'text-gray-700'} hover:text-blue-600 transition-colors duration-300 focus:outline-none`}
              aria-label="Toggle mobile menu"
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden animate-slide-in">
            <div className="py-4 space-y-4">
              {!isAuthenticated ? (
                <>
                  <a
                    href="#features"
                    className="block py-2 text-gray-700 hover:text-blue-600 transition-colors duration-300 font-medium"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Features
                  </a>
                  <a
                    href="#how-it-works"
                    className="block py-2 text-gray-700 hover:text-blue-600 transition-colors duration-300 font-medium"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    How it Works
                  </a>
                  <a
                    href="#benefits"
                    className="block py-2 text-gray-700 hover:text-blue-600 transition-colors duration-300 font-medium"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Benefits
                  </a>
                  <Link 
                    to="/auth"
                    className="block w-full mt-4 bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-5 py-2.5 rounded-lg text-center font-medium"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Get Started
                  </Link>
                </>
              ) : (
                <>
                  <Link
                    to={getDashboardLink()}
                    className="block py-2 text-gray-700 hover:text-blue-600 transition-colors duration-300 font-medium"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Dashboard
                  </Link>
                  <div className="py-2 text-gray-700">
                    <div className="flex items-center space-x-2">
                      <div className="p-1.5 bg-blue-100 rounded-full">
                        <User className="h-4 w-4 text-blue-600" />
                      </div>
                      <span>{user.name}</span>
                    </div>
                  </div>
                  <button
                    onClick={() => {
                      handleLogout();
                      setIsMenuOpen(false);
                    }}
                    className="w-full text-left py-2 text-red-600 hover:text-red-800 transition-colors duration-300"
                  >
                    <div className="flex items-center space-x-2">
                      <LogOut className="h-4 w-4" />
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