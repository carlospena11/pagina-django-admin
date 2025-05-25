
import React, { useState, useRef, useCallback } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Save, 
  Eye, 
  Undo, 
  Redo,
  Settings,
  ArrowLeft,
  Monitor,
  Tablet,
  Smartphone,
  Tv
} from 'lucide-react';
import { PageSelector } from './PageSelector';
import { DragDropToolbar } from './DragDropToolbar';
import { EditableElement } from './EditableElement';
import { ImageLibrary } from './ImageLibrary';
import { useCMS } from '@/contexts/CMSContext';

interface VisualEditorProps {
  onNavigate?: (view: string) => void;
}

export const VisualEditor: React.FC<VisualEditorProps> = ({ onNavigate }) => {
  const { pages, updatePage } = useCMS();
  const [selectedPageId, setSelectedPageId] = useState<string | null>(null);
  const [viewMode, setViewMode] = useState<'tv' | 'desktop' | 'tablet' | 'mobile'>('tv');
  const [isDragging, setIsDragging] = useState(false);
  const [selectedElement, setSelectedElement] = useState<string | null>(null);
  const [showImageLibrary, setShowImageLibrary] = useState(false);
  const [showPreview, setShowPreview] = useState(true);
  const [elements, setElements] = useState<any[]>([]);
  const canvasRef = useRef<HTMLDivElement>(null);

  const selectedPage = pages.find(p => p.id === selectedPageId);

  const handleDragStart = useCallback((elementType: string) => {
    setIsDragging(true);
  }, []);

  const handleDragEnd = useCallback(() => {
    setIsDragging(false);
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    const elementType = e.dataTransfer.getData('text/plain');
    const rect = canvasRef.current?.getBoundingClientRect();
    
    if (rect) {
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      
      const newElement = {
        id: `element-${Date.now()}`,
        type: elementType,
        x,
        y,
        width: elementType === 'text' ? 400 : 300,
        height: elementType === 'text' ? 60 : 200,
        content: elementType === 'text' ? 'Nuevo texto para TV' : 
                elementType === 'heading' ? 'Título para TV' :
                elementType === 'button' ? 'Botón de TV' : '/placeholder.svg',
        styles: {
          fontSize: elementType === 'text' ? '24px' : 
                  elementType === 'heading' ? '48px' : '20px',
          fontWeight: elementType === 'heading' ? 'bold' : 'normal',
          color: '#ffffff',
          textShadow: '2px 2px 4px rgba(0,0,0,0.8)'
        }
      };
      
      setElements([...elements, newElement]);
    }
  }, [elements]);

  const handleElementUpdate = useCallback((elementId: string, updates: any) => {
    setElements(prev => prev.map(el => 
      el.id === elementId ? { ...el, ...updates } : el
    ));
  }, []);

  const handleSave = () => {
    if (selectedPage) {
      const pageContent = {
        elements,
        layout: viewMode
      };
      updatePage(selectedPage.id, { 
        content: JSON.stringify(pageContent),
        lastModified: new Date().toISOString().split('T')[0]
      });
      console.log('Página guardada exitosamente');
    }
  };

  const getViewportClass = () => {
    switch (viewMode) {
      case 'tv':
        return 'w-full aspect-[16/9] max-w-7xl';
      case 'tablet':
        return 'max-w-2xl aspect-[4/3]';
      case 'mobile':
        return 'max-w-sm aspect-[9/16]';
      default:
        return 'max-w-6xl aspect-[16/10]';
    }
  };

  const getCanvasBackground = () => {
    if (viewMode === 'tv') {
      return 'bg-gradient-to-br from-gray-900 via-gray-800 to-black';
    }
    return 'bg-white';
  };

  if (!selectedPageId) {
    return (
      <PageSelector
        pages={pages}
        onSelectPage={setSelectedPageId}
        onNavigate={onNavigate}
      />
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-4">
          <Button 
            variant="outline" 
            onClick={() => setSelectedPageId(null)}
            className="flex items-center gap-2"
          >
            <ArrowLeft className="w-4 h-4" />
            Volver
          </Button>
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Editor Visual para TV Android</h1>
            <p className="text-gray-500">
              Editando: {selectedPage?.title}
              <Badge className="ml-2" variant="secondary">
                {selectedPage?.status}
              </Badge>
            </p>
          </div>
        </div>
        
        <div className="flex gap-2">
          <div className="flex border rounded-lg">
            <Button
              variant={viewMode === 'tv' ? 'default' : 'ghost'}
              size="sm"
              onClick={() => setViewMode('tv')}
              title="Vista TV Android"
            >
              <Tv className="w-4 h-4" />
            </Button>
            <Button
              variant={viewMode === 'desktop' ? 'default' : 'ghost'}
              size="sm"
              onClick={() => setViewMode('desktop')}
            >
              <Monitor className="w-4 h-4" />
            </Button>
            <Button
              variant={viewMode === 'tablet' ? 'default' : 'ghost'}
              size="sm"
              onClick={() => setViewMode('tablet')}
            >
              <Tablet className="w-4 h-4" />
            </Button>
            <Button
              variant={viewMode === 'mobile' ? 'default' : 'ghost'}
              size="sm"
              onClick={() => setViewMode('mobile')}
            >
              <Smartphone className="w-4 h-4" />
            </Button>
          </div>
          
          <Button 
            variant={showPreview ? 'default' : 'outline'} 
            className="flex items-center gap-2"
            onClick={() => setShowPreview(!showPreview)}
          >
            <Eye className="w-4 h-4" />
            {showPreview ? 'Ocultar Vista Previa' : 'Mostrar Vista Previa'}
          </Button>
          
          <Button variant="outline" className="flex items-center gap-2">
            <Undo className="w-4 h-4" />
          </Button>
          <Button variant="outline" className="flex items-center gap-2">
            <Redo className="w-4 h-4" />
          </Button>
          <Button onClick={handleSave} className="flex items-center gap-2">
            <Save className="w-4 h-4" />
            Guardar
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-12 gap-6">
        {/* Toolbar */}
        <div className="col-span-2">
          <DragDropToolbar
            onDragStart={handleDragStart}
            onShowImageLibrary={() => setShowImageLibrary(true)}
          />
        </div>

        {/* Canvas */}
        <div className={showPreview ? "col-span-6" : "col-span-8"}>
          <Card className="min-h-[600px]">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Tv className="w-5 h-5" />
                Canvas de Edición - {viewMode.toUpperCase()}
              </CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              <div className="flex justify-center p-4">
                <div className={`transition-all duration-300 ${getViewportClass()}`}>
                  <div
                    ref={canvasRef}
                    className={`relative w-full h-full border-2 border-dashed border-gray-200 overflow-hidden ${getCanvasBackground()}`}
                    onDragOver={(e) => e.preventDefault()}
                    onDrop={handleDrop}
                    style={{ 
                      backgroundImage: isDragging ? 'radial-gradient(circle, rgba(255,255,255,0.1) 1px, transparent 1px)' : 'none',
                      backgroundSize: isDragging ? '30px 30px' : 'auto',
                      minHeight: viewMode === 'tv' ? '540px' : '400px'
                    }}
                  >
                    {/* TV Frame Indicator */}
                    {viewMode === 'tv' && (
                      <div className="absolute top-2 left-2 bg-black bg-opacity-50 text-white px-2 py-1 rounded text-xs">
                        TV Android 16:9
                      </div>
                    )}
                    
                    {/* Rendered Elements */}
                    {elements.map((element) => (
                      <EditableElement
                        key={element.id}
                        element={element}
                        isSelected={selectedElement === element.id}
                        onSelect={setSelectedElement}
                        onUpdate={handleElementUpdate}
                      />
                    ))}
                    
                    {/* Drop Zone Hint */}
                    {isDragging && elements.length === 0 && (
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="text-center text-white">
                          <div className="text-4xl mb-4">📺</div>
                          <p className="text-xl">Arrastra elementos aquí para la TV</p>
                          <p className="text-sm opacity-75 mt-2">Diseño optimizado para Android TV</p>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Preview Panel */}
        {showPreview && (
          <div className="col-span-2">
            <Card className="h-full">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Eye className="w-5 h-5" />
                  Vista Previa
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="bg-black rounded-lg p-3 text-white text-xs">
                    <div className="text-center mb-2">📺 TV Android</div>
                    <div className={`w-full aspect-video bg-gradient-to-br from-gray-800 to-black rounded border relative overflow-hidden`}>
                      {elements.map((element) => (
                        <div
                          key={`preview-${element.id}`}
                          className="absolute"
                          style={{
                            left: `${(element.x / 1000) * 100}%`,
                            top: `${(element.y / 600) * 100}%`,
                            width: `${(element.width / 1000) * 100}%`,
                            height: `${(element.height / 600) * 100}%`,
                            fontSize: '4px',
                            color: element.styles?.color || 'white'
                          }}
                        >
                          {element.type === 'text' && (
                            <div className="text-white text-xs truncate">
                              {element.content}
                            </div>
                          )}
                          {element.type === 'heading' && (
                            <div className="text-white text-xs font-bold truncate">
                              {element.content}
                            </div>
                          )}
                          {element.type === 'image' && (
                            <div className="bg-gray-600 w-full h-full rounded"></div>
                          )}
                          {element.type === 'button' && (
                            <div className="bg-blue-600 w-full h-full rounded text-center text-white text-xs">
                              BTN
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  <div className="text-xs text-gray-500 space-y-1">
                    <p>• Elementos: {elements.length}</p>
                    <p>• Modo: {viewMode}</p>
                    <p>• Resolución: 1920x1080</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Properties Panel */}
        <div className="col-span-2">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Settings className="w-5 h-5" />
                Propiedades TV
              </CardTitle>
            </CardHeader>
            <CardContent>
              {selectedElement ? (
                <div className="space-y-4">
                  <p className="text-sm text-gray-600">
                    Elemento: {elements.find(el => el.id === selectedElement)?.type}
                  </p>
                  <div className="text-xs text-gray-500 space-y-1">
                    <p>• Optimizado para TV</p>
                    <p>• Texto grande y legible</p>
                    <p>• Contraste alto</p>
                    <p>• Navegación por control</p>
                  </div>
                </div>
              ) : (
                <div className="space-y-3">
                  <p className="text-sm text-gray-500">
                    Selecciona un elemento para editar
                  </p>
                  <div className="text-xs text-gray-400 space-y-1">
                    <p>💡 Consejos para TV:</p>
                    <p>• Usa texto grande (24px+)</p>
                    <p>• Colores contrastantes</p>
                    <p>• Espaciado generoso</p>
                    <p>• Botones grandes</p>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Image Library Modal */}
      {showImageLibrary && (
        <ImageLibrary 
          onClose={() => setShowImageLibrary(false)}
          onSelectImage={(url) => {
            // Handle image selection
            setShowImageLibrary(false);
          }}
        />
      )}
    </div>
  );
};
