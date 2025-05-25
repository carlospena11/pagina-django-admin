
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { 
  Type, 
  Image, 
  Square, 
  Circle,
  Video,
  Link,
  List,
  AlignLeft,
  Layers,
  Palette
} from 'lucide-react';

interface DragDropToolbarProps {
  onDragStart: (elementType: string) => void;
  onShowImageLibrary: () => void;
}

export const DragDropToolbar: React.FC<DragDropToolbarProps> = ({ 
  onDragStart, 
  onShowImageLibrary 
}) => {
  const handleDragStart = (e: React.DragEvent, elementType: string) => {
    console.log('🚀 Iniciando arrastre:', elementType);
    
    // Configurar múltiples formatos de datos para máxima compatibilidad
    e.dataTransfer.setData('application/json', JSON.stringify({ type: elementType }));
    e.dataTransfer.setData('text/plain', elementType);
    e.dataTransfer.setData('text/html', elementType);
    
    // Configurar efectos de arrastre
    e.dataTransfer.effectAllowed = 'copy';
    e.dataTransfer.dropEffect = 'copy';
    
    // Llamar al callback
    onDragStart(elementType);
  };

  const handleDragEnd = (e: React.DragEvent) => {
    console.log('🏁 Finalizando arrastre');
    e.dataTransfer.clearData();
  };

  // Prevenir comportamiento por defecto en dragover
  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const elements = [
    {
      type: 'text',
      icon: Type,
      label: 'Texto',
      description: 'Añadir texto editable',
      color: 'text-blue-600'
    },
    {
      type: 'heading',
      icon: AlignLeft,
      label: 'Título',
      description: 'Título principal',
      color: 'text-purple-600'
    },
    {
      type: 'image',
      icon: Image,
      label: 'Imagen',
      description: 'Imagen desde librería',
      color: 'text-green-600'
    },
    {
      type: 'button',
      icon: Square,
      label: 'Botón',
      description: 'Botón interactivo',
      color: 'text-orange-600'
    },
    {
      type: 'video',
      icon: Video,
      label: 'Video',
      description: 'Reproductor de video',
      color: 'text-red-600'
    },
    {
      type: 'link',
      icon: Link,
      label: 'Enlace',
      description: 'Enlace a otra página',
      color: 'text-cyan-600'
    },
    {
      type: 'list',
      icon: List,
      label: 'Lista',
      description: 'Lista de elementos',
      color: 'text-pink-600'
    },
    {
      type: 'container',
      icon: Layers,
      label: 'Contenedor',
      description: 'Grupo de elementos',
      color: 'text-indigo-600'
    }
  ];

  return (
    <div className="space-y-4">
      <Card>
        <CardHeader>
          <CardTitle className="text-sm flex items-center gap-2">
            <Palette className="w-4 h-4" />
            Elementos Disponibles
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-2">
          {elements.map((element) => {
            const Icon = element.icon;
            
            return (
              <div
                key={element.type}
                draggable={true}
                onDragStart={(e) => handleDragStart(e, element.type)}
                onDragEnd={handleDragEnd}
                onDragOver={handleDragOver}
                className="flex items-center gap-3 p-3 border-2 border-dashed border-gray-200 rounded-lg cursor-grab hover:bg-blue-50 hover:border-blue-300 transition-all group active:cursor-grabbing select-none bg-white shadow-sm"
                title={`Arrastra para añadir: ${element.description}`}
                style={{ 
                  touchAction: 'none',
                  userSelect: 'none'
                }}
              >
                <Icon className={`w-5 h-5 ${element.color} group-hover:scale-110 transition-transform pointer-events-none`} />
                <div className="flex-1 pointer-events-none">
                  <p className="text-sm font-medium text-gray-900">{element.label}</p>
                  <p className="text-xs text-gray-500">{element.description}</p>
                </div>
                <div className="text-xs text-gray-400 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
                  ↗️ Arrastra
                </div>
              </div>
            );
          })}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-sm">Acciones Rápidas</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2">
          <Button 
            variant="outline" 
            className="w-full justify-start"
            onClick={onShowImageLibrary}
          >
            <Image className="w-4 h-4 mr-2" />
            Librería de Imágenes
          </Button>
          <Button variant="outline" className="w-full justify-start">
            <Layers className="w-4 h-4 mr-2" />
            Plantillas
          </Button>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-sm">Guía de Uso</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-xs text-gray-600 space-y-2">
            <p>🖱️ <strong>Arrastra</strong> elementos al canvas negro</p>
            <p>✏️ <strong>Doble clic</strong> para editar texto</p>
            <p>🎨 <strong>Clic simple</strong> para seleccionar y mover</p>
            <p>🗑️ <strong>Botón eliminar</strong> cuando esté seleccionado</p>
            <p>💾 <strong>Guardar</strong> para conservar cambios</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
