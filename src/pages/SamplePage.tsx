
import React from 'react';
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ArrowLeft, Calendar, User, Tag } from 'lucide-react';

const SamplePage = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center py-4">
            <Button variant="ghost" asChild className="mr-4">
              <a href="/">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Volver al Inicio
              </a>
            </Button>
            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">M</span>
            </div>
            <span className="ml-2 text-lg font-semibold text-gray-900">Mi Blog</span>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Article Header */}
        <div className="mb-8">
          <div className="mb-4">
            <span className="bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-0.5 rounded">
              Artículo de Muestra
            </span>
          </div>
          
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Bienvenido a nuestro sitio web
          </h1>
          
          <div className="flex items-center text-gray-600 text-sm space-x-4 mb-6">
            <div className="flex items-center">
              <User className="w-4 h-4 mr-1" />
              <span>Admin</span>
            </div>
            <div className="flex items-center">
              <Calendar className="w-4 h-4 mr-1" />
              <span>15 de Enero, 2024</span>
            </div>
            <div className="flex items-center">
              <Tag className="w-4 h-4 mr-1" />
              <span>Página Principal</span>
            </div>
          </div>
        </div>

        {/* Featured Image */}
        <div className="mb-8">
          <img
            src="https://images.unsplash.com/photo-1649972904349-6e44c42644a7"
            alt="Imagen destacada del artículo"
            className="w-full h-64 sm:h-80 object-cover rounded-lg shadow-lg"
          />
        </div>

        {/* Article Content */}
        <Card className="p-8">
          <div className="prose prose-lg max-w-none">
            <p className="text-xl text-gray-700 mb-6 leading-relaxed">
              Esta es la página principal de nuestro sitio web. Aquí puedes encontrar información 
              sobre nuestros servicios y productos.
            </p>

            <h2 className="text-2xl font-semibold mb-4 mt-8">Nuestros Servicios</h2>
            
            <p className="mb-4">
              Ofrecemos una amplia gama de servicios para satisfacer las necesidades de nuestros clientes:
            </p>

            <ul className="list-disc pl-6 mb-6 space-y-2">
              <li>Desarrollo web</li>
              <li>Diseño gráfico</li>
              <li>Marketing digital</li>
              <li>Consultoría tecnológica</li>
            </ul>

            <h2 className="text-2xl font-semibold mb-4 mt-8">¿Por qué elegirnos?</h2>
            
            <p className="mb-6">
              Somos un equipo de profesionales comprometidos con la excelencia y la innovación. 
              Nuestro objetivo es ayudar a nuestros clientes a alcanzar sus metas.
            </p>

            <div className="bg-blue-50 p-6 rounded-lg mb-6">
              <h3 className="text-lg font-medium mb-3">Valores que nos definen</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <h4 className="font-medium mb-2">🎯 Enfoque en resultados</h4>
                  <p className="text-sm text-gray-600">
                    Trabajamos orientados a conseguir los objetivos de nuestros clientes.
                  </p>
                </div>
                <div>
                  <h4 className="font-medium mb-2">🚀 Innovación constante</h4>
                  <p className="text-sm text-gray-600">
                    Utilizamos las últimas tecnologías y metodologías del mercado.
                  </p>
                </div>
                <div>
                  <h4 className="font-medium mb-2">🤝 Compromiso</h4>
                  <p className="text-sm text-gray-600">
                    Nos comprometemos con cada proyecto como si fuera nuestro propio negocio.
                  </p>
                </div>
                <div>
                  <h4 className="font-medium mb-2">📈 Crecimiento continuo</h4>
                  <p className="text-sm text-gray-600">
                    Ayudamos a nuestros clientes a crecer y expandir sus horizontes.
                  </p>
                </div>
              </div>
            </div>

            <h3 className="text-xl font-medium mb-4">Contacto</h3>
            
            <p className="mb-6">
              Si tienes alguna pregunta o deseas más información, no dudes en contactarnos.
            </p>

            <div className="bg-gray-50 p-6 rounded-lg">
              <div className="flex flex-col sm:flex-row gap-4">
                <Button className="flex-1">
                  Contáctanos
                </Button>
                <Button variant="outline" className="flex-1">
                  Ver Más Proyectos
                </Button>
              </div>
            </div>
          </div>
        </Card>

        {/* Navigation */}
        <div className="mt-8 flex justify-between items-center">
          <Button variant="outline" asChild>
            <a href="/cms">
              ← Volver al CMS
            </a>
          </Button>
          <Button asChild>
            <a href="/">
              Ir al Inicio →
            </a>
          </Button>
        </div>
      </main>
    </div>
  );
};

export default SamplePage;
