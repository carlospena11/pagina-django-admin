
import React, { useState } from 'react';
import { CMSLayout } from '@/components/cms/CMSLayout';
import { Dashboard } from '@/components/cms/Dashboard';
import { PageManager } from '@/components/cms/PageManager';
import { MediaManager } from '@/components/cms/MediaManager';
import { ContentEditor } from '@/components/cms/ContentEditor';
import { CMSProvider } from '@/contexts/CMSContext';
import { AuthProvider } from '@/contexts/AuthContext';
import { ProtectedRoute } from '@/components/auth/ProtectedRoute';
import { useAuth } from '@/contexts/AuthContext';

const CMSContent: React.FC = () => {
  const [currentView, setCurrentView] = useState('dashboard');
  const { canEdit, canAdmin } = useAuth();

  const renderContent = () => {
    switch (currentView) {
      case 'dashboard':
        return <Dashboard onNavigate={setCurrentView} />;
      case 'pages':
        return <PageManager onNavigate={setCurrentView} />;
      case 'media':
        return canEdit() ? <MediaManager /> : <Dashboard onNavigate={setCurrentView} />;
      case 'editor':
        return canEdit() ? <ContentEditor onNavigate={setCurrentView} /> : <Dashboard onNavigate={setCurrentView} />;
      case 'users':
        return canAdmin() ? <div className="p-6"><h1>Gestión de Usuarios (Próximamente)</h1></div> : <Dashboard onNavigate={setCurrentView} />;
      case 'analytics':
        return canEdit() ? <div className="p-6"><h1>Analíticas (Próximamente)</h1></div> : <Dashboard onNavigate={setCurrentView} />;
      case 'settings':
        return canAdmin() ? <div className="p-6"><h1>Configuración (Próximamente)</h1></div> : <Dashboard onNavigate={setCurrentView} />;
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
  return (
    <AuthProvider>
      <ProtectedRoute>
        <CMSContent />
      </ProtectedRoute>
    </AuthProvider>
  );
};

export default CMS;
