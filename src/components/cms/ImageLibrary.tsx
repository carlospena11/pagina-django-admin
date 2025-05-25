
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { 
  X, 
  Upload, 
  Search, 
  Filter,
  Grid3X3,
  List,
  Download,
  Trash2
} from 'lucide-react';
import { useCMS } from '@/contexts/CMSContext';

interface ImageLibraryProps {
  onClose: () => void;
  onSelectImage: (url: string) => void;
}

export const ImageLibrary: React.FC<ImageLibraryProps> = ({ 
  onClose, 
  onSelectImage 
}) => {
  const { media, deleteMedia } = useCMS();
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState<string>('all');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [selectedImages, setSelectedImages] = useState<string[]>([]);

  const filteredMedia = media.filter(item => {
    const matchesSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         item.alt?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filterType === 'all' || item.type === filterType;
    return matchesSearch && matchesFilter;
  });

  const handleImageSelect = (imageUrl: string) => {
    onSelectImage(imageUrl);
    onClose();
  };

  const toggleImageSelection = (id: string) => {
    setSelectedImages(prev => 
      prev.includes(id) 
        ? prev.filter(imgId => imgId !== id)
        : [...prev, id]
    );
  };

  const handleBulkDelete = () => {
    selectedImages.forEach(id => deleteMedia(id));
    setSelectedImages([]);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <Card className="w-[90vw] h-[80vh] max-w-6xl">
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="flex items-center gap-2">
            <Grid3X3 className="w-5 h-5" />
            Librería de Imágenes
          </CardTitle>
          <Button variant="outline" onClick={onClose}>
            <X className="w-4 h-4" />
          </Button>
        </CardHeader>
        
        <CardContent className="flex flex-col h-full">
          {/* Toolbar */}
          <div className="flex flex-col sm:flex-row gap-4 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <Input
                placeholder="Buscar imágenes..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            
            <div className="flex gap-2">
              <Button
                variant={filterType === 'all' ? 'default' : 'outline'}
                onClick={() => setFilterType('all')}
                size="sm"
              >
                Todas
              </Button>
              <Button
                variant={filterType === 'image' ? 'default' : 'outline'}
                onClick={() => setFilterType('image')}
                size="sm"
              >
                Imágenes
              </Button>
              <Button
                variant={filterType === 'video' ? 'default' : 'outline'}
                onClick={() => setFilterType('video')}
                size="sm"
              >
                Videos
              </Button>
            </div>
            
            <div className="flex gap-1 border rounded">
              <Button
                variant={viewMode === 'grid' ? 'default' : 'ghost'}
                size="sm"
                onClick={() => setViewMode('grid')}
              >
                <Grid3X3 className="w-4 h-4" />
              </Button>
              <Button
                variant={viewMode === 'list' ? 'default' : 'ghost'}
                size="sm"
                onClick={() => setViewMode('list')}
              >
                <List className="w-4 h-4" />
              </Button>
            </div>
            
            <Button className="flex items-center gap-2">
              <Upload className="w-4 h-4" />
              Subir
            </Button>
          </div>

          {/* Actions for selected images */}
          {selectedImages.length > 0 && (
            <div className="flex items-center gap-2 mb-4 p-3 bg-blue-50 rounded-lg">
              <span className="text-sm text-blue-700">
                {selectedImages.length} imagen(es) seleccionada(s)
              </span>
              <div className="flex gap-2 ml-auto">
                <Button variant="outline" size="sm" onClick={handleBulkDelete}>
                  <Trash2 className="w-4 h-4 mr-1" />
                  Eliminar
                </Button>
                <Button variant="outline" size="sm">
                  <Download className="w-4 h-4 mr-1" />
                  Descargar
                </Button>
              </div>
            </div>
          )}

          {/* Media Grid/List */}
          <div className="flex-1 overflow-y-auto">
            {viewMode === 'grid' ? (
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                {filteredMedia.map((item) => (
                  <div
                    key={item.id}
                    className={`relative group border-2 rounded-lg overflow-hidden cursor-pointer transition-all hover:shadow-lg ${
                      selectedImages.includes(item.id) ? 'border-blue-500' : 'border-gray-200'
                    }`}
                    onClick={() => handleImageSelect(item.url)}
                  >
                    {/* Checkbox for selection */}
                    <div
                      className="absolute top-2 left-2 z-10"
                      onClick={(e) => {
                        e.stopPropagation();
                        toggleImageSelection(item.id);
                      }}
                    >
                      <input
                        type="checkbox"
                        checked={selectedImages.includes(item.id)}
                        onChange={() => {}}
                        className="w-4 h-4"
                      />
                    </div>

                    {/* Image */}
                    <div className="aspect-square">
                      <img
                        src={item.url}
                        alt={item.alt || item.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    
                    {/* Overlay */}
                    <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-50 transition-all flex items-center justify-center">
                      <Button 
                        className="opacity-0 group-hover:opacity-100 transition-opacity"
                        size="sm"
                      >
                        Seleccionar
                      </Button>
                    </div>
                    
                    {/* Info */}
                    <div className="p-2">
                      <p className="text-xs font-medium truncate">{item.name}</p>
                      <div className="flex justify-between items-center mt-1">
                        <Badge variant="secondary" className="text-xs">
                          {item.type}
                        </Badge>
                        <span className="text-xs text-gray-500">{item.size}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="space-y-2">
                {filteredMedia.map((item) => (
                  <div
                    key={item.id}
                    className={`flex items-center gap-4 p-3 border rounded-lg cursor-pointer hover:bg-gray-50 ${
                      selectedImages.includes(item.id) ? 'border-blue-500 bg-blue-50' : 'border-gray-200'
                    }`}
                    onClick={() => handleImageSelect(item.url)}
                  >
                    <div
                      onClick={(e) => {
                        e.stopPropagation();
                        toggleImageSelection(item.id);
                      }}
                    >
                      <input
                        type="checkbox"
                        checked={selectedImages.includes(item.id)}
                        onChange={() => {}}
                        className="w-4 h-4"
                      />
                    </div>
                    
                    <div className="w-16 h-16 flex-shrink-0">
                      <img
                        src={item.url}
                        alt={item.alt || item.name}
                        className="w-full h-full object-cover rounded"
                      />
                    </div>
                    
                    <div className="flex-1">
                      <p className="font-medium">{item.name}</p>
                      <p className="text-sm text-gray-500">{item.alt || 'Sin descripción'}</p>
                      <div className="flex gap-2 mt-1">
                        <Badge variant="secondary">{item.type}</Badge>
                        <span className="text-sm text-gray-500">{item.size}</span>
                        <span className="text-sm text-gray-500">{item.uploadDate}</span>
                      </div>
                    </div>
                    
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleImageSelect(item.url);
                      }}
                    >
                      Seleccionar
                    </Button>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Empty State */}
          {filteredMedia.length === 0 && (
            <div className="flex-1 flex items-center justify-center">
              <div className="text-center">
                <Grid3X3 className="w-16 h-16 mx-auto mb-4 text-gray-400" />
                <h3 className="text-lg font-semibold mb-2">No se encontraron imágenes</h3>
                <p className="text-gray-500 mb-4">
                  {searchTerm ? 'Intenta con otros términos de búsqueda' : 'Sube tu primera imagen para comenzar'}
                </p>
                <Button>
                  <Upload className="w-4 h-4 mr-2" />
                  Subir Imagen
                </Button>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};
