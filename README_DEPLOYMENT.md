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
The project is now configured for a **Robust Monorepo Build**. 

**Render Settings:**
1. **Root Directory**: (Leave empty - do NOT set to 'backend')
2. **Build Command**: `npm run build`
3. **Start Command**: `npm start`
4. **Environment Variables**:
   - `MONGO_URI`: Your MongoDB connection string.
   - `JWT_SECRET`: A secure random string.
   - `NODE_ENV`: `production`

---

## Deployment to Vercel (Frontend Only)
If you want to deploy the frontend to Vercel:
1. **Framework Preset**: Vite
2. **Root Directory**: `frontend`
3. **Build Command**: `npm run build`
4. **Output Directory**: `dist`
5. **Environment Variables**:
   - `VITE_API_URL`: `https://your-render-url.onrender.com/api`

---

## Local Development
1. **Initial Setup**: `npm run install-all`
2. **Run Dev**: `npm run dev` (Starts frontend and backend concurrently)

---

## Troubleshooting
- **Blank Page**: Ensure you are pointing to the `dist` or `build` folder in your deployment settings. The server now checks both automatically.
- **API Errors**: Ensure `VITE_API_URL` is set correctly if using Vercel, or that you are using the unified Render URL.
