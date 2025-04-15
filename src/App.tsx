
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import Splash from "./pages/Splash";
import RoleSelection from "./pages/onboarding/RoleSelection";
import Authentication from "./pages/onboarding/Authentication";
import HomeownerDashboard from "./pages/dashboards/HomeownerDashboard";
import ProfessionalDashboard from "./pages/dashboards/ProfessionalDashboard";
import SupplierDashboard from "./pages/dashboards/SupplierDashboard";
import MaterialStore from "./pages/MaterialStore";
import Bookings from "./pages/Bookings";
import Chat from "./pages/Chat";
import Profile from "./pages/Profile";
import ErrorBoundary from "./components/ErrorBoundary";

const queryClient = new QueryClient();

// Simple authentication check
const isAuthenticated = () => {
  return localStorage.getItem("isAuthenticated") === "true";
};

// Protected route component
const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  if (!isAuthenticated()) {
    // Save the current path to redirect back after login
    const currentPath = window.location.pathname;
    if (currentPath !== "/onboarding/auth") {
      localStorage.setItem("redirectAfterAuth", currentPath);
    }
    return <Navigate to="/onboarding/auth" replace />;
  }
  return <>{children}</>;
};

// Dashboard redirect based on selected role
const DashboardRedirect = () => {
  const selectedRoles = JSON.parse(localStorage.getItem("selectedRoles") || "[]");
  
  if (selectedRoles.includes("homeowner")) {
    return <Navigate to="/dashboard/homeowner" replace />;
  } else if (selectedRoles.includes("professional")) {
    return <Navigate to="/dashboard/professional" replace />;
  } else if (selectedRoles.includes("supplier")) {
    return <Navigate to="/dashboard/supplier" replace />;
  } else {
    // Default fallback
    return <Navigate to="/dashboard/homeowner" replace />;
  }
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <ErrorBoundary>
        <BrowserRouter>
          <Routes>
            {/* Splash & Onboarding */}
            <Route path="/" element={<Splash />} />
            <Route path="/onboarding" element={<RoleSelection />} />
            <Route path="/onboarding/auth" element={<Authentication />} />
            
            {/* Dashboard redirect */}
            <Route path="/dashboard" element={<DashboardRedirect />} />
            
            {/* Role-specific Dashboards */}
            <Route path="/dashboard/homeowner" element={
              <ProtectedRoute>
                <HomeownerDashboard />
              </ProtectedRoute>
            } />
            <Route path="/dashboard/professional" element={
              <ProtectedRoute>
                <ProfessionalDashboard />
              </ProtectedRoute>
            } />
            <Route path="/dashboard/supplier" element={
              <ProtectedRoute>
                <SupplierDashboard />
              </ProtectedRoute>
            } />
            
            {/* Core App Routes */}
            <Route path="/material-store" element={
              <ProtectedRoute>
                <MaterialStore />
              </ProtectedRoute>
            } />
            <Route path="/bookings" element={
              <ProtectedRoute>
                <Bookings />
              </ProtectedRoute>
            } />
            <Route path="/chat" element={
              <ProtectedRoute>
                <Chat />
              </ProtectedRoute>
            } />
            <Route path="/profile" element={
              <ProtectedRoute>
                <Profile />
              </ProtectedRoute>
            } />
            
            {/* Legacy route */}
            <Route path="/index" element={<Index />} />
            
            {/* Catch-all route */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </ErrorBoundary>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
