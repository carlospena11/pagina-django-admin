
-- Eliminar la función trigger para nuevos usuarios
DROP FUNCTION IF EXISTS public.handle_new_user() CASCADE;

-- Eliminar la tabla de perfiles de usuario
DROP TABLE IF EXISTS public.user_profiles CASCADE;
