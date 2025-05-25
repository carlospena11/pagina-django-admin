
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
  Smartphone
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
  const [viewMode, setViewMode] = useState<'desktop' | 'tablet' | 'mobile'>('desktop');
  const [isDragging, setIsDragging] = useState(false);
  const [selectedElement, setSelectedElement] = useState<string | null>(null);
  const [showImageLibrary, setShowImageLibrary] = useState(false);
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
        width: elementType === 'text' ? 200 : 150,
        height: elementType === 'text' ? 40 : 100,
        content: elementType === 'text' ? 'Nuevo texto' : '/placeholder.svg',
        styles: {
          fontSize: elementType === 'text' ? '16px' : undefined,
          fontWeight: elementType === 'text' ? 'normal' : undefined,
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
      case 'tablet':
        return 'max-w-2xl';
      case 'mobile':
        return 'max-w-sm';
      default:
        return 'max-w-6xl';
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
          
          <Button variant="outline" className="flex items-center gap-2">
            <Undo className="w-4 h-4" />
          </Button>
          <Button variant="outline" className="flex items-center gap-2">
            <Redo className="w-4 h-4" />
          </Button>
          <Button variant="outline" className="flex items-center gap-2">
            <Eye className="w-4 h-4" />
            Vista Previa
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
        <div className="col-span-8">
          <Card className="min-h-[600px]">
            <CardContent className="p-0">
              <div className={`mx-auto transition-all duration-300 ${getViewportClass()}`}>
                <div
                  ref={canvasRef}
                  className="relative min-h-[600px] bg-white border-2 border-dashed border-gray-200 overflow-hidden"
                  onDragOver={(e) => e.preventDefault()}
                  onDrop={handleDrop}
                  style={{ 
                    backgroundImage: isDragging ? 'radial-gradient(circle, #e5e7eb 1px, transparent 1px)' : 'none',
                    backgroundSize: isDragging ? '20px 20px' : 'auto'
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
                    />
                  ))}
                  
                  {/* Drop Zone Hint */}
                  {isDragging && elements.length === 0 && (
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="text-center text-gray-400">
                        <div className="text-2xl mb-2">📋</div>
                        <p>Arrastra elementos aquí para comenzar</p>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Properties Panel */}
        <div className="col-span-2">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Settings className="w-5 h-5" />
                Propiedades
              </CardTitle>
            </CardHeader>
            <CardContent>
              {selectedElement ? (
                <div className="space-y-4">
                  <p className="text-sm text-gray-600">
                    Elemento seleccionado: {elements.find(el => el.id === selectedElement)?.type}
                  </p>
                  {/* Properties form would go here */}
                </div>
              ) : (
                <p className="text-sm text-gray-500">
                  Selecciona un elemento para editar sus propiedades
                </p>
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
