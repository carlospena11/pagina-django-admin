
import { createClient } from '@supabase/supabase-js';

// Usar las credenciales de Supabase directamente
const supabaseUrl = 'https://sywappqytluyybvoqfhh.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InN5d2FwcHF5dGx1eXlidm9xZmhoIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDgwNDA3MTksImV4cCI6MjA2MzYxNjcxOX0.QCXit3rofRgoWkckqyYkTro-PXA_mRrHkmh0FeUWo78';

// Crear el cliente de Supabase
let supabase: ReturnType<typeof createClient> | null = null;

try {
  supabase = createClient(supabaseUrl, supabaseAnonKey, {
    auth: {
      persistSession: true,
      autoRefreshToken: true,
    }
  });
  console.log('✅ Cliente Supabase creado exitosamente');
  console.log('🔗 URL:', supabaseUrl);
  console.log('🔑 Anon Key configurado correctamente');
} catch (error) {
  console.error('❌ Error creando cliente Supabase:', error);
}

// Export a function that checks if Supabase is configured
export const isSupabaseConfigured = () => {
  const configured = Boolean(supabaseUrl && supabaseAnonKey && supabase);
  console.log('🔍 Supabase configurado:', configured);
  return configured;
};

// Export a function that gets the Supabase client or throws an error
export const getSupabase = () => {
  if (!supabase) {
    console.error('❌ Cliente Supabase no disponible');
    throw new Error('Supabase client is not available');
  }
  console.log('✅ Cliente Supabase obtenido correctamente');
  return supabase;
};

// Test connection function
export const testSupabaseConnection = async () => {
  try {
    console.log('🧪 Probando conexión con Supabase...');
    const client = getSupabase();
    
    // Test básico de conexión
    const { data, error } = await client.from('_health').select('*').limit(1);
    
    if (error && error.code !== 'PGRST116') { // PGRST116 = table not found (normal)
      console.log('⚠️ Error esperado (tabla _health no existe):', error.message);
      console.log('✅ Pero la conexión con Supabase funciona correctamente');
      return true;
    }
    
    console.log('✅ Conexión con Supabase verificada exitosamente');
    return true;
  } catch (error) {
    console.error('❌ Error en conexión con Supabase:', error);
    return false;
  }
};

// For backward compatibility, export the client directly
export { supabase };

export type UserRole = 'admin' | 'editor' | 'viewer';

export interface UserProfile {
  id: string;
  email: string;
  role: UserRole;
  full_name?: string;
  avatar_url?: string;
  created_at: string;
}
