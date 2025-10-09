-- Fix RLS policy for waitlist table
-- Run this in your Supabase SQL Editor to fix the waitlist insert issue

-- First, let's check if the policy exists and drop it if it does
DROP POLICY IF EXISTS "Allow public waitlist signup" ON waitlist;

-- Create a new policy that allows anyone to insert into the waitlist
CREATE POLICY "Enable insert for public" ON waitlist
    FOR INSERT 
    TO public 
    WITH CHECK (true);

-- Also create a policy to allow public to read their own entries (optional)
CREATE POLICY "Enable read for public" ON waitlist
    FOR SELECT 
    TO public 
    USING (true);

-- Verify the policies are working
-- You can test this by running: SELECT * FROM waitlist;
