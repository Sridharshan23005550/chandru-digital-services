# Chandru Digital Services - Maintenance & Deployment Guide

This guide provides instructions for development, maintenance, and deployment to ensure the project runs error-free.

## Local Development
To run the project locally with both frontend and backend:
1. Open a terminal in the root folder.
2. Run: `npm install` (First time only)
3. Run: `npm run dev`
   - This starts the frontend (Vite) and backend (Node) concurrently.

## Making Changes
If you make changes to the project:
1. **Frontend Changes**: Perform your edits in the `frontend/` directory.
2. **Backend Changes**: Perform your edits in the `backend/` directory.
3. **Verify Locally**: Run `npm run dev` to test your changes.

## Deployment to Render (Production)
The project is now configured for a **Foolproof Monorepo Build**. 

**Standard Setup (Recommended):**
- **Root Directory**: (Leave empty - do NOT set to 'backend')
- **Build Command**: `npm run render-build`
- **Start Command**: `npm start`

**Automated Setup:**
Even if you leave the Build Command as `npm install`, the project will automatically build the frontend thanks to the new `postinstall` script.

**Environment Variables**:
  - `MONGO_URI`: Your MongoDB connection string.
  - `JWT_SECRET`: A secure random string (e.g., `my_secret_key_123`).
  - `NODE_ENV`: `production`

**What happens on Render:**
1. Render runs `npm run render-build`, which installs dependencies for the root, backend, and frontend.
2. It then builds the frontend (`npm run build`).
3. Render runs `npm start`, which starts the backend server.
4. The backend server serves the API at `/api` and the static frontend from `frontend/dist`.

## Common Maintenance Commands
If you need to update dependencies or reset the environment:
- **Install All Dependencies**: `npm run install-all`
- **Build Frontend Manually**: `npm run build-frontend`

## Local Server Persistence (Stay Running)
If you are running the project on a local computer and want it to stay running even after the terminal is closed:
1. Install PM2: `npm install -g pm2`
2. Start the project: `pm2 start backend/server.js --name "chandru-digital"`
3. To stop: `pm2 stop chandru-digital`
4. To see logs: `pm2 logs chandru-digital`

## Troubleshooting
- **Frontend Blank Page**: Ensure `npm run build` has finished and `frontend/dist/index.html` exists.
- **Admin Login Fail**: Ensure `MONGO_URI` is connected and you are using the correct username/password.
- **API Errors**: Check the browser console; it should call routes like `https://chandru-digital-services.onrender.com/api/auth/login`.
