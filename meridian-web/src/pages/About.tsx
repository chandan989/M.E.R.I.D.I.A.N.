import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import {
  Target,
  Users,
  TrendingUp,
  Shield,
  Globe,
  Zap,
  CheckCircle2,
  ArrowRight,
} from "lucide-react";

const About = () => {
  const values = [
    {
      icon: Shield,
      title: "Data Sovereignty",
      description: "True ownership and control over your data through Web5 technology.",
    },
    {
      icon: Users,
      title: "Inclusivity",
      description: "Building AI that represents and serves all communities fairly.",
    },
    {
      icon: TrendingUp,
      title: "Fair Compensation",
      description: "Data providers deserve to profit from their contributions.",
    },
    {
      icon: Globe,
      title: "Transparency",
      description: "Open, auditable systems that users can trust.",
    },
  ];

  const roadmap = [
    {
      phase: "Phase 1",
      status: "Completed",
      title: "Platform Launch",
      items: [
        "Web5 DID integration",
        "Basic marketplace functionality",
        "NFT minting system",
        "AI quality analysis",
      ],
    },
    {
      phase: "Phase 2",
      status: "In Progress",
      title: "Enhanced Features",
      items: [
        "Fractional ownership trading",
        "Advanced analytics dashboard",
        "Multi-chain support",
        "Mobile applications",
      ],
    },
    {
      phase: "Phase 3",
      status: "Planned",
      title: "Ecosystem Growth",
      items: [
        "Partner integrations",
        "DAO governance",
        "Data quality certifications",
        "Global expansion",
      ],
    },
    {
      phase: "Phase 4",
      status: "Future",
      title: "AI Integration",
      items: [
        "On-platform AI training",
        "Bias detection tools",
        "Automated data pipelines",
        "Research collaborations",
      ],
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Hero */}
      <section className="bg-gradient-to-b from-background to-secondary/20 py-20">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-3xl text-center">
            <Badge className="mb-4">About M.E.R.I.D.I.A.N.</Badge>
            <h1 className="mb-6 text-4xl font-bold md:text-5xl">
              Building a Fairer Data Economy
            </h1>
            <p className="text-lg text-muted-foreground">
              We're on a mission to democratize data ownership and eliminate AI bias by
              empowering individuals to monetize their data while maintaining complete
              sovereignty.
            </p>
          </div>
        </div>
      </section>

      {/* Mission */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-4xl">
            <Card className="border-primary/20 bg-gradient-to-br from-primary/5 to-accent/5">
              <CardContent className="p-8">
                <div className="flex items-start gap-4">
                  <div className="rounded-lg bg-primary/10 p-3">
                    <Target className="h-8 w-8 text-primary" />
                  </div>
                  <div>
                    <h2 className="mb-3 text-2xl font-bold">Our Mission</h2>
                    <p className="text-muted-foreground leading-relaxed">
                      To create a world where everyone has true ownership of their data,
                      where AI systems are trained on diverse, representative datasets, and
                      where individuals are fairly compensated for their digital
                      contributions. Through Web5 technology and blockchain innovation,
                      we're making data sovereignty a reality.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Problem & Solution */}
      <section className="bg-secondary/30 py-16">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-4xl">
            <h2 className="mb-12 text-center text-3xl font-bold">The Challenge We Face</h2>
            <div className="grid gap-8 md:grid-cols-2">
              <Card className="border-destructive/20">
                <CardContent className="p-6">
                  <div className="mb-4 inline-block rounded-lg bg-destructive/10 p-3">
                    <Zap className="h-6 w-6 text-destructive" />
                  </div>
                  <h3 className="mb-3 text-xl font-bold">The Problem</h3>
                  <ul className="space-y-2 text-sm text-muted-foreground">
                    <li className="flex items-start gap-2">
                      <span className="mt-1 text-destructive">•</span>
                      AI systems perpetuate bias due to non-representative training data
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1 text-destructive">•</span>
                      Tech giants profit billions from user data without compensation
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1 text-destructive">•</span>
                      Individuals have no control over how their data is used
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1 text-destructive">•</span>
                      Underrepresented communities are excluded from the data economy
                    </li>
                  </ul>
                </CardContent>
              </Card>

              <Card className="border-success/20">
                <CardContent className="p-6">
                  <div className="mb-4 inline-block rounded-lg bg-success/10 p-3">
                    <CheckCircle2 className="h-6 w-6 text-success" />
                  </div>
                  <h3 className="mb-3 text-xl font-bold">Our Solution</h3>
                  <ul className="space-y-2 text-sm text-muted-foreground">
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="mt-0.5 h-4 w-4 text-success flex-shrink-0" />
                      Web5-powered self-sovereign identity for true data ownership
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="mt-0.5 h-4 w-4 text-success flex-shrink-0" />
                      NFT marketplace for monetizing datasets with built-in royalties
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="mt-0.5 h-4 w-4 text-success flex-shrink-0" />
                      Privacy-first AI analysis with temporary, revocable permissions
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="mt-0.5 h-4 w-4 text-success flex-shrink-0" />
                      Incentivizing diverse data contribution to eliminate bias
                    </li>
                  </ul>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Core Values */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-4xl">
            <h2 className="mb-12 text-center text-3xl font-bold">Our Core Values</h2>
            <div className="grid gap-6 md:grid-cols-2">
              {values.map((value, index) => (
                <Card key={index} className="group hover:shadow-lg transition-shadow">
                  <CardContent className="p-6">
                    <div className="mb-4 inline-block rounded-lg bg-primary/10 p-3 group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                      <value.icon className="h-6 w-6" />
                    </div>
                    <h3 className="mb-2 text-xl font-bold">{value.title}</h3>
                    <p className="text-sm text-muted-foreground">{value.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Roadmap */}
      <section className="bg-secondary/30 py-16">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-5xl">
            <h2 className="mb-12 text-center text-3xl font-bold">Development Roadmap</h2>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
              {roadmap.map((phase, index) => (
                <Card key={index} className={phase.status === "In Progress" ? "border-primary" : ""}>
                  <CardContent className="p-6">
                    <div className="mb-4">
                      <Badge
                        variant={
                          phase.status === "Completed"
                            ? "default"
                            : phase.status === "In Progress"
                            ? "default"
                            : "secondary"
                        }
                        className={
                          phase.status === "Completed"
                            ? "bg-success"
                            : phase.status === "In Progress"
                            ? "bg-primary"
                            : ""
                        }
                      >
                        {phase.status}
                      </Badge>
                    </div>
                    <h3 className="mb-1 text-sm font-semibold text-muted-foreground">
                      {phase.phase}
                    </h3>
                    <h4 className="mb-4 text-lg font-bold">{phase.title}</h4>
                    <ul className="space-y-2">
                      {phase.items.map((item, i) => (
                        <li key={i} className="flex items-start gap-2 text-sm">
                          {phase.status === "Completed" ? (
                            <CheckCircle2 className="mt-0.5 h-4 w-4 text-success flex-shrink-0" />
                          ) : (
                            <div className="mt-1.5 h-2 w-2 rounded-full bg-primary flex-shrink-0" />
                          )}
                          <span className="text-muted-foreground">{item}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <Card className="mx-auto max-w-3xl border-primary/20 bg-gradient-to-br from-primary/5 to-accent/5">
            <CardContent className="p-12 text-center">
              <h2 className="mb-4 text-3xl font-bold">Join the Movement</h2>
              <p className="mb-8 text-lg text-muted-foreground">
                Be part of the data revolution. Start monetizing your data or building
                fairer AI today.
              </p>
              <div className="flex flex-col gap-4 sm:flex-row sm:justify-center">
                <Link to="/connect">
                  <Button size="lg">
                    Get Started
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </Link>
                <Link to="/marketplace">
                  <Button size="lg" variant="outline">
                    Explore Marketplace
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  );
};

export default About;
