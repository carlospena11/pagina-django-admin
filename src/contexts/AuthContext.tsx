import React, { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { User, Session } from '@supabase/supabase-js';
import { getSupabase, isSupabaseConfigured, UserProfile, UserRole } from '@/lib/supabase';

interface AuthContextType {
  user: User | null;
  profile: UserProfile | null;
  session: Session | null;
  loading: boolean;
  isConfigured: boolean;
  signIn: (email: string, password: string) => Promise<{ error?: string }>;
  signUp: (email: string, password: string, fullName?: string) => Promise<{ error?: string }>;
  signOut: () => Promise<void>;
  hasRole: (requiredRole: UserRole) => boolean;
  canEdit: () => boolean;
  canAdmin: () => boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

interface AuthProviderProps {
  children: ReactNode;
}

const roleHierarchy: Record<UserRole, number> = {
  viewer: 1,
  editor: 2,
  admin: 3,
};

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);
  const [isConfigured] = useState(isSupabaseConfigured());

  useEffect(() => {
    // If Supabase is not configured, don't try to initialize auth
    if (!isConfigured) {
      setLoading(false);
      return;
    }

    const supabase = getSupabase();

    // Get initial session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setUser(session?.user ?? null);
      if (session?.user) {
        fetchUserProfile(session.user.id);
      } else {
        setLoading(false);
      }
    });

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
      setUser(session?.user ?? null);
      if (session?.user) {
        fetchUserProfile(session.user.id);
      } else {
        setProfile(null);
        setLoading(false);
      }
    });

    return () => subscription.unsubscribe();
  }, [isConfigured]);

  const fetchUserProfile = async (userId: string) => {
    if (!isConfigured) return;
    
    try {
      const supabase = getSupabase();
      const { data, error } = await supabase
        .from('user_profiles')
        .select('*')
        .eq('id', userId)
        .single();

      if (error) {
        console.error('Error fetching user profile:', error);
        // If profile doesn't exist, create a default one
        await createDefaultProfile(userId);
      } else {
        setProfile(data as UserProfile);
      }
    } catch (error) {
      console.error('Error in fetchUserProfile:', error);
    } finally {
      setLoading(false);
    }
  };

  const createDefaultProfile = async (userId: string) => {
    if (!isConfigured) return;

    try {
      const supabase = getSupabase();
      const { data: userData } = await supabase.auth.getUser();
      const defaultProfile: Omit<UserProfile, 'created_at'> = {
        id: userId,
        email: userData.user?.email || '',
        role: 'viewer', // Default role
        full_name: userData.user?.user_metadata?.full_name || null,
      };

      const { data, error } = await supabase
        .from('user_profiles')
        .insert([defaultProfile])
        .select()
        .single();

      if (error) {
        console.error('Error creating default profile:', error);
      } else {
        setProfile(data as UserProfile);
      }
    } catch (error) {
      console.error('Error in createDefaultProfile:', error);
    }
  };

  const signIn = async (email: string, password: string) => {
    if (!isConfigured) {
      return { error: 'Supabase no está configurado' };
    }

    try {
      const supabase = getSupabase();
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        return { error: error.message };
      }

      return {};
    } catch (error) {
      return { error: 'Error inesperado al iniciar sesión' };
    }
  };

  const signUp = async (email: string, password: string, fullName?: string) => {
    if (!isConfigured) {
      return { error: 'Supabase no está configurado' };
    }

    try {
      const supabase = getSupabase();
      const { error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            full_name: fullName,
          },
        },
      });

      if (error) {
        return { error: error.message };
      }

      return {};
    } catch (error) {
      return { error: 'Error inesperado al registrarse' };
    }
  };

  const signOut = async () => {
    if (!isConfigured) return;
    
    const supabase = getSupabase();
    await supabase.auth.signOut();
  };

  const hasRole = (requiredRole: UserRole): boolean => {
    if (!profile) return false;
    return roleHierarchy[profile.role] >= roleHierarchy[requiredRole];
  };

  const canEdit = (): boolean => {
    return hasRole('editor');
  };

  const canAdmin = (): boolean => {
    return hasRole('admin');
  };

  const value: AuthContextType = {
    user,
    profile,
    session,
    loading,
    isConfigured,
    signIn,
    signUp,
    signOut,
    hasRole,
    canEdit,
    canAdmin,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};
