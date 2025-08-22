-- Fix user_sessions RLS policies to properly validate ownership
-- Drop existing policies that don't properly validate ownership
DROP POLICY IF EXISTS "Anyone can create sessions" ON public.user_sessions;
DROP POLICY IF EXISTS "Users can delete their own sessions" ON public.user_sessions;
DROP POLICY IF EXISTS "Users can read their own sessions" ON public.user_sessions;
DROP POLICY IF EXISTS "Users can update their own sessions" ON public.user_sessions;

-- Create secure policies that properly validate session ownership
CREATE POLICY "Users can create their own sessions"
ON public.user_sessions
FOR INSERT
TO authenticated
WITH CHECK (auth.uid()::text = user_id);

CREATE POLICY "Users can read only their own sessions"
ON public.user_sessions
FOR SELECT
TO authenticated
USING (auth.uid()::text = user_id);

CREATE POLICY "Users can update only their own sessions"
ON public.user_sessions
FOR UPDATE
TO authenticated
USING (auth.uid()::text = user_id)
WITH CHECK (auth.uid()::text = user_id);

CREATE POLICY "Users can delete only their own sessions"
ON public.user_sessions
FOR DELETE
TO authenticated
USING (auth.uid()::text = user_id);