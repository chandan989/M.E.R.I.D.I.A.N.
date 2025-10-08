import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Mail, MessageCircle, Book, Phone } from "lucide-react";
import { toast } from "sonner";

const Support = () => {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success("Support request submitted! We'll get back to you within 24 hours.");
  };

  return (
    <div className="min-h-screen bg-background py-12">
      <div className="container mx-auto px-4">
        <div className="mx-auto max-w-5xl">
          {/* Header */}
          <div className="mb-12 text-center">
            <h1 className="mb-4 text-4xl font-bold">Support Center</h1>
            <p className="text-lg text-muted-foreground">
              We're here to help. Choose how you'd like to reach us.
            </p>
          </div>

          {/* Support Options */}
          <div className="mb-12 grid gap-6 md:grid-cols-4">
            <Card className="hover:shadow-lg transition-shadow">
              <CardContent className="p-6 text-center">
                <div className="mb-4 inline-block rounded-lg bg-primary/10 p-3">
                  <Mail className="h-6 w-6 text-primary" />
                </div>
                <h3 className="mb-2 font-semibold">Email Support</h3>
                <p className="mb-4 text-sm text-muted-foreground">
                  Response within 24 hours
                </p>
                <Button variant="outline" className="w-full">
                  Send Email
                </Button>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow">
              <CardContent className="p-6 text-center">
                <div className="mb-4 inline-block rounded-lg bg-primary/10 p-3">
                  <MessageCircle className="h-6 w-6 text-primary" />
                </div>
                <h3 className="mb-2 font-semibold">Live Chat</h3>
                <p className="mb-4 text-sm text-muted-foreground">
                  Get instant help
                </p>
                <Button variant="outline" className="w-full">
                  Start Chat
                </Button>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow">
              <CardContent className="p-6 text-center">
                <div className="mb-4 inline-block rounded-lg bg-primary/10 p-3">
                  <Book className="h-6 w-6 text-primary" />
                </div>
                <h3 className="mb-2 font-semibold">Documentation</h3>
                <p className="mb-4 text-sm text-muted-foreground">
                  Find detailed guides
                </p>
                <Button variant="outline" className="w-full">
                  Browse Docs
                </Button>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow">
              <CardContent className="p-6 text-center">
                <div className="mb-4 inline-block rounded-lg bg-primary/10 p-3">
                  <Phone className="h-6 w-6 text-primary" />
                </div>
                <h3 className="mb-2 font-semibold">Schedule Call</h3>
                <p className="mb-4 text-sm text-muted-foreground">
                  Talk to our team
                </p>
                <Button variant="outline" className="w-full">
                  Book Time
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Contact Form */}
          <Card>
            <CardContent className="p-8">
              <h2 className="mb-6 text-2xl font-bold">Send us a message</h2>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid gap-6 md:grid-cols-2">
                  <div>
                    <Label htmlFor="name">Name *</Label>
                    <Input
                      id="name"
                      placeholder="John Doe"
                      className="mt-1.5"
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="email">Email *</Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="john@example.com"
                      className="mt-1.5"
                      required
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="issue-type">Issue Type *</Label>
                  <Select>
                    <SelectTrigger className="mt-1.5">
                      <SelectValue placeholder="Select issue type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="technical">Technical Issue</SelectItem>
                      <SelectItem value="billing">Billing Question</SelectItem>
                      <SelectItem value="account">Account Help</SelectItem>
                      <SelectItem value="dataset">Dataset Issue</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="subject">Subject *</Label>
                  <Input
                    id="subject"
                    placeholder="Brief description of your issue"
                    className="mt-1.5"
                    required
                  />
                </div>

                <div>
                  <Label htmlFor="message">Message *</Label>
                  <Textarea
                    id="message"
                    placeholder="Provide as much detail as possible..."
                    className="mt-1.5 min-h-32"
                    required
                  />
                </div>

                <Button type="submit" size="lg" className="w-full">
                  Submit Request
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Support;
