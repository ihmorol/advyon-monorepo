# Advyon Legal Platform - Complete Deployment Guide (A-Z)

This is a comprehensive, step-by-step guide to deploy the Advyon Legal Platform to **Render** (backend) and **Vercel** (frontend).

---

## Table of Contents

1. [Pre-Work Checklist](#1-pre-work-checklist)
2. [Account Setup](#2-account-setup)
3. [Get All API Keys](#3-get-all-api-keys)
4. [MongoDB Atlas Setup](#4-mongodb-atlas-setup)
5. [Deploy Backend to Render](#5-deploy-backend-to-render)
6. [Deploy Frontend to Vercel](#6-deploy-frontend-to-vercel)
7. [Post-Deployment Configuration](#7-post-deployment-configuration)
8. [Testing Your Deployment](#8-testing-your-deployment)
9. [Troubleshooting](#9-troubleshooting)
10. [Maintenance & Monitoring](#10-maintenance--monitoring)

---

## 1. Pre-Work Checklist

Before starting deployment, ensure you have completed these prerequisites:

### 1.1 Code Readiness

Run the deployment test script to verify everything is ready:

```bash
# From project root
node scripts/test-deployment-readiness.js
```

Expected output: **All tests passed** (warnings are acceptable)

### 1.2 Required Accounts

Create accounts on these platforms (all have free tiers):

| Service | Free Tier | URL | Purpose |
|---------|-----------|-----|---------|
| GitHub | Unlimited | github.com | Code hosting |
| Render | 750 hours/month | render.com | Backend hosting |
| Vercel | 100 hours/month | vercel.com | Frontend hosting |
| MongoDB Atlas | 512MB | mongodb.com/atlas | Database |
| Clerk | 25K MAU | clerk.com | Authentication |
| Stripe | Test mode | stripe.com | Payments |
| Cloudinary | 25GB | cloudinary.com | File storage |

### 1.3 Generate JWT Secrets

Generate two secure random strings for JWT tokens:

```bash
# Windows (PowerShell)
[Convert]::ToBase64String([Security.Cryptography.RandomNumberGenerator]::GetBytes(32))

# Windows (Command Prompt)
certutil -hashfile %TEMP%\random.bin HEX | findstr /V "hash" | findstr /V "certutil"

# Or use an online generator: https://generate-random-string.com/
```

Save these secrets securely - you'll need them later.

---

## 2. Account Setup

### 2.1 GitHub Repository

1. Push your code to GitHub (if not already done):

```bash
# In your project root
git init
git add .
git commit -m "Initial commit - ready for deployment"

# Create GitHub repo and push
git remote add origin https://github.com/yourusername/advyon-legal-platform.git
git branch -M main
git push -u origin main
```

2. Ensure you have two separate folders or repos:
   - `advyon-server/` - Backend code
   - `advyon-client/` - Frontend code

### 2.2 Render Account

1. Go to [Render.com](https://render.com)
2. Sign up with GitHub
3. Authorize Render to access your repositories

### 2.3 Vercel Account

1. Go to [Vercel.com](https://vercel.com)
2. Sign up with GitHub
3. Import your repository

---

## 3. Get All API Keys

### 3.1 MongoDB Atlas

1. Go to [MongoDB Atlas](https://www.mongodb.com/atlas)
2. Create a free account
3. Create a project named "Advyon"
4. Build a free cluster:
   - **Provider**: AWS
   - **Region**: us-east-1 (N. Virginia)
   - **Cluster Tier**: M0 Sandbox (Free)
   - **Cluster Name**: advyon-prod
5. Click "Create Cluster" (wait 1-3 minutes)

### 3.2 Clerk (Authentication)

1. Go to [Clerk Dashboard](https://dashboard.clerk.com)
2. Sign up and create your first organization
3. Click "Add Application"
4. Name it "Advyon Legal Platform"
5. Configure:
   - **Sign-in methods**: Email, Google, GitHub
   - **Account portal**: Use default
6. Click "Create Application"
7. Go to **API Keys** tab
8. Copy these keys:
   - `CLERK_SECRET_KEY` (sk_test_... or sk_live_...)
   - `CLERK_PUBLISHABLE_KEY` (pk_test_... or pk_live_...)

### 3.3 Stripe (Payments)

1. Go to [Stripe Dashboard](https://dashboard.stripe.com)
2. Create account (or sign in)
3. Go to **Developers → API Keys**
4. Copy:
   - `STRIPE_SECRET_KEY` (sk_test_... or sk_live_...)
   - `STRIPE_PUBLISHABLE_KEY` (pk_test_... or pk_live_...)
5. Note: Keep using test keys for development

### 3.4 Cloudinary (File Storage)

1. Go to [Cloudinary](https://cloudinary.com)
2. Create free account
3. Go to **Dashboard**
4. Copy:
   - `CLOUDINARY_CLOUD_NAME`
5. Go to **Settings → Upload**
6. Scroll to "Upload presets" 
7. Click "Add upload preset"
8. Name it "advyon_unsigned" (or use default)
9. Set Signing Mode: "Unsigned"
10. Copy:
    - `CLOUDINARY_API_KEY`
    - `CLOUDINARY_API_SECRET`

### 3.5 AI Services (Optional)

**Gemini (Google AI):**
1. Go to [Google AI Studio](https://aistudio.google.com/app/apikey)
2. Create API key
3. Copy `GEMINI_API_KEY`

**Groq:**
1. Go to [Groq Console](https://console.groq.com)
2. Sign up
3. Go to API Keys
4. Copy `GROQ_API_KEY`

**OpenRouter:**
1. Go to [OpenRouter](https://openrouter.ai/settings/keys)
2. Create API key
3. Copy `OPENROUTER_API_KEY`

---

## 4. MongoDB Atlas Setup

### 4.1 Create Database User

1. In Atlas sidebar, click **Database Access**
2. Click **Add New Database User**
3. Configure:
   - **Authentication Method**: Password
   - **Username**: `advyon_app`
   - **Password**: Generate strong password (save it!)
   - **Database User Privileges**: Read and Write to any database
4. Click "Add User"

### 4.2 Network Access

1. Click **Network Access** in sidebar
2. Click **Add IP Address**
3. For testing: Add `0.0.0.0/0` (allows all IPs)
4. For production: Add Render's IP ranges later
5. Click "Confirm"

### 4.3 Get Connection String

1. Click **Database** in sidebar
2. Click "Connect" on your cluster
3. Select **Connect your application**
4. Copy the connection string:
   ```
   mongodb+srv://advyon_app:<password>@advyon-prod.xxxxx.mongodb.net/?retryWrites=true&w=majority
   ```
5. Replace `<password>` with your database user password
6. Replace `<cluster>` with your actual cluster name
7. Add your database name: `/advyon_legal`

Final connection string:
```
mongodb+srv://advyon_app:YOUR_PASSWORD@advyon-prod.xxxxx.mongodb.net/advyon_legal?retryWrites=true&w=majority
```

---

## 5. Deploy Backend to Render

### 5.1 Create Web Service

1. Go to [Render Dashboard](https://dashboard.render.com)
2. Click **New +** → **Web Service**
3. Connect your GitHub repository
4. Find and select `advyon-server` repository
5. Configure:

| Setting | Value |
|---------|-------|
| **Name** | advyon-api |
| **Environment** | Node |
| **Build Command** | `npm run build` |
| **Start Command** | `npm run prod` |
| **Instance Type** | Free (or $7/mo Starter) |

6. Click **Create Web Service**

### 5.2 Environment Variables

After service is created, go to **Environment** tab and add:

```
NODE_ENV=production
PORT=10000
DATABASE_URL=mongodb+srv://advyon_app:YOUR_PASSWORD@advyon-prod.xxxxx.mongodb.net/advyon_legal?retryWrites=true&w=majority
JWT_ACCESS_SECRET=your_generated_jwt_access_secret
JWT_REFRESH_SECRET=your_generated_jwt_refresh_secret
JWT_ACCESS_EXPIRES_IN=7d
JWT_REFRESH_EXPIRES_IN=30d
BCRYPT_SALT_ROUNDS=12
CLERK_SECRET_KEY=sk_test_your_clerk_secret_key
ALLOWED_ORIGINS=http://localhost:5173
RESET_PASS_UI_LINK=http://localhost:5173/reset-password
STRIPE_SECRET_KEY=sk_test_your_stripe_key
STRIPE_WEBHOOK_SECRET=
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
GEMINI_API_KEY=your_gemini_key
GROQ_API_KEY=your_groq_key
OPENROUTER_API_KEY=your_openrouter_key
```

### 5.3 Health Check Configuration

1. In your Render service, go to **Health Check**
2. Configure:
   - **Path**: `/health/live`
   - **Interval**: 5 minutes
   - **Timeout**: 30 seconds
   - **Failure Threshold**: 3

### 5.4 Wait for Deployment

1. Watch the build logs
2. Wait for "Deployed successfully!" message
3. Your backend URL will be: `https://advyon-api.onrender.com`

---

## 6. Deploy Frontend to Vercel

### 6.1 Import Project

1. Go to [Vercel Dashboard](https://vercel.com/dashboard)
2. Click **Add New...** → **Project**
3. Import your GitHub repository
4. Select `advyon-client` repository

### 6.2 Configure Build

| Setting | Value |
|---------|-------|
| **Framework Preset** | Vite |
| **Build Command** | `npm run build` |
| **Output Directory** | `dist` |

### 6.3 Environment Variables

Add these environment variables:

```
VITE_API_URL=https://advyon-api.onrender.com/api/v1
VITE_CLERK_PUBLISHABLE_KEY=pk_test_your_clerk_publishable_key
VITE_STRIPE_PUBLISHABLE_KEY=pk_test_your_stripe_publishable_key
```

### 6.4 Deploy

1. Click **Deploy**
2. Wait for build to complete
3. Your frontend URL: `https://advyon-client.vercel.app`

---

## 7. Post-Deployment Configuration

### 7.1 Update CORS on Render

1. Go to your Render service
2. Edit `ALLOWED_ORIGINS` environment variable
3. Change to:
   ```
   https://advyon-client.vercel.app
   ```
4. Redeploy (click "Deploy" → "Deploy latest")

### 7.2 Configure Clerk

1. Go to [Clerk Dashboard](https://dashboard.clerk.com)
2. Select your application
3. Go to **URL Configuration**
4. Add **Allowed Origins**:
   ```
   https://advyon-client.vercel.app
   https://advyon-client-*.vercel.app
   ```
5. Add **Redirect URLs**:
   ```
   https://advyon-client.vercel.app
   https://advyon-client.vercel.app/auth/sso-callback
   ```

### 7.3 Configure Stripe Webhooks

1. Go to [Stripe Dashboard](https://dashboard.stripe.com)
2. Go to **Developers → Webhooks**
3. Click **Add endpoint**
4. Configure:
   - **Endpoint URL**: `https://advyon-api.onrender.com/api/v1/payment/webhook`
   - **Events**: Select all:
     - `checkout.session.completed`
     - `invoice.payment_succeeded`
     - `invoice.payment_failed`
     - `customer.subscription.created`
     - `customer.subscription.updated`
     - `customer.subscription.deleted`
5. Click **Add endpoint**
6. Copy the **Signing secret** (starts with `whsec_`)
7. Add to Render: `STRIPE_WEBHOOK_SECRET=whsec_your_signing_secret`

### 7.4 Update Reset Password Link

1. Go to Render dashboard
2. Edit `RESET_PASS_UI_LINK`
3. Set to: `https://advyon-client.vercel.app/reset-password`
4. Redeploy

---

## 8. Testing Your Deployment

### 8.1 Basic Tests

| Test | How | Expected |
|------|-----|----------|
| Frontend loads | Visit Vercel URL | Page loads without errors |
| API health | Visit `https://advyon-api.onrender.com/api/v1/health` | JSON response with status |
| Root health | Visit `https://advyon-api.onrender.com/health/live` | `{"status": "alive"}` |

### 8.2 Authentication Test

1. Visit your Vercel URL
2. Click "Sign Up" or "Sign In"
3. Complete Clerk flow
4. Verify you can access dashboard
5. Check browser console for errors

### 8.3 API Test

Test API endpoints using curl or Postman:

```bash
# Test health endpoint
curl https://advyon-api.onrender.com/api/v1/health

# Test with authentication
curl -H "Authorization: Bearer YOUR_CLERK_TOKEN" \
  https://advyon-api.onrender.com/api/v1/users/me
```

### 8.4 WebSocket Test

1. Open browser console
2. Look for Socket.io connection messages
3. Should see: `socket connected`
4. No errors should appear

### 8.5 File Upload Test

1. Go to documents section
2. Upload a test file
3. Verify it uploads to Cloudinary

### 8.6 Payment Test (Stripe)

1. Go to subscription/billing
2. Click upgrade
3. Use Stripe test card: `4242424242424242`
4. Verify payment processes

---

## 9. Troubleshooting

### 9.1 Common Errors

#### CORS Errors
```
Access to XMLHttpRequest has been blocked by CORS policy
```
**Solution**: Update `ALLOWED_ORIGINS` in Render to include your Vercel URL

#### 404 on Refresh
```
Cannot GET /dashboard
```
**Solution**: Ensure `vercel.json` is in client root with correct rewrite config

#### MongoDB Connection Failed
```
MongoServerSelectionError
```
**Solution**: 
1. Check IP whitelist in Atlas includes `0.0.0.0/0`
2. Verify connection string is correct
3. Check database user credentials

#### WebSocket Errors
```
WebSocket connection failed
```
**Solution**: 
1. Enable Sticky Sessions in Render settings
2. Check ALLOWED_ORIGINS includes your frontend

#### Authentication Not Working
```
Clerk: Token verification failed
```
**Solution**: 
1. Verify CLERK_SECRET_KEY is correct
2. Ensure using production keys (sk_live_/pk_live_)

### 9.2 Render Free Tier Issues

**Problem**: Backend sleeps after 15 minutes
**Solution**: 
- Upgrade to Render Starter ($7/mo) for always-on
- Or use a ping service to keep it awake

### 9.3 Build Failures

**Server build fails**:
```bash
cd advyon-server
npm run build
# Check errors locally
```

**Client build fails**:
```bash
cd advyon-client
npm run build
# Check errors locally
```

---

## 10. Maintenance & Monitoring

### 10.1 Environment Variable Management

Never commit `.env` files to Git. Use:
- Render Dashboard for backend
- Vercel Dashboard for frontend

### 10.2 Logging

**Render Logs**:
1. Go to your service
2. Click "Logs" tab
3. View real-time logs

**Vercel Logs**:
1. Go to deployment
2. Click "Function Logs"

### 10.3 Database Backups (MongoDB Atlas)

1. Go to Atlas Dashboard
2. Click "Backup"
3. Configure automated backups (not available on free tier)
4. For free tier: Manual backups via "Export Data"

### 10.4 SSL Certificates

- **Render**: Auto-configured with Let's Encrypt
- **Vercel**: Auto-configured with Let's Encrypt
- No action needed

### 10.5 Updating Your Deployment

**Backend updates**:
1. Push code to GitHub
2. Render auto-deploys on push

**Frontend updates**:
1. Push code to GitHub
2. Vercel auto-deploys on push

---

## Quick Reference

### URLs After Deployment

| Service | URL Format |
|---------|------------|
| Frontend | `https://advyon-client.vercel.app` |
| Backend API | `https://advyon-api.onrender.com/api/v1` |
| Health | `https://advyon-api.onrender.com/health/live` |
| API Docs | `https://advyon-api.onrender.com/api-docs` |

### Environment Variables Summary

**Backend (Render)**:
- `DATABASE_URL` - MongoDB connection string
- `CLERK_SECRET_KEY` - Clerk secret key
- `JWT_ACCESS_SECRET` - JWT access secret
- `JWT_REFRESH_SECRET` - JWT refresh secret
- `STRIPE_SECRET_KEY` - Stripe secret key
- `STRIPE_WEBHOOK_SECRET` - Stripe webhook secret
- `CLOUDINARY_CLOUD_NAME` - Cloudinary cloud name
- `CLOUDINARY_API_KEY` - Cloudinary API key
- `CLOUDINARY_API_SECRET` - Cloudinary API secret
- `ALLOWED_ORIGINS` - Frontend URL(s)
- `RESET_PASS_UI_LINK` - Password reset page URL

**Frontend (Vercel)**:
- `VITE_API_URL` - Backend API URL
- `VITE_CLERK_PUBLISHABLE_KEY` - Clerk publishable key
- `VITE_STRIPE_PUBLISHABLE_KEY` - Stripe publishable key

---

## Cost Summary

| Service | Free Tier | Paid Option |
|---------|-----------|-------------|
| Vercel | 100 hours/month | $20/user/month |
| Render | 750 hours (sleeps) | $7/month (always-on) |
| MongoDB Atlas | 512MB cluster | $9/month (M2) |
| Clerk | 25K MAU | $25/month |
| Stripe | Test mode | Live fees |
| Cloudinary | 25GB bandwidth | $99/month |
| **Total** | **~$0** | **~$40-170/month** |

---

## Need Help?

1. **Run test script**: `node scripts/test-deployment-readiness.js`
2. **Check logs**: Render/Vercel dashboard logs
3. **Verify env vars**: Check all variables are set correctly
4. **Test locally**: Ensure `npm run dev` works before deploying

---

**Last Updated**: March 2026
**Version**: 1.0.0
