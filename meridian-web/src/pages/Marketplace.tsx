import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Slider } from "@/components/ui/slider";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Search, Star, Database, Eye, Coins, Grid3x3, List, Repeat } from "lucide-react";

const Marketplace = () => {
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [priceRange, setPriceRange] = useState([0, 1000]);

  const categories = [
    "Healthcare",
    "Agriculture",
    "Education",
    "Finance",
    "Demographics",
    "Environmental",
    "Custom",
  ];

  const datasets = [
    {
      id: 1,
      title: "Global Healthcare Patient Data",
      category: "Healthcare",
      price: 250,
      quality: 4.8,
      views: 1247,
      sales: 89,
      description: "Comprehensive patient health records from 50+ countries, anonymized and HIPAA compliant.",
      provider: "MedData Inc",
      featured: true,
    },
    {
      id: 2,
      title: "Sustainable Farming Practices",
      category: "Agriculture",
      price: 180,
      quality: 4.9,
      views: 892,
      sales: 64,
      description: "Crop yield data with environmental impact metrics from organic farms worldwide.",
      provider: "AgriTech Solutions",
      featured: true,
    },
    {
      id: 3,
      title: "Urban Education Metrics 2024",
      category: "Education",
      price: 320,
      quality: 4.7,
      views: 654,
      sales: 45,
      description: "Student performance data across 200+ urban school districts with demographic breakdowns.",
      provider: "EduAnalytics",
      featured: false,
    },
    {
      id: 4,
      title: "Real-time Stock Market Data",
      category: "Finance",
      price: 50,
      quality: 4.9,
      views: 1089,
      sales: 112,
      description: "Live feed of stock market data from major exchanges.",
      provider: "FinInclude",
      featured: false,
      subscription: true,
    },
    {
      id: 5,
      title: "Climate Change Impact Data",
      category: "Environmental",
      price: 380,
      quality: 4.8,
      views: 1456,
      sales: 98,
      description: "Temperature, rainfall, and ecosystem changes across major climate zones (2000-2024).",
      provider: "EcoWatch Global",
      featured: true,
    },
    {
      id: 6,
      title: "Consumer Behavior Insights",
      category: "Demographics",
      price: 290,
      quality: 4.6,
      views: 823,
      sales: 67,
      description: "Anonymous purchasing patterns and preferences from diverse demographic groups.",
      provider: "ConsumerLens",
      featured: false,
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="mb-2 text-4xl font-bold">Discover Datasets</h1>
          <p className="text-muted-foreground">Browse and purchase high-quality data from verified providers</p>
        </div>

        <div className="flex flex-col gap-8 lg:flex-row">
          {/* Filters Sidebar */}
          <aside className="w-full lg:w-64 space-y-6">
            <Card>
              <CardHeader>
                <h3 className="font-semibold">Filters</h3>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Search */}
                <div>
                  <Label className="mb-2 block text-sm font-medium">Search</Label>
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                    <Input placeholder="Search datasets..." className="pl-9" />
                  </div>
                </div>

                {/* Categories */}
                <div>
                  <Label className="mb-3 block text-sm font-medium">Categories</Label>
                  <div className="space-y-2">
                    {categories.map((category) => (
                      <div key={category} className="flex items-center space-x-2">
                        <Checkbox id={category} />
                        <label
                          htmlFor={category}
                          className="text-sm leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                        >
                          {category}
                        </label>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Price Range */}
                <div>
                  <Label className="mb-3 block text-sm font-medium">
                    Price Range: ${priceRange[0]} - ${priceRange[1]}
                  </Label>
                  <Slider
                    min={0}
                    max={1000}
                    step={10}
                    value={priceRange}
                    onValueChange={setPriceRange}
                    className="mb-2"
                  />
                </div>

                {/* Quality Score */}
                <div>
                  <Label className="mb-3 block text-sm font-medium">Minimum Quality</Label>
                  <div className="flex items-center space-x-1">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Star key={star} className="h-5 w-5 fill-primary text-primary" />
                    ))}
                  </div>
                </div>

                <Button className="w-full" variant="outline">
                  Reset Filters
                </Button>
              </CardContent>
            </Card>
          </aside>

          {/* Main Content */}
          <div className="flex-1">
            {/* Controls */}
            <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div className="text-sm text-muted-foreground">
                Showing <span className="font-semibold">{datasets.length}</span> datasets
              </div>
              <div className="flex items-center gap-3">
                <Select defaultValue="newest">
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Sort by" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="newest">Newest First</SelectItem>
                    <SelectItem value="price-low">Price: Low to High</SelectItem>
                    <SelectItem value="price-high">Price: High to Low</SelectItem>
                    <SelectItem value="popular">Most Popular</SelectItem>
                    <SelectItem value="rated">Highest Rated</SelectItem>
                  </SelectContent>
                </Select>
                <div className="flex gap-1">
                  <Button
                    size="icon"
                    variant={viewMode === "grid" ? "default" : "outline"}
                    onClick={() => setViewMode("grid")}
                  >
                    <Grid3x3 className="h-4 w-4" />
                  </Button>
                  <Button
                    size="icon"
                    variant={viewMode === "list" ? "default" : "outline"}
                    onClick={() => setViewMode("list")}
                  >
                    <List className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>

            {/* Featured Section */}
            <div className="mb-8">
              <h2 className="mb-4 text-2xl font-bold">Featured Datasets</h2>
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {datasets
                  .filter((d) => d.featured)
                  .slice(0, 3)
                  .map((dataset) => (
                    <Card key={dataset.id} className="group hover:shadow-lg transition-shadow">
                      <CardHeader>
                        <div className="mb-2 flex items-start justify-between">
                          <Badge variant="secondary">{dataset.category}</Badge>
                          <Badge className="bg-primary">Featured</Badge>
                        </div>
                        <h3 className="text-lg font-semibold group-hover:text-primary transition-colors">
                          {dataset.title}
                        </h3>
                      </CardHeader>
                      <CardContent>
                        <p className="mb-4 text-sm text-muted-foreground line-clamp-2">
                          {dataset.description}
                        </p>
                        <div className="flex items-center justify-between text-sm">
                          <div className="flex items-center gap-1">
                            <Star className="h-4 w-4 fill-primary text-primary" />
                            <span className="font-semibold">{dataset.quality}</span>
                          </div>
                          <div className="flex items-center gap-3 text-muted-foreground">
                            <span className="flex items-center gap-1">
                              <Eye className="h-4 w-4" />
                              {dataset.views}
                            </span>
                            <span className="flex items-center gap-1">
                              <Database className="h-4 w-4" />
                              {dataset.sales}
                            </span>
                          </div>
                        </div>
                      </CardContent>
                      <CardFooter className="flex items-center justify-between">
                        <div className="flex items-center gap-1 text-lg font-bold">
                          {dataset.subscription ? (
                            <Repeat className="h-5 w-5 text-primary" />
                          ) : (
                            <Coins className="h-5 w-5 text-primary" />
                          )}
                          {dataset.price} CTC {dataset.subscription ? "/month" : ""}
                        </div>
                        <Link to={`/marketplace/${dataset.id}`}>
                          <Button>View Details</Button>
                        </Link>
                      </CardFooter>
                    </Card>
                  ))}
              </div>
            </div>

            {/* All Datasets */}
            <div>
              <h2 className="mb-4 text-2xl font-bold">All Datasets</h2>
              <div
                className={
                  viewMode === "grid"
                    ? "grid gap-4 sm:grid-cols-2 lg:grid-cols-3"
                    : "space-y-4"
                }
              >
                {datasets.map((dataset) => (
                  <Card key={dataset.id} className="group hover:shadow-lg transition-shadow">
                    <CardHeader>
                      <div className="mb-2 flex items-start justify-between">
                        <Badge variant="secondary">{dataset.category}</Badge>
                        <div className="flex gap-2">
                          {dataset.subscription && <Badge variant="outline" className="border-blue-500 text-blue-500">Subscription</Badge>}
                          {dataset.featured && <Badge className="bg-primary">Featured</Badge>}
                        </div>
                      </div>
                      <h3 className="text-lg font-semibold group-hover:text-primary transition-colors">
                        {dataset.title}
                      </h3>
                    </CardHeader>
                    <CardContent>
                      <p className="mb-4 text-sm text-muted-foreground line-clamp-2">
                        {dataset.description}
                      </p>
                      <div className="flex items-center justify-between text-sm">
                        <div className="flex items-center gap-1">
                          <Star className="h-4 w-4 fill-primary text-primary" />
                          <span className="font-semibold">{dataset.quality}</span>
                        </div>
                        <div className="flex items-center gap-3 text-muted-foreground">
                          <span className="flex items-center gap-1">
                            <Eye className="h-4 w-4" />
                            {dataset.views}
                          </span>
                          <span className="flex items-center gap-1">
                            <Database className="h-4 w-4" />
                            {dataset.sales}
                          </span>
                        </div>
                      </div>
                    </CardContent>
                    <CardFooter className="flex items-center justify-between">
                      <div className="flex items-center gap-1 text-lg font-bold">
                        {dataset.subscription ? (
                          <Repeat className="h-5 w-5 text-primary" />
                        ) : (
                          <Coins className="h-5 w-5 text-primary" />
                        )}
                        {dataset.price} CTC {dataset.subscription ? "/month" : ""}
                      </div>
                      <Link to={`/marketplace/${dataset.id}`}>
                        <Button>View Details</Button>
                      </Link>
                    </CardFooter>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Marketplace;
