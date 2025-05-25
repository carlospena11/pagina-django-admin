
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
