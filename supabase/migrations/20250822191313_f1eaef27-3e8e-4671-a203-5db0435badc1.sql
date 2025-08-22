-- Clean up all existing admin_users policies to remove conflicts
DROP POLICY IF EXISTS "Only service role can access admin users" ON public.admin_users;
DROP POLICY IF EXISTS "Deny all other access to admin users" ON public.admin_users;
DROP POLICY IF EXISTS "Service role can manage admin users" ON public.admin_users;
DROP POLICY IF EXISTS "Service role can read admin users" ON public.admin_users;

-- Create a single, comprehensive policy for service role access only
-- This ensures only edge functions can access admin credentials
CREATE POLICY "admin_users_service_role_only"
ON public.admin_users
FOR ALL
TO service_role
USING (true)
WITH CHECK (true);

-- Ensure RLS is enabled (should already be enabled)
ALTER TABLE public.admin_users ENABLE ROW LEVEL SECURITY;

-- Grant necessary permissions to service role
GRANT ALL ON public.admin_users TO service_role;