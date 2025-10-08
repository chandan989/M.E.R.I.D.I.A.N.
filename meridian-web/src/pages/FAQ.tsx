import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Search } from "lucide-react";

const FAQ = () => {
  const faqs = [
    {
      category: "General Questions",
      questions: [
        {
          question: "What is M.E.R.I.D.I.A.N.?",
          answer:
            "M.E.R.I.D.I.A.N. is a decentralized data marketplace that enables users to monetize their data through NFTs while maintaining complete ownership via Web5 technology. It's designed to eliminate AI bias and create a fairer data economy.",
        },
        {
          question: "What is Web5?",
          answer:
            "Web5 is a decentralized web platform that gives you true ownership and control over your data and identity. Unlike Web2, where platforms control your data, Web5 uses Decentralized Identifiers (DIDs) and Decentralized Web Nodes (DWNs) to ensure you're always in control.",
        },
        {
          question: "Is M.E.R.I.D.I.A.N. free to use?",
          answer:
            "Creating an account and browsing the marketplace is completely free. Data providers pay a small gas fee when minting NFTs. We don't take platform fees on sales - you keep 100% of your revenue.",
        },
      ],
    },
    {
      category: "For Data Providers",
      questions: [
        {
          question: "How do I upload a dataset?",
          answer:
            "After connecting your Web5 wallet, navigate to the Upload page. Follow the step-by-step wizard to add dataset information, upload your file to your personal DWN, grant temporary AI analysis permission, review quality scores, and mint your data as an NFT.",
        },
        {
          question: "What file formats are supported?",
          answer:
            "We support CSV, JSON, XML, XLSX, SQL, and Parquet formats. Files are uploaded directly to your Decentralized Web Node for maximum privacy and security.",
        },
        {
          question: "How is pricing determined?",
          answer:
            "Our AI analyzes your dataset for quality, completeness, and uniqueness, then suggests a market price. However, you have complete control and can set any price you choose.",
        },
      ],
    },
    {
      category: "For Data Buyers",
      questions: [
        {
          question: "How do I purchase a dataset?",
          answer:
            "Browse the marketplace, select a dataset, and click 'Purchase Now'. You'll need CTC tokens in your connected wallet to complete the transaction. Once purchased, you'll receive instant access via API or direct download.",
        },
        {
          question: "What is fractional ownership?",
          answer:
            "Some datasets offer fractional ownership, allowing you to purchase partial rights at a lower cost. This makes expensive, high-value datasets accessible to more buyers while still compensating providers fairly.",
        },
        {
          question: "Can I resell data I've purchased?",
          answer:
            "This depends on the license terms set by the data provider. Some licenses allow resale with built-in royalties for the original provider, while others restrict commercial redistribution.",
        },
      ],
    },
    {
      category: "Technical Questions",
      questions: [
        {
          question: "What is a DID (Decentralized Identifier)?",
          answer:
            "A DID is a unique identifier that you own and control, not a company. It's cryptographically secured and allows you to prove your identity without relying on centralized authorities like Google or Facebook.",
        },
        {
          question: "What is a DWN (Decentralized Web Node)?",
          answer:
            "A DWN is your personal data vault. It stores your data and allows you to control exactly who can access it, when, and for how long. Think of it as your own private cloud that only you control.",
        },
        {
          question: "How does the AI analysis work?",
          answer:
            "When you upload a dataset, you grant temporary permission for our AI to analyze it. The AI evaluates quality, completeness, uniqueness, and suggests pricing. This permission is revocable at any time and the AI never stores your data.",
        },
      ],
    },
    {
      category: "Privacy & Security",
      questions: [
        {
          question: "Is my data secure?",
          answer:
            "Absolutely. Your data is stored in your personal DWN with end-to-end encryption. We never see or store your data on our servers. You grant access permissions on a case-by-case basis, and all permissions are revocable.",
        },
        {
          question: "Who can access my data?",
          answer:
            "Only people you explicitly grant access to can view your data. When someone purchases your dataset, they receive a time-limited access token. You maintain full ownership and can revoke access if terms are violated.",
        },
        {
          question: "Is the platform GDPR compliant?",
          answer:
            "Yes. Because you maintain complete control over your data through Web5, you have the right to be forgotten built-in. You can delete your data at any time, and it will be immediately inaccessible to all parties.",
        },
      ],
    },
  ];

  return (
    <div className="min-h-screen bg-background py-12">
      <div className="container mx-auto px-4">
        <div className="mx-auto max-w-4xl">
          {/* Header */}
          <div className="mb-12 text-center">
            <h1 className="mb-4 text-4xl font-bold">Frequently Asked Questions</h1>
            <p className="mb-8 text-lg text-muted-foreground">
              Find answers to common questions about M.E.R.I.D.I.A.N.
            </p>

            {/* Search */}
            <div className="relative">
              <Search className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="Search FAQs..."
                className="h-12 pl-12 text-base"
              />
            </div>
          </div>

          {/* FAQ Categories */}
          <div className="space-y-8">
            {faqs.map((category, index) => (
              <Card key={index}>
                <CardContent className="p-6">
                  <h2 className="mb-4 text-xl font-bold">{category.category}</h2>
                  <Accordion type="single" collapsible className="w-full">
                    {category.questions.map((faq, i) => (
                      <AccordionItem key={i} value={`item-${i}`}>
                        <AccordionTrigger className="text-left">
                          {faq.question}
                        </AccordionTrigger>
                        <AccordionContent className="text-muted-foreground">
                          {faq.answer}
                        </AccordionContent>
                      </AccordionItem>
                    ))}
                  </Accordion>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default FAQ;
