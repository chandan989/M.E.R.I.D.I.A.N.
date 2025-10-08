import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Menu, X, Search, Bell, Wallet } from "lucide-react";
import { useState } from "react";

const Navigation = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path;

  const navLinks = [
    { path: "/", label: "Home" },
    { path: "/marketplace", label: "Marketplace" },
    { path: "/dashboard", label: "Dashboard" },
    { path: "/about", label: "About" },
    { path: "/docs", label: "Docs" },
  ];

  return (
    <nav className="sticky top-0 z-50 w-full bg-black text-white">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <img src="/logo.svg" alt="M.E.R.I.D.I.A.N. Logo" className="h-8 w-8" />
            <span className="text-xl font-bold tracking-tight">M.E.R.I.D.I.A.N.</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex md:items-center md:space-x-6">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`text-sm font-medium transition-colors hover:text-orange-200 ${
                  isActive(link.path)
                    ? "text-white font-bold"
                    : "text-orange-100"
                }`}
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Actions */}
          <div className="flex items-center space-x-3">
            <Button variant="ghost" size="icon" className="hidden text-white hover:bg-orange-700 md:inline-flex">
              <Search className="h-5 w-5" />
            </Button>
            <Button variant="ghost" size="icon" className="hidden text-white hover:bg-orange-700 md:inline-flex">
              <Bell className="h-5 w-5" />
            </Button>
            <Link to="/connect">
              <Button variant="secondary" className="hidden md:inline-flex">
                <Wallet className="mr-2 h-4 w-4" />
                Connect Wallet
              </Button>
            </Link>

            {/* Mobile menu button */}
            <Button
              variant="ghost"
              size="icon"
              className="text-white hover:bg-orange-700 md:hidden"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <div className="py-4 md:hidden">
            <div className="flex flex-col space-y-3">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`px-2 py-2 text-sm font-medium transition-colors hover:text-orange-200 ${
                    isActive(link.path)
                      ? "text-white font-bold"
                      : "text-orange-100"
                  }`}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {link.label}
                </Link>
              ))}
              <Link to="/connect" onClick={() => setMobileMenuOpen(false)}>
                <Button variant="secondary" className="w-full">
                  <Wallet className="mr-2 h-4 w-4" />
                  Connect Wallet
                </Button>
              </Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navigation;
