
import React from 'react';
import { SidebarProvider } from "@/components/ui/sidebar";
import { CMSSidebar } from './CMSSidebar';
import { CMSHeader } from './CMSHeader';

interface CMSLayoutProps {
  children: React.ReactNode;
  currentView?: string;
  onNavigate?: (view: string) => void;
}

export const CMSLayout: React.FC<CMSLayoutProps> = ({ children, currentView, onNavigate }) => {
  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-gray-50">
        <CMSSidebar currentView={currentView} onNavigate={onNavigate} />
        <div className="flex-1 flex flex-col">
          <CMSHeader />
          <main className="flex-1 p-6">
            {children}
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
};
