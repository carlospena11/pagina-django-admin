
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
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
  Calendar,
  Plus,
  Edit,
  Trash2,
  Users,
  MapPin,
  Clock,
  DollarSign
} from 'lucide-react';
import { useCMS } from '@/contexts/CMSContext';

interface EventFormData {
  title: string;
  description: string;
  hotel_id: string;
  start_date: string;
  end_date: string;
  location: string;
  event_type: string;
  status: 'active' | 'inactive' | 'cancelled';
  max_capacity: string;
  price: string;
  image_url: string;
}

export const EventManager: React.FC = () => {
  const { events, hotels, addEvent, updateEvent, deleteEvent } = useCMS();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingEvent, setEditingEvent] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  
  const [formData, setFormData] = useState<EventFormData>({
    title: '',
    description: '',
    hotel_id: '',
    start_date: '',
    end_date: '',
    location: '',
    event_type: 'general',
    status: 'active',
    max_capacity: '',
    price: '',
    image_url: ''
  });

  const eventTypes = [
    { value: 'general', label: 'General' },
    { value: 'gala', label: 'Gala' },
    { value: 'conference', label: 'Conferencia' },
    { value: 'festival', label: 'Festival' },
    { value: 'wedding', label: 'Boda' },
    { value: 'corporate', label: 'Corporativo' },
    { value: 'entertainment', label: 'Entretenimiento' }
  ];

  const resetForm = () => {
    setFormData({
      title: '',
      description: '',
      hotel_id: '',
      start_date: '',
      end_date: '',
      location: '',
      event_type: 'general',
      status: 'active',
      max_capacity: '',
      price: '',
      image_url: ''
    });
    setEditingEvent(null);
  };

  const handleInputChange = (field: keyof EventFormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const eventData = {
      ...formData,
      max_capacity: formData.max_capacity ? parseInt(formData.max_capacity) : undefined,
      price: formData.price ? parseFloat(formData.price) : undefined,
      current_attendees: 0
    };

    if (editingEvent) {
      updateEvent(editingEvent, eventData);
    } else {
      addEvent(eventData);
    }

    setIsDialogOpen(false);
    resetForm();
  };

  const handleEdit = (event: any) => {
    setFormData({
      title: event.title,
      description: event.description || '',
      hotel_id: event.hotel_id,
      start_date: event.start_date.slice(0, 16),
      end_date: event.end_date ? event.end_date.slice(0, 16) : '',
      location: event.location || '',
      event_type: event.event_type,
      status: event.status,
      max_capacity: event.max_capacity?.toString() || '',
      price: event.price?.toString() || '',
      image_url: event.image_url || ''
    });
    setEditingEvent(event.id);
    setIsDialogOpen(true);
  };

  const handleDelete = (id: string) => {
    if (confirm('¿Estás seguro de que quieres eliminar este evento?')) {
      deleteEvent(id);
    }
  };

  const getHotelName = (hotelId: string) => {
    const hotel = hotels.find(h => h.id === hotelId);
    return hotel ? hotel.name : 'Hotel no encontrado';
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'bg-green-100 text-green-800';
      case 'inactive':
        return 'bg-gray-100 text-gray-800';
      case 'cancelled':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'active':
        return 'Activo';
      case 'inactive':
        return 'Inactivo';
      case 'cancelled':
        return 'Cancelado';
      default:
        return status;
    }
  };

  const filteredEvents = events.filter(event =>
    event.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    getHotelName(event.hotel_id).toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Gestión de Eventos</h1>
          <p className="text-gray-500 mt-1">Administra los eventos de todos los hoteles</p>
        </div>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button onClick={resetForm} className="flex items-center gap-2">
              <Plus className="w-4 h-4" />
              Nuevo Evento
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>{editingEvent ? 'Editar Evento' : 'Crear Nuevo Evento'}</DialogTitle>
              <DialogDescription>
                {editingEvent ? 'Modifica los detalles del evento' : 'Completa la información para crear un nuevo evento'}
              </DialogDescription>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="col-span-2">
                  <Label htmlFor="title">Título del Evento</Label>
                  <Input
                    id="title"
                    value={formData.title}
                    onChange={(e) => handleInputChange('title', e.target.value)}
                    placeholder="Nombre del evento"
                    required
                  />
                </div>
                <div className="col-span-2">
                  <Label htmlFor="description">Descripción</Label>
                  <Textarea
                    id="description"
                    value={formData.description}
                    onChange={(e) => handleInputChange('description', e.target.value)}
                    placeholder="Descripción del evento"
                    rows={3}
                  />
                </div>
                <div>
                  <Label htmlFor="hotel_id">Hotel</Label>
                  <Select value={formData.hotel_id} onValueChange={(value) => handleInputChange('hotel_id', value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Seleccionar hotel" />
                    </SelectTrigger>
                    <SelectContent>
                      {hotels.map((hotel) => (
                        <SelectItem key={hotel.id} value={hotel.id}>
                          {hotel.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="event_type">Tipo de Evento</Label>
                  <Select value={formData.event_type} onValueChange={(value) => handleInputChange('event_type', value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Seleccionar tipo" />
                    </SelectTrigger>
                    <SelectContent>
                      {eventTypes.map((type) => (
                        <SelectItem key={type.value} value={type.value}>
                          {type.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="start_date">Fecha y Hora de Inicio</Label>
                  <Input
                    id="start_date"
                    type="datetime-local"
                    value={formData.start_date}
                    onChange={(e) => handleInputChange('start_date', e.target.value)}
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="end_date">Fecha y Hora de Fin</Label>
                  <Input
                    id="end_date"
                    type="datetime-local"
                    value={formData.end_date}
                    onChange={(e) => handleInputChange('end_date', e.target.value)}
                  />
                </div>
                <div>
                  <Label htmlFor="location">Ubicación</Label>
                  <Input
                    id="location"
                    value={formData.location}
                    onChange={(e) => handleInputChange('location', e.target.value)}
                    placeholder="Salón, jardín, etc."
                  />
                </div>
                <div>
                  <Label htmlFor="status">Estado</Label>
                  <Select value={formData.status} onValueChange={(value: any) => handleInputChange('status', value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Seleccionar estado" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="active">Activo</SelectItem>
                      <SelectItem value="inactive">Inactivo</SelectItem>
                      <SelectItem value="cancelled">Cancelado</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="max_capacity">Capacidad Máxima</Label>
                  <Input
                    id="max_capacity"
                    type="number"
                    value={formData.max_capacity}
                    onChange={(e) => handleInputChange('max_capacity', e.target.value)}
                    placeholder="Número de personas"
                  />
                </div>
                <div>
                  <Label htmlFor="price">Precio por Persona</Label>
                  <Input
                    id="price"
                    type="number"
                    step="0.01"
                    value={formData.price}
                    onChange={(e) => handleInputChange('price', e.target.value)}
                    placeholder="0.00"
                  />
                </div>
                <div className="col-span-2">
                  <Label htmlFor="image_url">URL de Imagen</Label>
                  <Input
                    id="image_url"
                    value={formData.image_url}
                    onChange={(e) => handleInputChange('image_url', e.target.value)}
                    placeholder="https://ejemplo.com/imagen.jpg"
                  />
                </div>
              </div>
              <DialogFooter>
                <Button type="button" variant="outline" onClick={() => setIsDialogOpen(false)}>
                  Cancelar
                </Button>
                <Button type="submit">
                  {editingEvent ? 'Actualizar' : 'Crear'} Evento
                </Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      {/* Search */}
      <div className="flex gap-4 items-center">
        <Input
          placeholder="Buscar eventos..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="max-w-sm"
        />
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Eventos</CardTitle>
            <Calendar className="w-4 h-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{events.length}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Eventos Activos</CardTitle>
            <Clock className="w-4 h-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{events.filter(e => e.status === 'active').length}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Asistentes</CardTitle>
            <Users className="w-4 h-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{events.reduce((sum, e) => sum + e.current_attendees, 0)}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Ingresos Potenciales</CardTitle>
            <DollarSign className="w-4 h-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              ${events.reduce((sum, e) => sum + (e.price || 0) * e.current_attendees, 0).toLocaleString()}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Events Table */}
      <Card>
        <CardHeader>
          <CardTitle>Lista de Eventos</CardTitle>
          <CardDescription>
            Gestiona todos los eventos programados en los hoteles
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Evento</TableHead>
                <TableHead>Hotel</TableHead>
                <TableHead>Fecha</TableHead>
                <TableHead>Tipo</TableHead>
                <TableHead>Estado</TableHead>
                <TableHead>Asistentes</TableHead>
                <TableHead>Precio</TableHead>
                <TableHead>Acciones</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredEvents.map((event) => (
                <TableRow key={event.id}>
                  <TableCell>
                    <div>
                      <div className="font-medium">{event.title}</div>
                      {event.location && (
                        <div className="text-sm text-gray-500 flex items-center gap-1">
                          <MapPin className="w-3 h-3" />
                          {event.location}
                        </div>
                      )}
                    </div>
                  </TableCell>
                  <TableCell>{getHotelName(event.hotel_id)}</TableCell>
                  <TableCell>
                    <div className="text-sm">
                      {new Date(event.start_date).toLocaleDateString()}
                      <br />
                      {new Date(event.start_date).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline">
                      {eventTypes.find(t => t.value === event.event_type)?.label || event.event_type}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Badge className={getStatusColor(event.status)} variant="secondary">
                      {getStatusText(event.status)}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="text-sm">
                      {event.current_attendees}
                      {event.max_capacity && ` / ${event.max_capacity}`}
                    </div>
                  </TableCell>
                  <TableCell>
                    {event.price ? `$${event.price}` : 'Gratis'}
                  </TableCell>
                  <TableCell>
                    <div className="flex gap-2">
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => handleEdit(event)}
                      >
                        <Edit className="w-4 h-4" />
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => handleDelete(event.id)}
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
