import { useParams, Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  Star,
  Eye,
  Database,
  Shield,
  Calendar,
  Download,
  Share2,
  Heart,
  Coins,
  CheckCircle2,
  Loader2,
  Wallet,
} from "lucide-react";
import { useOne } from "@/contexts/OneContext";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { useWeb3 } from "@/hooks/useWeb3";
import { useContracts } from "@/hooks/useContracts";

const DatasetDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { did, userType, isLoading } = useOne();
  const { isConnected: web3Connected, connect: connectWallet } = useWeb3();
  const { buyLicense, isLoading: contractLoading } = useContracts();
  const [purchasing, setPurchasing] = useState(false);

  useEffect(() => {
    if (!isLoading && !did) {
      toast.error("You must be logged in to view dataset details.");
      navigate("/connect");
    }
  }, [did, isLoading, navigate]);

  const dataset = {
    id: id || "1",
    title: "Global Healthcare Patient Data",
    category: "Healthcare",
    price: 250,
    quality: 4.8,
    views: 1247,
    sales: 89,
    dataSize: "2.4 GB",
    lastUpdated: "2024-01-15",
    description:
      "Comprehensive patient health records from 50+ countries, anonymized and HIPAA compliant. This dataset includes demographic information, medical histories, treatment outcomes, and longitudinal health data spanning 10 years.",
    provider: {
      name: "MedData Inc",
      did: "did:web5:meddata...xyz",
      rating: 4.9,
      datasets: 12,
    },
    features: [
      "Anonymized patient records from 50+ countries",
      "10 years of longitudinal data (2014-2024)",
      "HIPAA compliant and ethically sourced",
      "Rich demographic and socioeconomic variables",
      "Treatment outcomes and medication data",
      "Regular updates with new data quarterly",
    ],
    schema: {
      patientId: "string (anonymized)",
      age: "integer",
      gender: "string",
      country: "string",
      conditions: "array<string>",
      treatments: "array<object>",
      outcomes: "object",
    },
  };

  const reviews = [
    {
      author: "Dr. Sarah Chen",
      rating: 5,
      date: "2024-12-15",
      comment:
        "Excellent dataset with comprehensive coverage. The data quality is outstanding and has been invaluable for our research on global health disparities.",
    },
    {
      author: "Research Lab AI",
      rating: 4.5,
      date: "2024-11-28",
      comment:
        "High-quality data with good documentation. Would love to see more granular location data in future updates.",
    },
  ];
  
  const stats = [
    { title: "Total Views", value: dataset.views.toLocaleString(), icon: Eye },
    { title: "Total Sales", value: dataset.sales, icon: Database },
    { title: "Data Size", value: dataset.dataSize, icon: Download },
    { title: "Last Updated", value: dataset.lastUpdated, icon: Calendar },
];

  if (isLoading || !did) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-[#FD4102]" />
        <p className="ml-4">Verifying authentication...</p>
      </div>
    );
  }

  const isOwner = userType === 'provider' && did === dataset.provider.did;

  const handlePurchase = async () => {
    if (!web3Connected) {
      toast.error("Please connect MetaMask first");
      await connectWallet();
      return;
    }

    setPurchasing(true);
    try {
      const datasetId = `dataset-${id}`;
      await buyLicense(datasetId);
      toast.success("License purchased! You now own this dataset.");
      navigate("/buyer-dashboard");
    } catch (error) {
      console.error(error);
    } finally {
      setPurchasing(false);
    }
  };

  return (
    <div className="min-h-screen bg-white text-gray-800 animate-fade-in relative">
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
            <div className="absolute -top-40 -right-40 w-80 h-80 bg-[#FD4102]/5 rounded-full blur-3xl"></div>
            <div className="absolute top-1/2 -left-40 w-96 h-96 bg-[#FD4102]/5 rounded-full blur-3xl"></div>
            <div className="absolute -bottom-40 right-1/4 w-64 h-64 bg-[#FD4102]/5 rounded-full blur-3xl"></div>
        </div>

      <div className="container mx-auto px-4 py-8 relative z-10">
        {/* Breadcrumb */}
        <div className="mb-6 flex items-center gap-2 text-sm text-muted-foreground">
          <Link to="/marketplace" className="hover:text-[#FD4102]">
            Marketplace
          </Link>
          <span>/</span>
          <span>{dataset.category}</span>
          <span>/</span>
          <span className="text-foreground">{dataset.title}</span>
        </div>

        {/* Header */}
        <div className="mb-8">
            <div className="mb-4 flex flex-wrap items-center gap-4">
                <Badge variant="secondary" className="text-sm bg-orange-100 text-[#FD4102] border border-orange-200">
                    {dataset.category}
                </Badge>
                <div className="flex items-center gap-1 text-sm">
                    <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                    <span className="font-semibold">{dataset.quality}</span>
                    <span className="text-muted-foreground">(89 reviews)</span>
                </div>
            </div>
            <h1 className="mb-4 text-4xl md:text-5xl font-black bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 bg-clip-text text-transparent">
                {dataset.title}
            </h1>
            <p className="text-lg text-muted-foreground max-w-3xl">{dataset.description}</p>
        </div>
        
        {/* Stats Grid */}
        <div className="mb-12 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {stats.map((stat, index) => (
            <Card
              key={index}
              className="border-2 border-transparent shadow-lg shadow-[#FD4102]/5 hover:border-[#FD4102]/50 hover:shadow-2xl hover:shadow-[#FD4102]/10 transition-all duration-300 text-center group"
            >
              <CardContent className="p-6">
                <div className="inline-block p-3 bg-gradient-to-br from-[#FD4102]/20 to-[#FD4102]/10 rounded-xl mb-4">
                  <stat.icon className="h-6 w-6 text-[#FD4102]" />
                </div>
                <p className="text-sm font-medium text-muted-foreground">
                  {stat.title}
                </p>
                <div className="text-2xl font-bold my-1">{stat.value}</div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="grid gap-8 lg:grid-cols-3">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Key Features */}
            <Card className="border-2 border-gray-50 hover:border-[#FD4102]/50 hover:shadow-2xl hover:shadow-[#FD4102]/10 transition-all duration-300 group">
              <CardHeader>
                <CardTitle className="text-xl font-bold">Key Features</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {dataset.features.map((feature, index) => (
                    <div key={index} className="flex items-start gap-3">
                      <CheckCircle2 className="mt-0.5 h-5 w-5 flex-shrink-0 text-green-500" />
                      <span className="text-sm">{feature}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Tabs */}
            <Tabs defaultValue="schema" className="w-full">
              <TabsList className="w-full grid grid-cols-2">
                <TabsTrigger value="schema" className="data-[state=active]:bg-[#FD4102]/10 data-[state=active]:text-[#FD4102]">
                  Schema
                </TabsTrigger>
                <TabsTrigger value="reviews" className="data-[state=active]:bg-[#FD4102]/10 data-[state=active]:text-[#FD4102]">
                  Reviews
                </TabsTrigger>
              </TabsList>

              <TabsContent value="schema" className="mt-6">
                <Card className="border-2 border-gray-50 hover:border-[#FD4102]/50 hover:shadow-2xl hover:shadow-[#FD4102]/10 transition-all duration-300 group">
                  <CardHeader>
                    <CardTitle className="text-xl font-bold">Data Schema</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="rounded-lg bg-gray-50 p-4">
                      <pre className="text-sm">
                        <code>{JSON.stringify(dataset.schema, null, 2)}</code>
                      </pre>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="reviews" className="mt-6 space-y-4">
                {reviews.map((review, index) => (
                  <Card key={index} className="border-2 border-gray-50 hover:border-[#FD4102]/50 hover:shadow-2xl hover:shadow-[#FD4102]/10 transition-all duration-300 group">
                    <CardContent className="p-6">
                      <div className="mb-3 flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <Avatar>
                            <AvatarFallback>
                              {review.author.split(" ").map((n) => n[0]).join("")}
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <p className="font-semibold">{review.author}</p>
                            <p className="text-xs text-muted-foreground">{review.date}</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-1">
                          {Array.from({ length: 5 }).map((_, i) => (
                            <Star
                              key={i}
                              className={`h-4 w-4 ${i < Math.floor(review.rating) ? "fill-yellow-400 text-yellow-500" : "text-muted"}`}
                            />
                          ))}
                        </div>
                      </div>
                      <p className="text-sm text-muted-foreground">{review.comment}</p>
                    </CardContent>
                  </Card>
                ))}
              </TabsContent>
            </Tabs>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Purchase Card */}
            <Card className="sticky top-24 border-2 border-gray-50 shadow-lg shadow-[#FD4102]/10">
              <CardContent className="p-6">
                <div className="mb-6 text-center">
                  <div className="mb-2 flex items-center justify-center gap-2 text-3xl font-bold">
                    <Coins className="h-8 w-8 text-[#FD4102]" />
                    {dataset.price} CTC
                  </div>
                  <p className="text-sm text-muted-foreground">Full access license</p>
                </div>

                <div className="space-y-3">
                  {isOwner ? (
                    <Link to={`/my-datasets/${dataset.id}/edit`}>
                      <Button size="lg" className="w-full h-12 text-base">
                        Edit Dataset
                      </Button>
                    </Link>
                  ) : (
                    <>
                      <Button 
                        size="lg" 
                        className="h-12 w-full text-base font-bold bg-gradient-to-r from-[#FD4102] to-[#FF6B35] hover:from-[#FF6B35] hover:to-[#FD4102] shadow-lg shadow-[#FD4102]/30 hover:shadow-xl hover:shadow-[#FD4102]/40 transition-all duration-300 text-white"
                        onClick={handlePurchase}
                        disabled={purchasing || contractLoading}
                      >
                        {purchasing ? (
                          <>
                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                            Purchasing...
                          </>
                        ) : (
                          <>
                            <Wallet className="mr-2 h-4 w-4" />
                            Purchase on Blockchain
                          </>
                        )}
                      </Button>
                      <Button size="lg" variant="outline" className="w-full h-12 text-base border-[#FD4102]/50 text-[#FD4102] hover:bg-[#FD4102]/10 hover:text-[#FD4102]">
                        Add to Cart
                      </Button>
                    </>
                  )}
                  <div className="flex gap-2">
                    <Button variant="ghost" size="icon" className="flex-1 border hover:bg-gray-100">
                      <Heart className="h-5 w-5" />
                    </Button>
                    <Button variant="ghost" size="icon" className="flex-1 border hover:bg-gray-100">
                      <Share2 className="h-5 w-5" />
                    </Button>
                  </div>
                </div>

                <div className="mt-6 space-y-3 border-t border-border pt-6">
                  <div className="flex items-center gap-2 text-sm">
                    <Shield className="h-4 w-4 text-green-500" />
                    <span>Secure transaction</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <CheckCircle2 className="h-4 w-4 text-green-500" />
                    <span>Instant access</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <Database className="h-4 w-4 text-green-500" />
                    <span>Lifetime updates</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Provider Info */}
            <Card className="border-2 border-gray-50 hover:border-[#FD4102]/50 hover:shadow-2xl hover:shadow-[#FD4102]/10 transition-all duration-300 group">
              <CardHeader>
                <CardTitle className="text-xl font-bold">Provider</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center gap-3 mb-4">
                  <Avatar className="h-12 w-12">
                    <AvatarFallback>MD</AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-semibold">{dataset.provider.name}</p>
                    <p className="text-xs text-muted-foreground truncate">
                      {dataset.provider.did}
                    </p>
                  </div>
                </div>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Rating</span>
                    <span className="font-semibold flex items-center gap-1">{dataset.provider.rating} <Star className="h-4 w-4 text-yellow-400 fill-yellow-400"/></span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Datasets</span>
                    <span className="font-semibold">{dataset.provider.datasets}</span>
                  </div>
                </div>
                <Button variant="outline" className="mt-4 w-full border-[#FD4102]/50 text-[#FD4102] hover:bg-[#FD4102]/10 hover:text-[#FD4102]">
                  View Profile
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DatasetDetails;
