import { useParams, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
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
} from "lucide-react";

const DatasetDetails = () => {
  const { id } = useParams();

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

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        {/* Breadcrumb */}
        <div className="mb-6 flex items-center gap-2 text-sm text-muted-foreground">
          <Link to="/marketplace" className="hover:text-primary">
            Marketplace
          </Link>
          <span>/</span>
          <span>{dataset.category}</span>
          <span>/</span>
          <span className="text-foreground">{dataset.title}</span>
        </div>

        <div className="grid gap-8 lg:grid-cols-3">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Header */}
            <div>
              <div className="mb-4 flex flex-wrap items-center gap-2">
                <Badge variant="secondary" className="text-sm">
                  {dataset.category}
                </Badge>
                <div className="flex items-center gap-1">
                  <Star className="h-4 w-4 fill-primary text-primary" />
                  <span className="font-semibold">{dataset.quality}</span>
                  <span className="text-sm text-muted-foreground">(89 reviews)</span>
                </div>
              </div>
              <h1 className="mb-4 text-4xl font-bold">{dataset.title}</h1>
              <p className="text-lg text-muted-foreground">{dataset.description}</p>
            </div>

            {/* Key Features */}
            <Card>
              <CardContent className="p-6">
                <h2 className="mb-4 text-xl font-bold">Key Features</h2>
                <div className="space-y-2">
                  {dataset.features.map((feature, index) => (
                    <div key={index} className="flex items-start gap-2">
                      <CheckCircle2 className="mt-0.5 h-5 w-5 flex-shrink-0 text-success" />
                      <span className="text-sm">{feature}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Tabs */}
            <Tabs defaultValue="overview" className="w-full">
              <TabsList className="w-full">
                <TabsTrigger value="overview" className="flex-1">
                  Overview
                </TabsTrigger>
                <TabsTrigger value="schema" className="flex-1">
                  Schema
                </TabsTrigger>
                <TabsTrigger value="reviews" className="flex-1">
                  Reviews
                </TabsTrigger>
              </TabsList>

              <TabsContent value="overview" className="mt-6 space-y-4">
                <Card>
                  <CardContent className="p-6">
                    <h3 className="mb-4 text-lg font-semibold">Dataset Statistics</h3>
                    <div className="grid gap-4 sm:grid-cols-2">
                      <div className="flex items-center gap-3">
                        <div className="rounded-lg bg-primary/10 p-2">
                          <Eye className="h-5 w-5 text-primary" />
                        </div>
                        <div>
                          <p className="text-sm text-muted-foreground">Total Views</p>
                          <p className="font-semibold">{dataset.views.toLocaleString()}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <div className="rounded-lg bg-primary/10 p-2">
                          <Database className="h-5 w-5 text-primary" />
                        </div>
                        <div>
                          <p className="text-sm text-muted-foreground">Total Sales</p>
                          <p className="font-semibold">{dataset.sales}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <div className="rounded-lg bg-primary/10 p-2">
                          <Download className="h-5 w-5 text-primary" />
                        </div>
                        <div>
                          <p className="text-sm text-muted-foreground">Data Size</p>
                          <p className="font-semibold">{dataset.dataSize}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <div className="rounded-lg bg-primary/10 p-2">
                          <Calendar className="h-5 w-5 text-primary" />
                        </div>
                        <div>
                          <p className="text-sm text-muted-foreground">Last Updated</p>
                          <p className="font-semibold">{dataset.lastUpdated}</p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="schema" className="mt-6">
                <Card>
                  <CardContent className="p-6">
                    <h3 className="mb-4 text-lg font-semibold">Data Schema</h3>
                    <div className="rounded-lg bg-muted p-4">
                      <pre className="text-sm">
                        <code>{JSON.stringify(dataset.schema, null, 2)}</code>
                      </pre>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="reviews" className="mt-6 space-y-4">
                {reviews.map((review, index) => (
                  <Card key={index}>
                    <CardContent className="p-6">
                      <div className="mb-3 flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <Avatar>
                            <AvatarFallback>
                              {review.author
                                .split(" ")
                                .map((n) => n[0])
                                .join("")}
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
                              className={`h-4 w-4 ${
                                i < Math.floor(review.rating)
                                  ? "fill-primary text-primary"
                                  : "text-muted"
                              }`}
                            />
                          ))}
                        </div>
                      </div>
                      <p className="text-sm">{review.comment}</p>
                    </CardContent>
                  </Card>
                ))}
              </TabsContent>
            </Tabs>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Purchase Card */}
            <Card className="sticky top-24">
              <CardContent className="p-6">
                <div className="mb-6 text-center">
                  <div className="mb-2 flex items-center justify-center gap-2 text-3xl font-bold">
                    <Coins className="h-8 w-8 text-primary" />
                    {dataset.price} CTC
                  </div>
                  <p className="text-sm text-muted-foreground">Full access license</p>
                </div>

                <div className="space-y-3">
                  <Button size="lg" className="w-full">
                    Purchase Now
                  </Button>
                  <Button size="lg" variant="outline" className="w-full">
                    Add to Cart
                  </Button>
                  <div className="flex gap-2">
                    <Button variant="ghost" size="icon" className="flex-1">
                      <Heart className="h-5 w-5" />
                    </Button>
                    <Button variant="ghost" size="icon" className="flex-1">
                      <Share2 className="h-5 w-5" />
                    </Button>
                  </div>
                </div>

                <div className="mt-6 space-y-3 border-t border-border pt-6">
                  <div className="flex items-center gap-2 text-sm">
                    <Shield className="h-4 w-4 text-success" />
                    <span>Secure transaction</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <CheckCircle2 className="h-4 w-4 text-success" />
                    <span>Instant access</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <Database className="h-4 w-4 text-success" />
                    <span>Lifetime updates</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Provider Info */}
            <Card>
              <CardContent className="p-6">
                <h3 className="mb-4 text-lg font-semibold">Provider Information</h3>
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
                    <span className="font-semibold">{dataset.provider.rating} ⭐</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Datasets</span>
                    <span className="font-semibold">{dataset.provider.datasets}</span>
                  </div>
                </div>
                <Button variant="outline" className="mt-4 w-full">
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
