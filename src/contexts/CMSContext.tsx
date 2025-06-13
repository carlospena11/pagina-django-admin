import React, { createContext, useContext, useState, ReactNode } from 'react';

interface Page {
  id: string;
  title: string;
  slug: string;
  status: 'published' | 'draft' | 'review';
  author: string;
  lastModified: string;
  views: number;
  content?: string;
}

interface MediaItem {
  id: string;
  name: string;
  url: string;
  type: 'image' | 'video' | 'document';
  size: string;
  uploadDate: string;
  alt?: string;
}

interface Hotel {
  id: string;
  name: string;
  address: string;
  status: 'active' | 'inactive';
  createdAt: string;
}

interface Room {
  id: string;
  number: string;
  type: string;
  hotelId: string;
  status: 'active' | 'inactive' | 'maintenance';
  createdAt: string;
}

interface Platform {
  id: string;
  name: string;
  type: string;
  hotel: string;
  username: string;
  password: string;
  status: 'active' | 'inactive';
  createdAt: string;
}

interface Event {
  id: string;
  title: string;
  description?: string;
  hotel_id: string;
  start_date: string;
  end_date?: string;
  location?: string;
  event_type: string;
  status: 'active' | 'inactive' | 'cancelled';
  max_capacity?: number;
  current_attendees: number;
  price?: number;
  image_url?: string;
  created_at: string;
  updated_at: string;
}

interface CMSContextType {
  pages: Page[];
  media: MediaItem[];
  hotels: Hotel[];
  rooms: Room[];
  platforms: Platform[];
  events: Event[];
  addPage: (page: Omit<Page, 'id'>) => Page;
  updatePage: (id: string, updates: Partial<Page>) => void;
  deletePage: (id: string) => void;
  getPageBySlug: (slug: string) => Page | undefined;
  addMedia: (media: Omit<MediaItem, 'id'>) => void;
  deleteMedia: (id: string) => void;
  addHotel: (hotel: Omit<Hotel, 'id'>) => void;
  updateHotel: (id: string, updates: Partial<Hotel>) => void;
  deleteHotel: (id: string) => void;
  addRoom: (room: Omit<Room, 'id'>) => void;
  updateRoom: (id: string, updates: Partial<Room>) => void;
  deleteRoom: (id: string) => void;
  addPlatform: (platform: Omit<Platform, 'id'>) => void;
  updatePlatform: (id: string, updates: Partial<Platform>) => void;
  deletePlatform: (id: string) => void;
  addEvent: (event: Omit<Event, 'id' | 'created_at' | 'updated_at'>) => void;
  updateEvent: (id: string, updates: Partial<Event>) => void;
  deleteEvent: (id: string) => void;
}

const CMSContext = createContext<CMSContextType | undefined>(undefined);

export const useCMS = () => {
  const context = useContext(CMSContext);
  if (!context) {
    throw new Error('useCMS must be used within a CMSProvider');
  }
  return context;
};

interface CMSProviderProps {
  children: ReactNode;
}

export const CMSProvider: React.FC<CMSProviderProps> = ({ children }) => {
  const [pages, setPages] = useState<Page[]>([
    {
      id: '1',
      title: 'Página de Inicio',
      slug: 'home',
      status: 'published',
      author: 'Admin',
      lastModified: '2024-01-15',
      views: 1250,
      content: `
        <div class="min-h-screen bg-gradient-to-br from-blue-600 to-purple-700">
          <div class="container mx-auto px-4 py-16">
            <div class="text-center text-white">
              <h1 class="text-6xl font-bold mb-6">Bienvenido a Nuestro Sitio Web</h1>
              <p class="text-xl mb-8 max-w-3xl mx-auto">Esta es la página principal creada con nuestro sistema de gestión de contenido. Aquí puedes mostrar información importante sobre tu negocio o proyecto.</p>
              <div class="space-x-4">
                <a href="/about" class="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors">Sobre Nosotros</a>
                <a href="/contact" class="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-blue-600 transition-colors">Contacto</a>
              </div>
            </div>
          </div>
        </div>
      `
    },
    {
      id: '2',
      title: 'Hilton Hotel Demo',
      slug: 'hilton',
      status: 'published',
      author: 'Admin',
      lastModified: '2024-01-15',
      views: 890,
      content: 'Página demo del hotel Hilton con galería de imágenes y servicios'
    },
    {
      id: '3',
      title: 'Sobre Nosotros',
      slug: 'about',
      status: 'draft',
      author: 'Editor',
      lastModified: '2024-01-14',
      views: 567,
      content: `
        <div class="min-h-screen bg-gray-50">
          <div class="container mx-auto px-4 py-16">
            <div class="max-w-4xl mx-auto">
              <h1 class="text-5xl font-bold text-gray-900 mb-8 text-center">Sobre Nosotros</h1>
              <div class="grid md:grid-cols-2 gap-12 items-center">
                <div>
                  <h2 class="text-3xl font-semibold mb-6 text-gray-800">Nuestra Historia</h2>
                  <p class="text-lg text-gray-600 mb-6">Somos una empresa dedicada a crear soluciones web innovadoras. Desde nuestros inicios, hemos trabajado para ofrecer las mejores herramientas de gestión de contenido.</p>
                  <p class="text-lg text-gray-600 mb-6">Nuestro equipo está formado por profesionales apasionados por la tecnología y el diseño, comprometidos con la excelencia en cada proyecto.</p>
                  <div class="space-y-4">
                    <div class="flex items-center">
                      <span class="w-2 h-2 bg-blue-600 rounded-full mr-3"></span>
                      <span class="text-gray-700">Experiencia en desarrollo web</span>
                    </div>
                    <div class="flex items-center">
                      <span class="w-2 h-2 bg-blue-600 rounded-full mr-3"></span>
                      <span class="text-gray-700">Soluciones personalizadas</span>
                    </div>
                    <div class="flex items-center">
                      <span class="w-2 h-2 bg-blue-600 rounded-full mr-3"></span>
                      <span class="text-gray-700">Soporte técnico especializado</span>
                    </div>
                  </div>
                </div>
                <div class="text-center">
                  <img src="https://images.unsplash.com/photo-1522071820081-009f0129c71c" alt="Nuestro equipo" class="rounded-lg shadow-xl w-full h-96 object-cover">
                </div>
              </div>
            </div>
          </div>
        </div>
      `
    },
    {
      id: '4',
      title: 'Contacto',
      slug: 'contact',
      status: 'review',
      author: 'Writer',
      lastModified: '2024-01-12',
      views: 2340,
      content: `
        <div class="min-h-screen bg-white">
          <div class="container mx-auto px-4 py-16">
            <div class="max-w-4xl mx-auto">
              <h1 class="text-5xl font-bold text-gray-900 mb-8 text-center">Contáctanos</h1>
              <p class="text-xl text-gray-600 text-center mb-12">Estamos aquí para ayudarte. No dudes en ponerte en contacto con nosotros.</p>
              
              <div class="grid md:grid-cols-2 gap-12">
                <div>
                  <h2 class="text-2xl font-semibold mb-6">Información de Contacto</h2>
                  <div class="space-y-4">
                    <div class="flex items-center">
                      <div class="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mr-4">
                        <span class="text-blue-600 font-bold">📧</span>
                      </div>
                      <div>
                        <p class="font-semibold">Email</p>
                        <p class="text-gray-600">contacto@miempresa.com</p>
                      </div>
                    </div>
                    <div class="flex items-center">
                      <div class="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mr-4">
                        <span class="text-blue-600 font-bold">📱</span>
                      </div>
                      <div>
                        <p class="font-semibold">Teléfono</p>
                        <p class="text-gray-600">+1 (555) 123-4567</p>
                      </div>
                    </div>
                    <div class="flex items-center">
                      <div class="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mr-4">
                        <span class="text-blue-600 font-bold">📍</span>
                      </div>
                      <div>
                        <p class="font-semibold">Dirección</p>
                        <p class="text-gray-600">123 Calle Principal<br>Ciudad, Estado 12345</p>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div>
                  <h2 class="text-2xl font-semibold mb-6">Envíanos un Mensaje</h2>
                  <form class="space-y-4">
                    <div>
                      <label class="block text-sm font-medium text-gray-700 mb-1">Nombre</label>
                      <input type="text" class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="Tu nombre">
                    </div>
                    <div>
                      <label class="block text-sm font-medium text-gray-700 mb-1">Email</label>
                      <input type="email" class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="tu@email.com">
                    </div>
                    <div>
                      <label class="block text-sm font-medium text-gray-700 mb-1">Mensaje</label>
                      <textarea rows="4" class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="Tu mensaje"></textarea>
                    </div>
                    <button type="submit" class="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors">Enviar Mensaje</button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      `
    },
    {
      id: '5',
      title: 'Página de Muestra',
      slug: 'sample',
      status: 'published',
      author: 'Admin',
      lastModified: '2024-01-16',
      views: 1580,
      content: `
        <div class="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
          <div class="container mx-auto px-4 py-16">
            <div class="text-center mb-12">
              <h1 class="text-5xl font-bold text-gray-900 mb-4">Página de Muestra</h1>
              <p class="text-xl text-gray-600 max-w-3xl mx-auto">Esta es una página de ejemplo que demuestra las capacidades de nuestro sistema de gestión de contenido. Aquí puedes ver diferentes elementos y estilos que se pueden aplicar.</p>
            </div>
            
            <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
              <div class="bg-white rounded-lg shadow-lg p-6">
                <h3 class="text-2xl font-semibold mb-4 text-blue-600">Características</h3>
                <ul class="space-y-2 text-gray-700">
                  <li>• Editor visual avanzado</li>
                  <li>• Gestión de medios</li>
                  <li>• Múltiples tipos de contenido</li>
                  <li>• Diseño responsive</li>
                </ul>
              </div>
              
              <div class="bg-white rounded-lg shadow-lg p-6">
                <h3 class="text-2xl font-semibold mb-4 text-green-600">Beneficios</h3>
                <ul class="space-y-2 text-gray-700">
                  <li>• Fácil de usar</li>
                  <li>• Altamente personalizable</li>
                  <li>• SEO optimizado</li>
                  <li>• Actualizaciones en tiempo real</li>
                </ul>
              </div>
              
              <div class="bg-white rounded-lg shadow-lg p-6 md:col-span-2 lg:col-span-1">
                <h3 class="text-2xl font-semibold mb-4 text-purple-600">Soporte</h3>
                <ul class="space-y-2 text-gray-700">
                  <li>• Documentación completa</li>
                  <li>• Soporte técnico 24/7</li>
                  <li>• Comunidad activa</li>
                  <li>• Tutoriales en video</li>
                </ul>
              </div>
            </div>
            
            <div class="bg-white rounded-lg shadow-lg p-8">
              <h2 class="text-3xl font-bold text-center mb-6 text-gray-900">Contenido de Ejemplo</h2>
              <div class="prose prose-lg max-w-none">
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
                
                <h3>Subtítulo de Ejemplo</h3>
                <p>Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
                
                <blockquote class="border-l-4 border-blue-500 pl-4 italic text-gray-700">
                  "Esta es una cita de ejemplo que muestra cómo se pueden formatear las citas en el contenido."
                </blockquote>
                
                <p>Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.</p>
              </div>
            </div>
          </div>
        </div>
      `
    }
  ]);

  const [media, setMedia] = useState<MediaItem[]>([
    {
      id: '1',
      name: 'hero-hotel.jpg',
      url: 'https://images.unsplash.com/photo-1566073771259-6a8506099945',
      type: 'image',
      size: '2.5 MB',
      uploadDate: '2024-01-15',
      alt: 'Hotel principal - vista exterior'
    },
    {
      id: '2',
      name: 'habitacion-estandar.jpg',
      url: 'https://images.unsplash.com/photo-1649972904349-6e44c42644a7',
      type: 'image',
      size: '1.8 MB',
      uploadDate: '2024-01-14',
      alt: 'Habitación estándar con cama doble'
    },
    {
      id: '3',
      name: 'suite-ejecutiva.jpg',
      url: 'https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9',
      type: 'image',
      size: '3.2 MB',
      uploadDate: '2024-01-13',
      alt: 'Suite ejecutiva con vista panorámica'
    },
    {
      id: '4',
      name: 'habitacion-familiar.jpg',
      url: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158',
      type: 'image',
      size: '1.9 MB',
      uploadDate: '2024-01-12',
      alt: 'Habitación familiar espaciosa'
    },
    {
      id: '5',
      name: 'lobby-principal.jpg',
      url: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b',
      type: 'image',
      size: '2.1 MB',
      uploadDate: '2024-01-11',
      alt: 'Lobby principal del hotel'
    }
  ]);

  const [hotels, setHotels] = useState<Hotel[]>([
    {
      id: '1',
      name: 'Hotel Central',
      address: 'Av. Principal 123, Ciudad',
      status: 'active',
      createdAt: '2024-01-15'
    },
    {
      id: '2',
      name: 'Hotel Costa Azul',
      address: 'Malecón 456, Playa',
      status: 'active',
      createdAt: '2024-01-10'
    }
  ]);

  const [rooms, setRooms] = useState<Room[]>([
    {
      id: '1',
      number: '101',
      type: 'Estándar',
      hotelId: '1',
      status: 'active',
      createdAt: '2024-01-15'
    },
    {
      id: '2',
      number: '102',
      type: 'Suite',
      hotelId: '1',
      status: 'active',
      createdAt: '2024-01-15'
    },
    {
      id: '3',
      number: '201',
      type: 'Familiar',
      hotelId: '2',
      status: 'maintenance',
      createdAt: '2024-01-10'
    }
  ]);

  const [platforms, setPlatforms] = useState<Platform[]>([
    {
      id: '1',
      name: 'Netflix',
      type: 'Streaming',
      hotel: 'Hotel Central',
      username: 'hotel_central_netflix',
      password: 'password123',
      status: 'active',
      createdAt: '2024-01-15'
    },
    {
      id: '2',
      name: 'Disney+',
      type: 'Streaming',
      hotel: 'Hotel Costa Azul',
      username: 'costazul_disney',
      password: 'disney2024',
      status: 'active',
      createdAt: '2024-01-10'
    }
  ]);

  const [events, setEvents] = useState<Event[]>([
    {
      id: '1',
      title: 'Noche de Gala Navideña',
      description: 'Una elegante cena navideña con espectáculo en vivo y menú especial de temporada.',
      hotel_id: '1',
      start_date: '2024-12-24T19:00:00Z',
      end_date: '2024-12-24T23:00:00Z',
      location: 'Salón Principal',
      event_type: 'gala',
      status: 'active',
      max_capacity: 150,
      current_attendees: 87,
      price: 120.00,
      image_url: 'https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3',
      created_at: '2024-01-15T10:00:00Z',
      updated_at: '2024-01-15T10:00:00Z'
    },
    {
      id: '2',
      title: 'Conferencia de Negocios',
      description: 'Evento corporativo para empresas locales con networking y presentaciones.',
      hotel_id: '1',
      start_date: '2024-02-10T09:00:00Z',
      end_date: '2024-02-10T17:00:00Z',
      location: 'Centro de Conferencias',
      event_type: 'conference',
      status: 'active',
      max_capacity: 200,
      current_attendees: 156,
      price: 85.00,
      created_at: '2024-01-10T10:00:00Z',
      updated_at: '2024-01-10T10:00:00Z'
    },
    {
      id: '3',
      title: 'Festival de Verano',
      description: 'Celebración al aire libre con música en vivo, comida y actividades familiares.',
      hotel_id: '2',
      start_date: '2024-07-15T16:00:00Z',
      end_date: '2024-07-15T22:00:00Z',
      location: 'Jardines del Hotel',
      event_type: 'festival',
      status: 'active',
      max_capacity: 300,
      current_attendees: 45,
      price: 25.00,
      image_url: 'https://images.unsplash.com/photo-1492684223066-81342ee5ff30',
      created_at: '2024-01-05T10:00:00Z',
      updated_at: '2024-01-05T10:00:00Z'
    }
  ]);

  const addPage = (page: Omit<Page, 'id'>) => {
    const newPage = {
      ...page,
      id: (pages.length + 1).toString(),
    };
    setPages([...pages, newPage]);
    return newPage;
  };

  const updatePage = (id: string, updates: Partial<Page>) => {
    setPages(pages.map(page => 
      page.id === id ? { ...page, ...updates, lastModified: new Date().toISOString().split('T')[0] } : page
    ));
  };

  const deletePage = (id: string) => {
    setPages(pages.filter(page => page.id !== id));
  };

  const getPageBySlug = (slug: string) => {
    return pages.find(page => page.slug === slug && page.status === 'published');
  };

  const addMedia = (mediaItem: Omit<MediaItem, 'id'>) => {
    const newMedia = {
      ...mediaItem,
      id: (media.length + 1).toString(),
    };
    setMedia([...media, newMedia]);
  };

  const deleteMedia = (id: string) => {
    setMedia(media.filter(item => item.id !== id));
  };

  const addHotel = (hotel: Omit<Hotel, 'id'>) => {
    const newHotel = {
      ...hotel,
      id: (hotels.length + 1).toString(),
    };
    setHotels([...hotels, newHotel]);
  };

  const updateHotel = (id: string, updates: Partial<Hotel>) => {
    setHotels(hotels.map(hotel => 
      hotel.id === id ? { ...hotel, ...updates } : hotel
    ));
  };

  const deleteHotel = (id: string) => {
    setHotels(hotels.filter(hotel => hotel.id !== id));
  };

  const addRoom = (room: Omit<Room, 'id'>) => {
    const newRoom = {
      ...room,
      id: (rooms.length + 1).toString(),
    };
    setRooms([...rooms, newRoom]);
  };

  const updateRoom = (id: string, updates: Partial<Room>) => {
    setRooms(rooms.map(room => 
      room.id === id ? { ...room, ...updates } : room
    ));
  };

  const deleteRoom = (id: string) => {
    setRooms(rooms.filter(room => room.id !== id));
  };

  const addPlatform = (platform: Omit<Platform, 'id'>) => {
    const newPlatform = {
      ...platform,
      id: (platforms.length + 1).toString(),
    };
    setPlatforms([...platforms, newPlatform]);
  };

  const updatePlatform = (id: string, updates: Partial<Platform>) => {
    setPlatforms(platforms.map(platform => 
      platform.id === id ? { ...platform, ...updates } : platform
    ));
  };

  const deletePlatform = (id: string) => {
    setPlatforms(platforms.filter(platform => platform.id !== id));
  };

  const addEvent = (event: Omit<Event, 'id' | 'created_at' | 'updated_at'>) => {
    const now = new Date().toISOString();
    const newEvent = {
      ...event,
      id: (events.length + 1).toString(),
      created_at: now,
      updated_at: now,
    };
    setEvents([...events, newEvent]);
  };

  const updateEvent = (id: string, updates: Partial<Event>) => {
    setEvents(events.map(event => 
      event.id === id ? { ...event, ...updates, updated_at: new Date().toISOString() } : event
    ));
  };

  const deleteEvent = (id: string) => {
    setEvents(events.filter(event => event.id !== id));
  };

  return (
    <CMSContext.Provider value={{
      pages,
      media,
      hotels,
      rooms,
      platforms,
      events,
      addPage,
      updatePage,
      deletePage,
      getPageBySlug,
      addMedia,
      deleteMedia,
      addHotel,
      updateHotel,
      deleteHotel,
      addRoom,
      updateRoom,
      deleteRoom,
      addPlatform,
      updatePlatform,
      deletePlatform,
      addEvent,
      updateEvent,
      deleteEvent,
    }}>
      {children}
    </CMSContext.Provider>
  );
};
