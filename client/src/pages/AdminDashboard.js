import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useAuth } from '../context/AuthContext';

const AdminDashboard = () => {
  const { isAdmin, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const [stats, setStats] = useState(null);
  const [products, setProducts] = useState([]);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('dashboard');
  const [productForm, setProductForm] = useState({
    name: '',
    description: '',
    category: 'jewelry',
    price: '',
    stock: '',
    featured: false,
    popular: false,
    images: [],
    sizes: [],
    colors: []
  });

  useEffect(() => {
    if (!isAuthenticated || !isAdmin) {
      navigate('/');
      return;
    }
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isAuthenticated, isAdmin, navigate, activeTab]);

  const fetchData = async () => {
    try {
      if (activeTab === 'dashboard') {
        const res = await axios.get('/api/admin/stats');
        setStats(res.data);
        setOrders(res.data.recentOrders);
      } else if (activeTab === 'products') {
        const res = await axios.get('/api/products');
        setProducts(res.data);
      } else if (activeTab === 'orders') {
        const res = await axios.get('/api/admin/orders');
        setOrders(res.data);
      }
    } catch (error) {
      toast.error('Failed to fetch data');
    } finally {
      setLoading(false);
    }
  };

  const handleProductSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('/api/admin/products', productForm);
      toast.success('Product created!');
      setProductForm({
        name: '',
        description: '',
        category: 'jewelry',
        price: '',
        stock: '',
        featured: false,
        popular: false,
        images: [],
        sizes: [],
        colors: []
      });
      fetchData();
    } catch (error) {
      toast.error('Failed to create product');
    }
  };

  const handleOrderUpdate = async (orderId, updates) => {
    try {
      await axios.put(`/api/admin/orders/${orderId}`, updates);
      toast.success('Order updated!');
      fetchData();
    } catch (error) {
      toast.error('Failed to update order');
    }
  };

  if (!isAuthenticated || !isAdmin) {
    return null;
  }

  if (loading && activeTab === 'dashboard') {
    return (
      <div className="text-center py-12">
        <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-3xl font-serif font-bold mb-8">Admin Dashboard</h1>

      <div className="flex flex-col md:flex-row gap-8">
        <div className="w-full md:w-64 flex-shrink-0">
          <div className="bg-white rounded-lg shadow-md p-4">
            <nav className="space-y-2">
              {['dashboard', 'products', 'orders'].map((tab) => (
                <button
                  key={tab}
                  onClick={() => {
                    setActiveTab(tab);
                    setLoading(true);
                  }}
                  className={`w-full text-left px-4 py-2 rounded-lg capitalize ${
                    activeTab === tab ? 'bg-primary-100 text-primary-700' : 'hover:bg-gray-100'
                  }`}
                >
                  {tab}
                </button>
              ))}
            </nav>
          </div>
        </div>

        <div className="flex-1">
          {activeTab === 'dashboard' && stats && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                <div className="bg-white rounded-lg shadow-md p-6">
                  <h3 className="text-gray-600 text-sm mb-2">Total Products</h3>
                  <p className="text-3xl font-bold text-primary-600">{stats.totalProducts}</p>
                </div>
                <div className="bg-white rounded-lg shadow-md p-6">
                  <h3 className="text-gray-600 text-sm mb-2">Total Orders</h3>
                  <p className="text-3xl font-bold text-primary-600">{stats.totalOrders}</p>
                </div>
                <div className="bg-white rounded-lg shadow-md p-6">
                  <h3 className="text-gray-600 text-sm mb-2">Total Users</h3>
                  <p className="text-3xl font-bold text-primary-600">{stats.totalUsers}</p>
                </div>
                <div className="bg-white rounded-lg shadow-md p-6">
                  <h3 className="text-gray-600 text-sm mb-2">Revenue</h3>
                  <p className="text-3xl font-bold text-primary-600">${stats.totalRevenue.toFixed(2)}</p>
                </div>
              </div>

              <div className="bg-white rounded-lg shadow-md p-6">
                <h2 className="text-xl font-semibold mb-4">Recent Orders</h2>
                <div className="space-y-4">
                  {orders.slice(0, 5).map((order) => (
                    <div key={order._id} className="flex justify-between items-center border-b pb-4">
                      <div>
                        <p className="font-medium">Order #{order._id.slice(-8)}</p>
                        <p className="text-sm text-gray-600">{order.user?.name || 'Guest'}</p>
                      </div>
                      <div className="text-right">
                        <p className="font-bold">${order.totalPrice.toFixed(2)}</p>
                        <span className="text-xs text-gray-600">{order.status}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {activeTab === 'products' && (
            <div className="space-y-6">
              <div className="bg-white rounded-lg shadow-md p-6">
                <h2 className="text-xl font-semibold mb-4">Add New Product</h2>
                <form onSubmit={handleProductSubmit} className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <input
                      type="text"
                      placeholder="Product Name"
                      value={productForm.name}
                      onChange={(e) => setProductForm({ ...productForm, name: e.target.value })}
                      className="input-field"
                      required
                    />
                    <select
                      value={productForm.category}
                      onChange={(e) => setProductForm({ ...productForm, category: e.target.value })}
                      className="input-field"
                      required
                    >
                      <option value="jewelry">Jewelry</option>
                      <option value="clothing">Clothing</option>
                      <option value="accessories">Accessories</option>
                    </select>
                  </div>
                  <textarea
                    placeholder="Description"
                    value={productForm.description}
                    onChange={(e) => setProductForm({ ...productForm, description: e.target.value })}
                    className="input-field"
                    rows="3"
                    required
                  />
                  <div className="grid grid-cols-2 gap-4">
                    <input
                      type="number"
                      placeholder="Price"
                      value={productForm.price}
                      onChange={(e) => setProductForm({ ...productForm, price: e.target.value })}
                      className="input-field"
                      required
                    />
                    <input
                      type="number"
                      placeholder="Stock"
                      value={productForm.stock}
                      onChange={(e) => setProductForm({ ...productForm, stock: e.target.value })}
                      className="input-field"
                      required
                    />
                  </div>
                  <div className="flex gap-4">
                    <label className="flex items-center">
                      <input
                        type="checkbox"
                        checked={productForm.featured}
                        onChange={(e) => setProductForm({ ...productForm, featured: e.target.checked })}
                        className="mr-2"
                      />
                      Featured
                    </label>
                    <label className="flex items-center">
                      <input
                        type="checkbox"
                        checked={productForm.popular}
                        onChange={(e) => setProductForm({ ...productForm, popular: e.target.checked })}
                        className="mr-2"
                      />
                      Popular
                    </label>
                  </div>
                  <button type="submit" className="btn-primary">Create Product</button>
                </form>
              </div>

              <div className="bg-white rounded-lg shadow-md p-6">
                <h2 className="text-xl font-semibold mb-4">All Products</h2>
                <div className="space-y-4">
                  {products.map((product) => (
                    <div key={product._id} className="flex justify-between items-center border-b pb-4">
                      <div>
                        <p className="font-medium">{product.name}</p>
                        <p className="text-sm text-gray-600">{product.category} • ${product.price}</p>
                      </div>
                      <div className="text-sm text-gray-600">Stock: {product.stock}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {activeTab === 'orders' && (
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-xl font-semibold mb-4">All Orders</h2>
              <div className="space-y-4">
                {orders.map((order) => (
                  <div key={order._id} className="border-b pb-4">
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <p className="font-medium">Order #{order._id.slice(-8)}</p>
                        <p className="text-sm text-gray-600">{order.user?.name || 'Guest'}</p>
                      </div>
                      <div className="text-right">
                        <p className="font-bold">${order.totalPrice.toFixed(2)}</p>
                        <select
                          value={order.status}
                          onChange={(e) => handleOrderUpdate(order._id, { status: e.target.value })}
                          className="text-xs border rounded px-2 py-1"
                        >
                          <option value="pending">Pending</option>
                          <option value="processing">Processing</option>
                          <option value="shipped">Shipped</option>
                          <option value="delivered">Delivered</option>
                          <option value="cancelled">Cancelled</option>
                        </select>
                      </div>
                    </div>
                    <div className="text-sm text-gray-600">
                      {order.orderItems.length} items • {new Date(order.createdAt).toLocaleDateString()}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;

