# Setup Guide

Follow these steps to get your e-commerce website up and running:

## Prerequisites

- Node.js (v14 or higher)
- MongoDB (running locally or MongoDB Atlas connection string)
- Stripe account (for payment processing - optional for testing)

## Step 1: Install Dependencies

Install all dependencies for both backend and frontend:

```bash
npm run install-all
```

Or install them separately:

```bash
# Backend
npm install

# Frontend
cd client
npm install
cd ..
```

## Step 2: Configure Environment Variables

### Backend (.env in root directory)

Create a `.env` file in the root directory:

```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/online_clothing
JWT_SECRET=your_super_secret_jwt_key_change_this_in_production
STRIPE_SECRET_KEY=sk_test_your_stripe_secret_key
STRIPE_PUBLISHABLE_KEY=pk_test_your_stripe_publishable_key
STRIPE_WEBHOOK_SECRET=whsec_your_webhook_secret
```

### Frontend (client/.env)

Create a `.env` file in the `client` directory:

```env
REACT_APP_STRIPE_PUBLISHABLE_KEY=pk_test_your_stripe_publishable_key
```

**Note:** Replace the Stripe keys with your actual Stripe test keys from your Stripe dashboard.

## Step 3: Start MongoDB

Make sure MongoDB is running on your system:

```bash
# If installed locally, start MongoDB service
# Windows: net start MongoDB
# Mac/Linux: mongod
```

Or use MongoDB Atlas and provide your connection string in the `.env` file.

## Step 4: Seed Sample Data (Optional)

To populate the database with sample products and discount codes:

```bash
npm run seed
```

This will create:
- 6 sample products (jewelry, clothing, accessories)
- 2 sample discount codes (WELCOME10, SAVE20)

## Step 5: Start the Application

### Development Mode (Both Frontend and Backend)

```bash
npm run dev
```

This will start:
- Backend server on http://localhost:5000
- Frontend React app on http://localhost:3000

### Or Start Separately

**Backend only:**
```bash
npm run server
```

**Frontend only:**
```bash
npm run client
```

## Step 6: Access the Application

Open your browser and navigate to:
- **Frontend:** http://localhost:3000
- **Backend API:** http://localhost:5000

## Step 7: Create an Admin Account

1. Register a new account through the sign-up page
2. In MongoDB, find your user document and update the `role` field to `'admin'`:

```javascript
// Using MongoDB shell or Compass
db.users.updateOne(
  { email: "your-email@example.com" },
  { $set: { role: "admin" } }
)
```

Or use MongoDB Compass GUI to update the role manually.

## Step 8: Test Payment Integration (Stripe)

1. Get your Stripe test keys from https://dashboard.stripe.com/test/apikeys
2. Add them to both `.env` files (backend and frontend)
3. Use Stripe test card numbers:
   - **Card Number:** 4242 4242 4242 4242
   - **Expiry:** Any future date
   - **CVC:** Any 3 digits
   - **ZIP:** Any 5 digits

## Troubleshooting

### MongoDB Connection Error
- Ensure MongoDB is running
- Check your `MONGODB_URI` in `.env`
- For MongoDB Atlas, ensure your IP is whitelisted

### Port Already in Use
- Change the `PORT` in `.env` if port 5000 is in use
- React default port is 3000, change it in `client/package.json` if needed

### Stripe Payment Fails
- Ensure Stripe keys are set correctly in both `.env` files
- Use test keys for development
- Check browser console for errors

### Module Not Found
- Run `npm install` in both root and `client` directories
- Delete `node_modules` and `package-lock.json`, then reinstall

## Production Deployment

1. Build the React app:
   ```bash
   npm run build
   ```

2. Set `NODE_ENV=production` in your production environment

3. Use a process manager like PM2 for the Node.js server

4. Configure your MongoDB production database

5. Set up proper Stripe production keys

6. Configure CORS for your production domain

## Next Steps

- Add your own product images
- Customize the design and colors
- Set up email notifications
- Configure shipping options
- Add more product categories

Enjoy your e-commerce website! 🛍️

