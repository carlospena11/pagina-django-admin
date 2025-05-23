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
    console.log('🔍 AuthProvider: Inicializando...');
    console.log('🔍 Supabase configurado:', isConfigured);
    console.log('🔍 VITE_SUPABASE_URL:', import.meta.env.VITE_SUPABASE_URL ? 'CONFIGURADO' : 'NO CONFIGURADO');
    console.log('🔍 VITE_SUPABASE_ANON_KEY:', import.meta.env.VITE_SUPABASE_ANON_KEY ? 'CONFIGURADO' : 'NO CONFIGURADO');

    // If Supabase is not configured, don't try to initialize auth
    if (!isConfigured) {
      console.log('❌ Supabase no está configurado');
      setLoading(false);
      return;
    }

    console.log('✅ Inicializando cliente Supabase...');
    const supabase = getSupabase();
    console.log('✅ Cliente Supabase creado:', !!supabase);

    // Get initial session
    supabase.auth.getSession().then(({ data: { session }, error }) => {
      console.log('🔍 Sesión inicial obtenida:', { session: !!session, error });
      if (error) {
        console.error('❌ Error obteniendo sesión inicial:', error);
      }
      
      setSession(session);
      setUser(session?.user ?? null);
      if (session?.user) {
        console.log('👤 Usuario encontrado en sesión:', session.user.email);
        fetchUserProfile(session.user.id);
      } else {
        console.log('👤 No hay usuario en la sesión');
        setLoading(false);
      }
    });

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      console.log('🔄 Cambio de estado de autenticación:', { event: _event, session: !!session });
      setSession(session);
      setUser(session?.user ?? null);
      if (session?.user) {
        console.log('👤 Usuario autenticado:', session.user.email);
        fetchUserProfile(session.user.id);
      } else {
        console.log('👤 Usuario desautenticado');
        setProfile(null);
        setLoading(false);
      }
    });

    return () => {
      console.log('🧹 Limpiando suscripción de autenticación');
      subscription.unsubscribe();
    };
  }, [isConfigured]);

  const fetchUserProfile = async (userId: string) => {
    if (!isConfigured) return;
    
    console.log('🔍 Obteniendo perfil de usuario:', userId);
    try {
      const supabase = getSupabase();
      const { data, error } = await supabase
        .from('user_profiles')
        .select('*')
        .eq('id', userId)
        .single();

      if (error) {
        console.error('❌ Error obteniendo perfil de usuario:', error);
        console.log('🔧 Intentando crear perfil por defecto...');
        // If profile doesn't exist, create a default one
        await createDefaultProfile(userId);
      } else {
        console.log('✅ Perfil de usuario obtenido:', data);
        setProfile(data as unknown as UserProfile);
      }
    } catch (error) {
      console.error('❌ Error en fetchUserProfile:', error);
    } finally {
      setLoading(false);
    }
  };

  const createDefaultProfile = async (userId: string) => {
    if (!isConfigured) return;

    console.log('🔧 Creando perfil por defecto para usuario:', userId);
    try {
      const supabase = getSupabase();
      const { data: userData } = await supabase.auth.getUser();
      const defaultProfile: Omit<UserProfile, 'created_at'> = {
        id: userId,
        email: userData.user?.email || '',
        role: 'viewer', // Default role
        full_name: userData.user?.user_metadata?.full_name || null,
      };

      console.log('🔧 Datos del perfil por defecto:', defaultProfile);

      const { data, error } = await supabase
        .from('user_profiles')
        .insert([defaultProfile])
        .select()
        .single();

      if (error) {
        console.error('❌ Error creando perfil por defecto:', error);
      } else {
        console.log('✅ Perfil por defecto creado:', data);
        setProfile(data as unknown as UserProfile);
      }
    } catch (error) {
      console.error('❌ Error en createDefaultProfile:', error);
    }
  };

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

  const signUp = async (email: string, password: string, fullName?: string) => {
    if (!isConfigured) {
      return { error: 'Supabase no está configurado' };
    }

    console.log('📝 Intentando registrar usuario:', email);
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
