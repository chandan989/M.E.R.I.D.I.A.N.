import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Shield,
  Coins,
  Lock,
  Share2,
  TrendingUp,
  Users,
  Database,
  Zap,
  CheckCircle2,
  ArrowRight,
} from "lucide-react";
import { Suspense, lazy, useEffect } from "react";
import { useLoading } from "@/contexts/LoadingContext";
import Loading from "@/components/ui/loading";
import LandingPageNavigation from "@/components/LandingPageNavigation";

const HeroFuturistic = lazy(() => import("@/components/ui/hero-futuristic"));

// Wrapper component that signals when HeroFuturistic has loaded
const HeroWithLoadingComplete = () => {
  const { setIsInitialLoading } = useLoading();

  useEffect(() => {
    // This runs after the lazy component has loaded and mounted
    setIsInitialLoading(false);
  }, [setIsInitialLoading]);

  return <HeroFuturistic />;
};

const Landing = () => {
  const { isInitialLoading, setIsInitialLoading } = useLoading();

  useEffect(() => {
    // Reset loading state to true when navigating back to home
    return () => {
      setIsInitialLoading(true);
    };
  }, [setIsInitialLoading]);
  const features = [
    {
      icon: Shield,
      title: "Self-Sovereign Identity",
      description: "Complete control over your data with Web5 DIDs. No intermediaries, no data brokers.",
    },
    {
      icon: Coins,
      title: "Data-as-NFT",
      description: "Your datasets become tradeable NFTs with built-in royalties and fractional ownership.",
    },
    {
      icon: Lock,
      title: "Privacy-First AI",
      description: "AI analysis with temporary, revocable permissions. Your data never leaves your control.",
    },
    {
      icon: Share2,
      title: "Fractional Ownership",
      description: "Buy and sell partial data rights. Make data accessible at any price point.",
    },
    {
      icon: TrendingUp,
      title: "Direct Monetization",
      description: "Set your own prices. Earn directly from data buyers without platform fees.",
    },
    {
      icon: Users,
      title: "Bias Elimination",
      description: "Diverse, representative data leads to fairer AI models that work for everyone.",
    },
  ];

  const stats = [
    { value: "$100B+", label: "Data Market Opportunity" },
    { value: "10K+", label: "Datasets Listed" },
    { value: "50K+", label: "Data Providers" },
    { value: "98%", label: "User Satisfaction" },
  ];

  const steps = [
    {
      number: "01",
      title: "Connect with Web5",
      description: "Create your decentralized identity in seconds. True self-sovereignty starts here.",
    },
    {
      number: "02",
      title: "Upload Your Data",
      description: "Securely upload datasets to your personal Decentralized Web Node (DWN).",
    },
    {
      number: "03",
      title: "AI Quality Check",
      description: "Grant temporary AI access for quality scoring, pricing suggestions, and metadata.",
    },
    {
      number: "04",
      title: "Mint & List",
      description: "Transform your data into an NFT, set your price, and list in the marketplace.",
    },
  ];

  return (
    <div className="bg-white text-gray-800 animate-fade-in relative">
      {/* Decorative Background Elements */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-[#FD4102]/5 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 -left-40 w-96 h-96 bg-[#FD4102]/3 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-40 right-1/4 w-64 h-64 bg-[#FD4102]/5 rounded-full blur-3xl"></div>
      </div>

      {!isInitialLoading && <LandingPageNavigation />}
      {/* Hero Section */}
      <section id="home" className="relative z-10">
        <Suspense fallback={<Loading />}>
          <HeroWithLoadingComplete />
        </Suspense>
      </section>

      {/* Only show sections after loading completes */}
      {!isInitialLoading && (
        <div className="relative z-10">
          {/* Problem Statement */}
          <section id="problem" className="py-16 md:py-24">
            <div className="container mx-auto px-4">
              <div className="mx-auto max-w-3xl text-center mb-16">
                <div className="inline-block mb-4 px-4 py-2 bg-gradient-to-r from-[#FD4102]/10 to-[#FD4102]/5 rounded-full">
                  <span className="text-sm font-semibold text-[#FD4102] uppercase tracking-wider">The Core Problem</span>
                </div>
                <h2 className="mb-4 text-4xl md:text-5xl font-black bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 bg-clip-text text-transparent">
                  Broken Data, Biased AI
                </h2>
                <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                  Today's digital world is built on a flawed foundation of data exploitation and algorithmic bias.
                </p>
              </div>
              <div className="grid gap-8 md:grid-cols-2">
                <Card className="animate-fade-in border-2 shadow-2xl shadow-[#FD4102]/10 hover:shadow-[#FD4102]/20 transition-all duration-300">
                  <CardHeader className="pb-4">
                    <div className="flex items-center gap-4">
                      <div className="p-4 bg-gradient-to-br from-[#FD4102]/20 to-[#FD4102]/10 rounded-2xl">
                        <Zap className="h-8 w-8 text-[#FD4102]" />
                      </div>
                      <div>
                        <CardTitle className="text-2xl font-bold">The AI Bias Crisis</CardTitle>
                        <p className="text-sm text-muted-foreground mt-1">
                          Algorithms that perpetuate inequality
                        </p>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">
                      Underrepresented communities are excluded from AI training data, leading to discriminatory
                      outcomes in healthcare, finance, and criminal justice systems. This isn't a bug; it's a feature of the current system.
                    </p>
                  </CardContent>
                </Card>
                <Card className="animate-fade-in border-2 shadow-2xl shadow-[#FD4102]/10 hover:shadow-[#FD4102]/20 transition-all duration-300">
                  <CardHeader className="pb-4">
                    <div className="flex items-center gap-4">
                      <div className="p-4 bg-gradient-to-br from-[#FD4102]/20 to-[#FD4102]/10 rounded-2xl">
                        <Database className="h-8 w-8 text-[#FD4102]" />
                      </div>
                      <div>
                        <CardTitle className="text-2xl font-bold">Your Data, Their Profits</CardTitle>
                        <p className="text-sm text-muted-foreground mt-1">
                          You are the product
                        </p>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">
                      Tech giants profit billions from your data while you get nothing. No control, no
                      compensation, no transparency. Your personal information is traded in a multi-billion dollar industry without your consent.
                    </p>
                  </CardContent>
                </Card>
              </div>
            </div>
          </section>

          {/* Solution Overview */}
          <section id="solution" className="py-16 md:py-24 bg-gray-50/50">
            <div className="container mx-auto px-4">
              <div className="mx-auto max-w-3xl text-center mb-16">
                <div className="inline-block mb-4 px-4 py-2 bg-gradient-to-r from-[#FD4102]/10 to-[#FD4102]/5 rounded-full">
                  <span className="text-sm font-semibold text-[#FD4102] uppercase tracking-wider">The Solution</span>
                </div>
                <h2 className="mb-4 text-4xl md:text-5xl font-black bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 bg-clip-text text-transparent">
                  The M.E.R.I.D.I.A.N. Ecosystem
                </h2>
                <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                  A four-step process to reclaim your data and build a fairer AI-powered future.
                </p>
              </div>
              <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
                {steps.map((step, index) => (
                  <Card key={index} className="border-2 border-transparent hover:border-[#FD4102]/50 hover:shadow-2xl hover:shadow-[#FD4102]/10 transition-all duration-300 group">
                    <CardContent className="p-6">
                      <div className="mb-4 text-5xl font-black text-gray-200 group-hover:text-[#FD4102] transition-colors duration-300">
                        {step.number}
                      </div>
                      <h3 className="mb-2 text-xl font-bold">{step.title}</h3>
                      <p className="text-sm text-muted-foreground">{step.description}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </section>

          {/* Key Features */}
          <section id="features" className="py-16 md:py-24">
            <div className="container mx-auto px-4">
              <div className="mx-auto max-w-3xl text-center mb-16">
                <div className="inline-block mb-4 px-4 py-2 bg-gradient-to-r from-[#FD4102]/10 to-[#FD4102]/5 rounded-full">
                  <span className="text-sm font-semibold text-[#FD4102] uppercase tracking-wider">Core Features</span>
                </div>
                <h2 className="mb-4 text-4xl md:text-5xl font-black bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 bg-clip-text text-transparent">
                  A New Paradigm for Data
                </h2>
                <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                  Our platform is packed with features designed for security, sovereignty, and fair monetization.
                </p>
              </div>
              <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                {features.map((feature, index) => (
                  <Card key={index} className="border-2 border-transparent shadow-lg shadow-[#FD4102]/5 hover:border-[#FD4102]/50 hover:shadow-2xl hover:shadow-[#FD4102]/10 transition-all duration-300 text-center group">
                    <CardContent className="p-8">
                      <div className="inline-block p-4 bg-gradient-to-br from-[#FD4102]/20 to-[#FD4102]/10 rounded-2xl mb-4">
                        <feature.icon className="h-8 w-8 text-[#FD4102]" />
                      </div>
                      <h3 className="mb-2 text-xl font-bold">{feature.title}</h3>
                      <p className="text-sm text-muted-foreground">{feature.description}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </section>

          {/* Statistics */}
          <section id="stats" className="py-16 md:py-24 bg-gradient-to-r from-[#FD4102] to-[#FF6B35]">
            <div className="container mx-auto px-4">
              <div className="grid gap-8 md:grid-cols-4">
                {stats.map((stat, index) => (
                  <div key={index} className="text-center">
                    <div className="mb-2 text-4xl font-black text-white md:text-5xl">{stat.value}</div>
                    <div className="text-sm text-white/80 uppercase tracking-wider">{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* CTA Section */}
          <section id="cta" className="py-16 md:py-24">
            <div className="container mx-auto px-4">
              <div className="mx-auto max-w-4xl">
                <Card className="animate-fade-in border-2 shadow-2xl shadow-[#FD4102]/10 hover:shadow-[#FD4102]/20 transition-all duration-300 bg-gradient-to-br from-[#FD4102]/5 via-transparent to-transparent">
                  <CardContent className="p-12 text-center">
                    <div className="inline-block mb-4 px-4 py-2 bg-gradient-to-r from-[#FD4102]/10 to-[#FD4102]/5 rounded-full">
                      <span className="text-sm font-semibold text-[#FD4102] uppercase tracking-wider">
                        Get Started Now
                      </span>
                    </div>
                    <h2 className="mb-4 text-4xl md:text-5xl font-black bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 bg-clip-text text-transparent">
                      Join the Data Revolution
                    </h2>
                    <p className="mb-8 text-lg text-muted-foreground max-w-2xl mx-auto">
                      Take the first step towards data sovereignty. Create your Decentralized Identity and join a global community building a fairer digital world.
                    </p>
                    <div className="flex justify-center">
                      <Link to="/connect">
                        <Button
                          size="lg"
                          className="h-14 text-base font-bold bg-gradient-to-r from-[#FD4102] to-[#FF6B35] hover:from-[#FF6B35] hover:to-[#FD4102] shadow-lg shadow-[#FD4102]/30 hover:shadow-xl hover:shadow-[#FD4102]/40 transition-all duration-300"
                        >
                          <CheckCircle2 className="mr-2 h-6 w-6" />
                          Create Your DID in Seconds
                          <ArrowRight className="ml-2 h-6 w-6" />
                        </Button>
                      </Link>
                    </div>
                    <p className="mt-6 text-sm text-muted-foreground">
                      Join <span className="font-semibold text-[#FD4102]">50,000+</span> data providers and buyers.
                    </p>
                  </CardContent>
                </Card>
              </div>
            </div>
          </section>
        </div>
      )}
    </div>
  );
};

export default Landing;
