import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { PlusCircle, Download, Eye, Edit, Loader2 } from "lucide-react";
import { useOne } from "../contexts/OneContext";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { web5Service } from "@/services/web5";
import SystemStatus from "@/components/SystemStatus";

const MyDatasets = () => {
  const navigate = useNavigate();
  const { did, userType, isLoading } = useOne();
  const [uploadedDatasets, setUploadedDatasets] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  
  // Load uploaded datasets
  useEffect(() => {
    if (did) {
      loadDatasets();
    }
  }, [did]);
  
  const loadDatasets = async () => {
    try {
      const datasets = await web5Service.queryDWN({ 
        schema: 'https://meridian.io/schemas/dataset' 
      });
      setUploadedDatasets(datasets);
    } catch (error) {
      console.error('Failed to load datasets:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!isLoading && !did) {
      toast.error("You must be logged in to view your datasets.");
      navigate("/connect");
    }
  }, [did, isLoading, navigate]);

  const providerDatasets = [
    {
      id: "1",
      name: "Global Weather Patterns 2000-2023",
      description: "A comprehensive dataset of global weather patterns, temperatures, and precipitation.",
      tags: ["Climate", "Weather", "Global"],
      status: "Published",
      price: "$500",
      views: 1247,
      sales: 89,
    },
    {
      id: "2",
      name: "US Consumer Spending Habits Q1 2024",
      description: "Detailed analysis of consumer spending across various sectors in the United States.",
      tags: ["Economics", "Finance", "USA"],
      status: "Draft",
      price: "$250",
      views: 345,
      sales: 23,
    },
  ];

  const buyerDatasets = [
    {
      id: "3",
      name: "AI Training Data for Image Recognition",
      description: "A large-scale dataset of labeled images for training computer vision models.",
      tags: ["AI", "Machine Learning", "CV"],
      accessType: "Purchased",
    },
    {
      id: "4",
      name: "Real-time Stock Market Data Feed",
      description: "Live feed of stock market data from major global exchanges.",
      tags: ["Finance", "Stocks", "Real-time"],
      accessType: "Subscription",
    },
  ];

  const isProvider = userType === 'provider';
  const datasets = isProvider ? providerDatasets : buyerDatasets;
  
  // Combine uploaded datasets with mock data for display
  const allDatasets = isProvider 
    ? [...uploadedDatasets, ...datasets] 
    : datasets;

  const StatusBadge = ({ status }: { status: string }) => (
    <span
      className={`text-xs font-semibold px-3 py-1 rounded-full ${
        status === "Published"
          ? "bg-green-100 text-green-800"
          : "bg-yellow-100 text-yellow-800"
      }`}
    >
      {status}
    </span>
  );

  const AccessBadge = ({ accessType }: { accessType: string }) => (
    <span className="text-xs font-semibold px-3 py-1 rounded-full bg-blue-100 text-blue-800">
      {accessType}
    </span>
  );

  if (isLoading || !did) {
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
      </div>

      <div className="container mx-auto px-4 py-12 relative z-10">
        {/* Header */}
        <div className="flex flex-col md:flex-row items-center justify-between mb-12">
          <div className="text-center md:text-left mb-6 md:mb-0">
            <h1 className="text-4xl md:text-5xl font-black bg-gradient-to-r from-gray-900 to-gray-800 bg-clip-text text-transparent">
              {isProvider ? "My Datasets" : "My Acquired Datasets"}
            </h1>
            <p className="text-lg text-muted-foreground mt-2">
              {isProvider
                ? "Manage, update, and track your data contributions."
                : "Access and download your purchased datasets."
              }
            </p>
          </div>
          {isProvider && (
            <Link to="/upload">
              <Button
                size="lg"
                className="h-12 text-base font-bold bg-gradient-to-r from-[#FD4102] to-[#FF6B35] hover:from-[#FF6B35] hover:to-[#FD4102] shadow-lg shadow-[#FD4102]/30 hover:shadow-xl hover:shadow-[#FD4102]/40 transition-all duration-300"
              >
                <PlusCircle className="mr-2 h-5 w-5" />
                Upload New Dataset
              </Button>
            </Link>
          )}
        </div>

        {/* System Status */}
        <div className="mb-8">
          <SystemStatus />
        </div>

        {/* Uploaded Datasets Indicator */}
        {uploadedDatasets.length > 0 && (
          <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg">
            <p className="text-green-800 font-medium">
              ✅ {uploadedDatasets.length} dataset(s) uploaded to {web5Service.isMockMode() ? 'localStorage' : 'YOUR DWN server'}
            </p>
          </div>
        )}

        {/* Datasets Grid */}
        <div className="grid gap-8 md:grid-cols-2">
          {allDatasets.map((dataset) => (
            <Card
              key={dataset.id}
              className="border-2 border-transparent shadow-lg shadow-[#FD4102]/5 hover:border-[#FD4102]/50 hover:shadow-2xl hover:shadow-[#FD4102]/10 transition-all duration-300 group flex flex-col"
            >
              <CardHeader>
                <div className="flex items-start justify-between">
                  <CardTitle className="text-xl font-bold group-hover:text-[#FD4102] transition-colors duration-300">
                    {dataset.name}
                  </CardTitle>
                  {isProvider ? (
                    <StatusBadge status={dataset.status!} />
                  ) : (
                    <AccessBadge accessType={dataset.accessType!} />
                  )}
                </div>
              </CardHeader>
              <CardContent className="flex-grow flex flex-col">
                <p className="text-muted-foreground mb-4 flex-grow">
                  {dataset.description}
                </p>
                <div className="flex flex-wrap gap-2 mb-6">
                  {dataset.tags.map((tag) => (
                    <span
                      key={tag}
                      className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded-full"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                {isProvider && (
                  <div className="flex items-center justify-between text-sm text-muted-foreground mb-6 border-t border-b py-4">
                    <div className="font-bold text-lg text-gray-800">{dataset.price}</div>
                    <div className="flex items-center gap-4">
                      <span className="flex items-center gap-1">
                        <Eye className="h-4 w-4" /> {dataset.views} views
                      </span>
                      <span className="flex items-center gap-1">
                        <Download className="h-4 w-4" /> {dataset.sales} sales
                      </span>
                    </div>
                  </div>
                )}

                <div className="flex justify-end gap-3">
                  <Link to={`/marketplace/${dataset.id}`}>
                    <Button variant="outline" className="border-[#FD4102]/50 text-[#FD4102] hover:bg-[#FD4102]/10 hover:text-[#FD4102]">
                      <Eye className="mr-2 h-4 w-4" /> View Details
                    </Button>
                  </Link>
                  {isProvider ? (
                    <Link to={`/my-datasets/${dataset.id}/edit`}>
                      <Button className="bg-gray-800 hover:bg-gray-900 text-white">
                        <Edit className="mr-2 h-4 w-4" /> Edit
                      </Button>
                    </Link>
                  ) : (
                    <Button className="bg-gradient-to-r from-[#FD4102] to-[#FF6B35] text-white">
                      <Download className="mr-2 h-4 w-4" /> Access Data
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MyDatasets;
