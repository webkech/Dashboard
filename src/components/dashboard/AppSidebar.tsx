import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from '@/components/ui/sidebar';
import { Button } from '@/components/ui/button';
import {
  LayoutDashboard,
  AlertTriangle,
  Shield,
  FileText,
  BarChart3,
  Plug,
  Globe,
  Bell,
  Settings,
  LogOut,
} from 'lucide-react';

const sidebarItems = [
  { icon: LayoutDashboard, label: 'Overview', path: '/dashboard' },
  { icon: AlertTriangle, label: 'Error Logs', path: '/dashboard/errors' },
  { icon: Shield, label: 'Security Monitoring', path: '/dashboard/security' },
  { icon: FileText, label: 'Issue Categories', path: '/dashboard/issues' },
  { icon: BarChart3, label: 'Reports', path: '/dashboard/reports' },
  { icon: Plug, label: 'Integrations', path: '/dashboard/integrations' },
  { icon: Globe, label: 'Multi-Site Support', path: '/dashboard/sites' },
  { icon: Bell, label: 'Notifications', path: '/dashboard/notifications' },
  { icon: Settings, label: 'Settings', path: '/dashboard/settings' },
];

export function AppSidebar() {
  const { logout, user } = useAuth();
  const { state, setOpenMobile } = useSidebar();
  const location = useLocation();
  const currentPath = location.pathname;

  const isActive = (path: string) => currentPath === path;
  const collapsed = state === 'collapsed';

  const handleLogout = () => {
    logout();
  };

  const handleMenuClick = () => {
    // Close sidebar on mobile when menu item is clicked
    setOpenMobile(false);
  };

  return (
    <Sidebar variant="inset" className="border-sidebar-border">
      {/* Logo Section */}
      <SidebarHeader className="flex items-center justify-center h-24">
        <img
          src="/webkech logo.svg"
          alt="WebKech Logo"
          className="h-16 w-auto object-contain"
        />
      </SidebarHeader>

      {/* Navigation */}
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Navigation</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {sidebarItems.map((item) => (
                <SidebarMenuItem key={item.path}>
                  <SidebarMenuButton
                    asChild
                    isActive={isActive(item.path)}
                    tooltip={collapsed ? item.label : undefined}
                  >
                    <NavLink to={item.path} onClick={handleMenuClick}>
                      <item.icon className="w-4 h-4" />
                      <span>{item.label}</span>
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      {/* Footer with User Info */}
      <SidebarFooter>
        {/* User section */}
        <div className="flex items-center space-x-3 p-2 rounded-lg bg-sidebar-accent/50 mb-2">
          <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center">
            <span className="text-sm font-medium text-primary">
              {user?.email.charAt(0).toUpperCase()}
            </span>
          </div>
          {!collapsed && (
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-sidebar-foreground truncate">
                {user?.email}
              </p>
              <p className="text-xs text-muted-foreground">Administrator</p>
            </div>
          )}
        </div>

        {/* Logout button */}
        <SidebarMenuButton
          asChild
          tooltip={collapsed ? 'Sign Out' : undefined}
        >
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-2 text-muted-foreground hover:text-sidebar-foreground"
          >
            <LogOut className="w-4 h-4" />
            <span>Sign Out</span>
          </button>
        </SidebarMenuButton>
      </SidebarFooter>
    </Sidebar>
  );
}
