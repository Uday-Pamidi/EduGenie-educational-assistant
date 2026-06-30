# EduGenie Deployment Guide

## Quick Start Deployment

### Step 1: Prepare Your Environment

1. **Neon PostgreSQL**
   - Create a Neon account at [neon.tech](https://neon.tech)
   - Create a new project and database
   - Copy the connection string (DATABASE_URL)

2. **Google Generative AI**
   - Go to [Google AI Studio](https://makersuite.google.com/app/apikey)
   - Create an API key for Generative AI
   - Copy the key (GOOGLE_GENERATIVE_AI_API_KEY)

3. **Better Auth Secret**
   - Generate a secure random string:
   ```bash
   openssl rand -base64 32
   ```

### Step 2: Local Testing

```bash
# Install dependencies
pnpm install

# Create .env.local file
echo "DATABASE_URL=your_neon_connection_string" > .env.local
echo "BETTER_AUTH_SECRET=your_secret_here" >> .env.local
echo "GOOGLE_GENERATIVE_AI_API_KEY=your_api_key" >> .env.local

# Run development server
pnpm dev
```

Visit http://localhost:3000 and test the application.

### Step 3: Deploy to Vercel

#### Option A: CLI Deployment

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel

# Follow prompts and select:
# - Link to existing project or create new
# - Set environment variables when prompted
```

#### Option B: GitHub Integration

1. Push code to GitHub
2. Go to [vercel.com](https://vercel.com)
3. Click "Add New..." → "Project"
4. Import your GitHub repository
5. Add environment variables:
   - `DATABASE_URL`
   - `BETTER_AUTH_SECRET`
   - `GOOGLE_GENERATIVE_AI_API_KEY`
6. Click "Deploy"

#### Option C: Manual Upload

1. Go to [vercel.com](https://vercel.com)
2. Create new project
3. Upload the project files
4. Configure environment variables
5. Deploy

### Step 4: Post-Deployment

1. **Verify Deployment**
   - Visit your deployment URL
   - Test sign-up and sign-in
   - Test a learning module

2. **Set Custom Domain** (Optional)
   - In Vercel project settings
   - Add your custom domain
   - Update DNS records

3. **Enable Analytics** (Optional)
   - In Vercel project settings
   - Enable Web Analytics

## Environment Variables

### Required Variables

```env
# Database Connection
DATABASE_URL=postgresql://user:password@host/dbname

# Authentication Secret (generate with: openssl rand -base64 32)
BETTER_AUTH_SECRET=generated_secret_here

# Google Generative AI API Key
GOOGLE_GENERATIVE_AI_API_KEY=your_api_key

# Optional: Override auth URL
BETTER_AUTH_URL=https://your-domain.com
```

### How to Set Environment Variables

**In Vercel Dashboard:**
1. Go to Project Settings
2. Navigate to Environment Variables
3. Add each variable with value
4. Redeploy after adding

## Database Migrations

The application uses Neon directly for schema management. Tables are already created via SQL scripts.

To manually create tables:

1. Connect to your Neon database
2. Run the SQL in `lib/db/schema.ts` through the Neon console

## Monitoring & Debugging

### View Logs
```bash
vercel logs [deployment-url]
```

### Check Application
- Sign-in page should load at `/sign-in`
- Dashboard at `/` (protected)
- Error handling for failed AI requests

### Common Issues

**"Module not found" error**
- Clear `.next` folder: `rm -rf .next`
- Reinstall: `pnpm install`
- Rebuild: `pnpm build`

**Database connection error**
- Verify `DATABASE_URL` is correct
- Check Neon firewall settings
- Ensure database exists

**Auth not working**
- Verify `BETTER_AUTH_SECRET` is set
- Check cookie settings in dev vs production
- Clear browser cookies and try again

**AI responses not working**
- Verify `GOOGLE_GENERATIVE_AI_API_KEY` is correct
- Check Google Cloud Console for API quota
- Verify API is enabled in Google Cloud

## Performance Optimization

### Already Implemented
- Image optimization with Next.js
- Code splitting and lazy loading
- Database query optimization with Drizzle
- Streaming responses for AI
- Client-side caching with React

### Additional Optimization

1. **Enable Compression**
   - Automatic in Vercel

2. **Use CDN**
   - Automatic with Vercel Edge Network

3. **Optimize AI Calls**
   - Implement response caching
   - Use streaming for long responses

## Security Checklist

- [ ] `BETTER_AUTH_SECRET` is strong (32+ chars)
- [ ] `GOOGLE_GENERATIVE_AI_API_KEY` is kept secret
- [ ] Database URL doesn't expose credentials in logs
- [ ] CORS headers are properly configured
- [ ] Rate limiting implemented for API endpoints
- [ ] HTTPS is enabled on custom domain
- [ ] Environment variables not committed to Git

## Scaling Considerations

### Current Architecture
- Suitable for 1,000+ concurrent users
- Auto-scaling on Vercel
- Database connection pooling with Neon

### For Higher Scale
1. Implement Redis caching (Upstash)
2. Add database read replicas
3. Implement rate limiting
4. Add background job queue
5. Use CDN for static assets

## Rollback Plan

If deployment breaks:

1. In Vercel dashboard, go to Deployments
2. Find the previous working deployment
3. Click the three dots → "Rollback to this Deployment"
4. Or use CLI: `vercel rollback`

## Cost Estimation

### Monthly Costs (Approximate)

| Service | Free Tier | Paid |
|---------|-----------|------|
| Vercel | $0 (limited) | $20-100 |
| Neon DB | $0 (limited) | $50-500 |
| Google AI | $0 (limited) | $10-100 |
| **Total** | **$0** | **$80-700** |

Free tier suitable for development and small user bases.

## Support & Resources

- **Vercel Docs**: https://vercel.com/docs
- **Neon Docs**: https://neon.tech/docs
- **Next.js Docs**: https://nextjs.org/docs
- **Better Auth Docs**: https://www.better-auth.com/docs
- **Google AI Docs**: https://ai.google.dev/docs

## Maintenance

### Regular Tasks

1. **Weekly**
   - Monitor error logs
   - Check analytics

2. **Monthly**
   - Review database usage
   - Update dependencies
   - Check security updates

3. **Quarterly**
   - Performance audit
   - Security scan
   - Cost optimization review

## Next Steps

After deployment:

1. Test all 5 learning modules
2. Create demo accounts
3. Share with users
4. Gather feedback
5. Iterate and improve

Good luck with your EduGenie deployment!
