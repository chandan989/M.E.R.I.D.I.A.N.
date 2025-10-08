import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
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
    <div className="animate-fade-in">
      {!isInitialLoading && <LandingPageNavigation />}
      {/* Hero Section */}
      <section id="home">
        <Suspense fallback={<Loading />}>
          <HeroWithLoadingComplete />
        </Suspense>
      </section>

      {/* Only show sections after loading completes */}
      {!isInitialLoading && (
        <>
          {/* Problem Statement */}
          <section id="problem" className="bg-background py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-3xl text-center mb-16">
            <h2 className="mb-4 text-3xl font-bold md:text-4xl">The Problem We're Solving</h2>
            <p className="text-lg text-muted-foreground">
              Current AI systems are built on biased, exploited data. It's time for change.
            </p>
          </div>
          <div className="grid gap-8 md:grid-cols-2">
            <Card className="border-destructive/20">
              <CardContent className="p-8">
                <div className="mb-4 inline-block rounded-lg bg-destructive/10 p-3">
                  <Zap className="h-8 w-8 text-destructive" />
                </div>
                <h3 className="mb-3 text-2xl font-bold">AI Bias Crisis</h3>
                <p className="text-muted-foreground">
                  Underrepresented communities are excluded from AI training data, leading to discriminatory
                  outcomes in healthcare, finance, and criminal justice systems.
                </p>
              </CardContent>
            </Card>
            <Card className="border-destructive/20">
              <CardContent className="p-8">
                <div className="mb-4 inline-block rounded-lg bg-destructive/10 p-3">
                  <Database className="h-8 w-8 text-destructive" />
                </div>
                <h3 className="mb-3 text-2xl font-bold">Data Exploitation</h3>
                <p className="text-muted-foreground">
                  Tech giants profit billions from your data while you get nothing. No control, no
                  compensation, no transparency in how your information is used.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Solution Overview */}
      <section id="solution" className="bg-gray-50 py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-3xl text-center mb-16">
            <h2 className="mb-4 text-3xl font-bold md:text-4xl">How M.E.R.I.D.I.A.N. Changes Everything</h2>
            <p className="text-lg text-muted-foreground">
              A complete ecosystem for data sovereignty, powered by Web5
            </p>
          </div>
          <div className="grid gap-6 md:grid-cols-4">
            {steps.map((step, index) => (
              <div key={index} className="relative">
                <Card className="group h-full transition-all duration-200 hover:shadow-lg hover:-translate-y-1">
                  <CardContent className="p-6">
                    <div className="mb-4 text-5xl font-black text-primary/20 group-hover:text-[#FD4102]">
                      {step.number}
                    </div>
                    <h3 className="mb-2 text-xl font-bold">{step.title}</h3>
                    <p className="text-sm text-muted-foreground">{step.description}</p>
                  </CardContent>
                </Card>
                {index < steps.length - 1 && (
                  <div className="absolute -right-3 top-1/2 hidden md:block">
                    <ArrowRight className="h-6 w-6 text-primary" />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Key Features */}
      <section id="features" className="bg-background py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-3xl text-center mb-16">
            <h2 className="mb-4 text-3xl font-bold md:text-4xl">Powerful Features</h2>
            <p className="text-lg text-muted-foreground">
              Everything you need to monetize your data securely
            </p>
          </div>
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {features.map((feature, index) => (
              <Card key={index} className="group hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <div className="mb-4 inline-block rounded-lg bg-primary/10 p-3 group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                    <feature.icon className="h-6 w-6" />
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
      <section id="stats" className="bg-primary py-16 text-primary-foreground md:py-24">
        <div className="container mx-auto px-4">
          <div className="grid gap-8 md:grid-cols-4">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="mb-2 text-4xl font-black md:text-5xl">{stat.value}</div>
                <div className="text-sm opacity-90">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section id="cta" className="bg-background py-16 md:py-24">
        <div className="container mx-auto px-4">
          <Card className="border-primary/20 bg-gradient-to-br from-primary/5 to-accent/5">
            <CardContent className="p-12 text-center">
              <h2 className="mb-4 text-3xl font-bold md:text-4xl">Join the Data Revolution</h2>
              <p className="mb-8 text-lg text-muted-foreground mx-auto max-w-2xl">
                Start monetizing your data today. Build fairer AI. Take control of your digital future.
              </p>
              <div className="flex flex-col gap-4 sm:flex-row sm:justify-center">
                <Link to="/connect">
                  <Button size="lg" className="w-full sm:w-auto">
                    <CheckCircle2 className="mr-2 h-5 w-5" />
                    Create Your DID
                  </Button>
                </Link>
                <Link to="/about">
                  <Button size="lg" variant="outline" className="w-full sm:w-auto">
                    Learn More
                  </Button>
                </Link>
              </div>
              <p className="mt-6 text-sm text-muted-foreground">
                Join <span className="font-semibold text-primary">50,000+</span> data providers worldwide
              </p>
            </CardContent>
          </Card>
        </div>
      </section>
        </>
      )}
    </div>
  );
};

export default Landing;
