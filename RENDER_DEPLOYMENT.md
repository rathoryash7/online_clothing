# Modern Deployment Guide for Online Clothing Store

This project has been restructured into a modern full-stack architecture with separate `frontend` and `backend` directories. This allows for cleaner code management and scalable deployment.

## 📂 Project Structure

```
/
├── backend/         # Server, API, Database (Node.js/Express)
├── frontend/        # UI, Components, Pages (React)
├── package.json     # Root scripts
└── render.yaml      # Render Blueprint (optional)
```

---

## 🚀 Deployment Strategy

You can deploy this application in two ways on **Render**:

1.  **Monolithic Service (Simplest)**: One Web Service that runs the backend and serves the frontend static files.
2.  **Separate Services (Recommended for Scale)**:
    - **Backend**: A Web Service (Node.js)
    - **Frontend**: A Static Site (React)

The instructions below cover the **Separate Services** approach as it is more robust and allows you to replace localhost URLs with absolute production URLs.

---

## Part 1: Backend Deployment (Web Service)

1.  **Create New Web Service** on Render.
2.  **Connect your GitHub repository**.
3.  **Settings**:
    - **Name**: `online-clothing-backend`
    - **Root Directory**: `.` (or leave empty)
    - **Environment**: `Node`
    - **Build Command**: `npm install`
    - **Start Command**: `node backend/index.js`
4.  **Environment Variables** (Add these in the Dashboard):
    - `NODE_ENV`: `production`
    - `PORT`: `10000`
    - `MONGODB_URI`: `your_mongodb_connection_string`
    - `JWT_SECRET`: `your_secure_random_string`
    - `CLIENT_URL`: `https://your-frontend-url.onrender.com` (Add this later after deploying frontend)
    - `STRIPE_SECRET_KEY`: `sk_test_...` (if using payments)

5.  **Deploy**.
    - Once deployed, copy the **Backend URL** (e.g., `https://online-clothing-backend.onrender.com`).

---

## Part 2: Frontend Deployment (Static Site)

1.  **Create New Static Site** on Render.
2.  **Connect the same GitHub repository**.
3.  **Settings**:
    - **Name**: `online-clothing-frontend`
    - **Root Directory**: `frontend`
    - **Build Command**: `npm install && npm run build`
    - **Publish Directory**: `build`
4.  **Environment Variables**:
    - `REACT_APP_API_URL`: Paste your **Backend URL** here (e.g., `https://online-clothing-backend.onrender.com`).
    *Note: Do not add a trailing slash.*

5.  **Deploy**.
    - Your frontend will build and be live at `https://online-clothing-frontend.onrender.com`.

---

## Part 3: Final Connection

1.  Go back to your **Backend Service** settings on Render.
2.  Update the `CLIENT_URL` environment variable with your **Frontend URL** (e.g., `https://online-clothing-frontend.onrender.com`).
    - *This ensures CORS is correctly configured to allow requests only from your frontend.*

---

## 🛠 Local Development Update

We have modernized the local development flow.

### 1. Install Dependencies
Run from the root folder:
```bash
npm run install-all
```

### 2. Start Development Servers
Run from the root folder:
```bash
npm run dev
```
This command concurrently starts:
- **Backend** on `http://localhost:5000` (or `PORT` env var)
- **Frontend** on `http://localhost:3000`

### 3. Environment Variables (.env)
Ensure your `.env` file in the **root** or **backend** folder has:
```
PORT=5000
MONGODB_URI=...
JWT_SECRET=...
CLIENT_URL=http://localhost:3000
```

Ensure your `.env` (or `.env.local`) in the **frontend** folder has:
```
REACT_APP_API_URL=http://localhost:5000
```

---

## ✨ Features Added

- **Restructured Folder Architecture**: Clean separation of concerns.
- **Modern UI**: Pastel color palette, glassmorphism navbar, rounded cards, and elegant typography.
- **Security**: CORS configured to strict origins in production.
- **Environment Aware**: No hardcoded "localhost" URLs.
