import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Chart } from "@/components/charts";
import { DollarSign, Eye, Star, Database, ArrowUpRight, Loader2 } from "lucide-react";
import { useOne } from "@/contexts/OneContext";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

const ProviderAnalytics = () => {
  const navigate = useNavigate();
  const { did, userType, isLoading } = useOne();

  useEffect(() => {
    if (!isLoading) {
      if (!did) {
        toast.error("You must be logged in to view this page.");
        navigate("/connect");
      } else if (userType === 'buyer') {
        navigate("/buyer-dashboard");
        toast.error("You must be a data provider to view analytics.");
      }
    }
  }, [did, userType, isLoading, navigate]);

  const overallStats = [
    {
      title: "Total Revenue",
      value: "$12,482",
      change: "+12.5%",
      icon: DollarSign,
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
    {
      title: "Total Datasets",
      value: "24",
      change: "+3",
      icon: Database,
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

  const viewsData = [
    { month: "Jan", desktop: 800 },
    { month: "Feb", desktop: 900 },
    { month: "Mar", desktop: 1100 },
    { month: "Apr", desktop: 1000 },
    { month: "May", desktop: 1200 },
    { month: "Jun", desktop: 1400 },
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
    {
      name: "E-commerce Customer Behavior",
      revenue: "$980",
      sales: 32,
      views: 890,
    },
  ];

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
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-[#FD4102]/5 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 -left-40 w-96 h-96 bg-[#FD4102]/3 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-40 right-1/4 w-64 h-64 bg-[#FD4102]/5 rounded-full blur-3xl"></div>
      </div>

      <div className="container mx-auto px-4 py-12 relative z-10">
        <div className="mb-12 text-center">
          <div className="inline-block mb-4 px-4 py-2 bg-gradient-to-r from-[#FD4102]/10 to-[#FD4102]/5 rounded-full">
            <span className="text-sm font-semibold text-[#FD4102] uppercase tracking-wider">
              Provider Analytics
            </span>
          </div>
          <h1 className="mb-2 text-4xl md:text-5xl font-black bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 bg-clip-text text-transparent">
            Deep Dive into Your Data
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Analyze trends, track performance, and gain insights on your datasets.
          </p>
        </div>

        {/* Overall Stats */}
        <div className="mb-12 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {overallStats.map((stat, index) => (
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

        {/* Charts */}
        <div className="grid gap-8 lg:grid-cols-2 mb-12">
          <Chart
            chartData={revenueData}
            title="Revenue Over Time"
            description="Monthly earnings from your datasets"
            footerText="Trending up by 15.2% this month"
            footerDescription="Showing revenue for the last 6 months"
          />
          <Chart
            chartData={viewsData}
            title="Dataset Views"
            description="How many times your datasets have been viewed"
            footerText="Views are up by 8.1% this month"
            footerDescription="Showing views for the last 6 months"
          />
        </div>

        {/* Top Performing Datasets */}
        <div>
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
                </CardContent>
            </Card>
        </div>
      </div>
    </div>
  );
};

export default ProviderAnalytics;
