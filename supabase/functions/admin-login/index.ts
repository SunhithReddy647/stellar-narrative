import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'
import * as bcrypt from "https://deno.land/x/bcrypt@v0.4.1/mod.ts"

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    console.log('Admin login attempt started')
    const { email, password } = await req.json()
    console.log('Login attempt for email:', email)

    if (!email || !password) {
      console.log('Missing email or password')
      return new Response(
        JSON.stringify({ error: 'Email and password are required' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      )
    }

    // Create Supabase client with service role key for admin operations
    const supabaseUrl = Deno.env.get('SUPABASE_URL')
    const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')
    
    console.log('Environment check - URL exists:', !!supabaseUrl, 'Service key exists:', !!supabaseServiceKey)
    
    if (!supabaseUrl || !supabaseServiceKey) {
      console.error('Missing environment variables')
      return new Response(
        JSON.stringify({ error: 'Server configuration error' }),
        { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      )
    }
    
    const supabase = createClient(supabaseUrl, supabaseServiceKey, {
      auth: { persistSession: false }
    })

    console.log('Querying admin_users table for email:', email)
    // Query admin_users table
    const { data: adminUser, error } = await supabase
      .from('admin_users')
      .select('*')
      .eq('email', email)
      .single()

    console.log('Query result - error:', error, 'user found:', !!adminUser)

    if (error) {
      console.error('Database error:', error)
      // If no user found, return invalid credentials (don't reveal if user exists)
      return new Response(
        JSON.stringify({ error: 'Invalid credentials' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      )
    }

    if (!adminUser) {
      console.log('No admin user found')
      return new Response(
        JSON.stringify({ error: 'Invalid credentials' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      )
    }

    console.log('Verifying password for user:', adminUser.email)
    // Verify password
    const isValidPassword = await bcrypt.compare(password, adminUser.password_hash)
    console.log('Password verification result:', isValidPassword)

    if (!isValidPassword) {
      console.log('Invalid password')
      return new Response(
        JSON.stringify({ error: 'Invalid credentials' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      )
    }

    // Create a simple session token (in production, use JWT)
    const sessionToken = crypto.randomUUID()
    console.log('Login successful, creating session token')
    
    return new Response(
      JSON.stringify({ 
        success: true, 
        sessionToken,
        user: { id: adminUser.id, email: adminUser.email }
      }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    )

  } catch (error) {
    console.error('Unexpected error in admin login:', error)
    return new Response(
      JSON.stringify({ error: 'Internal server error', details: error.message }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    )
  }
})