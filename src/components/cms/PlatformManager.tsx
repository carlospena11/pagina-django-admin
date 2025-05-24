
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Plus, Edit, Trash2, Tv, Calendar, User, Lock, Building, AlertTriangle, Eye, EyeOff } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface Platform {
  id: string;
  platform: string;
  hotel: string;
  room: string;
  user: string;
  password: string;
  cutoffDate: string;
  status: 'active' | 'expired' | 'pending';
}

// Mock data para hoteles y habitaciones (en una aplicación real vendría de un contexto o API)
const mockHotels = [
  'Hotel Central',
  'Hotel Plaza',
  'Hotel Boutique',
  'Resort & Spa',
  'Business Hotel'
];

const mockRooms = [
  '101', '102', '103', '104', '105',
  '201', '202', '203', '204', '205',
  '301', '302', '303', '304', '305'
];

const platformOptions = [
  'Netflix',
  'Amazon Prime Video',
  'Disney+',
  'HBO Max',
  'Hulu',
  'Apple TV+',
  'Paramount+',
  'Peacock',
  'Discovery+',
  'YouTube Premium'
];

export const PlatformManager: React.FC = () => {
  const { toast } = useToast();
  const [showPasswords, setShowPasswords] = useState<Record<string, boolean>>({});
  
  const [platforms, setPlatforms] = useState<Platform[]>([
    {
      id: '1',
      platform: 'Netflix',
      hotel: 'Hotel Central',
      room: '101',
      user: 'hotel.netflix@gmail.com',
      password: 'Netflix2024!',
      cutoffDate: '2024-12-31',
      status: 'active'
    },
    {
      id: '2',
      platform: 'Disney+',
      hotel: 'Hotel Plaza',
      room: '102',
      user: 'hotel.disney@gmail.com',
      password: 'Disney2024!',
      cutoffDate: '2024-11-30',
      status: 'pending'
    },
    {
      id: '3',
      platform: 'Amazon Prime Video',
      hotel: 'Resort & Spa',
      room: '103',
      user: 'hotel.prime@gmail.com',
      password: 'Prime2024!',
      cutoffDate: '2024-10-15',
      status: 'expired'
    }
  ]);

  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingPlatform, setEditingPlatform] = useState<Platform | null>(null);
  const [formData, setFormData] = useState({
    platform: '',
    hotel: '',
    room: '',
    user: '',
    password: '',
    cutoffDate: ''
  });

  const resetForm = () => {
    setFormData({
      platform: '',
      hotel: '',
      room: '',
      user: '',
      password: '',
      cutoffDate: ''
    });
    setEditingPlatform(null);
  };

  const openDialog = (platform?: Platform) => {
    if (platform) {
      setEditingPlatform(platform);
      setFormData({
        platform: platform.platform,
        hotel: platform.hotel,
        room: platform.room,
        user: platform.user,
        password: platform.password,
        cutoffDate: platform.cutoffDate
      });
    } else {
      resetForm();
    }
    setIsDialogOpen(true);
  };

  const validateForm = () => {
    if (!formData.platform.trim()) {
      toast({
        title: "Error",
        description: "Debes seleccionar una plataforma",
        variant: "destructive",
      });
      return false;
    }
    if (!formData.hotel.trim()) {
      toast({
        title: "Error",
        description: "Debes seleccionar un hotel",
        variant: "destructive",
      });
      return false;
    }
    if (!formData.room.trim()) {
      toast({
        title: "Error",
        description: "Debes especificar una habitación",
        variant: "destructive",
      });
      return false;
    }
    if (!formData.user.trim()) {
      toast({
        title: "Error",
        description: "Debes ingresar un usuario",
        variant: "destructive",
      });
      return false;
    }
    if (!formData.password.trim()) {
      toast({
        title: "Error",
        description: "Debes ingresar una contraseña",
        variant: "destructive",
      });
      return false;
    }
    if (!formData.cutoffDate) {
      toast({
        title: "Error",
        description: "Debes especificar una fecha de corte",
        variant: "destructive",
      });
      return false;
    }

    // Verificar duplicados
    const isDuplicate = platforms.some(p => 
      p.platform === formData.platform && 
      p.hotel === formData.hotel && 
      p.room === formData.room && 
      p.id !== editingPlatform?.id
    );

    if (isDuplicate) {
      toast({
        title: "Error",
        description: "Ya existe esta plataforma configurada para esta habitación",
        variant: "destructive",
      });
      return false;
    }

    return true;
  };

  const handleSubmit = () => {
    if (!validateForm()) return;

    const now = new Date();
    const cutoffDate = new Date(formData.cutoffDate);
    const status: Platform['status'] = cutoffDate < now ? 'expired' : 'active';

    if (editingPlatform) {
      setPlatforms(platforms.map(p => 
        p.id === editingPlatform.id 
          ? { ...p, ...formData, status }
          : p
      ));
      toast({
        title: "Plataforma actualizada",
        description: "La configuración de la plataforma se ha actualizado correctamente",
      });
    } else {
      const newPlatform: Platform = {
        id: (platforms.length + 1).toString(),
        ...formData,
        status
      };
      setPlatforms([...platforms, newPlatform]);
      toast({
        title: "Plataforma agregada",
        description: "La nueva configuración de plataforma se ha agregado correctamente",
      });
    }
    
    setIsDialogOpen(false);
    resetForm();
  };

  const handleDelete = (id: string) => {
    setPlatforms(platforms.filter(p => p.id !== id));
    toast({
      title: "Plataforma eliminada",
      description: "La configuración de la plataforma se ha eliminado correctamente",
    });
  };

  const togglePasswordVisibility = (platformId: string) => {
    setShowPasswords(prev => ({
      ...prev,
      [platformId]: !prev[platformId]
    }));
  };

  const getStatusColor = (status: Platform['status']) => {
    switch (status) {
      case 'active':
        return 'bg-green-100 text-green-800';
      case 'expired':
        return 'bg-red-100 text-red-800';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusText = (status: Platform['status']) => {
    switch (status) {
      case 'active':
        return 'Activa';
      case 'expired':
        return 'Vencida';
      case 'pending':
        return 'Pendiente';
      default:
        return status;
    }
  };

  const getStatusIcon = (status: Platform['status']) => {
    switch (status) {
      case 'expired':
        return <AlertTriangle className="w-4 h-4 text-red-600" />;
      default:
        return null;
    }
  };

  // Estadísticas mejoradas
  const stats = {
    total: platforms.length,
    active: platforms.filter(p => p.status === 'active').length,
    expired: platforms.filter(p => p.status === 'expired').length,
    pending: platforms.filter(p => p.status === 'pending').length,
    expiringThisMonth: platforms.filter(p => {
      const cutoffDate = new Date(p.cutoffDate);
      const now = new Date();
      const thisMonth = new Date(now.getFullYear(), now.getMonth() + 1, 0);
      return cutoffDate <= thisMonth && cutoffDate >= now;
    }).length
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Control de Plataformas</h1>
          <p className="text-gray-500 mt-1">Gestiona las plataformas de streaming en las habitaciones del hotel</p>
        </div>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button onClick={() => openDialog()} className="flex items-center gap-2">
              <Plus className="w-4 h-4" />
              Nueva Plataforma
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>
                {editingPlatform ? 'Editar Plataforma' : 'Nueva Plataforma'}
              </DialogTitle>
              <DialogDescription>
                Agrega o edita la información de las plataformas de streaming instaladas en las habitaciones.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="platform" className="text-right">
                  Plataforma *
                </Label>
                <div className="col-span-3">
                  <Select value={formData.platform} onValueChange={(value) => setFormData({...formData, platform: value})}>
                    <SelectTrigger>
                      <SelectValue placeholder="Selecciona una plataforma" />
                    </SelectTrigger>
                    <SelectContent>
                      {platformOptions.map((platform) => (
                        <SelectItem key={platform} value={platform}>
                          {platform}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="hotel" className="text-right">
                  Hotel *
                </Label>
                <div className="col-span-3">
                  <Select value={formData.hotel} onValueChange={(value) => setFormData({...formData, hotel: value})}>
                    <SelectTrigger>
                      <SelectValue placeholder="Selecciona un hotel" />
                    </SelectTrigger>
                    <SelectContent>
                      {mockHotels.map((hotel) => (
                        <SelectItem key={hotel} value={hotel}>
                          {hotel}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="room" className="text-right">
                  Habitación *
                </Label>
                <div className="col-span-3">
                  <Select value={formData.room} onValueChange={(value) => setFormData({...formData, room: value})}>
                    <SelectTrigger>
                      <SelectValue placeholder="Selecciona una habitación" />
                    </SelectTrigger>
                    <SelectContent>
                      {mockRooms.map((room) => (
                        <SelectItem key={room} value={room}>
                          {room}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="user" className="text-right">
                  Usuario *
                </Label>
                <Input
                  id="user"
                  value={formData.user}
                  onChange={(e) => setFormData({...formData, user: e.target.value})}
                  className="col-span-3"
                  placeholder="ej. usuario@email.com"
                  required
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="password" className="text-right">
                  Contraseña *
                </Label>
                <Input
                  id="password"
                  type="password"
                  value={formData.password}
                  onChange={(e) => setFormData({...formData, password: e.target.value})}
                  className="col-span-3"
                  placeholder="••••••••"
                  required
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="cutoffDate" className="text-right">
                  Fecha de Corte *
                </Label>
                <Input
                  id="cutoffDate"
                  type="date"
                  value={formData.cutoffDate}
                  onChange={(e) => setFormData({...formData, cutoffDate: e.target.value})}
                  className="col-span-3"
                  required
                />
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
                Cancelar
              </Button>
              <Button onClick={handleSubmit}>
                {editingPlatform ? 'Actualizar' : 'Crear'}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      {/* Stats Cards Mejoradas */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Plataformas</CardTitle>
            <Tv className="w-4 h-4 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.total}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Activas</CardTitle>
            <div className="w-3 h-3 bg-green-500 rounded-full"></div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.active}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Vencidas</CardTitle>
            <div className="w-3 h-3 bg-red-500 rounded-full"></div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.expired}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pendientes</CardTitle>
            <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.pending}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Vencen este mes</CardTitle>
            <AlertTriangle className="w-4 h-4 text-orange-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.expiringThisMonth}</div>
          </CardContent>
        </Card>
      </div>

      {/* Platforms Table Mejorada */}
      <Card>
        <CardHeader>
          <CardTitle>Plataformas Registradas</CardTitle>
          <CardDescription>
            Lista de todas las plataformas de streaming instaladas en las habitaciones
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Plataforma</TableHead>
                <TableHead>Hotel</TableHead>
                <TableHead>Habitación</TableHead>
                <TableHead>Usuario</TableHead>
                <TableHead>Contraseña</TableHead>
                <TableHead>Fecha de Corte</TableHead>
                <TableHead>Estado</TableHead>
                <TableHead className="text-right">Acciones</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {platforms.map((platform) => (
                <TableRow key={platform.id}>
                  <TableCell className="font-medium">
                    <div className="flex items-center gap-2">
                      <Tv className="w-4 h-4" />
                      {platform.platform}
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Building className="w-4 h-4 text-gray-400" />
                      {platform.hotel}
                    </div>
                  </TableCell>
                  <TableCell className="font-mono">{platform.room}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <User className="w-4 h-4 text-gray-400" />
                      <span className="max-w-32 truncate">{platform.user}</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Lock className="w-4 h-4 text-gray-400" />
                      <span className="font-mono">
                        {showPasswords[platform.id] ? platform.password : '••••••••'}
                      </span>
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => togglePasswordVisibility(platform.id)}
                        className="p-1 h-auto"
                      >
                        {showPasswords[platform.id] ? (
                          <EyeOff className="w-3 h-3" />
                        ) : (
                          <Eye className="w-3 h-3" />
                        )}
                      </Button>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Calendar className="w-4 h-4 text-gray-400" />
                      {platform.cutoffDate}
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      {getStatusIcon(platform.status)}
                      <Badge className={getStatusColor(platform.status)} variant="secondary">
                        {getStatusText(platform.status)}
                      </Badge>
                    </div>
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex gap-2 justify-end">
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => openDialog(platform)}
                      >
                        <Edit className="w-4 h-4" />
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => handleDelete(platform.id)}
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};
