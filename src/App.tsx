
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import CMS from "./pages/CMS";
import SamplePage from "./pages/SamplePage";
import HiltonDemo from "./pages/HiltonDemo";
import FlightStatus from "./pages/FlightStatus";
import WelcomePage from "./pages/WelcomePage";
import HotelExperiencePage from "./pages/HotelExperiencePage";
import NotFound from "./pages/NotFound";
import { CMSPageRenderer } from "./components/cms/CMSPageRenderer";
import { CMSProvider } from "./contexts/CMSContext";

const queryClient = new QueryClient();

const App = () => {
  console.log("App component is rendering");
  
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <CMSProvider>
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/cms/*" element={<CMS />} />
              <Route path="/sample" element={<SamplePage />} />
              <Route path="/hilton" element={<HiltonDemo />} />
              <Route path="/flights" element={<FlightStatus />} />
              <Route path="/welcome" element={<WelcomePage />} />
              <Route path="/hotel-experience" element={<HotelExperiencePage />} />
              
              {/* Dynamic CMS Pages - This will handle all pages created in the CMS */}
              <Route path="/:pageSlug" element={<CMSPageRenderer />} />
              
              {/* 404 Page - Must be last */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </CMSProvider>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
