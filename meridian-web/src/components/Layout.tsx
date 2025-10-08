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
  
  // Hide Navigation and Footer on home page during initial loading
  const shouldHideNav = location.pathname === "/" && isInitialLoading;

  return (
    <div className="flex min-h-screen flex-col">
      {!shouldHideNav && <Navigation />}
      <main className="flex-1">{children}</main>
      {!shouldHideNav && <Footer />}
    </div>
  );
};

export default Layout;
