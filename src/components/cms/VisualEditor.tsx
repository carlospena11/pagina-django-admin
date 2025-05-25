
import React, { useState, useRef, useCallback } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Save, 
  Eye, 
  Undo, 
  Redo,
  ArrowLeft,
  Tv
} from 'lucide-react';
import { PageSelector } from './PageSelector';
import { DragDropToolbar } from './DragDropToolbar';
import { EditableElement } from './EditableElement';
import { ImageLibrary } from './ImageLibrary';
import { useCMS } from '@/contexts/CMSContext';
import { useToast } from '@/hooks/use-toast';

interface VisualEditorProps {
  onNavigate?: (view: string) => void;
}

export const VisualEditor: React.FC<VisualEditorProps> = ({ onNavigate }) => {
  const { pages, updatePage } = useCMS();
  const { toast } = useToast();
  const [selectedPageId, setSelectedPageId] = useState<string | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [selectedElement, setSelectedElement] = useState<string | null>(null);
  const [showImageLibrary, setShowImageLibrary] = useState(false);
  const [showPreview, setShowPreview] = useState(true);
  const [elements, setElements] = useState<any[]>([]);
  const canvasRef = useRef<HTMLDivElement>(null);

  const selectedPage = pages.find(p => p.id === selectedPageId);

  // Load existing page content when page is selected
  React.useEffect(() => {
    if (selectedPage && selectedPage.content) {
      try {
        const pageContent = JSON.parse(selectedPage.content);
        if (pageContent.elements) {
          setElements(pageContent.elements);
        } else {
          setElements([]);
        }
      } catch (e) {
        // If content is not JSON, start with empty elements
        setElements([]);
      }
    } else {
      setElements([]);
    }
  }, [selectedPage]);

  const handleDragStart = useCallback((elementType: string) => {
    console.log('Drag start:', elementType);
    setIsDragging(true);
  }, []);

  const handleDragEnd = useCallback(() => {
    console.log('Drag end');
    setIsDragging(false);
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    console.log('Drop event triggered');
    
    const elementType = e.dataTransfer.getData('text/plain');
    const rect = canvasRef.current?.getBoundingClientRect();
    
    console.log('Drop event:', elementType, rect);
    
    if (rect && elementType) {
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      
      const newElement = {
        id: `element-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
        type: elementType,
        x: Math.max(0, Math.min(x - 50, rect.width - 250)),
        y: Math.max(0, Math.min(y - 25, rect.height - 150)),
        width: elementType === 'text' ? 300 : 250,
        height: elementType === 'text' ? 40 : 
                elementType === 'heading' ? 60 :
                elementType === 'button' ? 40 : 150,
        content: elementType === 'text' ? 'Nuevo texto' : 
                elementType === 'heading' ? 'Título' :
                elementType === 'button' ? 'Botón' : 
                elementType === 'image' ? 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=400' : 'Elemento',
        styles: {
          fontSize: elementType === 'text' ? '16px' : 
                  elementType === 'heading' ? '32px' : '14px',
          fontWeight: elementType === 'heading' ? 'bold' : 'normal',
          color: '#ffffff'
        }
      };
      
      console.log('Adding new element:', newElement);
      setElements(prev => [...prev, newElement]);
      setSelectedElement(newElement.id);
      
      toast({
        title: "Elemento añadido",
        description: `Se ha añadido un ${elementType} al canvas.`,
      });
    }
    setIsDragging(false);
  }, [toast]);

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'copy';
  }, []);

  const handleElementUpdate = useCallback((elementId: string, updates: any) => {
    console.log('Updating element:', elementId, updates);
    setElements(prev => prev.map(el => 
      el.id === elementId ? { ...el, ...updates } : el
    ));
  }, []);

  const handleElementDelete = useCallback((elementId: string) => {
    console.log('Deleting element:', elementId);
    setElements(prev => prev.filter(el => el.id !== elementId));
    setSelectedElement(null);
    toast({
      title: "Elemento eliminado",
      description: "El elemento se ha eliminado del canvas.",
    });
  }, [toast]);

  const handleCanvasClick = useCallback((e: React.MouseEvent) => {
    // Only deselect if clicking directly on the canvas, not on child elements
    if (e.target === e.currentTarget) {
      setSelectedElement(null);
    }
  }, []);

  const handleSave = () => {
    if (selectedPage) {
      const pageContent = {
        elements,
        layout: 'tv'
      };
      updatePage(selectedPage.id, { 
        content: JSON.stringify(pageContent),
        lastModified: new Date().toISOString().split('T')[0]
      });
      toast({
        title: "Página guardada",
        description: "La página se ha guardado exitosamente.",
      });
      console.log('Página guardada exitosamente');
    }
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
            <h1 className="text-3xl font-bold text-gray-900">Editor Visual</h1>
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
              variant="default"
              size="sm"
              className="flex items-center gap-2"
            >
              <Tv className="w-4 h-4" />
              TV
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
        <div className={showPreview ? "col-span-7" : "col-span-10"}>
          <Card className="min-h-[600px]">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Tv className="w-5 h-5" />
                Canvas de Edición - TV
                {isDragging && (
                  <Badge variant="secondary" className="ml-2">
                    Arrastrando...
                  </Badge>
                )}
              </CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              <div className="flex justify-center p-4">
                <div className="transition-all duration-300 max-w-6xl aspect-video">
                  <div
                    ref={canvasRef}
                    className={`relative w-full h-full border-2 ${
                      isDragging ? 'border-blue-400 bg-blue-50' : 'border-dashed border-gray-200'
                    } overflow-hidden bg-black transition-all duration-200`}
                    onDragOver={handleDragOver}
                    onDrop={handleDrop}
                    onClick={handleCanvasClick}
                    style={{ 
                      backgroundImage: isDragging ? 'radial-gradient(circle, rgba(59, 130, 246, 0.1) 1px, transparent 1px)' : 'none',
                      backgroundSize: isDragging ? '20px 20px' : 'auto',
                      minHeight: '400px'
                    }}
                  >
                    {/* Rendered Elements */}
                    {elements.map((element) => (
                      <EditableElement
                        key={element.id}
                        element={element}
                        isSelected={selectedElement === element.id}
                        onSelect={setSelectedElement}
                        onUpdate={handleElementUpdate}
                        onDelete={handleElementDelete}
                      />
                    ))}
                    
                    {/* Drop Zone Hint */}
                    {(isDragging || elements.length === 0) && (
                      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                        <div className="text-center text-white">
                          <div className="text-4xl mb-4">📺</div>
                          <p className="text-xl">
                            {isDragging ? 'Suelta el elemento aquí' : 'Arrastra elementos para TV'}
                          </p>
                          <p className="text-sm opacity-75 mt-2">
                            {isDragging ? 'Posiciona tu elemento en el canvas' : 'Diseña tu interfaz de televisión'}
                          </p>
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
          <div className="col-span-3">
            <Card className="h-full">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Eye className="w-5 h-5" />
                  Vista Previa
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="bg-gray-100 rounded-lg p-3">
                    <div className="text-center mb-2 text-xs text-gray-600">TV</div>
                    <div className="w-full bg-black rounded border relative overflow-hidden aspect-video">
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
                            color: element.styles?.color || '#fff'
                          }}
                        >
                          {element.type === 'text' && (
                            <div className="text-xs truncate text-white">
                              {element.content}
                            </div>
                          )}
                          {element.type === 'heading' && (
                            <div className="text-xs font-bold truncate text-white">
                              {element.content}
                            </div>
                          )}
                          {element.type === 'image' && (
                            <div className="bg-gray-700 w-full h-full rounded"></div>
                          )}
                          {element.type === 'button' && (
                            <div className="bg-blue-500 w-full h-full rounded text-center text-white text-xs flex items-center justify-center">
                              BTN
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  <div className="text-xs text-gray-500 space-y-1">
                    <p>• Elementos: {elements.length}</p>
                    <p>• Modo: TV</p>
                    <p>• Seleccionado: {selectedElement ? '1' : '0'}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </div>

      {/* Image Library Modal */}
      {showImageLibrary && (
        <ImageLibrary 
          onClose={() => setShowImageLibrary(false)}
          onSelectImage={(url) => {
            setShowImageLibrary(false);
          }}
        />
      )}
    </div>
  );
};
