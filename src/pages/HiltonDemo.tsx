
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Star, 
  MapPin, 
  Phone, 
  Mail, 
  Wifi, 
  Car, 
  Coffee, 
  Dumbbell,
  Calendar,
  Users,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';

const HiltonDemo: React.FC = () => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  
  const hotelImages = [
    'https://images.unsplash.com/photo-1566073771259-6a8506099945',
    'https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9',
    'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b',
    'https://images.unsplash.com/photo-1564501049412-61c2a3083791'
  ];

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % hotelImages.length);
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + hotelImages.length) % hotelImages.length);
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center">
              <div className="w-10 h-10 bg-blue-900 rounded flex items-center justify-center">
                <span className="text-white font-bold text-lg">H</span>
              </div>
              <span className="ml-3 text-2xl font-bold text-blue-900">Hilton</span>
            </div>
            <nav className="hidden md:flex space-x-8">
              <a href="#" className="text-gray-700 hover:text-blue-900 transition-colors">Inicio</a>
              <a href="#habitaciones" className="text-gray-700 hover:text-blue-900 transition-colors">Habitaciones</a>
              <a href="#servicios" className="text-gray-700 hover:text-blue-900 transition-colors">Servicios</a>
              <a href="#contacto" className="text-gray-700 hover:text-blue-900 transition-colors">Contacto</a>
            </nav>
            <Button className="bg-blue-900 hover:bg-blue-800">
              Reservar Ahora
            </Button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative h-[600px] overflow-hidden">
        <div className="relative w-full h-full">
          <img
            src={hotelImages[currentImageIndex]}
            alt="Hotel Hilton"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black bg-opacity-40"></div>
          
          {/* Navigation arrows */}
          <button
            onClick={prevImage}
            className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-20 hover:bg-opacity-30 rounded-full p-2 transition-all"
          >
            <ChevronLeft className="w-6 h-6 text-white" />
          </button>
          <button
            onClick={nextImage}
            className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-20 hover:bg-opacity-30 rounded-full p-2 transition-all"
          >
            <ChevronRight className="w-6 h-6 text-white" />
          </button>
          
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center text-white max-w-4xl px-4">
              <h1 className="text-5xl md:text-6xl font-bold mb-6">
                Bienvenido a Hilton
              </h1>
              <p className="text-xl md:text-2xl mb-8 opacity-90">
                Experimenta el lujo y la comodidad en nuestro hotel de clase mundial
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg" className="bg-blue-900 hover:bg-blue-800 text-lg px-8 py-3">
                  Reservar Habitación
                </Button>
                <Button size="lg" variant="outline" className="text-white border-white hover:bg-white hover:text-blue-900 text-lg px-8 py-3">
                  Ver Ofertas
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="servicios" className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Nuestros Servicios</h2>
            <p className="text-xl text-gray-600">Todo lo que necesitas para una estancia perfecta</p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <Card className="text-center p-6 hover:shadow-lg transition-shadow">
              <CardContent className="pt-6">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Wifi className="w-8 h-8 text-blue-900" />
                </div>
                <h3 className="text-xl font-semibold mb-2">WiFi Gratis</h3>
                <p className="text-gray-600">Internet de alta velocidad en todas las áreas</p>
              </CardContent>
            </Card>
            
            <Card className="text-center p-6 hover:shadow-lg transition-shadow">
              <CardContent className="pt-6">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Car className="w-8 h-8 text-blue-900" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Estacionamiento</h3>
                <p className="text-gray-600">Estacionamiento gratuito para huéspedes</p>
              </CardContent>
            </Card>
            
            <Card className="text-center p-6 hover:shadow-lg transition-shadow">
              <CardContent className="pt-6">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Dumbbell className="w-8 h-8 text-blue-900" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Gimnasio</h3>
                <p className="text-gray-600">Centro de fitness abierto 24/7</p>
              </CardContent>
            </Card>
            
            <Card className="text-center p-6 hover:shadow-lg transition-shadow">
              <CardContent className="pt-6">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Coffee className="w-8 h-8 text-blue-900" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Restaurante</h3>
                <p className="text-gray-600">Gastronomía internacional de primer nivel</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Rooms Section */}
      <section id="habitaciones" className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Nuestras Habitaciones</h2>
            <p className="text-xl text-gray-600">Comodidad y elegancia en cada detalle</p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card className="overflow-hidden hover:shadow-lg transition-shadow">
              <div className="h-48 overflow-hidden">
                <img
                  src="https://images.unsplash.com/photo-1649972904349-6e44c42644a7"
                  alt="Habitación Estándar"
                  className="w-full h-full object-cover hover:scale-105 transition-transform"
                />
              </div>
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-xl font-semibold">Habitación Estándar</h3>
                  <div className="flex items-center">
                    <Star className="w-4 h-4 text-yellow-400 fill-current" />
                    <Star className="w-4 h-4 text-yellow-400 fill-current" />
                    <Star className="w-4 h-4 text-yellow-400 fill-current" />
                    <Star className="w-4 h-4 text-yellow-400 fill-current" />
                    <Star className="w-4 h-4 text-gray-300" />
                  </div>
                </div>
                <p className="text-gray-600 mb-4">Perfecta para viajeros de negocios y parejas</p>
                <div className="flex items-center justify-between">
                  <span className="text-2xl font-bold text-blue-900">$150/noche</span>
                  <Button className="bg-blue-900 hover:bg-blue-800">Reservar</Button>
                </div>
              </CardContent>
            </Card>
            
            <Card className="overflow-hidden hover:shadow-lg transition-shadow">
              <div className="h-48 overflow-hidden">
                <img
                  src="https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9"
                  alt="Suite Ejecutiva"
                  className="w-full h-full object-cover hover:scale-105 transition-transform"
                />
              </div>
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-xl font-semibold">Suite Ejecutiva</h3>
                  <div className="flex items-center">
                    <Star className="w-4 h-4 text-yellow-400 fill-current" />
                    <Star className="w-4 h-4 text-yellow-400 fill-current" />
                    <Star className="w-4 h-4 text-yellow-400 fill-current" />
                    <Star className="w-4 h-4 text-yellow-400 fill-current" />
                    <Star className="w-4 h-4 text-yellow-400 fill-current" />
                  </div>
                </div>
                <p className="text-gray-600 mb-4">Máximo lujo con vista panorámica</p>
                <div className="flex items-center justify-between">
                  <span className="text-2xl font-bold text-blue-900">$300/noche</span>
                  <Button className="bg-blue-900 hover:bg-blue-800">Reservar</Button>
                </div>
              </CardContent>
            </Card>
            
            <Card className="overflow-hidden hover:shadow-lg transition-shadow">
              <div className="h-48 overflow-hidden">
                <img
                  src="https://images.unsplash.com/photo-1581091226825-a6a2a5aee158"
                  alt="Habitación Familiar"
                  className="w-full h-full object-cover hover:scale-105 transition-transform"
                />
              </div>
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-xl font-semibold">Habitación Familiar</h3>
                  <div className="flex items-center">
                    <Star className="w-4 h-4 text-yellow-400 fill-current" />
                    <Star className="w-4 h-4 text-yellow-400 fill-current" />
                    <Star className="w-4 h-4 text-yellow-400 fill-current" />
                    <Star className="w-4 h-4 text-yellow-400 fill-current" />
                    <Star className="w-4 h-4 text-gray-300" />
                  </div>
                </div>
                <p className="text-gray-600 mb-4">Espaciosa y cómoda para toda la familia</p>
                <div className="flex items-center justify-between">
                  <span className="text-2xl font-bold text-blue-900">$200/noche</span>
                  <Button className="bg-blue-900 hover:bg-blue-800">Reservar</Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contacto" className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Contáctanos</h2>
            <p className="text-xl text-gray-600">Estamos aquí para ayudarte</p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-12">
            <div>
              <h3 className="text-2xl font-semibold mb-6">Información de Contacto</h3>
              <div className="space-y-4">
                <div className="flex items-center">
                  <MapPin className="w-6 h-6 text-blue-900 mr-3" />
                  <span>123 Avenida Principal, Ciudad, País</span>
                </div>
                <div className="flex items-center">
                  <Phone className="w-6 h-6 text-blue-900 mr-3" />
                  <span>+1 (555) 123-4567</span>
                </div>
                <div className="flex items-center">
                  <Mail className="w-6 h-6 text-blue-900 mr-3" />
                  <span>info@hilton-demo.com</span>
                </div>
              </div>
            </div>
            
            <div>
              <h3 className="text-2xl font-semibold mb-6">Horarios de Atención</h3>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span>Lunes - Viernes:</span>
                  <span>9:00 AM - 10:00 PM</span>
                </div>
                <div className="flex justify-between">
                  <span>Sábados:</span>
                  <span>10:00 AM - 8:00 PM</span>
                </div>
                <div className="flex justify-between">
                  <span>Domingos:</span>
                  <span>10:00 AM - 6:00 PM</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-blue-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center mb-4">
                <div className="w-8 h-8 bg-white rounded flex items-center justify-center">
                  <span className="text-blue-900 font-bold">H</span>
                </div>
                <span className="ml-2 text-xl font-bold">Hilton</span>
              </div>
              <p className="text-blue-100">
                Tu hogar lejos de casa. Experiencias inolvidables te esperan.
              </p>
            </div>
            
            <div>
              <h4 className="text-lg font-semibold mb-4">Enlaces Rápidos</h4>
              <ul className="space-y-2 text-blue-100">
                <li><a href="#" className="hover:text-white transition-colors">Inicio</a></li>
                <li><a href="#habitaciones" className="hover:text-white transition-colors">Habitaciones</a></li>
                <li><a href="#servicios" className="hover:text-white transition-colors">Servicios</a></li>
                <li><a href="#contacto" className="hover:text-white transition-colors">Contacto</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="text-lg font-semibold mb-4">Servicios</h4>
              <ul className="space-y-2 text-blue-100">
                <li>WiFi Gratuito</li>
                <li>Estacionamiento</li>
                <li>Gimnasio 24/7</li>
                <li>Restaurante</li>
              </ul>
            </div>
            
            <div>
              <h4 className="text-lg font-semibold mb-4">Síguenos</h4>
              <p className="text-blue-100">
                Mantente conectado con nosotros en redes sociales
              </p>
            </div>
          </div>
          
          <div className="border-t border-blue-800 mt-8 pt-8 text-center text-blue-100">
            <p>&copy; 2024 Hilton Demo. Todos los derechos reservados.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default HiltonDemo;
