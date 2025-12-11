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
      <section className="relative bg-gradient-to-br from-pastel-pink via-white to-pastel-purple py-24 md:py-36 overflow-hidden">
        <div className="absolute inset-0 bg-grid-slate-100 [mask-image:linear-gradient(0deg,white,rgba(255,255,255,0.6))] -z-10"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10 fade-in">
          <h1 className="text-5xl md:text-7xl font-serif font-bold text-gray-900 mb-8 leading-tight">
            Elegant Style,<br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-600 to-rose-500">Timeless Beauty</span>
          </h1>
          <p className="text-xl md:text-2xl text-gray-700 mb-10 max-w-2xl mx-auto font-light leading-relaxed">
            Discover our curated collection of exquisite jewelry and clothing designed for the modern woman.
          </p>
          <Link to="/products" className="btn-primary text-lg px-10 py-4 inline-flex items-center space-x-2 shadow-xl shadow-rose-200/50">
            <span>Shop Collection</span>
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
          </Link>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-serif font-bold text-center mb-16 text-gray-800">Curated Categories</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            <Link to="/products?category=jewelry" className="group">
              <div className="card h-full transform transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl hover:shadow-amber-100/50">
                <div className="aspect-w-16 aspect-h-20 bg-gradient-to-br from-amber-100 to-pastel-cream h-72 flex items-center justify-center relative overflow-hidden">
                  <div className="absolute inset-0 bg-white/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  <span className="text-7xl transform group-hover:scale-110 transition-transform duration-300 drop-shadow-lg">💎</span>
                </div>
                <div className="p-8 text-center">
                  <h3 className="text-2xl font-serif font-semibold mb-3 group-hover:text-primary-600 transition-colors">
                    Jewelry
                  </h3>
                  <p className="text-gray-500 font-light">Sparkle with elegance</p>
                </div>
              </div>
            </Link>
            <Link to="/products?category=clothing" className="group">
              <div className="card h-full transform transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl hover:shadow-rose-100/50">
                <div className="aspect-w-16 aspect-h-20 bg-gradient-to-br from-rose-100 to-pastel-pink h-72 flex items-center justify-center relative overflow-hidden">
                  <div className="absolute inset-0 bg-white/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  <span className="text-7xl transform group-hover:scale-110 transition-transform duration-300 drop-shadow-lg">👗</span>
                </div>
                <div className="p-8 text-center">
                  <h3 className="text-2xl font-serif font-semibold mb-3 group-hover:text-primary-600 transition-colors">
                    Clothing
                  </h3>
                  <p className="text-gray-500 font-light">Sophisticated styles</p>
                </div>
              </div>
            </Link>
            <Link to="/products?category=accessories" className="group">
              <div className="card h-full transform transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl hover:shadow-purple-100/50">
                <div className="aspect-w-16 aspect-h-20 bg-gradient-to-br from-pastel-purple to-pastel-lavender h-72 flex items-center justify-center relative overflow-hidden">
                  <div className="absolute inset-0 bg-white/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  <span className="text-7xl transform group-hover:scale-110 transition-transform duration-300 drop-shadow-lg">✨</span>
                </div>
                <div className="p-8 text-center">
                  <h3 className="text-2xl font-serif font-semibold mb-3 group-hover:text-primary-600 transition-colors">
                    Accessories
                  </h3>
                  <p className="text-gray-500 font-light">The perfect finish</p>
                </div>
              </div>
            </Link>
          </div>
        </div>
      </section>

      {/* Featured Products Section */}
      <section className="py-20 bg-gray-50/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-end mb-12">
            <div>
              <h2 className="text-3xl font-serif font-bold text-gray-800 mb-2">Featured Collection</h2>
              <div className="h-1 w-20 bg-primary-400 rounded-full"></div>
            </div>
            <Link to="/products" className="hidden md:flex items-center text-primary-600 font-medium hover:text-primary-700 transition-colors">
              View All <span className="ml-1">→</span>
            </Link>
          </div>

          {loading ? (
            <div className="text-center py-20">
              <div className="inline-block animate-spin rounded-full h-12 w-12 border-4 border-primary-200 border-t-primary-600"></div>
            </div>
          ) : featuredProducts.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {featuredProducts.slice(0, 4).map((product) => (
                <Link key={product._id} to={`/products/${product._id}`} className="group">
                  <div className="card h-full flex flex-col">
                    <div className="aspect-w-1 aspect-h-1 bg-gray-100 overflow-hidden relative">
                      {product.images && product.images[0] ? (
                        <img
                          src={product.images[0]}
                          alt={product.name}
                          className="w-full h-72 object-cover transition-transform duration-500 group-hover:scale-110"
                        />
                      ) : (
                        <div className="w-full h-72 bg-gradient-to-br from-pastel-pink to-pastel-cream flex items-center justify-center">
                          <span className="text-5xl">🛍️</span>
                        </div>
                      )}
                      <div className="absolute inset-0 bg-black/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                      <div className="absolute bottom-4 right-4 translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
                        <span className="bg-white p-2 rounded-full shadow-lg block text-primary-600">
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" /></svg>
                        </span>
                      </div>
                    </div>
                    <div className="p-5 flex-grow flex flex-col justify-between">
                      <div>
                        <h3 className="font-serif font-semibold text-lg mb-2 text-gray-800 line-clamp-2 group-hover:text-primary-600 transition-colors">{product.name}</h3>
                        {product.rating > 0 && (
                          <div className="flex items-center mb-2">
                            <span className="text-amber-400">★★★★★</span>
                            <span className="ml-1 text-xs text-gray-500">({product.numReviews})</span>
                          </div>
                        )}
                      </div>
                      <div className="flex items-center justify-between mt-3">
                        <span className="text-primary-700 font-bold text-xl">${product.price}</span>
                        {product.compareAtPrice && (
                          <span className="text-gray-400 line-through text-sm">${product.compareAtPrice}</span>
                        )}
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          ) : (
            <p className="text-center text-gray-500 py-12 italic">No featured products available at the moment.</p>
          )}
          <div className="text-center mt-12 md:hidden">
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

