# EduGenie - Vercel Deployment Setup Guide

## Important: Environment Variables Setup

Your EduGenie application has been deployed to Vercel, but it requires environment variables to be set for full functionality. Follow these steps:

### Step 1: Add Environment Variables to Vercel Project

1. Go to your Vercel project dashboard
2. Navigate to **Settings > Environment Variables**
3. Add the following environment variables:

#### Required Variables:

**`BETTER_AUTH_SECRET`**
```
JVzqENHp9RSaXeTaAmp/8ilNt73CTW5QKwwdCuuCCiU=
```

**`GOOGLE_GENERATIVE_AI_API_KEY`**
```
[Your Google Gemini API Key]
```

For the Google Gemini API Key:
- Get a free API key at: https://makersuite.google.com/app/apikey
- Or use your existing API key if you have one

**`DATABASE_URL`** (Usually auto-set by Neon integration)
- This should be auto-populated if Neon is connected
- If not, check your Neon dashboard for the PostgreSQL connection string

### Step 2: Redeploy After Setting Variables

After adding the environment variables:

1. Go to **Settings > Git** in Vercel
2. Or, push a change to your repository (even a minor one like updating this file)
3. Vercel will automatically redeploy with the new environment variables

### Step 3: Verify Deployment

Once redeployed:

1. Visit your Vercel deployment URL
2. Navigate to `/sign-in`
3. Sign in with your account:
   - Email: `udaypamidi436@gmail.com`
   - Password: `Uday@12345`
4. You should see the beautiful dashboard with 5 learning modules

## If Authentication Still Doesn't Work

Try these steps:

1. Clear your browser cache/cookies
2. Try signing in from a private/incognito window
3. Check the Vercel deployment logs:
   ```bash
   vercel logs --follow [your-project-url]
   ```

## Local Development

To test locally with environment variables:

```bash
export BETTER_AUTH_SECRET="JVzqENHp9RSaXeTaAmp/8ilNt73CTW5QKwwdCuuCCiU="
export GOOGLE_GENERATIVE_AI_API_KEY="your-api-key-here"
export DATABASE_URL="your-neon-postgres-url"

pnpm dev
```

Then visit: http://localhost:3000

## Features Once Authenticated

After signing in successfully, you'll have access to:

1. **Ask Questions** - Get AI-powered answers using Google Gemini
2. **Learn Concepts** - Deep concept explanations
3. **Take Quizzes** - AI-generated quiz assessments
4. **Summarize Content** - Text summarization tool
5. **Learning Paths** - Personalized learning recommendations

## Deployment URLs

- **Production:** https://v0-project-jade-omega-55.vercel.app
- **Latest Deployment:** https://v0-project-jade-omega-55.vercel.app

## Technical Stack

- **Framework:** Next.js 16.2.6
- **Database:** Neon PostgreSQL
- **Auth:** Better Auth with email/password
- **AI:** Google Gemini 1.5 Pro
- **ORM:** Drizzle
- **Styling:** Tailwind CSS
- **Deployment:** Vercel

## Support

If you encounter any issues:

1. Check the Vercel logs
2. Verify all environment variables are set
3. Make sure the database connection is working
4. Clear browser cache and try again

Happy Learning with EduGenie!
