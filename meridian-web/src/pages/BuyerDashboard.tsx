import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router-dom";
import {
  ShoppingCart,
  Database,
  Download,
  DollarSign,
  Repeat,
  Activity,
  ArrowUpRight,
} from "lucide-react";
import { Chart } from "@/components/charts";

const BuyerDashboard = () => {
  const stats = [
    {
      title: "Datasets Purchased",
      value: "12",
      change: "+2 this month",
      icon: ShoppingCart,
      trend: "up",
    },
    {
      title: "Active Subscriptions",
      value: "5",
      change: "+1 this month",
      icon: Repeat,
      trend: "up",
    },
    {
      title: "Data Accessed (GB)",
      value: "15.2",
      change: "+3.1 GB",
      icon: Download,
      trend: "up",
    },
    {
      title: "Total Spent",
      value: "$1,850",
      change: "+$250",
      icon: DollarSign,
      trend: "up",
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

  return (
    <div className="min-h-screen bg-white">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="mb-2 text-4xl font-bold">Welcome back, DataBuyer!</h1>
          <p className="text-muted-foreground">
            Here's an overview of your data purchasing activity.
          </p>
        </div>

        {/* Quick Actions */}
        <div className="mb-8 flex flex-wrap gap-3">
          <Link to="/marketplace">
            <Button size="lg">
              <ShoppingCart className="mr-2 h-5 w-5" />
              Browse Marketplace
            </Button>
          </Link>
          <Link to="/my-datasets">
            <Button size="lg" variant="outline">
              <Database className="mr-2 h-5 w-5" />
              View My Datasets
            </Button>
          </Link>
          <Link to="/subscriptions">
            <Button size="lg" variant="outline">
              <Repeat className="mr-2 h-5 w-5" />
              Manage Subscriptions
            </Button>
          </Link>
        </div>

        {/* Stats Grid */}
        <div className="mb-8 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {stats.map((stat, index) => (
            <Card key={index}>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  {stat.title}
                </CardTitle>
                <stat.icon className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stat.value}</div>
                <div className="flex items-center text-xs text-muted-foreground">
                  <ArrowUpRight className="mr-1 h-3 w-3 text-success" />
                  <span className="text-success">{stat.change}</span>
                  <span className="ml-1">from last month</span>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="grid gap-8 lg:grid-cols-3">
          {/* Recent Activity */}
          <Card className="lg:col-span-2">
            <CardHeader>
              <CardTitle>Recent Activity</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentActivity.map((activity, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between border-b border-border pb-4 last:border-0 last:pb-0"
                  >
                    <div className="flex items-center gap-4">
                      <div
                        className={`rounded-full p-2 ${
                          activity.type === "purchase"
                            ? "bg-success/10 text-success"
                            : activity.type === "access"
                            ? "bg-primary/10 text-primary"
                            : "bg-muted"
                        }`}
                      >
                        {activity.type === "purchase" ? (
                          <ShoppingCart className="h-4 w-4" />
                        ) : activity.type === "access" ? (
                          <Download className="h-4 w-4" />
                        ) : (
                          <Activity className="h-4 w-4" />
                        )}
                      </div>
                      <div>
                        <p className="text-sm font-medium">{activity.title}</p>
                        <p className="text-xs text-muted-foreground">
                          {activity.time}
                        </p>
                      </div>
                    </div>
                    {activity.details && (
                      <Badge variant="secondary" className="font-semibold">
                        {activity.details}
                      </Badge>
                    )}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Recommended For You */}
          <Card>
            <CardHeader>
              <CardTitle>Recommended For You</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recommendedDatasets.map((dataset, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between"
                  >
                    <div>
                      <p className="font-medium">{dataset.name}</p>
                      <p className="text-sm text-muted-foreground">
                        {dataset.category} by {dataset.provider}
                      </p>
                    </div>
                    <Button variant="outline" size="sm">
                      View
                    </Button>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Data Usage Overview */}
        <div className="mt-8">
          <Chart
            chartData={dataUsage}
            title="Data Usage Overview"
            description="January - June 2024"
            footerText="Trending up by 5.2% this month"
            footerDescription="Showing data accessed for the last 6 months"
          />
        </div>
      </div>
    </div>
  );
};

export default BuyerDashboard;