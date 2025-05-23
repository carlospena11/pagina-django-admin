
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Separator } from '@/components/ui/separator';
import { 
  Save, 
  Eye, 
  FileText, 
  Calendar, 
  User,
  Globe,
  Edit3,
  Settings
} from 'lucide-react';

interface ContentEditorProps {
  onNavigate?: (view: string) => void;
}

export const ContentEditor: React.FC<ContentEditorProps> = ({ onNavigate }) => {
  const [title, setTitle] = useState('Página de Inicio');
  const [content, setContent] = useState(`<h1>Bienvenido a Nuestro Sitio Web</h1>

<p>Esta es una página de ejemplo creada con nuestro editor de contenido. Aquí puedes escribir y formatear el contenido de tu sitio web.</p>

<h2>Características Principales</h2>
<ul>
  <li>Editor de contenido intuitivo</li>
  <li>Vista previa en tiempo real</li>
  <li>Gestión de medios integrada</li>
  <li>SEO optimizado</li>
</ul>

<p>Puedes incluir imágenes, enlaces y cualquier otro contenido HTML que necesites para tu sitio web.</p>`);
  const [slug, setSlug] = useState('inicio');
  const [status, setStatus] = useState('Borrador');

  const handleSave = () => {
    console.log('Guardando contenido...', { title, content, slug, status });
    // Aquí iría la lógica para guardar el contenido
  };

  const handlePreview = () => {
    // Aquí iría la lógica para mostrar la vista previa
    if (onNavigate) {
      onNavigate('preview');
    }
  };

  const handlePublish = () => {
    setStatus('Publicada');
    handleSave();
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Editor de Contenido</h1>
          <p className="text-gray-500 mt-1">Crea y edita el contenido de tus páginas</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" onClick={handlePreview} className="flex items-center gap-2">
            <Eye className="w-4 h-4" />
            Vista Previa
          </Button>
          <Button variant="outline" onClick={handleSave} className="flex items-center gap-2">
            <Save className="w-4 h-4" />
            Guardar
          </Button>
          <Button onClick={handlePublish} className="flex items-center gap-2">
            <Globe className="w-4 h-4" />
            Publicar
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Editor Principal */}
        <div className="lg:col-span-2 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Edit3 className="w-5 h-5" />
                Contenido
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label className="text-sm font-medium text-gray-700 mb-2 block">
                  Título de la Página
                </label>
                <Input
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="Ingresa el título de la página"
                  className="text-lg font-semibold"
                />
              </div>
              
              <div>
                <label className="text-sm font-medium text-gray-700 mb-2 block">
                  Contenido HTML
                </label>
                <Textarea
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  placeholder="Escribe tu contenido aquí..."
                  className="min-h-[400px] font-mono text-sm"
                />
              </div>
            </CardContent>
          </Card>

          {/* Vista Previa */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Eye className="w-5 h-5" />
                Vista Previa
              </CardTitle>
              <CardDescription>
                Así se verá tu contenido en el sitio web
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div 
                className="prose max-w-none border rounded-lg p-6 bg-white min-h-[300px]"
                dangerouslySetInnerHTML={{ __html: content }}
              />
            </CardContent>
          </Card>
        </div>

        {/* Panel Lateral */}
        <div className="space-y-6">
          {/* Configuración de Página */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Settings className="w-5 h-5" />
                Configuración
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label className="text-sm font-medium text-gray-700 mb-2 block">
                  Estado
                </label>
                <Badge 
                  className={
                    status === 'Publicada' 
                      ? 'bg-green-100 text-green-800' 
                      : 'bg-yellow-100 text-yellow-800'
                  }
                  variant="secondary"
                >
                  {status}
                </Badge>
              </div>
              
              <div>
                <label className="text-sm font-medium text-gray-700 mb-2 block">
                  URL Slug
                </label>
                <Input
                  value={slug}
                  onChange={(e) => setSlug(e.target.value)}
                  placeholder="url-de-la-pagina"
                />
                <p className="text-xs text-gray-500 mt-1">
                  La URL será: /pages/{slug}
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Información de la Página */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileText className="w-5 h-5" />
                Información
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <Calendar className="w-4 h-4" />
                <span>Creada: 15 Nov 2024</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <Calendar className="w-4 h-4" />
                <span>Modificada: Hace 10 min</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <User className="w-4 h-4" />
                <span>Autor: Admin</span>
              </div>
              
              <Separator />
              
              <div className="text-sm text-gray-600">
                <p className="font-medium mb-1">Estadísticas:</p>
                <p>Palabras: {content.replace(/<[^>]*>/g, '').split(' ').length}</p>
                <p>Caracteres: {content.replace(/<[^>]*>/g, '').length}</p>
              </div>
            </CardContent>
          </Card>

          {/* Acciones Rápidas */}
          <Card>
            <CardHeader>
              <CardTitle>Acciones Rápidas</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <Button variant="outline" className="w-full justify-start" onClick={() => onNavigate?.('media')}>
                <FileText className="w-4 h-4 mr-2" />
                Insertar Imagen
              </Button>
              <Button variant="outline" className="w-full justify-start" onClick={() => onNavigate?.('pages')}>
                <FileText className="w-4 h-4 mr-2" />
                Ver Todas las Páginas
              </Button>
              <Button variant="outline" className="w-full justify-start">
                <Globe className="w-4 h-4 mr-2" />
                Ver en Sitio Web
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};
