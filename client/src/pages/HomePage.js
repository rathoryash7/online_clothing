import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const HomePage = () => {
  const [featuredProducts, setFeaturedProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchFeaturedProducts();
  }, []);

  const fetchFeaturedProducts = async () => {
    try {
      const res = await axios.get('/api/products?featured=true');
      setFeaturedProducts(res.data);
    } catch (error) {
      console.error('Error fetching featured products:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-primary-50 to-rose-100 py-20 md:py-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-6xl font-serif font-bold text-gray-900 mb-6">
            Elegant Style, Timeless Beauty
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Discover our curated collection of exquisite jewelry and clothing designed for the modern woman
          </p>
          <Link to="/products" className="btn-primary text-lg px-8 py-3 inline-block">
            Shop Now
          </Link>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-serif font-bold text-center mb-12">Shop by Category</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Link to="/products?category=jewelry" className="group">
              <div className="card overflow-hidden">
                <div className="aspect-w-16 aspect-h-20 bg-gradient-to-br from-amber-200 to-amber-400 h-64 flex items-center justify-center">
                  <span className="text-6xl">💎</span>
                </div>
                <div className="p-6">
                  <h3 className="text-2xl font-serif font-semibold mb-2 group-hover:text-primary-600 transition-colors">
                    Jewelry
                  </h3>
                  <p className="text-gray-600">Elegant pieces that sparkle</p>
                </div>
              </div>
            </Link>
            <Link to="/products?category=clothing" className="group">
              <div className="card overflow-hidden">
                <div className="aspect-w-16 aspect-h-20 bg-gradient-to-br from-rose-200 to-rose-400 h-64 flex items-center justify-center">
                  <span className="text-6xl">👗</span>
                </div>
                <div className="p-6">
                  <h3 className="text-2xl font-serif font-semibold mb-2 group-hover:text-primary-600 transition-colors">
                    Clothing
                  </h3>
                  <p className="text-gray-600">Sophisticated and stylish</p>
                </div>
              </div>
            </Link>
            <Link to="/products?category=accessories" className="group">
              <div className="card overflow-hidden">
                <div className="aspect-w-16 aspect-h-20 bg-gradient-to-br from-purple-200 to-purple-400 h-64 flex items-center justify-center">
                  <span className="text-6xl">✨</span>
                </div>
                <div className="p-6">
                  <h3 className="text-2xl font-serif font-semibold mb-2 group-hover:text-primary-600 transition-colors">
                    Accessories
                  </h3>
                  <p className="text-gray-600">Complete your look</p>
                </div>
              </div>
            </Link>
          </div>
        </div>
      </section>

      {/* Featured Products Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-serif font-bold text-center mb-12">Featured Products</h2>
          {loading ? (
            <div className="text-center py-12">
              <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
            </div>
          ) : featuredProducts.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {featuredProducts.slice(0, 4).map((product) => (
                <Link key={product._id} to={`/products/${product._id}`}>
                  <div className="card">
                    <div className="aspect-w-1 aspect-h-1 bg-gray-200 overflow-hidden">
                      {product.images && product.images[0] ? (
                        <img
                          src={product.images[0]}
                          alt={product.name}
                          className="w-full h-64 object-cover hover:scale-105 transition-transform duration-300"
                        />
                      ) : (
                        <div className="w-full h-64 bg-gradient-to-br from-primary-100 to-rose-100 flex items-center justify-center">
                          <span className="text-4xl">🛍️</span>
                        </div>
                      )}
                    </div>
                    <div className="p-4">
                      <h3 className="font-semibold text-lg mb-2 line-clamp-2">{product.name}</h3>
                      <div className="flex items-center justify-between">
                        <span className="text-primary-600 font-bold text-xl">${product.price}</span>
                        {product.compareAtPrice && (
                          <span className="text-gray-400 line-through text-sm">${product.compareAtPrice}</span>
                        )}
                      </div>
                      {product.rating > 0 && (
                        <div className="flex items-center mt-2">
                          <span className="text-yellow-400">★</span>
                          <span className="ml-1 text-sm text-gray-600">
                            {product.rating.toFixed(1)} ({product.numReviews})
                          </span>
                        </div>
                      )}
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          ) : (
            <p className="text-center text-gray-600 py-12">No featured products available</p>
          )}
          <div className="text-center mt-12">
            <Link to="/products" className="btn-primary">
              View All Products
            </Link>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-primary-600 to-rose-600 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-serif font-bold mb-4">
            Join Our Exclusive Community
          </h2>
          <p className="text-xl mb-8 opacity-90">
            Get early access to new collections and special offers
          </p>
          <Link to="/register" className="bg-white text-primary-600 font-medium py-3 px-8 rounded-lg hover:bg-gray-100 transition-colors inline-block">
            Sign Up Now
          </Link>
        </div>
      </section>
    </div>
  );
};

export default HomePage;

