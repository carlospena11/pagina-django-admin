
import React, { useState } from 'react';
import { CMSLayout } from '@/components/cms/CMSLayout';
import { Dashboard } from '@/components/cms/Dashboard';
import { PageManager } from '@/components/cms/PageManager';
import { MediaManager } from '@/components/cms/MediaManager';
import { ContentEditor } from '@/components/cms/ContentEditor';
import { PlatformManager } from '@/components/cms/PlatformManager';
import { CMSProvider } from '@/contexts/CMSContext';

const CMSContent: React.FC = () => {
  const [currentView, setCurrentView] = useState('dashboard');

  // Mock user with admin permissions for development
  const mockCanEdit = () => true;
  const mockCanAdmin = () => true;

  const renderContent = () => {
    switch (currentView) {
      case 'dashboard':
        return <Dashboard onNavigate={setCurrentView} />;
      case 'pages':
        return <PageManager onNavigate={setCurrentView} />;
      case 'media':
        return <MediaManager />;
      case 'editor':
        return <ContentEditor onNavigate={setCurrentView} />;
      case 'platforms':
        return <PlatformManager />;
      case 'users':
        return <div className="p-6"><h1>Gestión de Usuarios (Próximamente)</h1></div>;
      case 'analytics':
        return <div className="p-6"><h1>Analíticas (Próximamente)</h1></div>;
      case 'settings':
        return <div className="p-6"><h1>Configuración (Próximamente)</h1></div>;
      default:
        return <Dashboard onNavigate={setCurrentView} />;
    }
  };

  return (
    <CMSProvider>
      <CMSLayout currentView={currentView} onNavigate={setCurrentView}>
        {renderContent()}
      </CMSLayout>
    </CMSProvider>
  );
};

const CMS: React.FC = () => {
  return <CMSContent />;
};

export default CMS;
