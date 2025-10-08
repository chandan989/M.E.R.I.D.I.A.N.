import { ReactNode } from "react";
import { useLocation } from "react-router-dom";
import { useLoading } from "@/contexts/LoadingContext";
import Navigation from "./Navigation";
import Footer from "./Footer";

interface LayoutProps {
  children: ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  const location = useLocation();
  const { isInitialLoading } = useLoading();
  
  // Landing page has its own LandingPageNavigation, so exclude Navigation.tsx from it
  const isLandingPage = location.pathname === "/";
  // Hide Footer on landing page during initial loading
  const shouldHideFooter = isLandingPage && isInitialLoading;

  return (
    <div className="flex min-h-screen flex-col">
      {!isLandingPage && <Navigation />}
      <main className="flex-1">{children}</main>
      {!shouldHideFooter && <Footer />}
    </div>
  );
};

export default Layout;
