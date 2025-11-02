# Quick Render Deployment Guide

## 🚀 Quick Start (5 minutes)

### 1. Push to GitHub
```bash
git init
git add .
git commit -m "Ready for deployment"
git remote add origin <your-repo-url>
git push -u origin main
```

### 2. Create Render Service
1. Go to [render.com](https://render.com) → Sign up
2. Click **"New +"** → **"Web Service"**
3. Connect GitHub repository
4. Use these settings:

**Basic Settings:**
- Name: `online-clothing-store`
- Environment: `Node`
- Region: Choose closest
- Branch: `main`

**Build & Deploy:**
- Build Command:
  ```bash
  npm install && cd client && npm install && npm run build && cd ..
  ```
- Start Command:
  ```bash
  npm start
  ```

### 3. Environment Variables
Click "Environment" and add:

```
NODE_ENV=production
MONGODB_URI=mongodb+srv://user:pass@cluster.mongodb.net/online_clothing?retryWrites=true&w=majority
JWT_SECRET=<generate-a-random-32-character-string>
```

**Optional (for payments):**
```
STRIPE_SECRET_KEY=sk_test_...
STRIPE_PUBLISHABLE_KEY=pk_test_...
STRIPE_WEBHOOK_SECRET=whsec_...
```

### 4. Get MongoDB URI
1. Go to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Create free cluster
3. Database Access → Create user
4. Network Access → Add IP (0.0.0.0/0 for all)
5. Connect → Get connection string
6. Replace `<password>` with your password

### 5. Deploy!
Click **"Create Web Service"** and wait ~5 minutes.

**Your site:** `https://online-clothing-store.onrender.com`

---

## ✅ Post-Deployment Checklist

- [ ] Site loads successfully
- [ ] Can browse products
- [ ] Can register/login
- [ ] Can add items to cart
- [ ] Can view profile
- [ ] (Optional) Seed sample data: `npm run seed`
- [ ] (Optional) Create admin account in MongoDB

---

## 🆘 Common Issues

**Build fails?**
- Check build logs in Render dashboard
- Ensure all dependencies are in package.json

**MongoDB connection error?**
- Verify connection string format
- Check username/password
- Verify IP whitelist (0.0.0.0/0)

**Site loads but API fails?**
- API calls work automatically (same origin in production)
- Check service logs for errors

**Slow first load?**
- Normal for free tier (spins down after 15min inactivity)
- First request after spin-down takes ~30 seconds

---

## 📝 Notes

- Free tier: Services spin down after inactivity
- Paid tier: Always running + custom domain
- All API calls use relative paths (no config needed)
- Frontend served from same domain as backend

---

**Need help?** Check full guide in `DEPLOY.md`

