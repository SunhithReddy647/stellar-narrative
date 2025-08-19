-- Fix security vulnerability: Add RLS policies for admin_users table
-- This restricts access to service role only (edge functions) and prevents client access

-- Policy to allow service role to read admin_users (needed for edge function authentication)
CREATE POLICY "Service role can read admin users" 
ON public.admin_users 
FOR SELECT 
TO service_role 
USING (true);

-- Policy to allow service role to manage admin_users (for admin management if needed)
CREATE POLICY "Service role can manage admin users" 
ON public.admin_users 
FOR ALL 
TO service_role 
USING (true);

-- Ensure no authenticated users can access admin_users directly
-- (This is already the case since we removed the previous policy, but making it explicit)
-- No policies for 'authenticated' role means no access from client applications