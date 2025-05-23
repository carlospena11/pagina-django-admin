
import React, { useState } from 'react';
import { CMSLayout } from '@/components/cms/CMSLayout';
import { Dashboard } from '@/components/cms/Dashboard';
import { PageManager } from '@/components/cms/PageManager';
import { MediaManager } from '@/components/cms/MediaManager';
import { ContentEditor } from '@/components/cms/ContentEditor';

const CMS: React.FC = () => {
  const [currentView, setCurrentView] = useState('dashboard');

  const renderContent = () => {
    switch (currentView) {
      case 'dashboard':
        return <Dashboard onNavigate={setCurrentView} />;
      case 'pages':
        return <PageManager />;
      case 'media':
        return <MediaManager />;
      case 'editor':
        return <ContentEditor onNavigate={setCurrentView} />;
      default:
        return <Dashboard onNavigate={setCurrentView} />;
    }
  };

  return (
    <CMSLayout currentView={currentView} onNavigate={setCurrentView}>
      {renderContent()}
    </CMSLayout>
  );
};

export default CMS;
