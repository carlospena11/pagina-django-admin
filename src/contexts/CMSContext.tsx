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

interface CMSContextType {
  pages: Page[];
  media: MediaItem[];
  hotels: Hotel[];
  rooms: Room[];
  platforms: Platform[];
  addPage: (page: Omit<Page, 'id'>) => void;
  updatePage: (id: string, updates: Partial<Page>) => void;
  deletePage: (id: string) => void;
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
      content: '<h1>Bienvenido a nuestro sitio web</h1><p>Esta es la página principal.</p>'
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
      content: '<h1>Sobre Nosotros</h1><p>Información sobre la empresa.</p>'
    },
    {
      id: '4',
      title: 'Contacto',
      slug: 'contact',
      status: 'review',
      author: 'Writer',
      lastModified: '2024-01-12',
      views: 2340,
      content: '<h1>Contacto</h1><p>Información de contacto.</p>'
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

  const addPage = (page: Omit<Page, 'id'>) => {
    const newPage = {
      ...page,
      id: (pages.length + 1).toString(),
    };
    setPages([...pages, newPage]);
  };

  const updatePage = (id: string, updates: Partial<Page>) => {
    setPages(pages.map(page => 
      page.id === id ? { ...page, ...updates, lastModified: new Date().toISOString().split('T')[0] } : page
    ));
  };

  const deletePage = (id: string) => {
    setPages(pages.filter(page => page.id !== id));
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

  return (
    <CMSContext.Provider value={{
      pages,
      media,
      hotels,
      rooms,
      platforms,
      addPage,
      updatePage,
      deletePage,
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
    }}>
      {children}
    </CMSContext.Provider>
  );
};
