
import React, { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { User, Session } from '@supabase/supabase-js';
import { getSupabase, isSupabaseConfigured, UserProfile, UserRole, testSupabaseConnection } from '@/lib/supabase';

interface AuthContextType {
  user: User | null;
  profile: UserProfile | null;
  session: Session | null;
  loading: boolean;
  isConfigured: boolean;
  signIn: (email: string, password: string) => Promise<{ error?: string }>;
  signUp: (email: string, password: string, fullName?: string, role?: UserRole) => Promise<{ error?: string }>;
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

  const fetchUserProfile = async (userId: string) => {
    try {
      console.log('📊 Obteniendo perfil de usuario:', userId);
      const supabase = getSupabase();
      const { data, error } = await supabase
        .from('user_profiles')
        .select('*')
        .eq('id', userId)
        .single();

      if (error) {
        console.error('❌ Error obteniendo perfil:', error);
        return;
      }

      console.log('✅ Perfil obtenido:', data);
      // Convert the data to UserProfile type safely
      setProfile(data as unknown as UserProfile);
    } catch (error) {
      console.error('❌ Error inesperado obteniendo perfil:', error);
    }
  };

  useEffect(() => {
    console.log('🔍 AuthProvider: Inicializando...');
    console.log('🔍 Supabase configurado:', isConfigured);
    
    const initializeAuth = async () => {
      if (!isConfigured) {
        console.log('❌ Supabase no está configurado');
        setLoading(false);
        return;
      }

      console.log('✅ Inicializando cliente Supabase...');
      
      try {
        const connectionWorks = await testSupabaseConnection();
        if (!connectionWorks) {
          console.error('❌ Conexión con Supabase falló');
          setLoading(false);
          return;
        }

        const supabase = getSupabase();
        console.log('✅ Cliente Supabase creado:', !!supabase);

        // Get initial session
        const { data: sessionData, error: sessionError } = await supabase.auth.getSession();
        console.log('🔍 Sesión inicial obtenida:', { session: !!sessionData.session, error: sessionError });
        
        if (sessionError) {
          console.error('❌ Error obteniendo sesión inicial:', sessionError);
        }
        
        setSession(sessionData.session);
        setUser(sessionData.session?.user ?? null);
        
        if (sessionData.session?.user) {
          console.log('👤 Usuario encontrado en sesión:', sessionData.session.user.email);
          await fetchUserProfile(sessionData.session.user.id);
        } else {
          console.log('👤 No hay usuario en la sesión');
        }

        // Listen for auth changes
        const { data: { subscription } } = supabase.auth.onAuthStateChange(async (event, session) => {
          console.log('🔄 Cambio de estado de autenticación:', { event, session: !!session });
          setSession(session);
          setUser(session?.user ?? null);
          
          if (session?.user) {
            console.log('👤 Usuario autenticado:', session.user.email);
            await fetchUserProfile(session.user.id);
          } else {
            console.log('👤 Usuario desautenticado');
            setProfile(null);
          }
        });

        setLoading(false);

        return () => {
          console.log('🧹 Limpiando suscripción de autenticación');
          subscription.unsubscribe();
        };
      } catch (error) {
        console.error('❌ Error en inicialización de auth:', error);
        setLoading(false);
      }
    };

    initializeAuth();
  }, [isConfigured]);

  const signIn = async (email: string, password: string) => {
    if (!isConfigured) {
      return { error: 'Supabase no está configurado' };
    }

    console.log('🔐 Intentando iniciar sesión para:', email);
    try {
      const supabase = getSupabase();
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        console.error('❌ Error en inicio de sesión:', error);
        return { error: error.message };
      }

      console.log('✅ Inicio de sesión exitoso');
      return {};
    } catch (error) {
      console.error('❌ Error inesperado en inicio de sesión:', error);
      return { error: 'Error inesperado al iniciar sesión' };
    }
  };

  const signUp = async (email: string, password: string, fullName?: string, role: UserRole = 'viewer') => {
    if (!isConfigured) {
      return { error: 'Supabase no está configurado' };
    }

    console.log('📝 Intentando registrar usuario:', email, 'con rol:', role);
    try {
      const supabase = getSupabase();
      const { error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            full_name: fullName,
            role: role,
          },
        },
      });

      if (error) {
        console.error('❌ Error en registro:', error);
        return { error: error.message };
      }

      console.log('✅ Registro exitoso');
      return {};
    } catch (error) {
      console.error('❌ Error inesperado en registro:', error);
      return { error: 'Error inesperado al registrarse' };
    }
  };

  const signOut = async () => {
    if (!isConfigured) return;
    
    console.log('🚪 Cerrando sesión...');
    const supabase = getSupabase();
    await supabase.auth.signOut();
    console.log('✅ Sesión cerrada');
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
