import { useLocation, Link } from "react-router-dom";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Home, Search } from "lucide-react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", location.pathname);
  }, [location.pathname]);

  return (
    <div className="flex min-h-[80vh] items-center justify-center bg-background px-4">
      <div className="text-center">
        <div className="mb-8">
          <h1 className="mb-2 text-8xl font-black text-primary">404</h1>
          <h2 className="mb-2 text-3xl font-bold">Page Not Found</h2>
          <p className="text-lg text-muted-foreground">
            The page you're looking for doesn't exist or has been moved.
          </p>
        </div>
        <div className="flex flex-col gap-3 sm:flex-row sm:justify-center">
          <Link to="/">
            <Button size="lg">
              <Home className="mr-2 h-5 w-5" />
              Back to Home
            </Button>
          </Link>
          <Link to="/marketplace">
            <Button size="lg" variant="outline">
              <Search className="mr-2 h-5 w-5" />
              Browse Marketplace
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
