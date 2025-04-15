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

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          {/* Splash & Onboarding */}
          <Route path="/" element={<Splash />} />
          <Route path="/onboarding" element={<RoleSelection />} />
          <Route path="/onboarding/auth" element={<Authentication />} />
          
          {/* Dashboards by Role */}
          <Route path="/dashboard" element={<HomeownerDashboard />} />
          
          {/* Legacy route */}
          <Route path="/index" element={<Index />} />
          
          {/* Catch-all route */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
