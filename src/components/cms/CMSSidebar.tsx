
import React from 'react';
import { 
  LayoutDashboard, 
  FileText, 
  Image, 
  Settings, 
  Users, 
  BarChart3,
  Globe,
  Menu
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
  SidebarTrigger
} from "@/components/ui/sidebar";

const menuItems = [
  {
    title: "Dashboard",
    url: "/cms",
    icon: LayoutDashboard,
  },
  {
    title: "Páginas",
    url: "/cms/pages",
    icon: FileText,
  },
  {
    title: "Medios",
    url: "/cms/media",
    icon: Image,
  },
  {
    title: "Usuarios",
    url: "/cms/users",
    icon: Users,
  },
  {
    title: "Analíticas",
    url: "/cms/analytics",
    icon: BarChart3,
  },
  {
    title: "Sitio Web",
    url: "/",
    icon: Globe,
  },
  {
    title: "Configuración",
    url: "/cms/settings",
    icon: Settings,
  },
];

export function CMSSidebar() {
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
                  <SidebarMenuButton asChild>
                    <a href={item.url} className="flex items-center gap-3 px-3 py-2 rounded-md hover:bg-gray-100 transition-colors">
                      <item.icon className="w-5 h-5" />
                      <span>{item.title}</span>
                    </a>
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
