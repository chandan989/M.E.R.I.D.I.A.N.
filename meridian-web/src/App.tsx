import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import Landing from "./pages/Landing";
import Marketplace from "./pages/Marketplace";
import Dashboard from "./pages/Dashboard";
import Connect from "./pages/Connect";
import DatasetDetails from "./pages/DatasetDetails";
import Upload from "./pages/Upload";
import About from "./pages/About";
import Docs from "./pages/Docs";
import FAQ from "./pages/FAQ";
import Support from "./pages/Support";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Layout>
          <Routes>
            <Route path="/" element={<Landing />} />
            <Route path="/marketplace" element={<Marketplace />} />
            <Route path="/marketplace/:id" element={<DatasetDetails />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/connect" element={<Connect />} />
            <Route path="/upload" element={<Upload />} />
            <Route path="/about" element={<About />} />
            <Route path="/docs" element={<Docs />} />
            <Route path="/faq" element={<FAQ />} />
            <Route path="/support" element={<Support />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Layout>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
