# Supabase Setup Guide

Follow these steps to set up your Supabase database for the AI-Powered Itinerary Planner.

## 🚀 Quick Setup Steps

### 1. Create Supabase Project
1. Go to [supabase.com](https://supabase.com)
2. Sign in or create an account
3. Click "New Project"
4. Choose your organization
5. Enter project details:
   - **Name**: `ai-itinerary-planner`
   - **Database Password**: Choose a strong password
   - **Region**: Choose closest to your location
6. Click "Create new project"

### 2. Get Your Credentials
1. Wait for the project to be created (2-3 minutes)
2. Go to **Settings** → **API**
3. Copy these values:
   - **Project URL** (looks like: `https://abcdefgh.supabase.co`)
   - **anon public** key (starts with `eyJ...`)

### 3. Update Environment Variables
1. Open your `.env.local` file
2. Replace the placeholder values:
   ```env
   NEXT_PUBLIC_SUPABASE_URL=https://your-actual-project-id.supabase.co
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your-actual-anon-key-here
   ```

### 4. Create Database Tables
1. In your Supabase dashboard, go to **SQL Editor**
2. Click "New Query"
3. Copy and paste the entire contents of `supabase-schema.sql`
4. Click "Run" to execute the SQL

### 5. Test Your Setup
1. Restart your development server: `npm run dev`
2. Visit: `http://localhost:3000/test-supabase`
3. Click "Test Supabase Connection"
4. You should see "Connection Successful!"

## 🔧 Troubleshooting

### Common Issues:

#### "relation 'waitlist' does not exist"
- **Solution**: Run the SQL schema in Supabase SQL Editor
- The `waitlist` table needs to be created first

#### "Invalid API key"
- **Solution**: Check your `.env.local` file
- Make sure you copied the correct anon key (not the service role key)

#### "Failed to fetch"
- **Solution**: Check your Project URL
- Make sure it's the correct URL from your Supabase dashboard

#### "RLS policy violation"
- **Solution**: The SQL schema includes RLS policies
- Make sure you ran the complete schema, not just the table creation

## 📋 Required Tables

The schema creates these tables:
- ✅ `waitlist` - For storing waitlist signups
- ✅ `users` - For future user authentication
- ✅ `itineraries` - For storing user itineraries
- ✅ `destinations` - For destination data
- ✅ `activities` - For activity data

## 🔒 Security

The schema includes:
- ✅ Row Level Security (RLS) enabled
- ✅ Public access for waitlist signups
- ✅ User-specific access for other tables
- ✅ Proper indexes for performance

## 🧪 Testing

After setup, test these features:
1. **Waitlist Form**: Fill out and submit the form
2. **Database**: Check your Supabase dashboard → Table Editor → waitlist
3. **Connection Test**: Use the test page to verify everything works

## 📞 Need Help?

If you're still having issues:
1. Check the browser console for detailed error messages
2. Visit the test page: `/test-supabase`
3. Verify your environment variables are loaded
4. Make sure the database schema was executed completely
