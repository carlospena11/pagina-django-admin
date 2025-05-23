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

interface DashboardProps {
  onNavigate?: (view: string) => void;
}

export const Dashboard: React.FC<DashboardProps> = ({ onNavigate }) => {
  const stats = [
    {
      title: "Total de Páginas",
      value: "12",
      description: "3 publicadas, 9 borradores",
      icon: FileText,
      color: "bg-blue-500"
    },
    {
      title: "Imágenes",
      value: "45",
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
      value: "1,234",
      description: "Este mes",
      icon: BarChart3,
      color: "bg-orange-500"
    }
  ];

  const recentPages = [
    {
      title: "Página de Inicio",
      status: "Publicada",
      lastModified: "Hace 2 horas",
      statusColor: "bg-green-100 text-green-800"
    },
    {
      title: "Sobre Nosotros",
      status: "Borrador",
      lastModified: "Hace 1 día",
      statusColor: "bg-yellow-100 text-yellow-800"
    },
    {
      title: "Contacto",
      status: "Pendiente",
      lastModified: "Hace 3 días",
      statusColor: "bg-blue-100 text-blue-800"
    }
  ];

  const handleNavigation = (view: string) => {
    if (onNavigate) {
      onNavigate(view);
    }
  };

  const handleNewPage = () => {
    // Navigate directly to the editor for creating a new page
    if (onNavigate) {
      onNavigate('editor');
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
              {recentPages.map((page, index) => (
                <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                  <div className="flex-1">
                    <h4 className="font-medium">{page.title}</h4>
                    <div className="flex items-center gap-2 mt-1">
                      <Badge className={page.statusColor} variant="secondary">
                        {page.status}
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
              <BarChart3 className="w-5 h-5" />
              Actividad Reciente
            </CardTitle>
            <CardDescription>
              Últimas acciones en el sistema
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center gap-3 p-3 border rounded-lg">
                <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                  <FileText className="w-4 h-4 text-blue-600" />
                </div>
                <div className="flex-1">
                  <p className="text-sm">Nueva página creada: "Servicios"</p>
                  <p className="text-xs text-gray-500">Hace 30 minutos</p>
                </div>
              </div>
              
              <div className="flex items-center gap-3 p-3 border rounded-lg">
                <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                  <Image className="w-4 h-4 text-green-600" />
                </div>
                <div className="flex-1">
                  <p className="text-sm">5 imágenes subidas</p>
                  <p className="text-xs text-gray-500">Hace 1 hora</p>
                </div>
              </div>
              
              <div className="flex items-center gap-3 p-3 border rounded-lg">
                <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center">
                  <Users className="w-4 h-4 text-purple-600" />
                </div>
                <div className="flex-1">
                  <p className="text-sm">Nuevo usuario registrado</p>
                  <p className="text-xs text-gray-500">Hace 2 horas</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
