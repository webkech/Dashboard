import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider } from "@/contexts/AuthContext";
import ProtectedRoute from "@/components/ProtectedRoute";
import Login from "@/pages/Login";
import Register from "@/pages/Register";
import DashboardLayout from "@/components/dashboard/DashboardLayout";
import Overview from "@/pages/dashboard/Overview";
import ErrorLogs from "@/pages/dashboard/ErrorLogs";
import SecurityMonitoring from "@/pages/dashboard/SecurityMonitoring";
import Issues from "@/pages/dashboard/Issues";
import Reports from "@/pages/dashboard/Reports";
import Integrations from "@/pages/dashboard/Integrations";
import Sites from "@/pages/dashboard/Sites";
import Notifications from "@/pages/dashboard/Notifications";
import Settings from "@/pages/dashboard/Settings";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Navigate to="/login" replace />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            
            <Route path="/dashboard" element={
              <ProtectedRoute>
                <DashboardLayout />
              </ProtectedRoute>
            }>
              <Route index element={<Overview />} />
              <Route path="errors" element={<ErrorLogs />} />
              <Route path="security" element={<SecurityMonitoring />} />
              <Route path="issues" element={<Issues />} />
              <Route path="reports" element={<Reports />} />
              <Route path="integrations" element={<Integrations />} />
              <Route path="sites" element={<Sites />} />
              <Route path="notifications" element={<Notifications />} />
              <Route path="settings" element={<Settings />} />
            </Route>
            
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
