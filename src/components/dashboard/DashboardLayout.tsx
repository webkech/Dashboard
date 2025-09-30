import React from 'react';
import { Outlet } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  SidebarProvider, 
  SidebarInset, 
  SidebarTrigger 
} from '@/components/ui/sidebar';
import { AppSidebar } from './AppSidebar';

const DashboardLayout = () => {
  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-background">
        <AppSidebar />
        <SidebarInset>
          {/* Header with trigger */}
          <header className="flex h-16 shrink-0 items-center gap-2 border-b border-border bg-background px-4">
            <SidebarTrigger className="-ml-1" />
            <div className="flex items-center space-x-3">
              <h1 className="font-manrope font-semibold text-foreground">
                WebKech Security Dashboard
              </h1>
            </div>
          </header>
          
          {/* Main content */}
          <main className="flex-1 overflow-auto">
            <div className="p-6">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                <Outlet />
              </motion.div>
            </div>
          </main>
        </SidebarInset>
      </div>
    </SidebarProvider>
  );
};

export default DashboardLayout;