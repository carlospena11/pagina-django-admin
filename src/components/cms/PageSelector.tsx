
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Edit3, 
  Eye, 
  Plus,
  FileText,
  Calendar,
  User
} from 'lucide-react';

interface Page {
  id: string;
  title: string;
  slug: string;
  status: string;
  author: string;
  lastModified: string;
  views: number;
  content?: string;
}

interface PageSelectorProps {
  pages: Page[];
  onSelectPage: (pageId: string) => void;
  onNavigate?: (view: string) => void;
}

export const PageSelector: React.FC<PageSelectorProps> = ({ 
  pages, 
  onSelectPage, 
  onNavigate 
}) => {
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

  const getStatusText = (status: string) => {
    switch (status) {
      case 'published':
        return 'Publicado';
      case 'draft':
        return 'Borrador';
      case 'review':
        return 'En Revisión';
      default:
        return status;
    }
  };

  const getPagePreview = (page: Page) => {
    if (page.content) {
      try {
        const content = JSON.parse(page.content);
        if (content.elements) {
          return 'Página con elementos visuales';
        }
      } catch (e) {
        // Fallback to HTML preview
      }
    }
    return page.content || 'Página sin contenido';
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Editor Visual</h1>
          <p className="text-gray-500">Selecciona una página para editar visualmente</p>
        </div>
        <Button onClick={() => onNavigate?.('editor')} className="flex items-center gap-2">
          <Plus className="w-4 h-4" />
          Nueva Página
        </Button>
      </div>

      {/* Pages Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {pages.map((page) => (
          <Card key={page.id} className="hover:shadow-lg transition-shadow cursor-pointer group">
            <CardHeader className="pb-3">
              <div className="flex justify-between items-start">
                <div className="flex-1">
                  <CardTitle className="text-lg mb-2">{page.title}</CardTitle>
                  <Badge className={getStatusColor(page.status)}>
                    {getStatusText(page.status)}
                  </Badge>
                </div>
                <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => onSelectPage(page.id)}
                  >
                    <Edit3 className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </CardHeader>
            
            <CardContent className="space-y-4">
              {/* Page Preview */}
              <div 
                className="bg-gray-50 border rounded-lg p-4 min-h-[120px] flex items-center justify-center text-sm text-gray-600 cursor-pointer hover:bg-gray-100 transition-colors"
                onClick={() => onSelectPage(page.id)}
              >
                <div className="text-center">
                  <FileText className="w-8 h-8 mx-auto mb-2 text-gray-400" />
                  <p className="line-clamp-3">{getPagePreview(page)}</p>
                </div>
              </div>

              {/* Page Info */}
              <div className="space-y-2 text-sm text-gray-500">
                <div className="flex items-center gap-2">
                  <User className="w-4 h-4" />
                  <span>{page.author}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4" />
                  <span>Modificado: {page.lastModified}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Eye className="w-4 h-4" />
                  <span>{page.views.toLocaleString()} vistas</span>
                </div>
              </div>

              {/* URL */}
              <div className="pt-2 border-t">
                <p className="text-xs text-gray-400">/{page.slug}</p>
              </div>

              {/* Edit Button */}
              <Button 
                className="w-full"
                onClick={() => onSelectPage(page.id)}
              >
                <Edit3 className="w-4 h-4 mr-2" />
                Editar Visualmente
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Empty State */}
      {pages.length === 0 && (
        <Card className="p-12">
          <div className="text-center">
            <FileText className="w-16 h-16 mx-auto mb-4 text-gray-400" />
            <h3 className="text-xl font-semibold mb-2">No hay páginas</h3>
            <p className="text-gray-500 mb-4">
              Crea tu primera página para comenzar a usar el editor visual
            </p>
            <Button onClick={() => onNavigate?.('editor')}>
              <Plus className="w-4 h-4 mr-2" />
              Crear Primera Página
            </Button>
          </div>
        </Card>
      )}
    </div>
  );
};
