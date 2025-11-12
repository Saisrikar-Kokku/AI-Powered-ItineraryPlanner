# Deployment Guide for Vercel

## Security Fixes Applied

### Issues Fixed:
1. ✅ **API Key Security**: Moved `OPENROUTER_API_KEY` from client-side to server-side only
2. ✅ **API Route**: Created server-side API route at `/api/generate-itinerary`
3. ✅ **Environment Variables**: Updated to use proper Next.js conventions

---

## Deployment Steps for Vercel

### 1. Configure Environment Variables

In your Vercel project dashboard, go to **Settings → Environment Variables** and add:

#### Required Variables:

```
NEXT_PUBLIC_SUPABASE_URL=https://psvjfkkwibhsuvqpjvte.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
OPENROUTER_API_KEY=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
NEXT_PUBLIC_APP_URL=https://your-domain.vercel.app
```

#### Important Notes:
- ⚠️ **DO NOT** prefix `OPENROUTER_API_KEY` with `NEXT_PUBLIC_` - it must remain server-side only
- ✅ Supabase URL and anon key CAN be public (they're meant for client-side use)
- ✅ Update `NEXT_PUBLIC_APP_URL` to your actual Vercel domain after first deployment

### 2. Deploy to Vercel

#### Option A: Deploy from Git (Recommended)
1. Push your code to GitHub/GitLab/Bitbucket
2. Go to [Vercel Dashboard](https://vercel.com/dashboard)
3. Click "Add New Project"
4. Import your repository
5. Configure environment variables (see step 1)
6. Click "Deploy"

#### Option B: Deploy via CLI
```bash
# Install Vercel CLI (if not already installed)
npm install -g vercel

# Deploy
vercel

# Set environment variables via CLI
vercel env add OPENROUTER_API_KEY
vercel env add NEXT_PUBLIC_SUPABASE_URL
vercel env add NEXT_PUBLIC_SUPABASE_ANON_KEY
vercel env add NEXT_PUBLIC_APP_URL
```

### 3. Verify Deployment

After deployment:
1. Visit your deployed URL
2. Test the itinerary planner feature
3. Check browser console for any errors
4. Verify that API key is NOT visible in browser (check Network tab)

---

## What Changed?

### Before (Insecure):
```typescript
// ❌ Bad: API key exposed to browser
const apiKey = process.env.NEXT_PUBLIC_OPENROUTER_API_KEY
fetch('https://openrouter.ai/api/v1/...', {
  headers: { 'Authorization': `Bearer ${apiKey}` }
})
```

### After (Secure):
```typescript
// ✅ Good: API key stays on server
// Client calls our API route
fetch('/api/generate-itinerary', {
  method: 'POST',
  body: JSON.stringify(preferences)
})

// Server-side API route handles the actual API call
// app/api/generate-itinerary/route.ts
const apiKey = process.env.OPENROUTER_API_KEY // No NEXT_PUBLIC_ prefix!
```

---

## Troubleshooting

### Build Errors

If you get build errors on Vercel:

1. **Check environment variables are set**:
   - Go to Vercel Dashboard → Your Project → Settings → Environment Variables
   - Ensure `OPENROUTER_API_KEY` (without `NEXT_PUBLIC_`) is set

2. **Clear build cache**:
   - Deployments → ⋮ (three dots) → "Redeploy" → Check "Use existing Build Cache" (uncheck it)

3. **Check logs**:
   - Go to Deployments tab
   - Click on the failed deployment
   - Check "Building" logs for specific errors

### Runtime Errors

If deployment succeeds but app doesn't work:

1. **Check API key is configured**:
   ```bash
   # Via Vercel CLI
   vercel env ls
   ```

2. **Check function logs**:
   - Vercel Dashboard → Your Project → Functions
   - Click on `/api/generate-itinerary`
   - View real-time logs

3. **Verify API route is working**:
   - Visit: `https://your-domain.vercel.app/api/generate-itinerary`
   - Should return error (but not 404) since it's a POST endpoint

### Common Errors

#### Error: "OpenRouter API key is not configured"
**Solution**: Add `OPENROUTER_API_KEY` environment variable in Vercel dashboard (WITHOUT `NEXT_PUBLIC_` prefix)

#### Error: "Invalid OpenRouter API key"
**Solution**: Verify your API key is correct at https://openrouter.ai

#### Error: Rate limit exceeded
**Solution**: Wait a few minutes and try again, or upgrade your OpenRouter plan

---

## Environment Variable Reference

| Variable | Required | Type | Description |
|----------|----------|------|-------------|
| `NEXT_PUBLIC_SUPABASE_URL` | Yes | Public | Supabase project URL |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Yes | Public | Supabase anonymous key |
| `OPENROUTER_API_KEY` | Yes | **Private** | OpenRouter API key (server-side only) |
| `NEXT_PUBLIC_APP_URL` | No | Public | Your app's URL (for OpenRouter referrer) |

---

## Security Best Practices

### ✅ DO:
- Keep API keys server-side only
- Use environment variables for sensitive data
- Rotate API keys regularly
- Monitor API usage

### ❌ DON'T:
- Never use `NEXT_PUBLIC_` prefix for API keys
- Never commit `.env.local` to git (already in `.gitignore`)
- Never share API keys in code or screenshots
- Never log sensitive data

---

## Additional Resources

- [Next.js Environment Variables](https://nextjs.org/docs/basic-features/environment-variables)
- [Vercel Environment Variables](https://vercel.com/docs/concepts/projects/environment-variables)
- [OpenRouter Documentation](https://openrouter.ai/docs)
- [Supabase Documentation](https://supabase.com/docs)

---

## Support

If you encounter issues:
1. Check this deployment guide
2. Review Vercel deployment logs
3. Check browser console for errors
4. Verify all environment variables are set correctly
