
import React from 'react';

interface SamplePageProps {
  onNavigate?: (view: string) => void;
}

const SamplePage: React.FC<SamplePageProps> = ({ onNavigate }) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div className="flex items-center">
              <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold">S</span>
              </div>
              <h1 className="ml-3 text-2xl font-bold text-gray-900">Sitio Web</h1>
            </div>
            <nav className="hidden md:flex space-x-8">
              <a href="#" className="text-gray-700 hover:text-blue-600 transition-colors">Inicio</a>
              <a href="#" className="text-gray-700 hover:text-blue-600 transition-colors">Servicios</a>
              <a href="#" className="text-gray-700 hover:text-blue-600 transition-colors">Sobre Nosotros</a>
              <a href="#" className="text-gray-700 hover:text-blue-600 transition-colors">Contacto</a>
            </nav>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
            Bienvenido a Nuestro
            <span className="text-blue-600 block">Sitio Web</span>
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
            Esta es una página de muestra creada con nuestro CMS. Aquí puedes ver cómo se ve el contenido publicado en el sitio web real.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700 transition-colors">
              Comenzar Ahora
            </button>
            <button className="border border-gray-300 text-gray-700 px-8 py-3 rounded-lg hover:bg-gray-50 transition-colors">
              Saber Más
            </button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Nuestros Servicios</h2>
            <p className="text-lg text-gray-600">Ofrecemos soluciones integrales para tu negocio</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center p-6">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">🚀</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Desarrollo Web</h3>
              <p className="text-gray-600">Creamos sitios web modernos y funcionales adaptados a tus necesidades.</p>
            </div>
            
            <div className="text-center p-6">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">📱</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Diseño Responsivo</h3>
              <p className="text-gray-600">Todos nuestros diseños se adaptan perfectamente a cualquier dispositivo.</p>
            </div>
            
            <div className="text-center p-6">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">⚡</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Alto Rendimiento</h3>
              <p className="text-gray-600">Optimizamos cada sitio para máxima velocidad y mejor experiencia.</p>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Sobre Nosotros</h2>
              <p className="text-lg text-gray-600 mb-6">
                Somos un equipo de profesionales apasionados por crear experiencias digitales excepcionales. 
                Con años de experiencia en desarrollo web y diseño, ayudamos a empresas de todos los tamaños 
                a establecer su presencia online.
              </p>
              <p className="text-lg text-gray-600 mb-8">
                Nuestro enfoque se centra en la calidad, la innovación y la satisfacción del cliente. 
                Cada proyecto es una oportunidad para superar expectativas y crear algo extraordinario.
              </p>
              <button className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors">
                Conoce Más
              </button>
            </div>
            <div className="relative">
              <img
                src="https://images.unsplash.com/photo-1522071820081-009f0129c71c"
                alt="Equipo trabajando"
                className="rounded-lg shadow-xl"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-20 bg-blue-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-white mb-6">¿Listo para comenzar?</h2>
          <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
            Contáctanos hoy mismo y descubre cómo podemos ayudarte a llevar tu negocio al siguiente nivel.
          </p>
          <button className="bg-white text-blue-600 px-8 py-3 rounded-lg hover:bg-gray-100 transition-colors font-semibold">
            Contactar Ahora
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center mb-4">
                <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold text-sm">S</span>
                </div>
                <span className="ml-2 text-lg font-semibold">Sitio Web</span>
              </div>
              <p className="text-gray-400">
                Creando experiencias digitales excepcionales para empresas de todo el mundo.
              </p>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold mb-4">Servicios</h3>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors">Desarrollo Web</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Diseño UX/UI</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Marketing Digital</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Consultoría</a></li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold mb-4">Empresa</h3>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors">Sobre Nosotros</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Equipo</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Carreras</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Blog</a></li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold mb-4">Contacto</h3>
              <ul className="space-y-2 text-gray-400">
                <li>info@sitioweb.com</li>
                <li>+1 (555) 123-4567</li>
                <li>123 Calle Principal</li>
                <li>Ciudad, País 12345</li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2024 Sitio Web. Todos los derechos reservados.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default SamplePage;
