
import React from 'react';
import { useNavigate } from 'react-router-dom';

const HotelExperiencePage: React.FC = () => {
  const navigate = useNavigate();

  const handleBack = () => {
    navigate('/sample');
  };

  return (
    <div 
      className="min-h-screen bg-cover bg-center bg-no-repeat flex flex-col justify-center items-center overflow-hidden"
      style={{
        backgroundImage: "url('https://images.unsplash.com/photo-1566073771259-6a8506099945')"
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

      {/* Iframe Container */}
      <div className="w-[150vh] h-[90vh] my-[5vh]">
        <iframe
          src="https://hilton-san-salvador.cluvi.co/"
          title="Hilton San Salvador Hotel Experience"
          className="w-full h-full border-none shadow-2xl"
        />
      </div>
    </div>
  );
};

export default HotelExperiencePage;
