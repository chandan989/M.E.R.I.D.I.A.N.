import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft, Repeat, Calendar, DollarSign, Database } from "lucide-react";

const Subscriptions = () => {
  const activeSubscriptions = [
    {
      id: "sub1",
      datasetName: "Real-time Stock Market Data",
      provider: "Financial Insights Inc.",
      startDate: "2023-10-01",
      nextBillingDate: "2024-01-01",
      price: "$50/month",
      status: "Active",
    },
    {
      id: "sub2",
      datasetName: "Global Temperature Forecasts",
      provider: "Climate Data Solutions",
      startDate: "2023-09-15",
      nextBillingDate: "2024-03-15",
      price: "$120/quarter",
      status: "Active",
    },
    {
      id: "sub3",
      datasetName: "Retail Sales Predictions (US)",
      provider: "Market Analytics Co.",
      startDate: "2023-07-20",
      nextBillingDate: "2024-01-20",
      price: "$80/month",
      status: "Paused",
    },
  ];

  return (
    <div className="container mx-auto py-8 px-4">
      <div className="mb-8">
        <Link to="/buyer-dashboard">
          <Button variant="outline">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Dashboard
          </Button>
        </Link>
      </div>

      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold">My Subscriptions</h1>
        <Link to="/marketplace">
          <Button>
            <Database className="mr-2 h-4 w-4" />
            Browse Datasets
          </Button>
        </Link>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {activeSubscriptions.map((sub) => (
          <Card key={sub.id}>
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <span>{sub.datasetName}</span>
                <span
                  className={`text-sm font-medium px-2 py-1 rounded-full ${
                    sub.status === "Active"
                      ? "bg-green-100 text-green-800"
                      : "bg-yellow-100 text-yellow-800"
                  }`}
                >
                  {sub.status}
                </span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <p className="text-muted-foreground text-sm">Provider: {sub.provider}</p>
              <div className="flex items-center gap-2 text-sm">
                <Calendar className="h-4 w-4 text-muted-foreground" />
                <span>Started: {sub.startDate}</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <Repeat className="h-4 w-4 text-muted-foreground" />
                <span>Next Billing: {sub.nextBillingDate}</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <DollarSign className="h-4 w-4 text-muted-foreground" />
                <span>Price: {sub.price}</span>
              </div>
              <div className="flex justify-end gap-2 mt-4">
                <Button variant="outline" size="sm">Manage</Button>
                {sub.status === "Active" ? (
                  <Button variant="destructive" size="sm">Cancel</Button>
                ) : (
                  <Button size="sm">Activate</Button>
                )}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {activeSubscriptions.length === 0 && (
        <div className="text-center py-12">
          <h2 className="text-2xl font-semibold mb-2">No Active Subscriptions</h2>
          <p className="text-muted-foreground mb-6">Discover time-forecasting datasets in the marketplace.</p>
          <Link to="/marketplace">
            <Button size="lg">
              <Database className="mr-2 h-5 w-5" />
              Explore Marketplace
            </Button>
          </Link>
        </div>
      )}
    </div>
  );
};

export default Subscriptions;
