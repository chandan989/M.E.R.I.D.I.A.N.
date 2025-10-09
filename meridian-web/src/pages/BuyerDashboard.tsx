import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link, useNavigate } from "react-router-dom";
import {
  ShoppingCart,
  Database,
  Download,
  DollarSign,
  Repeat,
  Activity,
  ArrowUpRight,
  Loader2,
  Star,
} from "lucide-react";
import { Chart } from "@/components/charts";
import { useOne } from "@/contexts/OneContext";
import { useEffect } from "react";
import { toast } from "sonner";

const BuyerDashboard = () => {
  const navigate = useNavigate();
  const { did, userType, isLoading } = useOne();

  useEffect(() => {
    if (!isLoading) {
      if (!did) {
        toast.error("You must be logged in to view this page.");
        navigate("/connect");
      } else if (userType === 'provider') {
        navigate("/provider-dashboard");
        toast.error("You are a data provider. Redirecting to your dashboard.");
      }
    }
  }, [did, userType, isLoading, navigate]);

  // Data from original component
  const stats = [
    {
      title: "Datasets Purchased",
      value: "12",
      change: "+2 this month",
      icon: ShoppingCart,
    },
    {
      title: "Active Subscriptions",
      value: "5",
      change: "+1 this month",
      icon: Repeat,
    },
    {
      title: "Data Accessed (GB)",
      value: "15.2",
      change: "+3.1 GB",
      icon: Download,
    },
    {
      title: "Total Spent",
      value: "$1,850",
      change: "+$250",
      icon: DollarSign,
    },
  ];

  const recentActivity = [
    {
      type: "access",
      title: "Accessed 'Healthcare Patient Data'",
      time: "15 minutes ago",
      details: "2.1 GB",
    },
    {
      type: "purchase",
      title: "New dataset 'Climate Change Data' purchased",
      time: "3 hours ago",
      details: "-$380",
    },
    {
      type: "subscription",
      title: "Subscription for 'Urban Education Metrics' renewed",
      time: "1 day ago",
      details: "-$50/month",
    },
    {
      type: "recommendation",
      title: "New recommendation for you: 'Retail Customer Behavior'",
      time: "2 days ago",
      details: null,
    },
  ];

  const recommendedDatasets = [
    {
      name: "Retail Customer Behavior",
      category: "Business",
      provider: "DataCorp",
    },
    {
      name: "Real-time Stock Market Data",
      category: "Finance",
      provider: "FinanceStream",
    },
    {
      name: "Genomic Research Data",
      category: "Healthcare",
      provider: "BioGen",
    },
  ];

  const dataUsage = [
    { month: "Jan", desktop: 2.5 },
    { month: "Feb", desktop: 3.1 },
    { month: "Mar", desktop: 4.2 },
    { month: "Apr", desktop: 3.8 },
    { month: "May", desktop: 5.1 },
    { month: "Jun", desktop: 4.5 },
  ];

  const ActivityIcon = ({ type }: { type: string }) => {
    const className = "h-4 w-4 text-muted-foreground";
    switch (type) {
      case "purchase":
        return <ShoppingCart className={className} />;
      case "access":
        return <Download className={className} />;
      case "subscription":
        return <Repeat className={className} />;
      case "recommendation":
        return <Star className={className} />;
      default:
        return <Activity className={className} />;
    }
  };

  if (isLoading || !did || userType !== 'buyer') {
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
        <div className="absolute top-1/2 -left-40 w-96 h-96 bg-[#FD4102]/3 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-40 right-1/4 w-64 h-64 bg-[#FD4102]/5 rounded-full blur-3xl"></div>
      </div>

      <div className="container mx-auto px-4 py-12 relative z-10">
        {/* Header */}
        <div className="mb-12 text-center">
          <div className="inline-block mb-4 px-4 py-2 bg-gradient-to-r from-[#FD4102]/10 to-[#FD4102]/5 rounded-full">
            <span className="text-sm font-semibold text-[#FD4102] uppercase tracking-wider">
              Buyer Dashboard
            </span>
          </div>
          <h1 className="mb-2 text-4xl md:text-5xl font-black bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 bg-clip-text text-transparent">
            Welcome Back, DataBuyer!
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Here's an overview of your data purchasing activity.
          </p>
        </div>

        {/* Quick Actions */}
        <div className="mb-12 flex flex-wrap items-center justify-center gap-4">
          <Link to="/marketplace">
            <Button
              size="lg"
              className="h-12 text-base font-bold bg-gradient-to-r from-[#FD4102] to-[#FF6B35] hover:from-[#FF6B35] hover:to-[#FD4102] shadow-lg shadow-[#FD4102]/30 hover:shadow-xl hover:shadow-[#FD4102]/40 transition-all duration-300"
            >
              <ShoppingCart className="mr-2 h-5 w-5" />
              Browse Marketplace
            </Button>
          </Link>
          <Link to="/my-datasets">
            <Button size="lg" variant="outline" className="h-12 text-base">
              <Database className="mr-2 h-5 w-5" />
              View My Datasets
            </Button>
          </Link>
          <Link to="/subscriptions">
            <Button size="lg" variant="outline" className="h-12 text-base">
              <Repeat className="mr-2 h-5 w-5" />
              Manage Subscriptions
            </Button>
          </Link>
        </div>

        {/* Stats Grid */}
        <div className="mb-12 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {stats.map((stat, index) => (
            <Card
              key={index}
              className="border-2 border-transparent shadow-lg shadow-[#FD4102]/5 hover:border-[#FD4102]/50 hover:shadow-2xl hover:shadow-[#FD4102]/10 transition-all duration-300 text-center group"
            >
              <CardContent className="p-6">
                <div className="inline-block p-4 bg-gradient-to-br from-[#FD4102]/20 to-[#FD4102]/10 rounded-2xl mb-4">
                  <stat.icon className="h-8 w-8 text-[#FD4102]" />
                </div>
                <p className="text-sm font-medium text-muted-foreground">
                  {stat.title}
                </p>
                <div className="text-3xl font-bold my-1">{stat.value}</div>
                <div className="flex items-center justify-center text-xs text-muted-foreground">
                  <ArrowUpRight className="mr-1 h-4 w-4 text-green-500" />
                  <span className="text-green-500 font-semibold">
                    {stat.change}
                  </span>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="grid gap-8 lg:grid-cols-3">
          {/* Data Usage Chart */}
          <div className="lg:col-span-2">
            <Chart
              chartData={dataUsage}
              title="Data Usage Overview"
              description="January - June 2024"
              footerText="Trending up by 5.2% this month"
              footerDescription="Showing data accessed for the last 6 months"
            />
          </div>

          {/* Recent Activity */}
          <Card className="border-2 border-gray-50 hover:border-[#FD4102]/50 hover:shadow-2xl hover:shadow-[#FD4102]/10 transition-all duration-300 group">
            <CardHeader>
              <CardTitle className="text-xl font-bold">
                Recent Activity
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentActivity.map((activity, index) => (
                  <div key={index}>
                    <div className="flex justify-between items-start">
                        <p className="text-sm font-medium text-gray-800">
                            {activity.title}
                        </p>
                        {activity.details && (
                            <p className={`text-sm font-semibold ${activity.type === 'purchase' || activity.type === 'subscription' ? 'text-red-500' : 'text-gray-500'} flex-shrink-0 ml-2`}>
                                {activity.details}
                            </p>
                        )}
                    </div>
                    <div className="flex items-center text-xs text-muted-foreground mt-1">
                        <ActivityIcon type={activity.type} />
                        <p className="ml-1.5">
                            {activity.time}
                        </p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Recommended Datasets */}
        <div className="mt-12">
            <Card className="border-2 border-gray-50 hover:border-[#FD4102]/50 hover:shadow-2xl hover:shadow-[#FD4102]/10 transition-all duration-300 group">
                <CardHeader>
                <CardTitle className="text-xl font-bold">
                    Recommended For You
                </CardTitle>
                </CardHeader>
                <CardContent>
                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                    {recommendedDatasets.map((dataset, index) => (
                    <div key={index} className="p-4 rounded-lg border border-gray-100 group-hover:border-[#FD4102]/20 transition-colors">
                        <p className="font-bold text-md mb-1 line-clamp-1">
                        {dataset.name}
                        </p>
                        <p className="text-sm text-muted-foreground mb-3">
                        <span className="font-semibold text-gray-600">{dataset.category}</span> by {dataset.provider}
                        </p>
                        <Button
                            variant="outline"
                            size="sm"
                            className="w-full border-[#FD4102]/50 text-[#FD4102] hover:bg-[#FD4102]/10 hover:text-[#FD4102]"
                        >
                            View Dataset
                        </Button>
                    </div>
                    ))}
                </div>
                </CardContent>
            </Card>
        </div>
      </div>
    </div>
  );
};

export default BuyerDashboard;
