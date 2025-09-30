import React from 'react';
import { motion } from 'framer-motion';
import { NavLink, useLocation } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
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
  Menu,
  X
} from 'lucide-react';
import { useState } from 'react';

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

interface SidebarProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ isOpen, setIsOpen }) => {
  const { logout, user } = useAuth();
  const location = useLocation();

  const handleLogout = () => {
    logout();
  };

  return (
    <>
      {/* Mobile backdrop */}
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-background/80 backdrop-blur-sm z-40 lg:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Sidebar */}
      <motion.aside
        initial={{ x: -300 }}
        animate={{ x: isOpen ? 0 : -300 }}
        transition={{ type: "tween", duration: 0.3 }}
        className={`fixed left-0 top-0 z-50 h-full w-64 bg-sidebar border-r border-sidebar-border lg:translate-x-0 lg:static lg:z-auto
          ${isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}`}
      >
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="p-6 border-b border-sidebar-border">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="p-2 rounded-lg bg-primary/20 glow-primary">
                  <Shield className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h2 className="font-manrope font-bold text-sidebar-foreground">WebKech</h2>
                  <p className="text-xs text-muted-foreground">Security Dashboard</p>
                </div>
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsOpen(false)}
                className="lg:hidden"
              >
                <X className="w-4 h-4" />
              </Button>
            </div>
          </div>

          {/* Navigation */}
          <nav className="flex-1 p-4 space-y-2">
            {sidebarItems.map((item, index) => {
              const isActive = location.pathname === item.path;
              return (
                <motion.div
                  key={item.path}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.05 }}
                >
                  <NavLink
                    to={item.path}
                    className={`flex items-center space-x-3 px-3 py-2 rounded-lg transition-all duration-200 group
                      ${isActive 
                        ? 'bg-primary/20 text-primary border border-primary/30 glow-primary' 
                        : 'text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground'
                      }`}
                    onClick={() => setIsOpen(false)}
                  >
                    <item.icon className={`w-5 h-5 ${isActive ? 'text-primary' : 'text-muted-foreground group-hover:text-sidebar-accent-foreground'}`} />
                    <span className="font-medium">{item.label}</span>
                  </NavLink>
                </motion.div>
              );
            })}
          </nav>

          {/* User section */}
          <div className="p-4 border-t border-sidebar-border">
            <div className="flex items-center space-x-3 mb-3 p-2 rounded-lg bg-sidebar-accent/50">
              <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center">
                <span className="text-sm font-medium text-primary">
                  {user?.email.charAt(0).toUpperCase()}
                </span>
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-sidebar-foreground truncate">
                  {user?.email}
                </p>
                <p className="text-xs text-muted-foreground">Administrator</p>
              </div>
            </div>
            <Button
              onClick={handleLogout}
              variant="ghost"
              className="w-full justify-start text-muted-foreground hover:text-sidebar-foreground hover:bg-sidebar-accent"
            >
              <LogOut className="w-4 h-4 mr-3" />
              Sign Out
            </Button>
          </div>
        </div>
      </motion.aside>
    </>
  );
};

export default Sidebar;