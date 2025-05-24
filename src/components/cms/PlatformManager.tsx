
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
import { Plus, Edit, Trash2, Tv, Calendar, User, Lock } from 'lucide-react';

interface Platform {
  id: string;
  platform: string;
  room: string;
  user: string;
  password: string;
  cutoffDate: string;
  status: 'active' | 'expired' | 'pending';
}

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
  const [platforms, setPlatforms] = useState<Platform[]>([
    {
      id: '1',
      platform: 'Netflix',
      room: '101',
      user: 'hotel.netflix@gmail.com',
      password: 'Netflix2024!',
      cutoffDate: '2024-12-31',
      status: 'active'
    },
    {
      id: '2',
      platform: 'Disney+',
      room: '102',
      user: 'hotel.disney@gmail.com',
      password: 'Disney2024!',
      cutoffDate: '2024-11-30',
      status: 'pending'
    },
    {
      id: '3',
      platform: 'Amazon Prime Video',
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
    room: '',
    user: '',
    password: '',
    cutoffDate: ''
  });

  const resetForm = () => {
    setFormData({
      platform: '',
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

  const handleSubmit = () => {
    const now = new Date();
    const cutoffDate = new Date(formData.cutoffDate);
    const status: Platform['status'] = cutoffDate < now ? 'expired' : 'active';

    if (editingPlatform) {
      setPlatforms(platforms.map(p => 
        p.id === editingPlatform.id 
          ? { ...p, ...formData, status }
          : p
      ));
    } else {
      const newPlatform: Platform = {
        id: (platforms.length + 1).toString(),
        ...formData,
        status
      };
      setPlatforms([...platforms, newPlatform]);
    }
    
    setIsDialogOpen(false);
    resetForm();
  };

  const handleDelete = (id: string) => {
    setPlatforms(platforms.filter(p => p.id !== id));
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
                  Plataforma
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
                <Label htmlFor="room" className="text-right">
                  Habitación
                </Label>
                <Input
                  id="room"
                  value={formData.room}
                  onChange={(e) => setFormData({...formData, room: e.target.value})}
                  className="col-span-3"
                  placeholder="ej. 101"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="user" className="text-right">
                  Usuario
                </Label>
                <Input
                  id="user"
                  value={formData.user}
                  onChange={(e) => setFormData({...formData, user: e.target.value})}
                  className="col-span-3"
                  placeholder="ej. usuario@email.com"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="password" className="text-right">
                  Contraseña
                </Label>
                <Input
                  id="password"
                  type="password"
                  value={formData.password}
                  onChange={(e) => setFormData({...formData, password: e.target.value})}
                  className="col-span-3"
                  placeholder="••••••••"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="cutoffDate" className="text-right">
                  Fecha de Corte
                </Label>
                <Input
                  id="cutoffDate"
                  type="date"
                  value={formData.cutoffDate}
                  onChange={(e) => setFormData({...formData, cutoffDate: e.target.value})}
                  className="col-span-3"
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

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Plataformas</CardTitle>
            <Tv className="w-4 h-4 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{platforms.length}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Activas</CardTitle>
            <div className="w-3 h-3 bg-green-500 rounded-full"></div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{platforms.filter(p => p.status === 'active').length}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Vencidas</CardTitle>
            <div className="w-3 h-3 bg-red-500 rounded-full"></div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{platforms.filter(p => p.status === 'expired').length}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pendientes</CardTitle>
            <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{platforms.filter(p => p.status === 'pending').length}</div>
          </CardContent>
        </Card>
      </div>

      {/* Platforms Table */}
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
                  <TableCell>{platform.room}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <User className="w-4 h-4 text-gray-400" />
                      {platform.user}
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Lock className="w-4 h-4 text-gray-400" />
                      <span className="font-mono">••••••••</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Calendar className="w-4 h-4 text-gray-400" />
                      {platform.cutoffDate}
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge className={getStatusColor(platform.status)} variant="secondary">
                      {getStatusText(platform.status)}
                    </Badge>
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
