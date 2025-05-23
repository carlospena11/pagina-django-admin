
import React, { useState } from 'react';
import { CMSLayout } from '@/components/cms/CMSLayout';
import { Dashboard } from '@/components/cms/Dashboard';
import { PageManager } from '@/components/cms/PageManager';
import { MediaManager } from '@/components/cms/MediaManager';
import { ContentEditor } from '@/components/cms/ContentEditor';
import { CMSProvider } from '@/contexts/CMSContext';

const CMS: React.FC = () => {
  const [currentView, setCurrentView] = useState('dashboard');

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

export default CMS;
