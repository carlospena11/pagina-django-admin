
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Code, 
  Eye, 
  Save, 
  ArrowLeft,
  FileText,
  Monitor,
  Tv,
  Trash2,
  Globe,
  Link
} from 'lucide-react';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '@/components/ui/alert-dialog';
import { useCMS } from '@/contexts/CMSContext';
import { VisualEditor } from './VisualEditor';
import { useToast } from '@/hooks/use-toast';

interface ContentEditorProps {
  onNavigate?: (view: string) => void;
}

export const ContentEditor: React.FC<ContentEditorProps> = ({ onNavigate }) => {
  const { pages, addPage, updatePage, deletePage } = useCMS();
  const { toast } = useToast();
  const [selectedPageId, setSelectedPageId] = useState<string | null>(null);
  const [editorMode, setEditorMode] = useState<'visual' | 'code'>('visual');
  const [pageData, setPageData] = useState({
    title: '',
    slug: '',
    status: 'draft' as 'published' | 'draft' | 'review',
    content: ''
  });

  const selectedPage = pages.find(p => p.id === selectedPageId);

  React.useEffect(() => {
    if (selectedPage) {
      setPageData({
        title: selectedPage.title,
        slug: selectedPage.slug,
        status: selectedPage.status,
        content: selectedPage.content || ''
      });
    }
  }, [selectedPage]);

  const generateSlugFromTitle = (title: string) => {
    return title
      .toLowerCase()
      .replace(/[^\w\s-]/g, '') // Remove special characters
      .replace(/\s+/g, '-') // Replace spaces with hyphens
      .replace(/-+/g, '-') // Replace multiple hyphens with single
      .trim();
  };

  const handleTitleChange = (title: string) => {
    setPageData(prev => ({
      ...prev,
      title,
      slug: prev.slug || generateSlugFromTitle(title)
    }));
  };

  const handleSave = () => {
    if (!pageData.title.trim()) {
      toast({
        title: "Error",
        description: "El título es obligatorio.",
        variant: "destructive"
      });
      return;
    }

    if (!pageData.slug.trim()) {
      toast({
        title: "Error",
        description: "El slug (URL) es obligatorio.",
        variant: "destructive"
      });
      return;
    }

    // Check if slug already exists (excluding current page)
    const existingPage = pages.find(p => p.slug === pageData.slug && p.id !== selectedPageId);
    if (existingPage) {
      toast({
        title: "Error",
        description: "Ya existe una página con este slug. Por favor usa uno diferente.",
        variant: "destructive"
      });
      return;
    }

    if (selectedPageId && selectedPage) {
      updatePage(selectedPageId, {
        ...pageData,
        lastModified: new Date().toISOString().split('T')[0]
      });
      toast({
        title: "Página actualizada",
        description: `La página se ha actualizado y está disponible en /${pageData.slug}`,
      });
    } else {
      const newPage = {
        ...pageData,
        author: 'Admin',
        lastModified: new Date().toISOString().split('T')[0],
        views: 0
      };
      const addedPage = addPage(newPage);
      setSelectedPageId(addedPage.id);
      toast({
        title: "Página creada",
        description: `La nueva página se ha creado y está disponible en /${pageData.slug}`,
      });
    }
  };

  const handleDelete = () => {
    if (selectedPageId && selectedPage) {
      deletePage(selectedPageId);
      toast({
        title: "Página eliminada",
        description: "La página se ha eliminado exitosamente.",
      });
      setSelectedPageId(null);
    }
  };

  const handlePreview = () => {
    if (pageData.slug) {
      const url = `/${pageData.slug}`;
      window.open(url, '_blank');
    } else {
      toast({
        title: "Error",
        description: "Necesitas guardar la página antes de previsualizarla.",
        variant: "destructive"
      });
    }
  };

  const switchToVisualEditor = () => {
    setEditorMode('visual');
  };

  const switchToCodeEditor = () => {
    setEditorMode('code');
  };

  // Redirect to Visual Editor if visual mode is selected
  if (editorMode === 'visual') {
    return <VisualEditor onNavigate={onNavigate} />;
  }

  // Page selector
  if (!selectedPageId) {
    return (
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Editor de Contenido</h1>
            <p className="text-gray-500">Crea y edita páginas de tu sitio web</p>
          </div>
          <div className="flex gap-2">
            <Button 
              variant={editorMode === 'visual' ? 'default' : 'outline'} 
              onClick={switchToVisualEditor}
              className="flex items-center gap-2"
            >
              <Tv className="w-4 h-4" />
              Editor Visual
            </Button>
            <Button 
              variant={editorMode === 'code' ? 'default' : 'outline'} 
              onClick={switchToCodeEditor}
              className="flex items-center gap-2"
            >
              <Code className="w-4 h-4" />
              Editor de Código
            </Button>
          </div>
        </div>

        {/* Create New Page Card */}
        <Card className="cursor-pointer hover:shadow-lg transition-shadow border-2 border-dashed border-blue-300 bg-blue-50" onClick={() => setSelectedPageId('new')}>
          <CardContent className="p-8">
            <div className="text-center">
              <FileText className="w-16 h-16 mx-auto mb-4 text-blue-600" />
              <h3 className="text-2xl font-semibold mb-2 text-blue-900">Crear Nueva Página</h3>
              <p className="text-blue-700 text-lg">Comienza desde cero con una página en blanco</p>
              <div className="mt-4 text-sm text-blue-600">
                ✨ Se generará automáticamente una URL accesible
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Existing Pages Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {pages.map((page) => (
            <Card key={page.id} className="cursor-pointer hover:shadow-lg transition-shadow" onClick={() => setSelectedPageId(page.id)}>
              <CardHeader>
                <div className="flex justify-between items-start">
                  <CardTitle className="text-lg">{page.title}</CardTitle>
                  <Badge variant={page.status === 'published' ? 'default' : 'secondary'}>
                    {page.status === 'published' ? 'Publicado' : page.status === 'draft' ? 'Borrador' : 'En Revisión'}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-2 text-sm text-gray-500">
                  <div className="flex items-center gap-2">
                    <Link className="w-4 h-4" />
                    <span className="font-mono text-blue-600">/{page.slug}</span>
                  </div>
                  <p>Autor: {page.author}</p>
                  <p>Última modificación: {page.lastModified}</p>
                  <p>Vistas: {page.views.toLocaleString()}</p>
                </div>
                <div className="mt-4 space-y-2">
                  <Button 
                    variant="outline" 
                    size="sm" 
                    onClick={(e) => {
                      e.stopPropagation();
                      window.open(`/${page.slug}`, '_blank');
                    }}
                    className="w-full"
                  >
                    <Globe className="w-4 h-4 mr-2" />
                    Ver Página Publicada
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    );
  }

  // Content Editor (Code Mode)
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
            <h1 className="text-3xl font-bold text-gray-900">
              {selectedPageId === 'new' ? 'Nueva Página' : 'Editar Página'}
            </h1>
            <p className="text-gray-500">
              {selectedPageId === 'new' ? 'Crea una nueva página web' : `Editando: ${selectedPage?.title}`}
            </p>
            {pageData.slug && (
              <div className="flex items-center gap-2 mt-1">
                <Globe className="w-4 h-4 text-green-600" />
                <span className="text-sm font-mono text-green-600">
                  Disponible en: /{pageData.slug}
                </span>
              </div>
            )}
          </div>
        </div>
        
        <div className="flex gap-2">
          <Button 
            variant={editorMode === 'visual' ? 'default' : 'outline'} 
            onClick={switchToVisualEditor}
            className="flex items-center gap-2"
          >
            <Tv className="w-4 h-4" />
            Visual
          </Button>
          <Button 
            variant={editorMode === 'code' ? 'default' : 'outline'} 
            onClick={switchToCodeEditor}
            className="flex items-center gap-2"
          >
            <Code className="w-4 h-4" />
            Código
          </Button>
          <Button variant="outline" onClick={handlePreview} className="flex items-center gap-2">
            <Eye className="w-4 h-4" />
            Vista Previa
          </Button>
          {selectedPageId !== 'new' && selectedPage && (
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button variant="destructive" className="flex items-center gap-2">
                  <Trash2 className="w-4 h-4" />
                  Eliminar
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>¿Estás seguro?</AlertDialogTitle>
                  <AlertDialogDescription>
                    Esta acción no se puede deshacer. Se eliminará permanentemente la página "{selectedPage.title}" y todos sus datos.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Cancelar</AlertDialogCancel>
                  <AlertDialogAction onClick={handleDelete}>
                    Eliminar página
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          )}
          <Button onClick={handleSave} className="flex items-center gap-2">
            <Save className="w-4 h-4" />
            Guardar y Publicar
          </Button>
        </div>
      </div>

      {/* Editor Content */}
      <div className="grid grid-cols-12 gap-6">
        {/* Main Editor */}
        <div className="col-span-8">
          <Tabs defaultValue="content" className="space-y-4">
            <TabsList>
              <TabsTrigger value="content">Contenido</TabsTrigger>
              <TabsTrigger value="settings">Configuración</TabsTrigger>
            </TabsList>
            
            <TabsContent value="content">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Code className="w-5 h-5" />
                    Editor HTML
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <Textarea
                    placeholder="Escribe tu contenido HTML aquí..."
                    className="min-h-[400px] font-mono"
                    value={pageData.content}
                    onChange={(e) => setPageData({...pageData, content: e.target.value})}
                  />
                  <div className="mt-4 p-4 bg-blue-50 rounded-lg">
                    <h4 className="font-semibold text-blue-900 mb-2">💡 Consejos para crear contenido:</h4>
                    <ul className="text-sm text-blue-800 space-y-1">
                      <li>• Usa clases de Tailwind CSS para el estilo</li>
                      <li>• Incluye contenido semántico con etiquetas HTML apropiadas</li>
                      <li>• Asegúrate de que el contenido sea responsive</li>
                      <li>• Puedes usar imágenes de Unsplash directamente</li>
                    </ul>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="settings">
              <Card>
                <CardHeader>
                  <CardTitle>Configuración de Página</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label htmlFor="title">Título de la Página *</Label>
                    <Input
                      id="title"
                      value={pageData.title}
                      onChange={(e) => handleTitleChange(e.target.value)}
                      placeholder="Ej: Mi Nueva Página"
                      className="mt-1"
                    />
                    <p className="text-sm text-gray-500 mt-1">
                      El título aparecerá en el navegador y buscadores
                    </p>
                  </div>
                  
                  <div>
                    <Label htmlFor="slug">URL de la Página (Slug) *</Label>
                    <div className="flex items-center mt-1">
                      <span className="text-gray-500 bg-gray-100 px-3 py-2 border border-r-0 rounded-l-md">
                        {window.location.origin}/
                      </span>
                      <Input
                        id="slug"
                        value={pageData.slug}
                        onChange={(e) => setPageData({...pageData, slug: e.target.value.toLowerCase().replace(/[^a-z0-9-]/g, '-')})}
                        placeholder="mi-nueva-pagina"
                        className="rounded-l-none"
                      />
                    </div>
                    <p className="text-sm text-gray-500 mt-1">
                      Solo letras minúsculas, números y guiones. Se genera automáticamente desde el título.
                    </p>
                  </div>
                  
                  <div>
                    <Label htmlFor="status">Estado de Publicación</Label>
                    <Select value={pageData.status} onValueChange={(value: 'published' | 'draft' | 'review') => setPageData({...pageData, status: value})}>
                      <SelectTrigger className="mt-1">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="draft">Borrador - No visible públicamente</SelectItem>
                        <SelectItem value="review">En Revisión - Pendiente de aprobación</SelectItem>
                        <SelectItem value="published">Publicado - Visible para todos</SelectItem>
                      </SelectContent>
                    </Select>
                    <p className="text-sm text-gray-500 mt-1">
                      Solo las páginas "Publicadas" son accesibles por URL
                    </p>
                  </div>

                  <div className="border-t pt-4">
                    <h4 className="font-semibold mb-2">Acceso a la Página</h4>
                    {pageData.slug ? (
                      <div className="space-y-2">
                        <div className="flex items-center gap-2 p-3 bg-green-50 rounded-lg">
                          <Globe className="w-5 h-5 text-green-600" />
                          <div>
                            <p className="font-medium text-green-900">URL de la página:</p>
                            <code className="text-green-700">{window.location.origin}/{pageData.slug}</code>
                          </div>
                        </div>
                        <Button 
                          variant="outline" 
                          onClick={handlePreview}
                          className="w-full"
                        >
                          <Eye className="w-4 h-4 mr-2" />
                          Abrir en Nueva Ventana
                        </Button>
                      </div>
                    ) : (
                      <p className="text-gray-500 text-sm">Guarda la página para generar su URL</p>
                    )}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>

        {/* Preview Panel */}
        <div className="col-span-4">
          <Card className="sticky top-6">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Monitor className="w-5 h-5" />
                Vista Previa en Tiempo Real
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="border rounded-lg p-4 bg-white min-h-[300px] max-h-[500px] overflow-auto">
                <div 
                  className="prose prose-sm max-w-none"
                  dangerouslySetInnerHTML={{ 
                    __html: pageData.content || '<div class="text-gray-400 text-center py-8"><p>Escribe contenido HTML para ver la vista previa...</p><p class="text-sm mt-2">El contenido aparecerá aquí en tiempo real</p></div>' 
                  }}
                />
              </div>
              
              {pageData.slug && pageData.status === 'published' && (
                <div className="mt-4 p-3 bg-green-50 rounded-lg">
                  <p className="text-sm text-green-800 font-medium">
                    ✅ Esta página está publicada y accesible en:
                  </p>
                  <code className="text-xs text-green-700 block mt-1">
                    /{pageData.slug}
                  </code>
                </div>
              )}
              
              {pageData.status !== 'published' && (
                <div className="mt-4 p-3 bg-yellow-50 rounded-lg">
                  <p className="text-sm text-yellow-800">
                    ⚠️ Página en estado "{pageData.status}" - No visible públicamente
                  </p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};
