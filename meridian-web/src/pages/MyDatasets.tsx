import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { PlusCircle, Download } from "lucide-react";
import { useUserType } from "../contexts/UserTypeContext";

const MyDatasets = () => {
  const { userType } = useUserType();

  // Mock data for provider's datasets
  const providerDatasets = [
    {
      id: "1",
      name: "Global Weather Patterns",
      description: "A comprehensive dataset of global weather patterns from 2000-2023.",
      tags: ["Climate", "Weather", "Global"],
      status: "Published",
    },
    {
      id: "2",
      name: "US Consumer Spending Habits",
      description: "Detailed analysis of consumer spending across various sectors in the US.",
      tags: ["Economics", "Finance", "USA"],
      status: "Draft",
    },
  ];

  // Mock data for buyer's acquired datasets
  const buyerDatasets = [
    {
      id: "3",
      name: "AI Training Data for Image Recognition",
      description: "A large-scale dataset of labeled images for training computer vision models.",
      tags: ["AI", "Machine Learning", "Computer Vision"],
      accessType: "Purchased",
    },
    {
      id: "4",
      name: "Real-time Stock Market Data",
      description: "Live feed of stock market data from major exchanges.",
      tags: ["Finance", "Stocks", "Real-time"],
      accessType: "Subscription",
    },
  ];

  const isProvider = userType === 'provider';
  const datasets = isProvider ? providerDatasets : buyerDatasets;

  return (
    <div className="container mx-auto py-8 px-4">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold">
          {isProvider ? "My Datasets" : "My Acquired Datasets"}
        </h1>
        {isProvider && (
          <Link to="/upload">
            <Button>
              <PlusCircle className="mr-2 h-4 w-4" />
              Upload New Dataset
            </Button>
          </Link>
        )}
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {datasets.map((dataset) => (
          <Card key={dataset.id}>
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <span>{dataset.name}</span>
                <span
                  className={`text-sm font-medium px-2 py-1 rounded-full ${
                    isProvider
                      ? dataset.status === "Published"
                        ? "bg-green-100 text-green-800"
                        : "bg-yellow-100 text-yellow-800"
                      : "bg-blue-100 text-blue-800"
                  }`}
                >
                  {isProvider ? dataset.status : dataset.accessType}
                </span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground mb-4">{dataset.description}</p>
              <div className="flex flex-wrap gap-2 mb-4">
                {dataset.tags.map((tag) => (
                  <span key={tag} className="text-xs bg-muted text-muted-foreground px-2 py-1 rounded-full">
                    {tag}
                  </span>
                ))}
              </div>
              <div className="flex justify-end gap-2">
                <Link to={`/marketplace/${dataset.id}`}>
                  <Button variant="outline" size="sm">View Details</Button>
                </Link>
                <Link to={`/my-datasets/${dataset.id}/display`}>
                  <Button variant="secondary" size="sm">
                    {isProvider ? (
                      <>Display</>
                    ) : (
                      <><Download className="mr-2 h-4 w-4" />Access Data</>
                    )}
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default MyDatasets;
