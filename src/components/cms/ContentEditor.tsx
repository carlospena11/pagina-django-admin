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
  Trash2
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

  const handleSave = () => {
    if (selectedPageId && selectedPage) {
      updatePage(selectedPageId, {
        ...pageData,
        lastModified: new Date().toISOString().split('T')[0]
      });
      toast({
        title: "Página actualizada",
        description: "La página se ha actualizado exitosamente.",
      });
    } else {
      const newPage = {
        ...pageData,
        author: 'Current User',
        lastModified: new Date().toISOString().split('T')[0],
        views: 0
      };
      addPage(newPage);
      toast({
        title: "Página creada",
        description: "La nueva página se ha creado exitosamente.",
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
    console.log('Vista previa de la página');
  };

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
              onClick={() => setEditorMode('visual')}
              className="flex items-center gap-2"
            >
              <Tv className="w-4 h-4" />
              Editor Visual
            </Button>
            <Button 
              variant={editorMode === 'code' ? 'default' : 'outline'} 
              onClick={() => setEditorMode('code')}
              className="flex items-center gap-2"
            >
              <Code className="w-4 h-4" />
              Editor de Código
            </Button>
          </div>
        </div>

        {/* Create New Page Card */}
        <Card className="cursor-pointer hover:shadow-lg transition-shadow" onClick={() => setSelectedPageId('new')}>
          <CardContent className="p-6">
            <div className="text-center">
              <FileText className="w-12 h-12 mx-auto mb-4 text-gray-400" />
              <h3 className="text-xl font-semibold mb-2">Crear Nueva Página</h3>
              <p className="text-gray-500">Comienza desde cero con una página en blanco</p>
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
                  <p>Slug: /{page.slug}</p>
                  <p>Autor: {page.author}</p>
                  <p>Última modificación: {page.lastModified}</p>
                  <p>Vistas: {page.views.toLocaleString()}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    );
  }

  // Content Editor
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
              {selectedPageId === 'new' ? 'Crea una nueva página' : `Editando: ${selectedPage?.title}`}
            </p>
          </div>
        </div>
        
        <div className="flex gap-2">
          <Button 
            variant={editorMode === 'visual' ? 'default' : 'outline'} 
            onClick={() => setEditorMode('visual')}
            className="flex items-center gap-2"
          >
            <Tv className="w-4 h-4" />
            Visual
          </Button>
          <Button 
            variant={editorMode === 'code' ? 'default' : 'outline'} 
            onClick={() => setEditorMode('code')}
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
            Guardar
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
                    <Label htmlFor="title">Título</Label>
                    <Input
                      id="title"
                      value={pageData.title}
                      onChange={(e) => setPageData({...pageData, title: e.target.value})}
                      placeholder="Título de la página"
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="slug">Slug (URL)</Label>
                    <Input
                      id="slug"
                      value={pageData.slug}
                      onChange={(e) => setPageData({...pageData, slug: e.target.value})}
                      placeholder="url-de-la-pagina"
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="status">Estado</Label>
                    <Select value={pageData.status} onValueChange={(value: 'published' | 'draft' | 'review') => setPageData({...pageData, status: value})}>
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
                Vista Previa
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="border rounded-lg p-4 bg-white min-h-[300px]">
                <div 
                  className="prose prose-sm max-w-none"
                  dangerouslySetInnerHTML={{ __html: pageData.content || '<p class="text-gray-400">El contenido aparecerá aquí...</p>' }}
                />
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};
