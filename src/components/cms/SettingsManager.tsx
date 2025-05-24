
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
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
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '@/components/ui/tabs';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Plus, Edit, Trash2, Building, Tv, Hash, MapPin, Users, AlertCircle } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface Hotel {
  id: string;
  name: string;
  address?: string;
  phone?: string;
  totalRooms?: number;
}

interface Room {
  id: string;
  number: string;
  hotelId: string;
  type?: string;
  floor?: string;
  capacity?: number;
  status: 'available' | 'occupied' | 'maintenance';
}

interface PlatformOption {
  id: string;
  name: string;
  category?: string;
  monthlyPrice?: number;
  isActive: boolean;
}

export const SettingsManager: React.FC = () => {
  const { toast } = useToast();

  // Estados para hoteles
  const [hotels, setHotels] = useState<Hotel[]>([
    { id: '1', name: 'Hotel Central', address: 'Centro de la ciudad', phone: '+1-555-0101', totalRooms: 50 },
    { id: '2', name: 'Hotel Plaza', address: 'Plaza Principal', phone: '+1-555-0102', totalRooms: 35 },
    { id: '3', name: 'Hotel Boutique', address: 'Zona exclusiva', phone: '+1-555-0103', totalRooms: 20 },
    { id: '4', name: 'Resort & Spa', address: 'Zona turística', phone: '+1-555-0104', totalRooms: 100 },
    { id: '5', name: 'Business Hotel', address: 'Distrito financiero', phone: '+1-555-0105', totalRooms: 80 }
  ]);

  // Estados para habitaciones
  const [rooms, setRooms] = useState<Room[]>([
    { id: '1', number: '101', hotelId: '1', type: 'Estándar', floor: '1', capacity: 2, status: 'available' },
    { id: '2', number: '102', hotelId: '1', type: 'Suite', floor: '1', capacity: 4, status: 'occupied' },
    { id: '3', number: '201', hotelId: '2', type: 'Estándar', floor: '2', capacity: 2, status: 'available' },
    { id: '4', number: '301', hotelId: '3', type: 'Deluxe', floor: '3', capacity: 3, status: 'maintenance' }
  ]);

  // Estados para plataformas
  const [platformOptions, setPlatformOptions] = useState<PlatformOption[]>([
    { id: '1', name: 'Netflix', category: 'Streaming', monthlyPrice: 15.99, isActive: true },
    { id: '2', name: 'Amazon Prime Video', category: 'Streaming', monthlyPrice: 12.99, isActive: true },
    { id: '3', name: 'Disney+', category: 'Streaming', monthlyPrice: 7.99, isActive: true },
    { id: '4', name: 'HBO Max', category: 'Streaming', monthlyPrice: 14.99, isActive: true },
    { id: '5', name: 'Hulu', category: 'Streaming', monthlyPrice: 11.99, isActive: false },
    { id: '6', name: 'Apple TV+', category: 'Streaming', monthlyPrice: 4.99, isActive: true },
    { id: '7', name: 'Paramount+', category: 'Streaming', monthlyPrice: 9.99, isActive: false },
    { id: '8', name: 'Peacock', category: 'Streaming', monthlyPrice: 5.99, isActive: false },
    { id: '9', name: 'Discovery+', category: 'Streaming', monthlyPrice: 6.99, isActive: true },
    { id: '10', name: 'YouTube Premium', category: 'Streaming', monthlyPrice: 11.99, isActive: true }
  ]);

  // Estados para diálogos
  const [hotelDialog, setHotelDialog] = useState(false);
  const [roomDialog, setRoomDialog] = useState(false);
  const [platformDialog, setPlatformDialog] = useState(false);

  // Estados para edición
  const [editingHotel, setEditingHotel] = useState<Hotel | null>(null);
  const [editingRoom, setEditingRoom] = useState<Room | null>(null);
  const [editingPlatform, setEditingPlatform] = useState<PlatformOption | null>(null);

  // Estados para formularios
  const [hotelForm, setHotelForm] = useState({ name: '', address: '', phone: '', totalRooms: '' });
  const [roomForm, setRoomForm] = useState({ number: '', hotelId: '', type: '', floor: '', capacity: '', status: 'available' as Room['status'] });
  const [platformForm, setPlatformForm] = useState({ name: '', category: '', monthlyPrice: '', isActive: true });

  // Funciones para hoteles
  const openHotelDialog = (hotel?: Hotel) => {
    if (hotel) {
      setEditingHotel(hotel);
      setHotelForm({ 
        name: hotel.name, 
        address: hotel.address || '', 
        phone: hotel.phone || '',
        totalRooms: hotel.totalRooms?.toString() || ''
      });
    } else {
      setEditingHotel(null);
      setHotelForm({ name: '', address: '', phone: '', totalRooms: '' });
    }
    setHotelDialog(true);
  };

  const handleHotelSubmit = () => {
    if (!hotelForm.name.trim()) {
      toast({
        title: "Error",
        description: "El nombre del hotel es requerido",
        variant: "destructive",
      });
      return;
    }

    if (editingHotel) {
      setHotels(hotels.map(h => 
        h.id === editingHotel.id 
          ? { 
              ...h, 
              ...hotelForm,
              totalRooms: hotelForm.totalRooms ? parseInt(hotelForm.totalRooms) : undefined
            }
          : h
      ));
      toast({
        title: "Hotel actualizado",
        description: "La información del hotel se ha actualizado correctamente",
      });
    } else {
      const newHotel: Hotel = {
        id: (hotels.length + 1).toString(),
        ...hotelForm,
        totalRooms: hotelForm.totalRooms ? parseInt(hotelForm.totalRooms) : undefined
      };
      setHotels([...hotels, newHotel]);
      toast({
        title: "Hotel creado",
        description: "El nuevo hotel se ha agregado correctamente",
      });
    }
    setHotelDialog(false);
  };

  const handleHotelDelete = (id: string) => {
    const roomsInHotel = rooms.filter(r => r.hotelId === id);
    if (roomsInHotel.length > 0) {
      toast({
        title: "No se puede eliminar",
        description: "Este hotel tiene habitaciones asignadas. Elimina las habitaciones primero.",
        variant: "destructive",
      });
      return;
    }
    
    setHotels(hotels.filter(h => h.id !== id));
    toast({
      title: "Hotel eliminado",
      description: "El hotel se ha eliminado correctamente",
    });
  };

  // Funciones para habitaciones
  const openRoomDialog = (room?: Room) => {
    if (room) {
      setEditingRoom(room);
      setRoomForm({ 
        number: room.number, 
        hotelId: room.hotelId, 
        type: room.type || '',
        floor: room.floor || '',
        capacity: room.capacity?.toString() || '',
        status: room.status
      });
    } else {
      setEditingRoom(null);
      setRoomForm({ number: '', hotelId: '', type: '', floor: '', capacity: '', status: 'available' });
    }
    setRoomDialog(true);
  };

  const handleRoomSubmit = () => {
    if (!roomForm.number.trim() || !roomForm.hotelId) {
      toast({
        title: "Error",
        description: "El número de habitación y el hotel son requeridos",
        variant: "destructive",
      });
      return;
    }

    // Verificar duplicados
    const isDuplicate = rooms.some(r => 
      r.number === roomForm.number && 
      r.hotelId === roomForm.hotelId && 
      r.id !== editingRoom?.id
    );

    if (isDuplicate) {
      toast({
        title: "Error",
        description: "Ya existe una habitación con ese número en el hotel seleccionado",
        variant: "destructive",
      });
      return;
    }

    if (editingRoom) {
      setRooms(rooms.map(r => 
        r.id === editingRoom.id 
          ? { 
              ...r, 
              ...roomForm,
              capacity: roomForm.capacity ? parseInt(roomForm.capacity) : undefined
            }
          : r
      ));
      toast({
        title: "Habitación actualizada",
        description: "La información de la habitación se ha actualizado correctamente",
      });
    } else {
      const newRoom: Room = {
        id: (rooms.length + 1).toString(),
        ...roomForm,
        capacity: roomForm.capacity ? parseInt(roomForm.capacity) : undefined
      };
      setRooms([...rooms, newRoom]);
      toast({
        title: "Habitación creada",
        description: "La nueva habitación se ha agregado correctamente",
      });
    }
    setRoomDialog(false);
  };

  const handleRoomDelete = (id: string) => {
    setRooms(rooms.filter(r => r.id !== id));
    toast({
      title: "Habitación eliminada",
      description: "La habitación se ha eliminado correctamente",
    });
  };

  // Funciones para plataformas
  const openPlatformDialog = (platform?: PlatformOption) => {
    if (platform) {
      setEditingPlatform(platform);
      setPlatformForm({ 
        name: platform.name, 
        category: platform.category || '',
        monthlyPrice: platform.monthlyPrice?.toString() || '',
        isActive: platform.isActive
      });
    } else {
      setEditingPlatform(null);
      setPlatformForm({ name: '', category: '', monthlyPrice: '', isActive: true });
    }
    setPlatformDialog(true);
  };

  const handlePlatformSubmit = () => {
    if (!platformForm.name.trim()) {
      toast({
        title: "Error",
        description: "El nombre de la plataforma es requerido",
        variant: "destructive",
      });
      return;
    }

    if (editingPlatform) {
      setPlatformOptions(platformOptions.map(p => 
        p.id === editingPlatform.id 
          ? { 
              ...p, 
              ...platformForm,
              monthlyPrice: platformForm.monthlyPrice ? parseFloat(platformForm.monthlyPrice) : undefined
            }
          : p
      ));
      toast({
        title: "Plataforma actualizada",
        description: "La información de la plataforma se ha actualizado correctamente",
      });
    } else {
      const newPlatform: PlatformOption = {
        id: (platformOptions.length + 1).toString(),
        ...platformForm,
        monthlyPrice: platformForm.monthlyPrice ? parseFloat(platformForm.monthlyPrice) : undefined
      };
      setPlatformOptions([...platformOptions, newPlatform]);
      toast({
        title: "Plataforma creada",
        description: "La nueva plataforma se ha agregado correctamente",
      });
    }
    setPlatformDialog(false);
  };

  const handlePlatformDelete = (id: string) => {
    setPlatformOptions(platformOptions.filter(p => p.id !== id));
    toast({
      title: "Plataforma eliminada",
      description: "La plataforma se ha eliminado correctamente",
    });
  };

  const getHotelName = (hotelId: string) => {
    return hotels.find(h => h.id === hotelId)?.name || 'Hotel no encontrado';
  };

  const getStatusColor = (status: Room['status']) => {
    switch (status) {
      case 'available':
        return 'bg-green-100 text-green-800';
      case 'occupied':
        return 'bg-blue-100 text-blue-800';
      case 'maintenance':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusText = (status: Room['status']) => {
    switch (status) {
      case 'available':
        return 'Disponible';
      case 'occupied':
        return 'Ocupada';
      case 'maintenance':
        return 'Mantenimiento';
      default:
        return status;
    }
  };

  // Estadísticas
  const stats = {
    totalHotels: hotels.length,
    totalRooms: rooms.length,
    availableRooms: rooms.filter(r => r.status === 'available').length,
    activePlatforms: platformOptions.filter(p => p.isActive).length
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Configuración del Sistema</h1>
        <p className="text-gray-500 mt-1">Administra hoteles, habitaciones y plataformas disponibles</p>
      </div>

      {/* Estadísticas generales */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Hoteles</CardTitle>
            <Building className="w-4 h-4 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalHotels}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Habitaciones</CardTitle>
            <Hash className="w-4 h-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalRooms}</div>
            <p className="text-xs text-muted-foreground">{stats.availableRooms} disponibles</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Plataformas Activas</CardTitle>
            <Tv className="w-4 h-4 text-purple-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.activePlatforms}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Camas</CardTitle>
            <Users className="w-4 h-4 text-orange-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {rooms.reduce((total, room) => total + (room.capacity || 0), 0)}
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="hotels" className="space-y-6">
        <TabsList>
          <TabsTrigger value="hotels">Hoteles</TabsTrigger>
          <TabsTrigger value="rooms">Habitaciones</TabsTrigger>
          <TabsTrigger value="platforms">Plataformas</TabsTrigger>
        </TabsList>

        {/* Tab de Hoteles */}
        <TabsContent value="hotels">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle>Gestión de Hoteles</CardTitle>
                <CardDescription>Administra los hoteles del sistema</CardDescription>
              </div>
              <Dialog open={hotelDialog} onOpenChange={setHotelDialog}>
                <DialogTrigger asChild>
                  <Button onClick={() => openHotelDialog()} className="flex items-center gap-2">
                    <Plus className="w-4 h-4" />
                    Nuevo Hotel
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>{editingHotel ? 'Editar Hotel' : 'Nuevo Hotel'}</DialogTitle>
                    <DialogDescription>
                      Completa la información del hotel
                    </DialogDescription>
                  </DialogHeader>
                  <div className="grid gap-4 py-4">
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="hotelName" className="text-right">Nombre *</Label>
                      <Input
                        id="hotelName"
                        value={hotelForm.name}
                        onChange={(e) => setHotelForm({...hotelForm, name: e.target.value})}
                        className="col-span-3"
                        placeholder="Nombre del hotel"
                        required
                      />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="hotelAddress" className="text-right">Dirección</Label>
                      <Input
                        id="hotelAddress"
                        value={hotelForm.address}
                        onChange={(e) => setHotelForm({...hotelForm, address: e.target.value})}
                        className="col-span-3"
                        placeholder="Dirección del hotel"
                      />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="hotelPhone" className="text-right">Teléfono</Label>
                      <Input
                        id="hotelPhone"
                        value={hotelForm.phone}
                        onChange={(e) => setHotelForm({...hotelForm, phone: e.target.value})}
                        className="col-span-3"
                        placeholder="Teléfono del hotel"
                      />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="hotelRooms" className="text-right">Total Habitaciones</Label>
                      <Input
                        id="hotelRooms"
                        type="number"
                        value={hotelForm.totalRooms}
                        onChange={(e) => setHotelForm({...hotelForm, totalRooms: e.target.value})}
                        className="col-span-3"
                        placeholder="Número total de habitaciones"
                        min="1"
                      />
                    </div>
                  </div>
                  <DialogFooter>
                    <Button variant="outline" onClick={() => setHotelDialog(false)}>Cancelar</Button>
                    <Button onClick={handleHotelSubmit}>{editingHotel ? 'Actualizar' : 'Crear'}</Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Nombre</TableHead>
                    <TableHead>Dirección</TableHead>
                    <TableHead>Teléfono</TableHead>
                    <TableHead>Habitaciones</TableHead>
                    <TableHead className="text-right">Acciones</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {hotels.map((hotel) => (
                    <TableRow key={hotel.id}>
                      <TableCell className="font-medium">
                        <div className="flex items-center gap-2">
                          <Building className="w-4 h-4" />
                          {hotel.name}
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <MapPin className="w-4 h-4 text-gray-400" />
                          {hotel.address}
                        </div>
                      </TableCell>
                      <TableCell>{hotel.phone}</TableCell>
                      <TableCell>{hotel.totalRooms || 'N/A'}</TableCell>
                      <TableCell className="text-right">
                        <div className="flex gap-2 justify-end">
                          <Button size="sm" variant="outline" onClick={() => openHotelDialog(hotel)}>
                            <Edit className="w-4 h-4" />
                          </Button>
                          <Button size="sm" variant="outline" onClick={() => handleHotelDelete(hotel.id)}>
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
        </TabsContent>

        {/* Tab de Habitaciones */}
        <TabsContent value="rooms">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle>Gestión de Habitaciones</CardTitle>
                <CardDescription>Administra las habitaciones de todos los hoteles</CardDescription>
              </div>
              <Dialog open={roomDialog} onOpenChange={setRoomDialog}>
                <DialogTrigger asChild>
                  <Button onClick={() => openRoomDialog()} className="flex items-center gap-2">
                    <Plus className="w-4 h-4" />
                    Nueva Habitación
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>{editingRoom ? 'Editar Habitación' : 'Nueva Habitación'}</DialogTitle>
                    <DialogDescription>
                      Completa la información de la habitación
                    </DialogDescription>
                  </DialogHeader>
                  <div className="grid gap-4 py-4">
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="roomNumber" className="text-right">Número *</Label>
                      <Input
                        id="roomNumber"
                        value={roomForm.number}
                        onChange={(e) => setRoomForm({...roomForm, number: e.target.value})}
                        className="col-span-3"
                        placeholder="ej. 101"
                        required
                      />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="roomHotel" className="text-right">Hotel *</Label>
                      <Select value={roomForm.hotelId} onValueChange={(value) => setRoomForm({...roomForm, hotelId: value})}>
                        <SelectTrigger className="col-span-3">
                          <SelectValue placeholder="Selecciona un hotel" />
                        </SelectTrigger>
                        <SelectContent>
                          {hotels.map((hotel) => (
                            <SelectItem key={hotel.id} value={hotel.id}>{hotel.name}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="roomType" className="text-right">Tipo</Label>
                      <Input
                        id="roomType"
                        value={roomForm.type}
                        onChange={(e) => setRoomForm({...roomForm, type: e.target.value})}
                        className="col-span-3"
                        placeholder="ej. Estándar, Suite, Deluxe"
                      />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="roomFloor" className="text-right">Piso</Label>
                      <Input
                        id="roomFloor"
                        value={roomForm.floor}
                        onChange={(e) => setRoomForm({...roomForm, floor: e.target.value})}
                        className="col-span-3"
                        placeholder="ej. 1, 2, 3"
                      />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="roomCapacity" className="text-right">Capacidad</Label>
                      <Input
                        id="roomCapacity"
                        type="number"
                        value={roomForm.capacity}
                        onChange={(e) => setRoomForm({...roomForm, capacity: e.target.value})}
                        className="col-span-3"
                        placeholder="Número de huéspedes"
                        min="1"
                      />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="roomStatus" className="text-right">Estado</Label>
                      <Select value={roomForm.status} onValueChange={(value: Room['status']) => setRoomForm({...roomForm, status: value})}>
                        <SelectTrigger className="col-span-3">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="available">Disponible</SelectItem>
                          <SelectItem value="occupied">Ocupada</SelectItem>
                          <SelectItem value="maintenance">Mantenimiento</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  <DialogFooter>
                    <Button variant="outline" onClick={() => setRoomDialog(false)}>Cancelar</Button>
                    <Button onClick={handleRoomSubmit}>{editingRoom ? 'Actualizar' : 'Crear'}</Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Número</TableHead>
                    <TableHead>Hotel</TableHead>
                    <TableHead>Tipo</TableHead>
                    <TableHead>Piso</TableHead>
                    <TableHead>Capacidad</TableHead>
                    <TableHead>Estado</TableHead>
                    <TableHead className="text-right">Acciones</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {rooms.map((room) => (
                    <TableRow key={room.id}>
                      <TableCell className="font-medium">
                        <div className="flex items-center gap-2">
                          <Hash className="w-4 h-4" />
                          {room.number}
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <Building className="w-4 h-4 text-gray-400" />
                          {getHotelName(room.hotelId)}
                        </div>
                      </TableCell>
                      <TableCell>{room.type}</TableCell>
                      <TableCell>{room.floor}</TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <Users className="w-4 h-4 text-gray-400" />
                          {room.capacity}
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge className={getStatusColor(room.status)} variant="secondary">
                          {getStatusText(room.status)}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex gap-2 justify-end">
                          <Button size="sm" variant="outline" onClick={() => openRoomDialog(room)}>
                            <Edit className="w-4 h-4" />
                          </Button>
                          <Button size="sm" variant="outline" onClick={() => handleRoomDelete(room.id)}>
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
        </TabsContent>

        {/* Tab de Plataformas */}
        <TabsContent value="platforms">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle>Gestión de Plataformas</CardTitle>
                <CardDescription>Administra las plataformas de streaming disponibles</CardDescription>
              </div>
              <Dialog open={platformDialog} onOpenChange={setPlatformDialog}>
                <DialogTrigger asChild>
                  <Button onClick={() => openPlatformDialog()} className="flex items-center gap-2">
                    <Plus className="w-4 h-4" />
                    Nueva Plataforma
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>{editingPlatform ? 'Editar Plataforma' : 'Nueva Plataforma'}</DialogTitle>
                    <DialogDescription>
                      Completa la información de la plataforma
                    </DialogDescription>
                  </DialogHeader>
                  <div className="grid gap-4 py-4">
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="platformName" className="text-right">Nombre *</Label>
                      <Input
                        id="platformName"
                        value={platformForm.name}
                        onChange={(e) => setPlatformForm({...platformForm, name: e.target.value})}
                        className="col-span-3"
                        placeholder="Nombre de la plataforma"
                        required
                      />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="platformCategory" className="text-right">Categoría</Label>
                      <Input
                        id="platformCategory"
                        value={platformForm.category}
                        onChange={(e) => setPlatformForm({...platformForm, category: e.target.value})}
                        className="col-span-3"
                        placeholder="ej. Streaming, Gaming, etc."
                      />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="platformPrice" className="text-right">Precio Mensual</Label>
                      <Input
                        id="platformPrice"
                        type="number"
                        step="0.01"
                        value={platformForm.monthlyPrice}
                        onChange={(e) => setPlatformForm({...platformForm, monthlyPrice: e.target.value})}
                        className="col-span-3"
                        placeholder="0.00"
                        min="0"
                      />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="platformActive" className="text-right">Estado</Label>
                      <Select value={platformForm.isActive.toString()} onValueChange={(value) => setPlatformForm({...platformForm, isActive: value === 'true'})}>
                        <SelectTrigger className="col-span-3">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="true">Activa</SelectItem>
                          <SelectItem value="false">Inactiva</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  <DialogFooter>
                    <Button variant="outline" onClick={() => setPlatformDialog(false)}>Cancelar</Button>
                    <Button onClick={handlePlatformSubmit}>{editingPlatform ? 'Actualizar' : 'Crear'}</Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Nombre</TableHead>
                    <TableHead>Categoría</TableHead>
                    <TableHead>Precio Mensual</TableHead>
                    <TableHead>Estado</TableHead>
                    <TableHead className="text-right">Acciones</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {platformOptions.map((platform) => (
                    <TableRow key={platform.id}>
                      <TableCell className="font-medium">
                        <div className="flex items-center gap-2">
                          <Tv className="w-4 h-4" />
                          {platform.name}
                        </div>
                      </TableCell>
                      <TableCell>{platform.category}</TableCell>
                      <TableCell>
                        {platform.monthlyPrice ? `$${platform.monthlyPrice.toFixed(2)}` : 'N/A'}
                      </TableCell>
                      <TableCell>
                        <Badge 
                          className={platform.isActive ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'} 
                          variant="secondary"
                        >
                          {platform.isActive ? 'Activa' : 'Inactiva'}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex gap-2 justify-end">
                          <Button size="sm" variant="outline" onClick={() => openPlatformDialog(platform)}>
                            <Edit className="w-4 h-4" />
                          </Button>
                          <Button size="sm" variant="outline" onClick={() => handlePlatformDelete(platform.id)}>
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
        </TabsContent>
      </Tabs>
    </div>
  );
};
