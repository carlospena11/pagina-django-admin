
import React, { useState, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Trash2, Move, Edit3 } from 'lucide-react';

interface EditableElementProps {
  element: {
    id: string;
    type: string;
    x: number;
    y: number;
    width: number;
    height: number;
    content: string;
    styles?: any;
  };
  isSelected: boolean;
  onSelect: (id: string) => void;
  onUpdate: (id: string, updates: any) => void;
  onDelete: (id: string) => void;
}

export const EditableElement: React.FC<EditableElementProps> = ({
  element,
  isSelected,
  onSelect,
  onUpdate,
  onDelete
}) => {
  const [isDragging, setIsDragging] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editValue, setEditValue] = useState(element.content);
  const dragRef = useRef<HTMLDivElement>(null);
  const startPos = useRef({ x: 0, y: 0 });

  const handleMouseDown = (e: React.MouseEvent) => {
    // Solo permitir arrastre si se hace clic en el elemento o en sus hijos directos
    const target = e.target as HTMLElement;
    if (!dragRef.current?.contains(target)) return;
    
    e.preventDefault();
    e.stopPropagation();
    
    console.log('🎯 Iniciando arrastre del elemento:', element.id);
    setIsDragging(true);
    onSelect(element.id);
    
    const rect = dragRef.current?.parentElement?.getBoundingClientRect();
    if (rect) {
      startPos.current = {
        x: e.clientX - rect.left - element.x,
        y: e.clientY - rect.top - element.y
      };
    }

    const handleMouseMove = (e: MouseEvent) => {
      if (!isDragging) return;
      
      const rect = dragRef.current?.parentElement?.getBoundingClientRect();
      if (rect) {
        const newX = e.clientX - rect.left - startPos.current.x;
        const newY = e.clientY - rect.top - startPos.current.y;
        
        // Limitar el movimiento dentro del canvas
        const boundedX = Math.max(0, Math.min(newX, rect.width - element.width));
        const boundedY = Math.max(0, Math.min(newY, rect.height - element.height));
        
        onUpdate(element.id, {
          x: boundedX,
          y: boundedY
        });
      }
    };

    const handleMouseUp = () => {
      console.log('🏁 Finalizando arrastre del elemento:', element.id);
      setIsDragging(false);
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);
  };

  const handleDoubleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (element.type === 'text' || element.type === 'heading') {
      console.log('✏️ Editando elemento:', element.id);
      setIsEditing(true);
      setEditValue(element.content);
    }
  };

  const handleEditSave = () => {
    console.log('💾 Guardando edición:', element.id, editValue);
    onUpdate(element.id, { content: editValue });
    setIsEditing(false);
  };

  const handleEditCancel = () => {
    console.log('❌ Cancelando edición:', element.id);
    setEditValue(element.content);
    setIsEditing(false);
  };

  const handleDelete = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    console.log('🗑️ Eliminando elemento:', element.id);
    onDelete(element.id);
  };

  const handleElementClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    console.log('📍 Seleccionando elemento:', element.id);
    onSelect(element.id);
  };

  const renderContent = () => {
    if (isEditing && (element.type === 'text' || element.type === 'heading')) {
      return (
        <Input
          value={editValue}
          onChange={(e) => setEditValue(e.target.value)}
          onBlur={handleEditSave}
          onKeyDown={(e) => {
            e.stopPropagation();
            if (e.key === 'Enter') handleEditSave();
            if (e.key === 'Escape') handleEditCancel();
          }}
          className="w-full h-full border-none shadow-none p-1 text-white bg-transparent focus:ring-2 focus:ring-blue-400"
          autoFocus
        />
      );
    }

    switch (element.type) {
      case 'text':
        return (
          <p 
            className="w-full h-full p-2 text-sm cursor-text text-white overflow-hidden"
            style={element.styles}
          >
            {element.content}
          </p>
        );
      
      case 'heading':
        return (
          <h2 
            className="w-full h-full p-2 text-lg font-bold cursor-text text-white overflow-hidden"
            style={element.styles}
          >
            {element.content}
          </h2>
        );
      
      case 'image':
        return (
          <img
            src={element.content}
            alt="Elemento imagen"
            className="w-full h-full object-cover rounded"
            style={element.styles}
            onError={(e) => {
              const target = e.target as HTMLImageElement;
              target.src = 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=400';
            }}
          />
        );
      
      case 'button':
        return (
          <button
            className="w-full h-full bg-blue-600 text-white rounded px-4 py-2 hover:bg-blue-700 transition-colors text-sm font-medium"
            style={element.styles}
          >
            {element.content}
          </button>
        );
        
      case 'video':
        return (
          <div className="w-full h-full bg-gray-800 rounded flex items-center justify-center text-white">
            <div className="text-center">
              <div className="text-2xl mb-2">📹</div>
              <div className="text-xs">{element.content}</div>
            </div>
          </div>
        );
        
      case 'link':
        return (
          <a 
            href="#" 
            className="w-full h-full flex items-center justify-center text-blue-400 underline text-sm"
            style={element.styles}
          >
            {element.content}
          </a>
        );
        
      case 'list':
        return (
          <ul className="w-full h-full p-2 text-white text-sm">
            <li>• {element.content}</li>
          </ul>
        );
        
      case 'container':
        return (
          <div 
            className="w-full h-full border-2 border-dashed border-gray-500 rounded flex items-center justify-center text-gray-400 text-sm"
            style={element.styles}
          >
            {element.content}
          </div>
        );
      
      default:
        return (
          <div className="w-full h-full flex items-center justify-center bg-gray-100 text-gray-500 rounded">
            {element.type}
          </div>
        );
    }
  };

  return (
    <div
      ref={dragRef}
      className={`absolute cursor-move group transition-all duration-200 ${
        isSelected ? 'ring-2 ring-blue-500 ring-opacity-70 shadow-lg' : ''
      } ${isDragging ? 'scale-105 shadow-xl z-50' : ''}`}
      style={{
        left: element.x,
        top: element.y,
        width: element.width,
        height: element.height,
        zIndex: isSelected ? 10 : isDragging ? 50 : 1
      }}
      onMouseDown={handleMouseDown}
      onDoubleClick={handleDoubleClick}
      onClick={handleElementClick}
    >
      {/* Content */}
      <div className={`w-full h-full border transition-all duration-200 ${
        isSelected 
          ? 'border-blue-400 bg-opacity-90' 
          : 'border-transparent group-hover:border-blue-300'
      } bg-gray-800 rounded overflow-hidden`}>
        {renderContent()}
      </div>
      
      {/* Controls */}
      {isSelected && !isEditing && (
        <div className="absolute -top-10 left-0 flex gap-1 bg-white border rounded shadow-lg z-20">
          <Button
            variant="outline"
            size="sm"
            className="h-8 w-8 p-0 hover:bg-blue-50"
            title="Mover (arrastra el elemento)"
          >
            <Move className="w-4 h-4" />
          </Button>
          {(element.type === 'text' || element.type === 'heading') && (
            <Button
              variant="outline"
              size="sm"
              className="h-8 w-8 p-0 hover:bg-green-50"
              title="Editar texto"
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                setIsEditing(true);
              }}
            >
              <Edit3 className="w-4 h-4" />
            </Button>
          )}
          <Button
            variant="outline"
            size="sm"
            className="h-8 w-8 p-0 text-red-600 hover:text-red-700 hover:bg-red-50"
            title="Eliminar elemento"
            onClick={handleDelete}
          >
            <Trash2 className="w-4 h-4" />
          </Button>
        </div>
      )}
      
      {/* Resize Handles */}
      {isSelected && !isEditing && (
        <>
          <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-blue-500 cursor-se-resize rounded-full border-2 border-white shadow" />
          <div className="absolute -bottom-1 left-1/2 w-3 h-3 bg-blue-500 cursor-s-resize rounded-full border-2 border-white shadow transform -translate-x-1/2" />
          <div className="absolute -right-1 top-1/2 w-3 h-3 bg-blue-500 cursor-e-resize rounded-full border-2 border-white shadow transform -translate-y-1/2" />
        </>
      )}
      
      {/* Dragging indicator */}
      {isDragging && (
        <div className="absolute inset-0 bg-blue-500 bg-opacity-20 border-2 border-blue-500 border-dashed rounded pointer-events-none" />
      )}
    </div>
  );
};
