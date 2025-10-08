import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router-dom";
import {
  TrendingUp,
  Database,
  Eye,
  DollarSign,
  Upload,
  ShoppingCart,
  Activity,
  ArrowUpRight,
  Star,
} from "lucide-react";

const Dashboard = () => {
  const stats = [
    {
      title: "Total Revenue",
      value: "$12,482",
      change: "+12.5%",
      icon: DollarSign,
      trend: "up",
    },
    {
      title: "Active Datasets",
      value: "24",
      change: "+3 this month",
      icon: Database,
      trend: "up",
    },
    {
      title: "Total Views",
      value: "45.2K",
      change: "+8.1%",
      icon: Eye,
      trend: "up",
    },
    {
      title: "Avg Quality Score",
      value: "4.8",
      change: "+0.2",
      icon: Star,
      trend: "up",
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
      type: "view",
      title: "Your dataset viewed 127 times",
      time: "5 hours ago",
      amount: null,
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
      amount: null,
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

  return (
    <div className="min-h-screen bg-secondary/20">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="mb-2 text-4xl font-bold">Welcome back, DataProvider!</h1>
          <p className="text-muted-foreground">Here's what's happening with your data today.</p>
        </div>

        {/* Quick Actions */}
        <div className="mb-8 flex flex-wrap gap-3">
          <Link to="/upload">
            <Button size="lg">
              <Upload className="mr-2 h-5 w-5" />
              Upload New Dataset
            </Button>
          </Link>
          <Link to="/marketplace">
            <Button size="lg" variant="outline">
              <ShoppingCart className="mr-2 h-5 w-5" />
              Browse Marketplace
            </Button>
          </Link>
          <Link to="/analytics">
            <Button size="lg" variant="outline">
              <Activity className="mr-2 h-5 w-5" />
              View Analytics
            </Button>
          </Link>
        </div>

        {/* Stats Grid */}
        <div className="mb-8 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {stats.map((stat, index) => (
            <Card key={index}>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
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
          {/* Activity Feed */}
          <Card className="lg:col-span-2">
            <CardHeader>
              <CardTitle>Recent Activity</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentActivity.map((activity, index) => (
                  <div key={index} className="flex items-center justify-between border-b border-border pb-4 last:border-0 last:pb-0">
                    <div className="flex items-center gap-4">
                      <div className={`rounded-full p-2 ${
                        activity.type === "sale"
                          ? "bg-success/10 text-success"
                          : activity.type === "view"
                          ? "bg-primary/10 text-primary"
                          : "bg-muted"
                      }`}>
                        {activity.type === "sale" ? (
                          <DollarSign className="h-4 w-4" />
                        ) : activity.type === "view" ? (
                          <Eye className="h-4 w-4" />
                        ) : (
                          <Activity className="h-4 w-4" />
                        )}
                      </div>
                      <div>
                        <p className="text-sm font-medium">{activity.title}</p>
                        <p className="text-xs text-muted-foreground">{activity.time}</p>
                      </div>
                    </div>
                    {activity.amount && (
                      <Badge variant="secondary" className="font-semibold">
                        {activity.amount}
                      </Badge>
                    )}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Top Datasets */}
          <Card>
            <CardHeader>
              <CardTitle>Top Performing Datasets</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {topDatasets.map((dataset, index) => (
                  <div key={index} className="space-y-2">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <p className="text-sm font-medium line-clamp-1">{dataset.name}</p>
                        <div className="mt-1 flex items-center gap-3 text-xs text-muted-foreground">
                          <span className="flex items-center gap-1">
                            <DollarSign className="h-3 w-3" />
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
                    </div>
                    {index < topDatasets.length - 1 && (
                      <div className="h-px bg-border" />
                    )}
                  </div>
                ))}
              </div>
              <Button variant="outline" className="mt-4 w-full">
                View All Datasets
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Revenue Chart Placeholder */}
        <Card className="mt-8">
          <CardHeader>
            <CardTitle>Revenue Overview</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex h-64 items-center justify-center rounded-lg bg-muted">
              <div className="text-center">
                <TrendingUp className="mx-auto mb-2 h-12 w-12 text-muted-foreground" />
                <p className="text-sm text-muted-foreground">Revenue chart visualization</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;
