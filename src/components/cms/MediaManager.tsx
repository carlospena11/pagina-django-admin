
import React, { useState } from 'react';
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { 
  Plus, 
  Search, 
  Upload, 
  Eye,
  Grid,
  List,
  Download,
  Trash2,
  Filter,
  MoreHorizontal
} from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useCMS } from '@/contexts/CMSContext';

export const MediaManager: React.FC = () => {
  const { media, deleteMedia } = useCMS();
  const [searchTerm, setSearchTerm] = useState('');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [filterType, setFilterType] = useState<string>('all');

  const filteredMedia = media.filter(item => {
    const matchesSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filterType === 'all' || item.type === filterType;
    return matchesSearch && matchesFilter;
  });

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'image':
        return 'bg-green-100 text-green-800';
      case 'video':
        return 'bg-blue-100 text-blue-800';
      case 'document':
        return 'bg-purple-100 text-purple-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const handleDeleteMedia = (id: string) => {
    if (confirm('¿Estás seguro de que quieres eliminar este archivo?')) {
      deleteMedia(id);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-3xl font-bold text-gray-900">Gestión de Medios</h2>
          <p className="text-gray-600">Administra todas las imágenes y archivos multimedia</p>
        </div>
        <Button className="flex items-center gap-2">
          <Upload className="w-4 h-4" />
          Subir Archivo
        </Button>
      </div>

      {/* Filters and Search */}
      <Card className="p-4">
        <div className="flex flex-col sm:flex-row gap-4 items-center">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <Input
              placeholder="Buscar archivos..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
          
          <div className="flex gap-2">
            <Button
              variant={filterType === 'all' ? 'default' : 'outline'}
              onClick={() => setFilterType('all')}
            >
              Todos
            </Button>
            <Button
              variant={filterType === 'image' ? 'default' : 'outline'}
              onClick={() => setFilterType('image')}
            >
              Imágenes
            </Button>
            <Button
              variant={filterType === 'video' ? 'default' : 'outline'}
              onClick={() => setFilterType('video')}
            >
              Videos
            </Button>
            <Button
              variant={filterType === 'document' ? 'default' : 'outline'}
              onClick={() => setFilterType('document')}
            >
              Documentos
            </Button>
          </div>

          <div className="flex gap-2">
            <Button
              variant={viewMode === 'grid' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setViewMode('grid')}
            >
              <Grid className="w-4 h-4" />
            </Button>
            <Button
              variant={viewMode === 'list' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setViewMode('list')}
            >
              <List className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </Card>

      {/* Media Grid/List */}
      <Card className="p-6">
        {viewMode === 'grid' ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {filteredMedia.map((item) => (
              <div key={item.id} className="group relative bg-gray-50 rounded-lg overflow-hidden hover:shadow-lg transition-shadow">
                <div className="aspect-square bg-gray-200 relative">
                  {item.type === 'image' ? (
                    <img
                      src={item.url}
                      alt={item.alt || item.name}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      <span className="text-4xl">📄</span>
                    </div>
                  )}
                  
                  {/* Overlay with actions */}
                  <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-50 transition-opacity flex items-center justify-center opacity-0 group-hover:opacity-100">
                    <div className="flex gap-2">
                      <Button size="sm" variant="secondary">
                        <Eye className="w-4 h-4" />
                      </Button>
                      <Button size="sm" variant="secondary">
                        <Download className="w-4 h-4" />
                      </Button>
                      <Button 
                        size="sm" 
                        variant="destructive"
                        onClick={() => handleDeleteMedia(item.id)}
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </div>
                
                <div className="p-3">
                  <div className="flex items-center justify-between mb-2">
                    <Badge className={getTypeColor(item.type)}>
                      {item.type}
                    </Badge>
                    <span className="text-xs text-gray-500">{item.size}</span>
                  </div>
                  <p className="text-sm font-medium truncate" title={item.name}>{item.name}</p>
                  <p className="text-xs text-gray-500">{item.uploadDate}</p>
                  {item.alt && (
                    <p className="text-xs text-gray-400 mt-1 truncate" title={item.alt}>{item.alt}</p>
                  )}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="space-y-2">
            {filteredMedia.map((item) => (
              <div key={item.id} className="flex items-center gap-4 p-3 rounded-lg hover:bg-gray-50">
                <div className="w-12 h-12 bg-gray-200 rounded overflow-hidden flex-shrink-0">
                  {item.type === 'image' ? (
                    <img
                      src={item.url}
                      alt={item.alt || item.name}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      <span className="text-lg">📄</span>
                    </div>
                  )}
                </div>
                
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <p className="font-medium truncate">{item.name}</p>
                    <Badge className={getTypeColor(item.type)}>
                      {item.type}
                    </Badge>
                  </div>
                  <p className="text-sm text-gray-500">{item.size} • {item.uploadDate}</p>
                  {item.alt && (
                    <p className="text-xs text-gray-400 truncate">{item.alt}</p>
                  )}
                </div>
                
                <div className="flex gap-2">
                  <Button size="sm" variant="outline">
                    <Eye className="w-4 h-4" />
                  </Button>
                  <Button size="sm" variant="outline">
                    <Download className="w-4 h-4" />
                  </Button>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button size="sm" variant="outline">
                        <MoreHorizontal className="w-4 h-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent>
                      <DropdownMenuItem 
                        className="text-red-600"
                        onClick={() => handleDeleteMedia(item.id)}
                      >
                        Eliminar
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </div>
            ))}
          </div>
        )}
      </Card>
    </div>
  );
};
