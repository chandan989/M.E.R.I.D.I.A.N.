import { Link, useLocation, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Menu, X, Wallet, LogOut } from "lucide-react";
import { useState } from "react";
import { useDid } from "../contexts/DidContext";
import { useUserType } from "../contexts/UserTypeContext";

const Navigation = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isDropdownOpen, setDropdownOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { did, setDid } = useDid();
  const { userType } = useUserType();

  const isActive = (path: string) => {
    if (path.includes('dashboard')) {
        return location.pathname.startsWith(path);
    }
    return location.pathname === path;
  }

  const handleLogout = () => {
    setDid(null);
    setDropdownOpen(false);
    navigate("/connect");
  };

  const navLinks = [
    { path: "/marketplace", label: "Marketplace" },
    ...(userType ? [{ path: userType === 'provider' ? '/provider-dashboard' : '/buyer-dashboard', label: "Dashboard" }] : []),
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
                className={`text-sm font-medium transition-colors hover:text-[#FD4102] ${
                  isActive(link.path)
                    ? "text-[#FD4102] font-bold"
                    : "text-white"
                }`}
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Actions */}
          <div className="flex items-center space-x-3">
            {did ? (
              <div className="relative">
                <Button
                  variant="secondary"
                  className="hidden md:inline-flex"
                  onClick={() => setDropdownOpen(!isDropdownOpen)}
                >
                  <Wallet className="mr-2 h-4 w-4" />
                  <span className="truncate">{did}</span>
                </Button>
                {isDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-48 rounded-md bg-white shadow-lg">
                    <Button
                      variant="ghost"
                      className="w-full justify-start text-left text-black"
                      onClick={handleLogout}
                    >
                      <LogOut className="mr-2 h-4 w-4" />
                      Logout
                    </Button>
                  </div>
                )}
              </div>
            ) : (
              <Link to="/connect">
                <Button variant="secondary" className="hidden md:inline-flex">
                  <Wallet className="mr-2 h-4 w-4" />
                  Connect Wallet
                </Button>
              </Link>
            )}

            {/* Mobile menu button */}
            <Button
              variant="ghost"
              size="icon"
              className="text-white hover:bg-red-700 md:hidden"
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
                  className={`px-2 py-2 text-sm font-medium transition-colors hover:text-red-200 ${
                    isActive(link.path)
                      ? "text-white font-bold"
                      : "text-red-100"
                  }`}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {link.label}
                </Link>
              ))}
              {did ? (
                <div className="flex items-center space-x-2 rounded-md bg-gray-800 px-3 py-2 text-sm font-medium text-white">
                  <Wallet className="h-4 w-4 text-[#FD4102]" />
                  <span className="truncate">{did}</span>
                </div>
              ) : (
                <Link to="/connect" onClick={() => setMobileMenuOpen(false)}>
                  <Button variant="secondary" className="w-full">
                    <Wallet className="mr-2 h-4 w-4" />
                    Connect Wallet
                  </Button>
                </Link>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navigation;