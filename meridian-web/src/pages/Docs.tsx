import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Search,
  Book,
  Database,
  Wallet,
  Shield,
  Code,
  HelpCircle,
  ExternalLink,
} from "lucide-react";

const Docs = () => {
  const sections = [
    {
      title: "Getting Started",
      icon: Book,
      items: [
        "What is M.E.R.I.D.I.A.N.?",
        "Quick Start Guide",
        "Creating Your First DID",
        "Uploading Your First Dataset",
      ],
    },
    {
      title: "For Data Providers",
      icon: Database,
      items: [
        "How to List Data",
        "Pricing Strategies",
        "Understanding Quality Scores",
        "Managing Permissions",
      ],
    },
    {
      title: "For Data Buyers",
      icon: Wallet,
      items: [
        "Finding Data",
        "Purchasing Licenses",
        "Accessing Data",
        "API Documentation",
      ],
    },
    {
      title: "Technical Documentation",
      icon: Code,
      items: [
        "Architecture Overview",
        "Web5 Integration",
        "Smart Contracts",
        "API Reference",
      ],
    },
    {
      title: "Security & Privacy",
      icon: Shield,
      items: [
        "Data Encryption",
        "DWN Security",
        "Privacy Best Practices",
        "Compliance",
      ],
    },
    {
      title: "FAQ & Support",
      icon: HelpCircle,
      items: [
        "Common Questions",
        "Troubleshooting",
        "Contact Support",
        "Community Forums",
      ],
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-12">
        {/* Header */}
        <div className="mb-12 text-center">
          <h1 className="mb-4 text-4xl font-bold">Documentation</h1>
          <p className="mb-8 text-lg text-muted-foreground">
            Everything you need to know about M.E.R.I.D.I.A.N.
          </p>

          {/* Search */}
          <div className="mx-auto max-w-2xl">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="Search documentation..."
                className="h-12 pl-12 text-base"
              />
            </div>
          </div>
        </div>

        {/* Sections Grid */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {sections.map((section, index) => (
            <Card key={index} className="group hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <div className="mb-4 inline-block rounded-lg bg-primary/10 p-3 group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                  <section.icon className="h-6 w-6" />
                </div>
                <h2 className="mb-4 text-xl font-bold">{section.title}</h2>
                <ul className="space-y-2">
                  {section.items.map((item, i) => (
                    <li key={i}>
                      <Button
                        variant="link"
                        className="h-auto p-0 text-sm text-muted-foreground hover:text-primary"
                      >
                        {item}
                        <ExternalLink className="ml-1 h-3 w-3" />
                      </Button>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Popular Guides */}
        <div className="mt-16">
          <h2 className="mb-6 text-2xl font-bold">Popular Guides</h2>
          <div className="grid gap-4 md:grid-cols-3">
            <Card className="hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <h3 className="mb-2 font-semibold">Quick Start: Upload Your First Dataset</h3>
                <p className="mb-4 text-sm text-muted-foreground">
                  Learn how to upload, analyze, and monetize your data in under 10 minutes.
                </p>
                <Button variant="outline" size="sm">
                  Read Guide
                </Button>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <h3 className="mb-2 font-semibold">Understanding Web5 & DIDs</h3>
                <p className="mb-4 text-sm text-muted-foreground">
                  A comprehensive introduction to decentralized identity and Web5 technology.
                </p>
                <Button variant="outline" size="sm">
                  Read Guide
                </Button>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <h3 className="mb-2 font-semibold">API Integration Guide</h3>
                <p className="mb-4 text-sm text-muted-foreground">
                  Integrate M.E.R.I.D.I.A.N. data into your applications with our REST API.
                </p>
                <Button variant="outline" size="sm">
                  Read Guide
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Code Example */}
        <div className="mt-16">
          <h2 className="mb-6 text-2xl font-bold">Code Example</h2>
          <Card>
            <CardContent className="p-6">
              <h3 className="mb-4 font-semibold">Accessing a Dataset via API</h3>
              <div className="rounded-lg bg-muted p-4">
                <pre className="overflow-x-auto text-sm">
                  <code>{`// Initialize M.E.R.I.D.I.A.N. client
import { MeridianClient } from '@meridian/sdk';

const client = new MeridianClient({
  apiKey: 'your-api-key',
  did: 'did:web5:your-did'
});

// Fetch dataset
const dataset = await client.datasets.get('dataset-id');

// Query data
const results = await dataset.query({
  filters: { category: 'healthcare' },
  limit: 100
});

console.log(results);`}</code>
                </pre>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Docs;
