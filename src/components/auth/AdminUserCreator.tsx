
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useAuth } from '@/contexts/AuthContext';
import { UserPlus } from 'lucide-react';

export const AdminUserCreator: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');
  const { signUp } = useAuth();

  const createAdminUser = async () => {
    setLoading(true);
    setError('');
    setSuccess(false);

    try {
      const result = await signUp('cgpena@email.com', '12345678', 'Carlos G. Peña', 'admin');
      
      if (result.error) {
        setError(result.error);
      } else {
        setSuccess(true);
      }
    } catch (err) {
      setError('Error inesperado al crear usuario');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <UserPlus className="w-5 h-5" />
          Crear Usuario Admin
        </CardTitle>
        <CardDescription>
          Crea el usuario administrador cgpena con contraseña 12345678
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label>Email</Label>
          <Input value="cgpena@email.com" disabled />
        </div>
        
        <div className="space-y-2">
          <Label>Contraseña</Label>
          <Input type="password" value="12345678" disabled />
        </div>

        <div className="space-y-2">
          <Label>Rol</Label>
          <Input value="Admin" disabled />
        </div>

        {error && (
          <div className="text-red-600 text-sm p-2 bg-red-50 rounded">
            {error}
          </div>
        )}

        {success && (
          <div className="text-green-600 text-sm p-2 bg-green-50 rounded">
            ✅ Usuario admin creado exitosamente. Puedes iniciar sesión con cgpena@email.com
          </div>
        )}

        <Button 
          onClick={createAdminUser} 
          disabled={loading || success}
          className="w-full"
        >
          {loading ? 'Creando...' : success ? 'Usuario Creado' : 'Crear Usuario Admin'}
        </Button>
      </CardContent>
    </Card>
  );
};
