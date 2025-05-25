
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
    console.log('Drag start:', elementType);
    e.dataTransfer.setData('text/plain', elementType);
    e.dataTransfer.effectAllowed = 'copy';
    onDragStart(elementType);
  };

  const handleDragEnd = (e: React.DragEvent) => {
    console.log('Drag end');
  };

  const elements = [
    {
      type: 'text',
      icon: Type,
      label: 'Texto',
      description: 'Añadir texto editable'
    },
    {
      type: 'heading',
      icon: AlignLeft,
      label: 'Título',
      description: 'Título principal'
    },
    {
      type: 'image',
      icon: Image,
      label: 'Imagen',
      description: 'Imagen desde librería'
    },
    {
      type: 'button',
      icon: Square,
      label: 'Botón',
      description: 'Botón interactivo'
    },
    {
      type: 'video',
      icon: Video,
      label: 'Video',
      description: 'Reproductor de video'
    },
    {
      type: 'link',
      icon: Link,
      label: 'Enlace',
      description: 'Enlace a otra página'
    },
    {
      type: 'list',
      icon: List,
      label: 'Lista',
      description: 'Lista de elementos'
    },
    {
      type: 'container',
      icon: Layers,
      label: 'Contenedor',
      description: 'Grupo de elementos'
    }
  ];

  return (
    <div className="space-y-4">
      <Card>
        <CardHeader>
          <CardTitle className="text-sm flex items-center gap-2">
            <Palette className="w-4 h-4" />
            Elementos
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-2">
          {elements.map((element) => {
            const Icon = element.icon;
            
            return (
              <div
                key={element.type}
                draggable
                onDragStart={(e) => handleDragStart(e, element.type)}
                onDragEnd={handleDragEnd}
                className="flex items-center gap-3 p-3 border rounded-lg cursor-grab hover:bg-gray-50 hover:border-blue-300 transition-all group active:cursor-grabbing select-none"
                title={element.description}
              >
                <Icon className="w-5 h-5 text-gray-600 group-hover:text-blue-600" />
                <div className="flex-1">
                  <p className="text-sm font-medium">{element.label}</p>
                  <p className="text-xs text-gray-500">{element.description}</p>
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
          <CardTitle className="text-sm">Guía</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-xs text-gray-600 space-y-2">
            <p>🖱️ Arrastra elementos al canvas</p>
            <p>✏️ Haz doble clic para editar</p>
            <p>🎨 Usa los controles para mover</p>
            <p>💾 No olvides guardar</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
