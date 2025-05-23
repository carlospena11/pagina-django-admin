
import React from 'react';
import { 
  LayoutDashboard, 
  FileText, 
  Image, 
  Settings, 
  Users, 
  BarChart3,
  Globe,
  Edit
} from 'lucide-react';
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarHeader,
} from "@/components/ui/sidebar";

interface CMSSidebarProps {
  currentView?: string;
  onNavigate?: (view: string) => void;
}

const menuItems = [
  {
    title: "Dashboard",
    view: "dashboard",
    icon: LayoutDashboard,
  },
  {
    title: "Páginas",
    view: "pages",
    icon: FileText,
  },
  {
    title: "Editor",
    view: "editor",
    icon: Edit,
  },
  {
    title: "Medios",
    view: "media",
    icon: Image,
  },
  {
    title: "Usuarios",
    view: "users",
    icon: Users,
  },
  {
    title: "Analíticas",
    view: "analytics",
    icon: BarChart3,
  },
];

const externalItems = [
  {
    title: "Sitio Web",
    url: "/",
    icon: Globe,
  },
  {
    title: "Página de Muestra",
    url: "/sample",
    icon: FileText,
  },
  {
    title: "Configuración",
    view: "settings",
    icon: Settings,
  },
];

export function CMSSidebar({ currentView, onNavigate }: CMSSidebarProps) {
  const handleNavigation = (view: string) => {
    if (onNavigate) {
      onNavigate(view);
    }
  };

  return (
    <Sidebar className="border-r border-gray-200">
      <SidebarHeader className="p-4 border-b border-gray-200">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
            <span className="text-white font-bold text-sm">CMS</span>
          </div>
          <span className="font-semibold text-lg">Admin Panel</span>
        </div>
      </SidebarHeader>
      
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Gestión de Contenido</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {menuItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton 
                    onClick={() => handleNavigation(item.view)}
                    className={`flex items-center gap-3 px-3 py-2 rounded-md transition-colors cursor-pointer ${
                      currentView === item.view 
                        ? 'bg-blue-100 text-blue-900' 
                        : 'hover:bg-gray-100'
                    }`}
                  >
                    <item.icon className="w-5 h-5" />
                    <span>{item.title}</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarGroup>
          <SidebarGroupLabel>Enlaces Externos</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {externalItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild={!!item.url}>
                    {item.url ? (
                      <a href={item.url} className="flex items-center gap-3 px-3 py-2 rounded-md hover:bg-gray-100 transition-colors">
                        <item.icon className="w-5 h-5" />
                        <span>{item.title}</span>
                      </a>
                    ) : (
                      <div 
                        onClick={() => item.view && handleNavigation(item.view)}
                        className={`flex items-center gap-3 px-3 py-2 rounded-md transition-colors cursor-pointer ${
                          currentView === item.view 
                            ? 'bg-blue-100 text-blue-900' 
                            : 'hover:bg-gray-100'
                        }`}
                      >
                        <item.icon className="w-5 h-5" />
                        <span>{item.title}</span>
                      </div>
                    )}
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
