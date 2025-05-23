
import React from 'react';
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Settings, FileText, BarChart3, Building } from 'lucide-react';

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div className="flex items-center">
              <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">W</span>
              </div>
              <span className="ml-2 text-xl font-bold text-gray-900">Mi Sitio Web</span>
            </div>
            <div className="flex gap-4">
              <Button variant="outline" asChild>
                <a href="/hilton">
                  <Building className="w-4 h-4 mr-2" />
                  Hotel Demo
                </a>
              </Button>
              <Button variant="outline" asChild>
                <a href="/cms">
                  <Settings className="w-4 h-4 mr-2" />
                  Panel Admin
                </a>
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-900 sm:text-5xl md:text-6xl">
            Bienvenido a tu
            <span className="text-blue-600"> Sitio Web</span>
          </h1>
          <p className="mt-6 text-xl text-gray-600 max-w-3xl mx-auto">
            Un sitio web moderno con un sistema de gestión de contenidos completo. 
            Administra todas tus páginas, contenido y usuarios desde un panel intuitivo.
          </p>
          <div className="mt-10 flex justify-center gap-4">
            <Button size="lg" asChild>
              <a href="/cms">
                <FileText className="w-5 h-5 mr-2" />
                Ir al CMS
              </a>
            </Button>
            <Button variant="outline" size="lg" asChild>
              <a href="/hilton">
                <Building className="w-5 h-5 mr-2" />
                Ver Demo Hotel
              </a>
            </Button>
          </div>
        </div>

        {/* Features */}
        <div className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-8">
          <Card className="p-6 text-center">
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mx-auto">
              <FileText className="w-6 h-6 text-blue-600" />
            </div>
            <h3 className="mt-4 text-lg font-semibold">Gestión de Contenido</h3>
            <p className="mt-2 text-gray-600">
              Crea, edita y administra todas tus páginas desde un panel intuitivo
            </p>
          </Card>

          <Card className="p-6 text-center">
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mx-auto">
              <BarChart3 className="w-6 h-6 text-green-600" />
            </div>
            <h3 className="mt-4 text-lg font-semibold">Analíticas</h3>
            <p className="mt-2 text-gray-600">
              Monitorea el rendimiento de tu sitio con estadísticas detalladas
            </p>
          </Card>

          <Card className="p-6 text-center">
            <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mx-auto">
              <Settings className="w-6 h-6 text-purple-600" />
            </div>
            <h3 className="mt-4 text-lg font-semibold">Configuración</h3>
            <p className="mt-2 text-gray-600">
              Personaliza tu sitio web con opciones avanzadas de configuración
            </p>
          </Card>
        </div>

        {/* CTA Section */}
        <div className="mt-20 bg-white rounded-2xl p-8 shadow-lg">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-gray-900">
              ¿Listo para empezar?
            </h2>
            <p className="mt-4 text-xl text-gray-600">
              Accede al panel de administración y comienza a gestionar tu contenido
            </p>
            <div className="flex justify-center gap-4 mt-6">
              <Button size="lg" asChild>
                <a href="/cms">
                  Acceder al Panel Admin
                </a>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <a href="/hilton">
                  Ver Demo Hotel
                </a>
              </Button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Index;
