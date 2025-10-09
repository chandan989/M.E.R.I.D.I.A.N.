import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link, useNavigate } from "react-router-dom";
import {
  DollarSign,
  Upload,
  ShoppingCart,
  Activity,
  ArrowUpRight,
  Star,
  User,
  Database,
  Eye,
  Repeat,
  Loader2,
} from "lucide-react";
import { Chart } from "@/components/charts";
import { useOne } from "@/contexts/OneContext";
import { useEffect } from "react";
import { toast } from "sonner";

const ProviderDashboard = () => {
  const navigate = useNavigate();
  const { did, userType, isLoading } = useOne();

  useEffect(() => {
    if (!isLoading) {
      if (!did) {
        toast.error("You must be logged in to view this page.");
        navigate("/connect");
      } else if (userType === 'buyer') {
        navigate("/buyer-dashboard");
        toast.error("You are a data buyer. Redirecting to your dashboard.");
      }
    }
  }, [did, userType, isLoading, navigate]);

  const stats = [
    {
      title: "Total Revenue",
      value: "$12,482",
      change: "+12.5%",
      icon: DollarSign,
    },
    {
      title: "Active Datasets",
      value: "24",
      change: "+3 this month",
      icon: Database,
    },
    {
      title: "Active Subscriptions",
      value: "7",
      change: "+2 this month",
      icon: Repeat,
    },
    {
      title: "Total Views",
      value: "45.2K",
      change: "+8.1%",
      icon: Eye,
    },
    {
      title: "Avg Quality Score",
      value: "4.8",
      change: "+0.2",
      icon: Star,
    },
  ];

  const recentActivity = [
    {
      type: "sale",
      title: "Healthcare Patient Data purchased",
      time: "2 hours ago",
      amount: "+$250",
    },
    {
      type: "subscription",
      title: "New subscription to 'Real-time Financial Data'",
      time: "3 hours ago",
      amount: "+$50/month",
    },
    {
      type: "view",
      title: "Your dataset viewed 127 times",
      time: "5 hours ago",
    },
    {
      type: "sale",
      title: "Climate Change Data purchased",
      time: "1 day ago",
      amount: "+$380",
    },
    {
      type: "update",
      title: "Quality score updated to 4.9",
      time: "2 days ago",
    },
  ];

  const topDatasets = [
    {
      name: "Global Healthcare Patient Data",
      revenue: "$2,450",
      sales: 89,
      views: 1247,
    },
    {
      name: "Climate Change Impact Data",
      revenue: "$1,820",
      sales: 98,
      views: 1456,
    },
    {
      name: "Urban Education Metrics",
      revenue: "$1,340",
      sales: 45,
      views: 654,
    },
  ];

  const activeSubscriptions = [
    {
      name: "Real-time Financial Data",
      subscribers: 15,
      monthlyRevenue: "$750",
    },
    {
      name: "E-commerce Customer Behavior",
      subscribers: 8,
      monthlyRevenue: "$400",
    },
    {
      name: "Social Media Trends API",
      subscribers: 22,
      monthlyRevenue: "$1,100",
    },
  ];

  const revenueData = [
    { month: "Jan", desktop: 1200 },
    { month: "Feb", desktop: 1500 },
    { month: "Mar", desktop: 1300 },
    { month: "Apr", desktop: 1800 },
    { month: "May", desktop: 2100 },
    { month: "Jun", desktop: 2400 },
  ];

  const ActivityIcon = ({ type }: { type: string }) => {
    const className = "h-4 w-4 text-muted-foreground";
    switch (type) {
      case "sale":
        return <DollarSign className={className} />;
      case "view":
        return <Eye className={className} />;
      case "update":
        return <Star className={className} />;
      case "subscription":
        return <Repeat className={className} />;
      default:
        return <Activity className={className} />;
    }
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
        <div className="absolute top-1/2 -left-40 w-96 h-96 bg-[#FD4102]/3 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-40 right-1/4 w-64 h-64 bg-[#FD4102]/5 rounded-full blur-3xl"></div>
      </div>

      <div className="container mx-auto px-4 py-12 relative z-10">
        {/* Header */}
        <div className="mb-12 text-center">
          <div className="inline-block mb-4 px-4 py-2 bg-gradient-to-r from-[#FD4102]/10 to-[#FD4102]/5 rounded-full">
            <span className="text-sm font-semibold text-[#FD4102] uppercase tracking-wider">
              Provider Dashboard
            </span>
          </div>
          <h1 className="mb-2 text-4xl md:text-5xl font-black bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 bg-clip-text text-transparent">
            Welcome Back, DataProvider!
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Here's a summary of your data's performance and earnings.
          </p>
        </div>

        {/* Quick Actions */}
        <div className="mb-12 flex flex-wrap items-center justify-center gap-4">
          <Link to="/upload">
            <Button
              size="lg"
              className="h-12 text-base font-bold bg-gradient-to-r from-[#FD4102] to-[#FF6B35] hover:from-[#FF6B35] hover:to-[#FD4102] shadow-lg shadow-[#FD4102]/30 hover:shadow-xl hover:shadow-[#FD4102]/40 transition-all duration-300"
            >
              <Upload className="mr-2 h-5 w-5" />
              Upload New Dataset
            </Button>
          </Link>
          <Link to="/manage-subscriptions">
            <Button size="lg" variant="outline" className="h-12 text-base">
              <Repeat className="mr-2 h-5 w-5" />
              Manage Subscriptions
            </Button>
          </Link>
          <Link to="/analytics">
            <Button size="lg" variant="outline" className="h-12 text-base">
              <Activity className="mr-2 h-5 w-5" />
              View Analytics
            </Button>
          </Link>
          <Link to="/provider-profile/1">
            <Button size="lg" variant="outline" className="h-12 text-base">
              <User className="mr-2 h-5 w-5" />
              View Profile
            </Button>
          </Link>
        </div>

        {/* Stats Grid */}
        <div className="mb-12 grid gap-6 md:grid-cols-2 lg:grid-cols-5">
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
                  <span className="ml-1">from last month</span>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="grid gap-8 lg:grid-cols-3 ">
          {/* Revenue Chart */}
          <div className="lg:col-span-2 ">
            <Chart
              chartData={revenueData}
              title="Revenue Overview"
              description="January - June 2024"
              footerText="Trending up by 15.2% this month"
              footerDescription="Showing revenue for the last 6 months"
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
                        {activity.amount && (
                            <p className="text-sm font-semibold text-green-500 flex-shrink-0 ml-2">
                                {activity.amount}
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

        <div className="grid gap-8 lg:grid-cols-2 mt-12">
            {/* Top Performing Datasets */}
            <Card className="border-2 border-gray-50 hover:border-[#FD4102]/50 hover:shadow-2xl hover:shadow-[#FD4102]/10 transition-all duration-300 group">
                <CardHeader>
                <CardTitle className="text-xl font-bold">
                    Top Performing Datasets
                </CardTitle>
                </CardHeader>
                <CardContent>
                <div className="space-y-6">
                    {topDatasets.map((dataset, index) => (
                    <div key={index}>
                        <p className="text-sm font-bold line-clamp-1 mb-2">
                        {dataset.name}
                        </p>
                        <div className="flex items-center justify-between text-xs text-muted-foreground">
                        <span className="flex items-center gap-1 font-semibold">
                            <DollarSign className="h-4 w-4 text-green-500" />
                            {dataset.revenue}
                        </span>
                        <span className="flex items-center gap-1">
                            <Database className="h-3 w-3" />
                            {dataset.sales} sales
                        </span>
                        <span className="flex items-center gap-1">
                            <Eye className="h-3 w-3" />
                            {dataset.views}
                        </span>
                        </div>
                    </div>
                    ))}
                </div>
                <Link to="/my-datasets" className="w-full">
                    <Button
                    variant="outline"
                    className="mt-6 w-full border-[#FD4102]/50 text-[#FD4102] hover:bg-[#FD4102]/10 hover:text-[#FD4102]"
                    >
                    View All Datasets
                    </Button>
                </Link>
                </CardContent>
            </Card>

            {/* Active Subscriptions */}
            <Card className="border-2 border-gray-50 hover:border-[#FD4102]/50 hover:shadow-2xl hover:shadow-[#FD4102]/10 transition-all duration-300 group">
                <CardHeader>
                <CardTitle className="text-xl font-bold">
                    Active Subscriptions
                </CardTitle>
                </CardHeader>
                <CardContent>
                <div className="space-y-6">
                    {activeSubscriptions.map((sub, index) => (
                    <div key={index}>
                        <p className="text-sm font-bold line-clamp-1 mb-2">
                        {sub.name}
                        </p>
                        <div className="flex items-center justify-between text-xs text-muted-foreground">
                        <span className="flex items-center gap-1 font-semibold">
                            <DollarSign className="h-4 w-4 text-green-500" />
                            {sub.monthlyRevenue}/month
                        </span>
                        <span className="flex items-center gap-1">
                            <User className="h-3 w-3" />
                            {sub.subscribers} subscribers
                        </span>
                        </div>
                    </div>
                    ))}
                </div>
                <Link to="/subscriptions" className="w-full">
                    <Button
                    variant="outline"
                    className="mt-6 w-full border-[#FD4102]/50 text-[#FD4102] hover:bg-[#FD4102]/10 hover:text-[#FD4102]"
                    >
                    Manage All Subscriptions
                    </Button>
                </Link>
                </CardContent>
            </Card>
        </div>
      </div>
    </div>
  );
};

export default ProviderDashboard;
