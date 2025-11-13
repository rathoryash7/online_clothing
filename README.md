# Trendy Nari - Women's Jewelry & Clothing E-commerce

A modern, responsive e-commerce website built with React, Tailwind CSS, Node.js, Express, and MongoDB.

## Features

- **Homepage**: Beautiful landing page with featured products and category sections
- **Product Catalog**: Browse products with search and filter capabilities (category, price, popularity)
- **Product Details**: Detailed product pages with images, descriptions, sizes, colors, and customer reviews
- **Shopping Cart**: Add/remove items, update quantities, apply discount codes
- **Checkout**: Secure payment processing with Stripe integration
- **User Authentication**: Sign up, login, and profile management
- **Admin Dashboard**: Manage products, orders, and view analytics
- **Mobile Responsive**: Fully optimized for all device sizes
- **Modern UI**: Elegant design with soft colors and beautiful typography

## Tech Stack

### Frontend
- React 18
- React Router DOM
- Tailwind CSS
- Axios
- Stripe.js
- React Toastify

### Backend
- Node.js
- Express.js
- MongoDB with Mongoose
- JWT Authentication
- Stripe Payment Gateway
- Bcrypt for password hashing

## Installation

1. Clone the repository:
```bash
cd online_clothing
```

2. Install backend dependencies:
```bash
npm install
```

3. Install frontend dependencies:
```bash
cd client
npm install
cd ..
```

4. Set up environment variables:
Create a `.env` file in the root directory:
```
PORT=5000
MONGODB_URI=mongodb+srv://yashyash:yashyash@cluster0.zqfak.mongodb.net/online_clothing?retryWrites=true&w=majority&appName=Cluster0
JWT_SECRET=your_super_secret_jwt_key
STRIPE_SECRET_KEY=sk_test_your_stripe_secret_key
STRIPE_PUBLISHABLE_KEY=pk_test_your_stripe_publishable_key
STRIPE_WEBHOOK_SECRET=whsec_your_webhook_secret
```

5. Create a `.env` file in the `client` directory for Stripe publishable key:
```
REACT_APP_STRIPE_PUBLISHABLE_KEY=pk_test_your_stripe_publishable_key
```

6. Make sure MongoDB is running on your system.

## Running the Application

### Development Mode

Run both frontend and backend concurrently:
```bash
npm run dev
```

Or run them separately:

Backend:
```bash
npm run server
```

Frontend:
```bash
npm run client
```

The application will be available at:
- Frontend: http://localhost:3000
- Backend API: http://localhost:5000

## Default Admin Account

To create an admin account, you can either:
1. Register a new account and update the `role` field in MongoDB to `'admin'`
2. Or modify the registration route to allow admin creation

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/me` - Get current user
- `PUT /api/auth/profile` - Update user profile

### Products
- `GET /api/products` - Get all products (with filters)
- `GET /api/products/:id` - Get single product
- `POST /api/products/:id/reviews` - Add product review

### Cart
- `GET /api/cart` - Get user's cart
- `POST /api/cart` - Add item to cart
- `PUT /api/cart/:itemId` - Update cart item
- `DELETE /api/cart/:itemId` - Remove item from cart

### Orders
- `POST /api/orders` - Create new order
- `GET /api/orders` - Get user's orders
- `GET /api/orders/:id` - Get single order

### Admin
- `GET /api/admin/stats` - Get dashboard statistics
- `POST /api/admin/products` - Create product
- `PUT /api/admin/products/:id` - Update product
- `DELETE /api/admin/products/:id` - Delete product
- `GET /api/admin/orders` - Get all orders
- `PUT /api/admin/orders/:id` - Update order status

### Discounts
- `POST /api/discounts/validate` - Validate discount code

### Payment
- `POST /api/payment/create-intent` - Create Stripe payment intent
- `POST /api/payment/webhook` - Stripe webhook handler

## Project Structure

```
online_clothing/
├── client/
│   ├── public/
│   ├── src/
│   │   ├── components/
│   │   │   └── layout/
│   │   ├── context/
│   │   ├── pages/
│   │   ├── App.js
│   │   ├── index.js
│   │   └── index.css
│   ├── package.json
│   └── tailwind.config.js
├── server/
│   ├── models/
│   ├── routes/
│   ├── middleware/
│   └── index.js
├── package.json
└── README.md
```

## Features in Detail

### Search and Filter
- Search products by name or description
- Filter by category (jewelry, clothing, accessories)
- Filter by price range
- Sort by newest, price (low to high, high to low), or popularity

### Discount Codes
- Apply discount codes at checkout
- Support for percentage and fixed amount discounts
- Minimum purchase requirements
- Usage limits

### Payment Integration
- Stripe payment gateway integration
- Secure card payment processing
- Payment intent creation and confirmation

### Admin Features
- View dashboard statistics (products, orders, users, revenue)
- Create and manage products
- Update order status
- View all orders

## Development Notes

- The application uses JWT for authentication
- MongoDB is used for data persistence
- Images should be hosted externally or implemented with file upload (Multer is included but not fully configured)
- Stripe requires test keys for development
- Cart data persists per user session

## Future Enhancements

- Image upload functionality
- Email notifications
- Product variants (size/color combinations)
- Wishlist functionality
- Product recommendations
- Advanced analytics
- Multi-currency support
- International shipping

## License

This project is open source and available under the MIT License.

