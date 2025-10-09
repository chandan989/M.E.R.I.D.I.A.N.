import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import Layout from "./components/Layout";
import Landing from "./pages/Landing";
import Marketplace from "./pages/Marketplace";
import ProviderDashboard from "./pages/ProviderDashboard.tsx";
import ProviderProfile from "./pages/ProviderProfile";
import BuyerDashboard from "./pages/BuyerDashboard";
import Connect from "./pages/Connect";
import DatasetDetails from "./pages/DatasetDetails";
import MyDatasets from "./pages/MyDatasets";
import DisplayDataset from "./pages/DisplayDataset";
import Subscriptions from "./pages/Subscriptions";
import Upload from "./pages/Upload";
import About from "./pages/About";
import Docs from "./pages/Docs";
import FAQ from "./pages/FAQ";
import Support from "./pages/Support";
import NotFound from "./pages/NotFound";
import { ReactNode } from "react";
import { DidProvider } from "./contexts/DidContext";
import { LoadingProvider } from "./contexts/LoadingContext";
import { UserTypeProvider } from "./contexts/UserTypeContext";
import ProtectedRoute from "./components/ProtectedRoute";
import CustomCursor from "./components/ui/CustomCursor";

const queryClient = new QueryClient();

const LayoutWrapper = ({ children }: { children: ReactNode }) => {
  const location = useLocation();
  const noLayoutRoutes = ["/connect"];

  if (noLayoutRoutes.includes(location.pathname)) {
    return <>{children}</>;
  }

  return <Layout>{children}</Layout>;
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <LoadingProvider>
        <Toaster />
        <Sonner />
        <CustomCursor />
        <BrowserRouter>
          <DidProvider>
            <UserTypeProvider>
              <LayoutWrapper>
                <Routes>
                  <Route path="/" element={<Landing />} />
                  <Route path="/marketplace" element={<Marketplace />} />
                  <Route path="/marketplace/:id" element={<DatasetDetails />} />
                  <Route path="/connect" element={<Connect />} />
                  <Route path="/about" element={<About />} />
                  <Route path="/docs" element={<Docs />} />
                  <Route path="/faq" element={<FAQ />} />
                  <Route path="/support" element={<Support />} />
                  <Route path="*" element={<NotFound />} />

                  <Route element={<ProtectedRoute />}>
                    <Route path="/provider-dashboard" element={<ProviderDashboard />} />
                    <Route path="/provider-profile/:id" element={<ProviderProfile />} />
                    <Route path="/buyer-dashboard" element={<BuyerDashboard />} />
                    <Route path="/my-datasets" element={<MyDatasets />} />
                    <Route path="/my-datasets/:id/display" element={<DisplayDataset />} />
                    <Route path="/subscriptions" element={<Subscriptions />} />
                    <Route path="/upload" element={<Upload />} />
                  </Route>
                </Routes>
              </LayoutWrapper>
            </UserTypeProvider>
          </DidProvider>
        </BrowserRouter>
      </LoadingProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
