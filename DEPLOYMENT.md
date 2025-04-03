# Raffle Platform Deployment Guide

This document provides instructions for deploying the Raffle Platform to Vercel.

## Prerequisites

1. A Vercel account
2. A Supabase account with a project set up
3. Your Supabase URL and anon key

## Deployment Steps

1. Install the Vercel CLI:
   ```
   npm install -g vercel
   ```

2. Login to Vercel:
   ```
   vercel login
   ```

3. Update environment variables in your project:
   - Open `.env.local` file
   - Set your Supabase URL and anon key:
     ```
     NEXT_PUBLIC_SUPABASE_URL=your-supabase-url
     NEXT_PUBLIC_SUPABASE_ANON_KEY=your-supabase-anon-key
     ```

4. Deploy to Vercel:
   ```
   vercel
   ```

5. For production deployment:
   ```
   vercel --prod
   ```

## Environment Variables

Ensure the following environment variables are set in your Vercel project:

- `NEXT_PUBLIC_SUPABASE_URL`: Your Supabase project URL
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`: Your Supabase anonymous key

## Custom Domain Setup

1. Go to your Vercel project dashboard
2. Navigate to "Settings" > "Domains"
3. Add your custom domain
4. Follow the instructions to configure DNS settings

## Continuous Deployment

The project is configured for continuous deployment:

1. Connect your GitHub repository to Vercel
2. Vercel will automatically deploy when changes are pushed to the main branch
3. Preview deployments are created for pull requests

## Troubleshooting

If you encounter issues with deployment:

1. Check Vercel build logs
2. Verify environment variables are correctly set
3. Ensure Supabase permissions are properly configured
4. Check for any build errors in the Next.js application
