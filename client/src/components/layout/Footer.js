import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-2xl font-serif font-bold text-white mb-4">Trendy Nari</h3>
            <p className="text-sm">
              Your one-stop destination for elegant women's jewelry and clothing.
            </p>
          </div>
          <div>
            <h4 className="text-white font-semibold mb-4">Shop</h4>
            <ul className="space-y-2 text-sm">
              <li><Link to="/products?category=jewelry" className="hover:text-primary-400">Jewelry</Link></li>
              <li><Link to="/products?category=clothing" className="hover:text-primary-400">Clothing</Link></li>
              <li><Link to="/products?category=accessories" className="hover:text-primary-400">Accessories</Link></li>
              <li><Link to="/products" className="hover:text-primary-400">All Products</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="text-white font-semibold mb-4">Company</h4>
            <ul className="space-y-2 text-sm">
              <li><Link to="/" className="hover:text-primary-400">About Us</Link></li>
              <li><Link to="/" className="hover:text-primary-400">Contact</Link></li>
              <li><Link to="/" className="hover:text-primary-400">Shipping</Link></li>
              <li><Link to="/" className="hover:text-primary-400">Returns</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="text-white font-semibold mb-4">Connect</h4>
            <ul className="space-y-2 text-sm">
              <li><a href="#" className="hover:text-primary-400">Facebook</a></li>
              <li><a href="#" className="hover:text-primary-400">Instagram</a></li>
              <li><a href="#" className="hover:text-primary-400">Twitter</a></li>
              <li><a href="#" className="hover:text-primary-400">Pinterest</a></li>
            </ul>
          </div>
        </div>
        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-sm">
          <p>&copy; 2024 Trendy Nari. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

