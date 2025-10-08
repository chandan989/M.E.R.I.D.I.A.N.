import { Link } from "react-router-dom";
import { Database, Twitter, Github, Linkedin, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const Footer = () => {
  return (
    <footer className="border-t border-border bg-secondary/30">
      <div className="container mx-auto px-4 py-12">
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-5">
          {/* Brand */}
          <div className="lg:col-span-2">
            <Link to="/" className="flex items-center space-x-2">
              <img src="/logo.svg" alt="M.E.R.I.D.I.A.N. Logo" className="h-8 w-8" />
              <span className="text-xl font-bold">M.E.R.I.D.I.A.N.</span>
            </Link>
            <p className="mt-4 text-sm text-muted-foreground max-w-xs">
              Democratizing data ownership through Web5 technology. Your data. Your rules. Your profit.
            </p>
            <div className="mt-6 flex space-x-4">
              <Button variant="ghost" size="icon">
                <Twitter className="h-5 w-5" />
              </Button>
              <Button variant="ghost" size="icon">
                <Github className="h-5 w-5" />
              </Button>
              <Button variant="ghost" size="icon">
                <Linkedin className="h-5 w-5" />
              </Button>
            </div>
          </div>

          {/* Product */}
          <div>
            <h3 className="mb-4 text-sm font-semibold">Product</h3>
            <ul className="space-y-3 text-sm">
              <li>
                <Link to="/marketplace" className="text-muted-foreground hover:text-primary transition-colors">
                  Marketplace
                </Link>
              </li>
              <li>
                <Link to="/upload" className="text-muted-foreground hover:text-primary transition-colors">
                  Upload Data
                </Link>
              </li>
              <li>
                <Link to="/docs" className="text-muted-foreground hover:text-primary transition-colors">
                  Documentation
                </Link>
              </li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="mb-4 text-sm font-semibold">Company</h3>
            <ul className="space-y-3 text-sm">
              <li>
                <Link to="/about" className="text-muted-foreground hover:text-primary transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/support" className="text-muted-foreground hover:text-primary transition-colors">
                  Support
                </Link>
              </li>
              <li>
                <Link to="/faq" className="text-muted-foreground hover:text-primary transition-colors">
                  FAQ
                </Link>
              </li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h3 className="mb-4 text-sm font-semibold">Legal</h3>
            <ul className="space-y-3 text-sm">
              <li>
                <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                  Privacy Policy
                </a>
              </li>
              <li>
                <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                  Terms of Service
                </a>
              </li>
              <li>
                <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                  Licenses
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Newsletter */}
        <div className="mt-12 border-t border-border pt-8">
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div className="flex-1 max-w-md">
              <h3 className="text-sm font-semibold mb-2">Stay Updated</h3>
              <p className="text-sm text-muted-foreground mb-4">
                Get the latest updates on the data revolution.
              </p>
              <div className="flex gap-2">
                <Input placeholder="Enter your email" type="email" />
                <Button>
                  <Mail className="mr-2 h-4 w-4" />
                  Subscribe
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-8 border-t border-border pt-8 text-center text-sm text-muted-foreground">
          <p>© 2025 M.E.R.I.D.I.A.N. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
