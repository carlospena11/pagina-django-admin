
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
    redirectWelcome: () => alert('Redirigiendo a Bienvenida'),
    redirectPagVuelos: () => navigate('/flights'),
    redirectPromociones: () => alert('Redirigiendo a Promociones'),
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
        backgroundImage: "url('https://images.unsplash.com/photo-1566073771259-6a8506099945')"
      }}
    >
      {/* Header */}
      <div className="flex justify-between items-center p-4 lg:px-8">
        <div className="logo">
          <img 
            src="/lovable-uploads/d66c1e8f-9241-47e5-8df8-caffa85796cf.png" 
            alt="Hotel Hilton" 
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
                backgroundImage: "url('https://images.unsplash.com/photo-1571896349842-33c89424de2d')"
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
                backgroundImage: "url('https://images.unsplash.com/photo-1556388158-158dc0eca2e8')"
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
                backgroundImage: "url('https://images.unsplash.com/photo-1566073771259-6a8506099945')"
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
                backgroundImage: "url('https://images.unsplash.com/photo-1414235077428-338989a2e8c0')"
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
                backgroundImage: "url('https://images.unsplash.com/photo-1506905925346-21bda4d32df4')"
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
