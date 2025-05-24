
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
import { Plus, Edit, Trash2, Building, Tv, Hash } from 'lucide-react';

interface Hotel {
  id: string;
  name: string;
  address?: string;
}

interface Room {
  id: string;
  number: string;
  hotelId: string;
  type?: string;
}

interface PlatformOption {
  id: string;
  name: string;
  category?: string;
}

export const SettingsManager: React.FC = () => {
  // Estados para hoteles
  const [hotels, setHotels] = useState<Hotel[]>([
    { id: '1', name: 'Hotel Central', address: 'Centro de la ciudad' },
    { id: '2', name: 'Hotel Plaza', address: 'Plaza Principal' },
    { id: '3', name: 'Hotel Boutique', address: 'Zona exclusiva' },
    { id: '4', name: 'Resort & Spa', address: 'Zona turística' },
    { id: '5', name: 'Business Hotel', address: 'Distrito financiero' }
  ]);

  // Estados para habitaciones
  const [rooms, setRooms] = useState<Room[]>([
    { id: '1', number: '101', hotelId: '1', type: 'Estándar' },
    { id: '2', number: '102', hotelId: '1', type: 'Suite' },
    { id: '3', number: '201', hotelId: '2', type: 'Estándar' },
    { id: '4', number: '301', hotelId: '3', type: 'Deluxe' }
  ]);

  // Estados para plataformas
  const [platformOptions, setPlatformOptions] = useState<PlatformOption[]>([
    { id: '1', name: 'Netflix', category: 'Streaming' },
    { id: '2', name: 'Amazon Prime Video', category: 'Streaming' },
    { id: '3', name: 'Disney+', category: 'Streaming' },
    { id: '4', name: 'HBO Max', category: 'Streaming' },
    { id: '5', name: 'Hulu', category: 'Streaming' },
    { id: '6', name: 'Apple TV+', category: 'Streaming' },
    { id: '7', name: 'Paramount+', category: 'Streaming' },
    { id: '8', name: 'Peacock', category: 'Streaming' },
    { id: '9', name: 'Discovery+', category: 'Streaming' },
    { id: '10', name: 'YouTube Premium', category: 'Streaming' }
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
  const [hotelForm, setHotelForm] = useState({ name: '', address: '' });
  const [roomForm, setRoomForm] = useState({ number: '', hotelId: '', type: '' });
  const [platformForm, setPlatformForm] = useState({ name: '', category: '' });

  // Funciones para hoteles
  const openHotelDialog = (hotel?: Hotel) => {
    if (hotel) {
      setEditingHotel(hotel);
      setHotelForm({ name: hotel.name, address: hotel.address || '' });
    } else {
      setEditingHotel(null);
      setHotelForm({ name: '', address: '' });
    }
    setHotelDialog(true);
  };

  const handleHotelSubmit = () => {
    if (editingHotel) {
      setHotels(hotels.map(h => 
        h.id === editingHotel.id 
          ? { ...h, ...hotelForm }
          : h
      ));
    } else {
      const newHotel: Hotel = {
        id: (hotels.length + 1).toString(),
        ...hotelForm
      };
      setHotels([...hotels, newHotel]);
    }
    setHotelDialog(false);
  };

  const handleHotelDelete = (id: string) => {
    setHotels(hotels.filter(h => h.id !== id));
    // También eliminar habitaciones del hotel
    setRooms(rooms.filter(r => r.hotelId !== id));
  };

  // Funciones para habitaciones
  const openRoomDialog = (room?: Room) => {
    if (room) {
      setEditingRoom(room);
      setRoomForm({ number: room.number, hotelId: room.hotelId, type: room.type || '' });
    } else {
      setEditingRoom(null);
      setRoomForm({ number: '', hotelId: '', type: '' });
    }
    setRoomDialog(true);
  };

  const handleRoomSubmit = () => {
    if (editingRoom) {
      setRooms(rooms.map(r => 
        r.id === editingRoom.id 
          ? { ...r, ...roomForm }
          : r
      ));
    } else {
      const newRoom: Room = {
        id: (rooms.length + 1).toString(),
        ...roomForm
      };
      setRooms([...rooms, newRoom]);
    }
    setRoomDialog(false);
  };

  const handleRoomDelete = (id: string) => {
    setRooms(rooms.filter(r => r.id !== id));
  };

  // Funciones para plataformas
  const openPlatformDialog = (platform?: PlatformOption) => {
    if (platform) {
      setEditingPlatform(platform);
      setPlatformForm({ name: platform.name, category: platform.category || '' });
    } else {
      setEditingPlatform(null);
      setPlatformForm({ name: '', category: '' });
    }
    setPlatformDialog(true);
  };

  const handlePlatformSubmit = () => {
    if (editingPlatform) {
      setPlatformOptions(platformOptions.map(p => 
        p.id === editingPlatform.id 
          ? { ...p, ...platformForm }
          : p
      ));
    } else {
      const newPlatform: PlatformOption = {
        id: (platformOptions.length + 1).toString(),
        ...platformForm
      };
      setPlatformOptions([...platformOptions, newPlatform]);
    }
    setPlatformDialog(false);
  };

  const handlePlatformDelete = (id: string) => {
    setPlatformOptions(platformOptions.filter(p => p.id !== id));
  };

  const getHotelName = (hotelId: string) => {
    return hotels.find(h => h.id === hotelId)?.name || 'Hotel no encontrado';
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Configuración del Sistema</h1>
        <p className="text-gray-500 mt-1">Administra hoteles, habitaciones y plataformas disponibles</p>
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
                      <Label htmlFor="hotelName" className="text-right">Nombre</Label>
                      <Input
                        id="hotelName"
                        value={hotelForm.name}
                        onChange={(e) => setHotelForm({...hotelForm, name: e.target.value})}
                        className="col-span-3"
                        placeholder="Nombre del hotel"
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
                      <TableCell>{hotel.address}</TableCell>
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
                      <Label htmlFor="roomNumber" className="text-right">Número</Label>
                      <Input
                        id="roomNumber"
                        value={roomForm.number}
                        onChange={(e) => setRoomForm({...roomForm, number: e.target.value})}
                        className="col-span-3"
                        placeholder="ej. 101"
                      />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="roomHotel" className="text-right">Hotel</Label>
                      <select
                        id="roomHotel"
                        value={roomForm.hotelId}
                        onChange={(e) => setRoomForm({...roomForm, hotelId: e.target.value})}
                        className="col-span-3 px-3 py-2 border border-gray-300 rounded-md"
                      >
                        <option value="">Selecciona un hotel</option>
                        {hotels.map((hotel) => (
                          <option key={hotel.id} value={hotel.id}>{hotel.name}</option>
                        ))}
                      </select>
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
                      <Label htmlFor="platformName" className="text-right">Nombre</Label>
                      <Input
                        id="platformName"
                        value={platformForm.name}
                        onChange={(e) => setPlatformForm({...platformForm, name: e.target.value})}
                        className="col-span-3"
                        placeholder="Nombre de la plataforma"
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
