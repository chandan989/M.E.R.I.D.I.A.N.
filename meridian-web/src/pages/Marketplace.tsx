import { useState, useEffect } from "react";
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
import { Search, Star, Database, Eye, Coins, Grid3x3, List, Repeat, ShoppingCart } from "lucide-react";
import { web5Service } from "@/services/web5/Web5Service";

const Marketplace = () => {
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [priceRange, setPriceRange] = useState([0, 1000]);
  const [uploadedDatasets, setUploadedDatasets] = useState<any[]>([]);

  const categories = [
    "Healthcare",
    "Agriculture",
    "Education",
    "Finance",
    "Demographics",
    "Environmental",
    "Custom",
  ];

  // Load uploaded datasets from Web5
  useEffect(() => {
    const loadDatasets = async () => {
      try {
        const datasets = await web5Service.queryDWN({ 
          schema: 'https://meridian.io/schemas/dataset' 
        });
        setUploadedDatasets(datasets);
      } catch (error) {
        console.error('Failed to load uploaded datasets:', error);
      }
    };
    loadDatasets();
  }, []);

  const mockDatasets = [
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

  // Convert uploaded datasets to marketplace format and combine with mock data
  const convertedUploadedDatasets = uploadedDatasets.map((ds, index) => ({
    id: `uploaded-${index}`,
    title: ds.title || 'Uploaded Dataset',
    category: ds.category || 'Custom',
    price: ds.price || 100,
    quality: 4.5,
    views: 0,
    sales: 0,
    description: ds.description || 'User uploaded dataset',
    provider: 'Community Provider',
    featured: true,
  }));

  const datasets = [...convertedUploadedDatasets, ...mockDatasets];

  const DatasetCard = ({ dataset, isList = false }) => (
    <Card
      className={`border-2 border-transparent shadow-lg shadow-[#FD4102]/5 hover:border-[#FD4102]/50 hover:shadow-2xl hover:shadow-[#FD4102]/10 transition-all duration-300 group ${isList ? 'flex' : ''}`}
    >
      <div className={isList ? 'w-2/3 p-6' : 'p-6'}>
        <div className="flex items-start justify-between mb-4">
          <Badge variant="outline" className="border-[#FD4102]/50 text-[#FD4102]">{dataset.category}</Badge>
          <div className="flex gap-2">
            {dataset.subscription && <Badge variant="outline" className="border-blue-500 text-blue-500">Subscription</Badge>}
            {dataset.featured && <Badge className="bg-gradient-to-r from-[#FD4102] to-[#FF6B35] text-white">Featured</Badge>}
          </div>
        </div>
        <h3 className="text-lg font-bold text-gray-800 group-hover:text-[#FD4102] transition-colors line-clamp-1">
          {dataset.title}
        </h3>
        <p className="text-sm text-muted-foreground mt-2 line-clamp-2 h-[40px]">
          {dataset.description}
        </p>
        <div className="flex items-center justify-between text-xs text-muted-foreground mt-4">
          <span className="flex items-center gap-1">
            <Star className="h-4 w-4 text-yellow-500 fill-yellow-500" />
            <span className="font-semibold text-gray-700">{dataset.quality}</span>
          </span>
          <span className="flex items-center gap-1">
            <Eye className="h-4 w-4" />
            {dataset.views}
          </span>
          <span className="flex items-center gap-1">
            <Database className="h-4 w-4" />
            {dataset.sales} sales
          </span>
        </div>
      </div>
      <div className={`p-6 flex flex-col justify-between items-center text-center ${isList ? 'w-1/3 border-l' : 'border-t'}`}>
        <div className="text-2xl font-black text-gray-800">
          {dataset.price} CTC
          {dataset.subscription && <span className="text-sm font-normal text-muted-foreground">/month</span>}
        </div>
        <Link to={`/marketplace/${dataset.id}`} className="w-full">
          <Button
            size="sm"
            className="w-full mt-4 bg-gradient-to-r from-[#FD4102] to-[#FF6B35] hover:from-[#FF6B35] hover:to-[#FD4102] shadow-lg shadow-[#FD4102]/30 hover:shadow-xl hover:shadow-[#FD4102]/40 transition-all duration-300"
          >
            {dataset.subscription ? <Repeat className="mr-2 h-4 w-4" /> : <ShoppingCart className="mr-2 h-4 w-4" />}
            View Details
          </Button>
        </Link>
      </div>
    </Card>
  );

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
              Data Marketplace
            </span>
          </div>
          <h1 className="mb-2 text-4xl md:text-5xl font-black bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 bg-clip-text text-transparent">
            Discover Premium Datasets
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Explore and acquire high-quality data from a universe of verified providers.
          </p>
        </div>

        <div className="flex flex-col gap-8 lg:flex-row">
          {/* Filters Sidebar */}
          <aside className="w-full lg:w-72 space-y-6">
            <Card className="border-2 border-gray-50 hover:border-[#FD4102]/50 hover:shadow-2xl hover:shadow-[#FD4102]/10 transition-all duration-300 group p-2">
              <CardHeader>
                <h3 className="font-bold text-xl text-gray-800">Filter & Refine</h3>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Search */}
                <div>
                  <Label className="mb-2 block text-sm font-medium">Keyword Search</Label>
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
                      <Star key={star} className="h-5 w-5 text-gray-300 fill-gray-300 cursor-pointer hover:text-yellow-400 hover:fill-yellow-400 transition-colors" />
                    ))}
                  </div>
                </div>

                <Button className="w-full border-[#FD4102]/50 text-[#FD4102] hover:bg-[#FD4102]/10 hover:text-[#FD4102]" variant="outline">
                  Reset Filters
                </Button>
              </CardContent>
            </Card>
          </aside>

          {/* Main Content */}
          <div className="flex-1">
            {/* Controls */}
            <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between rounded-lg bg-white/50 backdrop-blur-sm p-4 border border-gray-100">
              <div className="text-sm text-muted-foreground">
                Showing <span className="font-semibold text-gray-800">{datasets.length}</span> datasets
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
                <div className="flex gap-1 rounded-md p-1 bg-gray-100">
                  <Button
                    size="icon"
                    variant={viewMode === "grid" ? "default" : "ghost"}
                    onClick={() => setViewMode("grid")}
                    className={viewMode === 'grid' ? 'bg-gradient-to-r from-[#FD4102] to-[#FF6B35] text-white' : ''}
                  >
                    <Grid3x3 className="h-4 w-4" />
                  </Button>
                  <Button
                    size="icon"
                    variant={viewMode === "list" ? "default" : "ghost"}
                    onClick={() => setViewMode("list")}
                    className={viewMode === 'list' ? 'bg-gradient-to-r from-[#FD4102] to-[#FF6B35] text-white' : ''}
                  >
                    <List className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>

            {/* Datasets */}
            <div
              className={
                viewMode === "grid"
                  ? "grid gap-6 sm:grid-cols-2 xl:grid-cols-3"
                  : "space-y-4"
              }
            >
              {datasets.map((dataset) => (
                <DatasetCard key={dataset.id} dataset={dataset} isList={viewMode === 'list'} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Marketplace;