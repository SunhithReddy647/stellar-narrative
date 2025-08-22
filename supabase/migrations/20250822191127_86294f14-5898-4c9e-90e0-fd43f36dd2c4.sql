-- Drop existing overly permissive policies
DROP POLICY IF EXISTS "Service role can manage admin users" ON public.admin_users;
DROP POLICY IF EXISTS "Service role can read admin users" ON public.admin_users;

-- Create secure policies that only allow service role access
-- This ensures only edge functions can access admin credentials
CREATE POLICY "Only service role can access admin users"
ON public.admin_users
FOR ALL
TO service_role
USING (true)
WITH CHECK (true);

-- Explicitly deny all access to other roles (anon, authenticated)
CREATE POLICY "Deny all other access to admin users"
ON public.admin_users
FOR ALL
TO anon, authenticated
USING (false)
WITH CHECK (false);