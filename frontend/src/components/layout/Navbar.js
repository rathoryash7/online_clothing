import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const Navbar = () => {
  const { user, logout, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/products?search=${encodeURIComponent(searchQuery)}`);
      setSearchQuery('');
    }
  };

  return (
    <nav className="bg-white/90 backdrop-blur-md shadow-sm sticky top-0 z-50 border-b border-rose-100 transition-all duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          <Link to="/" className="flex items-center space-x-2 group">
            <span className="text-3xl font-serif font-bold text-transparent bg-clip-text bg-gradient-to-r from-primary-600 to-rose-500 group-hover:from-primary-700 group-hover:to-rose-600 transition-all">Trendy</span>
            <span className="text-3xl font-serif font-light text-gray-800">Nari</span>
          </Link>

          <div className="hidden md:flex flex-1 justify-center mx-12">
            <form onSubmit={handleSearch} className="w-full max-w-lg relative group">
              <input
                type="text"
                placeholder="Search for elegance..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-2.5 bg-gray-50 border border-gray-200 rounded-full focus:ring-2 focus:ring-primary-200 focus:border-primary-300 outline-none transition-all shadow-sm group-hover:bg-white group-hover:shadow-md"
              />
              <span className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 group-focus-within:text-primary-500 transition-colors">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </span>
            </form>
          </div>

          <div className="hidden md:flex items-center space-x-8">
            <Link to="/products" className="font-serif text-gray-700 hover:text-primary-600 transition-colors text-lg">
              Shop
            </Link>
            <Link to="/cart" className="font-serif text-gray-700 hover:text-primary-600 transition-colors relative text-lg group">
              Cart
              <span className="absolute -top-1 -right-2 w-2 h-2 bg-primary-500 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"></span>
            </Link>
            {isAuthenticated ? (
              <>
                {user?.role === 'admin' && (
                  <Link to="/admin" className="font-serif text-gray-700 hover:text-primary-600 transition-colors text-lg">
                    Admin
                  </Link>
                )}
                <Link to="/profile" className="font-serif text-gray-700 hover:text-primary-600 transition-colors text-lg">
                  Profile
                </Link>
                <button
                  onClick={handleLogout}
                  className="font-serif text-gray-700 hover:text-primary-600 transition-colors text-lg"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link to="/login" className="font-serif text-gray-700 hover:text-primary-600 transition-colors text-lg">
                  Login
                </Link>
                <Link to="/register" className="btn-primary">
                  Sign Up
                </Link>
              </>
            )}
          </div>

          <button
            className="md:hidden text-gray-700 hover:text-primary-600 transition-colors"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>

        {isMenuOpen && (
          <div className="md:hidden py-4 border-t border-gray-100 bg-white/95 backdrop-blur-sm rounded-b-2xl shadow-lg absolute left-0 right-0 px-4">
            <div className="flex flex-col space-y-4">
              <form onSubmit={handleSearch} className="mb-2 relative">
                <input
                  type="text"
                  placeholder="Search..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-lg focus:ring-1 focus:ring-primary-300 outline-none"
                />
                <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </span>
              </form>
              <Link to="/products" className="font-serif text-gray-700 hover:text-primary-600 px-2 py-1">Shop</Link>
              <Link to="/cart" className="font-serif text-gray-700 hover:text-primary-600 px-2 py-1">Cart</Link>
              {isAuthenticated ? (
                <>
                  {user?.role === 'admin' && (
                    <Link to="/admin" className="font-serif text-gray-700 hover:text-primary-600 px-2 py-1">Admin</Link>
                  )}
                  <Link to="/profile" className="font-serif text-gray-700 hover:text-primary-600 px-2 py-1">Profile</Link>
                  <button onClick={handleLogout} className="text-left font-serif text-gray-700 hover:text-primary-600 px-2 py-1">
                    Logout
                  </button>
                </>
              ) : (
                <>
                  <Link to="/login" className="font-serif text-gray-700 hover:text-primary-600 px-2 py-1">Login</Link>
                  <Link to="/register" className="btn-primary inline-block text-center">Sign Up</Link>
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;

