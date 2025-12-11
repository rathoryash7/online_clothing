import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-gradient-to-br from-rose-50 to-pastel-purple/20 text-gray-600 border-t border-rose-100 font-sans">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          <div className="space-y-4">
            <h3 className="text-3xl font-serif font-bold text-transparent bg-clip-text bg-gradient-to-r from-primary-600 to-rose-500">Trendy Nari</h3>
            <p className="text-gray-500 leading-relaxed font-light">
              Your one-stop destination for elegant women's jewelry and clothing. Curated for the modern muse.
            </p>
          </div>
          <div>
            <h4 className="text-gray-900 font-serif font-semibold mb-6 text-lg">Shop Collection</h4>
            <ul className="space-y-3">
              <li><Link to="/products?category=jewelry" className="hover:text-primary-600 transition-colors">Jewelry</Link></li>
              <li><Link to="/products?category=clothing" className="hover:text-primary-600 transition-colors">Clothing</Link></li>
              <li><Link to="/products?category=accessories" className="hover:text-primary-600 transition-colors">Accessories</Link></li>
              <li><Link to="/products" className="hover:text-primary-600 transition-colors">All Products</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="text-gray-900 font-serif font-semibold mb-6 text-lg">Company</h4>
            <ul className="space-y-3">
              <li><Link to="/" className="hover:text-primary-600 transition-colors">About Us</Link></li>
              <li><Link to="/" className="hover:text-primary-600 transition-colors">Contact</Link></li>
              <li><Link to="/" className="hover:text-primary-600 transition-colors">Shipping Information</Link></li>
              <li><Link to="/" className="hover:text-primary-600 transition-colors">Returns & Exchange</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="text-gray-900 font-serif font-semibold mb-6 text-lg">Connect With Us</h4>
            <ul className="space-y-3">
              <li><a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="hover:text-primary-600 transition-colors flex items-center"><span className="mr-2">Follow on</span> Facebook</a></li>
              <li><a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="hover:text-primary-600 transition-colors flex items-center"><span className="mr-2">Follow on</span> Instagram</a></li>
              <li><a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="hover:text-primary-600 transition-colors flex items-center"><span className="mr-2">Follow on</span> Twitter</a></li>
              <li><a href="https://pinterest.com" target="_blank" rel="noopener noreferrer" className="hover:text-primary-600 transition-colors flex items-center"><span className="mr-2">Follow on</span> Pinterest</a></li>
            </ul>
          </div>
        </div>
        <div className="border-t border-rose-200 mt-12 pt-8 text-center text-gray-500 text-sm font-light">
          <p>&copy; {new Date().getFullYear()} Trendy Nari. All rights reserved. Designed with ❤️ for you.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

