
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  FileText, 
  Image, 
  Users, 
  BarChart3, 
  Plus,
  Edit,
  Eye,
  Calendar
} from 'lucide-react';
import { useCMS } from '@/contexts/CMSContext';

interface DashboardProps {
  onNavigate?: (view: string) => void;
}

export const Dashboard: React.FC<DashboardProps> = ({ onNavigate }) => {
  const { pages, media } = useCMS();
  
  const publishedPages = pages.filter(page => page.status === 'published').length;
  const draftPages = pages.filter(page => page.status === 'draft').length;
  const totalViews = pages.reduce((sum, page) => sum + page.views, 0);
  
  const stats = [
    {
      title: "Total de Páginas",
      value: pages.length.toString(),
      description: `${publishedPages} publicadas, ${draftPages} borradores`,
      icon: FileText,
      color: "bg-blue-500"
    },
    {
      title: "Imágenes",
      value: media.length.toString(),
      description: "Total en la biblioteca",
      icon: Image,
      color: "bg-green-500"
    },
    {
      title: "Usuarios",
      value: "8",
      description: "Usuarios activos",
      icon: Users,
      color: "bg-purple-500"
    },
    {
      title: "Visitas",
      value: totalViews.toLocaleString(),
      description: "Total de visitas",
      icon: BarChart3,
      color: "bg-orange-500"
    }
  ];

  const handleNavigation = (view: string) => {
    if (onNavigate) {
      onNavigate(view);
    }
  };

  const handleNewPage = () => {
    if (onNavigate) {
      onNavigate('editor');
    }
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

  const getStatusText = (status: string) => {
    switch (status) {
      case 'published':
        return 'Publicada';
      case 'draft':
        return 'Borrador';
      case 'review':
        return 'En Revisión';
      default:
        return status;
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
          <p className="text-gray-500 mt-1">Bienvenido al panel de administración</p>
        </div>
        <div className="flex gap-2">
          <Button onClick={handleNewPage} className="flex items-center gap-2">
            <Plus className="w-4 h-4" />
            Nueva Página
          </Button>
          <Button variant="outline" onClick={() => handleNavigation('media')} className="flex items-center gap-2">
            <Image className="w-4 h-4" />
            Subir Imagen
          </Button>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <Card key={index}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
              <div className={`w-8 h-8 ${stat.color} rounded-md flex items-center justify-center`}>
                <stat.icon className="w-4 h-4 text-white" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
              <p className="text-xs text-gray-500 mt-1">{stat.description}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <FileText className="w-5 h-5" />
              Páginas Recientes
            </CardTitle>
            <CardDescription>
              Últimas páginas modificadas
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {pages.slice(0, 3).map((page) => (
                <div key={page.id} className="flex items-center justify-between p-3 border rounded-lg">
                  <div className="flex-1">
                    <h4 className="font-medium">{page.title}</h4>
                    <div className="flex items-center gap-2 mt-1">
                      <Badge className={getStatusColor(page.status)} variant="secondary">
                        {getStatusText(page.status)}
                      </Badge>
                      <span className="text-sm text-gray-500 flex items-center gap-1">
                        <Calendar className="w-3 h-3" />
                        {page.lastModified}
                      </span>
                    </div>
                  </div>
                  <div className="flex gap-1">
                    <Button size="sm" variant="outline" onClick={() => handleNavigation('editor')}>
                      <Edit className="w-4 h-4" />
                    </Button>
                    <Button size="sm" variant="outline">
                      <Eye className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
            <Button variant="outline" className="w-full mt-4" onClick={() => handleNavigation('pages')}>
              Ver Todas las Páginas
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Image className="w-5 h-5" />
              Galería de Imágenes
            </CardTitle>
            <CardDescription>
              Últimas imágenes subidas
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-3 gap-2 mb-4">
              {media.slice(0, 6).map((item) => (
                <div key={item.id} className="aspect-square rounded-lg overflow-hidden">
                  <img
                    src={item.url}
                    alt={item.alt || item.name}
                    className="w-full h-full object-cover hover:scale-105 transition-transform cursor-pointer"
                  />
                </div>
              ))}
            </div>
            <Button variant="outline" className="w-full" onClick={() => handleNavigation('media')}>
              Ver Biblioteca Completa
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
