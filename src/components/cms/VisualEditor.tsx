
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
  Tv,
  Code
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
  const [dragElementType, setDragElementType] = useState<string>('');
  const [selectedElement, setSelectedElement] = useState<string | null>(null);
  const [showImageLibrary, setShowImageLibrary] = useState(false);
  const [showPreview, setShowPreview] = useState(true);
  const [elements, setElements] = useState<any[]>([]);
  const [dragCounter, setDragCounter] = useState(0);
  const canvasRef = useRef<HTMLDivElement>(null);

  const selectedPage = pages.find(p => p.id === selectedPageId);

  // Load existing page content when page is selected
  React.useEffect(() => {
    if (selectedPage && selectedPage.content) {
      try {
        const pageContent = JSON.parse(selectedPage.content);
        if (pageContent.elements && Array.isArray(pageContent.elements)) {
          console.log('📄 Cargando elementos de la página:', pageContent.elements);
          setElements(pageContent.elements);
        } else {
          console.log('📄 No se encontraron elementos, empezando desde cero');
          setElements([]);
        }
      } catch (e) {
        console.log('📄 El contenido no es JSON, empezando con elementos vacíos');
        setElements([]);
      }
    } else {
      setElements([]);
    }
  }, [selectedPage]);

  const handleDragStart = useCallback((elementType: string) => {
    console.log('🎯 Inicio de arrastre detectado:', elementType);
    setIsDragging(true);
    setDragElementType(elementType);
    setDragCounter(0);
  }, []);

  const handleDragEnd = useCallback(() => {
    console.log('🏁 Arrastre finalizado');
    setIsDragging(false);
    setDragElementType('');
    setDragCounter(0);
  }, []);

  const handleDragEnter = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragCounter(prev => prev + 1);
    console.log('🎯 Entrando al canvas, contador:', dragCounter + 1);
  }, [dragCounter]);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragCounter(prev => {
      const newCount = prev - 1;
      console.log('🚪 Saliendo del canvas, contador:', newCount);
      return newCount;
    });
  }, []);

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    e.dataTransfer.dropEffect = 'copy';
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragCounter(0);
    
    console.log('💧 Evento de soltar activado en el canvas');
    
    let elementType = '';
    
    // Intentar obtener datos de diferentes formatos
    try {
      const jsonData = e.dataTransfer.getData('application/json');
      if (jsonData) {
        const parsed = JSON.parse(jsonData);
        elementType = parsed.type;
        console.log('📦 Datos JSON encontrados:', elementType);
      }
    } catch (err) {
      console.log('❌ Error al parsear JSON:', err);
    }
    
    if (!elementType) {
      elementType = e.dataTransfer.getData('text/plain');
      console.log('📝 Datos de texto encontrados:', elementType);
    }
    
    if (!elementType) {
      elementType = e.dataTransfer.getData('text/html');
      console.log('🔗 Datos HTML encontrados:', elementType);
    }
    
    if (!elementType && dragElementType) {
      elementType = dragElementType;
      console.log('🎯 Usando tipo de arrastre guardado:', elementType);
    }
    
    const rect = canvasRef.current?.getBoundingClientRect();
    
    console.log('💧 Detalles del soltar:', { elementType, rect, dragElementType });
    
    if (rect && elementType) {
      const x = Math.max(20, Math.min(e.clientX - rect.left - 100, rect.width - 220));
      const y = Math.max(20, Math.min(e.clientY - rect.top - 25, rect.height - 100));
      
      const newElement = {
        id: `element-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
        type: elementType,
        x: x,
        y: y,
        width: elementType === 'text' ? 300 : 
               elementType === 'heading' ? 400 :
               elementType === 'button' ? 150 : 250,
        height: elementType === 'text' ? 40 : 
                elementType === 'heading' ? 60 :
                elementType === 'button' ? 40 : 
                elementType === 'image' ? 200 : 100,
        content: elementType === 'text' ? 'Haz doble clic para editar' : 
                elementType === 'heading' ? 'Título Principal' :
                elementType === 'button' ? 'Mi Botón' : 
                elementType === 'image' ? 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=400' : 
                elementType === 'video' ? 'Video aquí' :
                elementType === 'link' ? 'Enlace' :
                elementType === 'list' ? 'Elemento de lista' :
                elementType === 'container' ? 'Contenedor' : 'Nuevo elemento',
        styles: {
          fontSize: elementType === 'text' ? '16px' : 
                  elementType === 'heading' ? '32px' : '14px',
          fontWeight: elementType === 'heading' ? 'bold' : 'normal',
          color: '#ffffff',
          backgroundColor: elementType === 'button' ? '#3b82f6' : 'transparent'
        }
      };
      
      console.log('✨ Añadiendo nuevo elemento:', newElement);
      setElements(prev => {
        const newElements = [...prev, newElement];
        console.log('📝 Array de elementos actualizado:', newElements);
        return newElements;
      });
      setSelectedElement(newElement.id);
      
      toast({
        title: "¡Elemento añadido!",
        description: `Se ha añadido ${elementType} al canvas. Haz doble clic para editar.`,
      });
    } else {
      console.log('❌ Fallo al soltar - falta elementType o rect', { elementType, rect });
      toast({
        title: "Error al añadir elemento",
        description: "No se pudo determinar el tipo de elemento o la posición.",
        variant: "destructive"
      });
    }
    
    handleDragEnd();
  }, [dragElementType, toast, handleDragEnd]);

  const handleElementUpdate = useCallback((elementId: string, updates: any) => {
    console.log('🔄 Actualizando elemento:', elementId, updates);
    setElements(prev => {
      const updated = prev.map(el => 
        el.id === elementId ? { ...el, ...updates } : el
      );
      console.log('📝 Elementos después de actualizar:', updated);
      return updated;
    });
  }, []);

  const handleElementDelete = useCallback((elementId: string) => {
    console.log('🗑️ Eliminando elemento:', elementId);
    setElements(prev => {
      const filtered = prev.filter(el => el.id !== elementId);
      console.log('📝 Elementos después de eliminar:', filtered);
      return filtered;
    });
    setSelectedElement(null);
    toast({
      title: "Elemento eliminado",
      description: "El elemento se ha eliminado del canvas.",
    });
  }, [toast]);

  const handleCanvasClick = useCallback((e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      console.log('📍 Canvas clickeado - deseleccionando elementos');
      setSelectedElement(null);
    }
  }, []);

  const handleSave = () => {
    if (selectedPage) {
      const pageContent = {
        elements,
        layout: 'tv',
        version: '1.0'
      };
      console.log('💾 Guardando contenido de página:', pageContent);
      updatePage(selectedPage.id, { 
        content: JSON.stringify(pageContent),
        lastModified: new Date().toISOString().split('T')[0]
      });
      toast({
        title: "¡Página guardada!",
        description: `Se han guardado ${elements.length} elementos en la página.`,
      });
    }
  };

  const switchToCodeEditor = () => {
    if (onNavigate) {
      onNavigate('editor');
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
              <Badge className="ml-2" variant={selectedPage?.status === 'published' ? 'default' : 'secondary'}>
                {selectedPage?.status === 'published' ? 'Publicado' : 
                 selectedPage?.status === 'draft' ? 'Borrador' : 'En Revisión'}
              </Badge>
            </p>
          </div>
        </div>
        
        <div className="flex gap-2">
          <Button
            variant="default"
            className="flex items-center gap-2"
          >
            <Tv className="w-4 h-4" />
            Modo TV
          </Button>
          
          <Button 
            variant="outline"
            onClick={switchToCodeEditor}
            className="flex items-center gap-2"
          >
            <Code className="w-4 h-4" />
            Editor Código
          </Button>
          
          <Button 
            variant={showPreview ? 'default' : 'outline'} 
            className="flex items-center gap-2"
            onClick={() => setShowPreview(!showPreview)}
          >
            <Eye className="w-4 h-4" />
            {showPreview ? 'Ocultar' : 'Mostrar'} Vista Previa
          </Button>
          
          <Button variant="outline" className="flex items-center gap-2" disabled>
            <Undo className="w-4 h-4" />
          </Button>
          <Button variant="outline" className="flex items-center gap-2" disabled>
            <Redo className="w-4 h-4" />
          </Button>
          <Button onClick={handleSave} className="flex items-center gap-2">
            <Save className="w-4 h-4" />
            Guardar ({elements.length})
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
              <CardTitle className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Tv className="w-5 h-5" />
                  Canvas de Edición - TV
                  {isDragging && (
                    <Badge variant="secondary" className="ml-2 animate-pulse">
                      Arrastrando {dragElementType}...
                    </Badge>
                  )}
                  {dragCounter > 0 && (
                    <Badge variant="outline" className="ml-2 bg-blue-50">
                      Zona de soltar activa
                    </Badge>
                  )}
                </div>
                <div className="text-sm text-gray-500">
                  {elements.length} elemento{elements.length !== 1 ? 's' : ''}
                </div>
              </CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              <div className="flex justify-center p-4">
                <div className="transition-all duration-300 w-full max-w-6xl">
                  <div
                    ref={canvasRef}
                    className={`relative w-full aspect-video border-4 ${
                      isDragging || dragCounter > 0
                        ? 'border-blue-500 bg-blue-900/20 shadow-lg' 
                        : 'border-dashed border-gray-300'
                    } overflow-hidden bg-black transition-all duration-200 rounded-lg`}
                    onDragOver={handleDragOver}
                    onDrop={handleDrop}
                    onDragEnter={handleDragEnter}
                    onDragLeave={handleDragLeave}
                    onClick={handleCanvasClick}
                    style={{ 
                      backgroundImage: isDragging || dragCounter > 0
                        ? 'radial-gradient(circle, rgba(59, 130, 246, 0.2) 2px, transparent 2px)' 
                        : 'none',
                      backgroundSize: isDragging || dragCounter > 0 ? '30px 30px' : 'auto',
                      minHeight: '500px'
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
                    <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                      <div className="text-center text-white">
                        {isDragging || dragCounter > 0 ? (
                          <>
                            <div className="text-6xl mb-4 animate-bounce">📺</div>
                            <p className="text-2xl font-bold">
                              Suelta aquí tu {dragElementType || 'elemento'}
                            </p>
                            <p className="text-lg opacity-75 mt-2">
                              Posiciónalo donde quieras en el canvas
                            </p>
                          </>
                        ) : elements.length === 0 ? (
                          <>
                            <div className="text-4xl mb-4">📺</div>
                            <p className="text-xl">
                              Arrastra elementos desde la barra lateral
                            </p>
                            <p className="text-sm opacity-75 mt-2">
                              Diseña tu interfaz de televisión aquí
                            </p>
                          </>
                        ) : null}
                      </div>
                    </div>
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
                    <div className="text-center mb-2 text-xs text-gray-600">Pantalla TV</div>
                    <div className="w-full bg-black rounded border relative overflow-hidden aspect-video">
                      {elements.map((element) => (
                        <div
                          key={`preview-${element.id}`}
                          className="absolute text-white"
                          style={{
                            left: `${(element.x / 1000) * 100}%`,
                            top: `${(element.y / 600) * 100}%`,
                            width: `${(element.width / 1000) * 100}%`,
                            height: `${(element.height / 600) * 100}%`,
                            fontSize: '6px',
                            backgroundColor: element.type === 'button' ? '#3b82f6' : 'transparent'
                          }}
                        >
                          {element.type === 'text' && (
                            <div className="text-white text-xs truncate p-1">
                              {element.content}
                            </div>
                          )}
                          {element.type === 'heading' && (
                            <div className="text-white text-xs font-bold truncate p-1">
                              {element.content}
                            </div>
                          )}
                          {element.type === 'image' && (
                            <div className="bg-gray-700 w-full h-full rounded"></div>
                          )}
                          {element.type === 'button' && (
                            <div className="bg-blue-500 w-full h-full rounded text-center text-white text-xs flex items-center justify-center">
                              {element.content}
                            </div>
                          )}
                          {element.type === 'video' && (
                            <div className="bg-gray-800 w-full h-full rounded flex items-center justify-center">
                              <div className="text-xs">📹</div>
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  <div className="text-xs text-gray-500 space-y-1">
                    <p>• Elementos: {elements.length}</p>
                    <p>• Modo: TV Panorámico</p>
                    <p>• Seleccionado: {selectedElement ? '1' : '0'}</p>
                    <p>• Estado: {isDragging ? 'Arrastrando' : dragCounter > 0 ? 'Zona activa' : 'Listo'}</p>
                  </div>
                  
                  {selectedPage?.slug && (
                    <div className="pt-2 border-t">
                      <Button 
                        variant="outline" 
                        size="sm" 
                        className="w-full"
                        onClick={() => window.open(`/${selectedPage.slug}`, '_blank')}
                      >
                        <Eye className="w-3 h-3 mr-1" />
                        Ver en Producción
                      </Button>
                    </div>
                  )}
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
