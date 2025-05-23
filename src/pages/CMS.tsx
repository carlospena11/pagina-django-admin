
import React, { useState } from 'react';
import { CMSLayout } from '@/components/cms/CMSLayout';
import { Dashboard } from '@/components/cms/Dashboard';
import { PageManager } from '@/components/cms/PageManager';

const CMS: React.FC = () => {
  const [currentView, setCurrentView] = useState('dashboard');

  const renderContent = () => {
    switch (currentView) {
      case 'dashboard':
        return <Dashboard />;
      case 'pages':
        return <PageManager />;
      default:
        return <Dashboard />;
    }
  };

  return (
    <CMSLayout>
      {renderContent()}
    </CMSLayout>
  );
};

export default CMS;
