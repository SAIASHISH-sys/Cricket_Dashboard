# Deploying Frontend + Backend Together on Vercel

## Current Situation
✅ **Backend is working!** - You're seeing "THE APPLICATION IS RUNNING"  
❌ **Frontend not showing** - Need to configure proper routing

## Solution: Updated Configuration

I've updated your project to deploy both frontend and backend together.

### Changes Made:

1. **Updated `vercel.json`**
   - Backend routes: `/api/*` → Flask backend
   - Frontend routes: `/*` → React frontend
   - Static build configuration for Vite

2. **Updated `Chatbot.tsx`**
   - Uses environment variable for API URL
   - `/api/chat` in production (relative URL)
   - `http://localhost:5000/api/chat` in development

3. **Created `frontend/.env.local`**
   - For local development API URL

4. **Created `frontend/.env.example`**
   - Template for team members

## Deploy Steps

### Step 1: Commit and Push Changes

```bash
git add .
git commit -m "Configure frontend and backend deployment together"
git push origin main
```

Vercel will automatically redeploy.

### Step 2: Wait for Build

Go to your Vercel dashboard and wait for:
- ✅ Python backend build
- ✅ Frontend build (npm install + vite build)

### Step 3: Test Your Deployment

**Test Backend:**
```
https://your-app.vercel.app/api/chat
```

**Test Frontend:**
```
https://your-app.vercel.app/
```

You should now see your React dashboard!

## Project Structure

```
cricketdashboard/
├── api/
│   └── index.py           # Backend entry point
├── frontend/
│   ├── src/
│   │   └── components/
│   │       └── Chatbot.tsx # Updated with env var
│   ├── .env.local         # Local development
│   ├── .env.example       # Template
│   └── package.json       # Frontend dependencies
├── app.py                 # Flask backend
├── vercel.json            # Vercel configuration
└── requirements.txt       # Python dependencies
```

## Routing Configuration

| URL Pattern | Goes To | Purpose |
|-------------|---------|---------|
| `/api/*` | Python Backend | Chatbot API |
| `/*` | React Frontend | Dashboard UI |

## How It Works

### Development (Local):
- Frontend: `http://localhost:5173` (Vite dev server)
- Backend: `http://localhost:5000` (Flask)
- Chatbot calls: `http://localhost:5000/api/chat`

### Production (Vercel):
- Frontend: `https://your-app.vercel.app/`
- Backend: Same domain at `/api/*`
- Chatbot calls: `/api/chat` (relative URL)

## Troubleshooting

### Issue: Still seeing "THE APPLICATION IS RUNNING"

**Cause:** Frontend not building properly

**Solution:**
1. Check Vercel build logs
2. Look for npm errors
3. Ensure `frontend/dist` folder is created

### Issue: API calls failing in production

**Cause:** CORS or incorrect API URL

**Solution:**
```tsx
// In Chatbot.tsx, verify this line:
const apiUrl = import.meta.env.VITE_API_URL || '/api/chat';
```

### Issue: 404 on frontend routes

**Cause:** Missing SPA fallback

**Solution:** Add to `vercel.json`:
```json
{
  "rewrites": [
    { "source": "/(.*)", "destination": "/index.html" }
  ]
}
```

## Alternative: Separate Deployments (Recommended for Production)

For better performance, deploy separately:

### Backend on Vercel:
```bash
# Keep current backend deployment
# URL: https://cricket-dashboard-api.vercel.app
```

### Frontend on Vercel (New Project):
```bash
cd frontend
vercel

# Set environment variable in Vercel:
VITE_API_URL=https://cricket-dashboard-api.vercel.app/api/chat
```

**Benefits:**
- Independent scaling
- Faster deployments
- Better caching
- Easier debugging

## Environment Variables

### Backend (Vercel Dashboard):
- `GOOGLE_API_KEY` = Your Google Gemini API key

### Frontend (Vercel Dashboard):
- `VITE_API_URL` = Backend URL (only if deployed separately)

## Testing Checklist

After deployment:

- [ ] Visit root URL - Should see React dashboard
- [ ] Select a player - Should show player info
- [ ] Open chatbot - Should be able to type
- [ ] Send a message - Should get AI response
- [ ] Check browser console - No CORS errors
- [ ] Test on mobile - Responsive design works

## Commands Reference

**Local Development:**
```bash
# Terminal 1: Backend
python app.py

# Terminal 2: Frontend
cd frontend
npm run dev
```

**Deploy:**
```bash
git add .
git commit -m "Your message"
git push origin main
```

**View Logs:**
```bash
vercel logs
```

Your dashboard should now be fully functional on Vercel! 🚀🏏
