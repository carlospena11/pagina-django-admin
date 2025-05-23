
import React, { useState } from 'react';
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { 
  Save, 
  Eye, 
  Bold,
  Italic,
  Underline,
  List,
  Link,
  Image,
  Quote,
  Code,
  Undo,
  Redo
} from 'lucide-react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface ContentItem {
  id: string;
  title: string;
  slug: string;
  content: string;
  status: 'published' | 'draft' | 'review';
  type: 'page' | 'post' | 'article';
  author: string;
  lastModified: string;
  featuredImage?: string;
}

const mockContent: ContentItem = {
  id: '1',
  title: 'Página de Inicio',
  slug: 'home',
  content: `# Bienvenido a nuestro sitio web

Esta es la página principal de nuestro sitio web. Aquí puedes encontrar información sobre nuestros servicios y productos.

## Nuestros Servicios

Ofrecemos una amplia gama de servicios para satisfacer las necesidades de nuestros clientes:

- Desarrollo web
- Diseño gráfico
- Marketing digital
- Consultoría tecnológica

## ¿Por qué elegirnos?

Somos un equipo de profesionales comprometidos con la excelencia y la innovación. Nuestro objetivo es ayudar a nuestros clientes a alcanzar sus metas.

### Contacto

Si tienes alguna pregunta o deseas más información, no dudes en contactarnos.`,
  status: 'draft',
  type: 'page',
  author: 'Admin',
  lastModified: '2024-01-15T10:30:00Z',
  featuredImage: 'https://images.unsplash.com/photo-1649972904349-6e44c42644a7'
};

export const ContentEditor: React.FC = () => {
  const [content, setContent] = useState<ContentItem>(mockContent);
  const [previewMode, setPreviewMode] = useState(false);

  const handleSave = () => {
    console.log('Saving content:', content);
    // Aquí se implementaría la lógica para guardar el contenido
  };

  const handleStatusChange = (newStatus: string) => {
    setContent(prev => ({
      ...prev,
      status: newStatus as 'published' | 'draft' | 'review'
    }));
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'published':
        return 'bg-green-100 text-green-800';
      case 'draft':
        return 'bg-yellow-100 text-yellow-800';
      case 'review':
        return 'bg-blue-100 text-blue-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const renderPreview = () => {
    const lines = content.content.split('\n');
    return (
      <div className="prose max-w-none">
        {lines.map((line, index) => {
          if (line.startsWith('# ')) {
            return <h1 key={index} className="text-3xl font-bold mb-4">{line.substring(2)}</h1>;
          }
          if (line.startsWith('## ')) {
            return <h2 key={index} className="text-2xl font-semibold mb-3 mt-6">{line.substring(3)}</h2>;
          }
          if (line.startsWith('### ')) {
            return <h3 key={index} className="text-xl font-medium mb-2 mt-4">{line.substring(4)}</h3>;
          }
          if (line.startsWith('- ')) {
            return <li key={index} className="ml-4">{line.substring(2)}</li>;
          }
          if (line.trim() === '') {
            return <br key={index} />;
          }
          return <p key={index} className="mb-4">{line}</p>;
        })}
      </div>
    );
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-3xl font-bold text-gray-900">Editor de Contenido</h2>
          <p className="text-gray-600">Crea y edita el contenido de tu sitio web</p>
        </div>
        <div className="flex gap-2">
          <Button 
            variant={previewMode ? 'default' : 'outline'} 
            onClick={() => setPreviewMode(!previewMode)}
          >
            <Eye className="w-4 h-4 mr-2" />
            {previewMode ? 'Editar' : 'Vista Previa'}
          </Button>
          <Button onClick={handleSave}>
            <Save className="w-4 h-4 mr-2" />
            Guardar
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Editor Principal */}
        <div className="lg:col-span-2">
          <Card className="p-6">
            {!previewMode ? (
              <div className="space-y-4">
                {/* Toolbar */}
                <div className="flex flex-wrap gap-2 p-2 border-b">
                  <Button size="sm" variant="outline">
                    <Bold className="w-4 h-4" />
                  </Button>
                  <Button size="sm" variant="outline">
                    <Italic className="w-4 h-4" />
                  </Button>
                  <Button size="sm" variant="outline">
                    <Underline className="w-4 h-4" />
                  </Button>
                  <div className="w-px h-6 bg-gray-300 mx-1" />
                  <Button size="sm" variant="outline">
                    <List className="w-4 h-4" />
                  </Button>
                  <Button size="sm" variant="outline">
                    <Quote className="w-4 h-4" />
                  </Button>
                  <Button size="sm" variant="outline">
                    <Code className="w-4 h-4" />
                  </Button>
                  <div className="w-px h-6 bg-gray-300 mx-1" />
                  <Button size="sm" variant="outline">
                    <Link className="w-4 h-4" />
                  </Button>
                  <Button size="sm" variant="outline">
                    <Image className="w-4 h-4" />
                  </Button>
                  <div className="w-px h-6 bg-gray-300 mx-1" />
                  <Button size="sm" variant="outline">
                    <Undo className="w-4 h-4" />
                  </Button>
                  <Button size="sm" variant="outline">
                    <Redo className="w-4 h-4" />
                  </Button>
                </div>

                {/* Title */}
                <div>
                  <label className="block text-sm font-medium mb-2">Título</label>
                  <Input
                    value={content.title}
                    onChange={(e) => setContent(prev => ({ ...prev, title: e.target.value }))}
                    placeholder="Título del contenido"
                    className="text-lg font-semibold"
                  />
                </div>

                {/* Slug */}
                <div>
                  <label className="block text-sm font-medium mb-2">URL (Slug)</label>
                  <Input
                    value={content.slug}
                    onChange={(e) => setContent(prev => ({ ...prev, slug: e.target.value }))}
                    placeholder="url-del-contenido"
                  />
                </div>

                {/* Content */}
                <div>
                  <label className="block text-sm font-medium mb-2">Contenido</label>
                  <Textarea
                    value={content.content}
                    onChange={(e) => setContent(prev => ({ ...prev, content: e.target.value }))}
                    placeholder="Escribe tu contenido aquí..."
                    className="min-h-96 font-mono"
                  />
                </div>
              </div>
            ) : (
              <div className="min-h-96">
                <h1 className="text-2xl font-bold mb-4 text-center">Vista Previa</h1>
                {renderPreview()}
              </div>
            )}
          </Card>
        </div>

        {/* Panel Lateral */}
        <div className="space-y-6">
          {/* Estado y Configuración */}
          <Card className="p-4">
            <h3 className="font-semibold mb-4">Configuración</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2">Estado</label>
                <Select value={content.status} onValueChange={handleStatusChange}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="draft">Borrador</SelectItem>
                    <SelectItem value="review">En Revisión</SelectItem>
                    <SelectItem value="published">Publicado</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Tipo</label>
                <Select value={content.type} onValueChange={(value) => setContent(prev => ({ ...prev, type: value as any }))}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="page">Página</SelectItem>
                    <SelectItem value="post">Entrada</SelectItem>
                    <SelectItem value="article">Artículo</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-sm">Estado actual:</span>
                <Badge className={getStatusColor(content.status)}>
                  {content.status === 'published' ? 'Publicado' : 
                   content.status === 'draft' ? 'Borrador' : 'En Revisión'}
                </Badge>
              </div>
            </div>
          </Card>

          {/* Imagen Destacada */}
          <Card className="p-4">
            <h3 className="font-semibold mb-4">Imagen Destacada</h3>
            {content.featuredImage ? (
              <div className="space-y-2">
                <img
                  src={content.featuredImage}
                  alt="Imagen destacada"
                  className="w-full h-32 object-cover rounded"
                />
                <Button variant="outline" size="sm" className="w-full">
                  Cambiar Imagen
                </Button>
              </div>
            ) : (
              <Button variant="outline" className="w-full">
                <Image className="w-4 h-4 mr-2" />
                Añadir Imagen
              </Button>
            )}
          </Card>

          {/* Información */}
          <Card className="p-4">
            <h3 className="font-semibold mb-4">Información</h3>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-600">Autor:</span>
                <span>{content.author}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Última modificación:</span>
                <span>{new Date(content.lastModified).toLocaleDateString()}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Palabras:</span>
                <span>{content.content.split(' ').length}</span>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};
