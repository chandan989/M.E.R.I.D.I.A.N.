import { useState } from "react";
import {
  Card,
  CardContent
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  Search,
  Book,
  Database,
  Wallet,
  Shield,
  Code,
  HelpCircle,
  ArrowRight,
  ArrowLeft,
} from "lucide-react";
import { Button } from "@/components/ui/button";

const Docs = () => {
  const [selectedSection, setSelectedSection] = useState(null);

  const sections = [
    {
      title: "Getting Started",
      icon: Book,
      description: "Learn the basics of M.E.R.I.D.I.A.N., from creating your DID to uploading your first dataset.",
      content: (
        <div>
          <h3 className="text-2xl font-bold mb-4">Quick Start Guide</h3>
          <p className="mb-4">This guide will walk you through the essential first steps to get up and running on the M.E.R.I.D.I.A.N. platform.</p>
          <ol className="list-decimal list-inside space-y-4">
            <li><strong>Create Your Decentralized Identity (DID):</strong> Your DID is your passport to the decentralized web. Go to the 'Connect' page and follow the prompts to create your unique Web5 DID.</li>
            <li><strong>Secure Your Keys:</strong> Once created, you'll be given a set of cryptographic keys. Store these in a secure location. These keys are your responsibility and are crucial for accessing your account.</li>
            <li><strong>Upload a Dataset:</strong> Navigate to your dashboard and click 'Upload Data'. Select a file, give it a title and description, and our AI will begin its quality analysis.</li>
            <li><strong>Mint Your Data NFT:</strong> After the analysis is complete, you can mint your dataset as an NFT. This makes it a tradeable asset on our marketplace.</li>
            <li><strong>List for Sale:</strong> Set your price, define usage terms, and list your new data NFT on the marketplace for buyers to discover.</li>
          </ol>
        </div>
      ),
    },
    {
      title: "For Data Providers",
      icon: Database,
      description: "Master data listing, pricing strategies, quality scores, and permission management.",
      content: (
        <div>
          <h3 className="text-2xl font-bold mb-4">Maximizing Your Data's Value</h3>
          <p className="mb-6">As a data provider, you are the backbone of the M.E.R.I.D.I.A.N. ecosystem. This guide covers best practices for listing, pricing, and managing your data assets.</p>
          <h4 className="text-xl font-bold mb-2">Listing Your Data</h4>
          <p className="mb-4">A great listing starts with rich metadata. Be descriptive in your title and summary. Add relevant tags to improve discoverability. Our AI will automatically generate a quality score based on completeness, format, and uniqueness, but your manual input is key.</p>
          <h4 className="text-xl font-bold mb-2">Pricing Strategies</h4>
          <ul className="list-disc list-inside space-y-2 mb-4">
            <li><strong>Fixed Price:</strong> Set a straightforward price for a perpetual license to your data.</li>
            <li><strong>Tiered Licensing:</strong> Offer different prices for different levels of access (e.g., limited for research, full for commercial use).</li>
            <li><strong>Royalties:</strong> Earn a percentage of all future sales when your data NFT is resold on the marketplace.</li>
          </ul>
          <h4 className="text-xl font-bold mb-2">Managing Permissions</h4>
          <p>You have granular control. When a buyer requests access, you issue a temporary, revocable credential. You can see all active permissions on your dashboard and revoke access at any time if terms are violated.</p>
        </div>
      ),
    },
    {
      title: "For Data Buyers",
      icon: Wallet,
      description: "Find, purchase, and access high-quality data for your AI models and applications.",
      content: (
        <div>
          <h3 className="text-2xl font-bold mb-4">Acquiring High-Quality Data</h3>
          <p className="mb-6">M.E.R.I.D.I.A.N. provides access to a diverse, global pool of data to train fairer and more powerful AI models. Here’s how to get started.</p>
          <h4 className="text-xl font-bold mb-2">Finding the Right Data</h4>
          <p className="mb-4">Use our powerful search and filtering tools to find datasets relevant to your needs. You can filter by category, data type, quality score, price, and more. Review the dataset's metadata and quality report before making a purchase.</p>
          <h4 className="text-xl font-bold mb-2">Purchasing a License</h4>
          <p className="mb-4">Purchasing a data license is as simple as buying an NFT. Once you complete the transaction, the data NFT is transferred to your wallet. This NFT acts as your proof of license.</p>
          <h4 className="text-xl font-bold mb-2">Accessing and Querying Data</h4>
          <p>With the license NFT in your possession, you can request access from the data provider. Once granted, you can query the data directly from its Decentralized Web Node (DWN) using our SDK or API. Access is secure, private, and respects the terms of the license.</p>
        </div>
      ),
    },
    {
      title: "Technical Docs",
      icon: Code,
      description: "Dive deep into our architecture, Web5 integration, smart contracts, and API reference.",
      content: (
        <div>
          <h3 className="text-2xl font-bold mb-4">Architecture Overview</h3>
          <p className="mb-6">M.E.R.I.D.I.A.N. is built on a decentralized stack to ensure user sovereignty and data integrity. The core components are:</p>
          <ul className="list-disc list-inside space-y-2 mb-4">
            <li><strong>Web5 (DIDs & DWNs):</strong> For self-sovereign identity and user-controlled, encrypted data storage.</li>
            <li><strong>Blockchain Layer:</strong> An EVM-compatible chain for minting data NFTs and executing smart contracts for licensing and royalties.</li>
            <li><strong>AI Analysis Engine:</strong> A privacy-preserving AI that runs in a secure environment to assess data quality without accessing raw data.</li>
            <li><strong>Frontend & SDK:</strong> A user-friendly interface and a powerful Software Development Kit for programmatic access.</li>
          </ul>
          <h4 className="text-xl font-bold mb-2">API Reference</h4>
          <p className="mb-4">Our comprehensive REST API allows you to integrate M.E.R.I.D.I.A.N. functionality into your own applications. The base URL is <code>https://api.meridian.tech/v1</code>.</p>
          <pre className="bg-gray-100 p-4 rounded-lg text-sm"><code>{`// Example: Fetching a dataset
fetch('https://api.meridian.tech/v1/datasets/DATASET_ID', {
  headers: { 'Authorization': 'Bearer YOUR_API_KEY' }
})
.then(res => res.json())
.then(console.log);`}</code></pre>
        </div>
      ),
    },
    {
      title: "Security & Privacy",
      icon: Shield,
      description: "Understand our commitment to data encryption, DWN security, and privacy best practices.",
      content: (
        <div>
          <h3 className="text-2xl font-bold mb-4">A Fortress for Your Data</h3>
          <p className="mb-6">Security and privacy are not features; they are the foundation of M.E.R.I.D.I.A.N. We've designed the system from the ground up to give you maximum control and protection.</p>
          <h4 className="text-xl font-bold mb-2">End-to-End Encryption</h4>
          <p className="mb-4">All data uploaded to your Decentralized Web Node (DWN) is encrypted at rest and in transit. Only you hold the keys to decrypt your data.</p>
          <h4 className="text-xl font-bold mb-2">Decentralized Web Nodes (DWNs)</h4>
          <p className="mb-4">We don't store your data. You do. Your data resides in your personal, encrypted DWN. This means you have ultimate control over its location, access, and deletion. M.E.R.I.D.I.A.N. as a platform cannot access, move, or share your data.</p>
          <h4 className="text-xl font-bold mb-2">Privacy-Preserving AI</h4>
          <p>Our AI quality analysis is designed for privacy. It runs in a sandboxed environment and only interacts with data metadata and statistical properties, not the raw content itself. All access is temporary and requires your explicit permission.</p>
        </div>
      ),
    },
    {
      title: "Support",
      icon: HelpCircle,
      description: "Find answers, troubleshoot issues, and connect with our support team and community.",
      content: (
        <div>
          <h3 className="text-2xl font-bold mb-4">We're Here to Help</h3>
          <p className="mb-6">Whether you have a question, a technical issue, or feedback, we have several channels available to support you.</p>
          <h4 className="text-xl font-bold mb-2">Community Support</h4>
          <p className="mb-4">Join our vibrant community on Discord and Telegram to ask questions, share ideas, and connect with other users and the M.E.R.I.D.I.A.N. team. This is often the fastest way to get help.</p>
          <h4 className="text-xl font-bold mb-2">Official Support</h4>
          <p className="mb-4">For account-specific issues or direct assistance, you can email our support team at <a href="mailto:support@meridian.tech" className="text-[#FD4102]">support@meridian.tech</a>. We aim to respond to all queries within 24 hours.</p>
          <h4 className="text-xl font-bold mb-2">Troubleshooting</h4>
          <p>Before reaching out, check our FAQ section below for answers to common questions. Many issues can be resolved by ensuring your DID client is properly configured and you have a stable internet connection.</p>
        </div>
      ),
    },
  ];

  const faqs = [
    {
      question: "What is Web5 and how does it relate to M.E.R.I.D.I.A.N.?",
      answer: "Web5 is a decentralized web platform that gives you ownership and control over your identity and data. M.E.R.I.D.I.A.N. is built on Web5, using its principles of self-sovereign identity (via DIDs) and decentralized data storage (via DWNs) to empower our users.",
    },
    {
      question: "How do I earn money as a data provider?",
      answer: "You earn money by listing your datasets for sale in our marketplace. When a data buyer purchases a license to use your data, you receive payment directly. You can set your own prices and even earn royalties from secondary sales of your data NFTs.",
    },
    {
      question: "Is my data secure on the platform?",
      answer: "Yes. Your data is encrypted and stored in your personal Decentralized Web Node (DWN), not on our servers. You grant access to your data on a case-by-case basis with temporary, revocable permissions. You have full control over who can access your data and for how long.",
    },
    {
      question: "What kind of data can I sell?",
      answer: "You can sell a wide variety of anonymized data, from survey results and user feedback to sensor data and images. Our AI-powered quality check ensures that all datasets meet our standards for quality, privacy, and ethical considerations. We strictly prohibit the sale of personally identifiable information (PII).",
    },
    {
      question: "How does M.E.R.I.D.I.A.N. help eliminate AI bias?",
      answer: "By creating a global marketplace for data, we incentivize the contribution of diverse datasets from underrepresented communities. This allows AI developers to train their models on more inclusive and representative data, leading to fairer and more accurate AI outcomes for everyone.",
    },
  ];

  const renderSectionContent = () => {
    const section = sections.find(s => s.title === selectedSection);
    if (!section) return null;

    return (
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <Button onClick={() => setSelectedSection(null)} className="mb-8 bg-transparent text-gray-800 border border-gray-300 hover:bg-gray-100">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Documentation
          </Button>
          <div className="mx-auto max-w-3xl">
            <div className="flex items-center gap-4 mb-6">
              <div className="inline-block p-4 bg-gradient-to-br from-[#FD4102]/20 to-[#FD4102]/10 rounded-2xl">
                <section.icon className="h-8 w-8 text-[#FD4102]" />
              </div>
              <h1 className="text-4xl font-black bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 bg-clip-text text-transparent">{section.title}</h1>
            </div>
            <div className="prose prose-lg max-w-none text-gray-600">
              {section.content}
            </div>
          </div>
        </div>
      </section>
    );
  };

  const renderMainContent = () => (
    <>
      {/* Header */}
      <section className="py-20 md:py-32">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-3xl text-center">
            <div className="inline-block mb-4 px-4 py-2 bg-gradient-to-r from-[#FD4102]/10 to-[#FD4102]/5 rounded-full">
              <span className="text-sm font-semibold text-[#FD4102] uppercase tracking-wider">
                Documentation
              </span>
            </div>
            <h1 className="mb-4 text-4xl md:text-6xl font-black bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 bg-clip-text text-transparent">
              Your Guide to the Data Revolution
            </h1>
            <p className="mb-8 text-lg text-muted-foreground max-w-2xl mx-auto">
              Explore our comprehensive documentation to learn everything you need to know about M.E.R.I.D.I.A.N. and the future of data.
            </p>
            <div className="mx-auto max-w-2xl">
              <div className="relative">
                <Search className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
                <Input
                  placeholder="Search documentation..."
                  className="h-14 w-full pl-12 text-base rounded-full shadow-lg shadow-[#FD4102]/10 focus:ring-2 focus:ring-[#FD4102]/50"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Sections Grid */}
      <section id="sections" className="py-16 md:py-24 bg-gray-50/50">
        <div className="container mx-auto px-4">
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {sections.map((section, index) => (
              <Card key={index} onClick={() => setSelectedSection(section.title)} className="cursor-pointer border-2 border-transparent shadow-lg shadow-[#FD4102]/5 hover:border-[#FD4102]/50 hover:shadow-2xl hover:shadow-[#FD4102]/10 transition-all duration-300 group">
                <CardContent className="p-8">
                  <div className="inline-block p-4 bg-gradient-to-br from-[#FD4102]/20 to-[#FD4102]/10 rounded-2xl mb-4">
                    <section.icon className="h-8 w-8 text-[#FD4102]" />
                  </div>
                  <h3 className="mb-2 text-xl font-bold">{section.title}</h3>
                  <p className="text-sm text-muted-foreground mb-4">{section.description}</p>
                  <div className="flex items-center font-semibold text-[#FD4102]">
                    <span>Read More</span>
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section id="faq" className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-3xl text-center mb-16">
            <div className="inline-block mb-4 px-4 py-2 bg-gradient-to-r from-[#FD4102]/10 to-[#FD4102]/5 rounded-full">
              <span className="text-sm font-semibold text-[#FD4102] uppercase tracking-wider">FAQ</span>
            </div>
            <h2 className="mb-4 text-4xl md:text-5xl font-black bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 bg-clip-text text-transparent">
              Frequently Asked Questions
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Have questions? We have answers. If you can't find what you're looking for, feel free to contact our support team.
            </p>
          </div>
          <div className="mx-auto max-w-3xl">
            <Accordion type="single" collapsible className="w-full">
              {faqs.map((faq, index) => (
                <AccordionItem key={index} value={`item-${index}`}>
                  <AccordionTrigger className="text-lg font-semibold text-left">
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-base text-muted-foreground leading-relaxed">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </div>
      </section>
    </>
  );

  return (
    <div className="bg-white text-gray-800 animate-fade-in relative">
      {/* Decorative Background Elements */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-[#FD4102]/5 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 -left-40 w-96 h-96 bg-[#FD4102]/3 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-40 right-1/4 w-64 h-64 bg-[#FD4102]/5 rounded-full blur-3xl"></div>
      </div>

      <div className="relative z-10">
        {selectedSection ? renderSectionContent() : renderMainContent()}
      </div>
    </div>
  );
};

export default Docs;
