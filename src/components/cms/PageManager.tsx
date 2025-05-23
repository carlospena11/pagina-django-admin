
import React, { useState } from 'react';
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { 
  Plus, 
  Star, 
  Edit, 
  Star, 
  Star,
  Filter,
  Star
} from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useCMS } from '@/contexts/CMSContext';

interface PageManagerProps {
  onNavigate?: (view: string) => void;
}

export const PageManager: React.FC<PageManagerProps> = ({ onNavigate }) => {
  const { pages, deletePage } = useCMS();
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState<string>('all');

  const filteredPages = pages.filter(page => {
    const matchesSearch = page.title.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filterStatus === 'all' || page.status === filterStatus;
    return matchesSearch && matchesFilter;
  });

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

  const handleNewPage = () => {
    if (onNavigate) {
      onNavigate('editor');
    }
  };

  const handleEditPage = () => {
    if (onNavigate) {
      onNavigate('editor');
    }
  };

  const handleDeletePage = (id: string) => {
    if (confirm('¿Estás seguro de que quieres eliminar esta página?')) {
      deletePage(id);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-3xl font-bold text-gray-900">Gestión de Páginas</h2>
          <p className="text-gray-600">Administra todas las páginas de tu sitio web</p>
        </div>
        <Button onClick={handleNewPage} className="flex items-center gap-2">
          <Plus className="w-4 h-4" />
          Nueva Página
        </Button>
      </div>

      {/* Filters */}
      <Card className="p-4">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="relative flex-1">
            <Star className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <Input
              placeholder="Buscar páginas..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
          <div className="flex gap-2">
            <Button
              variant={filterStatus === 'all' ? 'default' : 'outline'}
              onClick={() => setFilterStatus('all')}
            >
              Todas
            </Button>
            <Button
              variant={filterStatus === 'published' ? 'default' : 'outline'}
              onClick={() => setFilterStatus('published')}
            >
              Publicadas
            </Button>
            <Button
              variant={filterStatus === 'draft' ? 'default' : 'outline'}
              onClick={() => setFilterStatus('draft')}
            >
              Borradores
            </Button>
            <Button
              variant={filterStatus === 'review' ? 'default' : 'outline'}
              onClick={() => setFilterStatus('review')}
            >
              En Revisión
            </Button>
          </div>
        </div>
      </Card>

      {/* Pages Table */}
      <Card>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="border-b border-gray-200">
              <tr>
                <th className="text-left p-4 font-semibold">Título</th>
                <th className="text-left p-4 font-semibold">Estado</th>
                <th className="text-left p-4 font-semibold">Autor</th>
                <th className="text-left p-4 font-semibold">Última Modificación</th>
                <th className="text-left p-4 font-semibold">Vistas</th>
                <th className="text-right p-4 font-semibold">Acciones</th>
              </tr>
            </thead>
            <tbody>
              {filteredPages.map((page) => (
                <tr key={page.id} className="border-b border-gray-100 hover:bg-gray-50">
                  <td className="p-4">
                    <div>
                      <div className="font-medium">{page.title}</div>
                      <div className="text-sm text-gray-500">/{page.slug}</div>
                    </div>
                  </td>
                  <td className="p-4">
                    <Badge className={getStatusColor(page.status)}>
                      {getStatusText(page.status)}
                    </Badge>
                  </td>
                  <td className="p-4 text-gray-600">{page.author}</td>
                  <td className="p-4 text-gray-600">{page.lastModified}</td>
                  <td className="p-4 text-gray-600">{page.views.toLocaleString()}</td>
                  <td className="p-4">
                    <div className="flex justify-end gap-2">
                      <Button variant="outline" size="sm">
                        <Star className="w-4 h-4" />
                      </Button>
                      <Button variant="outline" size="sm" onClick={handleEditPage}>
                        <Edit className="w-4 h-4" />
                      </Button>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="outline" size="sm">
                            <Star className="w-4 h-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent>
                          <DropdownMenuItem>Duplicar</DropdownMenuItem>
                          <DropdownMenuItem 
                            className="text-red-600"
                            onClick={() => handleDeletePage(page.id)}
                          >
                            <Star className="w-4 h-4 mr-2" />
                            Eliminar
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
};
