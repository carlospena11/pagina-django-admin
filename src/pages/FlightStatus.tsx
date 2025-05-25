
import React from 'react';

const FlightStatus: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-100 p-5">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="bg-blue-900 text-white p-5 rounded-lg mb-5">
          <h1 className="text-2xl font-bold mb-2">Vuelos (Flights) El Salvador - Hospitality Smart Room</h1>
          <p className="flex items-center gap-2 m-0">
            Real-time flight information in El Salvador
          </p>
        </div>

        {/* Airport Info */}
        <div className="bg-white p-4 rounded-lg mb-5 shadow-sm">
          <h2 className="text-blue-900 text-xl font-bold mt-0 mb-4">Airport Information</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-3 bg-gray-50 rounded">
              <strong>Airport:</strong> El Salvador International
            </div>
            <div className="p-3 bg-gray-50 rounded">
              <strong>Country:</strong> El Salvador (SV)
            </div>
          </div>
        </div>

        {/* Loading state */}
        <div id="loading" className="text-center p-5 text-lg hidden">
          Loading flight data...
        </div>

        {/* Error state */}
        <div id="error" className="text-red-600 text-center p-5 hidden"></div>

        {/* Flight Widget */}
        <div className="bg-white rounded-lg shadow-sm overflow-hidden">
          <iframe 
            src="https://www.avionio.com/widget/es/SAL/arrivals"
            className="w-full h-[600px] border-0"
            frameBorder="0"
            scrolling="auto"
            title="Flight Information"
          />
        </div>
      </div>
    </div>
  );
};

export default FlightStatus;
