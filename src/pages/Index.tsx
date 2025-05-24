
import React from 'react';
import { Button } from "@/components/ui/button";
import { Hotel } from 'lucide-react';

const Index = () => {
  console.log("Index component is rendering");
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
      <div className="text-center max-w-2xl mx-auto px-4">
        <div className="mb-8">
          <div className="w-20 h-20 bg-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-6">
            <Hotel className="w-10 h-10 text-white" />
          </div>
          <h1 className="text-5xl font-bold text-gray-900 mb-4">
            Plataforma de Administración de
            <span className="text-blue-600 block">App Hoteles</span>
          </h1>
          <p className="text-xl text-gray-600 mb-8">
            Bienvenido al sistema de gestión hotelera. 
            Administra reservas, huéspedes y servicios desde un panel centralizado.
          </p>
          <Button size="lg" asChild>
            <a href="/cms">
              Acceder al Panel de Administración
            </a>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Index;
