# MongoDB URI Setup for Render Deployment

## Quick Fix for "MONGODB_URI environment variable is not set!" Error

### Step 1: Format Your MongoDB Connection String

Your MongoDB URI from Atlas:
```
mongodb+srv://yashyash:<db_password>@cluster0.zqfak.mongodb.net/?appName=Cluster0
```

**Formatted version with database name and connection options:**
```
mongodb+srv://yashyash:yashyash@cluster0.zqfak.mongodb.net/online_clothing?retryWrites=true&w=majority&appName=Cluster0
```

### Step 2: Replace Password Placeholder

1. Replace `<db_password>` with your actual MongoDB Atlas password
2. If your password contains special characters, URL encode them:
   - `@` → `%40`
   - `#` → `%23`
   - `$` → `%24`
   - `%` → `%25`
   - `&` → `%26`
   - `+` → `%2B`
   - `=` → `%3D`
   - `/` → `%2F`
   - `?` → `%3F`

**Example:** If your password is `MyP@ss#123`, the encoded password would be `MyP%40ss%23123`

### Step 3: Set Environment Variable in Render

1. Go to [Render Dashboard](https://dashboard.render.com)
2. Click on your service: **online-clothing**
3. Click on **Environment** tab
4. Click **Add Environment Variable**
5. Enter:
   - **Key**: `MONGODB_URI`
   - **Value**: `mongodb+srv://yashyash:yashyash@cluster0.zqfak.mongodb.net/online_clothing?retryWrites=true&w=majority&appName=Cluster0`
6. Click **Save Changes**
7. Render will automatically redeploy your service

### Step 4: Verify Connection

After deployment, check the **Runtime Logs** in Render dashboard. You should see:
```
✅ MongoDB connected successfully
```

Instead of:
```
❌ ERROR: MONGODB_URI environment variable is not set!
```

### Additional Environment Variables (Optional but Recommended)

While you're in the Environment tab, also add:

1. **JWT_SECRET** (for authentication):
   - Generate a random 32+ character string
   - Example: Use an online generator or `openssl rand -hex 32`

2. **NODE_ENV**:
   - Value: `production`

### Troubleshooting

**Still getting connection errors?**
- Verify your password is correct
- Check if special characters in password are URL encoded
- Ensure MongoDB Atlas Network Access allows connections from anywhere (`0.0.0.0/0`)
- Verify your MongoDB Atlas user has the correct permissions

**Need to test your connection string?**
Create a `.env` file locally with your connection string and test:
```bash
node server/index.js
```

If it connects successfully locally, it should work on Render too!

