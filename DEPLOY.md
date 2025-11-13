# Deploying to Render

This guide will help you deploy your e-commerce website to Render.

## Prerequisites

1. **GitHub Account**: Push your code to GitHub
2. **Render Account**: Sign up at [render.com](https://render.com)
3. **MongoDB Atlas**: Set up a free MongoDB cluster at [mongodb.com/cloud/atlas](https://www.mongodb.com/cloud/atlas)
4. **Stripe Account**: Get API keys from [stripe.com](https://stripe.com) (optional, for payments)

## Option 1: Deploy as a Single Service (Recommended)

Deploy both backend and frontend together as one service. This is simpler and works well for most cases.

### Step 1: Push to GitHub

1. Initialize git (if not already done):
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   ```

2. Create a new repository on GitHub

3. Push your code:
   ```bash
   git remote add origin <your-github-repo-url>
   git branch -M main
   git push -u origin main
   ```

### Step 2: Create Web Service on Render

1. Go to [Render Dashboard](https://dashboard.render.com)
2. Click **"New +"** → **"Web Service"**
3. Connect your GitHub repository
4. Select your repository

### Step 3: Configure Service Settings

- **Name:** `online-clothing-store` (or your preferred name)
- **Environment:** `Node`
- **Region:** Choose closest to your users
- **Branch:** `main` (or your default branch)
- **Root Directory:** (leave empty)
- **Runtime:** `Node` (default)
- **Build Command:**
  ```bash
  npm install && cd client && npm install && npm run build && cd ..
  ```
- **Start Command:**
  ```bash
  npm start
  ```

### Step 4: Set Environment Variables

Click on **"Environment"** tab and add these variables:

#### Required Variables:

```
NODE_ENV=production
MONGODB_URI=mongodb+srv://yashyash:yashyash@cluster0.zqfak.mongodb.net/online_clothing?retryWrites=true&w=majority&appName=Cluster0
JWT_SECRET=your_super_secret_random_string_minimum_32_characters_long
```

#### Stripe Variables (for payment functionality):

```
STRIPE_SECRET_KEY=sk_test_your_stripe_secret_key
STRIPE_PUBLISHABLE_KEY=pk_test_your_stripe_publishable_key
STRIPE_WEBHOOK_SECRET=whsec_your_webhook_secret
```

**Note:** 
- Replace `MONGODB_URI` with your actual MongoDB Atlas connection string
- Use a strong random string for `JWT_SECRET` (you can generate one online)
- Get Stripe keys from [Stripe Dashboard](https://dashboard.stripe.com/test/apikeys)

### Step 5: Deploy

1. Click **"Create Web Service"**
2. Render will automatically:
   - Install dependencies
   - Build the React frontend
   - Start the Node.js server
3. Wait for deployment to complete (usually 5-10 minutes)

### Step 6: Access Your Site

Your site will be available at:
```
https://online-clothing-store.onrender.com
```
(Replace with your actual service name)

## Option 2: Using render.yaml (Alternative)

If you prefer using the `render.yaml` file:

1. **Push code with render.yaml** (already included)
2. On Render Dashboard:
   - Click **"New +"** → **"Blueprint"**
   - Connect your repository
   - Render will detect `render.yaml` automatically
3. **Set Environment Variables** manually in the dashboard (same as Step 4 above)

## Setting up MongoDB Atlas

1. Go to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Sign up/Login
3. Create a free cluster (M0)
4. Click "Connect" → "Connect your application"
5. Copy the connection string
6. Replace `<password>` with your database user password
7. Add this as `MONGODB_URI` in Render environment variables

**Example MongoDB URI:**
```
mongodb+srv://yashyash:yashyash@cluster0.zqfak.mongodb.net/online_clothing?retryWrites=true&w=majority&appName=Cluster0
```

## Setting up Stripe

1. Sign up at [Stripe](https://stripe.com)
2. Go to Dashboard → Developers → API Keys
3. Copy your **Test** keys:
   - Publishable key (starts with `pk_test_`)
   - Secret key (starts with `sk_test_`)
4. Add both to Render environment variables

### Stripe Webhooks (Optional)

For production webhooks:
1. In Stripe Dashboard → Developers → Webhooks
2. Add endpoint: `https://your-service.onrender.com/api/payment/webhook`
3. Copy the webhook signing secret to `STRIPE_WEBHOOK_SECRET`

## Post-Deployment Steps

### 1. Seed Sample Data (Optional)

1. Go to your Render service
2. Click **"Shell"** tab (or use SSH)
3. Run:
   ```bash
   npm run seed
   ```

### 2. Create Admin Account

1. Visit your deployed site
2. Register a new account
3. Go to MongoDB Atlas → Browse Collections
4. Find your `users` collection
5. Update your user document:
   - Change `role: "user"` to `role: "admin"`

Or use MongoDB Compass to connect and update.

### 3. Test Your Deployment

- ✅ Visit the homepage
- ✅ Browse products
- ✅ Create an account
- ✅ Add items to cart
- ✅ Test checkout (use Stripe test card: 4242 4242 4242 4242)
- ✅ Access admin dashboard (if admin account created)

## Custom Domain (Optional)

1. Go to your service settings on Render
2. Click **"Custom Domains"**
3. Add your domain
4. Configure DNS records as instructed
5. Wait for SSL certificate to be issued (automatic)

## Troubleshooting

### Build Fails

**Error: Module not found**
- Solution: Ensure all dependencies are in `package.json`
- Check build logs for specific missing packages

**Error: Build timeout**
- Solution: Render free tier has 45min build timeout
- Try building locally first: `npm run build`

### MongoDB Connection Error

**Error: Authentication failed**
- Solution: Check MongoDB URI format
- Ensure database user has correct permissions
- Verify IP whitelist (0.0.0.0/0 for all IPs)

**Error: Connection timeout**
- Solution: Check MongoDB Atlas network access
- Add Render's IP ranges if needed (usually not required)

### Frontend Not Loading

**Error: Blank page**
- Solution: Check browser console for errors
- Verify `NODE_ENV=production` is set
- Ensure build completed successfully

**Error: API calls failing**
- Solution: All API calls use relative paths (`/api/...`)
- Works automatically when served from same domain
- No additional configuration needed

### Services Spinning Down

Render free tier services spin down after 15 minutes of inactivity.

**First request is slow:**
- This is normal for free tier
- Consider upgrading to paid plan for production
- Or use a service like Uptime Robot to ping your site

## Environment Variables Reference

| Variable | Required | Description |
|----------|----------|-------------|
| `NODE_ENV` | Yes | Set to `production` |
| `MONGODB_URI` | Yes | MongoDB connection string |
| `JWT_SECRET` | Yes | Secret for JWT tokens (min 32 chars) |
| `STRIPE_SECRET_KEY` | Optional | Stripe secret key |
| `STRIPE_PUBLISHABLE_KEY` | Optional | Stripe publishable key |
| `STRIPE_WEBHOOK_SECRET` | Optional | Stripe webhook secret |
| `PORT` | Auto | Automatically set by Render |

## Security Checklist

- ✅ Never commit `.env` files (already in `.gitignore`)
- ✅ Use strong `JWT_SECRET` (random 32+ character string)
- ✅ Use MongoDB Atlas with strong password
- ✅ Use Stripe test keys for development
- ✅ Enable MongoDB authentication
- ✅ Review CORS settings (already configured)

## Free Tier Limitations

- Services spin down after 15 min inactivity
- 750 free hours/month
- Build timeout: 45 minutes
- No persistent storage (use MongoDB Atlas)

## Upgrading to Paid Plan

Benefits:
- Services always running
- Custom domains with SSL
- Better performance
- More resources

Upgrade in Render Dashboard → Your Service → Settings → Plan

## Additional Resources

- [Render Documentation](https://render.com/docs)
- [MongoDB Atlas Guide](https://docs.atlas.mongodb.com/)
- [Stripe Documentation](https://stripe.com/docs)

---

**Your site is now live! 🎉**

If you encounter any issues, check:
1. Build logs in Render dashboard
2. Service logs for runtime errors
3. Browser console for frontend errors
4. Network tab for API call issues
