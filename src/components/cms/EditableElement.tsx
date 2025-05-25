
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
}

export const EditableElement: React.FC<EditableElementProps> = ({
  element,
  isSelected,
  onSelect,
  onUpdate
}) => {
  const [isDragging, setIsDragging] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editValue, setEditValue] = useState(element.content);
  const dragRef = useRef<HTMLDivElement>(null);
  const startPos = useRef({ x: 0, y: 0 });

  const handleMouseDown = (e: React.MouseEvent) => {
    if (e.target !== e.currentTarget) return;
    
    setIsDragging(true);
    onSelect(element.id);
    
    const rect = dragRef.current?.parentElement?.getBoundingClientRect();
    if (rect) {
      startPos.current = {
        x: e.clientX - rect.left - element.x,
        y: e.clientY - rect.top - element.y
      };
    }
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return;
    
    const rect = dragRef.current?.parentElement?.getBoundingClientRect();
    if (rect) {
      const newX = e.clientX - rect.left - startPos.current.x;
      const newY = e.clientY - rect.top - startPos.current.y;
      
      onUpdate(element.id, {
        x: Math.max(0, Math.min(newX, rect.width - element.width)),
        y: Math.max(0, Math.min(newY, rect.height - element.height))
      });
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleDoubleClick = () => {
    if (element.type === 'text' || element.type === 'heading') {
      setIsEditing(true);
      setEditValue(element.content);
    }
  };

  const handleEditSave = () => {
    onUpdate(element.id, { content: editValue });
    setIsEditing(false);
  };

  const handleEditCancel = () => {
    setEditValue(element.content);
    setIsEditing(false);
  };

  const handleDelete = () => {
    // This would need to be implemented in parent component
    console.log('Delete element:', element.id);
  };

  const renderContent = () => {
    if (isEditing && (element.type === 'text' || element.type === 'heading')) {
      return (
        <Input
          value={editValue}
          onChange={(e) => setEditValue(e.target.value)}
          onBlur={handleEditSave}
          onKeyDown={(e) => {
            if (e.key === 'Enter') handleEditSave();
            if (e.key === 'Escape') handleEditCancel();
          }}
          className="w-full h-full border-none shadow-none p-1"
          autoFocus
        />
      );
    }

    switch (element.type) {
      case 'text':
        return (
          <p 
            className="w-full h-full p-2 text-sm cursor-text"
            style={element.styles}
          >
            {element.content}
          </p>
        );
      
      case 'heading':
        return (
          <h2 
            className="w-full h-full p-2 text-lg font-bold cursor-text"
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
            className="w-full h-full object-cover"
            style={element.styles}
          />
        );
      
      case 'button':
        return (
          <button
            className="w-full h-full bg-blue-600 text-white rounded px-4 py-2 hover:bg-blue-700 transition-colors"
            style={element.styles}
          >
            {element.content}
          </button>
        );
      
      default:
        return (
          <div className="w-full h-full flex items-center justify-center bg-gray-100 text-gray-500">
            {element.type}
          </div>
        );
    }
  };

  return (
    <div
      ref={dragRef}
      className={`absolute cursor-move group ${isSelected ? 'ring-2 ring-blue-500' : ''}`}
      style={{
        left: element.x,
        top: element.y,
        width: element.width,
        height: element.height,
        zIndex: isSelected ? 10 : 1
      }}
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onDoubleClick={handleDoubleClick}
      onClick={(e) => {
        e.stopPropagation();
        onSelect(element.id);
      }}
    >
      {/* Content */}
      <div className="w-full h-full border border-transparent group-hover:border-blue-300">
        {renderContent()}
      </div>
      
      {/* Controls */}
      {isSelected && (
        <div className="absolute -top-8 left-0 flex gap-1 bg-white border rounded shadow-lg">
          <Button
            variant="outline"
            size="sm"
            className="h-6 w-6 p-0"
            title="Mover"
          >
            <Move className="w-3 h-3" />
          </Button>
          <Button
            variant="outline"
            size="sm"
            className="h-6 w-6 p-0"
            title="Editar"
            onClick={() => setIsEditing(true)}
          >
            <Edit3 className="w-3 h-3" />
          </Button>
          <Button
            variant="outline"
            size="sm"
            className="h-6 w-6 p-0 text-red-600 hover:text-red-700"
            title="Eliminar"
            onClick={handleDelete}
          >
            <Trash2 className="w-3 h-3" />
          </Button>
        </div>
      )}
      
      {/* Resize Handles */}
      {isSelected && (
        <>
          <div className="absolute -bottom-1 -right-1 w-2 h-2 bg-blue-500 cursor-se-resize" />
          <div className="absolute -bottom-1 left-1/2 w-2 h-2 bg-blue-500 cursor-s-resize transform -translate-x-1/2" />
          <div className="absolute -right-1 top-1/2 w-2 h-2 bg-blue-500 cursor-e-resize transform -translate-y-1/2" />
        </>
      )}
    </div>
  );
};
