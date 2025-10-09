import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
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
  GitCommit,
  Rocket,
  Sparkles,
  Scaling,
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
      icon: Rocket,
      phase: "Phase 1",
      status: "Completed",
      title: "Platform Launch",
      description: "Web5 DID integration, basic marketplace, NFT minting, and AI quality analysis.",
    },
    {
      icon: Sparkles,
      phase: "Phase 2",
      status: "In Progress",
      title: "Enhanced Features",
      description: "Fractional ownership, advanced analytics, multi-chain support, and mobile apps.",
    },
    {
      icon: Scaling,
      phase: "Phase 3",
      status: "Planned",
      title: "Ecosystem Growth",
      description: "Partner integrations, DAO governance, data quality certifications, and global expansion.",
    },
    {
      icon: GitCommit,
      phase: "Phase 4",
      status: "Future",
      title: "AI Integration",
      description: "On-platform AI training, bias detection tools, and automated data pipelines.",
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

      <div className="relative z-10">
        {/* Hero Section */}
        <section className="py-20 md:py-32">
          <div className="container mx-auto px-4">
            <div className="mx-auto max-w-3xl text-center">
              <div className="inline-block mb-4 px-4 py-2 bg-gradient-to-r from-[#FD4102]/10 to-[#FD4102]/5 rounded-full">
                <span className="text-sm font-semibold text-[#FD4102] uppercase tracking-wider">
                  About M.E.R.I.D.I.A.N.
                </span>
              </div>
              <h1 className="mb-4 text-4xl md:text-6xl font-black bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 bg-clip-text text-transparent">
                Building a Fairer Data Economy
              </h1>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                We're on a mission to democratize data ownership and eliminate AI bias by empowering individuals to monetize their data while maintaining complete sovereignty.
              </p>
            </div>
          </div>
        </section>

        {/* Mission & Vision */}
        <section id="mission" className="py-16 md:py-24 bg-gray-50/50">
          <div className="container mx-auto px-4">
            <div className="grid gap-8 md:grid-cols-2 items-center">
              <div className="animate-fade-in">
                <div className="inline-block mb-4 px-4 py-2 bg-gradient-to-r from-[#FD4102]/10 to-[#FD4102]/5 rounded-full">
                  <span className="text-sm font-semibold text-[#FD4102] uppercase tracking-wider">Our Mission</span>
                </div>
                <h2 className="mb-4 text-3xl md:text-4xl font-black bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 bg-clip-text text-transparent">
                  Democratizing Data for All
                </h2>
                <p className="text-muted-foreground leading-relaxed mb-6">
                  To create a world where everyone has true ownership of their data, where AI systems are trained on diverse, representative datasets, and where individuals are fairly compensated for their digital contributions.
                </p>
                <p className="text-muted-foreground leading-relaxed">
                  Through Web5 technology and blockchain innovation, we're making data sovereignty a reality.
                </p>
              </div>
              <div className="animate-fade-in">
                <Card className="border-2 shadow-2xl shadow-[#FD4102]/10 hover:shadow-[#FD4102]/20 transition-all duration-300">
                  <CardHeader>
                    <div className="flex items-center gap-4">
                      <div className="p-4 bg-gradient-to-br from-[#FD4102]/20 to-[#FD4102]/10 rounded-2xl">
                        <Target className="h-8 w-8 text-[#FD4102]" />
                      </div>
                      <div>
                        <CardTitle className="text-2xl font-bold">The Vision</CardTitle>
                        <p className="text-sm text-muted-foreground mt-1">An equitable digital future</p>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">
                      We envision a future where data is not a commodity exploited by a few, but a shared resource that empowers everyone. A world with unbiased AI, transparent systems, and sovereign individuals.
                    </p>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>

        {/* Core Values */}
        <section id="values" className="py-16 md:py-24">
          <div className="container mx-auto px-4">
            <div className="mx-auto max-w-3xl text-center mb-16">
              <div className="inline-block mb-4 px-4 py-2 bg-gradient-to-r from-[#FD4102]/10 to-[#FD4102]/5 rounded-full">
                <span className="text-sm font-semibold text-[#FD4102] uppercase tracking-wider">Our Values</span>
              </div>
              <h2 className="mb-4 text-4xl md:text-5xl font-black bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 bg-clip-text text-transparent">
                The Principles That Guide Us
              </h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Our commitment to a better future is built on these four pillars.
              </p>
            </div>
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
              {values.map((value, index) => (
                <Card key={index} className="border-2 border-transparent shadow-lg shadow-[#FD4102]/5 hover:border-[#FD4102]/50 hover:shadow-2xl hover:shadow-[#FD4102]/10 transition-all duration-300 text-center group">
                  <CardContent className="p-8">
                    <div className="inline-block p-4 bg-gradient-to-br from-[#FD4102]/20 to-[#FD4102]/10 rounded-2xl mb-4">
                      <value.icon className="h-8 w-8 text-[#FD4102]" />
                    </div>
                    <h3 className="mb-2 text-xl font-bold">{value.title}</h3>
                    <p className="text-sm text-muted-foreground">{value.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Roadmap */}
        <section id="roadmap" className="py-16 md:py-24 bg-gray-50/50">
          <div className="container mx-auto px-4">
            <div className="mx-auto max-w-3xl text-center mb-16">
              <div className="inline-block mb-4 px-4 py-2 bg-gradient-to-r from-[#FD4102]/10 to-[#FD4102]/5 rounded-full">
                <span className="text-sm font-semibold text-[#FD4102] uppercase tracking-wider">Roadmap</span>
              </div>
              <h2 className="mb-4 text-4xl md:text-5xl font-black bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 bg-clip-text text-transparent">
                Our Journey to a New Data Paradigm
              </h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                We're building the future of data, one milestone at a time.
              </p>
            </div>
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
              {roadmap.map((phase, index) => (
                <Card key={index} className={`border-2 border-transparent hover:border-[#FD4102]/50 hover:shadow-2xl hover:shadow-[#FD4102]/10 transition-all duration-300 group ${phase.status === "In Progress" ? "border-[#FD4102]/50 shadow-xl shadow-[#FD4102]/10" : ""}`}>
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between mb-4">
                      <div className="p-3 bg-gradient-to-br from-[#FD4102]/20 to-[#FD4102]/10 rounded-xl">
                        <phase.icon className="h-6 w-6 text-[#FD4102]" />
                      </div>
                      <span className={`px-3 py-1 text-xs font-semibold rounded-full ${
                        phase.status === "Completed"
                          ? "bg-green-100 text-green-800"
                          : phase.status === "In Progress"
                          ? "bg-orange-100 text-[#FD4102]"
                          : "bg-gray-100 text-gray-500"
                      }`}>
                        {phase.status}
                      </span>
                    </div>
                    <h3 className="mb-1 text-sm font-bold text-muted-foreground">{phase.phase}</h3>
                    <h4 className="mb-2 text-lg font-bold">{phase.title}</h4>
                    <p className="text-sm text-muted-foreground">{phase.description}</p>
                  </CardContent>
                </Card>
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
                      Join the Movement
                    </span>
                  </div>
                  <h2 className="mb-4 text-4xl md:text-5xl font-black bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 bg-clip-text text-transparent">
                    Become a Part of the Solution
                  </h2>
                  <p className="mb-8 text-lg text-muted-foreground max-w-2xl mx-auto">
                    Whether you're a data provider, an AI developer, or a privacy advocate, your contribution matters. Let's build a fairer digital world together.
                  </p>
                  <div className="flex justify-center">
                    <Link to="/connect">
                      <Button
                        size="lg"
                        className="h-14 text-base font-bold bg-gradient-to-r from-[#FD4102] to-[#FF6B35] hover:from-[#FF6B35] hover:to-[#FD4102] shadow-lg shadow-[#FD4102]/30 hover:shadow-xl hover:shadow-[#FD4102]/40 transition-all duration-300"
                      >
                        <CheckCircle2 className="mr-2 h-6 w-6" />
                        Get Started Now
                        <ArrowRight className="ml-2 h-6 w-6" />
                      </Button>
                    </Link>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default About;
