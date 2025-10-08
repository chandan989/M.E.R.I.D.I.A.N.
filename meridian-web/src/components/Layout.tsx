import { ReactNode } from "react";
import { useLocation } from "react-router-dom";
import Navigation from "./Navigation";
import Footer from "./Footer";

interface LayoutProps {
  children: ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  const location = useLocation();
  const isLandingPage = location.pathname === '/';

  return (
    <div className="flex min-h-screen flex-col">
      {!isLandingPage && <Navigation />}
      <main className="flex-1">{children}</main>
      <Footer />
    </div>
  );
};

export default Layout;
