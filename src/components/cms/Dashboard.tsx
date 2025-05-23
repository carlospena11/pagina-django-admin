
import React from 'react';
import { Card } from "@/components/ui/card";
import { FileText, Users, Eye, TrendingUp, Plus } from 'lucide-react';
import { Button } from "@/components/ui/button";

const stats = [
  {
    title: "Total de Páginas",
    value: "24",
    change: "+2 este mes",
    icon: FileText,
    color: "text-blue-600"
  },
  {
    title: "Usuarios Activos",
    value: "1,234",
    change: "+12% vs mes anterior",
    icon: Users,
    color: "text-green-600"
  },
  {
    title: "Visitas Totales",
    value: "45,678",
    change: "+8% esta semana",
    icon: Eye,
    color: "text-purple-600"
  },
  {
    title: "Crecimiento",
    value: "23%",
    change: "+5% vs trimestre anterior",
    icon: TrendingUp,
    color: "text-orange-600"
  }
];

const recentPages = [
  { title: "Página de Inicio", status: "Publicada", lastModified: "Hace 2 horas" },
  { title: "Sobre Nosotros", status: "Borrador", lastModified: "Hace 1 día" },
  { title: "Contacto", status: "Publicada", lastModified: "Hace 3 días" },
  { title: "Blog Principal", status: "Revisión", lastModified: "Hace 1 semana" },
];

export const Dashboard: React.FC = () => {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-3xl font-bold text-gray-900">Dashboard</h2>
          <p className="text-gray-600">Bienvenido de vuelta, aquí tienes un resumen de tu sitio web</p>
        </div>
        <Button className="flex items-center gap-2">
          <Plus className="w-4 h-4" />
          Nueva Página
        </Button>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <Card key={index} className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">{stat.title}</p>
                <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                <p className="text-sm text-gray-500 mt-1">{stat.change}</p>
              </div>
              <div className={`p-3 rounded-full bg-gray-50 ${stat.color}`}>
                <stat.icon className="w-6 h-6" />
              </div>
            </div>
          </Card>
        ))}
      </div>

      {/* Recent Pages */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="p-6">
          <h3 className="text-lg font-semibold mb-4">Páginas Recientes</h3>
          <div className="space-y-3">
            {recentPages.map((page, index) => (
              <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                <div>
                  <p className="font-medium">{page.title}</p>
                  <p className="text-sm text-gray-500">{page.lastModified}</p>
                </div>
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                  page.status === 'Publicada' ? 'bg-green-100 text-green-800' :
                  page.status === 'Borrador' ? 'bg-yellow-100 text-yellow-800' :
                  'bg-blue-100 text-blue-800'
                }`}>
                  {page.status}
                </span>
              </div>
            ))}
          </div>
        </Card>

        <Card className="p-6">
          <h3 className="text-lg font-semibold mb-4">Acciones Rápidas</h3>
          <div className="space-y-3">
            <Button variant="outline" className="w-full justify-start">
              <FileText className="w-4 h-4 mr-2" />
              Crear Nueva Página
            </Button>
            <Button variant="outline" className="w-full justify-start">
              <Users className="w-4 h-4 mr-2" />
              Gestionar Usuarios
            </Button>
            <Button variant="outline" className="w-full justify-start">
              <Eye className="w-4 h-4 mr-2" />
              Ver Analíticas
            </Button>
            <Button variant="outline" className="w-full justify-start">
              <TrendingUp className="w-4 h-4 mr-2" />
              Configurar SEO
            </Button>
          </div>
        </Card>
      </div>
    </div>
  );
};
