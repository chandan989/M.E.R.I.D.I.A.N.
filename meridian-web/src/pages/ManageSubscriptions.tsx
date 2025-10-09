import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  ArrowLeft,
  DollarSign,
  User,
  Upload,
  Loader2,
} from "lucide-react";
import { useOne } from "@/contexts/OneContext";
import { useEffect } from "react";
import { toast } from "sonner";

const ManageSubscriptions = () => {
  const navigate = useNavigate();
  const { did, userType, isLoading } = useOne();

  useEffect(() => {
    if (!isLoading) {
      if (!did) {
        toast.error("You must be logged in to view this page.");
        navigate("/connect");
      } else if (userType === 'buyer') {
        navigate("/subscriptions");
        toast.error("You are a data buyer. Redirecting to your subscriptions.");
      }
    }
  }, [did, userType, isLoading, navigate]);

  const activeSubscriptions = [
    {
      id: "sub1",
      datasetName: "Real-time Stock Market Data",
      subscribers: 15,
      monthlyRevenue: "$750",
      status: "Active",
    },
    {
      id: "sub2",
      datasetName: "Global Temperature Forecasts",
      subscribers: 8,
      monthlyRevenue: "$960",
      status: "Active",
    },
    {
      id: "sub3",
      datasetName: "Retail Sales Predictions (US)",
      subscribers: 22,
      monthlyRevenue: "$1760",
      status: "Paused",
    },
  ];

  const StatusBadge = ({ status }: { status: string }) => {
    const baseClasses = "text-xs font-bold px-3 py-1 rounded-full";
    if (status === "Active") {
      return (
        <span className={`bg-green-100 text-green-800 ${baseClasses}`}>
          {status}
        </span>
      );
    }
    return (
      <span className={`bg-yellow-100 text-yellow-800 ${baseClasses}`}>
        {status}
      </span>
    );
  };

  if (isLoading || !did || userType !== 'provider') {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
        <p className="ml-4">Verifying authentication...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white text-gray-800 animate-fade-in relative">
      {/* Decorative Background Elements */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-[#FD4102]/5 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 -left-40 w-96 h-96 bg-[#FD4102]/5 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-40 right-1/4 w-64 h-64 bg-[#FD4102]/5 rounded-full blur-3xl"></div>
      </div>

      <div className="container mx-auto px-4 py-12 relative z-10">
        {/* Header */}
        <div className="mb-12 text-center">
          <div className="inline-block mb-4 px-4 py-2 bg-gradient-to-r from-[#FD4102]/10 to-[#FD4102]/5 rounded-full">
            <span className="text-sm font-semibold text-[#FD4102] uppercase tracking-wider">
              Provider Subscriptions
            </span>
          </div>
          <h1 className="mb-2 text-4xl md:text-5xl font-black bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 bg-clip-text text-transparent">
            Manage Your Subscriptions
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            View and manage your dataset subscriptions.
          </p>
        </div>

        {/* Quick Actions */}
        <div className="mb-12 flex flex-wrap items-center justify-center gap-4">
          <Link to="/provider-dashboard">
            <Button size="lg" variant="outline" className="h-12 text-base">
              <ArrowLeft className="mr-2 h-5 w-5" />
              Back to Dashboard
            </Button>
          </Link>
          <Link to="/upload">
            <Button
              size="lg"
              className="h-12 text-base font-bold bg-gradient-to-r from-[#FD4102] to-[#FF6B35] hover:from-[#FF6B35] hover:to-[#FD4102] shadow-lg shadow-[#FD4102]/30 hover:shadow-xl hover:shadow-[#FD4102]/40 transition-all duration-300"
            >
              <Upload className="mr-2 h-5 w-5" />
              Upload New Dataset
            </Button>
          </Link>
        </div>

        {/* Subscriptions Grid */}
        {activeSubscriptions.length > 0 ? (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {activeSubscriptions.map((sub) => (
              <Card
                key={sub.id}
                className="border-2 border-transparent shadow-lg shadow-[#FD4102]/5 hover:border-[#FD4102]/50 hover:shadow-2xl hover:shadow-[#FD4102]/10 transition-all duration-300 group flex flex-col"
              >
                <CardHeader className="flex-row items-center justify-between">
                  <CardTitle className="text-lg font-bold line-clamp-1">
                    {sub.datasetName}
                  </CardTitle>
                  <StatusBadge status={sub.status} />
                </CardHeader>
                <CardContent className="space-y-4 flex-grow">
                  <div className="text-sm text-muted-foreground flex items-center">
                    <User className="h-4 w-4 mr-2" />
                    <span>{sub.subscribers} active subscribers</span>
                  </div>
                  <div className="text-sm font-semibold flex items-center text-gray-800">
                    <DollarSign className="h-4 w-4 mr-2 text-green-500" />
                    <span>{sub.monthlyRevenue}/month</span>
                  </div>
                </CardContent>
                <div className="p-6 pt-0 flex justify-end gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    className="border-[#FD4102]/50 text-[#FD4102] hover:bg-[#FD4102]/10 hover:text-[#FD4102]"
                  >
                    View Subscribers
                  </Button>
                </div>
              </Card>
            ))}
          </div>
        ) : (
          <div className="text-center py-16 rounded-lg bg-gray-50 border-2 border-dashed">
            <h2 className="text-2xl font-bold mb-2 text-gray-800">
              No Active Subscriptions
            </h2>
            <p className="text-muted-foreground mb-6 max-w-md mx-auto">
              You have no active subscriptions to your datasets.
            </p>
            <Link to="/upload">
              <Button
                size="lg"
                className="h-12 text-base font-bold bg-gradient-to-r from-[#FD4102] to-[#FF6B35] hover:from-[#FF6B35] hover:to-[#FD4102] shadow-lg shadow-[#FD4102]/30 hover:shadow-xl hover:shadow-[#FD4102]/40 transition-all duration-300"
              >
                <Upload className="mr-2 h-5 w-5" />
                Upload a Dataset
              </Button>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default ManageSubscriptions;
