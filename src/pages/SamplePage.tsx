
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

interface SamplePageProps {
  onNavigate?: (view: string) => void;
}

const SamplePage: React.FC<SamplePageProps> = ({ onNavigate }) => {
  const navigate = useNavigate();
  const [currentTime, setCurrentTime] = useState('');
  const [weather, setWeather] = useState({
    temperature: '',
    condition: '',
    icon: ''
  });

  // Update time every second
  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setCurrentTime(now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }));
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);
    
    return () => clearInterval(interval);
  }, []);

  // Fetch weather data
  useEffect(() => {
    const fetchWeather = async () => {
      try {
        const response = await fetch(
          'https://api.openweathermap.org/data/2.5/weather?q=San Salvador, El Salvador&appid=5bedff37ad0c1cb81be45ad16e06a4cd&units=metric'
        );
        const data = await response.json();
        
        const temperatura = data.main.temp;
        const condicionNombre = data.weather[0].description;
        
        let weatherIcon = '';
        if (condicionNombre.includes('nubes') || condicionNombre.includes('lluvia')) {
          weatherIcon = '☁️';
        } else if (condicionNombre.includes('sol')) {
          weatherIcon = '☀️';
        } else {
          weatherIcon = '🌧️';
        }

        setWeather({
          temperature: `${Math.round(temperatura)}°C`,
          condition: condicionNombre,
          icon: weatherIcon
        });
      } catch (error) {
        console.log('No se pudo obtener información del clima');
      }
    };

    fetchWeather();
  }, []);

  const redirectFunctions = {
    redirectWelcome: () => navigate('/welcome'),
    redirectPagVuelos: () => navigate('/flights'),
    redirectPromociones: () => navigate('/hotel-experience'),
    redirectMenu: () => alert('Redirigiendo a Menú'),
    redirectDescubreSV: () => alert('Redirigiendo a Descubre El Salvador'),
    redirectCCVEOTV: () => alert('Abriendo StreamTV'),
    redirectNetflix: () => alert('Abriendo Netflix'),
    redirectPrimeVideo: () => window.open('https://app.primevideo.com', '_blank'),
    redirectDisney: () => alert('Abriendo Disney+'),
    redirectYouTube: () => window.open('https://www.youtube.com', '_blank'),
    redirectWifi: () => alert('Configuración WiFi')
  };

  return (
    <div 
      className="min-h-screen font-sans bg-cover bg-center bg-no-repeat"
      style={{
        backgroundImage: "url('/lovable-uploads/c5704d60-cee9-4693-aae2-b6602c41fe4f.png')"
      }}
    >
      {/* Header */}
      <div className="flex justify-between items-center p-4 lg:px-8">
        <div className="logo">
          <img 
            src="/lovable-uploads/7ef18f32-ab7e-42e1-9f98-e87659a2649a.png" 
            alt="Hotel Hilton San Salvador" 
            className="h-20 lg:h-32"
          />
        </div>
        
        <div className="text-right text-white">
          <div className="text-xl lg:text-2xl font-bold">{currentTime}</div>
          <div className="flex items-center justify-end gap-2 mt-2">
            <span className="text-lg">{weather.icon}</span>
            <span className="font-bold">{weather.temperature}</span>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="px-4 lg:px-8 pb-8">
        <div className="max-w-7xl mx-auto">
          {/* First Row */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-6">
            <div 
              className="relative h-32 rounded-lg cursor-pointer transition-transform duration-300 hover:scale-105 hover:shadow-xl bg-cover bg-center"
              style={{
                backgroundImage: "url('/lovable-uploads/5f928ea5-c8aa-43fd-8df4-00973152c181.png')"
              }}
              onClick={redirectFunctions.redirectWelcome}
            >
              <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-70 text-white p-2 rounded-b-lg">
                <div className="text-sm">Bienvenida</div>
              </div>
            </div>
            
            <div 
              className="relative h-32 rounded-lg cursor-pointer transition-transform duration-300 hover:scale-105 hover:shadow-xl bg-cover bg-center"
              style={{
                backgroundImage: "url('/lovable-uploads/d31ddc15-a846-4c68-9a81-8add874bf9ef.png')"
              }}
              onClick={redirectFunctions.redirectPagVuelos}
            >
              <div className="absolute bottom-0 left-0 right-0 bg-blue-600 bg-opacity-70 text-white p-2 rounded-b-lg">
                <div className="text-sm">Flight Status</div>
              </div>
            </div>
          </div>

          {/* Second Row */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <div 
              className="relative h-32 rounded-lg cursor-pointer transition-transform duration-300 hover:scale-105 hover:shadow-xl bg-cover bg-center"
              style={{
                backgroundImage: "url('/lovable-uploads/c5704d60-cee9-4693-aae2-b6602c41fe4f.png')"
              }}
              onClick={redirectFunctions.redirectPromociones}
            >
              <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-70 text-white p-2 rounded-b-lg">
                <div className="text-sm">Enjoy your Hotel</div>
              </div>
            </div>
            
            <div 
              className="relative h-32 rounded-lg cursor-pointer transition-transform duration-300 hover:scale-105 hover:shadow-xl bg-cover bg-center"
              style={{
                backgroundImage: "url('/lovable-uploads/142eb2bb-b11e-4087-94f6-f23fadb2086e.png')"
              }}
              onClick={redirectFunctions.redirectMenu}
            >
              <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-70 text-white p-2 rounded-b-lg">
                <div className="text-sm">Menu and Services</div>
              </div>
            </div>
            
            <div 
              className="relative h-32 rounded-lg cursor-pointer transition-transform duration-300 hover:scale-105 hover:shadow-xl bg-cover bg-center"
              style={{
                backgroundImage: "url('/lovable-uploads/b854633c-4b3c-42d6-86f2-5da3361fef95.png')"
              }}
              onClick={redirectFunctions.redirectDescubreSV}
            >
              <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-70 text-white p-2 rounded-b-lg">
                <div className="text-sm">Discover El Salvador</div>
              </div>
            </div>
          </div>

          {/* Third Row - Apps */}
          <div className="grid grid-cols-3 md:grid-cols-6 gap-4">
            <div 
              className="h-16 bg-black rounded-lg cursor-pointer transition-transform duration-300 hover:scale-110 hover:shadow-lg flex items-center justify-center text-white font-bold"
              onClick={redirectFunctions.redirectCCVEOTV}
            >
              📺
            </div>
            
            <div 
              className="h-16 bg-red-600 rounded-lg cursor-pointer transition-transform duration-300 hover:scale-110 hover:shadow-lg flex items-center justify-center text-white font-bold"
              onClick={redirectFunctions.redirectNetflix}
            >
              N
            </div>
            
            <div 
              className="h-16 bg-blue-500 rounded-lg cursor-pointer transition-transform duration-300 hover:scale-110 hover:shadow-lg flex items-center justify-center text-white font-bold"
              onClick={redirectFunctions.redirectPrimeVideo}
            >
              Prime
            </div>
            
            <div 
              className="h-16 bg-blue-700 rounded-lg cursor-pointer transition-transform duration-300 hover:scale-110 hover:shadow-lg flex items-center justify-center text-white font-bold"
              onClick={redirectFunctions.redirectDisney}
            >
              D+
            </div>
            
            <div 
              className="h-16 bg-red-500 rounded-lg cursor-pointer transition-transform duration-300 hover:scale-110 hover:shadow-lg flex items-center justify-center text-white font-bold"
              onClick={redirectFunctions.redirectYouTube}
            >
              ▶️
            </div>
            
            <div 
              className="h-16 bg-green-600 rounded-lg cursor-pointer transition-transform duration-300 hover:scale-110 hover:shadow-lg flex items-center justify-center text-white font-bold"
              onClick={redirectFunctions.redirectWifi}
            >
              📶
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SamplePage;
