import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Session, User } from '@supabase/supabase-js';

interface AuthContextType {
  user: User | null;
  session: Session | null;
  loading: boolean;
  signIn: (email: string, password: string) => Promise<{ error: any }>;
  signOut: () => Promise<void>;
  adminUser: { id: string; email: string } | null;
  adminSignIn: (email: string, password: string) => Promise<{ error: any }>;
  adminSignOut: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);
  const [adminUser, setAdminUser] = useState<{ id: string; email: string } | null>(null);

  useEffect(() => {
    // Set up auth state listener
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, session) => {
        setSession(session);
        setUser(session?.user ?? null);
        setLoading(false);
      }
    );

    // Get initial session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setUser(session?.user ?? null);
      setLoading(false);
    });

    // Check for admin session in localStorage
    const adminSession = localStorage.getItem('adminSession');
    if (adminSession) {
      try {
        const parsedSession = JSON.parse(adminSession);
        setAdminUser(parsedSession.user);
      } catch (error) {
        localStorage.removeItem('adminSession');
      }
    }

    return () => subscription.unsubscribe();
  }, []);

  const signIn = async (email: string, password: string) => {
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    return { error };
  };

  const signOut = async () => {
    await supabase.auth.signOut();
  };

  const adminSignIn = async (email: string, password: string) => {
    try {
      const response = await fetch(`https://nkecjtxqmnmyfnxpgmjq.supabase.co/functions/v1/admin-login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5rZWNqdHhxbW5teWZueHBnbWpxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTI3NDc4OTIsImV4cCI6MjA2ODMyMzg5Mn0.aaqkUSBsIteRjfpoxmaqSODFzPQdrj_bxOd0QJO8a3Q`,
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        return { error: { message: data.error || 'Login failed' } };
      }

      // Store admin session
      localStorage.setItem('adminSession', JSON.stringify({
        sessionToken: data.sessionToken,
        user: data.user
      }));

      setAdminUser(data.user);
      return { error: null };
    } catch (error) {
      return { error: { message: 'Network error' } };
    }
  };

  const adminSignOut = () => {
    localStorage.removeItem('adminSession');
    setAdminUser(null);
  };

  return (
    <AuthContext.Provider value={{
      user,
      session,
      loading,
      signIn,
      signOut,
      adminUser,
      adminSignIn,
      adminSignOut,
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};