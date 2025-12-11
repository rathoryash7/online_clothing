const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Product = require('../models/Product');
const User = require('../models/User');
const Discount = require('../models/Discount');

dotenv.config();

const sampleProducts = [
  {
    name: "Elegant Pearl Necklace",
    description: "Beautiful white pearl necklace perfect for any occasion. Handcrafted with premium materials.",
    category: "jewelry",
    subcategory: "necklaces",
    price: 89.99,
    compareAtPrice: 120.00,
    stock: 15,
    featured: true,
    popular: true,
    images: ["https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=500"],
    sizes: ["One Size"],
    colors: ["White", "Cream"]
  },
  {
    name: "Rose Gold Earrings",
    description: "Delicate rose gold earrings with diamond accents. A timeless piece for your collection.",
    category: "jewelry",
    subcategory: "earrings",
    price: 149.99,
    stock: 10,
    featured: true,
    popular: true,
    images: ["https://images.unsplash.com/photo-1506629082955-511b1aa562c8?w=500"],
    sizes: ["One Size"],
    colors: ["Rose Gold"]
  },
  {
    name: "Silk Evening Dress",
    description: "Elegant silk evening dress in classic black. Perfect for formal events and special occasions.",
    category: "clothing",
    subcategory: "dresses",
    price: 199.99,
    compareAtPrice: 250.00,
    stock: 8,
    featured: true,
    popular: false,
    images: ["https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=500"],
    sizes: ["XS", "S", "M", "L", "XL"],
    colors: ["Black", "Navy"]
  },
  {
    name: "Floral Summer Blouse",
    description: "Light and airy floral blouse perfect for summer days. Made from breathable cotton.",
    category: "clothing",
    subcategory: "tops",
    price: 49.99,
    stock: 20,
    featured: false,
    popular: true,
    images: ["https://images.unsplash.com/photo-1594633313593-bab3825d0caf?w=500"],
    sizes: ["XS", "S", "M", "L"],
    colors: ["Pink", "Blue", "Yellow"]
  },
  {
    name: "Designer Leather Handbag",
    description: "Stylish leather handbag with gold hardware. Spacious interior perfect for everyday use.",
    category: "accessories",
    subcategory: "bags",
    price: 179.99,
    compareAtPrice: 220.00,
    stock: 12,
    featured: true,
    popular: true,
    images: ["https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=500"],
    sizes: ["One Size"],
    colors: ["Brown", "Black", "Tan"]
  },
  {
    name: "Crystal Bracelet Set",
    description: "Set of three crystal bracelets in complementary colors. Mix and match for different looks.",
    category: "jewelry",
    subcategory: "bracelets",
    price: 39.99,
    stock: 25,
    featured: false,
    popular: true,
    images: ["https://images.unsplash.com/photo-1611591437281-460bfbe1220a?w=500"],
    sizes: ["One Size"],
    colors: ["Multi"]
  }
];

const sampleDiscounts = [
  {
    code: "WELCOME10",
    description: "Welcome discount for new customers",
    discountType: "percentage",
    discountValue: 10,
    minPurchase: 50,
    validFrom: new Date(),
    validUntil: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000), // 1 year
    isActive: true,
    usageLimit: 1000
  },
  {
    code: "SAVE20",
    description: "Save $20 on orders over $100",
    discountType: "fixed",
    discountValue: 20,
    minPurchase: 100,
    maxDiscount: 20,
    validFrom: new Date(),
    validUntil: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000),
    isActive: true,
    usageLimit: 500
  }
];

const seedData = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/online_clothing');
    console.log('Connected to MongoDB');

    // Clear existing data
    await Product.deleteMany({});
    await Discount.deleteMany({});
    console.log('Cleared existing data');

    // Insert products
    const products = await Product.insertMany(sampleProducts);
    console.log(`Inserted ${products.length} products`);

    // Insert discounts
    const discounts = await Discount.insertMany(sampleDiscounts);
    console.log(`Inserted ${discounts.length} discount codes`);

    console.log('Data seeding completed!');
    process.exit(0);
  } catch (error) {
    console.error('Error seeding data:', error);
    process.exit(1);
  }
};

seedData();

