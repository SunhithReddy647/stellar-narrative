-- Fix security vulnerability: Remove overly permissive SELECT policy on admin_users table
-- This prevents any authenticated user from viewing admin credentials

DROP POLICY IF EXISTS "Authenticated users can view admin users" ON public.admin_users;

-- Note: Admin authentication should be handled via server-side functions only
-- No direct SELECT access to admin_users table is needed for the application to function