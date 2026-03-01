# Deployment Readiness Test

This script tests if both the client and server are ready for deployment to Render and Vercel.

## Quick Start

```bash
# Run from project root
node scripts/test-deployment-readiness.js

# Or use npm script
npm run test:deploy
```

## What Gets Tested

### Server Tests (Render)
- ✅ TypeScript compiles successfully
- ✅ All required npm scripts exist
- ✅ Health endpoints configured
- ✅ Root health endpoints for Render
- ✅ MongoDB configuration present
- ✅ JWT configuration present
- ✅ CORS configuration present
- ✅ Rate limiting enabled
- ✅ Socket.io configured
- ✅ Stripe webhook endpoint exists
- ✅ Cloudinary configuration present
- ✅ Environment variables documented

### Client Tests (Vercel)
- ✅ Vite builds successfully
- ✅ vercel.json configured for SPA routing
- ✅ React Router integration
- ✅ API URL configuration via env vars
- ✅ Clerk authentication integrated
- ✅ Stripe payment integrated
- ✅ Socket.io client configured
- ✅ VITE_ prefix used for env vars

### Shared Tests
- ✅ Correct directory structure
- ✅ DEPLOYMENT_GUIDE.md exists
- ✅ Git repository initialized

## Warnings (Non-Critical)

The test may show 2 warnings:
1. **Hardcoded secrets in .env** - This is a warning to remind you to use environment variables in production, not to commit secrets
2. **Large bundle size** - The client bundle is large (>2MB) which may slow initial load but won't break deployment

## Exit Codes

- `0` - All tests passed, ready for deployment
- `1` - Some tests failed, fix issues before deploying

## Troubleshooting

### "TypeScript compile error"
```bash
cd advyon-server
npm run build
# Fix any TypeScript errors
```

### "Vite build failed"
```bash
cd advyon-client
npm run build
# Fix any build errors
```

### "Missing vercel.json"
The file should be in `advyon-client/vercel.json`

### "Missing health endpoints"
Ensure `health.root.route.ts` exists in server
