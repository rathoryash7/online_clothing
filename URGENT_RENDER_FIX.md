# 🚨 CRITICAL FIX REQUIRED: Render Dashboard Settings

The build is failing because **Render is configured to look for a `client` folder**, but we have renamed it to `frontend`.

You **cannot** fix this by changing the code alone. You **MUST** update the settings in your Render Dashboard.

## 🛠 How to Fix (Step-by-Step)

1.  Log in to [Render Dashboard](https://dashboard.render.com/).
2.  Click on your Web Service (e.g., `online-clothing-store`).
3.  Click on **Settings** in the left sidebar.
4.  Scroll down to the **Build & Deploy** section.
5.  **Edit the "Build Command"**:
    *   **Delete**: `npm install && cd client && npm install && npm run build && cd ..`
    *   **Paste**: `npm run render-build`
6.  **Edit the "Root Directory"** (if set):
    *   Ensure it is empty or set to `.` (dot).
    *   *Do NOT set it to `frontend` or `backend` if you are using the monolithic structure.*
7.  **Save Changes**.
8.  Click **Manual Deploy** > **Clear Build Cache & Deploy**.

---

## Why did this happen?

We restructured the project to be more professional:
*   Old: `/client` and `/server`
*   New: `/frontend` and `/backend`

Your Render "Build Command" setting was manually set to the "Old" way (`cd client`). It overrides our code configuration, so it keeps trying to find the missing folder. Changing the setting tells Render to use the "New" script we added to `package.json`.
