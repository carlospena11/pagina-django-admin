
import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

const WelcomePage: React.FC = () => {
  const navigate = useNavigate();

  const handleBack = () => {
    navigate('/sample');
  };

  return (
    <div 
      className="min-h-screen bg-cover bg-center bg-no-repeat flex flex-col items-center overflow-hidden"
      style={{
        backgroundImage: "url('/lovable-uploads/c5704d60-cee9-4693-aae2-b6602c41fe4f.png')"
      }}
    >
      {/* Back Button */}
      <div className="absolute top-5 left-5 z-10">
        <button
          onClick={handleBack}
          className="inline-block px-5 py-2.5 bg-blue-600 bg-opacity-70 text-white rounded-md font-sans text-base transition-all duration-300 hover:bg-blue-600 hover:bg-opacity-90 hover:scale-105"
        >
          Regresar
        </button>
      </div>

      {/* Carousel Container */}
      <div className="max-w-6xl w-full px-0 mt-36 h-[calc(100vh-240px)] flex items-center">
        <div className="relative w-full h-[600px] overflow-hidden">
          <Carousel 
            className="w-full h-full"
            opts={{
              align: "start",
              loop: true,
            }}
          >
            <CarouselContent className="h-full">
              <CarouselItem className="h-full">
                <div className="h-full">
                  <img 
                    src="/lovable-uploads/219a145d-582e-4803-8229-8df91928109c.png" 
                    alt="Welcome English"
                    className="w-full h-full object-contain"
                  />
                </div>
              </CarouselItem>
              <CarouselItem className="h-full">
                <div className="h-full">
                  <img 
                    src="/lovable-uploads/952fb5b2-8ca9-457b-99d9-6dc6d5c934e4.png" 
                    alt="Bienvenida Español"
                    className="w-full h-full object-contain"
                  />
                </div>
              </CarouselItem>
              <CarouselItem className="h-full">
                <div className="h-full">
                  <img 
                    src="/lovable-uploads/c8d51e24-f711-41a0-9920-b6feaa0ab8d0.png" 
                    alt="Hilton Honors"
                    className="w-full h-full object-contain"
                  />
                </div>
              </CarouselItem>
              <CarouselItem className="h-full">
                <div className="h-full">
                  <img 
                    src="/lovable-uploads/38d2a68a-e2b3-420b-b9da-b27dc8e41062.png" 
                    alt="Bruncheando - Domingo Febrero $28"
                    className="w-full h-full object-contain"
                  />
                </div>
              </CarouselItem>
              <CarouselItem className="h-full">
                <div className="h-full">
                  <img 
                    src="/lovable-uploads/6c9ec901-5e77-481e-aef8-4c29fad2b4a3.png" 
                    alt="Noche de Salsa & DJ - Viernes Terra Bar"
                    className="w-full h-full object-contain"
                  />
                </div>
              </CarouselItem>
              <CarouselItem className="h-full">
                <div className="h-full">
                  <img 
                    src="/lovable-uploads/74b7c9e7-0e6f-4f61-8daa-0cb4bf633e20.png" 
                    alt="Almuerzo Buffet $32 - Lunes a Viernes"
                    className="w-full h-full object-contain"
                  />
                </div>
              </CarouselItem>
              <CarouselItem className="h-full">
                <div className="h-full">
                  <img 
                    src="/lovable-uploads/ae3ab1b5-dc8b-466e-bdbc-e1f459fefe59.png" 
                    alt="Jazz & Blues - Miércoles Terra Bar"
                    className="w-full h-full object-contain"
                  />
                </div>
              </CarouselItem>
              <CarouselItem className="h-full">
                <div className="h-full">
                  <img 
                    src="/lovable-uploads/c3e66024-e9af-497f-a61e-37ba9b05e325.png" 
                    alt="Desayuno Buffet $24 - Todos los días"
                    className="w-full h-full object-contain"
                  />
                </div>
              </CarouselItem>
              <CarouselItem className="h-full">
                <div className="h-full">
                  <img 
                    src="/lovable-uploads/c66cd0e4-a6c0-4833-bcfe-0c2e3a0c3d9b.png" 
                    alt="Bossa Nova - Jueves Terra Bar"
                    className="w-full h-full object-contain"
                  />
                </div>
              </CarouselItem>
              <CarouselItem className="h-full">
                <div className="h-full">
                  <img 
                    src="/lovable-uploads/d66c1e8f-9241-47e5-8df8-caffa85796cf.png" 
                    alt="Para Compartir - Terra Bar"
                    className="w-full h-full object-contain"
                  />
                </div>
              </CarouselItem>
              <CarouselItem className="h-full">
                <div className="h-full">
                  <img 
                    src="/lovable-uploads/dd3c14c0-3e51-4063-9da1-4d3f9001c2c4.png" 
                    alt="Michelob Ultra - Pide 2 Disfruta 3"
                    className="w-full h-full object-contain"
                  />
                </div>
              </CarouselItem>
              <CarouselItem className="h-full">
                <div className="h-full">
                  <img 
                    src="/lovable-uploads/e6f14ad1-f5de-4b5b-b81a-13a8d64e0ac4.png" 
                    alt="Noche de Salsa & DJ - Viernes"
                    className="w-full h-full object-contain"
                  />
                </div>
              </CarouselItem>
              <CarouselItem className="h-full">
                <div className="h-full">
                  <img 
                    src="/lovable-uploads/f1e14ce2-59b3-447c-b8d5-7ae1f4e3c8af.png" 
                    alt="Noche de Saxofón & DJ - Viernes"
                    className="w-full h-full object-contain"
                  />
                </div>
              </CarouselItem>
            </CarouselContent>
            
            <CarouselPrevious className="absolute left-4 top-1/2 -translate-y-1/2 bg-blue-600 bg-opacity-90 border-blue-600 hover:bg-blue-700 w-12 h-12" />
            <CarouselNext className="absolute right-4 top-1/2 -translate-y-1/2 bg-blue-600 bg-opacity-90 border-blue-600 hover:bg-blue-700 w-12 h-12" />
          </Carousel>
        </div>
      </div>
    </div>
  );
};

export default WelcomePage;
